import { motion } from 'motion/react'
import LivingPhoto from './LivingPhoto'
import TripSheet from './TripSheet'
import { P, wix, srcSet, FLEET, usd } from './data'
import { ease } from './site'

const from = Math.min(...FLEET.map(b => b.day))

/** Screen 1: Donny's own marina aerial beside the trip sheet (the core tool). */
export default function Hero() {
  return (
    <section data-hero aria-labelledby="hero-title"
      className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-6 lg:h-[calc(100svh-76px)] lg:min-h-[780px] lg:max-h-[1000px] lg:px-[max(24px,3vw)] lg:pb-5">
      <motion.div className="relative h-[40svh] min-h-[260px] lg:h-auto lg:col-span-7 lg:rounded-[var(--radius-lg)] overflow-hidden ph"
        initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.2, ease }}>
        <LivingPhoto src={wix(P.marinaAir, 2000)} srcSet={srcSet(P.marinaAir, [1000, 1600, 2000])} sizes="(min-width: 1024px) 56vw, 100vw" focus={[0.5, 0.55]} className="h-full w-full"
          alt="Donny's marina from the air: boats at the dock and on moorings in clear blue water at the end of Black Sound, Green Turtle Cay" />
        <p className="absolute right-3 bottom-3 lg:right-5 lg:bottom-5 bg-ground text-ink rounded-full px-3.5 py-1.5 text-[0.875rem] font-medium">Donny&rsquo;s dock and moorings, end of Black Sound</p>
      </motion.div>

      <div className="lg:col-span-5 flex flex-col justify-center px-5 pt-7 pb-12 lg:p-0 lg:pl-[1.5vw] lg:pr-[0.5vw]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }}>
          <h1 id="hero-title" className="text-[2.5rem] lg:text-[clamp(2.75rem,3.5vw,3.75rem)] tracking-[-0.045em] leading-[0.98] max-w-[14ch]">
            Your own boat on the Sea of Abaco.
          </h1>
          <p className="mt-3 lg:mt-4 max-w-[40ch] text-muted text-[1.0625rem] lg:text-[1.125rem] leading-snug">
            Four 4-stroke boats from 17 to 23 ft, <span className="text-ink font-semibold tnum">from {usd(from)} a day</span>. Collect at 8, back at the dock by 5.
          </p>
        </motion.div>
        <motion.div className="mt-5 lg:mt-6" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.3 }}>
          <TripSheet />
        </motion.div>
      </div>
    </section>
  )
}
