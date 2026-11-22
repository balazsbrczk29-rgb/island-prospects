// Screen 2 showpiece (kept from the Nov 5 concept): a fanned stack of six documents, one for each BBSL product line:
// colour proof (Xerox), receipt (NCR), indexed record (OnBase), port map (Lenovo & HP, networking), address-window
// letter (Neopost), access log (security). Pick a sheet to lift it; the index beside it shows that line.
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef, type ReactNode } from "react"
import * as THREE from "three"

export type SheetKind = "proof" | "network" | "receipt" | "letter" | "access" | "record"
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
  if (kind === "network") {
    // a port map and rack sheet, the kind of drawing that comes with a Lenovo/HP install and structured cabling
    g.fillStyle = INK; g.font = "28px 'Geist Mono', monospace"; g.fillText("RACK 01 · PORT MAP", 50, 50)
    for (let r = 0; r < 6; r++) { g.strokeStyle = INK; g.lineWidth = 2; g.strokeRect(50, 120 + r * 70, W - 100, 52)
      for (let p = 0; p < 12; p++) { g.fillStyle = (p + r) % 5 === 0 ? CYAN : "#c4c5c6"; g.fillRect(70 + p * ((W - 160) / 12), 134 + r * 70, 26, 24) } }
    g.strokeStyle = CYAN; g.lineWidth = 3; g.beginPath(); g.moveTo(90, 580); g.bezierCurveTo(200, 700, 380, 520, W - 90, 720); g.stroke()
    bars(g, 50, H - 200, W - 100, 6, 26, 7)
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
  if (kind === "access") {
    g.fillStyle = INK; g.font = "28px 'Geist Mono', monospace"; g.fillText("ACCESS LOG · DOOR 2", 40, 50)
    g.fillRect(40, 100, W - 80, 2)
    g.font = "24px 'Geist Mono', monospace"
    for (let i = 0; i < 14; i++) { const hh = String(7 + Math.floor(i / 2)).padStart(2, "0"), mm = String((i * 17) % 60).padStart(2, "0")
      g.fillStyle = INK; g.fillText(`${hh}:${mm}`, 40, 130 + i * 48); g.fillStyle = "#6b6e72"; g.fillText(`BADGE ${(1040 + i * 37) % 9000}`, 170, 130 + i * 48)
      g.fillStyle = i === 9 ? TONER : CYAN; g.fillRect(W - 120, 132 + i * 48, 70, 22) }
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
  { kind: "access", w: 1.7, h: 2.2, px: [640, 828] },
  { kind: "network", w: 1.7, h: 2.2, px: [640, 828] },
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
        onPointerOver={e => { e.stopPropagation(); document.body.style.cursor = "pointer" }}
        onPointerOut={() => { document.body.style.cursor = "" }}
        onClick={e => { e.stopPropagation(); onPick(kind) }}>
        <meshStandardMaterial map={map} roughness={0.92} metalness={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { viewport } = useThree()
  const scale = Math.min(1.05, viewport.width / 6.2)
  return <group scale={scale}>{children}</group>
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

export default function Scene({ active, onPick, run }: { active: SheetKind | null; onPick: (k: SheetKind | null) => void; run: boolean }) {
  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  return (
    <Canvas frameloop={run ? "always" : "never"} shadows={!coarse} dpr={coarse ? [1, 1.25] : [1, 1.5]} camera={{ position: [0, 0.4, 7.4], fov: 34 }} gl={{ antialias: !coarse, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}  aria-hidden>
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
