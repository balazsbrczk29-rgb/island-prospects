const U = 'https://www.stellamarisresort.com/wp-content/uploads/2021/'
export type Pic = { src: string; w: number; h: number; alt: string }
const p = (src: string, w: number, h: number, alt: string): Pic => ({ src: U + src, w, h, alt })

export const IMG = {
  hero: p('11/7.jpg', 1920, 1280, 'The Atlantic shore below Stella Maris Resort Club, Long Island'),
  resort: p('11/3-1.jpg', 1920, 1280, 'Stella Maris Resort Club in its palm gardens'),
  g1: p('11/Resize1-1170x780.jpg', 1170, 780, 'The coast near Stella Maris, Long Island'),
  g2: p('11/Resize2-1170x780.jpg', 1170, 780, 'The water off Stella Maris, Long Island'),
}

export const EMAIL = 'Reservations@stellamarisresort.com'
export const AIR = 'Stellamarisresortairservice@gmail.com'
export const PHONES = [['242-338-2050', 'tel:+12423382050'], ['242-338-2051', 'tel:+12423382051'], ['242-338-2027', 'tel:+12423382027']] as const
export const FB = 'https://www.facebook.com/StellaMarisResort'

export type Cat = 'room' | 'cottage1' | 'two' | 'house' | 'housepool'
// published nightly rates [summer 2026, winter 2026-27] by number of adults (index 1..max)
export const RATES: Record<Cat, { max: number; s: number[]; w: number[]; energy: number }> = {
  room: { max: 3, s: [0, 190, 230, 270], w: [0, 210, 250, 290], energy: 4 },
  cottage1: { max: 3, s: [0, 240, 280, 320], w: [0, 260, 290, 330], energy: 7 },
  two: { max: 4, s: [0, 360, 360, 400, 440], w: [0, 420, 420, 460, 500], energy: 7 },
  house: { max: 6, s: [0, 660, 660, 660, 660, 660, 660], w: [0, 700, 700, 700, 700, 700, 700], energy: 7 },
  housepool: { max: 6, s: [0, 770, 770, 770, 770, 770, 770], w: [0, 800, 800, 800, 800, 800, 800], energy: 7 },
}

export type Unit = { id: string; name: string; kind: string; bedrooms: number; cat: Cat; desc: string; pool?: boolean; beach?: boolean; kitchen?: boolean; atlantic?: boolean; a: Pic; b: Pic }
const u = (id: string, name: string, kind: string, bedrooms: number, cat: Cat, desc: string, a: string, b: string, o: Partial<Unit> = {}): Unit =>
  ({ id, name, kind, bedrooms, cat, desc, a: p(a, 1024, 683, `${name} at Stella Maris Resort Club`), b: p(b, 1024, 683, `${name}, a second view`), ...o })

export const UNITS: Unit[] = [
  u('room', 'Ocean view room', 'Hotel room', 1, 'room', 'Atlantic ocean view, with a king or two double beds.', '10/5-9-1024x683.jpg', '10/room-1024x683.jpg', { atlantic: true }),
  u('cottage', 'One-bedroom cottage', 'Cottage', 1, 'cottage1', 'A king bed and a small living room, facing a small fresh water pool, with a partial ocean view.', '10/1-11-1024x683.jpg', '10/7-10-1024x684.jpg', { pool: true }),
  u('apartment', 'One-bedroom apartment', 'Apartment', 1, 'room', 'Two double beds, a pull-out couch and a kitchenette.', '11/Apt2.jpg', '11/Apt5.jpg', { kitchen: true }),
  u('sand-dollar', 'Sand Dollar Cottage', 'Two bedrooms', 2, 'two', 'A screened-in porch overlooking the Atlantic.', '10/1-12-1024x683.jpg', '10/3-9-1024x683.jpg', { atlantic: true }),
  u('sea-la-vie', 'Sea La Vie Cottage', 'Two bedrooms', 2, 'two', 'Views of the Atlantic.', '10/8-10.jpg', '10/4-11.jpg', { atlantic: true }),
  u('gecko', 'Gecko House', 'Three bedrooms', 3, 'house', 'Right on the beach.', '10/13-7-1024x683.jpg', '10/4b-3-1024x683.jpg', { beach: true, atlantic: true }),
  u('carolyns', "Carolyn's Favourite", 'Three bedrooms', 3, 'house', 'Panoramic Atlantic Ocean views and a large open kitchen.', '10/14-6.jpg', '10/8-11-1024x683.jpg', { atlantic: true, kitchen: true }),
  u('rainbow', 'Rainbow Villa', 'Three bedrooms', 3, 'housepool', 'An infinity salt water pool, right on the Atlantic.', '10/1-14-1024x683.jpg', '10/12-10-1024x683.jpg', { pool: true, atlantic: true }),
  u('flamingo', 'Flamingo House', 'Four bedrooms', 4, 'house', 'A porch overlooking the Atlantic Ocean.', '10/3-10-1024x684.jpg', '10/1-15-1024x683.jpg', { atlantic: true }),
  u('dolphin', 'Dolphin House', 'Four bedrooms', 4, 'housepool', 'A fresh water pool among coconut palms.', '10/1-16-1024x683.jpg', '10/4-12-1024x683.jpg', { pool: true }),
]

export const WINTER_START = '2026-12-19', WINTER_END = '2027-04-18'

export const ACTIVITIES = ['Scuba diving', "Dean's Blue Hole", 'Bonefishing', 'Big game fishing', 'Snorkelling', 'Kayak and paddle board', 'Sailing', 'Biking', 'Caves and bird life', 'Excursions to nearby islands', 'Rum Punch Party']
export const INCLUDED = ['Three pools, and beach towels', 'Weekday morning beach trips to Cape Santa Maria Beach or Columbus Harbour', 'Bicycles', 'Wi-Fi around the clubhouse']
export const DIVES = ['Shark Reef', 'The Wreck', 'Conception Wall', "Dean's Blue Hole"]

export const money = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const money0 = (v: number) => '$' + Math.round(v).toLocaleString('en-US')
