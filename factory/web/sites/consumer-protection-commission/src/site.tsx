import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, MessageCircle, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// Contacts as published by the Commission on its Facebook and Instagram pages.
export const C = {
  phone: "(242) 604-9020", tel: "tel:+12426049020",
  wa: "(242) 357-7898", waNum: "12423577898",
  complaints: "complaints@bahamas.gov.bs", info: "info@cpcbahamas.gov.bs",
  address: "Tonique Williams-Darling Highway, Nassau", addressNote: "In the Consumer Protection Commission building, west of Sunburst Paint",
}
export const ease = [0.16, 1, 0.3, 1] as const

const NAV = [
  { href: "file-a-complaint.html", label: "File a complaint" },
  { href: "index.html#how", label: "How it works" },
  { href: "index.html#questions", label: "Questions" },
  { href: "index.html#visit", label: "Visit or call" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Seal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" fill="#00707a" />
      <path d="M18 12h28v40l-4.7-3-4.6 3-4.7-3-4.7 3-4.6-3L18 52z" fill="#f7f6f1" />
      <path d="M24 31l6 6 11-12" fill="none" stroke="#14181b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="24" y="19" width="16" height="3" rx="1.5" fill="#ffc72c" />
    </svg>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="flex items-center gap-3" aria-label="Consumer Protection Commission, home">
          <Seal className="size-11" />
          <span className="leading-tight">
            <span className="block font-display text-[1.15rem] font-semibold">Consumer Protection Commission</span>
            <span className="block text-[13px] text-muted">The Bahamas</span>
          </span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.slice(1).map(n => (
            <a key={n.href} href={n.href} className="relative text-[16px] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-aqua after:transition-transform after:duration-300 hover:after:scale-x-100">{n.label}</a>
          ))}
          <a href="file-a-complaint.html" aria-current={current === "File a complaint" ? "page" : undefined} className="inline-flex min-h-12 items-center rounded-full bg-aqua px-6 text-[16px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-aqua-deep active:translate-y-0">File a complaint</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-12 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.45, ease }} className="border-b border-line py-4 font-display text-2xl font-semibold">{n.label}</motion.a>
              ))}
              <a href={C.tel} className="mt-8 rounded-full bg-ink py-4 text-center text-white">Call {C.phone}</a>
              <a href={`https://wa.me/${C.waNum}`} className="mt-3 rounded-full border-2 border-ink py-4 text-center">WhatsApp {C.wa}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[3px] origin-left bg-gold" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div className="flex gap-4">
          <Seal className="size-12 shrink-0" />
          <div>
            <p className="font-display text-xl font-semibold">Consumer Protection Commission</p>
            <p className="mt-2 max-w-sm text-[16px] text-white/70">Mandated by the Consumer Protection Act 2023 to receive and investigate consumer complaints.</p>
          </div>
        </div>
        <div className="text-[16px]">
          <p className="text-[13px] font-bold tracking-[0.12em] text-gold uppercase">Reach us</p>
          <a href={C.tel} className="mt-3 block hover:text-gold">Call {C.phone}</a>
          <a href={`https://wa.me/${C.waNum}`} className="mt-1 block hover:text-gold">WhatsApp {C.wa}</a>
          <a href={`mailto:${C.complaints}`} className="mt-1 block break-all hover:text-gold">{C.complaints}</a>
          <a href={`mailto:${C.info}`} className="mt-1 block break-all hover:text-gold">{C.info}</a>
        </div>
        <div className="text-[16px]">
          <p className="text-[13px] font-bold tracking-[0.12em] text-gold uppercase">Visit</p>
          <p className="mt-3 text-white/85">{C.address}</p>
          <p className="mt-1 text-white/60">{C.addressNote}</p>
        </div>
      </div>
      <p className="mx-auto max-w-[1320px] border-t border-white/10 px-5 py-6 text-[13px] text-white/55 md:px-10">Concept by ESTATIQ AI Solutions. Not an official Government of The Bahamas website. Details from the Commission's public social pages, to be confirmed.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={C.tel} className="flex min-h-[68px] flex-col items-center justify-center gap-1 text-[14px]"><Phone className="size-5" aria-hidden /> Call</a>
      <a href={`https://wa.me/${C.waNum}`} className="flex min-h-[68px] flex-col items-center justify-center gap-1 border-l border-line text-[14px]"><MessageCircle className="size-5" aria-hidden /> WhatsApp</a>
      <a href="file-a-complaint.html" className="flex min-h-[68px] items-center justify-center bg-aqua text-[16px] font-bold text-white">File a complaint</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-gold focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Kicker({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`flex items-center gap-3 text-[13px] font-bold tracking-[0.14em] uppercase ${light ? "text-gold" : "text-aqua"}`}>{n && <span className={`grid size-8 place-items-center rounded-full text-[12px] tracking-normal ${light ? "bg-gold text-ink" : "bg-aqua-soft text-aqua-deep"}`}>{n}</span>}{children}</p>
}
