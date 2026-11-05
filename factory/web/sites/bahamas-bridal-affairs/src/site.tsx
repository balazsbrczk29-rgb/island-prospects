import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { PHONE, TEL, PHONE_US, TEL_US } from "./data"
import "./styles.css"

const NAV = [
  { href: "index.html#planner", label: "Your planner" },
  { href: "weddings.html", label: "Published weddings" },
  { href: "index.html#questions", label: "Questions" },
  { href: "index.html#call", label: "Contact" },
]
export const ease = [0.16, 1, 0.3, 1] as const

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="block leading-none">
      <span className={`block font-display text-[1.5rem] italic ${light ? "text-paper" : "text-ink"}`}>Bahamas Bridal Affairs</span>
      <span className={`mt-1.5 block text-[10.5px] tracking-[0.3em] uppercase ${light ? "text-paper/60" : "text-muted"}`}>Nassau · Paradise Island</span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 md:px-10">
        <a href="index.html" aria-label="Bahamas Bridal Affairs home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-2 text-[14.5px] tracking-[0.01em] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-sea after:transition-transform after:duration-700 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href="index.html#date" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-[14.5px] text-paper transition hover:-translate-y-px hover:bg-sea">Check your wedding date</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2.2rem]">{n.label}</motion.a>
              ))}
              <a href={TEL} className="mt-8 rounded-full bg-ink py-4 text-center text-paper">Call Nassau {PHONE}</a>
              <a href={TEL_US} className="mt-3 rounded-full border border-ink py-4 text-center">Call from the US {PHONE_US}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-sea" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-[15px] text-paper/65">Destination weddings in Nassau and Paradise Island, planned personally by Dr. Bernadette Burrows.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.24em] text-glass uppercase">Nassau</p>
          <p className="mt-3 text-paper/85">Fire Trail Road West, Nassau<br />P.O. Box CB-13320</p>
          <a href={TEL} className="mt-2 block hover:text-glass">{PHONE}</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.24em] text-glass uppercase">From the US</p>
          <a href={TEL_US} className="mt-3 block hover:text-glass">{PHONE_US}</a>
          <a href="weddings.html" className="mt-2 block hover:text-glass">Published weddings</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/50 md:px-10">Concept by ESTATIQ AI Solutions. Details from public listings and published features, to be confirmed with Bahamas Bridal Affairs.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center text-[15px]">Call Nassau</a>
      <a href="index.html#date" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Check your date</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.1, delay, ease }}>{children}</motion.div>
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[11.5px] tracking-[0.22em] uppercase ${light ? "text-champagne" : "text-sea"}`}>{children}</p>
}
