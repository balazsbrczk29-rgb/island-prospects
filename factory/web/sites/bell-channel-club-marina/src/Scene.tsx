// Signature visual: a living diorama of the real setting, built from the brief's facts only:
// open sea and beach on one side, the canal on the other, the club's townhouses between them,
// owners' yachts at the private docks, and the Bell Channel inlet with its marker buoys.
// Interactive: hover or tap a hotspot to highlight that part of the club; the camera drifts with the pointer.
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { useMemo, useRef, useState } from "react"
import * as THREE from "three"

const C = { sea: "#7fbcb4", seaDeep: "#2f8d88", sand: "#e6d6b0", land: "#cfd9c6", house: "#f6f3ec", roof: "#1f7a78", ink: "#14303a", hull: "#fbfaf7", palm: "#3f7d57", trunk: "#8b6b47" }

const waterVert = /* glsl */ `
uniform float uTime; varying vec2 vUv; varying float vH;
void main(){ vUv=uv; vec3 p=position;
 float h=sin(p.x*2.2+uTime*.8)*.025+sin(p.y*3.1+uTime*.6)*.02; p.z+=h; vH=h;
 gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }`
const waterFrag = /* glsl */ `
uniform float uTime; uniform vec3 uA; uniform vec3 uB; varying vec2 vUv; varying float vH;
void main(){ vec2 q=vUv*vec2(14.,10.);
 float w=sin(q.x+sin(q.y*1.7+uTime*.6)*1.3+uTime*.4)*sin(q.y*1.3+sin(q.x*1.1-uTime*.5)*1.6-uTime*.3);
 float c=pow(1.-abs(w),7.);
 vec3 col=mix(uB,uA,vUv.y*.9+vH*6.); col+=c*.09; gl_FragColor=vec4(col,1.); }`

function Water({ w, h, pos, a, b }: { w: number; h: number; pos: [number, number, number]; a: string; b: string }) {
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uA: { value: new THREE.Color(a) }, uB: { value: new THREE.Color(b) } }), [a, b])
  useFrame((_, d) => { mat.current.uniforms.uTime.value += d })
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[pos[0], pos[1] - 0.035, pos[2]]}>
      <planeGeometry args={[w, h, 64, 64]} />
      <shaderMaterial ref={mat} vertexShader={waterVert} fragmentShader={waterFrag} uniforms={uniforms} />
    </mesh>
  )
}

function Townhouse({ x, z, w = 0.42, glow }: { x: number; z: number; w?: number; glow: boolean }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.16, 0]} castShadow><boxGeometry args={[w, 0.32, 0.34]} /><meshStandardMaterial color={C.house} emissive={glow ? "#c9b88f" : "#000"} emissiveIntensity={glow ? 0.25 : 0} /></mesh>
      <mesh position={[0, 0.37, 0]} rotation={[0, 0, 0]} castShadow><boxGeometry args={[w + 0.04, 0.05, 0.38]} /><meshStandardMaterial color={C.roof} /></mesh>
      {[-0.12, 0, 0.12].map(dx => <mesh key={dx} position={[dx * (w / 0.42), 0.18, 0.171]}><planeGeometry args={[0.06, 0.1]} /><meshStandardMaterial color="#9cc3bd" /></mesh>)}
    </group>
  )
}

function Palm({ x, z, s = 1 }: { x: number; z: number; s?: number }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => { ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.8 + x * 3) * 0.04 })
  return (
    <group ref={ref} position={[x, 0, z]} scale={s}>
      <mesh position={[0, 0.22, 0]} rotation={[0, 0, 0.12]}><cylinderGeometry args={[0.012, 0.02, 0.44, 6]} /><meshStandardMaterial color={C.trunk} /></mesh>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0.03, 0.44, 0]} rotation={[0.9, (i / 6) * Math.PI * 2, 0]}><coneGeometry args={[0.04, 0.24, 3]} /><meshStandardMaterial color={C.palm} flatShading /></mesh>
      ))}
    </group>
  )
}

function Yacht({ x, z, rot = 0, len = 0.62, phase = 0 }: { x: number; z: number; rot?: number; len?: number; phase?: number }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => { const t = clock.elapsedTime + phase; ref.current.position.y = 0.02 + Math.sin(t * 1.4) * 0.008; ref.current.rotation.x = Math.sin(t * 1.1) * 0.015 })
  return (
    <group ref={ref} position={[x, 0.02, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.03, 0]} castShadow><boxGeometry args={[len, 0.06, 0.16]} /><meshStandardMaterial color={C.hull} roughness={0.3} /></mesh>
      <mesh position={[len / 2, 0.03, 0]} rotation={[0, Math.PI / 4, 0]}><boxGeometry args={[0.113, 0.06, 0.113]} /><meshStandardMaterial color={C.hull} roughness={0.3} /></mesh>
      <mesh position={[-len * 0.05, 0.09, 0]}><boxGeometry args={[len * 0.45, 0.06, 0.12]} /><meshStandardMaterial color={C.hull} roughness={0.25} /></mesh>
      <mesh position={[-len * 0.02, 0.095, 0]}><boxGeometry args={[len * 0.38, 0.03, 0.125]} /><meshStandardMaterial color={C.ink} roughness={0.1} metalness={0.4} /></mesh>
      <mesh position={[0, 0.005, 0]}><boxGeometry args={[len * 1.01, 0.012, 0.161]} /><meshStandardMaterial color={C.ink} /></mesh>
    </group>
  )
}

function Buoy({ x, z, color, phase }: { x: number; z: number; color: string; phase: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => { const t = clock.elapsedTime + phase; ref.current.position.y = 0.05 + Math.sin(t * 1.3) * 0.015; ref.current.rotation.z = Math.sin(t) * 0.1 })
  return <mesh ref={ref} position={[x, 0.05, z]}><cylinderGeometry args={[0.025, 0.035, 0.1, 12]} /><meshStandardMaterial color={color} /></mesh>
}

type Spot = { id: string; label: string; detail: string; pos: [number, number, number] }
const SPOTS: Spot[] = [
  { id: "beach", label: "The beach", detail: "Kept by the homeowners' association", pos: [-0.9, 0.2, 1.05] },
  { id: "club", label: "The club", detail: "Gated condominiums and townhouses", pos: [-1.35, 0.7, 0.05] },
  { id: "canal", label: "The canal", detail: "Private docks for owners", pos: [0.2, 0.3, -1.25] },
  { id: "inlet", label: "Bell Channel", detail: "The inlet into Port Lucaya", pos: [1.25, 0.25, -0.2] },
]

function Rig() {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(-0.35, 0, 0.15), [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.05
    const x = Math.sin(t) * 0.25 + pointer.x * 0.35, y = 3.5 + pointer.y * 0.2
    camera.position.lerp(new THREE.Vector3(3.3 + x, y, 4.3 - x * 0.4), 0.04)
    camera.lookAt(target)
  })
  return null
}

function Diorama({ active, setActive }: { active: string | null; setActive: (s: string | null) => void }) {
  const houses = [-1.0, -0.52, -0.04, 0.44].flatMap(x => [[x, 0.25], [x, -0.25]]) as [number, number][]
  return (
    <group position={[0, -0.2, 0]} scale={0.82}>
      {/* open sea + beach to the south, canal to the north, inlet to the east */}
      <Water w={9} h={3} pos={[0, 0, 2.6]} a={C.sea} b={C.seaDeep} />
      <Water w={0.7} h={6} pos={[1.25, 0, 0]} a={C.sea} b={C.seaDeep} />
      <Water w={4.6} h={0.55} pos={[-0.95, 0, -0.95]} a={C.sea} b="#5aa49c" />
      <mesh position={[-0.95, -0.05, 0.05]} receiveShadow><boxGeometry args={[4.4, 0.1, 1.45]} /><meshStandardMaterial color={C.land} /></mesh>
      <mesh position={[-0.95, -0.06, 1.0]} receiveShadow><boxGeometry args={[4.4, 0.1, 0.5]} /><meshStandardMaterial color={C.sand} /></mesh>
      <mesh position={[-0.95, -0.05, -1.75]}><boxGeometry args={[4.4, 0.1, 1.0]} /><meshStandardMaterial color={C.land} /></mesh>
      <mesh position={[3.0, -0.05, 0]}><boxGeometry args={[2.8, 0.1, 6]} /><meshStandardMaterial color={C.land} /></mesh>
      {houses.map(([x, z], i) => <Townhouse key={i} x={x} z={z} glow={active === "club"} />)}
      {/* owners' docks on the canal */}
      {[-1.7, -1.05, -0.4, 0.25].map((x, i) => <mesh key={i} position={[x, 0.015, -0.78]}><boxGeometry args={[0.05, 0.02, 0.28]} /><meshStandardMaterial color="#a88a63" /></mesh>)}
      <mesh position={[-0.75, 0.015, -0.66]}><boxGeometry args={[2.4, 0.02, 0.05]} /><meshStandardMaterial color="#a88a63" /></mesh>
      <Yacht x={-1.38} z={-1.0} len={0.5} phase={0} />
      <Yacht x={-0.72} z={-1.02} len={0.58} phase={1.3} />
      <Yacht x={-0.07} z={-1.0} len={0.46} phase={2.4} />
      <Yacht x={1.25} z={1.6} rot={Math.PI / 2} len={0.7} phase={0.7} />
      {[[-1.9, 0.82], [-1.5, 0.9], [-0.9, 0.84], [-0.2, 0.9], [0.4, 0.82], [-1.7, -0.45], [0.75, 0.3], [0.75, -0.3]].map(([x, z], i) => <Palm key={i} x={x} z={z} s={0.9 + (i % 3) * 0.12} />)}
      <Buoy x={1.05} z={1.0} color="#2f7d4f" phase={0} /><Buoy x={1.45} z={1.0} color="#b2453a" phase={1} />
      <Buoy x={1.05} z={2.2} color="#2f7d4f" phase={2} /><Buoy x={1.45} z={2.2} color="#b2453a" phase={0.5} />
      {SPOTS.map(s => (
        <Html key={s.id} position={s.pos} center zIndexRange={[20, 0]}>
          <button type="button" onMouseEnter={() => setActive(s.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(s.id)} onBlur={() => setActive(null)} onClick={() => setActive(active === s.id ? null : s.id)}
            className={`group flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] backdrop-blur transition duration-300 ${active === s.id ? "border-ink bg-ink text-paper" : "border-white/70 bg-white/80 text-ink hover:bg-white"}`}>
            <span className={`size-1.5 rounded-full ${active === s.id ? "bg-sand" : "bg-teal"}`} />
            {s.label}
            {active === s.id && <span className="text-paper/70">· {s.detail}</span>}
          </button>
        </Html>
      ))}
    </group>
  )
}

export default function Scene() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [3.3, 3.5, 4.3], fov: 36 }} gl={{ antialias: true }} aria-label="Illustrated 3D view of Bell Channel Club between the canal and the beach. Not to scale.">
      <color attach="background" args={["#dde9e5"]} />
      <fog attach="fog" args={["#dde9e5", 7, 13]} />
      <hemisphereLight args={["#ffffff", "#cfd9c6", 0.9]} />
      <directionalLight position={[3, 5, 2]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <Rig />
      <Diorama active={active} setActive={setActive} />
    </Canvas>
  )
}
