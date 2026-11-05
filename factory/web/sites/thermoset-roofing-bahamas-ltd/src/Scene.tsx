// Signature visual: a single-ply flat-roof assembly, the kind of system Thermoset installs (TPO/PVC membranes,
// Kynar edge metal, fabricated AC curbs, per thermosetroofing242.com/services). Exploded at the top of the section,
// it assembles layer by layer as the visitor scrolls; `active` highlights the layer being described.
import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

import { LAYERS } from "./layers"
void LAYERS

function corrugated() {
  const g = new THREE.PlaneGeometry(6, 4, 120, 1)
  const p = g.attributes.position
  for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 9) * 0.06)
  g.computeVertexNormals(); return g
}

function Layer({ i, progress, active, children }: { i: number; progress: { current: number }; active: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null!)
  const baseY = [0, 0.12, 0.3, 0.37, 0.42, 0.4][i]
  useFrame((_, d) => {
    const p = progress.current
    // each layer lands in sequence
    const local = THREE.MathUtils.clamp((p * 1.15 - i * 0.14) / 0.35, 0, 1)
    const target = baseY + (1 - local) * (0.4 + i * 0.34)
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, target, 6, d)
    const s = active === i ? 1.0 : 1
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, s, 6, d))
  })
  return <group ref={ref} position={[0, baseY + 3 + i, 0]}>{children}</group>
}

function Assembly({ progress, active }: { progress: { current: number }; active: number }) {
  const g = useRef<THREE.Group>(null!)
  const deckGeo = useMemo(corrugated, [])
  useFrame(({ clock, pointer }, d) => {
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, -0.6 + Math.sin(clock.elapsedTime * 0.15) * 0.08 + pointer.x * 0.15, 3, d)
  })
  const hl = (i: number, base: string) => (active === i ? "#1f5e8c" : base)
  return (
    <group ref={g} rotation={[0, -0.6, 0]}>
      <Layer i={0} progress={progress} active={active}>
        <mesh geometry={deckGeo} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={hl(0, "#8f979c")} metalness={0.6} roughness={0.45} side={THREE.DoubleSide} />
        </mesh>
      </Layer>
      <Layer i={1} progress={progress} active={active}>
        <mesh castShadow receiveShadow><boxGeometry args={[6, 0.22, 4]} /><meshStandardMaterial color={hl(1, "#e4dcb8")} roughness={0.95} /></mesh>
      </Layer>
      <Layer i={2} progress={progress} active={active}>
        <mesh castShadow receiveShadow><boxGeometry args={[6, 0.06, 4]} /><meshStandardMaterial color={hl(2, "#b9b6ad")} roughness={0.9} /></mesh>
      </Layer>
      <Layer i={3} progress={progress} active={active}>
        <mesh castShadow receiveShadow><boxGeometry args={[6.06, 0.025, 4.06]} /><meshStandardMaterial color={hl(3, "#f6f6f2")} roughness={0.35} /></mesh>
        {[-1.5, 0, 1.5].map(x => <mesh key={x} position={[x, 0.016, 0]}><boxGeometry args={[0.02, 0.008, 4.06]} /><meshStandardMaterial color="#d9d9d3" /></mesh>)}
      </Layer>
      <Layer i={4} progress={progress} active={active}>
        {[[0, 2.06, 6.2, 0.06], [0, -2.06, 6.2, 0.06]].map(([x, z, w, dpt], k) => <mesh key={k} position={[x, 0, z]} castShadow><boxGeometry args={[w, 0.22, dpt]} /><meshStandardMaterial color={hl(4, "#2c3a44")} metalness={0.5} roughness={0.35} /></mesh>)}
        {[3.06, -3.06].map(x => <mesh key={x} position={[x, 0, 0]} castShadow><boxGeometry args={[0.06, 0.22, 4.2]} /><meshStandardMaterial color={hl(4, "#2c3a44")} metalness={0.5} roughness={0.35} /></mesh>)}
      </Layer>
      <Layer i={5} progress={progress} active={active}>
        <group position={[1.3, 0.12, -0.6]}>
          <mesh castShadow><boxGeometry args={[1.2, 0.3, 1.2]} /><meshStandardMaterial color={hl(5, "#f1f1ec")} roughness={0.4} /></mesh>
          <mesh position={[0, 0.45, 0]} castShadow><boxGeometry args={[1.05, 0.6, 1.05]} /><meshStandardMaterial color="#c9ccc9" metalness={0.4} roughness={0.4} /></mesh>
          <mesh position={[0, 0.76, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.36, 32]} /><meshStandardMaterial color="#2c3a44" /></mesh>
        </group>
      </Layer>
    </group>
  )
}

export default function Scene({ progress, active }: { progress: { current: number }; active: number }) {
  return (
    <Canvas shadows dpr={[1, 1.8]} camera={{ position: [6.5, 5.2, 7.5], fov: 32 }} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} onCreated={({ camera }) => camera.lookAt(0, 1.0, 0)} aria-hidden>
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#ffffff", "#c9c6bb", 0.6]} />
      <directionalLight position={[5, 9, 4]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-6} />
      <Assembly progress={progress} active={active} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow><planeGeometry args={[30, 30]} /><shadowMaterial opacity={0.12} /></mesh>
    </Canvas>
  )
}
