export const M = 'https://symphony.cdn.tambourine.com/_fusion/cape-santa-maria-resort/media/'
export const BOOK = 'https://www.bookonthenet.net/west/premium/eresmain.aspx?&id=tUUp8oO%2bGEBnwXEl4XQtEH67d%2f2EHxOV8ZmT3V4U8tI%3d'
export const contact = { email: 'resort@capesantamaria.com', tollfree: { label: '+1 800-926-9704', tel: '+18009269704' }, local: { label: '+1 242-338-5273', tel: '+12423385273' }, address: "PO Box L.I. 30-117, Seymour's, Long Island, Bahamas" }

export const P = {
  aerial: { src: 'capesantamariaresort-homepage-gallery-4-6682c3d969dbe.jpg', alt: 'Aerial view of the white bungalows lining Cape Santa Maria beach on Long Island, turquoise water beside them' },
  beach: { src: 'capesantamariaresort-whatguestslovemost-awardwinningbeach-6675955b77bd6.jpg', alt: 'The long white curve of Cape Santa Maria beach with the bungalows behind the palms' },
  bar: { src: 'capesantamariaresort-homepage-gallery-1-6675a03c664d7.jpg', alt: 'The Beach House bar with blue and white tiled floor and windows to the sea' },
  salad: { src: 'capesantamariaresort-homepage-gallery-2-6675a03e155ad.jpg', alt: 'A salad with avocado and tomato on a white plate' },
  paddle: { src: 'capesantamariaresort-homepage-gallery-3-6675a03f6b304.jpg', alt: 'A guest paddleboarding with a dog in the shallow turquoise water off the beach' },
  fishing: { src: 'capesantamariabeachresortbahamas-homepage-gallery-02-669182d99e69c.jpg', alt: 'Two anglers casting from the bow of a boat on the flats' },
  villa: { src: 'capesantamariabeachresortbahamas-homepage-gallery-03-669182dac3ca5.jpg', alt: 'A beachfront villa living room with sea views through the windows' },
  bungalow: { src: 'capesantamariabeachresortbahamas-homepage-gallery-04-669182dc0bc3b.jpg', alt: 'A bungalow bedroom in pale blue with white beds and a straw hat' },
  scuba: { src: 'capesantamariaresort-activities-scubadiving-05-66e896659e06e.jpg', alt: 'A diver among orange reef fish and coral' },
  coast: { src: 'capesantamariaresort-whatguestslovemost-nonstopflightsfromfortlauderdale-667595ee6a6b3.jpg', alt: 'The rocky green coast of Long Island above deep blue water' },
}

export const rooms = [
  { name: 'Beachfront Bungalow', size: '400 sq ft', beds: '1 king', sleeps: 'One bedroom', notes: 'Private veranda for the sunsets, Italian tile, ceiling fans, small fridge, safe.', pic: 'bungalow' as const },
  { name: 'Two-Bedroom Beachfront Bungalow', size: '580 sq ft', beds: '1 king or 2 queens, plus 2 twins', sleeps: 'Two bedrooms', notes: 'Furnished veranda on the beach.', pic: 'bungalow' as const },
  { name: 'Beachfront Villa', size: '1,800 sq ft', beds: '1 king and 2 queens', sleeps: 'Two bedrooms', notes: 'West-facing windows, full kitchen, jetted tubs, washer and dryer, smart TV; sleeper sofa in select units.', pic: 'villa' as const },
]

export const ROUTES = [
  { k: 'fll', label: 'Fort Lauderdale', line: 'fly Makers Air nonstop from Fort Lauderdale Executive (FXE) to Stella Maris on Sundays, Tuesdays and Thursdays, and the resort arranges your taxi from the airport.', steps: [['Fort Lauderdale Executive (FXE)', 'Makers Air, nonstop'], ['Stella Maris Airport (SML)', 'Sundays, Tuesdays and Thursdays'], ['Taxi to the resort', 'Arranged by the resort']] },
  { k: 'nas', label: 'Nassau', line: 'take Bahamasair or Stella Maris Air Service, (242) 338-2050, to Stella Maris, then the taxi the resort arranges.', steps: [['Nassau (NAS)', 'Connect from your international flight'], ['Bahamasair or Stella Maris Air Service', 'Per-seat or charter, (242) 338-2050'], ['Stella Maris Airport (SML)', 'Taxi to the resort']] },
  { k: 'ggt', label: 'George Town, Exuma', line: 'charter with Island Wings, (242) 472-8888, or ride the Sheep Runner ferry on Mondays, Wednesdays and Fridays to Long Island.', steps: [['George Town, Exuma (GGT)', 'Island Wings charter, (242) 472-8888'], ['Or the Sheep Runner ferry', 'Mondays, Wednesdays and Fridays to Long Island Harbour Club'], ['Taxi to the resort', 'On Long Island']] },
  { k: 'own', label: 'your own plane', line: 'land at Stella Maris, which has fuel and customs, and call ahead: private pilots get 15% off accommodation (blackout dates apply).', steps: [['Stella Maris Airport (SML)', 'Fueling and customs on the field'], ['Call ahead', '15% off accommodation for private pilots, by phone'], ['Taxi to the resort', 'Arranged by the resort']] },
  { k: 'sea', label: 'Nassau by seaplane', line: 'Seaplane Safaris flies from Nassau and lands right at Cape Santa Maria beach.', steps: [['Nassau', 'Seaplane Safaris'], ['Cape Santa Maria beach', 'Landing at the resort'], ['Step ashore', 'No taxi needed']] },
]
