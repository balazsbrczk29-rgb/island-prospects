import { StrictMode, useEffect, useRef, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { Phone, ArrowUpRight } from "lucide-react"
import { EMAIL, OFFICE, OFFICE_TEL, PHONE, TEL, type Pic } from "./data"
import "./styles.css"

export function mount(node: ReactNode) {
  const el = document.getElementById("root")!
  const app = <StrictMode>{node}</StrictMode>
  createRoot(el).render(app)
}

/** Wheel smoothing on desktop only; touch scrolling stays native. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

/** A photograph in a frame that never exceeds the source's pixel width. */
export function Img({ pic, className = "", eager = false, maxW, style }: { pic: Pic; className?: string; eager?: boolean; maxW?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLImageElement>(null)
  const [inn, setIn] = useState(false)
  useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth) setIn(true) }, [])
  return (
    <div className={`pic ${className}`} style={{ aspectRatio: `${pic.w} / ${pic.h}`, maxWidth: Math.min(maxW ?? pic.w, pic.w), ...style }}>
      <img ref={ref} src={pic.src} alt={pic.alt} width={pic.w} height={pic.h} loading={eager ? "eager" : "lazy"} decoding="async" onLoad={() => setIn(true)} className={inn ? "is-in" : ""} />
    </div>
  )
}

export const NAV = [
  { href: "excursions.html", label: "Excursions" },
  { href: "transfers.html", label: "Airport transfers" },
  { href: "index.html#story", label: "Since 1959" },
  { href: "index.html#desks", label: "Hotel desks" },
]

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="index.html" className={`no-underline leading-none ${className}`} aria-label="Majestic Tours, home">
      <span className="font-display text-[1.6rem] tracking-[-0.02em]">Majestic Tours</span>
    </a>
  )
}

/** Header for inner pages: in the flow, not sticky. */
export function TopBar({ current }: { current?: string }) {
  return (
    <header className="flex items-center justify-between gap-6 px-[var(--pad)] pt-6 pb-4">
      <Wordmark />
      <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
        {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.href ? "page" : undefined} className={`py-3 text-small no-underline hover:text-green ${current === n.href ? "text-green" : ""}`}>{n.label}</a>)}
      </nav>
      <div className="flex items-center gap-5">
        <a href={TEL} className="tnum hidden text-small no-underline md:inline">{PHONE}</a>
        <a href={TEL} className="grid size-11 place-items-center md:hidden" aria-label={`Call ${PHONE}`}><Phone className="size-5" strokeWidth={1.5} aria-hidden /></a>
        <a href="index.html#book" className="btn hidden sm:inline-flex">Plan my excursion</a>
      </div>
    </header>
  )
}

export const STOPS_FOR_FORM = ["Nassau Harbour: sails and dinner cruises", "Blue Lagoon Island", "Rose Island", "Southwest reefs: Stuart Cove's", "Exuma Cays", "Harbour Island", "On the island: culture and food", "Airport transfer", "Not sure yet"]

/** Composes an email to Majestic's working address; no backend. */
export function EnquiryForm({ where, onWhere, compact = false, idp = "q" }: { where: string; onWhere: (v: string) => void; compact?: boolean; idp?: string }) {
  const [sent, setSent] = useState(false)
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    const f = e.currentTarget
    if (!f.checkValidity()) return
    e.preventDefault()
    const lines = ["Hello Majestic Tours,", ""]
    new FormData(f).forEach((v, k) => { const s = String(v).trim(); if (s) lines.push(`${k}: ${s}`) })
    lines.push("", "(sent from the website)")
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Excursion enquiry: " + where)}&body=${encodeURIComponent(lines.join("\n"))}`
    setSent(true)
  }
  return (
    <form onSubmit={submit} className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`} aria-label="Plan my excursion">
      <label className="sm:col-span-2"><span className="field-label">Where to</span>
        <select name="Trip" className="field-input" value={where} onChange={e => onWhere(e.target.value)}>
          {STOPS_FOR_FORM.map(s => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label><span className="field-label">Date</span><input id={`${idp}-date`} name="Date" type="date" className="field-input tnum" /></label>
      <label><span className="field-label">Guests</span><input name="Guests" inputMode="numeric" placeholder="2 adults, 1 child" className="field-input" /></label>
      <label><span className="field-label">Staying at</span><input name="Hotel" autoComplete="off" placeholder="Your hotel or ship" className="field-input" /></label>
      <label><span className="field-label">Your name</span><input name="Name" required autoComplete="name" className="field-input" /></label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:col-span-2">
        <button type="submit" className="btn">Send my plan</button>
        <p className="text-cap text-muted italic" aria-live="polite">{sent ? "Your email app opened with your plan filled in." : `Opens your email app, addressed to ${EMAIL}.`}</p>
      </div>
    </form>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink px-[var(--pad)] pt-20 pb-28 text-ground md:pb-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-[2.6rem] leading-none tracking-[-0.03em]">Majestic Tours</p>
          <p className="mt-4 max-w-sm text-small text-ground/75 italic">Service is our Profession. A Bahamian family company since June 1959.</p>
        </div>
        <div className="text-small md:col-span-3">
          <p className="text-ground/60 italic">Tours</p>
          <a href={TEL} className="tnum mt-1 block no-underline hover:text-field">{PHONE}</a>
          <p className="mt-5 text-ground/60 italic">Head office</p>
          <a href={OFFICE_TEL} className="tnum mt-1 block no-underline hover:text-field">{OFFICE}</a>
          <a href={`mailto:${EMAIL}`} className="mt-1 block break-all no-underline hover:text-field">{EMAIL}</a>
        </div>
        <div className="text-small md:col-span-4">
          <p className="text-ground/60 italic">Find us</p>
          <p className="mt-1">Hillside Manor, Cumberland Street<br />P.O. Box N-1401, Nassau, The Bahamas</p>
          <nav aria-label="Footer" className="mt-5 flex flex-wrap gap-x-5">
            {NAV.map(n => <a key={n.href} href={n.href} className="link">{n.label}</a>)}
          </nav>
        </div>
      </div>
      <p className="mt-16 max-w-3xl text-cap text-ground/55">Photographs from majestictoursbahamas.com. Sister companies: Majestic Holidays, Majestic Travel, Bahama Fantasies. Member of ASTA, CHA and IATA.</p>
    </footer>
  )
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener" className="link">{children}<ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden /></a>
}
