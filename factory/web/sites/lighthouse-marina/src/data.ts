// Every fact here is sourced from htlighthousemarina.com (home, facilities-services, ships-store, rates, rental-cottages)
// or Wikimedia Commons (panorama, lighthouse category). See factory/briefs/lighthouse-marina.md.

export const biz = {
  name: 'Lighthouse Marina',
  place: 'Hope Town, Elbow Cay, Abaco',
  phones: [
    { label: '242 366 0154', tel: '+12423660154' },
    { label: '242 577 0283', tel: '+12425770283' },
    { label: '305 735 8550', tel: '+13057358550', note: 'US line' },
  ],
  email: 'lighthousemarinaht@gmail.com',
  vhf: '16',
  facebook: 'https://www.facebook.com/Lighthouse-Marina-260128454011114',
}

const wix = (id: string, name: string) => (w: number) =>
  `https://static.wixstatic.com/media/${id}/v1/fit/w_${w},h_${w},q_80,enc_auto/${name}.jpg`

export type Photo = { src: (w: number) => string; w: number; h: number; alt: string; local: string }

export const photos = {
  dock: { src: wix('4f78a7_7a9d9a27904546f6b150ed5e5f41a2a4~mv2.jpg', 'dock'), w: 2869, h: 3869, local: 'dock-lighthouse',
    alt: 'A centre console tied up at the Lighthouse Marina fuel dock, the red and white Elbow Reef Lighthouse behind it' },
  wide: { src: wix('fb296f_2c714a7d95ba41f29892cd727b32bd5a~mv2.jpg', 'fuel-dock'), w: 2048, h: 1533, local: 'fueldock-wide',
    alt: 'Lighthouse Marina seen from Hope Town Harbour, the docks and buildings under the lighthouse' },
  open: { src: wix('4f78a7_63b5cedb8baa4f4ea0dda23aaaa359ea~mv2.jpg', 'open'), w: 3024, h: 4032, local: 'open-flag',
    alt: 'The rebuilt dock at Lighthouse Marina with a Bahamian flag and an Open flag flying' },
  store: { src: wix('4f78a7_fae427062b064332a63a6ddbe362a87f~mv2.jpg', 'store'), w: 3024, h: 4032, local: 'store',
    alt: 'The renovated ship’s store building at Lighthouse Marina, steps down to the dock' },
  yard: { src: wix('fb296f_9365786308b04dd19feb9c42800c1a71~mv2.jpeg', 'yard'), w: 3621, h: 2716, local: 'forklift',
    alt: 'The marina forklift carrying a boat across the yard, the lighthouse beyond' },
  crate: { src: wix('4f78a7_29dfe727a735421c9de8277e9aefeb23~mv2.jpg', 'gifts'), w: 3024, h: 3024, local: 'calendar',
    alt: 'Gift items from the ship’s store in a wooden crate: a Bahamian calendar and Lighthouse Marina bags' },
  glass: { src: wix('4f78a7_0124a45dfbd6485aafa4655dfe9f3972~mv2.jpg', 'glass'), w: 3024, h: 3024, local: 'merch-lighthouse',
    alt: 'A lighthouse model and souvenir glasses from the ship’s store on a dock table' },
} satisfies Record<string, Photo>

export const pano = {
  src1920: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Hope_Town_Panorama-Roman_Tokman.jpg/1920px-Hope_Town_Panorama-Roman_Tokman.jpg',
  src3840: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Hope_Town_Panorama-Roman_Tokman.jpg/3840px-Hope_Town_Panorama-Roman_Tokman.jpg',
  ratio: 3840 / 880,
  credit: 'Panorama from the lighthouse gallery: Roman Tokman, CC BY-SA 4.0, Wikimedia Commons',
  alt: 'Panorama from the gallery of the Elbow Reef Lighthouse over Hope Town Harbour, moored boats, the settlement and the lantern room rail',
}

export const rates = {
  vat: 0.1,
  single: { haul: 5.5, launch: 5.5, blocking: 50, roundTrip: 8, pressure: 6 },
  twin: { haul: 7, launch: 7, blocking: 60, pressure: 8 },
  storage: { upTo25: 200, to30: 8.5, over30: 9, twin: 9 },
}
