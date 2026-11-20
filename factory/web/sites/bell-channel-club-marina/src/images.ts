// Every photograph on the site, with its true source.
// commons: the real place (Lucaya), credited in the footer line and the concept notes.
// generated: illustrative photography from the Lovable asset studio (ip-assets-bell-channel-club-marina), never the club itself.
export type Img = { src: string; w: number; h: number; alt: string; caption: string; source: 'commons' | 'generated' }

const L = 'https://ip-assets-bell-channel-club-marina.lovable.app/assets/'

export const IMG = {
  bay: {
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Port_Lucaya_Marina_-_panoramio.jpg/3840px-Port_Lucaya_Marina_-_panoramio.jpg',
    w: 3840, h: 1920, source: 'commons',
    alt: 'Yachts moored along the docks of Port Lucaya Marina, Grand Bahama',
    caption: 'Inside the cut: Port Lucaya Marina, at the head of the inlet the club overlooks.',
  },
  dockline: { src: L + 'dockline-bluehour.jpg', w: 1800, h: 1200, source: 'generated', alt: 'A white mooring line made fast on a steel cleat at a canal wall, lights reflected in still water at blue hour', caption: 'The canal side. Illustrative photograph.' },
  beach: { src: L + 'beach-morning.jpg', w: 1920, h: 1080, source: 'generated', alt: 'An empty pale beach and clear turquoise shallows in the early morning, palms and sea grape behind', caption: 'The beach side. Illustrative photograph.' },
  inlet: { src: L + 'inlet-lights.jpg', w: 1800, h: 1200, source: 'generated', alt: 'A green channel light reflected across dark water at night, rocks in the foreground and shore lights beyond', caption: 'A channel light after dark. Illustrative photograph.' },
  pool: { src: L + 'pool-night.jpg', w: 1600, h: 2000, source: 'generated', alt: 'A lit swimming pool steaming gently beside a palm at night', caption: 'A heated pool at night. Illustrative photograph.' },
  tennis: { src: L + 'tennis-dawn.jpg', w: 1808, h: 1200, source: 'generated', alt: 'An empty hard tennis court at first light, palms behind the windscreen', caption: 'Courts before the heat. Illustrative photograph.' },
} satisfies Record<string, Img>

export const CREDITS = 'Photograph of Port Lucaya Marina: qwesy qwesy, CC BY 3.0, via Wikimedia Commons. Other photographs are illustrative and will be replaced with the club’s own.'
