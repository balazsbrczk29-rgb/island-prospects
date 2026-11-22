// A studio-lit section through the corner of a gunite pool, assembled in the real build order by scroll progress.
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import type { MotionValue } from 'motion/react'
import * as THREE from 'three'

const ss = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
type Box = [number, number, number, number] // x0, x1, y0, y1 (z is the full depth)
const D = 3.2

function tileTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256
  const g = c.getContext('2d')!
  g.fillStyle = '#e9efee'; g.fillRect(0, 0, 256, 256)
  const cols = ['#1d6f86', '#25809a', '#17617a', '#2b8ea6', '#145a70']
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { g.fillStyle = cols[(x * 7 + y * 3) % cols.length]; g.fillRect(x * 32 + 2, y * 32 + 2, 28, 28) }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 1.2); t.colorSpace = THREE.SRGBColorSpace
  return t
}
function grainTexture(base: string, spread: number) {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const g = c.getContext('2d')!; g.fillStyle = base; g.fillRect(0, 0, 128, 128)
  for (let i = 0; i < 2600; i++) { const v = Math.random() * spread; g.fillStyle = `rgba(${Math.random() > .5 ? '255,255,255' : '40,36,30'},${v})`; g.fillRect(Math.random() * 128, Math.random() * 128, 1.4, 1.4) }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3); t.colorSpace = THREE.SRGBColorSpace
  return t
}

function Layer({ box, mat, at, progress, from = 1.4, z = [-D / 2, D / 2], lift }: { box: Box; mat: THREE.Material; at: [number, number]; progress: MotionValue<number>; from?: number; z?: [number, number]; lift?: boolean }) {
  const m = useRef<THREE.Mesh>(null!)
  const [x0, x1, y0, y1] = box
  useFrame(() => {
    const a = ss(at[0], at[1], progress.get())
    const target = lift ? a * 3.2 : (1 - a) * from
    const cur = m.current.position.y - (y0 + y1) / 2
    m.current.position.y = (y0 + y1) / 2 + cur + (target - cur) * 0.12
    m.current.visible = lift ? a < 0.98 : a > 0.01
  })
  return (
    <mesh ref={m} position={[(x0 + x1) / 2, (y0 + y1) / 2 + (lift ? 0 : from), (z[0] + z[1]) / 2]} material={mat} castShadow receiveShadow>
      <boxGeometry args={[x1 - x0, y1 - y0, z[1] - z[0]]} />
    </mesh>
  )
}

function Steel({ progress, mat }: { progress: MotionValue<number>; mat: THREE.Material }) {
  const g = useRef<THREE.Group>(null!)
  const bars = useMemo(() => {
    const out: { p: [number, number, number]; r: [number, number, number]; l: number }[] = []
    for (let z = -1.4; z <= 1.41; z += 0.35) out.push({ p: [-1.0, -2.02, z], r: [0, 0, Math.PI / 2], l: 4.4 })
    for (let x = -3.0; x <= 1.0; x += 0.35) out.push({ p: [x, -1.98, 0], r: [Math.PI / 2, 0, 0], l: D - 0.2 })
    for (let z = -1.4; z <= 1.41; z += 0.35) out.push({ p: [1.02, -1.05, z], r: [0, 0, 0], l: 2.0 })
    for (let y = -1.9; y <= -0.1; y += 0.35) out.push({ p: [0.98, y, 0], r: [Math.PI / 2, 0, 0], l: D - 0.2 })
    return out
  }, [])
  useFrame(() => {
    const a = ss(0.27, 0.37, progress.get())
    g.current.position.y += ((1 - a) * 1.2 - g.current.position.y) * 0.12
    g.current.visible = a > 0.01
  })
  return (
    <group ref={g} position={[0, 1.2, 0]}>
      {bars.map((b, i) => <mesh key={i} position={b.p} rotation={b.r} material={mat} castShadow><cylinderGeometry args={[0.022, 0.022, b.l, 8]} /></mesh>)}
    </group>
  )
}

function Water({ progress, mat }: { progress: MotionValue<number>; mat: THREE.Material }) {
  const m = useRef<THREE.Mesh>(null!)
  const y0 = -1.8, y1 = -0.24
  useFrame((s) => {
    const a = ss(0.82, 0.95, progress.get())
    const h = Math.max(0.001, a * (y1 - y0))
    m.current.scale.y += (h - m.current.scale.y) * 0.1
    m.current.position.y = y0 + m.current.scale.y / 2
    m.current.visible = a > 0.005
    ;(mat as THREE.MeshPhysicalMaterial).clearcoatRoughness = 0.08 + Math.sin(s.clock.elapsedTime * 0.8) * 0.03
  })
  return <mesh ref={m} position={[-1.2, y0, 0]} scale={[1, 0.001, 1]} material={mat}><boxGeometry args={[4.0, 1, D - 0.02]} /></mesh>
}

function Rig({ progress, children }: { progress: MotionValue<number>; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null!)
  useFrame(() => {
    const p = progress.get()
    const target = -0.62 + p * 0.38
    g.current.rotation.y += (target - g.current.rotation.y) * 0.05
  })
  return <group ref={g} position={[0.1, 0.75, 0]}>{children}</group>
}

function Section({ progress }: { progress: MotionValue<number> }) {
  const mats = useMemo(() => ({
    soil: new THREE.MeshStandardMaterial({ map: grainTexture('#d6c7a6', 0.22), roughness: 1 }),
    base: new THREE.MeshStandardMaterial({ map: grainTexture('#a59d8c', 0.35), roughness: 1 }),
    steel: new THREE.MeshStandardMaterial({ color: '#5a4a3f', metalness: 0.7, roughness: 0.45 }),
    shell: new THREE.MeshStandardMaterial({ map: grainTexture('#a7a6a0', 0.25), roughness: 0.95 }),
    plaster: new THREE.MeshStandardMaterial({ color: '#f1f0ea', roughness: 0.6 }),
    tile: new THREE.MeshStandardMaterial({ map: tileTexture(), roughness: 0.25 }),
    coping: new THREE.MeshStandardMaterial({ map: grainTexture('#f1ece1', 0.08), roughness: 0.7 }),
    water: new THREE.MeshPhysicalMaterial({ color: '#56b9c1', transparent: true, opacity: 0.5, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.08, depthWrite: false }),
  }), [])
  return (
    <Rig progress={progress}>
      {/* the ground, with the pool's cavity */}
      <Layer box={[1.2, 3.4, -3.0, 0]} mat={mats.soil} at={[-1, -0.5]} progress={progress} />
      <Layer box={[-3.2, 1.2, -3.0, -2.3]} mat={mats.soil} at={[-1, -0.5]} progress={progress} />
      <Layer box={[-3.2, 1.2, -2.3, 0]} mat={mats.soil} at={[0.14, 0.26]} progress={progress} lift />
      <Layer box={[-3.2, 1.2, -2.3, -2.2]} mat={mats.base} at={[0.22, 0.3]} progress={progress} />
      <Steel progress={progress} mat={mats.steel} />
      <Layer box={[-3.2, 1.2, -2.2, -1.85]} mat={mats.shell} at={[0.42, 0.52]} progress={progress} from={1.0} />
      <Layer box={[0.85, 1.2, -1.85, 0]} mat={mats.shell} at={[0.44, 0.54]} progress={progress} from={1.0} />
      <Layer box={[-3.2, 0.85, -1.85, -1.8]} mat={mats.plaster} at={[0.6, 0.66]} progress={progress} from={0.6} />
      <Layer box={[0.8, 0.85, -1.8, -0.36]} mat={mats.plaster} at={[0.61, 0.67]} progress={progress} from={0.6} />
      <Layer box={[0.79, 0.85, -0.36, 0]} mat={mats.tile} at={[0.64, 0.7]} progress={progress} from={0.6} />
      <Layer box={[0.55, 2.3, 0, 0.17]} mat={mats.coping} at={[0.68, 0.76]} progress={progress} from={0.8} />
      <Water progress={progress} mat={mats.water} />
    </Rig>
  )
}

export default function AnatomyScene({ progress, active, still }: { progress: MotionValue<number>; active: boolean; still: boolean }) {
  const coarse = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches
  return (
    <Canvas frameloop={still ? 'demand' : active ? 'always' : 'never'} dpr={coarse ? [1, 1.25] : [1, 1.5]} gl={{ antialias: !coarse, alpha: true }} shadows camera={{ position: [8.2, 5.2, 11.4], fov: 30 }} onCreated={({ camera }) => camera.lookAt(-0.1, -1.2, 0)}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 5, 3]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.2} position={[-6, 2, 2]} scale={[4, 6, 1]} color="#f4efe4" />
        <Lightformer intensity={0.8} position={[6, 1, -2]} scale={[4, 4, 1]} color="#dff3f3" />
      </Environment>
      <Section progress={progress} />
      <ContactShadows position={[0.4, -2.42, 0]} opacity={0.35} scale={12} blur={2.6} far={3} frames={1} />
    </Canvas>
  )
}
