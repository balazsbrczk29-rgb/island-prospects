import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE_US = "+1 (954) 284-7341"
export const TEL_US = "tel:+19542847341"
export const PHONE_LOCAL = "+1 (242) 824-9550"
export const TEL_LOCAL = "tel:+12428249550"
export const EMAIL = "frontdesk@bluffhouse.com"
export const DOCKWA = "https://dockwa.com/explore/destination/wgcegn-bluff-house-resort-and-marina"
export const W = (id: string, ext = "jpg") => `https://static.wixstatic.com/media/5c5976_${id}~mv2.${ext}`
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#stay", label: "Stay" },
  { href: "marina.html", label: "Marina" },
  { href: "index.html#dining", label: "Dining" },
  { href: "history.html", label: "Since the 1950s" },
  { href: "index.html#enquire", label: "Contact" },
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Bluff House, home">
          <span className="font-display text-[1.7rem]">Bluff House</span>
          <span className="label mt-1 block !text-[10px] text-muted">Beach Resort &amp; Marina · Green Turtle Cay</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "!bg-[length:100%_1px]" : ""}`}>{n.label}</a>)}
          <a href="index.html#enquire" className="inline-flex min-h-11 items-center rounded-full bg-abaco px-5 text-[15px] text-paper transition duration-200 hover:-translate-y-px hover:bg-abaco-deep active:translate-y-0">Ask about a room</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL_LOCAL} aria-label={`Call ${PHONE_LOCAL}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2rem]">{n.label}</motion.a>)}
                <a href="index.html#enquire" onClick={() => setOpen(false)} className="mt-8 rounded-full bg-abaco py-4 text-center text-paper">Ask about a room</a>
                <a href={DOCKWA} className="mt-3 rounded-full border border-ink/20 py-4 text-center">Reserve a slip</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-abaco" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div><p className="font-display text-[2.2rem]">Bluff House</p><p className="mt-3 max-w-sm text-paper/70">Beach Resort &amp; Marina. White Sound, Green Turtle Cay, Abaco, The Bahamas.</p></div>
        <div className="text-[15px]"><p className="label text-conch">Reservations</p><a href={`mailto:${EMAIL}`} className="ulink mt-3 inline-block">{EMAIL}</a><br /><a href={TEL_US} className="ulink mt-2 inline-block">US {PHONE_US}</a><br /><a href={TEL_LOCAL} className="ulink mt-2 inline-block">Local {PHONE_LOCAL}</a></div>
        <div className="text-[15px]"><p className="label text-conch">Restaurants</p><a href="tel:+12428217267" className="ulink mt-3 inline-block">+1 (242) 821-7267</a><p className="mt-4 label text-conch">Marina</p><a href={DOCKWA} className="ulink mt-2 inline-block">Reserve on Dockwa</a></div>
        <div className="text-[15px]"><p className="label text-conch">Pages</p>{NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}</div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photos from bluffhouse.com. A VIP Marinas Group property since December 2025.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL_LOCAL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden />Call</a>
      <a href={DOCKWA} className="flex min-h-14 items-center justify-center border-l border-line text-[15px]">Slip</a>
      <a href="index.html#enquire" className="flex min-h-14 items-center justify-center bg-abaco text-[15px] text-paper">Ask about a room</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
}

export function Mask({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.2, delay, ease: reveal }}>{children}</motion.div>
}

export function Head({ index, label, title, id, children, dark = false }: { index: string; label: string; title: ReactNode; id: string; children?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <p className={`label flex items-center gap-3 ${dark ? "text-conch" : "text-abaco"}`}><span>{index}</span><span className={`h-px w-10 ${dark ? "bg-conch/50" : "bg-abaco/40"}`} aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.0] tracking-[-0.015em]">{title}</h2>
      {children}
    </Reveal>
  )
}
