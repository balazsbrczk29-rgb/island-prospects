import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Bars, Footer, Toolbar, mount, useWheelSmoothing } from "./shell"
import { DEPTS, PHONE, PHONE2, TEL, TEL2 } from "./data"

const FILTERS = [
  { id: "all", label: "All nine" },
  { id: "made", label: "Made and fitted" },
  { id: "showroom", label: "In the showroom" },
]

function Departments() {
  useWheelSmoothing()
  const [f, setF] = useState("all")
  const list = DEPTS.filter(d => f === "all" || d.group === f)
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main">
        <section className="dept-top" id="top">
          <Toolbar />
          <div className="wrap">
            <h1>Nine departments under one roof on Mackey Street.</h1>
            <p>The glass shop came first, in 1959. Everything else was added beside it, and is still at #46.</p>
            <div className="filter" role="group" aria-label="Show departments">
              {FILTERS.map(x => <button key={x.id} type="button" className="opt" aria-pressed={f === x.id} onClick={() => setF(x.id)}>{x.label}</button>)}
            </div>
          </div>
        </section>
        <section className="wrap" aria-label="Departments" style={{ paddingBlock: "24px 104px" }}>
          <AnimatePresence initial={false} mode="popLayout">
            {list.map(d => (
              <motion.article layout key={d.id} id={d.id} className="dept" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                <div>
                  <h2>{d.name}</h2>
                  {d.since && <p className="since num">Since {d.since}</p>}
                </div>
                <p>{d.d}</p>
                {d.act === "quote" ? <a className="link" href="index.html#quote">Request a quote</a> : <a className="link num" href={TEL}>Call the showroom</a>}
              </motion.article>
            ))}
          </AnimatePresence>
        </section>
        <section className="sec visit" data-quiet aria-labelledby="dv-h">
          <div className="wrap visit-grid">
            <div>
              <h2 id="dv-h">One counter for all of it.</h2>
              <p className="way">#46 Mackey Street, Nassau, at the top of the hill, half a mile south of the Paradise Island Bridge.</p>
            </div>
            <div className="phones num" style={{ marginTop: 0 }}>
              <a href={TEL}>{PHONE}</a>
              <a href={TEL2}>{PHONE2}</a>
            </div>
            <table className="num">
              <tbody>
                <tr><td>Monday to Friday</td><td>9:00 am to 4:30 pm</td></tr>
                <tr><td>Saturday</td><td>9:00 am to 1:00 pm</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
      <Bars after="#top" />
    </>
  )
}

mount(<Departments />)
