import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { Layout, mount } from './layout';
import { CAPS, OFFICES, PAY, ISLANDS, PHOTOS, CREDIT, EMAIL, PHONE, TEL } from './data';

const ease = [0.2, 0.75, 0.2, 1] as const;

function Swap({ src, alt, credit, gen }: { src: string; alt: string; credit: string; gen?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="swap">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img key={src} src={src} alt={alt} width={1600} height={1067} loading="lazy" data-source={gen ? 'generated' : 'commons'}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.55, ease }} />
      </AnimatePresence>
      <p className="swap-cap">{credit}</p>
    </div>
  );
}

function Home() {
  const [cap, setCap] = useState(0);
  const [openCap, setOpenCap] = useState<number | null>(0);
  const [office, setOffice] = useState(0);
  const [era, setEra] = useState(50);
  const [need, setNeed] = useState<string[]>(['Simple web pages']);
  const [status, setStatus] = useState('');
  const c = CAPS[cap];
  const o = OFFICES[office];

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = ['Hello BVG Design,', '', 'Website request (form BVG-1)'];
    f.forEach((v, k) => { const s = String(v).trim(); if (s && k !== 'need') lines.push(`${k}: ${s}`); });
    if (need.length) lines.push(`I need: ${need.join(', ')}`);
    lines.push('', '(sent from the website)');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Website request')}&body=${encodeURIComponent(lines.join('\n'))}`;
    setStatus(`Your email app opened with the request addressed to ${EMAIL}.`);
  }

  return (
    <Layout page="home">
      {/* A10 hero: the real place with a technical overlay */}
      <section className="hero" aria-labelledby="h1">
        <figure className="hero-fig">
          <img src={PHOTOS.harbour} alt="Lucayan Harbour, Freeport, Grand Bahama, with boats at their moorings" width={2000} height={1333} fetchPriority="high" data-source="commons" />
          <div className="overlay" aria-hidden="true">
            <span className="dim dim-h"><i /></span>
            <span className="dim dim-v"><i /></span>
            <span className="dim dim-h2"><i /></span>
            <span className="coord">26°32′N 78°42′W · Freeport</span>
          </div>
          <figcaption>{CREDIT.harbour}</figcaption>
        </figure>
        <div className="hero-type">
          <h1 id="h1"><span className="h1-small">Getting Bahamian businesses</span> <span className="h1-big">found<span className="measure" aria-hidden="true"><i /><em>17vw · fraunces 144</em></span></span> <span className="h1-small">online since 1996, from Freeport.</span></h1>
          <dl className="datablock">
            <div><dt>established</dt><dd>mid-1996</dd></div>
            <div><dt>headquarters</dt><dd>Freeport, Grand Bahama</dd></div>
            <div><dt>offices</dt><dd>Nassau · Abaco</dd></div>
            <div><dt>us line</dt><dd>Fort Lauderdale</dd></div>
            <div><dt>ownership</dt><dd>Bahamian</dd></div>
            <div><dt>work</dt><dd>design · hosting · domains · search · advertising</dd></div>
          </dl>
          <div className="hero-act">
            <a className="btn" href="#request">Start a website request</a>
            <a className="link" href={TEL}>Call Freeport {PHONE}</a>
          </div>
        </div>
      </section>

      {/* 1.0 capability matrix: hover swaps the photograph, click expands (M8) */}
      <section className="caps" id="capabilities" aria-labelledby="h-caps">
        <div className="caps-head">
          <p className="label">1.0 · capabilities</p>
          <h2 id="h-caps">What the studio does, and on what terms.</h2>
          <p className="lede">No account too small or too large. Every line below is how BVG describes its own work; rates not listed are quoted per project.</p>
        </div>
        <div className="caps-body">
          <LayoutGroup>
            <div className="matrix" role="table" aria-label="Capabilities">
              <div className="mx-row mx-head" role="row">
                <span role="columnheader">code</span><span role="columnheader">capability</span><span role="columnheader">what it is</span><span role="columnheader">time or terms</span>
              </div>
              {CAPS.map((k, i) => (
                <motion.div layout key={k.code} className={`mx-row${cap === i ? ' is-on' : ''}`} role="row" onMouseEnter={() => setCap(i)} onClick={() => setOpenCap(i)} transition={{ duration: 0.4, ease }}>
                  <span role="cell" className="mx-code">{k.code}</span>
                  <span role="cell" className="mx-name">
                    <button type="button" aria-expanded={openCap === i} onClick={() => { setCap(i); setOpenCap(openCap === i ? null : i); }} onFocus={() => setCap(i)}>{k.name}</button>
                  </span>
                  <span role="cell" className="mx-what">{k.what}</span>
                  <span role="cell" className="mx-terms">{k.terms}</span>
                  <AnimatePresence initial={false}>
                    {openCap === i && (
                      <motion.div key="more" className="mx-more" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease }}>
                        <p>{k.more}</p>
                        <figure><img src={k.img} alt={k.alt} width={1600} height={1067} loading="lazy" data-source="generated" /><figcaption>{k.code} · illustrative photograph</figcaption></figure>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </section>

      <section className="still" aria-label="Port Lucaya">
        <img src={PHOTOS.marina} alt="Port Lucaya Marina, Freeport, Grand Bahama" width={2000} height={1000} loading="lazy" data-source="commons" />
        <p>In mid-1996 two Freeport partners built a guide to The Bahamas. It climbed the search engines, and businesses asked to be in it.<span>{CREDIT.marina}</span></p>
      </section>

      {/* 2.0 the guide: project ledger + era slider */}
      <section className="guide" id="guide" aria-labelledby="h-guide">
        <div className="guide-text">
          <p className="label">2.0 · the guide</p>
          <h2 id="h-guide">The first client was their own.</h2>
          <p>One partner took the graphics, the other the code. Their first multi-page site was the Bahamas Vacation Guide, and it reached the top of the search engines. The requests that followed became BVG Design: the letters stand for Bahamas Vacation Guide.</p>
          <table className="ledger">
            <caption>Project ledger · sourced entries only</caption>
            <thead><tr><th scope="col">project</th><th scope="col">address</th><th scope="col">since</th><th scope="col">status</th></tr></thead>
            <tbody>
              <tr><td>Bahamas Vacation Guide</td><td><a href="http://www.bahamasvacationguide.com/">bahamasvacationguide.com</a></td><td>1996</td><td>online, maintained 2023</td></tr>
              <tr><td>BVG Design Services</td><td><a href="https://www.bvgdesign.com/">bvgdesign.com</a></td><td>1996</td><td>last updated 2014</td></tr>
            </tbody>
          </table>
          <p className="small">Client sites are not listed here because none were confirmed for this concept. BVG would add its own portfolio.</p>
        </div>
        <div className="era">
          <p className="era-h"><span>drag to compare</span> a 1996 page and a page built today</p>
          <div className="era-frame" style={{ ['--cut' as string]: `${era}%` }}>
            <div className="era-new" aria-hidden="true">
              <img src={PHOTOS.beach} alt="" width={1600} height={1200} loading="lazy" data-source="commons" />
              <div className="era-new-copy"><b>Port Lucaya, tonight</b><span>Rooms, tables and charters, on a phone</span><i>Ask about dates</i></div>
            </div>
            <div className="era-old" aria-hidden="true">
              <div className="old-bar">Welcome!!! Best of the Bahamas</div>
              <div className="old-body">
                <p className="old-h">BAHAMAS VACATION INFO</p>
                <p><u>Hotels</u> | <u>Restaurants</u> | <u>Fishing</u> | <u>Diving</u></p>
                <p className="old-blink">NEW! Click for specials</p>
                <p className="old-small">Best viewed in 800 x 600</p>
              </div>
            </div>
            <span className="era-rule" aria-hidden="true" />
          </div>
          <label className="era-range"><span className="sr">Compare 1996 and today</span>
            <input type="range" min={0} max={100} value={era} onChange={(e) => setEra(Number(e.target.value))} />
          </label>
          <p className="small">An illustration of web styles in 1996 and today, not a screenshot of the guide. {CREDIT.beach}</p>
        </div>
      </section>

      {/* 3.0 office register: hover swaps the place */}
      <section className="offices" id="offices" aria-labelledby="h-off">
        <div className="off-photo"><Swap src={o.img} alt={o.alt} credit={o.credit} /></div>
        <div className="off-list">
          <p className="label">3.0 · offices</p>
          <h2 id="h-off">Bahamian owned. Freeport first.</h2>
          <ul>
            {OFFICES.map((x, i) => (
              <li key={x.code}>
                <button type="button" className={office === i ? 'is-on' : ''} onMouseEnter={() => setOffice(i)} onFocus={() => setOffice(i)} onClick={() => setOffice(i)} aria-pressed={office === i}>
                  <span className="code">{x.code}</span>
                  <span className="off-place">{x.place}</span>
                  <span className="off-role">{x.role}</span>
                </button>
                {office === i && <motion.div layout className="off-lines" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{x.lines.map((l) => <span key={l}>{l}</span>)}</motion.div>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4.0 terms, short */}
      <section className="terms" aria-labelledby="h-terms">
        <p className="label">4.0 · terms</p>
        <h2 id="h-terms">How to pay.</h2>
        <ul>{PAY.map((p) => <li key={p}>{p}</li>)}</ul>
        <a className="link" href="services.html#terms">Full terms and questions</a>
      </section>

      {/* 5.0 request: the light section, a numbered form */}
      <section className="request" id="request" aria-labelledby="h-req">
        <div className="req-head">
          <p className="label">5.0 · request</p>
          <h2 id="h-req">Website request, form BVG-1.</h2>
          <p>Fill in what you know. It opens your email to {EMAIL} with everything written out. BVG replies by email.</p>
          <p><a className="link" href={TEL}>Or call {PHONE}</a></p>
        </div>
        <form className="form" onSubmit={send}>
          <label className="f"><span className="fn">1</span><span className="fl">Business name</span><input name="Business" required autoComplete="organization" /></label>
          <label className="f"><span className="fn">2</span><span className="fl">Island</span>
            <select name="Island" defaultValue="Grand Bahama">{ISLANDS.map((i) => <option key={i}>{i}</option>)}</select>
          </label>
          <fieldset className="f f-wide"><legend><span className="fn">3</span><span className="fl">What you need</span></legend>
            <div className="needs">
              {CAPS.map((k) => (
                <label key={k.code} className={need.includes(k.name) ? 'need is-on' : 'need'}>
                  <input type="checkbox" name="need" value={k.name} checked={need.includes(k.name)} onChange={(e) => setNeed(e.target.checked ? [...need, k.name] : need.filter((n) => n !== k.name))} />
                  {k.name}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="f"><span className="fn">4</span><span className="fl">Current website, if any</span><input name="Current site" type="url" placeholder="https://" /></label>
          <label className="f"><span className="fn">5</span><span className="fl">Roughly how many pages</span>
            <select name="Pages" defaultValue="Not sure"><option>Not sure</option><option>One page</option><option>2 to 10 pages</option><option>More than 10 pages</option></select>
          </label>
          <label className="f f-wide"><span className="fn">6</span><span className="fl">Tell us about the business</span><textarea name="Message" rows={4} /></label>
          <label className="f"><span className="fn">7</span><span className="fl">Your name</span><input name="Name" required autoComplete="name" /></label>
          <label className="f"><span className="fn">8</span><span className="fl">Phone or WhatsApp</span><input name="Phone" type="tel" autoComplete="tel" /></label>
          <div className="f-wide f-send">
            <button type="submit" className="btn btn-ink">Start a website request</button>
            <p className="small" role="status">{status || 'Opens your email app. Nothing is sent until you press send there.'}</p>
          </div>
        </form>
      </section>
    </Layout>
  );
}

mount(<Home />);
