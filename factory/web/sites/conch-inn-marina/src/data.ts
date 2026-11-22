// Facts from conchinn.com (home, marina, rooms, contact-us, marina-rules; scraped Nov 2026), noonsite.com and
// bahamasmarinas.com (renovation article). Nothing invented.
const W = 'https://static.wixstatic.com/media/'
/** Wix serves any size of the original; never ask for more than the original has. */
export const wix = (id: string, w: number, h: number) => `${W}${id}/v1/fill/w_${w},h_${h},al_c,q_85/${id}`

export const BIZ = {
  name: 'The Conch Inn & Marina',
  short: 'Conch Inn',
  street: '700 Bay Street, Marsh Harbour, Abaco, Bahamas',
  phone: '242-367-4000', tel: '+12423674000',
  phone2: '242-577-7000', tel2: '+12425777000',
  email: 'info@conchinn.com',
  vhf: 'VHF 16',
  hours: 'Every day, 8:00 am to 5:30 pm',
  hoursShort: '8:00 to 5:30',
  bookRooms: 'https://online.rezexpert.com/book?business_code=303844',
  instagram: 'https://www.instagram.com/theconchinn/',
  snappas: 'https://snappasbarandgrill.com/',
  renu: 'https://renudayspabahamas.com/',
}

export const PHOTO = {
  docks: { id: '21c3e0_89587c3dc79247f6a6952532ee1ae5c6~mv2.jpg', w: 1566, h: 1535, alt: 'The Conch Inn docks at sunset, sailboat masts against an orange sky over the harbour' },
  balcony: { id: '21c3e0_9d42be5dced64df7b10fd0ccedf396fa~mv2.jpg', w: 1600, h: 1067, alt: 'View from a Conch Inn balcony over the marina and Marsh Harbour' },
  snappas: { id: '21c3e0_b0563f098d4c4f92878f4d0645cfa39f~mv2.jpg', w: 2134, h: 2134, alt: 'Snappas Bar & Grill deck, tables and chairs looking out over the marina' },
}

export type Room = { id: string; name: string; view: string; features: string[]; photo: { id: string; w: number; h: number }; alt: string }
export const ROOMS: Room[] = [
  { id: 'gv-queen', name: 'Garden View Double Queen', view: 'Garden view', features: ['Two queen beds', 'Desk', 'Balcony', 'Mini refrigerator', 'Keurig coffee maker', 'Walk-in shower'], photo: { id: '21c3e0_323212dac45d4f2c84f8614002598d35~mv2.jpg', w: 1600, h: 1067 }, alt: 'Garden view room with two queen beds under blue covers' },
  { id: 'gv-king', name: 'Garden View Single King', view: 'Garden view', features: ['King bed', 'Desk', 'Balcony', 'Mini refrigerator', 'Keurig coffee maker', 'Walk-in shower'], photo: { id: '21c3e0_057d7512f1a2464d9a8b8e2f7cd3f6f5~mv2.jpg', w: 1579, h: 1053 }, alt: 'King room with a green cover and doors to the balcony' },
  { id: 'mv-king', name: 'Marina View King Suite', view: 'Marina view', features: ['King bed', 'Sleeper sofa', 'Balcony', 'Mini refrigerator', 'Keurig coffee maker', 'Large walk-in shower', 'Microwave'], photo: { id: '21c3e0_820f47f220674575a6d1d07fae6423c1~mv2.jpg', w: 8256, h: 5504 }, alt: 'Marina view suite with a king bed and balcony doors onto the docks' },
  { id: 'mv-kq', name: 'Marina View King & Queen Suite', view: 'Marina view', features: ['King bed and queen bed', 'Balcony', 'Mini refrigerator', 'Keurig coffee maker', 'Large walk-in shower', 'Microwave'], photo: { id: '21c3e0_93e55885cedf4383988cb0154f30f511~mv2.jpg', w: 8256, h: 5504 }, alt: 'Suite with a king and a queen bed, balcony doors to the marina' },
  { id: 'apt', name: 'Harbour View Apartment, two bed, two bath', view: 'Harbour view', features: ['King bed with private bathroom', 'Queen bed with bathroom', 'Sleeper sofa', 'Full kitchen', 'Keurig coffee maker', 'Large walk-in shower', 'Microwave', 'Patio'], photo: { id: '21c3e0_8c67ac12350c42d19c18c083c17db37e~mv2.jpg', w: 7790, h: 5193 }, alt: 'Apartment kitchen with stone counters, steel appliances and a breakfast bar' },
  { id: 'pres', name: 'Presidential Suite, two bed, two bath', view: 'Marina view', features: ['Two king beds, each with a bathroom', 'Sleeper sofa', 'Full kitchen', 'Keurig coffee maker', 'Large walk-in shower', 'Microwave', 'Balcony'], photo: { id: '21c3e0_fb0d9e48c19347ceb6c230865cfee45b~mv2.jpg', w: 3000, h: 2000 }, alt: 'Presidential suite sitting room with a blue sofa and doors to the balcony over the marina' },
]

export const RATE = { one: 3.75, daily: 3.25, monthly: 2.25, short: 1.0, power: 0.75, water: 0.1, mooringNight: 30, mooringMonth: 500, beamMax: 30 }

export const LEDGER: { group: string; rows: [string, string][] }[] = [
  { group: 'Dockage, per foot of length', rows: [['One night', '$3.75'], ['Two nights or more, per night', '$3.25'], ['Thirty nights or more, monthly rate, per night', '$2.25'], ['Pick-up, drop-off or provisioning, up to 3 hours', '$1.00']] },
  { group: 'At the slip', rows: [['Electric, 30 and 50 amp, per kWh', '$0.75'], ['Water, per gallon', '$0.10'], ['High-speed WiFi, showers and restrooms', 'Free'], ['Washers and dryers', 'Tokens']] },
  { group: 'Mooring balls, first come first served', rows: [['Per night, plus VAT', '$30'], ['Per month, plus VAT', '$500'], ['WiFi, dinghy dock, showers, laundry access', 'Included']] },
]
export const ALSO = ['Gasoline, diesel and ice', '24-hour security', 'Pool', 'Free dinghy dock']
export const RULES: string[] = [
  'Rates are on length overall, bow pulpit to swim platform.',
  'Check-in and check-out at 12 noon.',
  'Cancel within 48 hours of arrival and the first night is charged.',
  'Some slips have a minimum length; no slip is guaranteed until assigned.',
  'Hull and liability insurance required.',
  'No wake in the marina, no fishing, music low after 9 pm, dogs on a leash.',
]
