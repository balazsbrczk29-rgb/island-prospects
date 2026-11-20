import { ArrowRight } from 'lucide-react'
import { Page, mount, WhatsAppGlyph, WA_DEFAULT } from './site'
import Hero from './Hero'
import FleetTrack from './FleetTrack'
import Planner from './Planner'
import DayFilm from './DayFilm'
import { P, TERMS, MARINA, wix, srcSet, usd, PHONE, TEL, EMAIL, WA_NUMBER } from './data'

function Terms() {
  return (
    <section aria-labelledby="terms-title" className="px-5 md:px-[4vw] py-20 md:py-32 border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-[6vw]">
        <div>
          <h2 id="terms-title" className="text-[2.5rem] md:text-[4rem] tracking-[-0.045em] max-w-[11ch]">Good to know before you go</h2>
          <p className="mt-5 max-w-[38ch] text-muted">Green Turtle Cay runs on cash and the weather. These are Donny&rsquo;s rental terms in plain words.</p>
          <a href="fleet.html#terms" className="mt-6 inline-flex items-center gap-2 min-h-11 font-semibold underline decoration-[1.5px] underline-offset-[6px] hover:decoration-[3px]">The full terms<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" /></a>
        </div>
        <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2 m-0">
          {TERMS.map(([t, d]) => (
            <div key={t}>
              <dt className="font-display font-semibold text-[1.5rem] tracking-[-0.03em] leading-tight">{t}</dt>
              <dd className="m-0 mt-2 text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function MarinaTeaser() {
  const [moor, small] = MARINA.rates
  return (
    <section aria-labelledby="marina-title" className="bg-flats">
      <div className="grid lg:grid-cols-[1.2fr_1fr] items-stretch">
        <div className="ph min-h-[320px] lg:min-h-[86svh]">
          <img src={wix(P.soundAir, 1800)} srcSet={srcSet(P.soundAir, [900, 1800])} sizes="(min-width: 1024px) 55vw, 100vw" loading="lazy" decoding="async"
            alt="Aerial photograph of Black Sound and New Plymouth, marked by Donny's with the dock and the mooring field" />
        </div>
        <div className="px-5 md:px-[4vw] py-16 md:py-24 flex flex-col justify-center">
          <h2 id="marina-title" className="text-[2.5rem] md:text-[4rem] tracking-[-0.045em] max-w-[12ch]">Coming in on your own boat?</h2>
          <p className="mt-5 max-w-[42ch] text-ink/80">Fixed-price dockage up to 50 ft LOA and 7 ft draft, moorings with plenty of swing room, and New Plymouth a ten-minute walk away. Donny lives on site.</p>
          <div className="mt-10 grid grid-cols-2 gap-8 max-w-[460px]">
            <p className="tnum"><span className="block font-display font-semibold text-[3rem] tracking-[-0.045em] leading-none">{usd(small.day)}</span><span className="block mt-2 text-ink/80">a day at the dock, 45 ft and under</span></p>
            <p className="tnum"><span className="block font-display font-semibold text-[3rem] tracking-[-0.045em] leading-none">{usd(moor.day)}</span><span className="block mt-2 text-ink/80">a day on a mooring</span></p>
          </div>
          <a href="marina.html" className="btn btn-ghost mt-10 self-start">Dockage, rates and the way in<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" data-quiet aria-labelledby="contact-title" className="px-5 md:px-[4vw] py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-[5vw] items-center">
        <div>
          <h2 id="contact-title" className="text-[2.5rem] md:text-[4.25rem] tracking-[-0.045em] max-w-[14ch]">Ask Taylor on WhatsApp, or find Donny at the dock.</h2>
          <a href={WA_DEFAULT} target="_blank" rel="noopener" className="mt-10 inline-flex items-center gap-4 group">
            <span className="grid place-items-center size-16 rounded-full bg-channel text-white transition-transform duration-200 group-hover:scale-105"><WhatsAppGlyph size={28} /></span>
            <span className="font-display font-semibold text-[2.25rem] md:text-[3.25rem] tracking-[-0.04em] tnum leading-none">{WA_NUMBER}</span>
          </a>
          <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 max-w-[640px] m-0">
            <div><dt className="text-muted">Phone at the marina</dt><dd className="m-0 mt-1"><a className="font-semibold tnum text-[1.25rem] hover:underline" href={TEL}>{PHONE}</a></dd></div>
            <div><dt className="text-muted">Email, preferred for bookings</dt><dd className="m-0 mt-1"><a className="font-semibold text-[1.125rem] break-all hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt className="text-muted">On the water</dt><dd className="m-0 mt-1 font-semibold text-[1.25rem]">VHF 16, working 10</dd></div>
            <div><dt className="text-muted">Open</dt><dd className="m-0 mt-1 font-semibold text-[1.25rem] tnum">8 am to 8 pm</dd></div>
            <div className="sm:col-span-2"><dt className="text-muted">Where</dt><dd className="m-0 mt-1 font-semibold text-[1.125rem]">End of Black Sound, Green Turtle Cay, Abaco. <span className="font-normal text-muted tnum">N 26&deg; 45.460&prime; W 077&deg; 19.301&prime;</span></dd></div>
          </dl>
        </div>
        <div className="ph aspect-[4/5] rounded-[var(--radius-lg)]">
          <img src={wix(P.teal, 1200)} alt="A teal Boston Whaler from Donny's fleet tied at the dock in clear water" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}

function Opening() {
  return (
    <section aria-label="At a glance" className="px-5 md:px-[4vw] pt-20 md:pt-32 pb-4">
      <p className="font-display font-semibold text-[2rem] md:text-[3.5rem] tracking-[-0.04em] leading-[1.04] max-w-[22ch]">
        Collect your boat at 8, island hop all day, be back at the dock by 5. From $125 a day.
      </p>
    </section>
  )
}

function Home() {
  return (
    <Page current="home">
      <Hero />
      <Opening />
      <FleetTrack />
      <Planner />
      <DayFilm />
      <Terms />
      <MarinaTeaser />
      <Contact />
    </Page>
  )
}
mount(<Home />)
