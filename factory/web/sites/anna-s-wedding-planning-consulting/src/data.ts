// Every fact here comes from annasweddingbahamas.com (package pages and the /book-now request form), Nov 2026.
export const IMG = "https://www.annasweddingbahamas.com/wp-content/uploads/"

export type KindId = "beach" | "cruise" | "cultural" | "deluxe" | "renewal"
export type Kind = { id: KindId; name: string; one: string; short: string; from: number; img: string; alt: string; pos: string }

export const KINDS: Kind[] = [
  { id: "beach", name: "Beach weddings", one: "Beach wedding", short: "Beach", from: 950, img: IMG + "2025/09/robs-wedding-scaled.jpg", alt: "A bride and groom under a white rose arbor on the beach in Nassau, with turquoise water behind them", pos: "50% 35%" },
  { id: "cruise", name: "Cruise-day weddings", one: "Cruise-day wedding", short: "Cruise day", from: 3495, img: IMG + "2015/11/cruise-package-img1.jpg", alt: "A couple under a parasol on the beach with their cruise ship anchored behind them", pos: "40% 40%" },
  { id: "cultural", name: "Cultural ceremonies", one: "Cultural ceremony", short: "Cultural", from: 3680, img: IMG + "2015/11/ethinic.jpg", alt: "A carved mandap set on the lawn above the sea for a ceremony planned by Anna's", pos: "50% 55%" },
  { id: "deluxe", name: "Deluxe weddings", one: "Deluxe wedding", short: "Deluxe", from: 11950, img: IMG + "2015/11/Delux-Package-img.jpg", alt: "A couple walking down a petal aisle through a garden of stone arches in Nassau", pos: "50% 45%" },
  { id: "renewal", name: "Vow renewals", one: "Vow renewal", short: "Renewals", from: 875, img: IMG + "2015/11/IMG_4714_A.jpg", alt: "A smiling couple with a bouquet in front of the open sea", pos: "50% 30%" },
]

export type Pkg = { id: string; kind: KindId; name: string; price: number; guests?: number; items?: string[]; img?: string; note?: string }

export const PACKAGES: Pkg[] = [
  { id: "basic", kind: "beach", name: "Basic", price: 950, guests: 2, img: IMG + "2015/11/COUPLE-CANADA_2-1.jpg", items: ["Minister", "Tropical bridal bouquet", "Groom's boutonniere", "Wedding documents plus one certified copy of the marriage certificate", "Coordinator for the marriage application, who hosts the ceremony", "White sandy beach"] },
  { id: "classic", kind: "beach", name: "Classic", price: 1750, guests: 6, img: IMG + "2015/11/Classi_1.jpg", items: ["Beach ceremony on a public beach", "Minister", "Wedding documents plus one certified copy", "Bridal bouquet and groom's boutonniere", "Photographer for 1 hour, high resolution images in an online gallery", "Round trip limousine or SUV for up to 6", "Champagne toast for 4 to 6", "Coordinator for the marriage application, who hosts the ceremony"] },
  { id: "romantic", kind: "beach", name: "Romantic", price: 3995, guests: 12, img: IMG + "2015/11/Romantic_1A.jpg", items: ["Beach location with up to 12 chairs and a signing table", "Minister", "Bridal bouquet and matching boutonniere", "Wedding documents plus one certified copy", "Photographer for 1 hour, online gallery", "10 inch wedding cake for up to 20", "Violin or saxophone", "Videographer for 1 hour, edited highlight film", "Round trip limousine or SUV for up to 6", "Champagne toast", "Coordinator who hosts the ceremony"] },
  { id: "beach-50", kind: "beach", name: "Beach", price: 2990, guests: 50, img: IMG + "2015/11/Beach.jpg", items: ["Beach site with 50 white folding chairs", "Signing table", "Tropical bridal bouquet and matching boutonniere", "Minister", "Wedding documents plus one certified copy", "Photographer for 1 hour, online gallery", "Round trip 27-seat air-conditioned bus to the beach", "One way limo or SUV for the bride and party", "Coordinator who hosts the ceremony"] },
  { id: "cruise", kind: "cruise", name: "Cruise", price: 3495, guests: 25, img: IMG + "2015/11/cruise-package-img12.jpg", items: ["Minister", "Beach site with 25 white folding chairs", "Arbor draped in your colour", "Tropical bridal bouquet and matching boutonniere", "Photographer for 1 hour, online gallery", "Violin or saxophone for the ceremony", "Round trip transport for 25", "One way limousine for the bride and party", "Water service", "Personal escort for the marriage licence", "On-site coordinator throughout"] },
  { id: "blue-ocean", kind: "cruise", name: "Blue Ocean", price: 7645, guests: 30, img: IMG + "2015/11/IMG_4714_A.jpg", items: ["Minister", "Beach site with up to 30 chairs", "White arbor, petals lining the aisle", "Bouquet and boutonniere", "Photographer for 1 hour, online gallery", "Violin or saxophone for the ceremony", "One hour cocktail reception with open bar and hors d'oeuvres", "Steel drummer for the reception", "Round trip transfer for 30", "Limo for the bride to the venue", "Personal escort for the marriage licence", "On-site coordinator throughout"] },
  { id: "tropical", kind: "cruise", name: "Tropical", price: 13895, guests: 40, img: IMG + "2015/11/CIRCULAR-ARBOR_TropicalPackage_Optimized-1.jpg", items: ["Minister", "Beach location with up to 40 chairs", "Two post bamboo arbor with a tropical arrangement", "Petals lining the aisle", "Bouquet and boutonniere", "Photographer for 1 hour, online gallery", "Violin or saxophone, then a DJ for 3 hours", "Bahamian buffet reception outdoors overlooking the water", "Open bar for 3 hours, standard brands", "Two tier wedding cake for up to 40", "Round trip transfer for up to 40", "Limousine or Suburban for the bride and party", "Planner schedules the legal appointment and hosts ceremony and reception"] },
  { id: "indian", kind: "cultural", name: "Indian", price: 3680 },
  { id: "jewish", kind: "cultural", name: "Jewish", price: 3850 },
  { id: "garden", kind: "deluxe", name: "Garden", price: 11950 },
  { id: "sunset", kind: "deluxe", name: "Bahamas Sunset", price: 12986 },
  { id: "royal", kind: "deluxe", name: "Royal", price: 15675 },
  { id: "renew-basic", kind: "renewal", name: "Basic renewal", price: 875 },
  { id: "renew-dinner", kind: "renewal", name: "Romantic Dinner", price: 1595 },
  { id: "renew-silver", kind: "renewal", name: "Silver", price: 2250 },
]

export const LICENCE = [
  { t: "Both of you are in The Bahamas when you apply, and have been for 24 hours before the application date.", cruise: false },
  { t: "Cruise passengers bring a letter from the purser's office confirming the ship has been in Bahamian waters for 24 hours.", cruise: true },
  { t: "Both of you bring a valid passport and the immigration entry card showing your arrival date.", cruise: false },
  { t: "Divorced: the original final decree, or a court certified copy with a raised seal. European decrees also need a certified or notarised English translation, apostilled.", cruise: false },
  { t: "Widowed: the original or a certified copy of the late spouse's death certificate.", cruise: false },
  { t: "Never married: a declaration sworn before a notary public or other authorised person in The Bahamas.", cruise: false },
  { t: "The $100 marriage licence fee is ready.", cruise: false },
]

export const SERVICES: [string, string][] = [
  ["Full wedding planning", "Anna keeps you informed of every detail, from the first call to the last dance."],
  ["Wedding day coordination", "She works with every vendor so the day runs on time and as you pictured it."],
  ["Vendors she trusts", "Recommendations and management for flowers, music, photography, cake and transport."],
  ["Your licence appointment", "She schedules the Registrar's appointment and prepares your documents for the interview."],
  ["Ceremony touches", "A sand ceremony, a reverse unity candle shared with every guest, or a hand fasting with ribbon."],
]

export const COUNTRIES = ["Australia", "Egypt", "Ethiopia", "North and South Africa", "Dubai", "India", "Germany", "Switzerland", "Sweden", "France", "North America", "South America"]

export const PHOTOS = {
  cloisters: IMG + "2015/11/slider2.jpg",
  joy: IMG + "2015/12/058.jpg",
  rings: IMG + "2015/12/IMG_5705.jpg",
  cake: IMG + "2015/12/IMG_1893.jpg",
  hands: IMG + "2015/12/IMG_0508.jpg",
  group: IMG + "2015/11/Beach-Package-img.jpg",
}

export const usd = (n: number) => `USD ${n.toLocaleString("en-US")}`
export const PHONE = "(242) 324-2559"
export const TEL = "tel:+12423242559"
export const US_PHONE = "(954) 246-3108"
export const US_TEL = "tel:+19542463108"
