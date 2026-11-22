export const IMG = 'https://ip-assets-digitech-bahamas.lovable.app/assets/'

export const biz = {
  name: 'Digitech Bahamas',
  legal: 'Digitech Bahamas Ltd.',
  email: 'sales@digitechbahamas.com',
  phones: [
    { label: '(242) 676-2033', tel: '+12426762033' },
    { label: '(242) 676-3022', tel: '+12426763022' },
  ],
  address: '#33 East Avenue, Centreville',
  town: 'Nassau, The Bahamas',
}

export type Service = { id: string; name: string; short: string; body: string; points: string[]; img: string; alt: string; xray?: boolean }

export const services: Service[] = [
  {
    id: 'pos', name: 'Point of sale', short: 'Razor POS for retail and food and beverage.',
    body: 'Digitech are advanced dealers for Razor POS Systems, designed for retail and food and beverage businesses. One supplier for the hardware, the software, the training and the support after installation.',
    points: ['POS hardware', 'POS software', 'Staff training', 'Post-installation support'],
    img: 'hands-till.jpg', alt: 'Hands of a bartender tapping a point-of-sale touchscreen behind a wooden bar (illustrative photograph)',
  },
  {
    id: 'network', name: 'Network design', short: 'Cabling, Wi-Fi, firewall and VPN, from the ground up.',
    body: 'Networks designed from the ground up: cabling, termination and certification, through to advanced wireless networks with multiple VLANs, firewall and VPN support.',
    points: ['Cabling and termination', 'Certification of every run', 'Wireless with multiple VLANs', 'Firewall and VPN'],
    img: 'ceiling-ap.jpg', alt: 'A white ceiling Wi-Fi access point above a bright restaurant with louvred windows (illustrative photograph)',
  },
  {
    id: 'managed', name: 'IT managed services', short: 'Projects, systems design and virtual servers.',
    body: 'Information technology project management, convergent systems design, and virtual server hosting and management, so the systems behind your business have someone responsible for them.',
    points: ['IT project management', 'Convergent systems design', 'Virtual server hosting', 'Server management'],
    img: 'rack.jpg', alt: 'Gloved hands terminating a blue network cable into a patch panel in a wall cabinet (illustrative photograph)',
  },
  {
    id: 'backup', name: 'Cloud backup', short: 'Your data and your endpoints, protected.',
    body: 'A cloud backup solution built on a best-in-class IT management platform, to help protect your data and your endpoints from online threats while you run the day.',
    points: ['Cloud backup of your data', 'Endpoint protection', 'A best-in-class IT management platform'],
    img: 'counter-hero.jpg', alt: 'A point-of-sale counter in a Nassau shop, the system behind it backed up to the cloud (illustrative photograph)',
  },
]

export const clients = ['Hana', "Naughty Johnny's", 'Blu Sail', 'Beauty Shack', 'Little Caesars']
