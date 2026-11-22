import { useEffect, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion } from "motion/react"
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
  { href: "#why", label: "Hole in the Wall" },
  { href: "#numbers", label: "The numbers" },
  { href: "#live", label: "Discovery Stay" },
  { href: "#request", label: "Request" },
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
  return (
    <header className="bar">
      <div className="wrap bar-in">
        <a href="index.html" className="wm" aria-label="Schooner Bay Marina, home"><span>Schooner <em>Bay</em></span><small>Marina, Great Abaco</small></a>
        <nav aria-label="Main" className="bar-nav">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined}>{n.label}</a>)}
          <span className="tnum vhf">VHF 16 / 77</span>
          <a href={HM_TEL} className="tnum hm">{HM}</a>
        </nav>
        <a href={HM_TEL} className="bar-call">Call</a>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <p className="foot-name">Schooner Bay Marina</p>
        <p>Schooner Bay, Great Abaco, The Bahamas. <span className="tnum">N 26° 09.529′ W 077° 10.633′</span></p>
        <p className="tnum"><a href={HM_TEL}>Harbour Master {HM}</a> · <a href={MAIN_TEL}>Main line {MAIN}</a> · <a href={SALES_TEL}>Sales {SALES}</a></p>
        <p className="foot-small">Concept by ESTATIQ AI Solutions. Specs and photographs from schoonerbaybahamas.com; confirm with the Harbour Master before passage. Nothing here is for navigation.</p>
      </div>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="abar">
      <a href={HM_TEL} className="tnum">Call {HM}</a>
      <a href="#request" className="go">Request a slip</a>
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
