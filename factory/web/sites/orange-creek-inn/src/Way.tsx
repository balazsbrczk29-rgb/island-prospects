import { useState, type KeyboardEvent, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"

const ROUTES = [
  {
    id: "nassau", tab: "From Nassau",
    steps: [
      ["9:30 am or 4:00 pm", "Western Air lands on Cat Island twice a day from Nassau. A round trip is about $190."],
      ["3.5 miles", "From Arthur's Town Airport to the inn. We can collect you, or a taxi is about $15."],
      ["2:00 pm", "Check-in. If you have booked a car, it can be waiting for you at the airport."],
    ],
  },
  {
    id: "florida", tab: "From Fort Lauderdale",
    steps: [
      ["6:45 am or 12:45 pm", "Makers Air leaves Fort Lauderdale Executive (FXE) for Cat Island on Monday, Wednesday, Friday and Saturday. Private charters fly at the time you choose."],
      ["3.5 miles", "From Arthur's Town Airport to the inn. We can collect you, or a taxi is about $15."],
      ["10:00 am", "The Makers Air flight home, on the same four days."],
    ],
  },
] as const

/** Getting here: pick where you start, read the three steps to the door. */
export default function Way({ more }: { more?: ReactNode }) {
  const [at, setAt] = useState(0)
  const route = ROUTES[at]
  const keys = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const next = (at + 1) % ROUTES.length
    setAt(next)
    document.getElementById(`way-tab-${ROUTES[next].id}`)?.focus()
  }
  return (
    <div className="way">
      <div className="way__side">
      <div className="way__tabs" role="tablist" aria-label="Where you start" onKeyDown={keys}>
        {ROUTES.map((r, i) => (
          <button key={r.id} id={`way-tab-${r.id}`} type="button" role="tab" className="way__tab" aria-selected={at === i} aria-controls="way-panel" tabIndex={at === i ? 0 : -1} onClick={() => setAt(i)}>{r.tab}</button>
        ))}
      </div>
      {more && <p className="way__more">{more}</p>}
      </div>
      <div id="way-panel" role="tabpanel" aria-labelledby={`way-tab-${route.id}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ol key={route.id} className="way__steps" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}>
            {route.steps.map(([fig, text]) => (
              <li key={fig}><span className="way__fig num">{fig}</span><p>{text}</p></li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  )
}
