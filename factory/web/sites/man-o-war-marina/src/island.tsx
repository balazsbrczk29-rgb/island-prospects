import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, WIX } from "./site"

const PLACES: [string, string, string][] = [
  ["Man-O-War Grocery", "A fully stocked grocery store, a short walk from the docks.", WIX + "0b3c23_94dd9444e32e41998dcc6d8c5d528bec~mv2.jpg/v1/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/website%20pic%205_edited.jpg"],
  ["Heritage Museum and coffee shop", "The story of the cay, and a good cup of coffee.", WIX + "0b3c23_41987b11b6a54e2aadc4127786995bc1~mv2.jpg/v1/crop/x_0,y_109,w_1126,h_1319/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/website%20pic%204_edited.jpg"],
  ["Ferry services", "Hop to the surrounding islands; Man-O-War is a natural home base.", WIX + "0b3c23_64f4b9f7a624438ab4595cac50bb074a~mv2.webp/v1/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/PHOTO-2022-02-05-10-53-37%20(1).webp"],
  ["Beaches", "Quiet sand within reach of the harbour.", WIX + "0b3c23_6e7777c146d84a0991d67cc7eb3af9cb~mv2.jpg/v1/crop/x_0,y_245,w_3024,h_3542/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/MOW%202.jpg"],
]
const ALSO = ["Gift shops", "Fresh-made food and baked goods", "Boat-building shops", "A playground", "Churches"]

function Island() {
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-20 md:grid-cols-12 md:px-10 md:pt-24 md:pb-28" aria-labelledby="i-title">
        <div className="md:col-span-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>MOW life · Man-O-War Cay, Abaco</Label></motion.div>
          <motion.h1 id="i-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.1, ease }} className="mt-6 font-display text-[clamp(2.8rem,7vw,7rem)] leading-[0.94] tracking-[-0.02em]">Two miles long. <span className="italic text-harbour-deep">Half a mile wide.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Whether you stay a weekend or a couple of months, the cay has what a boat crew needs, close enough to walk from the slip.</motion.p>
        </div>
        <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.2 }} viewBox="0 0 300 300" className="w-full max-w-xs self-end md:col-span-4 md:justify-self-end" role="img" aria-label="Scale drawing of the cay's size: two miles by half a mile. Illustration, not a map.">
          <motion.rect initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 1.6, ease }} x="20" y="125" width="260" height="65" rx="32" fill="#e7dcc8" stroke="#20242a" strokeWidth="1.2" />
          <line x1="20" x2="280" y1="220" y2="220" stroke="#8a5a2b" />
          <text x="150" y="240" textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize="11" letterSpacing="2" fill="#5d6166">2 MILES</text>
          <line x1="292" x2="292" y1="125" y2="190" stroke="#8a5a2b" />
          <text x="150" y="165" textAnchor="middle" fontFamily="EB Garamond, serif" fontStyle="italic" fontSize="20" fill="#20242a">Man-O-War Cay</text>
          <text x="150" y="110" textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize="10" letterSpacing="2" fill="#5d6166">½ MILE WIDE · SIZE ONLY, NOT A MAP</text>
        </motion.svg>
      </section>

      <section className="bg-paper-2" aria-labelledby="walk-title">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <Label n="01">Within walking distance</Label>
            <h2 id="walk-title" className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1]">Groceries, coffee, the ferry, the beach.</h2>
          </Reveal>
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PLACES.map(([t, d, src], i) => (
              <Reveal key={t} delay={i * 0.08} className={i % 2 ? "lg:mt-16" : ""}>
                <li>
                  <Photo src={src} alt={t} w={286} h={335} className="aspect-[286/335] rounded-[6px]" />
                  <p className="mt-5 font-display text-sm text-teak italic">{String(i + 1).padStart(2, "0")}</p>
                  <p className="font-display text-2xl">{t}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="also-title">
        <Reveal className="md:col-span-5">
          <Label n="02">And also</Label>
          <h2 id="also-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1]">A boatbuilding island, still.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">The marina keeps a list of local contacts for everything else on the cay.</p>
          <a href="https://www.manowarmarinavillage.com/_files/ugd/0b3c23_6f5b087575654e36811d3f2aefff1810.pdf" className="group mt-8 inline-flex items-center gap-2 text-[16px] underline decoration-ink/30 underline-offset-4 hover:decoration-teak">Local contacts (PDF) <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <ul>{ALSO.map(a => <li key={a} className="group border-b border-line py-5 font-display text-[1.7rem] transition first:border-t hover:translate-x-1">{a}</li>)}</ul>
          <a href="index.html#request" className="group mt-10 inline-flex min-h-13 items-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-px">Request a slip <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
      </section>
    </>
  )
}

mount(<Page current="The island"><Island /></Page>)
