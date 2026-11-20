// RECIPE: a still photograph that comes alive in 3D (2.5D depth parallax), on pointer move and scroll.
// The single cheapest "wow": a real Bahamian photo that gains depth as you move. Works with:
//  - a real depth map (grayscale, white = near) if you have one (Hugging Face depth model, or a Lovable/
//    Higgsfield "depth map of this image" render), or
//  - the built-in landscape depth guess (sky far, foreground near), good for beaches, harbours and horizons.
// Optional water shimmer for the lower part of sea photos. Falls back to a plain <img> without WebGL.
//
// WebGL needs the image host to allow CORS. Wikimedia does. For other hosts (the business's own site, Lovable),
// download the file into your site's public/ folder during the build session (curl works when the session has network)
// and use the local path. If the texture fails to load, the plain <img> underneath stays visible.
//
// Usage: <PhotoDepth src={hero} depth={heroDepth} alt="Elbow Cay lighthouse at first light" strength={0.035} shimmer />
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const frag = /* glsl */ `
uniform sampler2D uImg; uniform sampler2D uDepth; uniform float uHasDepth; uniform vec2 uMouse; uniform float uStrength;
uniform float uTime; uniform float uShimmer; uniform float uHorizon; uniform vec2 uCover; varying vec2 vUv;
void main() {
  vec2 uv = (vUv - 0.5) * uCover + 0.5;
  float guess = smoothstep(uHorizon - 0.15, 0.0, uv.y) * 0.85 + 0.15 * (1.0 - uv.y);   // near at the bottom, far at the sky
  float d = mix(guess, texture2D(uDepth, uv).r, uHasDepth);
  vec2 offs = uMouse * d * uStrength;
  vec2 st = uv + offs;
  if (uShimmer > 0.5 && uv.y < uHorizon) { float w = (uHorizon - uv.y); st.x += sin(uv.y * 160.0 + uTime * 1.6) * 0.0012 * w; st.y += cos(uv.x * 90.0 + uTime * 1.2) * 0.0008 * w; }
  gl_FragColor = texture2D(uImg, clamp(st, 0.001, 0.999));
}`
const vert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`

export default function PhotoDepth({ src, depth, alt, strength = 0.03, shimmer = false, horizon = 0.45, className = '' }: {
  src: string; depth?: string; alt: string; strength?: number; shimmer?: boolean
  /** 0..1 height of the horizon in the photo, from the bottom (used by the depth guess and the shimmer) */
  horizon?: number; className?: string
}) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = box.current!; if (!el) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let r: THREE.WebGLRenderer
    try { r = new THREE.WebGLRenderer({ antialias: false, alpha: true }) } catch { return }
    r.setPixelRatio(Math.min(devicePixelRatio, 1.75)); el.appendChild(r.domElement)
    Object.assign(r.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' })
    const scene = new THREE.Scene(), cam = new THREE.Camera()
    const loader = new THREE.TextureLoader(); loader.setCrossOrigin('anonymous')
    const blank = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1); blank.needsUpdate = true
    const u = { uImg: { value: blank as THREE.Texture }, uDepth: { value: blank as THREE.Texture }, uHasDepth: { value: 0 }, uMouse: { value: new THREE.Vector2() }, uStrength: { value: strength },
      uTime: { value: 0 }, uShimmer: { value: shimmer && !reduce ? 1 : 0 }, uHorizon: { value: horizon }, uCover: { value: new THREE.Vector2(1, 1) } }
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: u, vertexShader: vert, fragmentShader: frag })); scene.add(mesh)
    let imgAspect = 1.5
    const fit = () => { const w = el.clientWidth, h = el.clientHeight; r.setSize(w, h, false); const a = w / h; u.uCover.value.set(a < imgAspect ? a / imgAspect : 1, a < imgAspect ? 1 : imgAspect / a).multiplyScalar(0.94) }
    loader.load(src, t => { t.colorSpace = THREE.SRGBColorSpace; u.uImg.value = t; imgAspect = t.image.width / t.image.height; fit(); el.dataset.ready = '1' })
    if (depth) loader.load(depth, t => { u.uDepth.value = t; u.uHasDepth.value = 1 })
    const target = new THREE.Vector2()
    const onMove = (e: PointerEvent) => { const b = el.getBoundingClientRect(); target.set(((e.clientX - b.left) / b.width - 0.5) * 2, -((e.clientY - b.top) / b.height - 0.5) * 2) }
    const onScroll = () => { const b = el.getBoundingClientRect(); target.y = THREE.MathUtils.clamp(-b.top / b.height, -1, 1) }
    if (!reduce) { addEventListener('pointermove', onMove); addEventListener('scroll', onScroll, { passive: true }) }
    const ro = new ResizeObserver(fit); ro.observe(el)
    let raf = 0; const clock = new THREE.Clock()
    const loop = () => { u.uMouse.value.lerp(target, 0.05); u.uTime.value = clock.getElapsedTime(); r.render(scene, cam); raf = requestAnimationFrame(loop) }
    loop()
    return () => { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll); r.dispose(); r.domElement.remove() }
  }, [src, depth, strength, shimmer, horizon])
  return (
    <div ref={box} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* the real image stays in the DOM for SEO, accessibility and no-WebGL fallback; the canvas covers it */}
      <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} fetchPriority="high" />
    </div>
  )
}
