import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { PHONE, TEL, ADDRESS } from "./data"
import "./styles.css"

const NAV = [
  { href: "services.html", label: "What we make" },
  { href: "index.html#story", label: "Our story" },
  { href: "index.html#design", label: "Design an awning" },
  { href: "index.html#workshop", label: "The workshop" },
]
export const ease = [0.16, 1, 0.3, 1] as const

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

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="block leading-none">
      <span className={`block font-display text-[1.55rem] font-semibold tracking-[-0.02em] ${light ? "text-paper" : "text-ink"}`}>Cover Up</span>
      <span className={`mt-1.5 block text-[11px] tracking-[0.14em] uppercase ${light ? "text-paper/65" : "text-muted"}`}>Island Marine Covering</span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 md:px-10">
        <a href="index.html" aria-label="Cover Up home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-2 text-[15px] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-canvas after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-[2px] bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-canvas active:translate-y-0">
            <Phone className="size-4" aria-hidden /> Call for a measure
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-[2px] border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
              ))}
              <a href={TEL} className="mt-8 rounded-[2px] bg-ink py-4 text-center text-paper">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative h-[1.5px] text-ink/25"><div className="stitch absolute inset-0" /><motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-canvas" aria-hidden /></div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-paper/70">Island Marine Covering Ltd. Awnings, shutters and marine canvas, made in Nassau since 1992.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.16em] text-rope uppercase">Workshop</p>
          <p className="mt-3 text-paper/85">{ADDRESS}, New Providence</p>
          <a href={TEL} className="mt-2 block hover:text-rope">{PHONE}</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.16em] text-rope uppercase">Elsewhere</p>
          <a href="https://www.facebook.com/p/Cover-Up-100064084779650/" className="mt-3 block hover:text-rope">Facebook</a>
          <a href="services.html" className="mt-2 block hover:text-rope">What we make</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photos from Cover Up's own website. Details from public listings, to be confirmed with the owner.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href="index.html#design" className="flex min-h-14 items-center justify-center text-[15px]">Design an awning</a>
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 bg-ink text-[15px] text-paper"><Phone className="size-4" aria-hidden /> Call for a measure</a>
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
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
  )
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[12px] tracking-[0.16em] uppercase ${light ? "text-rope" : "text-canvas"}`}>{children}</p>
}

export function Photo({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <motion.div className={`photo overflow-hidden ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-5% 0px" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} {...(eager ? { fetchPriority: "high" as const } : {})} width={1024} height={768} className="size-full object-cover" />
    </motion.div>
  )
}
