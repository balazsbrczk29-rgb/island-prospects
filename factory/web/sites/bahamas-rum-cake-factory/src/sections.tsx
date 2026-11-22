import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { flavours, img, mix, twopacks, sixpacks, other, shop, shopNow, money, STORE, ETSY, CDN, type Flavour } from './data'
import { useCart, BagButton } from './cart'

const ease = [0.22, 1, 0.36, 1] as const

const SHOPFRONT = CDN + 'Carnival_3_smiling__customers_six_packs.jpg'
const TURQ = '#7fc8c6'

function useShopNow() {
  const [s, setS] = useState<{ open: boolean | null; text: string }>({ open: null, text: shop.hours })
  useEffect(() => { const t = () => setS(shopNow()); t(); const id = setInterval(t, 60000); return () => clearInterval(id) }, [])
  return s
}

export function Hero() {
  const [f, setF] = useState<Flavour>(flavours[0])
  const [mode, setMode] = useState<'shop' | 'nassau'>('shop')
  const now = useShopNow()
  const { add, setOpen } = useCart()
  const v20 = f.v.find(v => v.t === '20 oz')!; const v4 = f.v.find(v => v.t === '4 oz')!
  const buy = (v: typeof v20) => { add({ id: v.id, name: `${f.name} Rum Cake`.replace('Kentucky Bourbon Rum Cake', 'Kentucky Bourbon Cake'), size: v.t, price: v.p, img: img(f.img, 200) }); setOpen(true) }
  const six = () => { window.dispatchEvent(new CustomEvent('brcf:six', { detail: f.name })); document.getElementById('six')?.scrollIntoView({ behavior: 'smooth' }) }
  const nassau = mode === 'nassau'
  return (
    <section className={'hero' + (f.dark && !nassau ? ' is-dark' : '') + (nassau ? ' is-nassau' : '')} style={{ background: nassau ? TURQ : f.ground }} aria-labelledby="h1">
      <div className="hero__photo">
        <AnimatePresence initial={false}>
          {nassau
            ? <motion.img key="shopfront" className="hero__shopfront" src={SHOPFRONT + '?width=2400'} alt="Customers outside the Rum Cake Factory's turquoise shopfront on East Bay Street, holding six packs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} width={2400} height={1600} />
            : <motion.img key={f.handle} src={img(f.img, 2400)} alt={`${f.name} rum cake, a 20 oz bundt, on a ${f.name.toLowerCase()} coloured ground`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} fetchPriority="high" width={2718} height={2048} />}
        </AnimatePresence>
      </div>
      <header className="top">
        <a className="mark" href="./">Bahamas Rum Cake Factory</a>
        <nav aria-label="Site" className="top__nav"><a href="#six">Six pack</a><a href="#travel">Travels well</a><a href="#visit">Visit</a><a href="shop.html">Shop all</a></nav>
        <BagButton />
      </header>
      <div className="hero__type">
        <h1 id="h1">The Official Rum Cake of The&nbsp;Bahamas.</h1>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={nassau ? 'n' : f.handle} className="hero__flav" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {nassau ? 'Baked downtown on East Bay Street since 2000' : `${f.name}, marinated in Ole Nassau Bahamian Rum`}
          </motion.p>
        </AnimatePresence>
      </div>
      <motion.div className="price" layout transition={{ duration: 0.45, ease }}>
        <div className="mode" role="radiogroup" aria-label="How are you shopping?">
          <button type="button" role="radio" aria-checked={!nassau} onClick={() => setMode('shop')}>Shop cakes</button>
          <button type="button" role="radio" aria-checked={nassau} onClick={() => setMode('nassau')}>In Nassau today</button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {nassau ? (
            <motion.div key="nassau" className="visitnow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <p className="now"><i data-open={String(now.open)} aria-hidden="true" />{now.text}</p>
              <p className="visitnow__addr">{shop.address}</p>
              <p className="visitnow__walk">About 10 minutes' walk from the cruise dock, along Bay Street towards the Paradise Island bridge.</p>
              <a className="btn btn-ink wide" href={shop.walk} target="_blank" rel="noopener">Walking route from the ship</a>
              <p className="fine">No refrigeration needed: cakes go in your carry-on. Also at the airport: 700 Wines (US departures) and Bahama Pearl (international).</p>
              <a className="tel tnum" href={`tel:${shop.phone.tel}`}>{shop.phone.label}</a>
            </motion.div>
          ) : (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={f.handle} className="price__name" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>{f.name}</motion.p>
              </AnimatePresence>
              <div className="price__rows">
                {[v20, v4].map(v => (
                  <div className="price__row" key={v.t}>
                    <span><b>{v.t}</b><em className="tnum">{money(v.p)}</em></span>
                    {v.ok ? <button type="button" className="btn btn-ink" onClick={() => buy(v)}>Add to bag</button> : <span className="sold">Sold out</span>}
                  </div>
                ))}
              </div>
              {v4.ok && <button type="button" className="price__six" onClick={six}>Make it a six pack of 4 oz, {money(mix.v[0].p)}</button>}
              <p className="price__note">Shelf stable, no refrigeration. Free US ground shipping over $55.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="chips" role="radiogroup" aria-label="Flavour" data-hidden={nassau}>
        {flavours.map(x => (
          <button key={x.handle} type="button" role="radio" aria-checked={x.handle === f.handle} tabIndex={nassau ? -1 : 0} onClick={() => setF(x)}>
            <i style={{ background: x.ground }} aria-hidden="true" />{x.name}
          </button>
        ))}
      </div>
    </section>
  )
}

const SIX_OK = flavours.filter(f => sixpacks.some(s => s.name.toLowerCase() === f.name.toLowerCase().replace('caramel caribbean', 'caramel') && s.v[0].ok))
export function SixPack() {
  const [slots, setSlots] = useState<string[]>([])
  const { add, setOpen } = useCart()
  const put = (n: string) => setSlots(s => (s.length < 6 ? [...s, n] : s))
  useEffect(() => { const on = (e: Event) => setSlots(s => s.length ? s : [(e as CustomEvent).detail]); window.addEventListener('brcf:six', on); return () => window.removeEventListener('brcf:six', on) }, [])
  const v = mix.v[0]
  const go = () => { add({ id: v.id, name: 'Six Pack, mix and match', size: '6 x 4 oz', price: v.p, img: img(mix.img, 200), note: 'Six pack flavours: ' + slots.join(', ') }); setOpen(true); setSlots([]) }
  return (
    <section className="six" id="six" aria-labelledby="six-h">
      <div className="six__copy">
        <img className="six__pack" src={img('Six_Pack_Mixed.png', 700)} alt="The Rum Cake Factory six pack box with six 4 oz cakes" loading="lazy" width={700} height={700} />
        <h2 id="six-h">Fill a six pack.</h2>
        <p>Six 4 oz cakes, any flavours you like, for {money(v.p)}. Tap a flavour to drop it in a slot.</p>
        <div className="flavlist">
          {SIX_OK.map(f => <button key={f.handle} type="button" onClick={() => put(f.name)} disabled={slots.length >= 6}><i style={{ background: f.ground }} aria-hidden="true" />{f.name}</button>)}
        </div>
      </div>
      <div className="six__box">
        <ol className="slots" aria-label="Your six pack">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <AnimatePresence>
                {slots[i] && (
                  <motion.button type="button" key={slots[i] + i} className="slot__cake" onClick={() => setSlots(s => s.filter((_, j) => j !== i))}
                    initial={{ y: -40, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    style={{ background: flavours.find(f => f.name === slots[i])!.ground }} aria-label={`Remove ${slots[i]}`}>
                    <img src={img(flavours.find(f => f.name === slots[i])!.img, 360)} alt="" />
                    <span>{slots[i]}</span>
                  </motion.button>
                )}
              </AnimatePresence>
              {!slots[i] && <span className="slot__empty tnum">{i + 1}</span>}
            </li>
          ))}
        </ol>
        <div className="six__act">
          <span className="tnum">{slots.length} of 6</span>
          <button type="button" className="btn btn-ink" disabled={slots.length < 6} onClick={go}>Add six pack, {money(v.p)}</button>
        </div>
        <p className="six__two">Rather two big ones? <a className="ul" href="shop.html#two-packs">20 oz two-packs, {money(twopacks[0].v[0].p)}</a></p>
      </div>
    </section>
  )
}

export function Story() {
  return (
    <section className="story" id="story" aria-labelledby="story-h">
      <div className="story__in">
        <p className="story__year tnum" aria-hidden="true">2000</p>
        <h2 id="story-h">One recipe, one downtown shop, since 2000.</h2>
        <div className="story__body">
          <p>George Bates came to Nassau from the UK and created the Original recipe in a shop downtown in 2000. The factory has baked in the same place ever since.</p>
          <p>In 2014 it was recognised as the Official Rum Cake of The Bahamas. Every cake is marinated in Ole Nassau Bahamian Rum.</p>
        </div>
        <figure className="story__pic">
          <img src={CDN + 'IMG_5409.jpg'} alt="Two visitors tasting rum cake samples at the counter inside the shop" loading="lazy" width={680} height={453} />
          <figcaption>Tasting at the counter, downtown Nassau.</figcaption>
        </figure>
      </div>
    </section>
  )
}

export function Travel() {
  const facts = [
    ['No fridge needed.', 'Every cake is shelf stable. No refrigeration, at home or on the way.'],
    ['Cruise ship and airport approved.', 'Carry-on allowed. The bakery cannot deliver to the ships, so bring them aboard yourself.'],
    ['Ships across the US.', 'USPS, UPS or FedEx: Ground, Priority or Express, priced at checkout. Free ground shipping over $55.'],
    ['At the airport too.', 'US departures: the 700 Wines store and kiosk. International: Bahama Pearl.'],
  ]
  return (
    <section className="travel" id="travel" aria-labelledby="travel-h">
      <h2 id="travel-h">It travels better than you do.</h2>
      <dl className="travel__grid">
        {facts.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
      </dl>
      <p className="travel__etsy">Sending a gift outside the US? <a className="ul" href={ETSY}>Order through their Etsy shop</a></p>
    </section>
  )
}

export function Visit() {
  const now = useShopNow()
  return (
    <section className="visit" id="visit" aria-labelledby="visit-h">
      <img className="visit__img" src={SHOPFRONT + '?width=2400'} alt="Customers outside the Rum Cake Factory's turquoise shopfront on East Bay Street, holding six packs" loading="lazy" width={2400} height={1600} />
      <div className="visit__card">
        <h2 id="visit-h">In Nassau? Come taste first.</h2>
        <p className="now"><i data-open={String(now.open)} aria-hidden="true" />{now.text}</p>
        <p className="visit__addr">{shop.address}</p>
        <p>About 10 minutes' walk from Prince George Wharf. Free samples at the bakery.</p>
        <table className="hours tnum"><tbody>
          <tr><th scope="row">Monday to Saturday</th><td>7:30 am to 4:00 pm</td></tr>
          <tr><th scope="row">Sunday</th><td>8:00 am to 2:00 pm</td></tr>
          <tr><th scope="row">Closed</th><td>Christmas Day, Boxing Day, New Year's Day</td></tr>
        </tbody></table>
        <a className="btn btn-ink" href={shop.walk} target="_blank" rel="noopener">Walking route from the ship</a>
        <p><a className="tel tnum" href={`tel:${shop.phone.tel}`}>{shop.phone.label}</a> · <a href={`mailto:${shop.email}`}>{shop.email}</a></p>
        <p className="fine">Ordering more than 50 cakes? Give the bakery 48 hours' notice.</p>
      </div>
    </section>
  )
}

const FAQ = [
  ['Do the cakes need refrigeration?', 'No. The cakes are shelf stable and need no refrigeration.'],
  ['Can I take them on a cruise ship or a plane?', 'Yes. They are cruise ship and airport approved, and you can carry them on. The bakery cannot deliver to the ships.'],
  ['What allergens do they contain?', 'Egg, wheat, soy and milk. Pecans are only in the Original with Pecans.'],
  ['Are they sugar-free, gluten-free, organic or kosher?', 'No, none of these.'],
  ['Can I taste before I buy?', 'Yes, free samples are offered at the bakery on East Bay Street. Samples are not mailed.'],
  ['How is shipping charged?', 'By USPS, UPS or FedEx, Ground, Priority or Express, priced by dimensional weight at checkout. Ground shipping is free on US orders over $55.'],
  ['I need a lot of cakes. How much notice?', 'For orders of more than 50 cakes, give 48 hours\' notice. Call (242) 328-3750 or email bahamasrumcake@gmail.com.'],
]
export function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-h">
      <h2 id="faq-h">Before you buy.</h2>
      <div className="faq__list">
        {FAQ.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>
  )
}

export function More() {
  const items = [
    { t: '20 oz two-packs', p: twopacks[0]?.v[0].p, i: twopacks.find(x => x.v[0].ok)?.img, href: 'shop.html#two-packs' },
    { t: 'Six packs by flavour', p: sixpacks[0]?.v[0].p, i: sixpacks.find(x => x.name.startsWith('Mixed'))?.img, href: 'shop.html#six-packs' },
    { t: 'Hair and skin care', p: null, i: other.find(x => x.name === 'Vanilla Sugar Scrub')?.img, href: 'shop.html#hair-and-skin' },
    { t: 'T-shirts', p: null, i: other.find(x => x.cat === 'Apparel')?.img, href: 'shop.html#apparel' },
  ]
  return (
    <section className="more" aria-labelledby="more-h">
      <div className="more__head"><h2 id="more-h">More from the shop.</h2><a className="ul" href="shop.html">Shop all {flavours.length + sixpacks.length + twopacks.length + other.length + 1} products</a></div>
      <ul className="more__row">
        {items.map(x => (
          <li key={x.t}><a href={x.href}><img src={img(x.i, 600)} alt="" loading="lazy" width={600} height={600} /><b>{x.t}</b>{x.p ? <span className="tnum">{money(x.p)}</span> : <span>From the factory shop</span>}</a></li>
        ))}
      </ul>
    </section>
  )
}

export function Foot() {
  return (
    <footer className="foot">
      <p><b>Bahamas Rum Cake Factory</b> · {shop.address} · <a href={`tel:${shop.phone.tel}`} className="tnum">{shop.phone.label}</a></p>
      <p>{shop.hours}. <a href={`mailto:${shop.email}`}>{shop.email}</a></p>
      <p>Free shipping on US orders over $55. <a href={STORE}>The factory's online store</a> · <a href={ETSY}>Etsy, outside the US</a></p>
      <p className="fine">Photography: Bahamas Rum Cake Factory.</p>
    </footer>
  )
}

export function Dock() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.querySelector('.hero')
    if (!hero) { setShow(true); return }
    const o = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.15 }); o.observe(hero)
    return () => o.disconnect()
  }, [])
  return (
    <nav className="dock" aria-label="Quick" data-hidden={!show}>
      <a href="./#h1">Flavours</a><a href="./#six">Six pack</a><a href="./#visit">Visit the bakery</a><BagButton className="dock__bag" />
    </nav>
  )
}
