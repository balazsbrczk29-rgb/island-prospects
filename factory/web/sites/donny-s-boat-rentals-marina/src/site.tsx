import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, MessageCircle, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { PHONE, TEL, PHONE_US, TEL_US, EMAIL, WA_LABEL, wa } from "./data"
import "./styles.css"

const NAV = [
  { href: "fleet.html", label: "Rent a boat" },
  { href: "marina.html", label: "Dockage" },
  { href: "index.html#islands", label: "Where to go" },
  { href: "index.html#reserve", label: "Reserve" },
]
export const ease = [0.16, 1, 0.3, 1] as const

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="block leading-none">
      <span className={`block font-display text-[1.45rem] ${light ? "text-paper" : "text-ink"}`}>Donny's</span>
      <span className={`mt-1 block text-[11px] font-semibold tracking-[0.14em] uppercase ${light ? "text-paper/65" : "text-muted"}`}>Boat Rentals & Marina · Green Turtle Cay</span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="Donny's home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-2 text-[15px] font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded after:bg-turtle after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={wa("Hi Taylor, I'd like to ask about a boat rental at Donny's.")} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-turtle px-5 text-[15px] font-semibold text-paper transition hover:-translate-y-px hover:bg-ink"><MessageCircle className="size-4" aria-hidden /> WhatsApp</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
              ))}
              <a href={wa("Hi Taylor, I'd like to ask about a boat rental at Donny's.")} className="mt-8 rounded-full bg-turtle py-4 text-center font-semibold text-paper">WhatsApp {WA_LABEL}</a>
              <a href={TEL} className="mt-3 rounded-full border border-ink/30 py-4 text-center">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-buoy" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-[15px] text-paper/70">Family owned and operated, at the end of Black Sound, Green Turtle Cay, Abaco.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-flats uppercase">Reach us</p>
          <a href={TEL} className="mt-3 block hover:text-buoy">{PHONE}</a>
          <a href={TEL_US} className="block hover:text-buoy">US {PHONE_US}</a>
          <a href={`mailto:${EMAIL}`} className="block break-all hover:text-buoy">{EMAIL}</a>
          <p className="mt-2 text-paper/60">VHF 16 (working 10) · Daily 8am to 8pm</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-flats uppercase">Find us</p>
          <p className="mt-3 text-paper/80">End of Black Sound<br />Green Turtle Cay, Abaco</p>
          <p className="mt-2 text-paper/60 tnum">N 26° 45.460′ · W 077° 19.301′</p>
          <a href="https://www.facebook.com/p/Donnys-Boat-Rentals-and-Marina-100057220039045/" className="mt-2 block hover:text-buoy">Facebook</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photos from Donny's own website; details from Donny's site, noonsite and Waterway Guide, to be confirmed with Donny.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px] font-semibold"><Phone className="size-4" aria-hidden /> Call</a>
      <a href="index.html#reserve" className="flex min-h-14 items-center justify-center gap-2 bg-turtle text-[15px] font-semibold text-paper"><MessageCircle className="size-4" aria-hidden /> Reserve a boat</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.85, delay, ease }}>{children}</motion.div>
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[12px] font-bold tracking-[0.16em] uppercase ${light ? "text-flats" : "text-turtle"}`}>{children}</p>
}

export function Photo({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <motion.div className={`photo ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} width={1200} height={900} className="size-full object-cover" />
    </motion.div>
  )
}
