import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ATTORNEYS, MATTERS, type AKey } from "./data"
import { Page, mount, Reveal, Label, ease, OFFICES, TEL, PHONE } from "./site"

type OK = keyof typeof OFFICES

/** Two offices, two islands: schematic outlines of New Providence and Long Island joined by a hairline. */
function IslandsDrawing({ active, onPick }: { active: OK | null; onPick?: (o: OK) => void }) {
  const draw = (d: number) => ({ initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { delay: d, duration: 2.2, ease: [0.77, 0, 0.175, 1] as const } })
  const np = "M60 92 C78 80 108 78 132 82 C158 86 186 80 214 84 C236 87 248 96 238 106 C222 118 188 112 160 116 C132 120 104 122 80 114 C64 108 52 100 60 92 Z"
  const li = "M318 196 C326 204 334 222 344 238 C356 258 372 276 384 300 C396 324 410 350 426 372 C438 390 452 402 446 410 C440 416 428 404 418 390 C402 368 388 344 374 320 C360 296 344 274 332 252 C322 232 312 214 310 202 C309 194 312 190 318 196 Z"
  return (
    <svg viewBox="0 0 500 460" className="w-full" role="img" aria-label="Illustration, not to scale: New Providence with Nassau chambers, and Long Island with the Salt Pond office, joined by a fine line.">
      <defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#8a6a3b" strokeWidth="0.6" opacity=".35" /></pattern></defs>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <line key={i} x1="0" x2="500" y1={40 + i * 48} y2={40 + i * 48} stroke="#d9d0c1" strokeWidth="0.6" />)}
      <g className="cursor-pointer" onClick={() => onPick?.("nassau")}>
        <path d={np} fill={active === "nassau" ? "url(#hatch)" : "transparent"} />
        <motion.path d={np} fill="none" stroke="#1d1b17" strokeWidth="1.3" {...draw(0.3)} />
        <circle cx="150" cy="88" r={active === "nassau" ? 6 : 4} fill="#8a6a3b" />
        <text x="60" y="152" fontFamily="Libre Caslon Display, Georgia, serif" fontSize="22" fill="#1d1b17">New Providence</text>
        <text x="60" y="172" fontFamily="Public Sans, sans-serif" fontSize="11" letterSpacing="2" fill="#6b6357">NASSAU CHAMBERS</text>
      </g>
      <motion.path d="M150 88 C210 120 280 160 334 232" fill="none" stroke="#8a6a3b" strokeWidth="1" strokeDasharray="2 5" {...draw(1.2)} />
      <g className="cursor-pointer" onClick={() => onPick?.("longisland")}>
        <path d={li} fill={active === "longisland" ? "url(#hatch)" : "transparent"} />
        <motion.path d={li} fill="none" stroke="#1d1b17" strokeWidth="1.3" {...draw(0.6)} />
        <circle cx="352" cy="262" r={active === "longisland" ? 6 : 4} fill="#8a6a3b" />
        <text x="200" y="300" fontFamily="Libre Caslon Display, Georgia, serif" fontSize="22" fill="#1d1b17">Long Island</text>
        <text x="200" y="320" fontFamily="Public Sans, sans-serif" fontSize="11" letterSpacing="2" fill="#6b6357">SALT POND OFFICE</text>
      </g>
      <text x="0" y="452" fontFamily="Public Sans, sans-serif" fontSize="10" letterSpacing="1.5" fill="#6b6357">ILLUSTRATION, NOT TO SCALE</text>
    </svg>
  )
}

function Hero() {
  return (
    <section className="relative" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1360px] px-3 pt-3 md:px-6 md:pt-6">
        <div className="relative grid min-h-[calc(100svh-110px)] border border-line bg-paper-2/40 lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 md:p-12 lg:col-span-7 lg:border-r lg:border-line">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-[11.5px] tracking-[0.22em] text-muted uppercase">Attorneys-at-law · Nassau and Long Island, The Bahamas</motion.p>
            <div className="py-12">
              <h1 id="hero-title" className="font-display text-[clamp(3.4rem,9.2vw,9.6rem)] leading-[0.86] tracking-[-0.03em] text-ink">
                {["Harding-Lee", "& Company"].map((l, i) => (
                  <span key={l} className="block overflow-hidden pb-[0.08em]">
                    <motion.span className="block" initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.12, duration: 1.3, ease: [0.77, 0, 0.175, 1] }}>
                      {i === 1 ? <><i className="text-brass">&amp;</i> Company</> : l}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease }} className="mt-8 max-w-[34ch] font-display text-[clamp(1.35rem,2vw,1.85rem)] leading-[1.3] text-ink/85">
                A boutique Bahamian law firm since 1996, for property, companies and the people behind them.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }} className="flex flex-wrap gap-3">
              <a href="#consult" className="group inline-flex min-h-12 items-center gap-3 bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-chambers">Discuss your matter <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
              <a href={TEL} className="group inline-flex min-h-12 items-center gap-2 border border-ink/30 px-6 text-[15px] transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden /> Nassau {PHONE}</a>
            </motion.div>
          </div>
          <div className="relative flex items-center p-6 md:p-12 lg:col-span-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.2 }} className="w-full"><IslandsDrawing active={null} /></motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    ["Nassau chambers", PHONE, TEL],
    ["Long Island office", "(242) 338-0009", "tel:+12423380009"],
    ["In practice since", "1996", "#firm"],
    ["Courts", "All courts of the Commonwealth", "practice.html"],
  ]
  return (
    <section className="mx-auto mt-3 max-w-[1360px] px-3 md:mt-6 md:px-6" aria-label="Key information">
      <ul className="grid bg-chambers text-paper sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.9 }} className="border-paper/15 max-sm:border-b sm:max-lg:odd:border-r lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-6 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="text-[11px] tracking-[0.22em] text-brass-light uppercase">{k}</span>
              <span className="mt-2 block font-display text-[clamp(1.4rem,2vw,1.9rem)] leading-tight">{v}</span>
              <span className="mt-3 block h-px w-0 bg-brass-light transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Firm() {
  return (
    <section id="firm" className="scroll-mt-24 mx-auto max-w-[1360px] px-5 py-28 md:px-10 md:py-44" aria-labelledby="firm-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-3"><Label n="i.">The firm</Label></Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <h2 id="firm-title" className="font-display text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[1.04] tracking-[-0.02em]">Small by design. <i className="text-brass">Forty years</i> of Bahamian practice at the head of it.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.05}><p className="text-[18px] leading-[1.7] text-ink/80">Harding-Lee &amp; Company has practised since 1996. It is a boutique firm by choice, built on a client-centred approach, and it serves a wide range of institutional and individual clients, at home and worldwide.</p></Reveal>
            <Reveal delay={0.12}><p className="text-[18px] leading-[1.7] text-ink/80">Its general practice centres on commercial law, conveyancing, company incorporation, international and domestic transactions, insurance and banking, from chambers in Nassau and an office in Salt Pond, Long Island.</p></Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Matter() {
  const [id, setId] = useState(MATTERS[0].id)
  const m = MATTERS.find(x => x.id === id)!
  const [who, setWho] = useState<AKey>(m.who[0])
  const [vals, setVals] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const pick = (nid: string) => { setId(nid); const nm = MATTERS.find(x => x.id === nid)!; if (!nm.who.includes(who)) setWho(nm.who[0]) }
  const a = ATTORNEYS[who]
  const lines = m.ask.map(q => vals[`${id}:${q}`] ? `${q}: ${vals[`${id}:${q}`]}` : null).filter(Boolean)
  const body = [`Dear ${a.name.split(" ").slice(-1)[0] === "Harding-Lee" ? "Mrs. Harding-Lee" : "Mrs. Johnson"},`, "", `I would like to discuss: ${m.label.toLowerCase()}.`, ...lines, "", name ? `Kind regards,\n${name}` : "Kind regards,"].join("\n")
  const href = `mailto:${a.email}?subject=${encodeURIComponent(`Enquiry: ${m.area}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="consult" className="scroll-mt-24 border-y border-line bg-paper-2" aria-labelledby="consult-title">
      <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Label n="ii.">Your matter</Label>
            <h2 id="consult-title" className="mt-6 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] tracking-[-0.02em]">Tell us what it concerns.</h2>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Choose the nearest description. We show which attorney's practice covers it, then prepare a short email to them with the details you add. Nothing is sent until you press send in your own email.</p>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal>
              <ul className="flex flex-wrap gap-2" role="radiogroup" aria-label="What your matter concerns">
                {MATTERS.map(x => (
                  <li key={x.id}><button type="button" role="radio" aria-checked={id === x.id} onClick={() => pick(x.id)} className={`min-h-11 border px-4 text-[15px] transition hover:-translate-y-px ${id === x.id ? "border-ink bg-ink text-paper" : "border-ink/25 bg-paper hover:border-ink"}`}>{x.label}</button></li>
                ))}
              </ul>
            </Reveal>
            <AnimatePresence mode="wait">
              <motion.div key={id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }} className="mt-10 border-t border-ink/15 pt-10">
                <p className="text-[11px] tracking-[0.22em] text-brass uppercase">{m.area}</p>
                <p className="mt-3 max-w-2xl font-display text-[clamp(1.4rem,2.1vw,1.9rem)] leading-snug">{m.note}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {m.who.map(k => (
                    <button key={k} type="button" onClick={() => setWho(k)} aria-pressed={who === k} className={`flex min-h-14 items-center gap-3 border px-4 py-2 text-left transition hover:-translate-y-px ${who === k ? "border-brass bg-paper" : "border-ink/15"}`}>
                      <span className={`size-2.5 rounded-full ${who === k ? "bg-brass" : "bg-line"}`} aria-hidden />
                      <span><span className="block font-display text-lg leading-tight">{ATTORNEYS[k].name}</span><span className="block text-[13px] text-muted">{ATTORNEYS[k].role}</span></span>
                    </button>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {m.ask.map(q => (
                    <label key={q} className="block"><span className="text-[11px] tracking-[0.18em] text-muted uppercase">{q}</span>
                      <input value={vals[`${id}:${q}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${id}:${q}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-xl outline-none transition focus:border-brass" /></label>
                  ))}
                  <label className="block"><span className="text-[11px] tracking-[0.18em] text-muted uppercase">Your name</span>
                    <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-xl outline-none transition focus:border-brass" /></label>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex flex-col gap-4 bg-ink p-6 text-paper md:flex-row md:items-center md:justify-between md:p-8">
              <p className="text-[15px] text-paper/75">To <span className="text-paper">{a.email}</span>{lines.length ? ` · ${lines.length} detail${lines.length > 1 ? "s" : ""} added` : ""}</p>
              <a href={href} className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-paper px-6 text-ink transition hover:-translate-y-px"><Mail className="size-4" aria-hidden /> Write to {a.name.split(" ")[0]}</a>
            </div>
            <p className="mt-4 text-[13px] text-muted">Sending an email does not create a lawyer and client relationship. Please do not include confidential documents in a first message.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Offices() {
  const [o, setO] = useState<OK>("nassau")
  const off = OFFICES[o]
  return (
    <section id="offices" className="scroll-mt-24 mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="off-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Label n="iii.">Offices</Label>
            <h2 id="off-title" className="mt-6 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] tracking-[-0.02em]">Two islands, one practice.</h2>
          </Reveal>
          <div className="mt-10 flex gap-2" role="tablist" aria-label="Choose an office">
            {(Object.keys(OFFICES) as OK[]).map(k => (
              <button key={k} role="tab" aria-selected={o === k} onClick={() => setO(k)} className={`min-h-11 border px-5 text-[15px] transition ${o === k ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`}>{OFFICES[k].island}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={o} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-10" role="tabpanel">
              <p className="font-display text-3xl">{off.name}</p>
              <address className="mt-4 text-[17px] leading-relaxed text-ink/80 not-italic">{off.lines.map(l => <span key={l} className="block">{l}</span>)}</address>
              <div className="mt-6 grid gap-2">
                {off.tel.map(([t, h]) => <a key={t} href={h} className="group flex min-h-11 items-center justify-between border-b border-line text-[17px] hover:text-brass"><span>Tel {t}</span><ArrowRight className="size-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden /></a>)}
                <p className="flex min-h-11 items-center border-b border-line text-[17px] text-muted">Fax {off.fax}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="grid gap-6 lg:col-span-7 lg:grid-cols-2">
          <div className="border border-line p-4"><IslandsDrawing active={o} onPick={setO} /></div>
          <div className="min-h-[340px] overflow-hidden border border-line">
            <iframe key={o} title={`Map of ${off.name}`} loading="lazy" className="size-full min-h-[340px]" src={`https://www.google.com/maps?q=${off.map}&output=embed`} />
          </div>
        </div>
      </div>
    </section>
  )
}

const LEDGER = [
  ["1982", "Donna M. Harding-Lee is called to The Bahamas Bar and joins Cash, Fountain & Company, where she later becomes a partner."],
  ["1982 to 1996", "Fourteen years at Cash, Fountain & Company, working closely with Sir Gerald Cash and tutored under Sir Cyril Fountain, former Chief Justice."],
  ["1996", "She founds Harding-Lee & Company."],
  ["2005", "Nadia Hope Johnson is called to the Bar of England & Wales and The Bahamas Bar, and joins the firm."],
  ["Today", "The Senior Partner chairs the Board of Bank of The Bahamas."],
]
function Ledger() {
  return (
    <section className="bg-chambers text-paper" aria-labelledby="ledger-title">
      <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Label n="iv." light>Record</Label>
            <h2 id="ledger-title" className="mt-6 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] tracking-[-0.02em]">A practice with a long memory.</h2>
          </Reveal>
          <ol className="lg:col-span-7 lg:col-start-6">
            {LEDGER.map(([y, t], i) => (
              <motion.li key={y} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: i * 0.06, duration: 0.9, ease }} className="group grid gap-2 border-t border-paper/15 py-7 md:grid-cols-[11rem_1fr] md:gap-8">
                <span className="font-display text-2xl text-brass-light italic">{y}</span>
                <span className="text-[17px] leading-relaxed text-paper/80 transition group-hover:text-paper">{t}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where are Harding-Lee & Company's offices?", "Chambers are at Mecam House, Dowdeswell & Deveaux Streets, Nassau (P.O. Box N-877). The firm also has an office in Salt Pond, Long Island (P.O. Box LI 30-129)."],
  ["What areas of law does the firm practise?", "A general practice focused on commercial law, conveyancing, company incorporation, international and domestic transactions, insurance and banking. The attorneys' areas also include real property, estate planning, resort development, gaming, employment and family law."],
  ["Which courts does the firm appear in?", "The firm practises in all courts of the Commonwealth of The Bahamas."],
  ["How do I contact an attorney?", "Call Nassau chambers on (242) 326-4065 or the Long Island office on (242) 338-0009, or email the attorney whose practice covers your matter."],
]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <Reveal className="lg:col-span-4">
        <Label n="v.">Questions</Label>
        <h2 id="faq-title" className="mt-6 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1.04] tracking-[-0.02em]">Before you call.</h2>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

mount(<Page current="The firm"><Hero /><KeyInfo /><Firm /><Matter /><Offices /><Ledger /><Questions /></Page>)
