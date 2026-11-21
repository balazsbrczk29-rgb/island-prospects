import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { biz, pano } from './data'
import { Header } from './ui'

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

const chapters = [
  { at: 0, line: 'From the gallery of the Elbow Reef Lighthouse.', sub: 'Hope Town Harbour, Abaco. Keep scrolling to turn your head.' },
  { at: 0.4, line: 'Hope Town, across the water.', sub: 'Moorings, the settlement, the Sea of Abaco beyond.' },
  { at: 0.72, line: 'The fuel dock is below you.', sub: 'Lighthouse Marina, at the foot of this tower since 1980.' },
]


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
  const meter = useTransform(scrollYProgress, v => clamp(v / 0.96))

  const [chap, setChap] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', v => {
    let c = 0; for (let i = 0; i < chapters.length; i++) if (v >= chapters[i].at) c = i
    setChap(prev => (prev === c ? prev : c))
  })

  const bar = (
    <>
      <p className="hero__lede t18">At the foot of the Hope Town lighthouse since 1980.<span className="lede-more"> Two gas pumps and one diesel, six protected slips, a boatyard and a ship's store.</span></p>
      <div className="hero__actions">
        <a className="btn" href="#contact">Request a slip or service</a>
        <a className="link num hero__call" href={`tel:${biz.phones[0].tel}`}>Call {biz.phones[0].label}</a>
        <span className="t18" style={{ fontWeight: 600 }}>VHF {biz.vhf}</span>
      </div>
    </>
  )

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-h" data-stage id="top">
      <div className="hero__pin">
        <Header page="home" />
        <div className="hero__head">
          <h1 className="t120" id="hero-h">The only marine <br className="br-d" />fuel on Elbow&nbsp;Cay.</h1>
          <div className="hero__bar">{bar}</div>
        </div>
        <div className="hero__band" ref={band}>
          <motion.img className="hero__img" style={{ x }} src={pano.src3840}
            srcSet={`${pano.src1920} 1920w, ${pano.src3840} 3840w`} sizes="(max-width: 767px) 1800px, 3840px"
            width={3840} height={880} alt={pano.alt} fetchPriority="high" decoding="async" referrerPolicy="no-referrer" data-local="pano" />
          {chapters.map((c, i) => (
            <div key={i} className="cap" aria-hidden={chap !== i}
              style={{ opacity: chap === i ? 1 : 0, transform: `translateY(${chap === i ? 0 : 8}px)` }}>
              <p>{c.line}</p><span>{c.sub}</span>
            </div>
          ))}
        </div>
        <div className="hero__foot">
          <span className="hero__credit">{pano.credit}</span>
          <span className="hero__capline" aria-live="polite"><b>{chapters[chap].line}</b> {chapters[chap].sub}</span>
          <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className="hero__meter" aria-hidden><motion.i style={{ scaleX: meter }} /></span>
            <span className="hero__hint">Scroll to look across the harbour</span>
          </span>
        </div>
      </div>
    </section>
  )
}
