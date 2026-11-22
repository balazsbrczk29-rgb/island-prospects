// Screen 3: where the boats go. A schematic route card (no coastline, not to scale, honest about it)
// whose legs draw out of Black Sound like a plotter track, beside Donny's own photos of the pigs and the turtles.
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { P, wix } from './data'
import { ease } from './site'

const HOME = { x: 380, y: 290 }
const LEGS = [
  { id: 'manjack', name: 'Manjack Cay', note: 'turtles', x: 150, y: 96, d: `M${HOME.x} ${HOME.y} C 330 200, 230 120, 150 96`, lx: 150, ly: 66, anchor: 'middle' as const },
  { id: 'noname', name: 'No Name Cay', note: 'the pigs', x: 600, y: 430, d: `M${HOME.x} ${HOME.y} C 450 330, 520 420, 600 430`, lx: 600, ly: 472, anchor: 'middle' as const },
]
const STOPS = [
  { id: 'noname', title: 'The pigs at No Name Cay', line: 'Run south-east to No Name Cay to see the pigs, then find a quiet beach for the picnic.', img: P.pigs, alt: 'The swimming pigs on the beach at No Name Cay, photographed by Donny’s' },
  { id: 'manjack', title: 'Turtles at Manjack Cay', line: 'North-west to Manjack Cay for the turtles, with snorkelling or fishing on the way back.', img: P.turtle, alt: 'A sea turtle in clear shallow water near Manjack Cay, photographed by Donny’s' },
]

export default function RouteCard() {
  const [hot, setHot] = useState<string | null>(null)
  const reduce = useReducedMotion()
  return (
    <section id="day" aria-labelledby="day-title" className="px-5 lg:px-[max(24px,3vw)] pb-20 lg:pb-32 scroll-mt-4">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6 items-start">
        <figure className="lg:col-span-7 m-0 lg:sticky lg:top-6">
          <div className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden bg-surface graticule shadow-[inset_0_0_0_1px_var(--color-line)]">
            <svg viewBox="0 0 760 570" className="absolute inset-0 w-full h-full" role="img" aria-labelledby="route-desc">
              <desc id="route-desc">Schematic route card: from Donny's dock at the end of Black Sound, one leg north-west to Manjack Cay and one leg south-east to No Name Cay, both inside the Sea of Abaco. New Plymouth is a ten-minute walk from the dock.</desc>
              {LEGS.map((l, i) => (
                <g key={l.id}>
                  <motion.path d={l.d} fill="none" stroke="var(--color-channel)" strokeLinecap="round" strokeDasharray="1 0"
                    strokeWidth={hot === l.id ? 5 : 3}
                    initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.4, ease, delay: 0.2 + i * 0.35 }} style={{ transition: 'stroke-width 200ms ease' }} />
                  <motion.g initial={reduce ? false : { scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3, ease, delay: 1.5 + i * 0.35 }} style={{ originX: `${l.x}px`, originY: `${l.y}px` }}>
                    <circle cx={l.x} cy={l.y} r="13" fill="var(--color-surface)" stroke="var(--color-channel)" strokeWidth="3" />
                    <circle cx={l.x} cy={l.y} r="4.5" fill="var(--color-channel)" />
                  </motion.g>
                  <text x={l.lx} y={l.ly} textAnchor={l.anchor} className="font-display" fontWeight="600" fontSize="26" letterSpacing="-0.5" fill="var(--color-ink)">{l.name}</text>
                  <text x={l.lx} y={l.ly + (l.ly < l.y ? -30 : 26)} textAnchor={l.anchor} fontSize="18" fill="var(--color-muted)">{l.note}</text>
                </g>
              ))}
              {/* home: the dock at the end of Black Sound, New Plymouth a walk away */}
              <line x1={HOME.x} y1={HOME.y} x2={HOME.x - 70} y2={HOME.y + 92} stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
              <circle cx={HOME.x - 70} cy={HOME.y + 92} r="6" fill="var(--color-ink)" fillOpacity="0.55" />
              <text x={HOME.x - 84} y={HOME.y + 128} textAnchor="middle" fontSize="18" fill="var(--color-muted)">New Plymouth, 10 min on foot</text>
              <rect x={HOME.x - 16} y={HOME.y - 16} width="32" height="32" rx="8" fill="var(--color-ink)" />
              <rect x={HOME.x - 5} y={HOME.y - 5} width="10" height="10" rx="2" fill="var(--color-flats)" />
              <text x={HOME.x + 28} y={HOME.y - 2} className="font-display" fontWeight="600" fontSize="26" letterSpacing="-0.5" fill="var(--color-ink)">Donny&rsquo;s</text>
              <text x={HOME.x + 28} y={HOME.y + 22} fontSize="18" fill="var(--color-muted)">end of Black Sound, collect at 8</text>
              {/* north arrow */}
              <g transform="translate(700 64)" aria-hidden="true">
                <path d="M0 -28 L10 8 L0 2 L-10 8 Z" fill="var(--color-ink)" />
                <text y="34" textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--color-ink)">N</text>
              </g>
            </svg>
          </div>
          <figcaption className="mt-3 text-[0.875rem] text-muted">Schematic, not to scale, not for navigation. Your boat&rsquo;s chart-plotter has the real chart. Rentals stay inside the Sea of Abaco.</figcaption>
        </figure>

        <div className="lg:col-span-5 lg:pl-[2vw]">
          <h2 id="day-title" className="h2 max-w-[14ch]">Pigs at No Name Cay, turtles at Manjack, back by 5.</h2>
          <p className="mt-5 max-w-[44ch] text-muted">Island hopping, picnics, snorkelling and fishing from your own boat. Ask Donny about tours if you would rather someone else drives.</p>
          <ul className="mt-10 grid gap-10 list-none p-0 m-0">
            {STOPS.map(s => (
              <li key={s.id} onPointerEnter={() => setHot(s.id)} onPointerLeave={() => setHot(null)} onFocus={() => setHot(s.id)} onBlur={() => setHot(null)} tabIndex={0}
                className="group rounded-[var(--radius-md)] outline-offset-4">
                <span className="ph block aspect-[3/2] rounded-[var(--radius-md)]">
                  <img src={wix(s.img, 1000)} width={1000} height={667} loading="lazy" decoding="async" alt={s.alt} className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]" />
                </span>
                <h3 className="mt-4 text-[1.5rem] tracking-[-0.03em] leading-tight">{s.title}</h3>
                <p className="mt-1.5 text-muted max-w-[44ch]">{s.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
