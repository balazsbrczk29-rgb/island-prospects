import { ArrowRight } from 'lucide-react'
import { Page, mount, WhatsAppGlyph, WA_DEFAULT } from './site'
import Hero from './Hero'
import Compare from './Compare'
import RouteCard from './RouteCard'
import { P, TERMS, MARINA, ENTRY_NOTE, wix, srcSet, usd, PHONE, TEL, PHONE_US, TEL_US, EMAIL, WA_NUMBER } from './data'

const textLink = 'inline-flex items-center gap-2 min-h-11 font-semibold underline decoration-[1.5px] underline-offset-[6px] hover:decoration-[3px]'

function Terms() {
  return (
    <section id="terms" aria-labelledby="terms-title" className="bg-sand px-5 lg:px-[max(24px,3vw)] py-20 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <h2 id="terms-title" className="h2 max-w-[12ch]">No ATM on the island: the terms before you go</h2>
          <p className="mt-5 max-w-[38ch] text-muted">Green Turtle Cay runs on cash and the weather. These are Donny&rsquo;s rental terms in plain words.</p>
          <a href="fleet.html#terms" className={`mt-6 ${textLink}`}>The full terms<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" /></a>
        </div>
        <dl className="lg:col-span-7 grid gap-x-12 gap-y-9 sm:grid-cols-2 m-0">
          {TERMS.map(([t, d]) => (
            <div key={t}>
              <dt className="font-display font-semibold text-[1.375rem] tracking-[-0.03em] leading-tight">{t}</dt>
              <dd className="m-0 mt-2 text-muted max-w-[40ch]">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Marina() {
  const openFit = () => window.dispatchEvent(new Event('donny:fit'))
  return (
    <section id="marina" aria-labelledby="marina-title" className="bg-flats px-5 lg:px-[max(24px,3vw)] py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6 items-center">
        <div className="lg:col-span-6 ph aspect-[4/3] rounded-[var(--radius-lg)]">
          <img src={wix(P.dockAir, 1400)} srcSet={srcSet(P.dockAir, [800, 1400])} sizes="(min-width: 1024px) 48vw, 100vw" width={1400} height={1050} loading="lazy" decoding="async"
            alt="Donny's dock from the air: the walkway, boats alongside and the mooring field in Black Sound" />
        </div>
        <div className="lg:col-span-6 lg:pl-[3vw]">
          <h2 id="marina-title" className="h2 max-w-[15ch]">Coming in on your own boat? Dockage to 50 ft, 7 ft draft.</h2>
          <p className="mt-5 max-w-[46ch] text-ink/80">Fixed-price dockage, moorings with plenty of swing room, and Donny living on site. New Plymouth is a ten-minute walk for Customs, restaurants and groceries.</p>
          <table className="mt-9 w-full max-w-[560px] border-collapse tnum text-[0.9375rem] md:text-[1.0625rem]">
            <caption className="sr-only">Donny's published dockage and mooring rates</caption>
            <thead><tr className="text-left text-ink/75"><th scope="col" className="font-normal pb-2" /><th scope="col" className="font-normal pb-2">A day</th><th scope="col" className="font-normal pb-2">A week</th><th scope="col" className="font-normal pb-2">A month</th></tr></thead>
            <tbody>
              {MARINA.rates.map(r => (
                <tr key={r.label} className="border-t border-ink/15">
                  <th scope="row" className="text-left font-semibold py-3 pr-3">{r.label}</th>
                  <td className="py-3">{usd(r.day)}</td><td className="py-3">{usd(r.week)}</td><td className="py-3">{usd(r.month.valueOf())}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[0.9375rem] text-ink/80 tnum">30 amp: +$5 a day, +$20 a week, +$100 a month. {MARINA.extras.map(([k, v]) => `${k} ${v}`).join(', ')}.</p>
          <p className="mt-6 max-w-[50ch] text-[0.9375rem]"><span className="font-semibold">The way in: </span>{ENTRY_NOTE}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <button type="button" onClick={openFit} className="btn btn-primary">Check if your boat fits</button>
            <a href="marina.html" className={textLink}>All marina details<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" data-quiet aria-labelledby="contact-title" className="px-5 lg:px-[max(24px,3vw)] py-20 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6 items-center">
        <div className="lg:col-span-7">
          <h2 id="contact-title" className="h2 max-w-[14ch]">Ask Taylor on WhatsApp, or find Donny at the dock.</h2>
          <a href={WA_DEFAULT} target="_blank" rel="noopener" className="mt-10 inline-flex items-center gap-4 group">
            <span className="grid place-items-center size-16 rounded-full bg-channel text-white transition-transform duration-200 group-hover:scale-105 group-active:scale-95"><WhatsAppGlyph size={28} /></span>
            <span className="font-display font-semibold text-[2.25rem] md:text-[3.25rem] tracking-[-0.04em] tnum leading-none">{WA_NUMBER}</span>
          </a>
          <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 max-w-[660px] m-0">
            <div><dt className="text-muted">At the marina</dt><dd className="m-0 mt-1"><a className="inline-flex items-center min-h-11 font-semibold tnum text-[1.25rem] hover:underline" href={TEL}>{PHONE}</a></dd></div>
            <div><dt className="text-muted">From the US</dt><dd className="m-0 mt-1"><a className="inline-flex items-center min-h-11 font-semibold tnum text-[1.25rem] hover:underline" href={TEL_US}>{PHONE_US}</a></dd></div>
            <div><dt className="text-muted">On the water</dt><dd className="m-0 mt-1 font-semibold text-[1.25rem]">VHF 16, working 10</dd></div>
            <div><dt className="text-muted">Open</dt><dd className="m-0 mt-1 font-semibold text-[1.25rem] tnum">8 am to 8 pm</dd></div>
            <div><dt className="text-muted">Bookings by email</dt><dd className="m-0 mt-1"><a className="inline-flex items-center min-h-11 font-semibold text-[1.0625rem] break-all hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt className="text-muted">Position</dt><dd className="m-0 mt-1 font-semibold text-[1.0625rem] tnum">N 26&deg; 45.460&prime; W 077&deg; 19.301&prime;</dd></div>
          </dl>
        </div>
        <div className="lg:col-span-5 ph aspect-[4/5] rounded-[var(--radius-lg)]">
          <img src={wix(P.donnysBoat, 1200)} width={1200} height={900} alt="A Donny's Boat Rentals boat on calm turquoise water off Green Turtle Cay" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <Page current="home">
      <Hero />
      <Compare />
      <RouteCard />
      <Terms />
      <Marina />
      <Contact />
    </Page>
  )
}
mount(<Home />)
