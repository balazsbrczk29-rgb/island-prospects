import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Mail } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "+1 (242) 366-0145"
export const TEL = "tel:+12423660145"
export const EMAIL = "info@fireflysunsetresort.com"
export const DINNER = "https://firefly-sunset-resort.tablein.com/"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const D = "https://le-de.cdn-website.com/2d4998284dab4ddea002e9199a7f7b5f/dms3rep/multi/opt/"
const f = (n: string) => `${D}Firefly+Sunset+Resort-${n}-1920w.jpg?jxl&v=jxl`
export const IMG = {
  plunge: f("189"),
  upperPool: f("099"),
  dining: f("125"),
  events: `${D}34F30966-CB7D-4421-BED0-41CE6532FE7D-1920w.jpeg?jxl&v=jxl`,
  map: `${D}36D7B760-0DF1-438F-A61C-F0D70ECC2B3C-1920w.jpeg?jxl&v=jxl`,
  g001: f("001"), g014: f("014"), g018: f("018"), g029: f("029-bdfaca7f"), g074: f("074-fac075b2"), g077: f("077"),
  g114: f("114"), g122: f("122-bd5decf7"), g123: f("123"), g124: f("124-857cf354"), g126: f("126"), g127: f("127-bc40ecc6"),
  g128: f("128"), g136: f("136"), g165: f("165"), g171: f("171"), g178: f("178"), g183: f("183"), g185: f("185"),
}

const NAV = [
  { href: "villas.html", label: "Villas" },
  { href: "restaurant.html", label: "Bar & Grill" },
  { href: "index.html#resort", label: "The resort" },
  { href: "index.html#getting-here", label: "Getting here" },
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

function Mark() {
  return (
    <a href="index.html" className="group flex items-center gap-3 leading-none" aria-label="Firefly Sunset Resort, home">
      <span className="relative inline-block size-2.5 rounded-full bg-glow shadow-[0_0_14px_4px_rgba(242,213,122,.75)] transition group-hover:shadow-[0_0_20px_7px_rgba(242,213,122,.85)]" aria-hidden />
      <span>
        <span className="block font-display text-[1.55rem] tracking-[0.02em]">Firefly Sunset</span>
        <span className="label mt-0.5 hidden !text-[10px] text-muted sm:block">Resort · Hope Town, Elbow Cay</span>
      </span>
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
        <Mark />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "is-current" : ""}`}>{n.label}</a>)}
          <a href={DINNER} className="btn btn-quiet">Reserve dinner</a>
          <a href="index.html#enquire" className="btn btn-primary">Request a villa</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={`mailto:${EMAIL}`} aria-label="Email the resort" className="inline-flex size-11 items-center justify-center rounded-full border border-line"><Mail className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2.2rem]">{n.label}</motion.a>)}
                <a href="index.html#enquire" onClick={() => setOpen(false)} className="btn btn-primary mt-8 justify-center">Request a villa</a>
                <a href={DINNER} className="btn btn-quiet mt-3 justify-center">Reserve dinner</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-sea" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-dusk pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none">Firefly Sunset Resort</p>
          <p className="mt-4 max-w-sm text-[15px] text-paper/70">Centre Line Road, Elbow Cay, Hope Town, Abaco, The Bahamas. On the Sea of Abaco.</p>
        </div>
        <div className="text-[15px] md:col-span-3">
          <p className="label text-glow">Villas and restaurant</p>
          <a href={`mailto:${EMAIL}`} className="ulink mt-3 inline-block break-all">{EMAIL}</a><br />
          <a href={TEL} className="ulink mt-1 inline-block">{PHONE}</a>
          <p className="mt-1 text-paper/60">If island power takes the phones down, email.</p>
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-glow">Pages</p>
          {[{ href: "index.html", label: "Home" }, ...NAV].map(n => <a key={n.href} href={n.href} className="ulink mt-3 block w-fit">{n.label}</a>)}
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-glow">Follow</p>
          <a href="https://instagram.com/fireflysunsetresort" className="ulink mt-3 block w-fit">Instagram</a>
          <a href="https://facebook.com/fireflysunsetresort.com" className="ulink mt-3 block w-fit">Facebook</a>
          <a href="https://www.tiktok.com/@fireflysunsetresort" className="ulink mt-3 block w-fit">TikTok</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photographs and details from fireflysunsetresort.com, to be confirmed with the resort.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={DINNER} className="flex min-h-14 items-center justify-center text-[15px]">Reserve dinner</a>
      <a href="index.html#enquire" className="flex min-h-14 items-center justify-center bg-sea text-[15px] text-paper">Request a villa</a>
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
  return <p className={`label flex items-center gap-3 ${className}`}>{n && <span className="tabular-nums">{n}</span>}{n && <span className="h-px w-8 bg-current opacity-40" aria-hidden />}<span>{children}</span></p>
}

export function Photo({ src, alt, className = "", w = 1920, h = 1280, priority = false }: { src: string; alt: string; className?: string; w?: number; h?: number; priority?: boolean }) {
  return (
    <motion.div className={`overflow-hidden ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-5% 0px" }} transition={{ duration: 1.2, ease: reveal }}>
      <img src={src} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className="size-full object-cover transition duration-700 ease-out hover:scale-[1.03]" />
    </motion.div>
  )
}
