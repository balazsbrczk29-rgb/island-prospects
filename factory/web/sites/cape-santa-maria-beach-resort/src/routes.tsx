import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { ease } from "./site"

export const ROUTES = [
  { k: "fll", label: "From Florida", steps: [["Fort Lauderdale Executive (FXE)", "20 minutes from Fort Lauderdale International (FLL)"], ["Makers Air, nonstop", "Sundays, Tuesdays and Thursdays"], ["Stella Maris Airport (SML)", "Taxi to the resort, arranged by us"]], link: ["Makers Air", "https://makersair.com/"] },
  { k: "nas", label: "Via Nassau", steps: [["Nassau (NAS)", "Connect from your international flight"], ["Bahamasair or Stella Maris Air Service", "Bahamasair currently flies to SML; Stella Maris Air Service offers per-seat and full charter, (242) 338-2050"], ["Stella Maris Airport (SML)", "Taxi to the resort"]], link: ["Bahamasair", "https://www.bahamasair.com/"] },
  { k: "ggt", label: "Via Exuma", steps: [["George Town, Exuma (GGT)", "Direct flights from Toronto (Air Canada), Miami (American Eagle) and Atlanta (Delta)"], ["Island Wings charter, or the Sheep Runner ferry", "Charter (242) 472-8888; ferry Mon, Wed, Fri to Long Island Harbour Club"], ["Long Island", "Taxi to the resort"]], link: ["Island Wings Charters", "https://islandwingscharter.com/"] },
  { k: "own", label: "Your own plane", steps: [["Stella Maris Airport (SML)", "Fueling and customs on the field"], ["Call ahead", "Private pilots get 15% off accommodations (some blackout dates), booked by phone"], ["Taxi waiting", "Tell us your ETA and a taxi will meet you"]], link: ["Call +1 800-926-9704", "tel:+18009269704"] },
  { k: "sea", label: "By seaplane", steps: [["Nassau", "Seaplane Safaris, eight passengers, two captains"], ["Straight to the beach", "Landing at Cape Santa Maria"], ["Step ashore", "No taxi needed"]], link: ["Seaplane Safaris", "https://www.seaplane.travel/"] },
]

export function RouteFinder() {
  const [i, setI] = useState(0)
  const r = ROUTES[i]
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4" role="tablist" aria-label="Where are you starting from?">
        {ROUTES.map((x, k) => (
          <button key={x.k} role="tab" type="button" aria-selected={i === k} onClick={() => setI(k)} className="group flex w-full items-baseline justify-between border-b border-line py-4 text-left first:border-t">
            <span className={`font-display text-[1.7rem] transition ${i === k ? "translate-x-2 text-sea" : "group-hover:translate-x-1"}`}>{x.label}</span>
            <span className="label text-muted">{String(k + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <div className="lg:col-span-7 lg:col-start-6" role="tabpanel" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.ol key={r.k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative">
            <span className="absolute top-3 bottom-3 left-[11px] w-px bg-sea/40" aria-hidden />
            {r.steps.map(([t, d], k) => (
              <motion.li key={t} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.12, duration: 0.5, ease }} className="relative pb-9 pl-12 last:pb-0">
                <span className={`absolute top-1.5 left-0 flex size-6 items-center justify-center rounded-full border-2 border-sea ${k === r.steps.length - 1 ? "bg-sea" : "bg-paper"}`} aria-hidden />
                <p className="font-display text-[1.6rem] leading-tight">{t}</p>
                <p className="mt-1 text-[16px] text-muted">{d}</p>
              </motion.li>
            ))}
            <li className="pt-8 pl-12"><a href={r.link[1]} className="inline-flex min-h-12 items-center gap-1.5 bg-ink px-6 text-paper transition hover:-translate-y-px">{r.link[0]} <ArrowUpRight className="size-4" aria-hidden /></a></li>
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  )
}
