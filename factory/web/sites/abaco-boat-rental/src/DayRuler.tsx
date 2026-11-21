// The day ruler: drag (or step) from 1 to 14 days and the published day rate follows.
import { useRef, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react"
import { Minus, Plus } from "lucide-react"
import { MAX_DAYS, TIERS, dayWord, money, useTrip } from "./trip"

const DAYS = Array.from({ length: MAX_DAYS }, (_, i) => i + 1)

/** A number whose digits roll to the new value, in fixed-width slots so nothing jitters. */
export function Roll({ value, className = "" }: { value: number; className?: string }) {
  const text = value.toLocaleString("en-US")
  return (
    <span className={`roll ${className}`} aria-hidden="true">
      {text.split("").map((ch, i) => {
        const key = text.length - i
        if (ch === ",") return <span key={key} className="roll__sep">,</span>
        return (
          <span key={key} className="roll__slot">
            <span className="roll__reel" style={{ transform: `translateY(${-Number(ch) * 10}%)` }}>
              {"0123456789".split("").map(d => <span key={d}>{d}</span>)}
            </span>
          </span>
        )
      })}
    </span>
  )
}

export function DayStepper({ compact = false }: { compact?: boolean }) {
  const { days, set } = useTrip()
  return (
    <div className={`stepper ${compact ? "stepper--compact" : ""}`}>
      <button type="button" aria-label="One day fewer" data-end={(days <= 1) || undefined} onClick={() => set({ days: Math.max(1, days - 1) })}><Minus size={18} strokeWidth={2} aria-hidden="true" /></button>
      <output aria-live="polite">{dayWord(days)}</output>
      <button type="button" aria-label="One day more" data-end={(days >= MAX_DAYS) || undefined} onClick={() => set({ days: Math.min(MAX_DAYS, days + 1) })}><Plus size={18} strokeWidth={2} aria-hidden="true" /></button>
    </div>
  )
}

export default function DayRuler() {
  const { days, rate, set } = useTrip()
  const track = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const fromX = (x: number) => {
    const b = track.current!.getBoundingClientRect()
    return Math.min(MAX_DAYS, Math.max(1, Math.ceil(((x - b.left) / b.width) * MAX_DAYS)))
  }
  const down = (e: PointerEvent<HTMLDivElement>) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); set({ days: fromX(e.clientX) }) }
  const move = (e: PointerEvent<HTMLDivElement>) => { if (dragging.current) { const d = fromX(e.clientX); if (d !== days) set({ days: d }) } }
  const up = () => { dragging.current = false }
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key]
    if (step) { e.preventDefault(); set({ days: Math.min(MAX_DAYS, Math.max(1, days + step)) }) }
    if (e.key === "Home") { e.preventDefault(); set({ days: 1 }) }
    if (e.key === "End") { e.preventDefault(); set({ days: MAX_DAYS }) }
  }
  const p = (days - 0.5) / MAX_DAYS
  return (
    <div className="ruler">
      <div
        ref={track} className="ruler__track" role="slider" tabIndex={0}
        aria-label="Days on the water" aria-valuemin={1} aria-valuemax={MAX_DAYS} aria-valuenow={days}
        aria-valuetext={`${dayWord(days)}, ${money(rate)} a day`}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onKeyDown={key}
      >
        <div className="ruler__cells" aria-hidden="true">
          {DAYS.map(d => <span key={d} className={d === days ? "is-on" : d < days ? "is-past" : ""}>{d}</span>)}
        </div>
        <div className="ruler__line" aria-hidden="true"><i style={{ transform: `scaleX(${p})` }} /></div>
        <div className="ruler__rider" aria-hidden="true" style={{ "--p": p } as CSSProperties}><b>{days}</b></div>
      </div>
      <ol className="ruler__tiers" aria-label="Published day rates">
        {TIERS.map(t => (
          <li key={t.label} className={days >= t.from && days <= t.to ? "is-on" : ""} style={{ gridColumn: `${t.from} / ${t.to + 1}` }}>
            <span>{t.label}</span> <b>{money(t.rate)}</b>
          </li>
        ))}
      </ol>
    </div>
  )
}
