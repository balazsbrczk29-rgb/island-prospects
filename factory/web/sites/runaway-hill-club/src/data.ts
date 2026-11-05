const U = "https://runawayhill.com/wp-content/uploads/"
export const IMG = {
  hero: U + "2021/04/runawayhillinn_hotel_harbourislandbahamas14-1.jpg",
  restaurant: U + "2026/02/Restaurant-Section-1-scaled.jpg",
  pool: U + "2025/01/IMG_0148-1170x430.jpg",
  patio: U + "2025/01/IMG_0136-705x697.jpg",
  lounge: U + "2025/01/Screenshot-2025-01-29-at-3.15.40-PM-705x455.png",
  beach: U + "2018/02/IMG_2284-705x470.jpg",
  yoga: U + "2025/12/Runaway-Hill-Hero-Image-705x470.webp",
  wedding: U + "2023/12/0V2A1830-705x470.jpeg",
  chairs: U + "2018/02/IMG_2336-705x543.jpg",
  house2: U + "2025/01/IMG_0133-582x705.jpg",
  house3: U + "2025/01/IMG_0145-568x705.jpg",
}

export const EMAIL = "Reservations@runawayhill.com"
export const BOOK = "https://direct-book.com/properties/RunawayHillInnDirect"
export const LOCAL = "(242) 333-2150"
export const LOCAL_TEL = "tel:+12423332150"
export const US = "(843) 278-1724"
export const US_TEL = "tel:+18432781724"

export type House = "Main House" | "Courtyard" | "Villas" | "Infinity House"
export type Room = { n: string; name: string; house: House; bed: string; rate: number; note: string; img: string; slug: string }

export const ROOMS: Room[] = [
  { n: "1", name: "Jacqueline Jean", house: "Main House", bed: "King", rate: 595, slug: "jacqueline-jean", img: U + "2018/02/room-1-1-scaled-e1768929281755-705x705.jpg", note: "Oversized, beside reception. Cuban tile floors older than the inn, a walk-in shower, double sinks, a private sunlit courtyard and two ocean-view windows." },
  { n: "2", name: "Alice Emily", house: "Main House", bed: "King, plus a single bed in a small attached room", rate: 690, slug: "alice-emily", img: U + "2018/02/Room-2-thumbnail-705x461.jpg", note: "A king room with a small attached room and single bed, for a parent and child or a friend." },
  { n: "3", name: "Sophia Jean", house: "Main House", bed: "King", rate: 640, slug: "sophia-jean", img: U + "2018/02/IMG_2558-1-705x470.jpg", note: "A king room in the manor house." },
  { n: "4", name: "Rachel Alice", house: "Main House", bed: "Queen", rate: 580, slug: "rachel-alice", img: U + "2018/02/Room-4-thumbnail-no-drapes-705x595.jpg", note: "A guest wrote of ocean views on both sides and from the private terrace." },
  { n: "5", name: "Kathleen Jane", house: "Main House", bed: "Queen", rate: 580, slug: "kathleen-jane", img: U + "2018/02/Room-5-thumbnail-1-705x595.jpg", note: "A queen room in the manor house." },
  { n: "6", name: "Matteo Douglas", house: "Courtyard", bed: "Queen", rate: 495, slug: "matteo-douglas", img: U + "2018/02/Room-6-RH-529x705.jpg", note: "One of three Courtyard rooms that can connect." },
  { n: "7", name: "Mark Umberto", house: "Courtyard", bed: "King", rate: 500, slug: "mark-umberto", img: U + "2018/02/Runaway-Hill-Pink-Room-7-thumbnail-update-RD-705x618.jpg", note: "The pink room of the Courtyard, connects to its neighbours." },
  { n: "8", name: "Luke Francesco", house: "Courtyard", bed: "King", rate: 555, slug: "luke-francesco", img: U + "2018/02/Room-8-529x705.jpg", note: "A Courtyard king that can connect to rooms 6 and 7." },
  { n: "9", name: "Douglas Paul", house: "Villas", bed: "King", rate: 690, slug: "douglas-paul", img: U + "2018/02/IMG_2421-1-705x470.jpg", note: "A villa room, set apart from the house." },
  { n: "10", name: "Tyler Frank", house: "Villas", bed: "King", rate: 690, slug: "tyler-frank", img: U + "2018/02/Room-10-blue-thumbnail-705x570.jpg", note: "The blue villa. A guest wrote of views over both the ocean and the harbour." },
  { n: "11", name: "Lyon Holland", house: "Villas", bed: "King, plus two twin trundles", rate: 1425, slug: "lyonholland", img: U + "2021/05/Runaway-hill-Room-11-thumbnail-705x571.jpg", note: "Two full baths, a kitchen, living room, barbecue and a large outdoor deck with bay water views." },
  { n: "IH", name: "Infinity House", house: "Infinity House", bed: "Three kings and two rooms of two twins", rate: 3107.14, slug: "infinity-house", img: U + "2018/02/infinity-house-thumbnail-705x570.jpg", note: "Five bedrooms on the beach: 2½ baths, kitchen, living room, outdoor shower, barbecue, washer and dryer, a courtyard and an oceanfront deck. Weekly $21,750." },
]

export const money = (v: number) => "$" + v.toLocaleString("en-US", { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 })
