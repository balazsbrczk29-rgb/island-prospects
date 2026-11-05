export const PHONE = "(242) 823-8733"
export const TEL = "tel:+12428238733"
export const PHONE_US = "(407) 610-7000"
export const TEL_US = "tel:+14076107000"
export const WA = "12428159323"
export const WA_LABEL = "242 815 9323"
export const EMAIL = "donnysboatrentals@gmail.com"
const M = "https://static.wixstatic.com/media/"
export const IMG = {
  hero: { src: M + "1c154a_788222cd60354b608e5d96e9b2767508~mv2_d_2000_1499_s_2.jpg", alt: "Aerial view of Donny's marina at the end of Black Sound, boats at the dock in blue water among green trees" },
  dock: { src: M + "1c154a_c9f3faaedba24e4f8f30dbb882f512ea~mv2.jpg", alt: "Donny's dock seen from the air" },
  mooring: { src: M + "1c154a_01e13c9376d54a0da0697eb0f4db1d78~mv2.jpg", alt: "The mooring dock at Donny's" },
}
export const BOATS = [
  { id: "angler", name: "23ft Angler", hp: "200 hp 4-stroke", people: "5 to 6 adults", day: 185, week: 1200, exp: true, kit: ["Buoyancy aids", "Fixed VHF", "Chart-plotter", "Stereo", "Ladder"], img: M + "1c154a_b0fc264e2c234e16910226e11f8d4adf~mv2.jpg", len: 23 },
  { id: "century", name: "20ft Century", hp: "150 hp 4-stroke", people: "5 to 6 adults", day: 170, week: 1075, exp: true, kit: ["Buoyancy aids", "VHF", "Trim tabs", "Chart-plotter", "Stereo", "Ladder", "Anchor and rode", "Cooler"], img: M + "1c154a_1d4e6258cf5d4141963fe64cea0da41a~mv2.jpg", len: 20 },
  { id: "whaler19", name: "19' Boston Whaler", hp: "115 hp 4-stroke", people: "4 adults", day: 140, week: 880, exp: false, kit: ["Buoyancy aids", "Fixed VHF", "Chart-plotter", "Ladder", "Anchor and rode", "Cooler"], img: M + "1c154a_85b6ee3e9b314d0bb82f008894afcedc~mv2.jpg", len: 19 },
  { id: "whaler17", name: "17' Boston Whaler", hp: "60 to 90 hp 4-stroke", people: "2 to 3 adults", day: 125, week: 805, exp: false, kit: ["Buoyancy aids", "VHF", "Ladder", "Anchor and rode", "Cooler"], img: M + "1c154a_aed66bd991d64c718ae73d38dcf47ad2~mv2.jpg", len: 17 },
] as const
export function cost(day: number, week: number, days: number) {
  const d = Math.max(3, days)
  const weeks = Math.floor(d / 7), rest = d % 7
  return weeks * week + Math.min(rest * day, week)
}
export const wa = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
export const TERMS = [
  "Paid in full before the rental starts. There is no ATM on the island and credit cards are not accepted.",
  "A $100 non-refundable deposit is required. 3-day minimum.",
  "Only for guests staying on Green Turtle Cay. The Angler and the Century need boating experience.",
  "Collect from 8am, return by 5pm EST or 6pm EDT. Use between sunrise and sunset; late returns are $30 an hour.",
  "Inside Abaco Sound. Ocean fishing within a mile of shore only if the weather allows and it is agreed with Donny.",
  "Return with the same fuel level. No refunds for weather days.",
]
