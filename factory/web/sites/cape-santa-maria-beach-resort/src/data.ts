export const M = 'https://symphony.cdn.tambourine.com/_fusion/cape-santa-maria-resort/media/'
export const BOOK = 'https://www.bookonthenet.net/west/premium/eresmain.aspx?&id=tUUp8oO%2bGEBnwXEl4XQtEH67d%2f2EHxOV8ZmT3V4U8tI%3d'
export const contact = {
  email: 'resort@capesantamaria.com',
  tollfree: { label: '+1 800-926-9704', tel: '+18009269704' },
  local: { label: '+1 242-338-5273', tel: '+12423385273' },
  address: "PO Box L.I. 30-117, Seymour's, Long Island, Bahamas",
  socials: [
    ['Facebook', 'https://www.facebook.com/capesantamaria'],
    ['Instagram', 'https://www.instagram.com/capesantamaria/'],
    ['YouTube', 'https://www.youtube.com/user/CapeSantaMaria1'],
  ] as const,
}

export const P = {
  aerial: { src: 'capesantamariaresort-homepage-gallery-4-6682c3d969dbe.jpg', w: 1920, h: 1080, alt: 'Aerial view of the white bungalows lining Cape Santa Maria beach, turquoise water beside them' },
  beach: { src: 'capesantamariaresort-whatguestslovemost-awardwinningbeach-6675955b77bd6.jpg', w: 1413, h: 942, alt: 'The long white curve of Cape Santa Maria beach with the bungalows behind the palms' },
  bar: { src: 'capesantamariaresort-homepage-gallery-1-6675a03c664d7.jpg', w: 1920, h: 1280, alt: 'The Beach House bar, a blue and white tiled floor and windows to the sea' },
  salad: { src: 'capesantamariaresort-homepage-gallery-2-6675a03e155ad.jpg', w: 1920, h: 1280, alt: 'A salad with avocado and tomato on a white plate' },
  paddle: { src: 'capesantamariaresort-homepage-gallery-3-6675a03f6b304.jpg', w: 1920, h: 1280, alt: 'A guest paddleboarding with a dog in the shallow turquoise water off the beach' },
  fishing: { src: 'capesantamariabeachresortbahamas-homepage-gallery-02-669182d99e69c.jpg', w: 1920, h: 1280, alt: 'Two anglers casting from the bow of a boat on the flats' },
  villa: { src: 'capesantamariabeachresortbahamas-homepage-gallery-03-669182dac3ca5.jpg', w: 1920, h: 1280, alt: 'A Beachfront Villa living room with the sea through the windows' },
  bungalow: { src: 'capesantamariabeachresortbahamas-homepage-gallery-04-669182dc0bc3b.jpg', w: 1920, h: 1280, alt: 'A Beachfront Bungalow bedroom in pale blue with white beds' },
  scuba: { src: 'capesantamariaresort-activities-scubadiving-05-66e896659e06e.jpg', w: 1062, h: 708, alt: 'A diver among orange reef fish and coral' },
  coast: { src: 'capesantamariaresort-whatguestslovemost-nonstopflightsfromfortlauderdale-667595ee6a6b3.jpg', w: 1413, h: 942, alt: 'The rocky green coast of Long Island above deep blue water' },
}
export type PK = keyof typeof P

export type Room = { k: string; name: string; short: string; size: string; bedrooms: string; beds: string; kitchen: string; outside: string; extra: string; pic: PK; cap: string }
export const rooms: Room[] = [
  { k: 'bungalow', name: 'Beachfront Bungalow', short: 'Bungalow', size: '400 sq ft', bedrooms: 'One', beds: '1 king', kitchen: 'Small fridge', outside: 'Private veranda for the sunsets', extra: 'Italian tile, ceiling fans, safe.', pic: 'bungalow', cap: 'A Beachfront Bungalow bedroom.' },
  { k: 'two', name: 'Two-Bedroom Beachfront Bungalow', short: 'Two-bedroom bungalow', size: '580 sq ft', bedrooms: 'Two', beds: '1 king or 2 queens, plus 2 twins', kitchen: 'Fridge', outside: 'Furnished veranda', extra: 'Room for a family on the sand.', pic: 'bungalow', cap: 'A Beachfront Bungalow bedroom.' },
  { k: 'villa', name: 'Beachfront Villa', short: 'Villa', size: '1,800 sq ft', bedrooms: 'Two', beds: '1 king and 2 queens', kitchen: 'Full kitchen, washer and dryer', outside: 'West-facing windows', extra: 'Jetted tubs, smart TV, sleeper sofa in select units.', pic: 'villa', cap: 'A Beachfront Villa living room.' },
]
export const allRooms = 'Every room: air conditioning, coffee and tea, safe, fridge and daily housekeeping. Rates and dates on the booking page.'

/* Chart points come from tools/bake-map.mjs (real coordinates, Mercator, 1000 x 760). */
export type Leg = { from: string; to: string; kind: 'air' | 'taxi' | 'open' }
export type Route = { k: string; label: string; mode: string; from: string; line: string; legs: Leg[]; codes: string[]; plan: string }
export const ROUTES: Route[] = [
  { k: 'fll', label: 'Fort Lauderdale', mode: 'Makers Air, nonstop', from: 'fxe', codes: ['fxe', 'sml'],
    line: 'Makers Air flies nonstop from Fort Lauderdale Executive (FXE) to Stella Maris (SML) on Sundays, Tuesdays and Thursdays. The resort arranges your taxi from the airport.',
    legs: [{ from: 'fxe', to: 'sml', kind: 'air' }, { from: 'sml', to: 'cape', kind: 'taxi' }], plan: 'Makers Air from Fort Lauderdale to Stella Maris' },
  { k: 'nas', label: 'Nassau', mode: 'Bahamasair or Stella Maris Air', from: 'nas', codes: ['nas', 'sml'],
    line: 'Connect in Nassau to Bahamasair or Stella Maris Air Service, (242) 338-2050, for the flight to Stella Maris. The resort arranges your taxi.',
    legs: [{ from: 'nas', to: 'sml', kind: 'air' }, { from: 'sml', to: 'cape', kind: 'taxi' }], plan: 'From Nassau on Bahamasair or Stella Maris Air Service' },
  { k: 'ggt', label: 'George Town, Exuma', mode: 'Island Wings or the ferry', from: 'ggt', codes: ['ggt', 'sml'],
    line: 'Charter Island Wings, (242) 472-8888, for the short hop to Stella Maris, or take the Sheep Runner ferry on Mondays, Wednesdays and Fridays.',
    legs: [{ from: 'ggt', to: 'sml', kind: 'air' }, { from: 'sml', to: 'cape', kind: 'taxi' }], plan: 'From George Town, Exuma, with Island Wings' },
  { k: 'own', label: 'Your own plane', mode: 'Fuel and customs at SML', from: 'own', codes: ['sml'],
    line: 'Land at Stella Maris, which has fuel and customs. Private pilots get 15% off accommodation when they book by phone, blackout dates apply.',
    legs: [{ from: 'own', to: 'sml', kind: 'open' }, { from: 'sml', to: 'cape', kind: 'taxi' }], plan: 'Flying my own plane to Stella Maris' },
  { k: 'sea', label: 'Nassau by seaplane', mode: 'Seaplane Safaris', from: 'nas', codes: ['nas'],
    line: 'Seaplane Safaris flies from Nassau and lands on the water at Cape Santa Maria beach. You step ashore at the resort.',
    legs: [{ from: 'nas', to: 'cape', kind: 'air' }], plan: 'By Seaplane Safaris from Nassau to the beach' },
]

export const TIMETABLE = [
  { from: 'Fort Lauderdale Executive (FXE)', carrier: 'Makers Air, nonstop', days: 'Sun, Tue, Thu', lands: 'Stella Maris (SML)', then: 'Taxi arranged by the resort', r: 'fll' },
  { from: 'Nassau (NAS)', carrier: 'Bahamasair', days: 'Scheduled', lands: 'Stella Maris (SML)', then: 'Taxi arranged by the resort', r: 'nas' },
  { from: 'Nassau (NAS)', carrier: 'Stella Maris Air Service, (242) 338-2050', days: 'Per seat or charter', lands: 'Stella Maris (SML)', then: 'Taxi arranged by the resort', r: 'nas' },
  { from: 'George Town, Exuma (GGT)', carrier: 'Island Wings charter, (242) 472-8888', days: 'On request', lands: 'Stella Maris (SML)', then: 'Taxi arranged by the resort', r: 'ggt' },
  { from: 'George Town, Exuma', carrier: 'Sheep Runner ferry', days: 'Mon, Wed, Fri', lands: 'Long Island Harbour Club', then: 'Taxi on Long Island', r: 'ggt' },
  { from: 'Nassau', carrier: 'Seaplane Safaris', days: 'On request', lands: 'Cape Santa Maria beach', then: 'Step ashore', r: 'sea' },
  { from: 'Your own field', carrier: 'Private aircraft', days: 'Any day', lands: 'Stella Maris (SML), fuel and customs', then: '15% off accommodation by phone, blackouts apply', r: 'own' },
]
