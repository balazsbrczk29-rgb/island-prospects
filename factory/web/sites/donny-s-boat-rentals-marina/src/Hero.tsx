import { motion } from 'motion/react'
import LivingPhoto from './LivingPhoto'
import { P, wix, srcSet, FLEET, usd } from './data'
import { WhatsAppGlyph, WA_DEFAULT, ease } from './site'

const from = Math.min(...FLEET.map(b => b.day))

/** The day, as a rail across the first screen: 8 am collect, the cays, 5 pm back. Each stop links to its chapter. */
export const STOPS = [
  { id: 'day-0', long: '8 am, collect', short: '8 am' },
  { id: 'day-1', long: 'No Name Cay', short: 'Pigs' },
  { id: 'day-2', long: 'Manjack Cay', short: 'Turtles' },
  { id: 'day-3', long: 'A quiet beach', short: 'Beach' },
  { id: 'day-4', long: '5 pm, back', short: '5 pm' },
]

function Rail() {
  return (
    <nav aria-label="The day, 8 am to 5 pm" className="relative">
      <div className="absolute left-[7px] right-[7px] top-[7px] h-[2px] bg-ink/15" aria-hidden="true" />
      <motion.div className="absolute left-[7px] right-[7px] top-[7px] h-[2px] bg-channel origin-left" aria-hidden="true"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.4, ease, delay: 0.6 }} />
      <ol className="relative flex justify-between list-none p-0 m-0">
        {STOPS.map((s, i) => (
          <li key={s.id} className={i === 0 ? '' : i === STOPS.length - 1 ? 'text-right' : 'text-center'}>
            <a href="#day" onClick={e => { e.preventDefault(); dispatchEvent(new CustomEvent('donny:day', { detail: i })) }} className={`group inline-flex flex-col gap-2 min-h-11 ${i === 0 ? 'items-start' : i === STOPS.length - 1 ? 'items-end' : 'items-center'}`}>
              <motion.span aria-hidden="true" className="block size-4 rounded-full bg-ground shadow-[inset_0_0_0_2px_var(--color-channel)] group-hover:bg-channel transition-colors"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, ease, delay: 0.6 + i * 0.5 }} />
              <span className="text-[0.875rem] md:text-[0.9375rem] font-medium whitespace-nowrap"><span className="md:hidden">{s.short}</span><span className="hidden md:inline">{s.long}</span></span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default function Hero() {
  return (
    <section data-hero aria-labelledby="hero-title" className="flex flex-col md:h-[calc(100svh-84px)] md:min-h-[640px] md:grid md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <div className="order-2 md:order-1 flex flex-col px-5 md:pl-[4vw] md:pr-[3.5vw] pt-8 pb-10 md:pt-[6svh] md:pb-[11svh]">
        <h1 id="hero-title" className="text-[2.6rem] sm:text-[3.25rem] md:text-[clamp(3.25rem,4.9vw,5.4rem)] tracking-[-0.045em] leading-[0.95]">
          Collect your boat at 8, island-hop all day, back by 5.
        </h1>
        <p className="mt-5 md:mt-7 font-display font-semibold text-[1.75rem] md:text-[2.25rem] tracking-[-0.035em] leading-none text-channel">From {usd(from)} a day.</p>
        <p className="mt-4 md:mt-5 max-w-[42ch] text-[1.0625rem] md:text-[1.125rem] text-muted">Four boats from 17 to 23 ft at Donny&rsquo;s family dock, end of Black Sound, for guests staying on Green Turtle Cay.</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a className="btn btn-primary" href={WA_DEFAULT} target="_blank" rel="noopener"><WhatsAppGlyph />Ask Taylor on WhatsApp</a>
          <a className="inline-flex items-center min-h-11 font-semibold underline decoration-[1.5px] underline-offset-[6px] hover:decoration-[3px]" href="#fleet">See the four boats</a>
        </div>
        <div className="mt-10 md:mt-auto pt-2"><Rail /></div>
      </div>
      <motion.div className="order-1 md:order-2 relative h-[42svh] min-h-[280px] md:h-auto md:m-3 md:ml-0 md:rounded-[var(--radius-lg)] overflow-hidden"
        initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.3, ease }}>
        <LivingPhoto src={wix(P.heroBoat, 2000)} srcSet={srcSet(P.heroBoat)} sizes="(min-width: 768px) 54vw, 100vw" focus={[0.5, 0.42]} className="h-full w-full"
          alt="One of Donny's Boston Whalers at the dock at the end of Black Sound, in clear turquoise water under a blue sky" />
      </motion.div>
    </section>
  )
}
