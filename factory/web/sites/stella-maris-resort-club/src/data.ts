import { U2 } from "./site"
const U = U2 + "2021/"
export type Unit = { id: string; name: string; kind: string; beds: number; desc: string; tags: ("pool" | "atlantic" | "kitchen" | "beach")[]; img: string; img2: string }
export const UNITS: Unit[] = [
  { id: "room", name: "Ocean view room", kind: "Hotel room", beds: 1, desc: "Atlantic ocean view, with a king or two double beds.", tags: ["atlantic"], img: U + "10/5-9-1024x683.jpg", img2: U + "10/room-1024x683.jpg" },
  { id: "cottage", name: "One-bedroom cottage", kind: "Cottage", beds: 1, desc: "King bed and a small living room, facing a small fresh water pool, partial ocean view.", tags: ["pool"], img: U + "10/1-11-1024x683.jpg", img2: U + "10/7-10-1024x684.jpg" },
  { id: "apartment", name: "One-bedroom apartment", kind: "Apartment", beds: 1, desc: "Two double beds, a pull-out couch and a fully equipped kitchenette.", tags: ["kitchen"], img: U + "11/Apt2.jpg", img2: U + "11/Apt5.jpg" },
  { id: "sand-dollar", name: "Sand Dollar Cottage", kind: "Two bedrooms", beds: 2, desc: "A screened-in porch overlooking the Atlantic.", tags: ["atlantic"], img: U + "10/1-12-1024x683.jpg", img2: U + "10/3-9-1024x683.jpg" },
  { id: "sea-la-vie", name: "Sea La Vie Cottage", kind: "Two bedrooms", beds: 2, desc: "Beautiful views of the Atlantic.", tags: ["atlantic"], img: U + "10/8-10.jpg", img2: U + "10/4-11.jpg" },
  { id: "gecko", name: "Gecko House", kind: "Three bedrooms", beds: 3, desc: "Right on the beach, with gorgeous ocean views.", tags: ["beach", "atlantic"], img: U + "10/13-7-1024x683.jpg", img2: U + "10/4b-3-1024x683.jpg" },
  { id: "carolyns", name: "Carolyn's Favourite", kind: "Three bedrooms", beds: 3, desc: "Panoramic Atlantic Ocean views and a large open kitchen.", tags: ["atlantic", "kitchen"], img: U + "10/14-6.jpg", img2: U + "10/8-11-1024x683.jpg" },
  { id: "rainbow", name: "Rainbow Villa", kind: "Three bedrooms", beds: 3, desc: "A spectacular infinity salt water pool, right on the Atlantic.", tags: ["pool", "atlantic"], img: U + "10/1-14-1024x683.jpg", img2: U + "10/12-10-1024x683.jpg" },
  { id: "flamingo", name: "Flamingo House", kind: "Four bedrooms", beds: 4, desc: "A porch overlooking the Atlantic Ocean.", tags: ["atlantic"], img: U + "10/3-10-1024x684.jpg", img2: U + "10/1-15-1024x683.jpg" },
  { id: "dolphin", name: "Dolphin House", kind: "Four bedrooms", beds: 4, desc: "A fresh water pool among coconut palms, with Caribbean-blue Atlantic views.", tags: ["pool", "atlantic"], img: U + "10/1-16-1024x683.jpg", img2: U + "10/4-12-1024x683.jpg" },
]
export const TAGS = { atlantic: "Atlantic view", pool: "A pool of its own or close by", kitchen: "A kitchen", beach: "Right on the beach" } as const
export const ACTIVITIES = ["Scuba diving", "Dean's Blue Hole", "Bonefishing", "Big game fishing", "Snorkelling", "Kayak and paddle board", "Sailing", "Biking", "Caves and bird life", "Excursion to nearby islands", "Rum Punch Party"]
