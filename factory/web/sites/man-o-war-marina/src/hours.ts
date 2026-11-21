// Published hours (manowarmarinavillage.com/services), Monday to Saturday. Minutes from midnight, Bahamas time.
export type Place = { key: string; name: string; spans: [number, number][] }
const h = (x: number) => x * 60
export const PLACES: Place[] = [
  { key: 'fuel', name: 'Fuel dock', spans: [[h(8), h(12)], [h(13), h(16)]] },
  { key: 'office', name: 'Office and gift shop', spans: [[h(8), h(12)], [h(13), h(16)]] },
  { key: 'road', name: 'Roadside pump', spans: [[h(9), h(12)], [h(14), h(16)]] },
  { key: 'dine', name: 'Dock N’ Dine lunch', spans: [[h(11), h(15)]] },
]

const WORDS: Record<number, string> = { 8: 'eight', 9: 'nine', 11: 'eleven', 12: 'noon', 13: 'one', 14: 'two', 15: 'three', 16: 'four' }
export const word = (m: number) => WORDS[m / 60] ?? clock(m)
export const clock = (m: number) => {
  const hh = Math.floor(m / 60), mm = m % 60, ap = hh >= 12 ? 'pm' : 'am', h12 = ((hh + 11) % 12) + 1
  return `${h12}:${String(mm).padStart(2, '0')} ${ap}`
}
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function nassauNow(d = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Nassau', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
    .formatToParts(d).map(x => [x.type, x.value]))
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday as string)
  return { day, min: Number(p.hour) * 60 + Number(p.minute) }
}

export type State = { open: boolean; until?: number; next?: { day: string | null; at: number } }
export function stateOf(place: Place, day: number, min: number): State {
  const working = day >= 1 && day <= 6
  if (working) {
    for (const [a, b] of place.spans) if (min >= a && min < b) return { open: true, until: b }
    for (const [a] of place.spans) if (min < a) return { open: false, next: { day: null, at: a } }
  }
  const nextDay = day === 6 || day === 0 ? 'Monday' : 'tomorrow'
  return { open: false, next: { day: nextDay, at: place.spans[0][0] } }
}

// The headline sentence a captain reads first.
export function headline(day: number, min: number) {
  const s = stateOf(PLACES[0], day, min)
  const when = `${DAYS[day]}, ${clock(min)} on Man‑O‑War Cay.`
  let what: string
  if (s.open) what = `The fuel dock is open until ${word(s.until!)}.`
  else if (s.next!.day) what = `The fuel dock opens ${s.next!.day} at ${word(s.next!.at)}.`
  else what = s.next!.at === h(13) ? 'The fuel dock reopens at one.' : `The fuel dock opens at ${word(s.next!.at)}.`
  return { when, what, open: s.open }
}

export function line(place: Place, day: number, min: number) {
  const s = stateOf(place, day, min)
  if (s.open) return { open: true, text: `open until ${word(s.until!)}` }
  return { open: false, text: s.next!.day ? `opens ${s.next!.day} at ${word(s.next!.at)}` : `opens at ${word(s.next!.at)}` }
}
