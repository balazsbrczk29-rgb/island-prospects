import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { PHONE, TEL, PHONE2, TEL2, PHONE_INTL, ADDRESS } from "./data"
import "./styles.css"

const NAV = [
  { href: "services.html", label: "Departments" },
  { href: "index.html#measure", label: "Get a quote" },
  { href: "index.html#story", label: "Since 1959" },
  { href: "index.html#visit", label: "Visit" },
]
export const ease = [0.16, 1, 0.3, 1] as const

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

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="block leading-none">
      <span className={`block font-display text-[1.6rem] ${light ? "text-paper" : "text-ink"}`}>Nassau Glass</span>
      <span className={`mt-1 block text-[11px] font-medium tracking-[0.18em] uppercase ${light ? "text-paper/60" : "text-muted"}`}>Mackey Street · since 1959</span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="Nassau Glass home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-2 text-[15px] font-medium after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-steel after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="text-[15px] tnum text-muted transition hover:text-ink">{PHONE}</a>
          <a href="index.html#measure" className="inline-flex min-h-11 items-center bg-ink px-5 text-[15px] font-medium text-paper transition hover:-translate-y-px hover:bg-steel">Request a glass quote</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
              ))}
              <a href="index.html#measure" className="mt-8 bg-ink py-4 text-center text-paper">Request a glass quote</a>
              <a href={TEL} className="mt-3 border border-ink/30 py-4 text-center">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-amber" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-[15px] text-paper/70">The Bahamas' first fabricating glass company, at its original location on Mackey Street since 1959.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] font-bold tracking-[0.18em] text-edge uppercase">Showroom</p>
          <p className="mt-3 text-paper/85">{ADDRESS}<br />top of the hill</p>
          <p className="mt-2 text-paper/60">Mon to Fri 9:00 to 4:30<br />Sat 9:00 to 1:00</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] font-bold tracking-[0.18em] text-edge uppercase">Call</p>
          <a href={TEL} className="mt-3 block tnum hover:text-amber">{PHONE}</a>
          <a href={TEL2} className="block tnum hover:text-amber">{PHONE2}</a>
          <p className="text-paper/60 tnum">International {PHONE_INTL}</p>
          <a href="https://www.facebook.com/NassauGlass/" className="mt-2 block hover:text-amber">Facebook</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Facts from nassauglass.com, to be confirmed with Nassau Glass.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px] font-medium"><Phone className="size-4" aria-hidden /> Call</a>
      <a href="index.html#measure" className="flex min-h-14 items-center justify-center bg-ink text-[15px] font-medium text-paper">Request a glass quote</a>
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
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.85, delay, ease }}>{children}</motion.div>
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[12px] font-bold tracking-[0.18em] uppercase ${light ? "text-edge" : "text-steel"}`}>{children}</p>
}

export function Photo({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <motion.div className={`overflow-hidden bg-edge ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} width={1200} height={900} className="size-full object-cover" />
    </motion.div>
  )
}
