// Every fact here is sourced: donnysboatrentalsgtc.com (home, our-fleet, services-3, 2026-11-20),
// noonsite.com and waterwayguide.com (see factory/briefs/donny-s-boat-rentals-marina.md).

/** Their own photographs on static.wixstatic.com, resized by Wix's own image service. */
export const wix = (id: string, w = 1600) => `https://static.wixstatic.com/media/${id}/v1/fit/w_${w},h_${w},q_85,enc_auto/${id}`
export const srcSet = (id: string, sizes = [800, 1400, 2000]) => sizes.map(w => `${wix(id, w)} ${w}w`).join(', ')

export const P = {
  marinaAir: '1c154a_788222cd60354b608e5d96e9b2767508~mv2_d_2000_1499_s_2.jpg',
  dockAir: '1c154a_c9f3faaedba24e4f8f30dbb882f512ea~mv2.jpg',
  soundAir: '1c154a_01e13c9376d54a0da0697eb0f4db1d78~mv2.jpg',
  beach: '1c154a_a9e76f1a02284cf5bfb0bd57691c89e9~mv2.jpg',
  turtle: '1c154a_e47d269ebb5a4e60aa664a22c2d7ebe3~mv2.jpg',
  pigs: '1c154a_67aed8ea637c4fe2a32e2c9797d86aad~mv2.jpg',
  walkway: '1c154a_513335e058724caf96d834cfa1763f19~mv2.jpg',
  morning: '1c154a_aed66bd991d64c718ae73d38dcf47ad2~mv2.jpg',
  teal: '1c154a_2bb05813534d457d9afa6e1b0ba263e8~mv2.jpg',
  heroBoat: '1c154a_99171120631c43e18dba8efea634593f~mv2.jpg',
  donnysBoat: '1c154a_6049786bfa3f4c89a483afb492f846d1~mv2_d_4032_3024_s_4_2.jpeg',
}

export const PHONE = '242 823 8733'
export const TEL = 'tel:+12428238733'
export const PHONE_US = '407 610 7000'
export const TEL_US = 'tel:+14076107000'
export const WA_NUMBER = '242 815 9323'
export const EMAIL = 'donnysboatrentals@gmail.com'
export const wa = (text: string) => `https://wa.me/12428159323?text=${encodeURIComponent(text)}`
export const mail = (subject: string, body = '') => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`

export type Boat = {
  id: string; name: string; short: string; length: string; hp: string; people: string; day: number; week: number
  experience: boolean; kit: string[]; photos: string[]; cover: string; pos: string
}

export const FLEET: Boat[] = [
  { id: 'angler', name: '23 ft Angler', short: 'Angler', length: '23 ft', hp: '200 hp', people: '5 to 6 adults', day: 185, week: 1200, experience: true,
    kit: ['Buoyancy aids', 'Fixed VHF', 'Chart-plotter', 'Stereo', 'Ladder'],
    cover: '1c154a_4ff246bf07cc42ea9ed873cc662b6875.jpg', pos: '50% 62%',
    photos: ['1c154a_4ff246bf07cc42ea9ed873cc662b6875.jpg', '1c154a_b0da531e314e4c3abe5957099daa2f08~mv2.jpg', '1c154a_b0fc264e2c234e16910226e11f8d4adf~mv2.jpg'] },
  { id: 'century', name: '20 ft Century', short: 'Century', length: '20 ft', hp: '150 hp', people: '5 to 6 adults', day: 170, week: 1075, experience: true,
    kit: ['Buoyancy aids', 'VHF', 'Trim tabs', 'Chart-plotter', 'Stereo', 'Ladder', 'Anchor and rode', 'Cooler'],
    cover: '1c154a_3d72f85cdb1640098b054f917382ca21~mv2_d_4032_3024_s_4_2.jpeg', pos: '50% 66%',
    photos: ['1c154a_3d72f85cdb1640098b054f917382ca21~mv2_d_4032_3024_s_4_2.jpeg', '1c154a_1d4e6258cf5d4141963fe64cea0da41a~mv2.jpg', '1c154a_65f730f756f342c08d0396747fdda60a~mv2.jpg'] },
  { id: 'whaler19', name: '19 ft Boston Whaler', short: '19 ft Whaler', length: '19 ft', hp: '115 hp', people: '4 adults', day: 140, week: 880, experience: false,
    kit: ['Buoyancy aids', 'Fixed VHF', 'Chart-plotter', 'Ladder', 'Anchor and rode', 'Cooler'],
    cover: '1c154a_85b6ee3e9b314d0bb82f008894afcedc~mv2.jpg',
    pos: '50% 60%',
    photos: ['1c154a_85b6ee3e9b314d0bb82f008894afcedc~mv2.jpg', '1c154a_e175631fc957408ab2d0d1dd25cd913f~mv2.jpg'] },
  { id: 'whaler17', name: '17 ft Boston Whaler', short: '17 ft Whaler', length: '17 ft', hp: '60 to 90 hp', people: '2 to 3 adults', day: 125, week: 805, experience: false,
    kit: ['Buoyancy aids', 'VHF', 'Ladder', 'Anchor and rode', 'Cooler'],
    cover: '1c154a_2bb05813534d457d9afa6e1b0ba263e8~mv2.jpg', pos: '50% 62%',
    photos: ['1c154a_2bb05813534d457d9afa6e1b0ba263e8~mv2.jpg', '1c154a_99171120631c43e18dba8efea634593f~mv2.jpg', '1c154a_aed66bd991d64c718ae73d38dcf47ad2~mv2.jpg'] },
]

/** Cost from the published rates: whole weeks at the 7-day price, the rest at the day price. */
export const estimate = (b: Boat, days: number) => Math.floor(days / 7) * b.week + (days % 7) * b.day
export const usd = (n: number) => `$${n.toLocaleString('en-US')}`

export const TERMS: [string, string][] = [
  ['Cash, paid in full before you go', 'There is no ATM on Green Turtle Cay and cards are not accepted, so bring it with you.'],
  ['A $100 deposit, non-refundable', 'It holds your boat for your dates.'],
  ['Three days minimum', 'Rentals are only for guests staying on Green Turtle Cay.'],
  ['Collect from 8 am, back by 5 pm', '6 pm in summer time. Late returns are $30 an hour. Sunrise to sunset only.'],
  ['Same fuel back', 'Missing fuel is charged at $1 over the price per gallon.'],
  ['Inside the Sea of Abaco', 'Ocean fishing within a mile of shore only if the weather allows and Donny agrees at the start.'],
  ['Weather is the island’s call', 'There is no refund or credit for days lost to weather.'],
]

export const MARINA = {
  loa: 50, draft: 7,
  rates: [
    { label: 'Mooring', day: 25, week: 150, month: 350, note: 'Plenty of swing room' },
    { label: 'Dock, 45 ft and under', day: 80, week: 350, month: 1075, note: '30 amp: +$5 a day, +$20 a week, +$100 a month' },
    { label: 'Dock, 46 to 50 ft', day: 100, week: 400, month: 1300, note: '30 amp: +$5 a day, +$20 a week, +$100 a month' },
  ],
  extras: [['Shower', '$3'], ['Washer', '$4 a load'], ['Dryer', '$4 a load'], ['Water', '$0.20 a gallon']] as [string, string][],
}

/** Slip check from the published dockage rates (services-3) and limits (noonsite): cheapest reading of day, week and month rates. */
export type Berth = 'dock' | 'mooring'
export type Rate = { day: number; week: number; month: number }
export function stayCost(r: Rate, nights: number) {
  const mixed = Math.floor(nights / 7) * r.week + (nights % 7) * r.day
  const weeksUp = Math.ceil(nights / 7) * r.week
  const months = nights >= 28 ? Math.ceil(nights / 30) * r.month : Infinity
  const best = Math.min(mixed, weeksUp, months)
  const w = Math.floor(nights / 7), d = nights % 7
  const how = best === months ? `${Math.ceil(nights / 30) === 1 ? 'the monthly rate' : `${Math.ceil(nights / 30)} months`} at ${usd(r.month)}`
    : best === mixed ? [w ? `${w === 1 ? '1 week' : `${w} weeks`} at ${usd(r.week)}` : '', d ? `${d} ${d === 1 ? 'night' : 'nights'} at ${usd(r.day)}` : ''].filter(Boolean).join(' + ')
    : `${Math.ceil(nights / 7) === 1 ? 'the weekly rate' : `${Math.ceil(nights / 7)} weeks`} at ${usd(r.week)}`
  return { total: best, how }
}
export const AMP30: Rate = { day: 5, week: 20, month: 100 }
export function fit(loa: number, draft: number, berth: Berth) {
  // the published limits (50 ft LOA, 7 ft draft) are the only sourced numbers, so beyond them we never say "fits"
  if (loa > MARINA.loa || draft > MARINA.draft) return { ok: false as const, rate: null, label: 'Beyond the published limits: ask Donny' }
  const rate = berth === 'mooring' ? MARINA.rates[0] : loa <= 45 ? MARINA.rates[1] : MARINA.rates[2]
  return { ok: true as const, rate, label: berth === 'mooring' ? 'Within the limits: a mooring' : loa <= 45 ? 'Within the limits: dock, 45 ft and under' : 'Within the limits: dock, 46 to 50 ft' }
}
export const ENTRY_NOTE = 'A 6 ft draft can enter at a tide 2 ft above low water. Stay close to the last red marker, then aim for the middle of the sound.'
