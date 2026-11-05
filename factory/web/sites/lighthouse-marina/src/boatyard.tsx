import { motion } from "motion/react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG } from "./site"
import { YardEstimator, Enquiry } from "./parts"

const RATES: [string, [string, string][]][] = [
  ["Power single hull", [["Haul", "$5.50 per foot"], ["Launch", "$5.50 per foot"], ["Blocking", "$50.00"], ["Round trip, same day", "$8.00 per foot"]]],
  ["Power twin hull", [["Haul", "$7.00 per foot"], ["Launch", "$7.00 per foot"], ["Blocking", "$60.00"]]],
  ["Dry storage", [["Single hull up to 25 ft", "$200 per month"], ["Single hull 25 to 30 ft", "$8.50 per foot, per month"], ["Single hull over 30 ft", "$9.00 per foot, per month"], ["Twin hull", "$9.00 per foot, per month"]]],
  ["Services", [["Pressure cleaning", "$6.00/ft single, $8.00/ft twin"], ["Bottom painting", "$50.00 per hour"], ["Storage or launch prep", "$60.00 per hour"], ["Fiberglass repair", "$150.00 per hour"], ["Mechanic", "$110.00 per hour"], ["Forklift", "$90.00 per hour"], ["Cleaning", "$40.00 per hour"], ["Do it yourself", "$50.00 per day"]]],
  ["Engine care", [["Engine fog, 2 cylinder", "$50.00"], ["Engine fog, 3 cylinder", "$65.00"], ["Engine fog, 4 and 6 cylinder", "$85.00"], ["Flush, 2 and 3 cylinder", "$40.00"], ["Flush, 4 and 6 cylinder", "$55.00"]]],
]

mount(
  <Page current="Boatyard">
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 md:px-10 md:pt-14" aria-labelledby="b-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-chart">Boatyard · Mon to Fri, 8am to 4pm</motion.p>
          <h1 id="b-title" className="mt-6 font-display text-[clamp(3rem,7.4vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
            {["Hauled, stored,", "launched on time."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-chart" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> Boatyard rates at Lighthouse Marina, Hope Town</span>
          </h1>
        </div>
        <motion.p className="text-[17px] leading-relaxed text-muted lg:col-span-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>Hauling and dry storage up to 10 tons, factory-trained technicians and Mercury Outboard service. Closed weekends and holidays. Rates effective November 2024, plus 10% VAT.</motion.p>
      </div>
    </section>
    <section className="bg-paper-2" aria-labelledby="est-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-12"><Label n="01" className="text-chart">Estimate</Label><h2 id="est-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Price your season ashore.</h2></Reveal>
        <YardEstimator />
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="rates-title">
      <Reveal><Label n="02" className="text-chart">Rate sheet</Label><h2 id="rates-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Every published rate.</h2></Reveal>
      <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {RATES.map(([h, rows], i) => (
          <Reveal key={h} delay={(i % 3) * 0.06}>
            <h3 className="border-b-2 border-ink pb-3 font-display text-[1.5rem] font-semibold tracking-[-0.02em]">{h}</h3>
            <dl>{rows.map(([k, v]) => <div key={k} className="flex justify-between gap-4 border-b border-line py-3 text-[15px] transition hover:bg-paper-2"><dt className="text-muted">{k}</dt><dd className="text-right tabular-nums">{v}</dd></div>)}</dl>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-[14px] text-muted">All services carry 10% VAT. Brite work and compound and waxing are also offered: ask the office.</p>
    </section>
    <section className="border-t border-line" aria-labelledby="stay-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Label n="03" className="text-chart">Ashore</Label>
          <h2 id="stay-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Westview Cottage and Lighthouse Point.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">The marina's two rental homes, a split-level cottage with a wrap-around deck over the Sea of Abaco and a three-bedroom house up a private path at the harbour entrance, are both under long-term rental for now. Ask the office about future availability.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:col-start-7">
          <Photo src={IMG.westview} alt="Westview Cottage near Lighthouse Marina" w={936} h={702} className="aspect-[4/3] rounded-[8px]" />
          <Photo src={IMG.point} alt="Lighthouse Point house near Lighthouse Marina" w={936} h={770} className="aspect-[4/3] rounded-[8px]" />
        </div>
      </div>
    </section>
    <section id="contact" className="scroll-mt-20 bg-paper-2" aria-labelledby="q-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label n="04" className="text-chart">Book the yard</Label><h2 id="q-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Send the office your boat.</h2></Reveal>
        <div className="lg:col-span-7 lg:col-start-6"><Enquiry /></div>
      </div>
    </section>
  </Page>
)
