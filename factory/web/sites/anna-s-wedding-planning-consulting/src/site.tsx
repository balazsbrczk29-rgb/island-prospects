import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 324-2559"
export const TEL = "tel:+12423242559"
export const US_PHONE = "(954) 246-3108"
export const US_TEL = "tel:+19542463108"
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "packages.html", label: "Packages" },
  { href: "index.html#licence", label: "Marriage licence" },
  { href: "index.html#anna", label: "About Anna" },
  { href: "index.html#plan", label: "Check your date" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
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
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Anna's Wedding Planning, home">
          <span className="font-display text-[1.6rem] text-ink">Anna's</span>
          <span className="ml-2 text-[13px] text-muted">Wedding Planning, Nassau</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-1 text-[15px] text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-rose after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-rose px-5 text-[15px] text-white transition duration-200 hover:-translate-y-px hover:bg-ink active:translate-y-0">
            <Phone className="size-4" aria-hidden /> Call Anna
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl text-ink">{n.label}</motion.a>
              ))}
              <a href={TEL} className="mt-8 rounded-full bg-rose py-4 text-center text-white">Call {PHONE}</a>
              <a href={US_TEL} className="mt-3 rounded-full border border-line py-4 text-center">US line {US_PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-rose" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-blush pb-28 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-4xl leading-none">Anna's Wedding Planning</p>
          <p className="mt-4 max-w-sm text-muted">Destination weddings in Nassau, The Bahamas, for more than two decades. P.O. Box N-8611, Nassau.</p>
        </div>
        <div className="text-[15px]">
          <p className="text-[13px] text-rose">Call</p>
          <a href={TEL} className="mt-2 block hover:text-rose">Nassau {PHONE}</a>
          <a href={US_TEL} className="block hover:text-rose">US line {US_PHONE}</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[13px] text-rose">Follow</p>
          <a href="https://www.instagram.com/annasweddingbahamas/" className="mt-2 block hover:text-rose">Instagram</a>
          <a href="https://www.facebook.com/AnnasWeddingPlanningService/" className="block hover:text-rose">Facebook</a>
          <a href="https://www.weddingwire.com/biz/annas-wedding-planning/8cdc9996dc501900.html" className="block hover:text-rose">WeddingWire</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Packages, prices and photographs from annasweddingbahamas.com, to be confirmed with Anna's Wedding Planning.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call Anna</a>
      <a href="index.html#plan" className="flex min-h-14 items-center justify-center bg-rose text-[15px] text-white">Check your wedding date</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:p-3 focus:text-paper">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Mark({ n, children }: { n: string; children: ReactNode }) {
  return <p className="flex items-baseline gap-3 text-[14px] text-muted"><span className="font-display text-[1.4rem] text-rose">{n}</span>{children}</p>
}

export const usd = (n: number) => `USD ${n.toLocaleString("en-US")}`
