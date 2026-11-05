import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "242-423-4982"
export const TEL = "tel:+12424234982"
export const PHONE2 = "242-393-9899"
export const TEL2 = "tel:+12423939899"
export const AFTER = "242-525-5729"
export const EMAIL = "cherylfoxferguson@live.com"
export const R = (f: string) => `https://www.cherylbahamastaxiandtours.com/Resources/${f}`
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#airport", label: "Airport pickup" },
  { href: "tours.html", label: "Private tours" },
  { href: "index.html#plan", label: "Plan a tour" },
  { href: "index.html#contact", label: "Contact" },
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
    <header className="sticky top-0 z-40 bg-navy text-paper">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="flex items-center gap-3 leading-none" aria-label="Cheryl's Bahamas Taxi and Tours, home">
          <span className="rounded-[6px] bg-yellow px-2 py-1 font-display text-[13px] font-bold tracking-wide text-navy">TAXI</span>
          <span><span className="block font-display text-[1.2rem] font-bold">Cheryl's Bahamas</span><span className="label mt-0.5 block !text-[10px] text-yellow">Taxi and Tours · Nassau</span></span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "!bg-[length:100%_2px]" : ""}`}>{n.label}</a>)}
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-yellow px-5 text-[15px] font-bold text-navy transition hover:-translate-y-px active:translate-y-0"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-full bg-yellow text-navy"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-paper/30" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2rem] font-bold text-navy">{n.label}</motion.a>)}
                <a href={TEL} className="mt-8 rounded-full bg-navy py-4 text-center font-bold text-paper">Call {PHONE}</a>
                <a href={`mailto:${EMAIL}`} className="mt-3 rounded-full border border-navy/30 py-4 text-center">Email Cheryl's</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[3px] origin-left bg-yellow" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div><p className="font-display text-[1.8rem] font-bold">Cheryl's Bahamas Taxi and Tours</p><p className="mt-3 max-w-sm text-paper/70">Taxis and private tours across Nassau and Paradise Island. Registered Taxi Service #1080. All major credit cards accepted.</p></div>
        <div className="text-[15px]"><p className="label text-yellow">Office, 9am to 6pm daily</p><a href={TEL} className="ulink mt-3 inline-block">{PHONE}</a><br /><a href={TEL2} className="ulink mt-2 inline-block">{PHONE2}</a></div>
        <div className="text-[15px]"><p className="label text-yellow">All other times</p><a href={TEL} className="ulink mt-3 inline-block">{PHONE}</a><br /><a href="tel:+12425255729" className="ulink mt-2 inline-block">{AFTER}</a></div>
        <div className="text-[15px]"><p className="label text-yellow">Email</p><a href={`mailto:${EMAIL}`} className="ulink mt-3 inline-block break-all">{EMAIL}</a><a href="https://www.tripadvisor.com/Attraction_Review-g147416-d3746669-Reviews-Cheryl_s_Bahamas_Taxi_and_Private_Tours-Nassau_New_Providence_Island_Bahamas.html" className="ulink mt-4 block w-fit">Read reviews on TripAdvisor</a></div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photos from cherylbahamastaxiandtours.com.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px] font-bold text-navy"><Phone className="size-4" aria-hidden />Call</a>
      <a href="index.html#plan" className="flex min-h-14 items-center justify-center bg-yellow text-[15px] font-bold text-navy">Plan my tour</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>
}

export function Head({ index, label, title, id, children, dark = false }: { index: string; label: string; title: ReactNode; id: string; children?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <p className={`label flex items-center gap-3 ${dark ? "text-yellow" : "text-navy"}`}><span className={`rounded-full px-2 py-0.5 ${dark ? "bg-yellow text-navy" : "bg-navy text-yellow"}`}>{index}</span><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.3rem,4.8vw,4.4rem)] leading-[1] font-bold tracking-[-0.035em]">{title}</h2>
      {children}
    </Reveal>
  )
}
