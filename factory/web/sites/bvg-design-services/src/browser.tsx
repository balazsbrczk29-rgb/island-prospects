import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { GUIDE_FUN, GUIDE_LEAD, GUIDE_LINE, GUIDE_LINKS, IMG } from "./data"

/* The Bahamas Vacation Guide, BVG's first site, rebuilt in four eras.
   Text and photographs are the guide's own; the layouts are recreations of each era's way of building. */

const ERAS = [
  { year: 1996, label: "Tables and blue links" },
  { year: 2006, label: "Side menu, first photos" },
  { year: 2016, label: "Big photo, three cards" },
  { year: 2026, label: "Phone first, fast" },
] as const
type Year = (typeof ERAS)[number]["year"]

function Era1996() {
  return (
    <div className="e96">
      <h3>Bahamas Vacation Guide</h3>
      <hr />
      <table><tbody>
        {[0, 1, 2, 3, 4, 5].map(r => (
          <tr key={r}>{[0, 1, 2].map(c => { const l = GUIDE_LINKS[r * 3 + c]; return <td key={c}>&bull; <u>{l}</u></td> })}</tr>
        ))}
      </tbody></table>
      <p className="e96__pics">{[IMG.williamsTown, IMG.hopeTown, IMG.lochabar].map(s => <img key={s} src={s} alt="" width={900} height={398} />)}</p>
      <hr />
      <p className="e96__foot">Pages Designed and Maintained by <u>BVG Design</u></p>
    </div>
  )
}

function Era2006() {
  return (
    <div className="e06">
      <div className="e06__top"><b>Bahamas Vacation Guide</b><span>bahamasvg.com</span></div>
      <div className="e06__body">
        <ul>{GUIDE_LINKS.slice(0, 11).map(l => <li key={l}>&rsaquo; {l}</li>)}</ul>
        <div className="e06__main">
          <img src={IMG.exumas} alt="" width={900} height={398} />
          <p><b>Welcome to the Bahamas Vacation Guide!</b></p>
          <p>{GUIDE_LEAD}</p>
        </div>
      </div>
    </div>
  )
}

function Era2016() {
  return (
    <div className="e16">
      <div className="e16__nav"><b>BVG</b><span>Islands</span><span>Hotels</span><span>Fishing</span><span>Weddings</span></div>
      <div className="e16__hero">
        <img src={IMG.treasureCay} alt="" width={900} height={398} />
        <p>{GUIDE_FUN}</p>
      </div>
      <div className="e16__cards">
        {[["Hotels", IMG.nassauLight], ["Fishing & Scuba", IMG.deadmans], ["Weddings", IMG.williamsTown]].map(([t, s]) => (
          <div key={t}><img src={s} alt="" width={900} height={398} /><span>{t}</span></div>
        ))}
      </div>
    </div>
  )
}

function Era2026() {
  return (
    <div className="e26">
      <div className="e26__nav"><b>Bahamas Vacation Guide</b><span aria-hidden="true">&#9776;</span></div>
      <img className="e26__photo" src={IMG.hopeTown} alt="" width={900} height={398} />
      <p className="e26__cap">Hope Town, Elbow Cay, Abaco</p>
      <p className="e26__h">{GUIDE_LINE}</p>
      <div className="e26__search"><span>Where are you going?</span><b>Go</b></div>
      <div className="e26__chips">{["Grand Bahama", "Nassau", "Abaco", "Exuma", "Long Island"].map(c => <span key={c}>{c}</span>)}</div>
      <p className="e26__fun">{GUIDE_FUN}</p>
      <div className="e26__bar"><span>Plan a trip</span></div>
    </div>
  )
}

const VIEWS: Record<Year, () => JSX.Element> = { 1996: Era1996, 2006: Era2006, 2016: Era2016, 2026: Era2026 }

export { ERAS }
export type { Year }

export function EraWindow({ year }: { year: Year }) {
  const reduce = useReducedMotion()
  const View = VIEWS[year]
  return (
    <div className="era__stage" aria-hidden="true">
      <motion.div layout transition={{ layout: { duration: reduce ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] } }} className="era__win" data-phone={year === 2026}>
        <motion.div layout="position" className="era__chrome">
          <span className="era__dots"><i /><i /><i /></span>
          <span className="era__url">{year === 2026 ? "bahamasvacationguide.com" : "www.bahamasvacationguide.com"}</span>
        </motion.div>
        <div className="era__page">
          <AnimatePresence initial={false}>
            <motion.div
              key={year}
              className="era__layer"
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
              animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            >
              <View />
              {!reduce && <motion.span className="era__scan" initial={{ y: "0%" }} animate={{ y: "100%", opacity: [1, 1, 0] }} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
