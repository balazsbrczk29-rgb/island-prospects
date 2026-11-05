import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label, Reveal, ease, PHONE, TEL } from "./site"

type Field = { k: string; label: string; type: "text" | "select" | "number"; options?: string[] }
const COMMON_END: Field[] = [
  { k: "start", label: "When you want to start", type: "select", options: ["As soon as possible", "Within 3 months", "Within 6 months", "Still planning"] },
  { k: "drawings", label: "Drawings", type: "select", options: ["Approved drawings ready", "Drawings in progress", "No drawings yet"] },
]
const TYPES: Record<string, { label: string; intro: string; fields: Field[] }> = {
  build: {
    label: "New building",
    intro: "A new home or commercial building on your site.",
    fields: [
      { k: "use", label: "Building type", type: "select", options: ["Home", "Apartments", "Commercial", "Industrial or warehouse", "Other"] },
      { k: "where", label: "Site location (area or street)", type: "text" },
      { k: "size", label: "Rough size (sq ft), if known", type: "number" },
      { k: "storeys", label: "Storeys", type: "select", options: ["One", "Two", "Three or more"] },
      ...COMMON_END,
    ],
  },
  reno: {
    label: "Addition or renovation",
    intro: "Extending, rebuilding or upgrading a building you already have.",
    fields: [
      { k: "work", label: "What needs doing", type: "text" },
      { k: "where", label: "Property location (area or street)", type: "text" },
      { k: "occupied", label: "Occupied during works", type: "select", options: ["Yes", "No", "Not sure"] },
      ...COMMON_END,
    ],
  },
  consult: {
    label: "Consulting",
    intro: "Advice on a project you are planning or already building.",
    fields: [
      { k: "stage", label: "Project stage", type: "select", options: ["Planning", "Tendering", "Under construction", "Stalled or unfinished"] },
      { k: "topic", label: "What you need advice on", type: "text" },
      { k: "where", label: "Project location", type: "text" },
    ],
  },
}

export function Brief({ n }: { n: string }) {
  const [tab, setTab] = useState("build")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const conf = TYPES[tab]
  const parts = conf.fields.map(f => vals[`${tab}:${f.k}`] ? `${f.label.replace(/ \(.*\)|, if known/g, "")}: ${vals[`${tab}:${f.k}`]}` : null).filter(Boolean)
  const summary = parts.length ? `${conf.label}. ${parts.join(". ")}.` : ""
  const set = (k: string, v: string) => setVals(s => ({ ...s, [`${tab}:${k}`]: v }))
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ } }
  return (
    <section id="brief" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="brief-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n={n}>Project brief</Label>
          <h2 id="brief-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">Brief us in one call.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">The office takes enquiries by phone. Pick the kind of project, fill in what you know, and we put it into one clear brief you can read out or copy.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-0 rounded-none border border-line bg-transparent p-0">
              {Object.entries(TYPES).map(([k, c]) => (
                <TabsTrigger key={k} value={k} className="min-h-12 flex-1 rounded-none border-0 px-4 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper data-[state=active]:shadow-none">{c.label}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(TYPES).map(([k, c]) => (
              <TabsContent key={k} value={k} className="mt-8">
                <p className="text-[15px] text-muted">{c.intro}</p>
                <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {c.fields.map(f => (
                    <label key={f.k} className="block">
                      <span className="label text-muted">{f.label}</span>
                      {f.type === "select" ? (
                        <select value={vals[`${k}:${f.k}`] ?? ""} onChange={e => set(f.k, e.target.value)} className="field mt-2">
                          <option value="">Choose</option>
                          {f.options!.map(o => <option key={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input type={f.type} inputMode={f.type === "number" ? "numeric" : undefined} value={vals[`${k}:${f.k}`] ?? ""} onChange={e => set(f.k, e.target.value)} className="field mt-2" />
                      )}
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-10 bg-ink p-6 text-paper md:p-8">
            <p className="label text-sand">Your brief</p>
            <AnimatePresence mode="wait">
              <motion.p key={summary || "empty"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} className="mt-3 min-h-[3.5rem] text-[17px] leading-relaxed text-paper/90">
                {summary || "Fill in a field and your brief appears here."}
              </motion.p>
            </AnimatePresence>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 bg-paper px-6 text-ink transition hover:-translate-y-0.5 active:translate-y-0"><Phone className="size-4" aria-hidden /> Call {PHONE}</a>
              <button type="button" onClick={copy} disabled={!summary} className="inline-flex min-h-12 items-center justify-center gap-2 border border-paper/30 px-6 transition hover:-translate-y-0.5 hover:border-paper disabled:opacity-40">
                {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />} {copied ? "Copied" : "Copy the brief"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
