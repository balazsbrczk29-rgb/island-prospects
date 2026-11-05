import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, MessageCircle } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import "./styles.css"

export const PHONE = "+1 (954) 302-7422"
export const TEL = "tel:+19543027422"
export const WA_DISPLAY = "+1 (242) 808-5711"
export const WA = "12428085711"
export const WA_LINK = `https://wa.me/${WA}`
export const EMAIL = "reservations@fernandezbayvillage.com"
export const BOOK = "https://fernandezbayvillage.client.innroad.com/"
export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const S = "https://images.squarespace-cdn.com/content/v1/64f009b8e4a9e046e2b1a2c9/"
export const IMG = {
  hero: S + "4d8b8a60-415b-49d4-a650-b2068cd4f231/5T1A8323.jpg",
  shane: S + "e61c5395-c1e9-4699-a10a-06406e942657/5T1A7817.jpg",
  manorKitchen: S + "6d49c75d-e5f2-440e-8b7b-13dbda44d942/5T1A7792.jpg",
  manor: S + "ef1997c4-cfdf-438b-933c-6fd66411ddde/5T1A7736.jpg",
  beachHouse: S + "29e2e74d-ce49-47ab-bb6e-ffc5b884a428/5T1A7713.jpg",
  tiki: S + "dbaf91be-dc01-4852-8145-dddfa5c6394a/5T1A8406.jpg",
  mahi: S + "018d16b7-bbe6-48f2-b013-b3cc1bc49490/mahi.jpg",
  breakfast: S + "2dfc3374-6913-4818-901a-266e0b3d2e41/complete+breakfast.jpg",
  burger: S + "b4d23bb9-b7f3-45df-ad6d-acc90e5c6d79/burger.jpg",
  diningRoom: S + "de46abcb-dccf-47dd-a53b-733bf2011570/dining+room.jpg",
  kayaks: S + "fe6f4fea-aa9b-4dc1-9ec7-03689166c193/5T1A8209.jpg",
  relax: S + "868e8a23-1bab-48ef-820d-4a89cd8ca9cc/5T1A8273.jpg",
  tour: S + "c20ffc5a-e206-4fea-b898-fb49a13b3a41/5T1A8430.jpg",
  clubhouse: S + "006bfcdb-9767-4074-9c96-6f276ab66fc2/5T1A8141.jpg",
  coconut: S + "5b834ec6-d722-4203-8844-e078391dbdbd/5T1A8392.jpg",
  royal: S + "899e33a9-fbb1-43bb-bef2-e705cda259b9/5T1A8089.jpg",
  seabreeze: S + "22bb62bb-9078-4e8f-b5fa-1c1e28f51478/5T1A8106.jpg",
  tamarind: S + "cecca38d-b3ed-4338-88a9-3be42aa38027/5T1A8099.jpg",
  caretaker: S + "a6a0f15b-0f1b-4bd0-8429-1c65be361a48/5T1A8120.jpg",
  reefs: S + "a2b29524-9936-4d98-ab32-3085efce002b/5T1A8131.jpg",
  travelers: S + "d96a708f-3acc-42bf-bd4d-7503435a97a0/5T1A8094.jpg",
}
export const sq = (u: string, w = 1500) => `${u}?format=${w}w`

const NAV = [
  { href: "stay.html", label: "Cottages & villas" },
  { href: "index.html#days", label: "Days here" },
  { href: "index.html#dining", label: "Dining" },
  { href: "getting-here.html", label: "Getting here" },
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

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Fernandez Bay Village, home">
          <span className="font-display text-[1.45rem] italic tracking-[-0.01em]">Fernandez Bay Village</span>
          <span className="label mt-1 block !text-[10px] text-muted">Cat Island · The Bahamas</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`ulink text-[15px] ${current === n.label ? "is-current" : ""}`}>{n.label}</a>)}
          <a href={BOOK} className="btn btn-primary">Check availability</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={WA_LINK} aria-label="Message the front desk on WhatsApp" className="inline-flex size-11 items-center justify-center rounded-full border border-line"><MessageCircle className="size-[18px]" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
                {NAV.map((n, i) => <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-[2rem] italic">{n.label}</motion.a>)}
                <a href={BOOK} className="btn btn-primary mt-8 justify-center">Check availability</a>
                <a href={WA_LINK} className="mt-4 text-center text-[15px] text-muted">WhatsApp {WA_DISPLAY}</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-casuarina" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-[clamp(2.4rem,4vw,3.6rem)] italic leading-none">Fernandez Bay Village</p>
          <p className="mt-4 max-w-sm text-[15px] text-paper/70">Fernandez Bay, near New Bight, Cat Island, The Bahamas. Five minutes from New Bight Airport (MYCB).</p>
        </div>
        <div className="text-[15px] md:col-span-3">
          <p className="label text-shallows">Front desk and reservations</p>
          <a href={TEL} className="ulink mt-3 inline-block">{PHONE}</a><br />
          <a href={WA_LINK} className="ulink mt-1 inline-block">WhatsApp {WA_DISPLAY}</a><br />
          <a href={`mailto:${EMAIL}`} className="ulink mt-1 inline-block break-all">{EMAIL}</a>
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-shallows">Pages</p>
          {[{ href: "index.html", label: "Home" }, ...NAV].map(n => <a key={n.href} href={n.href} className="ulink mt-3 block w-fit">{n.label}</a>)}
        </div>
        <div className="text-[15px] md:col-span-2">
          <p className="label text-shallows">Follow</p>
          <a href="https://www.facebook.com/fernandezbayvillage/" className="ulink mt-3 block w-fit">Facebook</a>
          <a href="https://www.instagram.com/fernandezbayvillageresort/" className="ulink mt-3 block w-fit">Instagram</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-paper/55 md:px-10">Concept by ESTATIQ AI Solutions. Photographs and details from fernandezbayvillage.com, to be confirmed with the resort.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.5fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={WA_LINK} className="flex min-h-14 items-center justify-center gap-2 text-[15px]"><MessageCircle className="size-4" aria-hidden /> WhatsApp</a>
      <a href={BOOK} className="flex min-h-14 items-center justify-center bg-casuarina text-[15px] text-paper">Check availability</a>
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
  return <p className={`label ${className}`}>{n && <span className="tabular-nums">{n}</span>}{n && <span className="mx-2" aria-hidden>/</span>}{children}</p>
}

export function Photo({ src, alt, className = "", w = 1500, h = 1000, priority = false, mask = true }: { src: string; alt: string; className?: string; w?: number; h?: number; priority?: boolean; mask?: boolean }) {
  const img = <img src={sq(src, priority ? 2500 : 1500)} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className="size-full object-cover transition duration-700 ease-out hover:scale-[1.03]" />
  if (!mask) return <div className={`overflow-hidden ${className}`}>{img}</div>
  return (
    <motion.div className={`overflow-hidden ${className}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-5% 0px" }} transition={{ duration: 1.2, ease: reveal }}>
      {img}
    </motion.div>
  )
}
