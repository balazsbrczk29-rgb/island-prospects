import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, Lines, Photo, ease, PHONE, TEL } from "./site"
import { PLACES, TOURS, tourUrl, type Kind, type Place } from "./tours"

const KINDS: (Kind | "All")[] = ["All", "Sea and islands", "Sail and evening", "Dive and snorkel", "Culture and family", "Fishing"]

function Index() {
  const [kind, setKind] = useState<Kind | "All">("All")
  const [place, setPlace] = useState<Place | "all">("all")
  const [hover, setHover] = useState(TOURS[13])
  useEffect(() => {
    const h = window.location.hash.replace("#", "") as Place
    if (h && h in PLACES) setPlace(h)
  }, [])
  const list = useMemo(() => TOURS.filter(t => (kind === "All" || t.kind === kind) && (place === "all" || t.place === place)), [kind, place])
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-10 md:px-10 md:pt-24" aria-labelledby="ex-title">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>Excursions from Nassau and Paradise Island</Label></motion.div>
        <h1 id="ex-title" className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,7vw,7rem)] leading-[0.94] tracking-[-0.02em]">
          <Lines lines={[`${TOURS.length} ways to spend`, "a day in The Bahamas."]} />
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Every trip Majestic Tours books, from the swimming pigs of Rose Island to a two-tank shark dive. Filter by the kind of day you want, or by where it goes.</motion.p>
      </section>

      <section className="sticky top-[62px] z-30 border-y border-line bg-paper/92 backdrop-blur-md" aria-label="Filters">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1" role="group" aria-label="Type of day">
            {KINDS.map(k => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)} className={`min-h-11 shrink-0 rounded-[3px] px-4 text-[14px] transition hover:-translate-y-px ${kind === k ? "bg-green text-paper" : "text-ink hover:bg-paper-2"}`}>{k}</button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-[14px]">
            <span className="text-[11px] tracking-[0.2em] text-muted uppercase">Where</span>
            <select value={place} onChange={e => setPlace(e.target.value as Place | "all")} className="min-h-11 rounded-[3px] border border-line bg-paper px-3 text-[15px]">
              <option value="all">Everywhere</option>
              {(Object.keys(PLACES) as Place[]).map(p => <option key={p} value={p}>{PLACES[p].name}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20" aria-label="Excursion list">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-40">
              <AnimatePresence mode="wait">
                <motion.div key={hover.id} initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
                  <Photo src={hover.img} alt={hover.alt} className="aspect-[4/5] rounded-[4px]" />
                  <p className="mt-4 text-[11px] tracking-[0.2em] text-muted uppercase">{PLACES[hover.place].name} · {hover.kind}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-[13px] text-muted" aria-live="polite">{list.length} {list.length === 1 ? "excursion" : "excursions"}</p>
            <ol className="mt-4">
              {list.map((t, i) => (
                <li key={t.id} className="border-b border-line first:border-t" onMouseEnter={() => setHover(t)} onFocus={() => setHover(t)}>
                  <a href={tourUrl(t.id)} className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-6 transition hover:bg-paper-2/50 md:px-3">
                    <span className="pt-1 text-[12px] tracking-[0.18em] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-display text-[1.45rem] leading-tight">{t.name}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-muted">{t.line}</span>
                      <span className="mt-2 block text-[12px] tracking-[0.16em] text-green uppercase">{PLACES[t.place].name}{t.detail ? ` · ${t.detail}` : ""}</span>
                      <img src={t.img} alt="" width={640} height={420} loading="lazy" className="mt-4 aspect-[3/2] w-full rounded-[3px] object-cover md:hidden" />
                    </span>
                    <ArrowUpRight className="mt-2 size-4 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-green" aria-hidden />
                  </a>
                </li>
              ))}
            </ol>
            {!list.length && <p className="py-10 text-muted">No excursion of that kind goes there. Try “Everywhere”.</p>}
          </div>
        </div>
      </section>

      <section className="bg-green-deep text-paper" aria-labelledby="ask-title">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-20 md:grid-cols-12 md:items-end md:px-10 md:py-28">
          <Reveal className="md:col-span-7">
            <Label light>Not sure which day suits you?</Label>
            <h2 id="ask-title" className="mt-5 font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1]">Ask the Majestic desk in your hotel, or call us.</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3 md:col-span-4 md:col-start-9">
            <a href="index.html#plan" className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-[3px] bg-paper px-6 text-ink transition hover:-translate-y-px">Plan my excursion <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[3px] border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden /> Call {PHONE}</a>
            <p className="text-[13px] text-paper/60">Listed prices include taxes. Rates and schedules are confirmed when you book.</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

mount(<Page current="Excursions"><Index /></Page>)
