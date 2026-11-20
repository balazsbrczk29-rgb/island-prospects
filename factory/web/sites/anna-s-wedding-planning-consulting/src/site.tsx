import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, AnimatePresence } from "motion/react"
import { Phone } from "lucide-react"
import { KINDS, usd, PHONE, TEL, US_PHONE, US_TEL, type KindId } from "./data"
import "./styles.css"

export const ease = [0.22, 1, 0.36, 1] as const
export const wipe = [0.77, 0, 0.175, 1] as const

/* The kind of wedding the visitor is looking at: shared by the index column, the hero photograph and the finder. */
type Ctx = { kind: KindId; setKind: (k: KindId) => void; pick: (k: KindId) => void }
const KindCtx = createContext<Ctx>({ kind: "beach", setKind: () => {}, pick: () => {} })
export const useKind = () => useContext(KindCtx)
export const PICK_EVENT = "anna:pick"

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

const PLAN = [
  { href: "#licence", label: "Marriage licence" },
  { href: "#anna", label: "About Anna" },
  { href: "#date", label: "Request a date" },
]

function IndexColumn({ home }: { home: boolean }) {
  const { kind, setKind, pick } = useKind()
  const base = home ? "" : "index.html"
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[var(--index-w)] flex-col gap-[clamp(28px,6vh,64px)] border-r border-line bg-ground px-8 pt-8 pb-7 lg:flex" aria-label="Anna's index">
      <a href="index.html" className="block leading-none" aria-label="Anna's Wedding Planning, home">
        <span className="display block text-[2.6rem] tracking-[-0.03em]">Anna's</span>
        <span className="mt-2 block text-xs text-muted">Wedding Planning &amp; Consulting, Nassau</span>
      </a>
      <nav aria-label="Weddings and planning" className="-mx-3">
        <p className="smallcaps px-3 text-muted">The weddings</p>
        <ul className="mt-3" onMouseLeave={() => home && setKind("beach")}>
          {KINDS.map(k => (
            <li key={k.id} className="relative">
              {kind === k.id && home && <motion.span layoutId="idx" className="absolute top-3 bottom-3 left-0 w-px bg-channel" transition={{ duration: 0.45, ease }} aria-hidden />}
              <a
                href={home ? "#packages" : `packages.html#${k.id}`}
                onMouseEnter={() => home && setKind(k.id)}
                onFocus={() => home && setKind(k.id)}
                onClick={e => { if (home) { e.preventDefault(); pick(k.id) } }}
                className="group flex min-h-11 items-baseline justify-between gap-3 rounded-sm px-3 py-2"
              >
                <span className={`display text-[1.45rem] leading-tight transition-colors duration-300 ${kind === k.id && home ? "text-channel" : "text-ink group-hover:text-channel"}`}>{k.id === "renewal" ? "Renewal of vows" : k.short}</span>
                <span className="num shrink-0 text-xs text-muted">from {k.from.toLocaleString("en-US")}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="smallcaps mt-8 px-3 text-muted">Planning</p>
        <ul className="mt-2">
          {PLAN.map(n => <li key={n.href}><a href={base + n.href} className="flex min-h-10 items-center px-3 text-sm transition-colors hover:text-channel">{n.label}</a></li>)}
          <li><a href="packages.html" className="flex min-h-10 items-center px-3 text-sm transition-colors hover:text-channel">Every package, every inclusion</a></li>
        </ul>
      </nav>
      <div className="num text-sm">
        <a href={TEL} className="flex min-h-10 items-center justify-between gap-2 hover:text-channel"><span className="text-muted">Nassau</span>{PHONE}</a>
        <a href={US_TEL} className="flex min-h-10 items-center justify-between gap-2 hover:text-channel"><span className="text-muted">US line</span>{US_PHONE}</a>
      </div>
    </aside>
  )
}

function MobileBar({ home }: { home: boolean }) {
  const base = home ? "" : "index.html"
  const links = [{ href: home ? "#packages" : "packages.html", label: "Packages" }, ...PLAN.map(p => ({ ...p, href: base + p.href }))]
  return (
    <>
      <div className="flex items-center justify-between px-5 pt-4 pb-2 lg:hidden">
        <a href="index.html" className="inline-flex min-h-11 items-baseline leading-none" aria-label="Anna's Wedding Planning, home">
          <span className="display text-[2rem] tracking-[-0.03em]">Anna's</span>
          <span className="ml-2 text-xs text-muted">Nassau</span>
        </a>
        <a href={TEL} className="inline-flex min-h-11 items-center gap-2 text-sm text-channel" aria-label={`Call Anna in Nassau, ${PHONE}`}><Phone className="size-4" strokeWidth={1.5} aria-hidden /> Call Anna</a>
      </div>
      <nav aria-label="Sections" className="no-scrollbar sticky top-0 z-30 flex gap-6 overflow-x-auto border-b border-line bg-ground px-5 lg:hidden">
        {links.map(l => <a key={l.href} href={l.href} className="flex min-h-11 shrink-0 items-center text-sm">{l.label}</a>)}
      </nav>
    </>
  )
}

function DateButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const date = document.getElementById("date")
      const r = date?.getBoundingClientRect()
      const inDate = r ? r.top < innerHeight && r.bottom > 0 : false
      setShow(scrollY > innerHeight * 0.8 && !inDate)
    }
    onScroll()
    addEventListener("scroll", onScroll, { passive: true })
    return () => removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => { document.documentElement.style.setProperty("--concept-offset", show && innerWidth < 1024 ? "64px" : "0px") }, [show])
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
    <footer className="with-index bg-flats">
      <div className="wrap grid gap-12 pt-20 pb-28 md:grid-cols-[1.4fr_1fr_1fr] lg:pb-16">
        <div>
          <p className="display max-w-[16ch] text-[clamp(2rem,3vw,2.75rem)] leading-[1.02]">Anna's Wedding Planning &amp; Consulting</p>
          <p className="mt-4 max-w-sm text-muted">Destination weddings in Nassau, The Bahamas, for more than two decades. P.O. Box N-8611, Nassau.</p>
        </div>
        <div className="num text-sm">
          <p className="smallcaps text-muted">Call</p>
          <a href={TEL} className="mt-3 flex min-h-10 items-center hover:text-channel">Nassau {PHONE}</a>
          <a href={US_TEL} className="flex min-h-10 items-center hover:text-channel">US line {US_PHONE}</a>
        </div>
        <div className="text-sm">
          <p className="smallcaps text-muted">Follow</p>
          <a href="https://www.instagram.com/annasweddingbahamas/" className="mt-3 flex min-h-10 items-center hover:text-channel">Instagram</a>
          <a href="https://www.facebook.com/AnnasWeddingPlanningService/" className="flex min-h-10 items-center hover:text-channel">Facebook</a>
          <a href="https://www.weddingwire.com/biz/annas-wedding-planning/8cdc9996dc501900.html" className="flex min-h-10 items-center hover:text-channel">WeddingWire</a>
        </div>
      </div>
      <p className="wrap max-w-[28rem] box-content pb-24 text-xs text-muted lg:pb-8">Concept by ESTATIQ AI Solutions. Packages, prices and photographs from annasweddingbahamas.com, to be confirmed with Anna's Wedding Planning.</p>
    </footer>
  )
}

export function Page({ home = false, children }: { home?: boolean; children: ReactNode }) {
  useLenis()
  const [kind, setKind] = useState<KindId>("beach")
  const pick = (k: KindId) => {
    setKind(k)
    window.dispatchEvent(new CustomEvent(PICK_EVENT, { detail: k }))
    document.getElementById(k === "beach" || k === "cruise" ? "packages" : "all-packages")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <KindCtx.Provider value={{ kind, setKind, pick }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:p-3 focus:text-ground">Skip to content</a>
      <IndexColumn home={home} />
      <MobileBar home={home} />
      <main id="main" className="with-index">{children}</main>
      <Footer />
      <DateButton />
    </KindCtx.Provider>
  )
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}

export { usd }
