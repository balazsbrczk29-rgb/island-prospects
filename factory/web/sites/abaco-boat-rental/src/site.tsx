import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, MessageCircle } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const WA = "12428245755"
export const WA_LABEL = "+1 242 824 5755"
export const EMAIL = "abacoboatrental@gmail.com"
export const BOOK = "https://www.abacoboatrental.com/reservations"
export const IMG = "https://images.squarespace-cdn.com/content/v1/6a42c8b390db18539a8801a5/"
export const wa = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#boat", label: "The boat" },
  { href: "index.html#delivery", label: "Delivery" },
  { href: "rates.html", label: "Rates" },
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Abaco Boat Rental, home">
          <span className="font-display text-[1.05rem] font-medium tracking-tight">Abaco Boat Rental</span>
          <span className="label mt-1.5 block !text-[10px] text-muted">Man-O-War Cay · Abaco</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] font-medium ${current === n.label ? "!bg-[length:100%_1px]" : ""}`}>{n.label}</a>)}
          <a href={wa("Hi Abaco Boat Rental, I have a question about renting a boat.")} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 text-[15px] transition hover:-translate-y-px hover:border-ink"><MessageCircle className="size-4" aria-hidden />WhatsApp</a>
          <a href={BOOK} className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[15px] font-semibold text-paper transition duration-200 hover:-translate-y-px hover:bg-sea-deep active:translate-y-0">Check availability</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[1.6rem] font-medium">{n.label}</motion.a>)}
              <a href={BOOK} className="mt-8 rounded-full bg-ink py-4 text-center font-semibold text-paper">Check availability &amp; book</a>
              <a href={wa("Hi Abaco Boat Rental, I have a question about renting a boat.")} className="mt-3 rounded-full border border-ink/20 py-4 text-center">WhatsApp {WA_LABEL}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-sea" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <p className="font-display text-[1.6rem] font-medium">Abaco Boat Rental</p>
          <p className="mt-3 max-w-sm text-paper/70">Man-O-War Cay, Abaco, The Bahamas. Free pickup here, or delivery to your cay.</p>
        </div>
        <div className="text-[15px]"><p className="label text-aqua">Reach us</p><a href={wa("Hi Abaco Boat Rental!")} className="ulink mt-3 inline-block">WhatsApp {WA_LABEL}</a><br /><a href={`mailto:${EMAIL}`} className="ulink mt-2 inline-block break-all">{EMAIL}</a></div>
        <div className="text-[15px]"><p className="label text-aqua">Hours</p><p className="mt-3">9am to 5pm, every day</p><p className="text-paper/70">November 1 to August 15</p></div>
        <div className="text-[15px]"><p className="label text-aqua">Pages</p>{NAV.map(n => <a key={n.href} href={n.href} className="ulink mt-2 block w-fit">{n.label}</a>)}<a href={BOOK} className="ulink mt-2 block w-fit">Book online</a></div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photos from abacoboatrental.com. Charts are illustrations, not for navigation.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={wa("Hi Abaco Boat Rental, I have a question about renting a boat.")} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><MessageCircle className="size-4" aria-hidden />WhatsApp</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-ink text-[15px] font-semibold text-paper">Check availability</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.85, delay, ease }}>{children}</motion.div>
}

export function Head({ index, label, title, id, children, dark = false }: { index: string; label: string; title: ReactNode; id: string; children?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <p className={`label flex items-center gap-3 ${dark ? "text-aqua" : "text-sea"}`}><span>{index}</span><span className={`h-px w-10 ${dark ? "bg-aqua/50" : "bg-sea/40"}`} aria-hidden /><span>{label}</span></p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.03em]">{title}</h2>
      {children}
    </Reveal>
  )
}
