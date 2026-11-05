import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "242-327-7486"
export const TEL = "tel:+12423277486"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#process", label: "How we build" },
  { href: "capabilities.html", label: "Capabilities" },
  { href: "index.html#brief", label: "Project brief" },
  { href: "index.html#office", label: "Office" },
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

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3 leading-none">
      <svg viewBox="0 0 28 22" className="h-[22px] w-[28px] shrink-0" aria-hidden>
        <g fill={light ? "#efede8" : "#1c1f22"}><rect x="0" y="15" width="13" height="7" /><rect x="15" y="15" width="13" height="7" /><rect x="7" y="7.5" width="13" height="6" /><rect x="0" y="0" width="13" height="6" /><rect x="15" y="0" width="13" height="6" /></g>
        <rect x="22" y="7.5" width="6" height="6" fill="#3d5fb8" />
      </svg>
      <span>
        <span className={`block font-display text-[17px] font-[650] tracking-[-0.01em] [font-stretch:118%] ${light ? "text-paper" : "text-ink"}`}>Jones Construction</span>
        <span className={`mt-1 block font-mono text-[10.5px] tracking-[0.16em] uppercase ${light ? "text-paper/60" : "text-muted"}`}>Company Ltd. · Nassau</span>
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
        <a href="index.html" aria-label="Jones Construction Company, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-2 text-[15px] text-ink after:absolute after:bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-cobalt after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="btn-primary"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-[560] [font-stretch:112%]">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>{n.label}
                </motion.a>
              ))}
              <a href={TEL} className="btn-primary mt-8 justify-center py-4">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-cobalt" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-paper/70">Building contractor and construction consultants. Airport Industrial Park, Nassau, New Providence, The Bahamas.</p>
        </div>
        <div className="text-[15px]">
          <p className="label text-sand">Office</p>
          <a href={TEL} className="mt-3 block font-display text-2xl font-[560] [font-stretch:112%] hover:text-sand">{PHONE}</a>
          <p className="mt-2 text-paper/70">Airport Industrial Park, Nassau</p>
          <p className="text-paper/70">P.O. Box N-3409, Nassau</p>
        </div>
        <div className="text-[15px]">
          <p className="label text-sand">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="group mt-3 flex items-center gap-1.5 hover:text-sand">{n.label}<ArrowUpRight className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden /></a>)}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 border-t border-paper/15 px-5 py-6 font-mono text-[11px] tracking-[0.08em] text-paper/55 md:px-10">
        <span>Concept by ESTATIQ AI Solutions. Details from public listings, to be confirmed with the company.</span>
        <span>Drawings on this page are illustrations, not project records.</span>
      </div>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href="index.html#brief" className="flex min-h-14 items-center justify-center text-[15px]">Project brief</a>
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 bg-ink text-[15px] text-paper"><Phone className="size-4" aria-hidden /> Call the office</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
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

export function Lines({ lines, className = "", delay = 0 }: { lines: string[]; className?: string; delay?: number }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden pb-[0.08em]">
          <motion.span className={`block ${className}`} initial={{ y: "105%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ delay: delay + i * 0.09, duration: 1.1, ease: reveal }}>{l}</motion.span>
        </span>
      ))}
    </>
  )
}

export function Label({ n, children, light = false }: { n: string; children: ReactNode; light?: boolean }) {
  return <p className={`label flex items-center gap-3 ${light ? "text-sand" : "text-cobalt"}`}><span>{n}</span><span className={`h-px w-8 ${light ? "bg-sand/50" : "bg-cobalt/40"}`} />{children}</p>
}
