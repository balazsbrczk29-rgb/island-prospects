// The stage: the building in Nassau noon light. Scroll progress (0..1) drives everything: at 0 the roof hangs
// apart, each chapter lowers one layer into place with weight, the camera climbs from the street to the roof.
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { buildRoof, IW } from './building'

import { CH, GAP, GROUND } from './stage'
const LAYER_MID = [-0.15, 0.02, 0.15, 0.045, 0.02, 0.04]

export type Anchor = { x: number; y: number }
export type SceneApi = { invalidate: () => void }

type Key = { p: number; az: number; el: number; need: number; ty: number; sx: number; sy: number }
// camera keys: landscape frames by height (need = metres top to bottom), portrait by width
const WIDE: Key[] = [
  { p: 0, az: 0.7, el: 0.27, need: 25.2, ty: 7.5, sx: -0.058, sy: 0.012 },
  { p: CH[0], az: 0.78, el: 0.4, need: 22.5, ty: 9.4, sx: -0.17, sy: 0.01 },
  { p: CH[2], az: 0.86, el: 0.5, need: 21, ty: 9.0, sx: -0.19, sy: 0.02 },
  { p: CH[5], az: 0.94, el: 0.6, need: 20.5, ty: 8.7, sx: -0.2, sy: 0.03 },
  { p: CH[6], az: 0.8, el: 0.74, need: 19.5, ty: 6.9, sx: -0.21, sy: 0.03 },
  { p: 1, az: 0.74, el: 0.78, need: 19.5, ty: 6.9, sx: -0.21, sy: 0.03 },
]
const TALL: Key[] = [
  { p: 0, az: 0.74, el: 0.3, need: 24, ty: 7.9, sx: 0, sy: 0.235 },
  { p: CH[0], az: 0.82, el: 0.42, need: 23, ty: 9.2, sx: 0, sy: 0.22 },
  { p: CH[2], az: 0.9, el: 0.5, need: 22.5, ty: 8.8, sx: 0, sy: 0.22 },
  { p: CH[5], az: 0.98, el: 0.58, need: 22, ty: 8.0, sx: 0, sy: 0.22 },
  { p: CH[6], az: 0.86, el: 0.72, need: 24, ty: 7.0, sx: 0, sy: 0.33 },
  { p: 1, az: 0.8, el: 0.76, need: 24, ty: 7.0, sx: 0, sy: 0.33 },
]
const dq = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('cam') : null   // ?cam=az,el,need,ty,sx,sy for making stills
const debugCam: Key | null = dq ? (([az, el, need, ty, sx, sy]) => ({ p: 0, az, el, need, ty, sx: sx || 0, sy: sy || 0 }))(dq.split(',').map(Number)) : null
const ss = (a: number, b: number, x: number) => { const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t) }
function sample(keys: Key[], p: number): Key {
  let i = 0; while (i < keys.length - 2 && p > keys[i + 1].p) i++
  const a = keys[i], b = keys[i + 1], t = ss(a.p, b.p, p), m = (k: keyof Key) => a[k] + (b[k] - a[k]) * t
  return { p, az: m('az'), el: m('el'), need: m('need'), ty: m('ty'), sx: m('sx'), sy: m('sy') }
}

function Stage({ progress, finish, still, onAnchors, api }: {
  progress: MutableRefObject<number>; finish: number; still: boolean; onAnchors?: (a: Anchor[]) => void; api?: MutableRefObject<SceneApi | null>
}) {
  const roof = useMemo(() => buildRoof(), [])
  const { camera, size, invalidate, gl, scene, viewport } = useThree()
  const sun = useRef<THREE.DirectionalLight>(null!)
  const cur = useRef(GAP.map(() => 0)), vel = useRef(GAP.map(() => 0)), entered = useRef(GAP.map(() => (still && !location.search.includes('assembled') ? 1 : 0)))
  const pointer = useRef({ x: 0, y: 0 }), eased = useRef({ x: 0, y: 0 })
  const cam = useRef<Key | null>(null)
  const v = useMemo(() => new THREE.Vector3(), [])

  // ambient occlusion: the soft darkening in corners and under ledges that makes geometry read as built
  const composer = useMemo(() => {
    try {
      const target = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 4 })
      const c = new EffectComposer(gl, target)
      c.addPass(new RenderPass(scene, camera))
      const ao = new GTAOPass(scene, camera, 4, 4)
      ao.blendIntensity = 1
      ao.updateGtaoMaterial({ radius: 1.3, distanceExponent: 1.5, thickness: 2.2, scale: 1.7, samples: 16, distanceFallOff: 1, screenSpaceRadius: false })
      ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 16 })
      c.addPass(ao); c.addPass(new OutputPass())
      return c
    } catch { return null }
  }, [gl, scene, camera])

  useEffect(() => () => { roof.dispose(); composer?.dispose() }, [roof, composer])
  useEffect(() => { composer?.setPixelRatio(viewport.dpr); composer?.setSize(size.width, size.height); invalidate() }, [composer, size, viewport.dpr, invalidate])
  useEffect(() => { roof.setFinish(finish); invalidate() }, [roof, finish, invalidate])
  useEffect(() => { if (api) api.current = { invalidate }; return () => { if (api) api.current = null } }, [api, invalidate])
  useEffect(() => {
    scene.background = new THREE.Color(GROUND)
    const s = sun.current.shadow; s.mapSize.set(4096, 4096); s.bias = -0.0004; s.normalBias = 0.035; s.radius = 5; s.blurSamples = 16
    const c = s.camera as THREE.OrthographicCamera; c.left = -18; c.right = 18; c.top = 22; c.bottom = -14; c.near = 1; c.far = 90; c.updateProjectionMatrix()
    gl.shadowMap.type = THREE.PCFSoftShadowMap
    const move = (e: PointerEvent) => { if (e.pointerType === 'touch') return; pointer.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 }; invalidate() }
    addEventListener('pointermove', move, { passive: true })
    // entrance: the roof comes apart from the top down, one layer at a time
    const timers = still || location.search.includes('assembled') ? [] : [4, 3, 2, 1, 0].map((layer, k) => setTimeout(() => { entered.current[layer] = 1; invalidate() }, 500 + k * 190))
    return () => { removeEventListener('pointermove', move); timers.forEach(clearTimeout) }
  }, [gl, scene, invalidate, still])

  useFrame((_, dt) => {
    const p = progress.current; let moving = false
    const steps = Math.max(1, Math.min(12, Math.ceil(dt * 120))), h = Math.min(dt, 0.1) / steps
    for (let i = 0; i < roof.layers.length; i++) {                 // a damped spring: every layer lands with weight
      const target = entered.current[i] * (1 - ss(CH[i + 1] - 0.015, CH[i + 1] + 0.05, p)) * GAP[i]
      if (still) { cur.current[i] = target; vel.current[i] = 0 }
      for (let k = 0; k < steps; k++) { const a = (target - cur.current[i]) * 30 - vel.current[i] * 10.4; vel.current[i] += a * h; cur.current[i] += vel.current[i] * h }
      if (Math.abs(target - cur.current[i]) > 0.0015 || Math.abs(vel.current[i]) > 0.003) moving = true; else { cur.current[i] = target; vel.current[i] = 0 }
      roof.layers[i].position.y = cur.current[i]
    }
    eased.current.x += (pointer.current.x - eased.current.x) * 0.05; eased.current.y += (pointer.current.y - eased.current.y) * 0.05
    if (Math.abs(pointer.current.x - eased.current.x) > 0.0008) moving = true

    const portrait = size.width / size.height < 0.95
    const want = debugCam ?? sample(portrait ? TALL : WIDE, p)
    if (!cam.current || still) cam.current = want
    else { const c = cam.current, k = 1 - Math.pow(0.0012, Math.min(dt, 0.1)); for (const key of ['az', 'el', 'need', 'ty', 'sx', 'sy'] as const) { c[key] += (want[key] - c[key]) * k; if (Math.abs(want[key] - c[key]) > 0.0008) moving = true } }
    const c = cam.current, pc = camera as THREE.PerspectiveCamera
    const az = c.az + eased.current.x * 0.08, el = c.el - eased.current.y * 0.025
    const tan = 2 * Math.tan(THREE.MathUtils.degToRad(pc.fov) / 2)
    const dist = portrait ? c.need / (tan * (size.width / size.height)) : c.need / tan
    pc.position.set(Math.sin(az) * Math.cos(el) * dist, c.ty + Math.sin(el) * dist, Math.cos(az) * Math.cos(el) * dist + 0.8)
    pc.lookAt(0, c.ty, 0.5)
    pc.setViewOffset(size.width, size.height, size.width * c.sx, size.height * c.sy, size.width, size.height)
    pc.updateMatrixWorld()

    if (onAnchors) {
      const pts: Anchor[] = []
      for (let i = 0; i < 6; i++) {
        v.set(i === 5 ? IW / 2 + 0.4 : i ? IW / 2 : IW / 2 - 0.9, roof.rest[i] + (i ? LAYER_MID[i] : 0) + (i ? cur.current[i - 1] : 0), i === 5 ? 0 : i ? 1.2 : 2.6).project(pc)
        pts.push({ x: (v.x * 0.5 + 0.5) * size.width, y: (-v.y * 0.5 + 0.5) * size.height })
      }
      onAnchors(pts)
    }
    if (composer) composer.render(); else gl.render(scene, camera)
    if (moving) invalidate()
  }, 1)

  return (
    <>
      <primitive object={roof.root} />
      <directionalLight ref={sun} position={[-9, 27, 15]} intensity={3.9} color="#fff1dc" castShadow />
      <hemisphereLight args={['#bcd9f0', '#d8c7ae', 0.3]} />
      {/* the page itself is the ground: this plane only catches the block's shadow */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.905, 1.0]} receiveShadow>
        <planeGeometry args={[160, 160]} />
        <shadowMaterial transparent opacity={0.17} color="#3a3126" />
      </mesh>
      <Environment resolution={256} environmentIntensity={0.34}>
        <color attach="background" args={['#a9c4d6']} />
        <Lightformer form="rect" intensity={5} color="#e3eff8" position={[0, 30, 0]} rotation-x={Math.PI / 2} scale={[80, 80, 1]} />
        <Lightformer form="rect" intensity={2.6} color="#fff0d8" position={[-22, 12, 16]} scale={[26, 18, 1]} target={[0, 4, 0]} />
        <Lightformer form="rect" intensity={1.3} color="#cfe2ee" position={[26, 8, 6]} scale={[20, 18, 1]} target={[0, 4, 0]} />
        <Lightformer form="rect" intensity={1.6} color="#efe6d4" position={[0, -8, 0]} rotation-x={-Math.PI / 2} scale={[90, 90, 1]} />
      </Environment>
    </>
  )
}

export default function RoofScene({ progress, finish, still, onAnchors, onReady, api, className }: {
  progress: MutableRefObject<number>; finish: number; still: boolean; onAnchors?: (a: Anchor[]) => void; onReady?: () => void
  api?: MutableRefObject<SceneApi | null>; className?: string
}) {
  return (
    <Canvas className={className} shadows frameloop="demand" dpr={[1, 1.75]} camera={{ fov: 21, near: 2, far: 400, position: [40, 30, 50] }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.NeutralToneMapping; gl.toneMappingExposure = 1.1; requestAnimationFrame(() => onReady?.()) }}>
      <Stage progress={progress} finish={finish} still={still} onAnchors={onAnchors} api={api} />
    </Canvas>
  )
}
