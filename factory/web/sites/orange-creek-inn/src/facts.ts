// Every fact here comes from orangecreekinn.com (scraped 2026-11-20) or the inn's BahamaGo page.
export const NAME = "Orange Creek Inn"
export const PHONE = "1 242 354 4110"
export const TEL = "tel:+12423544110"
export const EMAIL = "info@orangecreekinn.com"
export const BOOK = "https://www.bahamago.com/hotels/22-Orange-Creek-Inn?ref=oipb"
export const FACEBOOK = "https://www.facebook.com/Orange-Creek-Inn-698462783509770/"
export const TRIPADVISOR = "https://www.tripadvisor.in/Hotel_Review-g147427-d252196-Reviews-Orange_Creek_Inn-Cat_Island_Out_Islands_Bahamas.html"

const WP = "https://www.orangecreekinn.com/wp-content/uploads/"
export type Photo = { src: string; w: number; h: number; alt: string; caption: string }
const p = (file: string, alt: string, caption: string, w = 900, h = 520): Photo => ({ src: WP + file, w, h, alt, caption })

export const PHOTOS = {
  road: p("2019/08/gallery-img-4.jpg", "The road at Orange Creek running beside a long white-sand beach and pale turquoise water", "The road, and then the beach."),
  inn: p("2019/08/gallery-img-1.jpg", "Orange Creek Inn, a white two-storey building behind pink bougainvillea", "The inn, from the garden."),
  sandbar: p("2019/08/gallery-img-2.jpg", "A white sandbar in clear turquoise shallows at Orange Creek", "Low water, a few minutes' walk."),
  rocks: p("2019/08/gallery-img-7.jpg", "Dark rocks on the sand at the water's edge with sailboats anchored on the horizon", "Boats at anchor off the beach."),
  aerial: p("2019/08/gallery-img-6.jpg", "Orange Creek from the air: white buildings on the shore, the creek mouth and curving white sandbars", "Orange Creek from the air: the creek mouth and its sandbars."),
  studioA: p("2019/08/accomodations-img.jpg", "A studio at Orange Creek Inn with teal bedspreads and a round wooden table set with flowers", "A studio, made up for arrival.", 1046, 786),
  studioB: p("2019/08/gallery-img-5.jpg", "A studio with two beds, a dining table and chairs and a bright window", "Two beds, a table, the morning light."),
  flats: p("2016/02/gallery-img5.jpg", "Shallow clear flats under a wide sky with a line of green shore", "The flats, ankle deep."),
  bonefish: p("2016/02/gallery-img7.jpg", "A bonefish swimming over white sand in clear green water", "A bonefish, back in the water."),
  angler: p("2016/02/gallery-img4.jpg", "An angler standing in the shallows with a fly rod at sunset", "Last cast before dark."),
  egrets: p("2016/02/gallery-img1.jpg", "Two white egrets reflected in still water among mangrove roots", "Egrets in the mangroves."),
  kayak: p("2019/08/gallery-img-3.jpg", "Two people in a kayak on bright turquoise water just off the beach", "Kayaks off the beach."),
  creek: p("2019/08/welcome-img.jpg", "A kayaker paddling a narrow mangrove creek, seen from above", "Up the creek by kayak.", 569, 337),
} as const

export type Origin = "nassau" | "florida" | "northamerica" | "europe"
export const ORIGINS: { id: Origin; label: string }[] = [
  { id: "nassau", label: "Nassau or the Bahamas" },
  { id: "florida", label: "Florida" },
  { id: "northamerica", label: "Elsewhere in the US or Canada" },
  { id: "europe", label: "Europe or Latin America" },
]

const day = (s: string) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10), 12)
const HOLIDAYS: [string, string, string][] = [
  ["2026-11-26", "2026-11-28", "26 to 28 November 2026"],
  ["2026-12-19", "2027-01-01", "19 December to 1 January"],
  ["2027-03-25", "2027-03-28", "25 to 28 March 2027"],
  ["2027-07-01", "2027-07-04", "1 to 4 July 2027"],
]
type Offer = { id: string; title: string; detail: string; bookFrom: string; bookTo: string; travelFrom: string; travelTo: string; blackouts: number }
const std = { bookFrom: "2026-07-01", bookTo: "2027-06-30", travelFrom: "2026-07-05", travelTo: "2027-10-31" }

/** The published Bahama Out Islands Promotion Board offers that fit a stay, with a date check when an arrival is given. */
export function offersFor(nights: number, origin: Origin, arrive: string | null, today = new Date()) {
  const list: Offer[] = []
  if (nights >= 2 && nights < 4) {
    list.push({ id: "fee150", title: "$150 fee credit", detail: "A pre-booked two-night stay.", ...std, blackouts: 4 })
    list.push({ id: "fly1", title: "One free ticket from Nassau", detail: "A pre-booked two-night stay.", ...std, blackouts: 4 })
  }
  if (nights >= 4) {
    list.push({ id: "fee300", title: "$300 fee credit", detail: "Four nights or longer.", ...std, blackouts: 4 })
    list.push({ id: "fly2", title: "Two free tickets from Nassau", detail: "Pre-booked, four nights or longer.", ...std, blackouts: 4 })
    if (origin === "europe") list.push({ id: "eu", title: nights >= 7 ? "Two free tickets from Nassau, air-inclusive" : "One free ticket from Nassau, air-inclusive", detail: `Residents of Europe, Argentina, Brazil, Colombia and Mexico, ${nights >= 7 ? "seven nights, double occupancy" : "four to six nights"}.`, bookFrom: "2026-07-01", bookTo: "2027-06-30", travelFrom: "2026-07-02", travelTo: "2027-10-31", blackouts: 2 })
    else list.push({ id: "air", title: nights >= 7 ? "Two free round trips from Nassau" : "One free round trip from Nassau", detail: `A pre-booked air-inclusive stay of ${nights >= 7 ? "seven nights" : "four to six nights"}.`, bookFrom: "2026-07-01", bookTo: "2027-06-30", travelFrom: "2026-07-02", travelTo: "2027-10-31", blackouts: 0 })
    if (origin === "florida") list.push({ id: "fl250", title: "Up to $250 air or ferry credit", detail: "An air or ferry inclusive package from Florida, four nights or longer.", bookFrom: "2026-11-01", bookTo: "2027-01-31", travelFrom: "2026-11-02", travelTo: "2027-10-31", blackouts: 4 })
  }
  const now = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 12)
  return list.map(o => {
    let status: "ok" | "blocked" = "ok"
    let note = `${o.detail} Book by ${fmt(o.bookTo)}.`
    if (now > day(o.bookTo)) { status = "blocked"; note = `Booking closed on ${fmt(o.bookTo)}.` }
    else if (now < day(o.bookFrom)) note = `Booking opens ${fmt(o.bookFrom)}.`
    if (arrive && status === "ok") {
      const a = day(arrive), l = a + nights * 864e5
      if (a < day(o.travelFrom) || l > day(o.travelTo) + 864e5) { status = "blocked"; note = `Travel must fall between ${fmt(o.travelFrom)} and ${fmt(o.travelTo)}.` }
      else {
        const hit = HOLIDAYS.slice(0, o.blackouts).find(([f, t]) => a <= day(t) && l > day(f))
        if (hit) { status = "blocked"; note = `Not on these dates: blackout ${hit[2]}.` }
      }
    }
    const via = origin === "florida" && ["fly1", "fly2", "air"].includes(o.id)
    if (via && status === "ok") note = "Fits if you connect through Nassau instead of flying direct."
    return { id: o.id, title: o.title, detail: o.detail, status, note, via }
  })
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export function fmt(s: string) { const d = new Date(day(s)); return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}` }
export function longDate(s: string, plus = 0) { const d = new Date(day(s) + plus * 864e5); return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}` }

export const COSTS: [string, string][] = [
  ["Flight from Nassau, round trip", "about $190"],
  ["Taxi from the airport", "about $15"],
  ["A car for the day", "about $80"],
  ["A bicycle for the day", "$10"],
  ["Dinner at one of the six restaurants nearby", "$12 to $18"],
]

/** The six published offers, as listed on orangecreekinn.com (Bahama Out Islands Promotion Board programme). */
export const SPECIALS = [
  { ids: ["fee300"], title: "$300 fee credit", who: "Stays of four nights or longer.", book: "1 Jul 2026 to 30 Jun 2027", travel: "5 Jul 2026 to 31 Oct 2027", out: "Holiday blackouts apply" },
  { ids: ["fee150"], title: "$150 fee credit", who: "A pre-booked two-night stay.", book: "1 Jul 2026 to 30 Jun 2027", travel: "5 Jul 2026 to 31 Oct 2027", out: "Holiday blackouts apply" },
  { ids: ["fly1", "fly2"], title: "Fly free from Nassau", who: "One free airline ticket for a pre-booked two-night stay, two for four nights or longer.", book: "1 Jul 2026 to 30 Jun 2027", travel: "5 Jul 2026 to 31 Oct 2027", out: "Holiday blackouts apply" },
  { ids: ["air"], title: "Air-inclusive from Nassau", who: "Four to six nights: one free round trip. Seven nights: two.", book: "1 Jul 2026 to 30 Jun 2027", travel: "2 Jul 2026 to 31 Oct 2027", out: "No blackout dates" },
  { ids: ["fl250"], title: "Up to $250 from Florida", who: "Air or ferry inclusive packages from Florida, four nights or longer.", book: "1 Nov 2026 to 31 Jan 2027", travel: "2 Nov 2026 to 31 Oct 2027", out: "Holiday blackouts apply" },
  { ids: ["eu"], title: "Europe and Latin America", who: "Residents of Europe, Argentina, Brazil, Colombia and Mexico: one free ticket from Nassau for four to six nights, two for seven, double occupancy.", book: "1 Jul 2026 to 30 Jun 2027", travel: "2 Jul 2026 to 31 Oct 2027", out: "Thanksgiving and Christmas blackouts" },
] as const
export const specialTitle = (id: string) => SPECIALS.find(s => (s.ids as readonly string[]).includes(id))?.title ?? id
export const BLACKOUTS = ["26 to 28 Nov 2026", "19 Dec 2026 to 1 Jan 2027", "25 to 28 Mar 2027", "1 to 4 Jul 2027"]

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MAKERS_DAYS = [1, 3, 5, 6]
/** Getting-here line for an arrival day and a starting point (times as the inn publishes them). */
export function wayFor(arrive: string | null, origin: Origin) {
  const wd = arrive ? new Date(day(arrive)).getUTCDay() : null
  const dayName = wd === null ? null : WEEKDAYS[wd]
  const nassau = { air: "Western Air from Nassau", times: "9:30 am or 4:00 pm", note: "About $190 round trip." }
  if (origin === "florida") {
    if (wd === null || MAKERS_DAYS.includes(wd)) return { air: "Makers Air from Fort Lauderdale (FXE)", times: "6:45 am or 12:45 pm", note: wd === null ? "Monday, Wednesday, Friday and Saturday." : `Flies on ${dayName}s.`, ok: true }
    const next = WEEKDAYS[[1, 2, 3].map(k => (wd + k) % 7).find(i => MAKERS_DAYS.includes(i))!]
    return { air: "Makers Air from Fort Lauderdale (FXE)", times: "not on " + dayName + "s", note: `Nearest flight ${next}, or connect through Nassau.`, ok: false }
  }
  if (origin === "nassau") return { ...nassau, ok: true }
  return { air: "Into Nassau, then Western Air", times: "lands 9:30 am or 4:00 pm", note: "About $190 round trip from Nassau.", ok: true }
}
export function inDays(n: number) { const t = new Date(); t.setDate(t.getDate() + n); return t.toISOString().slice(0, 10) }
export function shortDate(s: string, plus = 0) { const d = new Date(day(s) + plus * 864e5); return `${DAYS[d.getUTCDay()].slice(0, 3)} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)}` }
