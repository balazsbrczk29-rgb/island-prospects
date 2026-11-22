import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// Every contact below is published by BBSL on bbsl.com (header, Sales, Service, Copy Service pages).
export const C = {
  nassau: { label: "Nassau", phone: "(242) 605-6000", tel: "tel:+12426056000", address: "Collins Avenue & 7th Terrace, Nassau", box: "P.O. Box N-4950" },
  freeport: { label: "Freeport", phone: "(242) 688-8100", tel: "tel:+12426888100", address: "Queens Highway, Freeport, Grand Bahama" },
  service: { phone: "(242) 605-6006", tel: "tel:+12426056006", email: "service@bbsl.com" },
  sales: { email: "sales@bbsl.com" },
  copy: { phone: "(242) 605-6027", tel: "tel:+12426056027", email: "copyservice@bbsl.com" },
  info: "info@bbsl.com",
}
export type Island = "nassau" | "freeport"

export const ease = [0.22, 1, 0.36, 1] as const
export const mask = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#lines", label: "Equipment" },
  { href: "index.html#service", label: "Service" },
  { href: "document-centre.html", label: "Document Centre" },
  { href: "index.html#offices", label: "Offices" },
]

/** Helpdesk: Monday to Friday, 8:30 am to 5:00 pm, Nassau time (bbsl.com Service page). */
export function helpdeskNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Nassau", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(d)
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? ""
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"))
  const mins = Number(get("hour")) * 60 + Number(get("minute"))
  const weekday = day >= 1 && day <= 5
  const open = weekday && mins >= 510 && mins < 1020
  let next = "opens 8:30 am"
  if (!open && (day === 5 && mins >= 1020 || day === 6 || day === 0)) next = "opens Monday 8:30 am"
  else if (!open && mins >= 1020) next = "opens tomorrow 8:30 am"
  return { open, text: open ? "Helpdesk open now, until 5:00 pm" : `Helpdesk closed, ${next}` }
}
export function useHelpdesk() {
  const [s, setS] = useState<{ open: boolean | null; text: string }>({ open: null, text: "Helpdesk Mon to Fri, 8:30 am to 5:00 pm" })
  useEffect(() => { const t = () => setS(helpdeskNow()); t(); const id = setInterval(t, 60000); return () => clearInterval(id) }, [])
  return s
}
export function Lamp({ open }: { open: boolean | null }) {
  if (open === null) return <span className="lamp bg-line" aria-hidden />
  return <span className="lamp" data-open={String(open)} aria-hidden />
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3 leading-none">
      <span className={`grid size-10 place-items-center border font-display text-[22px] italic ${light ? "border-edge-dark text-paper" : "border-ink text-ink"}`} aria-hidden>B</span>
      <span>
        <span className={`block font-display text-[21px] ${light ? "text-paper" : "text-ink"}`}>Bahamas Business Solutions</span>
        <span className={`slug mt-1 block ${light ? "!text-paper-soft" : ""}`}>Since 1966<span className="hidden sm:inline"> · Nassau · Freeport</span></span>
      </span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="relative z-30 border-b border-line bg-paper">
      <div className="wrap flex min-h-[76px] items-center justify-between gap-6">
        <a href="index.html" aria-label="Bahamas Business Solutions, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-ink after:transition-transform after:duration-300 after:ease-[var(--ease-out)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-6 font-mono text-[13px] lg:flex">
          <a href={C.nassau.tel} className="flex min-h-11 items-center gap-2 hover:text-cyan"><span className="text-muted">Nassau</span>{C.nassau.phone}</a>
          <a href={C.freeport.tel} className="flex min-h-11 items-center gap-2 hover:text-cyan"><span className="text-muted">Freeport</span>{C.freeport.phone}</a>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-12 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.45, ease }} className="border-b border-line py-4 font-display text-[32px] leading-tight">{n.label}</motion.a>
              ))}
            </nav>
            <div className="mt-8 px-6"><Numbers /></div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export const DESKS = [
  { k: "Service helpdesk", v: C.service.phone, href: C.service.tel },
  { k: "Sales, Nassau", v: C.nassau.phone, href: C.nassau.tel },
  { k: "Freeport office", v: C.freeport.phone, href: C.freeport.tel },
  { k: "Document Centre", v: C.copy.phone, href: C.copy.tel },
]
function Numbers({ light = false }: { light?: boolean }) {
  return (
    <ul className={`border-t ${light ? "border-rule-dark" : "border-line"}`}>
      {DESKS.map(d => (
        <li key={d.k}><a href={d.href} className={`flex min-h-14 items-center justify-between gap-4 border-b ${light ? "border-rule-dark" : "border-line"}`}>
          <span className={light ? "text-paper-mid" : "text-muted"}>{d.k}</span><span className="font-mono text-[15px]">{d.v}</span>
        </a></li>
      ))}
    </ul>
  )
}

/** Phone: one floating "Call a desk" button after the hero, hidden near the offices section. */
function CallDesk() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => {
      const end = document.getElementById("offices")?.getBoundingClientRect().top ?? 1e9
      setShow(window.scrollY > window.innerHeight * 0.9 && end > window.innerHeight * 0.6)
    }
    on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on)
  }, [])
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <motion.div className="fixed right-4 z-40 md:hidden" style={{ bottom: "calc(16px + env(safe-area-inset-bottom))" }} initial={false} animate={{ y: show ? 0 : 96, opacity: show ? 1 : 0 }} transition={{ duration: 0.35, ease }}>
        <SheetTrigger className="flex min-h-12 items-center gap-2 bg-cyan px-5 text-[15px] text-paper shadow-[var(--shadow-sheet)]" tabIndex={show ? 0 : -1}><Phone className="size-4" aria-hidden /> Call a desk</SheetTrigger>
      </motion.div>
      <SheetContent side="bottom" className="border-t-0 bg-paper px-5 pt-6 pb-[calc(24px+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between"><SheetTitle className="font-display text-[28px] font-normal">Call a BBSL desk</SheetTitle></div>
        <div className="mt-4"><Numbers /></div>
      </SheetContent>
    </Sheet>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-[15px] text-paper-mid">One hundred percent Bahamian owned. In the document business since 1966, with offices in Nassau and Freeport. Global Technology. Delivered Locally.</p>
        </div>
        {[C.nassau, C.freeport].map(o => (
          <div key={o.label} className="text-[15px]">
            <p className="text-paper-soft">{o.label}</p>
            <a href={o.tel} className="mt-2 block font-display text-[26px] transition hover:text-toner">{o.phone}</a>
            <p className="mt-2 text-paper-mid">{o.address}</p>
          </div>
        ))}
        <div className="text-[15px]">
          {[["General", C.info], ["Sales", C.sales.email], ["Service", C.service.email], ["Document Centre", C.copy.email]].map(([k, e]) => (
            <a key={e} href={`mailto:${e}`} className="flex min-h-11 items-center justify-between gap-4 border-b border-rule-ink transition hover:text-toner"><span className="text-paper-soft">{k}</span><span className="font-mono text-[14px]">{e}</span></a>
          ))}
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-rule-ink py-6 pb-24 text-[13px] text-paper-soft md:flex-row md:justify-between md:pb-6">
        <span>© Bahamas Business Solutions Limited</span>
        <span>Concept by ESTATIQ AI Solutions. Details from bbsl.com and public listings, to be confirmed with BBSL.</span>
      </div>
    </footer>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><CallDesk /></>)
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}

/** A section comes out of the printer: a clip wipe from its top edge. */
export function Feed({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.7, delay, ease: mask }}>
      {children}
    </motion.div>
  )
}

/** Section start: a hairline with the proof slug at the right edge (no eyebrow above the heading). */
export function ProofLine({ n, name, light = false }: { n: string; name: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${light ? "text-paper-soft" : ""}`} aria-hidden>
      <span className={`h-px flex-1 ${light ? "bg-rule-dark" : "bg-line"}`} />
      <span className={`slug ${light ? "!text-paper-soft" : ""}`}>Proof {n} · {name}</span>
    </div>
  )
}
