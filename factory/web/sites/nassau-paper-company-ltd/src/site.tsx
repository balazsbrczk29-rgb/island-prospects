import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { SHOP } from "./data"
import "./styles.css"

export const PHONE = "(242) 393-3556"
export const TEL = "tel:+12423933556"
export const EMAIL = "info@nassaupaperco.com"
export const ease = [0.16, 1, 0.3, 1] as const
const NAV = [
  { href: "departments.html", label: "Departments" },
  { href: "index.html#quote", label: "Request a quote" },
  { href: "index.html#printing", label: "Printing" },
  { href: "index.html#visit", label: "Visit" },
]

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

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="group flex items-center gap-3" aria-label="Nassau Paper Company, home">
          <span className="relative grid size-10 place-items-center rounded-[10px] bg-ink font-display text-[15px] text-paper transition group-hover:-rotate-3">np</span>
          <span className="leading-none"><span className="block font-display text-[17px] tracking-[-0.02em]">Nassau Paper Company</span><span className="mt-1 block text-[12px] text-muted">More than just paper · Carib Road</span></span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`rounded-full px-4 py-2 text-[15px] transition hover:bg-ink/5 ${current === n.label ? "bg-ink/5" : ""}`}>{n.label}</a>
          ))}
          <a href={SHOP} className="ml-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-pen px-5 text-[15px] text-white transition hover:-translate-y-px hover:bg-pen-deep active:translate-y-0"><ShoppingBag className="size-4" aria-hidden /> Shop online</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
              ))}
              <a href={SHOP} className="mt-8 rounded-full bg-pen py-4 text-center text-white">Shop online</a>
              <a href={TEL} className="mt-3 rounded-full border border-ink py-4 text-center">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-pen" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div><p className="font-display text-3xl tracking-[-0.02em]">Nassau Paper Company Ltd.</p><p className="mt-3 text-paper/65">We're more than just paper.</p></div>
        <div className="text-[15px]"><p className="text-[12px] tracking-[0.14em] text-kraft-light uppercase">Store</p><p className="mt-3">#34 Carib Road, Nassau<br />P.O. Box N-4139</p><p className="mt-2 text-paper/65">Mon to Fri, 8:00 am to 5:00 pm</p></div>
        <div className="text-[15px]"><p className="text-[12px] tracking-[0.14em] text-kraft-light uppercase">Contact</p><a href={TEL} className="mt-3 block hover:text-kraft-light">{PHONE}</a><a href={`mailto:${EMAIL}`} className="block hover:text-kraft-light">{EMAIL}</a><a href={SHOP} className="mt-2 block underline-offset-4 hover:underline">Online store</a></div>
      </div>
      <p className="mx-auto max-w-[1400px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Departments and details from Nassau Paper Company's public listings, to be confirmed by the store.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={SHOP} className="flex min-h-14 items-center justify-center border-l border-line text-[15px]">Shop</a>
      <a href="index.html#quote" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Get a quote</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:p-3 focus:text-paper">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>
}
export function Kicker({ n, children, light = false }: { n: string; children: ReactNode; light?: boolean }) {
  return <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12.5px] ${light ? "border-paper/25 text-paper/80" : "border-ink/15 text-muted"}`}><span className={`font-display ${light ? "text-kraft-light" : "text-pen"}`}>{n}</span>{children}</p>
}
