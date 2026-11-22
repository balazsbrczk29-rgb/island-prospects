// Every fact here is sourced: BahamasLocal listing, Weddingbells (2 Nov 2012), Style Me Pretty (14 Jun 2013).
export const NAME = "Bahamas Bridal Affairs"
export const PHONE = "242-326-4029"
export const TEL = "tel:+12423264029"
export const PHONE_US = "1-954-892-6969"
export const TEL_US = "tel:+19548926969"

const A = "https://ip-assets-bahamas-bridal-affairs.lovable.app/assets/"
export const IMG = {
  aisle: A + "aisle.jpg",
  arrival: A + "arrival.jpg",
  champagne: A + "champagne.jpg",
  cloisters: "https://upload.wikimedia.org/wikipedia/commons/2/23/Atlantis_French_Cloisters.jpg",
  tent: A + "tent.jpg",
  jazz: A + "jazz.jpg",
  pool: A + "pool.jpg",
  flowers: A + "flowers.jpg",
}

export const WEDDINGBELLS = "https://weddingbells.ca/real-weddings/a-glamorous-destination-wedding-in-the-bahamas/"
export const STYLEMEPRETTY = "https://www.stylemepretty.com/2013/06/14/nassau-bahamas-wedding-from-karen-hill-photography/"

export type Venue = { id: string; label: string; card: string; say: string; place: string; told: string; img: string; w: number; h: number; alt: string; credit: string; real: boolean }
export const VENUES: Venue[] = [
  { id: "ocean-club", label: "Ocean Club", card: "the One&Only Ocean Club", place: "Paradise Island", say: "at the One&Only Ocean Club",
    told: "Rose and Marcel said their vows here among old stone arches and a Versailles-inspired garden, 21 May 2011 (Weddingbells).",
    img: IMG.cloisters, w: 2400, h: 1600, alt: "The stone arches of the French Cloisters on Paradise Island under a blue sky",
    credit: "The French Cloisters, Paradise Island. Photograph: Art davis, Wikimedia Commons, CC BY-SA 4.0", real: true },
  { id: "atlantis", label: "Atlantis", card: "Atlantis", place: "Paradise Island", say: "at Atlantis",
    told: "Their reception: a white draped tent under one great chandelier, white roses, orchids and calla lilies on every table (Weddingbells).",
    img: IMG.tent, w: 2048, h: 1152, alt: "A white wedding tent with gathered drapery, a crystal chandelier and tables dressed in white flowers",
    credit: "Illustrative photography, not her weddings. To be replaced with her own.", real: false },
  { id: "lyford-cay", label: "Lyford Cay", card: "Lyford Cay Club", place: "Nassau", say: "at Lyford Cay Club",
    told: "Laura and Kyle married here as Hurricane Sandy cleared, with steel pan, Junkanoo and a Royal Bahamas Police Band fanfare (Style Me Pretty).",
    img: IMG.aisle, w: 2048, h: 1152, alt: "White chairs and an aisle of rose petals on a lawn above turquoise water",
    credit: "Illustrative photography, not her weddings. To be replaced with her own.", real: false },
  { id: "open", label: "Not sure yet", card: "a venue still to be chosen", place: "Nassau or Paradise Island", say: "in Nassau or on Paradise Island",
    told: "", img: "", w: 0, h: 0, alt: "", credit: "", real: false },
]
// Categories taken from the vendor credits of the two published weddings; to confirm with the owner.
export const HELP = ["the ceremony", "the reception", "flowers", "the cake", "music", "hair and makeup", "stationery", "getting our guests around"]

export type Credit = [role: string, who: string, us?: boolean]
export const PUBLISHED = [
  {
    id: "weddingbells",
    mag: "Weddingbells",
    date: "2 November 2012",
    url: WEDDINGBELLS,
    title: "Rose and Marcel, Paradise Island",
    teaser: "An all-white wedding with crystal accents for 120 guests on 21 May 2011: the ceremony at the One and Only Ocean Club, the reception in a chandelier-lit tent at Atlantis.",
    story: [
      "Rose and Marcel were engaged on a beach in St. Maarten and wanted to marry somewhere just as warm. Rose did not want to be barefoot in the sand. She wanted, in her words, “an elegant and sophisticated wedding away”. That meant Paradise Island, in white.",
      "One hundred and twenty guests arrived to welcome kits and a detailed itinerary. On 21 May 2011 each of them was collected by limousine and driven to the One and Only Ocean Club, where chilled champagne and lemonade were waiting, and the vows were said among stone arches and a Versailles-inspired garden.",
      "The reception was at the nearby Atlantis: a grand tent of white drapery under a massive chandelier, silver trees and white roses, orchids and calla lilies on every table, Italian food at tasting stations, a candy buffet that emptied in record time, and a jazz band nobody wanted to stop. The night ended with the newlyweds and their best friends in the pool, fully clothed.",
    ],
    credits: [
      ["Wedding planner", "Bahamas Bridal Affairs, with Wildflowers Bahamas", true],
      ["Ceremony", "One and Only Ocean Club"],
      ["Reception and catering", "Atlantis"],
      ["Flowers", "Gatto Florist"],
      ["Music", "Falcon"],
      ["Cake", "Swiss Pastry Shop"],
      ["Hair and makeup", "Lisa Calomino"],
      ["Stationery", "Paper Princess"],
      ["Photography", "Mango Studios"],
    ] as Credit[],
  },
  {
    id: "style-me-pretty",
    mag: "Style Me Pretty",
    date: "14 June 2013",
    url: STYLEMEPRETTY,
    title: "Laura and Kyle, Lyford Cay",
    teaser: "A wedding at Lyford Cay Club as Hurricane Sandy cleared Nassau, with steel pan, Junkanoo and a fanfare from the Royal Bahamas Police Band. Coordination: Bernadette Burrows.",
    story: [
      "Hurricane Sandy had other plans for the week. The photographers, Karen Hill Photography, only reached Nassau on the day of the wedding. By the time guests arrived at Lyford Cay Club the storm was settling and the sun was out.",
      "Their account, published in Style Me Pretty, calls the day perfect. The credits explain some of why: steel pan selections, music for the ceremony, cocktails and Junkanoo, and a fanfare party from the Royal Bahamas Police Band.",
      "Coordination on the day is credited to Bernadette Burrows of Bahamas Bridal Affairs.",
    ],
    credits: [
      ["Coordination", "Bernadette Burrows of Bahamas Bridal Affairs", true],
      ["Ceremony and reception", "Lyford Cay Club"],
      ["Floral design", "Patricia Darville of Island Leaves"],
      ["Band", "Traffic Jam Band of Falcons Entertainment"],
      ["Ceremony, cocktails and Junkanoo", "Fred Munnings of Bahamas Events Intl"],
      ["Steel pan", "Leslie Munroe"],
      ["Fanfare", "Royal Bahamas Police Band"],
      ["Cake", "Anne Lever of Simply Sweet Cakes"],
      ["Hair and makeup", "Anna Berardelli-Knowles of Studio Vivo"],
      ["Officiant", "Ricardo Errington Turner, Sr."],
      ["Photography", "Karen Hill Photography"],
    ] as Credit[],
  },
]
