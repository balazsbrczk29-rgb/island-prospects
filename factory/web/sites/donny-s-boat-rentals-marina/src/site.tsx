import { useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { AnimatePresence, motion } from 'motion/react'
import { Phone } from 'lucide-react'
import { PHONE, TEL, PHONE_US, TEL_US, EMAIL, WA_NUMBER, wa } from './data'
import './styles.css'

export const ease = [0.16, 1, 0.3, 1] as const

function useLenis() {
  useEffect(() => {
    // wheel smoothing only: phones keep their native touch scrolling
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function WhatsAppGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

export const WA_DEFAULT = wa("Hello Taylor, I'm staying on Green Turtle Cay and would like to rent a boat from Donny's.")

function Header({ current }: { current: 'home' | 'fleet' | 'marina' }) {
  const link = (href: string, label: string, key: string) => (
    <a href={href} aria-current={current === key ? 'page' : undefined}
      className={`relative py-3 text-[1.0625rem] font-medium after:absolute after:left-0 after:right-0 after:bottom-1.5 after:h-[2px] after:origin-left after:bg-current after:transition-transform after:duration-300 ${current === key ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>{label}</a>
  )
  return (
    <header className="relative z-20 flex items-center justify-between gap-4 px-5 md:px-[4vw] h-[68px] md:h-[84px]">
      <a href="index.html" className="flex items-baseline gap-3 min-h-11 items-center" aria-label="Donny's Boat Rentals and Marina, home">
        <span className="font-display font-bold text-[1.75rem] md:text-[2rem] tracking-[-0.045em] leading-none">Donny&rsquo;s</span>
        <span className="hidden sm:block text-[0.9375rem] text-muted leading-tight">Boat Rentals &amp; Marina<br />Green Turtle Cay</span>
      </a>
      <nav aria-label="Main" className="flex items-center gap-5 md:gap-9">
        {link('fleet.html', 'Fleet', 'fleet')}
        {link('marina.html', 'Marina', 'marina')}
        <a href={TEL} className="hidden md:inline-flex items-center gap-2 py-3 font-medium tnum"><Phone size={17} strokeWidth={1.75} aria-hidden="true" />{PHONE}</a>
        <a href={TEL} aria-label={`Call ${PHONE}`} className="md:hidden grid place-items-center size-11 rounded-full bg-flats"><Phone size={18} strokeWidth={1.75} aria-hidden="true" /></a>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-[#e6f0ed] px-5 md:px-[4vw] pt-16 pb-28 md:pb-16">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display font-bold text-[2.5rem] tracking-[-0.045em] leading-none text-white">Donny&rsquo;s</p>
          <p className="mt-3 max-w-[30ch] text-[#b9cdc8]">Boat rentals and marina at the end of Black Sound, Green Turtle Cay, Abaco. Family owned and operated.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Rentals</p>
          <a className="block py-1.5 hover:text-white" href={WA_DEFAULT} target="_blank" rel="noopener">WhatsApp Taylor, {WA_NUMBER}</a>
          <a className="block py-1.5 hover:text-white" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">The dock</p>
          <a className="block py-1.5 hover:text-white tnum" href={TEL}>{PHONE}</a>
          <a className="block py-1.5 hover:text-white tnum" href={TEL_US}>US {PHONE_US}</a>
          <p className="py-1.5">VHF 16, working 10</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Pages</p>
          <a className="block py-1.5 hover:text-white" href="index.html">Rent a boat</a>
          <a className="block py-1.5 hover:text-white" href="fleet.html">The fleet</a>
          <a className="block py-1.5 hover:text-white" href="marina.html">Dockage and moorings</a>
        </div>
      </div>
      <p className="mt-14 text-[0.875rem] text-[#9fb7b1]">Photographs: Donny&rsquo;s Boat Rentals &amp; Marina. Prices as published by Donny&rsquo;s; confirm when you book.</p>
    </footer>
  )
}

/** Phone only: a WhatsApp button once the hero has scrolled away, hidden again near the planner and the footer. */
function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.querySelector('[data-hero]')
    const quiet = document.querySelectorAll('[data-quiet]')
    let heroOut = false; const quietIn = new Set<Element>()
    const update = () => setShow(heroOut && quietIn.size === 0)
    const io = new IntersectionObserver(es => {
      for (const e of es) {
        if (e.target === hero) heroOut = !e.isIntersecting
        else e.isIntersecting ? quietIn.add(e.target) : quietIn.delete(e.target)
      }
      update()
    }, { threshold: 0 })
    if (hero) io.observe(hero); else heroOut = true
    quiet.forEach(q => io.observe(q)); update()
    return () => io.disconnect()
  }, [])
  // sits at 88px so it clears the shared concept tag (even expanded) in the bottom-left corner
  return (
    <AnimatePresence>
      {show && (
        <motion.a key="wa" href={WA_DEFAULT} target="_blank" rel="noopener" aria-label="Ask Taylor on WhatsApp"
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.25, ease }}
          style={{ transformOrigin: '100% 100%', bottom: 'calc(88px + env(safe-area-inset-bottom, 0px))' }}
          className="md:hidden fixed right-3.5 z-40 grid place-items-center size-14 rounded-full bg-channel text-white shadow-[0_8px_24px_rgba(13,43,46,.28)]">
          <WhatsAppGlyph size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

export function Page({ current, children }: { current: 'home' | 'fleet' | 'marina'; children: ReactNode }) {
  useLenis()
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export function mount(node: ReactNode) {
  // the prerendered markup stays visible until React's first commit replaces it with identical markup
  createRoot(document.getElementById('root')!).render(node)
}
