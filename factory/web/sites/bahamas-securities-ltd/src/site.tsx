import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "242-325-6591"
export const TEL = "tel:+12423256591"
export const REGISTER = "https://scb.gov.bs/wp-content/uploads/2026/10/SIA-Firms-as-at-30-September-2026-1.pdf"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#advice", label: "Advice" },
  { href: "regulation.html", label: "Registration" },
  { href: "index.html#consultation", label: "Consultation" },
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-4 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Bahamas Securities, home">
          <span className="font-display text-[1.55rem] tracking-[-0.01em]">Bahamas Securities</span>
          <span className="label mt-1 block !text-[10px] text-muted">(1987) Limited · Nassau</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "!bg-[length:100%_1px]" : ""}`}>{n.label}</a>)}
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 border border-green px-5 text-[15px] text-green transition duration-200 hover:-translate-y-px hover:bg-green hover:text-paper"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2.1rem]">{n.label}</motion.a>)}
                <a href={TEL} className="mt-8 bg-green py-4 text-center text-paper">Call {PHONE}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-green" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 md:grid-cols-[1.6fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-[1.8rem]">Bahamas Securities (1987) Limited</p>
          <p className="mt-3 max-w-sm text-muted">Gresham House, Charlotte Street South, P.O. Box N-10144, Nassau, New Providence, The Bahamas.</p>
        </div>
        <div className="text-[15px]"><p className="label text-green">Telephone</p><a href={TEL} className="ulink mt-3 inline-block">{PHONE}</a></div>
        <div className="text-[15px]"><p className="label text-green">Pages</p>{NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}</div>
      </div>
      <div className="mx-auto max-w-[1320px] border-t border-line px-5 py-6 text-xs leading-relaxed text-muted md:px-10">
        <p>Registered with the Securities Commission of The Bahamas under the Securities Industry Act, 2024, for advising on capital market instruments. Investments can fall as well as rise.</p>
        <p className="mt-2">Concept by ESTATIQ AI Solutions.</p>
      </div>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href="regulation.html" className="flex min-h-14 items-center justify-center text-[15px]">Registration</a>
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 bg-green text-[15px] text-paper"><Phone className="size-4" aria-hidden />Arrange a consultation</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
}

export function Head({ index, label, title, id, children }: { index: string; label: string; title: ReactNode; id: string; children?: ReactNode }) {
  return (
    <Reveal>
      <p className="label flex items-center gap-3 text-green"><span>{index}</span><span className="h-px w-10 bg-green/40" aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] font-light tracking-[-0.015em]">{title}</h2>
      {children}
    </Reveal>
  )
}
