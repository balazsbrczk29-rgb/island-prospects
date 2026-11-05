import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 698-6744"
export const TEL = "tel:+12426986744"
export const EMAIL = "info@oceanwestbahamas.com"
export const BOOK = "https://oceanwestbahamas.client.innroad.com/"
export const SITE = "https://oceanwestbahamas.com/"
export const ease = [0.16, 1, 0.3, 1] as const

export type Room = { name: string; bed: string; view: string; floor: 1 | 2 | 3; balcony: boolean; img: string; gem: string }
export const ROOMS: Room[] = [
  { name: "Diamond", bed: "1 King", view: "Ocean view", floor: 3, balcony: true, img: SITE + "gallery/ndiam.jpg", gem: "#e8eef0" },
  { name: "Ruby", bed: "1 Queen", view: "Lake and partial ocean view", floor: 3, balcony: false, img: SITE + "gallery/nruby.jpg", gem: "#a3324a" },
  { name: "Sapphire", bed: "1 King", view: "Lake and partial ocean view", floor: 2, balcony: false, img: SITE + "gallery/n-sapph.jpg", gem: "#24467e" },
  { name: "Topaz", bed: "2 Single", view: "Ocean and pool view", floor: 2, balcony: true, img: SITE + "gallery/13.jpg", gem: "#d9a441" },
  { name: "Emerald", bed: "1 Queen", view: "Ocean and pool view", floor: 2, balcony: true, img: SITE + "gallery/12.jpg", gem: "#2f7a55" },
  { name: "Tanzanite", bed: "1 King", view: "Garden view", floor: 1, balcony: false, img: SITE + "gallery/ntanz.jpg", gem: "#4b4f8c" },
  { name: "Onyx", bed: "1 Queen", view: "Ocean and pool view", floor: 1, balcony: false, img: SITE + "gallery/n-onyx.jpg", gem: "#24262b" },
  { name: "Ivory", bed: "1 Double", view: "Ocean and pool view", floor: 1, balcony: false, img: SITE + "gallery/nivory.jpg", gem: "#efe6d2" },
  { name: "Pearl", bed: "2 Single", view: "Ocean and pool view", floor: 1, balcony: false, img: SITE + "gallery/npearl.jpg", gem: "#e6e1dc" },
  { name: "Coral", bed: "1 Double", view: "Ocean and pool view", floor: 1, balcony: false, img: SITE + "gallery/ncoral.jpg", gem: "#e49a86" },
]
export const floorName = (f: number) => (f === 1 ? "1st floor" : f === 2 ? "2nd floor" : "3rd floor")

const NAV = [
  { href: "rooms.html", label: "The ten rooms" },
  { href: "stay.html", label: "Your stay" },
  { href: "stay.html#getting-here", label: "Getting here" },
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

export function Wordmark() {
  return (
    <span className="leading-none">
      <span className="font-display text-[1.4rem] tracking-[0.06em] uppercase">Ocean West</span>
      <span className="mt-1 block text-[10px] tracking-[0.32em] text-muted uppercase">Boutique Hotel · Nassau</span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="Ocean West Boutique Hotel, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-lake after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="text-[15px] hover:text-lake">{PHONE}</a>
          <a href={BOOK} className="inline-flex min-h-11 items-center bg-lake-deep px-6 text-[14px] tracking-[0.12em] text-paper uppercase transition hover:-translate-y-px hover:bg-ink active:translate-y-0">Check dates</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center border border-line"><Phone className="size-5" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
                ))}
                <a href={BOOK} className="mt-8 bg-lake-deep py-4 text-center tracking-[0.12em] text-paper uppercase">Check dates</a>
                <a href={TEL} className="mt-2 border border-ink/20 py-4 text-center">Call {PHONE}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-lake" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-paper-2 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">West Bay Street, western New Providence, Nassau, The Bahamas. Five minutes from Lynden Pindling International Airport.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Front desk, 24 hours</p>
          <a href={TEL} className="mt-2 block hover:text-lake">{PHONE}</a>
          <a href="tel:+12426986745" className="block hover:text-lake">(242) 698-6745</a>
          <p className="text-muted">Fax (242) 698-0805</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Reservations</p>
          <a href={`mailto:${EMAIL}`} className="mt-2 block break-all hover:text-lake">{EMAIL}</a>
          <a href={BOOK} className="mt-1 block hover:text-lake">Book online</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Pages</p>
          <a href="index.html" className="mt-2 block hover:text-lake">Home</a>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-lake">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-line px-5 py-6 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Details and photographs from oceanwestbahamas.com, to be confirmed with the hotel.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-lake-deep text-[14px] tracking-[0.12em] text-paper uppercase">Check dates</a>
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
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`text-[11px] tracking-[0.28em] uppercase ${light ? "text-blush" : "text-lake"}`}>{n && <span className="mr-3">{n}</span>}{children}</p>
}

export function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`group relative overflow-hidden bg-paper-2 ${className}`}>
      <img src={src} alt={alt} width={900} height={600} loading={priority ? "eager" : "lazy"} {...(priority ? { fetchPriority: "high" as const } : {})} className="size-full object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
    </div>
  )
}
