// The four boats slide past like a line at the dock (A11 horizontal journey, N9 progress timeline).
// Desktop: a pinned stage, vertical scroll moves the row sideways. Phones: native swipe with snap.
// One DOM for both, so the prerendered HTML holds each boat once. Motion values only, no state per frame.
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { FLEET, usd, wix, type Boat } from './data'
import { ease } from './site'

export const pickBoat = (id: string) => {
  window.dispatchEvent(new CustomEvent('donny:boat', { detail: id }))
  document.getElementById('plan')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
}

function BoatFrame({ b, i, active }: { b: Boat; i: number; active: boolean }) {
  return (
    <motion.article aria-labelledby={`boat-${b.id}`} animate={{ opacity: active ? 1 : 0.5, scale: active ? 1 : 0.955 }} transition={{ duration: 0.6, ease }}
      className="origin-center">
      <div className="ph rounded-[var(--radius-md)] aspect-[4/3] md:aspect-auto md:h-[min(62svh,660px)]">
        <img src={wix(b.cover, 1600)} srcSet={`${wix(b.cover, 900)} 900w, ${wix(b.cover, 1600)} 1600w`} sizes="(min-width: 900px) 74vw, 86vw"
          alt={`Donny's ${b.name} rental boat`} style={{ objectPosition: b.pos }} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
      </div>
      <div className="mt-5 md:mt-6 grid gap-4 md:grid-cols-[1.25fr_1fr_auto] md:items-end">
        <div>
          <h3 id={`boat-${b.id}`} className="text-[2.25rem] md:text-[3.5rem] tracking-[-0.045em]">{b.name}</h3>
          <p className="mt-2 text-muted">{b.hp} 4-stroke, {b.people}{b.experience ? ', boating experience needed' : ''}</p>
        </div>
        <p className="tnum text-[1.0625rem] leading-snug">
          <span className="font-sans font-semibold text-[2rem] tracking-[-0.02em] tnum">{usd(b.day)}</span> a day
          <br /><span className="text-muted">{usd(b.week)} for 7 days</span>
        </p>
        <button type="button" onClick={() => pickBoat(b.id)} className="btn btn-ghost justify-self-start md:justify-self-end">Plan this boat</button>
      </div>
    </motion.article>
  )
}

export default function FleetTrack() {
  const ref = useRef<HTMLElement>(null)
  const ul = useRef<HTMLUListElement>(null)
  const dist = useRef(0)
  const [desk, setDesk] = useState(false)
  const [focus, setFocus] = useState(0)
  const n = FLEET.length

  useEffect(() => {
    const mq = matchMedia('(min-width: 900px)')
    const measure = () => {
      setDesk(mq.matches)
      // travel = distance between the first and last boat, so each boat lands centred in turn
      const li = ul.current?.querySelectorAll('li'); if (li && li.length > 1) dist.current = (li[li.length - 1] as HTMLElement).offsetLeft - (li[0] as HTMLElement).offsetLeft
    }
    measure(); addEventListener('resize', measure); mq.addEventListener('change', measure)
    return () => { removeEventListener('resize', measure); mq.removeEventListener('change', measure) }
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, v => (desk ? -Math.min(1, Math.max(0, v)) * dist.current : 0))
  const fill = useTransform(scrollYProgress, v => Math.min(1, Math.max(0, v)))
  useMotionValueEvent(scrollYProgress, 'change', v => { if (!desk) return; const f = Math.round(Math.min(1, Math.max(0, v)) * (n - 1)); setFocus(p => (p === f ? p : f)) })

  // phones: focus follows the swipe
  useEffect(() => {
    if (desk || !ul.current) return
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setFocus(Number((e.target as HTMLElement).dataset.i)) }), { root: ul.current, threshold: 0.6 })
    ul.current.querySelectorAll('li').forEach(li => io.observe(li))
    return () => io.disconnect()
  }, [desk])

  const jump = (i: number) => {
    const el = ref.current; if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    const y = top + (i / (n - 1)) * (el.offsetHeight - innerHeight)
    window.scrollTo({ top: y + 2, behavior: 'smooth' })
  }

  return (
    <div id="fleet" className="scroll-mt-2">
    <div className="px-5 md:px-[calc((100vw-min(74vw,1080px))/2)] pt-20 md:pt-28 md:flex md:items-end md:justify-between md:gap-10">
      <h2 id="fleet-title" className="text-[2.5rem] md:text-[4.25rem] tracking-[-0.045em] max-w-[13ch]">Four boats, 17 to 23 ft, all 4-stroke</h2>
      <p className="mt-3 md:mt-0 max-w-[44ch] text-muted">Every one with VHF and buoyancy aids. Three days minimum, only for guests staying on Green Turtle Cay.</p>
    </div>
    <section ref={ref} data-stage aria-labelledby="fleet-title" className="relative md:h-[400svh]">
      <div className="md:sticky md:top-0 md:h-svh md:overflow-hidden flex flex-col justify-center pt-8 pb-16 md:pt-0 md:pb-10">
        <motion.ul ref={ul} className="track-ul" style={{ x }}>
          {FLEET.map((b, i) => <li key={b.id} data-i={i}><BoatFrame b={b} i={i} active={focus === i} /></li>)}
        </motion.ul>
        {/* N9: progress timeline that doubles as navigation */}
        <nav aria-label="Boats" className="hidden md:block mt-8 px-[calc((100vw-min(74vw,1080px))/2)]">
          <div className="relative h-[2px] bg-line">
            <motion.div className="absolute inset-0 bg-ink origin-left" style={{ scaleX: fill }} />
          </div>
          <ol className="mt-3 grid grid-cols-4 list-none p-0 m-0">
            {FLEET.map((b, i) => (
              <li key={b.id} className={i === n - 1 ? 'text-right' : i > 0 ? 'text-center' : ''}>
                <button type="button" onClick={() => jump(i)} aria-current={focus === i ? 'true' : undefined}
                  className={`min-h-11 px-1 text-[0.9375rem] font-medium transition-colors duration-200 ${focus === i ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                  {b.short}
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <p className="md:hidden px-5 mt-4 text-[0.9375rem] text-muted" aria-hidden="true">Swipe for all four</p>
      </div>
    </section>
    </div>
  )
}
