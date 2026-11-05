export const V = "https://bahamasbus.com/assets/images/vehicles/"
export type Use = "family" | "work" | "people" | "electric"
export type Model = { brand: string; model: string; kind: string; line: string; img: string; uses: Use[] }
export const NEW: Model[] = [
  { brand: "GWM Haval", model: "H6", kind: "Midsize SUV", line: "All-around family vehicle", img: "h6-2026", uses: ["family"] },
  { brand: "GWM Haval", model: "H6GT", kind: "Crossover", line: "Sporty coupe", img: "h6gt-2026", uses: ["family"] },
  { brand: "GWM Haval", model: "H7 (HEV)", kind: "Large SUV", line: "All-terrain family vehicle", img: "h7-hev-2026", uses: ["family"] },
  { brand: "GWM Haval", model: "H9", kind: "Large SUV", line: "4x4 seven-seater", img: "h9-2027", uses: ["family", "people"] },
  { brand: "GWM Haval", model: "Jolion", kind: "Small SUV", line: "Smart, stylish, tech-packed crossover", img: "jolion-2026", uses: ["family"] },
  { brand: "GWM Ora", model: "03 GT", kind: "Hatchback", line: "Luxury small electric vehicle", img: "03-gt-2026", uses: ["electric"] },
  { brand: "GWM Tank", model: "300", kind: "Midsize SUV", line: "Rugged, all-terrain vehicle", img: "tank-300-2027", uses: ["family"] },
  { brand: "GWM Tank", model: "500", kind: "Large SUV", line: "Executive, 4x4 capable vehicle", img: "500-2026", uses: ["family", "people"] },
  { brand: "Mitsubishi", model: "Outlander", kind: "Large SUV", line: "Premium and synthetic leather versions", img: "outlander-2025", uses: ["family"] },
  { brand: "GWM Poer", model: "P-Series", kind: "Pickup", line: "Diesel pickup", img: "p-series-2027", uses: ["work"] },
  { brand: "RAM", model: "1500 Bighorn", kind: "Pickup", line: "Workhorse power with a first-class cabin", img: "ram1500-2025", uses: ["work"] },
  { brand: "FUSO", model: "Canter 10 ft (FE)", kind: "Truck", line: "Great all-around flat bed", img: "canter-2026", uses: ["work"] },
  { brand: "FUSO", model: "Canter 14 ft (FE)", kind: "Truck", line: "Construction workhorse", img: "canter-14-foot-2025", uses: ["work"] },
  { brand: "CMC", model: "D260", kind: "Van", line: "Great taxi or church van", img: "d260-2025", uses: ["people"] },
  { brand: "CMC", model: "D260 Panel", kind: "Van", line: "Cargo van", img: "d260-panel-2026", uses: ["work"] },
  { brand: "CMC", model: "D260 Semi Panel", kind: "Van", line: "Great messenger van", img: "d260-semi-panel-2026", uses: ["work", "people"] },
]
export const USES: { id: Use; label: string; line: string }[] = [
  { id: "family", label: "For the family", line: "SUVs and crossovers for school runs, weekends and the whole island." },
  { id: "work", label: "For work", line: "Pickups, flat beds and cargo vans for contractors and deliveries." },
  { id: "people", label: "For moving people", line: "Taxi, church and seven-seat vehicles." },
  { id: "electric", label: "Electric", line: "A small, luxury electric car for town." },
]
export const USED = [
  { id: "14533", name: "Mitsubishi Outlander", kind: "SUV", price: 36000 },
  { id: "14692", name: "Nissan Serena", kind: "Van", price: 13559 },
  { id: "14661", name: "Nissan Serena", kind: "Van", price: 13258 },
  { id: "14532", name: "Nissan Sentra", kind: "Sedan", price: 8900 },
  { id: "14608A", name: "Jeep Renegade", kind: "SUV", price: null },
  { id: "14534", name: "Jeep Renegade", kind: "SUV", price: null },
] as { id: string; name: string; kind: string; price: number | null }[]
export const BRANDS = ["Chrysler", "Dodge", "Jeep", "RAM", "GWM", "Mitsubishi", "CMC", "FUSO", "JCB"]
export const DEPTS = [
  { id: "sales", name: "Vehicle sales", email: "sales@bahamasbus.com", purpose: "New and used vehicle sales, trade-ins and general sales enquiries.", hours: [["Mon to Fri", "8am to 5pm"], ["Sat", "9am to 1pm"], ["Sun", "Closed"]], notes: ["Appointments preferred for test drives, not required."] },
  { id: "service", name: "Service", email: "service@bahamasbus.com", purpose: "Scheduled maintenance, warranty work and general servicing.", hours: [["Mon to Fri", "8am to 5pm"], ["Sat and Sun", "Closed"]], notes: ["Appointments required.", "Drop off by 9am for same-day service consideration.", "Walk-ins if availability allows, not guaranteed.", "No in-house body shop: reception will direct you to the current partner facility."] },
  { id: "parts", name: "Parts", email: "parts@bahamasbus.com", purpose: "Genuine parts sales and special orders.", hours: [["Mon to Fri", "8am to 5pm"], ["Sat", "8am to 12pm"], ["Sun", "Closed"]], notes: ["Have your VIN handy for the quickest service.", "Genuine parts for the brands sold here, plus a small selection of Japanese parts.", "Special orders for non-stock items; timing varies by model and year."] },
  { id: "accounts", name: "Accounts", email: "info@bahamasbus.com", purpose: "Billing, payments and invoicing.", hours: [["Mon to Fri", "8am to 5pm"], ["Sat and Sun", "Closed"]], notes: ["No walk-ins.", "Call the main office and say whether it is billing, payments or invoicing."] },
]
