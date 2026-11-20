// The arrival: open water off the south shore of Grand Bahama at dusk, crossing toward the low line of the island
// and the cut of Bell Channel. Built from the site-playbooks Ocean recipe (custom ocean shader + physical Sky),
// art-directed: the sun sinks below the horizon as you scroll, the island rises out of the haze, shore lights come on,
// and a pair of channel lights marks the cut. Progress 0..1 comes from the ScrollStage.
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, extend, useFrame, useThree, type ThreeElement } from '@react-three/fiber'
import * as THREE from 'three'
import { Sky } from 'three/examples/jsm/objects/Sky.js'

extend({ Sky })
declare module '@react-three/fiber' { interface ThreeElements { sky: ThreeElement<typeof Sky> } }

const oceanVert = /* glsl */ `
varying vec3 vWorld;
void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`

const oceanFrag = /* glsl */ `
uniform float uTime; uniform vec3 uSun; uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uHorizon; uniform vec3 uZenith; uniform vec3 uSunColor;
uniform float uGlow; uniform vec3 uLightCol; uniform float uLights; uniform vec2 uFlash;
varying vec3 vWorld;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
vec2 wave(vec2 p, vec2 d, float f, float s, float a){ float ph = dot(p, d) * f + uTime * s; return d * cos(ph) * a * f; }
void main(){
  vec2 p = vWorld.xz;
  // eight wave trains in different directions + a noise chop: no regular stripes
  vec2 g = wave(p, normalize(vec2(1.0, .3)), .07, 1.0, .45) + wave(p, normalize(vec2(-.4, 1.0)), .11, 1.3, .30)
         + wave(p, normalize(vec2(.7, -.6)), .23, 1.9, .14) + wave(p, normalize(vec2(-.9, -.2)), .41, 2.6, .07)
         + wave(p, normalize(vec2(.2, .9)), .83, 3.4, .035) + wave(p, normalize(vec2(-.6, .55)), 1.37, 4.1, .022)
         + wave(p, normalize(vec2(.95, .1)), 2.3, 5.3, .012) + wave(p, normalize(vec2(-.15, -1.0)), 3.7, 6.1, .007);
  float n1 = noise(p * .35 + uTime * .25) - .5, n2 = noise(p * 1.1 - uTime * .4) - .5;
  g += vec2(n1, n2) * .09;
  vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
  vec3 v = normalize(cameraPosition - vWorld);
  float dist = length(cameraPosition.xz - vWorld.xz);
  n = normalize(mix(n, vec3(0.0, 1.0, 0.0), smoothstep(80.0, 1400.0, dist)));
  vec3 r = reflect(-v, n);
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
  vec3 sky = mix(uHorizon, uZenith, pow(clamp(r.y, 0.0, 1.0), 0.4));
  vec3 body = mix(uShallow, uDeep, smoothstep(6.0, 160.0, dist));
  vec3 col = mix(body, sky, fres);
  vec3 sd = normalize(uSun);
  float s = max(dot(r, sd), 0.0);
  col += uSunColor * (pow(s, 900.0) * 5.0 + pow(s, 50.0) * 0.4) * uGlow;
  // long warm streaks of the shore lights on the water, toward the camera
  float lx = vWorld.x;
  float streak = 0.0;
  float wid = 1.2 + dist * 0.006;
  for (int i = 0; i < 9; i++) {
    float fx = -420.0 + float(i) * 105.0 + sin(float(i) * 3.7) * 30.0;
    streak += exp(-pow((lx - fx + n.x * 140.0) / wid, 2.0)) * (0.6 + 0.4 * sin(float(i) * 1.9));
  }
  float sg = exp(-pow((lx + 26.0 + n.x * 140.0) / wid, 2.0)), sr = exp(-pow((lx - 26.0 + n.x * 140.0) / wid, 2.0));
  float reach = smoothstep(60.0, 900.0, dist) * step(-2190.0, vWorld.z) * uLights;
  col += uLightCol * streak * reach * 1.1 + (vec3(0.3, 1.0, 0.5) * sg * uFlash.x + vec3(1.0, 0.3, 0.25) * sr * uFlash.y) * reach * 1.4;
  col = mix(col, uHorizon, smoothstep(300.0, 3600.0, dist));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`

// The island: a long, low silhouette (Grand Bahama is flat: casuarina and pine tops), with the cut of the channel.
const landVert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
const landFrag = /* glsl */ `
uniform vec3 uCol; uniform vec3 uHaze; uniform float uHazeAmt; varying vec2 vUv;
float hash(float x){ return fract(sin(x * 91.17) * 43758.5453); }
float n1(float x){ float i = floor(x), f = fract(x); return mix(hash(i), hash(i + 1.0), f*f*(3.0-2.0*f)); }
void main(){
  float x = vUv.x * 900.0;
  // Grand Bahama is flat: low scrub, sparse stands of casuarina, a few low buildings near the channel
  float h = 0.22 + 0.05 * n1(x * 0.3) + 0.025 * n1(x * 1.7) + 0.012 * n1(x * 6.0);
  h += smoothstep(0.6, 0.92, n1(x * 0.045)) * (0.22 + 0.12 * n1(x * 2.3));
  float u = vUv.x - 0.5;
  float b = 0.0;
  b = max(b, step(abs(u + 0.016), 0.0035) * 0.44); b = max(b, step(abs(u + 0.024), 0.0025) * 0.36);
  b = max(b, step(abs(u - 0.017), 0.004) * 0.40);  b = max(b, step(abs(u - 0.027), 0.003) * 0.47);
  b = max(b, step(abs(u - 0.046), 0.005) * 0.33);  b = max(b, step(abs(u + 0.058), 0.004) * 0.34);
  float cut = smoothstep(0.004, 0.0, abs(u) - 0.006);                                                     // Bell Channel: the gap
  h *= mix(0.45, 1.0, smoothstep(0.006, 0.012, abs(u)));
  h = max(h, b);
  if (vUv.y > h || cut > 0.5) discard;
  vec3 c = mix(uCol, uHaze, uHazeAmt);
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`

const lightVert = /* glsl */ `
attribute float aSize; attribute float aPhase; attribute vec3 aColor; attribute float aFlash;
uniform float uTime; uniform float uOn; varying vec3 vCol; varying float vA;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float tw = 0.75 + 0.25 * sin(uTime * (1.3 + aPhase) + aPhase * 10.0);
  float flash = aFlash > 0.5 ? step(0.82, fract(uTime / 4.0 + aPhase)) : 1.0;      // channel lights flash every 4 s
  vA = uOn * tw * flash; vCol = aColor;
  gl_PointSize = max(3.0, aSize * (5200.0 / -mv.z)) * (0.6 + 0.4 * flash);
  gl_Position = projectionMatrix * mv;
}`
const lightFrag = /* glsl */ `
varying vec3 vCol; varying float vA;
void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); float a = exp(-d * d * 40.0) + 0.35 * exp(-d * d * 9.0);
  gl_FragColor = vec4(vCol * a * vA * 1.6, a * vA); }`

export type ArrivalProps = { progress: number; still?: boolean }

const lerp = THREE.MathUtils.lerp
const fract = (x: number) => x - Math.floor(x)
const ease = (t: number) => t * t * (3 - 2 * t)

function Scene({ progress, still }: ArrivalProps) {
  const { gl, camera } = useThree()
  const sky = useRef<Sky>(null!)
  const LAND_Z = -2200

  const ocean = useMemo(() => ({
    uTime: { value: 0 }, uSun: { value: new THREE.Vector3() }, uGlow: { value: 1 },
    uDeep: { value: new THREE.Color('#0c3a4e') }, uShallow: { value: new THREE.Color('#2a8e93') },
    uHorizon: { value: new THREE.Color('#e9c3a2') }, uZenith: { value: new THREE.Color('#6d86a3') },
    uSunColor: { value: new THREE.Color('#ffcf9e') }, uLightCol: { value: new THREE.Color('#ffc27a') }, uLights: { value: 0 }, uFlash: { value: new THREE.Vector2() },
  }), [])
  const land = useMemo(() => ({ uCol: { value: new THREE.Color('#141f26') }, uHaze: { value: new THREE.Color('#8a7d80') }, uHazeAmt: { value: 0.4 } }), [])
  const lightsU = useMemo(() => ({ uTime: { value: 0 }, uOn: { value: 0 } }), [])

  const mats = useMemo(() => ({
    ocean: new THREE.ShaderMaterial({ vertexShader: oceanVert, fragmentShader: oceanFrag, uniforms: ocean }),
    land: new THREE.ShaderMaterial({ vertexShader: landVert, fragmentShader: landFrag, uniforms: land }),
    rock: new THREE.MeshBasicMaterial({ color: '#141f26', toneMapped: false }),
    lights: new THREE.ShaderMaterial({ vertexShader: lightVert, fragmentShader: lightFrag, uniforms: lightsU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  }), [ocean, land, lightsU])
  const lightsGeo = useMemo(() => {
    const pos: number[] = [], size: number[] = [], phase: number[] = [], col: number[] = [], flash: number[] = []
    const rnd = (i: number) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x) }
    // shore lights in clusters (houses, the hotels, the marketplace); the nine cluster centres throw streaks on the water
    const centres = Array.from({ length: 9 }, (_, i) => -420 + i * 105 + Math.sin(i * 3.7) * 30).concat([-1300, -980, -760, 640, 820, 1150, 1400])
    centres.forEach((cx, ci) => {
      const n = ci < 9 ? 4 + Math.floor(rnd(ci) * 6) : 2 + Math.floor(rnd(ci) * 4)
      for (let k = 0; k < n; k++) {
        const x = cx + (rnd(ci * 31 + k) - 0.5) * 46
        if (Math.abs(x) < 30) continue
        pos.push(x, 2.5 + rnd(ci * 7 + k) * 7, LAND_Z + 6); size.push(1.1 + rnd(ci * 3 + k) * 1.7); phase.push(rnd(ci * 11 + k)); flash.push(0)
        const warm = rnd(ci * 5 + k) > 0.18; col.push(...(warm ? [1, 0.74, 0.42] : [0.85, 0.9, 1]))
      }
    })
    // a light on each breakwater head (IALA region B: red to starboard when coming in from sea)
    pos.push(-26, 5, LAND_Z + 130); size.push(4.6); phase.push(0.0); col.push(0.35, 1, 0.55); flash.push(1)
    pos.push(26, 5, LAND_Z + 130); size.push(4.6); phase.push(0.5); col.push(1, 0.3, 0.25); flash.push(1)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setAttribute('aSize', new THREE.Float32BufferAttribute(size, 1))
    g.setAttribute('aPhase', new THREE.Float32BufferAttribute(phase, 1))
    g.setAttribute('aColor', new THREE.Float32BufferAttribute(col, 3))
    g.setAttribute('aFlash', new THREE.Float32BufferAttribute(flash, 1))
    return g
  }, [])

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    const u = sky.current.material.uniforms
    u.turbidity.value = 3.2; u.rayleigh.value = 2.0; u.mieCoefficient.value = 0.004; u.mieDirectionalG.value = 0.86
  }, [gl])

  const smooth = useRef(progress)
  const sun = useMemo(() => new THREE.Vector3(), [])
  const cH = useMemo(() => [new THREE.Color('#eec39c'), new THREE.Color('#8b8fa8'), new THREE.Color('#3b4a66')], [])
  const cZ = useMemo(() => [new THREE.Color('#6f8db0'), new THREE.Color('#3a5276'), new THREE.Color('#1a2840')], [])
  const tmpA = useMemo(() => new THREE.Color(), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    smooth.current = lerp(smooth.current, progress, Math.min(1, dt * 3))
    const p = smooth.current
    const e = ease(p)
    // the sun sets as you come in: golden hour -> sunset -> blue hour
    const elevation = lerp(2.4, -1.1, e)
    sun.setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - elevation), THREE.MathUtils.degToRad(163))
    sky.current.material.uniforms.sunPosition.value.copy(sun)
    gl.toneMappingExposure = lerp(0.52, 0.66, e)
    sky.current.material.uniforms.rayleigh.value = lerp(2.0, 4.4, e)
    ocean.uSun.value.copy(sun); ocean.uTime.value = still ? 4 : t
    ocean.uGlow.value = THREE.MathUtils.clamp(elevation / 2 + 0.6, 0, 1)
    const mix3 = (arr: THREE.Color[], k: number, out: THREE.Color) => k < 0.5 ? out.copy(arr[0]).lerp(arr[1], k * 2) : out.copy(arr[1]).lerp(arr[2], (k - 0.5) * 2)
    mix3(cH, e, tmpA); ocean.uHorizon.value.copy(tmpA); land.uHaze.value.copy(tmpA)
    mix3(cZ, e, tmpA); ocean.uZenith.value.copy(tmpA)
    ocean.uShallow.value.set('#2a8e93').lerp(new THREE.Color('#123f4f'), e)
    ocean.uDeep.value.set('#0c3a4e').lerp(new THREE.Color('#061a26'), e)
    ocean.uLights.value = THREE.MathUtils.smoothstep(p, 0.25, 0.7)
    land.uHazeAmt.value = lerp(0.38, 0.06, e); land.uHaze.value.multiplyScalar(0.62)
    land.uCol.value.set('#16222a').lerp(new THREE.Color('#070d12'), e)
    mats.rock.color.copy(land.uCol.value).lerp(land.uHaze.value, land.uHazeAmt.value * 0.8)
    ocean.uFlash.value.set(fract(t / 4) > 0.82 ? 1 : 0, fract(t / 4 + 0.5) > 0.82 ? 1 : 0)
    lightsU.uTime.value = t; lightsU.uOn.value = THREE.MathUtils.smoothstep(p, 0.18, 0.55)
    // camera: low over the water, closing on the cut; gentle swell
    camera.position.set(Math.sin(t / 7) * 0.6, 2.4 + Math.sin(t / 2.4) * 0.07, lerp(40, -1650, e))
    camera.rotation.set(0, 0, 0)
    camera.lookAt(0, lerp(70, 20, e) * (camera.position.z - LAND_Z) / 2240 + 2.4, LAND_Z)
    camera.rotateZ(Math.sin(t / 3.1) * 0.004)
  })

  return (
    <>
      <sky ref={sky} scale={10000} />
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[14000, 14000, 1, 1]} />
        <primitive object={mats.ocean} attach="material" />
      </mesh>
      <mesh position={[0, 23, LAND_Z]}>
        <planeGeometry args={[3200, 50]} />
        <primitive object={mats.land} attach="material" />
      </mesh>
      {[-1, 1].map(sd => (
        <mesh key={sd} position={[sd * 30, 0.6, LAND_Z + 62]} rotation-y={sd * 0.08} material={mats.rock}>
          <boxGeometry args={[9, 3.2, 140]} />
        </mesh>
      ))}
      <points geometry={lightsGeo} material={mats.lights} frustumCulled={false} />
    </>
  )
}

export default function Arrival({ progress, still, className }: ArrivalProps & { className?: string }) {
  return (
    <Canvas className={className} dpr={[1, 1.5]} camera={{ fov: 40, near: 0.5, far: 20000, position: [0, 2.4, 40] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }} frameloop={still ? 'demand' : 'always'}>
      <Scene progress={progress} still={still} />
    </Canvas>
  )
}
