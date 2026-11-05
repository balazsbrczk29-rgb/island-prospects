import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Mail, ArrowRight } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "+1 (242) 350-4000"
export const TEL = "tel:+12423504000"
export const PHONE2 = "+1 (242) 350-4071"
export const TEL2 = "tel:+12423504071"
export const EMAIL = "enquiries@gbshipyard.com"
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "index.html#docks", label: "Docks" },
  { href: "capabilities.html", label: "Capabilities" },
  { href: "index.html#safety", label: "Safety" },
  { href: "index.html#yard", label: "The yard" },
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

function Wordmark() {
  return (
    <a href="index.html" className="group flex items-center gap-3 leading-none" aria-label="Grand Bahama Shipyard, home">
      <span className="grid size-10 place-items-center bg-ink font-mono text-[12px] tracking-[0.08em] text-lime transition group-hover:bg-harbour">GBS</span>
      <span>
        <span className="font-display block text-[15px] tracking-[-0.01em] text-ink" style={{ fontStretch: "118%" }}>Grand Bahama Shipyard</span>
        <span className="mt-1 block font-mono text-[10.5px] tracking-[0.16em] text-steel uppercase">Freeport · Since 1999</span>
      </span>
    </a>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={`relative py-2 text-[15px] text-ink after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-ink after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href="index.html#enquire" className="group inline-flex min-h-11 items-center gap-2 bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-harbour active:translate-y-0">
            Request a docking slot <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl text-ink" style={{ fontStretch: "115%" }}>{n.label}</motion.a>
              ))}
              <a href="index.html#enquire" onClick={() => setOpen(false)} className="mt-8 bg-ink py-4 text-center text-paper">Request a docking slot</a>
              <a href={TEL} className="mt-3 border border-ink py-4 text-center text-ink">Call {PHONE}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-lime" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper pb-24 md:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-2xl" style={{ fontStretch: "118%" }}>Grand Bahama Shipyard Limited</p>
          <p className="mt-4 max-w-sm text-paper/70">The Fishing Hole Road, inside the Port of Freeport, Grand Bahama, The Bahamas. P.O. Box F-42623.</p>
        </div>
        <div className="text-[15px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Call</p>
          <a href={TEL} className="mt-3 block hover:text-lime">{PHONE}</a>
          <a href={TEL2} className="mt-1 block hover:text-lime">{PHONE2}</a>
        </div>
        <div className="text-[15px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Write</p>
          <a href={`mailto:${EMAIL}`} className="mt-3 block break-all hover:text-lime">{EMAIL}</a>
          <p className="mt-1 text-paper/60">Office Mon to Fri, 08:00 to 18:00</p>
        </div>
        <div className="text-[15px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-3 block hover:text-lime">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. All figures from Grand Bahama Shipyard's own published pages, to be confirmed before launch.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.6fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-2 border-l border-line text-[15px]"><Mail className="size-4" aria-hidden /> Email</a>
      <a href="index.html#enquire" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Docking slot</a>
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
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`font-mono text-[11.5px] tracking-[0.16em] uppercase ${light ? "text-lime" : "text-steel"}`}>{n && <span className={light ? "text-paper/60" : "text-ink"}>{n} / </span>}{children}</p>
}

/** Mask-reveal photo hotlinked from the yard's own website. */
export function Photo({ src, alt, className = "", ratio = "aspect-[4/3]" }: { src: string; alt: string; className?: string; ratio?: string }) {
  return (
    <motion.figure initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }} className={`group relative overflow-hidden bg-paper-2 ${ratio} ${className}`}>
      <img src={src} alt={alt} loading="lazy" width={1200} height={800} className="size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
    </motion.figure>
  )
}
