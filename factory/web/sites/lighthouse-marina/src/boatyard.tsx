import { useState } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles.css'
import { Header, Contact, Footer } from './ui'
import { rates, biz } from './data'

const money = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function Estimator() {
  const [hull, setHull] = useState<'single' | 'twin'>('single')
  const [ft, setFt] = useState(28)
  const [months, setMonths] = useState(3)
  const [opt, setOpt] = useState({ haul: true, blocking: true, pressure: true, launch: true })
  const r = hull === 'single' ? rates.single : rates.twin
  const monthly = hull === 'twin' ? rates.storage.twin * ft : ft <= 25 ? rates.storage.upTo25 : ft <= 30 ? rates.storage.to30 * ft : rates.storage.over30 * ft
  const lines: [string, number][] = []
  if (opt.haul) lines.push([`Haul, ${ft} ft at ${money(r.haul)}/ft`, r.haul * ft])
  if (opt.blocking) lines.push(['Blocking', r.blocking])
  if (opt.pressure) lines.push([`Pressure clean, ${money(r.pressure)}/ft`, r.pressure * ft])
  if (months > 0) lines.push([`Storage, ${months} ${months === 1 ? 'month' : 'months'} at ${money(monthly)}`, monthly * months])
  if (opt.launch) lines.push([`Launch, ${money(r.launch)}/ft`, r.launch * ft])
  const sub = lines.reduce((a, l) => a + l[1], 0)
  const vat = sub * rates.vat
  const request = () => {
    const t = document.getElementById('req-type') as HTMLSelectElement | null
    const a = document.getElementById('req-loa') as HTMLInputElement | null
    const m = document.querySelector('[name="Message"]') as HTMLTextAreaElement | null
    if (t) t.value = 'Haul-out and dry storage'; if (a) a.value = String(ft)
    if (m) m.value = `${hull === 'single' ? 'Single' : 'Twin'} hull, ${ft} ft. Storage for ${months} month(s). Estimate from your website: ${money(sub + vat)} incl. VAT.`
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const toggle = (k: keyof typeof opt) => setOpt(o => ({ ...o, [k]: !o[k] }))
  return (
    <section className="est" aria-labelledby="est-h">
      <div className="est__in">
        <h2 id="est-h" className="t28">Estimate a haul-out</h2>
        <div className="seg" role="group" aria-label="Hull type">
          <button type="button" aria-pressed={hull === 'single'} onClick={() => setHull('single')}>Single hull</button>
          <button type="button" aria-pressed={hull === 'twin'} onClick={() => setHull('twin')}>Twin hull</button>
        </div>
        <label className="fit__ctl"><span className="t14">Length</span><output className="t56">{ft} ft</output>
          <input type="range" min={15} max={45} value={ft} onChange={e => setFt(+e.target.value)} aria-label="Boat length in feet" /></label>
        <label className="fit__ctl"><span className="t14">Months on the hard</span><output className="t56">{months}</output>
          <input type="range" min={0} max={12} value={months} onChange={e => setMonths(+e.target.value)} aria-label="Months of storage" /></label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {([['haul', 'Haul'], ['blocking', 'Blocking'], ['pressure', 'Pressure clean'], ['launch', 'Launch']] as const).map(([k, l]) => (
            <label key={k} className="chk"><input type="checkbox" checked={opt[k]} onChange={() => toggle(k)} />{l}</label>
          ))}
        </div>
      </div>
      <div className="est__out navy" aria-live="polite">
        <ul className="est__lines t14">
          {lines.map(([l, v]) => <li key={l}><span>{l}</span><span className="num">{money(v)}</span></li>)}
          <li><span>VAT 10%</span><span className="num">{money(vat)}</span></li>
        </ul>
        <div>
          <p className="t14 muted">Estimated total</p>
          <p className="t120 num" style={{ fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>{money(sub + vat)}</p>
          <p className="t14 muted" style={{ marginTop: 'var(--s-2)' }}>From the published November 2024 rates. The yard confirms the final price.</p>
        </div>
        <button className="btn" type="button" onClick={request} style={{ justifySelf: 'start' }}>Request this haul-out</button>
      </div>
    </section>
  )
}

const sheet: [string, [string, string][]][] = [
  ['Hauling and launching', [['Single hull, haul', '$5.50 /ft'], ['Single hull, launch', '$5.50 /ft'], ['Single hull, blocking', '$50.00'], ['Round trip, same day', '$8.00 /ft'], ['Twin hull, haul', '$7.00 /ft'], ['Twin hull, launch', '$7.00 /ft'], ['Twin hull, blocking', '$60.00']]],
  ['Dry storage, per month', [['Single hull up to 25 ft', '$200.00'], ['Single hull 25 to 30 ft', '$8.50 /ft'], ['Single hull over 30 ft', '$9.00 /ft'], ['Twin hull', '$9.00 /ft']]],
  ['Yard work', [['Pressure cleaning, single hull', '$6.00 /ft'], ['Pressure cleaning, twin hull', '$8.00 /ft'], ['Bottom painting', '$50 /hr'], ['Storage prep', '$60 /hr'], ['Launch prep', '$60 /hr'], ['Fiberglass', '$150 /hr'], ['Compound and waxing', '$50 /hr'], ['Brite work', '$40 /hr'], ['Cleaning', '$40 /hr'], ['Do it yourself', '$50 /day']]],
  ['Engines and equipment', [['Mechanic', '$110 /hr'], ['Forklift', '$90 /hr'], ['Engine fogging, 2 / 3 / 4 and 6 cyl', '$50 / $65 / $85'], ['Engine flush', '$40 / $55']]],
]

function Boatyard() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header page="boatyard" />
      <main id="main">
        <div className="by-head">
          <h1 className="t120">Boatyard rates.</h1>
          <p className="t18 muted">Haul-out, blocking, dry storage and launch, up to 10 tons. Monday to Friday, 8:00 to 4:00, closed weekends and holidays. Rates effective November 2024, plus 10% VAT on all services.</p>
        </div>
        <Estimator />
        <section className="sheet" aria-label="Rate sheet">
          {sheet.map(([h, rows]) => (
            <div key={h}><h2>{h}</h2><table><tbody>{rows.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody></table></div>
          ))}
          <p className="t14 muted" style={{ gridColumn: '1 / -1' }}>Questions about a rate? Call {biz.phones[0].label} or {biz.phones[1].label}.</p>
        </section>
        <Contact preset="Haul-out and dry storage" />
      </main>
      <Footer />
    </>
  )
}
const el = document.getElementById('root')!
if (el.hasChildNodes()) hydrateRoot(el, <Boatyard />); else createRoot(el).render(<Boatyard />)
