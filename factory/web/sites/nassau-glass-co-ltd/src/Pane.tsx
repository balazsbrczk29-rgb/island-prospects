// The sheet of glass. One studio-lit pane whose thickness and tint follow the visitor's pick, and which
// separates into the two plies and interlayer of laminated safety glass as the page scrolls.
// No transmission pass: a tint layer plus an additive reflection layer over a transparent canvas, so the
// headline behind it is really seen through the glass and a phone renders it without effort.
import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PerformanceMonitor } from "@react-three/drei"
import * as THREE from "three"
import type { MotionValue } from "motion/react"
import { STOCK, inches, type Pick, type Tint } from "./data"

const W = 1.5, H = 2.0
const ss = (a: number, b: number, v: number) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t) }

function studioTexture() {
  const c = document.createElement("canvas"); c.width = 1024; c.height = 512
  const g = c.getContext("2d")!
  g.fillStyle = "#07100f"; g.fillRect(0, 0, 1024, 512)
  const strips: [number, number, number][] = [[0.06, 0.05, 1], [0.2, 0.018, 0.7], [0.41, 0.085, 1], [0.6, 0.02, 0.75], [0.78, 0.06, 0.95], [0.93, 0.016, 0.6]]
  for (const [x, w, i] of strips) {
    const cx = x * 1024, hw = w * 1024
    const gr = g.createLinearGradient(cx - hw, 0, cx + hw, 0)
    gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(0.5, `rgba(255,255,255,${i})`); gr.addColorStop(1, "rgba(255,255,255,0)")
    g.fillStyle = gr; g.fillRect(cx - hw, 40, hw * 2, 432)
  }
  const top = g.createLinearGradient(0, 0, 0, 150); top.addColorStop(0, "rgba(220,245,236,.55)"); top.addColorStop(1, "rgba(220,245,236,0)")
  g.fillStyle = top; g.fillRect(0, 0, 1024, 150)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping
  return t
}

// the reflection of the shop's strip lights sliding across the face as the sheet turns
function streakTexture() {
  const c = document.createElement("canvas"); c.width = 512; c.height = 512
  const g = c.getContext("2d")!
  g.fillStyle = "#000"; g.fillRect(0, 0, 512, 512)
  const bands: [number, number, number][] = [[0.14, 0.2, 0.2], [0.33, 0.035, 0.34], [0.62, 0.11, 0.15], [0.84, 0.03, 0.26]]
  for (const [x, w, i] of bands) for (const o of [-512, 0, 512]) {
    const cx = x * 512 + o, hw = w * 512
    const gr = g.createLinearGradient(cx - hw, 0, cx + hw, 0)
    gr.addColorStop(0, "rgba(214,244,234,0)"); gr.addColorStop(0.5, `rgba(214,244,234,${i})`); gr.addColorStop(1, "rgba(214,244,234,0)")
    g.fillStyle = gr; g.fillRect(cx - hw, 0, hw * 2, 512)
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.center.set(0.5, 0.5); t.rotation = -0.42
  return t
}

// what a mirror shows in a bright shop: a pale room with soft light and shadow bands, coloured by the mirror's tint
function roomTexture() {
  const c = document.createElement("canvas"); c.width = 512; c.height = 512
  const g = c.getContext("2d")!
  g.fillStyle = "#d3d9d7"; g.fillRect(0, 0, 512, 512)
  const bands: [number, number, string][] = [[0.18, 0.16, "255,255,255"], [0.5, 0.09, "120,132,128"], [0.76, 0.2, "255,255,255"], [0.95, 0.05, "120,132,128"]]
  for (const [x, w, rgb] of bands) for (const o of [-512, 0, 512]) {
    const cx = x * 512 + o, hw = w * 512
    const gr = g.createLinearGradient(cx - hw, 0, cx + hw, 0)
    gr.addColorStop(0, `rgba(${rgb},0)`); gr.addColorStop(0.5, `rgba(${rgb},.5)`); gr.addColorStop(1, `rgba(${rgb},0)`)
    g.fillStyle = gr; g.fillRect(cx - hw, 0, hw * 2, 512)
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.center.set(0.5, 0.5); t.rotation = -0.42
  return t
}

function Studio() {
  const tex = useMemo(studioTexture, [])
  return (
    <Environment resolution={256} frames={1}>
      <mesh scale={40} rotation={[0.2, 0.6, 0.55]}>
        <sphereGeometry args={[1, 48, 24]} />
        <meshBasicMaterial map={tex} side={THREE.BackSide} toneMapped={false} color={[3.2, 3.2, 3.2] as unknown as THREE.Color} />
      </mesh>
    </Environment>
  )
}

type Mats = { edge: THREE.MeshStandardMaterial; tint: THREE.MeshBasicMaterial; shine: THREE.MeshBasicMaterial; rim: THREE.LineBasicMaterial; silver: THREE.MeshBasicMaterial; inter: THREE.MeshBasicMaterial; none: THREE.MeshBasicMaterial }

function Sheet({ pick, progress, phone, still }: { pick: Pick; progress: MotionValue<number>; phone: boolean; still: boolean }) {
  const rig = useRef<THREE.Group>(null!)
  const front = useRef<THREE.Group>(null!), back = useRef<THREE.Group>(null!)
  const fBox = useRef<THREE.Mesh>(null!), bBox = useRef<THREE.Mesh>(null!)
  const fShine = useRef<THREE.Mesh>(null!), bShine = useRef<THREE.Mesh>(null!)
  const inter = useRef<THREE.Mesh>(null!), mirror = useRef<THREE.Mesh>(null!)
  const cur = useRef({ ply: 0.0125, alpha: 0.07, sep: 0, yaw: -0.6, mirror: 0, inter: 0 })
  const look = useRef({ x: 0, drag: 0, down: false, last: 0 })

  const m = useMemo<Mats>(() => {
    const add = { blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor } as const
    return {
      edge: new THREE.MeshStandardMaterial({ color: "#58b89d", emissive: "#58b89d", emissiveIntensity: 0.55, roughness: 0.22, metalness: 0.15 }),
      tint: new THREE.MeshBasicMaterial({ color: "#bfe9dc", transparent: true, opacity: 0.05, depthWrite: false, toneMapped: false }),
      shine: new THREE.MeshBasicMaterial({ map: streakTexture(), transparent: true, depthWrite: false, toneMapped: false, ...add }),
      rim: new THREE.LineBasicMaterial({ color: "#d6f4ea", transparent: true, opacity: 0.6, toneMapped: false }),
      silver: new THREE.MeshBasicMaterial({ color: "#eef3f2", map: roomTexture(), transparent: true, opacity: 0, toneMapped: false }),
      inter: new THREE.MeshBasicMaterial({ color: "#e8fff6", transparent: true, opacity: 0, depthWrite: false, toneMapped: false }),
      none: new THREE.MeshBasicMaterial({ visible: false }),
    }
  }, [])
  const plyMats = useMemo(() => [m.edge, m.edge, m.edge, m.edge, m.tint, m.none], [m])
  const outline = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(W, H)), [])
  const target = useMemo(() => ({ face: new THREE.Color(), edge: new THREE.Color() }), [])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const l = look.current
      if (e.pointerType === "mouse") l.x = (e.clientX / window.innerWidth - 0.5) * 2
      else if (l.down) { l.drag += (e.clientX - l.last) * 0.006; l.last = e.clientX }
    }
    const down = (e: PointerEvent) => { if (e.pointerType !== "mouse") { look.current.down = true; look.current.last = e.clientX } }
    const up = () => { look.current.down = false }
    window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("pointerdown", down, { passive: true }); window.addEventListener("pointerup", up, { passive: true }); window.addEventListener("pointercancel", up, { passive: true })
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up) }
  }, [])

  useFrame((state, dt) => {
    const p = progress.get(), c = cur.current, l = look.current
    const k = 1 - Math.exp(-dt * 5)
    // what the sheet should be right now: the visitor's pick, or the laminated study once the page scrolls
    const study = ss(0.12, 0.2, p)
    let kind = pick.kind, tint: Tint = STOCK[pick.kind].tints.find(t => t.id === pick.tint) ?? STOCK[pick.kind].tints[0]
    let total = pick.kind === "laminated" ? 0.62 : inches(pick.thick)
    if (study > 0.5) {
      kind = "laminated"; total = 0.62
      const lt = STOCK.laminated.tints
      tint = p < 0.62 ? lt[0] : p < 0.71 ? lt[1] : p < 0.8 ? lt[2] : lt[3]
    }
    const sepT = ss(0.2, 0.4, p) * (1 - ss(0.88, 0.98, p)) * 0.42
    const isMirror = kind === "mirror" ? 1 : 0, isLam = kind === "laminated" ? 1 : 0
    const plyT = (total / 10) * (isLam ? 0.42 : 0.5)
    c.ply += (plyT - c.ply) * k; c.sep += (sepT - c.sep) * k
    c.mirror += (isMirror - c.mirror) * k; c.inter += (isLam - c.inter) * k
    const a = isMirror ? 0.06 : Math.min(0.62, tint.alpha * (0.6 + total * 0.9))
    c.alpha += (a - c.alpha) * k
    target.face.set(isMirror ? "#bfe9dc" : tint.face); target.edge.set(tint.edge)
    m.tint.color.lerp(target.face, k); m.tint.opacity = c.alpha * 0.5
    m.edge.color.lerp(target.edge, k); m.edge.emissive.copy(m.edge.color)
    m.silver.color.lerp(target.face.set(tint.face), k); m.silver.opacity = c.mirror
    mirror.current.visible = c.mirror > 0.02
    const gap = 0.012 * c.inter
    const half = c.ply / 2 + gap / 2 + c.sep
    front.current.position.z = half; back.current.position.z = -half
    fBox.current.scale.z = bBox.current.scale.z = c.ply
    fShine.current.position.z = c.ply / 2 + 0.0008; bShine.current.position.z = c.ply / 2 + 0.0008
    bShine.current.visible = c.sep > 0.02
    inter.current.scale.z = Math.max(0.0005, gap); inter.current.visible = c.inter > 0.02
    m.inter.opacity = 0.16 * c.inter * (1 - study) + 0.62 * ss(0.4, 0.48, p) * (1 - ss(0.58, 0.64, p)) + 0.5 * ss(0.6, 0.66, p)
    m.inter.color.lerp(target.edge.set(study > 0.5 && p >= 0.62 ? tint.edge : study > 0.5 ? "#f6eed6" : "#e8fff6"), k)
    mirror.current.position.z = -(c.ply + gap / 2) - 0.001
    // pose: three-quarter view in the hero, nearer edge-on while the plies are apart
    if (!l.down) l.drag *= 1 - k * 0.6
    const sway = still ? 0 : Math.sin(state.clock.elapsedTime * 0.45) * 0.07
    const open = c.sep / 0.42
    const yawT = THREE.MathUtils.lerp(-0.62 + l.x * 0.22 + l.drag + sway, -1.02 + sway * 0.4, Math.max(study * 0.25, open))
    c.yaw += (yawT - c.yaw) * k
    m.shine.map!.offset.x = c.yaw * 0.55 + c.sep
    m.silver.map!.offset.x = c.yaw * 0.4
    m.shine.color.setScalar((0.75 + Math.abs(Math.sin(c.yaw)) * 0.7) * (1 - c.mirror * 0.6))
    m.rim.color.copy(m.edge.color).lerp(target.face.set("#ffffff"), 0.55)
    rig.current.rotation.set(0.15 + open * 0.06, c.yaw, phone ? Math.PI / 2 : 0)
    // phone: the sheet sits in the top of a taller canvas for the hero, then grows into all of it for the study
    const grow = ss(0.08, 0.22, p)
    rig.current.position.y = phone ? THREE.MathUtils.lerp(0.34, 0, grow) : 0
    rig.current.scale.setScalar(phone ? THREE.MathUtils.lerp(0.6, 0.86, grow) : 1 - open * 0.12)
  })

  return (
    <group ref={rig}>
      <mesh ref={mirror} material={m.silver} renderOrder={0} visible={false}><planeGeometry args={[W, H]} /></mesh>
      <group ref={back}>
        <mesh ref={bBox} material={plyMats} renderOrder={1}><boxGeometry args={[W, H, 1]} /></mesh>
        <mesh ref={bShine} material={m.shine} renderOrder={4} visible={false}><planeGeometry args={[W, H]} /><lineSegments geometry={outline} material={m.rim} /></mesh>
      </group>
      <mesh ref={inter} material={[m.edge, m.edge, m.edge, m.edge, m.inter, m.none]} renderOrder={2} visible={false}><boxGeometry args={[W * 0.998, H * 0.998, 1]} /></mesh>
      <group ref={front}>
        <mesh ref={fBox} material={plyMats} renderOrder={3}><boxGeometry args={[W, H, 1]} /></mesh>
        <mesh ref={fShine} material={m.shine} renderOrder={5}><planeGeometry args={[W, H]} /><lineSegments geometry={outline} material={m.rim} renderOrder={6} /></mesh>
      </group>
    </group>
  )
}

export default function Pane({ pick, progress, active, phone, onReady }: { pick: Pick; progress: MotionValue<number>; active: boolean; phone: boolean; onReady?: () => void }) {
  const [dpr, setDpr] = useState(phone ? 1.25 : 1.5)
  const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  return (
    <Canvas dpr={dpr} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, phone ? 4.2 : 5.7], fov: 26 }}
      gl={{ alpha: true, antialias: !phone, powerPreference: "high-performance" }} onCreated={() => onReady?.()}
      style={{ touchAction: "pan-y" }} aria-hidden>
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Studio />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <Sheet pick={pick} progress={progress} phone={phone} still={still} />
    </Canvas>
  )
}
