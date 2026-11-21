import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { BIZ, PHOTO } from './data'
import { PLACES, headline, line, nassauNow } from './hours'
import { Masthead, Photo, mount } from './site'

function useNow() {
  const [now, setNow] = useState(() => nassauNow())
  useEffect(() => { const t = setInterval(() => setNow(nassauNow()), 30_000); return () => clearInterval(t) }, [])
  return now
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, v => (reduce ? 1 : 1 + v * 0.09))
  const now = useNow()
  const h = headline(now.day, now.min)
  return (
    <section aria-labelledby="live" className="hero">
      <div className="hero-band" ref={ref}>
        <motion.div className="ph" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}>
          <motion.img src={PHOTO.dusk.src(1800, 2400)} srcSet={`${PHOTO.dusk.src(900, 1200)} 900w, ${PHOTO.dusk.src(1800, 2400)} 1800w`} sizes="100vw"
            alt={PHOTO.dusk.alt} width={1800} height={2400} fetchPriority="high" style={{ scale }} />
        </motion.div>
        <p className="hero-cap">The main dock at sundown</p>
      </div>
      <div className="wrap">
        <div className="hero-text">
          <p id="live" className="live" aria-live="polite">
            <span className="when tab">{h.when}</span>
            <span className={h.open ? 'dot' : 'dot off'} aria-hidden="true" />{h.what}
          </p>
          <div className="hero-act">
            <a className="btn" href="#request">Request a slip</a>
            <p className="alt tab"><a className="lnk" href={`tel:${BIZ.tel}`}>Call {BIZ.phone}</a><span>Assisted docking on VHF 16</span></p>
          </div>
          <p className="board" aria-label="Open now, Bahamas time">
            {PLACES.slice(1).map(p => { const l = line(p, now.day, now.min); return <span key={p.key} className={l.open ? 'o' : 'c'}><b>{p.name}</b>&nbsp;{l.text}</span> })}
          </p>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Masthead home />
      <main id="main">
        <Hero />
        <div id="request" style={{ height: 600 }} />
      </main>
    </>
  )
}

mount(<Home />)
export { Photo }
