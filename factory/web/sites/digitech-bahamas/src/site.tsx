import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Mail } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 676-2033"
export const TEL = "tel:+12426762033"
export const PHONE2 = "(242) 676-3022"
export const TEL2 = "tel:+12426763022"
export const EMAIL = "sales@digitechbahamas.com"
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "index.html#network", label: "Network planner" },
  { href: "services.html", label: "Services" },
  { href: "index.html#pos", label: "Point of sale" },
  { href: "index.html#start", label: "Get a quote" },
]

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

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-9 place-items-center rounded-lg bg-ink" aria-hidden>
        <span className="absolute size-1.5 rounded-full bg-signal" style={{ left: 8, top: 8 }} /><span className="absolute size-1.5 rounded-full bg-paper" style={{ right: 8, top: 14 }} /><span className="absolute size-1.5 rounded-full bg-paper" style={{ left: 14, bottom: 8 }} />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">Digitech Bahamas</span>
        <span className="mt-1 block text-[12px] text-muted">IT, networks and POS, Nassau</span>
      </span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="Digitech Bahamas, home"><Mark /></a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-1 text-[15px] text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-signal after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] text-paper transition duration-200 hover:-translate-y-px hover:bg-signal active:translate-y-0">
            <Phone className="size-4" aria-hidden /> {PHONE}
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl font-semibold tracking-tight text-ink">{n.label}</motion.a>
              ))}
              <a href={TEL} className="mt-8 rounded-full bg-ink py-4 text-center text-paper">Call {PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="mt-3 rounded-full border border-line py-4 text-center text-ink">{EMAIL}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-signal" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-28 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1] tracking-[-0.03em]">We focus on technology, so you can focus on your business.</p>
          <p className="mt-5 max-w-sm text-paper/65">Digitech Bahamas Ltd. #33 East Avenue, Centreville, Nassau.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[13px] text-signal">Call</p>
          <a href={TEL} className="mt-2 block hover:text-signal">{PHONE}</a>
          <a href={TEL2} className="block hover:text-signal">{PHONE2}</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[13px] text-signal">Email</p>
          <a href={`mailto:${EMAIL}`} className="mt-2 block hover:text-signal">{EMAIL}</a>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block text-paper/65 hover:text-paper">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1400px] border-t border-paper/10 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Details from digitechbahamas.com, to be confirmed with Digitech Bahamas Ltd. Razor POS is a product of its maker.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-1.5 border-l border-line text-[15px]"><Mail className="size-4" aria-hidden /> Email</a>
      <a href="index.html#start" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Get a quote</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-ink focus:p-3 focus:text-paper">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ n, children, light = false }: { n: string; children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] ${light ? "text-paper/70" : "text-muted"}`}>
      <span className={`font-display font-semibold ${light ? "text-signal" : "text-signal-deep"}`}>{n}</span>
      <span className={`h-px w-8 ${light ? "bg-paper/30" : "bg-line"}`} aria-hidden />
      {children}
    </p>
  )
}

export function Lines({ lines, className = "", delay = 0.15 }: { lines: string[]; className?: string; delay?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span className={`block ${className}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: delay + i * 0.09, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{line}</motion.span>
        </span>
      ))}
    </>
  )
}
