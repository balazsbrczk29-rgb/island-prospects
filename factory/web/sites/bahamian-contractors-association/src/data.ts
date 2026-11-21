// Facts from bahamiancontractors.org (home, /members, events), checked 2026-11-21.
import members from './members.json';

export const MEMBERS = members as { n: string; p: string; s: string }[];
export const OFFICE = {
  name: "Bahamian Contractors' Association",
  phone: '(242) 356-8850', tel: '+12423568850', email: 'admin@bahamiancontractors.org',
  address: '#27 Chesapeake Road, Suite #11, Nassau', map: 'https://maps.app.goo.gl/6eGsRpbZjArd9kab9',
  hours: [['Monday to Wednesday', '9:00am to 3:00pm'], ['Thursday', '9:00am to 12:00pm']],
};
export const SITE = 'https://www.bahamiancontractors.org';
export const UNI = 'https://unicorn-images.b-cdn.net/';
export const ASSETS = 'https://ip-assets-bahamian-contractors-association.lovable.app/assets/';

export type TierKey = 'Associate' | 'General' | 'Prime' | 'Developer / Corporate';
export const TIERS: { k: TierKey; who: string; dues: string }[] = [
  { k: 'Associate', who: 'Building suppliers, manufacturers, consultants, project managers and professionals', dues: '$250' },
  { k: 'General', who: 'General contractors, specialty contractors and subcontractors', dues: '$300' },
  { k: 'Prime', who: 'Contractors with annual revenue of $5 million or more', dues: '$1,000' },
  { k: 'Developer / Corporate', who: 'Developers with annual turnover of $10 million or more', dues: '$5,000' },
];

export const BENEFITS: [string, string, string][] = [
  ['Bids', 'Notices of invitations to bid on government and private projects, and employment postings.', 'Every member'],
  ['The register', 'A listing in the Contractor Register, and promotion to international companies expanding in The Bahamas.', 'Every member'],
  ['Training', 'The Contractor Seminar Series, certification programmes, and support for standardised testing and licensing.', 'Every member'],
  ['Discounts', 'Trade discounts, free estimate printing and marketing support.', 'Every member'],
  ['Network', 'Monthly luncheons and special events, and promotion on the BCA’s Facebook and Instagram.', 'Every member'],
  ['Recognition', 'A BCA Certificate of Membership for public display, and awards for excellence and innovation.', 'Every member'],
];

export const RECORD: [string, string][] = [
  ['1959', 'The Bahamian Contractors’ Association is established to advocate for construction professionals in The Bahamas.'],
  ['2016', 'The Construction Contractors Act is passed, a significant achievement driven by the BCA.'],
  ['Now', 'Urging the timely appointment of the Construction Contractors Board, as the 2016 Act mandates.'],
  ['Ongoing', 'At the table in Economic Partnership Agreement negotiations with the EU, Caricom and other international bodies.'],
];
