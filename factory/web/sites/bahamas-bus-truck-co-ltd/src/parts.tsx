import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DEPTS, NEW, USES, V, type Use } from "./data"
import { H2, Label, Reveal, ease, PHONE, TEL } from "./site"

export function Lineup({ n = "01" }: { n?: string }) {
  const [use, setUse] = useState<Use>("family")
  const list = NEW.filter(m => m.uses.includes(use))
  const u = USES.find(x => x.id === use)!
  return (
    <section id="lineup" className="overflow-hidden bg-paper-2" aria-labelledby="lineup-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6"><Label n={n}>The lineup</Label><H2 id="lineup-title">What do you need it for?</H2></div>
          <div role="tablist" aria-label="Filter vehicles by use" className="flex flex-wrap gap-2 lg:col-span-6 lg:justify-end">
            {USES.map(x => <button key={x.id} role="tab" aria-selected={use === x.id} onClick={() => setUse(x.id)} className={`min-h-11 rounded-xl border px-4 text-[15px] transition hover:-translate-y-px ${use === x.id ? "border-ink bg-ink text-paper" : "border-line bg-paper"}`}>{x.label}</button>)}
          </div>
        </Reveal>
        <AnimatePresence mode="wait"><motion.p key={use} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 max-w-xl text-[17px] text-muted">{u.line}</motion.p></AnimatePresence>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((m, i) => (
              <motion.a layout key={m.img} href="#request" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ delay: i * 0.05, duration: 0.7, ease }} className="group block">
                <div className="relative flex aspect-[16/9] items-end justify-center">
                  <img src={`${V}${m.img}/side.png`} alt={`${m.brand} ${m.model}, side view`} loading="lazy" width={800} height={400} className="relative z-10 max-h-full w-[92%] object-contain transition duration-500 group-hover:-translate-x-2" />
                  <span className="absolute inset-x-0 bottom-1 h-[3px] road opacity-60" aria-hidden />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-ink/15 pt-3">
                  <span><span className="label text-olive">{m.brand}</span><span className="mt-1 block font-display text-xl">{m.model}</span></span>
                  <span className="text-right text-[13px] text-muted">{m.kind}</span>
                </div>
                <p className="mt-1 text-[15px] text-muted">{m.line}</p>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
        <p className="mt-12 text-[14px] text-muted">Prices on request. Call the showroom or book a test drive for current stock and pricing.</p>
      </div>
    </section>
  )
}

export function Departments({ n = "03" }: { n?: string }) {
  const [id, setId] = useState("sales")
  const d = DEPTS.find(x => x.id === id)!
  return (
    <section id="departments" className="bg-ink text-paper" aria-labelledby="dept-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n={n} light>Departments and hours</Label>
          <H2 id="dept-title">Four desks, one address.</H2>
          <div role="tablist" aria-label="Departments" className="mt-10 border-t border-paper/15">
            {DEPTS.map(x => <button key={x.id} role="tab" aria-selected={id === x.id} onClick={() => setId(x.id)} className="group flex w-full items-center justify-between border-b border-paper/15 py-4 text-left"><span className={`font-display text-xl transition group-hover:translate-x-1 ${id === x.id ? "text-paper" : "text-paper/45"}`}>{x.name}</span><span className={`size-2 rounded-full ${id === x.id ? "bg-lime" : "bg-paper/20"}`} /></button>)}
          </div>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <AnimatePresence mode="wait">
            <motion.div key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }}>
              <p className="text-[19px] leading-relaxed text-paper/85">{d.purpose}</p>
              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {d.hours.map(([k, v]) => <div key={k} className="rounded-2xl bg-asphalt p-5"><dt className="label text-lime">{k}</dt><dd className="mt-2 font-display text-xl">{v}</dd></div>)}
              </dl>
              <ul className="mt-10 space-y-3">{d.notes.map(x => <li key={x} className="flex gap-3 text-[16px] text-paper/80"><span className="mt-2.5 h-px w-4 shrink-0 bg-lime" />{x}</li>)}</ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-paper px-5 text-ink transition hover:-translate-y-0.5"><Phone className="size-4" aria-hidden />{PHONE}</a>
                <a href={`mailto:${d.email}`} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-paper/30 px-5 transition hover:-translate-y-0.5 hover:border-paper"><Mail className="size-4" aria-hidden />{d.email}</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

type F = { k: string; type?: string; opts?: string[] }
const REQ: Record<string, { label: string; email: string; subject: string; note: string; fields: F[] }> = {
  service: { label: "Service", email: "service@bahamasbus.com", subject: "Service appointment request", note: "Appointments are required. Drop off by 9am for same-day service consideration.", fields: [{ k: "Vehicle (make and model)" }, { k: "Year" }, { k: "VIN" }, { k: "What it needs", opts: ["Scheduled maintenance", "Warranty work", "General servicing", "Not sure"] }, { k: "Preferred day", type: "date" }] },
  drive: { label: "Test drive", email: "sales@bahamasbus.com", subject: "Test drive request", note: "Appointments are preferred for test drives, but not required.", fields: [{ k: "Model", opts: NEW.map(m => `${m.brand} ${m.model}`) }, { k: "Preferred day", type: "date" }, { k: "Trade-in vehicle, if any" }] },
  parts: { label: "Parts", email: "parts@bahamasbus.com", subject: "Parts enquiry", note: "Your VIN gets the quickest answer. Special orders are available for non-stock items.", fields: [{ k: "Vehicle (make and model)" }, { k: "Year" }, { k: "VIN" }, { k: "Part needed" }] },
}

export function Request({ n = "04" }: { n?: string }) {
  const [tab, setTab] = useState("service")
  const [name, setName] = useState("")
  const [v, setV] = useState<Record<string, string>>({})
  const r = REQ[tab]
  const lines = r.fields.map(f => v[`${tab}:${f.k}`] ? `${f.k}: ${v[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[]
  const href = `mailto:${r.email}?subject=${encodeURIComponent(r.subject + (name ? `, ${name}` : ""))}&body=${encodeURIComponent(`Hello,\n\n${r.subject}.\n${lines.join("\n")}\n\n${name ? `Name: ${name}\n` : ""}Thank you`)}`
  return (
    <section id="request" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="req-title">
      <Reveal className="lg:col-span-4">
        <Label n={n}>Book a visit</Label>
        <H2 id="req-title">Tell the right desk, first time.</H2>
        <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Pick what you need. We put the details each department asks for into one email, sent straight to them.</p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-auto w-full gap-1 rounded-xl bg-paper-2 p-1">
            {Object.entries(REQ).map(([k, x]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-1 rounded-lg data-[state=active]:bg-ink data-[state=active]:text-paper">{x.label}</TabsTrigger>)}
          </TabsList>
          <label className="mt-8 block"><span className="label text-muted">Your name</span><input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="field mt-2" /></label>
          {Object.entries(REQ).map(([k, x]) => (
            <TabsContent key={k} value={k} className="mt-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {x.fields.map(f => (
                  <label key={f.k} className="block"><span className="label text-muted">{f.k}</span>
                    {f.opts ? <select value={v[`${k}:${f.k}`] ?? ""} onChange={e => setV(s => ({ ...s, [`${k}:${f.k}`]: e.target.value }))} className="field mt-2"><option value="">Choose</option>{f.opts.map(o => <option key={o}>{o}</option>)}</select>
                      : <input type={f.type ?? "text"} value={v[`${k}:${f.k}`] ?? ""} onChange={e => setV(s => ({ ...s, [`${k}:${f.k}`]: e.target.value }))} className="field mt-2" />}
                  </label>
                ))}
              </div>
              <p className="mt-4 text-[14px] text-muted">{x.note}</p>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-8 rounded-2xl bg-ink p-6 text-paper md:p-8">
          <p className="label text-lime">To {r.email}</p>
          <p className="mt-3 min-h-[3rem] text-[17px] text-paper/90">{lines.length ? lines.join(" · ") : "Your details will appear here."}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-lime px-6 font-medium text-ink transition hover:-translate-y-0.5"><Mail className="size-4" aria-hidden />Send to {r.label.toLowerCase()}</a>
            <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-paper/30 px-6 transition hover:-translate-y-0.5"><Phone className="size-4" aria-hidden />{PHONE}</a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function Arrow() { return <ArrowUpRight className="size-4" aria-hidden /> }
