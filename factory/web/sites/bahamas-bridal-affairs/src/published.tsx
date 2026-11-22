import { useEffect, useState } from "react"
import { Footer, TopLine, mount, useWheelSmoothing } from "./shell"
import { PUBLISHED } from "./content"

function Published() {
  useWheelSmoothing()
  const [tab, setTab] = useState(PUBLISHED[0].id)
  useEffect(() => {
    const id = location.hash.slice(1)
    if (PUBLISHED.some(p => p.id === id)) setTab(id)
  }, [])
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    const i = PUBLISHED.findIndex(p => p.id === tab)
    const n = PUBLISHED[(i + (e.key === "ArrowRight" ? 1 : -1) + PUBLISHED.length) % PUBLISHED.length]
    setTab(n.id); history.replaceState(null, "", `#${n.id}`); document.getElementById(`tab-${n.id}`)?.focus()
  }
  return (
    <>
      <a className="skip" href="#weddings">Skip to the weddings</a>
      <TopLine home={false} />
      <main id="weddings" className="pub">
        <div className="wrap">
          <header className="pub__head">
            <h1>Two weddings in print, with every credit.</h1>
            <p className="lead">Magazines list who did what. On both of these, Bahamas Bridal Affairs is on the list.</p>
          </header>
          <div className="pub__tabs" role="tablist" aria-label="Published weddings" onKeyDown={onKey}>
            {PUBLISHED.map(w => (
              <button key={w.id} type="button" role="tab" id={`tab-${w.id}`} aria-selected={tab === w.id} aria-controls={`panel-${w.id}`} tabIndex={tab === w.id ? 0 : -1}
                onClick={() => { setTab(w.id); history.replaceState(null, "", `#${w.id}`) }}>
                <cite>{w.mag}</cite><span className="num">{w.date}</span>
              </button>
            ))}
          </div>
          {PUBLISHED.map(w => (
            <section key={w.id} className="pub__panel" role="tabpanel" id={`panel-${w.id}`} aria-labelledby={`tab-${w.id}`} hidden={tab !== w.id}>
              <div className="pub__story">
                <h2>{w.title}</h2>
                {w.story.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
                <a className="link num" href={w.url} rel="noopener">{`Read it in ${w.mag}, ${w.date}`}</a>
              </div>
              <div className="pub__roll">
                <h3>The credits</h3>
                <dl>
                  {w.credits.map(([role, who, us]) => (
                    <div key={role} className={us ? "us" : undefined}>
                      <dt>{role}</dt><dd>{who}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          ))}
          <div className="pub__end">
            <h2>Now, about your own date.</h2>
            <a className="btn btn--primary" href="index.html#compose">Check your wedding date</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

mount(<Published />)
