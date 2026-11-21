export const IMG = 'https://ip-assets-maximum-security.lovable.app/assets/'

export const biz = {
  name: 'Maximum Security & Patrol Services Ltd.',
  short: 'Maximum Security & Patrol Services',
  phones: [
    { label: '242-394-5425', tel: '+12423945425' },
    { label: '242-393-7206', tel: '+12423937206' },
  ],
  fax: '242-394-5428',
  address: '#15 Carib Road (Carib House)',
  box: 'P.O. Box N-9425',
  town: 'Nassau, New Providence',
}

export type Chapter = { t: string; when: string; img: string; alt: string; h: string; p: string }
export const chapters: Chapter[] = [
  { t: '06:00', when: 'First light', img: 'h06-post.jpg', alt: 'A security officer seen from behind at the glass doors of a pastel office building in Nassau at dawn (illustrative photograph)',
    h: 'Someone on post from first light to the hours nobody sees.', p: 'Trained security officers for businesses, institutions and private clients across New Providence, from one office on Carib Road.' },
  { t: '12:00', when: 'Noon', img: 'h12-door.jpg', alt: 'An officer at the entrance of a white colonial shop building with green shutters in bright noon sun (illustrative photograph)',
    h: 'At the bank door and on the shop floor.', p: 'Officers for the business and financial community, the government and retail sectors, and private and public clients.' },
  { t: '18:00', when: 'Dusk', img: 'h18-patrol.jpg', alt: 'An unmarked patrol truck beside a pink colonial building at dusk, an officer walking the wall with a torch (illustrative photograph)',
    h: 'When the street empties, the patrol starts.', p: 'Patrol services that check doors, gates and perimeters after the staff go home.' },
  { t: '22:00', when: 'Night', img: 'h22-gate.jpg', alt: 'An officer at a steel yard gate under a single warm street light at night (illustrative photograph)',
    h: 'Special applications, special responses.', p: 'Customised services for sites that may need a special response to an adverse situation.' },
  { t: '03:00', when: 'The quiet hours', img: 'h03-watch.jpg', alt: 'An alarm monitoring desk lit only by screens in a dark room (illustrative photograph)',
    h: 'Alarm monitoring while the building sleeps.', p: 'Your alarm is watched from our side, so a signal at 3 am reaches a person, not an empty office.' },
]

export const services = [
  { n: '01', id: 'officers', name: 'Security officers', who: 'Banks, offices, retail, government buildings, residences', body: 'Trained security officers for diverse and special applications, on post at your door, desk or gate.' },
  { n: '02', id: 'patrol', name: 'Patrols', who: 'Yards, shopping plazas, gated properties after hours', body: 'Patrol services that check the perimeter, gates and doors on a schedule agreed with you.' },
  { n: '03', id: 'alarm', name: 'Alarm monitoring', who: 'Premises with an alarm system', body: 'Alarm monitoring, so a signal at any hour reaches someone who acts on it.' },
  { n: '04', id: 'investigations', name: 'Investigations', who: 'Businesses and private clients', body: 'Investigations, from the same company that guards your premises.' },
  { n: '05', id: 'consultancy', name: 'Consultancy', who: 'Owners planning or reviewing their security', body: 'Security consultancy, and customised services for situations that need a special response.' },
]
