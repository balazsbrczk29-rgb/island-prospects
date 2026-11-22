import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { BIZ, PHOTOS, SPECIALS, WHO, openToday, fmt, firstFit, noneOpenTitle, SPLASH, NEARBY, ACTIVITIES, GATEWAYS, AIRLINES, type Who } from './data'
import { usePlan, setPlan, useBookHref } from './store'

export function Harbour() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, v => reduce ? '0%' : `${(v - 0.5) * -3.2}%`)
  return (
    <section className="harbour" aria-labelledby="harbour-h">
      <div ref={ref} className="pano">
        <motion.img style={{ x, scale: 1.06 }} src={PHOTOS.harbour} alt="Turquoise harbour water with moored boats, seen from above" width={1920} height={674} loading="eager" />
      </div>
      <div className="harbour-text wrap">
        <h2 id="harbour-h" className="h2">A private beach on Elizabeth Harbour.</h2>
        <div>
          <p className="lede">Jolly Hall Bay is calm, clear water and white sand, with Stocking Island across the harbour. The water toys are free for guests, the pool is open all year, and you watch the sunset from your own patio.</p>
          <p className="muted">Daily housekeeping, grocery delivery, a free shuttle into George Town and massage in your room, if you want it.</p>
        </div>
      </div>
    </section>
  )
}

export function Offers() {
  const p = usePlan()
  const who = p.who
  const setWho = (w: Who) => setPlan({ who: w })
  const [copied, setCopied] = useState('')
  const list = who ? SPECIALS.filter(s => s.who.includes(who) && openToday(s)) : []
  const copy = (c: string) => { navigator.clipboard?.writeText(c).then(() => { setCopied(c); setTimeout(() => setCopied(''), 1600) }, () => { setCopied('fail:' + c); setTimeout(() => setCopied(''), 2400) }) }
  return (
    <section id="offers" className="offers" aria-labelledby="offers-h">
      <div className="wrap offers-grid">
        <div>
          <h2 id="offers-h" className="h2">Which offer is yours?</h2>
          <p className="lede">Tell us where you live or how you fly. You see only the offers open for booking today, with the code to enter.</p>
          <fieldset className="who">
            <legend className="sr-only">I live in, or I fly</legend>
            {WHO.map(w => (
              <label key={w.id} className={who === w.id ? 'on' : ''}>
                <input type="radio" name="who" value={w.id} checked={who === w.id} onChange={() => setWho(w.id)} />{w.label}
              </label>
            ))}
          </fieldset>
        </div>
        <div className="offer-list" aria-live="polite">
          {!who && <div className="offer empty"><h3 className="h3">Choose where you live, or that you fly yourself.</h3><p>Only offers open for booking today appear, each with its code, stay length, travel window and blackout dates.</p></div>}
          {who && list.length === 0 && (
            <div className="offer empty">
              <h3 className="h3">{noneOpenTitle(who)}.</h3>
              <p>Booking direct still gets you the best available rate. Ask us about your dates and we will tell you if anything new applies.</p>
              <a className="link" href={`mailto:${BIZ.email}?subject=Offers%20for%20my%20dates`}>{BIZ.email}</a>
            </div>
          )}
          {list.map(s => (
            <motion.article key={s.id} className="offer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <h3 className="h3">{s.title}</h3>
              <p>{s.what}</p>
              <button type="button" className="code" onClick={() => copy(s.code)} aria-label={`Copy code ${s.code}`}>
                <span className="mono">{s.code}</span><span className="copy">{copied === s.code ? 'Copied' : copied === 'fail:' + s.code ? 'Select and copy' : 'Copy code'}</span>
              </button>
              <dl className="terms num">
                <div><dt>Stay</dt><dd>{s.nights}</dd></div>
                <div><dt>Book by</dt><dd>{fmt(s.bookTo)}</dd></div>
                <div><dt>Travel</dt><dd>{fmt(s.travelFrom)} to {fmt(s.travelTo)}</dd></div>
                <div><dt>Blackouts</dt><dd>{s.blackout}</dd></div>
              </dl>
            </motion.article>
          ))}
          <p className="small fine">Terms apply. Pre-book and enter the code in the booking system's promo field.</p>
        </div>
      </div>
    </section>
  )
}

export function Splash() {
  return (
    <section id="splash" className="splash" aria-labelledby="splash-h">
      <div className="wrap splash-grid">
        <figure className="splash-photo">
          <img src={SPLASH.photo} alt="The bar at Splash, blue posts, stools and a pool table under the roof" width={846} height={476} loading="lazy" />
        </figure>
        <div className="splash-text">
          <h2 id="splash-h" className="h2">Splash! Bar &amp; Grill</h2>
          <p className="lede">On the beach, with a patio over Elizabeth Harbour and tables by the pool. Pool tables, board games, six big screens and, often, live music.</p>
          <table className="hours num">
            <caption className="sr-only">Splash opening hours</caption>
            <tbody>{SPLASH.hours.map(h => <tr key={h.meal}><th scope="row">{h.meal}</th><td>{h.time}</td></tr>)}</tbody>
          </table>
          <p className="drinks"><span className="muted">At the bar: </span>{SPLASH.drinks.join(', ')}.</p>
          <p className="muted">Take-out too. Tables: <a className="num" href={`tel:${SPLASH.phones[0].tel}`}>{SPLASH.phones[0].show}</a> or <a className="num" href={`tel:${SPLASH.phones[1].tel}`}>{SPLASH.phones[1].show}</a></p>
        </div>
      </div>
    </section>
  )
}

export function Around() {
  return (
    <section className="around" aria-labelledby="around-h">
      <div className="wrap around-grid">
        <div>
          <h2 id="around-h" className="h2">Everything within two miles.</h2>
          <ol className="dist">
            {NEARBY.map(n => <li key={n.name}><span>{n.name}</span><span className="num">{n.mi} mi</span></li>)}
          </ol>
          <p className="muted acts-line">The tour desk books {ACTIVITIES.slice(0, -1).join(', ')} and {ACTIVITIES[ACTIVITIES.length - 1]}.</p>
        </div>
        <figure className="around-photo">
          <img src={PHOTOS.stocking} alt="Dinghies off the beach at Stocking Island" width={1280} height={853} loading="lazy" />
          <figcaption className="muted small">Stocking Island, 1.86 miles across the harbour.</figcaption>
        </figure>
      </div>
    </section>
  )
}

export function GettingHere() {
  return (
    <section id="here" className="here" aria-labelledby="here-h">
      <div className="wrap here-grid">
        <h2 id="here-h" className="h2">Fifteen minutes from Exuma International.</h2>
        <div>
          <ul className="gates" aria-label="Direct gateways">{GATEWAYS.map(g => <li key={g}>{g}</li>)}</ul>
          <p className="lede">Fly into Exuma International Airport (GGT) with {AIRLINES}. We pre-arrange your taxi when you book, or pick up a rental car at the airport.</p>
          <p className="muted">Flying yourself? Pilots get their own fee credits, see <a href="#offers">the offers</a>.</p>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const p = usePlan()
  return (
    <section id="contact" className="contact" aria-labelledby="contact-h">
      <div className="wrap contact-grid">
        <div>
          <h2 id="contact-h" className="h2">Ask about your dates.</h2>
          <address>
            <p>{BIZ.address}</p>
            <p><a className="num big" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a></p>
            <p><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></p>
          </address>
          <p className="socials"><a className="link" href={BIZ.instagram}>Instagram</a><a className="link" href={BIZ.facebook}>Facebook</a><a className="link" href={BIZ.booking}>Book online</a></p>
        </div>
        <form className="enquiry" data-enquiry data-business={BIZ.name} data-whatsapp="" data-email={BIZ.email} action={`mailto:${BIZ.email}`} method="post" encType="text/plain">
          <div className="two">
            <label>Arriving<input type="date" name="Arrival" value={p.arrive} onChange={e => setPlan({ arrive: e.target.value })} /></label>
            <label>Leaving<input type="date" name="Departure" value={p.leave} min={p.arrive || undefined} onChange={e => setPlan({ leave: e.target.value })} /></label>
          </div>
          <div className="two">
            <label>Guests<input type="number" name="Guests" min={1} max={6} value={p.guests} inputMode="numeric" onChange={e => setPlan({ guests: Math.min(6, Math.max(1, Number(e.target.value) || 1)) })} /></label>
            <label>Where
              <select name="Preference" value={p.side ?? ''} onChange={e => { const v = (e.target.value || null) as any; setPlan({ side: v, room: v ? firstFit(v, p.guests) : null }) }}>
                <option value="">Either</option><option value="ocean">Ocean Side, by the beach</option><option value="hill">Island Time, on the hill</option>
              </select>
            </label>
          </div>
          <label>Your name<input name="Name" required autoComplete="name" /></label>
          <label>Message<textarea name="Message" rows={3} placeholder="Anything we should know" /></label>
          <button className="btn btn-primary" type="submit">Send my enquiry</button>
          <p className="small muted">Opens your email app with your details filled in.</p>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-row">
        <p className="wordmark">Hideaways at Palm Bay</p>
        <nav aria-label="Footer"><a href="stay.html">Compare all rooms</a><a href="./#offers">Offers</a><a href="./#splash">Splash</a><a href="./#contact">Contact</a></nav>
        <p className="small muted">Photographs: Hideaways at Palm Bay.</p>
      </div>
    </footer>
  )
}

/** Desktop: a booking button in the corner after the hero. Phone: a dock, hidden over the hero and the contact block. */
export function Persistent() {
  const [on, setOn] = useState(false)
  const href = useBookHref()
  useEffect(() => {
    const hero = document.querySelector('.planner .go')
    const quiet = [document.getElementById('contact'), ...Array.from(document.querySelectorAll('.book'))].filter(Boolean) as Element[]
    let heroVis = true; const vis = new Set<Element>()
    const upd = () => setOn(!heroVis && vis.size === 0)
    const io = new IntersectionObserver(es => { es.forEach(e => { if (e.target === hero) heroVis = e.isIntersecting; else if (e.isIntersecting) vis.add(e.target); else vis.delete(e.target) }); upd() }, { threshold: 0 })
    if (hero) io.observe(hero); quiet.forEach(q => io.observe(q))
    return () => io.disconnect()
  }, [])
  useEffect(() => { document.documentElement.style.setProperty('--concept-offset', on && matchMedia('(max-width: 767px)').matches ? '72px' : '0px') }, [on])
  return (
    <>
      <div className={`corner ${on ? 'on' : ''}`}><a className="btn btn-primary" href={href} target="_blank" rel="noopener" tabIndex={on ? 0 : -1}>Check availability</a></div>
      <div className={`dock ${on ? 'on' : ''}`}>
        <a className="dock-call num" href={`tel:${BIZ.tel}`} tabIndex={on ? 0 : -1}>Call</a>
        <a className="btn btn-primary" href={href} target="_blank" rel="noopener" tabIndex={on ? 0 : -1}>Check availability</a>
      </div>
    </>
  )
}
