// RECIPE: a real object, lit like a product shot, that turns or explodes with scroll.
// Use for: object-study pages (a roof build-up on a house, a water-from-air unit, a boat, a POS terminal,
// a security camera, a rum cake), and any "show the thing itself" moment.
// Sources for the model, in order: a GLB the business supplies; a GLB from Higgsfield generate_3d (image to 3D,
// needs credits) built from a Lovable photoreal render; a procedural model from the img2threejs skill.
// Never low-poly toys: PBR materials, studio environment light, soft contact shadow, slow motion.
//
// Usage:
//   <ModelStage url="/models/house.glb" progress={p} explode />          // GLB
//   <ModelStage progress={p}><RoofLayers progress={p} /></ModelStage>   // procedural children
import { Suspense, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url, progress, explode }: { url: string; progress: number; explode?: boolean }) {
  const { scene } = useGLTF(url)
  const base = useRef(new Map<THREE.Object3D, THREE.Vector3>())
  useFrame(() => {
    if (!explode) return
    scene.traverse(o => {
      if (!(o as THREE.Mesh).isMesh) return
      if (!base.current.has(o)) base.current.set(o, o.position.clone())
      const b = base.current.get(o)!
      const dir = b.clone().normalize()
      o.position.copy(b).addScaledVector(dir.lengthSq() ? dir : new THREE.Vector3(0, 1, 0), Math.sin(progress * Math.PI) * 0.6)
    })
  })
  return <primitive object={scene} />
}

function Turntable({ progress, children }: { progress: number; children: ReactNode }) {
  const g = useRef<THREE.Group>(null!)
  useFrame(() => {
    const target = -0.6 + progress * Math.PI * 0.9
    g.current.rotation.y += (target - g.current.rotation.y) * 0.06
  })
  return <group ref={g}><Center>{children}</Center></group>
}

export default function ModelStage({ url, progress = 0, explode, preset, warm, children, className, background }: {
  url?: string; progress?: number; explode?: boolean
  /** omit for the built-in studio light (no download, works offline); or a drei HDR preset loaded from a CDN at
   *  runtime: 'sunset' (warm Caribbean), 'city' (neutral), 'dawn', 'warehouse' */
  preset?: 'city' | 'sunset' | 'dawn' | 'warehouse' | 'apartment' | 'park'
  /** warm (golden hour) or neutral studio light for the built-in environment */
  warm?: boolean
  children?: ReactNode; className?: string; background?: string
}) {
  return (
    <Canvas className={className} shadows dpr={[1, 1.75]} camera={{ position: [3.2, 2.1, 4.2], fov: 32 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} style={background ? { background } : undefined}>
      <Suspense fallback={null}>
        <Turntable progress={progress}>{url ? <Model url={url} progress={progress} explode={explode} /> : children}</Turntable>
        {preset ? <Environment preset={preset as never} /> : (
          <Environment resolution={256}>
            {/* a softbox studio built from light panels: product-shot lighting with no file to download */}
            <Lightformer form="rect" intensity={warm ? 3 : 2.4} color={warm ? '#ffd9a8' : '#ffffff'} position={[3, 4, 3]} scale={[6, 3, 1]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={1.2} color={warm ? '#ffb070' : '#e8eefc'} position={[-4, 2, -2]} scale={[4, 6, 1]} target={[0, 0, 0]} />
            <Lightformer form="ring" intensity={0.8} color="#ffffff" position={[0, 6, -6]} scale={4} target={[0, 0, 0]} />
          </Environment>
        )}
        <directionalLight position={[4, 6, 3]} intensity={warm ? 1.4 : 1.1} color={warm ? '#ffe2bd' : '#ffffff'} castShadow />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.45} scale={10} blur={2.6} far={4} />
      </Suspense>
    </Canvas>
  )
}
