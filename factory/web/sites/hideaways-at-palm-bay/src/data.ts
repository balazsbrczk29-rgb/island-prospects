// Every fact below comes from hideawayspalmbay.com (scraped 2026-11-05 and 2026-11-21). Nothing invented.
const U = 'https://hideawayspalmbay.com/wp-content/uploads/'
export const img = (p: string) => U + p

export const BIZ = {
  name: 'Hideaways at Palm Bay',
  phone: '+1 242-336-2787',
  tel: '+12423362787',
  email: 'info@hideawayspalmbay.com',
  address: 'Jolly Hall Bay, Queen’s Highway, George Town, Exuma, Bahamas',
  booking: 'https://hotels.cloudbeds.com/reservation/QVagP2',
  facebook: 'https://www.facebook.com/HideawaysPalmBay/',
  instagram: 'https://www.instagram.com/hideawayspalmbay/',
}

/** Cloudbeds accepts check-in/out and adults in the URL hash (assumption to confirm with the owner). */
export function bookingUrl(arrive?: string, depart?: string, adults?: number) {
  if (!arrive || !depart) return BIZ.booking
  return `${BIZ.booking}#checkin=${arrive}&checkout=${depart}${adults ? `&adults=${adults}` : ''}`
}

export type Side = 'ocean' | 'hill'
export type Room = { id: string; side: Side; name: string; view: string; beds: string; baths: string; kitchen: string; patio: string; photo: string; alt: string }

export const ROOMS: Room[] = [
  { id: 'cottage-1br-ocean', side: 'ocean', name: 'One-bedroom cottage, ocean view', view: 'Ocean view', beds: '1 king or 2 queens', baths: 'Full bath', kitchen: 'Expanded kitchenette, dinette for four', patio: 'Private patio', photo: img('2026/05/one-bedroom-ocean-view-cottage-img-home.jpg'), alt: 'Living room of an ocean-view cottage with a dining table by windows onto the sea' },
  { id: 'cottage-1br-garden', side: 'ocean', name: 'Studio or one-bedroom cottage, garden view', view: 'Garden view', beds: '1 king, king and queen, or king and 2 singles', baths: 'Full bath', kitchen: 'Kitchenette, dinette for four', patio: 'Patio for two', photo: img('2026/05/one-bedroom-garden-view-img-home.jpg'), alt: 'Row of blue ocean-side cottages behind a boardwalk and palms' },
  { id: 'cottage-2br-garden', side: 'ocean', name: 'Two-bedroom cottage, garden view', view: 'Garden view', beds: 'King and queen', baths: '1.5 baths', kitchen: 'Kitchenette', patio: 'Patio for four', photo: img('2023/05/home-ocean-side-cottages-two-bedroom.jpg'), alt: 'Bedroom in a two-bedroom cottage with sun across the bed' },
  { id: 'villa-1br-partial', side: 'ocean', name: 'One-bedroom villa, partial ocean view', view: 'Partial ocean view', beds: 'King, plus a queen sofa sleeper', baths: '2 full baths', kitchen: 'Full kitchen', patio: 'Patio for two', photo: img('2023/05/partial-ocean-view-villas-img-home.jpg'), alt: 'King bedroom in an ocean-side villa' },
  { id: 'villa-2br-ocean', side: 'ocean', name: 'Two-bedroom villa, ocean view', view: 'Ocean view', beds: 'King and queen', baths: '2 ensuite baths', kitchen: 'Full kitchen', patio: 'Ocean-view patio for four', photo: img('2026/05/ocean-side-villas-two-bedroom-ocean-view-home.png'), alt: 'Ocean-side villa patio with two loungers' },
  { id: 'hill-studio', side: 'hill', name: 'Island Time studio, island view', view: 'Island view', beds: '1 king', baths: '1 bath', kitchen: 'Mini kitchen', patio: 'Garden-view patio', photo: img('2026/05/island-time-villas-hillside-studio-room-img-home.jpg'), alt: 'Bright hillside studio with a king bed' },
  { id: 'hill-1br', side: 'hill', name: 'Island Time one-bedroom villa', view: 'Over the Beach Club and the bay', beds: '1 king', baths: '2 baths', kitchen: 'Full kitchen', patio: 'Patio over the Beach Club and Elizabeth Bay', photo: img('2026/05/one-bedroom-villa-hillside-img-home.png'), alt: 'Sitting room of a hillside one-bedroom villa' },
  { id: 'hill-2br', side: 'hill', name: 'Island Time two-bedroom villa', view: 'Over the Beach Club and the bay', beds: 'King, plus a queen sofa sleeper', baths: '2 baths', kitchen: 'Full kitchen', patio: 'Patio over the Beach Club and Elizabeth Bay', photo: img('2026/05/two-bedroom-villa-hillside-img-home.jpg'), alt: 'Two-storey turquoise hillside villas with balconies' },
]
export const ALL_ROOMS_HAVE = 'Every room: air conditioning, cable TV, in-room safe, iron and hairdryer.'

export type Special = { id: string; who: Who[]; title: string; what: string; code: string; nights: string; bookFrom: string; bookTo: string; travelFrom: string; travelTo: string; blackout: string }
export type Who = 'bahamas' | 'pilot' | 'europe' | 'latam' | 'usca'
export const WHO: { id: Who; label: string }[] = [
  { id: 'usca', label: 'U.S. or Canada' },
  { id: 'bahamas', label: 'The Bahamas' },
  { id: 'pilot', label: 'I fly my own plane' },
  { id: 'europe', label: 'Europe' },
  { id: 'latam', label: 'Latin America' },
]
const BLACKOUT = 'Nov 26 to 28, 2026; Dec 19, 2026 to Jan 1, 2027; Mar 25 to 28, 2027; Jul 1 to 4, 2027'
export const SPECIALS: Special[] = [
  { id: 'bahamas', who: ['bahamas'], title: 'Fly or cruise free from Nassau or Freeport', what: 'One free airline or Bahamas Ferries ticket from Nassau with a pre-booked 2-night stay, two free tickets with 4 nights or more.', code: 'FLYFREEBAHAMAS', nights: '2 nights or more', bookFrom: '2026-07-01', bookTo: '2027-06-30', travelFrom: '2026-07-05', travelTo: '2027-10-31', blackout: BLACKOUT },
  { id: 'feefree', who: ['pilot'], title: 'Fly almost fee free', what: 'A $300 fee credit for licensed private pilots on a 4-night stay or longer.', code: 'FEEFREE', nights: '4 nights or more', bookFrom: '2026-07-01', bookTo: '2027-06-30', travelFrom: '2026-07-05', travelTo: '2027-10-31', blackout: BLACKOUT },
  { id: 'hopping', who: ['pilot'], title: 'Island hopping', what: 'A $150 fee credit for licensed private pilots on a pre-booked 2-night stay.', code: 'ISLANDHOPPING', nights: '2 nights', bookFrom: '2026-07-01', bookTo: '2027-06-30', travelFrom: '2026-07-05', travelTo: '2027-10-31', blackout: BLACKOUT },
  { id: 'eu-florida', who: ['europe'], title: '$250 air or ferry credit via Florida', what: 'Up to $250 off an air or ferry-inclusive package from Florida, 4 consecutive nights or longer.', code: 'FLYFREEEUROPE', nights: '4 nights or more', bookFrom: '2026-11-01', bookTo: '2027-01-31', travelFrom: '2026-11-02', travelTo: '2027-10-31', blackout: BLACKOUT },
  { id: 'eu-two', who: ['europe'], title: 'Two fly free from Nassau', what: 'One free round-trip ticket from Nassau for 4 to 6 nights, two free tickets for 7 nights, on an air-inclusive package.', code: 'FLYFREEEUROPE', nights: '4 nights or more', bookFrom: '2026-07-01', bookTo: '2027-06-30', travelFrom: '2026-07-02', travelTo: '2027-10-31', blackout: 'None' },
  { id: 'latam', who: ['latam'], title: 'Two fly free from Nassau', what: 'For residents of Argentina, Brazil, Colombia and Mexico: one free ticket from Nassau for 4 to 6 nights, two for 7 nights.', code: 'FLYFREEEUROPE/LATINAMERICA', nights: '4 nights or more', bookFrom: '2026-07-01', bookTo: '2027-06-30', travelFrom: '2026-07-02', travelTo: '2027-10-31', blackout: 'None' },
]
export const openToday = (s: Special, today = new Date()) => {
  const d = today.toISOString().slice(0, 10)
  return d >= s.bookFrom && d <= s.bookTo
}
export const fmt = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const NEARBY = [
  { name: 'Jolly Hall', mi: '0.29' },
  { name: 'Minns Water Sports', mi: '1.39' },
  { name: 'Dive Exuma, Government Dock', mi: '1.50' },
  { name: 'Stocking Island', mi: '1.86' },
  { name: 'Mystery Cave', mi: '2.03' },
]
export const ACTIVITIES = ['Exuma Cays tours', 'Stocking Island trips', 'guided bonefishing', 'deep sea fishing', 'scuba diving', 'snorkelling', 'guided kayaking', 'boat rentals', 'golf']

export const SPLASH = {
  hours: [
    { meal: 'Breakfast', time: '8 to 10 am' },
    { meal: 'Lunch', time: '11 am to 5 pm' },
    { meal: 'Dinner', time: '6 to 9 pm' },
  ],
  drinks: ['Sky Juice', 'Bahama Mama', 'Goombay Smash', 'The Splash, by Anita', 'daiquiris', 'Kalik', 'Sands'],
  phones: [{ show: '242-524-6304', tel: '+12425246304' }, { show: '242-465-0239', tel: '+12424650239' }],
  photo: img('2020/01/splash-img-1.jpg'),
  door: img('2026/04/splash-img.jpg'),
}

export const GATEWAYS = ['Nassau', 'Miami', 'Fort Lauderdale', 'Atlanta', 'Toronto']
export const AIRLINES = 'Bahamasair, Western Air, American, Delta and Air Canada'

export const PHOTOS = {
  sand: img('2020/01/gallery4.jpg'),
  hill: img('2023/11/hillside-2-bedroom-oceanview-img2.jpg'),
  harbour: img('2020/01/getting-here-bg.jpg'),
  stocking: img('2020/01/gallery5.jpg'),
}
