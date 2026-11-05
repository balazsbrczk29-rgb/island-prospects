// Signature visual: a fanned stack of the documents BBSL's equipment and Document Centre actually produce,
// each sheet drawn from a line on bbsl.com: a colour proof (digital on-demand printing), an architectural
// plan (architectural and engineering services), an NCR point-of-sale receipt, a mailing letter (Neopost
// folder/inserter), a wide-format poster and a scanned, indexed record (OnBase content management).
// Hover or tap a sheet to lift it; the parent shows what BBSL does for that document.
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef, type ReactNode } from "react"
import * as THREE from "three"

export type SheetKind = "proof" | "plan" | "receipt" | "letter" | "poster" | "record"
const INK = "#121417", CYAN = "#0a6d8c", TONER = "#e3b505", GREY = "#8a8d90", SHEET = "#fbfaf6"

function bars(g: CanvasRenderingContext2D, x: number, y: number, w: number, rows: number, gap = 22, h = 7) {
  for (let i = 0; i < rows; i++) { g.fillStyle = i % 5 === 0 ? "#3b3f44" : "#b9bbbd"; g.fillRect(x, y + i * gap, w * (0.55 + ((i * 37) % 40) / 100), h) }
}

function draw(kind: SheetKind, W: number, H: number) {
  const c = document.createElement("canvas"); c.width = W; c.height = H
  const g = c.getContext("2d")!
  g.fillStyle = SHEET; g.fillRect(0, 0, W, H)
  g.textBaseline = "top"
  if (kind === "proof") {
    const sw = (W - 80) / 8; [INK, CYAN, TONER, "#3b3f44", "#6b6e72", "#9a9c9f", "#c4c5c6", "#e2e2e2"].forEach((col, i) => { g.fillStyle = col; g.fillRect(40 + i * sw, 40, sw - 4, 44) })
    g.fillStyle = INK; g.font = "italic 120px 'Instrument Serif', Georgia, serif"; g.fillText("Proof", 40, 130)
    g.fillStyle = CYAN; g.fillRect(40, 300, W - 80, 260)
    g.fillStyle = SHEET; g.font = "28px 'Geist Mono', monospace"; g.fillText("CYAN 100", 64, 320)
    bars(g, 40, 600, W - 80, 14)
    g.strokeStyle = INK; g.lineWidth = 2; for (const [x, y] of [[W - 70, H - 70]]) { g.beginPath(); g.arc(x, y, 22, 0, Math.PI * 2); g.moveTo(x - 34, y); g.lineTo(x + 34, y); g.moveTo(x, y - 34); g.lineTo(x, y + 34); g.stroke() }
  }
  if (kind === "plan") {
    g.fillStyle = "#eef3f5"; g.fillRect(0, 0, W, H)
    g.strokeStyle = CYAN; g.lineWidth = 1; for (let x = 0; x < W; x += 32) { g.globalAlpha = .25; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke() } for (let y = 0; y < H; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke() }
    g.globalAlpha = 1; g.lineWidth = 6; g.strokeStyle = INK
    g.strokeRect(70, 90, W - 140, H - 260); g.beginPath(); g.moveTo(70, 420); g.lineTo(380, 420); g.moveTo(380, 90); g.lineTo(380, 640); g.moveTo(380, 520); g.lineTo(W - 70, 520); g.stroke()
    g.lineWidth = 2; g.beginPath(); g.arc(380, 330, 70, Math.PI, Math.PI * 1.5); g.stroke()
    g.fillStyle = INK; g.font = "26px 'Geist Mono', monospace"; g.fillText("SHEET A-101", 70, H - 140); g.fillText("SCALE 1:100", W - 290, H - 140)
  }
  if (kind === "receipt") {
    g.fillStyle = INK; g.font = "bold 44px 'Geist Mono', monospace"; g.textAlign = "center"; g.fillText("RECEIPT", W / 2, 60)
    g.font = "30px 'Geist Mono', monospace"; for (let i = 0; i < 16; i++) { g.textAlign = "left"; g.fillText(["ITEM", "QTY", "SUB", "TAX"][i % 4] + " ......", 40, 160 + i * 52); g.textAlign = "right"; g.fillText(((i * 7.31) % 40 + 1).toFixed(2), W - 40, 160 + i * 52) }
    g.fillRect(40, H - 230, W - 80, 4); g.textAlign = "center"; g.font = "bold 40px 'Geist Mono', monospace"; g.fillText("THANK YOU", W / 2, H - 190)
    for (let i = 0; i < 40; i++) { g.fillRect(60 + i * ((W - 120) / 40), H - 110, (i % 3) + 2, 70) }
  }
  if (kind === "letter") {
    g.strokeStyle = GREY; g.lineWidth = 2; g.strokeRect(60, 150, 360, 130)
    g.fillStyle = INK; g.font = "24px 'Geist Mono', monospace"; g.fillText("ADDRESS WINDOW", 80, 170)
    g.font = "italic 64px 'Instrument Serif', Georgia, serif"; g.fillText("Dear client,", 60, 360)
    bars(g, 60, 470, W - 120, 18, 26, 8)
    g.setLineDash([12, 10]); g.strokeStyle = CYAN; g.beginPath(); g.moveTo(0, H / 3); g.lineTo(W, H / 3); g.moveTo(0, (2 * H) / 3); g.lineTo(W, (2 * H) / 3); g.stroke()
  }
  if (kind === "poster") {
    g.fillStyle = INK; g.fillRect(0, 0, W, H)
    g.fillStyle = SHEET; g.font = "italic 520px 'Instrument Serif', Georgia, serif"; g.fillText("B", 40, 40)
    g.fillStyle = TONER; g.fillRect(40, H - 230, W - 80, 10)
    g.fillStyle = SHEET; g.font = "34px 'Geist Mono', monospace"; g.fillText("WIDE FORMAT · COLOUR", 40, H - 190)
  }
  if (kind === "record") {
    g.fillStyle = "#e9e6dd"; g.fillRect(0, 0, W, 120)
    g.fillStyle = INK; g.font = "28px 'Geist Mono', monospace"; g.fillText("DOC 000231 · INDEXED", 40, 46)
    g.fillStyle = CYAN; g.fillRect(W - 150, 36, 110, 48)
    bars(g, 40, 180, W - 80, 22)
    g.strokeStyle = TONER; g.lineWidth = 8; g.globalAlpha = .8; g.beginPath(); g.moveTo(40, 470); g.lineTo(W - 140, 470); g.stroke()
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8
  return t
}

const SHEETS: { kind: SheetKind; w: number; h: number; px: [number, number] }[] = [
  { kind: "poster", w: 2.0, h: 2.8, px: [640, 896] },
  { kind: "plan", w: 2.3, h: 1.7, px: [900, 666] },
  { kind: "record", w: 1.7, h: 2.2, px: [640, 828] },
  { kind: "letter", w: 1.7, h: 2.2, px: [640, 828] },
  { kind: "receipt", w: 0.85, h: 2.5, px: [340, 1000] },
  { kind: "proof", w: 1.7, h: 2.2, px: [640, 828] },
]

function Paper({ i, kind, w, h, px, active, onPick }: { i: number; kind: SheetKind; w: number; h: number; px: [number, number]; active: SheetKind | null; onPick: (k: SheetKind | null) => void }) {
  const ref = useRef<THREE.Group>(null!)
  const map = useMemo(() => draw(kind, px[0], px[1]), [kind, px])
  const geo = useMemo(() => {
    const gm = new THREE.PlaneGeometry(w, h, 24, 24)
    const p = gm.attributes.position
    for (let k = 0; k < p.count; k++) { const x = p.getX(k), y = p.getY(k); p.setZ(k, 0.05 * Math.sin((x / w) * Math.PI) + 0.03 * (y / h) ** 2) }
    gm.computeVertexNormals(); return gm
  }, [w, h])
  const n = SHEETS.length
  const base = (i - (n - 1) / 2)
  useFrame(({ clock }, d) => {
    const t = clock.elapsedTime
    const lifted = active === kind
    const spread = 0.62 + Math.sin(t * 0.35) * 0.06
    const g = ref.current
    const tx = base * spread * 1.05, ty = (lifted ? 0.55 : 0) + Math.sin(t * 0.8 + i) * 0.04, tz = i * 0.05 + (lifted ? 0.6 : 0)
    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 4, d)
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 4, d)
    g.position.z = THREE.MathUtils.damp(g.position.z, tz, 4, d)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -base * 0.11 + Math.sin(t * 0.5 + i) * 0.015, 4, d)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, lifted ? 0 : base * -0.05, 4, d)
  })
  return (
    <group ref={ref} position={[base * 0.2, -3, i * 0.05]}>
      <mesh geometry={geo} castShadow receiveShadow
        onPointerOver={e => { e.stopPropagation(); onPick(kind); document.body.style.cursor = "pointer" }}
        onPointerOut={() => { document.body.style.cursor = "" }}
        onClick={e => { e.stopPropagation(); onPick(kind) }}>
        <meshStandardMaterial map={map} roughness={0.92} metalness={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { viewport } = useThree()
  const wide = viewport.aspect > 1.3
  const scale = wide ? 0.86 : Math.min(1.1, viewport.width / 5.6)
  return <group position={[wide ? viewport.width * 0.3 : 0, wide ? -0.05 : 0, 0]} scale={scale}>{children}</group>
}

function Rig() {
  const { camera, pointer } = useThree()
  useFrame((_, d) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.6, 2, d)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.4 + pointer.y * 0.35, 2, d)
    camera.lookAt(0, 0.1, 0)
  })
  return null
}

export default function Scene({ active, onPick }: { active: SheetKind | null; onPick: (k: SheetKind | null) => void }) {
  return (
    <Canvas shadows dpr={[1, 1.8]} camera={{ position: [0, 0.4, 7.4], fov: 34 }} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }} onPointerMissed={() => onPick(null)} aria-hidden>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#ffffff", "#d8d2c4", 0.6]} />
      <directionalLight position={[3.5, 5, 6]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
      <Layout>
        <group rotation={[-0.08, 0, 0]}>
          {SHEETS.map((s, i) => <Paper key={s.kind} i={i} {...s} active={active} onPick={onPick} />)}
        </group>
      </Layout>
      <mesh position={[0, 0, -0.25]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <shadowMaterial opacity={0.12} />
      </mesh>
      <Rig />
    </Canvas>
  )
}
