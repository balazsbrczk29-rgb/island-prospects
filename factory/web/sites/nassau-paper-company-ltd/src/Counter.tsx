// Signature visual: the Carib Road counter as a still life of what the store really stocks (from its own
// category list): copy paper reams, Solo/Dart style cup stacks, roll towels, a spray bottle for janitorial,
// can liners, envelopes. Tap a tag to see the department. Generic forms only: no brand marks are drawn.
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, Html, Lightformer, RoundedBox } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"

export type Dept = "paper" | "disposables" | "janitorial" | "liners" | "envelopes" | "shipping"

const C = { white: "#f7f6f2", band: "#2f6fde", kraft: "#b8915e", cup: "#f3f1ea", cupRim: "#e3dfd4", liner: "#22262b", spray: "#e9eef2", trigger: "#2f6fde", core: "#a88456" }

function Ream({ p, r = 0 }: { p: [number, number, number]; r?: number }) {
  return (
    <group position={p} rotation={[0, r, 0]}>
      <RoundedBox args={[1.7, 0.42, 1.15]} radius={0.03} smoothness={3} position={[0, 0.21, 0]}><meshStandardMaterial color={C.white} roughness={0.85} /></RoundedBox>
      <mesh position={[0, 0.21, 0.576]}><planeGeometry args={[1.7, 0.12]} /><meshStandardMaterial color={C.band} roughness={0.6} /></mesh>
      <mesh position={[0.851, 0.21, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1.15, 0.12]} /><meshStandardMaterial color={C.band} roughness={0.6} /></mesh>
    </group>
  )
}

function CupStack({ p, n = 9 }: { p: [number, number, number]; n?: number }) {
  const geo = useMemo(() => {
    const pts = [new THREE.Vector2(0.0, 0), new THREE.Vector2(0.24, 0), new THREE.Vector2(0.34, 0.62), new THREE.Vector2(0.36, 0.64), new THREE.Vector2(0.33, 0.64), new THREE.Vector2(0.23, 0.03)]
    return new THREE.LatheGeometry(pts, 40)
  }, [])
  return (
    <group position={p}>
      {Array.from({ length: n }).map((_, i) => (
        <mesh key={i} geometry={geo} position={[0, i * 0.11, 0]}><meshStandardMaterial color={i === n - 1 ? C.cup : C.cupRim} roughness={0.5} side={THREE.DoubleSide} /></mesh>
      ))}
    </group>
  )
}

function RollTowel({ p, r = 0 }: { p: [number, number, number]; r?: number }) {
  return (
    <group position={p} rotation={[0, r, 0]}>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.42, 0.42, 1, 48]} /><meshStandardMaterial color={C.white} roughness={0.95} /></mesh>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.13, 0.13, 1.01, 32]} /><meshStandardMaterial color={C.core} roughness={0.8} /></mesh>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.1, 0.1, 1.02, 32]} /><meshStandardMaterial color="#5d4a33" /></mesh>
    </group>
  )
}

function Spray({ p }: { p: [number, number, number] }) {
  const body = useMemo(() => new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.3, 0), new THREE.Vector2(0.32, 0.05), new THREE.Vector2(0.32, 0.95), new THREE.Vector2(0.2, 1.15), new THREE.Vector2(0.12, 1.2), new THREE.Vector2(0.12, 1.3), new THREE.Vector2(0, 1.3)], 40), [])
  return (
    <group position={p} rotation={[0, -0.5, 0]}>
      <mesh geometry={body}><meshStandardMaterial color={C.spray} roughness={0.2} transparent opacity={0.85} /></mesh>
      <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.305, 0.305, 0.5, 40]} /><meshStandardMaterial color="#7fb7a6" roughness={0.4} transparent opacity={0.55} /></mesh>
      <mesh position={[0.02, 1.42, 0]}><boxGeometry args={[0.34, 0.24, 0.24]} /><meshStandardMaterial color={C.trigger} roughness={0.5} /></mesh>
      <mesh position={[0.24, 1.46, 0]}><boxGeometry args={[0.2, 0.08, 0.1]} /><meshStandardMaterial color={C.trigger} /></mesh>
      <mesh position={[0.12, 1.25, 0]} rotation={[0, 0, 0.25]}><boxGeometry args={[0.06, 0.26, 0.12]} /><meshStandardMaterial color={C.trigger} /></mesh>
    </group>
  )
}

function Liners({ p }: { p: [number, number, number] }) {
  return (
    <group position={p} rotation={[0, 0, Math.PI / 2]}>
      <mesh><cylinderGeometry args={[0.32, 0.32, 1.1, 40]} /><meshStandardMaterial color={C.liner} roughness={0.35} /></mesh>
      <mesh><cylinderGeometry args={[0.07, 0.07, 1.12, 20]} /><meshStandardMaterial color={C.core} /></mesh>
    </group>
  )
}

function Envelopes({ p }: { p: [number, number, number] }) {
  return (
    <group position={p} rotation={[0, 0.35, 0]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[(i % 2) * 0.03, 0.02 + i * 0.035, (i % 3) * 0.02]} rotation={[0, i * 0.03, 0]}><boxGeometry args={[1.2, 0.03, 0.62]} /><meshStandardMaterial color={i % 2 ? "#efe9dc" : C.kraft} roughness={0.9} /></mesh>
      ))}
    </group>
  )
}

function Carton({ p, r = 0 }: { p: [number, number, number]; r?: number }) {
  return (
    <group position={p} rotation={[0, r, 0]}>
      <RoundedBox args={[1.3, 0.9, 1.0]} radius={0.02} smoothness={2} position={[0, 0.45, 0]}><meshStandardMaterial color={C.kraft} roughness={0.9} /></RoundedBox>
      <mesh position={[0, 0.905, 0]}><boxGeometry args={[1.32, 0.01, 0.16]} /><meshStandardMaterial color="#d8c39f" roughness={0.6} /></mesh>
    </group>
  )
}

function Tag({ p, label, id, active, onPick }: { p: [number, number, number]; label: string; id: Dept; active: Dept | null; onPick: (d: Dept) => void }) {
  return (
    <Html position={p} center zIndexRange={[20, 0]}>
      <button type="button" onClick={() => onPick(id)} onMouseEnter={() => onPick(id)} className={`npc-tag ${active === id ? "is-on" : ""}`} aria-pressed={active === id}>
        <span className="npc-dot" aria-hidden />{label}
      </button>
    </Html>
  )
}

function Rig() {
  const g = useRef<THREE.Group>(null!)
  useFrame(({ pointer, clock, camera, size }) => {
    const t = clock.elapsedTime
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, pointer.x * 0.22 + Math.sin(t * 0.15) * 0.06, 0.04)
    const portrait = size.width / size.height < 0.9
    camera.position.set(0, portrait ? 6.4 : 5, portrait ? 12.5 : 10.6)
    camera.lookAt(0, 0.8, 0)
  })
  return <group ref={g} />
}

export default function Counter({ active, onPick }: { active: Dept | null; onPick: (d: Dept) => void }) {
  const rot = useRef<THREE.Group>(null!)
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 4.6, 9.4], fov: 32 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }} aria-hidden="false">
      <color attach="background" args={["#ebe7de"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 5]} intensity={1.5} color="#fff4e3" castShadow shadow-mapSize={[1024, 1024]} />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 4, 4]} scale={[8, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1} position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} scale={[6, 4, 1]} color="#ffeedd" />
      </Environment>
      <Rig />
      <group ref={rot} position={[-0.3, 0, 0]}>
        <Ream p={[-2.3, 0, -0.3]} r={0.12} /><Ream p={[-2.3, 0.42, -0.3]} r={0.05} /><Ream p={[-2.32, 0.84, -0.3]} r={0.16} />
        <CupStack p={[-0.75, 0, 0.7]} n={10} />
        <CupStack p={[-0.05, 0, 0.95]} n={6} />
        <RollTowel p={[0.4, 0, -0.9]} /><RollTowel p={[1.3, 0, -0.95]} r={0.3} /><RollTowel p={[0.85, 1.0, -0.92]} />
        <Spray p={[2.35, 0, 0.35]} />
        <Liners p={[1.25, 0.32, 0.95]} />
        <Envelopes p={[-2.0, 0, 1.45]} />
        <Carton p={[3.1, 0, -1.4]} r={-0.3} />
        <Tag p={[-2.3, 1.75, -0.3]} label="Copy paper" id="paper" active={active} onPick={onPick} />
        <Tag p={[-0.4, 1.55, 0.8]} label="Cups and disposables" id="disposables" active={active} onPick={onPick} />
        <Tag p={[0.85, 2.3, -0.9]} label="Roll towel and tissue" id="janitorial" active={active} onPick={onPick} />
        <Tag p={[2.2, 2.05, 0.6]} label="Cleaning supplies" id="janitorial" active={active} onPick={onPick} />
        <Tag p={[1.25, 0.85, 1.25]} label="Can liners" id="liners" active={active} onPick={onPick} />
        <Tag p={[-2.0, 0.5, 1.8]} label="Envelopes" id="envelopes" active={active} onPick={onPick} />
        <Tag p={[3.3, 1.15, -1.0]} label="Shipping supplies" id="shipping" active={active} onPick={onPick} />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[40, 40]} /><shadowMaterial opacity={0.12} /></mesh>
      <ContactShadows position={[0, 0.001, 0]} opacity={0.45} scale={14} blur={2.4} far={3} />
    </Canvas>
  )
}
