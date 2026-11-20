import { useId, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Page, mount } from './site'
import { MARINA, P, wix, srcSet, usd, mail, PHONE, TEL } from './data'

function SlipCheck() {
  const [loa, setLoa] = useState('')
  const [draft, setDraft] = useState('')
  const a = useId(), b = useId()
  const L = parseFloat(loa.replace(',', '.')), D = parseFloat(draft.replace(',', '.'))
  const done = L > 0 && D > 0
  const fits = done && L <= MARINA.loa && D <= MARINA.draft
  const rate = done ? (L >= 46 ? MARINA.rates[2] : MARINA.rates[1]) : null
  return (
    <div className="bg-white rounded-[var(--radius-lg)] p-6 md:p-10">
      <h2 className="text-[2rem] md:text-[2.75rem] tracking-[-0.04em]">Will my boat fit?</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 items-end">
        <div><label htmlFor={a} className="block font-semibold mb-2">Length overall (ft)</label>
          <input id={a} inputMode="decimal" value={loa} onChange={e => setLoa(e.target.value)} placeholder="42" className="w-full h-12 px-4 rounded-[var(--radius-sm)] bg-ground text-[1.25rem] tnum shadow-[inset_0_0_0_1px_var(--color-line)]" /></div>
        <div><label htmlFor={b} className="block font-semibold mb-2">Draft (ft)</label>
          <input id={b} inputMode="decimal" value={draft} onChange={e => setDraft(e.target.value)} placeholder="5.5" className="w-full h-12 px-4 rounded-[var(--radius-sm)] bg-ground text-[1.25rem] tnum shadow-[inset_0_0_0_1px_var(--color-line)]" /></div>
      </div>
      <div aria-live="polite" className="mt-6 min-h-[132px]">
        {!done && <p className="text-muted">Enter your length and draft. Donny&rsquo;s takes up to {MARINA.loa} ft LOA and {MARINA.draft} ft draft at fixed prices.</p>}
        {done && fits && rate && (
          <div>
            <p className="flex items-center gap-3 font-display font-semibold text-[1.75rem] tracking-[-0.03em]"><span className="grid place-items-center size-9 rounded-full bg-channel text-white"><Check size={18} strokeWidth={2.25} /></span>Within Donny&rsquo;s limits</p>
            <p className="mt-3 tnum">{rate.label}: {usd(rate.day)} a day, {usd(rate.week)} a week, {usd(rate.month)} a month. {rate.note}.</p>
            {D >= 6 && <p className="mt-2 text-muted">With {D} ft draft, come in on the tide: a 6 ft draft enters Black Sound when the tide is 2 ft above low water.</p>}
            <a className="btn btn-primary mt-5" href={mail(`Dockage request: ${L} ft LOA, ${D} ft draft`, `Hello Donny, we'd like dockage for a ${L} ft boat with ${D} ft draft. Arrival date: \nNights: \nBoat name: `)}>Ask Donny for a slip</a>
          </div>
        )}
        {done && !fits && (
          <div>
            <p className="flex items-center gap-3 font-display font-semibold text-[1.75rem] tracking-[-0.03em]"><span className="grid place-items-center size-9 rounded-full bg-ink text-white"><X size={18} strokeWidth={2.25} /></span>Beyond the published limits</p>
            <p className="mt-3">The dock takes up to {MARINA.loa} ft LOA and {MARINA.draft} ft draft. A mooring may still work: ask Donny on VHF 16 or call <a className="font-semibold tnum underline" href={TEL}>{PHONE}</a>.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Marina() {
  return (
    <Page current="marina">
      <section aria-labelledby="m-h1" className="relative">
        <div className="ph h-[44svh] md:h-[min(60vh,560px)]">
          <img src={wix(P.dockAir, 2000)} srcSet={srcSet(P.dockAir, [900, 1600, 2000])} sizes="100vw" fetchPriority="high"
            alt="Donny's dock from the air: sailboats and trawlers on the moorings and at the dock in Black Sound" className="max-md:scale-[1.5] max-md:origin-[50%_15%]" style={{ objectPosition: '50% 30%' }} />
        </div>
        <div className="px-5 md:px-[4vw] pt-10 md:pt-14 pb-16 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-[5vw] items-end">
          <h1 id="m-h1" className="text-[3rem] md:text-[clamp(4rem,7vw,7rem)] tracking-[-0.05em] leading-[0.92]">Dockage at the end of Black Sound</h1>
          <p className="text-[1.1875rem] text-muted max-w-[46ch]">A cruiser-friendly family marina on Green Turtle Cay: fixed-price dockage to 50 ft LOA and 7 ft draft, moorings with plenty of swing room, and New Plymouth a ten-minute walk away for Customs, restaurants and groceries.</p>
        </div>
      </section>

      <section aria-labelledby="rates-h" className="px-5 md:px-[4vw] py-16 md:py-24 border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-[5vw] items-start">
          <div className="min-w-0">
            <h2 id="rates-h" className="text-[2.5rem] md:text-[3.75rem] tracking-[-0.045em]">Rates</h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[520px] tnum text-left border-collapse">
                <thead><tr className="text-muted text-[0.9375rem]"><th scope="col" className="font-medium pb-3 pr-4"><span className="sr-only">Berth</span></th><th scope="col" className="font-medium pb-3 pr-4">Day</th><th scope="col" className="font-medium pb-3 pr-4">Week</th><th scope="col" className="font-medium pb-3">Month</th></tr></thead>
                <tbody>
                  {MARINA.rates.map(r => (
                    <tr key={r.label} className="border-t border-line align-top">
                      <th scope="row" className="py-5 pr-4 font-semibold">{r.label}<span className="block font-normal text-[0.9375rem] text-muted mt-1">{r.note}</span></th>
                      <td className="py-5 pr-4 font-sans font-semibold text-[1.625rem] tnum">{usd(r.day)}</td>
                      <td className="py-5 pr-4 text-[1.125rem]">{usd(r.week)}</td>
                      <td className="py-5 text-[1.125rem]">{usd(r.month)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-10 font-semibold">On the dock</p>
            <p className="mt-2 text-muted max-w-[56ch]">Clean showers and bathroom, trash disposal, a dinghy dock, 15 to 30 amp electric and fresh water at the docks, and ice. A fuel dock and boat yard are close by.</p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2 list-none p-0 tnum">
              {MARINA.extras.map(([k, v]) => <li key={k}><span className="font-semibold">{k}</span> <span className="text-muted">{v}</span></li>)}
            </ul>
          </div>
          <SlipCheck />
        </div>
      </section>

      <section aria-labelledby="in-h" className="bg-flats">
        <div className="grid lg:grid-cols-[1fr_1.1fr] items-stretch">
          <div className="px-5 md:px-[4vw] py-16 md:py-24 flex flex-col justify-center">
            <h2 id="in-h" className="text-[2.5rem] md:text-[3.75rem] tracking-[-0.045em] max-w-[12ch]">The way in</h2>
            <p className="mt-6 max-w-[44ch] text-[1.1875rem]">With a 6 ft draft, enter Black Sound when the tide is 2 ft above low water. Stay close to the last red marker, then head for the middle of the sound.</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 max-w-[520px] m-0">
              <div><dt className="text-ink/75">Position</dt><dd className="m-0 mt-1 font-semibold tnum">N 26&deg; 45.460&prime;<br />W 077&deg; 19.301&prime;</dd></div>
              <div><dt className="text-ink/75">Radio</dt><dd className="m-0 mt-1 font-semibold">VHF 16, working 10</dd></div>
              <div><dt className="text-ink/75">Office</dt><dd className="m-0 mt-1 font-semibold tnum">8 am to 8 pm</dd></div>
              <div><dt className="text-ink/75">Ashore</dt><dd className="m-0 mt-1 font-semibold">New Plymouth, 10 minutes on foot</dd></div>
            </dl>
          </div>
          {/* the top of Donny's own annotated aerial, cropped above its burned-in labels and shown no larger than the source */}
          <div className="px-5 md:px-[4vw] pb-16 lg:py-24 flex items-center">
            <figure className="m-0 w-full max-w-[640px]">
              <div className="relative aspect-[12/5] overflow-hidden rounded-[var(--radius-md)] bg-flats-deep">
                <img src={wix(P.soundAir, 1280)} loading="lazy" decoding="async" alt="Black Sound and Green Turtle Cay from the air, with the Sea of Abaco beyond"
                  className="absolute inset-0 size-full object-cover" style={{ objectPosition: '50% 0%' }} />
              </div>
              <figcaption className="mt-3 text-[0.9375rem] text-ink/80 max-w-[52ch]">
                <span className="font-semibold text-ink">Black Sound from the air.</span> Donny&rsquo;s dock and mooring field are at the far end of the sound.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="note-h" className="px-5 md:px-[4vw] py-16 md:py-20">
        <h2 id="note-h" className="sr-only">Liability notice</h2>
        <p className="max-w-[80ch] text-[0.9375rem] text-muted">Donny&rsquo;s Boat Rentals is not liable for damage to boats or injury to owners, operators or guests caused by theft, failure of the mooring system, vandalism, accidents, storms, flood, fire or fireworks, or any other cause.</p>
      </section>
    </Page>
  )
}
mount(<Marina />)
