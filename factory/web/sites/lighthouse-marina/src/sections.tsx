import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { photos, biz } from './data'
import { Img } from './ui'

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

function Fuel() {
  return (
    <section id="fuel" aria-labelledby="fuel-h">
      <div className="fuel__photo"><Img p={photos.dock} sizes="100vw" max={2000} /></div>
      <div className="navy">
        <div className="wrap fuel__text">
          <h2 id="fuel-h" className="t56">Two gas pumps, one diesel, and the only marine fuel station on Elbow&nbsp;Cay.</h2>
          <div className="fuel__facts">
            <p className="t18">The docks and the fuel station have been rebuilt, and the gift shop renovated. Fill the tank, then pick up what the day needs on the same dock.</p>
            <ul className="t18">
              <li>Bait: ballyhoo, squid, shrimp, minnows</li>
              <li>Ice, snacks and soft drinks</li>
              <li>Tokens for the laundry, sold on the fuel dock</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

type Frame = { key: string; label: string; render: () => JSX.Element; width: string }

const frames: Frame[] = [
  { key: 'intro', label: 'Along the dock', width: 'min(34vw, 460px)', render: () => (
    <div className="fr fr--intro">
      <h2 id="dock-h" className="t56">Along the dock, left to right.</h2>
      <p className="t18 muted">Slips, the yard, the store. All of it a short walk from the pumps.</p>
    </div>) },
  { key: 'slips', label: 'Slips', width: 'calc(var(--fh) * 0.75 + min(26vw, 360px) + 32px)', render: () => (
    <div className="fr fr--side">
      <div className="fr__img" style={{ aspectRatio: '3 / 4' }}><Img p={photos.open} sizes="(max-width: 767px) 86vw, 40vw" max={1400} /></div>
      <div className="fr__txt">
        <h3 className="t28">Six protected slips</h3>
        <p className="t18">Up to 60 ft LOA and 6 ft of draft at low water. Deep water dockage, 30 and 50 amp power, hot showers and a laundry, backed by a 60 kW standby generator.</p>
        <a className="link t18" href="#fit">Check your boat</a>
      </div>
    </div>) },
  { key: 'yard', label: 'Boatyard', width: 'calc(var(--fh) * 1.333)', render: () => (
    <div className="fr">
      <div className="fr__img" style={{ aspectRatio: '4 / 3' }}><Img p={photos.yard} sizes="(max-width: 767px) 86vw, 70vw" max={2000} /></div>
      <div className="fr__cap">
        <h3 className="t28">Haul-out and dry storage to 10 tons</h3>
        <p className="t18">Factory-trained technicians and Mercury Outboard sales and service. Engines, bottom paint, fiberglass, brite work and detailing. Yard open Monday to Friday, 8:00 to 4:00.</p>
        <a className="link t18" href="boatyard.html">See the yard rates</a>
      </div>
    </div>) },
  { key: 'store', label: "Ship's store", width: 'calc(var(--fh) * 0.75 + var(--fh) * 0.5 + 16px)', render: () => (
    <div className="fr">
      <div className="fr__pair">
        <div className="fr__img" style={{ aspectRatio: '3 / 4' }}><Img p={photos.store} sizes="(max-width: 767px) 50vw, 30vw" max={1400} /></div>
        <div className="fr__img fr__img--small" style={{ aspectRatio: '1 / 1' }}><Img p={photos.crate} sizes="(max-width: 767px) 40vw, 20vw" max={1000} /></div>
      </div>
      <div className="fr__cap">
        <h3 className="t28">The ship's store</h3>
        <p className="t18">The largest selection of rods and fishing tackle on the island, marine supplies, clothing and local crafts. Monday to Saturday, 8:00 to 4:00.</p>
      </div>
    </div>) },
  { key: 'ask', label: 'Request', width: 'min(36vw, 480px)', render: () => (
    <div className="fr fr--ask navy">
      <h3 className="t56">Coming in?</h3>
      <p className="t18 muted">Tell the office your length, draft and dates. They answer by phone, email or on 16.</p>
      <a className="btn" href="#contact">Request a slip</a>
    </div>) },
]

function Dock() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const travel = useRef(0)
  const [h, setH] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  useIso(() => {
    const measure = () => {
      if (!track.current) return
      if (window.matchMedia('(max-width: 767px)').matches) { travel.current = 0; setH(null); return }
      travel.current = Math.max(0, track.current.scrollWidth - window.innerWidth)
      setH(travel.current + window.innerHeight)
    }
    measure(); window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, v => -Math.min(1, Math.max(0, v)) * travel.current)
  const bar = useTransform(scrollYProgress, v => Math.min(1, Math.max(0, v)))
  useMotionValueEvent(scrollYProgress, 'change', v => {
    const i = Math.min(frames.length - 2, Math.max(0, Math.round(v * (frames.length - 2))))
    setActive(a => (a === i ? a : i))
  })
  const go = (i: number) => {
    const el = ref.current; if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (i / (frames.length - 2)) * travel.current, behavior: 'smooth' })
  }
  return (
    <section id="dock" ref={ref} className="dock" aria-labelledby="dock-h" data-stage style={h ? { height: h } : undefined}>
      <div className="dock__pin">
        <motion.div className="dock__track" ref={track} style={{ x }}>
          {frames.map(f => <div key={f.key} className="dock__item" style={{ ['--w' as string]: f.width }}>{f.render()}</div>)}
        </motion.div>
        <nav className="dock__nav" aria-label="Along the dock">
          <span className="dock__line" aria-hidden><motion.i style={{ scaleX: bar }} /></span>
          {frames.slice(1).map((f, i) => (
            <button key={f.key} type="button" onClick={() => go(i)} aria-current={active === i ? 'step' : undefined}>{f.label}</button>
          ))}
        </nav>
      </div>
    </section>
  )
}

function Fit() {
  const [loa, setLoa] = useState(34)
  const [draft, setDraft] = useState(3.5)
  const ok = loa <= 60 && draft <= 6
  const request = () => {
    const a = document.getElementById('req-loa') as HTMLInputElement | null
    const b = document.getElementById('req-draft') as HTMLInputElement | null
    const t = document.getElementById('req-type') as HTMLSelectElement | null
    if (a) a.value = String(loa); if (b) b.value = String(draft); if (t) t.value = 'A slip'
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const gauge = (v: number, max: number, limit: number, unit: string, label: string) => (
    <div className="gauge">
      <div className="gauge__row t14"><span>{label}</span><span className="num">limit {limit} {unit}</span></div>
      <div className="gauge__bar" aria-hidden>
        <i style={{ transform: `scaleX(${Math.min(1, v / max)})`, background: v <= limit ? 'var(--navy)' : 'var(--teak)' }} />
        <b style={{ left: `${(limit / max) * 100}%` }} />
      </div>
    </div>
  )
  return (
    <section id="fit" className="fit wrap" aria-labelledby="fit-h">
      <div className="fit__head">
        <h2 id="fit-h" className="t120">Will she fit?</h2>
        <p className="t18 muted">Our slips take up to 60 ft LOA and 6 ft of draft at low water. Move the sliders to your boat.</p>
      </div>
      <div className="fit__body">
        <div className="fit__controls">
          <label className="fit__ctl">
            <span className="t14">Length overall</span>
            <output className="t56">{loa} ft</output>
            <input type="range" min={15} max={80} step={1} value={loa} onChange={e => setLoa(+e.target.value)} aria-label="Length overall in feet" />
          </label>
          {gauge(loa, 80, 60, 'ft', 'Slip length')}
          <label className="fit__ctl">
            <span className="t14">Draft</span>
            <output className="t56">{draft.toFixed(1)} ft</output>
            <input type="range" min={1.5} max={9} step={0.5} value={draft} onChange={e => setDraft(+e.target.value)} aria-label="Draft in feet" />
          </label>
          {gauge(draft, 9, 6, 'ft', 'Water at low tide')}
        </div>
        <div className="fit__answer" aria-live="polite">
          <p className="t56">{ok ? 'Yes, she fits.' : 'Call the dockmaster first.'}</p>
          <p className="t18 muted">{ok
            ? `A ${loa} ft boat drawing ${draft.toFixed(1)} ft is inside our published limits. Tell us your dates and we will hold a slip if one is free.`
            : `A ${loa} ft boat drawing ${draft.toFixed(1)} ft is beyond our published limits of 60 ft and 6 ft. Call ${biz.phones[0].label} or VHF ${biz.vhf} before you come in.`}</p>
          {ok
            ? <button className="btn" type="button" onClick={request}>Request a slip for this boat</button>
            : <a className="btn" href={`tel:${biz.phones[0].tel}`}>Call {biz.phones[0].label}</a>}
        </div>
      </div>
    </section>
  )
}

function Yard() {
  const rows = [
    ['$5.50', 'per foot to haul a single hull, the same to launch'],
    ['$200', 'a month to store a single hull up to 25 ft'],
    ['$110', 'an hour for the mechanic, Monday to Friday'],
  ]
  return (
    <section className="yard" aria-labelledby="yard-h">
      <div className="wrap yard__in">
        <div>
          <h2 id="yard-h" className="t56">The yard rates are published. All of them.</h2>
          <p className="t18 muted" style={{ marginTop: 'var(--s-3)', maxWidth: '38ch' }}>Rates effective November 2024, plus 10% VAT. Haul, block, store, pressure clean and launch: every line is on one sheet.</p>
          <a className="btn" href="boatyard.html" style={{ marginTop: 'var(--s-4)' }}>Estimate a haul-out and storage</a>
        </div>
        <dl className="yard__list">
          {rows.map(([n, t]) => (
            <div key={n}><dt>{n}</dt><dd className="t18">{t}</dd></div>
          ))}
        </dl>
      </div>
      <p className="wrap t14 muted yard__note">Ashore: the marina's two rental cottages, Westview Cottage and Lighthouse Point, are currently let on long-term rental.</p>
    </section>
  )
}

export default function Sections() {
  return (<><Fuel /><Dock /><Fit /><Yard /></>)
}
