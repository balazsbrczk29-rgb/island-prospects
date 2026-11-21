// Every fact here is from nassauglass.com (home, /about/, /glass/, /shower-enclosures/, /architectural-metals/,
// /service/, /contact/), read on 2026-11-20.
export const NAME = "Nassau Glass"
export const PHONE = "(242) 603-5521"
export const TEL = "tel:+12426035521"
export const PHONE2 = "(242) 393-8165"
export const TEL2 = "tel:+12423938165"
export const PHONE_INTL = "(313) 556-1322"
export const TEL_INTL = "tel:+13135561322"
export const FAX = "(242) 603-5531"
export const ADDRESS = "#46 Mackey Street, Nassau"
export const IMG = "https://www.nassauglass.com/wp-content/uploads/"

export type Kind = "glass" | "mirror" | "laminated"
export type Tint = { id: string; name: string; face: string; edge: string; alpha: number }

// face = the colour seen through the sheet, edge = the colour of the cut edge, alpha = how much it holds back.
const clear: Tint = { id: "clear", name: "Clear", face: "#bfe9dc", edge: "#58b89d", alpha: 0.07 }
const gray: Tint = { id: "gray", name: "Gray", face: "#34393d", edge: "#6d787d", alpha: 0.62 }
const bronze: Tint = { id: "bronze", name: "Bronze", face: "#7d4a1c", edge: "#a1723f", alpha: 0.7 }
const green: Tint = { id: "green", name: "Green", face: "#1d7a52", edge: "#3fae84", alpha: 0.5 }

export const STOCK: Record<Kind, { label: string; thick: string[]; thickNote?: string; tints: Tint[] }> = {
  glass: { label: "Glass", thick: ["1/16", "1/8", "1/4", "3/8", "1/2", "3/4"], tints: [clear, gray, bronze] },
  mirror: {
    label: "Mirror", thick: ["1/8", "1/4"],
    tints: [
      { id: "clear", name: "Clear", face: "#eef3f2", edge: "#58b89d", alpha: 1 },
      { id: "bronze", name: "Bronze", face: "#c79a6c", edge: "#a1723f", alpha: 1 },
      { id: "gray", name: "Gray", face: "#878f95", edge: "#6d787d", alpha: 1 },
      { id: "flesh", name: "Flesh tone", face: "#eac3a8", edge: "#c99878", alpha: 1 },
      { id: "blue", name: "Blue", face: "#86aeda", edge: "#5f8fc4", alpha: 1 },
    ],
  },
  laminated: { label: "Laminated", thick: [], thickNote: "A large selection of thicknesses", tints: [clear, bronze, gray, green] },
}

export const inches = (f: string) => { const [a, b] = f.split("/").map(Number); return b ? a / b : a }

export type Pick = { kind: Kind; thick: string; tint: string }
export const describe = (p: Pick) => {
  const s = STOCK[p.kind]; const t = s.tints.find(x => x.id === p.tint) ?? s.tints[0]
  const th = p.kind === "laminated" ? "" : `${p.thick} in `
  return `${th}${t.name.toLowerCase()} ${p.kind === "laminated" ? "laminated safety glass" : p.kind}`
}

export const RACK = [
  { name: "Glass", thick: "1/16 to 3/4 in", tints: ["Clear", "Gray", "Bronze"], use: "Cut to any shape or size, for any tabletop", kind: "glass" },
  { name: "Mirror", thick: "1/8 and 1/4 in", tints: ["Clear", "Bronze", "Gray", "Flesh tone", "Blue"], use: "For all your mirror requirements", kind: "mirror" },
  { name: "Laminated safety glass", thick: "A large selection", tints: ["Clear", "Bronze", "Gray", "Green"], use: "A hurricane impact window or a replacement boat windshield", kind: "laminated" },
  { name: "Pattern glass", thick: "A large selection", tints: ["A variety of colours"], use: "Ask to see the patterns at the counter", kind: "" },
  { name: "Acrylic Plexiglas", thick: "1/8 to 1/2 in", tints: ["Clear", "Bronze", "Gray", "Solid colours"], use: "A full range of acrylic sheet", kind: "" },
  { name: "Polycarbonate", thick: "A full range", tints: [], use: "For your security needs", kind: "" },
]
export const SWATCH: Record<string, string> = { Clear: "#cfeee4", Gray: "#6d787d", Bronze: "#a1723f", Green: "#3fae84", "Flesh tone": "#eac3a8", Blue: "#86aeda" }

export const SHOWERS = [1, 2, 3, 4, 5, 6].map(n => ({ src: `${IMG}2021/04/ng-shower-0${n}.jpg`, n }))
export const SHOWER_ALT = [
  "Frameless fixed glass panel beside a walk-in shower with a brass rail",
  "Corner glass enclosure with a hinged door, fitted to a marble bathroom",
  "Frameless hinged shower door between marble tiled walls",
  "Glass shower door and fixed panel in front of a mosaic tile wall",
  "Sliding glass doors over a bathtub",
  "Semi-frameless sliding doors on a tiled shower",
]

export const YEARS = [
  { y: "1959", t: "Glass", d: "Founded as the Bahamas' first fabricating glass company, at #46 Mackey Street. It has never moved." },
  { y: "1966", t: "Custom picture framing", d: "The country's first custom picture framing department." },
  { y: "1982", t: "The Lighting Center", d: "Today the country's largest selection of light bulbs and ceiling fans." },
  { y: "1994", t: "Architectural Metals", d: "Storefronts and curtain walls, for homes and for commercial buildings." },
  { y: "2002", t: "Art Gallery and Home Decorating Center", d: "A 7,000 square foot showroom on the northern side of the original building." },
]

export const DEPTS = [
  { id: "glass", group: "made", name: "Custom Glass and Mirrors", since: "1959", d: "Residential and commercial glass. Factory-trained staff cut any shape or size for tabletops, from 1/16 to 3/4 of an inch thick, and stock mirror in five colours, laminated safety glass, pattern glass, acrylic Plexiglas and polycarbonate.", act: "quote" },
  { id: "showers", group: "made", name: "Shower Enclosures", since: "", d: "Manufactured by Nassau Glass: frameless and semi-frameless systems, with swing door and sliding door options, in a choice of models, finishes and glass.", act: "quote" },
  { id: "metals", group: "made", name: "Architectural Metals", since: "1994", d: "From a single storefront entrance to a six-story curtain wall, residential and commercial. The division can help design a system or write a scope of work. No job is considered too small or too large.", act: "quote" },
  { id: "service", group: "made", name: "Service Department", since: "", d: "Installation, repairs and service for glass, windows and doors, for commercial and residential clients. Glazing, replacements and installations, from office buildings to the smallest custom cutting request.", act: "quote" },
  { id: "framing", group: "showroom", name: "Custom Framing", since: "1966", d: "The country's first custom picture framing department, opened in 1966.", act: "call" },
  { id: "bulbs", group: "showroom", name: "Lightbulb Center", since: "1982", d: "The largest selection of lightbulbs on the island, part of the Lighting Center added in 1982.", act: "call" },
  { id: "fans", group: "showroom", name: "Hunter Ceiling Fans", since: "", d: "Authorized Hunter dealer, with a large selection of ceiling fans in various finishes for indoors and outdoors.", act: "call" },
  { id: "gallery", group: "showroom", name: "Art Gallery", since: "2002", d: "A 7,000 square foot showroom specializing in Bahamian artifacts, with a selection of foreign artwork as well.", act: "call" },
  { id: "decor", group: "showroom", name: "Home Decor, Lamps and Shades", since: "2002", d: "The Home Decorating Center, with lamps and replacement shades.", act: "call" },
]

export const JOBS = ["Mirror", "Tabletop", "Shower enclosure", "Window or door glass", "Storefront", "Boat windshield", "Something else"]
