import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// Contacts as published on sanctuarybaybahamas.com/planyourvisit
export const C = {
  phone: "+1 242 373 1244", tel: "tel:+12423731244", intl: "+1 800 992 3483", intlTel: "tel:+18009923483",
  email: "info@unexso.com", address: "Sanctuary Bay, Sterling Circle, Freeport, Grand Bahama", hours: "Monday to Friday, 9am to 5pm",
  book: "https://book.peek.com/s/aac96fee-708c-45eb-a052-ebc8783c5005/JkYR3", photos: "https://unexsothedolphinexperience.zenfolio.com/",
  ig: "https://www.instagram.com/unexsograndbahama/",
}
export const ease = [0.16, 1, 0.3, 1] as const
const NAV = [{ href: "experiences.html", label: "Experiences" }, { href: "index.html#log", label: "Since 1965" }, { href: "index.html#lab", label: "UNEXSO Lab" }, { href: "index.html#visit", label: "Visit" }]
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
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-foam/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="UNEXSO, home"><span className="block font-display text-[1.55rem] font-extrabold tracking-[-0.02em]">UNEXSO</span><span className="mt-0.5 block text-[11px] text-muted">Underwater Explorers Society · Grand Bahama</span></a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-lagoon after:transition-transform after:duration-300 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href={C.book} className="inline-flex min-h-11 items-center rounded-full bg-sun px-6 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5">Book an experience</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-foam sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.45, ease }} className="border-b border-line py-4 font-display text-3xl font-bold">{n.label}</motion.a>)}
              <a href={C.book} className="mt-8 rounded-full bg-sun py-4 text-center font-semibold">Book an experience</a>
              <a href={C.tel} className="mt-3 rounded-full border border-ink py-4 text-center">Call {C.phone}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[3px] origin-left bg-lagoon" aria-hidden />
    </header>
  )
}
function Footer() {
  return (
    <footer className="bg-abyss text-foam">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div><p className="font-display text-3xl font-extrabold">UNEXSO</p><p className="mt-2 max-w-sm text-[15px] text-foam/65">Underwater Explorers Society, Grand Bahama, since 1965. Now at Sanctuary Bay.</p><div className="mt-5 flex gap-5 text-[14px]"><a href={C.ig} className="hover:text-sun">Instagram</a><a href={C.photos} className="hover:text-sun">Your photos</a></div></div>
        <div className="text-[15px]"><p className="text-[12px] font-semibold tracking-[0.14em] text-sun uppercase">Bookings</p><a href={C.tel} className="mt-3 block hover:text-sun">Bahamas {C.phone}</a><a href={C.intlTel} className="block hover:text-sun">International {C.intl}</a><a href={`mailto:${C.email}`} className="block hover:text-sun">{C.email}</a></div>
        <div className="text-[15px]"><p className="text-[12px] font-semibold tracking-[0.14em] text-sun uppercase">Visit</p><p className="mt-3">{C.address}</p><p className="text-foam/60">{C.hours}</p></div>
      </div>
      <p className="mx-auto max-w-[1400px] border-t border-foam/10 px-5 py-6 text-[12px] text-foam/45 md:px-10">Concept by ESTATIQ AI Solutions. Photos, prices and details from sanctuarybaybahamas.com, to be confirmed. Prices exclude VAT.</p>
    </footer>
  )
}
function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-foam/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={C.tel} className="flex min-h-16 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={C.book} className="flex min-h-16 items-center justify-center bg-sun text-[15px] font-semibold text-ink">Book an experience</a>
    </nav>
  )
}
export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-foam focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>
}
export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`text-[12px] font-semibold tracking-[0.16em] uppercase ${light ? "text-sun" : "text-lagoon"}`}>{n && <span className="mr-3 font-display">{n}</span>}{children}</p>
}
