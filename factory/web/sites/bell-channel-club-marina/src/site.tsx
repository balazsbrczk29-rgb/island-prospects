import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 373-2673"
export const TEL = "tel:+12423732673"
const NAV = [
  { href: "index.html#club", label: "The club" },
  { href: "marina.html", label: "Marina" },
  { href: "index.html#living", label: "Living here" },
  { href: "index.html#find-us", label: "Find us" },
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
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <a href="index.html" className="group leading-none">
          <span className="font-display text-[1.35rem] text-ink">Bell Channel Club</span>
          <span className="mt-1 block text-[11px] tracking-[0.18em] text-muted uppercase">&amp; Marina · Freeport</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative text-[15px] text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-teal after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-teal-deep active:translate-y-0">
            <Phone className="size-4" aria-hidden /> Call the club office
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col gap-2 px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="border-b border-line py-4 font-display text-3xl text-ink">{n.label}</motion.a>
              ))}
              <a href={TEL} className="mt-8 rounded-full bg-ink py-4 text-center text-paper">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-teal" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-2xl">Bell Channel Club &amp; Marina</p>
          <p className="mt-3 max-w-sm text-muted">Bell Channel, Freeport, Grand Bahama. P.O. Box F-44053.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Club office</p>
          <a href={TEL} className="mt-2 block text-ink hover:text-teal">Tel {PHONE}</a>
          <p className="text-muted">Fax (242) 373-3802</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-teal">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1240px] px-5 pb-8 text-xs text-muted md:px-8">Concept by ESTATIQ AI Solutions. Details from public listings, to be confirmed with the club.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.6fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href="marina.html" className="flex min-h-14 items-center justify-center text-[15px]">Marina</a>
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 bg-ink text-[15px] text-paper"><Phone className="size-4" aria-hidden /> Call the club office</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export const ease = [0.16, 1, 0.3, 1] as const
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}
