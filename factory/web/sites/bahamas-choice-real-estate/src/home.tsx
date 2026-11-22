import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DEVELOPMENTS, FILM, ISLANDS, LISTINGS, OFFICE, PHOTO, TEAM, short } from './data';
import { Footer, Mast, Strip, Window, mailto, useActiveWindow, useLenis, type Layer } from './site';
import { Brief, type Mode as BriefMode } from './brief';
import { Chart, Finder, ListingCard, START, bandLabel, kindLabel, type Search } from './finder';

type BriefSeed = { mode: BriefMode; island: string; type?: string; budget?: string; note?: string; n: number };
const KIND_TO_BRIEF: Record<string, Record<string, string>> = {
  Buy: { home: 'A home', land: 'Land', commercial: 'Commercial property' },
  Rent: { home: 'A home', commercial: 'Commercial space' },
};

type Filter = 'All' | 'For sale' | 'To rent' | 'Land';

function AllListings({ setHover }: { setHover: (k: string | null) => void }) {
  const [filter, setFilter] = useState<Filter>('All');
  const [view, setView] = useState<'Grid' | 'List'>('Grid');
  const shown = LISTINGS.filter(l => filter === 'All' || (filter === 'Land' ? l.kind === 'Land' : l.status === filter));
  const grid = shown.filter(l => l.page);
  return (
    <section id="listings" className="section" data-win="villa" aria-labelledby="listings-h">
      <h2 id="listings-h" className="h2">Four listings today, and the latest&nbsp;sale.</h2>
      <p className="body muted" style={{ marginTop: 24 }}>Straight from the Bahamas MLS. Each one opens with its photographs, its facts and a viewing request.</p>
      <div className="bar">
        <div className="filters" role="group" aria-label="Filter listings">
          {(['All', 'For sale', 'To rent', 'Land'] as Filter[]).map(f => (
            <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="seg small" role="group" aria-label="View">
          {(['Grid', 'List'] as const).map(v => <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>{v}</button>)}
        </div>
      </div>
      {view === 'Grid' ? (
        <div className="grid2" onMouseLeave={() => setHover(null)}>
          {grid.map(l => <ListingCard key={l.id} l={l} onHover={setHover} wide />)}
          {filter === 'All' && <p className="sold-note num">Recently sold: 76 Lumumba Road, Nassau, 3 bed, 2 bath, listed at $315,000.</p>}
        </div>
      ) : (
        <ul className="rows" onMouseLeave={() => setHover(null)}>
          {shown.map(l => {
            const inner = (
              <>
                {l.photos[0] ? <img src={l.photos[0].src} alt={l.photos[0].alt} width={88} height={110} loading="lazy" decoding="async" /> : <span className="noimg">Sold</span>}
                <div>
                  <h3>{l.title}</h3>
                  <p className="where">{l.area}, {short(l.island)} <span aria-hidden="true">{'·'}</span> {l.status === 'Sold' ? 'Sold' : l.facts.slice(0, 2).join(', ')}</p>
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
      )}
    </section>
  );
}

function Islands({ onShow, onBrief }: { onShow: (island: string) => void; onBrief: (island: string, note?: string) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const count = (n: string) => LISTINGS.filter(l => l.status !== 'Sold' && l.island === n).length;
  return (
    <section id="islands" className="section" data-win="sunset" aria-labelledby="islands-h">
      <h2 id="islands-h" className="h2">Sixteen island groups, and the developments we&nbsp;present.</h2>
      <p className="body muted" style={{ marginTop: 24 }}>The areas we present on each island, from Lyford Cay to Stella Maris. Whichever you choose, the same office on Yamacraw Hill Road answers.</p>
      <ul className="islands">
        {ISLANDS.map(is => {
          const n = count(is.name);
          return (
            <li key={is.name}>
              <button type="button" aria-expanded={open === is.name} onClick={() => setOpen(open === is.name ? null : is.name)}>
                <span>{is.name}{n > 0 && <span className="num isl-n"> {n}</span>}</span><span aria-hidden="true">{open === is.name ? '−' : '+'}</span>
              </button>
              {open === is.name && (
                <div className="places">
                  {is.places.length ? is.places.join(', ') + '.' : 'Ask us about property here.'}
                  <span className="place-links">
                    {n > 0 && <a href="#top" className="link" onClick={() => onShow(is.name)}>Show {n === 1 ? 'the listing' : `the ${n} listings`}</a>}
                    <a href="#brief" className="link" onClick={() => onBrief(is.name)}>Start a brief for {short(is.name)}</a>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <h3 className="h3" style={{ marginTop: 72 }}>Developments</h3>
      <ul className="devs">
        {DEVELOPMENTS.map(d => (
          <li key={d}><a href="#brief" onClick={() => onBrief('', `I would like to hear about ${d}.`)}>{d}</a></li>
        ))}
      </ul>
    </section>
  );
}

const STEPS = [
  ['Listen', 'You tell us what you want, or what you are selling. A brief, a call or a message, from wherever you live.'],
  ['Find and view', 'We find the listings that fit your brief, on whichever island, and arrange the viewings.'],
  ['Offer to closing', 'From your offer to the closing, we keep you informed as the sale moves, with regular updates.'],
  ['Beyond the keys', 'When you ask, we connect you with appraisers, surveyors, inspectors, contractors, landscapers and home decor firms.'],
];

function EndToEnd({ onBrief }: { onBrief: () => void }) {
  return (
    <section id="process" className="section field" data-win="harbour" aria-labelledby="process-h">
      <figure className="inline-photo framed" style={{ margin: '0 0 32px' }}>
        <img src={PHOTO.harbour.src} alt={PHOTO.harbour.alt} width={PHOTO.harbour.w} height={PHOTO.harbour.h} loading="lazy" />
      </figure>
      <h2 id="process-h" className="h2">From the first viewing to the keys, and&nbsp;after.</h2>
      <p className="body muted" style={{ marginTop: 24 }}>&ldquo;Our trademarks are listening and end-to-end service.&rdquo; Here is what that means, step by step.</p>
      <ol className="steps">
        {STEPS.map(([t, d], i) => (
          <li key={t}><span className="num step-n">{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>
        ))}
      </ol>
      <div className="onrequest">
        <h3 className="h3">On request, wherever you are moving from</h3>
        <p className="body">Banking and legal information, government requirements, and help with moving and relocation.</p>
      </div>
      <div className="actions"><button type="button" className="btn btn-primary" onClick={onBrief}>Send your brief</button></div>
    </section>
  );
}

function Home() {
  useLenis();
  const { active, setHover } = useActiveWindow('chart');
  const [search, setSearch] = useState<Search>(START);
  const [brief, setBrief] = useState<BriefSeed>({ mode: 'Buy', island: '', n: 0 });
  const condo = LISTINGS[0];
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const layers: Layer[] = useMemo(() => [
    { key: 'chart', node: <div className="chart-wrap"><p className="chart-cap">Tap an island to see what is listed there. Outlines: Natural Earth.</p><Chart search={search} onIsland={n => setSearch(s => ({ ...s, island: s.island === n ? 'any' : n }))} /></div> },
    ...LISTINGS.filter(l => l.photos.length).map(l => ({ key: `l${l.id}`, photo: l.photos[0], mode: (l.photos[0].h < 700 ? 'framed' : 'cover') as Layer['mode'], caption: l.photos[0].h < 700 ? `${l.title}, ${l.area}` : undefined })),
    { key: 'villa', photo: PHOTO.villa, pos: '58% 50%' },
    ...FILM.map((f, i) => ({ key: `c${i}`, photo: f.photo })),
    { key: 'sunset', photo: PHOTO.sunset, pos: '50% 50%' },
    { key: 'harbour', photo: PHOTO.harbour, mode: 'framed', caption: 'Harbour Island, Eleuthera' },
    { key: 'team', photo: PHOTO.team, mode: 'framed', caption: 'Lana Munnings-Basalyga and the team' },
    { key: 'villa2', photo: PHOTO.villa, pos: '30% 50%' },
  ], [search]);

  const sendSearch = () => {
    const mode = search.mode as BriefMode;
    const type = search.kind === 'any' ? undefined : KIND_TO_BRIEF[mode][search.kind];
    const bits = [search.mode === 'Buy' ? 'to buy' : 'to rent', kindLabel(search).toLowerCase() || 'property', search.island === 'any' ? 'on any island' : `on ${search.island}`, bandLabel(search).toLowerCase()].filter(Boolean);
    setBrief(b => ({ mode, island: search.island === 'any' ? '' : search.island, type, budget: bandLabel(search), note: `Searching ${bits.join(' ')}.`, n: b.n + 1 }));
    go('brief');
  };
  const briefFor = (island: string, note?: string) => setBrief(b => ({ mode: 'Buy', island, note, n: b.n + 1 }));

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="split" id="top">
        <Window layers={layers} active={active} />
        <div className="column">
          <header className="hero" data-win="chart">
            <Mast />
            <nav aria-label="Sections">
              <ul className="navlist sc">
                <li><a href="#listings">Listings</a></li>
                <li><a href="#islands">Islands</a></li>
                <li><a href="#process">End to end</a></li>
                <li><a href="#team">The team</a></li>
                <li><a href="#brief">Your brief</a></li>
              </ul>
            </nav>
            <div className="hero-body" id="main">
              <h1>Find your place on any island. One family office&nbsp;answers.</h1>
              <Finder search={search} setSearch={setSearch} onHover={setHover} onSendSearch={sendSearch} />
            </div>
          </header>

          <AllListings setHover={setHover} />

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
                  <img src={f.photo.src} alt={f.photo.alt} width={800} height={1066} loading="lazy" decoding="async" />
                  <figcaption>{f.line}</figcaption>
                </figure>
              ))}
            </div>
            <div style={{ padding: '48px 0 112px' }} data-win={`c${FILM.length - 1}`}>
              <p className="muted num">{condo.facts.join('  ·  ')}</p>
              <div className="actions" style={{ marginTop: 24 }}>
                <a className="btn btn-primary" href={mailto(`Viewing request: 5 Bayview Drive (#${condo.id})`, `Hello Bahamas Choice,\n\nI would like to view 5 Bayview Drive, Paradise Island Estates (listing #${condo.id}).\n\nName:\nPhone:\nWhen suits me:\n`)}>Ask for a viewing</a>
                <a className="link" href={condo.page}>All of 5 Bayview Drive</a>
              </div>
            </div>
          </section>

          <Islands onShow={island => { setSearch({ ...START, island }); }} onBrief={briefFor} />

          <EndToEnd onBrief={() => { setBrief(b => ({ mode: 'Buy', island: '', n: b.n + 1 })); go('brief'); }} />

          <section id="team" className="section" data-win="team" aria-labelledby="team-h">
            <figure className="inline-photo framed" style={{ margin: '0 0 32px' }}>
              <img src={PHOTO.team.src} alt={PHOTO.team.alt} width={PHOTO.team.w} height={PHOTO.team.h} loading="lazy" />
            </figure>
            <h2 id="team-h" className="h2">Call the person, not a switchboard.</h2>
            <p className="body muted" style={{ marginTop: 24 }}>Four people, each on their own line. Viewings, sales and questions all reach a name you can call back.</p>
            <ul className="team">
              {TEAM.map(t => (
                <li key={t.name}>
                  <p className="who">{t.name}{t.role && <span>{t.role}</span>}{t.email && <a className="mail" href={`mailto:${t.email}`}>{t.email}</a>}</p>
                  <a className="num tel" href={`tel:${t.tel}`} aria-label={`Call ${t.name}, ${t.phone}`}>{t.phone}</a>
                </li>
              ))}
            </ul>
          </section>

          <section id="words" className="section" data-win="villa2" aria-labelledby="words-h">
            <h2 id="words-h" className="sr-only">In our clients&rsquo; words</h2>
            <blockquote style={{ margin: 0 }}>
              <p className="quote">&ldquo;Mrs. Basalyga sold the property within 4 months at the height of the pandemic, without Mom being present in the Bahamas.&rdquo;</p>
              <p className="quote-by">Jennifer Brice, on her mother&rsquo;s property</p>
            </blockquote>
            <blockquote style={{ margin: '48px 0 0' }}>
              <p className="body">&ldquo;Your office was also excellent in keeping us informed, regularly checking in and providing updates on the progress of the sale.&rdquo;</p>
              <p className="quote-by">A family who sold their family property with Bahamas Choice</p>
            </blockquote>
          </section>

          <section id="brief" className="section" data-win="villa2" aria-labelledby="brief-h">
            <h2 id="brief-h" className="h2">Send your brief.</h2>
            <p className="body muted" style={{ marginTop: 24 }}>Tell us what you are looking for, or what you are selling. It goes straight to {OFFICE.email}, and one of the team replies personally. Or call the office on <a className="link num" href={`tel:${OFFICE.tel}`}>{OFFICE.phone}</a>.</p>
            <Brief key={brief.n} initialMode={brief.mode} initialIsland={brief.island} initialType={brief.type} initialBudget={brief.budget} initialNote={brief.note} />
          </section>

          <div data-win="villa2"><Footer /></div>
        </div>
      </div>
      <Strip />
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
