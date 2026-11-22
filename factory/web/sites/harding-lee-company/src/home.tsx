import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ATTORNEYS, MATTERS, OFFICES, letter, type Matter, type OKey } from "./data"
import { Page, mount } from "./site"
import { Chart } from "./chartview"
import { Rest } from "./sections"

const EASE = [0.22, 1, 0.36, 1] as const

function OfficeToggle({ o, setO, name }: { o: OKey; setO: (o: OKey) => void; name: string }) {
  return (
    <div className="otog" role="radiogroup" aria-label="Which office suits you">
      <span className="otog-l">Meet in</span>
      {(["nassau", "longisland"] as OKey[]).map(k => (
        <button key={k} type="button" role="radio" aria-checked={o === k} name={name} onClick={() => setO(k)}>
          {k === "nassau" ? "Nassau" : "Salt Pond"}
        </button>
      ))}
    </div>
  )
}

function Answer({ m, o, setO, inline = false }: { m: Matter; o: OKey; setO: (o: OKey) => void; inline?: boolean }) {
  const reduce = useReducedMotion()
  const lead = ATTORNEYS[m.who[0]]
  const also = m.who.slice(1).map(k => ATTORNEYS[k].name)
  const off = OFFICES[o]
  const [t, h] = off.phones[0]
  return (
    <motion.div key={m.id} className="ans" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24, ease: EASE }} aria-live="polite">
      <div className="who">
        <span className="pf" data-portrait={inline ? undefined : ""}><img src={lead.portrait} alt={lead.name} width={962} height={1142} /></span>
        <div>
          <p className="names">{lead.name}</p>
          <p className="role">{lead.role}{also.length ? `, with ${also.join(", ")}` : ""}</p>
        </div>
      </div>
      <p className="why">{m.why}</p>
      <OfficeToggle o={o} setO={setO} name={inline ? "o-inline" : "o-card"} />
      <div className="acts">
        <a className="btn" href={letter(m, m.who[0], o)}>Write to {lead.short}</a>
        <a className="link num" href={`tel:${h}`} aria-label={`Call the ${off.name}, ${t}`}>Call {t}</a>
      </div>
    </motion.div>
  )
}

type Pt = { x: number; y: number }

/** The green route: chosen question -> attorney -> office pin. Desktop only, measured on change and resize. */
function useRoute(hero: React.RefObject<HTMLElement | null>, key: string) {
  const [d, setD] = useState("")
  const measure = useCallback(() => {
    const root = hero.current
    if (!root || window.innerWidth < 960) { setD(""); return }
    const r0 = root.getBoundingClientRect()
    const tick = root.querySelector<HTMLElement>('.matters button[aria-pressed="true"] .tick')
    const pf = root.querySelector<HTMLElement>(".hero-side [data-portrait]")
    const pin = root.querySelector<SVGGElement>(".hero-side [data-pin][data-on='true'] .dot")
    if (!tick || !pf || !pin) { setD(""); return }
    const rel = (x: number, y: number): Pt => ({ x: x - r0.left, y: y - r0.top })
    const t = tick.getBoundingClientRect(), p = pf.getBoundingClientRect(), q = pin.getBoundingClientRect()
    const A = rel(t.right + 6, t.top + t.height / 2)
    const B = rel(p.left - 2, p.top + p.height / 2)
    const card = pf.closest(".ans")!.getBoundingClientRect()
    const C = rel(q.left + q.width / 2, q.bottom + 2)
    const bx = Math.min(Math.max(C.x, card.left - r0.left + 24), card.right - r0.left - 24)
    const Bt = { x: bx, y: card.top - r0.top - 1 }
    const mx = (A.x + B.x) / 2
    const leg1 = `M${A.x},${A.y} C${mx},${A.y} ${mx},${B.y} ${B.x},${B.y}`
    const leg2 = `M${Bt.x},${Bt.y} C${Bt.x},${Bt.y - 60} ${C.x},${C.y + 60} ${C.x},${C.y}`
    setD(`${leg1} ${leg2}`)
  }, [hero])
  useLayoutEffect(() => { measure() }, [measure, key])
  useEffect(() => {
    const ro = new ResizeObserver(() => measure())
    if (hero.current) ro.observe(hero.current)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [hero, measure])
  return d
}

export function Hero({ m, setM, o, setO }: { m: Matter; setM: (m: Matter) => void; o: OKey; setO: (o: OKey) => void }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const d = useRoute(ref, `${m.id}-${o}`)
  const onKey = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const i = MATTERS.findIndex(x => x.id === m.id)
    const n = MATTERS[(i + (e.key === "ArrowDown" ? 1 : MATTERS.length - 1)) % MATTERS.length]
    setM(n)
    requestAnimationFrame(() => ref.current?.querySelector<HTMLButtonElement>(`[data-m="${n.id}"]`)?.focus())
  }
  return (
    <section className="wrap hero" data-hero aria-labelledby="h1" ref={ref}>
      <div className="hero-q">
        <h1 id="h1">What are you dealing with? We will tell you who handles it.</h1>
        <p className="lede">Attorneys at law in Nassau and Salt Pond, Long Island, since 1996, led by a senior partner called to The Bahamas Bar in 1982.</p>
        <ul className="matters" aria-label="Choose your matter" onKeyDown={onKey}>
          {MATTERS.map((x, i) => (
            <motion.li key={x.id} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 + i * 0.04, ease: EASE }}>
              <button type="button" data-m={x.id} aria-pressed={x.id === m.id} onClick={() => setM(x)}>
                <span>{x.label}</span><span className="tick" aria-hidden="true" />
              </button>
            </motion.li>
          ))}
        </ul>
        <p className="courts-l">Practising in all courts of the Commonwealth of The Bahamas.</p>
        <div className="answer-inline"><Answer m={m} o={o} setO={setO} inline /></div>
      </div>
      <div className="hero-side">
        <motion.figure className="chartbox" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: EASE }}>
          <Chart office={o} onPick={setO} id="hero-chart" />
        </motion.figure>
        <div className="answer"><Answer m={m} o={o} setO={setO} /></div>
      </div>
      {d && (
        <svg className="route-ov" aria-hidden="true">
          <motion.path key={`${m.id}-${o}`} d={d} className="route" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: EASE }} />
        </svg>
      )}
    </section>
  )
}

function Home() {
  const [m, setM] = useState<Matter>(MATTERS[0])
  const [o, setO] = useState<OKey>("nassau")
  return (
    <Page>
      <Hero m={m} setM={setM} o={o} setO={setO} />
      <Rest m={m} o={o} setO={setO} />
    </Page>
  )
}

mount(<Home />)
