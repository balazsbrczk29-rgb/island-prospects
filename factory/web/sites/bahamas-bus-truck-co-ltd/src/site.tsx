import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, Mail, Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 322-1722"
export const TEL = "tel:+12423221722"
export const EMAIL = "info@bahamasbus.com"
export const FB = "https://www.facebook.com/bahamabus/"
export const IG = "https://www.instagram.com/bahamas_bus_and_truck/"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "inventory.html", label: "Lineup" },
  { href: "inventory.html#used", label: "Used" },
  { href: "index.html#departments", label: "Service and parts" },
  { href: "index.html#request", label: "Book a visit" },
  { href: "index.html#visit", label: "Find us" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3 leading-none">
      <span className={`inline-flex h-9 items-center rounded-lg px-2.5 font-display text-[13px] font-semibold tracking-[0.04em] ${light ? "bg-paper text-ink" : "bg-ink text-paper"}`}>BBT</span>
      <span>
        <span className={`block font-display text-[14px] font-medium ${light ? "text-paper" : "text-ink"}`}>Bahamas Bus &amp; Truck</span>
        <span className={`mt-1 block text-[11px] tracking-[0.16em] uppercase ${light ? "text-paper/60" : "text-muted"}`}>Nassau · Since 1944</span>
      </span>
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
        <a href="index.html" aria-label="Bahamas Bus & Truck, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className={`relative py-2 text-[15px] after:absolute after:bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-olive after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href={TEL} className="cta"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-xl border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-2xl">{n.label}</motion.a>)}
              <a href={TEL} className="cta mt-8 justify-center py-4">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-olive" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-20">
        <div><Wordmark light /><p className="mt-6 max-w-sm text-paper/70">#44 Montrose Avenue, Palmdale, Nassau, New Providence. P.O. Box N-1552.</p></div>
        <div className="text-[15px]">
          <p className="label text-lime">Main office</p>
          <a href={TEL} className="mt-3 flex items-center gap-2 hover:text-lime"><Phone className="size-4" aria-hidden />{PHONE} to 1725</a>
          <a href={`mailto:${EMAIL}`} className="mt-2 flex items-center gap-2 hover:text-lime"><Mail className="size-4" aria-hidden />{EMAIL}</a>
          <div className="mt-3 flex gap-4"><a href={FB} className="inline-flex items-center gap-1 hover:text-lime">Facebook <ArrowUpRight className="size-3.5" aria-hidden /></a><a href={IG} className="inline-flex items-center gap-1 hover:text-lime">Instagram <ArrowUpRight className="size-3.5" aria-hidden /></a></div>
        </div>
        <div className="text-[15px]"><p className="label text-lime">Pages</p>{NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-lime">{n.label}</a>)}</div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Vehicle images and details from bahamasbus.com, to be confirmed with the dealership.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href="index.html#request" className="flex min-h-14 items-center justify-center text-[15px]">Book a visit</a>
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 bg-ink text-[15px] text-paper"><Phone className="size-4" aria-hidden />Call the showroom</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
}
export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`label flex items-center gap-3 ${light ? "text-lime" : "text-olive"}`}>{n && <span className="rounded-md border border-current px-1.5 py-0.5">{n}</span>}{children}</p>
}
export function H2({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return <h2 id={id} className={`display mt-5 text-[clamp(2.1rem,4vw,3.8rem)] ${className}`}>{children}</h2>
}
