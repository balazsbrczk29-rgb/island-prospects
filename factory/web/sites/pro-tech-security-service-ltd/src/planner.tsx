import { useState } from "react"
import { NEEDS, PHONE, PROPERTY, TEL, requestText } from "./data"

export function Planner() {
  const [p, setP] = useState(PROPERTY[1])
  const [needs, setNeeds] = useState<string[]>(["An alarm system", "Monitoring for my alarm"])
  const [area, setArea] = useState("")
  const [copied, setCopied] = useState(false)
  const text = requestText(p, needs, area)
  const toggle = (n: string) => setNeeds(v => (v.includes(n) ? v.filter(x => x !== n) : [...v, n]))
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }
  return (
    <div className="planner">
      <div>
        <fieldset>
          <legend>What are we protecting?</legend>
          <div className="chips">{PROPERTY.map(x => <button key={x} type="button" className="chip" aria-pressed={p === x} onClick={() => setP(x)}>{x}</button>)}</div>
        </fieldset>
        <fieldset>
          <legend>What do you need?</legend>
          <div className="chips">{NEEDS.map(x => <button key={x} type="button" className="chip" aria-pressed={needs.includes(x)} onClick={() => toggle(x)}>{x}</button>)}</div>
        </fieldset>
        <fieldset>
          <legend><label htmlFor="area">Which part of Nassau? (optional)</label></legend>
          <input id="area" type="text" value={area} onChange={e => setArea(e.target.value)} placeholder="For example Palmdale" autoComplete="address-level3" />
        </fieldset>
      </div>
      <aside className="summary" aria-live="polite">
        <span className="n">Your call, ready</span>
        <p className="req">{text}</p>
        <div className="acts">
          <a className="btn num" href={`tel:${TEL}`}>Call {PHONE}</a>
          <button type="button" className="ghost" onClick={copy}>{copied ? "Copied" : "Copy this request"}</button>
        </div>
        <small>The office answers Monday to Friday, 9 am to 5 pm. Read this out and the call is quick.</small>
      </aside>
    </div>
  )
}
