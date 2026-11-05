import { motion } from "motion/react"
import { Phone } from "lucide-react"
import { SlipCheck, Enquiry } from "./parts"
import { Page, mount, Reveal, Head, ease, reveal, PHONE, TEL, CDN } from "./site"

const SPECS: [string, string, boolean?][] = [
  ["Slips", "68, newly renovated"],
  ["Length overall", "20 to 130 ft"],
  ["Draft", "Up to 7 ft, even at low tide"],
  ["On the dock", "Electricity, water, ice, restrooms"],
  ["Fuel", "Gas available; call for hours"],
  ["Radio", "VHF Channel 16"],
  ["Phone", PHONE],
  ["Slip rates", "Rates on request", true],
]

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:px-10 md:pt-20 lg:grid-cols-12 lg:items-end" aria-labelledby="m-title">
      <div className="lg:col-span-7">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-harbour">The marina · White Sound</motion.p>
        <h1 id="m-title" className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] font-light tracking-[-0.04em]">
          {["Will your boat fit?", "Check, then call."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "italic text-harbour" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
      </div>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="max-w-md text-[18px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">Every figure on this page is published by Sea Spray or reported from the marina. Anything not published is marked, so you know what to ask on the call.</motion.p>
    </section>
  )
}

function Specs() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-32" aria-labelledby="spec-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="01" label="Dock specs" id="spec-title" title={<>The numbers.</>} /></div>
        <dl className="divide-y divide-line border-y border-line lg:col-span-8">
          {SPECS.map(([k, v, ask]) => (
            <div key={k} className="grid gap-1 py-5 md:grid-cols-[1fr_1.6fr] md:items-baseline">
              <dt className="label text-muted">{k}</dt>
              <dd className={`font-display text-[1.7rem] font-light ${ask ? "text-harbour italic" : ""}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Checker() {
  return (
    <section className="bg-paper-2" aria-labelledby="chk-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Head index="02" label="Slip check" id="chk-title" title={<>Your boat against the dock.</>} />
        <div className="mt-14"><SlipCheck /></div>
      </div>
    </section>
  )
}

function Request() {
  return (
    <section id="request" className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="req-title">
      <div className="lg:col-span-4">
        <Head index="03" label="Request" id="req-title" title={<>Request a slip.</>}>
          <p className="mt-6 max-w-sm text-[18px] leading-relaxed text-muted">The dock office takes requests by phone and on the radio. Fill in your boat and dates, then read the line out.</p>
          <img src={`${CDN}69e126c8318d5f95a14b7e12_PHOTO-2026-01-13-09-17-01%20(1).jpg`} alt="A white motorboat with fishing rods running across turquoise water at sunset" width={800} height={600} loading="lazy" className="mt-10 hidden aspect-[4/3] w-full rounded-[18px] bg-[#9fb9b5] object-cover lg:block" />
        </Head>
      </div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><Enquiry /></Reveal>
    </section>
  )
}

function Call() {
  return (
    <section className="bg-ink text-paper" aria-label="Call the marina">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-display text-[clamp(2rem,4vw,3.4rem)] font-light">Underway? Hail <span className="italic text-seaglass">Sea Spray on 16.</span></p>
        <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px"><Phone className="size-4" aria-hidden />{PHONE}</a>
      </div>
    </section>
  )
}

mount(<Page current="Marina"><Hero /><Specs /><Checker /><Request /><Call /></Page>)
