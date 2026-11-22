export const IMG = "https://ip-assets-pro-tech-security.lovable.app/assets/"
export const PHONE = "(242) 328-0653"
export const TEL = "+12423280653"
export const PHONE2 = "(242) 325-3335"
export const TEL2 = "+12423253335"
export const INTL = "+1 (954) 237-1017"
export const TELINTL = "+19542371017"
export const FAX = "(242) 325-3350"
export const ADDRESS = "#2 Farrington Road & Gregory Street, Nassau"

export type Scene = "day" | "dusk" | "night"
export const sceneFor = (h: number): Scene => (h >= 6 && h < 18 ? "day" : h >= 18 && h < 20 ? "dusk" : "night")

/** Current hour in Nassau as a decimal, plus weekday (0 Sunday). */
export function nassauNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Nassau", hour: "numeric", minute: "numeric", weekday: "short", hour12: false }).formatToParts(d)
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? "0"
  const h = Number(get("hour")) % 24, m = Number(get("minute"))
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"))
  return { hour: h + m / 60, weekday: wd }
}

export const fmt = (hour: number) => {
  const h = Math.floor(hour) % 24, m = Math.round((hour - Math.floor(hour)) * 60)
  const ap = h < 12 ? "am" : "pm", h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`
}

export function officeLine(hour: number, weekday: number) {
  const weekdayOpen = weekday >= 1 && weekday <= 5
  if (weekdayOpen && hour >= 9 && hour < 17) return "Our office on Farrington Road is open until 5."
  if (weekdayOpen && hour < 9) return "Our office opens at 9."
  if (weekday === 6 || weekday === 0 || (weekday === 5 && hour >= 17)) return "Our office reopens Monday at 9."
  return "Our office has closed for the day."
}

export const STOPS = [
  { hour: 9, label: "9:00", title: "The office opens", scene: "day" as Scene },
  { hour: 14, label: "14:00", title: "Officers on post", scene: "day" as Scene },
  { hour: 18.5, label: "18:30", title: "The alarm is set", scene: "dusk" as Scene },
  { hour: 3, label: "3:00", title: "The central station", scene: "night" as Scene },
]

export const CHAPTERS = [
  { n: "3.1", time: "9:00", ink: "#101a24", img: "cctv-closeup.jpg", alt: "A white CCTV camera on a bracket against a pale green wall in morning sun (illustrative)", title: "The office opens on Farrington Road.",
    lines: ["Alarm systems and CCTV cameras, sold, installed and serviced.", "The office is open Monday to Friday, 9 to 5."] },
  { n: "3.2", time: "14:00", ink: "#101a24", img: "guard-gate.jpg", alt: "A security officer in a navy uniform at a white gate, seen from behind (illustrative)", title: "Officers on post.",
    lines: ["Security guard services for businesses and sites in Nassau.", "Pro-Tech runs its own training programme for its officers."] },
  { n: "3.3", time: "18:30", ink: "#fbf6ec", img: "street-dusk.jpg", alt: "The same Nassau shop at dusk, shutter down and the wall light on (illustrative)", title: "The shutter comes down. The alarm is set.",
    lines: ["From here a monitored alarm reports to Pro-Tech's central station.", "Set it as you leave, and it is watched until you open up."] },
  { n: "3.4", time: "3:00", ink: "#e9e4d8", img: "control-room.jpg", alt: "A quiet monitoring desk at night with two screens (illustrative)", title: "At 3 am, the central station is watching.",
    lines: ["24/7 central station monitoring, weekends and holidays included.", "The one thing a camera on its own cannot do: notice."] },
]

export const PROPERTY = ["A home", "A shop or office", "A warehouse or yard", "A site or event"]
export const NEEDS = ["An alarm system", "CCTV cameras", "Monitoring for my alarm", "Security officers", "Security supplies", "Consulting or an investigation", "Collections"]

export function requestText(p: string, needs: string[], area: string) {
  return `Pro-Tech request: ${p || "property not chosen"}${area ? ` in ${area}` : ""}. Needs: ${needs.length ? needs.map(n => (n.startsWith("CCTV") ? n : n[0].toLowerCase() + n.slice(1))).join(", ") : "not chosen yet"}.`
}

/* ===== Nov 22 planner (job spec) ===== */
export const PROPS = ["A home", "A shop or office", "A warehouse or yard"] as const
export const NEEDS2 = ["Alarm", "Cameras", "Monitoring", "Guards", "Not sure"] as const
export type Need = (typeof NEEDS2)[number]
export const AREAS = ["Downtown and Over-the-Hill", "Palmdale and Centreville", "Cable Beach and the West", "Western New Providence", "Carmichael and the South West", "Eastern Road and the East", "Elsewhere in Nassau"]

export const DIVISIONS = {
  guards: { n: "2.1", name: "Security guard services", line: "Officers on post at your business or site, trained in Pro-Tech's own programme." },
  cctv: { n: "2.2", name: "CCTV and alarm sales and service", line: "Alarm systems and CCTV cameras supplied, installed and serviced." },
  monitoring: { n: "2.3", name: "24/7 central station monitoring", line: "Your alarm reports to Pro-Tech's central station, day and night, weekends included." },
  supplies: { n: "2.4", name: "Security supplies", line: "Security equipment and supplies." },
  consulting: { n: "2.5", name: "Consulting and investigations", line: "Advice on what your property needs, and investigations when something has happened." },
  collections: { n: "2.6", name: "Collections", line: "Collections services." },
} as const
export type DKey = keyof typeof DIVISIONS

const NEED_DIV: Record<Need, DKey> = { Alarm: "cctv", Cameras: "cctv", Monitoring: "monitoring", Guards: "guards", "Not sure": "consulting" }

export function covered(needs: Need[]): DKey[] {
  const out: DKey[] = []
  needs.forEach(n => { const d = NEED_DIV[n]; if (!out.includes(d)) out.push(d) })
  return out
}

export function request2(p: string, needs: Need[], area: string) {
  const PH: Record<Need, string> = { Alarm: "an alarm", Cameras: "CCTV cameras", Monitoring: "monitoring for my alarm", Guards: "security officers", "Not sure": "advice on what I need" }
  const list = needs.map(n => PH[n])
  const where = area ? ` in ${area}` : " in New Providence"
  if (!list.length || (needs.length === 1 && needs[0] === "Not sure")) return `Pro-Tech request: ${p.charAt(0).toLowerCase() + p.slice(1)}${where}. Please advise what I need.`
  return `Pro-Tech request: ${p.charAt(0).toLowerCase() + p.slice(1)}${where}. I need ${list.join(", ").replace(/, ([^,]*)$/, " and $1")}.`
}

export function officeShort(hour: number, weekday: number) {
  const weekdayOpen = weekday >= 1 && weekday <= 5
  if (weekdayOpen && hour >= 9 && hour < 17) return "office open until 5"
  if (weekdayOpen && hour < 9) return "office opens at 9"
  if (weekday === 6 || weekday === 0 || (weekday === 5 && hour >= 17)) return "office reopens Monday at 9"
  return "office closed for the day"
}
