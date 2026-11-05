import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, MessageCircle, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// From Slim Upholstery's own Facebook / Instagram ("Call or WhatsApp 814-5451") and its verified Bahamas Index listing.
export const C = {
  phone: "(242) 814-5451", tel: "tel:+12428145451", wa: "12428145451",
  phone2: "(242) 341-2149", tel2: "tel:+12423412149",
  address: "#21 Claridge Road, Nassau",
  hours: [["Monday to Saturday", "9:00am to 5:30pm"], ["Sunday", "Closed"]],
  fb: "https://www.facebook.com/SlimUpholstery/", ig: "https://www.instagram.com/slimupholstery/", tt: "https://www.tiktok.com/@slimupholstery",
}
export const ease = [0.16, 1, 0.3, 1] as const
export const waLink = (text: string) => `https://wa.me/${C.wa}?text=${encodeURIComponent(text)}`

const NAV = [
  { href: "index.html#studio", label: "Fabric studio" },
  { href: "what-we-upholster.html", label: "What we upholster" },
  { href: "index.html#visit", label: "Visit the shop" },
]

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

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-linen/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Slim Upholstery, home">
          <span className="block font-display text-[1.6rem]">Slim Upholstery</span>
          <span className="mt-1 block text-[11px] font-medium tracking-[0.2em] text-muted uppercase">Claridge Road · Nassau</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-thread after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href={waLink("Hi Slim Upholstery, I would like a free quote.")} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-5 text-[15px] text-linen transition hover:-translate-y-px hover:bg-navy-deep"><MessageCircle className="size-4" aria-hidden /> Free quote</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-linen sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.45, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>)}
              <a href={C.tel} className="mt-8 rounded-full bg-navy py-4 text-center text-linen">Call {C.phone}</a>
              <a href={waLink("Hi Slim Upholstery, I would like a free quote.")} className="mt-3 rounded-full border border-ink py-4 text-center">WhatsApp for a free quote</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="stitch h-[2px] origin-left" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-linen">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl">Slim Upholstery</p>
          <p className="mt-3 max-w-sm text-[15px] text-linen/70">Home, auto, marine, aircraft and church upholstery. From worn to wow, one stitch at a time.</p>
          <div className="mt-5 flex gap-5 text-[14px]"><a href={C.fb} className="hover:text-thread">Facebook</a><a href={C.ig} className="hover:text-thread">Instagram</a><a href={C.tt} className="hover:text-thread">TikTok</a></div>
        </div>
        <div className="text-[15px]"><p className="text-[11px] font-medium tracking-[0.2em] text-thread uppercase">Call or WhatsApp</p><a href={C.tel} className="mt-3 block font-display text-2xl hover:text-thread">{C.phone}</a><a href={C.tel2} className="mt-1 block text-linen/70 hover:text-linen">Shop line {C.phone2}</a></div>
        <div className="text-[15px]"><p className="text-[11px] font-medium tracking-[0.2em] text-thread uppercase">The shop</p><p className="mt-3">{C.address}</p>{C.hours.map(([d, h]) => <p key={d} className="text-linen/70">{d}: {h}</p>)}</div>
      </div>
      <p className="mx-auto max-w-[1360px] border-t border-linen/10 px-5 py-6 text-[12px] text-linen/50 md:px-10">Concept by ESTATIQ AI Solutions. Details from Slim Upholstery's public pages and listings, to be confirmed with the shop.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-linen/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={C.tel} className="flex min-h-16 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={waLink("Hi Slim Upholstery, I would like a free quote.")} className="flex min-h-16 items-center justify-center gap-2 bg-navy text-[15px] text-linen"><MessageCircle className="size-4" aria-hidden /> WhatsApp a free quote</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-linen focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
}
export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] uppercase ${light ? "text-thread" : "text-navy"}`}>{n && <span className="font-display text-[15px] tracking-normal">{n}</span>}<span className="stitch h-[2px] w-8" aria-hidden />{children}</p>
}
