const U = 'https://www.swainscaylodge.com/wp-content/uploads/2026/09/'
export type Pic = { src: string; w: number; h: number; alt: string }
const p = (src: string, w: number, h: number, alt: string): Pic => ({ src: U + src, w, h, alt })

export const IMG = {
  hero: p('swainscaylodge-header.jpg', 1920, 1080, "Swain's Cay Lodge on the beach at Mangrove Cay, Andros"),
  welcome: p('welcome-landscape.jpg', 1600, 900, "The beach in front of Swain's Cay Lodge"),
  dining: p('dinig1.jpg', 1600, 1067, 'Reefside Restaurant and Bar on the beach'),
  fg1: p('fishing-gallery1-1024x597.jpg', 1024, 597, 'Fishing at Swain\'s Cay Lodge, from their gallery'),
  fg2: p('fishing-gallery2-1024x590.jpg', 1024, 590, 'Fishing at Swain\'s Cay Lodge, from their gallery'),
  fg3: p('fishing-gallery3-1024x590.jpg', 1024, 590, 'Fishing at Swain\'s Cay Lodge, from their gallery'),
  fg4: p('fishing-gallery4-1024x700.jpg', 1024, 700, 'Fishing at Swain\'s Cay Lodge, from their gallery'),
  fishing: p('bahamas-fishing.jpg', 1600, 900, 'Bonefishing from Swain\'s Cay Lodge, Andros'),
  h1: p('header1.jpg', 1920, 1080, 'Mangrove Cay, Andros, from Swain\'s Cay Lodge'),
  fg5: p('fishing-gallery5-1024x700.jpg', 1024, 700, 'Fishing at Swain\'s Cay Lodge, from their gallery'),
  // full-size originals; native sizes not published, declared at the 1024 gallery width and shown no wider than 760 px
  fg6: p('fishing-gallery6.jpg', 1024, 683, 'Fishing at Swain\'s Cay Lodge, from their gallery'),
  fg7: p('fishing-gallery7.jpg', 1024, 683, 'Fishing at Swain\'s Cay Lodge, from their gallery'),
  fg8: p('fishing-gallery8.jpg', 1024, 683, 'Fishing at Swain\'s Cay Lodge, from their gallery'),
  spear: p('spear-fishing.png', 800, 600, 'Spearfishing scenes from Swain\'s Cay Lodge'),
}

export const GALLERY = [IMG.fg6, IMG.fg7, IMG.fg8]

export const FAQ: [string, string][] = [
  ['What types of fishing are available at Swain\u2019s Cay Lodge?', 'Bonefishing, deep-sea fishing, reef fishing and spearfishing, all suited to the fishing grounds around Mangrove Cay and Andros.'],
  ['Do I need a guide to go bonefishing?', 'Not necessarily. The lodge works with handpicked local guides on the South and Middle Bight, and there is a wadeable bonefish flat right off the beach if you would like to fish on your own.'],
  ['What fish can I expect on a deep-sea trip?', 'Just outside the Andros Barrier Reef the depth drops quickly, which suits large pelagic fish such as wahoo, dolphin fish, tuna and billfish.'],
  ['What is caught while reef fishing?', 'Guests fishing the barrier reef with local guides typically catch yellowtail snapper, Nassau grouper, triggerfish, barracuda, reef sharks and porgy.'],
  ['Is spearfishing suitable for beginners?', 'Yes. The team can arrange guided spearfishing tours and lessons for guests who are new to it.'],
  ['Can fishing be combined with other things?', 'Yes. Many guests combine fishing with kayaking, snorkelling, cycling or exploring Mangrove Cay.'],
  ['Can the lodge tailor a package?', 'Yes. Call +1 (242) 422-5018 or +1 (242) 369-0296, or email fish@swainscaylodge.com, for tailored packages, extra non-guided days or self-guided packages.'],
]

export const BOOK = 'https://www.swainscaylodge.com/#booking'
export const EMAIL = 'fish@swainscaylodge.com'
export const PHONES = [['+1 (242) 422-5018', 'tel:+12424225018'], ['+1 (242) 369-0296', 'tel:+12423690296']] as const
export const LICENCE = 'https://license.gooutdoorsbahamas.com'
export const FB = 'https://www.facebook.com/swainscaylodge/'

export type Water = { k: string; name: string; method: string; species: string; note: string; pic: Pic }
export const WATERS: Water[] = [
  { k: 'home', name: 'The home flat', method: 'Wade it, right off the lodge beach', species: 'Bonefish', note: 'A wadeable bonefish flat right off the lodge beach.', pic: IMG.fg3 },
  { k: 'middle', name: 'The Middle Bight', method: 'Guided skiff, two anglers a boat', species: 'Bonefish', note: 'Mangrove Cay sits between the bights, so the lodge can fish the Middle Bight or the South Bight with handpicked local independent guides.', pic: IMG.fg2 },
  { k: 'south', name: 'The South Bight', method: 'Guided skiff, two anglers a boat', species: 'Bonefish', note: 'The other side of the cay: airport and dock transfers to either bight are part of the package.', pic: IMG.fg1 },
  { k: 'reef', name: 'The Andros Barrier Reef', method: 'Reef fishing, spearfishing tours and lessons', species: 'Yellowtail snapper, Nassau grouper, triggerfish, barracuda, reef sharks, porgy', note: '140 miles long, and less than a mile from shore in most places.', pic: IMG.fg4 },
  { k: 'deep', name: 'Outside the reef', method: 'Deep sea fishing', species: 'Wahoo, dolphin fish, tuna, billfish', note: 'Beyond the reef the depth drops to 6,000 feet.', pic: IMG.fg5 },
]

export const ROOMS = [
  { name: 'Duplex Apartment', d: 'Three double bedrooms, a kitchenette, a dining area and a furnished terrace.', pic: p('live-duplex-1024x540.jpg', 1024, 540, 'The Duplex Apartment') },
  { name: 'Ocean View Room', d: 'En-suite bathroom, air conditioning, a furnished patio and Wi-Fi.', pic: p('live-ovr-1024x540.jpg', 1024, 540, 'An Ocean View Room') },
  { name: 'Ocean View Suite', d: 'En-suite bathroom, air conditioning, a furnished patio and Wi-Fi.', pic: p('live-ovs-1024x540.jpg', 1024, 540, 'An Ocean View Suite') },
  { name: 'Beach Front Suite', d: 'En-suite bathroom, air conditioning, a furnished patio and Wi-Fi, on the beach.', pic: p('live-bfs-1024x540.jpg', 1024, 540, 'A Beach Front Suite') },
]

export const INCLUDED = ['Guide and boat, up to two anglers a boat', 'Your room', 'All meals and water', 'Airport and dock transfers, Middle or South Bight', 'Wi-Fi and amenities', 'Levies']
export const EXCLUDED = ['Airfare to and from Nassau', 'Alcohol and sodas', 'Gratuities', 'Gear and flies', '10% VAT outside packages', 'Fishing licences']

export const REVIEWS = [
  { by: 'Jim C', date: '4/28/2026', q: 'We made our 4th trip in March. Swains is so comfortable that it’s starting to feel like home. Cheryl and her team are all wonderful people, as are the guides and all the other people on Mangrove Cay. The bonefishing is amazing, but practice casting in the wind before you arrive. We can’t wait to return!' },
  { by: 'Suzanne D', date: '4/25/2026', q: 'The Swain’s Cay lodge was the perfect location for my husband\'s 60th birthday trip. The team is amazing - so personable and accommodating. They felt like family. Fishing was amazing, great guides. Great amenities at the lodge if you need a break from fishing. Cheryl and her staff are delightful. Highly recommend the lodge for all anglers and their partners.' },
  { by: 'Ben Slayton', date: '4/29/2026', q: 'This was my second year staying at Swain’s Cay and it was fantastic as expected. From the service, to the prices, the fishing, and the food, everything was just about as good as you can get. Cheryl and her staff are all awesome. I will be returning for years to come!' },
  { by: 'Vacation638584', date: '4/13/2026', q: 'Outstanding fly fishing experience with the guides organized by the lodge. Food was excellent and the lodge well organized and efficiently run. We were a group of 6 on our second time there and will return' },
  { by: 'JJ M', date: '7/22/2025', q: 'Cheryl runs a tight ship and will treat you like family. Food and lodging first class. The lodge is set on amazing beach with a wonderful staff. My son and I had a great experience, caught plenty of bones and met some great folks. Cheryl, we will be back!' },
]

const DATES = 'Book 1 July 2026 to 30 June 2027; travel 5 July 2026 to 31 October 2027'
const BLACK = 'Blackout 26 to 28 November 2026, 19 December 2026 to 1 January 2027, 25 to 28 March 2027, 1 to 4 July 2027'
export const OFFERS = [
  { t: 'Bahamas residents fly or cruise free from Nassau', d: 'One free airline or Bahamas Ferries ticket from Nassau for a pre-booked 2-night stay, or two for 4 nights or longer, plus your individual hotel offer.', when: `${DATES}. ${BLACK}.` },
  { t: 'Private pilots: $300 fee credit', d: 'For a stay of 4 nights or longer; $150 for a pre-booked 2-night stay.', when: `${DATES}. ${BLACK}.` },
  { t: 'Residents of Europe and Latin America: fly free from Nassau', d: 'One free round-trip airline ticket from Nassau for a pre-booked air-inclusive 4 to 6 night stay, two for 7 nights. Latin America: Argentina, Brazil, Colombia and Mexico.', when: 'Book 1 July 2026 to 30 June 2027; travel 2 July 2026 to 31 October 2027. No blackout dates.' },
  { t: 'Up to $250 air or ferry credit from Florida', d: 'For a pre-booked air or ferry-inclusive package of 4 nights or longer.', when: `Book 1 November 2026 to 31 January 2027; travel 2 November 2026 to 31 October 2027. ${BLACK}.` },
]

export const money = (v: number) => '$' + Math.round(v).toLocaleString('en-US')
