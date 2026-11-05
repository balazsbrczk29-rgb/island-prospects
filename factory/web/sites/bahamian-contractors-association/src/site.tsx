import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { PHONE, TEL, EMAIL, ADDRESS } from "./data"
import "./styles.css"

const NAV = [
  { href: "membership.html", label: "Membership" },
  { href: "index.html#work", label: "What we do" },
  { href: "index.html#act", label: "The Contractors Act" },
  { href: "index.html#event", label: "Events" },
  { href: "index.html#office", label: "Office" },
]
export const ease = [0.16, 1, 0.3, 1] as const

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

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3 leading-none">
      <svg viewBox="0 0 36 36" className="size-9" aria-hidden><rect width="36" height="36" fill="#00778b" /><path d="M0 0 L16 18 L0 36Z" fill={light ? "#eeeeea" : "#121417"} /><path d="M19 28h13M21 28V14h9v14" stroke="#f2b705" strokeWidth="2" fill="none" /></svg>
      <span>
        <span className={`block font-display text-[1.05rem] font-extrabold tracking-[-0.01em] ${light ? "text-paper" : "text-ink"}`}>Bahamian Contractors' Association</span>
        <span className={`mt-1 block text-[11px] tracking-[0.14em] uppercase ${light ? "text-paper/60" : "text-muted"}`}>BCA · since 1959</span>
      </span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="BCA home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-2 text-[15px] font-medium after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-left after:bg-gold after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href="membership.html#finder" className="inline-flex min-h-11 items-center bg-aqua px-5 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:bg-ink">Find your membership</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line xl:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[1.8rem] font-extrabold tracking-[-0.02em]">{n.label}</motion.a>
              ))}
              <a href="membership.html#finder" className="mt-8 bg-aqua py-4 text-center font-semibold text-white">Find your membership</a>
              <a href={TEL} className="mt-3 border border-ink py-4 text-center">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[3px] origin-left bg-gold" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper xl:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-[15px] text-paper/65">Uniting contractors, raising standards, building the future.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.18em] text-gold uppercase">Office</p>
          <p className="mt-3 text-paper/85">{ADDRESS}</p>
          <p className="mt-2 text-paper/60">Mon to Wed 9:00 to 3:00<br />Thu 9:00 to 12:00</p>
          <a href={TEL} className="mt-2 block tnum hover:text-gold">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="block hover:text-gold">{EMAIL}</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.18em] text-gold uppercase">Follow</p>
          <a href="https://www.facebook.com/bahamiancontractors/" className="mt-3 block hover:text-gold">Facebook</a>
          <a href="https://www.instagram.com/bahamiancontractors/" className="mt-2 block hover:text-gold">Instagram</a>
          <a href="https://facebook.com/groups/bcabuysell/" className="mt-2 block hover:text-gold">Contractors Buy & Sell group</a>
          <a href="https://www.bahamiancontractors.org/nailed-it" className="mt-2 block hover:text-gold">Nailed It! radio show</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/50 md:px-10">Concept by ESTATIQ AI Solutions. Facts from bahamiancontractors.org and public reports, to be confirmed with the BCA.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.6fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur xl:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href="membership.html#finder" className="flex min-h-14 items-center justify-center bg-aqua text-[15px] font-semibold text-white">Find your membership</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`inline-flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.16em] uppercase ${light ? "text-gold" : "text-aqua"}`}><span className="size-2 bg-gold" aria-hidden />{children}</p>
}
