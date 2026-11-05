import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "+1 242-336-2787"
export const TEL = "tel:+12423362787"
export const EMAIL = "info@hideawayspalmbay.com"
export const BOOK = "https://hotels.cloudbeds.com/reservation/QVagP2"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const U = "https://hideawayspalmbay.com/wp-content/uploads/"
export const IMG = {
  og: U + "2023/11/hillside-2-bedroom-oceanview-img2.jpg",
  cottageOV: U + "2026/05/one-bedroom-ocean-view-cottage-img1.jpg",
  cottageOV2: U + "2026/05/one-bedroom-ocean-view-cottage-img2.jpg",
  gardenView: U + "2026/05/one-bedroom-garden-view-img1.jpg",
  gardenView2: U + "2026/05/one-bedroom-garden-view-img2.jpg",
  cottage2BR: U + "2023/04/cottages-2bedroom-garden-view1.jpg",
  partialOV: U + "2023/05/partial-ocean-view-villas-img1.jpg",
  villa2OV: U + "2026/05/ocean-side-villas-two-bedroom-ocean-view-img.jpg",
  studio: U + "2026/05/island-time-villas-hillside-studio-room-img1.jpg",
  villa1H: U + "2026/05/one-bedroom-villa-hillside-img1.jpg",
  villa2H: U + "2026/05/two-bedroom-villa-hillside-img1.jpg",
  villa2H2: U + "2026/05/two-bedroom-villa-hillside-img2.jpg",
  splash: U + "2026/04/hideways-atmosphere.jpg",
  splashPlay: U + "2026/04/hideways-play.jpg",
  splashEnjoy: U + "2026/04/IMG_9483-scaled.jpeg",
  cocktails: U + "2026/04/hideways-local-tropical-cocktail-favorites.jpg",
  g1: U + "2020/01/gallery1-1280x851.jpg", g2: U + "2020/01/gallery2-1234x821.jpg", g3: U + "2020/01/gallery3-1200x798.jpg",
  g4: U + "2020/01/gallery4-1277x850.jpg", g5: U + "2020/01/gallery5-1280x851.jpg", g6: U + "2020/01/gallery6-1280x851.jpg",
}

const NAV = [
  { href: "stay.html", label: "Rooms & villas" },
  { href: "index.html#specials", label: "Specials" },
  { href: "exuma.html", label: "Exuma & Splash" },
  { href: "index.html#contact", label: "Contact" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Hideaways at Palm Bay, home">
          <span className="font-display text-[1.35rem] tracking-[-0.01em] whitespace-nowrap sm:text-[1.7rem]">Hideaways <em className="text-deep">at Palm Bay</em></span>
          <span className="label mt-1 hidden !text-[10px] text-muted sm:block">George Town · Exuma · Bahamas</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "is-current" : ""}`}>{n.label}</a>)}
          <a href={TEL} className="ulink text-[15px] tabular-nums">{PHONE}</a>
          <a href={BOOK} className="btn btn-primary">Check availability</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2.2rem]">{n.label}</motion.a>)}
                <a href={BOOK} className="btn btn-primary mt-8 justify-center">Check availability</a>
                <a href={TEL} className="mt-4 text-center text-[15px] text-muted">Call {PHONE}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-brand" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none">Hideaways <em>at Palm Bay</em></p>
          <p className="mt-4 max-w-sm text-[15px] text-paper/70">Jolly Hall Bay at Queen's Highway, George Town, Exuma, The Bahamas. On Elizabeth Harbour.</p>
        </div>
        <div className="text-[15px] md:col-span-3">
          <p className="label text-brand">Reservations</p>
          <a href={TEL} className="ulink mt-3 inline-block">{PHONE}</a><br />
          <a href={`mailto:${EMAIL}`} className="ulink mt-1 inline-block">{EMAIL}</a><br />
          <a href={BOOK} className="ulink mt-1 inline-block">Book online</a>
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-brand">Pages</p>
          {[{ href: "index.html", label: "Home" }, ...NAV].map(n => <a key={n.href} href={n.href} className="ulink mt-3 block w-fit">{n.label}</a>)}
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-brand">Follow</p>
          <a href="https://www.instagram.com/hideawayspalmbay/" className="ulink mt-3 block w-fit">Instagram</a>
          <a href="https://www.facebook.com/HideawaysPalmBay/" className="ulink mt-3 block w-fit">Facebook</a>
          <a href="https://www.pinterest.co.uk/hideawaysatpalm/" className="ulink mt-3 block w-fit">Pinterest</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photographs and details from hideawayspalmbay.com, to be confirmed with the resort.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-deep text-[15px] font-medium text-paper">Check availability</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ n, children, className = "" }: { n?: string; children: ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{n && <span className="mr-3 inline-flex size-7 items-center justify-center rounded-full border border-current text-[10px] tabular-nums">{n}</span>}{children}</p>
}

export function Photo({ src, alt, className = "", w = 1280, h = 851, priority = false }: { src: string; alt: string; className?: string; w?: number; h?: number; priority?: boolean }) {
  return (
    <motion.div className={`overflow-hidden ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-5% 0px" }} transition={{ duration: 1.2, ease: reveal }}>
      <img src={src} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className="size-full object-cover transition duration-700 ease-out hover:scale-[1.03]" />
    </motion.div>
  )
}
