// The object of the whole site: a two-storey Nassau commercial block (white render, Bahama shutters, parapet)
// and its single-ply roof assembly as separate layers that can lift apart. Everything is built in metres.
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/* ---------- dimensions ---------- */
export const W = 14.4, D = 9.2, H = 7.0          // building footprint and height to the top of the roof deck
const T = 0.32                                    // wall thickness
const PARAPET = 0.85
export const IW = W - T * 2, ID = D - T * 2       // roof area inside the parapet
const SITE = { w: 17.6, d: 12.2, t: 0.9, z: 0.7 }
export const ROAD = 2.6 // cut block of ground the building stands on

/* ---------- small helpers ---------- */
function rng(seed: number) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }

function tex(w: number, h: number, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, srgb = true) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h
  draw(cv.getContext('2d')!, w, h)
  const t = new THREE.CanvasTexture(cv)
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8
  return t
}

/** soft multi-octave mottling drawn over whatever is already on the canvas */
function mottle(c: CanvasRenderingContext2D, w: number, h: number, seed: number, strength = 0.12, octaves = [6, 18, 60, 180]) {
  const r = rng(seed)
  for (const n of octaves) {
    const s = document.createElement('canvas'); s.width = n; s.height = Math.max(2, Math.round(n * h / w))
    const sc = s.getContext('2d')!; const id = sc.createImageData(s.width, s.height)
    for (let i = 0; i < id.data.length; i += 4) { const v = r() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255 }
    sc.putImageData(id, 0, 0)
    c.save(); c.globalAlpha = strength; c.globalCompositeOperation = 'overlay'; c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high'
    c.drawImage(s, 0, 0, w, h); c.restore()
  }
}
function grain(c: CanvasRenderingContext2D, w: number, h: number, seed: number, amp = 26) {
  const r = rng(seed); const id = c.getImageData(0, 0, w, h)
  for (let i = 0; i < id.data.length; i += 4) { const d = (r() - 0.5) * amp; id.data[i] += d; id.data[i + 1] += d; id.data[i + 2] += d }
  c.putImageData(id, 0, 0)
}

/** box whose UVs are in metres, so one texture keeps one scale on every piece of wall */
function box(w: number, h: number, d: number, x = 0, y = 0, z = 0) {
  const g = new THREE.BoxGeometry(w, h, d)
  const uv = g.attributes.uv as THREE.BufferAttribute
  const dims: [number, number][] = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]]
  for (let f = 0; f < 6; f++) for (let i = 0; i < 4; i++) { const k = f * 4 + i; uv.setXY(k, uv.getX(k) * dims[f][0], uv.getY(k) * dims[f][1]) }
  g.translate(x, y, z)
  return g
}
class Bucket {
  private m = new Map<THREE.Material, THREE.BufferGeometry[]>()
  add(mat: THREE.Material, g: THREE.BufferGeometry) { (this.m.get(mat) ?? this.m.set(mat, []).get(mat)!).push(g.index ? g.toNonIndexed() : g); return this }
  build(into: THREE.Group) {
    for (const [mat, gs] of this.m) {
      const mesh = new THREE.Mesh(mergeGeometries(gs.map(g => { const n = g.clone(); for (const k of Object.keys(n.attributes)) if (!['position', 'normal', 'uv'].includes(k)) n.deleteAttribute(k); return n }))!, mat)
      mesh.castShadow = mesh.receiveShadow = true; into.add(mesh)
    }
    return into
  }
}

/* ---------- materials: real surfaces, nothing glossy or toy ---------- */
function materials() {
  const fineBump = tex(512, 512, (c, w, h) => { c.fillStyle = '#808080'; c.fillRect(0, 0, w, h); grain(c, w, h, 7, 120); mottle(c, w, h, 3, 0.35, [40, 120]) }, false)
  const stuccoMap = tex(512, 512, (c, w, h) => { c.fillStyle = '#faf8f3'; c.fillRect(0, 0, w, h); mottle(c, w, h, 11, 0.09, [3, 9, 30]); grain(c, w, h, 5, 7) })
  // painted render: limewash unevenness and the faint rain streaks every Nassau wall carries
  const paintMap = tex(1024, 1024, (c, w, h) => {
    c.fillStyle = '#f3c5b3'; c.fillRect(0, 0, w, h); mottle(c, w, h, 12, 0.13, [3, 8, 24, 80]); const r = rng(13)
    for (let i = 0; i < 70; i++) { const x = r() * w, len = 120 + r() * 520, y = r() * h, a = 0.025 + r() * 0.05; const g = c.createLinearGradient(0, y, 0, y + len); g.addColorStop(0, `rgba(120,84,70,${a})`); g.addColorStop(1, 'rgba(120,84,70,0)'); c.fillStyle = g; c.fillRect(x, y, 2 + r() * 9, len) }
    for (let i = 0; i < 30; i++) { const x = r() * w, len = 80 + r() * 300, y = r() * h; const g = c.createLinearGradient(0, y, 0, y + len); g.addColorStop(0, 'rgba(255,244,236,.07)'); g.addColorStop(1, 'rgba(255,244,236,0)'); c.fillStyle = g; c.fillRect(x, y, 6 + r() * 20, len) }
    grain(c, w, h, 14, 8)
  })
  const mk = (t: THREE.Texture, rx: number, ry = rx) => { const n = t.clone(); n.repeat.set(rx, ry); n.needsUpdate = true; return n }

  const stucco = new THREE.MeshStandardMaterial({ map: mk(paintMap, 1 / 7.3), bumpMap: mk(fineBump, 1 / 0.9), bumpScale: 1.1, roughness: 0.95, color: '#ffffff' })
  const lime = new THREE.MeshStandardMaterial({ map: mk(stuccoMap, 1 / 3.2), bumpMap: mk(fineBump, 1 / 0.9), bumpScale: 0.9, roughness: 0.94 })
  const trim = new THREE.MeshStandardMaterial({ map: mk(stuccoMap, 1 / 2.4), bumpMap: mk(fineBump, 1 / 1.4), bumpScale: 0.4, roughness: 0.86, color: '#fffdf8' })
  const base = new THREE.MeshStandardMaterial({ map: mk(stuccoMap, 1 / 2), bumpMap: mk(fineBump, 1 / 0.7), bumpScale: 1.2, roughness: 0.96, color: '#cfc7b6' })
  const shutter = new THREE.MeshStandardMaterial({ color: '#2c6c70', roughness: 0.62, bumpMap: mk(fineBump, 1 / 0.5), bumpScale: 0.25 })
  const bronze = new THREE.MeshStandardMaterial({ color: '#3a3a36', roughness: 0.45, metalness: 0.7 })
  const glass = new THREE.MeshPhysicalMaterial({ color: '#2a444b', roughness: 0.05, metalness: 0.7, envMapIntensity: 2.6 })
  const dark = new THREE.MeshStandardMaterial({ color: '#15191a', roughness: 1 })

  const pavers = tex(1024, 1024, (c, w, h) => {
    c.fillStyle = '#d9d2c2'; c.fillRect(0, 0, w, h); const r = rng(21); const n = 8, s = w / n
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v = 205 + r() * 26; c.fillStyle = `rgb(${v + 8},${v + 2},${v - 12})`; c.fillRect(i * s + 1.5, j * s + 1.5, s - 3, s - 3) }
    mottle(c, w, h, 22, 0.16); grain(c, w, h, 23, 12)
    c.strokeStyle = 'rgba(96,88,72,.55)'; c.lineWidth = 2.5
    for (let i = 0; i <= n; i++) { c.beginPath(); c.moveTo(i * s, 0); c.lineTo(i * s, h); c.moveTo(0, i * s); c.lineTo(w, i * s); c.stroke() }
  })
  const paving = new THREE.MeshStandardMaterial({ map: mk(pavers, 1 / 4.8), bumpMap: mk(fineBump, 1 / 0.8), bumpScale: 0.8, roughness: 0.9 })
  const asphaltMap = tex(512, 512, (c, w, h) => { c.fillStyle = '#424444'; c.fillRect(0, 0, w, h); mottle(c, w, h, 25, 0.07, [20, 70]); grain(c, w, h, 26, 30); const r = rng(27); for (let i = 0; i < 1400; i++) { c.fillStyle = `rgba(${150 + r() * 80},${150 + r() * 80},${140 + r() * 70},${0.1 + r() * 0.3})`; c.fillRect(r() * w, r() * h, 1 + r() * 1.6, 1 + r() * 1.6) } })
  const asphalt = new THREE.MeshStandardMaterial({ map: mk(asphaltMap, 1 / 2.2), bumpMap: mk(fineBump, 1 / 0.6), bumpScale: 1.4, roughness: 0.96 })
  const kerb = new THREE.MeshStandardMaterial({ map: mk(stuccoMap, 1 / 1.5), bumpMap: mk(fineBump, 1 / 0.6), bumpScale: 1, roughness: 0.95, color: '#d5d0c4' })
  const strata = tex(1024, 256, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#c9c1ae'); g.addColorStop(0.1, '#e6dcc6'); g.addColorStop(0.55, '#dccfb4'); g.addColorStop(1, '#cdbf9f'); c.fillStyle = g; c.fillRect(0, 0, w, h)
    const r = rng(31)
    for (let i = 0; i < 26; i++) { c.fillStyle = `rgba(${120 + r() * 60},${105 + r() * 50},${75 + r() * 40},${0.05 + r() * 0.1})`; const y = r() * h; c.fillRect(0, y, w, 1 + r() * 7) }
    for (let i = 0; i < 900; i++) { c.fillStyle = `rgba(70,58,40,${0.08 + r() * 0.22})`; c.beginPath(); c.ellipse(r() * w, r() * h, 0.6 + r() * 2.6, 0.4 + r() * 1.4, 0, 0, 7); c.fill() }
    mottle(c, w, h, 32, 0.22, [5, 14, 50, 160]); grain(c, w, h, 33, 14)
  })
  const limestone = new THREE.MeshStandardMaterial({ map: (() => { const n = strata.clone(); n.repeat.set(1 / 9, 1 / SITE.t); n.needsUpdate = true; return n })(), bumpMap: mk(fineBump, 1 / 1.2), bumpScale: 1.6, roughness: 0.97 })

  // 01 structural deck: cast concrete with formwork lines
  const concrete = tex(1024, 1024, (c, w, h) => {
    c.fillStyle = '#a9a7a0'; c.fillRect(0, 0, w, h); mottle(c, w, h, 41, 0.11, [4, 10, 28, 90]); grain(c, w, h, 42, 10)
    const r = rng(43)
    for (let i = 0; i < 40; i++) { c.fillStyle = `rgba(60,58,54,${0.03 + r() * 0.05})`; c.beginPath(); c.ellipse(r() * w, r() * h, 20 + r() * 70, 14 + r() * 50, r() * 3, 0, 7); c.fill() }
    c.strokeStyle = 'rgba(70,68,64,.4)'; c.lineWidth = 2
    for (let i = 0; i <= 4; i++) { c.beginPath(); c.moveTo(i * w / 4, 0); c.lineTo(i * w / 4, h); c.stroke() }
    c.strokeStyle = 'rgba(70,68,64,.22)'; for (let i = 0; i <= 2; i++) { c.beginPath(); c.moveTo(0, i * h / 2); c.lineTo(w, i * h / 2); c.stroke() }
  })
  const deck = new THREE.MeshStandardMaterial({ map: mk(concrete, 1 / 4.8), bumpMap: mk(fineBump, 1 / 0.9), bumpScale: 0.7, roughness: 0.93 })

  // 02 vapour retarder: dark self-adhered sheet, lapped every metre
  const vapourMap = tex(512, 512, (c, w, h) => {
    c.fillStyle = '#2a2d2e'; c.fillRect(0, 0, w, h); mottle(c, w, h, 51, 0.07, [16, 60]); grain(c, w, h, 52, 9)
    for (let i = 0; i < 2; i++) { const x = i * w / 2; const g = c.createLinearGradient(x, 0, x + 26, 0); g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(0.2, 'rgba(0,0,0,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(x, 0, 26, h) }
  })
  const vapour = new THREE.MeshStandardMaterial({ map: mk(vapourMap, 1 / 2), roughness: 0.5, metalness: 0.15, bumpMap: mk(fineBump, 1 / 2.5), bumpScale: 0.3 })

  // 03 insulation: faced rigid boards, 1.2 x 2.4 m, staggered joints; cut edges show the foam
  const boards = (base: string, joint: string, seed: number, plates: boolean) => tex(1024, 1024, (c, w, h) => {
    c.fillStyle = base; c.fillRect(0, 0, w, h); const r = rng(seed)
    const bw = w / 2, bh = h / 4                          // tile = 4.8 m x 4.8 m: boards 2.4 long, 1.2 wide
    for (let j = 0; j < 4; j++) for (let i = -1; i < 2; i++) {
      const x = i * bw + (j % 2 ? bw / 2 : 0), y = j * bh; const v = (r() - 0.5) * 14
      c.fillStyle = `rgba(${v > 0 ? 255 : 0},${v > 0 ? 250 : 0},${v > 0 ? 235 : 0},${Math.abs(v) / 110})`; c.fillRect(x + 2, y + 2, bw - 4, bh - 4)
      c.strokeStyle = joint; c.lineWidth = 4.5; c.strokeRect(x, y, bw, bh)
      c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 1.5; c.strokeRect(x + 3.5, y + 3.5, bw - 7, bh - 7)
      if (!plates) { c.fillStyle = 'rgba(96,80,44,.32)'; for (let k = 0; k < 3; k++) { c.fillRect(x + bw * (0.12 + k * 0.3), y + bh * 0.44, bw * 0.16, 5); c.fillRect(x + bw * (0.12 + k * 0.3), y + bh * 0.52, bw * 0.1, 3) } }
      if (plates) for (const [px, py] of [[0.12, 0.22], [0.38, 0.22], [0.62, 0.22], [0.88, 0.22], [0.12, 0.78], [0.38, 0.78], [0.62, 0.78], [0.88, 0.78], [0.25, 0.5], [0.75, 0.5]]) {
        const cx = x + px * bw, cy = y + py * bh
        c.fillStyle = 'rgba(30,34,34,.5)'; c.beginPath(); c.arc(cx + 2, cy + 3, 12, 0, 7); c.fill()
        c.fillStyle = '#d2d5d2'; c.beginPath(); c.arc(cx, cy, 11, 0, 7); c.fill()
        c.strokeStyle = '#8b9090'; c.lineWidth = 1.5; c.beginPath(); c.arc(cx, cy, 7, 0, 7); c.stroke()
        c.fillStyle = '#5a5f5f'; c.beginPath(); c.arc(cx, cy, 3.2, 0, 7); c.fill()
      }
    }
    mottle(c, w, h, seed + 1, 0.14, [8, 30, 110]); grain(c, w, h, seed + 2, 9)
  })
  const insulTop = new THREE.MeshStandardMaterial({ map: mk(boards('#d6c28d', 'rgba(84,68,30,.9)', 61, false), 1 / 4.8), roughness: 0.82, bumpMap: mk(fineBump, 1 / 1.6), bumpScale: 0.35 })
  const foam = tex(256, 256, (c, w, h) => { c.fillStyle = '#e3c468'; c.fillRect(0, 0, w, h); mottle(c, w, h, 66, 0.3, [20, 70, 200]); grain(c, w, h, 67, 22); c.fillStyle = 'rgba(120,96,40,.5)'; c.fillRect(0, 0, w, 5); c.fillRect(0, h / 2 - 2, w, 4); c.fillRect(0, h - 5, w, 5) })
  const insulSide = new THREE.MeshStandardMaterial({ map: (() => { const n = foam.clone(); n.repeat.set(1 / 1.2, 1 / 0.3); n.needsUpdate = true; return n })(), roughness: 0.95, bumpMap: mk(fineBump, 1 / 0.4), bumpScale: 1 })

  // 04 cover board: grey gypsum-fibre boards with their fastening plates
  const cover = new THREE.MeshStandardMaterial({ map: mk(boards('#b9beb8', 'rgba(52,58,56,.9)', 71, true), 1 / 4.8), roughness: 0.88, bumpMap: mk(fineBump, 1 / 1.2), bumpScale: 0.5 })
  const coverSide = new THREE.MeshStandardMaterial({ color: '#aeb2ac', roughness: 0.95 })

  // 05 membrane: white single-ply, heat-welded laps every three metres
  const membraneMap = tex(1024, 512, (c, w, h) => {
    c.fillStyle = '#f6f5f0'; c.fillRect(0, 0, w, h); mottle(c, w, h, 81, 0.07, [4, 12, 40]); grain(c, w, h, 82, 4)
    const x = w * 0.5; let g = c.createLinearGradient(x - 14, 0, x + 26, 0)
    g.addColorStop(0, 'rgba(90,94,94,0)'); g.addColorStop(0.3, 'rgba(90,94,94,.6)'); g.addColorStop(0.36, 'rgba(255,255,255,.95)'); g.addColorStop(0.9, 'rgba(120,124,122,.3)'); g.addColorStop(1, 'rgba(150,154,152,0)')
    c.fillStyle = g; c.fillRect(x - 14, 0, 40, h)
  })
  const membraneBump = tex(1024, 512, (c, w, h) => { c.fillStyle = '#7a7a7a'; c.fillRect(0, 0, w, h); c.fillStyle = '#b4b4b4'; c.fillRect(w * 0.5, 0, w * 0.5, h); grain(c, w, h, 83, 20) }, false)
  const mrep = (t: THREE.Texture) => { const n = t.clone(); n.repeat.set(1 / 6, 1 / 3); n.needsUpdate = true; return n }
  const membrane = new THREE.MeshPhysicalMaterial({ map: mrep(membraneMap), bumpMap: mrep(membraneBump), bumpScale: 1.4, roughness: 0.52, clearcoat: 0.12, clearcoatRoughness: 0.6, color: '#dddcd6' })
  const surface = membrane.clone()                                        // the roof surface the system picker re-dresses
  const capMap = tex(1024, 1024, (c, w, h) => {                           // modified bitumen: mineral cap sheet in one-metre laps
    c.fillStyle = '#989a97'; c.fillRect(0, 0, w, h); mottle(c, w, h, 91, 0.05, [30, 90]); grain(c, w, h, 92, 50)
    for (let i = 0; i < 3; i++) { const y = i * h / 3; c.fillStyle = 'rgba(24,26,26,.8)'; c.fillRect(0, y, w, 7); const g = c.createLinearGradient(0, y + 7, 0, y + 40); g.addColorStop(0, 'rgba(30,30,30,.28)'); g.addColorStop(1, 'rgba(30,30,30,0)'); c.fillStyle = g; c.fillRect(0, y + 7, w, 33) }
    c.fillStyle = 'rgba(24,26,26,.6)'; c.fillRect(w * 0.37, 0, 5, h / 3); c.fillRect(w * 0.81, h / 3, 5, h / 3); c.fillRect(w * 0.12, 2 * h / 3, 5, h / 3)
  })
  const tileMap = tex(1024, 1024, (c, w, h) => {                          // terrace: stone tile over a liquid-applied membrane
    c.fillStyle = '#8f8a7d'; c.fillRect(0, 0, w, h); const r = rng(95), n = 8, t = w / n
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v = 214 + r() * 22; c.fillStyle = `rgb(${v + 6},${v},${v - 16})`; c.fillRect(i * t + 3, j * t + 3, t - 6, t - 6) }
    mottle(c, w, h, 96, 0.2, [6, 20, 70, 200]); grain(c, w, h, 97, 10)
  })
  const gravelMap = tex(1024, 1024, (c, w, h) => {                        // overburden: washed gravel ballast
    c.fillStyle = '#9d978a'; c.fillRect(0, 0, w, h); const r = rng(98)
    for (let i = 0; i < 26000; i++) { const v = 120 + r() * 120; c.fillStyle = `rgb(${v + 8},${v + 2},${v - 10})`; c.beginPath(); c.ellipse(r() * w, r() * h, 2 + r() * 4.5, 1.6 + r() * 3.4, r() * 3, 0, 7); c.fill() }
    mottle(c, w, h, 99, 0.12, [5, 18]); grain(c, w, h, 100, 16)
  })
  const rp = (t: THREE.Texture, r: number) => { const n = t.clone(); n.repeat.set(r, r); n.needsUpdate = true; return n }
  const finishes = [
    { map: surface.map!, bumpMap: surface.bumpMap!, bumpScale: 0.6, roughness: 0.52, clearcoat: 0.12 },
    { map: rp(capMap, 1 / 3), bumpMap: mk(fineBump, 1 / 0.35), bumpScale: 2.2, roughness: 0.97, clearcoat: 0 },
    { map: rp(tileMap, 1 / 4.8), bumpMap: mk(fineBump, 1 / 1.1), bumpScale: 0.5, roughness: 0.7, clearcoat: 0 },
    { map: rp(gravelMap, 1 / 2.6), bumpMap: rp(gravelMap, 1 / 2.6), bumpScale: 5, roughness: 1, clearcoat: 0 },
  ]
  const setFinish = (i: number) => { Object.assign(surface, finishes[i] ?? finishes[0]); surface.needsUpdate = true }

  // 06 edge metal, curbs and plant
  const coping = new THREE.MeshStandardMaterial({ color: '#2c6c70', roughness: 0.38, metalness: 0.55 })
  const sheet = new THREE.MeshStandardMaterial({ color: '#c9ccc9', roughness: 0.42, metalness: 0.75 })
  const louvre = tex(128, 128, (c, w, h) => { c.fillStyle = '#b9bcb9'; c.fillRect(0, 0, w, h); for (let y = 6; y < h; y += 12) { c.fillStyle = '#3b3f40'; c.fillRect(8, y, w - 16, 5); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(8, y + 5, w - 16, 1.5) } })
  const acSide = new THREE.MeshStandardMaterial({ map: louvre, roughness: 0.5, metalness: 0.6 })
  return { stucco, lime, trim, base, shutter, bronze, glass, dark, paving, limestone, asphalt, kerb, deck, vapour, insulTop, insulSide, cover, coverSide, membrane, surface, setFinish, coping, sheet, acSide }
}

/* ---------- facades ---------- */
type Opening = { u: number; w: number; y0: number; y1: number; door?: boolean; shutter?: boolean }

export type Roof = {
  root: THREE.Group
  /** the five things that lift: vapour retarder, insulation, cover board, membrane, edge metal and curbs */
  layers: THREE.Group[]
  /** world-space height of each named layer when assembled, deck first (six entries) */
  rest: number[]
  /** 0 single-ply, 1 modified bitumen, 2 tile terrace, 3 gravel ballast */
  setFinish: (i: number) => void
  dispose: () => void
}

export function buildRoof(): Roof {
  const M = materials()
  const root = new THREE.Group()
  const fixed = new Bucket()

  /* the cut block of ground */
  const site = new THREE.Mesh(box(SITE.w, SITE.t, SITE.d, 0, -SITE.t / 2, SITE.z), [M.limestone, M.limestone, M.paving, M.limestone, M.limestone, M.limestone])
  site.castShadow = site.receiveShadow = true; root.add(site)
  const zf = SITE.z + SITE.d / 2
  fixed.add(M.kerb, box(SITE.w, 0.2, 0.2, 0, -0.1, zf + 0.1))
  const road = new THREE.Mesh(box(SITE.w, SITE.t - 0.16, ROAD, 0, -0.16 - (SITE.t - 0.16) / 2, zf + 0.2 + ROAD / 2 - 0.2), [M.limestone, M.limestone, M.asphalt, M.limestone, M.limestone, M.limestone])
  road.castShadow = road.receiveShadow = true; root.add(road)
  fixed.add(M.trim, box(SITE.w * 0.36, 0.006, 0.11, -SITE.w * 0.2, -0.157, zf + ROAD - 0.5)).add(M.trim, box(SITE.w * 0.22, 0.006, 0.11, SITE.w * 0.32, -0.157, zf + ROAD - 0.5))
  fixed.add(M.sheet, box(0.42, 0.9, 0.16, W / 2 + 0.09, 1.45, 1.4)).add(M.bronze, box(0.03, 1.0, 0.03, W / 2 + 0.03, 0.5, 1.4))   // meter cabinet and its conduit

  /* walls: a facade is drawn in its own plane (u along, y up, +n outwards) and then turned to its side */
  const facade = (len: number, openings: Opening[], place: THREE.Matrix4) => {
    const add = (mat: THREE.Material, g: THREE.BufferGeometry) => fixed.add(mat, g.applyMatrix4(place))
    const bands = [[0, 3.5], [3.5, H + PARAPET]] as const
    for (const [b0, b1] of bands) {
      const ops = openings.filter(o => o.y0 >= b0 && o.y1 <= b1).sort((a, b) => a.u - b.u)
      if (!ops.length) { add(M.stucco, box(len, b1 - b0, T, 0, (b0 + b1) / 2, -T / 2)); continue }
      const y0 = Math.min(...ops.map(o => o.y0)), y1 = Math.max(...ops.map(o => o.y1))
      add(M.stucco, box(len, b1 - y1, T, 0, (b1 + y1) / 2, -T / 2))                         // above the heads
      if (y0 > b0) add(M.stucco, box(len, y0 - b0, T, 0, (b0 + y0) / 2, -T / 2))            // below the lowest sill
      let cur = -len / 2
      for (const o of ops) {
        add(M.stucco, box(o.u - o.w / 2 - cur, y1 - y0, T, (cur + o.u - o.w / 2) / 2, (y0 + y1) / 2, -T / 2)); cur = o.u + o.w / 2
        if (o.y0 > y0) add(M.stucco, box(o.w, o.y0 - y0, T, o.u, (y0 + o.y0) / 2, -T / 2))  // spandrel under a higher sill
      }
      add(M.stucco, box(len / 2 - cur, y1 - y0, T, (cur + len / 2) / 2, (y0 + y1) / 2, -T / 2))
    }
    for (const o of openings) {
      const h = o.y1 - o.y0, cy = (o.y0 + o.y1) / 2, zg = -0.2
      add(M.glass, box(o.w, h, 0.03, o.u, cy, zg))
      const f = 0.07                                                                         // frame and glazing bars
      add(M.bronze, box(o.w, f, 0.09, o.u, o.y1 - f / 2, zg)); add(M.bronze, box(o.w, f, 0.09, o.u, o.y0 + f / 2, zg))
      add(M.bronze, box(f, h, 0.09, o.u - o.w / 2 + f / 2, cy, zg)); add(M.bronze, box(f, h, 0.09, o.u + o.w / 2 - f / 2, cy, zg))
      if (o.door) {
        add(M.bronze, box(f, h, 0.09, o.u, cy, zg)); add(M.bronze, box(o.w, f, 0.09, o.u, o.y1 - 0.55, zg))
        for (const s of [-1, 1]) add(M.sheet, box(0.035, 0.7, 0.05, o.u + s * 0.13, 1.15, zg + 0.07))
        add(M.base, box(o.w + 0.5, 0.12, 0.9, o.u, 0.06, 0.3))                               // threshold step
      } else {
        if (o.w > 1.8) { add(M.bronze, box(f * 0.7, h, 0.07, o.u - o.w / 6, cy, zg)); add(M.bronze, box(f * 0.7, h, 0.07, o.u + o.w / 6, cy, zg)) }
        else add(M.bronze, box(f * 0.7, h, 0.07, o.u, cy, zg))
        add(M.trim, box(o.w + 0.24, 0.1, 0.2, o.u, o.y0 - 0.05, -0.04))                       // projecting sill
      }
      if (o.shutter) {                                                                       // Bahama shutter: hinged at the head, propped open
        const sw = o.w + 0.16, sh = h + 0.1, tilt = 0.56, parts: THREE.BufferGeometry[] = []
        parts.push(box(sw, 0.09, 0.05, 0, -0.045, 0), box(sw, 0.09, 0.05, 0, -sh + 0.045, 0), box(0.08, sh, 0.05, -sw / 2 + 0.04, -sh / 2, 0), box(0.08, sh, 0.05, sw / 2 - 0.04, -sh / 2, 0), box(0.06, sh, 0.045, 0, -sh / 2, 0))
        const n = Math.floor((sh - 0.2) / 0.115)
        for (let i = 0; i < n; i++) { const s = box(sw - 0.16, 0.012, 0.11); s.rotateX(-0.7); s.translate(0, -0.14 - i * ((sh - 0.24) / n), 0); parts.push(s) }
        const sg = mergeGeometries(parts.map(p => p.toNonIndexed()))!; sg.rotateX(-tilt); sg.translate(o.u, o.y1 + 0.06, 0.03)
        add(M.shutter, sg)
        for (const s of [-1, 1]) { const arm = box(0.025, 0.025, Math.sin(tilt) * sh * 0.92); arm.translate(o.u + s * (sw / 2 - 0.1), o.y1 - Math.cos(tilt) * sh * 0.82, Math.sin(tilt) * sh * 0.46); add(M.bronze, arm) }
      }
    }
    add(M.base, box(len + 0.1, 0.5, 0.06, 0, 0.25, 0.03))                                     // limestone base course (doors cut through below)
    add(M.trim, box(len + 0.2, 0.2, 0.1, 0, 3.52, 0.05))                                      // string course between the floors
    add(M.trim, box(len + 0.24, 0.26, 0.12, 0, H - 0.05, 0.06))                               // cornice under the parapet
  }
  const bays = [-5.4, -1.8, 1.8, 5.4]
  const front: Opening[] = [
    ...bays.map((u, i) => i === 1 ? { u, w: 2.0, y0: 0.12, y1: 2.8, door: true } : { u, w: 2.4, y0: 0.72, y1: 2.8 }),
    ...bays.map(u => ({ u, w: 1.45, y0: 4.45, y1: 6.15, shutter: true })),
  ]
  const sideBays = [-2.6, 0, 2.6]
  const side: Opening[] = [...sideBays.map(u => ({ u, w: 1.45, y0: 1.05, y1: 2.8 })), ...sideBays.map(u => ({ u, w: 1.45, y0: 4.45, y1: 6.15, shutter: true }))]
  facade(W, front, new THREE.Matrix4().makeTranslation(0, 0, D / 2))
  facade(D - T * 2, side, new THREE.Matrix4().makeRotationY(Math.PI / 2).setPosition(W / 2, 0, 0))
  fixed.add(M.lime, box(W, H + PARAPET, T, 0, (H + PARAPET) / 2, -D / 2 + T / 2))            // back and left walls are never seen
  fixed.add(M.lime, box(T, H + PARAPET, D - T * 2, -W / 2 + T / 2, (H + PARAPET) / 2, 0))
  fixed.add(M.dark, box(W - T * 2 - 0.5, H - 0.5, D - T * 2 - 0.5, 0, H / 2 - 0.1, 0))         // the dark behind the glass

  /* quoins on the two corners the camera sees, canopy over the door, downpipe from the scupper */
  for (const cx of [-W / 2, W / 2]) for (let i = 0; i < 13; i++) {
    const y = 0.55 + i * 0.48; if (y > 3.25 && y < 3.75) continue; if (y > H - 0.5) break
    const l = i % 2 ? 0.42 : 0.66, s = Math.sign(cx)
    fixed.add(M.trim, box(l, 0.36, 0.05, cx - s * l / 2 + s * 0.03, y + 0.18, D / 2 + 0.025))
    if (s > 0) fixed.add(M.trim, box(0.05, 0.36, i % 2 ? 0.66 : 0.42, cx + 0.025, y + 0.18, D / 2 - (i % 2 ? 0.66 : 0.42) / 2 + 0.03))
  }
  fixed.add(M.trim, box(3.1, 0.16, 1.5, bays[1], 3.12, D / 2 + 0.75))
  fixed.add(M.coping, box(3.16, 0.05, 0.03, bays[1], 3.12, D / 2 + 1.5))
  for (const s of [-1, 1]) { const rod = box(0.03, 0.03, 1.72); rod.rotateX(0.52); rod.translate(bays[1] + s * 1.35, 3.72, D / 2 + 0.74); fixed.add(M.bronze, rod) }
  const pipe = new THREE.CylinderGeometry(0.06, 0.06, H - 0.25, 14); pipe.translate(W / 2 + 0.1, (H - 0.25) / 2 + 0.05, -D / 2 + 1.0); fixed.add(M.trim, pipe)
  fixed.add(M.trim, box(0.2, 0.26, 0.3, W / 2 + 0.1, H - 0.2, -D / 2 + 1.0))
  for (const y of [1.2, 3.1, 5.2]) fixed.add(M.bronze, box(0.05, 0.04, 0.18, W / 2 + 0.05, y, -D / 2 + 1.0))

  /* 01 the structural deck stays on the building */
  fixed.add(M.deck, box(IW, 0.3, ID, 0, H - 0.15, 0))
  fixed.build(root)

  /* the layers that lift */
  const layer = (build: (g: THREE.Group, b: Bucket) => void) => { const g = new THREE.Group(), b = new Bucket(); build(g, b); b.build(g); root.add(g); return g }
  const slab = (y: number, t: number, top: THREE.Material, sideMat: THREE.Material, inset = 0) => {
    const m = new THREE.Mesh(box(IW - inset * 2, t, ID - inset * 2, 0, y + t / 2, 0), [sideMat, sideMat, top, sideMat, sideMat, sideMat])
    m.castShadow = m.receiveShadow = true; return m
  }
  let y = H
  const rest = [H]
  const vapour = layer(g => g.add(slab(y, 0.045, M.vapour, M.vapour, 0.02))); rest.push(y); y += 0.045
  const insulation = layer(g => g.add(slab(y, 0.3, M.insulTop, M.insulSide, 0.03))); rest.push(y); y += 0.3
  const coverBoard = layer(g => g.add(slab(y, 0.09, M.cover, M.coverSide, 0.03))); rest.push(y); y += 0.09
  const yMem = y
  const membrane = layer((g, b) => {
    g.add(slab(yMem, 0.035, M.surface, M.membrane, 0.012))
    const up = H + PARAPET - yMem - 0.01                                                     // the sheet turns up the parapet on all four sides
    b.add(M.membrane, box(IW - 0.02, up, 0.025, 0, yMem + up / 2, ID / 2 - 0.022)).add(M.membrane, box(IW - 0.02, up, 0.025, 0, yMem + up / 2, -ID / 2 + 0.022))
    b.add(M.membrane, box(0.025, up, ID - 0.02, IW / 2 - 0.022, yMem + up / 2, 0)).add(M.membrane, box(0.025, up, ID - 0.02, -IW / 2 + 0.022, yMem + up / 2, 0))
  }); rest.push(yMem); y += 0.035
  const yTop = y
  const details = layer((g, b) => {
    const py = H + PARAPET, cw = T + 0.14                                                    // coping all round the parapet
    b.add(M.coping, box(W + 0.14, 0.07, cw, 0, py + 0.035, D / 2 - T / 2)).add(M.coping, box(W + 0.14, 0.07, cw, 0, py + 0.035, -D / 2 + T / 2))
    b.add(M.coping, box(cw, 0.07, D - T * 2 + 0.14 - cw, W / 2 - T / 2, py + 0.035, 0)).add(M.coping, box(cw, 0.07, D - T * 2 + 0.14 - cw, -W / 2 + T / 2, py + 0.035, 0))
    for (const z of [D / 2 + 0.06, -D / 2 - 0.06]) b.add(M.coping, box(W + 0.16, 0.14, 0.02, 0, py - 0.02, z))
    for (const x of [W / 2 + 0.06, -W / 2 - 0.06]) b.add(M.coping, box(0.02, 0.14, D + 0.14, x, py - 0.02, 0))
    for (const [x, z] of [[2.2, -1.6], [4.6, -1.6]] as const) {                               // two condensers on flashed curbs
      b.add(M.membrane, box(1.35, 0.3, 1.2, x, yTop + 0.15, z))
      const unit = new THREE.Mesh(box(1.12, 0.92, 0.96, x, yTop + 0.3 + 0.46, z), [M.acSide, M.acSide, M.sheet, M.sheet, M.acSide, M.acSide])
      unit.castShadow = unit.receiveShadow = true; g.add(unit)
      const ring = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 40); ring.translate(x, yTop + 1.24, z); b.add(M.sheet, ring)
      const fan = new THREE.CylinderGeometry(0.36, 0.36, 0.056, 40); fan.translate(x, yTop + 1.241, z); b.add(M.dark, fan)
      for (const r of [0.12, 0.22, 0.31]) { const t = new THREE.TorusGeometry(r, 0.008, 6, 40); t.rotateX(Math.PI / 2); t.translate(x, yTop + 1.275, z); b.add(M.sheet, t) }
      for (let k = 0; k < 4; k++) { const sp = box(0.74, 0.012, 0.014); sp.rotateY(k * Math.PI / 4); sp.translate(x, yTop + 1.276, z); b.add(M.sheet, sp) }
    }
    b.add(M.membrane, box(1.05, 0.28, 1.05, -4.4, yTop + 0.14, 1.3)).add(M.sheet, box(1.12, 0.07, 1.12, -4.4, yTop + 0.315, 1.3))   // roof hatch
    b.add(M.bronze, box(0.04, 0.04, 0.5, -4.4 + 0.5, yTop + 0.36, 1.3))
    for (const [x, z] of [[-1.2, -2.4], [-0.5, -2.4]] as const) {                             // vent stacks with their flashing boots
      const st = new THREE.CylinderGeometry(0.06, 0.06, 0.55, 16); st.translate(x, yTop + 0.275, z); b.add(M.sheet, st)
      const boot = new THREE.CylinderGeometry(0.075, 0.16, 0.16, 16); boot.translate(x, yTop + 0.08, z); b.add(M.membrane, boot)
    }
    const drain = new THREE.CylinderGeometry(0.17, 0.2, 0.03, 24); drain.translate(5.6, yTop + 0.015, 2.6); b.add(M.sheet, drain)
    const dome = new THREE.SphereGeometry(0.11, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2); dome.translate(5.6, yTop + 0.03, 2.6); b.add(M.dark, dome)
  }); rest.push(H + PARAPET)

  const dispose = () => root.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) { m.geometry.dispose(); for (const mat of Array.isArray(m.material) ? m.material : [m.material]) { for (const v of Object.values(mat)) if ((v as THREE.Texture)?.isTexture) (v as THREE.Texture).dispose(); mat.dispose() } } })
  return { root, layers: [vapour, insulation, coverBoard, membrane, details], rest, setFinish: M.setFinish, dispose }
}
