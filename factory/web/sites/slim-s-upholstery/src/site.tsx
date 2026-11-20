import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { MessageCircle, Phone } from "lucide-react"
import "./styles.css"

// Facts: Facebook and Instagram ("Call or WhatsApp 814-5451", "Appointments available"), Bahamas Index (verified listing:
// 21 Claridge Rd, 341-2149, Mon to Sat 9 to 5:30) and BahamasLocal (#21 Claridge Road, P.O. Box EE-16330, Saturday 10 to 3).
export const C = {
  name: "Slim Upholstery",
  phone: "(242) 814-5451", tel: "tel:+12428145451", wa: "12428145451",
  phone2: "(242) 341-2149", tel2: "tel:+12423412149",
  street: "#21 Claridge Road", town: "Nassau, New Providence",
  map: "https://www.google.com/maps/dir/?api=1&destination=25.0562032,-77.3292237",
  fb: "https://www.facebook.com/SlimUpholstery/", ig: "https://www.instagram.com/slimupholstery/", tt: "https://www.tiktok.com/@slimupholstery",
}
export const ease = [0.22, 1, 0.36, 1] as const
export const waLink = (text: string) => `https://wa.me/${C.wa}?text=${encodeURIComponent(text)}`
export const QUOTE_TEXT = "Hi Slim Upholstery, I would like a free quote. I can send photos of the piece."
// Illustrative photography generated for this concept (Lovable asset project), to be replaced with Slim's own project photos.
export const img = (n: string) => `https://ip-assets-slim-s-upholstery.lovable.app/assets/${n}.jpg`

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

const NAV = [
  { href: "index.html#layers", label: "The craft", key: "craft" },
  { href: "what-we-upholster.html", label: "What we upholster", key: "what" },
  { href: "index.html#visit", label: "Visit", key: "visit" },
]

/** N4: a floating dock at the bottom edge. On phones it appears once the hero (which carries the numbers) is passed. */
function Dock({ current }: { current: string }) {
  const { scrollY } = useScroll()
  const [shown, setShown] = useState(false)
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * 0.55
    if (next !== shown) setShown(next)
  })
  return (
    <nav aria-label="Main" className={`dock fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-500 ease-[var(--ease-soft)] md:translate-y-0 md:opacity-100 ${shown || current !== "home" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0 md:pointer-events-auto"}`}>
      <div className="flex w-full max-w-[820px] items-center gap-1 rounded-[22px] bg-cream p-[6px] pl-5 text-ink shadow-[0_0_0_1px_rgba(43,33,24,.1),0_18px_40px_-18px_rgba(43,33,24,.45)]">
        <a href="index.html" className="display mr-auto py-2 text-[1.15rem] tracking-[-0.01em]" aria-current={current === "home" ? "page" : undefined}>Slim Upholstery</a>
        {NAV.map((n) => (
          <a key={n.key} href={n.href} aria-current={current === n.key ? "page" : undefined} className="hidden min-h-[44px] items-center rounded-[16px] px-3.5 text-[0.9rem] text-ink/75 transition-colors hover:bg-cream-2 hover:text-ink md:inline-flex aria-[current=page]:font-bold aria-[current=page]:text-ink">{n.label}</a>
        ))}
        <a href={C.tel} className="inline-flex size-[44px] items-center justify-center rounded-[16px] text-ink hover:bg-cream-2 md:hidden" aria-label={`Call ${C.phone}`}><Phone className="size-[18px]" strokeWidth={1.75} aria-hidden /></a>
        <a href={waLink(QUOTE_TEXT)} className="inline-flex min-h-[44px] items-center gap-2 rounded-[16px] bg-navy px-4 text-[0.9rem] font-bold text-cream transition-colors hover:bg-navy-deep">
          <MessageCircle className="size-[17px]" strokeWidth={1.9} aria-hidden /> Free quote
        </a>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="bg-cream px-5 pb-36 pt-16 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="stitch w-full text-line" aria-hidden />
        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-5">
              <img src="https://www.bahamaslocal.com/img/users/sz1_QOAmFQ.jpg" alt="Slim Upholstery logo, with the words one stitch at a time" width={88} height={88} loading="lazy" data-source="own" className="size-[88px] rounded-full bg-white object-contain p-1.5" />
              <p className="display text-[2rem]">Slim Upholstery</p>
            </div>
            <p className="mt-2 max-w-[26rem] text-muted">Home, auto, marine, aircraft and church upholstery, one stitch at a time.</p>
          </div>
          <div className="t-small leading-7">
            <p>{C.street}<br />{C.town}<br />P.O. Box EE-16330</p>
          </div>
          <div className="t-small leading-7">
            <p className="tnum"><a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={C.tel}>{C.phone}</a> call or WhatsApp<br /><a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={C.tel2}>{C.phone2}</a> shop line</p>
            <p className="mt-3 flex gap-4"><a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={C.fb}>Facebook</a><a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={C.ig}>Instagram</a><a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={C.tt}>TikTok</a></p>
          </div>
        </div>
        <p className="t-cap mt-14 text-ink/75">Photographs on this concept are illustrative, made for the preview, and would be replaced with Slim Upholstery's own project photos.</p>
      </div>
    </footer>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <main id="main">{children}</main>
      <Footer />
      <Dock current={current} />
    </>
  )
}

/** A photograph with a reserved, tinted box (no layout shift) that fades in once decoded. */
export function Photo({ src, alt, className = "", sizes, priority = false, style }: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src} alt={alt} sizes={sizes} decoding="async" loading={priority ? "eager" : "lazy"}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      data-source="generated"
      onLoad={() => setLoaded(true)}
      ref={(el) => { if (el && el.complete && el.naturalWidth) setLoaded(true) }}
      className={`ph object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      style={style}
    />
  )
}

export { AnimatePresence, motion }
export function mount(node: ReactNode) { createRoot(document.getElementById("root")!).render(node) }
