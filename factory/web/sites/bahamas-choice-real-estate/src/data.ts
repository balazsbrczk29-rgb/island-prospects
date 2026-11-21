// Every fact here is from bahamaschoicerealestate.com (home, /active/, /sold/, listing #68204), checked 2026-11-21.
const IDX = (id: number, n: number) => `https://pix.idxre.com/pix/BSBREA/main/${n % 10}/${id}_${n}.jpg`;
const WP = 'https://bahamaschoicerealestate.com/wp-content/uploads/';

export const OFFICE = {
  name: 'Bahamas Choice Real Estate',
  phone: '242 677 3868',
  tel: '+12426773868',
  email: 'sales@bahamaschoicerealestate.com',
  address: 'Yamacraw Hill Road, Nassau, New Providence',
};

export const PHOTO = {
  villa: { src: WP + '2023/09/IMG_0143.jpg', w: 2048, h: 1324, alt: 'A white villa around a long pool courtyard, from the Bahamas Choice collection' },
  sunset: { src: WP + '2024/05/Sunset.jpg', w: 1600, h: 1200, alt: 'A small cay on a still sea at sunset' },
  harbour: { src: WP + '2024/05/Home-Page-Imgae-Harbour-Island.jpeg', w: 960, h: 720, alt: 'A shaded terrace and pool looking over turquoise water at Harbour Island' },
  team: { src: WP + '2026/06/welcome-photo.jpg', w: 960, h: 541, alt: 'Lana Munnings-Basalyga, and the Bahamas Choice team together at the office' },
};

export type Photo = { src: string; w: number; h: number; alt: string };
export type Listing = {
  id: number; status: 'For sale' | 'To rent' | 'Sold'; kind: 'Condo' | 'Land' | 'Rental' | 'House';
  title: string; area: string; island: string; price: string; priceNote?: string;
  facts: string[]; photos: Photo[]; photoCount: number; summary: string; source: string; page?: string;
};

const condo = (n: number, alt: string): Photo => ({ src: IDX(68204, n), w: 800, h: 1066, alt });

export const FILM = [
  { photo: condo(0, 'The white picket gate at 5 Bayview Drive under sea grape'), line: 'A white gate off Bayview Drive, under the sea grape.', note: 'Paradise Island Estates' },
  { photo: condo(1, 'The enclosed private patio with two white chairs'), line: 'An enclosed private patio, for mornings and for guests.', note: 'Fully walled, with a small garden' },
  { photo: condo(6, 'The living room with a beamed white ceiling and sheer curtains'), line: 'Inside, a beamed white ceiling and light through sheer curtains.', note: 'Fully furnished, split air conditioning' },
  { photo: condo(9, 'The white kitchen with stainless steel appliances'), line: 'A white kitchen, ready the day you arrive.', note: '2 bedrooms, 2 bathrooms, 1,226 sq ft' },
  { photo: condo(15, 'A bathroom vanity with a framed mirror and white orchids'), line: 'Two full bathrooms, one of them yours alone.', note: 'Community pool, caretaker and landscaping' },
];

export const LISTINGS: Listing[] = [
  {
    id: 68204, status: 'For sale', kind: 'Condo', title: '5 Bayview Drive', area: 'Paradise Island Estates', island: 'New Providence',
    price: '$690,000', facts: ['2 bedrooms', '2 bathrooms', '1,226 sq ft', 'Furnished', 'HOA $417'],
    photos: [0, 1, 6, 9, 15].map((n, i) => condo(n, FILM[i].photo.alt)), photoCount: 16,
    summary: 'A charming, fully furnished two-bedroom, two-bath apartment in one of Paradise Island’s most desirable residential communities: an enclosed private patio, a small garden, and a quiet, well-kept community ideal for professionals or couples.',
    source: 'https://bahamaschoicerealestate.com/homes-for-sale-details/5-BAYVIEW-DR-PARADISE-EST-5-NEW-PROVIDENCE/68204/516/', page: 'property-68204.html',
  },
  {
    id: 68126, status: 'For sale', kind: 'Land', title: 'Lot 30, Davis Street and Hawthorn', area: 'Block 1', island: 'New Providence',
    price: '$602,000', facts: ['0.909 acres', 'Lots and land'],
    photos: [{ src: IDX(68126, 0), w: 800, h: 1066, alt: 'Lot 30 Davis Street: level green land with mature trees' }, { src: IDX(68126, 1), w: 800, h: 1066, alt: 'Lot 30 Davis Street: open grass under a poinciana' }], photoCount: 7,
    summary: 'Just under an acre at Davis Street and Hawthorn, New Providence, listed as lots and land.',
    source: 'https://bahamaschoicerealestate.com/homes-for-sale-details/LOT-30-DAVIS-STREET-AND-HAWTHORN-BLOCK-1-NEW-PROVIDENCE/68126/516/', page: 'property-68126.html',
  },
  {
    id: 67126, status: 'For sale', kind: 'Land', title: 'Lot 6, Block 2', area: 'Stella Maris', island: 'Long Island',
    price: '$130,000', facts: ['0.689 acres', 'Lots and land'],
    photos: [{ src: IDX(67126, 0), w: 800, h: 533, alt: 'Lot 6 Stella Maris: coppice and a coconut palm with the sea beyond' }, { src: IDX(67126, 1), w: 800, h: 533, alt: 'Lot 6 Stella Maris: native bush and a palm under open sky' }], photoCount: 8,
    summary: 'Over two thirds of an acre at Stella Maris, Long Island, listed as lots and land.',
    source: 'https://bahamaschoicerealestate.com/homes-for-sale-details/LOT-6-BLOCK-2-STELLA-MARI-LONG-ISLAND/67126/516/', page: 'property-67126.html',
  },
  {
    id: 66392, status: 'To rent', kind: 'Rental', title: 'Bayview Drive, Unit 5', area: 'Paradise Island Estates', island: 'New Providence',
    price: '$3,800', priceNote: 'a month', facts: ['2 bedrooms', '2 bathrooms', '1,226 sq ft'],
    photos: [{ src: IDX(66392, 0), w: 800, h: 1066, alt: 'The white picket gate at Bayview Drive, Unit 5' }], photoCount: 16,
    summary: 'A two-bedroom, two-bath home of 1,226 sq ft on Bayview Drive, offered to rent.',
    source: 'https://bahamaschoicerealestate.com/homes-for-sale-details/BAYVIEW-DRIVE-UNIT-5-NEW-PROVIDENCE/66392/516/', page: 'property-66392.html',
  },
  {
    id: 51845, status: 'Sold', kind: 'House', title: '76 Lumumba Road', area: 'Nassau', island: 'New Providence',
    price: '$315,000', priceNote: 'list price', facts: ['3 bedrooms', '2 bathrooms'], photos: [], photoCount: 27,
    summary: 'A three-bedroom house, sold.', source: 'https://bahamaschoicerealestate.com/sold/',
  },
];

export const ISLANDS: { name: string; places: string[] }[] = [
  { name: 'New Providence and Paradise Island', places: ['Downtown', 'Eastern Road', 'Love Beach', 'Lyford Cay', 'Old Fort Bay', 'Paradise Island', 'West Bay Street'] },
  { name: 'Eleuthera', places: ['Current', 'Governor’s Harbour', 'Gregory Town', 'Harbour Island', 'Rock Sound', 'Spanish Wells', 'Windermere Island'] },
  { name: 'Great Exuma and Little Exuma', places: ['Emerald Bay', 'Farmer’s Hill', 'George Town', 'Jimmy Hill', 'Moss Town', 'Stocking Island'] },
  { name: 'Great Abaco and Little Abaco', places: ['Cedar Harbour', 'Cooper’s Town', 'Elbow Cay', 'Green Turtle Cay', 'Hope Town', 'Marsh Harbour', 'Treasure Cay'] },
  { name: 'Grand Bahama and Freeport', places: ['Bahamia', 'Bootle Bay', 'Civic Industrial Area', 'Eight Mile Rock', 'Fortune Bay', 'Lucaya', 'Sweetings Cay'] },
  { name: 'Andros', places: ['Cargill Creek', 'Congo Town', 'Kamalame Cay', 'Kemp’s Bay', 'Mangrove Cay', 'Nicholl’s Town', 'Staniard Creek'] },
  { name: 'Long Island', places: ['Burnt Ground', 'Cape Santa Maria', 'Deadman’s Cay', 'Deans', 'Lochabar', 'Stella Maris'] },
  { name: 'Bimini', places: ['Alice Town', 'Bailey Town', 'Bimini Bay', 'Cat Cay', 'North Bimini', 'South Bimini'] },
  { name: 'Cat Island and Cat Cay', places: ['Arthur’s Town', 'Bennett’s Harbour', 'New Bight', 'Orange Creek', 'Port Howe', 'Tea Bay'] },
  { name: 'Acklins and Crooked Island', places: ['Spring Point', 'Lovely Bay', 'Delectable Bay', 'Colonel Hill', 'French Wells', 'Landrail Point', 'Major’s Cay', 'Moss Town'] },
  { name: 'Berry Islands', places: ['Great Harbour Cay'] },
  { name: 'San Salvador', places: [] },
  { name: 'Rum Cay', places: [] },
  { name: 'Inagua', places: [] },
  { name: 'Mayaguana', places: [] },
  { name: 'Ragged Island', places: [] },
];

export const TEAM = [
  { name: 'Lana Munnings-Basalyga', role: 'Principal Broker, BREA licence 480', phone: '242 357 7698', tel: '+12423577698', email: 'lana@bahamaschoice.com' },
  { name: 'Greg Munnings', role: 'Estate Agent', phone: '242 556 5102', tel: '+12425565102' },
  { name: 'Sherry Morris', role: '', phone: '242 424 1861', tel: '+12424241861' },
  { name: 'Erica Pinder', role: '', phone: '242 457 0248', tel: '+12424570248' },
];

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/bahamaschoice.realestate/' },
  { label: 'Facebook', href: 'https://www.facebook.com/BahamaChoiceRealEstate' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/bahamas-choice-real-estate/' },
];
