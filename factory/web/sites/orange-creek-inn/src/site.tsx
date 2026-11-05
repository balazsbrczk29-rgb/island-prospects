import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 354-4110"
export const TEL = "tel:+12423544110"
export const EMAIL = "info@orangecreekinn.com"
export const BOOK = "https://www.bahamago.com/hotels/22-Orange-Creek-Inn?ref=oipb"
export const WP = "https://www.orangecreekinn.com/wp-content/uploads/"
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "stay.html", label: "Studios & specials" },
  { href: "island.html", label: "Getting here" },
  { href: "island.html#do", label: "Cat Island" },
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
      <span className="font-display text-[1.45rem] font-semibold tracking-[-0.01em]">Orange Creek Inn</span>
      <span className="mt-1 block text-[10.5px] tracking-[0.22em] text-muted uppercase">Cat Island · The Bahamas</span>
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
        <a href="index.html" aria-label="Orange Creek Inn, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => (
            <a key={n.label} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-flats after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="text-[15px] hover:text-casuarina">{PHONE}</a>
          <a href={BOOK} className="inline-flex min-h-11 items-center rounded-full bg-casuarina px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-casuarina-deep active:translate-y-0">Check dates</a>
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
                <a href={BOOK} className="mt-8 rounded-full bg-casuarina py-4 text-center text-paper">Check dates</a>
                <a href={TEL} className="mt-2 rounded-full border border-ink/20 py-4 text-center">Call {PHONE}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-flats" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-sand/50 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">Orange Creek, immediately north of Arthur’s Town, Cat Island, The Bahamas.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Call</p>
          <a href={TEL} className="mt-2 block hover:text-casuarina">{PHONE}</a>
          <p className="mt-4 text-[11px] tracking-[0.2em] text-muted uppercase">Email</p>
          <a href={`mailto:${EMAIL}`} className="mt-2 block hover:text-casuarina">{EMAIL}</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Follow</p>
          <a href="https://www.facebook.com/Orange-Creek-Inn-698462783509770/" className="mt-2 block hover:text-casuarina">Facebook</a>
          <a href="https://www.tripadvisor.com/Hotel_Review-g147427-d252196-Reviews-Orange_Creek_Inn-Cat_Island_Out_Islands_Bahamas.html" className="block hover:text-casuarina">Tripadvisor</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Pages</p>
          <a href="index.html" className="mt-2 block hover:text-casuarina">Home</a>
          {NAV.map(n => <a key={n.label} href={n.href} className="mt-2 block hover:text-casuarina">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-line px-5 py-6 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Details and photographs from orangecreekinn.com, to be confirmed with the inn. Flight times, prices and specials change: confirm before booking.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-casuarina text-[15px] text-paper">Check dates</a>
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
  return <p className={`inline-flex items-center gap-3 text-[11.5px] font-medium tracking-[0.22em] uppercase ${light ? "text-flats" : "text-casuarina"}`}>{n && <span className={`inline-flex size-7 items-center justify-center rounded-full border text-[11px] tracking-normal ${light ? "border-flats/50" : "border-casuarina/40"}`}>{n}</span>}{children}</p>
}

export function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`group relative overflow-hidden bg-sand ${className}`}>
      <img src={src} alt={alt} width={900} height={700} loading={priority ? "eager" : "lazy"} {...(priority ? { fetchPriority: "high" as const } : {})} className="size-full object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
    </div>
  )
}

export const FLIGHTS = {
  nassau: { label: "From Nassau", carrier: "Western Air", note: "Twice a day, arriving about 9:30am and 4pm. About $190 round trip.", days: [0, 1, 2, 3, 4, 5, 6], legs: ["Nassau (NAS)", "Cat Island"], times: ["Morning flight, arrives about 9:30am", "Evening flight, arrives about 4pm"] },
  florida: { label: "From Fort Lauderdale", carrier: "Makers Air", note: "Monday, Wednesday, Friday and Saturday. Private charters with custom times also available.", days: [1, 3, 5, 6], legs: ["Fort Lauderdale Executive (FXE)", "Cat Island"], times: ["Departs FXE 6:45am", "Departs FXE 12:45pm"] },
} as const
