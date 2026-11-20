// Every fact here is from thermosetroofing242.com (home, services, R.A.D.A.R. and portfolio pages), read 2026-11-20.
const sq = (id: string) => `https://images.squarespace-cdn.com/content/v1/685164f5603a7f2c27ad6720/${id}`

export const business = {
  name: 'Thermoset Roofing Bahamas Ltd.',
  office: { label: '(242) 328-7017', href: 'tel:+12423287017' },
  cta: 'Request a free estimate',
  email: 'croix.culmer@thermosetroofing242.com',
  address: ['7 Portago Road, Oakesfield', 'Nassau, New Providence', 'P.O. Box SP63997'],
  people: [
    { name: 'Stuart Culmer', role: 'Owner and President', tel: '(242) 422-4923', href: 'tel:+12424224923', email: 'stuart.culmer@thermosetroofing242.com' },
    { name: 'Croix Culmer', role: 'General Manager', tel: '(242) 525-7326', href: 'tel:+12425257326', email: 'croix.culmer@thermosetroofing242.com' },
  ],
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/thermosetroofing242' },
    { label: 'Instagram', href: 'https://www.instagram.com/thermosetroofing242' },
  ],
}

// The roof assembly, deck first. `note` is the short hero callout; `body` the chapter text. Lines about what
// Thermoset does are worded from their services list; lines about what a layer is for are plain trade knowledge
// (vapour retarder, insulation and cover board: wording to confirm with the owner).
export const layers = [
  { n: '01', name: 'Roof deck', note: 'Assessed with photos and core cuts', body: 'The structure every other layer depends on. A Thermoset roof condition assessment reports on it with photos, core cuts and repair recommendations.' },
  { n: '02', name: 'Vapour retarder', note: 'A sealed sheet over the deck', body: 'A sealed sheet over the deck. It keeps the humid air inside the building from reaching the insulation.' },
  { n: '03', name: 'Insulation', note: 'Rigid boards, staggered joints', body: 'Rigid boards, laid with staggered joints, between the sun on the roof and the rooms below.' },
  { n: '04', name: 'Cover board', note: 'A firm base for the membrane', body: 'A dense board over the insulation. It gives the membrane a firm, flat base to be welded and walked on.' },
  { n: '05', name: 'Membrane', note: 'TPO or PVC single-ply', body: 'TPO and PVC single-ply: high-performance thermoplastic sheets for commercial and residential flat roofs. They turn up the parapet on every side.' },
  { n: '06', name: 'Edge metal and AC curbs', note: 'Kynar aluminium or galvanised steel', body: 'Perimeter flashing and edge metal fabricated to ANSI/SPRI ES-1 in Kynar-finished aluminium or galvanised steel, with custom curbs under the rooftop AC units.' },
]

export const systems = [
  { name: 'Single-ply membrane', kind: 'TPO and PVC', line: 'High-performance thermoplastic membranes for commercial and residential flat roofs.' },
  { name: 'Modified bitumen', kind: 'Torch-applied', line: 'Durable multi-layer assemblies for waterproofing and UV resistance.' },
  { name: 'Tiled terrace', kind: 'Liquid-applied waterproofing', line: 'Liquid-applied membranes beneath tile or concrete toppings, for terraces and balconies.' },
  { name: 'Gravel ballast', kind: 'Roof overburden', line: 'Gravel ballast, pavers or decorative stone installed over membrane systems.' },
]
export const pitched = 'Pitched roof? Thermoset also installs standing seam metal in aluminium or steel with concealed fasteners and Kynar finishes, and architectural, synthetic and 3-tab shingles.'

export const clients = {
  lead: ['Baha Mar', 'Atlantis', 'Albany', 'Lynden Pindling International Airport', 'U.S. Embassy, Nassau', 'Sandals Royal Bahamian', 'Goldwynn Resort', 'Christ Church Cathedral', 'The Mall at Marathon', 'Sysco Bahamas', 'Harborside Resort', 'Breezes Resort', 'Festival Place', 'The Church of the Most Holy Trinity', 'Hillview Seventh Day Adventist Church'],
  more: ['The British Colonial Hotel', 'The Pointe and Margaritaville', 'Four Seasons Resort (now Ocean Club)', 'The Princess Margaret Hospital', 'Cable Bahamas', 'Batelco locations', 'Shell gas stations', 'Rubis gas stations', 'Wendy’s, Nassau and Freeport', 'Popeye’s locations', 'The Bahamas Jewish Center', 'Loyola Hall', 'Aquilina Resort', 'The One', 'St. George’s Anglican Church', 'Epiphany Church', 'Bonaventure locations', 'B.A.F. Insurance', 'J.S. Johnson Insurance', 'RND Plaza, Freeport', 'Fusion Superplex', 'New Image, Freeport', 'The Mortgage Corporation', 'Pilot House', 'The Harold DeGregory Building, Freeport', 'The Grand Union Building, Freeport', 'Caves Heights', 'Ghost Bar Restaurant and Lounge', 'Villa Lyla', 'Cakes by Adam', 'B.C.P.O.U. Hall', 'The Sandy Port Plaza', 'Mount Moriah Community Center', 'Tropic Seafood', 'Saint Martin de Porres Convent', 'Asa H. Pritchard Ltd.', 'Proficient Business Solutions', 'Sunryse Shredding', 'Grants Town Seventh Day Adventist Church', 'The Paradise Island Police Station', 'Bahamas Medical and Surgical Supplies'],
}

// Thermoset's own job photographs, hotlinked from their site. Captions say only what the picture shows.
export const photos = [
  { src: sq('30e95db4-7162-4a03-afe2-feede133298a/IMG_4711.jpeg'), alt: 'Thermoset crew installing a waterproof membrane on a flat commercial roof', cap: 'Membrane going down on a flat commercial roof' },
  { src: sq('2c132234-ef75-4633-93aa-a3ab3b043533/a827c3e8-ae10-4bb1-97b9-1a8100b023d7.jpeg'), alt: 'Roofers on a steep slate roof beside a stone church tower', cap: 'Steep-slope work beside a church tower' },
  { src: sq('3fd21fc3-d414-4ad4-8aa3-4e43ec25d640/PHOTO-2025-06-23-13-59-54.jpg'), alt: 'Crew on a white standing seam metal roof below a steeple', cap: 'Standing seam metal, up to the steeple' },
  { src: sq('73e36bd3-582d-4ed1-8a4e-47635d9aa4ad/IMG_8670.jpeg'), alt: 'Liquid waterproofing being rolled onto a roof surface', cap: 'Liquid-applied waterproofing, rolled on by hand' },
  { src: sq('63931fc6-e57c-4101-afbf-8ab5dce20cad/IMG_4723.jpeg'), alt: 'A Thermoset inspector in a hi-vis shirt on a commercial roof', cap: 'A maintenance visit on a commercial roof' },
  { src: sq('8f25b357-e661-4cb8-8f69-d30fd36857d1/IMG_4719.jpeg'), alt: 'Workers on scaffolding repairing the roof of a house under a blue sky', cap: 'Scaffold up for roof work on a house' },
  { src: sq('25e12ffd-84e2-4780-a822-d6b9ccf08728/IMG_7262.JPG'), alt: 'Carpentry on site: a timber gate being built', cap: 'General construction: carpentry on site' },
]

export const services = [
  { group: 'Roofing', items: [
    ['TPO and PVC single-ply membrane systems', 'High-performance thermoplastic membranes for commercial and residential flat roofs.'],
    ['Modified bitumen and torch-applied systems', 'Durable multi-layer assemblies for waterproofing and UV resistance.'],
    ['Standing seam and metal roofing', 'Custom fabricated aluminium or steel panels with concealed fasteners and Kynar finishes.'],
    ['Shingle roofing', 'Architectural, synthetic and 3-tab shingles for pitched residential and commercial roofs.'],
    ['Roof replacement and re-roofing', 'Full tear-off and reinstallation of aged or failing roof systems.'],
  ] },
  { group: 'Waterproofing', items: [
    ['Terrace and balcony waterproofing', 'Liquid-applied membranes beneath tile or concrete toppings.'],
    ['Solar plinth and equipment curb flashing', 'TPO-compatible detailing for solar bases, HVAC curbs and mechanical penetrations.'],
    ['Planter box and green roof coordination', 'Waterproofing continuity beneath movable or built-in planters.'],
    ['Roof overburden', 'Gravel ballast, pavers or decorative stone over membrane systems.'],
  ] },
  { group: 'Fabrication', items: [
    ['Perimeter flashing and edge metal', 'ANSI/SPRI ES-1 compliant fabrication in Kynar-finished aluminium or galvanised steel.'],
    ['AC curbs', 'Custom fabricated mechanical curbs to support rooftop HVAC units.'],
    ['Gutters and downspouts', 'Seamless aluminium or copper systems with debris guards and custom profiles.'],
    ['Skylight and hatch integration', 'Flashing and waterproofing around daylighting and access features.'],
  ] },
  { group: 'General construction', items: [
    ['Interior and exterior painting', 'From precision detailing to full-scale repainting.'],
    ['Pressure cleaning', 'Driveways, roofs, gutters and facades.'],
    ['Gutter and downspout cleaning', 'Drainage kept clear to protect the foundation and roofline.'],
    ['Tree cutting and hauling', 'Safe trimming and removal, and debris hauled off site.'],
    ['Carpentry', 'Structural and finish carpentry: framing, decking, cabinetry, doors and trim.'],
    ['Masonry', 'Block work, poured concrete, decorative stone and brickwork.'],
  ] },
]

export const radar = {
  letters: ['Roof', 'Assessment,', 'Diagnostics', 'And', 'Response'],
  intro: 'A roof lasts as long as it is looked after. R.A.D.A.R. is Thermoset’s maintenance and repair program: it protects the roofing investment, extends the life of the system and keeps disruptive, costly repairs to a minimum.',
  items: [
    ['Scheduled preventative maintenance', 'Routine inspections and debris removal, so minor issues are caught before they become major problems.'],
    ['Leak investigation and repair', 'Prompt response to active leaks or moisture intrusion, with full documentation and visual reports.'],
    ['Roof condition reports', 'A detailed assessment after each visit: core samples if required, high-resolution photos and clear next steps.'],
    ['Priority emergency service', 'Members go to the front of the line during storm events and sudden repair needs.'],
    ['Asset management planning', 'Annual reporting and capital planning tools for forecasting and facility budgets.'],
    ['Warranty compliance monitoring', 'Service that keeps the roof within the manufacturer’s warranty requirements.'],
  ],
  plans: ['Commercial complexes', 'Industrial facilities', 'Luxury residential estates'],
}

export const makers = ['Carlisle', 'Elevate', 'Englert', 'Sika', 'Siplast', 'Tremco']
