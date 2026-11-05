import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// Every contact below is published by BBSL on bbsl.com (header, Sales, Service, Copy Service pages).
export const C = {
  nassau: { label: "Nassau", phone: "(242) 605-6000", tel: "tel:+12426056000", address: "Collins Avenue & 7th Terrace, Nassau", box: "P.O. Box N-4950" },
  freeport: { label: "Freeport", phone: "(242) 688-8100", tel: "tel:+12426888100", address: "Queens Highway, Freeport, Grand Bahama" },
  service: { phone: "(242) 605-6006", tel: "tel:+12426056006", email: "service@bbsl.com" },
  sales: { email: "sales@bbsl.com" },
  copy: { phone: "(242) 605-6027", tel: "tel:+12426056027", email: "copyservice@bbsl.com" },
  info: "info@bbsl.com",
}

const NAV = [
  { href: "index.html#supply", label: "Equipment" },
  { href: "index.html#service", label: "Service plans" },
  { href: "document-centre.html", label: "Document Centre" },
  { href: "index.html#offices", label: "Offices" },
]

export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

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
    <span className="flex items-center gap-3 leading-none">
      <span className={`grid size-10 place-items-center border font-display text-[1.35rem] italic ${light ? "border-paper/40 text-paper" : "border-ink text-ink"}`} aria-hidden>B</span>
      <span>
        <span className={`block font-display text-[1.3rem] ${light ? "text-paper" : "text-ink"}`}>Bahamas Business Solutions</span>
        <span className={`mt-1 block font-mono text-[10px] tracking-[0.18em] uppercase ${light ? "text-paper/60" : "text-muted"}`}>BBSL · since 1966<span className="hidden sm:inline"> · Nassau · Freeport</span></span>
      </span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" aria-label="Bahamas Business Solutions, home"><Wordmark /></a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-cyan after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href="index.html#quote" className="group inline-flex min-h-11 items-center gap-2 bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-cyan-deep active:translate-y-0">
            Request a quote <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>{n.label}
                </motion.a>
              ))}
              <a href="index.html#quote" onClick={() => setOpen(false)} className="mt-8 bg-ink py-4 text-center text-paper">Request a quote</a>
              <a href={C.freeport.tel} className="mt-3 border border-ink py-4 text-center">Call Freeport {C.freeport.phone}</a>
              <a href={C.nassau.tel} className="mt-3 border border-ink py-4 text-center">Call Nassau {C.nassau.phone}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-cyan" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-paper/70">One hundred percent Bahamian owned. In the document business since 1966, with offices in Nassau and Freeport.</p>
        </div>
        {[C.nassau, C.freeport].map(o => (
          <div key={o.label} className="text-[15px]">
            <p className="font-mono text-[11px] tracking-[0.18em] text-paper/55 uppercase">{o.label}</p>
            <a href={o.tel} className="mt-3 block font-display text-2xl transition hover:text-toner">{o.phone}</a>
            <p className="mt-2 text-paper/70">{o.address}</p>
          </div>
        ))}
        <div className="text-[15px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-paper/55 uppercase">Write to</p>
          {[["General", C.info], ["Sales", C.sales.email], ["Service", C.service.email], ["Copy Service", C.copy.email]].map(([k, e]) => (
            <a key={e} href={`mailto:${e}`} className="mt-2 flex justify-between gap-4 border-b border-paper/10 py-1.5 transition hover:text-toner"><span className="text-paper/60">{k}</span>{e}</a>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-paper/10 px-5 py-6 font-mono text-[11px] tracking-[0.08em] text-paper/50 md:flex-row md:justify-between md:px-10">
        <span>© Bahamas Business Solutions Limited</span>
        <span>Concept by ESTATIQ AI Solutions. Details from bbsl.com and public listings, to be confirmed with BBSL.</span>
      </div>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.3fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={C.freeport.tel} className="flex min-h-16 flex-col items-center justify-center text-[13px]"><Phone className="size-4" aria-hidden /> Freeport</a>
      <a href={C.nassau.tel} className="flex min-h-16 flex-col items-center justify-center border-l border-line text-[13px]"><Phone className="size-4" aria-hidden /> Nassau</a>
      <a href="index.html#quote" className="flex min-h-16 items-center justify-center bg-ink text-[15px] text-paper">Request a quote</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
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
  return <p className={`font-mono text-[11px] tracking-[0.2em] uppercase ${light ? "text-toner" : "text-cyan"}`}>{n && <span className="mr-3">{n}</span>}{children}</p>
}

/** Headline that rises line by line from behind a mask. */
export function SplitHead({ lines, className = "", italicLast = true, delay = 0.15, inView = false }: { lines: string[]; className?: string; italicLast?: boolean; delay?: number; inView?: boolean }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${italicLast && i === lines.length - 1 && lines.length > 1 ? "italic" : ""} ${className}`}
            initial={{ y: "108%" }}
            {...(inView ? { whileInView: { y: 0 }, viewport: { once: true } } : { animate: { y: 0 } })}
            transition={{ delay: delay + i * 0.09, duration: 1.1, ease: reveal }}
          >{l}</motion.span>
        </span>
      ))}
    </>
  )
}
