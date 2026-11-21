export const IMG = "https://www.annasweddingbahamas.com/wp-content/uploads/"
export type Pkg = { id: string; group: "beach" | "cruise"; name: string; price: number; guests: number; items: string[]; img: string }
export const PACKAGES: Pkg[] = [
  { id: "basic", group: "beach", name: "Basic", price: 950, guests: 2, img: IMG + "2015/11/COUPLE-CANADA_2-1.jpg", items: ["Minister", "Tropical bridal bouquet", "Groom's boutonniere", "Wedding documents plus one certified copy of the marriage certificate", "Coordinator for the marriage application, who hosts the ceremony", "White sandy beach"] },
  { id: "classic", group: "beach", name: "Classic", price: 1750, guests: 6, img: IMG + "2015/11/Classi_1.jpg", items: ["Beach ceremony on a public beach", "Minister", "Wedding documents plus one certified copy", "Bridal bouquet and groom's boutonniere", "Photographer for 1 hour, high resolution images in an online gallery", "Round trip limousine or SUV for up to 6", "Champagne toast for 4 to 6", "Coordinator for the marriage application, who hosts the ceremony"] },
  { id: "romantic", group: "beach", name: "Romantic", price: 3995, guests: 12, img: IMG + "2015/11/Romantic_1A.jpg", items: ["Beach location with up to 12 chairs and a signing table", "Minister", "Bridal bouquet and matching boutonniere", "Wedding documents plus one certified copy", "Photographer for 1 hour, online gallery", "10 inch wedding cake for up to 20", "Violin or saxophone", "Videographer for 1 hour, edited highlight film", "Round trip limousine or SUV for up to 6", "Champagne toast", "Coordinator who hosts the ceremony"] },
  { id: "beach", group: "beach", name: "Beach", price: 2990, guests: 50, img: IMG + "2015/11/Beach.jpg", items: ["Beach site with 50 white folding chairs", "Signing table", "Tropical bridal bouquet and matching boutonniere", "Minister", "Wedding documents plus one certified copy", "Photographer for 1 hour, online gallery", "Round trip 27-seat air-conditioned bus to the beach", "One way limo or SUV for the bride and party", "Coordinator who hosts the ceremony"] },
  { id: "cruise", group: "cruise", name: "Cruise", price: 3495, guests: 25, img: IMG + "2015/11/cruise-package-img12.jpg", items: ["Minister", "Beach site with 25 white folding chairs", "Arbor draped in your colour", "Tropical bridal bouquet and matching boutonniere", "Photographer for 1 hour, online gallery", "Violin or saxophone for the ceremony", "Round trip transport for 25", "One way limousine for the bride and party", "Water service", "Personal escort for the marriage licence", "On-site coordinator throughout"] },
  { id: "blue-ocean", group: "cruise", name: "Blue Ocean", price: 7645, guests: 30, img: IMG + "2015/11/IMG_4714_A.jpg", items: ["Minister", "Beach site with up to 30 chairs", "White arbor, petals lining the aisle", "Bouquet and boutonniere", "Photographer for 1 hour, online gallery", "Violin or saxophone for the ceremony", "One hour cocktail reception with open bar and hors d'oeuvres", "Steel drummer for the reception", "Round trip transfer for 30", "Limo for the bride to the venue", "Personal escort for the marriage licence", "On-site coordinator throughout"] },
  { id: "tropical", group: "cruise", name: "Tropical", price: 13895, guests: 40, img: IMG + "2015/11/CIRCULAR-ARBOR_TropicalPackage_Optimized-1.jpg", items: ["Minister", "Beach location with up to 40 chairs", "Two post bamboo arbor with a tropical arrangement", "Petals lining the aisle", "Bouquet and boutonniere", "Photographer for 1 hour, online gallery", "Violin or saxophone, then a DJ for 3 hours", "Bahamian buffet reception outdoors overlooking the water", "Open bar for 3 hours, standard brands", "Two tier wedding cake for up to 40", "Round trip transfer for up to 40", "Limousine or Suburban for the bride and party", "Planner schedules the legal appointment and hosts ceremony and reception"] },
]
export const OTHER = [
  { name: "Ethnic packages", note: "Blended Love. Rates on request.", href: "packages.html#more" },
  { name: "Deluxe packages", note: "Elegance. Rates on request.", href: "packages.html#more" },
  { name: "Renewal of vows", note: "Fulfilled Love. Rates on request.", href: "packages.html#more" },
]
export const LICENCE = [
  "Both of you are in The Bahamas when you apply, and have been for 24 hours before the application date.",
  "Both of you bring a valid passport and the immigration entry card showing your arrival date.",
  "Divorced: the original final decree, or a court certified copy with a raised seal. European decrees also need a certified or notarised English translation, apostilled.",
  "Widowed: the original or a certified copy of the late spouse's death certificate.",
  "Never married: a declaration sworn before a notary public or other authorised person in The Bahamas.",
  "Cruise passengers: a letter from the purser's office confirming the ship has been in Bahamian waters for 24 hours.",
  "The marriage licence fee is $100.",
]
export const SERVICES = [
  ["Full wedding planning", "Anna keeps you informed of every detail, from the first call to the last dance."],
  ["Wedding day coordination", "She works with every vendor so your plan happens on time and as you pictured it."],
  ["Vendor recommendation and management", "A list of preferred vendors for every part of the wedding."],
  ["Marriage licence documents", "Your appointment with the Registrar's office is scheduled and your documents prepared for the interview."],
  ["Ceremony touches", "A sand ceremony, a reverse unity candle shared with every guest, or a hand fasting with ribbon."],
]
export const GALLERY = ["2015/12/51.jpg", "2015/12/058.jpg", "2015/12/IMG_0035.jpg", "2015/12/IMG_0414.jpg", "2015/12/IMG_1751.jpg", "2015/12/IMG_9984.jpg"].map(p => IMG + p)
