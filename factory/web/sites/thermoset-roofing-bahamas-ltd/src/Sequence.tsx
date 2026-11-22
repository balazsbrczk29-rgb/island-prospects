// The roof build-up, baked: the three.js scene (RoofScene.tsx) is rendered offline into AVIF frame sequences
// (factory tools, see public/seq/README.txt), so every visitor sees the same studio-quality frames and no device
// has to render 3D. Scroll progress picks the frame; finishes other than the first have their own short sequence
// for the system picker. Compressed frames stay in memory as blobs; only a small window around the current frame
// is decoded into bitmaps, so memory stays bounded on phones.
import { useEffect, useRef, type MutableRefObject } from 'react'
import type { Anchor, SceneApi } from './RoofScene'

type Mode = 'wide' | 'tall'
type SetDef = { dir: string; n: number; p0: number; p1: number; w: number; h: number }
const SIZE: Record<Mode, [number, number]> = { wide: [1920, 1200], tall: [800, 1600] }
const FRAMES: Record<Mode, { main: number; finish: number }> = { wide: { main: 181, finish: 17 }, tall: { main: 121, finish: 13 } }
const P_FINISH = 0.84
const def = (mode: Mode, finish: number): SetDef => {
  const [w, h] = SIZE[mode]
  return finish === 0
    ? { dir: `seq/${mode}-0`, n: FRAMES[mode].main, p0: 0, p1: 1, w, h }
    : { dir: `seq/${mode}-${finish}`, n: FRAMES[mode].finish, p0: P_FINISH, p1: 1, w, h }
}
const url = (s: SetDef, i: number) => `./${s.dir}/${String(i).padStart(3, '0')}.avif`
const KEEP = 14

class FrameSet {
  blobs: (Blob | null)[]; bmps = new Map<number, ImageBitmap>(); pending = new Set<number>(); started = false
  constructor(public s: SetDef, private onChange: () => void) { this.blobs = new Array(s.n).fill(null) }
  index(p: number) { return Math.max(0, Math.min(this.s.n - 1, Math.round((p - this.s.p0) / (this.s.p1 - this.s.p0) * (this.s.n - 1)))) }
  // coarse to fine, so a fast scroll always has a nearby frame: 0, every 16th, every 8th, ... every frame
  load(first = 0) {
    if (this.started) return; this.started = true
    const order: number[] = [first], seen = new Set(order)
    for (const step of [16, 8, 4, 2, 1]) for (let i = 0; i < this.s.n; i += step) if (!seen.has(i)) { seen.add(i); order.push(i) }
    if (!seen.has(this.s.n - 1)) order.push(this.s.n - 1)
    let next = 0
    const worker = async () => {
      while (next < order.length) {
        const i = order[next++]
        try { const r = await fetch(url(this.s, i)); if (r.ok) { this.blobs[i] = await r.blob(); this.onChange() } } catch { /* keep going */ }
      }
    }
    for (let k = 0; k < 4; k++) worker()
  }
  decode(i: number) {
    if (this.bmps.has(i) || this.pending.has(i) || !this.blobs[i]) return
    this.pending.add(i)
    createImageBitmap(this.blobs[i]!).then(b => {
      this.pending.delete(i); this.bmps.set(i, b)
      for (const k of [...this.bmps.keys()].sort((a, c) => Math.abs(c - i) - Math.abs(a - i))) { if (this.bmps.size <= KEEP) break; this.bmps.get(k)!.close(); this.bmps.delete(k) }
      this.onChange()
    }, () => this.pending.delete(i))
  }
  // the exact frame if it is decoded, otherwise the nearest decoded one (and ask for the exact one)
  best(i: number): ImageBitmap | null {
    for (const d of [0, 1, -1, 2, -2, 3, -3]) if (this.blobs[i + d]) { this.decode(i + d); break }
    if (this.bmps.has(i)) return this.bmps.get(i)!
    let bestK = -1; for (const k of this.bmps.keys()) if (bestK < 0 || Math.abs(k - i) < Math.abs(bestK - i)) bestK = k
    return bestK >= 0 ? this.bmps.get(bestK)! : null
  }
  dispose() { this.bmps.forEach(b => b.close()); this.bmps.clear() }
}

export default function Sequence({ progress, finish, onAnchors, onReady, api, className }: {
  progress: MutableRefObject<number>; finish: number; onAnchors?: (a: Anchor[]) => void; onReady?: () => void
  api?: MutableRefObject<SceneApi | null>; className?: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const finishRef = useRef(finish); finishRef.current = finish
  const cb = useRef({ onAnchors, onReady }); cb.current = { onAnchors, onReady }
  const draw = useRef<() => void>(() => {})
  useEffect(() => { draw.current() }, [finish])

  useEffect(() => {
    const cv = canvas.current!, ctx = cv.getContext('2d')!
    let mode: Mode = innerWidth / innerHeight >= 0.95 ? 'wide' : 'tall'
    let sets = new Map<string, FrameSet>(), anchors: number[][][] | null = null, ready = false, raf = 0
    const get = (f: number) => { const k = `${mode}-${f}`; let s = sets.get(k); if (!s) { s = new FrameSet(def(mode, f), () => schedule()); sets.set(k, s) } return s }
    const loadAnchors = () => { anchors = null; if (mode === 'wide') fetch('./seq/wide-0/anchors.json').then(r => r.json()).then(a => { anchors = Object.keys(a).sort((x, y) => +x - +y).map(k => a[k]); schedule() }, () => {}) }
    const render = () => {
      raf = 0
      const p = progress.current, f = finishRef.current
      const main = get(0); main.load(main.index(p))
      const fs = f > 0 ? get(f) : null; if (fs && p > 0.6) fs.load(fs.index(p))
      const use = fs && p >= P_FINISH ? fs : main
      const img = use.best(use.index(p)) ?? (use !== main ? main.best(main.index(p)) : null)
      const dpr = Math.min(devicePixelRatio || 1, 2), W = cv.clientWidth, H = cv.clientHeight
      if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr) }
      const { w: fw, h: fh } = use.s, s = Math.max(W / fw, H / fh), dx = (W - fw * s) / 2, dy = (H - fh * s) / 2
      if (img) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, dx, dy, fw * s, fh * s)
        if (!ready) { ready = true; cb.current.onReady?.() }
      }
      const onAnchors = cb.current.onAnchors
      if (onAnchors && anchors && mode === 'wide') {
        const x = (p - 0) * (anchors.length - 1), i0 = Math.floor(Math.max(0, Math.min(anchors.length - 1, x))), i1 = Math.min(anchors.length - 1, i0 + 1), t = Math.max(0, Math.min(1, x - i0))
        onAnchors(anchors[i0].map(([ax, ay], k) => { const [bx, by] = anchors![i1][k]; return { x: dx + (ax + (bx - ax) * t) * fw * s, y: dy + (ay + (by - ay) * t) * fh * s } }))
      }
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(render) }
    draw.current = schedule
    if (api) api.current = { invalidate: schedule }
    loadAnchors()
    const ro = new ResizeObserver(() => {
      const m: Mode = innerWidth / innerHeight >= 0.95 ? 'wide' : 'tall'
      if (m !== mode) { sets.forEach(s => s.dispose()); sets = new Map(); mode = m; loadAnchors() }
      schedule()
    })
    ro.observe(cv)
    schedule()
    return () => { cancelAnimationFrame(raf); ro.disconnect(); sets.forEach(s => s.dispose()); if (api) api.current = null }
  }, [progress, api])

  return <canvas ref={canvas} className={className} />
}
