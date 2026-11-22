import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import "./styles.css"

/* ---------- sourced facts (greenwoodbeachresort.com, direct-book.com contact page) ---------- */
export const WHATSAPP = "+1 242 808 1846"
export const WA = "https://wa.me/12428081846"
export const TEL = "tel:+12428081846"
export const PHONE2 = "+1 242 342 3053"
export const TEL2 = "tel:+12423423053"
export const EMAIL = "info@greenwoodbeachresort.com"
export const BOOK = "https://direct-book.com/properties/greenwoodbeachresort"
export const IG = "https://www.instagram.com/greenwood.beach.resort/"
export const FB = "https://www.facebook.com/GreenwoodinCat242/"
export const MAP = "https://www.google.com/maps/search/?api=1&query=24.1903379,-75.3129993"
const U = "https://greenwoodbeachresort.com/wp-content/uploads/2026/08/"
export const IMG = {
  kiteLesson: { src: U + "Kite-course-wind-window-1024x683.jpg", fallback: U + "Kite-course-wind-window-768x512.jpg", ratio: 1.5, pos: "50% 14%", posM: "16% 50%" },
  kiteRide: { src: U + "DSCF5316-2-1024x683.jpg", ratio: 1.5, pos: "50% 45%", posM: "62% 50%" },
  whitetipSurface: { src: U + "Surface-1024x683.jpg", ratio: 1.5 },
  whitetipDeep: { src: U + "Oceanic-White-tip_CatIsland_BAHAMAS_Pauline-VazBranco3-1024x683.jpg", ratio: 1.5 },
  whitetipPilots: { src: U + "OWT-May-2023-@GreenwoodBeachResort-1024x576.jpg", ratio: 1.78 },
  snorkel: { src: U + "Snorkel-trip-1024x672.jpg", ratio: 1.52 },
  terrace: { src: U + "Greenwood-Beach-Resort-Terasse-Restaurant-768x531.jpg", ratio: 1.45 },
  crabs: { src: U + "Local-Crabs-1-of-1-e1786812753461-768x550.jpg", ratio: 1.4 },
  roomFamily: { src: U + "Cat-Island-Greenwood-room-1024x683.jpg", ratio: 1.5 },
  roomKing: { src: U + "King-size-AC-room-1-of-1-scaled-e1786570117617-1024x623.jpg", ratio: 1.64 },
  hosts: { src: U + "01-Cat-Island-Pauline-et-Antoine-1024x682.jpg", ratio: 1.5, pos: "50% 36%", posM: "64% 45%" },
  poolDive: { src: U + "GOPR7892-768x576.jpg", ratio: 1.33 },
  reefDivers: { src: U + "The-nursery-Dive-site-768x473.jpg", ratio: 1.62 },
}
/** Native pixel width, read from the WordPress size suffix in the file name. */
export const nativeW = (img: { src: string }) => { const m = img.src.match(/-(\d+)x\d+\.(?:jpe?g|png|webp)$/); return m ? +m[1] : 1024 }
export type Img = { src: string; fallback?: string; ratio: number; pos?: string; posM?: string }

export const ROOMS = [
  {
    id: "king", name: "Executive King Room", guests: 2, beds: "One king-size bed", roomTypeId: "367604",
    line: "For two. One king-size bed and a private bathroom, in the garden a few steps from the sand.", short: "One king",
    img: IMG.roomKing, alt: "The Executive King Room at Greenwood Beach Resort",
  },
  {
    id: "family", name: "Executive Family Room", guests: 3, beds: "One king-size bed and one single", roomTypeId: "367936",
    line: "For up to three. A king-size bed, a single and a private bathroom, in the garden by the beach.", short: "King and single",
    img: IMG.roomFamily, alt: "The Executive Family Room at Greenwood Beach Resort",
  },
] as const

/** Their own booking engine (direct-book.com), opened with the dates the guest picked. Params as used on their rooms page. */
export function bookingUrl(o: { roomTypeId?: string; arrive?: string; nights?: number; adults?: number }) {
  if (!o.arrive) return BOOK
  const a = new Date(o.arrive + "T12:00:00")
  const d = new Date(a.getTime() + (o.nights ?? 3) * 864e5)
  const iso = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`
  const q = new URLSearchParams({ currency: "USD", checkInDate: iso(a), checkOutDate: iso(d), "items[0][adults]": String(o.adults ?? 2), "items[0][children]": "0", "items[0][infants]": "0" })
  if (o.roomTypeId) { q.set("roomTypeId", o.roomTypeId); q.set("rateId", "749316") }
  return `${BOOK}?${q.toString()}`
}

export const ease = [0.22, 1, 0.36, 1] as const

/* ---------- photo with reserved space, tinted placeholder and a fallback size ---------- */
export function Photo({ img, alt, className = "", eager = false, style }: { img: Img; alt: string; className?: string; eager?: boolean; style?: React.CSSProperties }) {
  const [src, setSrc] = useState(img.src)
  const m = img.src.match(/-(\d+)x(\d+)\.(?:jpe?g|png|webp)$/)
  return (
    <div className={`photo ${className}`} style={{ ...style, ...(img.pos ? { ["--pos" as string]: img.pos } : {}), ...(img.posM ? { ["--pos-m" as string]: img.posM } : {}) }}>
      <img src={src} alt={alt} width={m ? +m[1] : undefined} height={m ? +m[2] : undefined} loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : "auto"}
        onError={() => { if (img.fallback && src !== img.fallback) setSrc(img.fallback) }} />
    </div>
  )
}

function useLenis() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

/* ---------- navigation: one word, "Menu", opening the chapter list (N3) ---------- */
const MENU = [
  { href: "index.html#film", label: "A day at Port Howe", img: IMG.kiteRide, alt: "Kitesurfer on the water" },
  { href: "rooms.html", label: "Rooms", img: IMG.roomKing, alt: "Executive King Room" },
  { href: "index.html#whitetips", label: "Whitetip season", img: IMG.whitetipDeep, alt: "Oceanic whitetip shark" },
  { href: "getting-here.html", label: "Getting here", img: IMG.poolDive, alt: "Greenwood's pool and garden" },
  { href: "#contact", label: "Contact", img: IMG.hosts, alt: "Pauline and Antoine on the beach" },
]

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="index.html" className={`flex min-h-11 items-center gap-3 ${className}`} aria-label="Greenwood Beach Resort, home">
      <span className="display text-[26px] leading-none tracking-[-0.02em]">Greenwood</span>
      <span className="hidden text-[length:var(--t-xs)] italic text-muted sm:inline">Beach Resort, Cat Island</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-ground" style={{ height: "var(--bar)" }}>
      <div className="flex h-full items-center justify-between px-[var(--gutter)]">
        <Wordmark />
        <div className="flex items-center gap-6">
          <a href="index.html#dates" className="link hidden text-[length:var(--t-sm)] md:inline">Check dates</a>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="group flex min-h-11 items-center gap-3 text-[length:var(--t-sm)]">
              <span>Menu</span>
              <span aria-hidden className="flex w-6 flex-col gap-[5px]"><span className="h-px w-full bg-ink transition-transform duration-300 group-hover:translate-x-1" /><span className="h-px w-full bg-ink" /></span>
            </Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Content forceMount asChild aria-describedby={undefined}>
                    <motion.div className="fixed inset-0 z-50 overflow-y-auto bg-ground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
                      <Dialog.Title className="sr-only">Menu</Dialog.Title>
                      <div className="flex items-center justify-between px-[var(--gutter)]" style={{ height: "var(--bar)" }}>
                        <Wordmark />
                        <Dialog.Close className="flex min-h-11 items-center gap-3 text-[length:var(--t-sm)]">Close <span aria-hidden className="relative block size-5"><span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-ink" /><span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-ink" /></span></Dialog.Close>
                      </div>
                      <nav aria-label="Main" className="px-[var(--gutter)] pt-6 pb-16 md:pt-12">
                        <ul className="grid gap-1">
                          {MENU.map((m, i) => (
                            <motion.li key={m.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.045, duration: 0.6, ease }}>
                              <a href={m.href} onClick={() => setOpen(false)} className="group grid grid-cols-[88px_1fr] items-center gap-5 border-b border-line py-4 md:grid-cols-[160px_1fr] md:gap-10">
                                <Photo img={m.img} alt="" className="aspect-[3/2] w-full" />
                                <span className="display text-[clamp(34px,5.4vw,80px)] transition-transform duration-500 ease-[var(--ease-film)] group-hover:translate-x-2">{m.label}</span>
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                        <div className="mt-10 flex flex-col gap-4 text-[length:var(--t-sm)] md:flex-row md:items-center md:gap-10">
                          <a href={BOOK} className="btn self-start">Check dates and book</a>
                          <a href={WA} className="link num self-start">WhatsApp {WHATSAPP}</a>
                          <a href={`mailto:${EMAIL}`} className="link inline-flex min-h-11 items-center self-start break-all">{EMAIL}</a>
                        </div>
                      </nav>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}

/* ---------- phones only: one teal booking bar in the safe area, hidden on the first screen and at the footer ---------- */
function MobileBookBar() {
  const { scrollY } = useScroll()
  const [shown, setShown] = useState(false)
  // discrete state only: the bar flips when it crosses a threshold, never per frame
  useMotionValueEvent(scrollY, "change", (v) => {
    const end = document.documentElement.scrollHeight - window.innerHeight * 2.4
    const s = v > window.innerHeight * 0.85 && v < end
    if (s !== shown) setShown(s)
  })
  useEffect(() => {
    // the concept tag rises above the bar only while the bar is on screen
    document.documentElement.style.setProperty("--concept-offset", shown && matchMedia("(max-width: 767px)").matches ? "56px" : "0px")
  }, [shown])
  return (
    <div aria-hidden={!shown} className={`fixed inset-x-0 bottom-0 z-30 bg-glass pb-[env(safe-area-inset-bottom)] text-on-glass transition-transform duration-300 ease-[var(--ease-film)] md:hidden ${shown ? "translate-y-0" : "pointer-events-none translate-y-[110%]"}`}>
      <div className="flex h-14 items-stretch">
        <a href="index.html#dates" className="flex flex-1 items-center justify-center text-[length:var(--t-sm)] font-medium">Check dates and book</a>
        <a href={WA} className="flex items-center border-l border-on-glass/30 px-5 text-[length:var(--t-sm)]">WhatsApp</a>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-ground px-[var(--gutter)] pt-[var(--s-16)] pb-[calc(var(--s-12)+env(safe-area-inset-bottom))]">
      <div className="grid gap-12 border-t border-ink pt-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="display text-[length:var(--t-2xl)]">Ask about your dates.</p>
          <p className="mt-5 max-w-sm text-muted">Pauline and Antoine answer by WhatsApp and email. For live availability and rates, use the booking page.</p>
          <a href="index.html#dates" className="btn mt-8">Check dates and book</a>
        </div>
        <address className="grid content-start gap-6 not-italic md:col-span-3 md:col-start-7">
          <a href={WA} className="num text-[length:var(--t-lg)]"><span className="block text-[length:var(--t-xs)] italic text-muted">WhatsApp</span>{WHATSAPP}</a>
          <a href={TEL2} className="num text-[length:var(--t-lg)]"><span className="block text-[length:var(--t-xs)] italic text-muted">Telephone</span>{PHONE2}</a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center text-[length:var(--t-lg)] break-all">{EMAIL}</a>
        </address>
        <div className="grid content-start gap-6 md:col-span-3">
          <a href={MAP} className="text-[length:var(--t-lg)]">1 Ocean Drive<br />Port Howe, Cat Island<br />The Bahamas</a>
          <p className="flex gap-6 text-[length:var(--t-sm)]"><a href={IG} className="link">Instagram</a><a href={FB} className="link">Facebook</a></p>
        </div>
      </div>
      <p className="mt-16 max-w-3xl text-[length:var(--t-xs)] text-muted">Photographs: Greenwood Beach Resort and Pauline Vaz Branco, from greenwoodbeachresort.com. Concept preview by ESTATIQ AI Solutions; not the official website.</p>
    </footer>
  )
}

export function Page({ children }: { children: ReactNode }) {
  useLenis()
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ground focus:p-3">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileBookBar />
    </>
  )
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}
