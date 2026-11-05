import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// Contacts from directory listings (Yabsta, Bahamas Index). No email or WhatsApp found, so the site converts by phone.
export const C = {
  phone: "(242) 325-3335", tel: "tel:+12423253335",
  us: "(954) 237-1017", usTel: "tel:+19542371017",
  address: "#10 Jem's Plaza, Pitt Road, Nassau", box: "P.O. Box CB-13083",
}
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "index.html#protect", label: "What we protect" },
  { href: "security-plan.html", label: "Plan your system" },
  { href: "index.html#find", label: "Find us" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Shield({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 64 64" className={className} aria-hidden><path d="M32 6l20 8v15c0 14-9 23-20 28C21 52 12 43 12 29V14z" fill="none" stroke="currentColor" strokeWidth="3" /><circle cx="32" cy="30" r="5" fill="currentColor" /></svg>
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="flex items-center gap-3" aria-label="Pro Tech Security, home">
          <Shield className="size-9 text-signal" />
          <span className="leading-tight"><span className="block font-display text-[1.1rem] font-semibold tracking-tight">Pro Tech Security</span><span className="block text-[12px] text-muted">Security &amp; alarm service · Nassau</span></span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-signal after:transition-transform after:duration-300 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href={C.tel} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-signal"><Phone className="size-4" aria-hidden /> {C.phone}</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-md border border-line md:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.45, ease }} className="border-b border-line py-4 font-display text-2xl font-semibold">{n.label}</motion.a>)}
              <a href={C.tel} className="mt-8 rounded-md bg-ink py-4 text-center text-paper">Call {C.phone}</a>
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
    <footer className="bg-night text-paper">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 md:grid-cols-3 md:px-10">
        <div className="flex gap-3"><Shield className="size-10 shrink-0 text-signal-bright" /><div><p className="font-display text-lg font-semibold">Pro Tech Security Service Limited</p><p className="mt-2 text-[15px] text-paper/65">Security and alarm systems, Nassau, New Providence.</p></div></div>
        <div className="text-[15px]"><p className="text-[12px] font-semibold tracking-[0.16em] text-signal-bright uppercase">Call</p><a href={C.tel} className="mt-3 block font-display text-2xl hover:text-signal-bright">{C.phone}</a><a href={C.usTel} className="mt-1 block text-paper/70 hover:text-paper">From the US {C.us}</a></div>
        <div className="text-[15px]"><p className="text-[12px] font-semibold tracking-[0.16em] text-signal-bright uppercase">Office</p><p className="mt-3">{C.address}</p><p className="text-paper/60">{C.box}</p></div>
      </div>
      <p className="mx-auto max-w-[1360px] border-t border-paper/10 px-5 py-6 text-[12px] text-paper/50 md:px-10">Concept by ESTATIQ AI Solutions. Details from public directory listings, to be confirmed with Pro Tech Security.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href="security-plan.html" className="flex min-h-16 items-center justify-center text-[15px]">Plan your system</a>
      <a href={C.tel} className="flex min-h-16 items-center justify-center gap-2 bg-ink text-[15px] text-paper"><Phone className="size-4" aria-hidden /> Call {C.phone}</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.85, delay, ease }}>{children}</motion.div>
}
export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`font-display text-[12px] font-semibold tracking-[0.18em] uppercase ${light ? "text-signal-bright" : "text-signal"}`}>{n && <span className="mr-3">{n}</span>}{children}</p>
}
