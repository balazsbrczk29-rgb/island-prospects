// Every photograph on the site, with its true source. Commons files are credited on the page.
// "generated" files are illustrative photography from the Lovable asset studio: replace with the club's own.
export type Img = { src: string; w: number; h: number; alt: string; caption: string; credit: string; source: 'commons' | 'generated' };

const L = 'https://ip-assets-bell-channel-club-marina.lovable.app/assets/';
const GEN = 'Illustrative photograph, to be replaced with the club’s own';

export const IMG = {
  marinaPano: {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Port_Lucaya_Marina_-_panoramio.jpg/3840px-Port_Lucaya_Marina_-_panoramio.jpg',
    w: 3840, h: 1920, source: 'commons',
    alt: 'Boats moored at Port Lucaya Marina under a wide blue sky, Grand Bahama',
    caption: 'Port Lucaya Marina, at the head of the inlet the club looks across.',
    credit: 'Photo: qwesy qwesy, CC BY 3.0, via Wikimedia Commons',
  },
  marinaPano2: {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Port_Lucaya_Marina_-_panoramio_%281%29.jpg/3840px-Port_Lucaya_Marina_-_panoramio_%281%29.jpg',
    w: 3840, h: 1920, source: 'commons',
    alt: 'Panorama of yachts and docks at Port Lucaya Marina',
    caption: 'The marinas of Lucaya, a short run up the channel.',
    credit: 'Photo: qwesy qwesy, CC BY 3.0, via Wikimedia Commons',
  },
  marketplace: {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Port_Lucaya_Marina_%5E_Marketplace_-_panoramio.jpg/3840px-Port_Lucaya_Marina_%5E_Marketplace_-_panoramio.jpg',
    w: 3840, h: 2778, source: 'commons',
    alt: 'Port Lucaya Marina with the Marketplace buildings behind the docks',
    caption: 'Port Lucaya Marketplace, the far shore of the view from the club.',
    credit: 'Photo: qwesy qwesy, CC BY 3.0, via Wikimedia Commons',
  },
  beach: {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/LucayaBeach.JPG/3840px-LucayaBeach.JPG',
    w: 3840, h: 2880, source: 'commons',
    alt: 'Pale sand and clear turquoise water at Port Lucaya Beach',
    caption: 'Lucaya’s beach, the other water at Bell Channel.',
    credit: 'Photo: Pietro, CC BY-SA 3.0, via Wikimedia Commons',
  },
  beach2: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Port_Lucaya_Beach_-_panoramio.jpg',
    w: 3264, h: 2448, source: 'commons',
    alt: 'Shallow clear water lapping a sandy beach at Lucaya',
    caption: 'Morning water off Lucaya.',
    credit: 'Photo: Pietro Valocchi, CC BY 3.0, via Wikimedia Commons',
  },
  steps: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Stone_steps_1%2C_Lucaya_Beach%2C_Freeport%2C_Bahamas.jpg',
    w: 3456, h: 4608, source: 'commons',
    alt: 'Weathered stone steps leading down to the sand at Lucaya Beach',
    caption: 'Stone steps down to Lucaya Beach.',
    credit: 'Photo: Beyond My Ken, CC BY-SA 4.0, via Wikimedia Commons',
  },
  bank: {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Grand_Bahama_Island_%28Little_Bahama_Bank%29_1.jpg/3840px-Grand_Bahama_Island_%28Little_Bahama_Bank%29_1.jpg',
    w: 3840, h: 2560, source: 'commons',
    alt: 'Aerial view of Grand Bahama and the pale shallows of the Little Bahama Bank',
    caption: 'Grand Bahama and the Little Bahama Bank from the air.',
    credit: 'Photo: James St. John, CC BY-SA 4.0, via Wikimedia Commons',
  },
  orbit: {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/EFS_highres_STS091_STS091-731-32.JPG/3840px-EFS_highres_STS091_STS091-731-32.JPG',
    w: 3840, h: 2520, source: 'commons',
    alt: 'Freeport and Lucaya on Grand Bahama photographed from the Space Shuttle',
    caption: 'Freeport and Lucaya from the Space Shuttle, June 1998.',
    credit: 'Photo: NASA, public domain, via Wikimedia Commons',
  },
  dockline: { src: L + 'dockline-bluehour.jpg', w: 1800, h: 1200, source: 'generated', alt: 'A white mooring line wrapped on a steel cleat at a canal wall at blue hour', caption: 'Made fast for the evening.', credit: GEN },
  canal: { src: L + 'canal-dusk.jpg', w: 1920, h: 1080, source: 'generated', alt: 'A still Bahamian canal at dusk with low townhouses and a covered boat', caption: 'The canal side: still water and a covered boat.', credit: GEN },
  inlet: { src: L + 'inlet-lights.jpg', w: 1800, h: 1200, source: 'generated', alt: 'A green channel marker light reflected across a dark inlet at night', caption: 'The channel marker after dark.', credit: GEN },
  pool: { src: L + 'pool-night.jpg', w: 1600, h: 2000, source: 'generated', alt: 'A lit, steaming swimming pool beside a palm at night', caption: 'A heated pool at night.', credit: GEN },
  tennis: { src: L + 'tennis-dawn.jpg', w: 1808, h: 1200, source: 'generated', alt: 'An empty hard tennis court at first light behind palms', caption: 'The courts before the heat.', credit: GEN },
  library: { src: L + 'library-chair.jpg', w: 1600, h: 2000, source: 'generated', alt: 'A leather armchair and shelves of sailing books in slatted evening light', caption: 'A reading room for owners.', credit: GEN },
  morning: { src: L + 'beach-morning.jpg', w: 1920, h: 1080, source: 'generated', alt: 'An empty white beach and pale turquoise shallows in early morning', caption: 'The beach before anyone is on it.', credit: GEN },
  brass: { src: L + 'brass-deck.jpg', w: 1800, h: 1200, source: 'generated', alt: 'Polished brass fitting on varnished teak decking at golden hour', caption: 'Brass, teak, salt.', credit: GEN },
} satisfies Record<string, Img>;
