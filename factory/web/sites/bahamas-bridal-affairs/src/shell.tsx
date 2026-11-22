import { StrictMode, useEffect, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import "./styles.css"
import { NAME, PHONE, TEL, PHONE_US, TEL_US } from "./content"

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(<StrictMode>{node}</StrictMode>)
}

/** Wheel smoothing on desktop only; phones keep native touch scrolling. */
export function useWheelSmoothing() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
}

/** Reveal once, on entering the viewport: rows rise 12 px and fade, with a 70 ms stagger set in CSS. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-rise]")
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach(e => (e.dataset.rise = "in")); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.rise = "in"; io.unobserve(e.target) } }), { rootMargin: "0px 0px -12% 0px" })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

export function TopLine({ home }: { home: boolean }) {
  return (
    <header className="top">
      <a className="top__name" href="index.html">{NAME}</a>
      <nav className="top__nav" aria-label="Site">
        {home ? <a href="weddings.html">The weddings in print</a> : <a href="index.html#compose">Your date</a>}
        <a className="num top__tel" href={TEL}>Nassau {PHONE}</a>
        <a className="num top__tel" href={TEL_US}>US and Canada {PHONE_US}</a>
        <a className="top__call" href={TEL}>Call</a>
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <p className="foot__name">{NAME}</p>
        <p>Dr. Bernadette Burrows, owner and planner. Fire Trail Road West, P.O. Box CB-13320, Nassau, New Providence, The Bahamas.</p>
        <p className="foot__fine">No photographs of her own weddings are online, and the magazines' photographs belong to Mango Studios and Karen Hill Photography. So the pictures here are illustrative stand-ins, waiting for her own, except the French Cloisters: photograph by Art davis, <a href="https://commons.wikimedia.org/wiki/File:Atlantis_French_Cloisters.jpg" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0.</p>
      </div>
    </footer>
  )
}
