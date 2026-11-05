export const U = "https://bhmgroup.com/wp-content/uploads/"
export const PHONE = "+1 (242) 601-6350"
export const TEL = "tel:+12426016350"
export const EMAIL = "info@bhmgroup.com"
export type Proj = { id: string; name: string; kind: "Airports" | "Roads" | "Ports and sites"; island: string; x: number; y: number; img: string; href: string }
// x,y on a 880x620 chart of the Bahamas (illustration, not to scale)
export const PROJECTS: Proj[] = [
  { id: "lpia", name: "Lynden Pindling International, runway 10-28", kind: "Airports", island: "New Providence", x: 470, y: 268, img: U + "2024/02/002-BHM-LPIA-Runway-10-29-Resurface-DJI_0151-002-400x284.jpg", href: "https://bhmgroup.com/project/lynden-pindling-international-airport-rehabilitation-of-runway/" },
  { id: "lpia-x", name: "LPIA expansion", kind: "Airports", island: "New Providence", x: 482, y: 262, img: U + "2024/02/curbside-7-e1432750951227-400x284.jpg", href: "https://bhmgroup.com/project/lynden-pindling-international-airport/" },
  { id: "gbia", name: "Grand Bahama International Airport", kind: "Airports", island: "Grand Bahama", x: 236, y: 92, img: U + "2024/02/GBIA-0477-400x284.jpg", href: "https://bhmgroup.com/project/grand-bahama-international-airport/" },
  { id: "mh", name: "Marsh Harbour International Airport", kind: "Airports", island: "Abaco", x: 470, y: 84, img: U + "2023/08/BHM-abaco-aiport-400x284.jpg", href: "https://bhmgroup.com/project/marsh-harbour-runway/" },
  { id: "bimini", name: "Bimini Airport", kind: "Airports", island: "Bimini", x: 130, y: 230, img: U + "2023/08/BHM-bimini-airport-400x284.jpg", href: "https://bhmgroup.com/project/bimini-airport-runway/" },
  { id: "hog", name: "Hog Cay, new runway and apron", kind: "Airports", island: "Exuma Cays", x: 600, y: 372, img: U + "2024/02/087-BHM-Hog-Cay-Sept-DJI_3112-400x284.jpg", href: "https://bhmgroup.com/project/hog-cay-runway/" },
  { id: "norman", name: "Norman's Cay runway", kind: "Airports", island: "Exuma Cays", x: 560, y: 330, img: U + "2024/02/Normans-Cay-Chip-Coat-3-400x284.jpg", href: "https://bhmgroup.com/project/normans-cay-runway/" },
  { id: "odyssey-ex", name: "Odyssey Exuma", kind: "Airports", island: "Exuma", x: 664, y: 430, img: U + "2023/08/20240411-MarkDaCunha-BHM-0036-400x284.jpg", href: "https://bhmgroup.com/project/odyssey-exuma/" },
  { id: "bay", name: "Bay Street road rehabilitation", kind: "Roads", island: "New Providence", x: 490, y: 276, img: U + "2023/09/bhm-bay-street-400x284.jpg", href: "https://bhmgroup.com/project/bay-street-pavement/" },
  { id: "bahamar", name: "Baha Mar, West Bay Street and C7 realignment", kind: "Roads", island: "New Providence", x: 462, y: 278, img: U + "2024/02/30-400x284.jpg", href: "https://bhmgroup.com/project/baha-mar-west-bay-street-c7-realignment/" },
  { id: "eleuthera", name: "Eleuthera roads", kind: "Roads", island: "Eleuthera", x: 600, y: 250, img: U + "2023/09/BHM-road-eleuthera-repair-2-400x284.jpg", href: "https://bhmgroup.com/project/eleuthera-roads/" },
  { id: "carnival", name: "Carnival Grand Cruise Port, new access road", kind: "Ports and sites", island: "Grand Bahama", x: 300, y: 104, img: U + "2023/09/BHM-carnival-gibson-feb25--400x284.jpg", href: "https://bhmgroup.com/project/carnival-grand-cruise-port-new-access-road/" },
  { id: "stadium", name: "National Stadium", kind: "Ports and sites", island: "New Providence", x: 478, y: 284, img: U + "2024/02/25-400x284.jpg", href: "https://bhmgroup.com/project/national-stadium/" },
]
export const CAPS = [
  { id: "roads", t: "Road construction", d: "New roads, milling, surfacing, rehabilitation resurfacing, maintenance and traffic management, with an owned fleet of heavy equipment and in-house mechanics." },
  { id: "airports", t: "Airports and runways", d: "More than three decades of airside and landside work in live, secure environments, on international and Family Island airports." },
  { id: "asphalt", t: "Hot mix asphalt supply", d: "Designed and manufactured to international specifications. Three asphalt plants, two of them fully mobile, and bitumen modified to Performance Grades." },
  { id: "concrete", t: "Ready mix concrete", d: "Concrete production and supply, including BHM's concrete mixing plant in Grand Bahama." },
  { id: "ports", t: "Ports, coastal and marine", d: "Port works and coastal defences for the islands' waterfronts." },
  { id: "water", t: "Reverse osmosis and water", d: "Drinking water and sanitation infrastructure." },
  { id: "site", t: "Site development, utilities and drilling", d: "Site development, utility infrastructure, drilling and buildings." },
]
export const OFFICES = [
  { name: "Nassau", co: "BHM Co. Ltd.", lines: ["Airport Industrial Park", "P.O. Box CB-10990, Nassau"], q: "Airport+Industrial+Park,+Nassau,+Bahamas" },
  { name: "Grand Bahama", co: "BHM (GB) Co. Ltd.", lines: ["Off Freeport Container Port Road", "P.O. Box F-42499, Grand Bahama"], q: "Freeport+Container+Port,+Grand+Bahama" },
  { name: "Abaco", co: "BHM, Abaco", lines: ["Airport Roundabout, Ernest Dean Highway", "P.O. Box AB-20184, Abaco"], q: "Ernest+Dean+Highway,+Marsh+Harbour,+Abaco" },
]
