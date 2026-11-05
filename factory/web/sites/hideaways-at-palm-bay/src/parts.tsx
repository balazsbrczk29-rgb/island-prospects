import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { IMG, BOOK, EMAIL, PHONE, TEL, Label, Reveal, Photo, ease } from "./site"

/* ---------- rooms (hideawayspalmbay.com, Accommodations) ---------- */
export type Room = { id: string; name: string; side: "beach" | "hill"; view: string; br: number; beds: string; kitchen: string; baths: string; patio: string; img: string }
export const ROOMS: Room[] = [
  { id: "ov1", name: "One Bedroom Ocean View Cottage", side: "beach", view: "Ocean view", br: 1, beds: "1 king or 2 queens", kitchen: "Expanded kitchenette", baths: "1 full bath", patio: "Private patio, dinette for 4", img: IMG.cottageOV },
  { id: "gv1", name: "One Bedroom Garden View Studio Cottage", side: "beach", view: "Garden view", br: 1, beds: "1 king, king + queen, or king + 2 singles", kitchen: "Expanded kitchenette", baths: "1 bath", patio: "Patio for 2, dinette for 4", img: IMG.gardenView },
  { id: "gv2", name: "Two Bedroom Garden View Cottage", side: "beach", view: "Garden view", br: 2, beds: "King + queen", kitchen: "Kitchenette", baths: "1.5 baths", patio: "Patio for 4", img: IMG.cottage2BR },
  { id: "pov", name: "One Bedroom Partial Ocean View Villa", side: "beach", view: "Partial ocean view", br: 1, beds: "King + queen sofa sleeper", kitchen: "Full kitchen", baths: "2 full baths", patio: "Partial ocean-view patio for 2", img: IMG.partialOV },
  { id: "ov2", name: "Two Bedroom Ocean View Villa", side: "beach", view: "Ocean view", br: 2, beds: "King + queen, each with ensuite", kitchen: "Full kitchen", baths: "2 ensuite baths", patio: "Ocean-view patio for 4", img: IMG.villa2OV },
  { id: "st", name: "Island Time Studio", side: "hill", view: "Island view", br: 1, beds: "1 king", kitchen: "Mini kitchen", baths: "1 full bath", patio: "Garden-view patio for 2", img: IMG.studio },
  { id: "h1", name: "Island Time One Bedroom Villa", side: "hill", view: "Over the Beach Club and Elizabeth Bay", br: 1, beds: "1 king", kitchen: "Full kitchen", baths: "2 full baths", patio: "Patio for 4", img: IMG.villa1H },
  { id: "h2", name: "Island Time Two Bedroom Villa", side: "hill", view: "Over the Beach Club and Elizabeth Bay", br: 2, beds: "King + queen sofa sleeper", kitchen: "Full kitchen", baths: "2 full baths", patio: "Patio for 4", img: IMG.villa2H },
]

export function RoomFinder({ full = false }: { full?: boolean }) {
  const [side, setSide] = useState<"all" | "beach" | "hill">("all")
  const [br, setBr] = useState(0)
  const list = ROOMS.filter(r => (side === "all" || r.side === side) && (br === 0 || r.br === br))
  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label text-muted">Where on the property</p>
          <div className="mt-3 inline-flex flex-wrap gap-1 rounded-full bg-paper-2 p-1" role="radiogroup" aria-label="Location on the property">
            {([["all", "Everything"], ["beach", "Ocean side"], ["hill", "Hillside villas"]] as const).map(([k, l]) => (
              <button key={k} role="radio" aria-checked={side === k} onClick={() => setSide(k)} className={`min-h-11 rounded-full px-5 text-[15px] transition ${side === k ? "bg-ink text-paper" : "hover:bg-paper"}`}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="label text-muted">Bedrooms</p>
          <div className="mt-3 inline-flex gap-1 rounded-full bg-paper-2 p-1" role="radiogroup" aria-label="Bedrooms">
            {([[0, "Any"], [1, "Studio or one"], [2, "Two"]] as const).map(([g, l]) => <button key={g} role="radio" aria-checked={br === g} onClick={() => setBr(g)} className={`min-h-11 rounded-full px-4 text-[15px] transition ${br === g ? "bg-ink text-paper" : "hover:bg-paper"}`}>{l}</button>)}
          </div>
        </div>
      </div>
      <p className="mt-6 text-[15px] text-muted" aria-live="polite">{list.length} {list.length === 1 ? "room type fits" : "room types fit"}. Every one has A/C, cable TV, an in-room safe and a private patio.</p>
      <motion.ul layout className={`mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 ${full ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        <AnimatePresence mode="popLayout">
          {list.map(r => (
            <motion.li key={r.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.45, ease }}>
              <a href={full ? BOOK : `stay.html#${r.id}`} id={full ? r.id : undefined} className="group block scroll-mt-24">
                <div className="aspect-[4/3] overflow-hidden rounded-[10px] bg-paper-2">
                  <img src={r.img} alt={`${r.name} at Hideaways at Palm Bay`} width={1280} height={960} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="label mt-4 text-deep">{r.side === "beach" ? "Ocean side" : "Hillside"} · {r.view}</p>
                <h3 className="mt-1 font-display text-[1.6rem] leading-tight">{r.name}</h3>
                <dl className="mt-3 grid grid-cols-[6rem_1fr] gap-y-1 text-[14px]">
                  <dt className="text-muted">Beds</dt><dd>{r.beds}</dd>
                  <dt className="text-muted">Kitchen</dt><dd>{r.kitchen}</dd>
                  {full && <><dt className="text-muted">Baths</dt><dd>{r.baths}</dd><dt className="text-muted">Outside</dt><dd>{r.patio}</dd></>}
                </dl>
                <span className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-deep">{full ? "Check dates" : "See details"} <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {!list.length && <p className="mt-8 text-[17px]">Nothing matches. Try another part of the property, or call {PHONE}.</p>}
    </div>
  )
}

/* ---------- specials (hideawayspalmbay.com, Specials, read 2026-11-05) ---------- */
type Who = "bahamas" | "us" | "florida" | "europe" | "latam" | "pilot"
type Special = { who: Who[]; title: string; what: string; code: string; minNights: number; bookBy: string; travel: string; blackout: string }
const BO = "Nov 26 to 28, 2026; Dec 19, 2026 to Jan 1, 2027; Mar 25 to 28, 2027; Jul 1 to 4, 2027"
const SPECIALS: Special[] = [
  { who: ["bahamas"], title: "Two fly or cruise free from Nassau or Freeport", what: "One free airline or Bahamas Ferries ticket for a pre-booked 2-night stay, two free tickets for 4 nights or more, plus your hotel offer.", code: "FLYFREEBAHAMAS", minNights: 2, bookBy: "2027-06-30", travel: "Jul 5, 2026 to Oct 31, 2027", blackout: BO },
  { who: ["pilot"], title: "Private pilots: fly almost fee free", what: "A $300 fee credit on a stay of 4 nights or more.", code: "FEEFREE", minNights: 4, bookBy: "2027-06-30", travel: "Jul 5, 2026 to Oct 31, 2027", blackout: BO },
  { who: ["pilot"], title: "Private pilots: island hopping", what: "A $150 fee credit on a pre-booked 2-night stay.", code: "ISLANDHOPPING", minNights: 2, bookBy: "2027-06-30", travel: "Jul 5, 2026 to Oct 31, 2027", blackout: BO },
  { who: ["us", "florida", "europe"], title: "Black Friday $500 air credit", what: "Pre-book an air-inclusive package of 7 nights or more (double occupancy) for a $500 air credit and free round-trip airport transfers.", code: "BLACKFRIDAY25", minNights: 7, bookBy: "2026-11-09", travel: "Oct 13, 2026 to Jan 31, 2027", blackout: "Nov 26 to 28, 2026; Dec 19, 2026 to Jan 1, 2027" },
  { who: ["europe"], title: "Up to $250 air or ferry credit from Florida", what: "Pre-book an air or cruise-ferry package from Florida of 4 nights or more.", code: "FLYFREEEUROPE", minNights: 4, bookBy: "2027-01-31", travel: "Nov 2, 2026 to Oct 31, 2027", blackout: BO },
  { who: ["europe"], title: "Two fly free from Nassau", what: "One free round-trip ticket from Nassau for 4 to 6 nights, two for 7 nights, on an air-inclusive booking.", code: "FLYFREEEUROPE", minNights: 4, bookBy: "2027-06-30", travel: "Jul 2, 2026 to Oct 31, 2027", blackout: "None" },
  { who: ["latam"], title: "Two fly or cruise free from Nassau", what: "For residents of Argentina, Brazil, Colombia and Mexico: one free ticket from Nassau for 4 to 6 nights, two for 7 nights (double occupancy).", code: "FLYFREEEUROPE/LATINAMERICA", minNights: 4, bookBy: "2027-06-30", travel: "Jul 2, 2026 to Oct 31, 2027", blackout: "None" },
  { who: ["florida"], title: "$250 air credit for Florida residents", what: "Pre-book an air-inclusive vacation of 3 nights or more.", code: "250FLORIDA", minNights: 3, bookBy: "2026-11-09", travel: "Aug 25 to Nov 16, 2026", blackout: "None" },
]
const WHO: [Who, string][] = [["us", "U.S. or Canada"], ["florida", "Florida"], ["bahamas", "The Bahamas"], ["europe", "Europe"], ["latam", "Latin America"], ["pilot", "I fly my own plane"]]

export function SpecialsFinder() {
  const [who, setWho] = useState<Who>("us")
  const [nights, setNights] = useState(7)
  const [today, setToday] = useState<Date | null>(null)
  const [copied, setCopied] = useState("")
  useEffect(() => setToday(new Date()), [])
  const list = useMemo(() => SPECIALS.filter(s => {
    const forMe = s.who.includes(who) || (who === "florida" && s.who.includes("us"))
    const open = !today || new Date(`${s.bookBy}T23:59:59-05:00`).getTime() >= today.getTime()
    return forMe && open
  }), [who, today])
  const daysLeft = (d: string) => today ? Math.ceil((new Date(`${d}T23:59:59-05:00`).getTime() - today.getTime()) / 86400000) : 99
  const copy = (c: string) => { navigator.clipboard?.writeText(c).catch(() => {}); setCopied(c); setTimeout(() => setCopied(""), 1600) }
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="label text-paper/70">I live in</p>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Where you live">
          {WHO.map(([k, l]) => <button key={k} role="radio" aria-checked={who === k} onClick={() => setWho(k)} className={`min-h-11 rounded-full border px-4 text-[15px] transition hover:-translate-y-px ${who === k ? "border-brand bg-brand text-ink" : "border-paper/25 text-paper hover:border-paper"}`}>{l}</button>)}
        </div>
        <label className="mt-8 block">
          <span className="label text-paper/70">Nights I'm planning</span>
          <input type="range" min={1} max={14} value={nights} onChange={e => setNights(Number(e.target.value))} className="range mt-4 w-full" aria-label="Nights" />
          <span className="mt-2 block font-display text-[2.6rem] leading-none tabular-nums">{nights} {nights === 1 ? "night" : "nights"}</span>
        </label>
      </div>
      <ul className="space-y-3 lg:col-span-8">
        <AnimatePresence mode="popLayout">
          {list.map(s => {
            const ok = nights >= s.minNights
            const left = daysLeft(s.bookBy)
            return (
              <motion.li key={s.title + s.code} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className={`rounded-[10px] border p-5 transition md:p-6 ${ok ? "border-brand/60 bg-white/5" : "border-paper/15 opacity-70"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-xl">
                    <p className="label text-brand">{ok ? "Fits your stay" : `Needs ${s.minNights}+ nights`}{left <= 14 ? ` · ends in ${left} ${left === 1 ? "day" : "days"}` : ""}</p>
                    <h3 className="mt-2 font-display text-[1.7rem] leading-tight">{s.title}</h3>
                    <p className="mt-2 text-[15px] text-paper/75">{s.what}</p>
                  </div>
                  <button type="button" onClick={() => copy(s.code)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-paper/40 px-4 font-mono text-[14px] transition hover:border-brand" aria-label={`Copy promo code ${s.code}`}>
                    {copied === s.code ? <Check className="size-4 text-brand" aria-hidden /> : <Copy className="size-4" aria-hidden />}{s.code}
                  </button>
                </div>
                <dl className="mt-4 grid gap-x-6 gap-y-1 border-t border-paper/15 pt-4 text-[13px] text-paper/70 sm:grid-cols-3">
                  <div><dt className="label !text-[10px]">Book by</dt><dd>{new Date(`${s.bookBy}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</dd></div>
                  <div><dt className="label !text-[10px]">Travel</dt><dd>{s.travel}</dd></div>
                  <div><dt className="label !text-[10px]">Blackout</dt><dd>{s.blackout}</dd></div>
                </dl>
              </motion.li>
            )
          })}
        </AnimatePresence>
        {!list.length && <li className="rounded-[10px] border border-paper/15 p-6 text-[16px] text-paper/80">No published special for that right now. Book direct and ask the front desk on {PHONE}.</li>}
        <li className="pt-2 text-[13px] text-paper/60">Offers as published by the resort; terms apply and the resort confirms eligibility. Expired offers drop off this list automatically.</li>
      </ul>
    </div>
  )
}

/* ---------- enquiry (email) ---------- */
export function Enquiry() {
  const [v, setV] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const set = (k: string, x: string) => setV(s => ({ ...s, [k]: x }))
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lines = ["Hello Hideaways,", ""]
    for (const k of ["Room", "Arriving", "Departing", "Guests", "Promo code", "Name", "Message"]) if (v[k]) lines.push(`${k}: ${v[k]}`)
    lines.push("", "(sent from the website)")
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Question about a stay")}&body=${encodeURIComponent(lines.join("\n"))}`
    setSent(true)
  }
  const input = "mt-2 block min-h-12 w-full rounded-[8px] border border-line bg-white/70 px-4 text-[17px] outline-none transition focus:border-deep"
  return (
    <form data-enquiry data-business="Hideaways at Palm Bay" data-whatsapp="" data-email={EMAIL} action={`mailto:${EMAIL}`} method="post" encType="text/plain" onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <label className="block sm:col-span-2"><span className="label text-muted">Room type</span>
        <select name="Room" value={v.Room ?? ""} onChange={e => set("Room", e.target.value)} className={input}><option value="">Help me choose</option>{ROOMS.map(r => <option key={r.id}>{r.name}</option>)}</select>
      </label>
      <label className="block"><span className="label text-muted">Arriving</span><input name="Arriving" type="date" value={v.Arriving ?? ""} onChange={e => set("Arriving", e.target.value)} className={input} /></label>
      <label className="block"><span className="label text-muted">Departing</span><input name="Departing" type="date" value={v.Departing ?? ""} onChange={e => set("Departing", e.target.value)} className={input} /></label>
      <label className="block"><span className="label text-muted">Guests</span><input name="Guests" type="number" min={1} value={v.Guests ?? ""} onChange={e => set("Guests", e.target.value)} className={input} /></label>
      <label className="block"><span className="label text-muted">Promo code, if any</span><input name="Promo code" value={v["Promo code"] ?? ""} onChange={e => set("Promo code", e.target.value)} className={input} /></label>
      <label className="block sm:col-span-2"><span className="label text-muted">Your name</span><input name="Name" required autoComplete="name" value={v.Name ?? ""} onChange={e => set("Name", e.target.value)} className={input} /></label>
      <label className="block sm:col-span-2"><span className="label text-muted">Your question</span><textarea name="Message" rows={3} value={v.Message ?? ""} onChange={e => set("Message", e.target.value)} className={`${input} resize-none py-3`} /></label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button type="submit" className="btn btn-primary justify-center"><Mail className="size-4" aria-hidden /> Email the front desk</button>
        <a href={BOOK} className="btn btn-quiet justify-center">Or check availability <ArrowUpRight className="size-4" aria-hidden /></a>
      </div>
      <p className="text-[14px] text-muted sm:col-span-2" aria-live="polite">{sent ? "Your email app opened with your details." : `Opens an email to ${EMAIL}. Prefer to talk? Call ${PHONE}.`}</p>
    </form>
  )
}

export function EnquirySection({ n }: { n?: string }) {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper-2" aria-labelledby="enq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n={n} className="text-deep">Ask us anything</Label>
          <h2 id="enq-title" className="mt-5 font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.95]">Not sure which room? <em className="text-deep">Ask the desk.</em></h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Live rates and dates are in the booking engine. For groups, special requests or which offer fits your trip, send a note or call.</p>
          <dl className="mt-10 grid gap-5 text-[15px] sm:grid-cols-2">
            <div><dt className="label text-muted">Call</dt><dd className="mt-1"><a href={TEL} className="ulink font-display text-[1.6rem]">{PHONE}</a></dd></div>
            <div><dt className="label text-muted">Find us</dt><dd className="mt-1">Jolly Hall Bay at Queen's Highway, George Town, Exuma</dd></div>
          </dl>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7"><Enquiry /></Reveal>
      </div>
    </section>
  )
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-line">
      {items.map(([q, a], i) => (
        <AccordionItem key={q} value={`f${i}`} className="border-b border-line">
          <AccordionTrigger className="min-h-14 py-5 text-left font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-normal hover:no-underline">{q}</AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { Photo }
