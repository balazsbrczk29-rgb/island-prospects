import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Page, mount, Reveal, Label, Lines, Photo, ease, OFFICE, OFFICE_TEL } from "./site"

const MODES = {
  shared: {
    label: "Shared bus",
    intro: "A shuttle bus that stops at three or four hotels on the way, on arrival and on departure.",
    arrive: ["Print your vouchers and travel documents before you fly.", "After Bahamas Customs, go out of the main doors toward Ground Transportation. A Majestic representative holds a Majestic Tours sign.", "Take the main crosswalk, turn left to the Majestic buses and show your voucher."],
    depart: ["Confirm your return time with the head office or the Majestic desk in your hotel lobby.", "Be at the front driveway of your hotel or tower at your pickup time. The bus may stop at other hotels.", "You are picked up well before your flight, allowing for US Immigration and Customs in Nassau."],
  },
  private: {
    label: "Private car",
    intro: "Stretch limousines, town cars and SUVs for guests who want a private transfer, plus private vans and buses for pre-arranged groups.",
    arrive: ["Print your private transfer documents or voucher.", "After Customs, go straight out of the main door. Look for your name on a sign held by a Majestic representative.", "They greet you, help with luggage and walk you to your car."],
    depart: ["Confirm your return time with the head office or your hotel's Majestic desk.", "Be at the front driveway at your pickup time and show your departure voucher to the driver.", "At Atlantis Cove or Reef, tell the bellman you travel with Majestic Tours: your car waits in the lot until called."],
  },
  accessible: {
    label: "Accessible van",
    intro: "Majestic is the only transportation provider on the island offering private transport for disabled guests. Arrange it at least 48 hours ahead.",
    arrive: ["Print your documents for the accessible van transfer.", "After Customs, go straight out of the main door and look for your name on a Majestic sign.", "The representative helps with luggage and takes you to the van."],
    depart: ["Confirm your return time with the head office or the Majestic desk.", "Be at the front driveway at your pickup time; the driver will be there.", "Pickup allows for US Immigration and Customs in Nassau."],
  },
} as const
type Mode = keyof typeof MODES

function Steps({ items, title }: { items: readonly string[]; title: string }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] text-muted uppercase">{title}</p>
      <ol className="mt-4">
        {items.map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.6, ease }} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-line py-5">
            <span className="font-display text-3xl text-green">{i + 1}</span>
            <span className="text-[16px] leading-relaxed">{s}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

function Transfers() {
  const [mode, setMode] = useState<Mode>("shared")
  const desks = ["Atlantis, Coral Tower", "Atlantis, Beach Tower", "Comfort Suites Paradise Island", "RIU Paradise Island", "Warwick Paradise Island", "Margaritaville Beach Resort", "Courtyard Marriott", "Melia Nassau Beach"]
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:grid-cols-12 md:px-10 md:pt-24 md:pb-24" aria-labelledby="tr-title">
        <div className="md:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>Airport transfers · Lynden Pindling International</Label></motion.div>
          <h1 id="tr-title" className="mt-6 font-display text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.94] tracking-[-0.02em]"><Lines lines={["From the arrivals", "hall to your hotel."]} /></h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease }} className="mt-8 max-w-xl text-[18px] leading-relaxed text-muted">Air-conditioned vans, buses, limousines, town cars and SUVs, with a representative waiting outside Customs. Please finalise transportation bookings at least 5 days in advance.</motion.p>
        </div>
        <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.3, duration: 1.3, ease: [0.77, 0, 0.175, 1] }} className="md:col-span-5">
          <Photo priority src="https://majestictoursbahamas.com/transportation/images/fleet.jpg" alt="Majestic Tours buses and vans lined up" className="aspect-[4/3] rounded-[4px] md:aspect-[4/5]" />
        </motion.div>
      </section>

      <section className="bg-paper-2" aria-labelledby="how-title">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <Label>01 · How it works</Label>
            <h2 id="how-title" className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1]">Choose your transfer. Three steps each way.</h2>
          </Reveal>
          <Tabs value={mode} onValueChange={v => setMode(v as Mode)} className="mt-10">
            <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-[4px] bg-paper p-1">
              {(Object.keys(MODES) as Mode[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 rounded-[3px] px-5 data-[state=active]:bg-green data-[state=active]:text-paper">{MODES[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(MODES) as Mode[]).map(k => (
              <TabsContent key={k} value={k} className="mt-10">
                <p className="max-w-2xl text-[18px] leading-relaxed text-muted">{MODES[k].intro}</p>
                <div className="mt-10 grid gap-12 md:grid-cols-2">
                  <Steps title="Arriving" items={MODES[k].arrive} />
                  <Steps title="Departing" items={MODES[k].depart} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="desks" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="desk-title">
        <Reveal className="md:col-span-5">
          <Label>02 · In your hotel</Label>
          <h2 id="desk-title" className="mt-5 font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1]">A Majestic desk in the lobby.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Confirm a return transfer or book an excursion with the Majestic representative at your hotel, or call the head office.</p>
          <a href={OFFICE_TEL} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-[3px] bg-green px-6 text-paper transition hover:-translate-y-px hover:bg-green-deep"><Phone className="size-4" aria-hidden /> Head office {OFFICE}</a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <ul>
            {desks.map((d, i) => (
              <li key={d} className="group flex items-baseline justify-between gap-4 border-b border-line py-5 first:border-t">
                <span className="font-display text-[1.5rem] transition group-hover:translate-x-1">{d}</span>
                <span className="text-[12px] tracking-[0.18em] text-muted">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-muted">Desk locations as published on majestictoursbahamas.com; extensions to be confirmed.</p>
        </Reveal>
      </section>

      <section className="bg-ink text-paper" aria-labelledby="quote-title">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-20 md:grid-cols-12 md:items-end md:px-10 md:py-28">
          <Reveal className="md:col-span-7">
            <Label light>03 · A quote</Label>
            <h2 id="quote-title" className="mt-5 font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1]">Dinner in town, a wedding, a conference group.</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-paper/70">Majestic also escorts guests around town for a special evening, and with its sister company Bahama Fantasies manages events for corporate and leisure groups.</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <a href="index.html#plan" className="group inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[3px] bg-paper px-6 text-ink transition hover:-translate-y-px">Request a transfer quote <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
          </Reveal>
        </div>
      </section>
    </>
  )
}

mount(<Page current="Airport transfers"><Transfers /></Page>)
