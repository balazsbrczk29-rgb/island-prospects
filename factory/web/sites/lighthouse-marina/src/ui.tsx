import { useEffect, useState } from 'react'
import { biz, hours, type Photo } from './data'

export function Img({ p, sizes, className = 'ph', eager = false, max }: { p: Photo; sizes: string; className?: string; eager?: boolean; max?: number }) {
  const top = Math.min(max ?? 2000, p.w, p.h)
  const steps = [640, 1000, 1400, 2000].filter(s => s < top).concat(top)
  return (
    <img className={className} src={p.src(Math.min(1400, top))} srcSet={steps.map(s => `${p.src(s)} ${Math.round(s * Math.min(1, p.w / p.h))}w`).join(', ')}
      sizes={sizes} width={p.w} height={p.h} alt={p.alt}
      loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" referrerPolicy="no-referrer" />
  )
}

export function Header({ page }: { page: 'home' | 'boatyard' }) {
  const h = page === 'home' ? '' : 'index.html'
  return (
    <header className="hdr">
      <a className="hdr__mark" href="index.html"><b>Lighthouse Marina</b><span>Hope Town, Elbow Cay</span></a>
      <nav aria-label="Main">
        <a href={`${h}#fuel`}>Fuel and slips</a>
        <a href={page === 'home' ? '#yard' : 'boatyard.html'}>Boatyard</a>
        <a href={`${h}#harbour`}>The harbour</a>
        <a href={`${h}#store`}>Ship’s store</a>
        <a href="#contact">Contact</a>
      </nav>
      <p className="hdr__call"><a className="num" href={`tel:${biz.phones[0].tel}`}>{biz.phones[0].label}</a><span>VHF {biz.vhf}</span></p>
    </header>
  )
}

/** Phone bar: appears after the counter has scrolled away, hides over the contact card. */
export function Bar() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const els = [document.getElementById('counter'), document.getElementById('contact')].filter(Boolean) as Element[]
    const vis = new Set<Element>()
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); setOn(vis.size === 0) })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    document.documentElement.style.setProperty('--concept-offset', on && matchMedia('(max-width: 900px)').matches ? '76px' : '0px')
  }, [on])
  return (
    <div className={`pbar ${on ? 'on' : ''}`} aria-hidden={!on}>
      <a className="btn" href="#contact" tabIndex={on ? 0 : -1}>Request a slip or service</a>
      <a className="plink-d num" href={`tel:${biz.phones[0].tel}`} tabIndex={on ? 0 : -1}>Call</a>
    </div>
  )
}

export function Contact({ preset }: { preset?: string }) {
  return (
    <section id="contact" className="card navy" aria-labelledby="contact-h">
      <div className="wrap card__grid">
        <div className="card__left">
          <h2 id="contact-h" className="t56">Call ahead, or call us on 16.</h2>
          <ul className="card__phones">
            {biz.phones.map(p => (
              <li key={p.tel}><a className="num" href={`tel:${p.tel}`}>{p.label}</a>{p.note && <span className="t14 p-muted"> {p.note}</span>}</li>
            ))}
            <li>VHF channel {biz.vhf}</li>
          </ul>
          <p><a className="plink" href={`mailto:${biz.email}`}>{biz.email}</a></p>
          <dl className="card__hours t14">
            {hours.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}
          </dl>
          <p className="t14 p-muted">Our rental cottages, Westview Cottage and Lighthouse Point, are on long-term rental at present.</p>
        </div>
        <form className="enquiry" data-enquiry data-business="Lighthouse Marina" data-whatsapp="" data-email={biz.email} action={`mailto:${biz.email}`} method="post" encType="text/plain">
          <p className="t32">Request a slip or service</p>
          <label className="field">What do you need
            <select name="Request" id="req-type" defaultValue={preset ?? 'A slip'}>
              <option>A slip</option><option>Fuel and bait on arrival</option><option>Haul-out and dry storage</option><option>Mechanic or Mercury service</option><option>Something from the ship’s store</option>
            </select>
          </label>
          <div className="two">
            <label className="field">Boat length (ft)<input className="num" id="req-loa" name="Boat LOA (ft)" inputMode="decimal" /></label>
            <label className="field">Draft (ft)<input className="num" id="req-draft" name="Draft (ft)" inputMode="decimal" /></label>
          </div>
          <div className="two">
            <label className="field">Arriving<input name="Arriving" type="date" /></label>
            <label className="field">Nights or months<input name="Length of stay" /></label>
          </div>
          <label className="field">Your name<input name="Name" required autoComplete="name" /></label>
          <label className="field">Message<textarea id="req-msg" name="Message" rows={3} /></label>
          <button className="btn" type="submit">Send to the marina office</button>
          <p className="t14 enquiry__note">Opens your email app with these details filled in.</p>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot navy">
      <div className="wrap foot__row t14">
        <p>Lighthouse Marina, Hope Town Harbour, Elbow Cay, Abaco, The Bahamas. Established 1980.</p>
        <p><a href={biz.facebook}>Facebook</a> · <a href="boatyard.html">Boatyard rates</a></p>
        <p className="foot__credit">Photographs: Lighthouse Marina. Panorama from the lighthouse gallery by Roman Tokman, CC BY-SA 4.0, via Wikimedia Commons.</p>
      </div>
    </footer>
  )
}
