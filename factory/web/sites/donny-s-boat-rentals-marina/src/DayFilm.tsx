// One day with the boat, 8 am to 5 pm, in Donny's own photographs.
// Desktop: a pinned stage. Scroll drives a clock rail (motion value, no state per frame); the chapter index changes
// only at boundaries, swapping the photograph and the vertically centred text beside it.
// Phones: each chapter is its own block (photo, time, line), no pinning.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { P, wix } from './data'
import { ease } from './site'

const CHAPTERS = [
  { when: '8 am', label: '8 am', title: 'Collect your boat at the end of Black Sound.', text: 'Buy block ice at the dock, fill the cooler and go. The boat is yours until 5.', img: P.morning, alt: "One of Donny's Boston Whalers tied up at the dock in clear water" },
  { when: 'No Name Cay', label: 'No Name Cay', title: 'The pigs come down to the water.', text: 'The swimming pigs are one of the island hops a boat of your own makes easy.', img: P.pigs, alt: 'Pigs on the beach and in the shallows at No Name Cay' },
  { when: 'Manjack Cay', label: 'Manjack Cay', title: 'Turtles, in water this clear.', text: 'Go slowly over the shallows and look down.', img: P.turtle, alt: 'A sea turtle surfacing beside a hand in clear green water at Manjack Cay' },
  { when: 'Afternoon', label: 'Afternoon', title: 'A beach with nobody else on it.', text: 'Anchor off, swim the picnic ashore, snorkel the shallows or put a line out.', img: P.beach, alt: 'An empty white sand beach with footprints and turquoise water' },
  { when: '5 pm', label: '5 pm', title: 'Back at Donny’s dock.', text: 'By 6 in summer time, with the fuel you left with. Three days minimum, so tomorrow there is another cay.', img: P.walkway, alt: "The dock walkway at Donny's marina with boats either side" },
]
const N = CHAPTERS.length

export default function DayFilm() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const fill = useTransform(scrollYProgress, v => Math.min(1, Math.max(0, v)))
  useMotionValueEvent(scrollYProgress, 'change', v => { const i = Math.min(N - 1, Math.max(0, Math.floor(v * N))); setActive(p => (p === i ? p : i)) })
  const jump = (i: number) => { const el = ref.current; if (!el) return; const top = el.getBoundingClientRect().top + scrollY; scrollTo({ top: top + ((i + 0.5) / N) * (el.offsetHeight - innerHeight), behavior: 'smooth' }) }
  const c = CHAPTERS[active]
  // the hero's time rail jumps straight to a stop
  useEffect(() => {
    const on = (e: Event) => {
      const i = (e as CustomEvent<number>).detail
      if (matchMedia('(min-width: 768px)').matches) jump(i)
      else document.getElementById(`day-m-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    addEventListener('donny:day', on); return () => removeEventListener('donny:day', on)
  }, [])

  return (
    <section id="day" aria-labelledby="day-title">
      {/* desktop: pinned stage */}
      <div ref={ref} data-stage className="hidden md:block relative" style={{ height: `${N * 85 + 15}svh` }}>
        <div className="sticky top-0 h-svh px-[4vw] py-[5svh] grid grid-rows-[auto_1fr] gap-[3svh]">
          <div className="flex items-end justify-between gap-10">
            <h2 id="day-title" className="text-[3.25rem] tracking-[-0.045em]">A day from Donny&rsquo;s dock</h2>
            {/* the clock rail */}
            <div className="relative w-[min(56vw,820px)] pb-1">
              <div className="absolute left-[7px] right-[7px] top-[7px] h-[2px] bg-ink/15" />
              <motion.div className="absolute left-[7px] right-[7px] top-[7px] h-[2px] bg-channel origin-left" style={{ scaleX: fill }} />
              <ol className="relative flex justify-between list-none p-0 m-0">
                {CHAPTERS.map((ch, i) => (
                  <li key={ch.label} className={i === 0 ? '' : i === N - 1 ? 'text-right' : 'text-center'}>
                    <button type="button" onClick={() => jump(i)} aria-current={active === i ? 'step' : undefined}
                      className={`inline-flex flex-col gap-2 min-h-11 ${i === 0 ? 'items-start' : i === N - 1 ? 'items-end' : 'items-center'}`}>
                      <span className={`block size-4 rounded-full transition-colors duration-300 ${i <= active ? 'bg-channel' : 'bg-ground shadow-[inset_0_0_0_2px_var(--color-line)]'}`} />
                      <span className={`text-[0.9375rem] font-medium transition-colors duration-300 ${active === i ? 'text-ink' : 'text-muted'}`}>{ch.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-[4vw] min-h-0">
            <div className="self-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.45, ease }}>
                  <p className="font-display font-semibold text-channel text-[1.5rem] tracking-[-0.03em]">{c.when}</p>
                  <h3 className="mt-3 text-[clamp(2.5rem,3.8vw,3.75rem)] tracking-[-0.045em] max-w-[13ch]">{c.title}</h3>
                  <p className="mt-5 max-w-[38ch] text-[1.1875rem] text-muted">{c.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-flats-deep min-h-0">
              {CHAPTERS.map((ch, i) => (
                <img key={ch.img} src={wix(ch.img, 1600)} alt={ch.alt} aria-hidden={active !== i} loading={i ? 'lazy' : 'eager'} decoding="async"
                  className="absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{ opacity: active === i ? 1 : 0, transform: active === i ? 'scale(1)' : 'scale(1.05)' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* phones: stacked chapters along a vertical time line */}
      <div className="md:hidden px-5 py-20">
        <h2 className="text-[2.5rem] tracking-[-0.045em]">A day from Donny&rsquo;s dock</h2>
        <ol className="mt-10 list-none p-0 m-0 border-l-2 border-channel/30 pl-5 grid gap-14">
          {CHAPTERS.map((ch, i) => (
            <li key={ch.label} id={`day-m-${i}`} className="relative">
              <span aria-hidden="true" className="absolute -left-[29px] top-1 size-4 rounded-full bg-channel" />
              <p className="font-display font-semibold text-channel text-[1.25rem] tracking-[-0.03em]">{ch.when}</p>
              <h3 className="mt-2 text-[1.875rem] tracking-[-0.04em]">{ch.title}</h3>
              <p className="mt-3 text-muted">{ch.text}</p>
              <div className="ph aspect-[4/3] rounded-[var(--radius-md)] mt-5"><img src={wix(ch.img, 900)} alt={ch.alt} loading="lazy" decoding="async" /></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
