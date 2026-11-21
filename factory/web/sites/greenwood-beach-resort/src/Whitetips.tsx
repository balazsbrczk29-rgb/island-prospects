import { useId, useState } from "react"
import { EMAIL, IMG, Photo } from "./site"

function Count({ label, value, set, min = 0, max = 14 }: { label: string; value: number; set: (v: number) => void; min?: number; max?: number }) {
  const id = useId()
  return (
    <div className="field">
      <span id={id}>{label}</span>
      <div className="stepper" role="group" aria-labelledby={id}>
        <button type="button" aria-label={`Decrease ${label.toLowerCase()}`} disabled={value <= min} onClick={() => set(value - 1)}>&minus;</button>
        <output className="num" aria-live="polite">{value}</output>
        <button type="button" aria-label={`Increase ${label.toLowerCase()}`} disabled={value >= max} onClick={() => set(value + 1)}>+</button>
      </div>
    </div>
  )
}

/** The package enquiry Greenwood already uses (same subject and fields as their mailto), made into a form. */
function PackageEnquiry() {
  const [nights, setNights] = useState(7)
  const [divers, setDivers] = useState(2)
  const [others, setOthers] = useState(0)
  const [days, setDays] = useState(3)
  const [board, setBoard] = useState<"Half Board" | "Full Board">("Half Board")
  const [dates, setDates] = useState("")
  const body = `Hello,\n\nWe are interested in booking the following package:\n\n- Number of nights: ${nights}\n- Number of divers: ${divers}\n- Number of non-divers: ${others}\n- Board type: ${board}\n- Number of scuba days with Oceanic White Tip: ${days}\n\nPlease send us availability and pricing for these dates: ${dates || "[dates]"}\n\nThank you,\n\nBest regards,`
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent("Sharks Oceaniques / Oceanic White Tip - Package Inquiry")}&body=${encodeURIComponent(body)}`
  return (
    <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); window.location.href = href }}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <Count label="Nights" value={nights} set={setNights} min={1} max={28} />
        <Count label="Whitetip dive days" value={days} set={setDays} min={1} max={nights} />
        <Count label="Divers" value={divers} set={setDivers} min={1} />
        <Count label="Non-divers" value={others} set={setOthers} />
      </div>
      <div className="field">
        <span id="board-l">Board</span>
        <div className="seg" role="group" aria-labelledby="board-l">
          {(["Half Board", "Full Board"] as const).map((b) => (
            <button key={b} type="button" aria-pressed={board === b} onClick={() => setBoard(b)}>{b.replace(" Board", " board")}</button>
          ))}
        </div>
      </div>
      <label className="field">
        <span>Your dates (between March and June)</span>
        <input className="input" value={dates} onChange={(e) => setDates(e.target.value)} placeholder="for example 12 to 19 April" />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" className="btn btn-paper shrink-0 whitespace-nowrap">Ask for package rates</button>
        <p className="text-[length:var(--t-xs)] italic opacity-85">Opens your email with these details, addressed to {EMAIL}.</p>
      </div>
    </form>
  )
}

export function Whitetips() {
  return (
    <section id="whitetips" className="on-glass bg-glass text-on-glass" aria-labelledby="wt-title">
      <div className="px-[var(--gutter)] pt-[var(--s-12)] md:pt-[var(--s-16)]">
        <h2 id="wt-title" className="mono-word">
          <span className="block">March</span>
          <span className="block pl-[0.6em]">to June</span>
        </h2>
      </div>
      <div className="grid gap-12 px-[var(--gutter)] pt-10 pb-[var(--s-12)] md:grid-cols-12 md:gap-8 md:pt-16 md:pb-[var(--s-16)]">
        <div className="md:col-span-6">
          <Photo img={IMG.whitetipDeep} alt="An oceanic whitetip shark turning in deep blue water off Cat Island, photographed by Pauline Vaz Branco" className="aspect-[3/2] w-full" />
          <p className="mt-4 text-[length:var(--t-xs)] italic opacity-85">Oceanic whitetip off Cat Island. Photograph: Pauline Vaz Branco.</p>
        </div>
        <div className="grid content-start gap-8 md:col-span-5 md:col-start-8">
          <p className="text-[length:var(--t-lg)] leading-[1.5]">
            Every spring, oceanic whitetip sharks come to the deep blue water off Cat Island. Greenwood runs guided boat dives with experienced dive professionals, in small groups, following responsible practice for a critically endangered species.
          </p>
          <p className="opacity-85">Packages combine your nights, the number of whitetip dive days, and half or full board. Tell Pauline and Antoine what you have in mind; they reply with availability and rates.</p>
          <PackageEnquiry />
        </div>
      </div>
    </section>
  )
}
