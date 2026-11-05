import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

import { PHONE, TEL, EMAIL } from "./data"
export { PHONE, TEL, EMAIL }
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "index.html#section", label: "Materials" },
  { href: "index.html#projects", label: "Projects" },
  { href: "capabilities.html", label: "Capabilities" },
  { href: "index.html#offices", label: "Offices" },
  { href: "index.html#quote", label: "Request a quote" },
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

function Header() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 md:px-10">
        <a href="index.html" className="flex items-center gap-3 leading-none" aria-label="BHM, Bahamas Hot Mix, home">
          <span className="grid h-9 place-items-center bg-ink px-2.5 font-display text-[1.05rem] font-bold tracking-[0.06em] text-paper">BHM</span>
          <span className="text-[12px] leading-tight text-muted">Bahamas Hot Mix<br />Infrastructure and materials</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className="relative py-1 text-[15px] text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] hover:after:scale-x-100">{n.label}</a>
          ))}
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-[2px] bg-ink px-5 text-[15px] text-paper transition duration-200 hover:-translate-y-px hover:bg-asphalt active:translate-y-0">
            <Phone className="size-4" aria-hidden /> Call BHM
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-[2px] border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl font-semibold text-ink">{n.label}</motion.a>
              ))}
              <a href={TEL} className="mt-8 rounded-[2px] bg-ink py-4 text-center text-paper">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-amber" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2 pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl font-bold tracking-[0.04em]">BHM Co. Ltd.</p>
          <p className="mt-3 max-w-sm text-muted">Bahamas Hot Mix. Roads, airports, ports, water, buildings, ready mix concrete and hot mix asphalt.</p>
        </div>
        <div className="text-[15px]"><p className="text-[13px] text-muted">Nassau</p><p className="mt-2">Airport Industrial Park</p><p className="text-muted">P.O. Box CB-10990</p></div>
        <div className="text-[15px]"><p className="text-[13px] text-muted">Grand Bahama and Abaco</p><p className="mt-2">Off Freeport Container Port Road</p><p>Airport Roundabout, Ernest Dean Highway</p></div>
        <div className="text-[15px]"><p className="text-[13px] text-muted">All offices</p><a href={TEL} className="mt-2 block hover:text-amber-deep">{PHONE}</a><a href={`mailto:${EMAIL}`} className="block hover:text-amber-deep">{EMAIL}</a></div>
      </div>
      <p className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Content and photographs from bhmgroup.com, to be confirmed with BHM Co. Ltd.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href="index.html#quote" className="flex min-h-14 items-center justify-center text-[15px]">Request a quote</a>
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 bg-ink text-[15px] text-paper"><Phone className="size-4" aria-hidden /> Call BHM</a>
    </nav>
  )
}

export function Page({ children }: { children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:p-3 focus:text-paper">Skip to content</a><Header /><main id="main">{children}</main><Footer /><ActionBar /></>)
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

export function Index({ n, children, light = false }: { n: string; children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-4 text-[13px] tracking-[0.04em] ${light ? "text-paper/70" : "text-muted"}`}>
      <span className={`tabular-nums ${light ? "text-amber" : "text-amber-deep"}`}>{n}</span>
      <span className={`h-px w-10 ${light ? "bg-paper/30" : "bg-ink/25"}`} aria-hidden />
      {children}
    </p>
  )
}
