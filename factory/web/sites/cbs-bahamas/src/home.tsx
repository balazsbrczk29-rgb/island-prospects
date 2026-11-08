import { useRef, useState } from 'react';
import { Layout, morph, mount } from './layout';
import { Wall } from './Wall';
import { DEPTS, ISLANDS, PHOTOS, STEHN, STORE, TEL, PHONE } from './data';

const DESKS = [
  { id: 'store', label: 'A stock question for the Home Center', email: 'cbs@cbsbahamas.com', hint: 'Is it on the shelf, what size, what colour.' },
  { id: 'online', label: 'An order I placed online', email: 'online@cbsbahamas.com', hint: 'The stores cannot look up online orders, so this goes to the online team.' },
  { id: 'pro', label: 'Bulk or contractor pricing', email: 'prostore@cbsbahamas.com', hint: 'Roof packages, full loads and project quotes at the PROstore.' },
];

function Home() {
  const [active, setActive] = useState('roofing');
  const timer = useRef<number | undefined>(undefined);
  const pick = (id: string) => {
    if (id === active) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => morph(() => setActive(id)), 70);
  };
  const dept = DEPTS.find((d) => d.id === active)!;

  const [island, setIsland] = useState('Exuma');
  const [desk, setDesk] = useState('store');
  const [sent, setSent] = useState('');
  const deskInfo = DESKS.find((d) => d.id === desk)!;

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = ['Hello CBS Bahamas,', '', `Desk: ${deskInfo.label}`];
    f.forEach((v, k) => { const s = String(v).trim(); if (s && k !== 'desk') lines.push(`${k}: ${s}`); });
    lines.push('', '(sent from the website)');
    window.location.href = `mailto:${deskInfo.email}?subject=${encodeURIComponent('Question for the CBS counter')}&body=${encodeURIComponent(lines.join('\n'))}`;
    setSent(`Your email app opened, addressed to ${deskInfo.email}.`);
  }

  const steps = [
    <>Order at cbsbahamas.com and choose mailboat delivery to <b>{island}</b>.</>,
    <>CBS prepares the order. There is no same-day mailboat delivery.</>,
    <>CBS carries it to the dock your boat sails from, Potter's Cay or Arawak Cay, at no charge, whatever the size or weight.</>,
    <>At the handoff the load is photographed and a proof of delivery is signed.</>,
    <>You collect on <b>{island}</b> and pay the boat its own freight fee there.</>,
  ];

  return (
    <Layout page="home" active={active} onPick={pick}>
      {/* A02 hero: the inventory is the hero; the index (left) drives this wall */}
      <section className="hero" id="wall" aria-labelledby="h1">
        <Wall items={dept.items} eager plate={
          <div className="plate" style={{ viewTransitionName: 'plate' } as React.CSSProperties}>
            <h1 id="h1">Roof to garden gate, on Carmichael Road.</h1>
            <p className="stand">Nassau's builders have shopped here since March 1973. Pick a department and the wall changes.</p>
            <div className="plate-dept" aria-live="polite">
              <p><em>{dept.name}.</em> {dept.line}</p>
              <a href={dept.href} className="arrow-link">Shop {dept.name.toLowerCase()} online</a>
            </div>
          </div>
        } />
      </section>

      <section className="archive" aria-labelledby="h-archive">
        <figure className="arch arch-b">
          <img src={PHOTOS.vintage} alt="Carl Treco, John Treco and Brent Burrows at the CBS 25th anniversary" width={1600} height={1067} loading="lazy" data-source="own" />
          <span className="hand-note hand-note-lg" aria-hidden="true">Carl, John and Brent, at twenty-five years</span>
        </figure>
        <div className="arch-text">
          <h2 id="h-archive">Six staff and two product lines, in March 1973.</h2>
          <p>Carl G Treco was a building contractor. He opened Commonwealth Building Supplies with Kawneer architectural aluminium and Steelcraft hollow metal doors and frames. Fifty years on, CBS still carries both.</p>
          <p>His son John and his nephew Brent Burrows joined in the late seventies. Today CBS supplies and installs architectural building products for homes and commercial buildings, and runs a 30,000 square foot Home Center at SouthWest Plaza.</p>
          <figure className="arch arch-a"><img src={PHOTOS.carl} alt="Carl G Treco, founder of Commonwealth Building Supplies" width={800} height={1000} loading="lazy" data-source="own" /><figcaption className="hand">Carl G Treco, founder</figcaption></figure>
        </div>
      </section>

      <section className="counter" id="counter" aria-labelledby="h-counter">
        <h2 id="h-counter">Four ways to the counter.</h2>
        <div className="ledger" role="table" aria-label="Ways to buy from CBS">
          <div role="row" className="lrow">
            <span role="cell" className="l-name">The Home Center</span>
            <span role="cell">SouthWest Plaza, Carmichael Road. The 30,000 square foot flagship and its departments.</span>
            <span role="cell" className="l-when">Mon to Sat 8 am to 8 pm<br />Sun 9 am to 5 pm</span>
            <span role="cell"><a className="arrow-link" href="#visit">Find it</a></span>
          </div>
          <div role="row" className="lrow">
            <span role="cell" className="l-name">The PROstore</span>
            <span role="cell">103 Robinson Road. Bulk building materials for contractors and DIY pros, roof packages, smart locker pickup.</span>
            <span role="cell" className="l-when">Mon to Fri 7 am to 4 pm<br />Sat and Sun closed</span>
            <span role="cell"><a className="arrow-link" href="mailto:prostore@cbsbahamas.com">Email the PROstore</a></span>
          </div>
          <div role="row" className="lrow">
            <span role="cell" className="l-name">By phone</span>
            <span role="cell">One number for the Home Center. The PROstore is extension 102.</span>
            <span role="cell" className="l-when">During store hours</span>
            <span role="cell"><a className="arrow-link" href={TEL}>Call {PHONE}</a></span>
          </div>
          <div role="row" className="lrow lrow-hi">
            <span role="cell" className="l-name">Online</span>
            <span role="cell">Thousands of products. Island-wide delivery, smart-locker pickup, special orders, a price match guarantee, and free drop-off at the mailboat.</span>
            <span role="cell" className="l-when">Any time</span>
            <span role="cell"><a className="btn-tape" href={STORE}>Shop CBS online</a></span>
          </div>
        </div>
      </section>

      <section className="mailboat" id="mailboat" aria-labelledby="h-mail">
        <figure className="mail-photo">
          <img src={PHOTOS.daybreak} alt="The mailboat M/V Bahamas Daybreak III coming alongside Potter's Cay Dock, Nassau" width={2000} height={1312} loading="lazy" data-source="commons" />
          <span className="hand-note hand-note-lg" aria-hidden="true">the boat home</span>
          <figcaption>M/V Bahamas Daybreak III at Potter's Cay Dock, 1989. Photo: {STEHN}</figcaption>
        </figure>
        <div className="mail-plan">
          <h2 id="h-mail">Free to the mailboat, for every Family Island.</h2>
          <label className="isle">
            <span>Ship my order to</span>
            <select value={island} onChange={(e) => { const v = e.target.value; morph(() => setIsland(v)); }}>
              {ISLANDS.map((i) => <option key={i}>{i}</option>)}
            </select>
          </label>
          <ol className="steps" style={{ viewTransitionName: 'steps' } as React.CSSProperties}>
            {steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <p className="small">From the CBS guide to shipping on the mailboat. Which boat serves {island}, and when it sails, is confirmed with you when you order.</p>
        </div>
      </section>

      <section className="bleed" aria-label="Potter's Cay Dock">
        <img src={PHOTOS.bridge} alt="Potter's Cay Dock under the Paradise Island bridge, Nassau, with mailboats tied up" width={2000} height={1313} loading="lazy" data-source="commons" />
        <p className="bleed-line">Potter's Cay Dock, under the bridge. One of the two docks where CBS hands over Family Island orders.<span>Photo: {STEHN}</span></p>
      </section>

      <section className="docket-wrap" id="ask" aria-labelledby="h-ask">
        <div className="docket-intro">
          <h2 id="h-ask">Ask the right desk, the first time.</h2>
          <p>CBS has three inboxes. Tell us what the question is about and your email goes to the one that can answer it.</p>
        </div>
        <form className="docket" onSubmit={send} data-email={deskInfo.email}>
          <fieldset>
            <legend>My question is about</legend>
            {DESKS.map((d) => (
              <label key={d.id} className="desk">
                <input type="radio" name="desk" value={d.id} checked={desk === d.id} onChange={() => setDesk(d.id)} />
                <span><b>{d.label}</b><small>{d.hint}</small></span>
              </label>
            ))}
          </fieldset>
          <div className="docket-fields">
            <label>Your name <input name="Name" required autoComplete="name" /></label>
            <label>Phone, if you prefer a call <input name="Phone" type="tel" autoComplete="tel" /></label>
            <label className="wide">What do you need? <textarea name="Message" rows={4} placeholder="e.g. 12 sheets of 19/32 RTD ply and two rolls of underlayment for Long Island" /></label>
          </div>
          <div className="docket-foot">
            <p className="to">To: <b>{deskInfo.email}</b></p>
            <button type="submit" className="btn-tape">Send to the CBS counter</button>
          </div>
          <p className="small" role="status">{sent || 'Opens your email app with the message filled in.'}</p>
        </form>
      </section>

      <section className="visit" id="visit" aria-labelledby="h-visit">
        <figure className="visit-photo">
          <img src={PHOTOS.proFront} alt="The CBS PROstore building on Robinson Road, Nassau" width={1600} height={1000} loading="lazy" data-source="own" />
          <span className="hand-note" aria-hidden="true">the PROstore, Robinson Road</span>
        </figure>
        <div className="visit-text">
          <h2 id="h-visit">Two doors in Nassau.</h2>
          <dl>
            <dt>CBS Home Center</dt><dd>SouthWest Plaza, Carmichael Road, Nassau<br />Mon to Sat 8 am to 8 pm, Sun 9 am to 5 pm</dd>
            <dt>CBS PROstore</dt><dd>103 Robinson Road, Nassau<br />Mon to Fri 7 am to 4 pm<br /><a href="mailto:prostore@cbsbahamas.com">prostore@cbsbahamas.com</a></dd>
            <dt>Phone</dt><dd><a href={TEL}>{PHONE}</a></dd>
          </dl>
        </div>
        <iframe className="map" title="Map of CBS SouthWest Plaza, Carmichael Road, Nassau" loading="lazy" src="https://www.google.com/maps?q=CBS%20SouthWest%20Plaza%20Carmichael%20Road%20Nassau%20Bahamas&output=embed" />
      </section>
    </Layout>
  );
}

mount(<Home />);
