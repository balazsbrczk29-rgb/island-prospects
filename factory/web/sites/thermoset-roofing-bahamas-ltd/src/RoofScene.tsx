// The stage: the building under Nassau noon light, its roof lifted apart. `lift` is 0 (assembled) to 1 (apart)
// per layer; the scene eases toward it with weight, and reports where each layer sits on screen for the callouts.
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { buildRoof, IW } from './building'

export const GAP = [1.45, 3.0, 4.55, 6.0, 7.6]        // how far each layer rises when the roof is apart (metres)
const LAYER_MID = [-0.15, 0.02, 0.15, 0.045, 0.02, 0.04] // anchor height inside each layer, deck first

export type Anchor = { x: number; y: number }

function Stage({ lift, onAnchors, wide, instant }: { lift: number[]; onAnchors?: (a: Anchor[]) => void; wide: boolean; instant?: boolean }) {
  const roof = useMemo(() => buildRoof(), [])
  const { camera, size, invalidate, gl } = useThree()
  const sun = useRef<THREE.DirectionalLight>(null!)
  const cur = useRef(lift.map(() => 0)), vel = useRef(lift.map(() => 0))
  const pointer = useRef({ x: 0, y: 0 }), eased = useRef({ x: 0, y: 0 })
  const v = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => () => roof.dispose(), [roof])
  useEffect(() => { invalidate() }, [lift, size, invalidate])
  useEffect(() => {
    const move = (e: PointerEvent) => { if (e.pointerType === 'touch') return; pointer.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 }; invalidate() }
    addEventListener('pointermove', move, { passive: true }); return () => removeEventListener('pointermove', move)
  }, [invalidate])
  useEffect(() => {
    const s = sun.current.shadow; s.mapSize.set(4096, 4096); s.bias = -0.0004; s.normalBias = 0.035; s.radius = 5; s.blurSamples = 16
    const c = s.camera as THREE.OrthographicCamera; c.left = -18; c.right = 18; c.top = 22; c.bottom = -14; c.near = 1; c.far = 90; c.updateProjectionMatrix()
    gl.shadowMap.type = THREE.PCFSoftShadowMap
  }, [gl])

  useFrame((_, dt) => {
    let moving = false
    const steps = Math.max(1, Math.min(12, Math.ceil(dt * 120))), h = Math.min(dt, 0.1) / steps   // sub-stepped so slow frames keep real time
    for (let i = 0; i < roof.layers.length; i++) {                 // a damped spring: things rise and settle with weight
      const target = (lift[i] ?? 0) * GAP[i]
      if (instant) { cur.current[i] = target; vel.current[i] = 0 }
      for (let k = 0; k < steps; k++) { const a = (target - cur.current[i]) * 26 - vel.current[i] * 9.4; vel.current[i] += a * h; cur.current[i] += vel.current[i] * h }
      if (Math.abs(target - cur.current[i]) > 0.0015 || Math.abs(vel.current[i]) > 0.003) moving = true; else { cur.current[i] = target; vel.current[i] = 0 }
      roof.layers[i].position.y = cur.current[i]
    }
    eased.current.x += (pointer.current.x - eased.current.x) * 0.05; eased.current.y += (pointer.current.y - eased.current.y) * 0.05
    if (Math.abs(pointer.current.x - eased.current.x) > 0.0008) moving = true

    const cam = camera as THREE.PerspectiveCamera
    const portrait = size.width / size.height < 0.95
    const az = (portrait ? 0.74 : 0.7) + eased.current.x * 0.09, el = (portrait ? 0.34 : 0.27) - eased.current.y * 0.03
    const need = portrait ? 21.5 : 25.2                             // metres that must fit: across on a phone, up on a desktop
    const vfov = THREE.MathUtils.degToRad(cam.fov)
    const dist = portrait ? need / (2 * Math.tan(vfov / 2) * (size.width / size.height)) : need / (2 * Math.tan(vfov / 2))
    const ty = portrait ? 7.9 : 7.9
    cam.position.set(Math.sin(az) * Math.cos(el) * dist, ty + Math.sin(el) * dist, Math.cos(az) * Math.cos(el) * dist + 1)
    cam.lookAt(0, ty, 0.6)
    if (wide) cam.setViewOffset(size.width, size.height, -size.width * 0.07, size.height * 0.012, size.width, size.height); else cam.clearViewOffset()
    cam.updateMatrixWorld()

    if (onAnchors) {
      const pts: Anchor[] = []
      for (let i = 0; i < 6; i++) {
        const y = roof.rest[i] + LAYER_MID[i] + (i ? cur.current[i - 1] : 0)
        v.set(i === 5 ? IW / 2 + 0.4 : IW / 2, y, i === 5 ? 0 : 1.2).project(cam)
        pts.push({ x: (v.x * 0.5 + 0.5) * size.width, y: (-v.y * 0.5 + 0.5) * size.height })
      }
      onAnchors(pts)
    }
    if (moving) invalidate()
  })

  return (
    <>
      <primitive object={roof.root} />
      <directionalLight ref={sun} position={[-9, 27, 15]} intensity={3.7} color="#fff3df" castShadow />
      <hemisphereLight args={['#cfe2f0', '#d8cbb2', 0.22]} />
      {/* the page itself is the ground: this only catches the block's shadow */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.91, 1.0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <shadowMaterial transparent opacity={0.19} color="#3a3126" />
      </mesh>
      <Environment resolution={256} environmentIntensity={0.3}>
        <color attach="background" args={['#b9cbd6']} />
        <Lightformer form="rect" intensity={5} color="#eaf2f8" position={[0, 30, 0]} rotation-x={Math.PI / 2} scale={[80, 80, 1]} />
        <Lightformer form="rect" intensity={2.4} color="#fff0d8" position={[-22, 12, 16]} scale={[26, 18, 1]} target={[0, 4, 0]} />
        <Lightformer form="rect" intensity={1.3} color="#d6e6ef" position={[26, 8, 6]} scale={[20, 18, 1]} target={[0, 4, 0]} />
        <Lightformer form="rect" intensity={1.6} color="#efe6d4" position={[0, -8, 0]} rotation-x={-Math.PI / 2} scale={[90, 90, 1]} />
      </Environment>
    </>
  )
}

export default function RoofScene({ lift, onAnchors, onReady, wide, instant, className }: {
  lift: number[]; onAnchors?: (a: Anchor[]) => void; onReady?: () => void; wide: boolean; instant?: boolean; className?: string
}) {
  return (
    <Canvas className={className} shadows frameloop="demand" dpr={[1, 2]} camera={{ fov: 21, near: 2, far: 400, position: [40, 30, 50] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.NeutralToneMapping; gl.toneMappingExposure = 1.12; gl.setClearColor(0x000000, 0); requestAnimationFrame(() => onReady?.()) }}>
      <Stage lift={lift} onAnchors={onAnchors} wide={wide} instant={instant} />
    </Canvas>
  )
}
