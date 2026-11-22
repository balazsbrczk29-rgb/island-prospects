import { Suspense, lazy, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { biz } from './data'
import type { Kind, KitState } from './Kit3D'

const Kit3D = lazy(() => import('./Kit3D'))
const ease = [0.22, 1, 0.36, 1] as const
const KINDS: { id: Kind; label: string; unit: [string, string] }[] = [
  { id: 'fnb', label: 'Restaurant or bar', unit: ['till', 'tills'] },
  { id: 'retail', label: 'Retail shop', unit: ['till', 'tills'] },
  { id: 'office', label: 'Office', unit: ['desk', 'desks'] },
]
type Row = { n: number | null; what: string; detail: string }

function kitList(s: KitState): Row[] {
  const rows: Row[] = []
  const c = s.count
  if (s.kind === 'office') rows.push({ n: c, what: c > 1 ? 'Desks on the network' : 'Desk on the network', detail: 'Cabled, connected and backed up' })
  else rows.push({ n: c, what: c > 1 ? 'Razor POS terminals' : 'Razor POS terminal', detail: 'Hardware and software, from an advanced Razor dealer' })
  if (s.kind === 'retail') rows.push({ n: c, what: c > 1 ? 'Cash drawers' : 'Cash drawer', detail: 'One under each till' })
  if (s.kind !== 'office') rows.push({ n: c, what: c > 1 ? 'Receipt printers' : 'Receipt printer', detail: 'One beside each till' })
  if (s.kind === 'fnb') rows.push({ n: 1, what: 'Kitchen printer', detail: 'Orders from the bar and floor to the kitchen' })
  const aps = s.wifi ? Math.ceil(c / 4) : 0
  rows.push({ n: c + aps + 1, what: 'Cable runs', detail: 'Terminated and certified, from the ground up' })
  rows.push({ n: 1, what: 'Router with firewall and VPN', detail: s.wifi ? 'Tills and staff on one VLAN, guests on another' : 'Your systems kept off the open internet' })
  if (s.wifi) rows.push({ n: aps, what: aps > 1 ? 'Wi-Fi access points' : 'Wi-Fi access point', detail: 'Ceiling mounted, staff and guest networks' })
  if (s.managed) rows.push({ n: null, what: 'Managed IT and virtual server hosting', detail: 'Project management, systems design, servers looked after' })
  if (s.backup) rows.push({ n: 1, what: 'Cloud backup', detail: 'Your data and endpoints protected off-site' })
  if (s.kind !== 'office') rows.push({ n: null, what: 'Training for your staff', detail: 'On the system they will use on Friday night' })
  rows.push({ n: null, what: 'Support after installation', detail: 'The same local team, on (242) 676-2033' })
  return rows
}

export default function Composer() {
  const [s, setS] = useState<KitState>({ kind: 'fnb', count: 2, wifi: true, backup: true, managed: false })
  const [ready, setReady] = useState(false)
  const [name, setName] = useState(''); const [area, setArea] = useState('')
  const kind = KINDS.find(k => k.id === s.kind)!
  const rows = useMemo(() => kitList(s), [s])
  const set = (p: Partial<KitState>) => setS(o => ({ ...o, ...p }))
  const body = useMemo(() => [
    'Hello Digitech,', '', `Please quote this setup for my ${kind.label.toLowerCase()} (${s.count} ${kind.unit[s.count > 1 ? 1 : 0]}):`, '',
    ...rows.map(r => `- ${r.n !== null ? r.n + ' x ' : ''}${r.what}`), '',
    name && `Name: ${name}`, area && `Where: ${area}`, '', 'Thank you.',
  ].filter((l): l is string => typeof l === 'string').join('\n'), [rows, s.count, kind, name, area])
  const href = `mailto:${biz.email}?subject=${encodeURIComponent(`Quote request: ${kind.label}, ${s.count} ${kind.unit[s.count > 1 ? 1 : 0]}`)}&body=${encodeURIComponent(body)}`

  return (
    <section className="cmp wrap" id="compose" aria-labelledby="cmp-h">
      <header className="topbar topbar--static">
        <a className="wordmark" href="./"><i aria-hidden="true" />Digitech Bahamas</a>
        <div className="topbar__r"><a className="num mono" href={`tel:${biz.phones[0].tel}`}>{biz.phones[0].label}</a><a className="btn btn-primary btn-sm" href="#quote">Get a quote</a></div>
      </header>
      <div className="cmp__grid">
        <div className="cmp__stage">
          <div className="kstage">
            <img className="kstage__poster" src="kit-poster.jpg" width={1200} height={675} alt="" aria-hidden="true" data-ready={ready} />
            <Suspense fallback={null}><Kit3D s={s} onReady={() => setReady(true)} /></Suspense>
          </div>
          <ul className="onstage" aria-hidden="true">{rows.filter(r => r.n !== null).map(r => <li key={r.what}><span className="num mono">{r.n}</span> {r.what}</li>)}</ul>
          <div className="kit" aria-live="polite">
            <h2 className="kit__h">What Digitech sets up</h2>
            <ol className="kit__list" style={{ gridTemplateRows: `repeat(${Math.ceil(rows.length / 2)}, auto)` }}>
              <AnimatePresence initial={false}>
                {rows.map((r, i) => (
                  <motion.li key={r.what} layout="position" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease, delay: i * 0.04 } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                    <span className="kit__n num mono">{r.n ?? ''}</span>
                    <span><strong>{r.what}</strong><small>{r.detail}</small></span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          </div>
        </div>
        <div className="cmp__ctl">
          <p className="k">Point of sale, networks and backup in Nassau</p>
          <h1 id="cmp-h">Build the counter you need. We install it and look after&nbsp;it.</h1>
          <div className="q">
            <p className="q__l" id="q-kind">What you run</p>
            <div className="seg" role="group" aria-labelledby="q-kind">
              {KINDS.map(k => <button key={k.id} type="button" aria-pressed={s.kind === k.id} onClick={() => set({ kind: k.id })}>{k.label}</button>)}
            </div>
          </div>
          <div className="q q--row">
            <p className="q__l" id="q-count">How many {kind.unit[1]}</p>
            <div className="stepper" role="group" aria-labelledby="q-count">
              <button type="button" aria-label="One fewer" disabled={s.count <= 1} onClick={() => set({ count: Math.max(1, s.count - 1) })}>&minus;</button>
              <output className="num" aria-live="polite">{s.count}</output>
              <button type="button" aria-label="One more" disabled={s.count >= 8} onClick={() => set({ count: Math.min(8, s.count + 1) })}>+</button>
            </div>
          </div>
          <div className="q q--row">
            <button type="button" className="tog" aria-pressed={s.wifi} onClick={() => set({ wifi: !s.wifi })}><span className="tog__k" aria-hidden="true" />Wi-Fi for staff and guests</button>
            <button type="button" className="tog" aria-pressed={s.backup} onClick={() => set({ backup: !s.backup })}><span className="tog__k" aria-hidden="true" />Cloud backup</button>
            <button type="button" className="tog" aria-pressed={s.managed} onClick={() => set({ managed: !s.managed })}><span className="tog__k" aria-hidden="true" />Managed IT and servers</button>
          </div>
          <div className="send" id="quote">
            <div className="kit__who">
              <label><span className="sr-only">Your name (optional)</span><input type="text" autoComplete="name" placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)} /></label>
              <label><span className="sr-only">Where you are (optional)</span><input type="text" placeholder="Where you are, e.g. Bay Street" value={area} onChange={e => setArea(e.target.value)} /></label>
            </div>
            <div className="kit__go">
              <a className="btn btn-primary" href={href}>Send this setup for a quote</a>
              <a className="btn-text callalt" href={`tel:${biz.phones[0].tel}`}>or call <span className="num mono">{biz.phones[0].label}</span></a>
            </div>
            <p className="kit__note">Opens an email to {biz.email} with this list, for you to check before sending. A starting point: Digitech confirms the design on site and prices it in a written quote.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
