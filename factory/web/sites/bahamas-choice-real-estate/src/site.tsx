import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Mail } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "242-677-3868"
export const TEL = "tel:+12426773868"
export const EMAIL = "sales@bahamaschoicerealestate.com"
export const IMG = "https://bahamaschoicerealestate.com/wp-content/uploads/"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#islands", label: "Islands" },
  { href: "index.html#how", label: "How we work" },
  { href: "buying.html", label: "Buying from abroad" },
  { href: "index.html#team", label: "Team" },
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
    <a href="index.html" className="leading-none" aria-label="Bahamas Choice Real Estate, home">
      <span className="font-display text-[1.45rem] tracking-[-0.01em] text-ink">Bahamas Choice</span>
      <span className="label mt-1 block !text-[10.5px] text-muted">Real Estate · Nassau</span>
    </a>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 md:px-10">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] text-ink ${current === n.label ? "!bg-[length:100%_1px]" : ""}`}>{n.label}</a>
          ))}
          <a href="index.html#brief" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[15px] text-paper transition duration-200 hover:-translate-y-px hover:bg-grape-deep active:translate-y-0">Send your brief</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2rem] text-ink">{n.label}</motion.a>
                ))}
                <a href="index.html#brief" onClick={() => setOpen(false)} className="mt-8 rounded-full bg-ink py-4 text-center text-paper">Send your brief</a>
                <a href={TEL} className="mt-3 rounded-full border border-ink/20 py-4 text-center">Call {PHONE}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-grape" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <p className="font-display text-3xl">Bahamas Choice Real Estate</p>
          <p className="mt-4 max-w-sm text-paper/70">Yamacraw Hill Road, Nassau, New Providence, The Bahamas. Buying, selling and leasing across the islands since 2013.</p>
        </div>
        <div className="text-[15px]">
          <p className="label text-conch">Office</p>
          <a href={TEL} className="ulink mt-3 inline-block">{PHONE}</a><br />
          <a href={`mailto:${EMAIL}`} className="ulink mt-2 inline-block break-all">{EMAIL}</a>
        </div>
        <div className="text-[15px]">
          <p className="label text-conch">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}
        </div>
        <div className="text-[15px]">
          <p className="label text-conch">Follow</p>
          <a className="ulink mt-2 block w-fit" href="https://www.facebook.com/BahamaChoiceRealEstate" rel="noopener">Facebook</a>
          <a className="ulink mt-2 block w-fit" href="https://www.instagram.com/bahamaschoice.realestate/" rel="noopener">Instagram</a>
          <a className="ulink mt-2 block w-fit" href="https://www.linkedin.com/company/bahamas-choice-real-estate/" rel="noopener">LinkedIn</a>
          <a className="ulink mt-2 block w-fit" href="https://www.youtube.com/@bahamaschoicerealestate157" rel="noopener">YouTube</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:flex-row md:justify-between md:px-10">
        <p>Principal Broker Lana Munnings-Basalyga, Bahamas Real Estate Association licence #480.</p>
        <p>Concept by ESTATIQ AI Solutions. Photos from bahamaschoicerealestate.com.</p>
      </div>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-1.5 border-l border-line text-[15px]"><Mail className="size-4" aria-hidden /> Email</a>
      <a href="index.html#brief" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Send your brief</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Mask({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.2, delay, ease: reveal }}>
      {children}
    </motion.div>
  )
}

export function SectionHead({ index, label, title, id, children, dark = false }: { index: string; label: string; title: ReactNode; id: string; children?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <p className={`label flex items-center gap-3 ${dark ? "text-conch" : "text-grape"}`}><span>{index}</span><span className={`h-px w-10 ${dark ? "bg-conch/50" : "bg-grape/40"}`} aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.02em]">{title}</h2>
      {children}
    </Reveal>
  )
}
