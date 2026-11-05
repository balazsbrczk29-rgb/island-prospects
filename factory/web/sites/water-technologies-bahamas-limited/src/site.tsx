import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "242-326-1202"
export const TEL = "tel:+12423261202"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const
const NAV = [
  { href: "index.html#how", label: "How it works" },
  { href: "machines.html", label: "Machines" },
  { href: "index.html#demo", label: "Demonstration" },
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

function Mark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 leading-none">
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden><circle cx="12" cy="12" r="12" fill={light ? "#bfe6ef" : "#0d2230"} /><path d="M12 5c2.6 3.8 4.4 6.4 4.4 8.6a4.4 4.4 0 0 1-8.8 0C7.6 11.4 9.4 8.8 12 5z" fill={light ? "#0d2230" : "#bfe6ef"} /></svg>
      <span><span className={`block font-display text-[15px] font-medium tracking-[-0.02em] ${light ? "text-white" : "text-ink"}`}>Water Technologies</span><span className={`mt-0.5 block text-[10.5px] tracking-[0.2em] uppercase ${light ? "text-white/60" : "text-muted"}`}>Bahamas · Nassau</span></span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="Water Technologies Bahamas, home"><Mark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className={`relative py-2 text-[15px] after:absolute after:bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-deep after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href={TEL} className="btn"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full bg-white lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl font-light">{n.label}</motion.a>)}
              <a href={TEL} className="btn mt-8 justify-center py-4">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-deep" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-white lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-20">
        <div><Mark light /><p className="mt-6 max-w-sm text-white/70">Air2Water drinking water machines for homes and offices. Fairwind Street, Hawkins Hill, Nassau.</p></div>
        <div className="text-[15px]"><p className="label text-mist">Office</p><a href={TEL} className="mt-3 block font-display text-2xl font-light hover:text-mist">{PHONE}</a><p className="mt-1 text-white/70">Fax 242-325-4202</p><p className="text-white/70">P.O. Box N-3723, Nassau</p></div>
        <div className="text-[15px]"><p className="label text-mist">Pages</p>{NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-mist">{n.label}</a>)}</div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-white/15 px-5 py-6 text-xs text-white/55 md:px-10">Concept by ESTATIQ AI Solutions. Details from public listings, to be confirmed with the company. Diagrams are illustrations.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href="index.html#demo" className="flex min-h-14 items-center justify-center text-[15px]">Demonstration</a>
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 bg-deep text-[15px] text-white"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
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
  return <p className={`label ${light ? "text-mist" : "text-deep"}`}>{n && <span className="mr-3 tabular-nums">{n} /</span>}{children}</p>
}
