import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { flavours, img, mix, twopacks, sixpacks, other, shop, money, STORE, CDN, type Flavour } from './data'
import { useCart, BagButton } from './cart'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const [f, setF] = useState<Flavour>(flavours[0])
  const { add, setOpen } = useCart()
  const v20 = f.v.find(v => v.t === '20 oz')!; const v4 = f.v.find(v => v.t === '4 oz')!
  const buy = (v: typeof v20) => { add({ id: v.id, name: `${f.name} Rum Cake`.replace('Kentucky Bourbon Rum Cake', 'Kentucky Bourbon Cake'), size: v.t, price: v.p, img: img(f.img, 200) }); setOpen(true) }
  return (
    <section className={'hero' + (f.dark ? ' is-dark' : '')} style={{ background: f.ground }} aria-labelledby="h1">
      <div className="hero__photo">
        <AnimatePresence initial={false}>
          <motion.img key={f.handle} src={img(f.img, 2400)} alt={`${f.name} rum cake, a 20 oz bundt, on a ${f.name.toLowerCase()} coloured ground`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} fetchPriority="high" width={2718} height={2048} />
        </AnimatePresence>
      </div>
      <header className="top">
        <a className="mark" href="./">Bahamas Rum Cake Factory</a>
        <nav aria-label="Site" className="top__nav"><a href="#six">Six pack</a><a href="#story">Since 2000</a><a href="#visit">Visit</a><a href="shop.html">Shop all</a></nav>
        <BagButton />
      </header>
      <div className="hero__type">
        <h1 id="h1">The Official Rum Cake of The&nbsp;Bahamas.</h1>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={f.handle} className="hero__flav" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {f.name}, marinated in Ole Nassau Bahamian Rum
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="price">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={f.handle} className="price__name" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>{f.name}</motion.p>
        </AnimatePresence>
        {[v20, v4].map(v => (
          <div className="price__row" key={v.t}>
            <span><b>{v.t}</b><em className="tnum">{money(v.p)}</em></span>
            {v.ok ? <button type="button" className="btn btn-ink" onClick={() => buy(v)}>Add to bag</button> : <span className="sold">Sold out</span>}
          </div>
        ))}
      </div>
      <div className="chips" role="radiogroup" aria-label="Flavour">
        {flavours.map(x => (
          <button key={x.handle} type="button" role="radio" aria-checked={x.handle === f.handle} onClick={() => setF(x)}>
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
  const v = mix.v[0]
  const go = () => { add({ id: v.id, name: 'Six Pack, mix and match', size: '6 x 4 oz', price: v.p, img: img(mix.img, 200), note: 'Six pack flavours: ' + slots.join(', ') }); setOpen(true); setSlots([]) }
  return (
    <section className="six" id="six" aria-labelledby="six-h">
      <div className="six__copy">
        <img className="six__pack" src={img('Six_Pack_Mixed.png', 700)} alt="The Rum Cake Factory six pack box with six 4 oz cakes" loading="lazy" width={300} height={300} />
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

export function Visit() {
  return (
    <section className="visit" id="visit" aria-labelledby="visit-h">
      <img className="visit__img" src={CDN + 'Carnival_3_smiling__customers_six_packs.jpg?width=2400'} alt="Customers outside the Rum Cake Factory's turquoise shopfront on East Bay Street, holding six packs" loading="lazy" width={2400} height={1600} />
      <div className="visit__card">
        <h2 id="visit-h">In Nassau? Come taste first.</h2>
        <p className="visit__addr">{shop.address}</p>
        <p>{shop.hours}</p>
        <a className="tel tnum" href={`tel:${shop.phone.tel}`}>{shop.phone.label}</a>
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
          <li key={x.t}><a href={x.href}><img src={img(x.i, 600)} alt="" loading="lazy" width={300} height={300} /><b>{x.t}</b>{x.p ? <span className="tnum">{money(x.p)}</span> : <span>From the factory shop</span>}</a></li>
        ))}
      </ul>
    </section>
  )
}

export function Foot() {
  return (
    <footer className="foot">
      <p><b>Bahamas Rum Cake Factory</b> · {shop.address} · <a href={`tel:${shop.phone.tel}`} className="tnum">{shop.phone.label}</a></p>
      <p>Free shipping on US orders over $55. <a href={STORE}>The factory's online store</a></p>
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
      <a href="./#h1">Flavours</a><a href="./#six">Six pack</a><a href="./#visit">Visit</a><BagButton className="dock__bag" />
    </nav>
  )
}
