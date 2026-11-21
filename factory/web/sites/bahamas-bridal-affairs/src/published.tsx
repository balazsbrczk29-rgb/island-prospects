import { useEffect, useState } from "react"
import { Ask, EndCredits, TopLine, mount, useWheelSmoothing } from "./shell"
import { PUBLISHED } from "./content"

const HIDE = [".pub__head", ".pub__end", ".credits"]

function Published() {
  useWheelSmoothing()
  const [tab, setTab] = useState(PUBLISHED[0].id)
  useEffect(() => {
    const id = location.hash.slice(1)
    if (PUBLISHED.some(p => p.id === id)) setTab(id)
  }, [])
  return (
    <>
      <a className="skip" href="#weddings">Skip to the weddings</a>
      <TopLine home={false} />
      <main id="weddings">
        <div className="pub__head">
          <h1>Two weddings in print, with every credit.</h1>
          <p>Magazines list who did what. On both of these, Bahamas Bridal Affairs is on the list.</p>
        </div>
        <div className="pub__tabs" role="tablist" aria-label="Published weddings">
          {PUBLISHED.map(w => (
            <button key={w.id} type="button" role="tab" id={`tab-${w.id}`} aria-selected={tab === w.id} aria-controls={`panel-${w.id}`} onClick={() => { setTab(w.id); history.replaceState(null, "", `#${w.id}`) }}>{w.mag}</button>
          ))}
        </div>
        {PUBLISHED.map(w => (
          <section key={w.id} className="pub__panel" role="tabpanel" id={`panel-${w.id}`} aria-labelledby={`tab-${w.id}`} hidden={tab !== w.id}>
            <div className="pub__story">
              <h2>{w.title}</h2>
              {w.story.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
              <a className="quiet num" href={w.url} rel="noopener">{`Read it in ${w.mag}, ${w.date}`}</a>
            </div>
            <div className="pub__roll">
              <h3>The credits</h3>
              <dl>
                {w.credits.map(([role, who, us]) => (
                  <div key={role} style={{ display: "contents" }}>
                    <dt>{role}</dt><dd className={us ? "us" : undefined}>{who}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ))}
        <div className="pub__end">
          <h2>Now, about your own date.</h2>
          <a className="cta" href="index.html#your-date">Ask about your date</a>
        </div>
      </main>
      <EndCredits />
      <Ask href="index.html#your-date" hideOver={HIDE} />
    </>
  )
}

mount(<Published />)
