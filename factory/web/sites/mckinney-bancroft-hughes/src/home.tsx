import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, ease, reveal, C, GROUPS } from "./site"

const RINGS = [
  { y: "1945", t: "Founded", d: "Established by Donald McKinney, Sir Oswald Bancroft and Sir Leonard Knowles: three attorneys and three support staff in the Boyle Building, downtown Nassau." },
  { y: "1947", t: "McKinney, Bancroft & Hughes", d: "Dr. Colin A. Hughes joins the partnership and the firm takes the name it still carries." },
  { y: "1990", t: "George Street", d: "The firm moves to offices on George Street, in the heart of Nassau." },
  { y: "Lex Mundi", t: "A global network", d: "The Bahamas member of Lex Mundi, the network of independent law firms in more than 100 countries." },
  { y: "Today", t: "Three offices", d: "More than thirty attorneys and a support staff of more than one hundred, in Nassau, Lyford Cay and Freeport." },
]

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <svg viewBox="0 0 800 800" className="pointer-events-none absolute top-1/2 -right-[22%] hidden h-[130%] -translate-y-1/2 text-brass lg:block" aria-hidden>
        {[380, 310, 240, 170, 100].map((r, i) => <motion.circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.55 }} transition={{ delay: 0.3 + i * 0.18, duration: 2.2, ease }} />)}
      </svg>
      <div className="relative mx-auto max-w-[1400px] px-5 pt-20 pb-20 md:px-10 md:pt-28 lg:min-h-[calc(100svh-120px)]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}><Label>Attorneys-at-law · Nassau · Lyford Cay · Freeport</Label></motion.div>
        <h1 id="hero-title" className="mt-10 max-w-[13ch] font-display text-[clamp(3.2rem,8vw,8.6rem)] leading-[0.95] font-light tracking-[-0.025em]">
          <span className="sr-only">McKinney, Bancroft &amp; Hughes: </span>
          {["Counsel in", "The Bahamas", "since 1945."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.07em]"><motion.span className={`block ${i === 2 ? "text-green italic" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.2, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease }} className="mt-12 grid max-w-3xl gap-8 border-t border-line pt-8 md:grid-cols-[1.4fr_1fr]">
          <p className="text-[18px] leading-relaxed text-muted">One of the largest and oldest law firms in The Bahamas, with an extensive international and domestic practice across twelve practice groups.</p>
          <div className="flex flex-col gap-3">
            <a href="#consult" className="group inline-flex min-h-12 items-center justify-between gap-3 bg-green px-6 text-[15px] text-ivory transition hover:bg-green-deep">Arrange a consultation <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={C.tel} className="inline-flex min-h-12 items-center gap-3 border border-ink/20 px-6 text-[15px] transition hover:border-ink"><Phone className="size-4" aria-hidden /> {C.phone}</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [["Telephone", C.phone, C.tel], ["Nassau office", "Mareva House, 4 George Street", "#offices"], ["Practice", "Twelve practice groups", "practice-groups.html"], ["Network", "Lex Mundi, The Bahamas member", "#lex-mundi"]]
  return (
    <section className="bg-green text-ivory" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1400px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="border-b border-ivory/12 sm:border-r lg:border-b-0 lg:last:border-r-0">
            <a href={href} className="group block px-5 py-8 transition hover:bg-green-deep md:px-8">
              <span className="text-[11px] tracking-[0.22em] text-brass uppercase">{k}</span>
              <span className="mt-2 block font-display text-[1.45rem] leading-snug">{v}</span>
              <span className="mt-3 block h-px w-0 bg-brass transition-all duration-700 group-hover:w-14" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function History() {
  const [i, setI] = useState(0)
  const R = RINGS[i]
  return (
    <section id="history" className="scroll-mt-24" aria-labelledby="history-title">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <svg viewBox="0 0 400 400" className="size-full" role="group" aria-label="Rings of longevity: the firm's history">
            {RINGS.map((r, k) => {
              const rad = 40 + k * 36
              const on = k === i
              return (
                <g key={r.y} className="cursor-pointer" onClick={() => setI(k)} onMouseEnter={() => setI(k)} role="button" tabIndex={0} aria-label={`${r.y}: ${r.t}`} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setI(k)}>
                  <circle cx="200" cy="200" r={rad} fill="none" stroke="transparent" strokeWidth="22" />
                  <motion.circle cx="200" cy="200" r={rad} fill="none" stroke={on ? "#1d3b33" : "#9a7d3e"} strokeWidth={on ? 2.5 : 1} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: k * 0.15, duration: 1.6, ease }} />
                  <text x={200 + rad * Math.cos(-0.9)} y={200 + rad * Math.sin(-0.9)} dx="6" fontFamily="Spectral, serif" fontSize={on ? 15 : 12} fill={on ? "#1d3b33" : "#5c5f63"} fontStyle={on ? "italic" : "normal"}>{r.y}</text>
                </g>
              )
            })}
            <circle cx="200" cy="200" r="4" fill="#1d3b33" />
          </svg>
        </div>
        <div>
          <Label n="i.">Rings of longevity</Label>
          <h2 id="history-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[1] font-light tracking-[-0.02em]">Like a tree, the firm keeps its years.</h2>
          <p className="mt-5 max-w-md text-[16px] text-muted">The rings in the firm's mark stand for its age and longevity. Choose a ring.</p>
          <div className="mt-10 min-h-[190px] border-t border-line pt-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={R.y} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }}>
                <p className="font-display text-[3.4rem] leading-none text-green italic">{R.y}</p>
                <p className="mt-4 font-display text-2xl">{R.t}</p>
                <p className="mt-2 max-w-lg text-[17px] leading-relaxed text-muted">{R.d}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex gap-2">{RINGS.map((r, k) => <button key={r.y} onClick={() => setI(k)} aria-label={r.y} aria-pressed={k === i} className="grid size-11 place-items-center"><span className={`block h-px transition-all duration-500 ${k === i ? "w-10 bg-green" : "w-5 bg-line"}`} /></button>)}</div>
        </div>
      </div>
    </section>
  )
}

const NEEDS: [string, string[]][] = [
  ["Moving to or investing in The Bahamas", ["Immigration", "Foreign & Local Investment", "Real Estate"]],
  ["Buying or developing property", ["Real Estate", "Foreign & Local Investment", "Tax & Trade"]],
  ["Running or forming a company", ["Corporate & Commercial Transactions", "Financial Services & Regulation", "Labour & Employment"]],
  ["A dispute or a claim", ["Litigation & Dispute Resolution"]],
  ["Protecting family wealth", ["Trusts & Private Client", "Family Law", "Tax & Trade"]],
  ["A vessel or an aircraft", ["Admiralty, Shipping & Aviation"]],
]
function Finder() {
  const [n, setN] = useState(0)
  return (
    <section className="bg-ivory-2" aria-labelledby="finder-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="ii.">Practice</Label>
          <h2 id="finder-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[1] font-light tracking-[-0.02em]">What brings you to the firm?</h2>
          <ul className="mt-10 border-t border-line" role="listbox" aria-label="Your matter">
            {NEEDS.map(([q], k) => (
              <li key={q} className="border-b border-line"><button role="option" aria-selected={k === n} onClick={() => setN(k)} className={`group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[17px] transition ${k === n ? "text-green" : "text-ink/70 hover:text-ink"}`}><span className={`transition ${k === n ? "translate-x-2" : ""}`}>{q}</span><span className={`h-px transition-all duration-500 ${k === n ? "w-10 bg-green" : "w-0 bg-ink group-hover:w-5"}`} /></button></li>
            ))}
          </ul>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <AnimatePresence mode="wait">
            <motion.ol key={n} initial="h" animate="s" exit="h" variants={{ s: { transition: { staggerChildren: 0.08 } }, h: {} }}>
              {NEEDS[n][1].map((g, k) => (
                <motion.li key={g} variants={{ h: { opacity: 0, x: 16 }, s: { opacity: 1, x: 0, transition: { duration: 0.55, ease } } }} className="border-b border-ink/15 py-6">
                  <a href={`practice-groups.html#${g.replace(/\W+/g, "-").toLowerCase()}`} className="group flex items-baseline gap-5">
                    <span className="font-display text-brass italic">{["a", "b", "c"][k]}.</span>
                    <span className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-tight font-light transition group-hover:text-green">{g}</span>
                    <ArrowUpRight className="ml-auto size-5 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden />
                  </a>
                </motion.li>
              ))}
            </motion.ol>
          </AnimatePresence>
          <p className="mt-6 text-[14px] text-muted">A guide to where a matter usually starts. Your attorney will bring in the right groups.</p>
        </div>
      </div>
    </section>
  )
}

const PARTNERS = [["John F. Wilson, K.C.", "Senior Partner"], ["Sean N.C. Moree, K.C.", "Partner"], ["Timothy A. Eneas, K.C.", "Partner"], ["April N. Turner", "Partner"]]
function People() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-36" aria-labelledby="people-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="iii.">The firm</Label>
          <h2 id="people-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[1] font-light tracking-[-0.02em]">Each client has one attorney. Behind them, the firm.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Every client is the responsibility of an individual lawyer, through whom the collective expertise and resources of the firm become available. Mentorship, from the founding partners onward, is how the firm trains its attorneys.</p>
        </Reveal>
        <ul className="lg:col-span-6 lg:col-start-7">
          {PARTNERS.map(([n, r], k) => (
            <motion.li key={n} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.08, duration: 0.8, ease }} className="group flex items-baseline justify-between gap-6 border-b border-line py-6">
              <span className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-light transition group-hover:translate-x-1">{n}</span>
              <span className="text-[12px] tracking-[0.2em] text-muted uppercase">{r}</span>
            </motion.li>
          ))}
          <li className="pt-6 text-[15px] text-muted">More than thirty attorneys across three offices.</li>
        </ul>
      </div>
    </section>
  )
}

function LexMundi() {
  return (
    <section id="lex-mundi" className="scroll-mt-24 bg-green text-ivory" aria-labelledby="lm-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Label n="iv." light>Lex Mundi</Label>
          <h2 id="lm-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[1] font-light tracking-[-0.02em]">One point of contact. <span className="italic text-brass">More than 100 countries.</span></h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-[17px] leading-relaxed text-ivory/80">The firm is the exclusive member in The Bahamas of Lex Mundi, the network of independent law firms. Through it, clients have preferred access to more than 21,000 lawyers worldwide, for cross-border transactions and disputes.</p>
          <blockquote className="mt-10 border-l border-brass pl-6">
            <p className="font-display text-[1.35rem] leading-snug font-light italic">"They are a great team with great lawyers. They are an institution on the island."</p>
            <footer className="mt-3 text-[12px] tracking-[0.18em] text-brass uppercase">Client comment, as published on the firm's website</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

const OFFICES = ["Nassau, Mareva House", "Lyford Cay", "Freeport"] as const
function Consult() {
  const [g, setG] = useState("")
  const [o, setO] = useState<string>(OFFICES[0])
  const [name, setName] = useState("")
  return (
    <section id="consult" className="scroll-mt-24 bg-ivory-2" aria-labelledby="consult-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="v.">Consultation</Label>
          <h2 id="consult-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[1] font-light tracking-[-0.02em]">Begin with a call.</h2>
          <p className="mt-5 max-w-sm text-[16px] text-muted">Note your matter and preferred office, then call. The firm will direct you to the right attorney.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2"><label htmlFor="g" className="text-[11px] tracking-[0.22em] text-muted uppercase">Area of law</label>
              <select id="g" value={g} onChange={e => setG(e.target.value)} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-2xl font-light outline-none focus:border-green"><option value="">Choose a practice group…</option>{GROUPS.map(([n]) => <option key={n}>{n}</option>)}</select></div>
            <div><label htmlFor="nm" className="text-[11px] tracking-[0.22em] text-muted uppercase">Your name</label><input id="nm" value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-2xl font-light outline-none focus:border-green" /></div>
            <fieldset><legend className="text-[11px] tracking-[0.22em] text-muted uppercase">Preferred office</legend>
              <div className="mt-2 flex flex-wrap gap-2">{OFFICES.map(x => <button key={x} type="button" aria-pressed={o === x} onClick={() => setO(x)} className={`min-h-11 border px-4 text-[14px] transition ${o === x ? "border-green bg-green text-ivory" : "border-line hover:border-ink"}`}>{x.split(",")[0]}</button>)}</div>
            </fieldset>
          </div>
          <div className="mt-10 flex flex-col gap-5 bg-green p-7 text-ivory md:flex-row md:items-center md:justify-between">
            <p className="text-[15px] text-ivory/80">{g || name ? <>When you call, mention: <span className="text-ivory">{[name, g, o].filter(Boolean).join(" · ")}</span></> : "Your notes appear here, to read out when you call."}</p>
            <a href={C.tel} className="inline-flex min-h-12 shrink-0 items-center gap-2 bg-ivory px-6 text-green transition hover:-translate-y-px"><Phone className="size-4" aria-hidden /> {C.phone}</a>
          </div>
          <p className="mt-3 text-[13px] text-muted">Please do not send confidential details until an attorney has been assigned to your matter.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Offices() {
  return (
    <section id="offices" className="scroll-mt-24" aria-labelledby="offices-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-28 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="vi.">Offices</Label>
          <h2 id="offices-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[1] font-light tracking-[-0.02em]">George Street, since 1990.</h2>
          <dl className="mt-10 border-t border-line text-[16px]">
            {[["Nassau", `${C.address}. ${C.box}`], ["Lyford Cay", "Western New Providence"], ["Freeport", "Grand Bahama"]].map(([k, v]) => <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-4"><dt className="font-display text-lg">{k}</dt><dd className="text-muted">{v}</dd></div>)}
          </dl>
          <a href={C.tel} className="mt-8 inline-flex min-h-12 items-center gap-3 font-display text-3xl font-light text-green hover:underline"><Phone className="size-5" aria-hidden /> {C.phone}</a>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[420px] overflow-hidden border border-line lg:col-span-6 lg:col-start-7">
          <iframe title="Map of Mareva House, George Street, Nassau" loading="lazy" className="h-[420px] w-full lg:h-full" src="https://www.google.com/maps?q=McKinney+Bancroft+%26+Hughes,+Mareva+House,+George+Street,+Nassau&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><History /><Finder /><People /><LexMundi /><Consult /><Offices /></Page>)
