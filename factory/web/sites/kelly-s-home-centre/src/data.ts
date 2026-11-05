const M = "https://www.kellysbahamas.com/m/Store%20Images%2FCategory%20Images%2FMain%20Category%20Images%2FCOLOR%2F"
const K = "https://www.kellysbahamas.com"
export const SHOP = `${K}/products/`
export const REGISTRY = "https://eagleregistry.net/kellyshc"
export const DEPTS: { name: string; img: string; href: string; group: "home" | "build" | "life" }[] = [
  { name: "Fine china, crystal and flatware", img: `${M}fine-china-2.jpg`, href: `${K}/pl/fine-china-crystal-flatware/1`, group: "home" },
  { name: "General housewares", img: `${M}general-housewares-2.jpg`, href: `${K}/c/general-housewares/2`, group: "home" },
  { name: "Electrical housewares", img: `${M}electrical-housewares-2.jpg`, href: `${K}/c/electric-houseware/3`, group: "home" },
  { name: "Home decor", img: `${M}home-decor-2.jpg`, href: `${K}/c/home-decor/8`, group: "home" },
  { name: "Home textiles", img: `${M}Home%20Textiles.jpg`, href: `${K}/c/linens-sheets-towels-table-cloths-etc/9`, group: "home" },
  { name: "Paint", img: `${M}paint-2.jpg`, href: `${K}/c/paint/13`, group: "build" },
  { name: "Hardware and fasteners", img: `${M}hardware-and-fasteners-2.jpg`, href: `${K}/c/hardware-fasteners/14`, group: "build" },
  { name: "Hand and power tools", img: `${M}hand-power-tools-2.jpg`, href: `${K}/c/hand-power-tools/15`, group: "build" },
  { name: "Plumbing tools, fittings and fixtures", img: `${M}plumbing-2.jpg`, href: `${K}/c/plumbing-tools-fittings-fixtures/11`, group: "build" },
  { name: "Electrical", img: `${M}electrical-2.jpg`, href: `${K}/c/electrical/16`, group: "build" },
  { name: "Building supplies", img: `${M}building-supplies-2.jpg`, href: `${K}/c/building-supplies/12`, group: "build" },
  { name: "Lawn and garden", img: `${M}lawn-garden-2.jpg`, href: `${K}/c/lawn-garden/19`, group: "build" },
  { name: "Outdoor living", img: `${M}outdoor-2.jpg`, href: `${K}/c/outdoor-living/20`, group: "life" },
  { name: "Toys, games and puzzles", img: `${M}toys-2.jpg`, href: `${K}/c/toys-games-puzzles/4`, group: "life" },
  { name: "Baby and infant essentials", img: `${M}baby-2.jpg`, href: `${K}/c/baby-infant-essentials/10`, group: "life" },
  { name: "Sporting goods", img: `${M}sporting-goods-2.jpg`, href: `${K}/c/sporting-goods/18`, group: "life" },
  { name: "Pet supplies", img: `${M}pet-supplies-2.jpg`, href: `${K}/pl/sporting-goods-pet-supplies-food/199`, group: "life" },
  { name: "Automotive", img: `${M}automotive-4.jpg`, href: `${K}/c/automotive/17`, group: "life" },
  { name: "Office and school supplies", img: `${M}office-2.jpg`, href: `${K}/pl/office-school-supplies/5`, group: "life" },
  { name: "Seasonal", img: `${K}/m/store-images/category-images/main-category-images/color/seasonal.jpg`, href: `${K}/c/seasonal/7`, group: "life" },
]
// "Whether you're getting married, expecting a baby, painting your house or planting a garden" (their About page)
export const MOMENTS = [
  { id: "married", label: "Getting married", line: "Set up a gift registry for the wedding, then let guests shop it.", depts: ["Fine china, crystal and flatware", "Home textiles", "Electrical housewares"], cta: ["Open the gift registry", REGISTRY] },
  { id: "baby", label: "Expecting a baby", line: "Registry for the shower, and the baby department for everything after.", depts: ["Baby and infant essentials", "Toys, games and puzzles", "Home textiles"], cta: ["Open the gift registry", REGISTRY] },
  { id: "paint", label: "Painting the house", line: "Paint, tools and hardware under one roof, with Contractor Cards for the trade.", depts: ["Paint", "Hand and power tools", "Hardware and fasteners"], cta: ["Shop paint online", `${K}/c/paint/13`] },
  { id: "garden", label: "Planting a garden", line: "Lawn and garden, outdoor living and the tools to keep it going.", depts: ["Lawn and garden", "Outdoor living", "Hand and power tools"], cta: ["Shop lawn and garden", `${K}/c/lawn-garden/19`] },
]
