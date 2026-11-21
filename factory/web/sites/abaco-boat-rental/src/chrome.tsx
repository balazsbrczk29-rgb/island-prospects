// Shared page furniture: the toolbar, the running tab that follows you down the page, the closing block.
import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import Lenis from "lenis"
import { BOOK, EMAIL, TripProvider, WA_DISPLAY, dayWord, money, useTrip, waLink } from "./trip"

export const ease = [0.22, 1, 0.36, 1] as const

export function Wordmark() {
  return <a className="wordmark" href="./" aria-label="Abaco Boat Rental, home">Abaco Boat Rental</a>
}

export function Toolbar({ here }: { here: "home" | "faq" }) {
  const home = here === "home" ? "" : "./"
  return (
    <header className="toolbar">
      <Wordmark />
      <nav aria-label="Main">
        <a href={`${home}#boat`}>The boat</a>
        <a href={`${home}#price`}>Rates and delivery</a>
        <a href="faq.html" aria-current={here === "faq" ? "page" : undefined}>Good to know</a>
      </nav>
      <a className="toolbar__wa" href={waLink("Hi Abaco Boat Rental, a question about renting the 24 ft Key West: ")}>
        <span className="toolbar__wa-label">WhatsApp</span> <span className="num">{WA_DISPLAY}</span>
      </a>
    </header>
  )
}

export function BookButton({ children = "Check availability & book", className = "" }: { children?: ReactNode; className?: string }) {
  return <a className={`btn ${className}`} href={BOOK}>{children}<ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" /></a>
}

/** The running quote, fixed to the bottom once the first screen has gone and until the full summary or the contact block is in view. */
export function TripTab() {
  const { days, rate, total, spot } = useTrip()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const seen = new Map<Element, boolean>()
    const els = [...document.querySelectorAll("[data-tab-hide]")]
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => seen.set(e.target, e.isIntersecting))
      setShow(![...seen.values()].some(Boolean))
    }, { rootMargin: "-12% 0px -12% 0px" })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    document.documentElement.style.setProperty("--concept-offset", show ? "var(--tab-h)" : "0px")
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.aside className="tab" aria-label="Your estimate so far"
          initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.32, ease }}>
          <p className="tab__sum">
            <span className="tab__what">{dayWord(days)} <span className="tab__wide">at {money(rate)} a day, {spot.id === "man-o-war" ? "from Man-O-War Cay" : `delivered to ${spot.name}`}</span></span>
            <a className="tab__total num" href="#price">{money(total)} <small>plus VAT</small></a>
          </p>
          <BookButton className="btn--tab"><span className="tab__wide">Check availability &amp; book</span><span className="tab__narrow">Book</span></BookButton>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export function Closing() {
  return (
    <footer className="closing" id="book" data-tab-hide>
      <div className="wrap closing__grid">
        <div>
          <h2 className="h-xl">Three steps, and no phone&nbsp;tag.</h2>
          <ol className="steps">
            <li><b>Pick your dates.</b> Choose pickup and return times and see exactly what is open. Rentals run on a 24 hour period, so pick a return time earlier than your pickup time.</li>
            <li><b>Choose delivery.</b> Free at Man-O-War Cay, or we bring the boat to you.</li>
            <li><b>Get on the water.</b> Confirm, pay on the day, and you are set.</li>
          </ol>
          <BookButton />
        </div>
        <address className="reach">
          <p className="reach__lead">Availability on the booking page is live. For anything else, write to&nbsp;us.</p>
          <a className="reach__big num" href={waLink("Hi Abaco Boat Rental, a question about renting the 24 ft Key West: ")}>{WA_DISPLAY}<small>WhatsApp</small></a>
          <a className="reach__big reach__mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p className="reach__hours">9 AM to 5 PM, every day<br />November 1 to August 15<br />Man-O-War Cay, Abaco, The Bahamas</p>
        </address>
      </div>
      <div className="wrap closing__foot">
        <Wordmark />
        <nav aria-label="Footer">
          <a href="./#boat">The boat</a>
          <a href="./#price">Rates and delivery</a>
          <a href="faq.html">Good to know</a>
          <a href="https://www.saltedlimebar.com/">Need a drink? The Salted Lime</a>
        </nav>
        <p>Photographs from abacoboatrental.com.</p>
      </div>
    </footer>
  )
}

export function mount(node: ReactNode) {
  if (matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true })
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
  }
  createRoot(document.getElementById("root")!).render(<TripProvider>{node}</TripProvider>)
}
