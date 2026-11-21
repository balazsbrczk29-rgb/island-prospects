import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Facts from bluffhouse.com (home, /room-type-and-rates, /marina, /a-little-history), checked 2026-11-05 and 2026-11-21.
const W = 'https://static.wixstatic.com/media/';
const img = (id: string, w: number, h: number, alt: string) => ({ src: W + id, w, h, alt });
const PH = {
  bluff: img('5c5976_17ae16c3cdb94ff08128144740eb6b00f000.jpg', 1920, 1080, 'Bluff House suites stepping down the bluff to the Sea of Abaco, palms below'),
  upperBalcony: img('5c5976_4d430b71b1694947902404f615c7b9f8~mv2.jpg', 2500, 1667, 'An upper suite balcony with two Adirondack chairs over the Sea of Abaco'),
  upperRoom: img('5c5976_6b9dd005f8f243c8af937a9b727d5914~mv2.jpg', 2500, 1667, 'An upper king suite with a vaulted ceiling and French doors to the balcony'),
  lowerPorch: img('5c5976_77c8eb03fd5a483e8052b2b833d2edff~mv2.jpg', 2500, 1667, 'A lower suite porch opening onto the water through sea grape'),
  lowerRoom: img('5c5976_ebd836a292384a7193593c0c11727400~mv2.jpg', 2500, 1667, 'A lower queen suite with a white bed and a sitting area'),
  boathouse: img('5c5976_0a65c2bd573346e78cf9d2b617f7ba83~mv2.jpg', 2875, 2032, 'The Boathouse Bar and Restaurant, a yellow building with a harbourside deck'),
  beachbar: img('5c5976_8fdda870133a479eb566d3b5331ea44f~mv2.png', 1024, 777, 'The Tranquil Turtle Beach Bar deck with blue umbrellas and a signpost'),
  marina: img('5c5976_89c8828c6a3443d9a742a1cd5670bab8~mv2.jpg', 1024, 576, 'Boats at the Bluff House marina docks in White Sound'),
};
const BOOK = 'https://us2.cloudbeds.com/reservation/McFW6d';
const DOCKWA = 'https://dockwa.com/explore/destination/wgcegn-bluff-house-resort-and-marina';
const TOURS = { upper: [['Upper king', 'Amf488kFa2y'], ['Upper two queens', 'WkKaQ8ARQGa']], lower: [['Lower queen', 'UA8BiUn1Y3d'], ['Lower two queens', 'PQ7XoL7eokU']] };

type Level = 'upper' | 'lower';
// Published seasons and nightly rates (upper / lower). Closed 3 September to 31 October.
function season(d: Date): { name: string; upper: number; lower: number; from: boolean } | null {
  const m = d.getMonth() + 1, day = d.getDate(), md = m * 100 + day;
  if (md >= 1218 || md <= 107) return { name: 'Christmas season, 18 December to 7 January', upper: 370, lower: 320, from: false };
  if (md <= 228 || (m === 2)) return { name: 'Winter season, 8 January to 28 February', upper: 290, lower: 240, from: true };
  if (md <= 531) return { name: 'Spring season, 1 March to 31 May', upper: 370, lower: 320, from: false };
  if (md <= 807) return { name: 'Summer season, 1 June to 7 August', upper: 390, lower: 350, from: false };
  if (md <= 902) return { name: 'End of season, 8 August to 2 September', upper: 290, lower: 240, from: true };
  if (md <= 1031) return null;
  return { name: 'Fall season, to 17 December', upper: 290, lower: 240, from: true };
}

function Chooser() {
  const [level, setLevel] = useState<Level>('upper');
  const [date, setDate] = useState(() => { const d = new Date(); d.setMonth(d.getMonth() + 2, 15); return d.toISOString().slice(0, 10); });
  const s = season(new Date(date + 'T12:00:00'));
  const v = level === 'upper' ? [PH.upperBalcony, PH.upperRoom] : [PH.lowerPorch, PH.lowerRoom];
  return (
    <section className="suites wrap" id="suites" aria-labelledby="su-h">
      <h2 id="su-h">Upstairs for the long view, downstairs for the water at your&nbsp;door.</h2>
      <div className="chooser">
        <div className="views">
          {v.map(p => <img key={p.src} src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />)}
        </div>
        <div className="pick">
          <div className="seg" role="group" aria-label="Suite level">
            <button type="button" aria-pressed={level === 'upper'} onClick={() => setLevel('upper')}>Upper level</button>
            <button type="button" aria-pressed={level === 'lower'} onClick={() => setLevel('lower')}>Lower level</button>
          </div>
          <p style={{ marginTop: 16 }}>{level === 'upper'
            ? 'Perched above the shoreline with sweeping views of the Sea of Abaco: a king or two queens, a mini fridge and a coffee maker.'
            : 'A king or two queens, with the Sea of Abaco right from your doorstep: up close and waterfront.'}</p>
          <label htmlFor="arrive">Arriving</label>
          <input id="arrive" type="date" value={date} onChange={e => setDate(e.target.value)} />
          <div aria-live="polite">
            {s ? (
              <>
                <p className="price num">{s.from ? <small>from </small> : null}${level === 'upper' ? s.upper : s.lower}<small> a night</small></p>
                <p className="season">{s.name}</p>
              </>
            ) : (
              <p className="price" style={{ fontSize: 'var(--t-xl)' }}>Closed for the season, 3 September to 31 October.</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 24 }}>
            <a className="btn" href={BOOK} rel="noopener">Check dates and book</a>
          </div>
          <p className="tours">Walk the room in 3D: {TOURS[level].map(([l, id]) => <a key={id} className="tlink" href={`https://my.matterport.com/show/?m=${id}`} rel="noopener">{l}</a>)}</p>
          <p className="note">A 6% BOIPB levy and 6% service charge plus 10% VAT are added. Rates subject to change.</p>
        </div>
      </div>
      <p style={{ marginTop: 48, maxWidth: '60ch' }}>Or a house of your own: nine private cottages and villas, from Summerset, La Conchita and Turtle Bluff Villa to Pineapple House, Sweet Guava, Blue Bay, Dove Cottage, Coral Haven and Sunset Cottage&nbsp;4. <a className="tlink" href="https://www.bluffhouse.com/private-cottages" rel="noopener">See the cottages</a></p>
    </section>
  );
}

function Strip() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let past = false, over = false;
    const upd = () => setShow(past && !over);
    const onS = () => { const p = scrollY > innerHeight * 0.9; if (p !== past) { past = p; upd(); } };
    const io = new IntersectionObserver(es => { over = es.some(e => e.isIntersecting); upd(); });
    const c = document.querySelector('.colophon'); if (c) io.observe(c);
    addEventListener('scroll', onS, { passive: true });
    return () => { removeEventListener('scroll', onS); io.disconnect(); };
  }, []);
  return (
    <div className={`strip ${show ? 'show' : ''}`} aria-hidden={!show}>
      <a className="call num" href="tel:+12428249550" tabIndex={show ? 0 : -1}>Call the resort</a>
      <a className="go" href={BOOK} rel="noopener" tabIndex={show ? 0 : -1}>Book a suite</a>
    </div>
  );
}

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="wrap">
        <div className="mast">
          <p className="dateline">Green Turtle Cay, Abaco, The Bahamas</p>
          <a className="title" href="index.html">Bluff House</a>
          <p className="right"><a href={BOOK} rel="noopener">Book now</a></p>
        </div>
        <nav className="navrow" aria-label="Sections">
          <a href="#story">The story</a><a href="#suites">Suites</a><a href="#eat">Eat and drink</a><a href="#marina">Marina</a><a href="#contact">Contact</a>
        </nav>
      </header>
      <main id="main">
        <figure className="lead-photo">
          <img src={PH.bluff.src} alt={PH.bluff.alt} width={PH.bluff.w} height={PH.bluff.h} fetchPriority="high" />
        </figure>
        <div className="head wrap">
          <h1>The first resort in the Out Islands is still on its&nbsp;bluff.</h1>
          <div className="head-side">
          <p className="standfirst">Twelve acres of palms and pines from White Sound to the Sea of Abaco, the only private beach on Green Turtle Cay, a forty-slip marina, and eight suites with a balcony over the&nbsp;water.</p>
          <div className="actions">
            <a className="btn" href="#suites">Choose your suite</a>
            <span className="num">Upper and lower suites, from $240 a night</span>
            <a className="tlink num" href="tel:+12428249550">+1 242 824 9550</a>
          </div>
          </div>
        </div>

        <section className="article wrap" id="story" aria-label="The story">
          <div className="cols">
            <p>In the early 1950s Bluff House was the private home of Pearce and Kitty Coady, who opened their door to the boaters who found their way into White Sound. It became the first resort in the Bahamas&rsquo; Out Islands, and it is now the oldest.</p>
            <p>The Davies family kept it from 1978 to 1986, Martin Havill until 1995, then Roger and Susan Phillips until 2011, when investors led by Ian Phillips took it on.</p>
            <p>In December 2025 it passed to VIP Marinas Group, led by Austin and Jenny Cameron with Felecia and Dan Ongley: their first property in The Bahamas.</p>
            <p>What has not moved: sunset and moonrise from the balcony, the beach a few steps from the suite door, and a dockmaster who meets your boat.</p>
          </div>
          <aside className="factsbox" aria-label="Bluff House at a glance">
            <h2>At a glance</h2>
            <dl>
              <div><dt>Book a suite or cottage</dt><dd><a className="tlink" href={BOOK} rel="noopener">Check dates online</a></dd></div>
              <div><dt>Resort, local and WhatsApp</dt><dd className="num"><a href="tel:+12428249550">+1 242 824 9550</a></dd></div>
              <div><dt>Office in the US</dt><dd className="num"><a href="tel:+19542847341">+1 954 284 7341</a></dd></div>
              <div><dt>Restaurants</dt><dd className="num"><a href="tel:+12428217267">+1 242 821 7267</a></dd></div>
              <div><dt>Email</dt><dd><a href="mailto:frontdesk@bluffhouse.com">frontdesk@bluffhouse.com</a></dd></div>
              <div><dt>Season</dt><dd>Closed 3 September to 31 October</dd></div>
            </dl>
          </aside>
        </section>

        <section className="pull" aria-label="From Bluff House">
          <blockquote>The Tranquil Turtle: number six of the Top 25 Beach Bars in the&nbsp;Caribbean.</blockquote>
          <p><a className="tlink" href="https://www.caribjournal.com/2024/01/04/best-beach-bars-in-the-caribbean-2024/6/" rel="noopener">Caribbean Journal, 2024</a></p>
        </section>

        <Chooser />

        <section className="essay wrap" id="eat" aria-label="Eat and drink">
          <figure className="e1">
            <img src={PH.boathouse.src} alt={PH.boathouse.alt} width={PH.boathouse.w} height={PH.boathouse.h} loading="lazy" decoding="async" />
            <figcaption><strong>The Boathouse Bar &amp; Restaurant</strong>Breakfast and dinner six days a week, on the harbourside deck or in the air-conditioned room with water&nbsp;views.</figcaption>
          </figure>
          <figure className="e2">
            <img src={PH.beachbar.src} alt={PH.beachbar.alt} width={PH.beachbar.w} height={PH.beachbar.h} loading="lazy" decoding="async" />
            <figcaption><strong>The Tranquil Turtle</strong>The beach bar beside the private beach and dock on the Sea of Abaco: swim, play volleyball, kayak, and eat island food on the patio deck.</figcaption>
          </figure>
        </section>

        <section className="marina wrap" id="marina" aria-labelledby="ma-h">
          <div className="ma-top">
            <div>
              <h2 id="ma-h">Forty slips in White Sound.</h2>
              <p style={{ marginTop: 24, maxWidth: '40ch' }}>From the Sea of Abaco a dredged channel leads into White Sound. Every boat gets its own dock space and finger pier, and the dockmaster meets you.</p>
              <div style={{ marginTop: 32 }}><a className="btn" href={DOCKWA} rel="noopener">Reserve a slip on Dockwa</a></div>
            </div>
            <img src={PH.marina.src} alt={PH.marina.alt} width={PH.marina.w} height={PH.marina.h} loading="lazy" decoding="async" />
          </div>
          <ul>
            <li><span>Channel</span>7 ft at mean low water</li>
            <li><span>Slips</span>40, each with its own finger pier</li>
            <li><span>Shore power</span>50 and 100 amp</li>
            <li><span>At every slip</span>Power, water and free wifi</li>
            <li><span>Decking</span>More than 12,000 sq ft</li>
            <li><span>Ashore</span>Showers and laundry</li>
            <li><span>Arriving</span>The dockmaster meets and assists</li>
            <li><span>Ferry</span>Pick-up and drop-off at the dock</li>
            <li><span>Getting around</span>Help renting a golf cart</li>
          </ul>
        </section>
      </main>

      <footer className="colophon" id="contact">
        <div>
          <h2>Bluff House Beach Resort &amp; Marina</h2>
          <p style={{ marginTop: 16 }}>White Sound, Green Turtle Cay, Abaco, The Bahamas</p>
          <div style={{ marginTop: 32 }}><a className="btn" href={BOOK} rel="noopener">Book your stay</a></div>
        </div>
        <div>
          <p className="num"><a href="tel:+12428249550">+1 242 824 9550</a> resort and WhatsApp<br /><a href="tel:+19542847341">+1 954 284 7341</a> US office<br /><a href="mailto:frontdesk@bluffhouse.com">frontdesk@bluffhouse.com</a></p>
          <p style={{ marginTop: 16 }}><a href="https://www.bluffhouse.com/wedding" rel="noopener">Weddings</a> &middot; <a href="https://www.instagram.com/bluffhousebeachresort/" rel="noopener">Instagram</a> &middot; <a href="https://www.facebook.com/bluffhousebeach" rel="noopener">Facebook</a></p>
          <p className="small">Concept preview by ESTATIQ AI Solutions. Photographs from bluffhouse.com.</p>
        </div>
      </footer>
      <Strip />
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
