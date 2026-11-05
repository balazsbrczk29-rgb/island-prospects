import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "+1 242 577 4696"
export const TEL = "tel:+12425774696"
export const STAY = "https://seasprayresortandvillas.guestybookings.com/en"
export const ORDER = "https://seasprayresortandvillas.revelup.online/store/1"
export const CDN = "https://cdn.prod.website-files.com/69b32130352088b69e1d25ba/"
export const CDN2 = "https://cdn.prod.website-files.com/69b32130352088b69e1d25c2/"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "marina.html", label: "Marina" },
  { href: "index.html#ashore", label: "Eat & drink" },
  { href: "index.html#story", label: "Story" },
  { href: "residences.html", label: "Residences" },
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

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Sea Spray Resort and Marina, home">
          <span className="font-display text-[1.6rem] italic tracking-[-0.01em]">Sea Spray</span>
          <span className="label mt-1 block !text-[10px] text-muted">Resort &amp; Marina · Elbow Cay</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "!bg-[length:100%_1px]" : ""}`}>{n.label}</a>)}
          <span className="text-[13px] text-muted">VHF 16</span>
          <a href="marina.html#request" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[15px] text-paper transition duration-200 hover:-translate-y-px hover:bg-harbour-deep active:translate-y-0">Request a slip</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2rem]">{n.label}</motion.a>)}
                <a href="marina.html#request" className="mt-8 rounded-full bg-ink py-4 text-center text-paper">Request a slip</a>
                <a href={STAY} className="mt-3 rounded-full border border-ink/20 py-4 text-center">Book your stay</a>
                <p className="mt-6 text-center text-muted">Call {PHONE} · VHF 16</p>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-harbour" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <p className="font-display text-[2.2rem] italic">Sea Spray</p>
          <p className="mt-3 max-w-sm text-paper/70">Resort &amp; Marina. White Sound, Elbow Cay, Abaco, The Bahamas.</p>
        </div>
        <div className="text-[15px]"><p className="label text-seaglass">Reach us</p><a href={TEL} className="ulink mt-3 inline-block">{PHONE}</a><p className="mt-2 text-paper/70">VHF Channel 16</p></div>
        <div className="text-[15px]"><p className="label text-seaglass">Pages</p>{NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}</div>
        <div className="text-[15px]"><p className="label text-seaglass">Follow</p><a className="ulink mt-2 block w-fit" href="https://www.instagram.com/seasprayabaco/">Instagram</a><a className="ulink mt-2 block w-fit" href="https://www.facebook.com/SeaSprayResortAbaco/">Facebook</a><a className="ulink mt-2 block w-fit" href={STAY}>Book your stay</a><a className="ulink mt-2 block w-fit" href={ORDER}>Order online</a></div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photos from seasprayresort.com. Not for navigation.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden />Call</a>
      <a href={STAY} className="flex min-h-14 items-center justify-center border-l border-line text-[15px]">Stay</a>
      <a href="marina.html#request" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Request a slip</a>
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
      <p className={`label flex items-center gap-3 ${dark ? "text-seaglass" : "text-harbour"}`}><span>{index}</span><span className={`h-px w-10 ${dark ? "bg-seaglass/50" : "bg-harbour/40"}`} aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.98] font-light tracking-[-0.025em]">{title}</h2>
      {children}
    </Reveal>
  )
}
