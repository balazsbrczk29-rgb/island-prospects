// A still photograph of clear water that keeps moving: a small refraction shader over the real photo.
// The <img> underneath is the real content (SEO, no-WebGL, reduced motion, or a host without CORS):
// the canvas only fades in once the texture has loaded, and it stops drawing when it is off screen.
import { useEffect, useRef } from "react"
import type * as Three from "three"

const vert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`
const frag = /* glsl */ `
uniform sampler2D uImg; uniform float uTime; uniform vec2 uCover; uniform vec2 uShift; uniform vec2 uLean; varying vec2 vUv;
void main() {
  vec2 uv = (vUv - 0.5) * uCover + 0.5 + uShift + uLean;
  float a = sin(uv.y * 34.0 + uTime * 0.9 + sin(uv.x * 9.0 + uTime * 0.35) * 1.6);
  float b = cos(uv.x * 27.0 - uTime * 0.7 + cos(uv.y * 11.0 - uTime * 0.3) * 1.4);
  vec2 st = uv + vec2(a, b) * 0.0021;
  vec3 c = texture2D(uImg, clamp(st, 0.001, 0.999)).rgb;
  c += (a * b) * 0.012;                                   // a faint caustic glint riding the ripples
  gl_FragColor = vec4(c, 1.0);
}`

export default function LivingWater({ src, texture, srcSet, sizes, alt, focus = "50% 50%", className = "", eager = false }: {
  src: string; texture: string; srcSet?: string; sizes?: string; alt: string; focus?: string; className?: string; eager?: boolean
}) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = box.current
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let dead = false, stop = () => {}
    import("three").then(THREE => {
    if (dead) return
    let r: Three.WebGLRenderer
    try { r = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" }) } catch { return }
    const coarse = matchMedia("(pointer: coarse)").matches
    r.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.25 : 1.5))
    const cv = r.domElement
    Object.assign(cv.style, { position: "absolute", inset: "0", width: "100%", height: "100%", opacity: "0", transition: "opacity .8s ease" })
    el.appendChild(cv)
    const [fx, fy] = focus.split(" ").map(v => parseFloat(v) / 100)
    const u = { uImg: { value: null as Three.Texture | null }, uTime: { value: 0 }, uCover: { value: new THREE.Vector2(1, 1) }, uShift: { value: new THREE.Vector2() }, uLean: { value: new THREE.Vector2() } }
    const scene = new THREE.Scene(), cam = new THREE.Camera()
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: u, vertexShader: vert, fragmentShader: frag })))
    let aspect = 1.5, ready = false, visible = false, raf = 0
    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return
      r.setSize(w, h, false)
      const a = w / h, cx = a < aspect ? a / aspect : 1, cy = a < aspect ? 1 : aspect / a
      u.uCover.value.set(cx, cy)
      u.uShift.value.set((fx - 0.5) * (1 - cx), -(fy - 0.5) * (1 - cy))   // same crop as object-position
    }
    const loader = new THREE.TextureLoader(); loader.setCrossOrigin("anonymous")
    loader.load(texture, t => { t.colorSpace = THREE.SRGBColorSpace; u.uImg.value = t; aspect = t.image.width / t.image.height; ready = true; fit(); cv.style.opacity = "1"; el.dataset.ready = "1"; tick() }, undefined, () => { cv.remove() })
    const lean = new THREE.Vector2()
    const onMove = (e: PointerEvent) => { const b = el.getBoundingClientRect(); lean.set(((e.clientX - b.left) / b.width - 0.5) * -0.006, ((e.clientY - b.top) / b.height - 0.5) * 0.006) }
    if (!coarse) el.addEventListener("pointermove", onMove)
    const clock = new THREE.Clock()
    const tick = () => {
      cancelAnimationFrame(raf)
      if (!ready || !visible) return
      u.uTime.value = clock.getElapsedTime(); u.uLean.value.lerp(lean, 0.04)
      r.render(scene, cam); raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; tick() }, { rootMargin: "80px" }); io.observe(el)
    const ro = new ResizeObserver(fit); ro.observe(el)
    stop = () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); el.removeEventListener("pointermove", onMove); r.dispose(); cv.remove() }
    })
    return () => { dead = true; stop() }
  }, [texture, focus])
  return (
    <div ref={box} className={`living ${className}`}>
      <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} style={{ objectPosition: focus }} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  )
}
