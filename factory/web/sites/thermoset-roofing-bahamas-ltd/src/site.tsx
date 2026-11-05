import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// Contacts as published on thermosetroofing242.com (footer).
export const C = {
  office: "(242) 328-7017", officeTel: "tel:+12423287017",
  gm: { name: "Croix Culmer", role: "General Manager", email: "croix.culmer@thermosetroofing242.com", cell: "(242) 525-7326", tel: "tel:+12425257326" },
  owner: { name: "Stuart Culmer", role: "Owner and President", email: "stuart.culmer@thermosetroofing242.com", cell: "(242) 422-4923", tel: "tel:+12424224923" },
  address: "7 Portago Road, Oakesfield, Nassau", box: "P.O. Box SP-63997",
  fb: "https://www.facebook.com/thermosetroofing242", ig: "https://www.instagram.com/thermosetroofing242", tt: "https://www.tiktok.com/@thermosetroofing242",
}
const SQ = "https://images.squarespace-cdn.com/content/v1/685164f5603a7f2c27ad6720/"
// Job-site photos hotlinked verbatim from thermosetroofing242.com
export const IMG = {
  membrane: SQ + "30e95db4-7162-4a03-afe2-feede133298a/IMG_4711.jpeg",
  scaffold: SQ + "8f25b357-e661-4cb8-8f69-d30fd36857d1/IMG_4719.jpeg",
  waterproof: SQ + "73e36bd3-582d-4ed1-8a4e-47635d9aa4ad/IMG_8670.jpeg",
  maintenance: SQ + "63931fc6-e57c-4101-afbf-8ab5dce20cad/IMG_4723.jpeg",
  construction: SQ + "25e12ffd-84e2-4780-a822-d6b9ccf08728/IMG_7262.JPG",
  hero2: SQ + "2c132234-ef75-4633-93aa-a3ab3b043533/a827c3e8-ae10-4bb1-97b9-1a8100b023d7.jpeg",
  crew: SQ + "3fd21fc3-d414-4ad4-8aa3-4e43ec25d640/PHOTO-2025-06-23-13-59-54.jpg",
  job1: SQ + "9b3a63b1-7e7e-461e-9e24-86315e18cf93/IMG_4897.jpg",
  job2: SQ + "a9b9b455-9dc1-414b-9b16-def07cfbaecd/IMG_4903.jpeg",
  job3: SQ + "f4ed6fe0-8479-4c11-b50b-d0fc2b0094c1/IMG_4904.jpeg",
}
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "index.html#systems", label: "Roof systems" },
  { href: "services.html", label: "Services" },
  { href: "index.html#clients", label: "Clients" },
  { href: "index.html#estimate", label: "Free estimate" },
]

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function Mark({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 64 40" className={className} aria-hidden><path d="M4 26 L32 6 L60 26" fill="none" stroke="currentColor" strokeWidth="5" /><rect x="12" y="30" width="40" height="3.5" fill="#1f5e8c" /><rect x="12" y="36" width="40" height="3.5" fill="#c8d64b" /></svg>
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="flex items-center gap-3" aria-label="Thermoset Roofing Bahamas, home">
          <Mark className="h-8 w-12 text-ink" />
          <span className="leading-none"><span className="block font-display text-[1.15rem] font-extrabold tracking-tight">Thermoset Roofing</span><span className="mt-1 block font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase">Bahamas Ltd · since 2002</span></span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-steel after:transition-transform after:duration-300 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href="index.html#estimate" className="inline-flex min-h-11 items-center bg-ink px-5 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:bg-steel">Request a free estimate</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.45, ease }} className="border-b border-line py-4 font-display text-3xl font-extrabold tracking-tight">{n.label}</motion.a>)}
              <a href={C.officeTel} className="mt-8 bg-ink py-4 text-center text-white">Call the office {C.office}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-[3px] origin-left bg-vis" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-10">
        <div><Mark className="h-10 w-16 text-white" /><p className="mt-4 font-display text-xl font-extrabold">Thermoset Roofing Bahamas Ltd.</p><p className="mt-2 max-w-xs text-[15px] text-white/65">100% Bahamian owned. Roofing, waterproofing and construction since 2002.</p>
          <div className="mt-5 flex gap-5 text-[14px]"><a href={C.fb} className="hover:text-vis">Facebook</a><a href={C.ig} className="hover:text-vis">Instagram</a><a href={C.tt} className="hover:text-vis">TikTok</a></div></div>
        <div className="text-[15px]"><p className="font-mono text-[11px] tracking-[0.14em] text-vis uppercase">Office</p><a href={C.officeTel} className="mt-3 block font-display text-2xl font-bold hover:text-vis">{C.office}</a><p className="mt-2 text-white/65">{C.address}</p><p className="text-white/45">{C.box}</p></div>
        {[C.gm, C.owner].map(p => (
          <div key={p.name} className="text-[15px]"><p className="font-mono text-[11px] tracking-[0.14em] text-vis uppercase">{p.role}</p><p className="mt-3 font-semibold">{p.name}</p><a href={p.tel} className="mt-1 block text-white/75 hover:text-white">{p.cell}</a><a href={`mailto:${p.email}`} className="mt-1 block break-all text-white/75 hover:text-white">{p.email}</a></div>
        ))}
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-white/10 px-5 py-6 text-[12px] text-white/45 md:px-10">Concept by ESTATIQ AI Solutions. Photography and details from thermosetroofing242.com, to be confirmed with Thermoset.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={C.officeTel} className="flex min-h-16 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call office</a>
      <a href="index.html#estimate" className="flex min-h-16 items-center justify-center bg-ink text-[15px] font-semibold text-white">Free estimate</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.85, delay, ease }}>{children}</motion.div>
}
export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`font-mono text-[11.5px] tracking-[0.16em] uppercase ${light ? "text-vis" : "text-steel"}`}>{n && <span className="mr-3">{n} /</span>}{children}</p>
}
export function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <motion.div className={`overflow-hidden bg-paper-2 ${className}`} initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1.2, ease: reveal }}>
      <img src={src} alt={alt} width={1500} height={1000} loading={priority ? "eager" : "lazy"} {...(priority ? { fetchPriority: "high" as const } : {})} className="size-full object-cover transition duration-700 hover:scale-[1.03]" />
    </motion.div>
  )
}
