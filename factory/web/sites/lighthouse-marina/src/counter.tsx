import { useEffect, useRef, useState } from 'react'
import { biz, rates } from './data'

export const money = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
type Hull = 'single' | 'twin'
type Opt = { haul: boolean; blocking: boolean; launch: boolean; pressure: boolean }

export function estimate(ft: number, hull: Hull, months: number, opt: Opt) {
  const r = hull === 'single' ? rates.single : rates.twin
  const monthly = hull === 'twin' ? rates.storage.twin * ft : ft <= 25 ? rates.storage.upTo25 : ft <= 30 ? rates.storage.to30 * ft : rates.storage.over30 * ft
  const lines: [string, number][] = []
  if (opt.haul) lines.push([`Haul, ${ft} ft at ${money(r.haul)}`, r.haul * ft])
  if (opt.blocking) lines.push(['Blocking', r.blocking])
  if (opt.pressure) lines.push([`Pressure clean at ${money(r.pressure)}/ft`, r.pressure * ft])
  if (months > 0) lines.push([`Storage, ${months} ${months === 1 ? 'month' : 'months'} at ${money(monthly)}/month`, monthly * months])
  if (opt.launch) lines.push([`Launch, ${ft} ft at ${money(r.launch)}`, r.launch * ft])
  const sub = lines.reduce((a, l) => a + l[1], 0)
  const vat = Math.round(sub * rates.vat * 100) / 100
  return { lines, sub, vat, total: sub + vat }
}


function Stepper({ label, value, min, max, step, unit, onChange, fmt = (v: number) => String(v) }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void; fmt?: (v: number) => string }) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, Math.round(v / step) * step)))
  return (
    <div className="stp">
      <span className="t14 p-muted">{label}</span>
      <div className="stp__row">
        <button type="button" aria-label={`Less ${label.toLowerCase()}`} disabled={value <= min} onClick={() => set(value - step)}>{'−'}</button>
        <output className="stp__out num" aria-live="polite">{fmt(value)}<small>{unit}</small></output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => set(value + step)}>+</button>
      </div>
    </div>
  )
}

function Gauge({ label, v, max, limit, unit }: { label: string; v: number; max: number; limit: number; unit: string }) {
  const over = v > limit
  return (
    <div className="gauge">
      <div className="gauge__row t14"><span>{label}</span><span className="num p-muted">limit {limit} {unit}</span></div>
      <div className="gauge__bar" aria-hidden="true">
        <i className={over ? 'over' : ''} style={{ transform: `scaleX(${Math.min(1, v / max)})` }} />
        <b style={{ left: `${(limit / max) * 100}%` }} />
      </div>
    </div>
  )
}

export function Counter({ mode = 'both' }: { mode?: 'both' | 'yard' }) {
  const [loa, setLoa] = useState(28)
  const [draft, setDraft] = useState(3)
  const [hull, setHull] = useState<Hull>('single')
  const [months, setMonths] = useState(3)
  const [opt, setOpt] = useState<Opt>({ haul: true, blocking: true, launch: true, pressure: false })
  const fits = loa <= 60 && draft <= 6
  const e = estimate(loa, hull, months, opt)
  const verdict = fits ? 'She fits a slip.' : loa > 60 ? 'Too long for our slips (60 ft max). Call the dockmaster.' : 'Too deep at low water (6 ft max). Call the dockmaster.'
  const boat = `${loa} ft ${hull} hull, ${draft} ft draft`
  const wantSlip = mode === 'both' && fits
  const subject = `Haul-out request: ${boat}`
  const slipMail = `mailto:${biz.email}?subject=${encodeURIComponent(`Slip request: ${boat}`)}&body=${encodeURIComponent(`Boat: ${boat}.\nArriving: \nNights: \nName: \n\nPlease send your dockage rates.`)}`
  const body = [`Boat: ${boat}.`, ...(months ? [`Dry storage: ${months} month(s).`] : []), '', 'Estimate from your website (November 2024 rates):', ...e.lines.map(([l, v]) => `${l}: ${money(v)}`), `VAT 10%: ${money(e.vat)}`, `Total: ${money(e.total)}`, '', 'Arriving: ', 'Name: '].join('\n')
  const mail = `mailto:${biz.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const fill = () => {
    const set = (sel: string, v: string) => { const el = document.querySelector(sel) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null; if (el) el.value = v }
    set('#req-type', wantSlip ? 'A slip' : 'Haul-out and dry storage'); set('#req-loa', String(loa)); set('#req-draft', String(draft))
    set('#req-msg', `${boat}. ${months ? `Storage ${months} month(s). ` : ''}Website estimate ${money(e.total)} incl. VAT.`)
  }
  const hullRef = useRef<(HTMLButtonElement | null)[]>([])
  const hk = (ev: React.KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return
    ev.preventDefault(); const n: Hull = hull === 'single' ? 'twin' : 'single'; setHull(n); hullRef.current[n === 'single' ? 0 : 1]?.focus()
  }
  return (
    <div className="panel" id="counter">
      <div className="panel__in">
        <p className="panel__q">{mode === 'both' ? 'Will she fit, and what will it cost?' : 'Estimate a haul-out'}</p>
        <div className="panel__grid">
          <Stepper label="Length overall" value={loa} min={10} max={80} step={1} unit=" ft" onChange={setLoa} />
          <Stepper label="Draft" value={draft} min={1} max={10} step={0.5} unit=" ft" onChange={setDraft} fmt={v => v.toFixed(1)} />
          <div className="stp">
            <span className="t14 p-muted" id="hull-l">Hull</span>
            <div className="hseg" role="radiogroup" aria-labelledby="hull-l">
              {(['single', 'twin'] as Hull[]).map((h, i) => (
                <button key={h} ref={el => { hullRef.current[i] = el }} type="button" role="radio" aria-checked={hull === h} tabIndex={hull === h ? 0 : -1} onClick={() => setHull(h)} onKeyDown={hk}>{h === 'single' ? 'Single' : 'Twin'}</button>
              ))}
            </div>
          </div>
          <Stepper label="Months on the hard" value={months} min={0} max={12} step={1} unit="" onChange={setMonths} />
        </div>
        <div className="panel__opts" role="group" aria-label="Yard services in the estimate">
          {([['haul', 'Haul'], ['blocking', 'Blocking'], ['pressure', 'Pressure clean'], ['launch', 'Launch']] as const).map(([k, l]) => (
            <label key={k} className="chip"><input type="checkbox" checked={opt[k]} onChange={() => setOpt(o => ({ ...o, [k]: !o[k] }))} /><span>{l}</span></label>
          ))}
        </div>
        {mode === 'both' && (
          <div className="fitbox">
            <p className={`verdict ${fits ? '' : 'no'}`} aria-live="polite">{verdict}</p>
            <Gauge label="Length" v={loa} max={80} limit={60} unit="ft" />
            <Gauge label="Draft at low water" v={draft} max={10} limit={6} unit="ft" />
          </div>
        )}
      </div>
      <div className="panel__out">
        <div className="ticket" aria-live="polite">
          <p className="ticket__h">{mode === 'both' ? 'If you haul out: yard estimate' : 'Yard estimate'}</p>
          <ul className="ticket__lines t14">
            {e.lines.map(([l, v]) => <li key={l.split(',')[0]}><span>{l}</span><i aria-hidden="true" /><span className="num">{money(v)}</span></li>)}
            <li><span>VAT 10%</span><i aria-hidden="true" /><span className="num">{money(e.vat)}</span></li>
          </ul>
          <p className="ticket__total"><span className="t14 p-muted">Haul-out total</span><span className="num">{money(e.total)}</span></p>
          <p className="t14 p-muted">November 2024 rates. The yard lifts boats to 10 tons and confirms the final price.</p>
        </div>
        <div className="panel__acts">
          {mode === 'both' && fits && <a className="btn" href={slipMail}>Request a slip</a>}
          {mode === 'both' && fits && <p className="t14 p-muted">Dockage rates on request.</p>}
          <a className={mode === 'both' && fits ? 'btn btn--ghost' : 'btn'} href={mail}>Request this haul-out</a>
          <p className="panel__links"><a className="plink num" href={`tel:${biz.phones[0].tel}`}>Call {biz.phones[0].label}</a><span className="plink plink--static">VHF {biz.vhf}</span><a className="plink plink--small" href="#contact" onClick={fill}>Full form</a></p>
        </div>
      </div>
    </div>
  )
}
