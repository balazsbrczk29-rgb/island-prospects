import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 677-2600"
export const TEL = "tel:+12426772600"
export const OFFICE = "(242) 322-2606"
export const OFFICE_TEL = "tel:+12423222606"
export const EMAIL = "transport@majesticholidays.com"
export const IMG = "https://www.majestictoursbahamas.com/data/tours/images/"
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "excursions.html", label: "Excursions" },
  { href: "transfers.html", label: "Airport transfers" },
  { href: "index.html#since-1959", label: "Since 1959" },
  { href: "index.html#contact", label: "Contact" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="leading-none">
      <span className={`font-display text-[1.45rem] tracking-[0.01em] ${light ? "text-paper" : "text-ink"}`}>Majestic Tours</span>
      <span className={`mt-1 block text-[10.5px] tracking-[0.24em] uppercase ${light ? "text-paper/70" : "text-muted"}`}>Nassau · Since 1959</span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="Majestic Tours, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-green after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="text-[15px] text-ink transition hover:text-green">{PHONE}</a>
          <a href="index.html#plan" className="group inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-green px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-green-deep active:translate-y-0">
            Plan my excursion <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line"><Phone className="size-5" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col gap-1 px-6" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl text-ink">{n.label}</motion.a>
                ))}
                <a href="index.html#plan" onClick={() => setOpen(false)} className="mt-8 rounded-[3px] bg-green py-4 text-center text-paper">Plan my excursion</a>
                <a href={TEL} className="mt-2 rounded-[3px] border border-ink/20 py-4 text-center text-ink">Call {PHONE}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-green" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-paper-2 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">Majestic Tours Limited. Head office: Hillside Manor, Cumberland St, P.O. Box N-1401, Nassau, New Providence, The Bahamas.</p>
          <p className="mt-3 text-[13px] tracking-[0.14em] text-green uppercase">Service is our profession</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Book tours</p>
          <a href={TEL} className="mt-2 block hover:text-green">{PHONE}</a>
          <p className="mt-4 text-[11px] tracking-[0.2em] text-muted uppercase">Head office</p>
          <a href={OFFICE_TEL} className="mt-2 block hover:text-green">{OFFICE}</a>
          <p className="text-muted">Fax (242) 326-5785</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Email</p>
          <a href={`mailto:${EMAIL}`} className="mt-2 block break-all hover:text-green">{EMAIL}</a>
          <p className="mt-4 text-[11px] tracking-[0.2em] text-muted uppercase">The world of Majestic</p>
          <p className="mt-2 text-muted">Majestic Holidays · Majestic Travel · Bahama Fantasies</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Pages</p>
          <a href="index.html" className="mt-2 block hover:text-green">Home</a>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-green">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-line px-5 py-6 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Details and photographs from majestictoursbahamas.com, to be confirmed with Majestic Tours.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href="index.html#plan" className="flex min-h-14 items-center justify-center bg-green text-[15px] text-paper">Plan my excursion</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[11px] tracking-[0.24em] uppercase ${light ? "text-sand" : "text-green"}`}>{children}</p>
}

export function Lines({ lines, className = "", delay = 0.2 }: { lines: string[]; className?: string; delay?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span className={`block ${className}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: delay + i * 0.1, duration: 1.15, ease: [0.77, 0, 0.175, 1] }}>{line}</motion.span>
        </span>
      ))}
    </>
  )
}

export function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`group relative overflow-hidden bg-paper-2 ${className}`}>
      <img src={src} alt={alt} width={960} height={640} loading={priority ? "eager" : "lazy"} {...(priority ? { fetchPriority: "high" as const } : {})} className="size-full object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
    </div>
  )
}
