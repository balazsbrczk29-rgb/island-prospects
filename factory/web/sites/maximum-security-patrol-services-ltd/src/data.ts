// Facts from BahamasLocal (company-supplied description), Bahamas Index and the URCA public register (8 May 2024). See factory/briefs.
export const IMG = "https://ip-assets-maximum-security.lovable.app/assets/"

export const biz = {
  name: "Maximum Security & Patrol Services Ltd.",
  short: "Maximum Security & Patrol Services",
  phones: [{ label: "242-394-5425", tel: "tel:+12423945425" }, { label: "242-393-7206", tel: "tel:+12423937206" }],
  fax: "242-394-5428",
  address: "#15 Carib Road (Carib House)",
  box: "P.O. Box N-9425",
  town: "Nassau, New Providence",
  map: "https://www.google.com/maps/search/?api=1&query=15+Carib+Road+Nassau+Bahamas",
}

export type SvcId = "officers" | "patrols" | "alarm" | "investigations" | "consultancy"
export const SERVICES: { id: SvcId; n: string; name: string; key: string; words: string; who: string; say: string; photo?: { src: string; alt: string } }[] = [
  { id: "officers", n: "01", name: "Security officers", key: "Officers on post", say: "trained officers on post",
    words: "Trained security officers for diverse and special applications, on post at your door, desk or gate.",
    who: "Banks, offices, retail, government buildings, residences",
    photo: { src: IMG + "h06-post.jpg", alt: "A security officer seen from behind at the glass doors of a pastel office building at dawn (illustrative photograph)" } },
  { id: "patrols", n: "02", name: "Patrols", key: "Patrol route", say: "patrols of the perimeter",
    words: "Patrol services that check gates, doors and the perimeter on a schedule agreed with you.",
    who: "Yards, plazas and gated properties after hours",
    photo: { src: IMG + "h18-patrol.jpg", alt: "An unmarked patrol truck beside a pink colonial building at dusk, an officer walking the wall with a torch (illustrative photograph)" } },
  { id: "alarm", n: "03", name: "Alarm monitoring", key: "Alarm sensors", say: "alarm monitoring",
    words: "Alarm monitoring, so a signal at any hour reaches someone who acts on it.",
    who: "Premises with an alarm system",
    photo: { src: IMG + "h03-watch.jpg", alt: "An alarm monitoring desk lit only by screens in a dark room (illustrative photograph)" } },
  { id: "investigations", n: "04", name: "Investigations", key: "Case file", say: "an investigation",
    words: "Investigations, from the same company that guards your premises.",
    who: "Businesses and private clients" },
  { id: "consultancy", n: "05", name: "Consultancy", key: "Site survey", say: "security consultancy",
    words: "Security consultancy, and customised services for situations that may need a special response.",
    who: "Owners planning or reviewing their security" },
]

export const HOURS = ["Business hours", "Nights", "Around the clock", "Not sure yet"] as const
export type Hours = (typeof HOURS)[number]

type R = [number, number, number, number] // x y w h
type Pt = [number, number]
export type Premises = {
  id: string; name: string; noun: string
  site: R; buildings: { r: R; label: string }[]; areas?: { r: R; label: string }[]
  posts: Pt[]; sensors: Pt[]; caseAt: Pt; survey: R; street: { at: Pt; label: string }
}

// Diagram plans (viewBox 640 x 420). Category-standard layouts for illustration only.
export const PREMISES: Premises[] = [
  { id: "office", name: "Bank or office", noun: "bank or office",
    site: [40, 36, 560, 340], street: { at: [320, 404], label: "Street" },
    buildings: [{ r: [170, 84, 300, 180], label: "Banking hall and offices" }],
    areas: [{ r: [64, 300, 230, 56], label: "Car park" }],
    posts: [[320, 264], [470, 176], [180, 328], [320, 210], [320, 84], [570, 340]],
    sensors: [[170, 130], [170, 220], [470, 120], [250, 84], [390, 84], [400, 264], [240, 264]],
    caseAt: [420, 150], survey: [150, 64, 340, 220] },
  { id: "retail", name: "Retail store", noun: "retail store",
    site: [40, 50, 560, 300], street: { at: [320, 404], label: "Sidewalk and street" },
    buildings: [{ r: [80, 96, 480, 176], label: "Shop floor" }],
    areas: [{ r: [470, 60, 90, 36], label: "Loading" }],
    posts: [[250, 272], [400, 272], [515, 96], [320, 190], [150, 190], [560, 300]],
    sensors: [[120, 272], [190, 272], [460, 272], [530, 272], [80, 180], [560, 180], [300, 96]],
    caseAt: [190, 140], survey: [60, 76, 520, 216] },
  { id: "government", name: "Government building", noun: "government building",
    site: [40, 30, 560, 350], street: { at: [320, 404], label: "Street" },
    buildings: [{ r: [180, 70, 280, 170], label: "Offices and public counter" }],
    areas: [{ r: [250, 240, 140, 90], label: "Forecourt" }, { r: [60, 270, 150, 80], label: "Staff parking" }],
    posts: [[320, 380], [320, 240], [320, 180], [600, 200], [320, 70], [135, 350]],
    sensors: [[180, 110], [180, 200], [460, 110], [460, 200], [260, 70], [380, 70], [250, 240]],
    caseAt: [410, 120], survey: [160, 50, 320, 210] },
  { id: "residence", name: "Residence", noun: "residence",
    site: [70, 40, 500, 340], street: { at: [320, 404], label: "Road" },
    buildings: [{ r: [170, 100, 230, 150], label: "House" }, { r: [400, 160, 90, 90], label: "Garage" }],
    areas: [{ r: [200, 290, 130, 50], label: "Pool" }],
    posts: [[470, 380], [285, 250], [285, 100], [130, 320]],
    sensors: [[170, 150], [170, 210], [400, 120], [230, 100], [340, 100], [230, 250], [445, 250]],
    caseAt: [330, 140], survey: [150, 80, 360, 190] },
  { id: "yard", name: "Yard or warehouse", noun: "yard or warehouse",
    site: [30, 34, 580, 356], street: { at: [320, 404], label: "Road" },
    buildings: [{ r: [330, 64, 250, 170], label: "Warehouse" }, { r: [70, 296, 100, 64], label: "Office" }],
    areas: [{ r: [70, 80, 100, 34], label: "Containers" }, { r: [70, 130, 100, 34], label: "" }, { r: [190, 80, 100, 34], label: "" }],
    posts: [[230, 390], [455, 234], [120, 296], [250, 200], [600, 46], [330, 150]],
    sensors: [[330, 100], [330, 200], [580, 100], [580, 200], [400, 234], [510, 234], [120, 360]],
    caseAt: [150, 320], survey: [310, 44, 290, 210] },
]

export const message = (p: Premises, svc: SvcId[], hours: Hours, posts: number, where: string) => {
  const list = SERVICES.filter(s => svc.includes(s.id)).map(s => (s.id === "officers" ? `${posts} ${posts === 1 ? "officer" : "officers"} on post at once` : s.say))
  const what = list.length === 0 ? "advice on what we need" : list.length === 1 ? list[0] : `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`
  const when = hours === "Not sure yet" ? "hours to be agreed" : hours.charAt(0).toLowerCase() + hours.slice(1)
  return `Good day. I would like a security proposal for a ${p.noun} ${where.trim() ? `at ${where.trim()}` : "in New Providence"}: ${what}, ${when}. Please arrange a site visit.`
}
