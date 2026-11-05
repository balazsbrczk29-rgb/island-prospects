// Hero: a two-storey concrete block building rising course by course on a New Providence site,
// with a tower crane, block pallets and rebar starters. Procedural sky, no network.
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"

const BL = 0.4, BH = 0.2, BT = 0.2
const W = 8, D = 5, COURSES = 13, FLOORS = 2, SLAB = 0.22
const DURATION = 7.5

type Block = { x: number; y: number; z: number; ry: number; course: number; k: number }

function opening(floor: number, side: number, u: number, c: number) {
  if (floor === 0 && side === 0 && c < 9 && u > 3.4 && u < 4.6) return true
  if (c < 4 || c > 9) return false
  if (side === 0 || side === 2) return (u > 1.2 && u < 2.4) || (u > 5.6 && u < 6.8)
  return u > 1.8 && u < 3.2
}

function useBlocks() {
  return useMemo(() => {
    const out: Block[] = []
    for (let f = 0; f < FLOORS; f++) {
      for (let c = 0; c < COURSES; c++) {
        const course = f * COURSES + c
        const y = f * (COURSES * BH + SLAB) + c * BH + BH / 2
        const off = c % 2 ? BL / 2 : 0
        let k = 0
        const sides = [
          { len: W, place: (u: number) => [u - W / 2, D / 2], ry: 0 },
          { len: D, place: (u: number) => [W / 2, D / 2 - u], ry: Math.PI / 2 },
          { len: W, place: (u: number) => [W / 2 - u, -D / 2], ry: 0 },
          { len: D, place: (u: number) => [-W / 2, -D / 2 + u], ry: Math.PI / 2 },
        ]
        sides.forEach((s, si) => {
          for (let u = off + BL / 2; u < s.len; u += BL) {
            if (opening(f, si, u, c)) continue
            const [x, z] = s.place(u)
            out.push({ x, y, z, ry: s.ry, course, k: k++ })
          }
        })
      }
    }
    return out
  }, [])
}

function Walls() {
  const blocks = useBlocks()
  const ref = useRef<THREE.InstancedMesh>(null!)
  const slabs = useRef<THREE.Mesh[]>([])
  const rebar = useRef<THREE.Group>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const done = useRef(false)
  const reduce = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, [])
  const total = FLOORS * COURSES

  useLayoutEffect(() => {
    const col = new THREE.Color()
    blocks.forEach((b, i) => {
      const v = 0.86 + ((b.k * 13 + b.course * 7) % 9) / 100
      ref.current.setColorAt(i, col.setRGB(v, v * 0.985, v * 0.955))
    })
    ref.current.instanceColor!.needsUpdate = true
  }, [blocks])

  useFrame(({ clock }) => {
    if (done.current) return
    const t = reduce ? DURATION + 1 : clock.elapsedTime - 0.4
    const built = (Math.max(0, t) / DURATION) * (total + 2)
    blocks.forEach((b, i) => {
      const local = built - b.course - (b.k / 70) * 0.9
      const p = THREE.MathUtils.clamp(local / 0.6, 0, 1)
      const e = 1 - Math.pow(1 - p, 3)
      dummy.position.set(b.x, b.y + (1 - e) * 1.4, b.z)
      dummy.rotation.set(0, b.ry, 0)
      dummy.scale.setScalar(p <= 0 ? 0.0001 : 1)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
    slabs.current.forEach((s, f) => {
      const p = THREE.MathUtils.clamp(built - (f + 1) * COURSES, 0, 1)
      s.scale.set(1, p <= 0 ? 0.0001 : 1, 1)
      s.position.y = (f + 1) * COURSES * BH + f * SLAB + SLAB / 2 + (1 - p) * 0.6
    })
    if (rebar.current) rebar.current.scale.y = THREE.MathUtils.clamp(built - total, 0.0001, 1)
    if (built > total + 2) done.current = true
  })

  const corners: [number, number][] = [[-W / 2, D / 2], [W / 2, D / 2], [W / 2, -D / 2], [-W / 2, -D / 2], [0, D / 2], [0, -D / 2]]
  const topY = FLOORS * COURSES * BH + FLOORS * SLAB
  return (
    <group position={[2.6, 0, 0]} rotation={[0, -0.5, 0]}>
      <instancedMesh ref={ref} args={[undefined, undefined, blocks.length]} castShadow receiveShadow>
        <boxGeometry args={[BL - 0.012, BH - 0.012, BT]} />
        <meshStandardMaterial roughness={0.92} metalness={0} />
      </instancedMesh>
      {Array.from({ length: FLOORS }).map((_, f) => (
        <mesh key={f} ref={el => { if (el) slabs.current[f] = el }} castShadow receiveShadow scale={[1, 0.0001, 1]}>
          <boxGeometry args={[W + 0.5, SLAB, D + 0.5]} />
          <meshStandardMaterial color="#bdb8ae" roughness={0.85} />
        </mesh>
      ))}
      <group ref={rebar} position={[0, topY, 0]} scale={[1, 0.0001, 1]}>
        {corners.map(([x, z]) => [-0.06, 0.06].map(o => (
          <mesh key={`${x}${z}${o}`} position={[x + o, 0.45, z]}>
            <cylinderGeometry args={[0.012, 0.012, 0.9, 5]} />
            <meshStandardMaterial color="#5a4b40" roughness={0.6} metalness={0.4} />
          </mesh>
        )))}
      </group>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[W + 0.9, 0.1, D + 0.9]} />
        <meshStandardMaterial color="#c8c2b6" roughness={1} />
      </mesh>
    </group>
  )
}

function Crane() {
  const jib = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => { jib.current.rotation.y = 0.9 + Math.sin(clock.elapsedTime * 0.12) * 0.35 })
  const c = "#2a2e33"
  const mast = 11.5
  return (
    <group position={[7.5, 0, -9]}>
      {[-0.22, 0.22].map(x => [-0.22, 0.22].map(z => (
        <mesh key={`${x}${z}`} position={[x, mast / 2, z]}><boxGeometry args={[0.05, mast, 0.05]} /><meshStandardMaterial color={c} /></mesh>
      )))}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={i} position={[0, 0.4 + i * 0.72, 0.22]} rotation={[0, 0, i % 2 ? 0.9 : -0.9]}><boxGeometry args={[0.03, 0.62, 0.03]} /><meshStandardMaterial color={c} /></mesh>
      ))}
      <group ref={jib} position={[0, mast, 0]}>
        <mesh position={[4.2, 0.2, 0]}><boxGeometry args={[10.5, 0.16, 0.22]} /><meshStandardMaterial color={c} /></mesh>
        <mesh position={[-2.6, 0.2, 0]}><boxGeometry args={[3.2, 0.2, 0.3]} /><meshStandardMaterial color={c} /></mesh>
        <mesh position={[-3.6, -0.15, 0]}><boxGeometry args={[0.9, 0.6, 0.6]} /><meshStandardMaterial color="#3a3f45" /></mesh>
        <mesh position={[0, 1.1, 0]}><boxGeometry args={[0.12, 2, 0.12]} /><meshStandardMaterial color={c} /></mesh>
        <mesh position={[6.4, -2.2, 0]}><cylinderGeometry args={[0.008, 0.008, 4.6, 4]} /><meshStandardMaterial color={c} /></mesh>
        <mesh position={[6.4, -4.6, 0]}><boxGeometry args={[0.8, 0.22, 0.4]} /><meshStandardMaterial color="#d9d4ca" /></mesh>
      </group>
    </group>
  )
}

function Pallets() {
  const items: [number, number, number][] = [[-3.6, 0, 3.4], [-4.8, 0, 2.2], [7.8, 0, 3.6]]
  return (
    <>
      {items.map(([x, , z], i) => (
        <group key={i} position={[x, 0, z]} rotation={[0, i * 0.4, 0]}>
          <mesh position={[0, 0.06, 0]} castShadow><boxGeometry args={[1.2, 0.12, 1]} /><meshStandardMaterial color="#8a6e4e" roughness={1} /></mesh>
          <mesh position={[0, 0.12 + 0.3, 0]} castShadow><boxGeometry args={[1.15, 0.6, 0.95]} /><meshStandardMaterial color="#d6d1c7" roughness={0.95} /></mesh>
        </group>
      ))}
    </>
  )
}

function Rig() {
  const { camera, size } = useThree()
  const narrow = size.width < 768
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const r = narrow ? 50 : 25
    const a = -0.42 + Math.sin(t * 0.05) * 0.16
    camera.position.set(Math.sin(a) * r + (narrow ? 2.6 : -2), narrow ? 9 : 6.2, Math.cos(a) * r)
    camera.lookAt(narrow ? 2.6 : -3.2, narrow ? -5.5 : 3.6, 0)
  })
  return null
}

export default function Scene() {
  const sun = useMemo(() => new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(74), THREE.MathUtils.degToRad(318)), [])
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 34, near: 0.1, far: 400 }} gl={{ antialias: true }} aria-hidden>
      <Sky sunPosition={sun} turbidity={4.5} rayleigh={1.1} mieCoefficient={0.004} mieDirectionalG={0.86} />
      <fog attach="fog" args={["#e3ddd1", 22, 80]} />
      <hemisphereLight args={["#f4ece0", "#b9ad98", 1.15]} />
      <directionalLight position={[sun.x * 30, sun.y * 30, sun.z * 30]} intensity={2.4} color="#ffe2bf" castShadow shadow-mapSize={[1536, 1536]} shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={14} shadow-camera-bottom={-14} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#ddd5c6" roughness={1} />
      </mesh>
      <Walls />
      <Crane />
      <Pallets />
      <Rig />
    </Canvas>
  )
}
