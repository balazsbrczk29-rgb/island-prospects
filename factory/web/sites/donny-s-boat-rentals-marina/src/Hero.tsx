import { motion } from 'motion/react'
import LivingPhoto from './LivingPhoto'
import { P, wix, srcSet } from './data'
import { WhatsAppGlyph, WA_DEFAULT, ease } from './site'

export default function Hero() {
  return (
    <section data-hero aria-labelledby="hero-title" className="relative md:h-[calc(100svh-84px)] md:min-h-[620px] overflow-hidden">
      <motion.div className="h-[44svh] min-h-[300px] md:absolute md:inset-0 md:h-auto"
        initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }}>
        <LivingPhoto src={wix(P.marinaAir, 2000)} srcSet={srcSet(P.marinaAir)} focus={[0.55, 0.55]} className="h-full w-full"
          alt="Donny's marina from the air: boats on their moorings and along the dock in the blue water at the end of Black Sound, Green Turtle Cay" />
      </motion.div>

      <motion.div className="relative md:absolute md:left-0 md:bottom-0 bg-flats md:w-[min(720px,54vw)] px-5 pt-8 pb-10 md:px-[4vw] md:pt-12 md:pb-[6.75rem] md:rounded-tr-[var(--radius-lg)]"
        initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.25 }}>
        <h1 id="hero-title" className="text-[2.85rem] sm:text-[3.5rem] md:text-[clamp(3.5rem,5.4vw,5.6rem)] tracking-[-0.045em] leading-[0.94]">
          Your own boat on the Sea of Abaco.
        </h1>
        <p className="mt-5 md:mt-6 max-w-[44ch] text-[1.0625rem] md:text-[1.1875rem] leading-[1.5] text-ink/85">
          Four boats from 17 to 23 feet at Donny&rsquo;s family dock, end of Black Sound. Rent by the day or the week while you stay on Green Turtle Cay.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a className="btn btn-primary" href={WA_DEFAULT} target="_blank" rel="noopener"><WhatsAppGlyph />Ask Taylor on WhatsApp</a>
          <a className="inline-flex items-center min-h-11 font-semibold underline decoration-[1.5px] underline-offset-[6px] hover:decoration-[3px]" href="#fleet">See the four boats</a>
        </div>
      </motion.div>

      <p className="hidden md:block absolute right-[4vw] bottom-6 text-[0.9375rem] text-white font-medium [text-shadow:0_1px_10px_rgba(0,0,0,.45)]">
        Donny&rsquo;s marina from the air, Black Sound
      </p>
    </section>
  )
}
