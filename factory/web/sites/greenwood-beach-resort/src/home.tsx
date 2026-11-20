import { Page, mount, IMG, Photo } from "./site"
import { Hero, HomeHeroActions, FilmStage } from "./Film"
import { RoomPicker } from "./Booking"
import { Whitetips } from "./Whitetips"
import { EndCredits } from "./Route"

function TitleCard() {
  const credits: [string, string][] = [
    ["Kept by", "Pauline and Antoine"],
    ["On the water", "Diving, kitesurfing, snorkel trips"],
    ["At the table", "Breakfast, lunch and dinner"],
    ["Where", "South Cat Island, 24.19° N 75.31° W"],
  ]
  return (
    <section aria-labelledby="place-title" className="px-[var(--gutter)] pt-[var(--s-16)] pb-[var(--s-12)] md:pb-[var(--s-16)]">
      <h2 id="place-title" className="mono-word">
        <span className="block">Port</span>
        <span className="block pl-[1.1em] md:inline md:pl-[0.25em]">Howe</span>
      </h2>
      <p className="mt-10 max-w-[30ch] text-[length:var(--t-xl)] leading-[1.25] md:mt-14 md:ml-[calc(100%/12*5)]">
        A small resort on the Atlantic shore of Cat Island, where the day is decided by the water.
      </p>
      <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
        {credits.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[length:var(--t-sm)] italic text-muted">{k}</dt>
            <dd className="num mt-1">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Hosts() {
  return (
    <section aria-labelledby="hosts-title" className="grid gap-10 px-[var(--gutter)] py-[var(--s-16)] md:grid-cols-12 md:gap-8">
      <Photo img={IMG.hosts} alt="Pauline and Antoine standing on Greenwood's beach under the old wooden shade, their dog behind them" className="aspect-[3/2] w-full md:col-span-7" />
      <div className="grid content-end gap-6 md:col-span-4 md:col-start-9">
        <h2 id="hosts-title" className="display text-[length:var(--t-2xl)]">Pauline and Antoine</h2>
        <p>They manage Greenwood, and they are known for making guests feel at home. The diving and the kitesurfing are supervised by professionals; the cooking is homemade, inspired by the ocean and the island.</p>
        <figure className="border-t border-line pt-6">
          <blockquote className="text-[length:var(--t-lg)] italic leading-[1.45]">"Remote, peaceful and beautiful. Perfect place to disconnect and enjoy nature."</blockquote>
          <figcaption className="mt-3 text-[length:var(--t-sm)] text-muted">Mark Simmerman, Google review</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Rooms() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="bg-ground-2 px-[var(--gutter)] py-[var(--s-16)]">
      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:gap-8">
        <h2 id="rooms-title" className="display text-[length:var(--t-2xl)] md:col-span-6">Two rooms, in the garden by the sand</h2>
        <p className="self-end text-muted md:col-span-5 md:col-start-8">Pick a room and your dates. Live rates and availability open on Greenwood's own booking page, so you book direct.</p>
      </div>
      <RoomPicker />
      <p className="mt-12"><a href="rooms.html" className="link">Both rooms in detail, and meal times</a></p>
    </section>
  )
}

mount(
  <Page>
    <Hero img={IMG.kiteLesson} alt="A kitesurf instructor and student on Greenwood's beach, an orange kite over turquoise water"
      title={<>The beach at Port{" "}Howe, Cat{" "}Island.</>} actions={<HomeHeroActions />}>
      <p className="max-w-[44ch] text-[length:var(--t-base)] text-muted">Greenwood Beach Resort: Pauline and Antoine's small beachfront resort at the south end of Cat Island, for divers, kiters and anyone who wants a quiet beach.</p>
    </Hero>
    <TitleCard />
    <FilmStage />
    <Hosts />
    <Rooms />
    <Whitetips />
    <EndCredits />
  </Page>,
)
