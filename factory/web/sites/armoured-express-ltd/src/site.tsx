import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "242-323-4430"
export const TEL = "tel:+12423234430"
export const PHONE2 = "242-328-6841"
export const TEL2 = "tel:+12423286841"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#custody", label: "Chain of custody" },
  { href: "services.html", label: "Services" },
  { href: "index.html#since-1961", label: "Since 1961" },
  { href: "index.html#planner", label: "Request service" },
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

function Wordmark() {
  return (
    <a href="index.html" className="leading-none" aria-label="Armoured Express (Bahamas) Ltd., home">
      <span className="block text-[1.15rem] font-extrabold tracking-[-0.02em] text-ink uppercase">Armoured Express</span>
      <span className="mt-1.5 flex items-center gap-2"><span className="h-[3px] w-6 bg-brass-light" aria-hidden /><span className="label !text-[10px] text-muted">(Bahamas) Ltd · Est. 1961</span></span>
    </a>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "!bg-[length:100%_1px]" : ""}`}>{n.label}</a>)}
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-none bg-ink px-5 text-[15px] font-medium text-paper transition duration-200 hover:-translate-y-px hover:bg-steel active:translate-y-0"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-none border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-none border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 text-[1.9rem] font-bold tracking-tight">{n.label}</motion.a>)}
                <a href={TEL} className="mt-8 rounded-none bg-ink py-4 text-center text-paper">Call {PHONE}</a>
                <a href={TEL2} className="mt-3 rounded-none border border-ink/25 py-4 text-center">Call {PHONE2}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-brass" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <p className="text-[1.7rem] font-extrabold tracking-tight">Armoured Express (Bahamas) Ltd.</p>
          <p className="mt-4 max-w-sm text-paper/70">Stapledon Gardens, P.O. Box N-4499, Nassau, New Providence. Serving Nassau and Grand Bahama since 1961. Sister company: Security Services (Bah.) Ltd.</p>
        </div>
        <div className="text-[15px]">
          <p className="label text-brass-light">Office</p>
          <a href={TEL} className="ulink mt-3 inline-block">Tel {PHONE}</a><br />
          <a href={TEL2} className="ulink mt-2 inline-block">Tel {PHONE2}</a>
          <p className="mt-2 text-paper/60">Office Mon to Fri, 9:00 to 5:00</p>
        </div>
        <div className="text-[15px]">
          <p className="label text-brass-light">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Details from the company's public listing, to be confirmed with the company.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href="index.html#planner" className="flex min-h-14 items-center justify-center text-[15px] font-medium">Request service</a>
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 bg-ink text-[15px] font-medium text-paper"><Phone className="size-4" aria-hidden /> Call {PHONE}</a>
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
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>
  )
}

export function Head({ index, label, title, id, children, dark = false }: { index: string; label: string; title: ReactNode; id: string; children?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <p className={`label flex items-center gap-3 ${dark ? "text-brass-light" : "text-brass"}`}><span className="tabular-nums">{index}</span><span className={`h-px w-10 ${dark ? "bg-brass-light/50" : "bg-brass/40"}`} aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">{title}</h2>
      {children}
    </Reveal>
  )
}
