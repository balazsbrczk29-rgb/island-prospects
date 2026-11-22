// Screen 2: the four boats side by side, as one honest table (desktop) or four stacked blocks (phone).
import { ArrowUp } from 'lucide-react'
import { FLEET, usd, wix, type Boat } from './data'

const KIT: [string, (k: string) => boolean][] = [
  ['VHF radio', k => k.includes('VHF')],
  ['Chart-plotter', k => k === 'Chart-plotter'],
  ['Stereo', k => k === 'Stereo'],
  ['Trim tabs', k => k === 'Trim tabs'],
  ['Anchor and rode', k => k === 'Anchor and rode'],
  ['Cooler', k => k === 'Cooler'],
  ['Ladder', k => k === 'Ladder'],
  ['Buoyancy aids', k => k === 'Buoyancy aids'],
]
const has = (b: Boat, test: (k: string) => boolean) => b.kit.some(test)
const plan = (id: string) => window.dispatchEvent(new CustomEvent('donny:boat', { detail: id }))

const ROWS: [string, (b: Boat) => string][] = [
  ['Takes', b => b.people],
  ['Engine', b => `${b.hp}, 4-stroke`],
  ['A day', b => usd(b.day)],
  ['7 days', b => usd(b.week)],
  ['Experience', b => (b.experience ? 'Required' : 'Not required')],
]

function Mark({ on }: { on: boolean }) {
  return on
    ? <span className="inline-block size-3 rounded-full bg-channel" role="img" aria-label="Listed" />
    : <span className="inline-block w-3 h-[2px] bg-ink/25 align-middle" role="img" aria-label="Not listed" />
}

function Photo({ b, w }: { b: Boat; w: number }) {
  return (
    <span className="ph block aspect-[4/3] rounded-[var(--radius-md)]">
      <img src={wix(b.cover, w)} width={w} height={Math.round(w * 0.75)} loading="lazy" decoding="async" style={{ objectPosition: b.pos }}
        alt={`The ${b.name} from Donny's rental fleet`} />
    </span>
  )
}

export default function Compare() {
  return (
    <section id="fleet" aria-labelledby="fleet-title" className="px-5 lg:px-[max(24px,3vw)] pt-20 lg:pt-32 pb-20 lg:pb-28 scroll-mt-4">
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6 items-end">
        <h2 id="fleet-title" className="h2 lg:col-span-6 max-w-[16ch]">Four boats, one dock. Which one is yours?</h2>
        <p className="lg:col-span-5 lg:col-start-8 max-w-[46ch] text-muted">All four are 4-stroke and rent for three days or more, only to guests staying on Green Turtle Cay. A week costs less than seven single days.</p>
      </div>

      {/* desktop and tablet: the table */}
      <div className="hidden md:block mt-14">
        <table className="w-full border-collapse table-fixed">
          <caption className="sr-only">Donny's four rental boats compared: seats, engine, prices, experience and equipment</caption>
          <colgroup><col className="w-[15%]" />{FLEET.map(b => <col key={b.id} />)}</colgroup>
          <thead>
            <tr>
              <td />
              {FLEET.map(b => (
                <th key={b.id} scope="col" className="align-bottom text-left font-normal px-3 pb-5">
                  <Photo b={b} w={640} />
                  <span className="mt-4 block font-display font-semibold text-[1.75rem] tracking-[-0.035em] leading-none">{b.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tnum">
            {ROWS.map(([label, val]) => (
              <tr key={label} className="border-t border-line">
                <th scope="row" className="text-left font-semibold text-[0.9375rem] py-3.5 pr-3">{label}</th>
                {FLEET.map(b => <td key={b.id} className={`px-3 py-3.5 ${label === 'A day' || label === '7 days' ? 'font-semibold text-[1.25rem]' : ''}`}>{val(b)}</td>)}
              </tr>
            ))}
            {KIT.map(([label, test]) => (
              <tr key={label} className="border-t border-line">
                <th scope="row" className="text-left font-normal text-muted text-[0.9375rem] py-2.5 pr-3">{label}</th>
                {FLEET.map(b => <td key={b.id} className="px-3 py-2.5"><Mark on={has(b, test)} /></td>)}
              </tr>
            ))}
            <tr className="border-t border-line">
              <td />
              {FLEET.map(b => (
                <td key={b.id} className="px-3 pt-6">
                  <button type="button" onClick={() => plan(b.id)} className="btn btn-ghost w-full !text-[1rem]"><ArrowUp size={17} strokeWidth={1.75} aria-hidden="true" />Plan the {b.short === 'Angler' || b.short === 'Century' ? b.short : b.length.replace(' ft', ' ft Whaler')}</button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* phone: four stacked blocks */}
      <div className="md:hidden"><ul className="track-ul mt-10 -mx-5 !px-5 !gap-4">
        {FLEET.map(b => (
          <li key={b.id}>
            <Photo b={b} w={800} />
            <h3 className="mt-4 text-[1.75rem] tracking-[-0.035em]">{b.name}</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 m-0 tnum">
              {ROWS.map(([label, val]) => (
                <div key={label} className="contents">
                  <dt className="text-muted text-[0.9375rem] border-t border-line pt-2">{label}</dt>
                  <dd className={`m-0 border-t border-line pt-2 ${label === 'A day' || label === '7 days' ? 'font-semibold' : ''}`}>{val(b)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[0.9375rem] text-muted">{b.kit.join(', ')}.</p>
            <button type="button" onClick={() => plan(b.id)} className="btn btn-ghost w-full mt-5">Plan this boat</button>
          </li>
        ))}
      </ul></div>
      <p className="mt-8 text-[0.875rem] text-muted">A dash means the item is not listed on Donny&rsquo;s fleet page. Block ice is for sale at the dock. <a href="fleet.html" className="font-semibold text-ink underline underline-offset-4 decoration-1 hover:decoration-2">Every boat, with more photos</a></p>
    </section>
  )
}
