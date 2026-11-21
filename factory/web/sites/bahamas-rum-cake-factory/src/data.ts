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

export const shop = {
  address: '602 East Bay Street, Nassau',
  phone: { label: '(242) 328-3750', tel: '+12423283750' },
  hours: 'Opens 7:30 am Monday to Saturday, 8 am Sunday',
}

export const money = (n: number) => '$' + n.toFixed(2)
