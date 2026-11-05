import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, Mail, Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 354-5084"
export const TEL = "tel:+12423545084"
export const EMAIL = "pcbclub@gmail.com"
export const BOOK = "https://direct-book.com/properties/pigeoncaydirect"
export const FB = "https://www.facebook.com/pages/Pigeon-Cay-Beach-Club/429723473777383"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "cottages.html", label: "Cottages" },
  { href: "index.html#estimate", label: "Plan a stay" },
  { href: "index.html#days", label: "Days here" },
  { href: "weddings.html", label: "Weddings" },
  { href: "index.html#contact", label: "Contact" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
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
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Pigeon Cay Beach Club, home">
          <span className="font-display text-[23px] italic tracking-[-0.01em] [font-variation-settings:'SOFT'_100,'opsz'_40]">Pigeon Cay</span>
          <span className="ml-2 align-middle text-[10.5px] tracking-[0.24em] text-muted uppercase">Beach Club</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className={`relative py-2 text-[15px] after:absolute after:bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-thatch after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href={BOOK} className="pill">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full bg-paper-2 lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl italic">{n.label}</motion.a>)}
              <a href={BOOK} className="pill mt-8 justify-center py-4">Check dates and book</a>
              <p className="mt-3 text-center text-sm text-muted">No deposit. Pay on departure.</p>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-thatch" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-deep text-paper pb-24 lg:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10">
        <p className="font-display text-[clamp(3.4rem,11vw,10rem)] leading-[0.9] italic tracking-[-0.03em] [font-variation-settings:'SOFT'_100]">Pigeon Cay</p>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-3 md:px-10">
        <div><p className="label text-shallow">Where</p><p className="mt-3 text-paper/80">Roker's, north Cat Island, The Bahamas. Three miles south of Bennett's Harbour.</p></div>
        <div className="text-[15px]">
          <p className="label text-shallow">Reservations</p>
          <a href={TEL} className="mt-3 flex items-center gap-2 hover:text-shallow"><Phone className="size-4" aria-hidden />{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="mt-2 flex items-center gap-2 hover:text-shallow"><Mail className="size-4" aria-hidden />{EMAIL}</a>
          <a href={FB} className="mt-2 inline-flex items-center gap-1 hover:text-shallow">Facebook <ArrowUpRight className="size-3.5" aria-hidden /></a>
        </div>
        <div className="text-[15px]"><p className="label text-shallow">Pages</p>{NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-shallow">{n.label}</a>)}</div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photographs and rates from pigeoncaybahamas.com, to be confirmed with the club.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden />Call</a>
      <a href="index.html#estimate" className="flex min-h-14 items-center justify-center border-l border-line text-[15px]">Estimate</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-deep text-[15px] text-paper">Check dates</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, delay, ease }}>{children}</motion.div>
}

export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`label flex items-center gap-3 ${light ? "text-shallow" : "text-thatch"}`}>{n && <span className="font-display text-base normal-case italic tracking-normal">{n}</span>}{children}</p>
}

export function Heading({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return <h2 id={id} className={`display mt-5 text-[clamp(2.6rem,5vw,4.8rem)] ${className}`}>{children}</h2>
}
