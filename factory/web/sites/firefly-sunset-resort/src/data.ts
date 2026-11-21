// Facts from fireflysunsetresort.com (home, rooms, our-services, faqs, empty-page menus; scraped Nov 2026) and the
// resort's Tablein page. Nothing invented.
const D = 'https://le-de.cdn-website.com/2d4998284dab4ddea002e9199a7f7b5f/dms3rep/multi/opt/Firefly+Sunset+Resort-'
export const ph = (n: string, w: 1280 | 1920 = 1920) => `${D}${n}-${w}w.jpg`

export const BIZ = {
  name: 'Firefly Sunset Resort',
  email: 'info@fireflysunsetresort.com',
  phone: '1 (242) 366-0145', tel: '+12423660145',
  dinner: 'https://firefly-sunset-resort.tablein.com/',
  instagram: 'https://instagram.com/fireflysunsetresort',
  facebook: 'https://facebook.com/fireflysunsetresort.com',
  place: 'Centre Line Road, Hope Town, Elbow Cay, Abaco',
}
export const HOPE_TOWN = { lat: 26.5417, lon: -76.9592, tz: 'America/Nassau' }

export type Villa = { id: string; name: string; beds: string; line: string; inDay?: number; inWeek?: number; offDay?: number; offWeek?: number; book: string }
const G = 'https://fireflysunsetresort.guestybookings.com/properties/'
export const VILLAS: Villa[] = [
  { id: 'mint', name: 'Mint To Be', beds: '2 bed, 2 bath', line: 'Almost suspended over the Sea of Abaco, with a private plunge pool and a back deck facing the sunset. Built for honeymoons, or two couples.', inDay: 1125, inWeek: 7650, offDay: 1000, offWeek: 6800, book: G + '653035582185390047f83e3c' },
  { id: 'java', name: 'Java Rum Plantation', beds: '3 bed, 2 bath', line: 'Wide wooden decks and French doors, steps above the beach. Named after our Sea Island Java Rum.', inDay: 1500, inWeek: 10200, offDay: 1350, offWeek: 9180, book: G + '653035d036e1e600335800eb' },
  { id: 'irvin', name: 'Irvin House', beds: '3 bed, 2.5 bath', line: 'The original owners’ house, on one level: two living rooms, a big kitchen, and a covered porch for the sunset over the pool.', book: G + '6a7610184f61e00015c6ecb1' },
  { id: 'firefly', name: 'Firefly', beds: '2 bed, 2 bath', line: 'Modern tropical rooms, each bedroom with its own full bath, high over the Sea of Abaco.', inDay: 800, inWeek: 5440, offDay: 665, offWeek: 4525, book: G + '6526e99911d8fb0031ba8d09' },
  { id: 'dragonfly', name: 'Dragonfly', beds: '2 bed, 2 bath', line: 'The same island-cottage design as Firefly, with elevated views over the water.', inDay: 800, inWeek: 5440, offDay: 665, offWeek: 4525, book: G + '6530341736e1e6003357e18e' },
  { id: 'butterfly', name: 'Butterfly', beds: '2 bed, 2 bath', line: 'Two bedrooms, two baths and the sunset from the deck.', inDay: 800, inWeek: 5440, offDay: 665, offWeek: 4525, book: G + '65298b3c11d8fb0031dc794a' },
]
export const VAT = 0.1
export const WHOLE = { week: 49258, three: 21731 }

export const HOURS = [
  { meal: 'Breakfast', time: '8:00 to 11:00 am', note: 'Bahamian breakfast on Sundays' },
  { meal: 'Lunch', time: '11:30 am to 4:00 pm', note: '' },
  { meal: 'Dinner', time: '5:30 to 9:00 pm', note: 'Reservations online; 12 or more, please call' },
]
