export const SHOP = "https://www.cbsbahamas.com/"
export const PHONE = "(242) 677-2100"
export const TEL = "tel:+12426772100"
export const STORE_EMAIL = "cbs@cbsbahamas.com"
export const ONLINE_EMAIL = "online@cbsbahamas.com"
export const ADDRESS = "SouthWest Plaza, Carmichael Road, Nassau"

export type Dept = { id: string; name: string; group: "Build" | "Inside" | "Outside"; line: string; href: string }

export const DEPTS: Dept[] = [
  { id: "doors", name: "Doors & Windows", group: "Build", line: "Entry, interior, security and steel doors from JELD-WEN and Steelcraft; sliding windows from PGT.", href: SHOP + "windows-and-doors--2" },
  { id: "roofing", name: "Roofing", group: "Build", line: "Roofing materials for new roofs and repairs.", href: SHOP + "roofing" },
  { id: "ceilings", name: "Ceilings", group: "Build", line: "USG ceiling tiles and ceiling systems.", href: SHOP + "ceilings--1" },
  { id: "flooring", name: "Flooring", group: "Build", line: "Choice Flooring and laminate for every room.", href: SHOP + "products" },
  { id: "bulk", name: "Bulk Supply", group: "Build", line: "Lumber, PVC pipe and materials in builder quantities.", href: SHOP + "products" },
  { id: "bath", name: "Bath & Faucets", group: "Inside", line: "Toilets, vanities, faucets and fittings.", href: SHOP + "bath-and-faucets--1" },
  { id: "kitchen", name: "Kitchen & Kitchenware", group: "Inside", line: "From countertops to the pots on the stove.", href: SHOP + "kitchen-and-kitchenware--1" },
  { id: "lighting", name: "Lighting & Ceiling Fans", group: "Inside", line: "Fixtures, bulbs and ceiling fans with lights.", href: SHOP + "lighting-and-ceiling-fans--1" },
  { id: "blinds", name: "Blinds & Window Treatments", group: "Inside", line: "Shade for the rooms that face the afternoon sun.", href: SHOP + "products" },
  { id: "decor", name: "Decor & Furniture", group: "Inside", line: "The finishing pieces once the work is done.", href: SHOP + "decor-and-furniture--1" },
  { id: "cleaning", name: "Cleaning & Maintenance", group: "Inside", line: "Everything that keeps a finished house looking new.", href: SHOP + "products" },
  { id: "garden", name: "Lawn & Garden", group: "Outside", line: "Mowers, tools, hoses and the yard behind the wall.", href: SHOP + "lawn-and-garden--1" },
  { id: "patio", name: "Patio & Outdoor Living", group: "Outside", line: "Grills, furniture and the porch you sit on at dusk.", href: SHOP + "outdoor-living-and-patio--1" },
  { id: "marine", name: "Marine & Automotive", group: "Outside", line: "For the boat at the dock and the truck in the yard.", href: SHOP + "products" },
]

export const ISLANDS = [
  { id: "abaco", name: "Abaco", town: "Marsh Harbour", x: 452, y: 92 },
  { id: "grand-bahama", name: "Grand Bahama", town: "Freeport", x: 300, y: 70 },
  { id: "bimini", name: "Bimini", town: "Alice Town", x: 150, y: 210 },
  { id: "andros", name: "Andros", town: "Andros Town", x: 300, y: 330 },
  { id: "eleuthera", name: "Eleuthera", town: "Governor's Harbour", x: 560, y: 230 },
  { id: "exuma", name: "Exuma", town: "George Town", x: 560, y: 420 },
  { id: "cat-island", name: "Cat Island", town: "New Bight", x: 660, y: 330 },
  { id: "long-island", name: "Long Island", town: "Stella Maris", x: 680, y: 470 },
  { id: "inagua", name: "Inagua", town: "Matthew Town", x: 860, y: 600 },
] as const

export const NASSAU = { x: 430, y: 250 }
