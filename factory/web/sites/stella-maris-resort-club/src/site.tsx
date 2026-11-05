import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Mail } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

const U = "https://www.stellamarisresort.com/wp-content/uploads/"
export const IMG = { hero: U + "2021/11/7.jpg", resort: U + "2021/11/3-1.jpg", stay: U + "2021/11/2ba.jpg", g1: U + "2021/11/Resize1-1170x780.jpg", g2: U + "2021/11/Resize2-1170x780.jpg", g0: U + "2021/11/Resize_1-1170x878.jpg" }
export const U2 = U
export const PHONE = "(242) 338-2050"
export const TEL = "tel:+12423382050"
export const EMAIL = "Reservations@stellamarisresort.com"
export const AIR = "Stellamarisresortairservice@gmail.com"

const NAV = [
  { href: "stay.html", label: "Rooms & houses" },
  { href: "island.html", label: "Dive, fish, explore" },
  { href: "island.html#weddings", label: "Weddings" },
  { href: "island.html#getting-here", label: "Getting here" },
]

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <motion.path d="M50 4 L57 43 L96 50 L57 57 L50 96 L43 57 L4 50 L43 43 Z" fill="none" stroke="currentColor" strokeWidth="1.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} />
      <motion.path d="M50 22 L53 47 L78 50 L53 53 L50 78 L47 53 L22 50 L47 47 Z" fill="currentColor" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: "50px 50px" }} />
    </svg>
  )
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="flex items-center gap-3" aria-label="Stella Maris Resort Club, home">
          <svg viewBox="0 0 100 100" className="size-8 text-lagoon" aria-hidden><path d="M50 4 L57 43 L96 50 L57 57 L50 96 L43 57 L4 50 L43 43 Z" fill="currentColor" /></svg>
          <span className="leading-none"><span className="font-display text-[1.45rem]">Stella Maris</span><span className="mt-0.5 block text-[12px] text-muted">Resort Club &amp; Marina, Long Island</span></span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className={`ulink text-[15px] ${current === n.label ? "is-on" : ""}`}>{n.label}</a>)}
          <a href="index.html#plan" className="pill pill-solid">Plan your stay</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>)}
              <a href="index.html#plan" onClick={() => setOpen(false)} className="pill pill-solid mt-8">Plan your stay</a>
              <a href={TEL} className="mt-4 text-center text-muted">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gradient-to-r from-shallows via-lagoon to-atlantic" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-atlantic text-paper pb-28 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl">Stella Maris Resort Club &amp; Marina</p>
          <p className="mt-3 max-w-sm text-paper/75">Ocean View Drive, P.O. Box LI 30-105, Stella Maris, Long Island, The Bahamas.</p>
        </div>
        <div className="text-[15px]">
          <p className="kicker !text-shallows">Reservations</p>
          <a href={TEL} className="mt-3 block hover:text-shallows">{PHONE}, also 2051 and 2027</a>
          <a href={`mailto:${EMAIL}`} className="ulink mt-1 inline-block break-all">{EMAIL}</a>
          <a href={`mailto:${AIR}`} className="ulink mt-1 inline-block break-all">Flights: {AIR}</a>
        </div>
        <div className="text-[15px]">
          <p className="kicker !text-shallows">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-shallows">{n.label}</a>)}
          <a href="https://www.facebook.com/StellaMarisResort" className="mt-2 block hover:text-shallows">Facebook</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/60 md:px-10">Concept by ESTATIQ AI Solutions. Details from stellamarisresort.com and public listings, to be confirmed with the resort. Bookings by credit card (Visa, Mastercard, American Express).</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-1.5 border-l border-line text-[15px]"><Mail className="size-4" aria-hidden /> Email</a>
      <a href="index.html#plan" className="flex min-h-14 items-center justify-center bg-lagoon text-[15px] font-semibold text-white">Plan your stay</a>
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
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
}
export function Title({ n, k, id, children, intro, light = false }: { n: string; k: string; id: string; children: ReactNode; intro?: ReactNode; light?: boolean }) {
  return (
    <Reveal>
      <p className={`kicker ${light ? "!text-shallows" : ""}`}><span className={light ? "" : "text-lagoon"}>{n}</span>&ensp;{k}</p>
      <h2 id={id} className="mt-4 font-display text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.015em]">{children}</h2>
      {intro && <div className={`mt-6 max-w-md text-[17px] leading-relaxed ${light ? "text-paper/80" : "text-muted"}`}>{intro}</div>}
    </Reveal>
  )
}
export function Img({ src, alt, className = "", w = 1200, h = 800 }: { src: string; alt: string; className?: string; w?: number; h?: number }) {
  return (
    <motion.div className={`overflow-hidden bg-paper-2 ${className}`} initial={{ clipPath: "inset(10% 10% 10% 10% round 24px)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1.3, ease: reveal }}>
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="size-full object-cover" />
    </motion.div>
  )
}
