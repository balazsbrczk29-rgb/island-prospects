import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { AREAS, DIVISIONS, NEEDS2, PHONE, PROPS, TEL, covered, request2, type Need } from "./data"

const EASE = [0.22, 1, 0.36, 1] as const

export function Planner({ id = "p" }: { id?: string }) {
  const reduce = useReducedMotion()
  const [p, setP] = useState<string>(PROPS[1])
  const [needs, setNeeds] = useState<Need[]>(["Alarm", "Monitoring"])
  const [area, setArea] = useState("")
  const [copied, setCopied] = useState(false)
  const rows = covered(needs)
  const text = request2(p, needs, area)
  const toggle = (n: Need) => setNeeds(v => (v.includes(n) ? v.filter(x => x !== n) : [...v, n]))
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }
  return (
    <div className="pl">
      <div className="pl-q">
        <div className="grp" role="group" aria-labelledby={`${id}-g1`}>
          <span className="lg" id={`${id}-g1`}>Protecting</span>
          <div className="chips">{PROPS.map(x => <button key={x} type="button" className="chip" aria-pressed={p === x} onClick={() => setP(x)}>{x}</button>)}</div>
        </div>
        <div className="grp" role="group" aria-labelledby={`${id}-g2`}>
          <span className="lg" id={`${id}-g2`}>You need</span>
          <div className="chips">{NEEDS2.map(x => <button key={x} type="button" className="chip" aria-pressed={needs.includes(x)} onClick={() => toggle(x)}>{x}</button>)}</div>
        </div>
        <div className="grp">
          <label className="lg" htmlFor={`${id}-area`}>Where</label>
          <select id={`${id}-area`} value={area} onChange={e => setArea(e.target.value)}>
            <option value="">Anywhere in New Providence</option>
            {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <div className="readout" aria-live="polite">
        <span className="lg">Covered by</span>
        <ul className="rows">
          <AnimatePresence mode="popLayout" initial={false}>
            {rows.length ? rows.map(k => (
              <motion.li key={k} layout={!reduce} initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, transition: { duration: 0.16 } }} transition={{ duration: 0.22, ease: EASE }}>
                <span className="dn num">{DIVISIONS[k].n}</span>
                <div><b>{DIVISIONS[k].name}</b><p>{DIVISIONS[k].line}</p></div>
              </motion.li>
            )) : (
              <motion.li key="none" className="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Choose at least one thing you need, or Not sure.</motion.li>
            )}
          </AnimatePresence>
        </ul>
        <p className="req">{text}</p>
        <div className="acts">
          <a className="btn num" href={`tel:${TEL}`}>Call {PHONE}</a>
          <button type="button" className="ghost" onClick={copy}>{copied ? "Copied" : "Copy request"}</button>
        </div>
      </div>
    </div>
  )
}
