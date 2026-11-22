import cat from './catalogue.json'

export const CDN = 'https://cdn.shopify.com/s/files/1/0584/6748/3722/files/'
export const STORE = 'https://thebahamasrumcakefactory.com'
export const img = (f: string | null | undefined, w?: number) => (f ? CDN + f + (w ? `?width=${w}` : '') : '')

export type Variant = { t: string; p: number; ok: boolean; id: number }
export type Item = { name: string; title?: string; handle: string; img: string | null; v: Variant[]; cat?: string }

// colour of each studio photograph's own ground (sampled from their photos)
const GROUND: Record<string, string> = {
  'Original': '#fdd29c', 'Original with Pecans': '#fdd29c', 'Pineapple': '#fcd956', 'Coconut': '#ede9e8', 'Banana': '#fedd28',
  'Amaretto': '#f6cfa8', 'Kentucky Bourbon': '#faa94e', 'Irish Cream': '#dfcfb2', 'Strawberry': '#fcccbe', 'Pumpkin Spice': '#fecfaf',
  'Caramel Caribbean': '#feceb2', 'Chocolate': '#a0775c', 'Key Lime': '#b5d88a', 'Pina Colada': '#ecd591',
}
const ORDER = ['Original', 'Original with Pecans', 'Pineapple', 'Pina Colada', 'Coconut', 'Banana', 'Key Lime', 'Caramel Caribbean', 'Chocolate', 'Amaretto', 'Kentucky Bourbon', 'Irish Cream', 'Strawberry', 'Pumpkin Spice']

export const flavours = (cat.flavours as Item[])
  .map(f => ({ ...f, ground: GROUND[f.name] || '#fdd29c', dark: f.name === 'Chocolate' }))
  .sort((a, b) => ORDER.indexOf(a.name) - ORDER.indexOf(b.name))
export type Flavour = typeof flavours[number]

export const sixpacks = cat.sixpacks as Item[]
export const twopacks = cat.twopacks as Item[]
export const mix = cat.mix as Item
export const other = cat.other as Item[]

export const ETSY = 'https://www.etsy.com/shop/BahamasRumCake'
export const shop = {
  address: '602 East Bay Street, Nassau',
  phone: { label: '(242) 328-3750', tel: '+12423283750' },
  email: 'bahamasrumcake@gmail.com',
  hours: 'Monday to Saturday 7:30 am to 4:00 pm, Sunday 8:00 am to 2:00 pm',
  walk: 'https://www.google.com/maps/dir/?api=1&origin=Prince+George+Wharf,+Nassau,+Bahamas&destination=602+East+Bay+Street,+Nassau,+Bahamas&travelmode=walking',
  embed: 'https://www.google.com/maps?saddr=Prince+George+Wharf,+Nassau,+Bahamas&daddr=602+East+Bay+Street,+Nassau,+Bahamas&dirflg=w&output=embed',
}

/** Open now, in Nassau time. Mon to Sat 7:30 to 16:00, Sun 8:00 to 14:00; closed Christmas Day, Boxing Day, New Year's Day. */
export function shopNow(d = new Date()) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Nassau', weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(d)
  const g = (t: string) => p.find(x => x.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday'))
  const md = `${g('month')}/${g('day')}`
  const m = Number(g('hour')) * 60 + Number(g('minute'))
  const [o, c] = day === 0 ? [480, 840] : [450, 960]
  const hol = (mo: number, dd: number) => ['12/25', '12/26', '1/1'].includes(`${mo}/${dd}`)
  const mo = Number(g('month')), dd = Number(g('day'))
  const holiday = hol(mo, dd)
  const open = !holiday && m >= o && m < c
  const closes = day === 0 ? '2:00 pm' : '4:00 pm'
  const today = holiday ? 'Closed today for the holiday' : day === 0 ? 'Today 8:00 am to 2:00 pm' : 'Today 7:30 am to 4:00 pm'
  // next opening day, skipping the published holiday closures
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let next = ''
  for (let k = 1; k <= 4; k++) {
    const dt = new Date(Date.UTC(new Date().getFullYear(), mo - 1, dd + k))
    if (hol(dt.getUTCMonth() + 1, dt.getUTCDate())) continue
    const wd = (day + k) % 7
    next = `opens ${k === 1 ? 'tomorrow' : names[wd]} ${wd === 0 ? '8:00' : '7:30'} am`; break
  }
  const text = open ? `Open now, until ${closes}` : !holiday && m < o ? `Opens today at ${day === 0 ? '8:00' : '7:30'} am` : `Closed now, ${next}`
  return { open, text, today }
}

export const money = (n: number) => '$' + n.toFixed(2)
