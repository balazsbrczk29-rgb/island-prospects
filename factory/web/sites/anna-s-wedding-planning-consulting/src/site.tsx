import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, AnimatePresence } from "motion/react"
import { Phone } from "lucide-react"
import { KINDS, usd, PHONE, TEL, US_PHONE, US_TEL, type KindId } from "./data"
import "./styles.css"

export const ease = [0.22, 1, 0.36, 1] as const
export const wipe = [0.77, 0, 0.175, 1] as const
export const PICK_EVENT = "anna:pick"

/* Shared state of the index system.
   heroKind: the photograph shown in the hero (hover in the index).
   mode: beach or cruise in the package finder.
   section: which [data-index] section is in view (set by an IntersectionObserver, discrete changes only). */
type Ctx = { heroKind: KindId; setHeroKind: (k: KindId) => void; mode: "beach" | "cruise"; setMode: (m: "beach" | "cruise") => void; section: string; go: (target: string) => void }
const IndexCtx = createContext<Ctx>({ heroKind: "beach", setHeroKind: () => {}, mode: "beach", setMode: () => {}, section: "hero", go: () => {} })
export const useIndex = () => useContext(IndexCtx)

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return // native touch scrolling on phones
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

function useSection(setSection: (s: string) => void) {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-index]")]
    if (!els.length) return
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) setSection((e.target as HTMLElement).dataset.index!)
    }, { rootMargin: "-42% 0px -56% 0px" })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [setSection])
}

const PLAN = [
  { id: "licence", label: "Marriage licence" },
  { id: "anna", label: "About Anna" },
  { id: "date", label: "Request a date" },
]

/* which index entry is lit for a given section */
function isOn(id: string, section: string, mode: string, heroKind: string) {
  if (section === "hero") return id === heroKind
  if (section === "weddings") return id === mode
  return id === section
}

function IndexColumn({ home }: { home: boolean }) {
  const { heroKind, setHeroKind, mode, section, go } = useIndex()
  const href = (id: string) => home ? `#${id === "beach" || id === "cruise" ? "weddings" : id}` : (["licence", "anna", "date"].includes(id) ? `index.html#${id}` : `packages.html#${id}`)
  const Item = ({ id, children, big }: { id: string; children: ReactNode; big?: boolean }) => {
    const on = isOn(id, section, mode, heroKind)
    return (
      <li className="relative">
        {on && <motion.span layoutId="idx" className="absolute top-2.5 bottom-2.5 -left-4 w-px bg-channel" transition={{ duration: 0.45, ease }} aria-hidden />}
        <a
          href={href(id)}
          aria-current={on ? "true" : undefined}
          onMouseEnter={() => home && section === "hero" && KINDS.some(k => k.id === id) && setHeroKind(id as KindId)}
          onClick={e => { if (home) { e.preventDefault(); go(id) } }}
          className={`grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-1.5 transition-colors duration-300 ${on ? "text-channel" : "text-ink hover:text-channel"} ${big ? "" : "text-sm"}`}
        >{children}</a>
      </li>
    )
  }
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[var(--index-w)] flex-col border-r border-line bg-ground px-9 pt-8 pb-8 lg:flex" aria-label="Anna's index">
      <a href="index.html" className="block leading-none" aria-label="Anna's Wedding Planning, home">
        <span className="display block text-[2.6rem] tracking-[-0.04em]">Anna's</span>
        <span className="mt-2 block text-xs text-muted">Wedding Planning &amp; Consulting, Nassau</span>
      </a>
      <nav aria-label="Weddings and planning" className="mt-[clamp(28px,7vh,72px)]">
        <p className="display text-sm italic text-muted">The weddings</p>
        <ul className="mt-2" onMouseLeave={() => home && setHeroKind("beach")}>
          {KINDS.map(k => (
            <Item key={k.id} id={k.id} big>
              <span className="display truncate text-[1.45rem] leading-tight tracking-[-0.02em]">{k.short}</span>
              <span className="num text-right text-xs text-muted">{usd(k.from)}</span>
            </Item>
          ))}
        </ul>
        <p className="display mt-8 text-sm italic text-muted">Planning</p>
        <ul className="mt-2">
          {PLAN.map(n => <Item key={n.id} id={n.id}><span>{n.label}</span><span /></Item>)}
          <li><a href="packages.html" className="flex min-h-11 items-center text-sm transition-colors hover:text-channel">Every package, every inclusion</a></li>
        </ul>
      </nav>
      <div className="num mt-auto pb-16 text-sm">
        <a href={TEL} className="flex min-h-10 items-center justify-between gap-2 hover:text-channel"><span className="text-muted">Nassau</span>{PHONE}</a>
        <a href={US_TEL} className="flex min-h-10 items-center justify-between gap-2 hover:text-channel"><span className="text-muted">US line</span>{US_PHONE}</a>
      </div>
    </aside>
  )
}

function MobileBar({ home }: { home: boolean }) {
  const { section, mode, go } = useIndex()
  const links = [
    { id: "beach", label: "Beach" }, { id: "cruise", label: "Cruise day" }, { id: "cultural", label: "Cultural" }, { id: "deluxe", label: "Deluxe" },
    { id: "renewal", label: "Renewals" }, { id: "licence", label: "Licence" }, { id: "anna", label: "Anna" }, { id: "date", label: "Your date" },
  ]
  const nav = useRef<HTMLDivElement>(null)
  useEffect(() => { // keep the lit chip in view (discrete change only)
    const el = nav.current?.querySelector<HTMLElement>('[aria-current="true"]')
    if (el && nav.current) nav.current.scrollTo({ left: el.offsetLeft - 20, behavior: "smooth" })
  }, [section, mode])
  return (
    <>
      <div className="flex items-center justify-between px-5 pt-3 lg:hidden">
        <a href="index.html" className="inline-flex min-h-11 items-baseline leading-none" aria-label="Anna's Wedding Planning, home">
          <span className="display text-[1.9rem] tracking-[-0.04em]">Anna's</span>
          <span className="ml-2 text-xs text-muted">Nassau</span>
        </a>
        <a href={TEL} className="inline-flex min-h-11 items-center gap-2 text-sm text-channel" aria-label={`Call Anna in Nassau, ${PHONE}`}><Phone className="size-4" strokeWidth={1.5} aria-hidden /> {PHONE}</a>
      </div>
      <nav aria-label="Sections" className="sticky top-0 z-30 border-b border-line bg-ground lg:hidden">
        <div ref={nav} className="no-scrollbar fade-right flex gap-6 overflow-x-auto px-5 pr-14">
          {links.map(l => {
            const on = home && isOn(l.id, section, mode, "")
            return (
              <a key={l.id} href={home ? `#${l.id === "beach" || l.id === "cruise" ? "weddings" : l.id}` : (["licence", "anna", "date"].includes(l.id) ? `index.html#${l.id}` : `packages.html#${l.id}`)}
                aria-current={on ? "true" : undefined}
                onClick={e => { if (home) { e.preventDefault(); go(l.id) } }}
                className={`relative flex min-h-11 shrink-0 items-center text-sm transition-colors ${on ? "text-channel" : "text-ink"}`}>
                {l.label}
                {on && <motion.span layoutId="chip" className="absolute inset-x-0 bottom-0 h-0.5 bg-channel" transition={{ duration: 0.35, ease }} />}
              </a>
            )
          })}
        </div>
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-base text-muted" aria-hidden>›</span>
      </nav>
    </>
  )
}

function DateButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const r = document.getElementById("date")?.getBoundingClientRect()
      const inDate = r ? r.top < innerHeight && r.bottom > 0 : false
      setShow(scrollY > innerHeight * 0.9 && !inDate)
    }
    onScroll()
    addEventListener("scroll", onScroll, { passive: true })
    return () => removeEventListener("scroll", onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="index.html#date"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.3, ease }}
          className="fixed right-4 bottom-[calc(12px+env(safe-area-inset-bottom))] z-40 inline-flex min-h-12 items-center rounded-full bg-channel px-6 text-sm font-medium text-ground shadow-[0_10px_30px_-12px_rgb(13_43_46/0.6)] lg:hidden"
        >Request your date</motion.a>
      )}
    </AnimatePresence>
  )
}

function Footer() {
  return (
    <footer className="with-index border-t border-line">
      <div className="wrap grid gap-12 pt-20 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display max-w-[16ch] text-[clamp(2rem,3vw,2.75rem)] leading-[1.02] tracking-[-0.03em]">Anna's Wedding Planning &amp; Consulting</p>
          <p className="mt-4 max-w-sm text-muted">Destination weddings in Nassau, The Bahamas, for more than two decades. P.O. Box N-8611, Nassau.</p>
        </div>
        <div className="num text-sm">
          <p className="display italic text-muted">Call</p>
          <a href={TEL} className="mt-2 flex min-h-11 items-center hover:text-channel">Nassau {PHONE}</a>
          <a href={US_TEL} className="flex min-h-11 items-center hover:text-channel">US line {US_PHONE}</a>
        </div>
        <div className="text-sm">
          <p className="display italic text-muted">Follow</p>
          <a href="https://www.instagram.com/annasweddingbahamas/" className="mt-2 flex min-h-11 items-center hover:text-channel">Instagram</a>
          <a href="https://www.facebook.com/AnnasWeddingPlanningService/" className="flex min-h-11 items-center hover:text-channel">Facebook</a>
          <a href="https://www.weddingwire.com/biz/annas-wedding-planning/8cdc9996dc501900.html" className="flex min-h-11 items-center hover:text-channel">WeddingWire</a>
        </div>
      </div>
      <p className="wrap box-content max-w-[28rem] pb-28 text-xs text-muted lg:pb-24">Concept by ESTATIQ AI Solutions. Packages, prices and photographs from annasweddingbahamas.com, to be confirmed with Anna's Wedding Planning.</p>
    </footer>
  )
}

export function Page({ home = false, children }: { home?: boolean; children: ReactNode }) {
  useLenis()
  const [heroKind, setHeroKind] = useState<KindId>("beach")
  const [mode, setMode] = useState<"beach" | "cruise">("beach")
  const [section, setSection] = useState("hero")
  useSection(setSection)
  const go = (id: string) => {
    if (id === "beach" || id === "cruise") { setMode(id); window.dispatchEvent(new CustomEvent(PICK_EVENT, { detail: id })) }
    const target = id === "beach" || id === "cruise" ? "weddings" : id
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <IndexCtx.Provider value={{ heroKind, setHeroKind, mode, setMode, section, go }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:p-3 focus:text-ground">Skip to content</a>
      <IndexColumn home={home} />
      <MobileBar home={home} />
      <main id="main" className="with-index">{children}</main>
      <Footer />
      <DateButton />
    </IndexCtx.Provider>
  )
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}

export { usd }
