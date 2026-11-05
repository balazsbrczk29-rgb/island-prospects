import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// Address and telephone as published by Lex Mundi and the Bahamas Financial Services Board for the firm.
export const C = { phone: "+1 242 502 9750", tel: "tel:+12425029750", address: "Mareva House, 4 George Street, Nassau", box: "P.O. Box N-3937" }
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const
const NAV = [
  { href: "practice-groups.html", label: "Practice groups" },
  { href: "index.html#history", label: "Since 1945" },
  { href: "index.html#lex-mundi", label: "Lex Mundi" },
  { href: "index.html#offices", label: "Offices" },
]
function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}
export function Rings({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 40 40" className={className} aria-hidden><circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
}
function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-10">
        <a href="index.html" className="flex items-center gap-3" aria-label="McKinney, Bancroft & Hughes, home">
          <Rings className="size-9 text-brass" />
          <span className="font-display text-[1.25rem] tracking-[0.01em]">McKinney, Bancroft <span className="italic">&amp;</span> Hughes</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[14px] tracking-[0.02em] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-brass after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>)}
          <a href="index.html#consult" className="inline-flex min-h-11 items-center border border-green px-5 text-[14px] text-green transition hover:bg-green hover:text-ivory">Arrange a consultation</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-ivory sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.45, ease }} className="border-b border-line py-4 font-display text-3xl">{n.label}</motion.a>)}
              <a href={C.tel} className="mt-8 bg-green py-4 text-center text-ivory">Call {C.phone}</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-brass" aria-hidden />
    </header>
  )
}
function Footer() {
  return (
    <footer className="bg-green-deep text-ivory">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div><Rings className="size-10 text-brass" /><p className="mt-4 font-display text-2xl">McKinney, Bancroft &amp; Hughes</p><p className="mt-2 max-w-sm text-[15px] text-ivory/65">Established 1945. The Bahamas member firm of Lex Mundi. Offices in Nassau, Lyford Cay and Freeport.</p></div>
        <div className="text-[15px]"><p className="text-[11px] tracking-[0.22em] text-brass uppercase">Nassau</p><p className="mt-3">{C.address}</p><p className="text-ivory/60">{C.box}</p><a href={C.tel} className="mt-2 block hover:text-brass">{C.phone}</a></div>
        <div className="text-[15px]"><p className="text-[11px] tracking-[0.22em] text-brass uppercase">Also in</p><p className="mt-3">Lyford Cay, Western New Providence</p><p>Freeport, Grand Bahama</p></div>
      </div>
      <p className="mx-auto max-w-[1400px] border-t border-ivory/10 px-5 py-6 text-[12px] text-ivory/45 md:px-10">Concept by ESTATIQ AI Solutions. Details from mckinney.com.bs and public directories, to be confirmed with the firm. Nothing on this page is legal advice.</p>
    </footer>
  )
}
function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] border-t border-line bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={C.tel} className="flex min-h-16 items-center justify-center gap-2 text-[15px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href="index.html#consult" className="flex min-h-16 items-center justify-center bg-green text-[15px] text-ivory">Arrange a consultation</a>
    </nav>
  )
}
export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-ivory focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}
export function mount(node: ReactNode) { document.documentElement.classList.add("js-anim"); createRoot(document.getElementById("root")!).render(node) }
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, delay, ease }}>{children}</motion.div>
}
export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`text-[11px] tracking-[0.24em] uppercase ${light ? "text-brass" : "text-green"}`}>{n && <span className="mr-4 font-display text-[13px] tracking-normal text-brass italic">{n}</span>}{children}</p>
}
export const GROUPS: [string, string][] = [
  ["Admiralty, Shipping & Aviation", "Ships, yachts and aircraft"],
  ["Competition Law", "Markets and fair competition"],
  ["Corporate & Commercial Transactions", "Companies, deals and contracts"],
  ["Family Law", "Families and personal matters"],
  ["Financial Services & Regulation", "Banks, funds and regulated business"],
  ["Foreign & Local Investment", "Investing in The Bahamas"],
  ["Immigration", "Living and working in The Bahamas"],
  ["Labour & Employment", "Employers and employees"],
  ["Litigation & Dispute Resolution", "Courts, arbitration and disputes"],
  ["Real Estate", "Buying, selling and developing property"],
  ["Tax & Trade", "Tax, VAT and trade"],
  ["Trusts & Private Client", "Families with assets to protect"],
]
