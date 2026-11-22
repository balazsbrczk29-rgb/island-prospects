// Facts from fernandezbayvillage.com (home, cottages, villas, dining, clubhouse, activities, gettinghere, contact).
const B = 'https://images.squarespace-cdn.com/content/v1/64f009b8e4a9e046e2b1a2c9/'
/** Squarespace serves sized variants; never above the 2500 px originals. */
export const sq = (path: string, w = 1500) => `${B}${path}?format=${w}w`

export const BIZ = {
  name: 'Fernandez Bay Village',
  phone: '+1 (954) 302-7422', tel: '+19543027422',
  whatsapp: '1 (242) 808-5711', wa: '12428085711',
  email: 'reservations@fernandezbayvillage.com',
  booking: 'https://fernandezbayvillage.client.innroad.com/',
  facebook: 'https://www.facebook.com/fernandezbayvillage/',
  instagram: 'https://www.instagram.com/fernandezbayvillageresort/',
}

export type Frame = { id: string; chapter: string; line: string; img: string; w: number; h: number; alt: string; pos?: string }
export const FILM: Frame[] = [
  { id: 'breakfast', chapter: 'Breakfast', line: 'Hot breakfast $20 or continental $10, on the patio over the bay, with free coffee all day at the Clubhouse.', img: '2dfc3374-6913-4818-901a-266e0b3d2e41/complete+breakfast.jpg', w: 1000, h: 667, alt: 'A full hot breakfast plate at the Clubhouse', pos: '50% 50%' },
  { id: 'water', chapter: 'The water', line: 'Kayaks and paddleboards for the calm bay and the creek. The front desk has the map to the Boiling Hole.', img: 'fe6f4fea-aa9b-4dc1-9ec7-03689166c193/5T1A8209.jpg', w: 2500, h: 1667, alt: 'Yellow kayaks pulled up on the beach at Fernandez Bay under a pink morning sky', pos: '50% 60%' },
  { id: 'island', chapter: 'The island', line: 'Drive the Queen\u2019s Highway to The Hermitage, or go shelling, sea-glassing and into the mangroves with a local guide.', img: 'c20ffc5a-e206-4fea-b898-fb49a13b3a41/5T1A8430.jpg', w: 2500, h: 1667, alt: 'The stone Hermitage on Cat Island against a blue sky', pos: '50% 45%' },
  { id: 'tiki', chapter: 'The Tiki Bar', line: 'Lunch runs $8 to $18, conch burgers, fritters and grilled fish. The Tiki Bar brings your drink to the sand.', img: 'dbaf91be-dc01-4852-8145-dddfa5c6394a/5T1A8406.jpg', w: 2500, h: 1667, alt: 'A red cocktail and a pina colada on the Tiki Bar counter under string lights', pos: '50% 55%' },
  { id: 'dinner', chapter: 'Dinner', line: 'Dinner is $48 a person: appetizers, a meat and a seafood, sides, dessert and coffee, indoors or by the sea.', img: '018d16b7-bbe6-48f2-b013-b3cc1bc49490/mahi.jpg', w: 1000, h: 667, alt: 'Grilled mahi plated for dinner at the Clubhouse', pos: '50% 50%' },
  { id: 'bonfire', chapter: 'The bonfire', line: 'Then the bonfire on the beach, and the walk back to a cottage that faces the water.', img: '9202e27f-5c59-425e-ac55-b53ed8c7a80d/5T1A7819-2.jpg', w: 2500, h: 1667, alt: 'Palms and a cottage over the beach at sunset, pink sky over the bay', pos: '50% 55%' },
]

export const HERO = { img: '4d8b8a60-415b-49d4-a650-b2068cd4f231/5T1A8323.jpg', w: 2500, h: 1667, alt: 'Fernandez Bay seen through sea grape leaves, white sand and calm turquoise water' }

export type Stay = { id: string; name: string; kind: 'cottage' | 'villa'; bed: string; notes: string[]; img?: string; alt?: string; pair?: string; setting: string }
export const STAYS: Stay[] = [
  { id: 'shane', setting: 'Water\u2019s edge, 180 degree beach view', name: 'Shane’s Shack', kind: 'cottage', bed: 'King', notes: ['At the water’s edge, 180 degree beach view', 'Oceanfront private terrace', 'Garden shower', 'Steps from the Clubhouse'], img: 'e61c5395-c1e9-4699-a10a-06406e942657/5T1A7817.jpg', alt: 'Porch of Shane’s Shack facing the beach' },
  { id: 'coconut', setting: 'Ocean view, private patio', name: 'Coconut Palm', kind: 'cottage', bed: 'King', notes: ['High ceilings, garden bath, walk-in closet', 'Private patio, ocean view'], pair: 'royal', img: '5b834ec6-d722-4203-8844-e078391dbdbd/5T1A8392.jpg', alt: 'Stone patio with a wooden chair at Coconut Palm' },
  { id: 'royal', setting: 'Wrap-around porch', name: 'Royal Palm', kind: 'cottage', bed: 'King', notes: ['Wrap-around porch', 'One of the most popular cottages'], pair: 'coconut', img: '899e33a9-fbb1-43bb-bef2-e705cda259b9/5T1A8089.jpg', alt: 'King bed in Royal Palm cottage with stone walls' },
  { id: 'travelers', setting: 'Ocean view, private patio', name: 'Traveler’s Palm', kind: 'cottage', bed: 'King', notes: ['Private patio, ocean view'], pair: 'tamarind', img: 'd96a708f-3acc-42bf-bd4d-7503435a97a0/5T1A8094.jpg', alt: 'King bed in Traveler’s Palm cottage' },
  { id: 'tamarind', setting: 'Ocean view, next to the Clubhouse', name: 'Tamarind Suite', kind: 'cottage', bed: 'Queen', notes: ['Private patio, ocean view', 'Next to the Clubhouse'], pair: 'travelers', img: 'cecca38d-b3ed-4338-88a9-3be42aa38027/5T1A8099.jpg', alt: 'Queen bed in the Tamarind Suite' },
  { id: 'seabreeze', setting: 'Ocean view', name: 'Seabreeze', kind: 'cottage', bed: 'King', notes: ['Stone patio with umbrella table', 'Ocean view'], img: '22bb62bb-9078-4e8f-b5fa-1c1e28f51478/5T1A8106.jpg', alt: 'King bed in Seabreeze cottage' },
  { id: 'reefs', setting: 'Ocean view, private patio', name: 'Reefs Room', kind: 'cottage', bed: 'Queen', notes: ['Rustic garden bath', 'Private patio, ocean view'], img: 'a2b29524-9936-4d98-ab32-3085efce002b/5T1A8131.jpg', alt: 'Queen bed in the Reefs Room' },
  { id: 'caretaker', setting: 'Private terrace, a short walk to the beach', name: 'Caretaker’s Cottage', kind: 'cottage', bed: '', notes: ['Walk-in closet, garden bath', 'Private terrace, a short walk to the beach'], img: 'a6a0f15b-0f1b-4bd0-8429-1c65be361a48/5T1A8120.jpg', alt: 'Bedroom of the Caretaker’s Cottage' },
  { id: 'beachhouse', setting: 'On the beach', name: 'The Beach House', kind: 'villa', bed: 'Two bedrooms', notes: ['Large common room and full kitchen', 'Made for more than one family', 'Garden bathrooms'], img: '6d49c75d-e5f2-440e-8b7b-13dbda44d942/5T1A7792.jpg', alt: 'An open-air garden shower in stone walls with the sea beyond' },
  { id: 'manor', setting: 'Beach access', name: 'The Manor House', kind: 'villa', bed: 'Four bedrooms', notes: ['Large common room and full kitchen', 'Open-air showers', 'Beach access'], img: 'ef1997c4-cfdf-438b-933c-6fd66411ddde/5T1A7736.jpg', alt: 'The Manor House sitting room with rattan sofas and tall windows' },
]

export type PartyId = 'two' | 'family' | 'friends'
export const PARTIES: { id: PartyId; label: string; guests: number; groups: string[][]; count: (n: number) => string; wa: string }[] = [
  { id: 'two', label: 'Two of us', guests: 2, groups: [['shane'], ['coconut'], ['royal'], ['seabreeze'], ['travelers']], count: () => 'Five king cottages fit the two of you', wa: 'two of us' },
  { id: 'family', label: 'A family', guests: 4, groups: [['coconut', 'royal'], ['travelers', 'tamarind'], ['beachhouse']], count: () => 'Two adjoining pairs and the Beach House fit a family', wa: 'a family' },
  { id: 'friends', label: 'Friends together', guests: 6, groups: [['manor'], ['beachhouse']], count: () => 'Both villas take a group, each with a full kitchen', wa: 'a group of friends' },
]

export type FromId = 'fll' | 'nas' | 'own'
export const ROUTES: { id: FromId; label: string; from: string; carrier: string; how: string; perk?: string; wa: string }[] = [
  { id: 'fll', label: 'Fort Lauderdale', from: 'From Fort Lauderdale', carrier: 'Makers Air', how: 'From Fort Lauderdale Executive (FXE) straight to New Bight (MYCB).', perk: '10% off for Fernandez Bay guests', wa: 'from Fort Lauderdale' },
  { id: 'nas', label: 'Nassau', from: 'From Nassau', carrier: 'Western Air', how: 'Three times a week, about thirty minutes on a 50-seat jet.', wa: 'from Nassau' },
  { id: 'own', label: 'Own plane', from: 'Your own plane', carrier: 'New Bight (MYCB)', how: '5,000 ft paved runway, VFR, customs 9:00 am to 5:00 pm.', perk: '15% off your stay with the code PILOT', wa: 'our own plane' },
]

export const MEALS = { hot: 20, continental: 10, dinner: 48 }

export const CREDITS: [string, string[]][] = [
  ['Eating', ['Hot breakfast $20, continental $10', 'Lunch $8 to $18: conch burgers, fritters, grilled fish', 'Dinner $48 a person, then the bonfire', 'Indoor and seaside tables']],
  ['The Clubhouse', ['Tiki Bar on the beach', 'Dining room and patio over the bay', 'Boutique: gifts, beachwear, ice cream', 'Free WiFi and coffee']],
  ['On the water', ['Kayaks and paddleboards', '13 ft Whaler to rent', 'Snorkelling the bay’s little cays', 'Fishing guide, seasonal catamaran charters']],
  ['Ashore', ['A mile of white sand', 'Massage, booked at the front desk', 'Island tours to The Hermitage', 'Mangrove eco tours']],
]
