import { useId, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ROOMS, Photo, bookingUrl, ease } from "./site"

type RoomId = (typeof ROOMS)[number]["id"]

function Stepper({ label, value, min, max, onChange, unit }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; unit: (v: number) => string }) {
  const id = useId()
  return (
    <div className="field">
      <span id={id}>{label}</span>
      <div className="stepper" role="group" aria-labelledby={id}>
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>&minus;</button>
        <output className="num text-[length:var(--t-base)]" aria-live="polite">{value} {unit(value)}</output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  )
}

const fmt = (iso: string, add = 0) => {
  const d = new Date(new Date(iso + "T12:00:00").getTime() + add * 864e5)
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })
}

/** Dates in, their own direct-book engine out (no fake availability on this page). */
export function DatesComposer({ room, tone = "ground" }: { room?: RoomId; tone?: "ground" | "glass" }) {
  const [arrive, setArrive] = useState("")
  const [nights, setNights] = useState(4)
  const [adults, setAdults] = useState(2)
  const r = ROOMS.find((x) => x.id === room)
  const max = r ? r.guests : 3
  const a = Math.min(adults, max)
  const href = bookingUrl({ roomTypeId: r?.roomTypeId, arrive, nights, adults: a })
  const today = new Date().toISOString().slice(0, 10)
  return (
    <div className="grid gap-6">
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-3">
        <label className="field">
          <span>Arrival</span>
          <input type="date" className="input num" min={today} value={arrive} onChange={(e) => setArrive(e.target.value)} />
        </label>
        <Stepper label="Nights" value={nights} min={1} max={28} onChange={setNights} unit={(v) => (v === 1 ? "night" : "nights")} />
        <Stepper label="Adults" value={a} min={1} max={max} onChange={setAdults} unit={(v) => (v === 1 ? "adult" : "adults")} />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="num min-h-[1.6em] text-[length:var(--t-sm)] italic" aria-live="polite">
          {arrive ? `${fmt(arrive)} to ${fmt(arrive, nights)}, ${a} ${a === 1 ? "adult" : "adults"}${r ? `, ${r.name}` : ""}.` : "Pick an arrival date to see live rates."}
        </p>
        <a href={href} className={`btn ${tone === "glass" ? "btn-ground" : ""}`}>{arrive ? "See rates for these dates" : "Open the booking page"}</a>
      </div>
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
      <div className="md:col-span-12 md:pt-4">
        <DatesComposer room={sel} />
      </div>
    </div>
  )
}
