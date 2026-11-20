import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence } from 'motion/react'
import { Header, CallingCard, Footer, MobileCall, mount, PHONE, TEL, COORD, reduced } from './common'
import { IMG, type Img } from './images'

const Arrival = lazy(() => import('./Arrival'))

const CHAPTERS: { at: [number, number]; text: string }[] = [
  { at: [0.0, 0.16], text: `${COORD}. Open water off Lucaya, Grand Bahama, as the sun goes down.` },
  { at: [0.2, 0.4], text: 'Ahead, the island: low and dark, its shore lights coming on.' },
  { at: [0.43, 0.6], text: 'Bell Channel. The cut from the open sea into Bell Channel Bay.' },
  { at: [0.63, 0.79], text: 'On its shore, between the canal and the beach, the club.' },
]


const sm = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => { try { const c = document.createElement('canvas'); setOk(!!(c.getContext('webgl2') || c.getContext('webgl'))) } catch { setOk(false) } }, [])
  return ok
}

function ArrivalStage() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // only the chapter index and visibility are React state; every fade is a motion value (no re-render per scroll frame)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(true)
  useMotionValueEvent(p, 'change', v => {
    const i = CHAPTERS.findIndex(c => v >= c.at[0] && v < c.at[1])
    setActive(a => (a === i ? a : i))
  })
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '200px 0px' })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const gl = useWebGL()
  const still = reduced()
  // function transforms on purpose: motion's native scroll-timeline acceleration mis-maps these ranges
  const photo = useTransform(p, v => sm(0.8, 0.93, v))
  const photoScale = useTransform(p, v => 1.08 - 0.08 * sm(0.8, 0.93, v))
  const title = useTransform(p, v => 1 - sm(0.06, 0.16, v))
  const grade = useTransform(p, v => sm(0.25, 0.85, v))
  const foot = useTransform(p, v => 1 - sm(0.7, 0.8, v))
  return (
    <section id="arrival" ref={ref} className="stage" aria-label="Arriving at Bell Channel from the sea">
      <div className="stage__pin">
        <div className="stage__scene" aria-hidden="true">
          <img className="stage__poster" src="poster-dusk.jpg" alt="" />
          {gl && <Suspense fallback={null}><Arrival progress={p} still={still} active={inView} className="stage__canvas" /></Suspense>}
          <motion.div className="stage__grade" style={{ opacity: grade }} />
        </div>
        <motion.figure className="stage__photo" style={{ opacity: photo }}>
          <motion.img src={IMG.bay.src} alt={IMG.bay.alt} style={{ scale: photoScale }} decoding="async" loading="lazy" data-source="commons" />
          <figcaption className="sub sub--photo">{IMG.bay.caption}</figcaption>
        </motion.figure>
        <Header tone="dark" />
        <motion.div className="hero" style={{ opacity: title }}>
          <h1 className="hero__h1"><span className="hero__big">Bell Channel</span><span className="hero__small">Club &amp; Marina, Lucaya, Grand Bahama</span></h1>
        </motion.div>
        <div className="stage__subs" aria-live="off">
          <AnimatePresence mode="wait">
            {active >= 0 && (
              <motion.p key={active} className="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}>
                {CHAPTERS[active].text}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <motion.div className="stage__foot" style={{ opacity: foot }}>
          <span className="stage__hint">Scroll to come in from the sea</span>
          <a className="stage__tel nw" href={TEL}>Club office {PHONE}</a>
        </motion.div>
      </div>
      {/* the chapters, for readers, search engines and anyone without the scene */}
      <ol className="sr-only">{CHAPTERS.map(c => <li key={c.text}>{c.text}</li>)}</ol>
    </section>
  )
}

function TwoWaters() {
  const [side, setSide] = useState<'canal' | 'beach'>('beach')
  const img: Img = side === 'canal' ? IMG.dockline : IMG.beach
  return (
    <section className="two" aria-labelledby="two-h">
      <AnimatePresence initial={false}>
        <motion.img key={img.src} className="two__img" src={img.src} alt={img.alt} loading="lazy" decoding="async" data-source={img.source}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }} />
      </AnimatePresence>
      <div className={`two__over two__over--${side}`}>
        <h2 id="two-h" className="display">Two waters, one quiet gate.</h2>
        <p className="lede">A gated community of condominiums and townhouses in Lucaya. One side lies on the canal, the other on the beach, and the homes look out over the inlet into Port Lucaya.</p>
        <div className="toggle" role="radiogroup" aria-label="Show a side of the club">
          <button role="radio" aria-checked={side === 'beach'} onClick={() => setSide('beach')}>The beach side</button>
          <button role="radio" aria-checked={side === 'canal'} onClick={() => setSide('canal')}>The canal side</button>
        </div>
      </div>
      <p className="two__cap">{img.caption}</p>
    </section>
  )
}

const AMENITIES: { t: string; d: string; img?: Img }[] = [
  { t: 'A heated pool', d: 'Warm water through the cooler months.', img: IMG.pool },
  { t: 'Tennis courts', d: 'Best played early, before the heat.', img: IMG.tennis },
  { t: 'The beach', d: 'Kept by the owners’ association.', img: IMG.beach },
  { t: 'The owners’ marina', d: 'Private, for owners, when a slip is free.' },
  { t: 'An owners’ library', d: 'A reading room for owners.' },
  { t: 'Storage garages', d: 'A limited number, for owners.' },
  { t: 'Reverse osmosis water', d: 'Piped to every home.' },
  { t: 'A gate, and pets welcome', d: 'A quiet corner of Lucaya.' },
]

function Club() {
  const [i, setI] = useState(0)
  const shown = AMENITIES.slice(0, i + 1).reverse().find(a => a.img)?.img ?? IMG.pool
  return (
    <section id="club" className="club" aria-labelledby="club-h">
      <figure className="club__fig">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img key={shown.src} src={shown.src} alt={shown.alt} loading="lazy" decoding="async" data-source={shown.source}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }} />
        </AnimatePresence>
        <figcaption className="cap">{shown.caption}</figcaption>
      </figure>
      <div className="club__text">
        <h2 id="club-h" className="display">What the club keeps.</h2>
        <ul className="amen">
          {AMENITIES.map((a, k) => (
            <li key={a.t}>
              <button className={k === i ? 'is-on' : ''} onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)} aria-pressed={k === i}>
                <span className="amen__t">{a.t}</span><span className="amen__d">{a.d}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const ASK = [
  { k: 'owner', q: 'I own a home at the club', a: 'The marina is kept for owners. Call the club office to ask which slip is free for your boat and when.' },
  { k: 'guest', q: 'I am staying with an owner', a: 'Slips go to owners first. Ask your host, then the office, whether one can be arranged for your stay.' },
  { k: 'visit', q: 'I am bringing a visiting boat', a: 'This is a private marina, so call before you come in. If the club has no space, Port Lucaya Marina is inside the same cut.' },
  { k: 'buy', q: 'I am buying or renting here', a: 'Listings describe the slips as “if available”: a slip does not come with every home. The office can explain how it works before you commit.' },
]

function Marina() {
  const [k, setK] = useState('owner')
  const cur = ASK.find(a => a.k === k)!
  return (
    <section className="mar" aria-labelledby="mar-h">
      <h2 id="mar-h" className="display display--xl">A private marina,<br />for owners.</h2>
      <div className="mar__grid">
        <div className="ask" role="radiogroup" aria-label="Who is asking?">
          <p className="ask__q">Who is asking?</p>
          {ASK.map(a => <button key={a.k} role="radio" aria-checked={a.k === k} onClick={() => setK(a.k)}>{a.q}</button>)}
        </div>
        <div className="ask__a" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>{cur.a}</motion.p>
          </AnimatePresence>
          <div className="ask__cta">
            <a className="btn" href={TEL}>Call the club office</a>
            <a className="link" href="marina.html">Prepare your slip question</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Here() {
  return (
    <section className="here" aria-labelledby="here-h">
      <img className="here__img" src="channel-night.jpg" alt="Blue hour at Bell Channel: the low shore of Grand Bahama, lit windows, and the red and green lights on the breakwater heads" loading="lazy" decoding="async" />
      <h2 id="here-h" className="display here__h">Where the inlet opens.</h2>
      <div className="here__subs">
        <p><span>By sea.</span> Come in from the south shore of Grand Bahama through Bell Channel, the cut into Bell Channel Bay. Call the office before you arrive.</p>
        <p><span>By air.</span> Grand Bahama International Airport, Freeport.</p>
        <p><span>Across the water.</span> The shops and restaurants of Port Lucaya Marketplace, at the head of the inlet.</p>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ArrivalStage />
      <main id="main">
        <TwoWaters />
        <Club />
        <Marina />
        <Here />
      </main>
      <CallingCard />
      <Footer />
      <MobileCall />
    </>
  )
}

mount(<Home />)
