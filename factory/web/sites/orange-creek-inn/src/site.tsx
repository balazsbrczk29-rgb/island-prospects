import { useEffect, useRef, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"
import { NAME, PHONE, TEL, EMAIL, BOOK, FACEBOOK, TRIPADVISOR, type Photo } from "./facts"
import "./styles.css"

export const spring = { type: "spring", stiffness: 210, damping: 24, mass: 0.9 } as const

function useWheelSmoothing() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return
    const lenis = new Lenis({ duration: 1, smoothWheel: true, anchors: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

/** The reply tab shows only between the first screen and the reply card (a class on <html>, never React state per frame). */
function useReplyTab() {
  useEffect(() => {
    const hide = [...document.querySelectorAll("[data-hides-reply]")]
    const seen = new Set<Element>()
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target) })
      document.documentElement.classList.toggle("show-reply", seen.size === 0)
    }, { rootMargin: "-80px 0px -80px 0px" })
    hide.forEach(h => io.observe(h))
    let down = false
    const onScroll = () => { const d = window.scrollY > 240; if (d !== down) { down = d; document.documentElement.classList.toggle("scrolled", d) } }
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll()
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); document.documentElement.classList.remove("show-reply") }
  }, [])
}

const CONTENTS = [
  ["The inn", "index.html#place"], ["Your studio", "index.html#studios"], ["Days here", "index.html#days"],
  ["Getting here", "getting-here.html"], ["Check dates", "index.html#reply"],
] as const

function Contents({ home }: { home: boolean }) {
  const [open, setOpen] = useState(false)
  const opener = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); opener.current?.focus() } }
    addEventListener("keydown", key)
    return () => removeEventListener("keydown", key)
  }, [open])
  const href = (h: string) => (home && h.startsWith("index.html#") ? h.slice(10) : h)
  return (
    <>
      <button ref={opener} type="button" className="tab" aria-haspopup="dialog" aria-expanded={open} aria-controls="contents" onClick={() => setOpen(true)}>
        <Menu aria-hidden /> Contents
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.button key="veil" type="button" className="veil" aria-label="Close contents" tabIndex={-1} onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
            <motion.nav key="panel" id="contents" className="contents" role="dialog" aria-modal="true" aria-label="Contents" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }}>
              <button type="button" className="round contents__close" aria-label="Close contents" autoFocus onClick={() => { setOpen(false); opener.current?.focus() }}><X aria-hidden /></button>
              <ol>
                {CONTENTS.map(([label, h]) => <li key={h}><a href={href(h)} onClick={() => setOpen(false)}>{label}</a></li>)}
              </ol>
              <div className="contents__foot">
                <a className="link num" href={TEL}>{PHONE}</a>
                <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <a className="link" href={BOOK} target="_blank" rel="noopener">Book online at BahamaGo</a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function Letterhead({ home }: { home: boolean }) {
  return (
    <header className="sheet sheet--first sheet--above"><div className="letterhead">
      <a className="letterhead__name" href={home ? "#top" : "index.html"} aria-label={`${NAME}, home`}>{NAME}</a>
      <p className="letterhead__line">
        <span>Orange Creek, Cat Island, The Bahamas</span>
        <a className="num" href={TEL}>{PHONE}</a>
      </p>
    </div></header>
  )
}

export function Print({ photo, eager = false }: { photo: Photo; eager?: boolean }) {
  return (
    <>
      <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : undefined} draggable={false} />
      <figcaption>{photo.caption}</figcaption>
    </>
  )
}

/** A print set down on the letter: it arrives slightly turned and settles straight, once. */
export function LaidPrint({ photo, turn = -2.2, className = "" }: { photo: Photo; turn?: number; className?: string }) {
  return (
    <motion.figure className={`print ${className}`} initial={{ rotate: turn, y: 22 }} whileInView={{ rotate: 0, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={spring} whileHover={{ y: -5 }}>
      <Print photo={photo} />
    </motion.figure>
  )
}

export function Foot() {
  return (
    <footer className="sheet sheet--below"><div className="foot">
      <p>{NAME}, Orange Creek, Cat Island, The Bahamas</p>
      <div className="foot__row">
        <a className="link num" href={TEL}>{PHONE}</a>
        <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <a className="link" href={FACEBOOK} target="_blank" rel="noopener">Facebook</a>
        <a className="link" href={TRIPADVISOR} target="_blank" rel="noopener">Tripadvisor</a>
        <a className="link" href={BOOK} target="_blank" rel="noopener">Book online at BahamaGo</a>
      </div>
      <p>Photographs by {NAME}. Offers are published by the Bahama Out Islands Promotion Board and can change.</p>
    </div></footer>
  )
}

export function Page({ home, children }: { home: boolean; children: ReactNode }) {
  useWheelSmoothing()
  useReplyTab()
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#letter">Skip to the letter</a>
      <Contents home={home} />
      <a className="replytab" href={home ? "#reply" : "index.html#reply"}>Check dates <ArrowRight aria-hidden /></a>
      <div id="top" />
      {children}
      <div className="end" />
    </MotionConfig>
  )
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}
