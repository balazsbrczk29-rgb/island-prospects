import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE_US = "+1 800-926-9704"
export const TEL_US = "tel:+18009269704"
export const PHONE_LOCAL = "+1 242-338-5273"
export const TEL_LOCAL = "tel:+12423385273"
export const EMAIL = "resort@capesantamaria.com"
export const BOOK = "https://www.bookonthenet.net/west/premium/eresmain.aspx?&id=tUUp8oO%2bGEBnwXEl4XQtEH67d%2f2EHxOV8ZmT3V4U8tI%3d"
export const M = (f: string) => `https://symphony.cdn.tambourine.com/_fusion/cape-santa-maria-resort/media/${f}`
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#rooms", label: "Rooms" },
  { href: "getting-here.html", label: "Getting here" },
  { href: "index.html#days", label: "Days here" },
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
        <a href="index.html" className="leading-none" aria-label="Cape Santa Maria Beach Resort, home">
          <span className="font-display text-[1.45rem]">Cape Santa Maria</span>
          <span className="label mt-1 block !text-[10px] text-muted">Beach Resort · Long Island, Bahamas</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "!bg-[length:100%_1px]" : ""}`}>{n.label}</a>)}
          <a href={BOOK} className="inline-flex min-h-11 items-center rounded-none bg-sea px-5 text-[15px] text-paper transition duration-200 hover:-translate-y-px hover:bg-sea-deep active:translate-y-0">Check availability</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL_LOCAL} aria-label={`Call ${PHONE_LOCAL}`} className="inline-flex size-11 items-center justify-center rounded-none border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-none border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2rem]">{n.label}</motion.a>)}
                <a href={BOOK} className="mt-8 rounded-none bg-sea py-4 text-center text-paper">Check availability</a>
                <a href="index.html#enquire" onClick={() => setOpen(false)} className="mt-3 rounded-none border border-ink/20 py-4 text-center">Email the resort</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-sea" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div><p className="font-display text-[2.2rem]">Cape Santa Maria</p><p className="mt-3 max-w-sm text-paper/70">Beach Resort. PO Box L.I. 30-117, Seymour's, Long Island, The Bahamas.</p></div>
        <div className="text-[15px]"><p className="label text-blush">Reservations</p><a href={`mailto:${EMAIL}`} className="ulink mt-3 inline-block">{EMAIL}</a><br /><a href={TEL_US} className="ulink mt-2 inline-block">Toll free {PHONE_US}</a><br /><a href={TEL_LOCAL} className="ulink mt-2 inline-block">Local {PHONE_LOCAL}</a></div>
        <div className="text-[15px]"><p className="label text-blush">Follow</p><a href="https://www.instagram.com/capesantamaria/" className="ulink mt-3 block w-fit">Instagram</a><a href="https://www.facebook.com/capesantamaria" className="ulink mt-2 block w-fit">Facebook</a><a href="https://www.youtube.com/user/CapeSantaMaria1" className="ulink mt-2 block w-fit">YouTube</a></div>
        <div className="text-[15px]"><p className="label text-blush">Pages</p>{NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}</div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photos from capesantamaria.com.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL_LOCAL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden />Call</a>
      <a href="index.html#enquire" className="flex min-h-14 items-center justify-center border-l border-line text-[15px]">Email</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-sea text-[15px] text-paper">Check availability</a>
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
      <p className={`label flex items-center gap-3 ${dark ? "text-blush" : "text-sea"}`}><span>{index}</span><span className={`h-px w-10 ${dark ? "bg-blush/50" : "bg-sea/40"}`} aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[1.04] tracking-[-0.01em]">{title}</h2>
      {children}
    </Reveal>
  )
}
