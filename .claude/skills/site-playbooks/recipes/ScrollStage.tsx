// RECIPE: a pinned "stage" whose content is driven by scroll progress (scrollytelling).
// The section is N screens tall; its inner stage sticks to the viewport while you scroll through it, and
// children receive progress 0..1. Put a 3D scene, a scrubbed video, a photo sequence or a map in the stage,
// and let chapter captions appear at progress ranges. This is the backbone of most "immersive" award sites.
//
// Usage:
//   <ScrollStage screens={4} render={(p) => <Ocean progress={p} />}>
//     {(p) => <Chapters progress={p} items={[{ at: [0, .3], text: 'Hope Town, first light' }, ...]} />}
//   </ScrollStage>
// Also exported: CameraPath, to fly an R3F camera along points by progress.
import { useRef, useState, type ReactNode } from 'react'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'motion/react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function ScrollStage({ screens = 3, render, children, className = '' }: {
  screens?: number
  render: (progress: number) => ReactNode
  children?: (progress: number) => ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [p, setP] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', v => setP(v))
  return (
    <section ref={ref} className={className} style={{ height: `${screens * 100}svh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>{render(p)}</div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{children?.(p)}</div>
      </div>
    </section>
  )
}

/** Captions that appear inside progress ranges, like film subtitles. Style them per site. */
export function Chapters({ progress, items, className = '' }: { progress: number; items: { at: [number, number]; text: ReactNode }[]; className?: string }) {
  const active = items.findIndex(i => progress >= i.at[0] && progress < i.at[1])
  return (
    <AnimatePresence mode="wait">
      {active >= 0 && (
        <motion.div key={active} className={className} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          {items[active].text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Inside an R3F Canvas: moves the camera smoothly along points as progress goes 0..1, looking at targets. */
export function CameraPath({ progress, points, targets }: { progress: number; points: [number, number, number][]; targets: [number, number, number][] }) {
  const { camera } = useThree()
  const path = useRef(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))))
  const look = useRef(new THREE.CatmullRomCurve3(targets.map(p => new THREE.Vector3(...p))))
  const cur = useRef(new THREE.Vector3())
  useFrame(() => {
    const t = THREE.MathUtils.clamp(progress, 0, 1)
    camera.position.lerp(path.current.getPointAt(t), 0.08)          // eased follow: no jerks when scrolling fast
    cur.current.lerp(look.current.getPointAt(t), 0.08)
    camera.lookAt(cur.current)
  })
  return null
}
