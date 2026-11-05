import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const SITE = "https://www.grandbahamavacations.com"
export const A = `${SITE}/assets/`
export const DEALS = `${SITE}/hot-deals/`
export const GUIDE = `${SITE}/our-guide/`
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#favourites", label: "Things to do" },
  { href: "getting-here.html", label: "Getting here" },
  { href: "index.html#planner", label: "Plan your trip" },
  { href: DEALS, label: "Deals" },
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Grand Bahama Island, home">
          <span className="font-display text-[1.5rem] italic">Grand Bahama</span>
          <span className="label mt-1 block !text-[10px] text-muted">Island Promotion Board</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "!bg-[length:100%_1px]" : ""}`}>{n.label}</a>)}
          <a href="index.html#planner" className="inline-flex min-h-11 items-center rounded-full bg-gulf px-5 text-[15px] text-paper transition duration-200 hover:-translate-y-px hover:bg-gulf-deep active:translate-y-0">Plan your trip</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2rem]">{n.label}</motion.a>)}
              <a href={GUIDE} className="mt-8 rounded-full bg-gulf py-4 text-center text-paper">Download the destination guide</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gulf" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <p className="font-display text-[2.2rem] italic">Grand Bahama Island</p>
          <p className="mt-3 max-w-sm text-paper/70">Grand Bahama Island Promotion Board. Fidelity Financial Center, Freeport, Grand Bahama, The Bahamas.</p>
        </div>
        <div className="text-[15px]"><p className="label text-flamingo">Plan</p>{NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}</div>
        <div className="text-[15px]"><p className="label text-flamingo">From the Board</p><a className="ulink mt-2 block w-fit" href={GUIDE}>Destination guide</a><a className="ulink mt-2 block w-fit" href={`${SITE}/newsletter/`}>Join the e-club</a><a className="ulink mt-2 block w-fit" href={`${SITE}/things-to-do/festivals-and-events/`}>Festivals and events</a></div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photos from grandbahamavacations.com. Maps are illustrations, not to scale.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href="getting-here.html" className="flex min-h-14 items-center justify-center text-[15px]">Getting here</a>
      <a href="index.html#planner" className="flex min-h-14 items-center justify-center bg-gulf text-[15px] text-paper">Plan your trip</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
}

export function Head({ index, label, title, id, children, dark = false }: { index: string; label: string; title: ReactNode; id: string; children?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <p className={`label flex items-center gap-3 ${dark ? "text-flamingo" : "text-gulf"}`}><span>{index}</span><span className={`h-px w-10 ${dark ? "bg-flamingo/50" : "bg-gulf/40"}`} aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4.6rem)] leading-[1] font-medium tracking-[-0.02em]">{title}</h2>
      {children}
    </Reveal>
  )
}
