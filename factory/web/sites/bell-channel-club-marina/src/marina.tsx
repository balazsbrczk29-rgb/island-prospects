import { useMemo, useState } from 'react'
import { Header, CallingCard, Footer, MobileCall, mount, PHONE, TEL, COORD } from './common'
import { IMG } from './images'

const SPEC: [string, string, boolean?][] = [
  ['The marina', 'Private, kept for the club’s owners. Slips are offered when available.'],
  ['Position', COORD],
  ['Approach', 'Bell Channel, the cut from the south shore of Grand Bahama into Bell Channel Bay.'],
  ['Nearest public marina', 'Port Lucaya Marina, inside the same cut.'],
  ['Office', `${PHONE}, fax (242) 373-3802`],
  ['Confirmed when you call', 'Length and beam limits, depth at the slip, shore power and water, fuel and the working VHF channel.', true],
]

function SlipNote() {
  const [v, setV] = useState<Record<string, string>>({})
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setV(s => ({ ...s, [k]: e.target.value }))
  const lines = useMemo(() => [
    v.who && `I am ${v.who}.`,
    v.boat && `Boat: ${v.boat}.`,
    (v.loa || v.beam || v.draft) && `Length ${v.loa || '?'} ft, beam ${v.beam || '?'} ft, draft ${v.draft || '?'} ft.`,
    v.power && `Power: ${v.power}.`,
    v.from && `Arriving ${v.from}${v.to ? `, leaving ${v.to}` : ''}.`,
  ].filter(Boolean).join('\n'), [v])
  return (
    <section className="note" aria-labelledby="note-h">
      <div>
        <h2 id="note-h" className="display">Before you call.</h2>
        <p className="lede">The office answers fastest when it knows the boat. Fill in what you have, and read your note out when they pick up.</p>
        <form onSubmit={e => e.preventDefault()}>
          <fieldset>
            <legend>You and the boat</legend>
            <label>You are
              <select value={v.who || ''} onChange={set('who')}>
                <option value="">Choose</option>
                <option value="an owner at the club">An owner</option>
                <option value="staying with an owner">An owner’s guest</option>
                <option value="a visiting boat">A visiting boat</option>
                <option value="buying or renting at the club">Buying or renting</option>
              </select>
            </label>
            <label>Boat name<input value={v.boat || ''} onChange={set('boat')} autoComplete="off" /></label>
            <label>Power needed
              <select value={v.power || ''} onChange={set('power')}>
                <option value="">Not sure</option><option>30 amp</option><option>50 amp</option><option>100 amp</option><option>None</option>
              </select>
            </label>
          </fieldset>
          <fieldset>
            <legend>Dimensions, in feet</legend>
            <label>Length overall<input inputMode="decimal" value={v.loa || ''} onChange={set('loa')} /></label>
            <label>Beam<input inputMode="decimal" value={v.beam || ''} onChange={set('beam')} /></label>
            <label>Draft<input inputMode="decimal" value={v.draft || ''} onChange={set('draft')} /></label>
          </fieldset>
          <fieldset>
            <legend>Dates</legend>
            <label>Arriving<input type="date" value={v.from || ''} onChange={set('from')} /></label>
            <label>Leaving<input type="date" value={v.to || ''} min={v.from} onChange={set('to')} /></label>
          </fieldset>
        </form>
      </div>
      <aside className="slip" aria-label="Your slip note">
        <h3>Your slip note</h3>
        <output aria-live="polite">{lines || 'Your details appear here as you type.'}</output>
        <a className="btn" href={TEL}>Call the club office</a>
      </aside>
    </section>
  )
}

function MarinaPage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <section className="mp-hero">
        <img src="channel-dusk.jpg" alt="Dusk over open water off Lucaya, the low line of Grand Bahama ahead with shore lights and the cut of Bell Channel" fetchPriority="high" />
        <Header tone="dark" />
        <div className="mp-hero__t">
          <h1>The marina</h1>
          <p>Private, and kept for the people who own homes at Bell Channel Club. What we can tell you here, and what the office confirms when you call.</p>
        </div>
      </section>
      <main id="main">
        <section className="spec" aria-labelledby="spec-h">
          <h2 id="spec-h" className="display">What a captain needs to know.</h2>
          <dl className="spec__rows">
            {SPEC.map(([k, val, ask]) => <div key={k}><dt>{k}</dt><dd className={ask ? 'ask-o' : ''}>{val}</dd></div>)}
          </dl>
        </section>
        <SlipNote />
      </main>
      <CallingCard img="channel-night.jpg" alt="Blue hour at Bell Channel: the low shore of Grand Bahama and the red and green lights on the breakwater heads" caption="Bell Channel at blue hour, from the scene on our home page." />
      <Footer />
      <MobileCall />
    </>
  )
}

mount(<MarinaPage />)
