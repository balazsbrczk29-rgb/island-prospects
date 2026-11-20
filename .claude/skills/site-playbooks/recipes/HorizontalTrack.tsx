// RECIPE: a pinned section where vertical scroll moves a row sideways (rooms, boats, fleet, tour stops, a timeline).
// The row is real content (each item: big image, name, one true fact, an action). On phones it becomes a native
// horizontal swipe with scroll-snap instead of pinning, because pinning long tracks on mobile feels trapped.
//
// Usage:
//   <HorizontalTrack items={rooms} renderItem={(r, i, focus) => <RoomCard room={r} focus={focus} />} itemWidth="min(78vw, 980px)" />
import { useRef, type ReactNode } from 'react'
import { useScroll, useTransform, motion, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'

export default function HorizontalTrack<T>({ items, renderItem, itemWidth = 'min(78vw, 980px)', gap = '4vw', label, className = '' }: {
  items: T[]; renderItem: (item: T, index: number, focus: number) => ReactNode
  itemWidth?: string; gap?: string; label: string; className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${((items.length - 1) / items.length) * 100}%`])
  const [focus, setFocus] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', v => setFocus(Math.round(v * (items.length - 1))))
  return (
    <>
      {/* desktop: pinned and scrubbed */}
      <section ref={ref} aria-label={label} className={`hidden md:block ${className}`} style={{ height: `${items.length * 90}svh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <motion.ul style={{ x, display: 'flex', gap, paddingInline: '8vw', width: `calc(${items.length} * (${itemWidth} + ${gap}))`, listStyle: 'none', margin: 0 }}>
            {items.map((it, i) => <li key={i} style={{ flex: `0 0 ${itemWidth}` }}>{renderItem(it, i, focus)}</li>)}
          </motion.ul>
        </div>
      </section>
      {/* mobile: native swipe with snap */}
      <section aria-label={label} className={`md:hidden ${className}`}>
        <ul style={{ display: 'flex', gap: '4vw', overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '0 6vw 8px', listStyle: 'none', margin: 0 }}>
          {items.map((it, i) => <li key={i} style={{ flex: '0 0 86vw', scrollSnapAlign: 'center' }}>{renderItem(it, i, i)}</li>)}
        </ul>
      </section>
    </>
  )
}
