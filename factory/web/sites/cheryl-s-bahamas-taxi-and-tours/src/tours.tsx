import { useEffect, useMemo, useState, type FormEvent } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { ArrowRight, Check, Plus, X } from "lucide-react"
import { Page, Masthead, Dock, Contact, Photo, mount, useSignName, mailto, spring, R, PHONE, TEL } from "./shared"
import { STOPS, KINDS, PRESETS, type Kind, type Stop } from "./stops"

const LENGTHS = ["About 3 hours", "Full day, 8 hours or more", "Not sure yet"] as const

function StopItem({ s, on, toggle, i }: { s: Stop; on: boolean; toggle: () => void; i: number }) {
  return (
    <motion.li layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ ...spring, delay: Math.min(i, 8) * 0.03 }}
      className="grid grid-cols-[112px_1fr] gap-4 sm:block">
      {s.img ? (
        <div className="relative">
          <Photo src={R(s.img)} alt={s.alt || s.name} ratio="4 / 3" pos={s.pos} className="rounded-[var(--radius-s)] sm:rounded-[var(--radius-m)]" />
          {s.tag && <span className="tnum absolute bottom-3 left-3 hidden rounded-[6px] bg-yellow px-2.5 py-1 text-[14px] font-bold text-ink sm:inline-block">{s.tag}</span>}
        </div>
      ) : (
        <div className="grid aspect-[4/3] place-items-end rounded-[var(--radius-s)] bg-deep p-3 text-yellow sm:rounded-[var(--radius-m)] sm:p-6">
          <span className="poster text-[22px] sm:text-[52px]" aria-hidden>junkanoo</span>
        </div>
      )}
      <div className="sm:mt-5">
        <p className="text-[14px] font-bold text-deep">{s.kind}</p>
        <h3 className="display mt-1 text-[22px] sm:text-[28px]">{s.name}</h3>
        {s.tag && <p className="tnum mt-1 text-[15px] font-bold sm:hidden">{s.tag}</p>}
        <p className="mt-2 text-[16px] leading-snug text-muted sm:text-[17px]">{s.line}</p>
        <button type="button" onClick={toggle} aria-pressed={on}
          className={`mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-bold transition-colors duration-150 ${on ? "bg-deep text-white" : "border-2 border-ink/80 text-ink hover:bg-ink hover:text-white"}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={on ? "y" : "n"} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={spring} className="inline-flex">
              {on ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
            </motion.span>
          </AnimatePresence>
          {on ? "In my day" : "Add to my day"}
        </button>
      </div>
    </motion.li>
  )
}

function DayTicket({ picked, remove, name, setName }: { picked: Stop[]; remove: (id: string) => void; name: string; setName: (v: string) => void }) {
  const [len, setLen] = useState<(typeof LENGTHS)[number]>("About 3 hours")
  const [lang, setLang] = useState<"English" | "Español">("English")
  const [people, setPeople] = useState(2)
  const [sent, setSent] = useState(false)
  useEffect(() => { const d = new URLSearchParams(location.search).get("day"); if (d === "full") setLen("Full day, 8 hours or more") }, [])
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) || "").trim()
    window.location.href = mailto(`Private tour for ${name.trim() || g("who")}`, [
      `Name: ${name.trim() || g("who")}`, `Length: ${len}`, `Language: ${lang}`, `Guests: ${people}`, `Date: ${g("date")}`, `Pick up from: ${g("from")}`,
      "", "Stops I would like:", ...(picked.length ? picked.map(s => `- ${s.name}`) : ["- Please suggest a day for us"]),
      "", g("note") && `Anything else: ${g("note")}`, `Contact: ${g("contact")}`,
    ])
    setSent(true)
  }
  return (
    <form id="day" onSubmit={submit} className="scroll-mt-6 rounded-[var(--radius-l)] bg-deep p-6 text-white sm:p-8">
      <h2 className="poster text-[44px]">your day.</h2>
      <label htmlFor="who" className="mt-5 block text-[14px] font-bold text-aqua">Name on the card</label>
      <input id="who" name="who" value={name} onChange={e => setName(e.target.value.slice(0, 32))} placeholder="Your name"
        className="mt-1 w-full border-b-2 border-white/30 bg-transparent pb-1.5 font-display text-[26px] font-bold tracking-[-0.02em] text-yellow placeholder:text-white/35 focus:border-yellow focus:outline-none" />

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

      <div className="mt-6 grid gap-5">
        <div>
          <span className="block text-[14px] font-bold text-aqua" id="len-l">How long</span>
          <div className="mt-2 grid gap-1.5" role="group" aria-labelledby="len-l">
            {LENGTHS.map(l => <button type="button" key={l} aria-pressed={len === l} onClick={() => setLen(l)}
              className={`min-h-11 rounded-[10px] px-3 text-left text-[15px] font-bold transition-colors ${len === l ? "bg-yellow text-ink" : "bg-white/10 text-white hover:bg-white/15"}`}>{l}</button>)}
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
        <div><label htmlFor="date" className="block text-[14px] font-bold text-aqua">Date</label>
          <input id="date" name="date" type="date" className="mt-2 min-h-12 w-full rounded-[10px] bg-white px-3 text-ink" /></div>
        <div><label htmlFor="from" className="block text-[14px] font-bold text-aqua">Pick up from (hotel or cruise ship)</label>
          <input id="from" name="from" className="mt-2 min-h-12 w-full rounded-[10px] bg-white px-3 text-ink" /></div>
        <div><label htmlFor="contact" className="block text-[14px] font-bold text-aqua">Your email or phone</label>
          <input id="contact" name="contact" required className="mt-2 min-h-12 w-full rounded-[10px] bg-white px-3 text-ink" /></div>
        <div><label htmlFor="note" className="block text-[14px] font-bold text-aqua">Celebrating, or anything else?</label>
          <input id="note" name="note" className="mt-2 min-h-12 w-full rounded-[10px] bg-white px-3 text-ink" /></div>
      </div>
      <button type="submit" className="btn btn-primary mt-7 w-full">Send my day to Cheryl <ArrowRight className="size-[18px]" aria-hidden /></button>
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
            <h1 id="t-title" className="poster text-[clamp(3.6rem,9vw,9rem)]">pick your <span className="text-deep">stops.</span></h1>
            <p className="mt-6 max-w-[46ch] text-[length:var(--t-4)] leading-snug">Every Cheryl's tour is private. Add what you like, leave out what you don't, and the day is planned around you. Drinks are included; most historic sites charge $3 to $5 entry.</p>
            <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter stops">
              {(["All", ...KINDS] as const).map(k => (
                <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}
                  className={`min-h-11 rounded-full px-5 text-[15px] font-bold transition-colors ${kind === k ? "bg-ink text-white" : "bg-paper-2 text-ink hover:bg-line"}`}>
                  {k}{k !== "All" && <span className="tnum ml-1.5 opacity-60">{STOPS.filter(s => s.kind === k).length}</span>}
                </button>
              ))}
            </div>
          </section>
          <div className="mx-auto grid max-w-[1360px] gap-12 px-4 pb-32 sm:px-8 lg:grid-cols-12 lg:gap-10">
            <LayoutGroup>
              <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:col-span-8" aria-label="Tour stops">
                <AnimatePresence mode="popLayout">
                  {list.map((s, i) => <StopItem key={s.id} s={s} i={i} on={ids.includes(s.id)} toggle={() => toggle(s.id)} />)}
                </AnimatePresence>
              </ul>
            </LayoutGroup>
            <aside className="lg:col-span-4" aria-label="Your day">
              <div className="lg:sticky lg:top-6"><DayTicket picked={picked} remove={id => toggle(id)} name={name} setName={setName} /></div>
            </aside>
          </div>
        </main>
      </div>
      <Contact />
      <Dock action={{ href: "#day", label: picked.length ? `Your day · ${picked.length}` : "Your day" }} />
    </Page>
  )
}

mount(<Tours />)
