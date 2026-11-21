import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FILM, ISLANDS, LISTINGS, OFFICE, PHOTO, TEAM } from './data';
import { Footer, Mast, Strip, Window, mailto, useActiveWindow, useLenis, type Layer } from './site';
import { Brief, type Mode } from './brief';

const LAYERS: Layer[] = [
  ...FILM.map((f, i) => ({ key: `c${i}`, photo: f.photo, })),
  { key: 'villa', photo: PHOTO.villa, pos: '58% 50%', caption: 'From the Bahamas Choice collection' },
  ...LISTINGS.filter(l => l.photos.length).map(l => ({ key: `l${l.id}`, photo: l.photos[0], mode: (l.photos[0].h < 700 ? 'framed' : 'cover') as Layer['mode'] })),
  { key: 'sunset', photo: PHOTO.sunset, pos: '50% 50%' },
  { key: 'harbour', photo: PHOTO.harbour, mode: 'framed', caption: 'Harbour Island, Eleuthera' },
  { key: 'team', photo: PHOTO.team, mode: 'framed', caption: 'Lana Munnings-Basalyga and the team' },
];

type Want = 'home' | 'rent' | 'land';
const WANT: Record<Want, string> = { home: 'buy a home', rent: 'rent a home', land: 'buy land' };
const matches = (want: Want, island: string) => LISTINGS.filter(l => l.status !== 'Sold'
  && (want === 'home' ? l.kind === 'Condo' || l.kind === 'House' : want === 'rent' ? l.status === 'To rent' : l.kind === 'Land')
  && (island === 'any' || l.island === island));

function Finder({ onShow }: { onShow: (f: Filter) => void }) {
  const [want, setWant] = useState<Want>('home');
  const [island, setIsland] = useState('any');
  const n = matches(want, island).length;
  return (
    <form className="finder" onSubmit={e => e.preventDefault()} aria-label="Find a listing">
      <span>I would like to</span>
      <label className="sr-only" htmlFor="want">What you are looking for</label>
      <select id="want" value={want} onChange={e => setWant(e.target.value as Want)}>
        {(Object.keys(WANT) as Want[]).map(k => <option key={k} value={k}>{WANT[k]}</option>)}
      </select>
      <span>on</span>
      <label className="sr-only" htmlFor="island">Island</label>
      <select id="island" value={island} onChange={e => setIsland(e.target.value)}>
        <option value="any">any island</option>
        <option value="New Providence">New Providence</option>
        <option value="Long Island">Long Island</option>
      </select>
      {n > 0
        ? <a className="link num" href="#listings" onClick={() => onShow(want === 'rent' ? 'To rent' : want === 'land' ? 'Land' : 'For sale')}>{`${n} ${want === 'land' ? (n === 1 ? 'plot' : 'plots') : (n === 1 ? 'home' : 'homes')}${island === 'any' ? ' listed' : ` on ${island}`}`}</a>
        : <a className="link" href="#brief">None today: send a brief</a>}
    </form>
  );
}

type Filter = 'All' | 'For sale' | 'To rent' | 'Land';

function Listings({ filter, setFilter, setHover }: { filter: Filter; setFilter: (f: Filter) => void; setHover: (k: string | null) => void }) {
  const shown = LISTINGS.filter(l => filter === 'All' || (filter === 'Land' ? l.kind === 'Land' : l.status === filter));
  return (
    <section id="listings" className="section" data-win="villa" aria-labelledby="listings-h">
      <h2 id="listings-h" className="h2">Four listings today, and the latest sale.</h2>
      <p className="body muted" style={{ marginTop: 24 }}>Straight from the Bahamas MLS. Each one opens with its photographs, its facts and a viewing request.</p>
      <div className="filters" role="group" aria-label="Filter listings">
        {(['All', 'For sale', 'To rent', 'Land'] as Filter[]).map(f => (
          <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <ul className="rows" onMouseLeave={() => setHover(null)}>
        {shown.map(l => {
          const inner = (
            <>
              {l.photos[0] ? <img src={l.photos[0].src} alt={l.photos[0].alt} width={88} height={110} loading="lazy" decoding="async" /> : <span className="noimg">Sold</span>}
              <div>
                <h3>{l.title}</h3>
                <p className="where">{l.area}, {l.island} <span aria-hidden="true">{'·'}</span> {l.status === 'Sold' ? 'Sold' : l.facts.slice(0, 2).join(', ')}</p>
              </div>
              <p className="price num">{l.price}{l.priceNote && <small>{l.priceNote}</small>}</p>
            </>
          );
          return (
            <li key={l.id} className="row" onMouseEnter={() => l.photos[0] && setHover(`l${l.id}`)} onFocus={() => l.photos[0] && setHover(`l${l.id}`)}>
              {l.page ? <a href={l.page}>{inner}</a> : <div>{inner}</div>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Islands({ onPick }: { onPick: (island: string) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="islands" className="section" data-win="sunset" aria-labelledby="islands-h">
      <h2 id="islands-h" className="h2">Whichever island, the same office answers.</h2>
      <p className="body muted" style={{ marginTop: 24 }}>The sixteen island groups we work across, and the areas we present on each. Choose one to start a brief for it.</p>
      <ul className="islands">
        {ISLANDS.map(is => (
          <li key={is.name}>
            <button type="button" aria-expanded={open === is.name} onClick={() => setOpen(open === is.name ? null : is.name)}>
              <span>{is.name}</span><span aria-hidden="true">{open === is.name ? '−' : '+'}</span>
            </button>
            {open === is.name && (
              <div className="places">
                {is.places.length ? is.places.join(', ') + '.' : 'Ask us about property here.'}
                <br /><a href="#brief" className="link" onClick={() => onPick(is.name)}>Start a brief for {is.name}</a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Home() {
  useLenis();
  const { active, setHover } = useActiveWindow('c0');
  const [filter, setFilter] = useState<Filter>('All');
  const [brief, setBrief] = useState<{ mode: Mode; island: string; n: number }>({ mode: 'Buy', island: '', n: 0 });
  const condo = LISTINGS[0];
  const filmDone = useMemo(() => FILM.length, []);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="split">
        <Window layers={LAYERS} active={active} hint="Scroll, and this window walks you through 5 Bayview Drive, room by room." />
        <div className="column">
          <header className="hero" data-win="c0">
            <figure className="inline-photo" style={{ margin: 0 }}>
              <img src={FILM[0].photo.src} alt={FILM[0].photo.alt} width={800} height={1066} fetchPriority="high" />
            </figure>
            <Mast />
            <nav aria-label="Sections">
              <ul className="navlist sc">
                <li><a href="#film">The walk-through</a></li>
                <li><a href="#listings">Listings</a></li>
                <li><a href="#islands">Islands</a></li>
                <li><a href="#selling">Selling</a></li>
                <li><a href="#team">The team</a></li>
                <li><a href="#brief">Your brief</a></li>
              </ul>
            </nav>
            <div className="hero-body" id="main">
              <h1>Sixteen island groups. One family office on Yamacraw Hill&nbsp;Road.</h1>
              <p className="lede">Since 2013, Lana Munnings-Basalyga and her team have helped people buy, sell and lease homes, land and commercial property across The Bahamas, wherever they happen to&nbsp;live.</p>
              <div className="actions">
                <a className="btn btn-primary" href="#brief">Send your brief</a>
                <a className="link" href="#film">Walk through 5 Bayview Drive</a>
              </div>
              <Finder onShow={f => setFilter(f)} />
            </div>
          </header>

          <section id="film" className="section" aria-labelledby="film-h" style={{ paddingBottom: 0 }}>
            <div data-win="c0">
              <h2 id="film-h" className="h2">Walk through 5 Bayview Drive before you&nbsp;fly.</h2>
              <p className="body muted" style={{ marginTop: 24 }}>A furnished two-bedroom home in Paradise Island Estates, room by room, in the listing&rsquo;s own photographs.</p>
            </div>
            <div className="film-head">
              <span>5 Bayview Drive <span className="muted">Paradise Island Estates</span></span>
              <a className="link num" href={condo.page}>{condo.price}</a>
            </div>
            <div className="chapters">
              {FILM.map((f, i) => i === 0 ? null : (
                <div key={i} className="chapter" data-win={`c${i}`}>
                  <p className="line">{f.line}</p>
                  <p className="note">{f.note}</p>
                </div>
              ))}
            </div>
            <div className="strip-film" aria-label="Photographs of 5 Bayview Drive" tabIndex={0}>
              {FILM.map((f, i) => (
                <figure key={i}>
                  <img src={f.photo.src} alt={f.photo.alt} width={800} height={1000} loading="lazy" decoding="async" />
                  <figcaption>{f.line}</figcaption>
                </figure>
              ))}
            </div>
            <div style={{ padding: '48px 0 112px' }} data-win={`c${filmDone - 1}`}>
              <p className="muted num">{condo.facts.join('  ·  ')}</p>
              <div className="actions" style={{ marginTop: 24 }}>
                <a className="btn btn-primary" href={condo.page}>See all of 5 Bayview Drive</a>
                <a className="link" href={mailto(`Viewing request: 5 Bayview Drive (#${condo.id})`, `Hello Bahamas Choice,\n\nI would like to view 5 Bayview Drive, Paradise Island Estates (listing #${condo.id}).\n\nName:\nPhone:\nWhen suits me:\n`)}>Ask for a viewing</a>
              </div>
            </div>
          </section>

          <Listings filter={filter} setFilter={setFilter} setHover={setHover} />

          <Islands onPick={island => setBrief(b => ({ mode: 'Buy', island, n: b.n + 1 }))} />

          <section id="selling" className="section" data-win="harbour" aria-labelledby="selling-h">
            <figure className="inline-photo framed" style={{ margin: '0 0 32px' }}>
              <img src={PHOTO.harbour.src} alt={PHOTO.harbour.alt} width={PHOTO.harbour.w} height={PHOTO.harbour.h} loading="lazy" />
            </figure>
            <h2 id="selling-h" className="h2">Selling a family property from&nbsp;abroad.</h2>
            <blockquote style={{ margin: '40px 0 0' }}>
              <p className="quote">&ldquo;Mrs. Basalyga sold the property within 4 months at the height of the pandemic, without Mom being present in the Bahamas.&rdquo;</p>
              <p className="quote-by">Jennifer Brice, on her mother&rsquo;s property</p>
            </blockquote>
            <blockquote style={{ margin: '48px 0 0' }}>
              <p className="body">&ldquo;Your office was also excellent in keeping us informed, regularly checking in and providing updates on the progress of the sale.&rdquo;</p>
              <p className="quote-by">A family who sold their family property with Bahamas Choice</p>
            </blockquote>
            <div className="actions">
              <a className="btn btn-primary" href="#brief" onClick={() => setBrief(b => ({ mode: 'Sell', island: '', n: b.n + 1 }))}>Tell us about the property</a>
            </div>
          </section>

          <section id="team" className="section" data-win="team" aria-labelledby="team-h">
            <figure className="inline-photo framed" style={{ margin: '0 0 32px' }}>
              <img src={PHOTO.team.src} alt={PHOTO.team.alt} width={PHOTO.team.w} height={PHOTO.team.h} loading="lazy" />
            </figure>
            <h2 id="team-h" className="h2">Call the person, not a switchboard.</h2>
            <p className="body muted" style={{ marginTop: 24 }}>&ldquo;Our trademarks are listening and end-to-end service,&rdquo; from the first listing you see to the viewing, the closing and beyond.</p>
            <ul className="team">
              {TEAM.map(t => (
                <li key={t.name}>
                  <p className="who">{t.name}{t.role && <span>{t.role}</span>}</p>
                  <a className="num" href={`tel:${t.tel}`} aria-label={`Call ${t.name}, ${t.phone}`}>{t.phone}</a>
                </li>
              ))}
            </ul>
          </section>

          <section id="brief" className="section" data-win="c1" aria-labelledby="brief-h">
            <h2 id="brief-h" className="h2">Send your brief.</h2>
            <p className="body muted" style={{ marginTop: 24 }}>Tell us what you are looking for, or what you are selling. It goes straight to the office at {OFFICE.email}, and one of the team replies personally.</p>
            <Brief key={brief.n} initialMode={brief.mode} initialIsland={brief.island} />
          </section>

          <div data-win="c1"><Footer /></div>
        </div>
      </div>
      <Strip />
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
