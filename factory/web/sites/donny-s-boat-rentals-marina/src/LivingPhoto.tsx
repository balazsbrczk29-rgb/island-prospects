// Their marina aerial, alive: depth parallax on pointer and scroll, a slow shimmer on the water of Black Sound.
// Adapted from the PhotoDepth recipe: the canvas only appears once the texture has loaded (the real <img> stays
// underneath for SEO and any failure), rendering pauses offscreen, phones get a lower pixel ratio.
import { useEffect, useRef } from 'react'
import type * as T3 from 'three'

const frag = /* glsl */ `
uniform sampler2D uImg; uniform vec2 uMouse; uniform float uStrength; uniform float uTime; uniform float uShimmer; uniform vec2 uCover; uniform vec2 uFocus;
varying vec2 vUv;
void main() {
  vec2 uv = (vUv - 0.5) * uCover + uFocus;
  float d = smoothstep(0.85, 0.0, uv.y) * 0.8 + 0.2 * (1.0 - uv.y);
  vec2 st = uv + uMouse * d * uStrength;
  float w = smoothstep(0.82, 0.2, uv.y);
  st.x += sin(uv.y * 150.0 + uTime * 1.4) * 0.0011 * w * uShimmer;
  st.y += cos(uv.x * 85.0 + uTime * 1.1) * 0.0007 * w * uShimmer;
  gl_FragColor = texture2D(uImg, clamp(st, 0.001, 0.999));
}`
const vert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`

export default function LivingPhoto({ src, srcSet, sizes = '100vw', alt, strength = 0.028, focus = [0.5, 0.5], className = '' }: {
  src: string; srcSet?: string; sizes?: string; alt: string; strength?: number; focus?: [number, number]; className?: string
}) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = box.current; if (!el) return
    // three.js loads after the first paint: the plain photo is the first screen, the living version fades in over it
    let dead = false, cleanup = () => {}
    import('three').then(THREE => { if (!dead) cleanup = run(THREE, el) })
    return () => { dead = true; cleanup() }
  }, [src, strength, focus[0], focus[1]])
  function run(THREE: typeof T3, el: HTMLDivElement) {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer: coarse)').matches
    let r: T3.WebGLRenderer
    try { r = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' }) } catch { return () => {} }
    r.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.25 : 1.5))
    const cv = r.domElement
    Object.assign(cv.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', opacity: '0', transition: 'opacity 900ms cubic-bezier(.16,1,.3,1)' })
    cv.setAttribute('aria-hidden', 'true')
    el.appendChild(cv)
    const scene = new THREE.Scene(), cam = new THREE.Camera()
    const u = { uImg: { value: null as T3.Texture | null }, uMouse: { value: new THREE.Vector2() }, uStrength: { value: strength }, uTime: { value: 0 },
      uShimmer: { value: reduce ? 0 : 1 }, uCover: { value: new THREE.Vector2(1, 1) }, uFocus: { value: new THREE.Vector2(focus[0], focus[1]) } }
    const mat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: vert, fragmentShader: frag })
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat))
    let imgAspect = 1.5, ready = false, visible = true, raf = 0
    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return
      r.setSize(w, h, false); const a = w / h
      const cx = a < imgAspect ? a / imgAspect : 1, cy = a < imgAspect ? 1 : imgAspect / a
      u.uCover.value.set(cx * 0.97, cy * 0.97)
      // keep the focus point inside the image
      u.uFocus.value.set(THREE.MathUtils.clamp(focus[0], cx * 0.485 + 0.012, 1 - cx * 0.485 - 0.012), THREE.MathUtils.clamp(focus[1], cy * 0.485 + 0.012, 1 - cy * 0.485 - 0.012))
    }
    const loader = new THREE.TextureLoader(); loader.setCrossOrigin('anonymous')
    loader.load(src, t => {
      t.minFilter = THREE.LinearFilter; t.generateMipmaps = false
      u.uImg.value = t; imgAspect = t.image.width / t.image.height; fit(); ready = true
      r.render(scene, cam); cv.style.opacity = '1'; el.dataset.ready = '1'; start()
    }, undefined, () => { cv.remove() })
    const target = new THREE.Vector2()
    const onMove = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; const b = el.getBoundingClientRect(); target.x = ((e.clientX - b.left) / b.width - 0.5) * 2; target.y = -((e.clientY - b.top) / b.height - 0.5) * 2 }
    const onScroll = () => { const b = el.getBoundingClientRect(); target.y = THREE.MathUtils.clamp(-b.top / b.height, -1, 1) * 1.2 }
    if (!reduce) { addEventListener('pointermove', onMove, { passive: true }); addEventListener('scroll', onScroll, { passive: true }) }
    const ro = new ResizeObserver(() => { fit(); if (ready) r.render(scene, cam) }); ro.observe(el)
    const clock = new THREE.Clock()
    const loop = () => { u.uMouse.value.lerp(target, 0.05); u.uTime.value = clock.getElapsedTime(); r.render(scene, cam); raf = requestAnimationFrame(loop) }
    const start = () => { if (ready && visible && !reduce && !raf) raf = requestAnimationFrame(loop) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() }); io.observe(el)
    return () => { stop(); io.disconnect(); ro.disconnect(); removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll); mat.dispose(); u.uImg.value?.dispose(); r.dispose(); cv.remove() }
  }
  return (
    <div ref={box} className={`ph ${className}`}>
      <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} fetchPriority="high" style={{ objectPosition: `${focus[0] * 100}% ${(1 - focus[1]) * 100}%` }} />
    </div>
  )
}
