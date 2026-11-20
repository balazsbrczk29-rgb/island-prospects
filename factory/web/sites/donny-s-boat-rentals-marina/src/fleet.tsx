import { ArrowRight } from 'lucide-react'
import { Page, mount, WhatsAppGlyph } from './site'
import { FLEET, usd, wix, wa, type Boat } from './data'

const FULL_TERMS = [
  'The rental is paid in full before it starts. There is no ATM on the island and credit cards are not accepted.',
  'Return the boat, engine and equipment in the condition you took them.',
  'Return the boat with the same fuel level. Missing fuel is charged at $1 over the price per gallon.',
  'You are responsible for any damage caused during the rental, including sinking through neglect.',
  'There is no refund or credit for days not used because of the weather.',
  'A $100 non-refundable deposit is required.',
  'The boat is used between sunrise and sunset only.',
  'Collect the boat no earlier than 8 am and return it by 5 pm EST or 6 pm EDT. Late returns are charged at $30 an hour.',
  'Use the boat inside the Sea of Abaco. Ocean fishing within one mile of shore only if the weather allows, agreed with Donny at the start and noted on the rental form. On the ocean side you are responsible for all costs if the boat is lost, whatever the cause.',
  'When docking, anchoring or securing the boat, allow for the weather and the tide to avoid damage to the boat, the dock, other boats and people.',
  'If damage from your rental keeps the boat out of service, you pay a reasonable cost for the rental days lost.',
]

function BoatSection({ b, i }: { b: Boat; i: number }) {
  const [a, c, d] = b.photos
  const flip = i % 2 === 1
  return (
    <section id={b.id} aria-labelledby={`t-${b.id}`} className="px-5 md:px-[4vw] py-16 md:py-24 border-t border-line scroll-mt-4">
      <div className={`grid gap-10 lg:gap-[4vw] lg:grid-cols-[1.35fr_1fr] items-start ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="ph col-span-2 aspect-[3/2] rounded-[var(--radius-md)]"><img src={wix(a, 1600)} alt={`Donny's ${b.name}`} loading={i ? 'lazy' : 'eager'} decoding="async" /></div>
          <div className="ph aspect-[4/3] rounded-[var(--radius-md)]"><img src={wix(c, 800)} alt={`The ${b.name}, another view`} loading="lazy" decoding="async" /></div>
          <div className="ph aspect-[4/3] rounded-[var(--radius-md)]"><img src={wix(d, 800)} alt={`On board the ${b.name}`} loading="lazy" decoding="async" /></div>
        </div>
        <div className="lg:sticky lg:top-10">
          <h2 id={`t-${b.id}`} className="text-[2.75rem] md:text-[4.25rem] tracking-[-0.045em]">{b.name}</h2>
          <p className="mt-3 text-[1.25rem]">{b.hp} 4-stroke engine. Suits {b.people}.</p>
          <p className="mt-8 tnum flex flex-wrap gap-x-10 gap-y-4">
            <span><span className="block font-display font-semibold text-[3rem] tracking-[-0.045em] leading-none">{usd(b.day)}</span><span className="text-muted">a day</span></span>
            <span><span className="block font-display font-semibold text-[3rem] tracking-[-0.045em] leading-none">{usd(b.week)}</span><span className="text-muted">for 7 days</span></span>
          </p>
          <p className="mt-4 text-muted">Three days minimum{b.experience ? '. Boating experience needed.' : '.'}</p>
          <p className="mt-8 font-semibold">On board</p>
          <ul className="mt-3 flex flex-wrap gap-2 list-none p-0">
            {b.kit.map(k => <li key={k} className="px-3.5 py-1.5 rounded-full bg-flats/70 text-[0.9375rem]">{k}</li>)}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="btn btn-primary" href={`index.html?boat=${b.id}#plan`}>Plan this boat<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" /></a>
            <a className="inline-flex items-center gap-2 min-h-11 font-semibold underline decoration-[1.5px] underline-offset-[6px]" href={wa(`Hello Taylor, is the ${b.name} free for my dates on Green Turtle Cay?`)} target="_blank" rel="noopener"><WhatsAppGlyph size={18} />Ask if it&rsquo;s free</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fleet() {
  return (
    <Page current="fleet">
      <section aria-labelledby="fleet-h1" className="px-5 md:px-[4vw] pt-12 md:pt-20 pb-14 md:pb-20">
        <h1 id="fleet-h1" className="text-[3.25rem] md:text-[clamp(4.5rem,8vw,8.5rem)] tracking-[-0.05em] leading-[0.92] max-w-[12ch]">Four boats, 17 to 23 feet</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-[54ch] text-[1.1875rem] text-muted">All 4-stroke, all with VHF and buoyancy aids, kept at Donny&rsquo;s dock at the end of Black Sound. Only for guests staying on Green Turtle Cay. Block ice for sale at the dock.</p>
          <nav aria-label="Boats on this page" className="flex flex-wrap gap-2">
            {FLEET.map(b => <a key={b.id} href={`#${b.id}`} className="min-h-11 inline-flex items-center px-4 rounded-full shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-ink hover:text-white transition-colors font-medium">{b.short}</a>)}
          </nav>
        </div>
      </section>
      {FLEET.map((b, i) => <BoatSection key={b.id} b={b} i={i} />)}
      <section id="terms" aria-labelledby="terms-h" className="bg-sand px-5 md:px-[4vw] py-20 md:py-28 scroll-mt-4">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-[6vw]">
          <h2 id="terms-h" className="text-[2.5rem] md:text-[3.75rem] tracking-[-0.045em] max-w-[10ch]">Rental terms, in full</h2>
          <ol className="grid gap-5 m-0 pl-6 marker:text-muted marker:font-semibold max-w-[70ch]">
            {FULL_TERMS.map(t => <li key={t} className="pl-2">{t}</li>)}
          </ol>
        </div>
      </section>
    </Page>
  )
}
mount(<Fleet />)
