// Facts from bvgdesign.com (home, faqs.html, promo.html), bahamasvacationguide.com and the Yabsta listing, researched 2026-11-05.
export const PHONE = '(242) 602-0658';
export const TEL = 'tel:+12426020658';
export const US_PHONE = '(954) 640-8552';
export const US_TEL = 'tel:+19546408552';
export const EMAIL = 'info@bvgdesign.com';

const GEN = 'https://ip-assets-bvg-design-services.lovable.app/assets/';
export const g = (f: string) => GEN + f + '.jpg';

export const PHOTOS = {
  harbour: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Lucayan_Harbor_JonWorth.jpg',
  marina: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Port_Lucaya_Marina_-_panoramio.jpg/3840px-Port_Lucaya_Marina_-_panoramio.jpg',
  market: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Port_Lucaya_Marketplace_-_panoramio.jpg',
  beach: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Port_Lucaya_Beach_-_panoramio.jpg',
  hopetown: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Bahamas_1989_%28445%29_Abaco_Hope_Town%2C_Elbow_Cay_%2824251314643%29.jpg/3840px-Bahamas_1989_%28445%29_Abaco_Hope_Town%2C_Elbow_Cay_%2824251314643%29.jpg',
  nassau: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Bahamas_1989_%28601%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2825011570973%29.jpg/3840px-Bahamas_1989_%28601%29_New_Providence_Potter%27s_Cay%2C_Nassau_%2825011570973%29.jpg',
};
export const CREDIT = {
  harbour: 'Lucayan Harbour, Freeport. Photo: Jon Worth, CC BY-SA 2.0',
  marina: 'Port Lucaya Marina. Photo: qwesy qwesy, CC BY 3.0',
  market: 'Port Lucaya Marketplace. Photo: Pietro Valocchi, CC BY 3.0',
  beach: 'Port Lucaya Beach. Photo: Pietro Valocchi, CC BY 3.0',
  hopetown: 'Hope Town, Elbow Cay, Abaco, 1989. Photo: Rüdiger Stehn, CC BY-SA 2.0',
  nassau: "Potter's Cay, Nassau, 1989. Photo: Rüdiger Stehn, CC BY-SA 2.0",
};

export type Cap = { code: string; name: string; what: string; terms: string; img: string; alt: string; more: string; gen: boolean };
export const CAPS: Cap[] = [
  { code: '1.1', name: 'Simple web pages', what: 'Cost-effective pages in a simple, clean design.', terms: 'Normally ready within 24 hours of the order', img: g('wireframe-sketch'), alt: 'Pencil wireframe sketches of web page layouts on paper with a steel ruler', more: 'The fastest way onto the web for a small Bahamian business. Multiple pages or complex work can take longer.', gen: true },
  { code: '1.2', name: 'Multi-page and themed sites', what: 'One-time sites, simple or themed, across as many pages as the business needs.', terms: 'Discount over 10 pages, larger discounts for hundreds', img: g('studio-desk'), alt: 'A studio desk beside a louvred window, a laptop showing an abstract page layout', more: 'Volume pricing is built in: the more pages, the lower the rate per page.', gen: true },
  { code: '1.3', name: 'Complex sites', what: 'Sites with JavaScript, dynamic HTML and animation.', terms: 'Quoted per project', img: g('porch-laptop'), alt: 'Hands typing on a laptop on a teak porch table above turquoise water', more: 'For businesses that need more than pages: moving parts, interactive features and animation.', gen: true },
  { code: '1.4', name: 'Redesign or takeover', what: 'Fix an existing site, or take it over, redesign it and keep it up to date.', terms: 'Hourly for minor work', img: g('dock-phone'), alt: 'A hand holding a phone showing a bright web page on a marina boardwalk', more: 'Small changes are billed by the hour. A full takeover means BVG redesigns the site and keeps it current for you.', gen: true },
  { code: '1.5', name: 'Search optimisation and promotion', what: 'Site optimisation and promotion in the major search engines.', terms: 'Free first consultation on your key phrases', img: g('route-sign'), alt: 'A pastel Freeport shopfront wall with green louvred shutters and a hibiscus', more: 'The consultation is a brief overview of your current key phrases, given in conversation rather than as a written report.', gen: true },
  { code: '1.6', name: 'Hosting and domains', what: 'Hosting with user-friendly control panels, and domain registration.', terms: 'Rates on request', img: g('server-detail'), alt: 'Patch cables and status lights on a compact server rack', more: 'One firm for the address, the server and the site, so there is one number to call.', gen: true },
  { code: '1.7', name: 'Advertising department', what: 'Advertising layout and printed materials, DVD and CD production with labels and etching, video ads for sites like YouTube.', terms: 'Rates on request', img: g('print-proofs'), alt: 'Printed brochure proofs and colour swatches on a wooden table with a loupe', more: 'Print and video from the same studio that builds the site, so the brand matches everywhere.', gen: true },
];

export const OFFICES = [
  { code: '3.1', place: 'Freeport, Grand Bahama', role: 'Headquarters', lines: ['P.O. Box F-43652, Freeport', 'Listed at Smith\'s Point', 'Tel and fax (242) 602-0658'], img: PHOTOS.market, credit: CREDIT.market, alt: 'Port Lucaya Marketplace, Freeport, Grand Bahama' },
  { code: '3.2', place: 'Nassau, New Providence', role: 'Local office', lines: ['Listed on bvgdesign.com', 'Call the Freeport line to reach Nassau'], img: PHOTOS.nassau, credit: CREDIT.nassau, alt: "Potter's Cay Dock under the bridge, Nassau" },
  { code: '3.3', place: 'Abaco', role: 'Local office', lines: ['Listed on bvgdesign.com', 'Call the Freeport line to reach Abaco'], img: PHOTOS.hopetown, credit: CREDIT.hopetown, alt: 'Hope Town harbour on Elbow Cay, Abaco' },
  { code: '3.4', place: 'Fort Lauderdale, Florida', role: 'US line and mailing address', lines: ['5115 NW 17th Terrace, Hangar 39a', 'Fort Lauderdale, FL 33309', 'Tel (954) 640-8552'], img: PHOTOS.beach, credit: CREDIT.beach, alt: 'Port Lucaya Beach, Grand Bahama' },
];

export const PAY = ['Cash, in person (not by mail)', 'Cheques in US dollars or Bahamian dollars', 'Bank-to-bank deposit or direct deposit', 'Credit cards through PayPal'];

export const ISLANDS = ['Grand Bahama', 'New Providence', 'Abaco', 'Andros', 'Bimini', 'Eleuthera', 'Exuma', 'Long Island', 'Cat Island', 'Another island', 'Outside The Bahamas'];

export const CREDITS = [CREDIT.harbour, CREDIT.marina, CREDIT.market, CREDIT.beach, CREDIT.hopetown, CREDIT.nassau, 'Photographs marked illustrative were generated for this concept and should be replaced with BVG project photos'];
