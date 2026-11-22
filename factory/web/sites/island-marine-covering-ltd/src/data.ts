// Sourced from coverupbahamas.com (home, /about-us, /our-latest-projects, /contact-us), read 2026-11-21.
export const PHONE = "(242) 359-0179"
export const TEL = "tel:+12423590179"
export const WA = "12423590179"
export const EMAIL = "rickynix@gmail.com"
export const MAP = "https://goo.gl/maps/8BCo8fDaw1Nbf9Vy9"
export const ADDRESS = "Raphia Close, Suite 13/14, Airport Industrial Park"
export const waLink = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`

const U = "https://coverupbahamas.com/wp-content/uploads/"
export type Photo = { src: string; w: number; h: number; alt: string; cap?: string }
export const P = {
  awning: { src: U + "2011/05/Old-Fortbay-11.jpg", w: 1280, h: 960, alt: "A teal awning with a white scalloped valance and teal curtains over the terrace of a two-storey house", cap: "Awning and curtains, Old Fort Bay" },
  workshop: { src: U + "2022/11/PHOTO-2022-11-01-14-05-00-3-1024x768.jpg", w: 1024, h: 768, alt: "The Cover Up workshop door under its own white awning, the company truck parked outside" },
  sewing: { src: U + "2022/11/PHOTO-2022-11-02-19-30-53-1-768x1024.jpg", w: 768, h: 1024, alt: "A sewer at an industrial machine feeding white vinyl through by hand" },
  cutting: { src: U + "2022/11/PHOTO-2022-11-02-19-49-21-1.jpg", w: 768, h: 1024, alt: "Patterns laid out and cut on the long white workshop table" },
  cushions: { src: U + "2022/11/PHOTO-2022-11-02-19-30-49-1-1024x768.jpg", w: 1024, h: 768, alt: "New boat cushions in white and sand vinyl laid out on the workshop floor", cap: "New cushions, finished at the workshop" },
  seat: { src: U + "2022/11/PHOTO-2022-11-02-19-30-50-3-768x1024.jpg", w: 768, h: 1024, alt: "A white upholstered helm seat with a pleated back on a boat", cap: "A pleated helm seat" },
  enclosure: { src: U + "2011/05/Covers.jpg", w: 1632, h: 916, alt: "A boat's upper deck closed in with a clear window enclosure, the dock alongside", cap: "Clear enclosure on an upper deck" },
  cover: { src: U + "2011/05/Small-Boat-Cover.jpg", w: 1278, h: 720, alt: "A centre-console boat on its trailer under a fitted navy cover", cap: "Fitted cover, centre console" },
  ferryEnc: { src: U + "2011/05/Ferry-Enclosures.jpg", w: 1632, h: 916, alt: "A ferry deck closed in with clear roll-down curtains under a canvas top, navy cushions along the sides", cap: "Roll-down weather curtains, shown on a ferry deck" },
  ferry: { src: U + "2011/05/Ferry-Seats.jpg", w: 1632, h: 916, alt: "Rows of navy upholstered bench seats on a ferry deck", cap: "Ferry bench seating" },
} satisfies Record<string, Photo>

export type Side = "house" | "boat"
export type SizeKind = "opening" | "boat" | "pieces"
export type Job = { id: string; side: Side; name: string; noun: string; line: string; facts: string[]; size: SizeKind; photo?: Photo; extra?: Photo; storm?: boolean }

export const JOBS: Job[] = [
  { id: "awnings", side: "house", name: "Awnings", noun: "an awning", size: "opening", photo: P.awning,
    line: "Fixed or retractable, for the terrace, the verandah or the shop front.",
    facts: ["Frames in schedule 40 aluminium, MIG welded", "Sanded and painted with three coats", "Measured on site, made in the Bahamas"] },
  { id: "curtains", side: "house", name: "Weather curtains", noun: "weather curtains", size: "opening", photo: P.ferryEnc,
    line: "Close in a porch or a restaurant terrace against wind and rain and keep the view.",
    facts: ["Outdoor vinyl with 30 gauge clear", "Rolled up by hand or with a crank", "For porches, terraces and decks"] },
  { id: "shutters", side: "house", name: "Hurricane shutters", noun: "hurricane shutters", size: "opening", storm: true,
    line: "Shutters made to each opening of the house.",
    facts: ["Made to each opening", "Ask for your measure well before the season"] },
  { id: "shades", side: "house", name: "Sun shades", noun: "a sun shade", size: "opening",
    line: "Sun shades for the house, made to order.",
    facts: ["Made to order", "Measured on site"] },
  { id: "enclosures", side: "boat", name: "Isinglass enclosures", noun: "an isinglass enclosure", size: "boat", photo: P.enclosure,
    line: "Clear enclosures made to the boat, from small boats up to mega yachts.",
    facts: ["Marine grade canvas and clear vinyl", "Hundreds of colours", "Thread that lasts 8 years"] },
  { id: "bimini", side: "boat", name: "Bimini and T-tops", noun: "a Bimini top", size: "boat",
    line: "Bimini tops, T-tops and overlay tops, even on a 10 ft inflatable.",
    facts: ["Marine grade canvas and vinyl", "Hundreds of colours", "Thread that lasts 8 years"] },
  { id: "upholstery", side: "boat", name: "Boat upholstery", noun: "boat upholstery", size: "pieces", photo: P.cushions, extra: P.seat,
    line: "Cushions, helm seats and deck seating, cut and sewn at the workshop.",
    facts: ["Marine grade vinyl", "Plain, quilted or diamond pleat", "See the colours at the workshop before you choose"] },
  { id: "covers", side: "boat", name: "Boat covers", noun: "a boat cover", size: "boat", photo: P.cover,
    line: "Fitted covers for the boat on its trailer or at the dock.",
    facts: ["Made to the boat", "Measured where it sits"] },
  { id: "ferry", side: "boat", name: "Ferry seating", noun: "ferry seating", size: "pieces", photo: P.ferry,
    line: "Upholstered bench seating for ferries and working boats.",
    facts: ["Marine grade vinyl", "Plain, quilted or diamond pleat"] },
  { id: "rails", side: "boat", name: "Bow rails", noun: "bow rails", size: "boat",
    line: "Custom bow rails, made in the Bahamas for your boat.",
    facts: ["1 in stainless steel", "Custom made"] },
]

export const SIZES: Record<SizeKind, { label: string; opts: string[] }> = {
  opening: { label: "Rough size", opts: ["Under 10 ft", "10 to 20 ft", "Over 20 ft", "Not sure"] },
  boat: { label: "Boat length", opts: ["Under 25 ft", "25 to 40 ft", "Over 40 ft", "Not sure"] },
  pieces: { label: "How many pieces", opts: ["1 or 2", "3 to 6", "More", "Not sure"] },
}
export const WHEN = ["As soon as I can", "This month", "No rush"]
export const WHEN_STORM = "Before storm season"
export const DEFAULT_JOB: Record<Side, string> = { house: "awnings", boat: "enclosures" }

const lc = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)
export const message = (j: Job, size: string, where: string, when: string) =>
  `Hello Cover Up, I'd like a measure for ${j.noun} for my ${j.side}. ${SIZES[j.size].label}: ${lc(size)}. Where: ${where.trim() || "I'll tell you"}. Timing: ${lc(when)}. I can send photos.`
