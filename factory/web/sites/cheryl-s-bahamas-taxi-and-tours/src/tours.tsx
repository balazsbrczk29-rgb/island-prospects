import { useEffect, useMemo, useState, type FormEvent } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { ArrowRight, Check, Plus, X } from "lucide-react"
import { Page, Masthead, Dock, Contact, Photo, mount, useSignName, mailto, spring, R, PHONE, TEL } from "./shared"
import { STOPS, KINDS, PRESETS, type Kind, type Stop } from "./stops"

const LENGTHS = ["3 hours", "Full day", "Not sure"] as const
const LEN_FULL: Record<string, string> = { "3 hours": "About 3 hours", "Full day": "Full day, 8 hours or more", "Not sure": "Not sure yet" }

function StopItem({ s, on, toggle, i }: { s: Stop; on: boolean; toggle: () => void; i: number }) {
  return (
    <motion.li layout="position" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ ...spring, delay: Math.min(i, 10) * 0.025 }}
      className={`group relative grid grid-cols-[1fr_auto] items-start gap-x-4 border-t border-line py-6 transition-colors duration-200 sm:gap-x-8 sm:py-7 ${on ? "bg-yellow/35" : ""}`}>
      <div className="min-w-0 pl-0 sm:pl-2">
        <h3 className="display text-[26px] leading-[1.02] sm:text-[38px]">{s.name}</h3>
        <p className="mt-2 max-w-[62ch] text-[16px] leading-snug text-muted sm:text-[17px]">{s.line}</p>
        {s.note && <p className="tnum mt-2 text-[15px] font-bold text-deep">{s.note}</p>}
      </div>
      <button type="button" onClick={toggle} aria-pressed={on} aria-label={`${on ? "Remove" : "Add"} ${s.name} ${on ? "from" : "to"} my day`}
        className={`mt-1 inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-[16px] font-bold transition-colors duration-150 sm:pr-4 ${on ? "bg-ink text-white" : "text-ink underline decoration-2 underline-offset-[6px] hover:bg-ink/5"}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={on ? "y" : "n"} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={spring} className="inline-flex">
            {on ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
          </motion.span>
        </AnimatePresence>
        {on ? "added" : "add"}
      </button>
    </motion.li>
  )
}

const STRIP = [
  { f: "the-forts.png", alt: "Fort Fincastle and the 66 Steps", pos: "25% 50%" },
  { f: "conch.png", alt: "A Cheryl's guide holding a fresh conch at a conch stand", pos: "28% 50%" },
  { f: "fish-fry.png", alt: "Painted seafood shacks at the Fish Fry", pos: "50% 50%" },
  { f: "swim-with-pigs.png", alt: "Pigs swimming in clear water off an Exuma cay", pos: "50% 80%" },
]

function DayTicket({ picked, remove, name, setName }: { picked: Stop[]; remove: (id: string) => void; name: string; setName: (v: string) => void }) {
  const [len, setLen] = useState<(typeof LENGTHS)[number]>("3 hours")
  const [lang, setLang] = useState<"English" | "Español">("English")
  const [people, setPeople] = useState(2)
  const [sent, setSent] = useState(false)
  useEffect(() => { const d = new URLSearchParams(location.search).get("day"); if (d === "full") setLen("Full day") }, [])
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) || "").trim()
    window.location.href = mailto(`Private tour for ${name.trim() || g("who")}`, [
      `Name: ${name.trim() || g("who")}`, `Length: ${LEN_FULL[len]}`, `Language: ${lang}`, `Guests: ${people}`, `Date: ${g("date")}`, `Pick up from: ${g("from")}`,
      "", "Stops I would like:", ...(picked.length ? picked.map(s => `- ${s.name}`) : ["- Please suggest a day for us"]),
      "", g("note") && `Anything else: ${g("note")}`, `Contact: ${g("contact")}`,
    ])
    setSent(true)
  }
  return (
    <form id="day" onSubmit={submit} className="scroll-mt-6 rounded-[var(--radius-l)] bg-deep p-6 text-white sm:p-8">
      <h2 className="poster text-[38px]">your day.</h2>
      <label htmlFor="who" className="mt-5 block text-[14px] font-bold text-aqua">Name on the card</label>
      <input id="who" name="who" value={name} onChange={e => setName(e.target.value.slice(0, 32))} placeholder="Your name"
        className="mt-1 w-full border-b-2 border-white/30 bg-transparent pb-1.5 marker text-[28px] text-yellow placeholder:text-white/60 focus:border-yellow focus:outline-none" />

      <div className="mt-6">
        <p className="text-[14px] font-bold text-aqua">{picked.length ? `${picked.length} stop${picked.length > 1 ? "s" : ""}` : "No stops yet"}</p>
        <ul className="mt-2 flex flex-col">
          <AnimatePresence initial={false}>
            {picked.map(s => (
              <motion.li key={s.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={spring}
                className="flex items-center justify-between gap-3 border-b border-white/15 py-1">
                <span className="font-bold">{s.name}</span>
                <button type="button" onClick={() => remove(s.id)} aria-label={`Remove ${s.name}`} className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-white/10"><X className="size-4" aria-hidden /></button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {!picked.length && <p className="mt-1 text-[15px] text-white/75">Add stops from the list, or send it empty and Cheryl will suggest a day.</p>}
      </div>

      <div className="mt-5 grid gap-4">
        <div>
          <span className="block text-[14px] font-bold text-aqua" id="len-l">How long</span>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-[10px] bg-white/10 p-1" role="group" aria-labelledby="len-l">
            {LENGTHS.map(l => <button type="button" key={l} aria-pressed={len === l} onClick={() => setLen(l)}
              className={`min-h-11 rounded-[7px] px-2 text-[14px] font-bold transition-colors ${len === l ? "bg-white text-ink" : "text-white hover:bg-white/10"}`}>{l}</button>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[14px] font-bold text-aqua" id="lang-l">Language</span>
            <div className="mt-2 grid grid-cols-2 gap-1 rounded-[10px] bg-white/10 p-1" role="group" aria-labelledby="lang-l">
              {(["English", "Español"] as const).map(l => <button type="button" key={l} aria-pressed={lang === l} onClick={() => setLang(l)} lang={l === "Español" ? "es" : "en"}
                className={`min-h-11 rounded-[7px] text-[14px] font-bold ${lang === l ? "bg-white text-ink" : "text-white"}`}>{l}</button>)}
            </div>
          </div>
          <div>
            <span className="block text-[14px] font-bold text-aqua" id="ppl-l">Guests</span>
            <div className="mt-2 flex items-center justify-between rounded-[10px] bg-white/10 p-1" role="group" aria-labelledby="ppl-l">
              <button type="button" aria-label="Fewer guests" onClick={() => setPeople(p => Math.max(1, p - 1))} className="size-11 rounded-[7px] text-[20px] font-bold hover:bg-white/10">−</button>
              <output className="tnum font-display text-[22px] font-bold" aria-live="polite">{people}</output>
              <button type="button" aria-label="More guests" onClick={() => setPeople(p => Math.min(40, p + 1))} className="size-11 rounded-[7px] text-[20px] font-bold hover:bg-white/10">+</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label htmlFor="date" className="block text-[14px] font-bold text-aqua">Date</label>
            <input id="date" name="date" type="date" className="mt-2 min-h-12 w-full rounded-[10px] bg-white px-2 text-[15px] text-ink" /></div>
          <div><label htmlFor="from" className="block text-[14px] font-bold text-aqua">Hotel or ship</label>
            <input id="from" name="from" className="mt-2 min-h-12 w-full rounded-[10px] bg-white px-3 text-ink" /></div>
        </div>
        <div><label htmlFor="contact" className="block text-[14px] font-bold text-aqua">Your email or phone</label>
          <input id="contact" name="contact" required className="mt-2 min-h-12 w-full rounded-[10px] bg-white px-3 text-ink" /></div>
        <div><label htmlFor="note" className="block text-[14px] font-bold text-aqua">Celebrating, or anything else? (optional)</label>
          <input id="note" name="note" className="mt-2 min-h-12 w-full rounded-[10px] bg-white px-3 text-ink" /></div>
      </div>
      <button type="submit" className="btn btn-primary mt-6 w-full">Send my day to Cheryl <ArrowRight className="size-[18px]" aria-hidden /></button>
      <p className="mt-3 text-[14px] text-white/75" role="status">{sent ? "Your email app should be open with your day filled in." : <>Opens your email app, filled in. Or call <a href={TEL} className="tnum font-bold text-white underline underline-offset-4">{PHONE}</a>.</>}</p>
    </form>
  )
}

function Tours() {
  const [name, setName] = useSignName()
  const [kind, setKind] = useState<Kind | "All">("All")
  const [ids, setIds] = useState<string[]>([])
  useEffect(() => { const d = new URLSearchParams(location.search).get("day"); if (d && PRESETS[d]) setIds(PRESETS[d]) }, [])
  const list = useMemo(() => STOPS.filter(s => kind === "All" || s.kind === kind), [kind])
  const picked = ids.map(id => STOPS.find(s => s.id === id)!).filter(Boolean)
  const toggle = (id: string) => setIds(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])
  return (
    <Page>
      <div className="on-light bg-paper">
        <Masthead dark={false} />
        <main id="main">
          <section aria-labelledby="t-title" className="mx-auto max-w-[1360px] px-4 pb-10 pt-14 sm:px-8 lg:pt-20">
            <h1 id="t-title" className="poster text-[clamp(3.4rem,8.6vw,8.6rem)] tracking-[-0.06em]">pick your <span className="text-deep">stops.</span></h1>
            <p className="mt-6 max-w-[46ch] text-[length:var(--t-4)] leading-snug">Every Cheryl's tour is private. Add what you like, leave out what you don't, and the day is planned around you. Drinks are included; most historic sites charge $3 to $5 entry.</p>
          </section>
          <div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-2 px-4 sm:px-8 lg:grid-cols-4" aria-label="A few of the stops">
            {STRIP.map((p, i) => <Photo key={p.f} src={R(p.f)} alt={p.alt} ratio="4 / 3" pos={p.pos} eager={i < 2} className={`rounded-[var(--radius-s)] ${i > 1 ? "hidden lg:block" : ""}`} />)}
          </div>
          <div className="mx-auto mt-14 grid max-w-[1360px] gap-12 px-4 pb-32 sm:px-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap gap-x-6 gap-y-1 border-b-2 border-ink pb-3" role="group" aria-label="Filter stops">
                {(["All", ...KINDS] as const).map(k => (
                  <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}
                    className={`min-h-11 text-[16px] font-bold transition-colors ${kind === k ? "text-ink underline decoration-[3px] decoration-yellow underline-offset-[10px]" : "text-muted hover:text-ink"}`}>
                    {k}{k !== "All" && <span className="tnum ml-1.5 font-normal">{STOPS.filter(s => s.kind === k).length}</span>}
                  </button>
                ))}
              </div>
              <LayoutGroup>
                <ul aria-label="Tour stops">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {list.map((s, i) => <StopItem key={s.id} s={s} i={i} on={ids.includes(s.id)} toggle={() => toggle(s.id)} />)}
                  </AnimatePresence>
                </ul>
              </LayoutGroup>
            </div>
            <aside className="lg:col-span-4" aria-label="Your day">
              <div className="lg:sticky lg:top-4 lg:max-h-[calc(100svh-32px)] lg:overflow-y-auto lg:rounded-[var(--radius-l)]"><DayTicket picked={picked} remove={id => toggle(id)} name={name} setName={setName} /></div>
            </aside>
          </div>
        </main>
      </div>
      <Contact />
      <Dock action={{ href: "#day", label: picked.length ? `Your day · ${picked.length}` : "Your day" }} hideWhile={["day"]} />
    </Page>
  )
}

mount(<Tours />)
