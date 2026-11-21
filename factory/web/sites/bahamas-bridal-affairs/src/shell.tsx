import { StrictMode, useEffect, useRef, useState, type ReactNode } from "react"
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
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
}

const CHAPTERS = [
  { roman: "I", label: "The day", href: "index.html#the-day" },
  { roman: "II", label: "The planner", href: "index.html#the-planner" },
  { roman: "III", label: "In print", href: "weddings.html" },
  { roman: "IV", label: "Your date", href: "index.html#your-date" },
]

export function TopLine({ home }: { home: boolean }) {
  const [open, setOpen] = useState(false)
  const close = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    close.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); opener.current?.focus() } }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  }, [open])
  const link = (href: string) => (home && href.startsWith("index.html#") ? href.slice(10) : href)
  return (
    <>
      <header className="bar">
        <a className="bar__name" href="index.html">{NAME}</a>
        <div className="bar__right">
          <a className="bar__tel num" href={TEL}>{PHONE}</a>
          <button ref={opener} type="button" className="bar__menu" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>Menu</button>
        </div>
      </header>
      <div className="menu" role="dialog" aria-modal="true" aria-label="Menu" data-open={open} inert={!open}>
        <div className="bar">
          <a className="bar__name" href="index.html">{NAME}</a>
          <button ref={close} type="button" className="bar__menu" onClick={() => { setOpen(false); opener.current?.focus() }}>Close</button>
        </div>
        <nav className="menu__list" aria-label="Chapters">
          {CHAPTERS.map(c => (
            <a key={c.label} href={link(c.href)} onClick={() => setOpen(false)}><span className="roman">{c.roman}</span>{c.label}</a>
          ))}
        </nav>
        <div className="menu__foot">
          <a className="quiet num" href={TEL}>Nassau {PHONE}</a>
          <a className="quiet num" href={TEL_US}>From the US and Canada {PHONE_US}</a>
        </div>
      </div>
    </>
  )
}

/** The page ends like a film: the practical facts as end credits. */
export function EndCredits() {
  return (
    <footer className="credits" id="contact">
      <p className="credits__name">{NAME}</p>
      <dl>
        <dt>Owner and operator</dt><dd>Dr. Bernadette Burrows</dd>
        <dt>Nassau</dt><dd><a className="num" href={TEL}>{PHONE}</a></dd>
        <dt>From the US and Canada</dt><dd><a className="num" href={TEL_US}>{PHONE_US}</a></dd>
        <dt>By post</dt><dd>Fire Trail Road West, P.O. Box CB-13320, Nassau, New Providence</dd>
      </dl>
      <p className="credits__fine">
        The scenes retell a wedding published in Weddingbells on 2 November 2012. Their photographs belong to Mango Studios, so the pictures here are illustrative and wait to be replaced with the planner's own. The French Cloisters, Paradise Island: photograph by Art davis, <a href="https://commons.wikimedia.org/wiki/File:Atlantis_French_Cloisters.jpg" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0.
      </p>
    </footer>
  )
}

/** The one action that follows you: hidden wherever the screen already carries its own (the film, the note, the credits). */
export function Ask({ href, hideOver }: { href: string; hideOver: string[] }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const over = new Set<Element>()
    const io = new IntersectionObserver(es => {
      for (const e of es) { if (e.isIntersecting) over.add(e.target); else over.delete(e.target) }
      const on = over.size === 0
      setShow(on); document.documentElement.dataset.ask = String(on)
    }, { threshold: 0 })
    hideOver.forEach(s => { const el = document.querySelector(s); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [hideOver])
  return <a className="cta ask" href={href} data-show={show} tabIndex={show ? 0 : -1} aria-hidden={!show}>Ask about your date</a>
}
