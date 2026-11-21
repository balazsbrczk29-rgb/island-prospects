import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { NAME, PHONE, TEL } from "./data"
import "./styles.css"

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}

export function useWheelSmoothing() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export const usePhone = () => {
  const [phone, set] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 899px)").matches)
  useEffect(() => { const m = window.matchMedia("(max-width: 899px)"); const f = () => set(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f) }, [])
  return phone
}

export const NAV = [
  { href: "index.html#rack", label: "Glass in stock" },
  { href: "index.html#showers", label: "Shower enclosures" },
  { href: "departments.html", label: "Departments" },
  { href: "index.html#visit", label: "Visit" },
]

export function Toolbar({ home }: { home?: boolean }) {
  return (
    <header className="toolbar">
      <a className="wordmark" href="index.html" aria-label="Nassau Glass, home">{NAME}</a>
      <nav aria-label="Main">{NAV.map(n => <a key={n.label} href={home ? n.href.replace("index.html", "") : n.href}>{n.label}</a>)}</nav>
      <a className="tel num" href={TEL}>{PHONE}</a>
    </header>
  )
}

/** Bars that only arrive once the first screen has gone, and leave again over the quote and visit blocks on a phone. */
export function Bars({ after, home }: { after: string; home?: boolean }) {
  const [past, setPast] = useState(false)
  const [quiet, setQuiet] = useState(false)
  useEffect(() => {
    const first = document.querySelector(after)
    const io = first && new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 })
    if (first && io) io.observe(first)
    const seen = new Set<Element>()
    const io2 = new IntersectionObserver(es => { es.forEach(e => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target))); setQuiet(seen.size > 0) }, { threshold: 0.12 })
    document.querySelectorAll("[data-quiet]").forEach(el => io2.observe(el))
    return () => { io?.disconnect(); io2.disconnect() }
  }, [after])
  const dock = past && !quiet
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 899px)").matches
    document.documentElement.style.setProperty("--concept-offset", dock && phone ? "57px" : "0px")
  }, [dock])
  const q = home ? "#quote" : "index.html#quote"
  return (
    <>
      <div className="topbar" data-on={past} aria-hidden={!past}>
        <a className="wordmark" href="index.html" tabIndex={past ? 0 : -1}>{NAME}</a>
        <nav aria-label="Sections">{NAV.map(n => <a key={n.label} href={home ? n.href.replace("index.html", "") : n.href} tabIndex={past ? 0 : -1}>{n.label}</a>)}</nav>
        <a className="btn btn-ink" href={q} tabIndex={past ? 0 : -1}>Request a quote</a>
      </div>
      <div className="dock" data-on={dock} aria-hidden={!dock}>
        <a className="num" href={TEL} tabIndex={dock ? 0 : -1}>Call {PHONE}</a>
        <a href={q} tabIndex={dock ? 0 : -1}>Request a quote</a>
      </div>
    </>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <p>Nassau Glass Co Ltd, #46 Mackey Street (top of the hill), Nassau, Bahamas.<br />Windows, doors and shutters are made by the sister company, <a href="http://www.bahamasaluminum.com/" rel="noopener">Bahamas Aluminum Manufacturing Co. Ltd.</a></p>
        <p className="small">Shower and building photographs: Nassau Glass. The sheet of glass is a rendered sample.</p>
      </div>
    </footer>
  )
}
