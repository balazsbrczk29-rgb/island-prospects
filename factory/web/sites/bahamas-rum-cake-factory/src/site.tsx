import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { STORE } from "./data"
import "./styles.css"

export const PHONE = "(242) 328-3750"
export const TEL = "tel:+12423283750"
export const ease = [0.16, 1, 0.3, 1] as const
const NAV = [
  { href: "flavours.html", label: "Flavours" },
  { href: "index.html#six", label: "Build a six pack" },
  { href: "index.html#story", label: "Our story" },
  { href: "index.html#visit", label: "Visit the shop" },
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
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Bahamas Rum Cake Factory, home">
          <span className="block font-display text-[1.45rem] text-rum">Bahamas Rum Cake Factory</span>
          <span className="mt-1 block text-[11px] tracking-[0.2em] text-muted uppercase">Downtown Nassau · Since 2000</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className={`relative py-1 text-[15px] text-rum after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-gold after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href={STORE} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-rum px-5 text-[15px] text-cream transition hover:-translate-y-px hover:bg-gold active:translate-y-0"><ShoppingBag className="size-4" aria-hidden /> Order a rum cake</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-cream sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl text-rum">{n.label}</motion.a>)}
              <a href={STORE} className="mt-8 rounded-full bg-rum py-4 text-center text-cream">Order a rum cake</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gold" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-rum text-cream pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div><p className="font-display text-4xl">Bahamas Rum Cake Factory</p><p className="mt-3 max-w-sm text-cream/70">The Official Rum Cake of The Bahamas. Baked in downtown Nassau since 2000.</p></div>
        <div className="text-[15px]"><p className="text-[12px] tracking-[0.18em] text-gold-light uppercase">The shop</p><p className="mt-3">East Bay Street, downtown Nassau<br />A short walk from the cruise port</p></div>
        <div className="text-[15px]"><p className="text-[12px] tracking-[0.18em] text-gold-light uppercase">Order</p><a href={STORE} className="mt-3 block hover:text-gold-light">Online shop</a><a href={TEL} className="block hover:text-gold-light">Tel {PHONE}</a></div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-cream/15 px-5 py-6 text-xs text-cream/55 md:px-10">Concept by ESTATIQ AI Solutions. Product photographs from the factory's own online shop. Details to be confirmed by the business.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.6fr] border-t border-line bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={STORE} className="flex min-h-14 items-center justify-center bg-rum text-[15px] text-cream">Order a rum cake</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-rum focus:p-3 focus:text-cream">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
}
export function Tag({ n, children, light = false }: { n: string; children: ReactNode; light?: boolean }) {
  return <p className={`text-[12.5px] tracking-[0.2em] uppercase ${light ? "text-gold-light" : "text-gold"}`}><span className="font-display text-[16px] tracking-normal">{n}</span> &nbsp;{children}</p>
}
