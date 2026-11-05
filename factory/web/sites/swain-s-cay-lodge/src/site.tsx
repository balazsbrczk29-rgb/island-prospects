import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Mail } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

const U = "https://www.swainscaylodge.com/wp-content/uploads/2026/09/"
export const IMG = {
  hero: U + "swainscaylodge-header.jpg", h1: U + "header1.jpg", h2: U + "header2.jpg", h3: U + "header3.jpg",
  welcome: U + "welcome-landscape.jpg", fishing: U + "bahamas-fishing.jpg", dining: U + "dinig1.jpg",
  duplex: U + "live-duplex-1024x540.jpg", ovr: U + "live-ovr-1024x540.jpg", ovs: U + "live-ovs-1024x540.jpg", bfs: U + "live-bfs-1024x540.jpg",
  fg1: U + "fishing-gallery1-1024x597.jpg", fg2: U + "fishing-gallery2-1024x590.jpg", fg3: U + "fishing-gallery3-1024x590.jpg", fg4: U + "fishing-gallery4-1024x700.jpg", fg5: U + "fishing-gallery5-1024x700.jpg",
  bone: U + "bonefishing-on-andros-island.png", deep: U + "deep-sea-fishing.png", reef: U + "reef-fishing.png", spear: U + "spear-fishing.png",
}
export const PHONE = "+1 (242) 422-5018"
export const TEL = "tel:+12424225018"
export const PHONE2 = "+1 (242) 369-0296"
export const TEL2 = "tel:+12423690296"
export const EMAIL = "fish@swainscaylodge.com"
export const BOOK = "https://www.swainscaylodge.com/#booking"
export const GUIDE_PDF = "https://swainscaylodge.com/wp-content/uploads/2024/06/Fishing-Package-Prices-2024-2025.pdf"

const NAV = [
  { href: "fishing.html", label: "The fishing" },
  { href: "index.html#waters", label: "Where you'll fish" },
  { href: "lodge.html", label: "The lodge" },
  { href: "lodge.html#getting-here", label: "Getting here" },
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

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Swain's Cay Lodge, home">
          <span className="font-display text-[1.55rem] font-medium">Swain's Cay Lodge</span>
          <span className="mt-0.5 block text-[14px] text-muted italic">Mangrove Cay, Andros</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className={`ulink text-[17px] ${current === n.label ? "is-on" : ""}`}>{n.label}</a>)}
          <a href="index.html#plan" className="cta cta-fill">Plan my fishing week</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>)}
              <a href="index.html#plan" onClick={() => setOpen(false)} className="cta cta-fill mt-8">Plan my fishing week</a>
              <a href={TEL} className="mt-4 text-center text-muted">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-tannin" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper pb-28 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl">Swain's Cay Lodge</p>
          <p className="mt-3 max-w-sm text-paper/70">Mangrove Cay Settlement, Mangrove Cay, Andros, The Bahamas.</p>
        </div>
        <div>
          <p className="eyebrow !text-flat">Reservations and fishing</p>
          <a href={TEL} className="mt-3 block hover:text-flat">{PHONE}</a>
          <a href={TEL2} className="block hover:text-flat">{PHONE2}</a>
          <a href={`mailto:${EMAIL}`} className="ulink mt-1 inline-block">{EMAIL}</a>
        </div>
        <div>
          <p className="eyebrow !text-flat">Elsewhere</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-1.5 block hover:text-flat">{n.label}</a>)}
          <a href="https://www.facebook.com/swainscaylodge/" className="mt-1.5 block hover:text-flat">Facebook</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-[13px] text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Details and photos from swainscaylodge.com (photography courtesy of Lauren Brown Photography and Ian Davis at Yellow Dog Fly Fishing), to be confirmed with the lodge.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.6fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-1.5"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-1.5 border-l border-line"><Mail className="size-4" aria-hidden /> Email</a>
      <a href="index.html#plan" className="flex min-h-14 items-center justify-center bg-tannin font-medium text-white">Plan my week</a>
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
export function H({ n, k, id, children, intro, dark = false }: { n: string; k: string; id: string; children: ReactNode; intro?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <p className={`eyebrow ${dark ? "!text-flat" : ""}`}>{n}. {k}</p>
      <h2 id={id} className="mt-3 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.015em]">{children}</h2>
      {intro && <div className={`mt-6 max-w-md text-[19px] leading-relaxed ${dark ? "text-paper/75" : "text-muted"}`}>{intro}</div>}
    </Reveal>
  )
}
export function Pic({ src, alt, className = "", w = 1024, h = 640 }: { src: string; alt: string; className?: string; w?: number; h?: number }) {
  return (
    <motion.div className={`overflow-hidden bg-paper-2 ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1.2, ease: reveal }}>
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="size-full object-cover" />
    </motion.div>
  )
}
