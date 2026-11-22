// Studio-lit procedural counter kit (Razor POS terminals, printers, drawers, router, access point, backup unit).
// Built on the ModelStage recipe's studio lighting. Objects for up to 8 stations are always mounted and spring in or out.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export type Kind = 'fnb' | 'retail' | 'office'
export type KitState = { kind: Kind; count: number; wifi: boolean; backup: boolean }

const white = { color: '#f3f1ec', roughness: 0.38, metalness: 0, clearcoat: 0.6, clearcoatRoughness: 0.25 }
const alu = { color: '#c9ccd0', roughness: 0.32, metalness: 0.85 }
const dark = { color: '#1c1f22', roughness: 0.5, metalness: 0.1 }
const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function screenTexture(wide: boolean) {
  const c = document.createElement('canvas'); c.width = 512; c.height = wide ? 288 : 384
  const g = c.getContext('2d')!
  g.fillStyle = '#10181a'; g.fillRect(0, 0, c.width, c.height)
  if (wide) {
    g.fillStyle = '#2f6f73'; g.fillRect(0, 0, c.width, 26)
    g.fillStyle = '#e9efee'; for (let i = 0; i < 6; i++) g.fillRect(24, 50 + i * 36, 300 - (i % 3) * 60, 14)
    g.fillStyle = '#3d8c90'; g.fillRect(352, 50, 136, 200)
  } else {
    const cols = 4, rows = 4, pad = 14, w = (330 - pad * (cols + 1)) / cols, h = (c.height - 60 - pad * (rows + 1)) / rows
    const tones = ['#2f6f73', '#3d8c90', '#d9c9a6', '#e9efee']
    for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) { g.fillStyle = tones[(r + k) % 4]; g.fillRect(pad + k * (w + pad), 46 + pad + r * (h + pad), w, h) }
    g.fillStyle = '#e9efee'; g.fillRect(360, 60, 136, 18); g.fillRect(360, 92, 110, 14); g.fillRect(360, 116, 120, 14)
    g.fillStyle = '#2f6f73'; g.fillRect(360, c.height - 70, 136, 48)
    g.fillStyle = '#e9efee'; g.fillRect(14, 14, 120, 18)
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t
}

/** Springs a child in when `on`, sinks and shrinks it when off. */
function Slot({ on, pos, delay = 0, children }: { on: boolean; pos: [number, number, number]; delay?: number; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null!)
  const t0 = useRef(0); const was = useRef(on)
  const s = useRef(reduce ? (on ? 1 : 0) : 0); const lift = useRef(reduce ? 0 : 0.35)
  useFrame((st, dt) => {
    if (on !== was.current) { was.current = on; t0.current = st.clock.elapsedTime }
    const wait = on && st.clock.elapsedTime - t0.current < delay
    const target = on && !wait ? 1 : 0
    const k = reduce ? 1 : 1 - Math.pow(0.0008, dt)
    s.current += (target - s.current) * k
    lift.current += ((target ? 0 : 0.35) - lift.current) * k
    const v = Math.max(0.001, s.current)
    g.current.scale.setScalar(v); g.current.visible = s.current > 0.01
    g.current.position.set(pos[0], pos[1] + lift.current, pos[2])
  })
  return <group ref={g} position={pos}>{children}</group>
}

function Terminal({ tex }: { tex: THREE.Texture }) {
  return (
    <group>
      <RoundedBox args={[0.42, 0.04, 0.3]} radius={0.015} position={[0, 0.02, 0]} castShadow><meshPhysicalMaterial {...alu} /></RoundedBox>
      <mesh position={[0, 0.2, -0.02]} rotation={[-0.25, 0, 0]} castShadow><cylinderGeometry args={[0.035, 0.045, 0.36, 24]} /><meshPhysicalMaterial {...alu} /></mesh>
      <group position={[0, 0.42, 0.02]} rotation={[-0.32, 0, 0]}>
        <RoundedBox args={[0.62, 0.46, 0.045]} radius={0.02} castShadow><meshPhysicalMaterial {...white} /></RoundedBox>
        <mesh position={[0, 0.005, 0.024]}><planeGeometry args={[0.56, 0.4]} /><meshStandardMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.55} roughness={0.15} /></mesh>
      </group>
    </group>
  )
}
function Monitor({ tex }: { tex: THREE.Texture }) {
  return (
    <group>
      <RoundedBox args={[0.3, 0.03, 0.22]} radius={0.012} position={[0, 0.015, -0.05]} castShadow><meshPhysicalMaterial {...alu} /></RoundedBox>
      <mesh position={[0, 0.22, -0.08]} castShadow><boxGeometry args={[0.06, 0.4, 0.03]} /><meshPhysicalMaterial {...alu} /></mesh>
      <group position={[0, 0.5, -0.04]}>
        <RoundedBox args={[0.86, 0.5, 0.035]} radius={0.015} castShadow><meshPhysicalMaterial {...dark} /></RoundedBox>
        <mesh position={[0, 0.01, 0.019]}><planeGeometry args={[0.82, 0.44]} /><meshStandardMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.5} roughness={0.15} /></mesh>
      </group>
      <RoundedBox args={[0.5, 0.018, 0.16]} radius={0.008} position={[0, 0.01, 0.24]} castShadow><meshPhysicalMaterial {...white} /></RoundedBox>
    </group>
  )
}
function Printer() {
  return (
    <group>
      <RoundedBox args={[0.2, 0.17, 0.26]} radius={0.03} position={[0, 0.085, 0]} castShadow><meshPhysicalMaterial {...white} /></RoundedBox>
      <mesh position={[0, 0.172, 0.02]}><boxGeometry args={[0.14, 0.004, 0.12]} /><meshStandardMaterial color="#2a2d30" roughness={0.6} /></mesh>
      <mesh position={[0, 0.2, 0.08]} rotation={[-0.5, 0, 0]}><planeGeometry args={[0.12, 0.08]} /><meshStandardMaterial color="#fbfaf7" side={THREE.DoubleSide} roughness={0.9} /></mesh>
    </group>
  )
}
function Drawer() {
  return (
    <group>
      <RoundedBox args={[0.46, 0.1, 0.42]} radius={0.015} position={[0, 0.05, 0]} castShadow><meshPhysicalMaterial {...dark} /></RoundedBox>
      <mesh position={[0, 0.06, 0.212]}><boxGeometry args={[0.16, 0.012, 0.004]} /><meshPhysicalMaterial {...alu} /></mesh>
    </group>
  )
}
function Pulse({ color, pos, size = 0.012 }: { color: string; pos: [number, number, number]; size?: number }) {
  const m = useRef<THREE.MeshStandardMaterial>(null!)
  useFrame(st => { m.current.emissiveIntensity = reduce ? 1.4 : 0.6 + 1.2 * (0.5 + 0.5 * Math.sin(st.clock.elapsedTime * Math.PI)) })
  return <mesh position={pos}><sphereGeometry args={[size, 16, 16]} /><meshStandardMaterial ref={m} color={color} emissive={color} emissiveIntensity={1} /></mesh>
}
function Router() {
  return (
    <group>
      <RoundedBox args={[0.44, 0.07, 0.28]} radius={0.02} position={[0, 0.035, 0]} castShadow><meshPhysicalMaterial {...white} /></RoundedBox>
      {[-0.15, -0.09, -0.03, 0.03].map(x => <mesh key={x} position={[x, 0.036, 0.141]}><boxGeometry args={[0.045, 0.03, 0.004]} /><meshStandardMaterial color="#2a2d30" /></mesh>)}
      <Pulse color="#4fc3a1" pos={[0.17, 0.05, 0.142]} />
    </group>
  )
}
function Backup() {
  return (
    <group>
      <RoundedBox args={[0.24, 0.3, 0.3]} radius={0.025} position={[0, 0.15, 0]} castShadow><meshPhysicalMaterial {...dark} /></RoundedBox>
      {[0.07, 0.13, 0.19].map(y => <mesh key={y} position={[0, y + 0.04, 0.151]}><boxGeometry args={[0.16, 0.035, 0.003]} /><meshPhysicalMaterial {...alu} /></mesh>)}
      <Pulse color="#7fd3d6" pos={[0.08, 0.27, 0.152]} />
    </group>
  )
}
function AccessPoint() {
  return (
    <group>
      <mesh rotation={[Math.PI, 0, 0]}><cylinderGeometry args={[0.2, 0.22, 0.05, 48]} /><meshPhysicalMaterial {...white} /></mesh>
      <Pulse color="#7fd3d6" pos={[0, -0.028, 0]} size={0.01} />
    </group>
  )
}

function Rig({ s }: { s: KitState }) {
  const termTex = useMemo(() => screenTexture(false), [])
  const monTex = useMemo(() => screenTexture(true), [])
  const pitch = s.kind === 'office' ? 1.05 : 0.95
  const xs = (n: number, i: number) => (i - (n - 1) / 2) * pitch - 0.45
  const aps = s.wifi ? Math.ceil(s.count / 4) : 0
  const camTarget = useRef(new THREE.Vector3())
  const { camera, size } = useThree()
  useFrame(() => {
    const span = s.count * pitch + 2.4
    const aspect = size.width / size.height
    const dist = Math.max(2.3, (span / aspect) * 0.86 + 0.95)
    camTarget.current.set(0.6, 1.0 + dist * 0.34, dist)
    camera.position.lerp(camTarget.current, reduce ? 1 : 0.06)
    camera.lookAt(0.15, 0.5, 0.1)
  })
  return (
    <group>
      {/* counter top */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[60, 60]} /><shadowMaterial opacity={0.12} /></mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const on = i < s.count; const x = on ? xs(s.count, i) : xs(Math.max(s.count, i + 1), i)
        return (
          <group key={i}>
            <Slot on={on && s.kind !== 'office'} pos={[x, 0, -0.05]} delay={i * 0.06}><Terminal tex={termTex} /></Slot>
            <Slot on={on && s.kind === 'office'} pos={[x, 0, -0.05]} delay={i * 0.06}><Monitor tex={monTex} /></Slot>
            <Slot on={on && s.kind === 'retail'} pos={[x, 0, 0.42]} delay={0.1 + i * 0.06}><Drawer /></Slot>
            <Slot on={on && s.kind !== 'office'} pos={[x + 0.4, s.kind === 'retail' ? 0 : 0, s.kind === 'retail' ? -0.15 : 0.12]} delay={0.15 + i * 0.06}><Printer /></Slot>
          </group>
        )
      })}
      <Slot on={s.kind === 'fnb'} pos={[xs(s.count, 0) - 0.75, 0, -0.35]} delay={0.2}><Printer /></Slot>
      {/* network corner */}
      <Slot on pos={[xs(s.count, s.count - 1) + 1.15, 0, -0.25]} delay={0.25}><Router /></Slot>
      <Slot on={s.backup} pos={[xs(s.count, s.count - 1) + 1.2, 0, 0.25]} delay={0.3}><Backup /></Slot>
      {[0, 1].map(i => <Slot key={i} on={i < aps} pos={[aps === 2 ? (i ? 1.2 : -1.4) : -0.1, 1.3, -0.7]} delay={0.35 + i * 0.08}><AccessPoint /></Slot>)}
    </group>
  )
}

export default function Kit3D({ s, onReady }: { s: KitState; onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = wrap.current; if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting)); io.observe(el); return () => io.disconnect()
  }, [])
  const coarse = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches
  return (
    <div ref={wrap} className="kit3d" aria-hidden="true">
      <Canvas shadows dpr={coarse ? [1, 1.25] : [1, 1.5]} frameloop={inView ? 'always' : 'never'} camera={{ position: [0.5, 2.2, 5.2], fov: 30 }}
        gl={{ alpha: true, antialias: !coarse, toneMapping: THREE.ACESFilmicToneMapping, preserveDrawingBuffer: true }}
        onCreated={() => requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()))}>
        <Rig s={s} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.4} color="#ffffff" position={[3, 4, 3]} scale={[6, 3, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1.2} color="#e8eefc" position={[-4, 2, -2]} scale={[4, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="ring" intensity={0.8} color="#ffffff" position={[0, 6, -6]} scale={4} target={[0, 0, 0]} />
        </Environment>
        <directionalLight position={[3, 6, 4]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.62} scale={14} blur={2} far={1.6} />
      </Canvas>
    </div>
  )
}
