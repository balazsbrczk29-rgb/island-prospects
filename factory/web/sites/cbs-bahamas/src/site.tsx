import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { PHONE, TEL, SHOP, ADDRESS, STORE_EMAIL, ONLINE_EMAIL } from "./data"
import "./styles.css"

const NAV = [
  { href: "departments.html", label: "Departments" },
  { href: "index.html#islands", label: "Family Islands" },
  { href: "index.html#ask", label: "Ask the store" },
  { href: "index.html#visit", label: "Visit" },
]

export const ease = [0.16, 1, 0.3, 1] as const

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
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <rect x="1" y="1" width="38" height="38" rx="3" fill={light ? "#eeefe9" : "#245a41"} />
        <g stroke={light ? "#245a41" : "#eeefe9"} strokeWidth="2.2">{[12, 18, 24, 30].map(y => <path key={y} d={`M9 ${y}h22`} />)}</g>
      </svg>
      <span>
        <span className={`block font-display text-[1.3rem] font-bold tracking-[-0.02em] ${light ? "text-paper" : "text-ink"}`}>CBS Bahamas</span>
        <span className={`mt-1 block text-[11px] tracking-[0.16em] uppercase ${light ? "text-paper/70" : "text-muted"}`}>Carmichael Road · since 1973</span>
      </span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="CBS Bahamas home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-2 text-[15px] text-ink after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-tape after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="text-[15px] text-ink transition hover:text-pine">{PHONE}</a>
          <a href={SHOP} className="group inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-pine px-5 text-[15px] font-medium text-paper transition hover:-translate-y-px hover:bg-pine-deep active:translate-y-0">
            Shop CBS online <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-[4px] border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl font-bold tracking-[-0.02em] text-ink">{n.label}</motion.a>
              ))}
              <a href={SHOP} className="mt-8 rounded-[4px] bg-pine py-4 text-center text-paper">Shop CBS online</a>
              <a href={TEL} className="mt-3 rounded-[4px] border border-ink/20 py-4 text-center text-ink">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-tape" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-pine-deep text-paper pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-paper/75">Commonwealth Building Supplies Ltd. Bahamian owned and operated since 1973.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.18em] text-tape uppercase">Store</p>
          <p className="mt-3 text-paper/85">{ADDRESS}</p>
          <a href={TEL} className="mt-2 block hover:text-tape">{PHONE}</a>
          <p className="mt-2 text-paper/70">Mon to Sat 8 am to 8 pm<br />Sun 9 am to 5 pm</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.18em] text-tape uppercase">Email</p>
          <a href={`mailto:${STORE_EMAIL}`} className="mt-3 block hover:text-tape">{STORE_EMAIL}</a>
          <span className="block text-paper/60">Store and stock questions</span>
          <a href={`mailto:${ONLINE_EMAIL}`} className="mt-3 block hover:text-tape">{ONLINE_EMAIL}</a>
          <span className="block text-paper/60">Online and mailboat orders</span>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.18em] text-tape uppercase">Elsewhere</p>
          <a href={SHOP} className="mt-3 block hover:text-tape">Online store</a>
          <a href="https://www.facebook.com/buildbeautiful/" className="mt-2 block hover:text-tape">Facebook</a>
          <a href="departments.html" className="mt-2 block hover:text-tape">All departments</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/60 md:px-10">Concept by ESTATIQ AI Solutions. Facts from cbsbahamas.com and public listings, to be confirmed with CBS.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px] text-ink"><Phone className="size-4" aria-hidden /> Call the store</a>
      <a href={SHOP} className="flex min-h-14 items-center justify-center gap-2 bg-pine text-[15px] font-medium text-paper">Shop CBS online</a>
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
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`flex items-center gap-3 text-[12px] tracking-[0.18em] uppercase ${light ? "text-tape" : "text-pine"}`}><span className={`h-px w-8 ${light ? "bg-tape" : "bg-pine"}`} aria-hidden />{children}</p>
}
