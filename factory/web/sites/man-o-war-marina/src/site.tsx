import { StrictMode, useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { BIZ } from './data'
import './styles.css'

export const NAV = [
  { href: 'index.html#docks', label: 'The docks', note: 'slips, power, fuel' },
  { href: 'index.html#fit', label: 'Will she fit?', note: 'check your boat' },
  { href: 'index.html#day', label: 'The day', note: 'hours, live' },
  { href: 'marina.html', label: 'Services', note: 'fuel, facilities, questions' },
  { href: 'island.html', label: 'The cay', note: 'what is ashore' },
  { href: 'index.html#request', label: 'Request a slip', note: 'to the dockmaster' },
]

export function Photo({ p, w, h, className = '', sizes, eager, imgStyle }: {
  p: { src: (w: number, h: number) => string; alt: string }; w: number; h: number; className?: string; sizes?: string; eager?: boolean; imgStyle?: React.CSSProperties
}) {
  const half = (n: number) => Math.round(n / 2)
  return (
    <div className={`ph ${className}`}>
      <img src={p.src(w, h)} srcSet={`${p.src(half(w), half(h))} ${half(w)}w, ${p.src(w, h)} ${w}w`} sizes={sizes ?? '100vw'}
        alt={p.alt} width={w} height={h} loading={eager ? 'eager' : 'lazy'} decoding="async" style={imgStyle} />
    </div>
  )
}

export function Masthead({ current, home }: { current?: string; home?: boolean }) {
  const Name = home ? 'h1' : 'p'
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])
  return (
    <header className="wrap">
      <a className="skip" href="#main">Skip to content</a>
      <div className="mast-top">
        <span><span className="hide-s">Man-O-War Cay, Abaco, Bahamas. </span>Full-service marina since 1976</span>
        <span style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a className="tab hide-s lnk" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>
          <span className="hide-s">VHF 16</span>
        </span>
      </div>
      <div className="mast-name">
        <Name className="nameplate"><a href="index.html">Man‑O‑War Marina</a></Name>
        <nav className="mast-nav" aria-label="Main">
          {NAV.filter(n => n.label !== 'Services' && n.label !== 'Request a slip').map(n => <a key={n.href} href={n.href} aria-current={current === n.href ? 'page' : undefined}>{n.label}</a>)}
        </nav>
        <button className="contents-btn" type="button" aria-expanded={open} aria-controls="toc" onClick={() => setOpen(true)}>Contents</button>
      </div>
      {open && (
        <div className="toc" id="toc" role="dialog" aria-modal="true" aria-label="Contents">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="nameplate" style={{ fontSize: '1.5rem' }}>Man-O-War Marina</span>
            <button className="contents-btn" type="button" onClick={() => setOpen(false)} autoFocus>Close</button>
          </div>
          <ol>{NAV.map(n => <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}<span>{n.note}</span></a></li>)}</ol>
          <p className="tab" style={{ fontSize: 'var(--f-s)' }}><a className="lnk" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a> &nbsp; VHF 16 &nbsp; <a className="lnk" href={`mailto:${BIZ.email}`}>{BIZ.email}</a></p>
        </div>
      )}
    </header>
  )
}

export function mount(node: ReactNode) {
  if (!matchMedia('(pointer: coarse)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lenis = new Lenis({ lerp: 0.12 })
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
  }
  const el = document.getElementById('root')!
  el.innerHTML = ''
  createRoot(el).render(<StrictMode>{node}</StrictMode>)
}
