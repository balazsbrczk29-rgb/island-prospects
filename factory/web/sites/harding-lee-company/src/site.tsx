import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const ease = [0.16, 1, 0.3, 1] as const
export const OFFICES = {
  nassau: { name: "Nassau chambers", island: "New Providence", lines: ["Mecam House", "Dowdeswell & Deveaux Streets", "P.O. Box N-877, Nassau"], tel: [["(242) 326-4065", "tel:+12423264065"], ["(242) 328-7712", "tel:+12423287712"]], fax: "(242) 326-4067", map: "Dowdeswell+Street+and+Deveaux+Street,+Nassau,+Bahamas" },
  longisland: { name: "Long Island office", island: "Long Island", lines: ["Salt Pond", "Long Island", "P.O. Box LI 30-129"], tel: [["(242) 338-0009", "tel:+12423380009"], ["(242) 338-0042", "tel:+12423380042"]], fax: "(242) 338-0092", map: "Salt+Pond,+Long+Island,+Bahamas" },
} as const
export const TEL = "tel:+12423264065"
export const PHONE = "(242) 326-4065"

const NAV = [
  { href: "index.html#firm", label: "The firm" },
  { href: "practice.html", label: "Practice & attorneys" },
  { href: "index.html#offices", label: "Offices" },
  { href: "index.html#consult", label: "Contact" },
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
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-5 py-4 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Harding-Lee & Company, home">
          <span className="font-display text-[1.45rem] tracking-[-0.01em] text-ink">Harding-Lee <i className="text-brass">&amp;</i> Company</span>
          <span className="mt-1.5 block text-[10.5px] tracking-[0.22em] text-muted uppercase">Attorneys-at-law · Est. 1996</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-1 text-[15px] text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-brass after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href={TEL} className="inline-flex min-h-11 items-center gap-2 border border-ink px-5 text-[15px] text-ink transition hover:-translate-y-px hover:bg-ink hover:text-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl text-ink">{n.label}</motion.a>
              ))}
              <a href={TEL} className="mt-8 bg-ink py-4 text-center text-paper">Call Nassau chambers</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-brass" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2 pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl">Harding-Lee <i className="text-brass">&amp;</i> Company</p>
          <p className="mt-4 max-w-sm text-muted">A boutique law firm practising in all courts of the Commonwealth of The Bahamas since 1996.</p>
        </div>
        {Object.values(OFFICES).map(o => (
          <div key={o.name} className="text-[15px]">
            <p className="text-[11px] tracking-[0.2em] text-muted uppercase">{o.name}</p>
            <p className="mt-3 leading-relaxed">{o.lines.join(", ")}</p>
            {o.tel.map(([t, h]) => <a key={t} href={h} className="mt-1 block hover:text-brass">Tel {t}</a>)}
            <p className="text-muted">Fax {o.fax}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto max-w-[1360px] border-t border-line px-5 py-6 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Content from the firm's published pages and public records, to be confirmed by the firm. Nothing on this page is legal advice.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href="index.html#consult" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Discuss your matter</a>
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
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`flex items-center gap-4 text-[11.5px] tracking-[0.22em] uppercase ${light ? "text-brass-light" : "text-brass"}`}>{n && <span className="font-display text-[15px] tracking-normal normal-case italic">{n}</span>}<span className={`h-px w-10 ${light ? "bg-brass-light/60" : "bg-brass/60"}`} aria-hidden />{children}</p>
}
