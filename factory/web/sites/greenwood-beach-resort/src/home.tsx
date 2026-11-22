import { Page, mount, IMG } from "./site"
import { FilmStage } from "./Film"
import { HomeHero, RoomsCompare } from "./Hero"
import { Whitetips } from "./Whitetips"
import { EndCredits } from "./Route"

/* The opening title after the first screen: who keeps the place, in their own words and a guest's. */
function Hosts() {
  return (
    <section aria-labelledby="hosts-title" className="px-[var(--gutter)] pt-[var(--s-12)] pb-[var(--s-12)] md:pt-[var(--s-16)]">
      <div className="grid gap-8 md:grid-cols-12 md:gap-8">
        <h2 id="hosts-title" className="display text-[length:var(--t-2xl)] md:col-span-5">A small resort, kept by two people.</h2>
        <div className="grid gap-8 md:col-span-6 md:col-start-7">
          <p className="text-[length:var(--t-lg)] leading-[1.5]">Pauline and Antoine manage Greenwood,. The diving and the kitesurfing are supervised by professionals. The cooking is homemade, inspired by the ocean and the island.</p>

        </div>
      </div>
      <figure className="mx-auto mt-14 max-w-[720px] md:mt-20">
        <img src={IMG.hosts.src} alt="Pauline and Antoine on Greenwood's white beach at Port Howe, the sea to the left and the old wooden shade above them" width={1024} height={682} loading="lazy" decoding="async" className="block h-auto w-full" />
        <figcaption className="mt-3 text-[length:var(--t-sm)] italic text-muted">Pauline and Antoine, on the beach in front of the rooms.</figcaption>
      </figure>
    </section>
  )
}

mount(
  <Page>
    <HomeHero />
    <RoomsCompare />
    <FilmStage />
    <Whitetips />
    <Hosts />
    <EndCredits />
  </Page>,
)
