import { useEffect, useState } from 'react'
import { biz, type Photo } from './data'

export function Img({ p, sizes, className = 'ph', eager = false, max }: { p: Photo; sizes: string; className?: string; eager?: boolean; max?: number }) {
  const top = Math.min(max ?? 2000, p.w, p.h)
  const steps = [640, 1000, 1400, 2000].filter(s => s < top).concat(top)
  return (
    <img className={className} src={p.src(Math.min(1400, top))} srcSet={steps.map(s => `${p.src(s)} ${Math.round(s * Math.min(1, p.w / p.h))}w`).join(', ')}
      sizes={sizes} width={p.w} height={p.h} alt={p.alt} data-local={p.local}
      loading={eager ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer" />
  )
}

export function Header({ page }: { page: 'home' | 'boatyard' }) {
  const h = page === 'home' ? '' : 'index.html'
  return (
    <header className="hdr">
      <a className="hdr__mark" href={page === 'home' ? '#top' : 'index.html'}>
        <b>Lighthouse Marina</b><span>Hope Town, Elbow Cay</span>
      </a>
      <nav aria-label="Main">
        <a href={`${h}#fuel`}>Fuel</a>
        <a href={`${h}#dock`}>Slips</a>
        <a href="boatyard.html">Boatyard rates</a>
        <a href={`${h}#dock`}>Ship's store</a>
        <a href={`${h}#contact`}>Contact</a>
      </nav>
      <a className="hdr__call num" href={`tel:${biz.phones[0].tel}`}>{biz.phones[0].label}<span className="muted" style={{ fontWeight: 500 }}> &middot; VHF {biz.vhf}</span></a>
      {page !== 'home' && <a className="btn" href={`${h}#contact`}>Request a slip</a>}
    </header>
  )
}

/** Corner action: hidden on the first screen and while the contact section is visible. */
export function Corner() {
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    const contact = document.getElementById('contact')
    let inContact = false
    const onScroll = () => setHidden(window.scrollY < window.innerHeight * 1.2 || inContact)
    const io = contact ? new IntersectionObserver(([e]) => { inContact = e.isIntersecting; onScroll() }, { rootMargin: '0px 0px -10% 0px' }) : null
    if (contact && io) io.observe(contact)
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => { window.removeEventListener('scroll', onScroll); io?.disconnect() }
  }, [])
  return <a className="btn corner" href="#contact" data-hidden={hidden} aria-hidden={hidden} tabIndex={hidden ? -1 : 0}>Request a slip or service</a>
}

export function Contact({ preset }: { preset?: string }) {
  return (
    <section id="contact" className="navy" aria-labelledby="contact-h">
      <div className="wrap" style={{ paddingBlock: 'var(--s-16) var(--s-12)', display: 'grid', gap: 'var(--s-8)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))' }}>
        <div>
          <h2 id="contact-h" className="t56" style={{ maxWidth: '12ch' }}>Call ahead, or call us on 16.</h2>
          <p className="t18 muted" style={{ marginTop: 'var(--s-3)', maxWidth: '40ch' }}>Slips, fuel, a haul-out or a mechanic: tell the office what you need before you round the point.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 'var(--s-6) 0 0', display: 'grid', gap: 'var(--s-2)' }}>
            {biz.phones.map(p => (
              <li key={p.tel} className="t28 num"><a href={`tel:${p.tel}`} style={{ textDecoration: 'none' }}>{p.label}</a>{p.note && <span className="t14 muted"> {p.note}</span>}</li>
            ))}
            <li className="t28">VHF channel {biz.vhf}</li>
            <li className="t18" style={{ marginTop: 'var(--s-1)' }}><a className="link" href={`mailto:${biz.email}`}>{biz.email}</a></li>
          </ul>
          <dl className="t14" style={{ margin: 'var(--s-6) 0 0', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px var(--s-3)' }}>
            <dt className="muted">Ship's store</dt><dd style={{ margin: 0 }} className="num">Monday to Saturday, 8:00 to 4:00</dd>
            <dt className="muted">Boatyard</dt><dd style={{ margin: 0 }} className="num">Monday to Friday, 8:00 to 4:00</dd>
            <dt className="muted">Mechanic</dt><dd style={{ margin: 0 }}>Monday to Friday</dd>
            <dt className="muted">Laundry</dt><dd style={{ margin: 0 }} className="num">Every day, 8:00 to 6:00</dd>
          </dl>
        </div>
        <form className="enquiry" data-enquiry data-business="Lighthouse Marina" data-whatsapp="" data-email={biz.email}
          action={`mailto:${biz.email}`} method="post" encType="text/plain"
          style={{ background: 'var(--paper)', color: 'var(--ink)', padding: 'clamp(20px, 3vw, 40px)', borderRadius: 'var(--r-2)', display: 'grid', gap: 'var(--s-2)', alignContent: 'start' }}>
          <p className="t28" style={{ fontWeight: 600 }}>Request a slip or service</p>
          <label className="field">What do you need
            <select name="Request" id="req-type" defaultValue={preset ?? 'A slip'}>
              <option>A slip</option><option>Fuel and bait on arrival</option><option>Haul-out and dry storage</option><option>Mechanic or Mercury service</option><option>Something from the ship's store</option>
            </select>
          </label>
          <div style={{ display: 'grid', gap: 'var(--s-2)', gridTemplateColumns: '1fr 1fr' }}>
            <label className="field">Boat length (ft)<input id="req-loa" name="Boat LOA (ft)" inputMode="decimal" /></label>
            <label className="field">Draft (ft)<input id="req-draft" name="Draft (ft)" inputMode="decimal" /></label>
          </div>
          <div style={{ display: 'grid', gap: 'var(--s-2)', gridTemplateColumns: '1fr 1fr' }}>
            <label className="field">Arriving<input name="Arriving" type="date" /></label>
            <label className="field">Nights or months<input name="Length of stay" /></label>
          </div>
          <label className="field">Your name<input name="Name" required autoComplete="name" /></label>
          <label className="field">Message<textarea name="Message" rows={3} /></label>
          <button className="btn" type="submit" style={{ justifySelf: 'start', marginTop: 'var(--s-1)' }}>Send to the marina office</button>
          <p className="t14 muted">Opens your email app with these details filled in.</p>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="wrap t14" style={{ paddingBlock: 'var(--s-6) calc(var(--s-8) + 40px)', display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2) var(--s-6)', justifyContent: 'space-between', color: 'var(--ink-2)' }}>
      <p><b style={{ color: 'var(--ink)' }}>Lighthouse Marina</b>, Hope Town Harbour, Elbow Cay, Abaco, The Bahamas. Established 1980.</p>
      <p><a className="link" href={biz.facebook}>Facebook</a> &middot; <a className="link" href="boatyard.html">Boatyard rates</a></p>
      <p style={{ flexBasis: '100%' }}>Photographs: Lighthouse Marina; panorama from the lighthouse gallery by Roman Tokman, CC BY-SA 4.0, via Wikimedia Commons.</p>
    </footer>
  )
}
