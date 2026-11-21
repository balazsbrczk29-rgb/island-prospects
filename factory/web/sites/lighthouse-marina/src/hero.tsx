import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { biz, pano } from './data'
import { Header } from './ui'

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

const chapters = [
  { at: 0.16, line: 'From the gallery of the Elbow Reef Lighthouse.', sub: 'Hope Town Harbour, Abaco, looking west.' },
  { at: 0.46, line: 'Hope Town, across the water.', sub: 'The marina sits at the foot of this tower.' },
  { at: 0.76, line: 'The lantern room, built 1862.', sub: 'Red and white, a first-order Fresnel lens.' },
]

const isPhone = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const band = useRef<HTMLDivElement>(null)
  const dims = useRef({ bw: 1440, bh: 800 })
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useEffect(() => {
    const el = band.current; if (!el) return
    const ro = new ResizeObserver(() => { dims.current = { bw: el.clientWidth, bh: Math.min(el.clientHeight, 880) } })
    ro.observe(el); return () => ro.disconnect()
  }, [])

  // pan: function transforms only (no React state per frame)
  const x = useTransform(scrollYProgress, v => {
    const { bw, bh } = dims.current
    const travel = Math.max(0, bh * pano.ratio - bw)
    const t = clamp((v - 0.04) / 0.9)
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    return reduce ? 0 : -e * travel
  })
  const copyOpacity = useTransform(scrollYProgress, v => (isPhone() ? 1 : 1 - clamp((v - 0.02) / 0.1)))
  const copyY = useTransform(scrollYProgress, v => (isPhone() ? 0 : -clamp((v - 0.02) / 0.1) * 24))
  const meter = useTransform(scrollYProgress, v => clamp(v / 0.96))

  const [chap, setChap] = useState(-1)
  useMotionValueEvent(scrollYProgress, 'change', v => {
    let c = -1; for (let i = 0; i < chapters.length; i++) if (v >= chapters[i].at) c = i
    if (isPhone() && c < 0) c = 0
    setChap(prev => (prev === c ? prev : c))
  })
  useEffect(() => { if (isPhone()) setChap(c => (c < 0 ? 0 : c)) }, [])

  const bar = (
    <>
      <p className="hero__lede t18">At the foot of the Hope Town lighthouse since 1980. Two gas pumps and one diesel, six protected slips, a boatyard and a ship's store.</p>
      <div className="hero__actions">
        <a className="btn" href="#contact">Request a slip or service</a>
        <a className="link num" href={`tel:${biz.phones[0].tel}`}>Call {biz.phones[0].label}</a>
        <span className="t18" style={{ fontWeight: 600 }}>VHF {biz.vhf}</span>
      </div>
    </>
  )

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-h" data-stage id="top">
      <div className="hero__pin">
        <Header page="home" />
        <motion.div className="hero__copy" style={{ opacity: copyOpacity, y: copyY }}><h1 className="t120" id="hero-h">The only marine fuel on Elbow Cay.</h1></motion.div>
        <div className="hero__bar">{bar}</div>
        <div className="hero__band" ref={band}>
          <motion.img className="hero__img" style={{ x }} src={pano.src3840}
            srcSet={`${pano.src1920} 1920w, ${pano.src3840} 3840w`} sizes="(max-width: 767px) 1800px, 3840px"
            width={3840} height={880} alt={pano.alt} fetchPriority="high" decoding="async" referrerPolicy="no-referrer" data-local="pano" />
          {chapters.map((c, i) => (
            <div key={i} className="cap" aria-hidden={chap !== i}
              style={{ opacity: chap === i ? 1 : 0, transform: `translateY(${chap === i ? 0 : 8}px)`, transition: 'opacity .7s var(--ease), transform .7s var(--ease)' }}>
              <p>{c.line}</p><span>{c.sub}</span>
            </div>
          ))}
        </div>
        <div className="hero__foot">
          <span className="hero__credit">{pano.credit}</span>
          <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className="hero__meter" aria-hidden><motion.i style={{ scaleX: meter }} /></span>
            <span>Scroll to look across the harbour</span>
          </span>
        </div>
      </div>
    </section>
  )
}
