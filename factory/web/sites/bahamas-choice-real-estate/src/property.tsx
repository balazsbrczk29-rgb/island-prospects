import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LISTINGS, OFFICE, TEAM, short } from './data';
import { Footer, Mast, Strip, Window, mailto, useLenis, type Layer } from './site';

const id = Number(document.body.dataset.listing);
const L = LISTINGS.find(l => l.id === id)!;
const others = LISTINGS.filter(l => l.id !== id && l.page);

function Property() {
  useLenis();
  const [i, setI] = useState(0);
  const layers: Layer[] = L.photos.map((p, n) => ({ key: `p${n}`, photo: p, mode: p.h < 700 ? 'framed' : 'cover' }));
  const step = (d: number) => setI(n => (n + d + L.photos.length) % L.photos.length);
  const [v, setV] = useState({ name: '', contact: '', when: '' });
  const ok = v.name.trim() && v.contact.trim();
  const verb = L.status === 'To rent' ? 'rent' : 'buy';
  const body = `Hello Bahamas Choice,\n\nI would like to view ${L.title}, ${L.area}, ${L.island} (listing #${L.id}, ${L.price}${L.priceNote ? ' ' + L.priceNote : ''}).\n\nName: ${v.name}\nEmail or phone: ${v.contact}\nWhen suits me: ${v.when}\n`;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="split">
        <Window layers={layers} active={`p${i}`} />
        <div className="column">
          <header style={{ paddingTop: 32 }}>
            <Mast home={false} />
            <p style={{ marginTop: 32 }}><a className="link" href="index.html#listings">All listings</a></p>
          </header>
          <main id="main">
            <section className="section" style={{ borderTop: 0, paddingTop: 48 }} aria-labelledby="p-h">
              <figure className="inline-photo" style={{ marginBottom: 32 }}>
                <img src={L.photos[i].src} alt={L.photos[i].alt} width={L.photos[i].w} height={L.photos[i].h} fetchPriority="high" />
              </figure>
              <p className="muted">{L.status} <span aria-hidden="true">{'·'}</span> <span className="num">Listing #{L.id}</span></p>
              <h1 id="p-h" className="h2" style={{ marginTop: 16, fontSize: 'var(--t-3xl)', maxWidth: '14ch' }}>{L.title}</h1>
              <p className="lede muted" style={{ marginTop: 16 }}>{L.area}, {short(L.island)}</p>
              <p className="num" style={{ fontSize: 'var(--t-2xl)', marginTop: 40, lineHeight: 1 }}>{L.price}{L.priceNote && <span className="muted" style={{ fontSize: 'var(--t-m)' }}> {L.priceNote}</span>}</p>
              <p className="num muted" style={{ marginTop: 16 }}>{L.facts.join('  ·  ')}</p>
              {L.photos.length > 1 && (
                <div className="filters" role="group" aria-label="Photographs">
                  <button type="button" className="chip" onClick={() => step(-1)} aria-label="Previous photograph">Previous</button>
                  <span className="num muted" style={{ alignSelf: 'center', padding: '0 8px' }} aria-live="polite">{i + 1} of {L.photos.length}</span>
                  <button type="button" className="chip" onClick={() => step(1)} aria-label="Next photograph">Next</button>
                </div>
              )}
              <p className="body" style={{ marginTop: 40 }}>{L.summary}</p>
              <p className="muted" style={{ marginTop: 16, fontSize: 'var(--t-s)' }}>{L.photoCount} photographs on the MLS listing. Facts from the Bahamas MLS, deemed reliable but not guaranteed.</p>
            </section>

            <section id="viewing" className="section" aria-labelledby="v-h">
              <h2 id="v-h" className="h2">Ask for a viewing.</h2>
              <p className="body muted" style={{ marginTop: 24 }}>Your request reaches the office with the listing number already on it.</p>
              <form className="form" onSubmit={e => { e.preventDefault(); if (ok) window.location.href = mailto(`Viewing request: ${L.title} (#${L.id})`, body); }}>
                <div className="field"><label htmlFor="v-name">Your name</label><input id="v-name" required autoComplete="name" value={v.name} onChange={e => setV({ ...v, name: e.target.value })} /></div>
                <div className="field"><label htmlFor="v-contact">Email or phone</label><input id="v-contact" required autoComplete="email" value={v.contact} onChange={e => setV({ ...v, contact: e.target.value })} /></div>
                <div className="field full"><label htmlFor="v-when">When suits you</label><input id="v-when" placeholder="e.g. a weekday morning, or a video call" value={v.when} onChange={e => setV({ ...v, when: e.target.value })} /></div>
                <div className="full" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', alignItems: 'center' }}>
                  <button className="btn btn-primary" type="submit" aria-disabled={!ok}>Request a viewing</button>
                  <a className="link num" href={`tel:${OFFICE.tel}`}>or call {OFFICE.phone}</a>
                </div>
              </form>
              <p className="muted" style={{ marginTop: 32, fontSize: 'var(--t-s)' }}>Prefer to {verb} through a person you know? <a className="link num" href={`tel:${TEAM[0].tel}`}>Lana Munnings-Basalyga, {TEAM[0].phone}</a></p>
            </section>

            <section className="section" aria-labelledby="o-h">
              <h2 id="o-h" className="h2" style={{ fontSize: 'var(--t-xl)' }}>The other listings</h2>
              <ul className="rows">
                {others.map(o => (
                  <li key={o.id} className="row"><a href={o.page}>
                    <img src={o.photos[0].src} alt={o.photos[0].alt} width={88} height={110} loading="lazy" />
                    <div><h3>{o.title}</h3><p className="where">{o.area}, {short(o.island)}</p></div>
                    <p className="price num">{o.price}{o.priceNote && <small>{o.priceNote}</small>}</p>
                  </a></li>
                ))}
              </ul>
            </section>
          </main>
          <Footer />
        </div>
      </div>
      <Strip cta="Ask for a viewing" href="#viewing" hideOver="#viewing" />
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Property /></StrictMode>);
