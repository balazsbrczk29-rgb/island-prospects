import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "242-394-5425"
export const TEL = "tel:+12423945425"
export const PHONE2 = "242-393-7206"
export const TEL2 = "tel:+12423937206"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#services", label: "Services" },
  { href: "services.html", label: "Service detail" },
  { href: "index.html#since-1993", label: "Since 1993" },
  { href: "index.html#proposal", label: "Proposal" },
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
    <a href="index.html" className="flex items-center gap-3 leading-none" aria-label="Maximum Security and Patrol Services, home">
      <span className="flex size-10 items-center justify-center rounded-[3px] bg-ink font-display text-[15px] font-bold tracking-tight text-paper">MS</span>
      <span>
        <span className="block font-display text-[1.05rem] font-bold tracking-[-0.01em] text-ink">Maximum Security</span>
        <span className="label mt-1 block !text-[10px] text-muted">&amp; Patrol Services · Nassau</span>
      </span>
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
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-ink px-5 text-[15px] font-medium text-paper transition duration-200 hover:-translate-y-px hover:bg-olive-deep active:translate-y-0"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-[3px] border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-[3px] border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[1.9rem] font-semibold tracking-tight">{n.label}</motion.a>)}
                <a href={TEL} className="mt-8 rounded-[3px] bg-ink py-4 text-center text-paper">Call {PHONE}</a>
                <a href={TEL2} className="mt-3 rounded-[3px] border border-ink/25 py-4 text-center">Call {PHONE2}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-olive" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <p className="font-display text-[1.7rem] font-bold tracking-tight">Maximum Security &amp; Patrol Services Ltd.</p>
          <p className="mt-4 max-w-sm text-paper/70">Carib House, #15 Carib Road, P.O. Box N-9425, Nassau, New Providence, The Bahamas. Founded 1993.</p>
        </div>
        <div className="text-[15px]">
          <p className="label text-olive-light">Office</p>
          <a href={TEL} className="ulink mt-3 inline-block">Tel {PHONE}</a><br />
          <a href={TEL2} className="ulink mt-2 inline-block">Tel {PHONE2}</a>
          <p className="mt-2 text-paper/60">Fax 242-394-5428</p>
        </div>
        <div className="text-[15px]">
          <p className="label text-olive-light">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Details from public directory listings, to be confirmed with the company.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href="index.html#proposal" className="flex min-h-14 items-center justify-center text-[15px] font-medium">Proposal</a>
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
      <p className={`label flex items-center gap-3 ${dark ? "text-olive-light" : "text-olive"}`}><span className="tabular-nums">{index}</span><span className={`h-px w-10 ${dark ? "bg-olive-light/50" : "bg-olive/40"}`} aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.98] font-bold tracking-[-0.035em]">{title}</h2>
      {children}
    </Reveal>
  )
}
