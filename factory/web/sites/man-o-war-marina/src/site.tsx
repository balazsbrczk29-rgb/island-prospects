import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Radio } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 554-9500"
export const TEL = "tel:+12425549500"
export const DINE = "(242) 554-9134"
export const DINE_TEL = "tel:+12425549134"
export const EMAIL = "mowmv@hotmail.com"
export const RATES = "https://www.manowarmarinavillage.com/_files/ugd/0b3c23_d163829ea9184f5f9c0444129b450dbf.pdf"
export const WIX = "https://static.wixstatic.com/media/"
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "marina.html", label: "The marina" },
  { href: "index.html#fit", label: "Will she fit?" },
  { href: "island.html", label: "The island" },
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

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Man-O-War Marina, home">
          <span className="font-display text-[1.5rem] text-ink italic">Man-O-War Marina</span>
          <span className="mt-1 block text-[10.5px] tracking-[0.24em] text-muted uppercase">Man-O-War Cay · Abaco</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-teak after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <span className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.12em] text-muted uppercase"><Radio className="size-4 text-teak" aria-hidden /> VHF 16</span>
          <a href="index.html#request" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-harbour-deep active:translate-y-0">Request a slip</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line"><Phone className="size-5" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
                ))}
                <a href="index.html#request" onClick={() => setOpen(false)} className="mt-8 rounded-full bg-ink py-4 text-center text-paper">Request a slip</a>
                <a href={TEL} className="mt-2 rounded-full border border-ink/20 py-4 text-center">Call {PHONE}</a>
                <p className="mt-6 text-center text-[13px] tracking-[0.14em] text-muted uppercase">Arriving? Hail on VHF 16</p>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-teak" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-paper-2 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl italic">Man-O-War Marina Village</p>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">On the harbour, Man-O-War Cay, Abaco, The Bahamas. Full service since 1976.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Marina office</p>
          <a href={TEL} className="mt-2 block hover:text-teak">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="block hover:text-teak">{EMAIL}</a>
          <p className="mt-2 text-muted">VHF channel 16</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Dock N' Dine</p>
          <a href={DINE_TEL} className="mt-2 block hover:text-teak">{DINE}</a>
          <p className="mt-4 text-[11px] tracking-[0.2em] text-muted uppercase">Follow</p>
          <a href="https://www.instagram.com/manowarmarina/" className="mt-2 block hover:text-teak">Instagram</a>
          <a href="https://www.facebook.com/p/Man-O-War-Marina-Village-100090702221315/" className="block hover:text-teak">Facebook</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Pages</p>
          <a href="index.html" className="mt-2 block hover:text-teak">Home</a>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-teak">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-line px-5 py-6 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Details and photographs from manowarmarinavillage.com, to be confirmed with the marina. Never use this site for navigation.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href="index.html#request" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Request a slip</a>
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
  return (
    <p className={`flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase ${light ? "text-sand" : "text-teak"}`}>
      {n && <span className="font-display text-[15px] tracking-normal italic">{n}</span>}
      {n && <span className={`h-px w-8 ${light ? "bg-sand/50" : "bg-teak/50"}`} aria-hidden />}
      {children}
    </p>
  )
}

export function Photo({ src, alt, className = "", w = 960, h = 640, priority = false }: { src: string; alt: string; className?: string; w?: number; h?: number; priority?: boolean }) {
  return (
    <div className={`group relative overflow-hidden bg-paper-2 ${className}`}>
      <img src={src} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} {...(priority ? { fetchPriority: "high" as const } : {})} className="size-full object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
    </div>
  )
}

export const HOURS = [
  { k: "Marina office and gift shop", spans: [[8, 12], [13, 16]] },
  { k: "Dockside fuel", spans: [[8, 12], [13, 16]] },
  { k: "Roadside fuel", spans: [[9, 12], [14, 16]] },
  { k: "Dock N' Dine, lunch", spans: [[11, 15]] },
] as const
