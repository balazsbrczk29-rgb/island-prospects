import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'motion/react'
import { IMG, biz } from './data'

// Geometry in fractions of the photo frame (16:9 desktop photo, 4:5 phone photo).
type Pt = [number, number]
type Callout = { pts: Pt[]; tag: Pt; anchor: 'left' | 'bottom' | 'right'; label: string; short: string; px?: number }
const DESK: Callout[] = [
  { pts: [[0.70, 0.42], [0.70, 0.20], [0.735, 0.20]], tag: [0.74, 0.20], anchor: 'left', label: 'Razor POS terminal', short: 'Razor POS' },
  { pts: [[0.655, 0.83], [0.655, 0.935], [0.70, 0.935]], tag: [0.705, 0.935], anchor: 'left', label: 'Structured cabling, certified', short: 'Cabling' },
  { pts: [[0.565, 0.30], [0.565, 0.085], [0.575, 0.085]], tag: [0.58, 0.085], anchor: 'left', label: 'Wi-Fi, VLANs, firewall, VPN', short: 'Wi-Fi + VLANs' },
  { pts: [[0.85, 0.46], [0.895, 0.46], [0.895, 0.36]], tag: [0.94, 0.355], anchor: 'right', label: 'Cloud backup', short: 'Backup', px: 0.905 },
]
const CHAPTERS = [
  { k: 'Point of sale', h: 'Razor POS, set up for your counter.', p: 'Advanced dealers for Razor POS Systems, built for retail and food and beverage: hardware, software, staff training and support after installation.' },
  { k: 'Cabling', h: 'The cable nobody sees.', p: 'Networks designed from the ground up: cabling, termination and certification, so every till, printer and PC has a solid line.' },
  { k: 'Wi-Fi and security', h: 'Guests on one network. Tills on another.', p: 'Advanced wireless with multiple VLANs, a firewall and VPN support, so the guest Wi-Fi never shares a network with your sales.' },
  { k: 'Cloud backup', h: 'Your data, kept off the counter.', p: 'Cloud backup on a best-in-class IT management platform, protecting your data and your endpoints from online threats.' },
]
// line i draws over [start, start + 0.11] of the stage progress (line 0 draws on load)
const DRAW = [0, 0.27, 0.49, 0.71]
const chapterAt = (p: number) => (p < 0.29 ? 0 : p < 0.51 ? 1 : p < 0.73 ? 2 : 3)
const clamp = (v: number) => Math.max(0, Math.min(1, v))

function useIsPhone() {
  const [phone, setPhone] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const on = () => setPhone(mq.matches); on(); mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return phone
}

function Line({ c, i, p }: { c: Callout; i: number; p: MotionValue<number> }) {
  const d = 'M' + c.pts.map(([x, y]) => `${x * 1000} ${y * 1000}`).join(' L')
  const off = useTransform(p, v => (i === 0 ? 0 : 1 - clamp((v - DRAW[i]) / 0.11)))
  const vis = useTransform(p, v => (i === 0 ? 1 : clamp((v - DRAW[i] + 0.01) / 0.03)))
  return (
    <motion.path d={d} pathLength={1} strokeDasharray="1 1" className={i === 0 ? 'draw-on-load' : undefined}
      style={{ strokeDashoffset: off, opacity: vis }} stroke={i === 0 ? 'var(--accent)' : 'var(--xray)'} />
  )
}

function Tag({ c, i, p, phone }: { c: Callout; i: number; p: MotionValue<number>; phone: boolean }) {
  const o = useTransform(p, v => (i === 0 ? 1 : clamp((v - DRAW[i] - 0.08) / 0.04)))
  const y = useTransform(p, v => (i === 0 ? 0 : (1 - clamp((v - DRAW[i] - 0.08) / 0.04)) * 6))
  const tf = c.anchor === 'left' ? 'translate(0,-50%)' : c.anchor === 'right' ? 'translate(-100%,-100%)' : 'translate(-50%,-100%)'
  const [x0, y0] = c.pts[0]
  const dotO = useTransform(p, v => (i === 0 ? 1 : clamp((v - DRAW[i]) / 0.02)))
  return (
    <>
      <motion.span aria-hidden="true" className={'dot' + (i === 0 ? ' dot--pos' : '')} style={{ left: `${x0 * 100}%`, top: `${y0 * 100}%`, opacity: dotO }} />
      <motion.span className="tagpos" style={{ left: `${(phone && c.px ? c.px : c.tag[0]) * 100}%`, top: `${c.tag[1] * 100}%`, opacity: o, y }}>
        <span className={'tag' + (i === 0 ? ' tag--light' : '') + (phone ? ' tag--phone' : '')} style={{ transform: tf }}>{phone ? c.short : c.label}</span>
      </motion.span>
    </>
  )
}

export default function XrayStage() {
  const ref = useRef<HTMLElement>(null)
  const phone = useIsPhone()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [ch, setCh] = useState(0)
  const [dark, setDark] = useState(false)
  useMotionValueEvent(p, 'change', v => { const c = chapterAt(v); setCh(o => (o === c ? o : c)); const d = v > 0.16; setDark(o => (o === d ? o : d)) })

  const wipe = useTransform(p, v => clamp((v - 0.07) / 0.38))
  const xrX = useTransform(wipe, w => `${(1 - w) * 100}%`)
  const xrInnerX = useTransform(wipe, w => `${-(1 - w) * 100}%`)
  const heroO = useTransform(p, v => 1 - clamp((v - 0.04) / 0.07))
  const heroY = useTransform(p, v => -clamp((v - 0.04) / 0.07) * 24)
  const capO = useTransform(p, v => clamp((v - 0.1) / 0.05))
  const cueO = useTransform(p, v => 1 - clamp(v / 0.03))

  const set = DESK
  const src = IMG + 'counter-hero.jpg'
  const c = CHAPTERS[ch]

  return (
    <section ref={ref} className={'stage' + (ch > 0 || dark ? ' is-dark' : '')} data-stage aria-label="What Digitech builds behind a counter">
      <div className="stage__pin">
        <div className="stage__frame">
          <img className="stage__img" src={src} alt="A point-of-sale touchscreen and receipt printer on a pale wooden counter in a bright Nassau cafe (illustrative photograph)" fetchPriority="high" data-source="generated" />
          <motion.div className="xr" style={{ x: xrX }} aria-hidden="true">
            <motion.div className="xr__inner" style={{ x: xrInnerX }}>
              <img className="stage__img xr__img" src={src} alt="" />
              <div className="xr__tint" />
              <div className="xr__grid" />
            </motion.div>
            <div className="xr__edge" />
          </motion.div>
          <svg className="lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
            {set.map((co, i) => <Line key={(phone ? 'p' : 'd') + i} c={co} i={i} p={p} />)}
          </svg>
          {set.map((co, i) => <Tag key={(phone ? 'p' : 'd') + i} c={co} i={i} p={p} phone={phone} />)}
        </div>

        <header className="topbar">
          <a className="wordmark" href="./"><i aria-hidden="true" />Digitech Bahamas</a>
          <a className="num topbar__tel" href={`tel:${biz.phones[0].tel}`}>{biz.phones[0].label}</a>
        </header>

        <motion.div className="hero-copy" style={{ opacity: heroO, y: heroY }}>
          <h1>Everything behind your till, installed and looked after in&nbsp;Nassau.</h1>
          <p className="lede">Razor POS, networks, Wi-Fi and cloud backup for restaurants, shops and offices, from one local team in Centreville.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work-order">Request a site visit</a>
            <a className="btn btn-text" href="services.html">See the four services</a>
          </div>
          <motion.p className="scrollcue" style={{ opacity: cueO }}>Scroll to see what sits behind the counter</motion.p>
        </motion.div>

        <motion.div className="chapter" style={{ opacity: capO }} aria-live="polite">
          <div className="chapter__k">{CHAPTERS.map((x, i) => <span key={x.k} aria-current={i === ch}>{x.k}</span>)}<em className="num">{ch + 1} of 4</em></div>
          <h2>{c.h}</h2>
          <p>{c.p}</p>
        </motion.div>
      </div>
    </section>
  )
}
