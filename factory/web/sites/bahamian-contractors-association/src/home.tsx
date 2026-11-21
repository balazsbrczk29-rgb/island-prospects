import { StrictMode, useDeferredValue, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { UNI, ASSETS, BENEFITS, MEMBERS, OFFICE, RECORD, SITE, TIERS } from './data';
import { Finder } from './finder';
import './styles.css';

function Gridlines() {
  return <div className="gridlines grid" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <div key={i} />)}</div>;
}

function Register() {
  const [q, setQ] = useState('');
  const dq = useDeferredValue(q.trim().toLowerCase());
  const list = dq ? MEMBERS.filter(m => m.n.toLowerCase().includes(dq)) : MEMBERS;
  return (
    <div className="register" role="search">
      <div className="head">
        <h2 style={{ fontSize: 'var(--t2)', letterSpacing: 0, lineHeight: 1.3 }}>The member register</h2>
        <span className="num muted" aria-live="polite" style={{ fontSize: 'var(--t1)' }}>{list.length} of {MEMBERS.length}</span>
      </div>
      <label htmlFor="reg-q">Search by firm name</label>
      <input id="reg-q" type="search" autoComplete="off" placeholder="Roofing, Construction, Pools..." value={q} onChange={e => setQ(e.target.value)} />
      <ul className="reglist">
        {list.slice(0, 80).map(m => (
          <li key={m.s}><a href={`${SITE}/profile/${m.s}/`} rel="noopener"><span>{m.n}</span><span className="num">{m.p.split('/')[0]}</span></a></li>
        ))}
        {list.length > 80 && <li className="empty">Keep typing to narrow {list.length} firms.</li>}
        {list.length === 0 && <li className="empty">No member by that name yet. <a className="tlink" href="#membership">Is it yours? Join the register.</a></li>}
      </ul>
    </div>
  );
}

function Bar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let past = false, over = false;
    const upd = () => setShow(past && !over);
    const onS = () => { const p = scrollY > innerHeight * 0.9; if (p !== past) { past = p; upd(); } };
    const t = document.querySelector('#office');
    const io = new IntersectionObserver(([e]) => { over = e.isIntersecting; upd(); });
    if (t) io.observe(t);
    addEventListener('scroll', onS, { passive: true }); onS();
    return () => { removeEventListener('scroll', onS); io.disconnect(); };
  }, []);
  return (
    <div className={`bar ${show ? 'show' : ''}`} aria-hidden={!show}>
      <a href={`tel:${OFFICE.tel}`} tabIndex={show ? 0 : -1} className="num">Call the office</a>
      <a href="#membership" className="y" tabIndex={show ? 0 : -1}>Find your membership</a>
    </div>
  );
}

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="wrap hero">
        <Gridlines />
        <div className="top">
          <a className="brand" href="index.html">Bahamian Contractors&rsquo; Association</a>
          <nav aria-label="Sections">
            <ul>
              <li><a href="#register"><span>1.0</span>Register</a></li>
              <li><a href="#record"><span>2.0</span>Advocacy</a></li>
              <li><a href="#membership"><span>3.0</span>Membership</a></li>
              <li><a href="#events"><span>4.0</span>Events</a></li>
              <li><a href="#office"><span>5.0</span>Office</a></li>
            </ul>
          </nav>
          <a className="call num" href={`tel:${OFFICE.tel}`}>{OFFICE.phone}</a>
        </div>
        <div className="grid hair" id="register" style={{ position: 'relative' }}>
          <div className="statement" id="main">
            <h1><span className="num">{MEMBERS.length}</span> Bahamian firms. One voice since&nbsp;1959.</h1>
            <p className="lead">The association of the people who build The Bahamas: contractors, specialty trades, suppliers, consultants and&nbsp;developers.</p>
            <div className="actions">
              <a className="btn" href="#membership">Find your membership</a>
              <a className="tlink" href="#register-search">Search the register</a>
            </div>
          </div>
          <div id="register-search" style={{ display: 'contents' }}><Register /></div>
        </div>
      </header>

      <main>
        <figure className="band" style={{ margin: 0 }}>
          <img src={`${ASSETS}g3.jpg`} alt="Three builders in hard hats and hi-vis walking across a freshly poured slab, with the sea beyond" width={2752} height={1204} loading="lazy" decoding="async" />
          <figcaption>Illustrative photograph of a Bahamian building site.</figcaption>
        </figure>

        <section id="record" className="sec wrap" aria-labelledby="rec-h">
          <div className="sec-head">
            <p className="no num">2.0</p>
            <h2 id="rec-h">The industry&rsquo;s official voice, with the law to show for&nbsp;it.</h2>
          </div>
          <figure className="grid" style={{ margin: '48px 0 0' }}>
            <img src={`${UNI}f17cf6cc-c6e0-4a1b-96e2-0cc3f01ceabe?optimizer=gif`} alt="A BCA member speaking into a microphone at the 2025 Mix and Mingle, harbour behind" width={2048} height={1153} loading="lazy" decoding="async" style={{ gridColumn: '2 / span 7', width: '100%', height: 'auto', display: 'block', background: 'var(--field)' }} />
            <figcaption className="muted" style={{ gridColumn: '9 / span 3', alignSelf: 'end', fontSize: 'var(--t1)' }}>Mix &amp; Mingle, April 2025.</figcaption>
          </figure>
          <table className="table">
            <thead><tr><th scope="col" style={{ width: '25%' }}>When</th><th scope="col">What the BCA did</th></tr></thead>
            <tbody>
              {RECORD.map(([y, t]) => (
                <tr key={y}><th scope="row" className="price num">{y}</th><td>{t}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="membership" className="sec wrap field" aria-labelledby="mem-h">
          <div className="sec-head">
            <p className="no num">3.0</p>
            <h2 id="mem-h">Four tiers. Find yours in two&nbsp;taps.</h2>
            <p className="aside">Open to Bahamian citizens, and residents with the right to work in The&nbsp;Bahamas.</p>
          </div>
          <Finder />
        </section>

        <section className="sec wrap" aria-labelledby="ben-h">
          <div className="sec-head">
            <p className="no num">3.1</p>
            <h2 id="ben-h">What your dues&nbsp;buy.</h2>
          </div>
          <table className="table">
            <thead><tr><th scope="col" style={{ width: '25%' }}>Benefit</th><th scope="col">What it means</th></tr></thead>
            <tbody>{BENEFITS.map(([k, v]) => <tr key={k}><th scope="row" className="k">{k}</th><td>{v}</td></tr>)}</tbody>
          </table>
        </section>

        <section id="events" className="sec wrap" aria-labelledby="ev-h" style={{ paddingTop: 0 }}>
          <div className="sec-head">
            <p className="no num">4.0</p>
            <h2 id="ev-h">Next on the calendar.</h2>
          </div>
          <article className="event">
            <p className="date num">11&nbsp;Dec</p>
            <div className="what">
              <h3>Skyfall, the Q4 Mix &amp; Mingle</h3>
              <p className="muted" style={{ marginTop: 8 }}>Friday 11 December 2026, Royal Blue Tavern</p>
              <p style={{ marginTop: 16 }}>Drinks and hors d&rsquo;oeuvres, networking, a photo booth, giveaways and the VIP Cigar Lounge. Your registration is confirmed once payment is sent.</p>
            </div>
            <div className="go"><a className="btn" href={`${SITE}/events/skyfall-2026`} rel="noopener">RSVP</a></div>
          </article>
          <article className="event">
            <p className="date num" style={{ color: 'var(--muted)' }}>25&nbsp;Apr</p>
            <div className="what">
              <h3>Mix &amp; Mingle 2025</h3>
              <p className="muted" style={{ marginTop: 8 }}>Members and supporters met the new board.</p>
            </div>
            <div className="go"><a className="tlink" href={`${SITE}/events/mix-mingle-2025`} rel="noopener">Photos and video</a></div>
            <figure className="photo" style={{ marginInline: 0, marginBottom: 0 }}>
              <img src={`${UNI}24b65dcb-a0e1-4f8f-9e2c-155489e3d779?optimizer=gif`} alt="Members gathered on a waterfront deck under string lights at dusk" width={2048} height={1153} loading="lazy" decoding="async" />
            </figure>
          </article>
        </section>

        <section id="office" className="sec wrap" aria-labelledby="of-h" style={{ borderTop: '1px solid var(--ink)' }}>
          <div className="sec-head">
            <p className="no num">5.0</p>
            <h2 id="of-h">Come by Chesapeake&nbsp;Road.</h2>
          </div>
          <table className="table">
            <tbody>
              <tr><th scope="row" className="k" style={{ width: '25%' }}>Office</th><td><a className="tlink" href={OFFICE.map} rel="noopener">{OFFICE.address}</a></td></tr>
              {OFFICE.hours.map(([d, h]) => <tr key={d}><th scope="row" className="k">{d}</th><td className="num">{h}</td></tr>)}
              <tr><th scope="row" className="k">Phone</th><td><a className="tlink num" href={`tel:${OFFICE.tel}`}>{OFFICE.phone}</a></td></tr>
              <tr><th scope="row" className="k">Email</th><td><a className="tlink" href={`mailto:${OFFICE.email}`}>{OFFICE.email}</a></td></tr>
            </tbody>
          </table>
        </section>
      </main>

      <footer className="foot wrap">
        <p>Bahamian Contractors&rsquo; Association, Nassau, The Bahamas. Established 1959.</p>
        <p style={{ marginTop: 8 }}>
          <a href="https://www.facebook.com/bahamiancontractors/" rel="noopener">Facebook</a>{'  ·  '}
          <a href="https://www.instagram.com/bahamiancontractors/" rel="noopener">Instagram</a>{'  ·  '}
          <a href={`${SITE}/nailed-it`} rel="noopener">Nailed It! radio show</a>{'  ·  '}
          <a href="https://facebook.com/groups/bcabuysell/" rel="noopener">Contractors Buy &amp; Sell group</a>
        </p>
        <p style={{ marginTop: 16 }}>Concept preview by ESTATIQ AI Solutions. Member names from the BCA register. Event photographs from the BCA; the building-site photograph is illustrative.</p>
      </footer>
      <Bar />
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
