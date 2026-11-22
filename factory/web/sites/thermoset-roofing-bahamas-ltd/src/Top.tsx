// Screen 1: the work order. Inputs on the left, their crew photo and the live answer on the right.
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { business, photos, KINDS, likeYours, sqw, makers, clientIndex, type Kind } from './data'

const ease = [0.22, 1, 0.36, 1] as const
type Problem = 'leak' | 'new' | 'reroof' | 'water' | 'plan'
const PROBLEMS: [Problem, string][] = [['leak', 'A leak now'], ['new', 'A new roof'], ['reroof', 'Re-roofing'], ['water', 'Waterproofing'], ['plan', 'Maintenance plan']]
type Roof = 'flat' | 'pitched' | 'unsure'
const ROOFS: [Roof, string][] = [['flat', 'Flat'], ['pitched', 'Pitched'], ['unsure', 'Not sure']]
const ISLANDS = ['New Providence', 'Paradise Island', 'Grand Bahama', 'Another island']

function recommend(kind: Kind, problem: Problem, roof: Roof): { name: string; line: string } {
  const flat = { name: 'TPO and PVC single-ply membrane systems', line: 'High-performance thermoplastic membranes for flat roofs, or torch-applied modified bitumen where multi-layer suits better.' }
  const pitched = { name: 'Standing seam metal or shingles', line: 'Custom fabricated aluminium or steel panels with concealed fasteners and Kynar finishes, or architectural, synthetic and 3-tab shingles.' }
  if (problem === 'leak') return { name: 'Leak detection and emergency repairs', line: kind === 'home' ? 'Find where the water gets in, repair it, and report what the rest of the roof needs.' : 'Find where the water gets in and repair it. R.A.D.A.R. members go to the front of the line in storm events.' }
  if (problem === 'water') return { name: 'Terrace and balcony waterproofing', line: 'Liquid-applied membranes beneath tile or concrete toppings, with planter, solar plinth and equipment curb detailing.' }
  if (problem === 'plan') {
    const plan = kind === 'commercial' ? 'commercial complexes' : kind === 'industrial' ? 'industrial facilities' : kind === 'home' ? 'luxury residential estates' : 'your property'
    return { name: `R.A.D.A.R. for ${plan}`, line: 'Scheduled inspections, leak response, condition reports and warranty compliance monitoring. Starts with a free roof health assessment.' }
  }
  const sys = roof === 'flat' ? flat : roof === 'pitched' ? pitched : { name: 'A free estimate on site', line: 'Thermoset looks at the roof first, then recommends the system: single-ply, modified bitumen, standing seam metal or shingles.' }
  if (problem === 'reroof') return { name: 'Roof replacement and re-roofing', line: roof === 'unsure' ? 'Full tear-off and reinstallation of an aged or failing roof. The system is chosen after the free estimate.' : `Full tear-off and reinstallation. ${sys.name}: ${sys.line.charAt(0).toLowerCase()}${sys.line.slice(1)}` }
  return sys
}

function Chips<T extends string>({ name, legend, opts, value, onChange }: { name: string; legend: string; opts: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset className="wo__set">
      <legend>{legend}</legend>
      <div className="wo__chips">
        {opts.map(([v, label]) => (
          <label key={v} className={`chip${value === v ? ' is-on' : ''}`}>
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />{label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function TopBar() {
  return (
    <header className="top">
        <a className="top__name" href="./" aria-label={`${business.name}, home`}>Thermoset <span>Roofing Bahamas</span></a>
        <nav className="top__nav" aria-label="Sections">
          <a href="#clients">Clients</a><a href="#services">Services</a><a href="#radar">R.A.D.A.R.</a><a href="#contact">Contact</a>
        </nav>
        <a className="top__tel" href={business.office.href}>{business.office.label}</a>
      </header>
  )
}

export default function Top() {
  const [kind, setKind] = useState<Kind>('commercial')
  const [problem, setProblem] = useState<Problem>('leak')
  const [roof, setRoof] = useState<Roof>('unsure')
  const [island, setIsland] = useState(ISLANDS[0])
  const [who, setWho] = useState('')
  const [tel, setTel] = useState('')
  useEffect(() => {
    const on = (e: Event) => {
      const a = (e.target as HTMLElement).closest?.('[data-job]') as HTMLElement | null
      if (!a) return
      e.preventDefault(); setProblem(a.dataset.job as Problem)
      document.getElementById('request')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    }
    addEventListener('click', on); return () => removeEventListener('click', on)
  }, [])
  const pickKind = (k: Kind) => { setKind(k); dispatchEvent(new CustomEvent('tr:type', { detail: k })) }
  const rec = recommend(kind, problem, roof)
  const names = likeYours(kind)
  const count = clientIndex.filter(c => c.kind === kind).length
  const plural = KINDS.find(k => k[0] === kind)![2]
  const kindLabel = KINDS.find(k => k[0] === kind)![1]
  const probLabel = PROBLEMS.find(p => p[0] === problem)![1]
  const mail = useMemo(() => {
    const body = `Hello Croix,\n\nI would like a free estimate.\n\nBuilding: ${kindLabel}\nWhat it needs: ${probLabel}\nRoof: ${ROOFS.find(r => r[0] === roof)![1]}\nIsland: ${island}\nSuggested on your site: ${rec.name}\n\nMy name: ${who}\nPhone: ${tel}\nAddress of the building:\n`
    return `mailto:${business.people[1].email}?cc=${business.people[0].email}&subject=${encodeURIComponent(`Free estimate request: ${probLabel.toLowerCase()}, ${kindLabel.toLowerCase()}`)}&body=${encodeURIComponent(body)}`
  }, [kindLabel, probLabel, roof, island, rec.name, who, tel])
  const hero = photos[0]

  return (
    <>
      <section id="request" className="wo" aria-labelledby="wo-title">
        <div className="wo__left">
          <h1 id="wo-title">The roof over the brands you know, and over yours.</h1>
          <p className="wo__lead">Roofing and waterproofing across New Providence and the islands since 2002, by factory certified installers of {makers.slice(0, -1).join(', ')} and {makers[makers.length - 1]}. Every estimate is free.</p>
          <form className="wo__form" onSubmit={e => e.preventDefault()} aria-label="Roof request">
            <Chips name="kind" legend="The building" opts={KINDS.map(([k, l]) => [k, l] as [Kind, string])} value={kind} onChange={pickKind} />
            <Chips name="problem" legend="What it needs" opts={PROBLEMS} value={problem} onChange={setProblem} />
            <div className="wo__row">
              <Chips name="roof" legend="The roof" opts={ROOFS} value={roof} onChange={setRoof} />
              <label className="wo__island"><span>Island</span>
                <select value={island} onChange={e => setIsland(e.target.value)}>{ISLANDS.map(i => <option key={i}>{i}</option>)}</select>
              </label>
            </div>
          </form>
        </div>

        <div className="wo__right">
          <figure className="wo__photo ph">
            <img src={sqw(hero.src, 1500)} width={1500} height={1125} alt={hero.alt} fetchPriority="high" />
            <figcaption>{hero.cap}. Photograph: Thermoset.</figcaption>
          </figure>
          <div className="wo__card" id="wo-card">
              <motion.div aria-live="polite" key={rec.name + kind} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease }}>
                <p className="wo__label">{kindLabel}, {island}: {probLabel.charAt(0).toLowerCase() + probLabel.slice(1)}</p>
                <h2 className="wo__rec">{rec.name}</h2>
                <p className="wo__line">{rec.line}</p>
                <p className="wo__label wo__label--names">Thermoset has roofed {count} {plural.toLowerCase()}, including <a href="#clients" className="wo__all" onClick={() => dispatchEvent(new CustomEvent('tr:type', { detail: kind }))}>see them all</a></p>
                <ul className="wo__names">
                  {names.map((n, i) => <motion.li key={n} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease, delay: 0.05 + i * 0.04 }}>{n}</motion.li>)}
                </ul>
              </motion.div>
            <div className="wo__you">
              <label><span className="sr-only">Your name</span><input value={who} onChange={e => setWho(e.target.value)} placeholder="Your name" autoComplete="name" /></label>
              <label><span className="sr-only">Your phone</span><input type="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="Phone" autoComplete="tel" /></label>
            </div>
            <div className="wo__act">
              <a className="btn btn--sea" href={mail}>Send the request to Croix Culmer, GM</a>
              <p className="wo__calls">Or call <a href={business.people[1].href}>Croix {business.people[1].tel}</a>, <a href={business.people[0].href}>Stuart, the owner, {business.people[0].tel}</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
