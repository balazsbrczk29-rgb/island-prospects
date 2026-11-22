import { useId, useState } from "react"
/* Booking: the room picker and the dates strip that hands off to their direct-book engine. */
import { AnimatePresence, motion } from "motion/react"
import { ROOMS, Photo, bookingUrl, ease } from "./site"

type RoomId = (typeof ROOMS)[number]["id"]

function Stepper({ label, value, min, max, onChange, unit }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; unit: (v: number) => string }) {
  const id = useId()
  return (
    <div className="strip-cell" role="group" aria-labelledby={id}>
      <span className="k" id={id}>{label}</span>
      <div className="stepper">
        <output className="v" aria-live="polite">{value} <span className="text-[0.55em] italic">{unit(value)}</span></output>
        <span className="flex gap-1">
          <button type="button" className="rounded-full border border-line" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>&minus;</button>
          <button type="button" className="rounded-full border border-line" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
        </span>
      </div>
    </div>
  )
}

const fmt = (iso: string, add = 0) => {
  const d = new Date(new Date(iso + "T12:00:00").getTime() + add * 864e5)
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })
}

/** Dates in, their own direct-book engine out (no fake availability on this page). */
export function DatesComposer({ room }: { room?: RoomId }) {
  const [arrive, setArrive] = useState("")
  const [nights, setNights] = useState(4)
  const [adults, setAdults] = useState(2)
  const r = ROOMS.find((x) => x.id === room)
  const max = r ? r.guests : 3
  const a = Math.min(adults, max)
  const href = bookingUrl({ roomTypeId: r?.roomTypeId, arrive, nights, adults: a })
  const t0 = new Date(), today = `${t0.getFullYear()}-${String(t0.getMonth() + 1).padStart(2, "0")}-${String(t0.getDate()).padStart(2, "0")}`
  return (
    <div className="grid gap-4">
      <div className="strip">
        <label className="strip-cell cursor-pointer">
          <span className="k">Arrival</span>
          <span className="v" aria-hidden>{arrive ? fmt(arrive) : "Choose a date"}</span>
          <input type="date" aria-label="Arrival date" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" min={today} value={arrive}
            onClick={(e) => { try { (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.() } catch { /* not supported */ } }}
            onChange={(e) => setArrive(e.target.value)} />
        </label>
        <Stepper label="Nights" value={nights} min={1} max={28} onChange={setNights} unit={(v) => (v === 1 ? "night" : "nights")} />
        <Stepper label="Adults" value={a} min={1} max={max} onChange={setAdults} unit={(v) => (v === 1 ? "adult" : "adults")} />
        <div className="strip-go">
          <a href={href} className="btn btn-xl w-full whitespace-nowrap">{arrive ? "See rates for these dates" : "Check dates and book"}</a>
        </div>
      </div>
      <p className="num min-h-[1.6em] max-w-[64ch] text-[length:var(--t-sm)] italic text-muted" aria-live="polite">
        {arrive ? `${fmt(arrive)} to ${fmt(arrive, nights)}, ${a} ${a === 1 ? "adult" : "adults"}${r ? `, ${r.name}` : ""}. Live rates open on Greenwood's own booking page.` : "Choose your arrival; live rates and availability open on Greenwood's own booking page."}
      </p>
    </div>
  )
}

/** Room picker: the room names are the control; the photograph answers. */
export function RoomPicker() {
  const [sel, setSel] = useState<RoomId>("king")
  const room = ROOMS.find((r) => r.id === sel)!
  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-5">
        <div role="radiogroup" aria-label="Choose a room" className="grid">
          {ROOMS.map((r) => {
            const on = r.id === sel
            return (
              <button key={r.id} type="button" role="radio" aria-checked={on} onClick={() => setSel(r.id)}
                className="group grid gap-1 border-t border-line py-5 text-left last:border-b">
                <span className={`display text-[clamp(30px,3.4vw,48px)] transition-colors duration-300 ${on ? "text-ink" : "text-muted group-hover:text-ink"}`}>{r.name}</span>
                <span className="num text-[length:var(--t-sm)] text-muted">Sleeps {r.guests}. {r.beds}.</span>
              </button>
            )
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={room.id} className="mt-6 max-w-[40ch]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{room.line}</motion.p>
        </AnimatePresence>
      </div>
      <div className="relative aspect-[3/2] overflow-hidden md:col-span-7">
        <AnimatePresence initial={false}>
          <motion.div key={room.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}>
            <Photo img={room.img} alt={room.alt} className="h-full w-full" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div id="dates" className="scroll-mt-28 md:col-span-12 md:pt-6">
        <DatesComposer room={sel} />
      </div>
    </div>
  )
}
