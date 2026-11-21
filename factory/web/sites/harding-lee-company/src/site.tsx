import { useEffect, useRef, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import "./styles.css"

export const PHONE = "(242) 326-4065"
export const TEL = "+12423264065"

export function Header({ home = true }: { home?: boolean }) {
  const p = home ? "" : "index.html"
  return (
    <header className="wrap">
      <div className="hdr">
        <a className="mark" href="index.html" aria-label="Harding-Lee & Company, home">Harding-Lee <span>&amp;</span> Company</a>
        <nav className="nav" aria-label="Main">
          <a href="practice.html">Practice</a>
          <a href={`${p}#attorneys`}>Attorneys</a>
          <a href={`${p}#offices`}>Offices</a>
          <a className="tel num" href={`tel:${TEL}`}>{PHONE}</a>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="wrap">
      <div className="ftr">
        <span>Harding-Lee &amp; Company, attorneys at law. Nassau and Salt Pond, Long Island. Practising in all courts of the Commonwealth of The Bahamas since 1996.</span>
        <span>Photographs of the desk, street and dock are illustrative images made for this concept. Portraits from hardinglee.com.</span>
      </div>
    </footer>
  )
}

/** Call / write bar for phones: hidden over the first screen and over the enquiry block. */
export function MobileBar({ writeHref = "#write" }: { writeHref?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const hideFor = new Set<Element>()
    const targets = [document.querySelector("[data-hero]"), document.querySelector("#write")].filter(Boolean) as Element[]
    const io = new IntersectionObserver(es => {
      es.forEach(e => (e.isIntersecting ? hideFor.add(e.target) : hideFor.delete(e.target)))
      el.dataset.hidden = hideFor.size ? "true" : "false"
    }, { threshold: 0.12 })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])
  return (
    <div className="mbar" ref={ref} data-hidden="true" aria-label="Contact the firm">
      <a className="btn call num" href={`tel:${TEL}`}>Call Nassau</a>
      <a className="btn" href={writeHref}>Write to us</a>
    </div>
  )
}

export function Page({ children, home = true }: { children: ReactNode; home?: boolean }) {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.05 })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header home={home} />
      <main id="main">{children}</main>
      <Footer />
      <MobileBar writeHref={home ? "#write" : "index.html#write"} />
    </>
  )
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}
