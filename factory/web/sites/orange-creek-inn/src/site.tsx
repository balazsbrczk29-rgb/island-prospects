import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { MotionConfig } from "motion/react"
import { NAME, PHONE, TEL, EMAIL, BOOK, FACEBOOK, TRIPADVISOR, inDays, offersFor, wayFor, type Origin, type Photo } from "./facts"
import "./styles.css"

/** A sensible first suggestion: about three weeks out, on a day Makers Air flies, clear of the holiday blackouts. */
function firstGoodDay() {
  for (let n = 21; n < 80; n++) {
    const d = inDays(n)
    if (wayFor(d, "florida").ok && offersFor(4, "florida", d).every(o => o.status === "ok")) return d
  }
  return inDays(21)
}

/* ---------- the stay being planned, shared by the dates bar, the map and the offers ---------- */
type Plan = { arrive: string; nights: number; guests: number; origin: Origin }
type Ctx = Plan & { set: (p: Partial<Plan>) => void }
const PlanCtx = createContext<Ctx | null>(null)
export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>(() => ({ arrive: firstGoodDay(), nights: 4, guests: 2, origin: "florida" }))
  const value = useMemo(() => ({ ...plan, set: (p: Partial<Plan>) => setPlan(o => ({ ...o, ...p })) }), [plan])
  return <PlanCtx.Provider value={value}>{children}</PlanCtx.Provider>
}
export const usePlan = () => useContext(PlanCtx)!

function useWheelSmoothing() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return
    const lenis = new Lenis({ duration: 1, smoothWheel: true, anchors: { offset: -16 } })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

/** The small "Dates" key appears once the dates bar has scrolled away, and hides at the offers and contact (a class on <html>). */
function useDatesKey() {
  useEffect(() => {
    const watch = [...document.querySelectorAll("[data-hides-key]")]
    const seen = new Set<Element>()
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target) })
      document.documentElement.classList.toggle("show-key", seen.size === 0)
    })
    watch.forEach(w => io.observe(w))
    return () => io.disconnect()
  }, [])
}

const LINKS = [["The studio", "#studio"], ["Around you", "#around"], ["Getting here", "#getting-here"], ["Offers", "#offers"]] as const

export function Masthead({ home }: { home: boolean }) {
  const at = (h: string) => (home ? h : "index.html" + h)
  return (
    <header className="mast">
      <a className="mast__name" href={home ? "#top" : "index.html"} aria-label={`${NAME}, home`}>
        <span>Orange Creek</span> <span>Inn</span>
      </a>
      <nav className="mast__nav" aria-label="Sections">
        {LINKS.map(([l, h]) => <a key={h} href={h === "#getting-here" && !home ? "getting-here.html" : at(h)}>{l}</a>)}
        {home && <a href="getting-here.html" className="mast__more">Travel guide</a>}
      </nav>
      <a className="mast__tel num" href={TEL}>{PHONE}</a>
    </header>
  )
}

export function Img({ photo, eager = false, sizes, className = "" }: { photo: Photo; eager?: boolean; sizes?: string; className?: string }) {
  return (
    <img className={className} src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} loading={eager ? "eager" : "lazy"}
      decoding="async" fetchPriority={eager ? "high" : undefined} sizes={sizes} draggable={false} />
  )
}

export function Foot() {
  return (
    <footer className="foot">
      <div className="foot__in">
        <p className="foot__name">Orange Creek Inn</p>
        <p>Orange Creek, just north of Arthur&rsquo;s Town, Cat Island, The Bahamas</p>
        <ul className="foot__row">
          <li><a className="link num" href={TEL}>{PHONE}</a></li>
          <li><a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><a className="link" href={BOOK} target="_blank" rel="noopener">Book on BahamaGo</a></li>
          <li><a className="link" href={FACEBOOK} target="_blank" rel="noopener">Facebook</a></li>
          <li><a className="link" href={TRIPADVISOR} target="_blank" rel="noopener">Tripadvisor</a></li>
        </ul>
        <p className="foot__small">Photographs by Orange Creek Inn. Offers are published by the Bahama Out Islands Promotion Board and can change; flight times as published by the inn. Map data: Natural Earth.</p>
      </div>
    </footer>
  )
}

export function DatesKey({ home }: { home: boolean }) {
  return <a className="datekey" href={home ? "#top" : "index.html#top"}>Check dates</a>
}

export function Page({ home, children }: { home: boolean; children: ReactNode }) {
  useWheelSmoothing()
  useDatesKey()
  return (
    <MotionConfig reducedMotion="user">
      <PlanProvider>
        <a className="skip" href="#main">Skip to content</a>
        <div id="top" />
        {children}
        <DatesKey home={home} />
      </PlanProvider>
    </MotionConfig>
  )
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}
