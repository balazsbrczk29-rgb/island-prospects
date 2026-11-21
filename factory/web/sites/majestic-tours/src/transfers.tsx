import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Phone } from "lucide-react"
import { MODES, PIC, PHONE, TEL, OFFICE, OFFICE_TEL } from "./data"
import { mount, useLenis, TopBar, Footer, Img, EnquiryForm } from "./ui"
import { FloatingActions } from "./sections"

type Mode = keyof typeof MODES

function Steps({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="font-display text-[1.8rem]">{title}</h3>
      <ol className="mt-4 border-t border-line">
        {items.map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-line py-5">
            <span className="tnum font-display text-[1.6rem] leading-none text-green">{i + 1}</span>
            <span className="text-body leading-relaxed">{s}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

function Transfers() {
  useLenis()
  const [mode, setMode] = useState<Mode>("shared")
  const [where, setWhere] = useState("Airport transfer")
  const keys = Object.keys(MODES) as Mode[]
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <TopBar current="transfers.html" />
      <main id="main">
        <section className="grid items-end gap-x-[5vw] gap-y-10 px-[var(--pad)] pt-[clamp(40px,7vw,96px)] pb-[clamp(56px,7vw,96px)] md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="text-small text-muted italic">Lynden Pindling International to your hotel, and back</p>
            <h1 className="display mt-3 text-[clamp(3.4rem,7.6vw,7.8rem)] leading-[0.88]">Met outside Customs, driven to your hotel.</h1>
            <p className="mt-8 max-w-[36rem] text-lead leading-snug">Air-conditioned vans, buses, limousines, town cars and SUVs. Finalise transportation bookings at least five days ahead.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
              <a href="#page-form" className="btn">Ask for a transfer</a>
              <a href={OFFICE_TEL} className="link tnum text-small"><Phone className="size-4" strokeWidth={1.5} aria-hidden />Head office {OFFICE}</a>
            </div>
          </div>
          <figure className="w-full md:w-[min(560px,40vw)]">
            <Img pic={PIC.fleet} className="w-full" eager />
            <figcaption className="mt-3 text-cap text-muted italic">Part of the Majestic fleet, parked by the water in Nassau.</figcaption>
          </figure>
        </section>

        <section aria-labelledby="how-h" className="bg-field px-[var(--pad)] py-[clamp(72px,9vw,128px)]">
          <h2 id="how-h" className="display max-w-[18ch] text-[clamp(2.6rem,5vw,5rem)]">Choose how you travel. Three steps each way.</h2>
          <div role="tablist" aria-label="Transfer type" className="mt-10 flex flex-wrap gap-2">
            {keys.map(k => (
              <button key={k} role="tab" type="button" aria-selected={mode === k} onClick={() => setMode(k)} className={`min-h-12 border px-5 text-small transition-colors duration-200 ${mode === k ? "border-green bg-green text-white" : "border-ink/25 hover:border-ink/60"}`}>{MODES[k].label}</button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={mode} role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <p className="mt-8 max-w-[40rem] text-lead leading-snug">{MODES[mode].intro}</p>
              <div className="mt-10 grid gap-x-[5vw] gap-y-10 md:grid-cols-2">
                <Steps title="Arriving" items={MODES[mode].arrive} />
                <Steps title="Going home" items={MODES[mode].depart} />
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section id="page-form" aria-labelledby="q-h" className="grid gap-x-[6vw] gap-y-10 px-[var(--pad)] py-[clamp(72px,9vw,128px)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <h2 id="q-h" className="display text-[clamp(2.6rem,5vw,5rem)]">Send your flight, we send the car.</h2>
            <p className="mt-6 max-w-[30rem] text-body text-muted">Add your arrival date, flight and hotel in the note. Accessible transport needs 48 hours' notice.</p>
            <a href={TEL} className="tnum mt-8 block font-display text-[2.4rem] leading-none tracking-[-0.02em] no-underline hover:text-green">{PHONE}</a>
          </div>
          <div className="border border-ink/15 p-[clamp(20px,3vw,40px)]"><EnquiryForm where={where} onWhere={setWhere} idp="t" /></div>
        </section>
      </main>
      <Footer />
      <FloatingActions planHref="#page-form" />
    </>
  )
}
mount(<Transfers />)
