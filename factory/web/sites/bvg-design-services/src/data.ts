// Every fact here is sourced from bvgdesign.com (home, /faqs.html, /promo.html) or bahamasvacationguide.com, read 2026-11-21.
export const NAME = "BVG Design Services"
export const PHONE = "(242) 602-0658"
export const TEL = "tel:+12426020658"
export const US_PHONE = "(954) 640-8552"
export const US_TEL = "tel:+19546408552"
export const EMAIL = "info@bvgdesign.com"

const A = "https://ip-assets-bvg-design-services.lovable.app/assets/"
export const IMG = {
  hopeTown: A + "guide-hope-town.jpg",
  treasureCay: A + "guide-treasure-cay.jpg",
  nassauLight: A + "guide-nassau-light.jpg",
  deadmans: A + "guide-deadmans-reef.jpg",
  williamsTown: A + "guide-williams-town.jpg",
  exumas: A + "guide-exumas.jpg",
  lochabar: A + "guide-lochabar.jpg",
  harbour: A + "lucayan-harbour.jpg",
  desk: A + "studio-desk.jpg",
  server: A + "server-detail.jpg",
  sketch: A + "wireframe-sketch.jpg",
  proofs: A + "print-proofs.jpg",
}

// The guide's real sections, in the order its home page lists them.
export const GUIDE_LINKS = [
  "Activities", "Bed & Breakfast", "Car & Other Rentals", "Eco Tours", "Fishing & Scuba Info", "Hotels",
  "Kid Stuff", "Medical", "Nightlife", "Pampering", "Real Estate", "Restaurants",
  "Sailing & Charters", "Vacation Rentals", "Watersports", "Weather", "Weddings", "Islands & Maps",
]
export const GUIDE_LEAD = "The Bahamas Vacation Guide offers information on local businesses, photos, maps, island descriptions for Freeport/Lucaya, Grand Bahama Island, Nassau/Paradise Island, New Providence and the out islands."
export const GUIDE_LINE = "We are where you want to go before you go to The Bahamas."
export const GUIDE_FUN = "Fun and unspoiled beauty await you in the Bahamas."

export type NeedId = "site" | "redesign" | "found" | "hosting" | "ads"
export const NEEDS: { id: NeedId; label: string }[] = [
  { id: "site", label: "A new website" },
  { id: "redesign", label: "Redesign or take over my site" },
  { id: "found", label: "Get found on Google" },
  { id: "hosting", label: "Hosting and a domain" },
  { id: "ads", label: "Print and video advertising" },
]

export type Service = { id: string; need: NeedId; name: string; line: string; facts: string[] }
export const SERVICES: Service[] = [
  { id: "websites", need: "site", name: "Websites", line: "Cost-effective pages in a simple design, or a themed site of many pages for a business that wants to show everything it offers.",
    facts: ["Simple pages normally ready within 24 hours of the order", "Simple or themed multi-page sites", "Discounts over 10 pages, larger ones for hundreds"] },
  { id: "complex", need: "site", name: "Complex sites", line: "When a page has to do more than inform: scripting, dynamic pages and animation, built by the people who drew it.",
    facts: ["JavaScript", "Dynamic HTML", "Animation"] },
  { id: "redesign", need: "redesign", name: "Redesign or takeover", line: "Keep the site you have and have it fixed, or hand it over and have it redesigned and kept up to date.",
    facts: ["Small changes billed by the hour", "Full takeover and redesign", "Kept up to date for you"] },
  { id: "found", need: "found", name: "Getting found", line: "Optimisation and promotion in the major search engines, learned on our own guide in 1996.",
    facts: ["A free first consultation on your key phrases", "Site optimisation", "Promotion in the major search engines"] },
  { id: "hosting", need: "hosting", name: "Hosting and domains", line: "Your domain registered and your site hosted in one place, with a control panel simple enough to use yourself.",
    facts: ["Domain registration", "Hosting", "A user-friendly control panel"] },
  { id: "ads", need: "ads", name: "Advertising", line: "Our advertising agency department takes the same message off the screen and into print and video.",
    facts: ["Printed materials", "Advertising layout", "Video advertising for the web"] },
]

export const STEPS: [string, string][] = [
  ["Request", "Send the request from this page or call Freeport. No account is too small or too large."],
  ["Consultation", "We talk through what you need. The first consultation on how people find you in search is free."],
  ["Design", "Graphics and code, the two halves BVG started with in 1996, done by the same studio."],
  ["Live", "We register the domain, host the site and hand you a control panel you can use yourself."],
  ["Found", "Optimisation and promotion in the major search engines, and the site kept up to date."],
]
export const PAY = "Pay by cash, US or B$ cheque, bank deposit, or card through PayPal."

export const PAGES = ["1 page", "2 to 10", "11 to 99", "100 or more"] as const
export type Pages = (typeof PAGES)[number]
export const BIZ = ["Guesthouse or hotel", "Charter, tours or rentals", "Restaurant or bar", "Shop or retail", "Office or practice", "Something else"]
export const ISLANDS = ["Grand Bahama", "New Providence", "Abaco", "Another Bahamian island", "Outside the Bahamas"]

export type Req = { needs: NeedId[]; pages: Pages; biz: string; island: string; name: string }
export const DEFAULT_REQ: Req = { needs: ["site"], pages: "2 to 10", biz: BIZ[0], island: ISLANDS[0], name: "" }

/** What BVG does for this request, in its own published terms (bvgdesign.com, /faqs.html, /promo.html). */
export function answer(r: Req): { id: string; text: string; tier?: boolean }[] {
  const out: { id: string; text: string; tier?: boolean }[] = []
  const has = (n: NeedId) => r.needs.includes(n)
  if (has("site")) {
    if (r.pages === "1 page") out.push({ id: "p1", text: "A simple page is normally ready within 24 hours of the order." })
    else out.push({ id: "pm", text: "A simple or themed multi-page site. More pages take a little longer." })
  }
  if (has("site") || has("redesign")) {
    if (r.pages === "11 to 99") out.push({ id: "t1", text: "Sites over 10 pages are discounted.", tier: true })
    if (r.pages === "100 or more") out.push({ id: "t2", text: "Sites of hundreds of pages get a larger discount.", tier: true })
  }
  if (has("redesign")) out.push({ id: "rd", text: "Small changes are billed by the hour, or BVG takes the site over, redesigns it and keeps it up to date." })
  if (has("found")) out.push({ id: "fd", text: "A free first consultation: a brief overview of the key phrases you rank for today." })
  if (has("hosting")) out.push({ id: "ho", text: "Your domain registered and hosted, with a control panel simple enough to use yourself." })
  if (has("ads")) out.push({ id: "ad", text: "The advertising department: printed materials, ad layout and video advertising." })
  const isl: Record<string, string> = {
    "Grand Bahama": "Handled from the Freeport headquarters.",
    "New Providence": "BVG has an office in Nassau.",
    "Abaco": "BVG has an office in Abaco.",
    "Another Bahamian island": "Run from Freeport, by phone and email.",
    "Outside the Bahamas": `Call the US line, ${US_PHONE}.`,
  }
  if (out.length) out.push({ id: "is", text: isl[r.island] })
  return out
}

export function mail(r: Req) {
  const needs = NEEDS.filter(n => r.needs.includes(n.id)).map(n => n.label)
  const lines = [
    "Hello BVG Design,", "",
    `Business: ${r.name.trim() || "(name)"}, ${r.biz.toLowerCase()}`,
    `Island: ${r.island}`,
    `What I need: ${needs.length ? needs.join(", ") : "advice on what I need"}`,
    ...(r.needs.includes("site") || r.needs.includes("redesign") ? [`Size: ${r.pages}${r.pages === "1 page" ? "" : " pages"}`] : []),
    "", "Please call or email me back.",
  ]
  const subject = `Website request: ${r.name.trim() || r.biz}`
  const body = lines.join("\n")
  return { subject, body, href: `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }
}
