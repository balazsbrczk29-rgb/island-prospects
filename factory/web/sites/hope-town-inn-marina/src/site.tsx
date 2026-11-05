import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "./styles.css"

// All contacts and links as published on hopetownmarina.com (Nov 2026). The main BS line 242.366.0003 is
// flagged on their own site as temporarily out of service, so the concept leads with the numbers they give instead.
export const C = {
  email: "office@hopetownmarina.com",
  us: "+1 850 588 4855", usTel: "tel:+18505884855",
  bs: "242 803 4401", bsTel: "tel:+12428034401",
  book: "https://reservations.verticalbooking.com/premium/index.html?id_albergo=29742&dc=8525&lingua_int=usa&id_stile=22585",
  dockwa: "https://dockwa.com/explore/destination/d9cl55-hope-town-inn-marina?form=transient",
  fb: "https://www.facebook.com/hopetowninnandmarina", ig: "https://www.instagram.com/hopetowninnandmarina",
}
const W = "https://static.wixstatic.com/media/"
// Photos hotlinked verbatim from hopetownmarina.com
export const IMG = {
  harbour: W + "512e9f_3e3ab83e2528492b897555b09aef16df~mv2.jpg/v1/fill/w_1905,h_856,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hope%20Town%20Inn%20And%20Marina%20-%20Harbour%20-%20Hero.jpg",
  villasHero: W + "512e9f_5aa55457758e482cbfb63ba3799a3af4~mv2.jpg/v1/fill/w_1905,h_856,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hope%20Town%20Inn%20And%20Marina%20-%20Villas%20-%20Hero.jpg",
  restaurant: W + "512e9f_544e0ba97d544655a68a655e24e608c8~mv2.jpg/v1/fill/w_1905,h_856,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hope%20Town%20Inn%20And%20Marina%20-%20Restaurant%20Hero.jpg",
  marinaWide: W + "512e9f_3dd6474df52d4f5e9bc71f864564f6db~mv2.jpg/v1/fill/w_1905,h_1000,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/512e9f_3dd6474df52d4f5e9bc71f864564f6db~mv2.jpg",
  water: W + "150d9f_064bf15af80f4e08b4be461ae7dbc6df~mv2.jpg/v1/fill/w_467,h_613,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hope%20Town%20Inn%20%26%20Marina%20-%20Water%2001.jpg",
  sportfish: W + "512e9f_d043e59152c041899181a1e66fdf58d7~mv2.jpg/v1/fill/w_387,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hope%20Town%20Inn%20%26%20Marina%20-%20Water%2004.jpg",
  aerial: W + "512e9f_d174dac87e754706becd3c01f6bebb12~mv2.jpg/v1/fill/w_387,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hope%20Town%20Inn%20%26%20Marina%20-%20Marina%2001.jpg",
  oleander: W + "512e9f_a2e5da28136e4624b7c64406078c72d2~mv2.jpg/v1/fit/w_1918",
  oleander2: W + "512e9f_154d2ee5a37f424f9600e7ea5133935a~mv2.jpg/v1/fit/w_1918",
  johnnys: W + "512e9f_633d7ffedc32404d8ae190e5deef5680~mv2.jpg/v1/fit/w_1920",
  bar: W + "93f220_dfce148ef968496787b9ddf6cbc84de7~mv2.jpg/v1/fit/w_1440",
  king: W + "512e9f_3e789f0514fb471481910735fbe5d0fa~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/King%20Suites%2011%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
  kingRoom: W + "512e9f_2a0d63c51a4d44808acb240e98ad84df~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/King%20Bed%20Hotel%20Room%2008%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
  double: W + "512e9f_43b6b592994b4991b4f80b5c2a3074ff~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Double%20Occupancy%20Hotel%20Room%2002%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
  garden: W + "512e9f_b9d6761afaef400899454f6f918ea4b5~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Two%20Bedroom%20Garden%20Villa%2002%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
  areca: W + "512e9f_c09075138f6549d4bb1be9dd7782f362~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Areca%20Palm%20Villa%2001%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
  hummingbird: W + "512e9f_e8691a10e8bd439aaaee3e90fdbdda4f~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hummingbird%20Villa%2006%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
  castaway: W + "512e9f_07bf09e941144501b8b957b411c7ab41~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Castaway%20Villa%2006%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
  flamingo: W + "512e9f_69916dc0b6a64cc4add1fb9c5c3d6466~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Flamingo%20Villa%2003%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
  oleanderThumb: W + "512e9f_6f56ecff88394ad380554adab511f9b0~mv2.jpg/v1/fill/w_395,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Oleander%20Villa%2001%20-%20Hope%20Town%20Inn%20And%20Marina.jpg",
}

export type Stay = { name: string; kind: "Room" | "Villa"; guests: number; ft: number; m: number; img: string }
export const STAYS: Stay[] = [
  { name: "Double Occupancy Hotel Room", kind: "Room", guests: 4, ft: 270, m: 25, img: IMG.double },
  { name: "King Bed Hotel Room", kind: "Room", guests: 2, ft: 350, m: 33, img: IMG.kingRoom },
  { name: "King Suite", kind: "Room", guests: 3, ft: 450, m: 42, img: IMG.king },
  { name: "Two Bedroom Garden Villa", kind: "Villa", guests: 4, ft: 900, m: 84, img: IMG.garden },
  { name: "Oleander Villa", kind: "Villa", guests: 8, ft: 1010, m: 94, img: IMG.oleanderThumb },
  { name: "Hummingbird Villa", kind: "Villa", guests: 6, ft: 1210, m: 112, img: IMG.hummingbird },
  { name: "Castaway Villa", kind: "Villa", guests: 6, ft: 1210, m: 112, img: IMG.castaway },
  { name: "Flamingo Villa", kind: "Villa", guests: 6, ft: 1210, m: 112, img: IMG.flamingo },
  { name: "Areca Palm Villa", kind: "Villa", guests: 8, ft: 1210, m: 112, img: IMG.areca },
]

export const ease = [0.16, 1, 0.3, 1] as const
export const reveal = [0.77, 0, 0.175, 1] as const

const NAV = [
  { href: "stay.html", label: "Stay" },
  { href: "marina.html", label: "Marina" },
  { href: "index.html#dine", label: "Bridget's" },
  { href: "index.html#getting-here", label: "Getting here" },
]

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

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="index.html" className="leading-none" aria-label="Hope Town Inn & Marina, home">
          <span className="block font-display text-[1.6rem] font-medium italic">Hope Town Inn <span className="not-italic">&amp;</span> Marina</span>
          <span className="mt-1 block text-[10.5px] font-semibold tracking-[0.22em] text-muted uppercase">Elbow Cay · Abaco · The Bahamas</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined} className={`relative text-[15px] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-sea after:transition-transform after:duration-500 ${current === n.label ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{n.label}</a>
          ))}
          <a href="index.html#plan" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-sea-deep">Plan your stay</a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Open menu"><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-paper sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-16 flex flex-col px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line py-4 font-display text-4xl italic">{n.label}</motion.a>
              ))}
              <a href={C.book} className="mt-8 rounded-full bg-ink py-4 text-center text-paper">Check room rates</a>
              <a href={C.dockwa} className="mt-3 rounded-full border border-ink py-4 text-center">Book a slip</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-sea" aria-hidden />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-4xl italic">Hope Town Inn &amp; Marina</p>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper/70">A 15-acre private estate on the western side of Hope Town Harbour, Elbow Cay, Abaco. Resort, marina, restaurant, bar, boutique.</p>
          <div className="mt-6 flex gap-5 text-[14px]"><a href={C.fb} className="hover:text-sand">Facebook</a><a href={C.ig} className="hover:text-sand">Instagram</a></div>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-sand uppercase">Reservations</p>
          <a href={`mailto:${C.email}`} className="mt-3 block hover:text-sand">{C.email}</a>
          <a href={C.usTel} className="mt-1 block hover:text-sand">US {C.us}</a>
          <a href={C.bsTel} className="mt-1 block hover:text-sand">BS {C.bs}</a>
        </div>
        <div className="text-[15px]">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-sand uppercase">Book direct</p>
          <a href={C.book} className="mt-3 block hover:text-sand">Rooms &amp; villas</a>
          <a href={C.dockwa} className="mt-1 block hover:text-sand">Slips on Dockwa</a>
          <a href="index.html#getting-here" className="mt-1 block hover:text-sand">Getting here</a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] border-t border-paper/10 px-5 py-6 text-[12px] text-paper/50 md:px-10">Concept by ESTATIQ AI Solutions. Photography and details from hopetownmarina.com, to be confirmed with the resort.</p>
    </footer>
  )
}

function ActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[0.8fr_1fr_1.3fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a href={C.usTel} className="flex min-h-16 items-center justify-center gap-1.5 text-[14px]"><Phone className="size-4" aria-hidden /> Call</a>
      <a href={C.dockwa} className="flex min-h-16 items-center justify-center border-l border-line text-[14px]">Book a slip</a>
      <a href={C.book} className="flex min-h-16 items-center justify-center bg-ink text-[15px] text-paper">Check rates</a>
    </nav>
  )
}

export function Page({ current, children }: { current: string; children: ReactNode }) {
  useLenis()
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-paper focus:p-3">Skip to content</a><Header current={current} /><main id="main">{children}</main><Footer /><ActionBar /></>)
}

export function mount(node: ReactNode) {
  document.documentElement.classList.add("js-anim")
  createRoot(document.getElementById("root")!).render(node)
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, delay, ease }}>{children}</motion.div>
  )
}

export function Label({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return <p className={`text-[11px] font-semibold tracking-[0.24em] uppercase ${light ? "text-sand" : "text-sea"}`}>{n && <span className="mr-3 opacity-70">{n}</span>}{children}</p>
}

/** Image revealed through an expanding clip-path, with a slow zoom-out. */
export function MaskImg({ src, alt, className = "", delay = 0, priority = false, w = 1600, h = 1000 }: { src: string; alt: string; className?: string; delay?: number; priority?: boolean; w?: number; h?: number }) {
  return (
    <motion.div className={`overflow-hidden bg-shallows ${className}`} initial={{ clipPath: "inset(12% 12% 12% 12%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.3, delay, ease: reveal }}>
      <motion.img src={src} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} {...(priority ? { fetchPriority: "high" as const } : {})} className="size-full object-cover transition duration-700 hover:scale-[1.03]" initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay, ease }} />
    </motion.div>
  )
}
