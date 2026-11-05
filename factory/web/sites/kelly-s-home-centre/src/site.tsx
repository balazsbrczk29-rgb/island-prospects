import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { SHOP } from "./data"
import "./styles.css"

export const PHONE = "(242) 393-4002"
export const TEL = "tel:+12423934002"
export const EMAIL = "mail@kellysbahamas.com"
export const ease = [0.16, 1, 0.3, 1] as const
const NAV = [
  { href: "departments.html", label: "Departments" },
  { href: "index.html#moments", label: "Registry and projects" },
  { href: "index.html#islands", label: "Family Island orders" },
  { href: "index.html#visit", label: "Visit" },
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
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Kelly's House & Home, home">
          <span className="font-display text-[1.6rem] tracking-[-0.02em] text-ink">Kelly's</span>
          <span className="ml-2 align-middle text-[11px] tracking-[0.18em] text-muted uppercase">House &amp; Home · Since 1927</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className={`relative py-1 text-[15px] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded after:bg-bloom after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href={SHOP} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-bloom active:translate-y-0"><ShoppingBag className="size-4" aria-hidden /> Shop online</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line xl:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>)}
              <a href={SHOP} className="mt-8 rounded-full bg-ink py-4 text-center text-paper">Shop online</a>
              <a href={TEL} className="mt-3 rounded-full border border-ink py-4 text-center">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-bloom" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper pb-24 xl:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div><p className="font-display text-4xl tracking-[-0.02em]">Kelly's House &amp; Home</p><p className="mt-3 max-w-sm text-paper/65">Kelly's Home Centre Limited. A household name in The Bahamas since 1927.</p></div>
        <div className="text-[15px]"><p className="text-[12px] tracking-[0.16em] text-sea uppercase">Store</p><p className="mt-3">The Mall at Marathon, Robinson Road<br />P.O. Box N-865, Nassau</p></div>
        <div className="text-[15px]"><p className="text-[12px] tracking-[0.16em] text-sea uppercase">Contact</p><a href={TEL} className="mt-3 block hover:text-sea">Tel {PHONE}</a><p className="text-paper/65">Fax (242) 393-4096</p><a href={`mailto:${EMAIL}`} className="block hover:text-sea">{EMAIL}</a></div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Details and photographs from kellysbahamas.com, to be confirmed by Kelly's.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur xl:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href="index.html#islands" className="flex min-h-14 items-center justify-center border-l border-line text-[15px]">Islands</a>
      <a href={SHOP} className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Shop online</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:p-3 focus:text-paper">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.85, delay, ease }}>{children}</motion.div>
}
export function Eyebrow({ n, children, light = false }: { n: string; children: ReactNode; light?: boolean }) {
  return <p className={`flex items-baseline gap-3 text-[13px] tracking-[0.14em] uppercase ${light ? "text-sea" : "text-bloom"}`}><span className="font-display text-[22px] tracking-normal normal-case">{n}</span>{children}</p>
}
