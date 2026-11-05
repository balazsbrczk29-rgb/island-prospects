export const PHONE = "+1 242 356 5454"
export const TEL = "tel:+12423565454"
export const LOGIN = "https://www.ebankingwinterbotham.com/home/index.aspx?IdiomaUsuario=I1"
export const HQ = "Winterbotham Place, Marlborough & Queen Streets, Nassau"

export const OFFICES = [
  { id: "nassau", city: "Nassau", country: "The Bahamas", tz: "America/Nassau", role: "Head office and trading desk", address: "Winterbotham Place, Marlborough & Queen Streets, P.O. Box N-3026, Nassau", phone: "+1 242 356 5454", tel: "+12423565454" },
  { id: "cayman", city: "Grand Cayman", country: "Cayman Islands", tz: "America/Cayman", role: "Office", address: "Grand Pavilion Commercial Centre, West Bay Road, Grand Cayman", phone: "+1 345 946 2374", tel: "+13459462374" },
  { id: "montevideo", city: "Montevideo", country: "Uruguay", tz: "America/Montevideo", role: "Winterbotham House", address: "Avda. de las Americas 8000, Parque Miramar, Canelones", phone: "+598 2601 6544", tel: "+59826016544" },
  { id: "sanjuan", city: "San Juan", country: "Puerto Rico", tz: "America/Puerto_Rico", role: "Office", address: "270 Munoz Rivera Avenue, Suite 320, San Juan 00918", phone: "+1 787 622 0060", tel: "+17876220060" },
  { id: "hongkong", city: "Hong Kong", country: "China", tz: "Asia/Hong_Kong", role: "Office", address: "Unit 3103A, Tower 2, Lippo Centre, 89 Queensway, Admiralty", phone: "+852 2526 6898", tel: "+85225266898" },
  { id: "brisbane", city: "Brisbane", country: "Australia", tz: "Australia/Brisbane", role: "SeventyTwo Capital", address: "Level 38, 71 Eagle Street, Brisbane, Queensland 4000", phone: "+61 417 170 301", tel: "+61417170301" },
] as const

export const SERVICES = [
  { id: "trust", name: "Trust", line: "Trustee and trust administration for families and corporations, full services to Private Trust Companies, and corporate trust: escrow agent, loan trustee and dissolution trusts." },
  { id: "funds", name: "Funds", line: "The whole life of a fund: advisory, licensing and incorporation, then accounting, NAV calculation, registrar and transfer agency, compliance, reporting, investor relations and domiciliary services." },
  { id: "corporate", name: "Corporate", line: "Cross-border investment and estate planning through company formation, administration, accounting, IT support, compliance, governance, reporting and physical presence on an outsourced basis." },
  { id: "bank", name: "Bank", line: "Cash management for cross-border business: wire receipts and payments, fiduciary placements, foreign exchange, agency services and private placements on a multi-currency platform." },
  { id: "brokerage", name: "Brokerage", line: "Global execution and trading support through international correspondents and prime brokers, run centrally from the trading desk in Nassau." },
  { id: "custody", name: "Global custody", line: "Custody for corporate, institutional and private clients, with a specialism in funds, through major depositories and sub-custodians." },
  { id: "finance", name: "Corporate finance", line: "Growth strategy, capital raising and M&A for entrepreneurs, their businesses and family offices, through SeventyTwo Global." },
  { id: "sports", name: "Sports management", line: "Career, commercial and business support for professional athletes, through SeventyTwo Sports Group." },
] as const

export const AUDIENCES = [
  { id: "family", label: "A family or individual", services: ["trust", "corporate", "bank", "custody"] },
  { id: "company", label: "A company", services: ["corporate", "trust", "bank", "finance"] },
  { id: "fund", label: "A fund or fund manager", services: ["funds", "custody", "brokerage", "bank"] },
  { id: "institution", label: "A financial institution", services: ["custody", "brokerage", "bank", "trust"] },
  { id: "athlete", label: "A professional athlete", services: ["sports", "trust", "bank"] },
] as const
