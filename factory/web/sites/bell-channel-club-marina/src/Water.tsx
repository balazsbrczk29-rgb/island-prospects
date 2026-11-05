// Signature moment: a calm, light shader sea seen from above the inlet. Light palette, no dark overlay.
import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

const vert = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying float vH;
void main() {
  vUv = uv;
  vec3 p = position;
  float h = sin(p.x * 1.6 + uTime * .55) * .07 + sin(p.y * 2.3 + uTime * .42) * .05 + sin((p.x + p.y) * 4.0 + uTime * .9) * .018;
  p.z += h; vH = h;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`
const frag = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying float vH;
void main() {
  vec3 shallow = vec3(0.839, 0.902, 0.890);   // sea #d6e6e3
  vec3 deep    = vec3(0.122, 0.478, 0.471);   // teal #1f7a78
  vec3 sand    = vec3(0.788, 0.722, 0.561);   // sand #c9b88f
  float channel = smoothstep(.36, .5, vUv.x) * (1.0 - smoothstep(.5, .64, vUv.x));   // the dredged channel runs through the middle
  vec3 col = mix(shallow, deep, channel * .55 + vH * 2.2 + .12);
  vec2 q = vUv * vec2(9.0, 7.0);
  float w1 = sin(q.x + sin(q.y * 1.7 + uTime * .6) * 1.3 + uTime * .35);
  float w2 = sin(q.y * 1.3 + sin(q.x * 1.1 - uTime * .5) * 1.6 - uTime * .28);
  float caustic = pow(1.0 - abs(w1 * w2), 6.0);
  col += caustic * .07;
  float shore = smoothstep(.06, .0, vUv.y);
  col = mix(col, sand, shore);
  gl_FragColor = vec4(col, 1.0);
}`

function Sea() {
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((_, d) => { mat.current.uniforms.uTime.value += d })
  return (
    <mesh rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -0.2, 0]}>
      <planeGeometry args={[7, 5, 180, 140]} />
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  )
}

function Buoy({ x, z, color, phase }: { x: number; z: number; color: string; phase: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => { const t = clock.getElapsedTime() + phase; ref.current.position.y = 0.06 + Math.sin(t * 1.3) * 0.03; ref.current.rotation.z = Math.sin(t) * 0.12 })
  return (
    <mesh ref={ref} position={[x, 0.06, z]}>
      <cylinderGeometry args={[0.035, 0.05, 0.16, 16]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  )
}

export default function Water() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.6, 2.6], fov: 38 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <ambientLight intensity={1.1} />
      <directionalLight position={[2, 4, 2]} intensity={1.2} />
      <Sea />
      {/* channel markers: green to starboard, red to port when entering (IALA B) */}
      <Buoy x={-0.42} z={0.6} color="#2f7d4f" phase={0} />
      <Buoy x={0.42} z={0.6} color="#b2453a" phase={1.2} />
      <Buoy x={-0.42} z={-0.4} color="#2f7d4f" phase={2.1} />
      <Buoy x={0.42} z={-0.4} color="#b2453a" phase={0.6} />
    </Canvas>
  )
}
