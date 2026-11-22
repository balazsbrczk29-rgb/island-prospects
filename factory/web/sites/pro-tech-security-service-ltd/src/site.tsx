import { useEffect, useRef, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import { AnimatePresence, motion } from "motion/react"
import Lenis from "lenis"
import { ADDRESS, FAX, INTL, PHONE, PHONE2, TEL, TEL2, TELINTL } from "./data"
import "./styles.css"

const MENU = [
  ["1.0", "Plan your call", "index.html#main"],
  ["2.0", "Six services", "index.html#services"],
  ["3.0", "Monitoring 24/7", "index.html#monitoring"],
  ["4.0", "Licensed, since 2004", "index.html#who"],
  ["5.0", "Contact", "index.html#contact"],
]

export function Header({ solid = false, ink }: { solid?: boolean; ink?: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", k)
    return () => window.removeEventListener("keydown", k)
  }, [open])
  return (
    <>
      <header className={`hdr${solid ? " solid" : ""}`} style={ink ? ({ "--hdr-ink": ink } as React.CSSProperties) : undefined}>
        <a className="name" href="index.html">Pro-Tech Security</a>
        <div className="right">
          <a className="num" href={`tel:${TEL}`}><span className="tel-long">{PHONE}</span><span className="tel-short">Call</span></a>
          <button type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>Menu</button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div id="menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="top"><span>Pro-Tech Security</span><button type="button" onClick={() => setOpen(false)} autoFocus>Close</button></div>
            <ol>{MENU.map(([n, t, h]) => <li key={n}><a href={h} onClick={() => setOpen(false)}><span className="num">{n}</span>{t}</a></li>)}</ol>
            <div className="foot"><a className="btn num" href={`tel:${TEL}`}>Call {PHONE}</a><span>{ADDRESS}</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Persistent call link bottom-right, hidden over the hero and the contact block. */
export function Dock() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const seen = new Set<Element>()
    const io = new IntersectionObserver(es => {
      es.forEach(e => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
      el.dataset.hidden = seen.size ? "true" : "false"
    }, { threshold: 0.05 })
    document.querySelectorAll("[data-hero], #contact, .readout .acts").forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])
  return <div className="dock" ref={ref} data-hidden="true"><a className="btn num" href={`tel:${TEL}`}>Call {PHONE}</a></div>
}

export function Credits() {
  return (
    <footer className="credits" id="contact" aria-labelledby="credits-h">
      <span className="n num">5.0</span>
      <h2 id="credits-h">One number, any weekday. The central station, every hour.</h2>
      <dl className="roll">
        <div><dt>Call the office</dt><dd className="num"><a href={`tel:${TEL}`}>{PHONE}</a><br /><a href={`tel:${TEL2}`}>{PHONE2}</a> <span className="old">on older listings</span></dd></div>
        <div><dt>From abroad</dt><dd className="num"><a href={`tel:${TELINTL}`}>{INTL}</a></dd></div>
        <div><dt>Office</dt><dd>#2 Farrington Road &amp; Gregory Street<br />P.O. Box CB-13083, Nassau<br /><a href="https://www.google.com/maps/search/?api=1&query=Farrington+Road+and+Gregory+Street+Nassau+Bahamas" target="_blank" rel="noopener">Directions</a><br /><span className="old">Older listings: #10 Jem's Plaza, Pitt Road</span></dd></div>
        <div><dt>Office hours</dt><dd className="num">Monday to Friday, 9 am to 5 pm</dd></div>
        <div><dt>Monitoring</dt><dd>Central station, 24 hours a day, 7 days a week</dd></div>
        <div><dt>Fax</dt><dd className="num">{FAX}</dd></div>
        <div><dt>Since</dt><dd className="num">2004, 100% Bahamian owned and operated</dd></div>
        <div><dt>Licensed by</dt><dd>The Ministry of National Security, as a security service contractor</dd></div>
        <div><dt>Plan first</dt><dd><a href="index.html#main">Prepare your call in a minute</a></dd></div>
      </dl>
      <div className="fine">
        <span>Pro-Tech Security Service Limited, Nassau, The Bahamas.</span>
        <span>Street, officer and control-room photographs are illustrative images made for this concept.</span>
      </div>
    </footer>
  )
}

export function Page({ children, solid = false, ink }: { children: ReactNode; solid?: boolean; ink?: string }) {
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
      <Header solid={solid} ink={ink} />
      <main id="main">{children}</main>
      <Credits />
      <Dock />
    </>
  )
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}
