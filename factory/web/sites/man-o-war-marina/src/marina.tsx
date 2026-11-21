import { BIZ, PHOTO } from './data'
import { Colophon, Masthead, MobileStrip, Photo, mount } from './site'

const SERVICES: { h: string; lines: string[]; extra?: React.ReactNode }[] = [
  { h: 'Dockage', lines: ['Twenty-three slips for vessels up to 120 feet long and up to 20 feet in beam.', 'Drafts to 7 feet, even at low tide.', '30 and 50 amp power and water at every slip.', 'Assisted docking: call on VHF channel 16.'],
    extra: <a className="lnk" href={BIZ.rates} target="_blank" rel="noopener">Dockage rates (PDF)</a> },
  { h: 'Fuel, dockside and roadside', lines: ['The only fuelling station on the island, for boaters and drivers.', 'Gasoline and diesel.', 'Dockside: Monday to Saturday, 8 to 12 and 1 to 4.', 'Roadside: Monday to Saturday, 9 to 12 and 2 to 4.', 'Fuel prices move with the market; ask the office for today’s.'] },
  { h: 'Dock N’ Dine', lines: ['The waterfront restaurant: local and international cooking for marina guests, islanders and off-island visitors.', 'Lunch, dinner or ice cream with a harbour-side view.', 'Lunch Monday to Saturday, 11 to 3.'],
    extra: <a className="lnk tab" href={`tel:${BIZ.restaurantTel}`}>{BIZ.restaurantPhone}</a> },
  { h: 'Office and gift shop', lines: ['One room for both: custom t-shirts, local art and marine grade dive gear.', 'Ask here about anything on Man‑O‑War.', 'Monday to Saturday, 8 to 12 and 1 to 4.'] },
  { h: 'For marina guests', lines: ['Clean restrooms and spacious showers.', 'Laundry facilities and a grill area.', 'The pool, to lounge at your leisure.'] },
  { h: 'Open to everyone', lines: ['The restaurant, the gift shop and the fuel dock are open to the public.', 'Showers, restrooms, laundry, the grill and shore power are for marina guests.', 'Need your water tank filled? Ask at the office.'] },
]

function Marina() {
  return (
    <>
      <Masthead current="marina.html" />
      <main id="main">
        <section className="page-head wrap" aria-labelledby="pg-h">
          <div className="ph-grid">
            <div>
              <h1 id="pg-h" className="h2">Slips, fuel, lunch and a hot shower, all on one dock.</h1>
              <p className="lede">Everything Man&#8209;O&#8209;War Marina offers, with the hours it keeps. To book a slip, call <a className="lnk tab" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a> or <a className="lnk" href="index.html#request">send a request</a>.</p>
            </div>
            <figure className="ph-fig">
              <Photo p={PHOTO.flag} w={1000} h={1250} eager sizes="(max-width: 860px) 100vw, 480px" />
              <figcaption>A finger dock on a bright morning.</figcaption>
            </figure>
          </div>
        </section>
        <section className="svc wrap" aria-label="Services">
          {SERVICES.map(s => (
            <article key={s.h} className="svc-row">
              <h2 className="svc-h">{s.h}</h2>
              <div className="svc-body">
                {s.lines.map(l => <p key={l} className="tab">{l}</p>)}
                {s.extra && <p className="svc-extra">{s.extra}</p>}
              </div>
            </article>
          ))}
        </section>
      </main>
      <Colophon />
      <MobileStrip />
    </>
  )
}
mount(<Marina />)
