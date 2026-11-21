// The running quote: one small store shared by the day ruler, the delivery picker, the extras and the tab bar.
// Every number here is published on abacoboatrental.com/our-fleet-rates (VAT exclusive).
import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

export const BOOK = "https://www.abacoboatrental.com/reservations"
export const WA_NUMBER = "12428245755"
export const WA_DISPLAY = "+1 242 824 5755"
export const EMAIL = "abacoboatrental@gmail.com"
const CDN = "https://images.squarespace-cdn.com/content/v1/6a42c8b390db18539a8801a5/"
export const PHOTO = {
  boat: CDN + "b401ff69-86a6-489f-8c4c-714b9b292c18/Abaco-Boat-Rental-17.jpg",
  dock: CDN + "d528242a-93ae-4ef9-abe7-5e95516dcac0/Abaco-Boat-Rental-15.jpg",
  turtle: CDN + "c0d4c408-6d5e-4e99-acf9-957f8e218cae/Abaco-Boat-Rental-5.jpg",
  shallows: CDN + "4e83e744-5cdd-4f27-a93c-4e5a79f8737e/Abaco-Boat-Rental-7.jpg",
}
export const sized = (src: string, w: number) => `${src}?format=${w}w`

export const MAX_DAYS = 14
export const TIERS = [
  { from: 1, to: 1, rate: 475, label: "1 day" },
  { from: 2, to: 2, rate: 450, label: "2 days" },
  { from: 3, to: 6, rate: 330, label: "3 to 6 days" },
  { from: 7, to: MAX_DAYS, rate: 303, label: "7 days or more" },
]
export const rateFor = (days: number) => (days >= 7 ? 303 : days >= 3 ? 330 : days === 2 ? 450 : 475)

export type Place = { id: string; name: string; each: number; note?: string; crewBack?: boolean }
export const PLACES: Place[] = [
  { id: "man-o-war", name: "Man-O-War Cay", each: 0, note: "Our home cay. We drive it to your dock." },
  { id: "elbow", name: "Elbow Cay", each: 100, crewBack: true },
  { id: "hope-town", name: "Hope Town", each: 100 },
  { id: "guana", name: "Guana Cay", each: 100 },
  { id: "scotland", name: "Scotland Cay", each: 100 },
  { id: "marsh", name: "Marsh Harbour", each: 100, crewBack: true },
  { id: "treasure", name: "Treasure Cay", each: 300 },
  { id: "little", name: "Little Harbour", each: 300 },
]

type Trip = {
  days: number; place: string; crewBack: boolean; nightOut: number; acquainted: number; snorkel: number
}
type Store = Trip & {
  set: (patch: Partial<Trip>) => void
  spot: Place; rate: number; boat: number; delivery: number; extras: number; total: number; message: string
}
const Ctx = createContext<Store | null>(null)
export const money = (n: number) => "$" + n.toLocaleString("en-US")
export const dayWord = (n: number) => (n === 1 ? "1 day" : `${n} days`)

export function TripProvider({ children }: { children: ReactNode }) {
  const [trip, setTrip] = useState<Trip>({ days: 7, place: "man-o-war", crewBack: false, nightOut: 0, acquainted: 0, snorkel: 0 })
  const store = useMemo<Store>(() => {
    const spot = PLACES.find(p => p.id === trip.place)!
    const rate = rateFor(trip.days)
    const boat = rate * trip.days
    const crewFree = !!spot.crewBack && trip.crewBack
    const delivery = crewFree ? 0 : spot.each * 2
    const nightOut = spot.id === "man-o-war" ? trip.nightOut : 0
    const extras = nightOut * 50 + trip.acquainted * 100 + trip.snorkel * 5 * trip.days
    const total = boat + delivery + extras
    const lines = [
      "Hi Abaco Boat Rental, I would like to book the 24 ft Key West.",
      `Days: ${trip.days} at ${money(rate)} a day (${money(boat)})`,
      spot.each === 0 ? "Delivery: Man-O-War Cay, free" : crewFree ? `Delivery: ${spot.name}, free (we run your team member back to Man-O-War)` : `Delivery: ${spot.name}, ${money(spot.each)} each way (${money(delivery)})`,
      nightOut ? `A Night Out: ${nightOut} h (${money(nightOut * 50)})` : "",
      trip.acquainted ? `Get Acquainted: ${trip.acquainted} h (${money(trip.acquainted * 100)})` : "",
      trip.snorkel ? `Snorkel sets: ${trip.snorkel} (from ${money(trip.snorkel * 5 * trip.days)})` : "",
      `Estimate: ${money(total)} plus VAT`,
      "My dates: ",
    ].filter(Boolean)
    return {
      ...trip, nightOut, spot, rate, boat, delivery, extras, total, message: lines.join("\n"),
      set: patch => setTrip(t => ({ ...t, ...patch })),
    }
  }, [trip])
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}
export const useTrip = () => useContext(Ctx)!
export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
