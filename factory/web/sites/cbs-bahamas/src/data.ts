// Every fact here is from cbsbahamas.com (about, roofing, cbs-prostore, windows-and-doors, mailboat guide) as researched on 2026-11-05 and 2026-11-08.
export const STORE = 'https://www.cbsbahamas.com/';
export const PHONE = '(242) 677-2100';
export const TEL = 'tel:+12426772100';

const EVO = 'https://us.evocdn.io/dealer/1324/';
const P = EVO + 'catalog/product/images/';
const GEN = 'https://ip-assets-cbs-bahamas.lovable.app/assets/';
const C = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/';

export type Item = {
  src: string; alt: string; name: string; use: string; kind: 'photo' | 'product';
  source: 'own' | 'generated' | 'commons'; note?: string; credit?: string;
};
export type Dept = { id: string; name: string; short: string; line: string; href: string; items: Item[] };

export const PHOTOS = {
  roofHouse: EVO + 'content/media/Content_Pages/Project_Sales/Roofing/OneStopShopPhotos_roofing-2-c.jpg',
  roofPly: EVO + 'content/media/Content_Pages/Project_Sales/Roofing/OneStopShopPhotos_Roofing-1.jpg',
  shingles: EVO + 'content/media/Content_Pages/Project_Sales/Roofing/OneStopShopPhotos_roofing-3-c.jpg',
  proAerial: EVO + 'content/media/Content_Pages/Project_Sales/Roofing/OneStopShopPhotos_CBS-PROstore-c.jpg',
  proFront: EVO + 'content/media/Content_Pages/Branches/prostore-prostore_exterior_3.jpg',
  carl: EVO + 'content/media/Content_Pages/Company_Overview/CarlTreco25th.JPG',
  vintage: EVO + 'content/media/Content_Pages/Company_Overview/CommonwealthBuilding_Vintage.JPG',
  fifty: EVO + 'content/media/Content_Pages/Company_Overview/BBJT_champagne.jpg',
  daybreak: C + 'f/fa/Bahamas_1989_%28394%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2824107306483%29.jpg/3840px-Bahamas_1989_%28394%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2824107306483%29.jpg',
  harley: C + 'f/fe/Bahamas_1989_%28492%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2824386245874%29.jpg/3840px-Bahamas_1989_%28492%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2824386245874%29.jpg',
  loading: C + '8/8d/Bahamas_1989_%28602%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2825545408921%29.jpg/3840px-Bahamas_1989_%28602%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2825545408921%29.jpg',
  bridge: C + '0/0e/Bahamas_1989_%28601%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2825011570973%29.jpg/3840px-Bahamas_1989_%28601%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2825011570973%29.jpg',
  potters: C + '3/34/Potters_Cay_-_panoramio.jpg/3840px-Potters_Cay_-_panoramio.jpg',
};
export const STEHN = 'Rüdiger Stehn, CC BY-SA 2.0, via Wikimedia Commons';

const g = (f: string) => GEN + f + '.jpg';

export const DEPTS: Dept[] = [
  { id: 'roofing', name: 'Roofing', short: 'Roofing', line: 'Plywood, underlayment, shingles, drip cap and fasteners, priced as one roof package at the PROstore.', href: 'https://www.cbsbahamas.com/roofing',
    items: [
      { src: PHOTOS.roofHouse, alt: 'A finished shingle roof on a house, photographed for CBS Bahamas roofing', name: 'The finished roof', use: 'Owens Corning shingles, in a range of colours and styles', kind: 'photo', source: 'own', note: 'the whole package, one quote' },
      { src: PHOTOS.roofPly, alt: 'Stacks of roofing plywood at CBS Bahamas', name: 'Roofing plywood', use: 'CDX and RTD ply, sourced from US partners', kind: 'photo', source: 'own' },
      { src: P + '1_b_4_2_1b42f5be7ce3af18bd6a83282fd390fdefda3ea4_ply_brz_1.jpg', alt: 'Boise Cascade RTD roofing plywood sheet', name: 'Boise Cascade RTD ply', use: '4-ply SYP, 19/32 in x 4 ft x 8 ft', kind: 'product', source: 'own' },
      { src: P + '5_c_c_2_5cc2d9ebab12ab8a1a71655ece9570a809225a33_5003002_new_1.jpg', alt: 'Roll of GRACE Ice and Water Shield roofing underlayment', name: 'GRACE Ice & Water Shield', use: 'Self-adhered underlayment, 36 in x 75 ft', kind: 'product', source: 'own' },
      { src: g('roof-sheathing'), alt: 'Gloved hands nailing plywood sheathing on the hip roof of a white concrete house', name: 'Sheathing day', use: 'Illustrative photograph', kind: 'photo', source: 'generated', note: 'for the hip roof' },
      { src: PHOTOS.shingles, alt: 'Roofing shingles stacked at CBS Bahamas', name: 'Shingles', use: 'Warranties up to a lifetime in many cases', kind: 'photo', source: 'own' },
    ] },
  { id: 'doors', name: 'Doors and windows', short: 'Doors & windows', line: 'Entry, interior, security and patio doors, sliding and single-hung windows, shutters, flashing and hardware.', href: 'https://www.cbsbahamas.com/windows-and-doors--2',
    items: [
      { src: g('sliding-window'), alt: 'A new white aluminium sliding window in a pale yellow concrete wall beside green louvred shutters', name: 'A window, newly fitted', use: 'Illustrative photograph', kind: 'photo', source: 'generated', note: 'sliding, single-hung, or special order' },
      { src: P + '2_2_2_2_22228bb0bfee3d62a33d09c419aaa18ce4bda801_product_imagery_1g3906.jpeg', alt: 'JELD-WEN Smooth-Pro four panel sunburst exterior door slab', name: 'JELD-WEN Smooth-Pro', use: '4-panel sunburst 5-lite exterior slab, primed fiberglass', kind: 'product', source: 'own' },
      { src: P + '2_2_f_9_22f99f0393014adbe4066d377e2b90555b9ce20b_product_imagery_pgt1002_1.jpeg', alt: 'SCOUT by PGT horizontal roller window with white aluminium frame', name: 'SCOUT by PGT', use: 'Horizontal roller, aluminium, white frame, clear glass', kind: 'product', source: 'own' },
      { src: P + 'thumbnails/9346834_-_master_1742928858.jpg', alt: 'Precision Regal series black security screen door with frame', name: 'Precision Regal', use: 'Security screen door with frame, black', kind: 'product', source: 'own' },
      { src: g('hurricane-shutter'), alt: 'Hands swinging a green wooden Bahama shutter closed before a storm', name: 'Shutters', use: 'Illustrative photograph', kind: 'photo', source: 'generated', note: 'exterior shutters too' },
      { src: P + 'd_7_c_a_d7ca17c3ca6349ad00bc9e24f9bbf285db03388f_6panelprhcid_1.jpg', alt: 'JELD-WEN six panel Colonist pre-hung interior door', name: 'JELD-WEN Colonist', use: '6-panel pre-hung hollow core interior door', kind: 'product', source: 'own' },
    ] },
  { id: 'materials', name: 'Building materials', short: 'Materials', line: 'Bulk plywood, sheet rock, cement board, insulation, thinset, grout, masonry and fasteners for contractors at the PROstore.', href: 'https://www.cbsbahamas.com/building-materials--1',
    items: [
      { src: PHOTOS.proFront, alt: 'The CBS PROstore building on Robinson Road, Nassau', name: 'CBS PROstore', use: '103 Robinson Road, Monday to Friday 7 to 4', kind: 'photo', source: 'own', note: 'contractors start here' },
      { src: g('lumber-load'), alt: 'Strapped bundles of plywood and treated lumber on a flatbed truck in the sun', name: 'Full loads', use: 'Illustrative photograph', kind: 'photo', source: 'generated' },
      { src: P + 'a_5_5_9_a559e5e372aca3ca4640e39a44ab72251bb82c73_9197005_1.jpg', alt: 'Lengths of white Schedule 40 PVC pipe', name: 'Schedule 40 PVC', use: 'Bell end and plain end pipe', kind: 'product', source: 'own' },
      { src: P + 'd_0_3_3_d033310e723a43bbb1421967a6ed520b9e0d8304_9114158_2.jpeg', alt: 'Folded blue ProSource multi-purpose tarp', name: 'ProSource tarp', use: 'Multi-purpose, blue', kind: 'product', source: 'own' },
      { src: PHOTOS.proAerial, alt: 'Aerial photograph of the CBS PROstore yard', name: 'The yard from above', use: 'Smart locker pickup on site', kind: 'photo', source: 'own' },
    ] },
  { id: 'paint', name: 'Paint and walls', short: 'Paint', line: 'The Paint Center, with Valspar among the brands on the shelf.', href: 'https://www.cbsbahamas.com/paint-center',
    items: [
      { src: g('paint-roller'), alt: 'A roller laying fresh coral paint over faded paint on a concrete wall', name: 'A fresh coat', use: 'Illustrative photograph', kind: 'photo', source: 'generated', note: 'Valspar on the shelf' },
    ] },
  { id: 'flooring', name: 'Flooring', short: 'Flooring', line: 'Choice Flooring and tile, with thinset and grout from the PROstore.', href: 'https://www.cbsbahamas.com/choiceflooring',
    items: [
      { src: g('floor-tile'), alt: 'A tiler pressing a pale porcelain tile into thinset with spacers', name: 'Tile going down', use: 'Illustrative photograph', kind: 'photo', source: 'generated', note: 'thinset and grout too' },
    ] },
  { id: 'fans', name: 'Fans and lighting', short: 'Fans', line: 'Ceiling fans with and without lights, and the lighting to go with them.', href: 'https://www.cbsbahamas.com/lighting-and-ceiling-fans--1',
    items: [
      { src: g('ceiling-fan'), alt: 'A white ceiling fan turning under a tongue and groove porch ceiling', name: 'Porch fan', use: 'Illustrative photograph', kind: 'photo', source: 'generated', note: 'the porch, sorted' },
    ] },
  { id: 'garden', name: 'Lawn and garden', short: 'Garden', line: 'Hoses, tools, mowers and wheelbarrows for the yard.', href: 'https://www.cbsbahamas.com/lawn-and-garden--1',
    items: [
      { src: g('garden-planting'), alt: 'Hands planting a young hibiscus in sandy soil beside a garden hose', name: 'Planting out', use: 'Illustrative photograph', kind: 'photo', source: 'generated', note: 'hibiscus by the gate' },
    ] },
];

export const ALSO: [string, string][] = [
  ['Bath and faucets', 'https://www.cbsbahamas.com/bath-and-faucets--1'],
  ['Kitchen and kitchenware', 'https://www.cbsbahamas.com/kitchen-and-kitchenware--1'],
  ['Ceilings (USG)', 'https://www.cbsbahamas.com/ceilings--1'],
  ['Commercial steel doors', 'https://www.cbsbahamas.com/commercial-steel-doors'],
  ['Blinds and window treatments', 'https://www.cbsbahamas.com/blinds-and-window-treatments--1'],
  ['Patio and outdoor living', 'https://www.cbsbahamas.com/outdoor-living-and-patio--1'],
  ['Marine and automotive', 'https://www.cbsbahamas.com/automotive-and-marine--1'],
  ['Decor and furniture', 'https://www.cbsbahamas.com/decor-and-furniture--1'],
  ['Cleaning supplies', 'https://www.cbsbahamas.com/cleaning-supplies--16'],
  ['Bulk supply and full loads', 'https://www.cbsbahamas.com/bulk-supply-and-full-loads'],
];

export const ISLANDS = ['Abaco', 'Andros', 'Berry Islands', 'Bimini', 'Cat Island', 'Crooked Island', 'Eleuthera', 'Exuma', 'Inagua', 'Long Island', 'Mayaguana', 'Ragged Island', 'Rum Cay', 'San Salvador', 'Acklins'];

export const CREDITS = [
  'Mailboats at Potter\'s Cay Dock: ' + STEHN,
  'Potter\'s Cay: Bohao Zhao, CC BY 3.0, via Wikimedia Commons',
  'Store, roofing, product and archive photographs: CBS Bahamas',
  'Photographs marked "illustrative" were generated for this concept and should be replaced with CBS project photos',
];
