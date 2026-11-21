// Every fact here is from pigeoncaybahamas.com (scraped 2026-11-20). Photo sizes are the real pixel sizes of
// the club's own files, so no frame ever shows a photo larger than its source.
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
  id: string; name: string; rate: number; sleeps: number; beds: string; kitchen: string; note: string; shots: Shot[]
}

export const COTTAGES: Cottage[] = [
  { id: "garden-view", name: "Garden View", rate: 215, sleeps: 2, beds: "Queen bed", kitchen: "Full kitchen",
    note: "A limestone arch between the sitting room and the bed, and a porch on the lawn.",
    shots: [
      { f: "garden-view1.jpg", w: 480, h: 320, alt: "Garden View cottage: wicker loveseat, a limestone arch and the queen bed beyond" },
      { f: "garden-view3.jpg", w: 480, h: 320, alt: "Garden View porch with a bistro table facing the lawn" },
    ] },
  { id: "hibiscus", name: "Hibiscus", rate: 215, sleeps: 2, beds: "Queen bed", kitchen: "Full kitchen",
    note: "One open room under a rattan ceiling, with a stone wall behind the bed.",
    shots: [
      { f: "hibicus1.jpg", w: 480, h: 320, alt: "Hibiscus cottage: queen bed against a stone wall under a rattan ceiling" },
      { f: "hibicus2.jpg", w: 480, h: 320, alt: "Hibiscus cottage bedroom with a window bench" },
    ] },
  { id: "sea-studio", name: "Sea Studio", rate: 225, sleeps: 2, beds: "Queen bed", kitchen: "Kitchenette",
    note: "French doors open from the bed straight onto a patio and the sea.",
    shots: [
      { f: "sea-studio1.jpg", w: 480, h: 320, alt: "Sea Studio: open French doors onto a flagstone patio and the turquoise sea" },
      { f: "sea-studio2.jpg", w: 480, h: 320, alt: "Sea Studio interior with a queen bed and two wicker chairs" },
    ] },
  { id: "little-house", name: "Little House", rate: 250, sleeps: 2, beds: "Queen bed", kitchen: "Full kitchen",
    note: "Ochre walls, a wood floor and two windows into the trees.",
    shots: [
      { f: "little-house2.jpg", w: 480, h: 320, alt: "Little House bedroom with ochre walls and a queen bed" },
      { f: "little-house1.jpg", w: 480, h: 320, alt: "Little House bedroom seen from the foot of the bed" },
    ] },
  { id: "winston", name: "Winston Cottage", rate: 250, sleeps: 2, beds: "Queen bed", kitchen: "Full kitchen",
    note: "The porch doors frame the casuarinas, the sand and the water.",
    shots: [
      { f: "winston-cottage1.jpg", w: 480, h: 720, alt: "Winston Cottage: open porch doors looking through casuarinas to the beach and sea" },
    ] },
  { id: "oleander", name: "Oleander", rate: 315, sleeps: 4, beds: "Queen bed and two twins", kitchen: "Full kitchen",
    note: "Two bedrooms and a covered porch with the sea at the end of the garden path.",
    shots: [
      { f: "oleander-img4.jpg", w: 480, h: 720, alt: "Oleander cottage porch looking down the garden path to the sea" },
    ] },
  { id: "casuarina", name: "Casuarina", rate: 325, sleeps: 4, beds: "A queen bed in each bedroom", kitchen: "Full kitchen",
    note: "An eight-sided living room whose doors open on the water.",
    shots: [
      { f: "causarina3.jpg", w: 480, h: 320, alt: "Casuarina cottage living room with French doors open to the porch and the sea" },
      { f: "causarina1.jpg", w: 480, h: 320, alt: "Casuarina cottage bedroom with open doors showing the sea" },
    ] },
  { id: "big-house", name: "Big House", rate: 425, sleeps: 6, beds: "King, queen and two twins", kitchen: "Full kitchen",
    note: "Three bedrooms for a family or two couples, with balcony doors into the palms.",
    shots: [
      { f: "big-house-img5.jpg", w: 480, h: 320, alt: "Big House twin bedroom with palms outside the windows" },
      { f: "big-house-img2.jpg", w: 480, h: 320, alt: "Big House bedroom with a four-poster bed and balcony doors" },
    ] },
]

export const FEES = { vat: 0.10, levy: 0.06, breakfast: 18, dinner: 35, gratuity: 0.15, taxiOneWay: 60, taxiReturn: 120 }

export const FAQ = [
  { q: "Do I pay anything when I book?", a: "No. The club holds a credit card number to reserve your cottage, takes no deposit, and payment is due on departure." },
  { q: "What if I have to cancel?", a: "Cancel 30 days or more before arrival and nothing is charged. Inside 30 days, one night's lodging is charged to the card on file. If the cottage is booked again for the same dates you get a credit, or you can use that night on a future stay within a year of the original booking." },
  { q: "Do the cottages have kitchens?", a: "Every cottage has a fully equipped kitchen, except the Sea Studio, which has a kitchenette. Each has a refrigerator, a coffee and tea maker, bottled water, air conditioning and ceiling fans." },
  { q: "Is there Wi-Fi?", a: "Free wireless internet is available in the public areas. Guests come here to unplug." },
  { q: "Do I need a car?", a: "Not for the beach, the bar, the kayaks or the bikes. Car rentals start at $75 and are recommended if you want to explore the island's other beaches, caves and settlements." },
]
