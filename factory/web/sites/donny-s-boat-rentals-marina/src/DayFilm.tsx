// One day with the boat, 8 am to 5 pm, in Donny's own photographs. Desktop: text scrolls on the left while the
// photograph on the right crossfades to the chapter in view (discrete state on chapter change only).
// Phones: each chapter carries its own photo, no pinning.
import { useEffect, useRef, useState } from 'react'
import { P, wix } from './data'

const CHAPTERS = [
  { when: '8 am', title: 'Collect your boat at the end of Black Sound.', text: 'Buy block ice at the dock, fill the cooler and go. The boat is yours until 5.', img: P.morning, alt: "One of Donny's Boston Whalers tied up at the dock in clear water" },
  { when: 'No Name Cay', title: 'The pigs come down to the water.', text: 'The swimming pigs are one of the island hops a boat of your own makes easy.', img: P.pigs, alt: 'Pigs on the beach and in the shallows at No Name Cay' },
  { when: 'Manjack Cay', title: 'Turtles, in water this clear.', text: 'Go slowly over the shallows and look down.', img: P.turtle, alt: 'A sea turtle surfacing beside a hand in clear green water at Manjack Cay' },
  { when: 'Afternoon', title: 'A beach with nobody else on it.', text: 'Anchor off, swim the picnic ashore, snorkel the shallows or put a line out.', img: P.beach, alt: 'An empty white sand beach with footprints and turquoise water' },
  { when: '5 pm', title: 'Back at Donny’s dock.', text: 'By 6 in summer time, with the fuel you left with. Three days minimum, so tomorrow there is another cay.', img: P.walkway, alt: "The dock walkway at Donny's marina with boats either side" },
]

export default function DayFilm() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)) }), { rootMargin: '-45% 0px -45% 0px' })
    refs.current.forEach(r => r && io.observe(r))
    return () => io.disconnect()
  }, [])
  return (
    <section id="day" aria-labelledby="day-title" className="px-5 md:px-[4vw] py-20 md:py-0">
      <div className="md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[5vw]">
        <div>
          <div className="md:h-[60svh] md:flex md:flex-col md:justify-end md:pb-6">
            <h2 id="day-title" className="text-[2.5rem] md:text-[4.5rem] tracking-[-0.045em] max-w-[12ch]">A day from Donny&rsquo;s dock</h2>
          </div>
          <ol className="list-none p-0 m-0">
            {CHAPTERS.map((c, i) => (
              <li key={c.when} ref={el => { refs.current[i] = el }} data-i={i} className="mt-14 md:mt-0 md:min-h-[78svh] md:flex md:flex-col md:justify-center">
                <div className="ph md:hidden aspect-[4/3] rounded-[var(--radius-md)] mb-6"><img src={wix(c.img, 900)} alt={c.alt} loading="lazy" decoding="async" /></div>
                <p className={`font-semibold text-channel transition-opacity duration-500 ${active === i ? 'md:opacity-100' : 'md:opacity-60'}`}>{c.when}</p>
                <h3 className={`mt-2 text-[1.875rem] md:text-[2.75rem] tracking-[-0.04em] max-w-[16ch] transition-opacity duration-500 ${active === i ? 'md:opacity-100' : 'md:opacity-40'}`}>{c.title}</h3>
                <p className="mt-4 max-w-[40ch] text-muted">{c.text}</p>
              </li>
            ))}
          </ol>
          <div className="hidden md:block h-[20svh]" />
        </div>
        <div className="hidden md:block">
          <div className="sticky top-0 h-svh py-[6svh]">
            <div className="relative h-full rounded-[var(--radius-lg)] overflow-hidden bg-flats-deep">
              {CHAPTERS.map((c, i) => (
                <img key={c.img} src={wix(c.img, 1600)} alt="" aria-hidden="true" loading={i ? 'lazy' : 'eager'} decoding="async"
                  className="absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{ opacity: active === i ? 1 : 0, transform: active === i ? 'scale(1)' : 'scale(1.05)' }} />
              ))}
              <p className="absolute left-5 bottom-5 bg-ground/95 text-ink rounded-full px-4 py-2 text-[0.9375rem] font-medium">{CHAPTERS[active].when}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
