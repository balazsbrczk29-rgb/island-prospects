import { motion, useReducedMotion } from 'motion/react'
import { BIZ, PHOTOS } from './data'

export function Top({ base = '' }: { base?: string }) {
  return (
    <header className="top">
      <a className="wordmark" href="./">Hideaways at Palm Bay</a>
      <nav aria-label="Main">
        <a className="navlink" href={base + "#rooms"}>Rooms</a>
        <a className="navlink" href={base + "#offers"}>Offers</a>
        <a className="navlink" href={base + "#splash"}>Splash</a>
        <a className="navlink" href={base + "#here"}>Getting here</a>
        <a className="navlink num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>
        <a className="link book" href={BIZ.booking}><span className="long">Check availability</span><span className="short">Book</span></a>
      </nav>
    </header>
  )
}

const ease = [0.22, 0.61, 0.24, 1] as const

export function Hero({ onPick }: { onPick: (side: 'ocean' | 'hill') => void }) {
  const reduce = useReducedMotion()
  const rise = (i: number) => reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, ease, delay: 0.12 + i * 0.14 } }
  const frame = (i: number) => reduce ? {} : { initial: { clipPath: 'inset(100% 0 0 0)' }, animate: { clipPath: 'inset(0% 0 0 0)' }, transition: { duration: 1.25, ease, delay: 0.3 + i * 0.16 } }
  return (
    <section className="hero" aria-labelledby="h1">
      <Top />
      <div className="choice">
        <h1 id="h1" className="words display">
          <motion.span className="w-sand" {...rise(0)}>sand</motion.span>
          <motion.i className="w-or" {...rise(1)}>or</motion.i>
          <motion.span className="w-hill" {...rise(0.5)}>hill</motion.span>
          <span className="sr-only">: Hideaways at Palm Bay, beach cottages and hillside villas on Elizabeth Harbour, George Town, Exuma</span>
        </h1>
        <a className="half sand" href="#rooms-ocean" onClick={e => { e.preventDefault(); onPick('ocean') }} aria-label="Sand: see the five ocean-side room types">
          <motion.span className="cap" {...rise(1)}><span>Ocean Side cottages and villas</span><span>5 room types</span></motion.span>
          <motion.div className="frame" {...frame(0)}>
            <img src={PHOTOS.sand} alt="Clear shallow water over white sand, a swing standing in the sea" width={1200} height={900} fetchPriority="high" />
          </motion.div>
        </a>
        <a className="half hill" href="#rooms-hill" onClick={e => { e.preventDefault(); onPick('hill') }} aria-label="Hill: see the three Island Time hillside room types">
          <motion.span className="cap" {...rise(1.5)}><span>Island Time Villas, on the hillside</span><span>3 room types</span></motion.span>
          <motion.div className="frame" {...frame(1)}>
            <img src={PHOTOS.hill} alt="Two-storey turquoise Island Time villas with balconies on the hill" width={1024} height={768} fetchPriority="high" />
          </motion.div>
        </a>
      </div>
      <motion.div className="hero-foot" {...rise(2.2)}>
        <p>Cottages and villas by the beach on Jolly Hall Bay, and villas on the hill above it. Elizabeth Harbour, George Town, Exuma, fifteen minutes from the airport.</p>
        <div className="acts">
          <a className="link num" href={`tel:${BIZ.tel}`}>Call {BIZ.phone}</a>
          <a className="btn btn-primary" href={BIZ.booking}>Check availability</a>
        </div>
      </motion.div>
    </section>
  )
}
