// Every fact here is sourced from bvgdesign.com (home, /faqs.html, /promo.html) or bahamasvacationguide.com, read 2026-11-21.
export const NAME = "BVG Design Services"
export const PHONE = "(242) 602-0658"
export const TEL = "tel:+12426020658"
export const US_PHONE = "(954) 640-8552"
export const US_TEL = "tel:+19546408552"
export const EMAIL = "info@bvgdesign.com"

const A = "https://ip-assets-bvg-design-services.lovable.app/assets/"
export const IMG = {
  hopeTown: A + "guide-hope-town.jpg",
  treasureCay: A + "guide-treasure-cay.jpg",
  nassauLight: A + "guide-nassau-light.jpg",
  deadmans: A + "guide-deadmans-reef.jpg",
  williamsTown: A + "guide-williams-town.jpg",
  exumas: A + "guide-exumas.jpg",
  lochabar: A + "guide-lochabar.jpg",
  harbour: A + "lucayan-harbour.jpg",
  desk: A + "studio-desk.jpg",
  server: A + "server-detail.jpg",
  sketch: A + "wireframe-sketch.jpg",
  proofs: A + "print-proofs.jpg",
}

// The guide's real sections, in the order its home page lists them.
export const GUIDE_LINKS = [
  "Activities", "Bed & Breakfast", "Car & Other Rentals", "Eco Tours", "Fishing & Scuba Info", "Hotels",
  "Kid Stuff", "Medical", "Nightlife", "Pampering", "Real Estate", "Restaurants",
  "Sailing & Charters", "Vacation Rentals", "Watersports", "Weather", "Weddings", "Islands & Maps",
]
export const GUIDE_LEAD = "The Bahamas Vacation Guide offers information on local businesses, photos, maps, island descriptions for Freeport/Lucaya, Grand Bahama Island, Nassau/Paradise Island, New Providence and the out islands."
export const GUIDE_LINE = "We are where you want to go before you go to The Bahamas."
export const GUIDE_FUN = "Fun and unspoiled beauty await you in the Bahamas."

export type Service = { id: string; name: string; line: string; facts: string[]; img: string; alt: string }
export const SERVICES: Service[] = [
  {
    id: "websites", name: "Websites",
    line: "From one clean page to themed sites of hundreds of pages, with contact areas, animation and the details your customers ask for.",
    facts: ["Simple pages are normally ready within 24 hours of the order", "Discounts for sites over 10 pages, larger ones for hundreds of pages", "Redesign or take over the site you have: hourly for small changes"],
    img: IMG.sketch, alt: "Pencil wireframes of web pages on a wooden desk with a ruler and an eraser",
  },
  {
    id: "hosting", name: "Hosting and domains",
    line: "We register your domain if it is free, host the site and give you a control panel simple enough to use yourself.",
    facts: ["Domain registration and hosting in one place", "A user-friendly control panel", "Hosting for Bahamian and international clients"],
    img: IMG.server, alt: "Blue network cables patched into a rack of servers",
  },
  {
    id: "found", name: "Getting found",
    line: "Optimization and promotion in the major search engines, learned the hard way: our own guide reached the top of the results in 1996.",
    facts: ["A free first consultation on the key phrases you rank for now", "Site optimization", "Promotion in the major search engines"],
    img: IMG.desk, alt: "A laptop showing a web page on a desk by a window with palms and the sea outside",
  },
  {
    id: "advertising", name: "Advertising",
    line: "For campaigns beyond the web: printed materials, ad layout, video for YouTube, and CD or DVD production with printed labels.",
    facts: ["Printed materials and advertising layout", "Video advertising for the web", "CD and DVD production, labels and etching"],
    img: IMG.proofs, alt: "Printed photo proofs and colour swatches on a table by an open window",
  },
]

export const STEPS: [string, string][] = [
  ["Talk it through", "Call or email. The first consultation on how people find you in search is free."],
  ["See it fast", "Simple pages are normally ready within 24 hours. Bigger sites take a little longer."],
  ["Run it yourself", "We host it, and the control panel is simple enough for you to make changes."],
  ["Keep it current", "We keep the site up to date for you, or fix small things by the hour."],
]
export const PAY = "Pay by cash, US or B$ cheque, bank deposit, or credit card through PayPal."

export const NEEDS = ["A new website", "Redesign or take over my site", "Hosting and a domain", "Get found on Google", "Print, video or advertising"]
export const ISLANDS = ["Grand Bahama", "New Providence", "Abaco", "Another Bahamian island", "Outside the Bahamas"]
export const SIZES = ["One page", "A few pages", "More than 10 pages", "Not sure yet"]
