import { Page, mount, IMG, Photo, BOOK, EMAIL } from "./site"
import { Hero } from "./Film"
import { RoutePicker, TAXIS, CARS, telHref } from "./Route"

mount(
  <Page>
    <Hero img={IMG.poolDive} alt="Greenwood's pool among the palms, with a dive lesson under way and the resort buildings behind"
      title={<>Getting to Port Howe.</>}>
      <p className="max-w-[44ch] text-muted">Cat Island is a short flight from Fort Lauderdale or Nassau into New Bight (CAT). From the airport, an island taxi or a rental car brings you to the door.</p>
      <div><a href="#route" className="btn">Plan the route</a></div>
    </Hero>
    <div className="px-[var(--gutter)]">
      <section id="route" aria-labelledby="route-title" className="grid scroll-mt-24 gap-10 py-[var(--s-16)] md:grid-cols-12 md:gap-8">
        <h2 id="route-title" className="display text-[length:var(--t-2xl)] md:col-span-4">The route</h2>
        <div className="md:col-span-8">
          <RoutePicker />
        </div>
      </section>
      <section aria-labelledby="taxi-title" className="grid gap-10 border-t border-line py-[var(--s-16)] md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 id="taxi-title" className="display text-[length:var(--t-2xl)]">From the airport</h2>
          <p className="mt-5 max-w-[36ch] text-muted">Local drivers know the island and will bring you from New Bight to Greenwood's door. Every rental firm below offers free pick-up and drop-off at New Bight Airport.</p>
        </div>
        <div className="grid gap-12 md:col-span-8">
          <div>
            <h3 className="text-[length:var(--t-sm)] italic text-muted">Taxis</h3>
            <ul className="mt-2">
              {TAXIS.map((t) => (
                <li key={t.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                  <span className="display text-[length:var(--t-xl)]">{t.name}</span>
                  <a href={telHref(t.tel)} className="num link justify-self-start">{t.tel}</a>
                  <span className="text-[length:var(--t-sm)] text-muted sm:col-span-2">{t.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[length:var(--t-sm)] italic text-muted">Car rentals</h3>
            <ul className="mt-2">
              {CARS.map((c) => (
                <li key={c.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                  <span className="display text-[length:var(--t-xl)]">{c.name}</span>
                  <a href={telHref(c.tel)} className="num link justify-self-start">{c.tel}</a>
                  <span className="text-[length:var(--t-sm)] text-muted sm:col-span-2">{c.place}. {c.fleet}.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section aria-labelledby="arrive-title" className="grid gap-10 border-t border-line py-[var(--s-16)] md:grid-cols-12 md:gap-8">
        <Photo img={IMG.hosts} alt="Pauline and Antoine on the beach at Greenwood" className="aspect-[3/2] w-full md:col-span-7" />
        <div className="grid content-end gap-6 md:col-span-4 md:col-start-9">
          <h2 id="arrive-title" className="display text-[length:var(--t-2xl)]">Then, the beach.</h2>
          <p>Tell Pauline and Antoine your flight and they will help with the rest, including the MakersAir promo code for Greenwood guests.</p>
          <div className="flex flex-col gap-4">
            <a href={BOOK} className="btn self-start">Check dates and book</a>
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Arrival on Cat Island")}`} className="link self-start">{EMAIL}</a>
          </div>
        </div>
      </section>
    </div>
  </Page>,
)
