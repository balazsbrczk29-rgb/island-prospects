import { Masthead, Footer, mount } from "./site"
import Atlas from "./Atlas"
import { PROJECTS, PHONE, TEL } from "./data"

function ProjectsPage() {
  return (
    <>
      <Masthead current="Projects" />
      <main id="main" className="bg-[var(--color-white)]">
        <div className="wrap pt-16 pb-12 lg:pt-28 lg:pb-16 grid gap-8 lg:grid-cols-12 items-end">
          <h1 className="lg:col-span-7 text-[clamp(2.6rem,1.4rem+3.6vw,5rem)] max-w-[12ch]">{PROJECTS.length} projects across The Bahamas.</h1>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[42ch]">Runways, roads, ports, sea defences, water and wastewater plants, resort infrastructure and buildings. Filter by the kind of work; every project opens its full page.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a href="index.html#quote" className="btn">Request a quote</a>
              <a href={`tel:${TEL}`} className="link mono text-sm">{PHONE}</a>
            </div>
          </div>
        </div>
        <div className="wrap pb-28 lg:pb-40"><Atlas thumbs /></div>
      </main>
      <Footer />
    </>
  )
}
mount(<ProjectsPage />)
