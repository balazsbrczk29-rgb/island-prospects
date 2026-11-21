import { useMemo } from "react"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { BLACKOUTS, BOOK, SPECIALS, offersFor, shortDate } from "./facts"
import { usePlan } from "./site"

/** All six published offers, each marked live for the dates in the bar, with the reason when one does not fit. */
export default function Specials() {
  const { arrive, nights, origin } = usePlan()
  const offers = useMemo(() => offersFor(nights, origin, arrive), [nights, origin, arrive])
  const state = (ids: readonly string[]) => {
    const hit = offers.filter(o => ids.includes(o.id))
    const ok = hit.find(o => o.status === "ok")
    if (ok) return { on: true, note: ok.via ? ok.note : "Fits your dates." }
    if (hit.length) return { on: false, note: hit[0].note }
    const why: Record<string, string> = {
      fee300: "Needs four nights or longer.", fee150: nights >= 4 ? "For two and three nights. At four, the $300 credit applies." : "Needs at least two nights.",
      fly1: "Needs at least two nights.", air: "Needs four nights or longer.", fl250: origin === "florida" ? "Needs four nights or longer." : "For guests travelling from Florida.",
      eu: origin === "europe" ? "Needs four nights or longer." : "For residents of Europe and Latin America.",
    }
    return { on: false, note: why[ids[0]] ?? "Not for this stay." }
  }
  const count = SPECIALS.filter(s => state(s.ids).on).length
  return (
    <div className="offers">
      <div className="offers__head">
        <p className="offers__sum"><span className="num">{count}</span> of 6 fit a <span className="num">{nights}</span>‑night stay from <span className="num">{shortDate(arrive)}</span>.</p>
        <a className="link" href="#top">Change dates</a>
      </div>
      <ol className="olist">
        {SPECIALS.map(s => {
          const st = state(s.ids)
          return (
            <motion.li key={s.title} data-on={st.on} layout="position" transition={{ type: "spring", stiffness: 300, damping: 34 }}>
              <div className="olist__t">
                <span className="olist__dot" aria-hidden />
                <h3>{s.title}</h3>
              </div>
              <p className="olist__who">{s.who}</p>
              <dl className="olist__dates num">
                <div><dt>Book</dt><dd>{s.book}</dd></div>
                <div><dt>Travel</dt><dd>{s.travel}</dd></div>
              </dl>
              <p className="olist__st"><span className="sr">{st.on ? "Fits: " : "Does not fit: "}</span>{st.note}</p>
            </motion.li>
          )
        })}
      </ol>
      <div className="offers__foot">
        <p><strong>Holiday blackouts:</strong> <span className="num">{BLACKOUTS.join("; ")}</span>.</p>
        <a className="btn" href={BOOK} target="_blank" rel="noopener">Book with an offer on BahamaGo <ArrowUpRight aria-hidden /></a>
      </div>
    </div>
  )
}
