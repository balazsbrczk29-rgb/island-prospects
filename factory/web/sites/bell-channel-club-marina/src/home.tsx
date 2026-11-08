import { Layout, Photo, mount, PHONE, TEL, FAX } from './layout';
import { IMG } from './images';
import { TwoWaters } from './TwoWaters';
import { DayScrub } from './DayScrub';
import { Strip } from './Strip';

function Opening() {
  return (
    <>
      <Photo img={IMG.marinaPano} className="spread" priority captionClass="wrap" />
      <section className="wrap opener" aria-labelledby="h1">
        <p className="sc kicker" style={{ margin: 0 }}>Residences and a private marina, Freeport</p>
        <h1 id="h1" className="h1 h1--cover">A quiet club between two waters</h1>
        <div className="opener__deck">
        <p className="stand">Bell Channel Club &amp; Marina is a gated community of condominiums and townhouses in Lucaya, with the canal on one side, the beach on the other, and a private dock for its owners. From the units you look across the inlet into Port Lucaya.</p>
        <div className="byline sc">
          <span>Bell Channel, Lucaya, Grand Bahama</span>
          <span>By telephone: <a href={TEL}>{PHONE}</a></span>
        </div>
        </div>
      </section>
    </>
  );
}

function Article() {
  return (
    <section className="paper" aria-labelledby="article-h">
      <div className="wrap article">
        <p className="runhead sc"><span>Bell Channel Club &amp; Marina</span><span>Lucaya, Grand Bahama</span></p>
        <div>
          <h2 id="article-h" className="subdeck">Two kinds of water, one gate, and a dock kept for the people who live here.</h2>
          <div className="cols">
            <p>There are two kinds of water at Bell Channel Club. On one side runs the canal, still and sheltered, where owners keep their boats at the club’s private dock. On the other is the beach, which the homeowners’ association looks after. Between them stand the condominiums and townhouses, behind a gate, in a quiet corner of Lucaya.</p>
            <p>Look out from the units and you see the inlet: the stretch of water that carries boats in from the ocean to Port Lucaya and its Marketplace. Boats come and go below, and the club is a quiet place to watch them from.</p>
            <p>The club keeps the things that make a second home easy. A heated pool. Tennis courts. A library for owners. A limited number of storage garages. And reverse osmosis water for every unit, which on an island counts for more than it sounds. Pets are welcome.</p>
            <p>The marina is for owners first. Visiting boats can ask, and the office will tell you whether a slip is free. The same goes for anyone thinking of buying or renting here: the quickest answer is a phone call to the club office.</p>
          </div>
        </div>
        <aside className="particulars" aria-labelledby="part-h">
          <h2 id="part-h">The particulars</h2>
          <dl>
            <dt>Where</dt><dd>Bell Channel, Lucaya, Freeport, Grand Bahama</dd>
            <dt>What</dt><dd>Gated condominiums and townhouses on the canal and the beach</dd>
            <dt>The marina</dt><dd>Private, for owners. Other boats if a slip is available.</dd>
            <dt>Fax</dt><dd>{FAX}</dd>
            <dt>Post</dt><dd>P.O. Box F-44053, Freeport</dd>
          </dl>
          <a className="call" href={TEL}><span className="sc">Call the club office</span><b>{PHONE}</b></a>
        </aside>
      </div>
    </section>
  );
}

function Sentence() {
  return (
    <section className="sentence" aria-label="The canal on one side, the beach on the other">
      <div className="wrap"><p>The canal on one side. <em className="it">The beach on the other.</em></p></div>
    </section>
  );
}

function Essay() {
  return (
    <section className="essay" aria-labelledby="essay-h">
      <div className="wrap">
        <div className="essay__head">
          <h2 id="essay-h">Around the inlet</h2>
          <p style={{ margin: 0, color: '#B9B4A8', maxWidth: '44ch' }}>Lucaya, seen from the water and the air. Photographs of the neighbourhood the club looks out on, until the club’s own album takes their place.</p>
        </div>
      </div>
      <Strip imgs={[IMG.marketplace, IMG.steps, IMG.dockline, IMG.brass, IMG.bank, IMG.marinaPano2]} />
    </section>
  );
}

function InThisIssue() {
  return (
    <section className="issue" aria-labelledby="issue-h">
      <div className="wrap">
        <h2 id="issue-h" className="sc kicker" style={{ margin: '0 0 28px' }}>Also in these pages</h2>
        <div className="issue__grid">
          <a href="marina.html">
            <img src={IMG.inlet.src} alt={IMG.inlet.alt} data-source="generated" loading="lazy" width={IMG.inlet.w} height={IMG.inlet.h} style={{ aspectRatio: '3 / 2' }} />
            <h3>The marina: a private dock, kept for owners</h3>
            <p>What to know before you bring a boat in, whether you own, visit an owner or are passing through.</p>
          </a>
          <a href="club.html" className="issue__b">
            <img src={IMG.pool.src} alt={IMG.pool.alt} data-source="generated" loading="lazy" width={IMG.pool.w} height={IMG.pool.h} style={{ aspectRatio: '4 / 5' }} />
            <h3>The club: residences and grounds</h3>
            <p>The pool, the courts, the library and the beach, and how to ask about owning or renting here.</p>
          </a>
        </div>
      </div>
    </section>
  );
}

mount(
  <Layout page="index">
    <Opening />
    <Article />
    <Sentence />
    <TwoWaters />
    <DayScrub />
    <Essay />
    <Photo img={IMG.orbit} className="bleed" />
    <InThisIssue />
  </Layout>
);
