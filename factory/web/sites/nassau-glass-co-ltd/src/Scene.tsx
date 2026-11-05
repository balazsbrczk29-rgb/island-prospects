import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei"
import type { Group } from "three"

function Slab() {
  const g = useRef<Group>(null)
  useFrame((s) => {
    if (!g.current) return
    const t = s.clock.elapsedTime
    g.current.rotation.y = Math.sin(t * 0.25) * 0.55 + 0.35
    g.current.rotation.x = Math.sin(t * 0.18) * 0.08
  })
  return (
    <group ref={g}>
      <RoundedBox args={[2.6, 3.4, 0.32]} radius={0.06} smoothness={6}>
        <MeshTransmissionMaterial thickness={0.9} roughness={0.04} transmission={1} ior={1.5} chromaticAberration={0.06} anisotropy={0.2} distortion={0.08} distortionScale={0.4} temporalDistortion={0.05} color="#e3f2ec" backside samples={3} resolution={256} />
      </RoundedBox>
    </group>
  )
}

function Lights() {
  const bars: [number, string, number][] = [[-2.2, "#e8b04a", 0.35], [-1.1, "#f1f3f2", 0.18], [0.2, "#2f4f5f", 0.5], [1.3, "#cfe5dd", 0.28], [2.3, "#e8b04a", 0.14]]
  return (
    <group position={[0, 0, -2]}>
      {bars.map(([x, c, w], i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, 0.18]}>
          <planeGeometry args={[w, 9]} />
          <meshBasicMaterial color={c} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[1.6, 1.6, 0.6]}>
        <sphereGeometry args={[0.38, 48, 48]} />
        <meshBasicMaterial color="#ffd27a" toneMapped={false} />
      </mesh>
      <mesh position={[1.6, 3.4, 0.6]}>
        <cylinderGeometry args={[0.012, 0.012, 3.2]} />
        <meshBasicMaterial color="#141a1c" />
      </mesh>
    </group>
  )
}

export default function Scene() {
  const box = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(true)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting && !reduce), { threshold: 0.05 })
    if (box.current) io.observe(box.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={box} className="size-full">
    <Canvas frameloop={on ? "always" : "demand"} dpr={[1, 1.5]} camera={{ position: [0, 0, 7.6], fov: 38 }} gl={{ antialias: true }}>
      <color attach="background" args={["#e7ecea"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <Lights />
      <Slab />
    </Canvas>
    </div>
  )
}
