import { useState } from "react"
import { motion } from "motion/react"
import { Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Page, mount, Reveal, Label, Heading, ease, reveal, EMAIL, PHONE, TEL } from "./site"
import { I } from "./data"

const VENUES = [
  ["On the beach", "Toes in the sand beneath a flower-covered arch, facing the turquoise sea."],
  ["In a 100-year-old church", "A charming church near the cottages at Pigeon Cay."],
  ["At the Hermitage", "A ceremony at the Hermitage on Cat Island."],
]
const SERVICES = ["Marriage licence", "Pastor, priest or Justice of the Peace", "Administration appointment and fees", "Flowers, bouquets, boutonnieres, corsages and table arrangements", "Photographer", "Full planning, before, during and after", "Rehearsal and reception dinner", "All set-up and breakdown", "Locally made wedding cakes", "Transportation and air charters from FLL", "Local DJ or a rake n scrape band"]
const GALLERY = ["weddings-3.jpg", "weddings-4.jpg", "weddings-9.jpg", "weddings-11.jpg", "weddings-12.jpg", "weddings-16.jpg"]

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="w-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-16 pb-16 md:px-10 md:pt-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p className="label text-thatch">Weddings · Pigeon Cay Beach Club · Cat Island</p>
          <h1 id="w-title" className="display mt-8 text-[clamp(3.2rem,8vw,8.4rem)]">
            {[["Married on", ""], ["Cat Island.", "italic text-thatch"]].map(([l, c], i) => <span key={l} className="block overflow-hidden pb-[0.1em]"><motion.span className={`block ${c}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.2, ease: reveal }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 max-w-md text-[18px] leading-relaxed text-ink/80">A ceremony for two, or a celebration with family and friends of up to 40 guests, planned by the club and paired with a stay in the cottages.</motion.p>
          <a href="#plan" className="pill mt-8">Plan your wedding</a>
        </div>
        <motion.div initial={{ clipPath: "inset(10% 10% 10% 10% round 24px)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }} transition={{ delay: 0.2, duration: 1.4, ease: reveal }} className="aspect-[4/5] overflow-hidden bg-paper-2 lg:col-span-5 lg:col-start-8">
          <img src={I + "weddings-1.jpg"} alt="A wedding at Pigeon Cay Beach Club" width={1000} height={1250} fetchPriority="high" className="size-full object-cover" />
        </motion.div>
      </div>
    </section>
  )
}

function Venues() {
  return (
    <section className="border-t border-line" aria-labelledby="v-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal><Label n="01">Where</Label><Heading id="v-title">Three places to say yes.</Heading></Reveal>
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {VENUES.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.9, ease }} className="border-t border-ink pt-6">
              <p className="font-display text-sm text-thatch italic">0{i + 1}</p>
              <h3 className="display mt-3 text-[2rem]">{t}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{d}</p>
            </motion.li>
          ))}
        </ol>
        <div className="no-bar mt-16 flex snap-x gap-4 overflow-x-auto" tabIndex={0} aria-label="Wedding photographs, scroll sideways">
          {GALLERY.map(f => <div key={f} className="group aspect-[3/4] w-[60vw] shrink-0 snap-start overflow-hidden rounded-[20px] bg-paper-2 md:w-[24vw]"><img src={I + f} alt="Wedding at Pigeon Cay Beach Club" loading="lazy" width={600} height={800} className="size-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>)}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="bg-deep text-paper" aria-labelledby="s-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label n="02" light>What the club arranges</Label><Heading id="s-title">You bring the rings.</Heading></Reveal>
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">{SERVICES.map(x => <li key={x} className="border-b border-paper/15 py-4 text-[16px] text-paper/85">{x}</li>)}</ul>
      </div>
    </section>
  )
}

function Plan() {
  const [tab, setTab] = useState("ceremony")
  const [v, setV] = useState<Record<string, string>>({})
  const set = (k: string, x: string) => setV(s => ({ ...s, [k]: x }))
  const lines = Object.entries(v).filter(([, x]) => x).map(([k, x]) => `${k}: ${x}`)
  const subject = tab === "ceremony" ? "Wedding enquiry" : "Wedding party stay"
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hello,\n\n${subject}.\n${lines.join("\n")}\n\nThank you`)}`
  const F = ({ k, type = "text", opts }: { k: string; type?: string; opts?: string[] }) => (
    <label className="block"><span className="label text-muted">{k}</span>
      {opts ? <select value={v[k] ?? ""} onChange={e => set(k, e.target.value)} className="field mt-2"><option value="">Choose</option>{opts.map(o => <option key={o}>{o}</option>)}</select>
        : <input type={type} value={v[k] ?? ""} onChange={e => set(k, e.target.value)} className="field mt-2" />}
    </label>
  )
  return (
    <section id="plan" className="bg-paper-2" aria-labelledby="p-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label n="03">Plan</Label><Heading id="p-title">Tell us the day you have in mind.</Heading></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full gap-1 rounded-full bg-paper p-1">
              <TabsTrigger value="ceremony" className="min-h-11 flex-1 rounded-full data-[state=active]:bg-deep data-[state=active]:text-paper">The ceremony</TabsTrigger>
              <TabsTrigger value="stay" className="min-h-11 flex-1 rounded-full data-[state=active]:bg-deep data-[state=active]:text-paper">Rooms for the party</TabsTrigger>
            </TabsList>
            <TabsContent value="ceremony" className="mt-8 grid gap-6 sm:grid-cols-2">
              {F({ k: "Your names" })}{F({ k: "Wedding date", type: "date" })}{F({ k: "Guests", opts: ["Just the two of us", "Up to 10", "10 to 25", "25 to 40"] })}{F({ k: "Venue", opts: ["On the beach", "In the church", "At the Hermitage", "Not sure yet"] })}
            </TabsContent>
            <TabsContent value="stay" className="mt-8 grid gap-6 sm:grid-cols-2">
              {F({ k: "Arrival", type: "date" })}{F({ k: "Departure", type: "date" })}{F({ k: "People staying", type: "number" })}{F({ k: "Cottages wanted", opts: ["One", "Two or three", "Four or more", "The whole club"] })}
            </TabsContent>
          </Tabs>
          <div className="mt-10 rounded-[24px] bg-deep p-6 text-paper md:p-8">
            <p className="label text-shallow">Your message</p>
            <p className="mt-3 min-h-[3rem] text-[17px] text-paper/90">{lines.length ? lines.join(" · ") : "Your details will appear here."}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-0.5"><Mail className="size-4" aria-hidden />Send by email</a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/35 px-6 transition hover:-translate-y-0.5"><Phone className="size-4" aria-hidden />{PHONE}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Weddings"><Hero /><Venues /><Services /><Plan /></Page>)
