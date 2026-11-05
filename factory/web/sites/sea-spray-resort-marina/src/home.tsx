import { motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Mask, Head, ease, reveal, PHONE, TEL, STAY, ORDER, CDN, CDN2 } from "./site"

function Hero() {
  const { scrollY } = useScroll()
  const x = useTransform(scrollY, [0, 700], ["0%", "-4%"])
  return (
    <section className="overflow-hidden pt-10 md:pt-14" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-harbour">Sea Spray Resort &amp; Marina · Elbow Cay, Abaco</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="label hidden text-muted md:block">Protected harbour · VHF 16</motion.p>
        </div>
        <h1 id="hero-title" className="mt-4 font-display text-[clamp(3.6rem,13.5vw,13.5rem)] leading-[0.86] font-light tracking-[-0.045em]">
          <span className="block overflow-hidden pb-[0.05em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15, duration: 1.2, ease: reveal }}>A marina in</motion.span></span>
          <span className="block overflow-hidden pb-[0.08em]"><motion.span className="block italic text-harbour" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.27, duration: 1.2, ease: reveal }}>White Sound.</motion.span></span>
        </h1>
      </div>
      <motion.div className="relative mt-6 h-[38svh] min-h-[260px] overflow-hidden bg-[#c9a77d] md:mt-8 md:h-[44svh]" initial={{ clipPath: "inset(0 50% 0 50%)" }} animate={{ clipPath: "inset(0 0% 0 0%)" }} transition={{ delay: 0.4, duration: 1.4, ease: reveal }}>
        <motion.img style={{ x }} src={`${CDN}69cfbc6075d7d6bbe8fcafa9_IMG_8666.jpg`} alt="Boats in their slips at Sea Spray Marina, White Sound, at sunset" width={2400} height={1000} fetchPriority="high" className="h-full w-[108%] max-w-none object-cover object-[50%_60%]" />
      </motion.div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <dl className="grid grid-cols-2 border-b border-line md:grid-cols-4">
          {[["Slips", "68"], ["Boats", "20 to 130 ft"], ["Draft at low tide", "Up to 7 ft"], ["Hail", "VHF 16"]].map(([k, v], i) => (
            <motion.div key={k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.8, ease }} className="border-line py-5 odd:border-r md:border-r md:last:border-r-0 md:px-6 md:first:pl-0">
              <dt className="label text-muted">{k}</dt>
              <dd className="mt-1 font-display text-[clamp(1.7rem,2.8vw,2.6rem)] font-light tracking-tight">{v}</dd>
            </motion.div>
          ))}
        </dl>
        <div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[17px] leading-relaxed text-ink/80">A protected marina on Elbow Cay, in the middle of the Abacos. Rebuilt after Dorian, with a bar over the water and villas ashore.</p>
          <div className="flex flex-wrap gap-2">
            <a href="marina.html#request" className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-harbour-deep">Request a slip</a>
            <a href={STAY} className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-ink/25 px-5 text-[15px] transition hover:-translate-y-px hover:border-ink">Book your stay <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [["Call the marina", PHONE, TEL], ["On the radio", "VHF Channel 16", "marina.html"], ["Where", "White Sound, Elbow Cay, Abaco", "#contact"], ["Ashore", "Bar, dining, villas, gas and ice", "#ashore"]]
  return (
    <section className="bg-harbour-deep text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, h], i) => (
          <li key={k} className="border-b border-paper/15 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={h} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="label text-seaglass">{k}</span>
              <span className={`mt-2 block font-display font-light ${i === 0 ? "whitespace-nowrap text-[clamp(1.8rem,2.5vw,2.4rem)]" : "text-[1.45rem] leading-snug"}`}>{v}</span>
              <span className="mt-4 block h-px w-0 bg-seaglass transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Approach() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="ap-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Head index="01" label="The marina" id="ap-title" title={<>Tie up between the Atlantic and the Sea of Abaco.</>}>
            <p className="mt-6 max-w-md text-[18px] leading-relaxed text-muted">A newly renovated marina in White Sound, sheltered on Elbow Cay. 68 slips take boats from 20 to 130 feet, with up to 7 feet of draft even at low tide, plus electricity, water, ice and restrooms on the dock.</p>
            <a href="marina.html" className="group mt-8 inline-flex items-center gap-2 text-[16px]"><span className="ulink">Check your boat against the dock</span><ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
          </Head>
        </div>
        <div className="relative lg:col-span-7">
          <Mask className="overflow-hidden rounded-[18px]"><img src={`${CDN}69ce8789894c5a44705cf797_IMG_6418.jpg`} alt="Fishing boats in the marina at sunset" width={1400} height={1000} loading="lazy" className="aspect-[7/5] w-full bg-[#9fb9b5] object-cover transition duration-700 hover:scale-[1.02]" /></Mask>
          <Reveal delay={0.3} className="absolute -bottom-10 -left-4 hidden w-[42%] overflow-hidden rounded-[14px] border-4 border-paper md:block lg:-left-16">
            <img src={`${CDN}69cfc2557db0a37f9b13ef49_IMG_2390.jpeg`} alt="A sportfishing boat running across the Sea of Abaco" width={700} height={500} loading="lazy" className="aspect-[7/5] w-full bg-[#9fb9b5] object-cover" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const EVENTS = [["Thursday Night Entertainment", "Live music, DJ or Junkanoo"], ["Happy Hour", "At the marina bar"], ["Game Night", "Bring the crew"], ["Karaoke", "For the brave"]]

function Ashore() {
  return (
    <section id="ashore" className="bg-paper-2" aria-labelledby="ashore-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7"><Head index="02" label="Eat & drink" id="ashore-title" title={<>The bar faces the boats.</>} /></div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-12"><p className="text-[18px] leading-relaxed text-muted">Tables over White Sound, a bar that feels like home and food shaped by what is fresh and local. Cold drinks, a crowd just in from the water, the same faces year after year.</p></Reveal>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-12">
          <Mask className="overflow-hidden rounded-[18px] md:col-span-7 md:row-span-2"><img src={`${CDN}69ce91fce748bec9acac9f51_IMG_8676.jpg`} alt="The open-air white wooden bar at sunset" width={1200} height={1000} loading="lazy" className="h-full min-h-[320px] w-full bg-[#c9a77d] object-cover transition duration-700 hover:scale-[1.02]" /></Mask>
          <Mask delay={0.1} className="overflow-hidden rounded-[18px] md:col-span-5"><img src={`${CDN}69cfc301ea13ce7f15d0306f_IMG_5636%20(1).jpg`} alt="Friends with drinks at the tiki bar by the water" width={900} height={600} loading="lazy" className="aspect-[3/2] w-full bg-[#9fb9b5] object-cover transition duration-700 hover:scale-[1.02]" /></Mask>
          <Reveal delay={0.15} className="rounded-[18px] bg-paper p-6 md:col-span-5 md:p-8">
            <p className="label text-harbour">On at the marina</p>
            <ul className="mt-3">
              {EVENTS.map(([t, d]) => <li key={t} className="group flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0"><span className="font-display text-[1.45rem] transition group-hover:translate-x-1">{t}</span><span className="text-right text-[14px] text-muted">{d}</span></li>)}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={ORDER} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px">Order online <ArrowUpRight className="size-4" aria-hidden /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const STORY = [
  ["1980s", "Monty Albury and his wife Ruth start building Sea Spray boats on Elbow Cay. The business grows into a resort and marina."],
  ["2019", "Hurricane Dorian destroys the property."],
  ["2022", "In February, Charleston boyhood friends Francis Johnson, Harry Johnson, Donovan Smith and Mills Buxton, with their families, begin bringing Sea Spray back."],
  ["Today", "A renovated marina and a new bar are open; cottages and residences follow in phases."],
]

function Story() {
  return (
    <section id="story" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="story-title">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head index="03" label="The story" id="story-title" title={<>Named for a boat. <span className="italic">Rebuilt by boaters.</span></>} />
          <Mask className="mt-12 overflow-hidden rounded-[18px]"><img src={`${CDN}69cfc2546eda1416d3c76122_PHOTO-2025-03-24-20-05-32.jpeg`} alt="Four people on the dock holding a large mahi-mahi" width={900} height={700} loading="lazy" className="aspect-[9/7] w-full bg-[#9fb9b5] object-cover" /></Mask>
        </div>
        <ol className="relative lg:col-span-6 lg:col-start-7">
          <motion.span className="absolute top-2 left-[5.5rem] w-px origin-top bg-harbour/40 md:left-[7rem]" style={{ height: "calc(100% - 1rem)" }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} aria-hidden />
          {STORY.map(([y, t], i) => (
            <motion.li key={y} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8, ease }} className="relative grid grid-cols-[5.5rem_1fr] gap-6 pb-12 md:grid-cols-[7rem_1fr]">
              <span className="font-display text-[1.8rem] font-light text-harbour italic">{y}</span>
              <span className="relative text-[18px] leading-relaxed"><span className="absolute top-3 -left-[1.85rem] size-2.5 rounded-full bg-harbour" aria-hidden />{t}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Residences() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper" aria-labelledby="res-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Head dark index="04" label="Residences" id="res-title" title={<>A limited number of homes, on the water.</>}>
            <p className="mt-6 max-w-md text-[18px] leading-relaxed text-paper/75">Fully furnished oceanfront homes and Marina View cottages, rebuilt from the ground up. Marina View cottages from $3,050,000; oceanfront homes from $5,999,500.</p>
            <a href="residences.html" className="mt-8 inline-flex min-h-12 items-center gap-1.5 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Compare the residences <ArrowUpRight className="size-4" aria-hidden /></a>
          </Head>
        </div>
        <Mask className="overflow-hidden rounded-[18px] lg:col-span-7"><img src={`${CDN2}69dcaac2469118b3813301bf_91a73aa0-3326-4643-ad19-30c74c449bae.webp`} alt="Rendering of an oceanfront home at Sea Spray" width={1400} height={900} loading="lazy" className="aspect-[14/9] w-full bg-[#2a4456] object-cover transition duration-700 hover:scale-[1.02]" /></Mask>
      </div>
    </section>
  )
}

function Book() {
  return (
    <section className="bg-paper-2" aria-labelledby="book-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-3">
        {[
          ["Bringing a boat", "Check your length and draft against the dock, then send the details.", "marina.html#request", "Request a slip"],
          ["Staying ashore", "Villa stays are booked online with live availability.", STAY, "Book your stay"],
          ["Owning here", "Floor plans, prices and the 2026 sales package.", "residences.html", "See the residences"],
        ].map(([t, d, h, c], i) => (
          <Reveal key={t} delay={i * 0.08} className="border-t border-ink/20 pt-6">
            <h3 id={i === 0 ? "book-title" : undefined} className="font-display text-[2rem] font-light">{t}</h3>
            <p className="mt-3 max-w-sm text-[16px] text-muted">{d}</p>
            <a href={h} className="group mt-6 inline-flex items-center gap-2 text-[16px]"><span className="ulink">{c}</span><ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const FAQ = [
  ["How big a boat can Sea Spray take?", "The marina has 68 slips for boats from 20 to 130 feet LOA, and even at low tide the dock takes drafts up to 7 feet."],
  ["What is on the dock?", "Electricity, water, ice and restrooms. Gas is available at the marina; call for current fuel hours."],
  ["How do I reach the marina?", `Call ${PHONE} or hail Sea Spray on VHF Channel 16. The marina is in White Sound, Elbow Cay, in the Abacos.`],
  ["Can I stay ashore?", "Yes. Villa stays are booked online through the Sea Spray booking page."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <div className="lg:col-span-4"><Head index="05" label="Questions" id="faq-title" title={<>Before you cast off.</>} /></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[1.45rem] font-normal hover:no-underline md:text-[1.7rem]">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="border-t border-line" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head index="06" label="Find us" id="contact-title" title={<>White Sound, Elbow Cay.</>}><p className="mt-5 max-w-md text-[18px] text-muted">In the middle of the Abacos. By sea, call ahead or hail on 16.</p></Head>
          <a href={TEL} className="mt-10 block rounded-[18px] bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-harbour-deep">
            <span className="label text-seaglass">Call the marina</span>
            <span className="mt-2 flex items-center gap-3 font-display text-[clamp(2rem,3.6vw,3rem)] leading-none font-light"><Phone className="size-6" aria-hidden />{PHONE}</span>
            <span className="mt-3 block text-paper/70">VHF Channel 16</span>
          </a>
        </div>
        <Reveal delay={0.1} className="overflow-hidden rounded-[18px] border border-line lg:col-span-7">
          <iframe title="Map of Sea Spray Resort and Marina, White Sound, Elbow Cay" loading="lazy" className="h-[420px] w-full lg:h-full lg:min-h-[480px]" src="https://www.google.com/maps?q=Sea+Spray+Resort+and+Marina,+White+Sound,+Elbow+Cay,+Abaco&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Approach /><Ashore /><Story /><Residences /><Book /><Questions /><Contact /></Page>)
void ease
