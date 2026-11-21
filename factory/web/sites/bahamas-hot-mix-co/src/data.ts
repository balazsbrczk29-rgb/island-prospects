// Every fact here comes from bhmgroup.com (scraped Nov 21, 2026). See factory/briefs/bahamas-hot-mix-co.md.
export const NAME = "BHM"
export const LEGAL = "BHM Co. Ltd."
export const PHONE = "+1 (242) 601 6350"
export const TEL = "+12426016350"
export const EMAIL = "info@bhmgroup.com"

// Their own photographs, rehosted from bhmgroup.com in the asset gallery (full resolution).
const A = "https://ip-assets-bahamas-hot-mix-co.lovable.app/assets/"
export const IMG = {
  hogcayA: { src: A + "hogcay-a.jpg", w: 3960, h: 2970 },
  hogcayB: { src: A + "hogcay-b.jpg", w: 4000, h: 3000 },
  lpia: { src: A + "lpia-runway.jpg", w: 5330, h: 3551 },
  normans: { src: A + "normans-cay.jpg", w: 4000, h: 3000 },
  gbia: { src: A + "gbia-runway.jpg", w: 2560, h: 1707 },
  revetment: { src: A + "revetment.jpg", w: 4000, h: 3000 },
  port: { src: A + "fcp-port.jpg", w: 1876, h: 1125 },
  plant: { src: A + "crew-0181.jpg", w: 1400, h: 933 },
  concrete: { src: A + "home-0049.jpg", w: 1200, h: 675 },
  bay: { src: A + "bay-street.jpg", w: 1250, h: 856 },
  gbRoads: { src: A + "gb-roads.jpg", w: 1200, h: 900 },
  ro: { src: A + "kemps-bay-ro.jpg", w: 1221, h: 819 },
} as const

export const OFFICES = [
  { island: "New Providence", town: "Nassau", entity: "BHM Co. Ltd.", line: "Airport Industrial Park", po: "PO Box CB-10990" },
  { island: "Grand Bahama", town: "Freeport", entity: "BHM (GB) Co. Ltd.", line: "Off Freeport Container Port Road", po: "PO Box F-42499" },
  { island: "Abaco", town: "Marsh Harbour", entity: "BHM Co. Ltd.", line: "Airport Roundabout, Ernest Dean Highway", po: "PO Box AB-20184" },
]

export const AIRPORTS = [
  { name: "Lynden Pindling International", place: "Nassau", work: "Runway 10-28 rehabilitation", img: "lpia" },
  { name: "Grand Bahama International", place: "Freeport", work: "Runway works", img: "gbia" },
  { name: "Hog Cay", place: "Exuma", work: "Main contractor, runway and apron", img: "hogcayB" },
  { name: "Norman's Cay", place: "Exuma", work: "Runway chip coat", img: "normans" },
  { name: "Marsh Harbour International", place: "Abaco", work: "Runway works", img: "lpia" },
  { name: "Bimini Airport", place: "Bimini", work: "Runway works", img: "lpia" },
] as const

export const CATEGORIES = ["Road Construction", "Airports and Runways", "Ports", "Coastal & Marine", "Reverse Osmosis", "Utility Infrastructure", "Site Development", "Buildings", "Drilling"] as const
export type Cat = (typeof CATEGORIES)[number]

const T = "https://bhmgroup.com/wp-content/uploads/"
const P = "https://bhmgroup.com/project/"
// name, category, thumbnail (400x284 on their site), project page slug
export const PROJECTS: { name: string; cat: Cat; thumb: string; url: string }[] = [
  ["New Providence Road Improvement Works", "Road Construction", "2024/02/20-400x284.jpg", "new-providence-road-corridor-improvement-works"],
  ["Baha Mar West Bay Street & C7 Realignment", "Road Construction", "2024/02/30-400x284.jpg", "baha-mar-west-bay-street-c7-realignment"],
  ["Baha Mar Resort Core Civil", "Site Development", "2024/02/baha-mar-400x284.jpg", "baha-mar-resort"],
  ["National Stadium", "Site Development", "2024/02/25-400x284.jpg", "national-stadium"],
  ["Paradise Island (PITDA) Road Works", "Road Construction", "2023/03/BHM-Atlantis-001-400x284.jpg", "pitda-roads-paradise-island"],
  ["Carnival Grand Cruise Port New Access Road", "Road Construction", "2023/09/BHM-carnival-gibson-feb25--400x284.jpg", "carnival-grand-cruise-port-new-access-road"],
  ["Bay Street Road Rehabilitation", "Road Construction", "2023/09/bhm-bay-street-400x284.jpg", "bay-street-pavement"],
  ["Harrold Road", "Road Construction", "2023/09/BHM-harrold-road-400x284.jpg", "harrold-road"],
  ["Baillou Hill", "Road Construction", "2023/09/BHM-bailou-hill-400x284.jpg", "baillou-hill"],
  ["Eleuthera Roads", "Road Construction", "2023/09/BHM-road-eleuthera-repair-2-400x284.jpg", "eleuthera-roads"],
  ["Albany", "Road Construction", "2023/09/albany-roads-400x284.jpg", "albany"],
  ["Grand Bahama Roads", "Road Construction", "2023/09/BHM-GB-roads-0681-3-400x284.jpg", "grand-bahama-roads"],
  ["North Abaco Roads", "Road Construction", "2023/09/north-abaco-roads-400x284.jpg", "north-abaco-roads"],
  ["Sandypoint Highway", "Road Construction", "2023/09/BHM-north-sandyport-abaco-road-400x284.jpg", "sandypoint-highway"],
  ["Lynden Pindling International 10-28", "Airports and Runways", "2024/02/002-BHM-LPIA-Runway-10-29-Resurface-DJI_0151-002-400x284.jpg", "lynden-pindling-international-airport-rehabilitation-of-runway"],
  ["Grand Bahama International Airport", "Airports and Runways", "2024/02/GBIA-0477-400x284.jpg", "grand-bahama-international-airport"],
  ["Marsh Harbour International Airport", "Airports and Runways", "2023/08/BHM-abaco-aiport-400x284.jpg", "marsh-harbour-runway"],
  ["Hog Cay Airport", "Airports and Runways", "2024/02/087-BHM-Hog-Cay-Sept-DJI_3112-400x284.jpg", "hog-cay-runway"],
  ["Norman's Cay", "Airports and Runways", "2024/02/Normans-Cay-Chip-Coat-3-400x284.jpg", "normans-cay-runway"],
  ["Bimini Airport", "Airports and Runways", "2023/08/BHM-bimini-airport-400x284.jpg", "bimini-airport-runway"],
  ["Odyssey Nassau", "Airports and Runways", "2024/02/odyssey-1-400x284.jpg", "odyssey-aircraft-new-aircraft-hanger-apron-and-office-facility"],
  ["Odyssey Exuma", "Airports and Runways", "2023/08/20240411-MarkDaCunha-BHM-0036-400x284.jpg", "odyssey-exuma"],
  ["LPIA Expansion", "Airports and Runways", "2024/02/curbside-7-e1432750951227-400x284.jpg", "lynden-pindling-international-airport"],
  ["Freeport Container Port Phase 1", "Ports", "2024/02/org_a5132d5e87c6d89b_1627071980000_resized-400x284.jpg", "freeport-container-port-pavement-revitalization"],
  ["Arawak Cay Port New Port Facility", "Ports", "2023/07/BHM-arawak-1-400x284.jpg", "arawak-cay-port-new-port-facility"],
  ["Carnival Celebration Cay", "Coastal & Marine", "2023/07/BHM-Carn-0709-400x284.jpg", "carnival-dredging-works"],
  ["JDN Dredging Works", "Coastal & Marine", "2023/07/BHM-Carn-0720-400x284.jpg", "jdn-dredging-works"],
  ["Marsh Harbour Port & Customs Facility", "Ports", "2023/07/BHM-marsh-harbour-port-400x284.jpg", "marsh-harbour-port-customs-facility"],
  ["Freeport Container Port: Delta 2-4 & GS6", "Ports", "2024/01/bhm-ports-400x284.jpg", "freeport-container-port-fcp-gs6"],
  ["NPWDCo", "Reverse Osmosis", "2024/02/RO-pg-47-2017-02-17-07.36.16-400x284.jpg", "npwdco"],
  ["Grand Bahama Well Field 1", "Drilling", "2023/06/BHM-GB-RO-Wells-0002-400x284.jpg", "grand-bahama-well-field-1"],
  ["Kemps Bay RO Plant", "Reverse Osmosis", "2023/06/BHM-kemps-bay-RO-400x284.jpg", "kemps-bay-ro-plant"],
  ["Western New Providence Wastewater Treatment Plant", "Utility Infrastructure", "2023/06/BHM-AIP-WWTP-400x284.jpg", "aip-wwtp"],
  ["Sea Defense Works and Coastal Erosion", "Coastal & Marine", "2024/02/Coastal-03-revetment-400x284.jpg", "sea-defense-works"],
  ["Bahamas Ferries Terminal", "Coastal & Marine", "2023/05/bahamas-ferry-marine-400x284.jpg", "bahamas-ferries-terminal"],
  ["Bay Street Marina", "Coastal & Marine", "2023/05/BHM-Bay-Street-Marina-010-400x284.jpg", "bay-street-marina"],
  ["Bay Street Sea Wall", "Coastal & Marine", "2023/05/BHM-Bay-Street-Marina-006-400x284.jpg", "bay-street-sea-wall"],
  ["Sandypoint Sea Defense", "Coastal & Marine", "2023/05/Sandypoint-Sea-Defense-400x284.jpg", "sandypoint-sea-defense"],
  ["Atlantis Paradise Island", "Site Development", "2024/02/QX1A0750.JPG-105553-400x284.jpg", "atlantis-paradise-island"],
  ["Bakers Bay Site Development", "Site Development", "2023/04/BHM-Bakers-Bay-400x284.jpg", "bakers-bay-site-development"],
  ["Ocean Club Estates", "Site Development", "2023/04/Ocean-Club-Residences-1-400x284.jpg", "ocean-club-estates"],
  ["LPIA Terminal Redevelopment", "Buildings", "2024/02/curbside-7-e1432750951227-400x284.jpg", "lpia-terminal-redevelopment"],
  ["Lyford Cay High School", "Buildings", "2023/04/BHM-lyford-cay-high-400x284.jpg", "lyford-cay-high-school"],
  ["Lyford Cay Rehabilitation", "Site Development", "2023/04/BHM-lyford-cay-400x284.jpg", "lyford-cay-rehabilitation"],
  ["Charlottesville", "Site Development", "2023/04/BHM-Charlottesville-400x284.jpg", "charlottesville"],
  ["Balmoral Residences", "Site Development", "2023/04/BHM-balmoral-res-400x284.jpg", "balmoral-residences"],
  ["Disney Castaway Cay", "Site Development", "2023/04/BHM-disney-castaway-cay-400x284.jpg", "disney-castaway-cay"],
  ["High Point Estates", "Site Development", "2023/04/BHM-high-point-estates-400x284.jpg", "high-point-estates"],
  ["Winding Bay Abaco", "Site Development", "2023/04/The-Abaco-Club-web-400x284.jpg", "winding-bay-abaco"],
  ["Gin Sur Mer", "Site Development", "2023/04/BHM-gin-sur-mer-400x284.jpg", "gin-sur-mer"],
  ["Water Distribution on the Family Islands (IDB funded)", "Utility Infrastructure", "2023/03/Water-Distribution-Funded-IDB-400x284.jpg", "water-distribution-funded-idb"],
  ["Western New Providence Water Improvement Upgrade", "Utility Infrastructure", "2024/02/RO-pg-47-2017-02-17-07.36.16-400x284.jpg", "western-new-providence-water-improvement-upgrade"],
  ["Nassau Road Improvement Project", "Road Construction", "2024/02/20-400x284.jpg", "nassau-road-improvement-project"],
  ["Green Turtle Cay", "Utility Infrastructure", "2023/03/BHM-green-turtle-cay-400x284.jpg", "green-turtle-cay"],
  ["Atlantis Chilled Water Line for Dolphin Cay", "Utility Infrastructure", "2023/03/BHM-Atlantis-009-400x284.jpg", "atlantis-chilled-water-installation-for-dolphin-cay"],
  ["BPL New Power Plant Infrastructure Works", "Utility Infrastructure", "2023/03/BHM-BPL-400x284.jpg", "bpl-power-plant"],
  ["Shirley Street Water & Sewage Rehabilitation", "Utility Infrastructure", "2024/02/40-400x284.jpg", "shirley-street"],
  ["Borco", "Site Development", "2023/03/BHM-borco-400x284.jpg", "borco"],
  ["BEC Substation & Generator Facility, Baha Mar", "Utility Infrastructure", "2024/02/baha-mar-400x284.jpg", "bec-substation"],
  ["Wells Capability", "Drilling", "2024/02/43-400x284.jpg", "wells-capability-data-sheet"],
  ["Albany Cottage", "Buildings", "2024/02/46-400x284.jpg", "albany-cottage"],
  ["Endauld Building", "Buildings", "2023/01/BHM-Endauld-1-400x284.jpg", "endauld"],
  ["East Bay Marina", "Coastal & Marine", "2023/05/BHM-Bay-Street-Marina-002-400x284.jpg", "east-bay-marina"],
  ["Post Office Rehabilitation", "Buildings", "2023/01/BHM-post-office-400x284.jpg", "post-office-rehabilitation"],
  ["Independence Business Park", "Buildings", "2024/02/14-400x284.jpg", "independence-business-park"],
  ["Lucayan Products Greenhouse", "Buildings", "2023/01/BHM-Lucayan-Tropical-400x284.jpg", "lucayan-tropical-green-house"],
].map(([name, cat, thumb, slug]) => ({ name, cat: cat as Cat, thumb: T + thumb, url: P + slug + "/" }))
