import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Phone, ImagePlus } from 'lucide-react'
import { PlanSheet, widthFor } from './PlanSheet'
import { setStore, useStore, type Shape } from './store'
import { PHONE, TEL, promises } from './data'

const SHAPES: { v: Shape; t: string }[] = [
  { v: 'geometric', t: 'Geometric' }, { v: 'freeform', t: 'Free-form' }, { v: 'infinity', t: 'Infinity edge' },
  { v: 'spa', t: 'With spa' }, { v: 'renovate', t: 'Renovation' },
]
const ISLANDS_BUILD = ['New Providence', 'Paradise Island', 'Great Exuma', 'Another island']
const STAGES = ['Just dreaming', 'I have plans', 'I have an architect']
const SIZES = ['Not sure', 'Small, under 15,000 gal', 'Medium, 15,000 to 30,000 gal', 'Large, over 30,000 gal']
const ONISLAND = ['I live here', 'Part of the year', 'Rarely']
const ISSUES = ['Green or cloudy water', 'Equipment trouble', 'Leak or losing water', 'None, I want reliable service']
const ease = [0.22, 1, 0.36, 1] as const

function Chips({ legend, name, options, value, onChange }: { legend: string; name: string; options: string[] | { v: string; t: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="chips" aria-label={legend}>
      {options.map(o => { const v = typeof o === 'string' ? o : o.v, t = typeof o === 'string' ? o : o.t; return (
        <label className="chip" key={v}><input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} /><span>{t}</span></label>
      ) })}
    </fieldset>
  )
}

function Ticker({ value }: { value: string }) {
  return <AnimatePresence mode="popLayout" initial={false}><motion.span key={value} className="num" style={{ display: 'inline-block' }} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }} transition={{ duration: 0.18, ease }}>{value}</motion.span></AnimatePresence>
}

export const gallons = (shape: Shape, len: number) => {
  const w = widthFor(shape, len)
  const area = Math.round(len * w * (shape === 'freeform' ? 0.82 : 1))
  return { w, area, gal: Math.round((area * 5 * 7.48) / 500) * 500 }
}
const fmt = (n: number) => n.toLocaleString('en-US')

export function QuoteTool() {
  const { door, shape, serviceIsland } = useStore()
  const [len, setLen] = useState(32)
  const [island, setIsland] = useState(ISLANDS_BUILD[0])
  const [stage, setStage] = useState(STAGES[0])
  const [yard, setYard] = useState<string | null>(null)
  const [size, setSize] = useState(SIZES[0])
  const [onIsland, setOnIsland] = useState(ONISLAND[1])
  const [issues, setIssues] = useState<string[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(true)
  const root = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => { // pause the water shimmer when the tool is off screen
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (root.current) io.observe(root.current)
    return () => io.disconnect()
  }, [])
  useEffect(() => { setSent(null); setStep(1) }, [door])

  const { w, area, gal } = gallons(shape, len)
  const shapeName = SHAPES.find(s => s.v === shape)!.t
  const buildText = () => [
    'Hello Gunite Pools, I would like a quote.',
    shape === 'renovate' ? `Renovation of my existing pool, about ${len} x ${w} ft.` : `New pool: ${shapeName.toLowerCase()}, about ${len} x ${w} ft${shape === 'spa' ? ' with a spa' : ''}.`,
    `Island: ${island}.`, `Stage: ${stage}.`, yard ? 'I have a photo of the yard to send.' : '',
    `Name: ${name}`, `Phone: ${phone}`,
  ].filter(Boolean).join('\n')
  const serviceText = () => [
    'Hello Gunite Pools, I would like my pool on your service programme.',
    `Island: ${serviceIsland}.`, `Pool size: ${size}.`, `On island: ${onIsland}.`,
    issues.length ? `Issues: ${issues.join(', ')}.` : '', `Name: ${name}`, `Phone: ${phone}`,
  ].filter(Boolean).join('\n')

  const contact: ReactNode = (
    <div className="two">
      <label className="lbl">Your name<input className="inp" name="Name" required autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></label>
      <label className="lbl">Phone<input className="inp num" name="Phone" required type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)} /></label>
    </div>
  )

  const submit = (e: React.FormEvent) => { e.preventDefault(); if (step === 1) { setStep(2); return } setCopied(false); setSent(door === 'build' ? buildText() : serviceText()) }
  const summary = door === 'build'
    ? `${shape === 'renovate' ? 'Renovation' : shapeName}, about ${len} x ${w} ft, ${island}, ${stage.toLowerCase()}`
    : `Service in ${serviceIsland}, ${size === 'Not sure' ? 'pool size to confirm' : size.split(',')[0].toLowerCase() + ' pool'}, ${onIsland.toLowerCase()}`
  const step2 = (
    <motion.div key="s2" className="tool" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease }}>
      <div className="promise-mini"><p className="cap muted">Your request</p><p className="small">{summary}{door === 'build' && yard ? ', with a yard photo' : ''}.</p>
        <button type="button" className="link" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', alignSelf: 'flex-start', fontSize: 14.5, minHeight: 32 }} onClick={() => setStep(1)}>Change</button></div>
      {contact}
      <div className="sendrow"><button className="btn btn-primary" type="submit">Send my request</button><span className="cap muted">{door === 'build' ? 'Your quote follows a site visit.' : 'We reply to arrange the first visit.'}</span></div>
    </motion.div>
  )
  const copy = async () => { try { await navigator.clipboard.writeText(sent || ''); setCopied(true) } catch { setCopied(false) } }
  const onYard = (f?: File) => { if (!f) return; if (yard) URL.revokeObjectURL(yard); setYard(URL.createObjectURL(f)) }
  const keyTabs = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    const next = door === 'build' ? 'service' : 'build'; setStore({ door: next }); tabs.current[next === 'build' ? 0 : 1]?.focus()
  }

  return (
    <div className="tool" ref={root} id="quote">
      <div className="doors" role="tablist" aria-label="What do you need?" data-door={door} onKeyDown={keyTabs}>
        <span className="thumb" aria-hidden="true" />
        <button ref={el => { tabs.current[0] = el }} role="tab" id="tab-build" aria-controls="door-build" aria-selected={door === 'build'} tabIndex={door === 'build' ? 0 : -1} onClick={() => setStore({ door: 'build' })}>Build or renovate</button>
        <button ref={el => { tabs.current[1] = el }} role="tab" id="tab-service" aria-controls="door-service" aria-selected={door === 'service'} tabIndex={door === 'service' ? 0 : -1} onClick={() => setStore({ door: 'service' })}>Service my pool</button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div key="sent" className="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.42, ease }} aria-live="polite">
            <p className="h3" style={{ fontSize: 22 }}>Your request is ready.</p>
            <pre>{sent}</pre>
            <div className="sendrow">
              <a className="btn btn-primary" href={TEL}><Phone size={18} strokeWidth={1.75} aria-hidden="true" /> Call <span className="num">{PHONE}</span></a>
              <button type="button" className="btn btn-quiet" onClick={copy}>{copied ? <Check size={18} strokeWidth={1.75} aria-hidden="true" /> : <Copy size={18} strokeWidth={1.75} aria-hidden="true" />}{copied ? 'Copied' : 'Copy request'}</button>
              <button type="button" className="link" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', minHeight: 44 }} onClick={() => setSent(null)}>Edit</button>
            </div>
            <p className="cap muted">On the live site this goes straight to the Gunite office. Your quote follows a site visit.</p>
          </motion.div>
        ) : door === 'build' ? (
          <motion.form key="build" id="door-build" role="tabpanel" aria-labelledby="tab-build" className="tool" onSubmit={submit} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease }}>
            {step === 1 ? <>
            <Chips legend="Shape" name="shape" options={SHAPES} value={shape} onChange={v => setStore({ shape: v as Shape })} />
            <div style={{ position: 'relative' }}>
              <PlanSheet shape={shape} len={len} yard={yard} active={visible} />
              <span className="readout num chipout" aria-live="polite"><em><Ticker value={`${len} x ${w} ft`} /></em> · about <Ticker value={fmt(area)} /> sq ft · roughly <Ticker value={fmt(gal)} /> US gal</span>
            </div>
            <div className="sliderow">
              <label className="lbl" style={{ flex: 1 }}><span>Length <span className="num">{len}</span> ft</span><input className="range" type="range" min={16} max={60} step={1} value={len} onChange={e => setLen(+e.target.value)} aria-valuetext={`${len} feet long, ${w} feet wide`} /></label>
              <label className="upload"><ImagePlus size={18} strokeWidth={1.75} aria-hidden="true" />{yard ? 'Change yard photo' : 'Add your yard photo'}<input type="file" accept="image/*" onChange={e => onYard(e.target.files?.[0])} /></label>
            </div>
            <div className="two">
              <label className="lbl">Island<select className="select" value={island} onChange={e => setIsland(e.target.value)}>{ISLANDS_BUILD.map(i => <option key={i}>{i}</option>)}</select></label>
              <label className="lbl">Where you are<select className="select" value={stage} onChange={e => setStage(e.target.value)}>{STAGES.map(i => <option key={i}>{i}</option>)}</select></label>
            </div>
            <div className="sendrow">
              <button className="btn btn-primary" type="submit">Next: your details</button>
              <span className="cap muted">Rough figures for planning only.</span>
            </div>
            </> : step2}
          </motion.form>
        ) : (
          <motion.form key="service" id="door-service" role="tabpanel" aria-labelledby="tab-service" className="tool" onSubmit={submit} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.3, ease }}>
            {step === 1 ? <>
            <Chips legend="Island" name="sisland" options={['New Providence', 'Great Exuma']} value={serviceIsland} onChange={v => setStore({ serviceIsland: v })} />
            <div className="promise-mini">
              <p className="cap muted">Every pool on the programme gets</p>
              <ul>{promises.map(p => <li key={p}><Check size={18} strokeWidth={2} aria-hidden="true" />{p}</li>)}</ul>
              <a className="link" style={{ fontSize: 14.5, alignSelf: 'flex-start', minHeight: 32, display: 'inline-flex', alignItems: 'center' }} href="#service">See a sample monthly report</a>
            </div>
            <div className="two">
              <label className="lbl">Pool size<select className="select" value={size} onChange={e => setSize(e.target.value)}>{SIZES.map(i => <option key={i}>{i}</option>)}</select></label>
              <label className="lbl">You are on island<select className="select" value={onIsland} onChange={e => setOnIsland(e.target.value)}>{ONISLAND.map(i => <option key={i}>{i}</option>)}</select></label>
            </div>
            <fieldset className="chips">
              <legend className="cap">Anything wrong right now? (optional)</legend>
              {ISSUES.map(i => <label className="chip" key={i}><input type="checkbox" checked={issues.includes(i)} onChange={e => setIssues(s => e.target.checked ? [...s, i] : s.filter(x => x !== i))} /><span>{i}</span></label>)}
            </fieldset>
            <div className="sendrow"><button className="btn btn-primary" type="submit">Next: your details</button></div>
            </> : step2}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
