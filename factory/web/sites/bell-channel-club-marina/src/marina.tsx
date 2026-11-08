import { useState } from 'react';
import { Layout, Photo, mount, PHONE, TEL } from './layout';
import { IMG } from './images';
import { Strip } from './Strip';

// Interaction 2: the marina's real rule (private, for owners; others if available), answered for each kind of visitor.
const WHO = [
  { id: 'owner', label: 'I own at the club', title: 'Your slip is the club’s first call.', body: ['The marina exists for owners. Ring the office before you arrive so they know when to expect you and your boat.'], cta: 'Call ahead of your arrival' },
  { id: 'guest', label: 'I’m an owner’s guest', title: 'Arrive through your host.', body: ['The dock is private, so the simplest route in is through the owner you are visiting. Ask them to let the office know your boat and your dates, or call the office together.'], cta: 'Call the club office' },
  { id: 'visiting', label: 'I’m arriving by boat', title: 'Ask before you come in.', body: ['Bell Channel Club’s marina is private and kept for owners. Other boats are taken only when a slip is available, so call the office before you plan on it.', 'Have your boat’s length, beam, draft and dates ready when you ring.'], cta: 'Ask about dock availability' },
  { id: 'buyer', label: 'I’m thinking of buying or renting', title: 'A unit with the dock next door.', body: ['Some residences at Bell Channel Club sit on the canal, and owners may use the private marina when space allows. Ask the office about units, garages and the dock before you commit.'], cta: 'Call the club office' },
];

function WhoIsAsking() {
  const [who, setWho] = useState('visiting');
  const w = WHO.find(x => x.id === who)!;
  return (
    <div className="ask">
      <div className="ask__opts" role="group" aria-label="Who is asking about the marina?">
        {WHO.map(x => <button key={x.id} type="button" aria-pressed={who === x.id} onClick={() => setWho(x.id)}>{x.label}</button>)}
      </div>
      <div className="ask__ans" aria-live="polite">
        <div>
          <h3>{w.title}</h3>
          {w.body.map(p => <p key={p}>{p}</p>)}
        </div>
        <a className="btn" href={TEL}>{w.cta} <span style={{ marginLeft: 10, fontFamily: 'var(--font-display)', fontSize: 20 }}>{PHONE}</span></a>
      </div>
    </div>
  );
}

mount(
  <Layout page="marina">
    <Photo img={IMG.dockline} className="spread" priority captionClass="wrap" />
    <section className="wrap opener" aria-labelledby="h1">
      <p className="sc kicker" style={{ margin: 0 }}>The marina at Bell Channel</p>
      <h1 id="h1" className="h1 h1--cover">A private dock, kept for owners</h1>
      <p className="stand">The club’s marina is part of the complex on Bell Channel, the inlet that runs in to Port Lucaya. It is private. Owners come first, and other boats are welcome to ask whether a slip is free.</p>
      <div className="byline sc"><span>Dock enquiries by telephone: <a href={TEL}>{PHONE}</a></span></div>
    </section>

    <section className="wrap chapter" aria-labelledby="who-h">
      <div><p className="sc kicker" style={{ margin: 0 }}>Before you come in</p><h2 id="who-h">Who is asking?</h2></div>
      <div className="body" style={{ maxWidth: 'none' }}><WhoIsAsking /></div>
    </section>

    <Photo img={IMG.marinaPano2} className="bleed" />

    <section className="paper" aria-labelledby="why-h">
      <div className="wrap article">
        <div>
          <h2 id="why-h" className="disp" style={{ fontSize: 'clamp(34px,4.2vw,60px)', lineHeight: 1.02, margin: '0 0 28px' }}>Why we don’t print the numbers</h2>
          <div className="cols">
            <p>Most marina pages open with a table: slips, lengths, depths, power, rates. This one does not, on purpose. A private dock depends on the owners who use it, and the only reliable answer about what is free is the one the office gives you on the day.</p>
            <p>So the honest version is short. The marina belongs to Bell Channel Club. It serves owners. If a slip is available, a visiting boat may be able to use it. Call before you plan on it, with your boat’s particulars to hand.</p>
          </div>
          <ul className="ready" style={{ color: '#152233' }}>
            <li style={{ borderColor: 'rgba(21,34,51,.25)' }}>Your boat’s length overall and beam</li>
            <li style={{ borderColor: 'rgba(21,34,51,.25)' }}>Draft</li>
            <li style={{ borderColor: 'rgba(21,34,51,.25)' }}>Arrival and departure dates</li>
            <li style={{ borderColor: 'rgba(21,34,51,.25)' }}>Whether you are an owner, a guest or visiting</li>
          </ul>
        </div>
        <aside className="particulars" aria-labelledby="part-h">
          <h2 id="part-h">The particulars</h2>
          <dl>
            <dt>Marina</dt><dd>Private, for owners of Bell Channel Club</dd>
            <dt>Visiting boats</dt><dd>Only if a slip is available. Ask first.</dd>
            <dt>Position</dt><dd>26.5147 N, 78.6368 W (directory map pin, not for navigation)</dd>
            <dt>Approach</dt><dd>Bell Channel inlet, Lucaya, Grand Bahama</dd>
          </dl>
          <a className="call" href={TEL}><span className="sc">Ask about dock availability</span><b>{PHONE}</b></a>
        </aside>
      </div>
    </section>

    <section className="essay" aria-labelledby="ess-h">
      <div className="wrap">
        <div className="essay__head"><h2 id="ess-h">Lucaya by water</h2><p style={{ margin: 0, color: '#B9B4A8' }}>The inlet, the marinas beyond it, and the shallows of the Little Bahama Bank.</p></div>
      </div>
      <Strip imgs={[IMG.inlet, IMG.marketplace, IMG.brass, IMG.bank]} />
    </section>
  </Layout>
);
