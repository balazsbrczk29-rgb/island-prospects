// Signature visual, tied to the brief: the East End floating dock (approx. 357 m long, 70 m beam, four cranes,
// lifts vessels up to 93,500 tons) in Freeport Harbour. As the visitor scrolls, the dock de-ballasts and rises
// under a cruise ship and lifts it clear of the water: exactly the job the yard sells.
// Scale: 1 unit = 10 m. Illustration, not to scale in detail.
import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef, type MutableRefObject } from "react"
import * as THREE from "three"

const C = { dock: "#3d4750", dockTop: "#59646d", wall: "#4a555e", crane: "#d6e04b", craneDark: "#2a3138", hull: "#14232c", bottom: "#7a2f28", boot: "#f2f0ea", sup: "#f4f3ee", glass: "#28414c", funnel: "#173f4d", block: "#8a8f86" }

const skyVert = /* glsl */ `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`
const skyFrag = /* glsl */ `varying vec3 vP;
void main(){ float h = clamp(vP.y,0.,1.);
 vec3 top = vec3(.72,.79,.81); vec3 hor = vec3(.95,.92,.86);
 vec3 col = mix(hor, top, pow(h,.55));
 vec3 sun = normalize(vec3(-.55,.12,-1.)); float s = max(dot(vP,sun),0.);
 col += vec3(1.,.86,.66)*pow(s,40.)*.5 + vec3(1.,.9,.75)*pow(s,6.)*.12;
 gl_FragColor = vec4(col,1.); }`

const seaVert = /* glsl */ `uniform float uTime; varying vec3 vW; varying vec3 vN;
float h(vec2 p,float t){ return sin(p.x*.3+t*.5)*.05+sin(p.y*.42+t*.4)*.04+sin((p.x+p.y)*1.1+t*1.1)*.015; }
void main(){ vec3 p=position; float t=uTime; p.z+=h(p.xy,t);
 float e=.05; float hx=h(p.xy+vec2(e,0.),t)-h(p.xy-vec2(e,0.),t); float hy=h(p.xy+vec2(0.,e),t)-h(p.xy-vec2(0.,e),t);
 vN=normalize(vec3(-hx/(2.*e),-hy/(2.*e),1.)); vec4 w=modelMatrix*vec4(p,1.); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`
const seaFrag = /* glsl */ `varying vec3 vW; varying vec3 vN;
void main(){ vec3 n=normalize(vec3(vN.x,vN.z,-vN.y)); vec3 v=normalize(cameraPosition-vW);
 float fres=pow(1.-max(dot(n,v),0.),3.);
 vec3 deep=vec3(.07,.27,.31); vec3 sky=vec3(.80,.84,.82);
 vec3 col=mix(deep,sky,clamp(fres,0.,1.));
 vec3 r=reflect(-v,n); vec3 sun=normalize(vec3(-.55,.12,-1.));
 col+=vec3(1.,.88,.7)*pow(max(dot(r,sun),0.),120.)*1.4;
 float d=length(vW.xz-cameraPosition.xz); col=mix(col,vec3(.93,.91,.86),smoothstep(30.,120.,d));
 gl_FragColor=vec4(col,1.); }`

function Sky() {
  return <mesh><sphereGeometry args={[300, 32, 16]} /><shaderMaterial side={THREE.BackSide} vertexShader={skyVert} fragmentShader={skyFrag} depthWrite={false} /></mesh>
}

function Sea() {
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((_, d) => { mat.current.uniforms.uTime.value += d })
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[260, 260, 180, 180]} />
      <shaderMaterial ref={mat} vertexShader={seaVert} fragmentShader={seaFrag} uniforms={uniforms} transparent opacity={0.94} />
    </mesh>
  )
}

function Crane({ x, side }: { x: number; side: 1 | -1 }) {
  return (
    <group position={[x, 2.2, side * 3.2]}>
      <mesh position={[0, 1.7, 0]}><boxGeometry args={[0.32, 3.4, 0.32]} /><meshStandardMaterial color={C.crane} roughness={0.6} /></mesh>
      <mesh position={[0, 3.55, -side * 1.6]}><boxGeometry args={[0.22, 0.22, 4.2]} /><meshStandardMaterial color={C.crane} roughness={0.6} /></mesh>
      <mesh position={[0, 3.55, side * 0.9]}><boxGeometry args={[0.5, 0.5, 0.9]} /><meshStandardMaterial color={C.craneDark} /></mesh>
      <mesh position={[0, 3.0, 0]}><boxGeometry args={[0.6, 0.5, 0.6]} /><meshStandardMaterial color={C.craneDark} /></mesh>
      <mesh position={[0, 2.4, -side * 3.4]}><cylinderGeometry args={[0.012, 0.012, 2.2, 4]} /><meshBasicMaterial color={C.craneDark} /></mesh>
    </group>
  )
}

function FloatingDock() {
  // pontoon deck at local y = 0.6, wing walls on both sides, four cranes
  return (
    <group>
      <mesh position={[0, 0.3, 0]}><boxGeometry args={[35.7, 0.6, 7]} /><meshStandardMaterial color={C.dock} roughness={0.85} /></mesh>
      <mesh position={[0, 0.605, 0]}><boxGeometry args={[35.4, 0.01, 5.6]} /><meshStandardMaterial color={C.dockTop} roughness={0.9} /></mesh>
      {[1, -1].map(s => (
        <group key={s}>
          <mesh position={[0, 1.4, s * 3.15]}><boxGeometry args={[35.7, 2.2, 0.7]} /><meshStandardMaterial color={C.wall} roughness={0.8} /></mesh>
          <mesh position={[0, 2.51, s * 3.15]}><boxGeometry args={[35.7, 0.02, 0.72]} /><meshStandardMaterial color={C.crane} /></mesh>
        </group>
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[-11.5 + i * 1.8, 0.7, 0]}><boxGeometry args={[0.5, 0.2, 1.4]} /><meshStandardMaterial color={C.block} /></mesh>
      ))}
      <Crane x={-12} side={1} /><Crane x={6} side={1} /><Crane x={-4} side={-1} /><Crane x={13} side={-1} />
    </group>
  )
}

function hullShape(len: number, beam: number) {
  const s = new THREE.Shape(); const h = beam / 2
  s.moveTo(-len / 2, -h * 0.92); s.lineTo(len * 0.28, -h); s.quadraticCurveTo(len * 0.47, -h * 0.75, len / 2, 0)
  s.quadraticCurveTo(len * 0.47, h * 0.75, len * 0.28, h); s.lineTo(-len / 2, h * 0.92); s.quadraticCurveTo(-len / 2 - 0.3, 0, -len / 2, -h * 0.92)
  return s
}

function CruiseShip() {
  const len = 25, beam = 3.1
  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(hullShape(len, beam), { depth: 1, bevelEnabled: false })
    g.rotateX(-Math.PI / 2); return g
  }, [])
  const decks = [[21, 2.8, 0.9], [19, 2.7, 0.9], [17, 2.6, 0.9], [14, 2.4, 0.7]]
  return (
    <group>
      {/* bottom (antifouling) 0..0.9, topsides 0.9..1.7 */}
      <mesh geometry={geo} scale={[1, 0.9, 1]}><meshStandardMaterial color={C.bottom} roughness={0.7} /></mesh>
      <mesh geometry={geo} position={[0, 0.9, 0]} scale={[1, 0.1, 1]}><meshStandardMaterial color={C.boot} /></mesh>
      <mesh geometry={geo} position={[0, 1.0, 0]} scale={[1, 0.8, 1]}><meshStandardMaterial color={C.hull} roughness={0.5} /></mesh>
      {decks.map(([l, b, hgt], i) => {
        const y = 1.8 + decks.slice(0, i).reduce((a, d) => a + d[2], 0)
        return (
          <group key={i} position={[-1.2 - i * 0.4, y + hgt / 2, 0]}>
            <mesh><boxGeometry args={[l, hgt, b]} /><meshStandardMaterial color={C.sup} roughness={0.55} /></mesh>
            {[1, -1].map(s => <mesh key={s} position={[0, 0.05, s * (b / 2 + 0.005)]}><boxGeometry args={[l * 0.96, hgt * 0.32, 0.01]} /><meshStandardMaterial color={C.glass} roughness={0.2} metalness={0.3} /></mesh>)}
          </group>
        )
      })}
      <mesh position={[-7.4, 6.4, 0]}><boxGeometry args={[1.6, 1.4, 1.1]} /><meshStandardMaterial color={C.funnel} /></mesh>
      <mesh position={[8.6, 5.2, 0]}><boxGeometry args={[1.8, 0.6, 3.2]} /><meshStandardMaterial color={C.sup} /></mesh>
    </group>
  )
}

function Rig({ progress }: { progress: MutableRefObject<number> }) {
  const dock = useRef<THREE.Group>(null!)
  const ship = useRef<THREE.Group>(null!)
  const smooth = useRef(0)
  useFrame(({ camera, clock, pointer, size }) => {
    const portrait = size.width / size.height < 1
    const t = clock.elapsedTime
    smooth.current += (progress.current - smooth.current) * 0.06
    const p = smooth.current
    // dock: submerged deck at -2.6 -> deck 1.2 above water
    const deck = THREE.MathUtils.lerp(-2.6, 1.0, THREE.MathUtils.smoothstep(p, 0.05, 0.95))
    dock.current.position.y = deck - 0.6 + Math.sin(t * 0.6) * 0.02
    // ship floats with a draft of ~0.85 units until the blocks reach its keel, then rides up on them
    const float = -0.85 + Math.sin(t * 0.8) * 0.03
    ship.current.position.y = Math.max(float, deck + 0.2)
    ship.current.rotation.x = deck + 0.2 > float ? 0 : Math.sin(t * 0.7) * 0.006
    if (portrait) {
      camera.position.set(-30 - p * 4, 10 + p * 8, 46 + p * 8)
      camera.lookAt(6, 9.5 + p * 1.5, -6)
    } else {
      camera.position.set(-24 - p * 4 + pointer.x * 1.2, 8 + p * 7 + pointer.y * 0.4, 34 + p * 8)
      camera.lookAt(-2 + p * 2, 4.2 + p * 1.2, -4)
    }
  })
  return (
    <group rotation={[0, -0.12, 0]} position={[12, 0, -6]}>
      <group ref={dock}><FloatingDock /></group>
      <group ref={ship}><CruiseShip /></group>
    </group>
  )
}

function Shore() {
  // low limestone quay and pine line of Freeport Harbour in the distance
  return (
    <group position={[0, 0, -46]}>
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[220, 1, 6]} /><meshStandardMaterial color="#cdc8bb" /></mesh>
      <mesh position={[0, 1.6, -3]}><boxGeometry args={[220, 1.4, 4]} /><meshStandardMaterial color="#6f7d6a" /></mesh>
      {[-40, -32, 34, 46].map(x => (
        <group key={x} position={[x, 1, 0]}>
          <mesh position={[0, 4, 0]}><boxGeometry args={[0.6, 8, 0.6]} /><meshStandardMaterial color="#9aa29a" /></mesh>
          <mesh position={[2.5, 8, 0]}><boxGeometry args={[7, 0.5, 0.5]} /><meshStandardMaterial color="#9aa29a" /></mesh>
        </group>
      ))}
    </group>
  )
}

export default function Dock({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [-26, 7.5, 30], fov: 34, near: 0.1, far: 700 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }} aria-hidden="true">
      <fog attach="fog" args={["#ece8de", 45, 160]} />
      <Sky />
      <hemisphereLight args={["#eef0ec", "#5b6a6a", 0.9]} />
      <directionalLight position={[-30, 25, -40]} intensity={1.6} color="#ffe2bd" />
      <directionalLight position={[20, 10, 30]} intensity={0.5} color="#cfe0e6" />
      <Shore />
      <Rig progress={progress} />
      <Sea />
    </Canvas>
  )
}
