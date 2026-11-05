import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "833.717.6499"
export const TEL = "tel:+18337176499"
export const MARINA_EMAIL = "marina@romorabay.com"
export const BOOK = "https://s006209.officialbookings.com/"
export const SLIP = "https://www.romorabay.com/marina/reservations"
export const A = "https://www.romorabay.com/assets/"
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "stay.html", label: "Rooms & The House" },
  { href: "marina.html", label: "Marina" },
  { href: "index.html#dining", label: "Dining" },
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

export function Wordmark() {
  return (
    <span className="leading-none">
      <span className="font-display text-[1.55rem] italic">Romora Bay</span>
      <span className="mt-1 block text-[10px] tracking-[0.3em] text-muted uppercase">Resort & Marina · Harbour Island</span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="Romora Bay Resort and Marina, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => (
            <a key={n.label} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-harbour after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={SLIP} className="inline-flex min-h-11 items-center rounded-full border border-ink/25 px-5 text-[15px] transition hover:-translate-y-px hover:border-ink">Reserve a slip</a>
          <a href={BOOK} className="inline-flex min-h-11 items-center rounded-full bg-harbour px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-harbour-deep">Reserve a stay</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line"><Phone className="size-5" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <motion.a key={n.label} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
                ))}
                <a href={BOOK} className="mt-8 rounded-full bg-harbour py-4 text-center text-paper">Reserve a stay</a>
                <a href={SLIP} className="mt-2 rounded-full border border-ink/20 py-4 text-center">Reserve a slip</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-conch" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-sand pb-28 md:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">Romora Bay Resort & Marina, Harbour Island, Eleuthera, The Bahamas. Seventeen rooms and a full-service marina, an official port of entry.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Reservations</p>
          <a href={TEL} className="mt-2 block hover:text-harbour">{PHONE}</a>
          <a href={BOOK} className="block hover:text-harbour">Book online</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Marina</p>
          <a href={`mailto:${MARINA_EMAIL}`} className="mt-2 block hover:text-harbour">{MARINA_EMAIL}</a>
          <a href="tel:+12424701520" className="block hover:text-harbour">242.470.1520</a>
          <a href={SLIP} className="block hover:text-harbour">Slip reservations</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Pages</p>
          <a href="index.html" className="mt-2 block hover:text-harbour">Home</a>
          {NAV.map(n => <a key={n.label} href={n.href} className="mt-2 block hover:text-harbour">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-line px-5 py-6 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Details and photographs from romorabay.com, to be confirmed with the resort.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={SLIP} className="flex min-h-14 items-center justify-center border-l border-line text-[15px]">Slip</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-harbour text-[15px] text-paper">Stay</a>
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
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`text-[11px] tracking-[0.3em] uppercase ${light ? "text-conch" : "text-harbour"}`}>{n && <span className="mr-3 font-display text-[15px] tracking-normal italic">{n}</span>}{children}</p>
}

export function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`group relative overflow-hidden bg-sand ${className}`}>
      <img src={src} alt={alt} width={1200} height={800} loading={priority ? "eager" : "lazy"} {...(priority ? { fetchPriority: "high" as const } : {})} className="size-full object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
    </div>
  )
}
