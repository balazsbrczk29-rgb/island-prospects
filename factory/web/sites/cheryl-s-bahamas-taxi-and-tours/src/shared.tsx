import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion } from "motion/react"
import { Phone } from "lucide-react"
import "./styles.css"

export const PHONE = "242 423 4982"
export const TEL = "tel:+12424234982"
export const PHONE2 = "242 393 9899"
export const TEL2 = "tel:+12423939899"
export const AFTER = "242 525 5729"
export const TEL_AFTER = "tel:+12425255729"
export const EMAIL = "cherylfoxferguson@live.com"
export const R = (f: string) => `https://www.cherylbahamastaxiandtours.com/Resources/${f}`
export const spring = { type: "spring", stiffness: 260, damping: 22, mass: 0.9 } as const
export const ease = [0.22, 1, 0.36, 1] as const

/* The name typed on the arrivals card travels with the visitor across pages. */
const KEY = "cheryl-sign-name"
export function useSignName(): [string, (v: string) => void] {
  const [name, setName] = useState("")
  useEffect(() => { try { const v = sessionStorage.getItem(KEY); if (v) setName(v) } catch { /* private mode */ } }, [])
  const set = (v: string) => { setName(v); try { sessionStorage.setItem(KEY, v) } catch { /* ignore */ } }
  return [name, set]
}

export function mailto(subject: string, lines: (string | false | undefined)[]) {
  const body = lines.filter(Boolean).join("\n")
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Photo({ src, alt, ratio, className = "", pos = "50% 50%", eager = false }: { src: string; alt: string; ratio: string; className?: string; pos?: string; eager?: boolean }) {
  return (
    <div className={`img-ph relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={e => { e.currentTarget.style.opacity = "0" }} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: pos }} />
    </div>
  )
}

export function Masthead({ dark = true }: { dark?: boolean }) {
  return (
    <header className={`relative z-10 ${dark ? "text-white" : "text-ink"}`}>
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-4 pt-5 sm:px-8 lg:pt-7">
        <a href="index.html" className="group flex items-baseline gap-3" aria-label="Cheryl's Bahamas Taxi and Tours, home">
          <span className="font-display text-[26px] font-extrabold tracking-[-0.04em]">cheryl's</span>
          <span className={`hidden text-[14px] sm:inline ${dark ? "text-white/75" : "text-muted"}`}>Bahamas Taxi and Tours, Nassau</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-6">
          <a href="index.html#pickup" className="hidden min-h-11 items-center font-bold md:inline-flex">Airport pickup</a>
          <a href="tours.html" className="hidden min-h-11 items-center font-bold md:inline-flex">Private tours</a>
          <a href={TEL} className="tnum inline-flex min-h-11 items-center gap-2 font-bold"><Phone className="size-4" strokeWidth={2.25} aria-hidden /><span>{PHONE}</span></a>
        </nav>
      </div>
    </header>
  )
}

/* N4: floating dock, bottom centre. Solid, no blur. */
export function Dock({ action }: { action: { href: string; label: string; onClick?: () => void } }) {
  return (
    <motion.nav aria-label="Quick links" initial={{ y: 90 }} animate={{ y: 0 }} transition={{ ...spring, delay: 0.9 }}
      className="fixed inset-x-0 bottom-0 z-[8000] flex justify-center px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 rounded-[18px] bg-ink p-1.5 text-white shadow-[0_14px_40px_-12px_rgba(15,34,51,.55)]">
        <a href="index.html#pickup" className="hidden min-h-12 items-center rounded-[12px] px-4 font-bold hover:bg-white/10 sm:inline-flex">Pickup</a>
        <a href="tours.html" className="inline-flex min-h-12 items-center rounded-[12px] px-4 font-bold hover:bg-white/10">Tours</a>
        <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-[12px] px-4 font-bold hover:bg-white/10"><Phone className="size-4" aria-hidden />Call</a>
        <a href={action.href} onClick={action.onClick} className="inline-flex min-h-12 items-center rounded-[12px] bg-yellow px-5 font-bold text-ink transition-transform active:scale-[.97]">{action.label}</a>
      </div>
    </motion.nav>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-deep text-white">
      <div className="mx-auto max-w-[1360px] px-4 pb-36 pt-24 sm:px-8 lg:pt-32">
        <h2 id="contact-title" className="poster max-w-[12ch] text-[length:var(--t-2)]">one number, day or night.</h2>
        <a href={TEL} className="poster tnum mt-8 inline-block whitespace-nowrap text-[clamp(2.3rem,8.4vw,8.4rem)] text-yellow transition-colors hover:text-white">{PHONE}</a>
        <p className="mt-4 max-w-[52ch] text-[length:var(--t-4)] leading-snug text-white/85">The same line rings in office hours and after them. Area code 1 (242) from abroad.</p>
        <div className="mt-16 grid gap-x-10 gap-y-10 border-t border-white/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-bold text-white">Office, 9am to 6pm, every day</h3>
            <p className="tnum mt-1 flex flex-col items-start text-white/80"><a className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-[6px] text-white" href={TEL}>{PHONE}</a><br /><a className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-[6px] text-white" href={TEL2}>{PHONE2}</a></p>
          </div>
          <div>
            <h3 className="font-bold text-white">All other times</h3>
            <p className="tnum mt-1 flex flex-col items-start text-white/80"><a className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-[6px] text-white" href={TEL}>{PHONE}</a><br /><a className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-[6px] text-white" href={TEL_AFTER}>{AFTER}</a></p>
          </div>
          <div>
            <h3 className="font-bold text-white">Bookings by email</h3>
            <p className="mt-1 break-all text-white/80"><a className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-[6px] text-white" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
          <div>
            <h3 className="font-bold text-white">Licensed and covered</h3>
            <p className="mt-2 text-white/80">Registered Taxi Service #1080. All major credit cards. Tours in English or Spanish.</p>
          </div>
        </div>
        <footer className="mt-20 flex flex-col gap-2 border-t border-white/20 pt-6 text-[14px] text-white/65 sm:flex-row sm:justify-between">
          <p>Cheryl's Bahamas Taxi and Tours, Nassau and Paradise Island, New Providence.</p>
          <p>TripAdvisor Travellers' Choice 2022. Photographs: Cheryl's Bahamas Taxi and Tours.</p>
        </footer>
      </div>
    </section>
  )
}

export function Page({ children }: { children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="skip">Skip to content</a>{children}</>)
}

export function mount(node: ReactNode) {
  const el = document.getElementById("root")!
  el.innerHTML = ""
  createRoot(el).render(node)
}
