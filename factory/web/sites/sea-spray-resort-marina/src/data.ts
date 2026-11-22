// Facts from seasprayresort.com (home, /marina), checked 2026-11-21; history from All At Sea (Dec 2023).
const CDN = 'https://cdn.prod.website-files.com/69b32130352088b69e1d25ba/';
const CDN2 = 'https://cdn.prod.website-files.com/69b32130352088b69e1d25c2/';
export type Photo = { src: string; w: number; h: number; alt: string };
export const P = {
  sound: { src: CDN + '69fcb812342041920a0f7e5c_CR2A2252.jpg', w: 8029, h: 5355, alt: 'Sportfishing boats tied up along the Sea Spray docks, reflected in the still water of White Sound' },
  fleet: { src: CDN + '69fcfb6445a534945cb78c65_CR2A4342.jpg', w: 8192, h: 5464, alt: 'Four sportfishing boats running out side by side across open water' },
  docks: { src: CDN + '69fcfd9590d809d698b7dd0a_G65A0686.jpg', w: 3447, h: 5171, alt: 'A palm leaning over the Sea Spray docks, sportfishers in their slips' },
  dusk: { src: CDN + '69fcfeddb00179be987e0394_CR2A1240.jpg', w: 4754, h: 7128, alt: 'A sportfisher underway at dusk' },
  bar: { src: CDN2 + '6a26e5ae99ba0cb51c988dd1_G65A5816.jpg', w: 5331, h: 3554, alt: 'The Sea Spray bar busy at golden hour under the palms' },
  junkanoo: { src: CDN2 + '6a26e4f80b8c22026f56c249_CR2A5845.jpg', w: 8021, h: 5350, alt: 'A Junkanoo group in feathered costume playing at the bar on a Thursday night' },
  lunch: { src: CDN2 + '69fd070958b0094943ee4fbb_G65A2232.jpg', w: 5472, h: 3648, alt: 'Friends at lunch under umbrellas beside the marina' },
  beach: { src: CDN + '69fcfb9d1bc1fbaab017e899_G65A0914.jpg', w: 5435, h: 3623, alt: 'Surf rolling onto a white sand beach' },
  award: { src: CDN + '69fcfe64a1221449682483d3_boaters-choice-2025-417209f48527c94eb36517038b6da4f10c403a2853da436bfd8fdf6dbf7293fb.png', w: 600, h: 453, alt: 'Boaters’ Choice 2025 badge from marinas.com' },
};

export const CONTACT = {
  phone: '+1 242 577 4696', tel: '+12425774696', wa: '12425774696', vhf: 'VHF 16',
  place: 'White Sound, Elbow Cay, Abaco, The Bahamas', map: 'https://maps.app.goo.gl/66dEiQSsGLv4FZzr7',
  stay: 'https://seasprayresortandvillas.guestybookings.com/en',
  order: 'https://seasprayresortandvillas.revelup.online/store/1',
  slip: 'https://seasprayresort.com/marina/book-a-slip',
  sales: 'https://cdn.prod.website-files.com/69b32130352088b69e1d25ba/6a2038e2edec7d0a2a5f9f06_Sea%20Spray%20-%20Sales%20Package%202026.pdf',
  residences: 'https://seasprayresort.com/stay/1',
};

export const LIMITS = { minLoa: 20, maxLoa: 130, maxDraft: 7, slips: 62 };

// Published rates per foot per night. High: Mar 1 to Aug 31. Low: Sep 1 to Feb 28.
export const RATES = {
  high: { nightly: 5.65, d30: 4.45, d90: 3.75 as number | null, annual: 1.25 },
  low: { nightly: 3.65, d30: 2.75, d90: null as number | null, annual: 1.25 },
};

export const SPECS: [string, string][] = [
  ['Slips', '62'],
  ['Length', '20 to 130 ft'],
  ['Draft', 'Up to 7 ft'],
  ['Fuel', 'Gas and diesel'],
  ['Power', '30, 50 and 100 amp, daily minimums apply'],
  ['Water', '$0.40 a gallon'],
  ['Bait', 'Ballyhoo, chum block, squid and shrimp'],
  ['Ice', 'At the dock'],
  ['Ashore', 'Restrooms and showers, trash pick-up, wifi at the marina office'],
  ['Radio', 'VHF channel 16'],
];

// Residences, as published on seasprayresort.com (Sales Package 2026).
export const HOMES: { name: string; spec: string; from: string; ocean?: string }[] = [
  { name: 'Oceanfront home', spec: '6 bed, 6.5 bath, 3,879 sq ft, private pool', from: '$5,999,500' },
  { name: 'Marina View Cottage, Plan A', spec: '3 bed, 3.5 bath, 2,264 sq ft', from: '$3,050,000', ocean: '$4,050,000' },
  { name: 'Marina View Cottage, Plan B', spec: '3 bed (4-bed option), 3.5 bath, 2,492 sq ft', from: '$3,300,000', ocean: '$4,250,000' },
]
