// Writes the three HTML shells (SEO head, JSON-LD, concept label and notes). Run: node gen-shells.mjs
import fs from 'node:fs'
const dir = new URL('.', import.meta.url).pathname
const domain = 'https://manowarmarina.com/'
const og = 'https://static.wixstatic.com/media/0b3c23_fe4056ccc3bf4942b06afd5b77b81bb2~mv2.jpg/v1/fill/w_1200,h_630,al_c,q_85/0b3c23_fe4056ccc3bf4942b06afd5b77b81bb2~mv2.jpg'
const hours = (opens, closes, days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes })
const business = {
  '@type': ['Marina', 'LocalBusiness'], '@id': domain + '#marina', name: 'Man-O-War Marina', alternateName: 'Man-O-War Marina Village',
  url: domain, telephone: '+1-242-554-9500', email: 'mowmv@hotmail.com', foundingDate: '1976', image: [og],
  address: { '@type': 'PostalAddress', addressLocality: 'Man-O-War Cay', addressRegion: 'Abaco', addressCountry: 'BS' },
  sameAs: ['https://www.instagram.com/manowarmarina/', 'https://www.facebook.com/p/Man-O-War-Marina-Village-100090702221315/'],
  openingHoursSpecification: [hours('08:00', '12:00'), hours('13:00', '16:00')],
  amenityFeature: ['23 slips', 'Vessels to 120 ft LOA', 'Beam to 20 ft', 'Draft to 7 ft at low tide', '30 and 50 amp power', 'Water at each slip', 'Gasoline and diesel', 'Showers', 'Laundry', 'Pool', 'Grill area']
    .map(n => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
  containsPlace: { '@type': 'Restaurant', name: 'Dock N’ Dine', telephone: '+1-242-554-9134', servesCuisine: ['Bahamian', 'International'], openingHoursSpecification: [hours('11:00', '15:00')] },
}
const pages = [
  { file: 'index.html', entry: 'home', path: '', title: 'Man-O-War Cay Marina, Abaco | 23 Slips, Fuel Dock, Dock N’ Dine', desc: 'Man-O-War Marina, Man-O-War Cay, Abaco: 23 slips for boats to 120 ft, 7 ft at low tide, 30/50 amp power, the only fuel on the cay. Call (242) 554-9500 or VHF 16.' },
  { file: 'marina.html', entry: 'marina', path: 'services', title: 'Dockage, Fuel and Facilities | Man-O-War Marina, Abaco', desc: 'Dockage, gas and diesel, power, water, showers, laundry, pool and the gift shop at Man-O-War Marina on Man-O-War Cay, Abaco. Hours, rates and answers.' },
  { file: 'island.html', entry: 'island', path: 'man-o-war-cay', title: 'Life on Man-O-War Cay, Abaco | Man-O-War Marina', desc: 'What is ashore on Man-O-War Cay: grocery, Heritage Museum and coffee shop, bakeries, boat-building shops, ferry and beaches, a short walk from Man-O-War Marina.' },
]
const notes = {
  business: 'Man-O-War Marina', current_site: 'manowarmarina.com (now unrelated); manowarmarinavillage.com',
  findings: [
    'Your old address, manowarmarina.com, now shows someone else’s boating article. Boaters who saved it never reach you.',
    'Your current site’s title reads "My Site 1" on every page, so that is what Google and browser tabs show instead of your name.',
    'The numbers a captain needs (120 ft, 20 ft beam, 7 ft at low tide, VHF 16) sit inside a paragraph on an inner page.',
    'The only way to book is a bare email link, with no boat details or dates asked for.',
    'Nothing on your homepage says you are the only fuel on the island, or whether the fuel dock is open.',
  ],
  improvements: [
    'Your own sunset dock photograph opens the site, with one live sentence in Bahamas time: what is open now and when the fuel dock next opens.',
    'The captain’s numbers set large and clear on the first scroll, and a "Will she fit?" check against your 120 ft, 20 ft and 7 ft limits.',
    'A slip request that writes the email for them: boat, size, power and dates, ready to send to mowmv@hotmail.com.',
    'Your published hours shown as a real day at the marina, from the eight o’clock fuel dock to the guests’ evening.',
    'Proper titles, a Marina listing for Google and a page for the cay, so "Man-O-War Cay marina" finds you.',
  ],
  agency: 'ESTATIQ AI Solutions', contact: 'balazs@estatiq.co',
}
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
for (const p of pages) {
  const url = domain + p.path
  const ld = { '@context': 'https://schema.org', '@graph': [business, { '@type': 'WebPage', url, name: p.title, description: p.desc, isPartOf: { '@id': domain + '#marina' } }] }
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow"><!-- PREVIEW ONLY: remove at launch -->
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#edf2ee">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://static.wixstatic.com">
<link rel="stylesheet" href="../assets/concept.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<div id="concept-ribbon" class="concept-ribbon" role="note">
  <span>Concept preview prepared for Man-O-War Marina. This is not the official website.</span>
  <button type="button" class="concept-ribbon__btn" data-concept-open>What we would change</button>
</div>
<div id="root"></div>
<script type="application/json" id="concept-notes">
${JSON.stringify(notes, null, 1)}
</script>
<script src="../assets/concept.js" defer></script>
<script type="module" src="./src/${p.entry}.tsx"></script>
</body>
</html>
`
  fs.writeFileSync(dir + p.file, html)
}
console.log('shells written')
