// Every fact here comes from romorabay.com (home, /marina, /stay, /dining, /getting-here), read 2026-11-05 and 2026-11-22.
export const NAME = "Romora Bay Resort & Marina"
export const PHONE = "833.717.6499"
export const TEL = "tel:+18337176499"
export const MARINA_PHONE = "242.470.1520"
export const MARINA_TEL = "tel:+12424701520"
export const MARINA_EMAIL = "marina@romorabay.com"
export const BOOK = "https://s006209.officialbookings.com/"
export const SLIP = "https://www.romorabay.com/marina/reservations"
export const MAP_PDF = "https://www.romorabay.com/Marina_Map.pdf"
export const MAPS = "https://www.google.com/maps/search/?api=1&query=Romora+Bay+Resort+%26+Marina+Harbour+Island+Bahamas"
export const LOGO = "https://www.romorabay.com/assets/romora-logo-s-wcG07O.svg"
const A = "https://www.romorabay.com/assets/"
export const IMG = {
  drone: A + "hero-drone-CEdSqdKD.jpg",
  marinaAerial: A + "marina-aerial-BLMR27zt.jpg",
  dock: A + "marina-dock-sailboat-DrtEkZ-S.jpg",
  sipsip: A + "sipsip-deck-dining-DYk9esoQ.jpg",
  upstairs: A + "upstairs-patio-3-DUfXOeak.jpg",
  kayak: A + "kayaking-Dza3TEe0.webp",
  pickle: A + "pickleball-action-CJFBzUTN.jpg",
  harbourView: A + "harbour-view-B_LGTIjS.png",
}

export const MAX_LOA = 190
export const POWER = ["30 amp", "50 amp", "110V single phase", "220V 3 phase", "408V 3 phase"]

export type Room = { key: string; name: string; short: string; text: string; feats: string[]; imgs: string[] }
export const ROOMS: Room[] = [
  { key: "king", name: "King with Waterfront View", short: "Waterfront King", text: "A private balcony over the water, premium king bedding, a spacious living area and a bathroom with a walk-in shower.",
    feats: ["Private balcony", "Water views", "King bed", "Walk-in shower"], imgs: ["room1-1-DlzYwzon.jpg", "room1-3-ClMT7fz1.jpg", "room1-5-GeiL2ZYS.jpg", "room1-6-BCGiD4IM.jpg"].map(s => A + s) },
  { key: "suite", name: "The Suites", short: "Suite", text: "Vaulted wood-panelled ceilings, a cosy seating area, a king bed with a daybed and an elegant bathroom, over the garden.",
    feats: ["Vaulted ceilings", "Seating area", "King and daybed", "Garden views"], imgs: ["room2-1-CCtU0pS5.jpg", "room2-2-DhbF-0zK.jpg", "room2-5-D-rf6F4-.jpg", "room2-6-P_BGlF2m.jpg"].map(s => A + s) },
  { key: "house", name: "The House", short: "The House", text: "A standalone villa with a fully equipped gourmet kitchen, spacious living areas, several bedrooms and private terraces over the water and garden.",
    feats: ["Full kitchen", "Several bedrooms", "Private terraces", "Water and garden views"], imgs: ["room3-6-DTuJzSJC.jpg", "room3-2-BRuHyVq7.jpg", "room3-3-BJJNvOdQ.jpg", "room3-9-BN6CIl9k.jpg"].map(s => A + s) },
]

export const SPECS: [string, string][] = [
  ["Slips", "40+"],
  ["Largest vessel", "190 ft"],
  ["Customs and immigration", "On site, official port of entry"],
  ["Shore power", "30 and 50 amp, 110V single phase, 220V 3 phase, 408V 3 phase (as published)"],
  ["Backup power", "550kW generator"],
  ["Fresh water", "Reverse osmosis, up to 17,000 gallons a day"],
  ["Pumpout", "On site"],
  ["Yacht assistance", "24/7, local and international providers"],
  ["Provisioning", "Provisioning, concierge and yacht agency"],
  ["Security", "Video surveillance and on-site guards"],
  ["Guest facilities", "Showers, air-conditioned facilities, laundry and the resort's amenities"],
  ["Draft, beam, approach", "Not published: ask the Dockmaster"],
]

/** Seasonal closure, 17 Aug to 12 Nov inclusive (romorabay.com/stay). */
export function inClosure(start: Date, nights: number) {
  for (let i = 0; i < nights; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    const m = d.getMonth(), day = d.getDate()
    if ((m === 7 && day >= 17) || m === 8 || m === 9 || (m === 10 && day <= 12)) return true
  }
  return false
}
export const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
