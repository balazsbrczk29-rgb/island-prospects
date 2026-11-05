import type { Dept } from "./Counter"
export const SHOP = "https://nassaupaperco.com/shop/"
export const DEPTS: { id: Dept; name: string; line: string; includes: string[] }[] = [
  { id: "disposables", name: "Disposables", line: "Cups, plates, foil and takeaway packaging for kitchens, canteens and events.", includes: ["Dart", "Solo plastic and paper products", "Marcal paper products", "Foil products", "Popcorn bags", "Water"] },
  { id: "janitorial", name: "Cleaning and janitorial", line: "The store's largest department: everything a cleaning crew or facilities team restocks.", includes: ["Janitorial supplies", "Rubbermaid", "Roll towel", "Canliners and zip bags"] },
  { id: "paper", name: "Copy paper and office", line: "Copy paper and office supplies for desks, classrooms and print rooms.", includes: ["Copy paper and supplies", "Office supplies and equipment"] },
  { id: "envelopes", name: "Paper, envelopes, chart paper", line: "Envelopes and specialty paper, from mailing to the classroom wall.", includes: ["Envelopes", "Chart paper", "Paper"] },
  { id: "liners", name: "Eco-friendly products", line: "A dedicated range of eco-friendly alternatives.", includes: ["Eco-friendly products"] },
  { id: "shipping", name: "Warehouse and shipping", line: "Supplies for packing, storing and sending.", includes: ["Warehouse and shipping supplies"] },
]
export const EXTRA = [["Gift wrap, bows and accessories", "Wrapping for retail counters and the holidays."], ["Candy and gum", "Stocked alongside the everyday supplies."], ["Commercial printing", "Full commercial printing through Napco Printing Service, at the same Carib Road address."]]
