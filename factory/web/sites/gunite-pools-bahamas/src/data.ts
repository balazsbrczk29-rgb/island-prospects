const W = 'https://static.wixstatic.com/media/'
const fit = (id: string, w: number, h: number) => `${W}${id}/v1/fit/w_${w},h_${h},q_85/${id}`
const fill = (id: string, w: number, h: number) => `${W}${id}/v1/fill/w_${w},h_${h},al_c,q_85/${id}`

export const PHONE = '(242) 397 1050'
export const TEL = 'tel:+12423971050'
export const ADDRESS = '23 Montrose Avenue, Nassau'
export const MAPS = 'https://www.google.com/maps/search/?api=1&query=Gunite+Pools+of+Nassau+23+Montrose+Avenue+Nassau'
export const STORE = 'http://store.gunitepoolsbahamas.com/'
export const SITE = 'https://www.gunitepoolsbahamas.com'

export const hero = { src: fit('9bfda6_e527856dbc984ae495f3beedf614b251~mv2.jpg', 2880, 2160), w: 2880, h: 2160, alt: 'A finished pool by Gunite Pools of Nassau' }

export const work = [
  { src: fit('9bfda6_f1f2204f4da5433688973d6dc46af464~mv2.jpg', 1240, 1120), w: 1240, h: 1120, alt: 'A pool by Gunite Pools of Nassau' },
  { src: fill('9bfda6_901a45dda1b04d489590b8b7fec19a17~mv2.jpg', 1905, 879), w: 1905, h: 879, alt: 'A pool and terrace built by Gunite Pools of Nassau' },
  { src: fit('9bfda6_c167d0652a034a8b9438af04fceed5d2~mv2.jpg', 1200, 900), w: 1200, h: 900, alt: 'A residential pool by Gunite Pools of Nassau' },
  { src: fill('9bfda6_7c930183e5054c3288f6bd84808f2138~mv2.jpg', 1905, 830), w: 1905, h: 830, alt: 'A pool by Gunite Pools of Nassau in the Bahamas sun' },
  { src: fill('9bfda6_4e1c0cb9f4894a78a8cfeafb7e61221a~mv2.jpg', 858, 1005), w: 858, h: 1005, alt: 'A new pool built by Gunite Pools of Nassau' },
  { src: fill('9bfda6_d8dbe7a374174a66816250b058d67ee4~mv2.jpg', 1200, 574), w: 1200, h: 574, alt: 'A pool project by Gunite Pools of Nassau' },
]

export const servicePhoto = { src: fill('9bfda6_3147dca4edd749e88b24dc4c5b06036c~mv2.jpg', 840, 1040), w: 840, h: 1040 }

export const ledger = [
  { id: 'repair', name: 'Repair and renovation', text: 'Repairs to existing pools, and renovations that bring an older pool up to date.', img: { src: fill('9bfda6_dab0b309b23541cf978c3e1a0ea96a8e~mv2.jpeg', 615, 720), w: 615, h: 720, alt: 'A pool repair by Gunite Pools of Nassau' }, cta: 'Request a repair quote', door: 'renovate' as const, page: `${SITE}/repair-and-renovation` },
  { id: 'tanks', name: 'Fiberglass tanks', text: 'Fiberglass tanks from Gunite Pools of Nassau. Ask the team for sizes and availability.', img: { src: fill('9bfda6_23760d4236cb48a989560ebbbd3d9ca1~mv2.jpg', 840, 1040), w: 840, h: 1040, alt: 'Fiberglass tanks from Gunite Pools of Nassau' }, cta: 'Ask about tanks', door: null, page: `${SITE}/fiberglass-tanks` },
  { id: 'store', name: 'The store', text: 'Pool supplies at 23 Montrose Avenue, Nassau, or from the online shop.', img: { src: fill('9bfda6_7d0d168c6d754855bb497e42fd3c32ee~mv2.jpg', 534, 663), w: 534, h: 663, alt: 'A pool safety cover, from the Gunite Pools of Nassau journal' }, cta: 'Shop online', door: null, page: STORE },
  { id: 'new', name: 'New pool construction', text: 'Geometric or free-form, from a residential pool to an Olympic size pool, designed with you or your architect.', img: { src: fill('9bfda6_4e1c0cb9f4894a78a8cfeafb7e61221a~mv2.jpg', 840, 984), w: 840, h: 984, alt: 'A new pool by Gunite Pools of Nassau' }, cta: 'Draw your pool', door: 'geometric' as const, page: `${SITE}/newpool` },
]

export const reads = [
  { t: 'Mesh vs. solid safety covers', href: `${SITE}/post/mesh-vs-solid-safety-covers` },
  { t: 'Backyard renovation ideas', href: `${SITE}/post/backyard-renovation-ideas` },
]

export const people = [
  { n: 'Phillip Whitehead', r: 'President' },
  { n: 'Peter Whitehead', r: 'Vice President' },
  { n: 'Thomas Whitehead', r: 'Vice President' },
  { n: 'José Viana', r: 'Director of Construction' },
]

export const promises = [
  'A field manager visits monthly and reports on your equipment, chemicals and pool health.',
  'Technicians are tracked by GPS, so you can see when our staff were on site.',
  'Technicians are trained and reviewed every quarter.',
]
