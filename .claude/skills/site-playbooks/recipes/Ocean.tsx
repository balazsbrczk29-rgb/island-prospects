// RECIPE: photoreal ocean + sky (custom ocean shader + three.js physical Sky), golden hour by default.
// Use for: marina, resort, tours, dive, boat rental heroes, or any water-led signature.
// Why it is not "toy 3D": physically based sky scattering, fresnel water with layered moving waves, a sun glitter
// path, horizon haze, ACES tone mapping. Keep the camera low (1-4 m) and the horizon on the lower third.
// Copy into your site's src/, lazy-load it: const Ocean = lazy(() => import('./Ocean'))
// Mobile: it runs, but cap dpr at 1.5 and give the Canvas a poster photo behind it for no-WebGL devices.
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, extend, useFrame, useThree, type ThreeElement } from '@react-three/fiber'
import * as THREE from 'three'
import { Sky } from 'three/examples/jsm/objects/Sky.js'

extend({ Sky })
declare module '@react-three/fiber' { interface ThreeElements { sky: ThreeElement<typeof Sky> } }

// Our own ocean shader (no mirror render pass: robust on every GPU and cheap on phones):
// layered moving waves -> normal; fresnel mix of a sky reflection and the water body colour; sun glitter path;
// haze to the horizon colour. Shallow-water tint near the camera reads as Bahamian turquoise.
const oceanVert = /* glsl */ `
uniform float uTime; varying vec3 vWorld;
void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`
const oceanFrag = /* glsl */ `
uniform float uTime; uniform vec3 uSun; uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uHorizon; uniform vec3 uZenith; uniform vec3 uSunColor;
varying vec3 vWorld;
vec2 wave(vec2 p, vec2 d, float f, float s, float a){ float ph = dot(p, d) * f + uTime * s; return d * cos(ph) * a * f; }
void main(){
  vec2 p = vWorld.xz;
  vec2 g = wave(p, normalize(vec2(1.0, .3)), .08, 1.1, .5) + wave(p, normalize(vec2(-.4, 1.0)), .13, 1.5, .32)
         + wave(p, normalize(vec2(.7, -.6)), .31, 2.3, .14) + wave(p, normalize(vec2(-.9, -.2)), .73, 3.1, .06)
         + wave(p, normalize(vec2(.2, .9)), 1.9, 4.7, .022);
  vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
  vec3 v = normalize(cameraPosition - vWorld);
  float dist = length(cameraPosition.xz - vWorld.xz);
  n = normalize(mix(n, vec3(0.0, 1.0, 0.0), smoothstep(60.0, 900.0, dist)));      // calm the far field
  vec3 r = reflect(-v, n);
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
  vec3 sky = mix(uHorizon, uZenith, pow(clamp(r.y, 0.0, 1.0), 0.45));
  vec3 body = mix(uShallow, uDeep, smoothstep(8.0, 140.0, dist));
  vec3 col = mix(body, sky, fres);
  float spec = pow(max(dot(r, normalize(uSun)), 0.0), 900.0) * 6.0 + pow(max(dot(r, normalize(uSun)), 0.0), 60.0) * 0.35;
  col += uSunColor * spec;
  col = mix(col, uHorizon, smoothstep(250.0, 3000.0, dist));                       // horizon haze
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`

export type OceanProps = {
  /** sun elevation in degrees above the horizon: 1-6 golden hour, 15-40 day, -2..0 blue hour */
  elevation?: number
  /** sun azimuth in degrees (180 = straight ahead of the camera) */
  azimuth?: number
  /** deep water colour, e.g. '#0b3d5a'; shallow colour near the camera, e.g. Bahamian turquoise '#2fb3b1' */
  deep?: string
  shallow?: string
  /** 0..1 progress (e.g. from ScrollStage) that slowly dollies the camera forward */
  progress?: number
  children?: React.ReactNode
}

function Scene({ elevation = 4, azimuth = 180, deep = '#0d3f57', shallow = '#2a9fa3', progress = 0, children }: OceanProps) {
  const { gl, camera } = useThree()
  const sky = useRef<Sky>(null!)
  const sun = useMemo(() => {
    const phi = THREE.MathUtils.degToRad(90 - elevation), theta = THREE.MathUtils.degToRad(azimuth)
    return new THREE.Vector3().setFromSphericalCoords(1, phi, theta)
  }, [elevation, azimuth])
  const golden = elevation < 8
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uSun: { value: sun.clone() },
    uDeep: { value: new THREE.Color(deep) }, uShallow: { value: new THREE.Color(shallow) },
    uHorizon: { value: new THREE.Color(golden ? '#f2c9a0' : '#cfe3ea') }, uZenith: { value: new THREE.Color(golden ? '#7f9bb3' : '#5f93c4') },
    uSunColor: { value: new THREE.Color(golden ? '#ffd2a1' : '#ffffff') },
  }), [sun, deep, shallow, golden])

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = golden ? 0.5 : 0.6
    const u = sky.current.material.uniforms
    u.turbidity.value = golden ? 7 : 4; u.rayleigh.value = golden ? 2.2 : 1.2; u.mieCoefficient.value = 0.005; u.mieDirectionalG.value = 0.86
    u.sunPosition.value.copy(sun)
  }, [gl, sun, golden])

  useFrame((_, dt) => {
    uniforms.uTime.value += dt
    camera.position.z = 30 - progress * 18
    camera.position.y = 2.2 + Math.sin(performance.now() / 2600) * 0.06 // a slow, breathing, hand-held feel
    camera.lookAt(0, 1.2, -200)
  })

  return (
    <>
      <sky ref={sky} scale={10000} />
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[12000, 12000, 1, 1]} />
        <shaderMaterial vertexShader={oceanVert} fragmentShader={oceanFrag} uniforms={uniforms} />
      </mesh>
      {children}
    </>
  )
}

export default function Ocean(props: OceanProps & { className?: string }) {
  return (
    <Canvas className={props.className} dpr={[1, 1.5]} camera={{ fov: 42, near: 0.5, far: 20000, position: [0, 2.2, 30] }} gl={{ antialias: true }}>
      <Scene {...props} />
    </Canvas>
  )
}
