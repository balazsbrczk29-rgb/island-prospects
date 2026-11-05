import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label, Reveal, ease, BOOK, EMAIL, PHONE, TEL } from "./site"

type F = { k: string; label: string; type: "text" | "date" | "number" | "select"; options?: string[] }
const TYPES: Record<string, { label: string; subject: string; fields: F[] }> = {
  stay: { label: "A stay", subject: "Room enquiry", fields: [
    { k: "Arrival", label: "Arrival", type: "date" }, { k: "Departure", label: "Departure", type: "date" },
    { k: "Guests", label: "Guests", type: "number" },
    { k: "Room", label: "Room", type: "select", options: ["Executive King Room", "Executive Family Room", "Not sure yet"] },
  ] },
  water: { label: "Diving or kitesurfing", subject: "Diving and kitesurfing enquiry", fields: [
    { k: "Activity", label: "Activity", type: "select", options: ["Diving", "Kitesurfing", "Snorkel trip", "A mix"] },
    { k: "Dates", label: "Your dates", type: "text" },
    { k: "People", label: "How many of you", type: "number" },
    { k: "Experience", label: "Experience", type: "select", options: ["First time", "Some experience", "Experienced"] },
  ] },
  dining: { label: "Dining", subject: "Restaurant enquiry", fields: [
    { k: "Date", label: "Date", type: "date" },
    { k: "Meal", label: "Meal", type: "select", options: ["Breakfast", "Lunch", "Dinner"] },
    { k: "Party", label: "Party size", type: "number" },
    { k: "Notes", label: "Dietary notes", type: "text" },
  ] },
}

export function Enquire({ n = "06" }: { n?: string }) {
  const [tab, setTab] = useState("stay")
  const [name, setName] = useState("")
  const [vals, setVals] = useState<Record<string, string>>({})
  const conf = TYPES[tab]
  const parts = conf.fields.map(f => vals[`${tab}:${f.k}`] ? `${f.label}: ${vals[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[]
  const body = [`Hello Pauline and Antoine,`, ``, `${conf.subject} from the website.`, ...parts, ``, name ? `Thank you, ${name}` : `Thank you`].join("\n")
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${conf.subject}${name ? `, ${name}` : ""}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="enquire" className="bg-paper-2" aria-labelledby="enquire-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n={n}>Enquire</Label>
          <h2 id="enquire-title" className="display mt-6 text-[clamp(2.6rem,4.6vw,4.4rem)]">Write to Pauline and Antoine.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">For live availability and instant booking, use the booking page. For anything else, fill this in and we write the email for you.</p>
          <a href={BOOK} className="btn mt-8">Check dates and book <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper p-1">
              {Object.entries(TYPES).map(([k, c]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-1 rounded-full px-4 text-[15px] data-[state=active]:bg-grape data-[state=active]:text-paper">{c.label}</TabsTrigger>)}
            </TabsList>
            <label className="mt-8 block">
              <span className="label text-muted">Your name</span>
              <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="field mt-2" />
            </label>
            {Object.entries(TYPES).map(([k, c]) => (
              <TabsContent key={k} value={k} className="mt-6">
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {c.fields.map(f => (
                    <label key={f.k} className="block">
                      <span className="label text-muted">{f.label}</span>
                      {f.type === "select" ? (
                        <select value={vals[`${k}:${f.k}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f.k}`]: e.target.value }))} className="field mt-2">
                          <option value="">Choose</option>{f.options!.map(o => <option key={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input type={f.type} min={f.type === "number" ? 1 : undefined} value={vals[`${k}:${f.k}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f.k}`]: e.target.value }))} className="field mt-2" />
                      )}
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-10 rounded-[28px] bg-atlantic p-6 text-paper md:p-8">
            <p className="label text-conch">Your message</p>
            <AnimatePresence mode="wait">
              <motion.p key={parts.join("|") || tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} className="mt-3 min-h-[3rem] text-[17px] leading-relaxed text-paper/90">
                {parts.length ? `${conf.subject}. ${parts.join(" · ")}` : "Your details will appear here as you fill them in."}
              </motion.p>
            </AnimatePresence>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-0.5"><Mail className="size-4" aria-hidden /> Send by email</a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/35 px-6 transition hover:-translate-y-0.5 hover:border-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
            <p className="mt-4 text-[13px] text-paper/60">Opens your email app with the message filled in, addressed to {EMAIL}.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
