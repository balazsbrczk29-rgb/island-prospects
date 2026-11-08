export const SQ = "https://images.squarespace-cdn.com/content/v1/685164f5603a7f2c27ad6720/"
export const GEN = "https://ip-assets-thermoset-roofing.lovable.app/assets/"

export const PHONE_OFFICE = "(242) 328-7017"
export const TEL_OFFICE = "+12423287017"
export const EMAIL_GM = "croix.culmer@thermosetroofing242.com"

export const OWN = {
  hero: SQ + "2c132234-ef75-4633-93aa-a3ab3b043533/a827c3e8-ae10-4bb1-97b9-1a8100b023d7.jpeg",
  june: SQ + "3fd21fc3-d414-4ad4-8aa3-4e43ec25d640/PHOTO-2025-06-23-13-59-54.jpg",
  membrane: SQ + "30e95db4-7162-4a03-afe2-feede133298a/IMG_4711.jpeg",
  waterproof: SQ + "73e36bd3-582d-4ed1-8a4e-47635d9aa4ad/IMG_8670.jpeg",
  maint: SQ + "63931fc6-e57c-4101-afbf-8ab5dce20cad/IMG_4723.jpeg",
  scaffold: SQ + "8f25b357-e661-4cb8-8f69-d30fd36857d1/IMG_4719.jpeg",
  general: SQ + "25e12ffd-84e2-4780-a822-d6b9ccf08728/IMG_7262.JPG",
  s4897: SQ + "9b3a63b1-7e7e-461e-9e24-86315e18cf93/IMG_4897.jpg",
  s4903: SQ + "a9b9b455-9dc1-414b-9b16-def07cfbaecd/IMG_4903.jpeg",
  s4904: SQ + "f4ed6fe0-8479-4c11-b50b-d0fc2b0094c1/IMG_4904.jpeg",
  s4895: SQ + "97d1f1f7-2e68-4435-b790-155c71ef5f5f/IMG_4895.jpeg",
  s4710: SQ + "1aff7691-b4fe-4ae0-856d-10ff7b08598b/IMG_4710.jpeg",
  s4894: SQ + "8851b116-a2eb-42bc-a620-4f9394028489/IMG_4894+%281%29.jpeg",
}

export const COMMONS_NASSAU = {
  src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Bahamas_1989_%28758%29_New_Providence_Nassau_%2826189368791%29.jpg/3840px-Bahamas_1989_%28758%29_New_Providence_Nassau_%2826189368791%29.jpg",
  credit: "Photo: Rüdiger Stehn, CC BY-SA 2.0, via Wikimedia Commons",
  page: "https://commons.wikimedia.org/wiki/File:Bahamas_1989_(758)_New_Providence_Nassau_(26189368791).jpg",
}

export type Layer = { key: string; name: string; text: string }
export const LAYERS: Layer[] = [
  { key: "deck", name: "Structural deck", text: "Every job starts here. A roof condition assessment comes back with photographs, core cuts and a written repair recommendation." },
  { key: "vapour", name: "Vapour retarder", text: "A sheet laid over the deck that keeps moisture from inside the building out of the roof above it." },
  { key: "insulation", name: "Insulation boards", text: "Rigid boards laid tight over the whole field, shaped so water runs to the drains." },
  { key: "cover", name: "Cover board", text: "A firm board over the insulation that takes foot traffic and gives the membrane a smooth base." },
  { key: "membrane", name: "Single-ply membrane", text: "TPO or PVC thermoplastic, heat-welded at every seam. Thermoset installs these on commercial and residential flat roofs." },
  { key: "edge", name: "Edge metal and AC curbs", text: "Perimeter flashing to ANSI/SPRI ES-1 in Kynar-finished aluminium or galvanised steel, and custom curbs under the rooftop HVAC, flashed TPO-compatible." },
]

export type Finish = { key: "tpo" | "pvc" | "modbit" | "metal" | "liquid"; name: string; line: string; photo: string; alt: string }
export const FINISHES: Finish[] = [
  { key: "tpo", name: "TPO single-ply", line: "High-performance thermoplastic membrane for commercial and residential flat roofs. White, heat-welded seams.", photo: GEN + "seam-weld.jpg", alt: "Gloved hands heat-welding the seam of a white TPO membrane" },
  { key: "pvc", name: "PVC single-ply", line: "The second single-ply thermoplastic on Thermoset's list, heat-welded at the seams like TPO.", photo: GEN + "aerial-membrane.jpg", alt: "A white single-ply membrane roof with air-conditioning units on metal curbs, seen from above" },
  { key: "modbit", name: "Modified bitumen", line: "Multi-layer, torch-applied assemblies for waterproofing and UV resistance.", photo: GEN + "mod-bit.jpg", alt: "Roll of modified bitumen roofing being unrolled across a concrete roof" },
  { key: "metal", name: "Standing seam metal", line: "Custom fabricated aluminium or steel panels with concealed fasteners and Kynar finishes.", photo: GEN + "standing-seam.jpg", alt: "A yellow Bahamian house with louvred shutters and a grey standing seam metal roof" },
  { key: "liquid", name: "Liquid-applied", line: "Liquid membranes for terraces and balconies, laid beneath tile or concrete toppings.", photo: GEN + "waterproofing.jpg", alt: "A roller spreading grey liquid waterproofing across a concrete deck" },
]

export const MAKERS = ["Carlisle", "Elevate", "Englert", "Sika", "Siplast", "Tremco"]

export const RADAR = [
  ["Scheduled preventative maintenance", "Routine inspections and debris removal, so small problems are found early."],
  ["Leak investigation and repair", "Prompt response to active leaks, with full documentation and visual reports."],
  ["Roof condition reports", "After each visit: high-resolution photographs, core samples where needed, and clear next steps."],
  ["Priority emergency service", "Members go to the front of the line during storms and sudden repairs."],
  ["Asset management planning", "Annual reporting and capital planning for facility budgets."],
  ["Warranty compliance monitoring", "Keeps the roof meeting the manufacturer's warranty requirements."],
]

export const CLIENTS: Record<string, string[]> = {
  "Resorts and hotels": ["Baha Mar", "Atlantis", "Sandals Royal Bahamian", "Goldwynn", "Harborside", "Albany", "Breezes", "Four Seasons (now Ocean Club)", "Aquilina Resort", "The One", "The Pointe and Margaritaville", "The British Colonial Hotel"],
  "Churches": ["Christ Church Cathedral", "The Church of the Most Holy Trinity", "Hillview Seventh Day Adventist Church", "St. George's Anglican Church", "Epiphany Church", "Grants Town Seventh Day Adventist Church", "Saint Martin de Porres Convent", "The Bahamas Jewish Center"],
  "Public buildings": ["Lynden Pindling International Airport", "U.S. Embassy, Nassau", "The Princess Margaret Hospital", "Festival Place", "Loyola Hall", "Mount Moriah Community Center", "The Paradise Island Police Station"],
  "Commercial": ["The Mall at Marathon", "Sysco Bahamas Food Service", "Cable Bahamas", "Batelco", "Wendy's (Freeport and Nassau)", "Popeye's", "Shell and Rubis stations", "B.A.F. Insurance", "J.S. Johnson Insurance", "Tropic Seafood", "Sandy Port Plaza", "ASA H. Pritchard Ltd."],
}
