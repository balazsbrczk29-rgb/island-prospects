import { useLayoutEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, Lightformer, Html } from "@react-three/drei"
import * as THREE from "three"
import type { MotionValue } from "motion/react"
import { LAYERS, type Finish } from "./data"

// A two-storey Bahamian commercial block in white render with louvred shutters and a parapet,
// carrying a real flat-roof assembly. `progress` (0..1) lifts the roof apart layer by layer.

const W = 9, D = 6, H = 3.6, PARAPET = 0.55
const THICK = [0.2, 0.03, 0.34, 0.07, 0.035] // deck, vapour, insulation, cover, membrane
const IN = 0.18 // parapet wall thickness

type Props = { progress?: MotionValue<number>; finish?: Finish["key"]; labels?: boolean; still?: number; active?: (i: number) => void; spin?: boolean }

function smooth(t: number) { const x = Math.min(1, Math.max(0, t)); return x * x * (3 - 2 * x) }

function Shutters() {
  const ref = useRef<THREE.InstancedMesh>(null!)
  const items = useMemo(() => {
    const out: THREE.Matrix4[] = []
    const cols = 5, floors = 2
    for (let f = 0; f < floors; f++) for (let c = 0; c < cols; c++) {
      const x = -W / 2 + 0.95 + c * ((W - 1.9) / (cols - 1))
      const y = 0.75 + f * 1.65
      for (const side of [-1, 1]) for (let s = 0; s < 8; s++) {
        const m = new THREE.Matrix4()
        const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.5, 0, 0))
        m.compose(new THREE.Vector3(x + side * 0.23, y + s * 0.12, D / 2 + 0.05), q, new THREE.Vector3(1, 1, 1))
        out.push(m)
      }
    }
    return out
  }, [])
  useLayoutEffect(() => { items.forEach((m, i) => ref.current.setMatrixAt(i, m)); ref.current.instanceMatrix.needsUpdate = true }, [items])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow>
      <boxGeometry args={[0.44, 0.1, 0.015]} />
      <meshStandardMaterial color="#F7F5EF" roughness={0.6} />
    </instancedMesh>
  )
}

function Body() {
  const render = <meshStandardMaterial color="#F4F1EA" roughness={0.85} />
  const windows = []
  for (let f = 0; f < 2; f++) for (let c = 0; c < 5; c++) {
    const x = -W / 2 + 0.95 + c * ((W - 1.9) / 4)
    windows.push(
      <mesh key={`w${f}${c}`} position={[x, 1.2 + f * 1.65, D / 2 + 0.005]}>
        <boxGeometry args={[0.9, 1.05, 0.02]} />
        <meshPhysicalMaterial color="#163847" roughness={0.12} metalness={0.1} clearcoat={1} />
      </mesh>,
    )
  }
  return (
    <group>
      <mesh position={[0, H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        {render}
      </mesh>
      {/* floor band */}
      <mesh position={[0, 1.95, D / 2 + 0.03]}>
        <boxGeometry args={[W + 0.04, 0.12, 0.06]} />
        <meshStandardMaterial color="#DCD6CA" roughness={0.9} />
      </mesh>
      {windows}
      <Shutters />
      {/* parapet walls */}
      {[
        [0, D / 2 - IN / 2, W, IN], [0, -D / 2 + IN / 2, W, IN],
      ].map(([x, z, w, d], i) => (
        <mesh key={`pz${i}`} position={[x, H + PARAPET / 2, z]} castShadow>
          <boxGeometry args={[w, PARAPET, d]} />
          {render}
        </mesh>
      ))}
      {[[W / 2 - IN / 2], [-W / 2 + IN / 2]].map(([x], i) => (
        <mesh key={`px${i}`} position={[x, H + PARAPET / 2, 0]} castShadow>
          <boxGeometry args={[IN, PARAPET, D]} />
          {render}
        </mesh>
      ))}
    </group>
  )
}

function finishMaterial(f: Finish["key"]) {
  switch (f) {
    case "pvc": return { color: "#E2E7E6", roughness: 0.38, metalness: 0, clearcoat: 0.3 }
    case "modbit": return { color: "#36383B", roughness: 0.97, metalness: 0, clearcoat: 0 }
    case "metal": return { color: "#8C99A2", roughness: 0.34, metalness: 0.75, clearcoat: 0 }
    case "liquid": return { color: "#9AA1A5", roughness: 0.22, metalness: 0, clearcoat: 1 }
    default: return { color: "#FFFFFF", roughness: 0.32, metalness: 0, clearcoat: 0.45 }
  }
}

function Membrane({ finish }: { finish: Finish["key"] }) {
  const w = W - IN * 2, d = D - IN * 2
  const m = finishMaterial(finish)
  const seams: number[] = []
  const step = finish === "metal" ? 0.42 : 1.4
  for (let x = -w / 2 + step; x < w / 2; x += step) seams.push(x)
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, THICK[4], d]} />
        <meshPhysicalMaterial {...m} />
      </mesh>
      {finish !== "liquid" && seams.map((x, i) => (
        <mesh key={i} position={[x, THICK[4] / 2 + (finish === "metal" ? 0.035 : 0.004), 0]}>
          <boxGeometry args={[finish === "metal" ? 0.03 : 0.09, finish === "metal" ? 0.07 : 0.008, d]} />
          <meshPhysicalMaterial {...m} color={finish === "modbit" ? "#2A2B2D" : m.color} roughness={m.roughness * 0.9} />
        </mesh>
      ))}
    </group>
  )
}

function Insulation() {
  const w = W - IN * 2, d = D - IN * 2
  const boards = []
  const bw = w / 6, bd = d / 4
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) boards.push(
    <mesh key={`${i}${j}`} position={[-w / 2 + bw * (i + 0.5), 0, -d / 2 + bd * (j + 0.5)]} castShadow>
      <boxGeometry args={[bw - 0.025, THICK[2], bd - 0.025]} />
      <meshPhysicalMaterial color="#E4D49A" roughness={0.55} metalness={0.35} sheen={0.4} />
    </mesh>,
  )
  return <group>{boards}</group>
}

function Edge() {
  const metal = <meshStandardMaterial color="#C8CDD0" roughness={0.3} metalness={0.9} />
  return (
    <group>
      {[[0, D / 2 - IN / 2, W + 0.1, IN + 0.12], [0, -D / 2 + IN / 2, W + 0.1, IN + 0.12]].map(([x, z, w, d], i) => (
        <mesh key={`cz${i}`} position={[x, 0, z]} castShadow><boxGeometry args={[w, 0.05, d]} />{metal}</mesh>
      ))}
      {[[W / 2 - IN / 2], [-W / 2 + IN / 2]].map(([x], i) => (
        <mesh key={`cx${i}`} position={[x, 0, 0]} castShadow><boxGeometry args={[IN + 0.12, 0.05, D + 0.1]} />{metal}</mesh>
      ))}
      {/* AC curb + unit */}
      <group position={[1.6, 0.05, -0.6]}>
        <mesh castShadow><boxGeometry args={[1.5, 0.22, 1.1]} />{metal}</mesh>
        <mesh position={[0, 0.48, 0]} castShadow>
          <boxGeometry args={[1.35, 0.75, 0.95]} />
          <meshStandardMaterial color="#B9BEC0" roughness={0.45} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.865, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.33, 40]} />
          <meshStandardMaterial color="#26292B" roughness={0.6} metalness={0.4} />
        </mesh>
      </group>
      <group position={[-2.3, 0.05, 0.7]}>
        <mesh castShadow><boxGeometry args={[1.1, 0.22, 0.9]} />{metal}</mesh>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.95, 0.6, 0.75]} />
          <meshStandardMaterial color="#B9BEC0" roughness={0.45} metalness={0.6} />
        </mesh>
      </group>
    </group>
  )
}

function Rig({ progress, finish = "tpo", labels, still, active, spin }: Props) {
  const root = useRef<THREE.Group>(null!)
  const layers = useRef<(THREE.Group | null)[]>([])
  const shown = useRef(-1)
  const baseY = useMemo(() => {
    const ys: number[] = []; let y = H - 0.02
    THICK.forEach(t => { ys.push(y + t / 2); y += t })
    ys.push(H + PARAPET + 0.025) // edge metal on parapet top
    return ys
  }, [])
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  useFrame((state, dt) => {
    const p = still ?? progress?.get() ?? 0
    const e = smooth((p - 0.08) / 0.62) // explode over the first 70 percent
    const back = smooth((p - 0.86) / 0.14) // and settle back at the very end
    const k = e * (1 - back)
    layers.current.forEach((g, i) => { if (g) g.position.y = baseY[i] + k * (0.55 + i * 0.62) })
    const target = (spin && !reduce) ? state.clock.elapsedTime * 0.12 : -0.3 + p * 0.5
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, target, 4, dt)
    const aspect = state.size.width / Math.max(1, state.size.height)
    const dist = (still !== undefined ? 21 : 20.5) * Math.max(1, 1.45 / aspect) * (1 + k * 0.12)
    const cy = 0.32 + k * 0.08
    const tx = 0.62 * dist, tz = 0.7 * dist, ty = cy * dist
    const cam = state.camera.position
    cam.x = THREE.MathUtils.damp(cam.x, tx, 3, dt); cam.y = THREE.MathUtils.damp(cam.y, ty, 3, dt); cam.z = THREE.MathUtils.damp(cam.z, tz, 3, dt)
    state.camera.lookAt(0, 1.6 + k * 2.2, 0)
    const idx = k > 0.12 ? Math.min(LAYERS.length - 1, Math.floor(((p - 0.08) / 0.62) * LAYERS.length)) : -1
    if (idx !== shown.current) { shown.current = idx; active?.(idx) }
  })

  return (
    <group ref={root} position={[0, -1.2, 0]}>
      <Body />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <group key={i} ref={el => { layers.current[i] = el }} position={[0, baseY[i], 0]}>
          {i === 0 && <mesh receiveShadow><boxGeometry args={[W - IN * 2, THICK[0], D - IN * 2]} /><meshStandardMaterial color="#A19E96" roughness={0.95} /></mesh>}
          {i === 1 && <mesh><boxGeometry args={[W - IN * 2, THICK[1], D - IN * 2]} /><meshStandardMaterial color="#2A2D30" roughness={0.5} /></mesh>}
          {i === 2 && <Insulation />}
          {i === 3 && <mesh castShadow><boxGeometry args={[W - IN * 2, THICK[3], D - IN * 2]} /><meshStandardMaterial color="#B6BCB3" roughness={0.85} /></mesh>}
          {i === 4 && <Membrane finish={finish} />}
          {i === 5 && <Edge />}
          {labels && <TagFollower i={i} progress={progress} />}
        </group>
      ))}
    </group>
  )
}

function TagFollower({ i, progress }: { i: number; progress?: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)
  const show = useRef(false)
  useFrame(() => {
    const p = progress?.get() ?? 0
    const k = smooth((p - 0.08) / 0.62) * (1 - smooth((p - 0.86) / 0.14))
    const on = k > 0.25 + i * 0.1
    if (on !== show.current && ref.current) { show.current = on; ref.current.dataset.on = on ? "1" : "0"; ref.current.style.setProperty("--s", on ? "1" : "0"); const t = ref.current.lastElementChild as HTMLElement; t.style.visibility = on ? "visible" : "hidden" }
  })
  return (
    <Html position={[W / 2 + 0.9, 0, D / 2 + 0.2]} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
      <div ref={ref} className="tag flex items-center whitespace-nowrap" style={{ transform: "translateY(-50%)", ["--s" as string]: "0" }}>
        <span className="callout-line block h-px w-14 bg-[#F2D16B]" style={{ transform: "scaleX(var(--s))" }} />
        <span className="slab ml-1 rounded-[6px] bg-[#073247]/85 px-2 py-0.5 text-[15px] font-semibold text-[#F3F7F6] transition-opacity duration-500" style={{ opacity: "var(--s)" as unknown as number, visibility: "hidden" }}>{LAYERS[i].name}</span>
      </div>
    </Html>
  )
}

export default function Building(props: Props & { className?: string; fov?: number }) {
  return (
    <Canvas
      className={props.className}
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [15, 8, 17], fov: props.fov ?? 30 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, preserveDrawingBuffer: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 14, 6]} intensity={3.3} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} color="#FFF6E5" />
      <Environment resolution={256} environmentIntensity={1.25}>
        <Lightformer form="rect" intensity={2.2} color="#FFFFFF" position={[0, 6, -6]} scale={[14, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#9ED8DB" position={[-8, 2, 4]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="circle" intensity={3} color="#FFF1C9" position={[6, 8, 6]} scale={3} />
      </Environment>
      <Rig {...props} />
      <ContactShadows position={[0, -1.19, 0]} opacity={0.55} scale={26} blur={2.6} far={6} color="#03202E" />
    </Canvas>
  )
}
