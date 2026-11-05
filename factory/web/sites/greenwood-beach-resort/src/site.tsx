import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, Mail, Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "+1 242 808 1846"
export const TEL = "tel:+12428081846"
export const PHONE2 = "+1 242 342 3053"
export const TEL2 = "tel:+12423423053"
export const EMAIL = "info@greenwoodbeachresort.com"
export const BOOK = "https://direct-book.com/properties/greenwoodbeachresort"
export const IG = "https://www.instagram.com/greenwood.beach.resort/"
export const FB = "https://www.facebook.com/GreenwoodinCat242/"
export const IMG = "https://greenwoodbeachresort.com/wp-content/uploads/2026/08/"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV_L = [
  { href: "rooms.html", label: "Rooms" },
  { href: "index.html#water", label: "Dive and kite" },
  { href: "index.html#dining", label: "Dining" },
]
const NAV_R = [
  { href: "getting-here.html", label: "Getting here" },
  { href: "index.html#enquire", label: "Enquire" },
]
const NAV = [...NAV_L, ...NAV_R]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

function NavLink({ href, label, current }: { href: string; label: string; current: string }) {
  return <a href={href} className={`relative py-2 text-[15px] after:absolute after:bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-grape after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] ${current === label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{label}</a>
}

export function Wordmark() {
  return (
    <span className="block text-center leading-none">
      <span className="font-display text-[22px] tracking-[-0.01em] text-ink">Greenwood</span>
      <span className="mt-1 block text-[10px] tracking-[0.32em] text-muted uppercase">Beach Resort · Cat Island</span>
    </span>
  )
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 py-3 md:px-10">
        <nav aria-label="Main left" className="hidden items-center gap-7 lg:flex">{NAV_L.map(n => <NavLink key={n.href} {...n} current={current} />)}</nav>
        <span className="lg:hidden" />
        <a href="index.html" aria-label="Greenwood Beach Resort, home"><Wordmark /></a>
        <div className="flex items-center justify-end gap-7">
          <nav aria-label="Main right" className="hidden items-center gap-7 lg:flex">{NAV_R.map(n => <NavLink key={n.href} {...n} current={current} />)}</nav>
          <a href={BOOK} className="btn hidden lg:inline-flex">Check dates</a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>
                ))}
                <a href={BOOK} className="btn mt-8 justify-center py-4">Check dates and book</a>
                <a href={TEL} className="mt-3 text-center text-muted">or call {PHONE}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-grape" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-paper-2 pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <p className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none">Greenwood</p>
          <p className="mt-4 max-w-sm text-muted">1 Ocean Drive, Port Howe, Cat Island, The Bahamas. Hosted by Pauline and Antoine.</p>
        </div>
        <div className="text-[15px]">
          <p className="label text-grape">Reach the resort</p>
          <a href={TEL} className="mt-3 flex items-center gap-2 hover:text-grape"><Phone className="size-4" aria-hidden />{PHONE}</a>
          <a href={TEL2} className="mt-2 flex items-center gap-2 hover:text-grape"><Phone className="size-4" aria-hidden />{PHONE2}</a>
          <a href={`mailto:${EMAIL}`} className="mt-2 flex items-center gap-2 hover:text-grape"><Mail className="size-4" aria-hidden />{EMAIL}</a>
        </div>
        <div className="text-[15px]">
          <p className="label text-grape">Pages</p>
          {NAV.map(n => <a key={n.href} href={n.href} className="mt-2 block hover:text-grape">{n.label}</a>)}
          <div className="mt-4 flex gap-4">
            <a href={IG} className="group inline-flex items-center gap-1 hover:text-grape">Instagram <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={FB} className="group inline-flex items-center gap-1 hover:text-grape">Facebook <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
          </div>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-line px-5 py-6 text-xs text-muted md:px-10">Concept by ESTATIQ AI Solutions. Photographs from greenwoodbeachresort.com. Details to be confirmed with the resort.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={TEL} className="flex min-h-14 items-center justify-center gap-1.5 text-[15px]"><Phone className="size-4" aria-hidden />Call</a>
      <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-1.5 border-l border-line text-[15px]"><Mail className="size-4" aria-hidden />Email</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-grape text-[15px] text-paper">Check dates</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, delay, ease }}>
      {children}
    </motion.div>
  )
}

export function Mask({ src, alt, className = "", priority = false, w = 1024, h = 683 }: { src: string; alt: string; className?: string; priority?: boolean; w?: number; h?: number }) {
  return (
    <motion.div className={`group relative overflow-hidden bg-sand ${className}`} initial={{ clipPath: "inset(12% 12% 12% 12% round 2px)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2px)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.3, ease: reveal }}>
      <img src={src} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className="size-full object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
    </motion.div>
  )
}

export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`label ${light ? "text-conch" : "text-grape"}`}>{n && <span className="mr-3">{n}</span>}{children}</p>
}
