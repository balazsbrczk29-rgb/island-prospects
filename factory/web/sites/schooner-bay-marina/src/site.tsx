import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone, Radio } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

const U = "https://schoonerbaybahamas.com/wp-content/uploads/"
export const IMG = {
  pano: U + "2017/10/the-marina-header-slider-01-1600x480.jpg",
  amenities: U + "2018/06/Harbor-Amenities-elev.jpg",
  village: U + "2023/08/schoonerbay-community-harbour-village-080223-min.jpg",
  community: U + "2023/08/schoonerbay-community-header-080123-min.jpg",
  contact: U + "2017/10/contact-header.jpg",
  villa: U + "2018/06/89151_CM_D-CONSTRUCTION-MANAGEMENT-DEVELOPMENT-INC_Schooner-Bay_Villa.jpg",
}
export const HM = "(242) 366-2044"
export const HM_TEL = "tel:+12423662044"
export const MAIN = "(242) 699-3470"
export const MAIN_TEL = "tel:+12426993470"
export const EMAIL = "harbourmaster@schoonerbaybahamas.com"
export const SALES = "(242) 577-5577"
export const SALES_TEL = "tel:+12425775577"
export const HANDOUT = U + "2017/10/Marina-Handout.pdf"
export const LIMIT = { loa: 80, draft: 8, rate: 3 }

const NAV = [
  { href: "marina.html", label: "Marina" },
  { href: "index.html#fit", label: "Will she fit?" },
  { href: "village.html", label: "Village" },
  { href: "marina.html#arrive", label: "Arriving" },
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Schooner Bay Marina, home">
          <span className="font-display text-[1.5rem] tracking-[-0.01em]">Schooner Bay</span>
          <span className="mt-1 block text-[12px] tracking-[0.06em] text-muted">Marina · Great Abaco</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} className={`ulink text-[15px] ${current === n.label ? "is-on" : ""}`}>{n.label}</a>)}
          <span className="flex items-center gap-1.5 text-[14px] text-muted"><Radio className="size-4 text-brass" aria-hidden /> VHF 16 / 77</span>
          <a href="index.html#request" className="btn btn-ink">Request a slip</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={HM_TEL} className="inline-flex size-11 items-center justify-center rounded border border-line" aria-label={`Call the Harbour Master ${HM}`}><Phone className="size-5" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
                ))}
                <a href="index.html#request" onClick={() => setOpen(false)} className="btn btn-ink mt-8">Request a slip</a>
                <p className="mt-4 text-center text-muted">Harbour Master on VHF 16 / 77</p>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-brass" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper pb-28 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl">Schooner Bay Marina</p>
          <p className="mt-3 max-w-xs text-paper/70">Schooner Bay, Great Abaco, The Bahamas. Open daily 7:30 am to 4:30 pm.</p>
        </div>
        <div className="text-[15px]">
          <p className="cap !text-paper/55">Harbour Master</p>
          <a href={HM_TEL} className="mt-3 block hover:text-foam">{HM}</a>
          <a href={`mailto:${EMAIL}`} className="ulink mt-1 inline-block break-all">{EMAIL}</a>
          <p className="mt-1 text-paper/70">VHF 16, working 77</p>
        </div>
        <div className="text-[15px]">
          <p className="cap !text-paper/55">Village and sales</p>
          <a href={MAIN_TEL} className="mt-3 block hover:text-foam">Main line {MAIN}</a>
          <a href={SALES_TEL} className="mt-1 block hover:text-foam">Sales, June Russell {SALES}</a>
          <a href="https://www.facebook.com/schoonerbay" className="ulink mt-1 inline-block">Facebook</a>
        </div>
        <div className="text-[15px]">
          <p className="cap !text-paper/55">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-foam">{n.label}</a>)}
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/15 px-5 py-6 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Specs from schoonerbaybahamas.com; confirm with the Harbour Master before passage. Nothing here is for navigation.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={HM_TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Harbour Master</a>
      <a href="index.html#request" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Request a slip</a>
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
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
  )
}
export function Head({ n, k, id, title, children, dark = false }: { n: string; k: string; id: string; title: ReactNode; children?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <div className={`flex items-baseline gap-4 border-t pt-4 ${dark ? "border-paper/25" : "border-ink/25"}`}>
        <span className="font-display text-xl text-brass">{n}</span>
        <span className={`cap ${dark ? "!text-paper/60" : ""}`}>{k}</span>
      </div>
      <h2 id={id} className="mt-8 font-display text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.02em]">{title}</h2>
      {children && <div className={`mt-6 max-w-md text-[17px] leading-relaxed ${dark ? "text-paper/75" : "text-muted"}`}>{children}</div>}
    </Reveal>
  )
}
