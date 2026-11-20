import { useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Dialog from '@radix-ui/react-dialog'
import Lenis from 'lenis'
import { CREDITS, IMG } from './images'
import './styles.css'

export const PHONE = '(242) 373-2673'
export const TEL = 'tel:+12423732673'
export const FAX = '(242) 373-3802'
export const COORD = '26°30.9′ N   78°38.2′ W'

export const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const LINKS = [
  { href: 'index.html#arrival', label: 'The arrival' },
  { href: 'index.html#club', label: 'The club' },
  { href: 'marina.html', label: 'The marina' },
  { href: '#card', label: 'Call the office' },
]

function Menu() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="menu-word">Menu</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="ov-bg" />
        <Dialog.Content className="ov" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Close className="menu-word ov__close">Close</Dialog.Close>
          <nav aria-label="Main">
            <ul className="ov__list">
              {LINKS.map(l => <li key={l.href}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>)}
            </ul>
          </nav>
          <p className="ov__foot"><a href={TEL}>{PHONE}</a><span>Bell Channel Club &amp; Marina, Lucaya, Grand Bahama</span></p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function Header({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <header className={`hd hd--${tone}`}>
      <a className="hd__name" href="index.html">Bell Channel Club <span>&amp; Marina</span></a>
      <a className="hd__tel" href={TEL}>{PHONE}</a>
      <Menu />
    </header>
  )
}

export function CallingCard({ img = IMG.inlet.src, alt = IMG.inlet.alt, caption = IMG.inlet.caption }: { img?: string; alt?: string; caption?: string }) {
  return (
    <section id="card" className="card-sec" aria-labelledby="card-h">
      <img className="card-sec__img" src={img} alt={alt} loading="lazy" decoding="async" />
      <div className="card">
        <h2 id="card-h" className="card__name">Bell Channel Club <span>&amp; Marina</span></h2>
        <dl className="card__dl">
          <div><dt>Club office</dt><dd><a className="nw" href={TEL}>{PHONE}</a></dd></div>
          <div><dt>Fax</dt><dd>{FAX}</dd></div>
          <div><dt>Post</dt><dd>P.O. Box F-44053, Freeport, Grand Bahama</dd></div>
          <div><dt>Position</dt><dd className="num">{COORD}</dd></div>
        </dl>
        <a className="btn" href={TEL}>Call the club office</a>
      </div>
      <p className="card-sec__cap">{caption}</p>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="ft">
      <p>Bell Channel Club &amp; Marina, Lucaya, Freeport, Grand Bahama, The Bahamas.</p>
      <p className="ft__credits">{CREDITS}</p>
    </footer>
  )
}

export function MobileCall() {
  // hidden while the first screen or the calling card (which carry the number themselves) are in view
  const [show, setShow] = useState(false)
  useEffect(() => {
    const card = document.getElementById('card')
    let cardIn = false
    const io = new IntersectionObserver(es => { es.forEach(e => { cardIn = e.isIntersecting }); upd() })
    if (card) io.observe(card)
    const upd = () => setShow(window.scrollY > window.innerHeight * 0.9 && !cardIn)
    addEventListener('scroll', upd, { passive: true }); upd()
    return () => { io.disconnect(); removeEventListener('scroll', upd) }
  }, [])
  return <a className={`m-call${show ? ' is-on' : ''}`} href={TEL} aria-hidden={!show} tabIndex={show ? 0 : -1}>Call the office</a>
}

function Shell({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
  return <>{children}</>
}

export function mount(node: ReactNode) {
  const el = document.getElementById('root')!
  el.innerHTML = ''
  createRoot(el).render(<Shell>{node}</Shell>)
}
