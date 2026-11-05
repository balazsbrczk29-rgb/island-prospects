import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Radio } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "(242) 366-0154"
export const TEL = "tel:+12423660154"
export const PHONE2 = "(242) 577-0283"
export const TEL2 = "tel:+12425770283"
export const PHONE_US = "(305) 735-8550"
export const TEL_US = "tel:+13057358550"
export const EMAIL = "lighthousemarinaht@gmail.com"
export const FB = "https://www.facebook.com/Lighthouse-Marina-260128454011114"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const W = "https://static.wixstatic.com/media/"
export const IMG = {
  banner: W + "fb296f_2c714a7d95ba41f29892cd727b32bd5a~mv2.jpg/v1/fill/w_1905,h_697,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fb296f_2c714a7d95ba41f29892cd727b32bd5a~mv2.jpg",
  rebuilt: W + "4f78a7_63b5cedb8baa4f4ea0dda23aaaa359ea~mv2.jpg/v1/fill/w_953,h_1127,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4f78a7_63b5cedb8baa4f4ea0dda23aaaa359ea~mv2.jpg",
  facilities: W + "fb296f_9365786308b04dd19feb9c42800c1a71~mv2.jpeg/v1/fill/w_523,h_392,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/lCDrnv9w.jpeg",
  westview: W + "4f78a7_58a1bcf4d718445fbe5a2eac96303bf5~mv2.jpg/v1/fill/w_936,h_702,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4f78a7_58a1bcf4d718445fbe5a2eac96303bf5~mv2.jpg",
  point: W + "4f78a7_ba2cd967544e440c914e1ccfecc9b1d8~mv2.jpg/v1/fill/w_936,h_770,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4f78a7_ba2cd967544e440c914e1ccfecc9b1d8~mv2.jpg",
}

const NAV = [
  { href: "index.html#fit", label: "Slips" },
  { href: "index.html#fuel", label: "Fuel & store" },
  { href: "boatyard.html", label: "Boatyard" },
  { href: "index.html#contact", label: "Contact" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="flex items-center gap-3 leading-none" aria-label="Lighthouse Marina, home">
          <svg viewBox="0 0 20 40" className="h-9 w-[18px]" aria-hidden><path d="M7 6h6l2 30H5z" fill="#fff" stroke="#13202b" /><path d="M6.6 12h6.8l.4 6H6.2zM5.9 24h8.2l.4 6H5.5z" fill="#b8312f" /><rect x="6" y="2" width="8" height="4" fill="#13202b" /></svg>
          <span>
            <span className="block font-display text-[1.25rem] font-semibold tracking-[-0.01em]">Lighthouse Marina</span>
            <span className="label mt-1 hidden !text-[10px] text-muted sm:block">Hope Town · Abaco · Since 1980</span>
          </span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "is-current" : ""}`}>{n.label}</a>)}
          <span className="inline-flex items-center gap-1.5 text-[14px] text-muted"><Radio className="size-4" aria-hidden /> VHF 16</span>
          <a href="index.html#contact" className="btn btn-primary">Request a slip or service</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call the marina office on ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-[6px] border border-line"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-[6px] border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2rem]">{n.label}</motion.a>)}
                <a href="index.html#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-8 justify-center">Request a slip or service</a>
                <a href={TEL} className="mt-4 text-center text-[15px] text-muted">Call {PHONE} · VHF 16</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-chart" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-[clamp(2.2rem,3.6vw,3.2rem)] font-semibold leading-none tracking-[-0.02em]">Lighthouse Marina</p>
          <p className="mt-4 max-w-sm text-[15px] text-paper/70">At the base of the Elbow Reef Lighthouse, Hope Town Harbour, Elbow Cay, Abaco, The Bahamas. Fuel, bait, ice, mechanic and gift shop since 1980.</p>
        </div>
        <div className="text-[15px] md:col-span-3">
          <p className="label text-buff">Marina office</p>
          <a href={TEL} className="ulink mt-3 inline-block tabular-nums">{PHONE}</a><br />
          <a href={TEL2} className="ulink mt-1 inline-block tabular-nums">{PHONE2}</a><br />
          <a href={TEL_US} className="ulink mt-1 inline-block tabular-nums">US {PHONE_US}</a><br />
          <a href={`mailto:${EMAIL}`} className="ulink mt-1 inline-block break-all">{EMAIL}</a>
          <p className="mt-1 text-paper/60">VHF channel 16</p>
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-buff">Pages</p>
          {[{ href: "index.html", label: "Home" }, ...NAV].map(n => <a key={n.href} href={n.href} className="ulink mt-3 block w-fit">{n.label}</a>)}
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-buff">Hours</p>
          <p className="mt-3 text-paper/80">Boatyard Mon to Fri, 8am to 4pm</p>
          <p className="mt-1 text-paper/80">Laundry daily, 8am to 6pm</p>
          <a href={FB} className="ulink mt-3 block w-fit">Facebook</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photographs and details from htlighthousemarina.com, to be confirmed with the marina.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call office</a>
      <a href="index.html#contact" className="flex min-h-14 items-center justify-center bg-chart text-[15px] font-medium text-paper">Request a slip or service</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ n, children, className = "" }: { n?: string; children: ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{n && <span className="tabular-nums">{n} /</span>} {children}</p>
}

export function Photo({ src, alt, className = "", w = 953, h = 700, priority = false }: { src: string; alt: string; className?: string; w?: number; h?: number; priority?: boolean }) {
  return (
    <motion.div className={`overflow-hidden ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-5% 0px" }} transition={{ duration: 1.2, ease: reveal }}>
      <img src={src} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className="size-full object-cover transition duration-700 ease-out hover:scale-[1.03]" />
    </motion.div>
  )
}
