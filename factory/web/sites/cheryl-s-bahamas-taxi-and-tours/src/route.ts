import { STOPS, DOCK, type Stop } from "./stops"
import { project } from "./island"

export type Pt = [number, number]
export type Leg = { a: Pt; b: Pt; mode: "road" | "sea"; km: number; key: string }

const R = 6371
export function haversine([la1, lo1]: [number, number], [la2, lo2]: [number, number]) {
  const t = Math.PI / 180, dla = (la2 - la1) * t, dlo = (lo2 - lo1) * t
  const h = Math.sin(dla / 2) ** 2 + Math.cos(la1 * t) * Math.cos(la2 * t) * Math.sin(dlo / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}
/* straight line to road distance: a planning estimate, shown as one */
const ROAD = 1.35
export const KMH = 32

export function order(start: [number, number], ids: string[]): Stop[] {
  const pool = ids.map(id => STOPS.find(s => s.id === id)!).filter(Boolean)
  const near = pool.filter(s => !s.far), far = pool.filter(s => s.far)
  const out: Stop[] = []
  let cur = start
  while (near.length) {
    let bi = 0, bd = Infinity
    near.forEach((s, i) => { const d = haversine(cur, s.sea ? DOCK : s.at); if (d < bd) { bd = d; bi = i } })
    const [s] = near.splice(bi, 1); out.push(s); cur = s.sea ? DOCK : s.at
  }
  return out.concat(far)
}

/* legs of the day: road to the harbour, then sea out to boat stops */
export function legs(start: [number, number], stops: Stop[]): Leg[] {
  const out: Leg[] = []
  const P = (ll: [number, number]): Pt => project(ll[0], ll[1])
  const push = (a: [number, number], b: [number, number], mode: "road" | "sea", key: string) => {
    if (a[0] === b[0] && a[1] === b[1]) return
    out.push({ a: P(a), b: P(b), mode, km: mode === "road" ? haversine(a, b) * ROAD : 0, key })
  }
  let cur: [number, number] = start, atSea = false, prevId = "start"
  const seq = [...stops.map(s => ({ id: s.id, at: s.at, sea: !!s.sea })), { id: "end", at: start, sea: false }]
  for (const s of seq) {
    if (atSea && s.sea) { push(cur, s.at, "sea", `${prevId}>${s.id}`) }
    else if (atSea && !s.sea) { push(cur, DOCK, "sea", `${prevId}>dock`); push(DOCK, s.at, "road", `dock>${s.id}`) }
    else if (!atSea && s.sea) { push(cur, DOCK, "road", `${prevId}>dock`); push(DOCK, s.at, "sea", `dock>${s.id}`) }
    else push(cur, s.at, "road", `${prevId}>${s.id}`)
    cur = s.at; atSea = s.sea; prevId = s.id
  }
  return out
}

/* a gentle arc between two points, so legs read as a route and not a ruler */
export function arc([x1, y1]: Pt, [x2, y2]: Pt, bend = 0.14) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${(mx - dy * bend).toFixed(1)} ${(my + dx * bend).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
}
