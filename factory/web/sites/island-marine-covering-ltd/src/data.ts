// Sourced from coverupbahamas.com (home, /about-us, /our-latest-projects, /contact-us), read 2026-11-21.
export const PHONE = "(242) 359-0179"
export const TEL = "tel:+12423590179"
export const WA = "12423590179"
export const EMAIL = "rickynix@gmail.com"
export const MAP = "https://goo.gl/maps/8BCo8fDaw1Nbf9Vy9"
export const waLink = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`

const U = "https://coverupbahamas.com/wp-content/uploads/"
export const P = {
  awning: { src: U + "2011/05/Old-Fortbay-11.jpg", w: 1280, h: 960, alt: "A teal awning with a white scalloped valance and teal curtains over the terrace of a two-storey house" },
  workshop: { src: U + "2022/11/PHOTO-2022-11-01-14-05-00-3-1024x768.jpg", w: 1024, h: 768, alt: "The Cover Up workshop door under its own white awning, the company truck parked outside" },
  sewing: { src: U + "2022/11/PHOTO-2022-11-02-19-30-53-1-768x1024.jpg", w: 768, h: 1024, alt: "A sewer at an industrial machine feeding white vinyl through by hand" },
  cutting: { src: U + "2022/11/PHOTO-2022-11-02-19-49-21-1.jpg", w: 768, h: 1024, alt: "Patterns laid out and cut on the long white workshop table" },
  cushions: { src: U + "2022/11/PHOTO-2022-11-02-19-30-49-1-1024x768.jpg", w: 1024, h: 768, alt: "New boat cushions in white and sand vinyl laid out on the workshop floor" },
  seat: { src: U + "2022/11/PHOTO-2022-11-02-19-30-50-3-768x1024.jpg", w: 768, h: 1024, alt: "A white upholstered helm seat with pleated back on a boat" },
  enclosure: { src: U + "2011/05/Covers.jpg", w: 1632, h: 916, alt: "A boat's upper deck closed in with a clear window enclosure, the dock alongside" },
  cover: { src: U + "2011/05/Small-Boat-Cover.jpg", w: 1278, h: 720, alt: "A centre-console boat on its trailer under a fitted navy cover" },
  ferryEnc: { src: U + "2011/05/Ferry-Enclosures.jpg", w: 1632, h: 916, alt: "A ferry deck closed in with clear roll-down curtains under a canvas top, navy cushions along the sides" },
  ferry: { src: U + "2011/05/Ferry-Seats.jpg", w: 1632, h: 916, alt: "Rows of navy upholstered bench seats on a ferry deck" },
}
export type Photo = typeof P.awning

export type Item = { id: string; dept: "house" | "boat"; name: string; line: string; facts: string[]; photo?: Photo }
export const ITEMS: Item[] = [
  { id: "awnings", dept: "house", name: "Awnings", photo: P.awning,
    line: "Tailor made for the house, the shop front or the terrace, fixed or retractable.",
    facts: ["Frames in schedule 40 aluminium, MIG welded, sanded and painted with three coats", "Measured on site and made in the Bahamas"] },
  { id: "curtains", dept: "house", name: "Weather curtains", photo: P.ferryEnc,
    line: "Close in a porch or a restaurant terrace against wind and rain without losing the view.",
    facts: ["Outdoor vinyl with 30 gauge clear", "Hand-rolled or crank-up", "As here on a ferry deck, or on your porch"] },
  { id: "shutters", dept: "house", name: "Hurricane shutters",
    line: "Roll-away shutters made for the house before the season starts.",
    facts: ["Roll-away, made to the opening", "Ask for a measure before hurricane season"] },
  { id: "shades", dept: "house", name: "Sun shades",
    line: "Many kinds of sun shade to keep you out of the sun, at home or on deck.",
    facts: ["Made to order"] },
  { id: "tops", dept: "boat", name: "Bimini tops, T-tops and enclosures", photo: P.enclosure,
    line: "From a Bimini top on a 10 ft inflatable to a clear enclosure on a yacht.",
    facts: ["Marine grade canvas and vinyl", "Hundreds of colours to choose from", "Thread that lasts 8 years"] },
  { id: "upholstery", dept: "boat", name: "Marine upholstery", photo: P.cushions,
    line: "Cushions, helm seats and deck seating, cut and sewn at the workshop.",
    facts: ["Marine grade vinyl", "Plain, quilted or diamond pleat", "Come to the workshop to see the colours"] },
  { id: "covers", dept: "boat", name: "Boat covers", photo: P.cover,
    line: "Fitted covers for the boat on its trailer or at the dock.",
    facts: ["Made to the hull"] },
  { id: "seating", dept: "boat", name: "Ferry and deck seating", photo: P.ferry,
    line: "Upholstered bench seating for working boats and ferries.",
    facts: ["Marine grade vinyl"] },
  { id: "rails", dept: "boat", name: "Bow rails",
    line: "Custom bow rails, made in the Bahamas for your boat.",
    facts: ["1 in stainless steel"] },
]

export const NEEDS = ITEMS.map(i => i.name)
export const WHERE = ["My house", "My business", "My boat"]
