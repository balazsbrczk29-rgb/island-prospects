// Hero: golden hour over the Bell Channel approach. Procedural sky (drei Sky, no network),
// reflective sea with fresnel + sun glint, a motor yacht silhouette heading for the channel markers.
import { Canvas, useFrame } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"

const SUN = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(88.6), THREE.MathUtils.degToRad(205))

const vert = /* glsl */ `
uniform float uTime; varying vec3 vWorld; varying vec3 vN;
float h(vec2 p, float t){ return sin(p.x*.35+t*.6)*.18 + sin(p.y*.5+t*.45)*.12 + sin((p.x+p.y)*1.3+t*1.2)*.05 + sin((p.x-p.y)*2.7+t*1.7)*.02; }
void main(){
  vec3 p = position; float t = uTime;
  p.z += h(p.xy, t);
  float e=.05; float hx = h(p.xy+vec2(e,0.),t)-h(p.xy-vec2(e,0.),t); float hy = h(p.xy+vec2(0.,e),t)-h(p.xy-vec2(0.,e),t);
  vN = normalize(vec3(-hx/(2.*e), -hy/(2.*e), 1.));
  vec4 w = modelMatrix * vec4(p,1.); vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`
const frag = /* glsl */ `
uniform vec3 uSun; uniform vec3 uDeep; uniform vec3 uSky; uniform vec3 uGlint; varying vec3 vWorld; varying vec3 vN;
void main(){
  vec3 n = normalize(vec3(vN.x, vN.z, -vN.y));
  vec3 v = normalize(cameraPosition - vWorld);
  float fres = pow(1. - max(dot(n, v), 0.), 4.);
  vec3 r = reflect(-v, n);
  float spec = pow(max(dot(r, normalize(uSun)), 0.), 220.) * 3.0;
  float sheen = pow(max(dot(r, normalize(uSun)), 0.), 18.) * .35;
  vec3 col = mix(uDeep, uSky, clamp(fres*0.9, 0., 1.));
  float toSun = max(dot(normalize(vec3(r.x,0.,r.z)), normalize(vec3(uSun.x,0.,uSun.z))), 0.);
  col += vec3(1.0,.55,.28) * pow(toSun, 12.) * fres * .5;
  col += uGlint * (spec + sheen);
  float dist = length(vWorld.xz - cameraPosition.xz);
  col = mix(col, vec3(.85,.62,.48), smoothstep(40., 110., dist));
  gl_FragColor = vec4(col, 1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`

function Ocean() {
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uSun: { value: SUN.clone() },
    uDeep: { value: new THREE.Color("#06222c") }, uSky: { value: new THREE.Color("#6f8c99") }, uGlint: { value: new THREE.Color("#ffc58a") },
  }), [])
  useFrame((_, d) => { mat.current.uniforms.uTime.value += d })
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[220, 220, 260, 260]} />
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  )
}

function Yacht() {
  const ref = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.position.set(4.5 + ((t * 0.12) % 8), 0.12 + Math.sin(t * 1.2) * 0.04, -22)
    ref.current.rotation.z = Math.sin(t * 0.9) * 0.012
  })
  const hull = "#121a1f"
  return (
    <group ref={ref} scale={0.9}>
      <mesh position={[0, 0.25, 0]}><boxGeometry args={[4.2, 0.5, 1.1]} /><meshStandardMaterial color={hull} roughness={0.4} /></mesh>
      <mesh position={[2.35, 0.25, 0]} rotation={[0, Math.PI / 4, 0]}><boxGeometry args={[0.78, 0.5, 0.78]} /><meshStandardMaterial color={hull} /></mesh>
      <mesh position={[-0.2, 0.72, 0]}><boxGeometry args={[2.3, 0.45, 0.95]} /><meshStandardMaterial color={hull} /></mesh>
      <mesh position={[-0.5, 1.08, 0]}><boxGeometry args={[1.3, 0.28, 0.85]} /><meshStandardMaterial color={hull} /></mesh>
      <mesh position={[-0.2, 0.74, 0.48]}><boxGeometry args={[2.0, 0.12, 0.01]} /><meshBasicMaterial color="#ffcf8a" /></mesh>
      <mesh position={[-0.6, 1.6, 0]}><cylinderGeometry args={[0.02, 0.02, 0.9, 6]} /><meshStandardMaterial color={hull} /></mesh>
    </group>
  )
}

function Marker({ x, z, color }: { x: number; z: number; color: string }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => { ref.current.position.y = Math.sin(clock.elapsedTime * 1.4 + x) * 0.05 })
  return (
    <group ref={ref} position={[x, 0, z]}>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.08, 0.14, 1, 10]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0, 1.08, 0]}><sphereGeometry args={[0.05, 10, 10]} /><meshBasicMaterial color={color === "#2f7d4f" ? "#7dffa8" : "#ff8a7a"} /></mesh>
    </group>
  )
}

function Dolly() {
  useFrame(({ camera, clock, pointer }) => {
    const t = clock.elapsedTime
    camera.position.x = Math.sin(t * 0.05) * 0.8 + pointer.x * 0.6
    camera.position.y = 1.6 + pointer.y * 0.15
    camera.lookAt(0, 2.2, -30)
  })
  return null
}

export default function Cinematic() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.6, 6], fov: 42, near: 0.1, far: 400 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.5 }} aria-hidden="true">
      <Sky distance={4500} sunPosition={[SUN.x * 100, SUN.y * 100, SUN.z * 100]} turbidity={9} rayleigh={3} mieCoefficient={0.005} mieDirectionalG={0.88} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[SUN.x * 50, 10, SUN.z * 50]} intensity={0.6} color="#ffcf9a" />
      <Ocean />
      <Yacht />
      <Marker x={-2.2} z={-9} color="#2f7d4f" />
      <Marker x={2.4} z={-9} color="#b2453a" />
      <Marker x={-1.6} z={-20} color="#2f7d4f" />
      <Marker x={1.8} z={-20} color="#b2453a" />
      <Dolly />
    </Canvas>
  )
}
