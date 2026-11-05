import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "242-367-4000"
export const TEL = "tel:+12423674000"
export const PHONE_2 = "242-577-7000"
export const TEL_2 = "tel:+12425777000"
export const EMAIL = "info@conchinn.com"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const W = "https://static.wixstatic.com/media/"
export const IMG = {
  banner: W + "21c3e0_9d42be5dced64df7b10fd0ccedf396fa~mv2.jpg/v1/fill/w_1600,h_527,al_c,q_85,enc_avif,quality_auto/21c3e0_9d42be5dced64df7b10fd0ccedf396fa~mv2.jpg",
  marina: W + "21c3e0_89587c3dc79247f6a6952532ee1ae5c6~mv2.jpg/v1/fill/w_953,h_680,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/21c3e0_89587c3dc79247f6a6952532ee1ae5c6~mv2.jpg",
  snappas: W + "21c3e0_b0563f098d4c4f92878f4d0645cfa39f~mv2.jpg/v1/fill/w_953,h_680,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/21c3e0_b0563f098d4c4f92878f4d0645cfa39f~mv2.jpg",
  presidential: W + "21c3e0_fb0d9e48c19347ceb6c230865cfee45b~mv2.jpg/v1/fill/w_953,h_660,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/21c3e0_fb0d9e48c19347ceb6c230865cfee45b~mv2.jpg",
  queen: W + "21c3e0_323212dac45d4f2c84f8614002598d35~mv2.jpg/v1/fill/w_953,h_600,al_bl,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/21c3e0_323212dac45d4f2c84f8614002598d35~mv2.jpg",
  king: W + "21c3e0_057d7512f1a2464d9a8b8e2f7cd3f6f5~mv2.jpg/v1/fill/w_953,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/21c3e0_057d7512f1a2464d9a8b8e2f7cd3f6f5~mv2.jpg",
  suite: W + "21c3e0_820f47f220674575a6d1d07fae6423c1~mv2.jpg/v1/fill/w_953,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/21c3e0_820f47f220674575a6d1d07fae6423c1~mv2.jpg",
  dockA: W + "21c3e0_6bc5d55e3a464530832e1339c60d2447~mv2.jpeg/v1/fit/w_960,h_640,q_90,enc_avif,quality_auto/21c3e0_6bc5d55e3a464530832e1339c60d2447~mv2.jpeg",
  dockB: W + "21c3e0_2b075a4e7668413aae83b5a27f937016~mv2.jpeg/v1/fit/w_960,h_640,q_90,enc_avif,quality_auto/21c3e0_2b075a4e7668413aae83b5a27f937016~mv2.jpeg",
  dockC: W + "21c3e0_a69feb0cb2bd4a42a56bead9f4b124d7~mv2.jpeg/v1/fit/w_960,h_640,q_90,enc_avif,quality_auto/21c3e0_a69feb0cb2bd4a42a56bead9f4b124d7~mv2.jpeg",
}

const NAV = [
  { href: "marina.html", label: "Marina" },
  { href: "rooms.html", label: "Rooms" },
  { href: "index.html#ashore", label: "Ashore" },
  { href: "index.html#contact", label: "Contact" },
]

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

function Wordmark() {
  return (
    <a href="index.html" className="group flex items-baseline gap-2 leading-none" aria-label="The Conch Inn & Marina, home">
      <span className="font-display text-[1.5rem] tracking-[-0.01em]">Conch Inn</span>
      <span className="font-display text-[1.05rem] italic text-harbour">&amp; Marina</span>
    </a>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "is-current" : ""}`}>{n.label}</a>
          ))}
          <span className="h-5 w-px bg-line" aria-hidden />
          <a href={TEL} className="ulink text-[15px] tabular-nums">{PHONE}</a>
          <a href="index.html#enquire" className="btn btn-primary">Request a slip</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={TEL} aria-label={`Call the office on ${PHONE}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line transition hover:border-ink"><Phone className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2.1rem]">{n.label}</motion.a>
                ))}
                <a href="index.html#enquire" onClick={() => setOpen(false)} className="btn btn-primary mt-8 justify-center">Request a slip</a>
                <a href={TEL} className="mt-4 text-center text-[15px] text-muted">Office {PHONE} · VHF 16</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-harbour" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2 pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-[2rem] leading-none">The Conch Inn &amp; Marina</p>
          <p className="mt-4 max-w-sm text-[15px] text-muted">700 Bay Street, Marsh Harbour, Abaco, The Bahamas. A family-run inn and marina, open since 1972.</p>
        </div>
        <div className="text-[15px] md:col-span-3">
          <p className="label text-muted">Office, daily 8:00am to 5:30pm</p>
          <a href={TEL} className="ulink mt-3 inline-block">Tel {PHONE}</a><br />
          <a href={TEL_2} className="ulink mt-1 inline-block">Alt {PHONE_2}</a><br />
          <a href={`mailto:${EMAIL}`} className="ulink mt-1 inline-block">{EMAIL}</a>
          <p className="mt-1 text-muted">VHF channel 16</p>
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-muted">Pages</p>
          {[{ href: "index.html", label: "Home" }, ...NAV].map(n => <a key={n.href} href={n.href} className="ulink mt-3 block w-fit">{n.label}</a>)}
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-muted">On the property</p>
          <a href="https://snappasbarandgrill.com/" className="ulink mt-3 block w-fit">Snappas Bar &amp; Grill</a>
          <a href="https://renudayspabahamas.com/" className="ulink mt-3 block w-fit">Renu Day Spa</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Photographs from conchinn.com. Details from conchinn.com and public marina listings, to be confirmed with the inn.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call office</a>
      <a href="index.html#enquire" className="flex min-h-14 items-center justify-center bg-ink text-[15px] text-paper">Request a slip or room</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Label({ n, children, className = "" }: { n?: string; children: ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{n && <span className="tabular-nums">{n}</span>}{n && <span className="mx-2 inline-block h-px w-6 translate-y-[-3px] bg-current opacity-50" aria-hidden />}{children}</p>
}

export function MaskImg({ src, alt, className = "", w, h, priority = false }: { src: string; alt: string; className?: string; w: number; h: number; priority?: boolean }) {
  return (
    <motion.div className={`overflow-hidden ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-5% 0px" }} transition={{ duration: 1.2, ease: reveal }}>
      <img src={src} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className="size-full object-cover transition duration-700 ease-out hover:scale-[1.03]" />
    </motion.div>
  )
}
