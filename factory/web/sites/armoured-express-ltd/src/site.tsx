import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { AnimatePresence, motion } from "motion/react"
import { Menu, Phone, X } from "lucide-react"
import "./styles.css"

export const PHONE = "242-323-4430"
export const TEL = "tel:+12423234430"
export const PHONE2 = "242-328-6841"
export const TEL2 = "tel:+12423286841"
export const out = [0.22, 1, 0.36, 1] as const

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#custody", label: "Custody" },
  { href: "#security-services", label: "Security Services" },
  { href: "#since-1961", label: "Since 1961" },
  { href: "#contact", label: "Contact" },
]

/** Office hours Mon to Fri 9:00 to 17:00, Nassau time. */
export function useOffice() {
  const [open, setOpen] = useState<boolean | null>(null)
  useEffect(() => {
    const check = () => {
      const p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Nassau", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date())
      const g = (t: string) => p.find(x => x.type === t)?.value ?? ""
      const h = Number(g("hour")) % 24 + Number(g("minute")) / 60
      setOpen(!["Sat", "Sun"].includes(g("weekday")) && h >= 9 && h < 17)
    }
    check(); const id = setInterval(check, 60000); return () => clearInterval(id)
  }, [])
  return open
}

export function OfficeStatus({ className = "" }: { className?: string }) {
  const open = useOffice()
  if (open === null) return <span className={className}>Office Mon to Fri, 9:00 to 5:00</span>
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`size-2 rounded-full ${open ? "bg-[#33854a]" : "bg-muted"}`} aria-hidden />
      {open ? "Office open now" : "Office closed · 24-hour support for clients"}
    </span>
  )
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

function Wordmark() {
  return (
    <a href="#top" className="flex min-h-11 flex-col justify-center leading-none" aria-label="Armoured Express (Bahamas) Ltd., top of page">
      <span className="block text-[19px] font-extrabold tracking-[-0.02em]">Armoured Express</span>
      <span className="tnum mt-1 block text-[13px] text-muted">(Bahamas) Ltd., est. 1961</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => { document.documentElement.style.overflow = open ? "hidden" : "" }, [open])
  return (
    <header id="top" className="relative z-30">
      <div className="wrap flex items-center justify-between gap-6 py-4">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className="ulink">{n.label}</a>)}
        </nav>
        <div className="hidden text-right lg:block">
          <a href={TEL} className="tnum block text-[17px] font-semibold"><span className="ulink">{PHONE}</span></a>
          <span className="mt-0.5 block text-[13px] text-muted"><OfficeStatus /></span>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center border border-ink/20"><Phone className="size-[18px]" strokeWidth={1.75} /></a>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="inline-flex size-11 items-center justify-center border border-ink/20"><Menu className="size-5" strokeWidth={1.75} /></button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 bg-ground lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="wrap flex items-center justify-between py-5"><Wordmark /><button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex size-11 items-center justify-center border border-ink/20"><X className="size-5" strokeWidth={1.75} /></button></div>
            <nav className="wrap mt-6 flex flex-col" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4, ease: out }} className="border-b border-line py-4 text-[28px] font-bold tracking-[-0.02em]">{n.label}</motion.a>)}
              <a href={TEL} className="btn-primary tnum mt-8"><Phone className="size-4" strokeWidth={1.75} aria-hidden />Call {PHONE}</a>
              <a href={TEL2} className="btn-ghost tnum mt-3">Also {PHONE2}</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-on-steel">
      <div className="wrap grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-[24px] font-extrabold tracking-[-0.02em]">Armoured Express (Bahamas) Ltd.</p>
          <p className="serif mt-3 max-w-md text-on-steel-muted">and Security Services (Bah.) Ltd. Stapledon Gardens, P.O. Box N-4499, Nassau. Serving Nassau and Grand Bahama since 1961.</p>
        </div>
        <div className="text-[15px] md:col-span-3">
          <a href={TEL} className="tnum flex min-h-11 w-fit items-center text-[19px] font-semibold"><span className="ulink">{PHONE}</span></a>
          <a href={TEL2} className="tnum flex min-h-11 w-fit items-center"><span className="ulink">{PHONE2}</span></a>
          <p className="mt-3 text-on-steel-muted">Office Mon to Fri, 9:00 to 5:00<br />24-hour support for clients</p>
        </div>
        <nav aria-label="Footer" className="text-[15px] md:col-span-3">
          {NAV.map(n => <a key={n.href} href={n.href} className="flex min-h-11 w-fit items-center"><span className="ulink">{n.label}</span></a>)}
        </nav>
      </div>
      <p className="wrap border-t border-on-steel/15 py-6 text-[13px] text-on-steel-muted">Concept by ESTATIQ AI Solutions. Details from the company's public listing, to be confirmed with the company.</p>
    </footer>
  )
}

/** Phone bar: hidden on the first screen and over the contact section. */
function ActionBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const sheet = document.getElementById("manifest"), contact = document.getElementById("contact")
    if (!sheet || !contact) return
    let pastSheet = false, atContact = false
    const apply = () => { const on = pastSheet && !atContact; setShow(on); document.body.classList.toggle("bar-on", on); document.documentElement.style.setProperty("--concept-offset", on ? "60px" : "0px") }
    const a = new IntersectionObserver(([e]) => { pastSheet = !e.isIntersecting && e.boundingClientRect.top < 0; apply() })
    const b = new IntersectionObserver(([e]) => { atContact = e.isIntersecting; apply() }, { rootMargin: "0px 0px -20% 0px" })
    a.observe(sheet); b.observe(contact)
    return () => { a.disconnect(); b.disconnect() }
  }, [])
  return (
    <motion.nav aria-label="Quick actions" initial={false} animate={{ y: show ? 0 : "110%" }} transition={{ duration: 0.3, ease: out }} className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.3fr] border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
      <a href="#manifest" tabIndex={show ? 0 : -1} className="flex min-h-[60px] items-center justify-center text-[15px] font-semibold">Your request</a>
      <a href={TEL} tabIndex={show ? 0 : -1} className="tnum flex min-h-[60px] items-center justify-center gap-2 bg-brass text-[15px] font-semibold text-surface"><Phone className="size-4" strokeWidth={1.75} aria-hidden />Call {PHONE}</a>
    </motion.nav>
  )
}

export function Page({ children }: { children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-surface focus:p-3">Skip to content</a><Header /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}
