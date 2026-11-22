const U = 'https://runawayhill.com/wp-content/uploads/'
export type Pic = { src: string; w: number; h: number; alt: string }
const p = (src: string, w: number, h: number, alt: string): Pic => ({ src: U + src, w, h, alt })

export const IMG = {
  hero: p('2021/04/runawayhillinn_hotel_harbourislandbahamas14-1.jpg', 1600, 1000, 'Runaway Hill Inn, the white manor house on its hill above the ocean, Harbour Island'),
  restaurant: p('2026/02/Restaurant-Section-1-scaled.jpg', 2560, 1707, 'The restaurant at Runaway Hill Inn, set for dinner with the ocean beyond'),
  house2: p('2025/01/IMG_0133-582x705.jpg', 582, 705, 'The Main House of Runaway Hill Inn'),
  pool: p('2025/01/IMG_0148-570x705.jpg', 570, 705, 'The tiled pool and sun deck below the Main House'),
  chairs: p('2018/02/IMG_2336-705x543.jpg', 705, 543, 'Loungers and umbrellas on the beach below the inn'),
  beach: p('2018/02/IMG_2284-705x470.jpg', 705, 470, 'Pink Sands Beach seen from beside the inn'),
  lounge: p('2025/01/Screenshot-2025-01-29-at-3.15.40-PM-705x455.png', 705, 455, 'The oceanfront lounge'),
  patio: p('2025/01/IMG_0136-705x697.jpg', 705, 697, 'Drinks on the patio'),
  wedding: p('2023/12/0V2A1830-705x470.jpeg', 705, 470, 'A wedding at Runaway Hill Inn'),
  yoga: p('2025/12/Runaway-Hill-Hero-Image-705x470.webp', 705, 470, 'A guest doing yoga on the beach'),
}

export const EMAIL = 'Reservations@runawayhill.com'
export const BOOK = 'https://direct-book.com/properties/RunawayHillInnDirect'
export const MAP_PDF = 'https://runawayhill.com/wp-content/uploads/2018/02/property-map.pdf'
export const TRIP = 'https://www.tripadvisor.com/Hotel_Review-g148423-d151680-Reviews-Runaway_Hill_Club-Harbour_Island_Out_Islands_Bahamas.html'
export const INSTA = 'https://www.instagram.com/runawayhillbriland/'
export const LOCAL = '(242) 333-2150', LOCAL_TEL = 'tel:+12423332150'
export const US = '(843) 278-1724', US_TEL = 'tel:+18432781724'
export const ADDRESS = 'PO Box 27031, Love Lane and Colebrooke Streets, Harbour Island, Bahamas'

export type House = 'Main House' | 'Courtyard' | 'Villas' | 'Infinity House'
export const HOUSES: { h: House; d: string }[] = [
  { h: 'Main House', d: 'Five rooms in the converted 1946 English manor, beside the lobby, bar and restaurant.' },
  { h: 'Courtyard', d: 'Three rooms that can connect, for families and friends travelling together.' },
  { h: 'Villas', d: 'Rooms set apart from the house, including Lyon Holland with its own kitchen and deck.' },
  { h: 'Infinity House', d: 'The five-bedroom oceanfront home next to the inn, by the day or by the week.' },
]
export type Room = { n: string; name: string; house: House; bed: string; king: boolean; three: boolean; rate: number; withTax: number; note: string; pic: Pic; check?: string }
const r = (n: string, name: string, house: House, bed: string, rate: number, withTax: number, src: string, w: number, h: number, note: string, o: Partial<Room> = {}): Room =>
  ({ n, name, house, bed, king: /king/i.test(bed), three: false, rate, withTax, note, pic: p(src, w, h, `Room ${n}, ${name}, at Runaway Hill Inn`), ...o })

export const ROOMS: Room[] = [
  r('1', 'Jacqueline Jean', 'Main House', 'King', 595, 773.5, '2018/02/room-1-1-scaled-e1768929281755-705x705.jpg', 705, 705, 'Oversized, on the first floor by reception: Cuban tile floors older than the inn, a walk-in shower, double sinks, a private sunlit courtyard and two windows with ocean views.'),
  r('2', 'Alice Emily', 'Main House', 'King, and a single bed in a small attached room', 690, 897, '2018/02/Room-2-thumbnail-705x461.jpg', 705, 461, 'A king room with a small attached room and single bed.', { three: true }),
  r('3', 'Sophia Jean', 'Main House', 'King', 640, 832, '2018/02/IMG_2558-1-705x470.jpg', 705, 470, 'A king room in the manor house.'),
  r('4', 'Rachel Alice', 'Main House', 'Queen', 580, 754, '2018/02/Room-4-thumbnail-no-drapes-705x595.jpg', 705, 595, 'A queen room in the manor house.'),
  r('5', 'Kathleen Jane', 'Main House', 'Queen', 580, 754, '2018/02/Room-5-thumbnail-1-705x595.jpg', 705, 595, 'A queen room in the manor house.'),
  r('6', 'Matteo Douglas', 'Courtyard', 'Queen', 495, 643.5, '2018/02/Room-6-RH-529x705.jpg', 529, 705, 'One of the three Courtyard rooms that can connect.'),
  r('7', 'Mark Umberto', 'Courtyard', 'King', 500, 650, '2018/02/Runaway-Hill-Pink-Room-7-thumbnail-update-RD-705x618.jpg', 705, 618, 'A Courtyard king that can connect to its neighbours.', { check: 'Their rate table shows $550.00 after tax for this room; at 30% it is $650.00. To confirm with the inn.' }),
  r('8', 'Luke Francesco', 'Courtyard', 'King', 555, 721.5, '2018/02/Room-8-529x705.jpg', 529, 705, 'A Courtyard king that can connect to rooms 6 and 7.'),
  r('9', 'Douglas Paul', 'Villas', 'King', 690, 897, '2018/02/IMG_2421-1-705x470.jpg', 705, 470, 'A villa room, set apart from the house.'),
  r('10', 'Tyler Frank', 'Villas', 'King', 690, 897, '2018/02/Room-10-blue-thumbnail-705x570.jpg', 705, 570, 'A villa room, set apart from the house.'),
  r('11', 'Lyon Holland', 'Villas', 'King, and two twin trundles', 1425, 1852.5, '2021/05/Runaway-hill-Room-11-thumbnail-705x571.jpg', 705, 571, 'Two full baths, a kitchen, a living room, a barbecue and a large outdoor deck with bay water views.', { three: true }),
  r('IH', 'Infinity House', 'Infinity House', 'Three kings, and two rooms of two twins', 3107.14, 4039.28, '2018/02/infinity-house-thumbnail-705x570.jpg', 705, 570, 'Five bedrooms on the ocean: 2½ baths, kitchen, living room, outdoor shower, barbecue, washer and dryer, a large courtyard and an oceanfront deck. Weekly $21,750 ($28,275 with tax and gratuity).', { three: true }),
]

export const TERMS = 'Rates are per night. Tax and gratuity add 30%: a 10% room gratuity, 10% VAT and a 10% resort levy. Three-night minimum stay. $150 for a cot or an extra person over age 10.'

export const QUOTES = [
  { q: 'The grounds are enchanting and the house is gorgeous. Everything is incredibly clean, windows open with a breeze running through and a breathtaking view of the ocean. It’s the most peaceful atmosphere. You will not find more genuine and hospitable staff.', by: 'Caroline C.' },
  { q: 'Runaway Hill has a very special feel to it. Love that it’s a smaller inn, which makes for a nice quieter and intimate place to relax. Runaway Hill Inn really helps you slip into the island’s relaxing pace as soon as you arrive! Highly recommend this place.', by: 'Kathy S.' },
  { q: 'I just completed a 4 night stay at The Runaway Hill Club and am already planning my next trip back. This is smaller boutique hotel complete with a tiled pool, oceanfront property, amazing restaurant and lovely staff. It’s quiet and low key and the perfect getaway.', by: 'Ty' },
]

export const DESCENT: { t: string; d: string; pic: Pic }[] = [
  { t: 'The Main House', d: 'A one-and-a-half-storey manor from 1946 on one of the highest points of the island: the lobby, the bar and the restaurant, with views over the ocean.', pic: IMG.house2 },
  { t: 'The pool', d: 'The tiled pool and its sun deck step down from the house.', pic: IMG.pool },
  { t: 'The staircase', d: 'The stairs run on down to the beach, where loungers, umbrellas, kayaks and paddleboards wait.', pic: IMG.chairs },
  { t: 'Pink Sands Beach', d: '175 feet of beachfront at the bottom of the hill.', pic: IMG.beach },
]

export const ROUTE = [
  ['Fly', 'to North Eleuthera International Airport.'],
  ['Taxi', 'a short ride to the dock.'],
  ['Water taxi', 'a short crossing to Harbour Island.'],
  ['Up the hill', 'to Love Lane and Colebrooke Streets, above Pink Sands Beach.'],
]

export const money = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const money0 = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 })
