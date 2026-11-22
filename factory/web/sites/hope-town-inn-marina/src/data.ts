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

export type Stay = { name: string; kind: 'Room' | 'Villa'; guests: number; ft: number; m: number; thumb: string }
const WIX = 'https://static.wixstatic.com/media/'
export const stays: Stay[] = [
  { name: 'King Bed Hotel Room', kind: 'Room', guests: 2, ft: 350, m: 33 , thumb: WIX + '512e9f_2a0d63c51a4d44808acb240e98ad84df~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/King%20Bed%20Hotel%20Room%2008%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
  { name: 'King Suite', kind: 'Room', guests: 3, ft: 450, m: 42 , thumb: WIX + '512e9f_3e789f0514fb471481910735fbe5d0fa~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/King%20Suites%2011%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
  { name: 'Double Occupancy Room', kind: 'Room', guests: 4, ft: 270, m: 25 , thumb: WIX + '512e9f_43b6b592994b4991b4f80b5c2a3074ff~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Double%20Occupancy%20Hotel%20Room%2002%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
  { name: 'Two Bedroom Garden Villa', kind: 'Villa', guests: 4, ft: 900, m: 84 , thumb: WIX + '512e9f_b9d6761afaef400899454f6f918ea4b5~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Two%20Bedroom%20Garden%20Villa%2002%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
  { name: 'Hummingbird Villa', kind: 'Villa', guests: 6, ft: 1210, m: 112 , thumb: WIX + '512e9f_e8691a10e8bd439aaaee3e90fdbdda4f~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hummingbird%20Villa%2006%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
  { name: 'Castaway Villa', kind: 'Villa', guests: 6, ft: 1210, m: 112 , thumb: WIX + '512e9f_07bf09e941144501b8b957b411c7ab41~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Castaway%20Villa%2006%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
  { name: 'Flamingo Villa', kind: 'Villa', guests: 6, ft: 1210, m: 112 , thumb: WIX + '512e9f_69916dc0b6a64cc4add1fb9c5c3d6466~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Flamingo%20Villa%2003%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
  { name: 'Oleander Villa', kind: 'Villa', guests: 8, ft: 1010, m: 94 , thumb: WIX + '512e9f_6f56ecff88394ad380554adab511f9b0~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Oleander%20Villa%2001%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
  { name: 'Areca Palm Villa', kind: 'Villa', guests: 8, ft: 1210, m: 112 , thumb: WIX + '512e9f_c09075138f6549d4bb1be9dd7782f362~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Areca%20Palm%20Villa%2001%20-%20Hope%20Town%20Inn%20And%20Marina.jpg' },
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
