export const BOOK = "https://oceanwestbahamas.client.innroad.com/"
export const PHONE = "(242) 698-6744"
export const TEL = "tel:+12426986744"
export const PHONE2 = "(242) 698-6745"
export const TEL2 = "tel:+12426986745"
export const EMAIL = "info@oceanwestbahamas.com"
const B = "https://oceanwestbahamas.com/"

export type Pic = { src: string; w: number; h: number; alt: string }
export const PIC = {
  terrace: { src: B + "images/1a.jpg", w: 1200, h: 535, alt: "The terrace at Ocean West: two armchairs between white columns, the pool and the sea beyond" },
  viewDown: { src: B + "images/1.jpg", w: 1200, h: 535, alt: "Looking down from an upper floor between columns to the pool, orange roofs and the sea" },
  facade: { src: B + "images/2.jpg", w: 1200, h: 535, alt: "The pink colonial facade of Ocean West with white balustrades" },
  sunsetPool: { src: B + "images/4.jpg", w: 1200, h: 535, alt: "The pool terrace at sunset, umbrellas along the balustrade and the sea on the horizon" },
  facadePool: { src: B + "images/abut-pic.jpg", w: 520, h: 516, alt: "Ocean West's columned facade above the pool" },
} satisfies Record<string, Pic>

export type Room = { key: string; name: string; bed: string; floor: 1 | 2 | 3; view: string; balcony: boolean; king: boolean; ocean: boolean; note?: string; pic: Pic }
const room = (file: string, name: string, alt: string): Pic => ({ src: B + "gallery/" + file, w: 800, h: file === "12.jpg" ? 588 : 600, alt: `The ${name} room: ${alt}` })
export const ROOMS: Room[] = [
  { key: "diamond", name: "Diamond", bed: "1 King", floor: 3, view: "Ocean view", balcony: true, king: true, ocean: true, note: "Private balcony", pic: room("ndiam.jpg", "Diamond", "a king bed, tall curtained windows and a ceiling fan") },
  { key: "sapphire", name: "Sapphire", bed: "1 King", floor: 2, view: "Lake and partial ocean", balcony: false, king: true, ocean: true, pic: room("n-sapph.jpg", "Sapphire", "a king bed, marble floor and gilt chairs") },
  { key: "ruby", name: "Ruby", bed: "1 Queen", floor: 3, view: "Lake and partial ocean", balcony: false, king: false, ocean: true, pic: room("nruby.jpg", "Ruby", "a queen bed with red and gold throw") },
  { key: "topaz", name: "Topaz", bed: "2 Single", floor: 2, view: "Ocean and pool", balcony: true, king: false, ocean: true, note: "Balcony", pic: room("13.jpg", "Topaz", "two beds facing a balcony door open to the sea") },
  { key: "emerald", name: "Emerald", bed: "1 Queen", floor: 2, view: "Ocean and pool", balcony: true, king: false, ocean: true, note: "Balcony", pic: room("12.jpg", "Emerald", "a queen bed below an arched window full of turquoise sea") },
  { key: "tanzanite", name: "Tanzanite", bed: "1 King", floor: 1, view: "Garden view", balcony: false, king: true, ocean: false, pic: room("ntanz.jpg", "Tanzanite", "a king bed under a ceiling fan, garden light at the window") },
  { key: "onyx", name: "Onyx", bed: "1 Queen", floor: 1, view: "Ocean and pool", balcony: false, king: false, ocean: true, pic: room("n-onyx.jpg", "Onyx", "a queen bed, dark wood floor and furniture") },
  { key: "ivory", name: "Ivory", bed: "1 Double", floor: 1, view: "Ocean and pool", balcony: false, king: false, ocean: true, pic: room("nivory.jpg", "Ivory", "a double bed and an armchair by the window") },
  { key: "pearl", name: "Pearl", bed: "2 Single", floor: 1, view: "Ocean and pool", balcony: false, king: false, ocean: true, pic: room("npearl.jpg", "Pearl", "two beds side by side with gold runners") },
  { key: "coral", name: "Coral", bed: "1 Double", floor: 1, view: "Ocean and pool", balcony: false, king: false, ocean: true, pic: room("ncoral.jpg", "Coral", "a double bed, armchair and tall lamp") },
]
export const floorName = (f: number) => ["", "First floor", "Second floor", "Third floor"][f]
