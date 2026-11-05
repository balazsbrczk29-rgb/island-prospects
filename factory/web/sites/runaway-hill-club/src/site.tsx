import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Mail } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { EMAIL, LOCAL, LOCAL_TEL, US, US_TEL, BOOK } from "./data"
import "./styles.css"

const NAV = [
  { href: "index.html#house", label: "The house" },
  { href: "rooms.html", label: "Rooms" },
  { href: "island.html", label: "Days & events" },
  { href: "island.html#getting-here", label: "Getting here" },
]

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

export function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <span className="leading-none">
      <span className={`font-display text-ink ${small ? "text-xl" : "text-[1.45rem]"}`}>Runaway Hill <em className="text-tile">Inn</em></span>
      <span className="mt-1 block text-[12px] tracking-[0.08em] text-muted">Harbour Island, Bahamas</span>
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
        <a href="index.html" aria-label="Runaway Hill Inn, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`ulink text-[15px] text-ink ${current === n.label ? "is-on" : ""}`}>{n.label}</a>
          ))}
          <a href="index.html#stay" className="btn-primary">Ask about a room</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl text-ink">{n.label}</motion.a>
              ))}
              <a href="index.html#stay" onClick={() => setOpen(false)} className="btn-primary mt-8 justify-center">Ask about a room</a>
              <a href={LOCAL_TEL} className="mt-4 text-center text-muted">Call {LOCAL}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-tile" aria-hidden />
    </header>
  )
}

export function TileStrip({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 48" preserveAspectRatio="xMidYMid slice" aria-hidden role="presentation">
      <defs>
        <pattern id="cuban" width="48" height="48" patternUnits="userSpaceOnUse">
          <rect width="48" height="48" fill="#f1e2d9" />
          <path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="#2b5175" strokeWidth="1.2" />
          <circle cx="24" cy="24" r="7" fill="#a9d0c5" stroke="#2b5175" strokeWidth="1" />
          <path d="M24 10 Q28 24 24 38 Q20 24 24 10 M10 24 Q24 28 38 24 Q24 20 10 24" fill="#e6bcae" opacity=".9" />
          <circle cx="0" cy="0" r="6" fill="#2b5175" /><circle cx="48" cy="0" r="6" fill="#2b5175" /><circle cx="0" cy="48" r="6" fill="#2b5175" /><circle cx="48" cy="48" r="6" fill="#2b5175" />
        </pattern>
      </defs>
      <rect width="480" height="48" fill="url(#cuban)" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="bg-paper-2 pb-28 lg:pb-0">
      <TileStrip className="block h-6 w-full" />
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-sm text-muted">Love Lane and Colebrooke Streets, PO Box 27031, Harbour Island, Bahamas.</p>
        </div>
        <div className="text-[15px]">
          <p className="label">Reservations</p>
          <a href={`mailto:${EMAIL}`} className="ulink mt-3 inline-block">{EMAIL}</a>
          <a href={LOCAL_TEL} className="mt-2 block hover:text-tile">Local {LOCAL}</a>
          <a href={US_TEL} className="mt-1 block hover:text-tile">US and Canada {US}</a>
          <a href={BOOK} className="ulink mt-3 inline-block">Check dates online</a>
        </div>
        <div className="text-[15px]">
          <p className="label">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-tile">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Rooms, rates and details from runawayhill.com, to be confirmed with the inn.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={LOCAL_TEL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-1.5 border-l border-line text-[15px]"><Mail className="size-4" aria-hidden /> Email</a>
      <a href="index.html#stay" className="flex min-h-14 items-center justify-center bg-tile text-[15px] text-paper">Ask about a room</a>
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
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function MaskImg({ src, alt, className = "", w, h, eager = false }: { src: string; alt: string; className?: string; w: number; h: number; eager?: boolean }) {
  return (
    <motion.div className={`overflow-hidden bg-paper-2 ${className}`} initial={{ clipPath: "inset(12% 12% 12% 12%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1.3, ease: reveal }}>
      <img src={src} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} className="size-full object-cover" />
    </motion.div>
  )
}

export function SectionHead({ n, kicker, title, id, children }: { n: string; kicker: string; title: ReactNode; id: string; children?: ReactNode }) {
  return (
    <Reveal>
      <p className="label"><span className="text-tile">{n}</span>&ensp;{kicker}</p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.02em]">{title}</h2>
      {children && <div className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">{children}</div>}
    </Reveal>
  )
}
