import { useState } from 'react';
import { Layout, Photo, mount, PHONE, TEL } from './layout';
import { IMG, type Img } from './images';

// Interaction 3: the club's real amenities as an index; choosing one brings up its photograph.
const AMEN: { name: string; note: string; img: Img }[] = [
  { name: 'The beach', note: 'Maintained by the association', img: IMG.beach },
  { name: 'The pool', note: 'Heated', img: IMG.pool },
  { name: 'Tennis courts', note: 'On the grounds', img: IMG.tennis },
  { name: 'The owners’ library', note: 'Books, shade, quiet', img: IMG.library },
  { name: 'The private marina', note: 'For owners, if available', img: IMG.dockline },
  { name: 'Storage garages', note: 'A limited number', img: IMG.canal },
];

function Amenities() {
  const [a, setA] = useState(0);
  return (
    <section className="paper" aria-labelledby="amen-h">
      <div className="wrap amen">
        <div>
          <p className="sc" style={{ margin: 0, color: '#5A6573' }}>What the club keeps</p>
          <h2 id="amen-h" className="disp" style={{ fontSize: 'clamp(34px,4.2vw,60px)', lineHeight: 1.02, margin: '10px 0 28px' }}>The grounds, in order of the day</h2>
          <ul>
            {AMEN.map((x, i) => (
              <li key={x.name}>
                <button type="button" aria-pressed={a === i} onClick={() => setA(i)} onMouseEnter={() => setA(i)} onFocus={() => setA(i)}>
                  <span className="disp">{x.name}</span><small>{x.note}</small>
                </button>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 24, fontSize: 16, color: '#1F2C3C' }}>Every unit runs on reverse osmosis water. Pets are allowed.</p>
        </div>
        <div className="amen__img">
          <div className="box">
            {AMEN.map((x, i) => <img key={x.name} src={x.img.src} alt={i === a ? x.img.alt : ''} aria-hidden={i !== a} data-source={x.img.source} loading="lazy" width={x.img.w} height={x.img.h} style={{ opacity: i === a ? 1 : 0 }} />)}
          </div>
          <p className="cap cap--paper"><span>{AMEN[a].img.caption}</span><span>{AMEN[a].img.credit}</span></p>
        </div>
      </div>
    </section>
  );
}

mount(
  <Layout page="club">
    <Photo img={IMG.beach} className="spread" priority captionClass="wrap" />
    <section className="wrap opener" aria-labelledby="h1">
      <p className="sc kicker" style={{ margin: 0 }}>Residences and grounds</p>
      <h1 id="h1" className="h1 h1--cover">Behind the gate, a slower Lucaya</h1>
      <p className="stand">Condominiums and townhouses on the canal and the beach, inside a gated community in a quiet part of Lucaya, with a beach the homeowners’ association looks after.</p>
      <div className="byline sc"><span>Residence and rental enquiries: <a href={TEL}>{PHONE}</a></span></div>
    </section>

    <Amenities />

    <section className="sentence" aria-label="Across the water, Port Lucaya">
      <div className="wrap"><p>Across the water, <em className="it">Port Lucaya.</em></p></div>
    </section>

    <section className="wrap chapter" aria-labelledby="own-h">
      <div><p className="sc kicker" style={{ margin: 0 }}>Owning or renting</p><h2 id="own-h">Ask the people who run it</h2></div>
      <div className="body">
        <p>If you are thinking of buying or renting at Bell Channel Club, ask the club office about the unit you have in mind: whether it is on the canal or the beach side, whether a storage garage comes with it, and how the private marina works for owners.</p>
        <p><a className="tel disp" href={TEL} style={{ fontSize: 'clamp(30px,3.6vw,48px)', color: '#D8B46A' }}>{PHONE}</a></p>
      </div>
    </section>

    <Photo img={IMG.marketplace} className="bleed" />
  </Layout>
);
