import { VILLAS, VAT, WHOLE, type Villa } from './data'

export const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
export const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const addDays = (s: string, n: number) => { const d = new Date(s + 'T12:00'); d.setDate(d.getDate() + n); return iso(d) }
export const nice = (s: string) => new Date(s + 'T12:00').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
export const inSeasonMonth = (m: number) => m >= 1 && m <= 7   // February to August

/** First Saturday of March of the coming season, or two weeks out when we are already in season. */
export function defaultArrival(now = new Date()) {
  const y = now.getMonth() >= 2 ? now.getFullYear() + 1 : now.getFullYear()
  const d = new Date(y, 2, 1, 12); while (d.getDay() !== 6) d.setDate(d.getDate() + 1)
  const soon = addDays(iso(now), 14)
  return inSeasonMonth(now.getMonth()) && now.getMonth() < 6 ? soon : iso(d)
}

function thanksgiving(y: number) { const d = new Date(y, 10, 1, 12); while (d.getDay() !== 4) d.setDate(d.getDate() + 1); d.setDate(d.getDate() + 21); return iso(d) }
/** Off-season rates exclude Thanksgiving, Christmas and New Year: Wednesday before Thanksgiving to the Sunday after, and Dec 20 to Jan 2. */
export function isHoliday(day: string) {
  const y = +day.slice(0, 4), tg = thanksgiving(y)
  if (day >= addDays(tg, -1) && day <= addDays(tg, 3)) return true
  const md = day.slice(5)
  return md >= '12-20' || md <= '01-02'
}

export type Quote =
  | { kind: 'total'; total: number; base: number; vat: number; line: string; note?: string }
  | { kind: 'ask'; head: string; line: string }
  | { kind: 'min'; head: string; line: string }
  | { kind: 'whole'; pick: 'three' | 'week' | null; line: string }

export function quote(v: Villa | 'whole', arrive: string, n: number): Quote {
  if (!arrive) return { kind: 'ask', head: 'Pick your arrival date', line: 'The season and the rate follow from it.' }
  const m = new Date(arrive + 'T12:00').getMonth()
  const inS = inSeasonMonth(m)
  if (v === 'whole') {
    const pick = n === 3 ? 'three' : n === 7 ? 'week' : null
    return { kind: 'whole', pick, line: pick ? `${n} nights for the whole resort, VAT included.` : `Ask the resort for ${n} nights; the published group rates are three days and one week.` }
  }
  const day = inS ? v.inDay : v.offDay, week = inS ? v.inWeek : v.offWeek
  if (!day || !week) return { kind: 'ask', head: 'Rates on request', line: `${v.name} has no published rate yet. Ask the resort for your dates.` }
  if (inS && n < 3) return { kind: 'min', head: 'Three nights minimum', line: 'From February to August, stays start at three nights.' }
  let holiday = false, crosses = false
  for (let i = 0; i < n; i++) { const d = addDays(arrive, i); if (isHoliday(d)) holiday = true; if (inSeasonMonth(+d.slice(5, 7) - 1) !== inS) crosses = true }
  if (!inS && holiday) return { kind: 'ask', head: 'Holiday dates', line: 'Thanksgiving, Christmas and New Year are priced separately. Ask the resort.' }
  const weeks = Math.floor(n / 7), rest = n % 7
  const restCost = Math.min(rest * day, week)
  const base = weeks * week + restCost
  const vat = Math.round(base * VAT)
  const parts = [weeks ? `${weeks > 1 ? weeks + ' x ' : ''}weekly rate ${money(week)}` : '', rest ? (rest * day > week ? `${rest} nights at the weekly rate ${money(week)}` : `${rest} ${rest > 1 ? 'nights' : 'night'} x ${money(day)}`) : ''].filter(Boolean).join(' + ')
  return { kind: 'total', total: base + vat, base, vat, line: `${n} nights, ${inS ? 'in season' : 'off season'}: ${parts} + ${money(vat)} VAT.`, note: crosses ? `Your stay crosses into ${inS ? 'off' : 'in'} season; the resort confirms the final rate.` : undefined }
}

export const WHOLE_PRICES = WHOLE
export const byId = (id: string) => VILLAS.find(v => v.id === id)
