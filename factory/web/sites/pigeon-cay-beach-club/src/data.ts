// Every fact here is from pigeoncaybahamas.com (scraped 2026-11-20 and 2026-11-21), its direct-book engine,
// or a cited flight announcement. Photo sizes are the real pixel sizes of the club's own files, so no frame
// ever shows a photo larger than its source.
export const I = "https://pigeoncaybahamas.com/wp-content/uploads/2018/03/"
export const NAME = "Pigeon Cay Beach Club"
export const PHONE = "(242) 354-5084"
export const TEL = "tel:+12423545084"
export const EMAIL = "pcbclub@gmail.com"
export const BOOK = "https://direct-book.com/properties/pigeoncaydirect"
export const FB = "https://www.facebook.com/pages/Pigeon-Cay-Beach-Club/429723473777383"
export const FILM = "https://www.youtube.com/watch?v=VaXVJtOxRS0"

export type Shot = { f: string; w: number; h: number; alt: string }
export type Cottage = {
  id: string; name: string; rate: number; sleeps: number; beds: string; kitchen: string; note: string; tier: "two" | "family"; shots: Shot[]
}

const s = (f: string, w: number, h: number, alt: string): Shot => ({ f, w, h, alt })

export const COTTAGES: Cottage[] = [
  { id: "garden-view", name: "Garden View", rate: 215, sleeps: 2, beds: "Queen bed", kitchen: "Full kitchen", tier: "two",
    note: "A limestone arch steps up from the sitting room to the bed, and the porch looks over the lawn.",
    shots: [
      s("garden-view1.jpg", 480, 320, "Garden View: a wicker loveseat, a limestone arch and the queen bed beyond"),
      s("garden-view2.jpg", 480, 320, "Garden View bedroom looking through a white arch to the kitchenette and the lawn"),
      s("garden-view3.jpg", 480, 320, "Garden View porch with a wicker bistro set facing the lawn"),
    ] },
  { id: "hibiscus", name: "Hibiscus", rate: 215, sleeps: 2, beds: "Queen bed", kitchen: "Full kitchen", tier: "two",
    note: "One open room under a rattan ceiling, with a stone wall behind the bed.",
    shots: [
      s("hibicus1.jpg", 480, 320, "Hibiscus: queen bed against a stone wall under a rattan ceiling"),
      s("hibicus2.jpg", 480, 320, "Hibiscus bedroom with a window bench"),
      s("hibicus4.jpg", 480, 320, "Hibiscus front porch with two wicker chairs"),
    ] },
  { id: "sea-studio", name: "Sea Studio", rate: 225, sleeps: 2, beds: "Queen bed", kitchen: "Kitchenette", tier: "two",
    note: "French doors open from the room onto a flagstone patio and the sea.",
    shots: [
      s("sea-studio2.jpg", 480, 320, "Sea Studio interior with a queen bed and two wicker chairs"),
      s("sea-studio1.jpg", 480, 320, "Sea Studio: open French doors onto a flagstone patio and the turquoise sea"),
    ] },
  { id: "little-house", name: "Little House", rate: 250, sleeps: 2, beds: "Queen bed", kitchen: "Full kitchen", tier: "two",
    note: "Ochre walls, a wood floor and two windows into the trees.",
    shots: [
      s("little-house2.jpg", 480, 320, "Little House bedroom with ochre walls and a queen bed"),
      s("little-house1.jpg", 480, 320, "Little House bedroom seen from the foot of the bed"),
    ] },
  { id: "winston", name: "Winston Cottage", rate: 250, sleeps: 2, beds: "Queen bed", kitchen: "Full kitchen", tier: "two",
    note: "The porch doors frame the casuarinas, the sand and the water.",
    shots: [
      s("winston-cottage1.jpg", 480, 720, "Winston Cottage: open porch doors looking through casuarinas to the beach and sea"),
      s("winston-cottage2.jpg", 480, 720, "Winston Cottage kitchen with an iron bistro table and two green stools"),
      s("winston-cottage3.jpg", 480, 720, "Winston Cottage bedroom"),
    ] },
  { id: "oleander", name: "Oleander", rate: 315, sleeps: 4, beds: "Queen bed and two twins", kitchen: "Full kitchen", tier: "family",
    note: "Two bedrooms and a covered porch, with the sea at the end of the garden path.",
    shots: [
      s("oleander-img4.jpg", 480, 720, "Oleander porch looking down the garden path to the sea"),
      s("oleander-img1.jpg", 480, 720, "Oleander twin bedroom"),
      s("oleander-img2.jpg", 480, 720, "Oleander queen bedroom"),
      s("oleander-img3.jpg", 480, 720, "Oleander living room with screen doors to the patio"),
    ] },
  { id: "casuarina", name: "Casuarina", rate: 325, sleeps: 4, beds: "A queen bed in each bedroom", kitchen: "Full kitchen", tier: "family",
    note: "An eight-sided living room whose doors open on the water.",
    shots: [
      s("causarina3.jpg", 480, 320, "Casuarina living room with French doors open to the porch and the sea"),
      s("causarina1.jpg", 480, 320, "Casuarina bedroom with open doors showing the sea"),
      s("causarina2.jpg", 480, 320, "Casuarina second bedroom with glass doors onto a deck"),
      s("causarina4.jpg", 480, 320, "Casuarina covered patio under the casuarinas, with the sea beyond"),
    ] },
  { id: "big-house", name: "Big House", rate: 425, sleeps: 6, beds: "King, queen and two twins", kitchen: "Full kitchen", tier: "family",
    note: "Three bedrooms for a family or two couples, with balcony doors into the palms.",
    shots: [
      s("big-house-img5.jpg", 480, 320, "Big House twin bedroom with palms outside the windows"),
      s("big-house-img2.jpg", 480, 320, "Big House bedroom with a four-poster bed and balcony doors"),
      s("big-house-img4.jpg", 480, 320, "Big House bedroom with French doors onto a palm deck"),
      s("big-house-img3.jpg", 480, 320, "Big House living and dining room"),
    ] },
]

export const TAX = { vat: 0.10, levy: 0.06 }
export const EXTRAS = { breakfast: 18, dinner: 35, gratuity: 0.15, taxiOneWay: 60, taxiReturn: 120, carFrom: 75 }

export const FAQ = [
  { q: "Do I pay anything when I book?", a: "No. The club holds a credit card number to reserve your cottage, takes no deposit, and payment is due on departure." },
  { q: "What if I have to cancel?", a: "Cancel 30 days or more before arrival and nothing is charged. Inside 30 days, one night's lodging is charged to the card on file. If the cottage is booked again for the same dates you get a credit, or you can use that night on a future stay within a year of the original booking." },
  { q: "What do the taxes come to?", a: "Government VAT of 10% and a resort levy of 6% are added to the nightly rate. Meals carry a 15% gratuity." },
  { q: "Do the cottages have kitchens?", a: "Every cottage has a fully equipped kitchen, except the Sea Studio, which has a kitchenette. Each has a coffee and tea maker, bottled water, air conditioning and ceiling fans." },
  { q: "Is there Wi-Fi?", a: "Free wireless internet is available in the public areas." },
  { q: "Can we bring a baby?", a: "Cribs are available, and the club lists child care among its services. Ask when you book." },
  { q: "Do I need a car?", a: "Not for the beach, the bar, the kayaks or the bikes. Car rentals start at $75, depending on the vehicle, if you want to explore the island." },
]

/** The handoff to the club's own engine, with dates and adults filled in (direct-book's own URL format). */
export function bookUrl(arrive?: string, leave?: string, adults = 2) {
  if (!arrive || !leave) return BOOK
  const q = `?locale=en&items[0][adults]=${adults}&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=${arrive}&checkOutDate=${leave}&trackPage=yes`
  return BOOK + q
}
