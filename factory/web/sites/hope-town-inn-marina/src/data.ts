export const IMG = 'https://ip-assets-hope-town-inn-marina.lovable.app/assets/'
export const RATES = 'https://reservations.verticalbooking.com/premium/index.html?id_albergo=29742&dc=8525&lingua_int=usa&id_stile=22585'
export const DOCKWA = 'https://dockwa.com/explore/destination/d9cl55-hope-town-inn-marina?form=transient'

export const contact = {
  email: 'office@hopetownmarina.com',
  phones: [
    { label: 'US +1 850 588 4855', tel: '+18505884855' },
    { label: 'Bahamas 242 803 4401', tel: '+12428034401' },
  ],
}

export type Stay = { name: string; kind: 'Room' | 'Villa'; guests: number; ft: number; m: number }
export const stays: Stay[] = [
  { name: 'King Bed Hotel Room', kind: 'Room', guests: 2, ft: 350, m: 33 },
  { name: 'King Suite', kind: 'Room', guests: 3, ft: 450, m: 42 },
  { name: 'Double Occupancy Room', kind: 'Room', guests: 4, ft: 270, m: 25 },
  { name: 'Two Bedroom Garden Villa', kind: 'Villa', guests: 4, ft: 900, m: 84 },
  { name: 'Hummingbird Villa', kind: 'Villa', guests: 6, ft: 1210, m: 112 },
  { name: 'Castaway Villa', kind: 'Villa', guests: 6, ft: 1210, m: 112 },
  { name: 'Flamingo Villa', kind: 'Villa', guests: 6, ft: 1210, m: 112 },
  { name: 'Oleander Villa', kind: 'Villa', guests: 8, ft: 1010, m: 94 },
  { name: 'Areca Palm Villa', kind: 'Villa', guests: 8, ft: 1210, m: 112 },
]

export const marina = {
  maxLoa: 125,
  slips: 50,
  mooringMax: 45,
  power: '30, 50 and 100 amp',
  services: ['Surge-free slips with first-class pedestals', 'Reverse-osmosis water', 'Ice', 'Laundry', 'Showers', 'Freezers', 'Wi-Fi', 'Pool and restaurants ashore'],
}

export type Pic = { src: string; alt: string; pos?: string }
export const pics: Record<string, Pic> = {
  harbour: { src: 'a.jpg', alt: 'Aerial view of Hope Town Harbour on Elbow Cay with boats at anchor and the Elbow Reef Lighthouse', pos: '50% 50%' },
  docks: { src: 'a.jpg', alt: 'Hope Town Harbour from the air, boats on moorings and at the docks', pos: '22% 60%' },
  cottage: { src: 'j.jpg', alt: 'A pink cottage villa with white gingerbread trim among tropical flowers', pos: '50% 50%' },
  porch: { src: 'b.jpg', alt: 'A villa porch with a blue outdoor sofa and garden view', pos: '50% 50%' },
  living: { src: 'c.jpg', alt: 'A villa living room with soft blue and white furnishings', pos: '50% 50%' },
  kitchen: { src: 'e.jpg', alt: 'A villa kitchen with white shiplap walls and a round mirror', pos: '35% 50%' },
  bar: { src: 'g.jpg', alt: "The octagonal bar under a white timber roof, with patterned stools", pos: '50% 45%' },
  drinks: { src: 'f.jpg', alt: 'Three cocktails with paper umbrellas on a wooden ledge above a pool', pos: '50% 50%' },
  cay: { src: 'i.jpg', alt: "A wooden dock running out to a small cay over clear turquoise water", pos: '50% 50%' },
}
