import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Mail, Phone, Plus, X } from "lucide-react"
import { Page, mount, Reveal, Label, SplitHead, ease, reveal, C } from "./site"

const SERVICES = [
  { t: "Digital on-demand printing", d: "Short runs, printed when you need them." },
  { t: "Architectural & engineering services", d: "Plans and drawings for architects, engineers and contractors." },
  { t: "Wide format colour", d: "Large colour prints for display and presentation." },
  { t: "Banners and posters", d: "Printed large, in colour." },
  { t: "Custom printing", d: "All types, from personal invitations and announcements to business stationery." },
  { t: "Scanning and imaging", d: "Paper records turned into digital files." },
  { t: "Binding", d: "Reports, manuals and proposals, finished and bound." },
  { t: "Graphic design", d: "Layout help when the file is not ready yet." },
  { t: "Booklet production", d: "Programmes, catalogues and handbooks." },
  { t: "Conference services", d: "Print support for meetings and events." },
]

const STEPS = [
  ["Send", "Email your files from anywhere: remote submission is accepted."],
  ["Print", "Your job runs on the latest Xerox technology."],
  ["Finish", "Binding and booklet production, done in the centre."],
  ["Collect", "Pick it up in Nassau or Freeport."],
]

/** Paper formats, nested: from a letter to wide format. Purely illustrative proportions. */
function Formats() {
  const fmts = [
    { w: 520, h: 360, l: "Wide format" },
    { w: 360, h: 260, l: "Poster" },
    { w: 240, h: 180, l: "Plan" },
    { w: 150, h: 116, l: "Letter" },
  ]
  return (
    <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="Nested paper formats from a letter to wide format">
      {fmts.map((f, i) => (
        <motion.g key={f.l} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 * (fmts.length - i), duration: 0.9, ease }} style={{ transformOrigin: "20px 380px" }}>
          <rect x={20} y={380 - f.h} width={f.w} height={f.h} fill={i === 0 ? "#121417" : i === 1 ? "#0a6d8c" : i === 2 ? "#e7e3d8" : "#fbfaf6"} stroke="#121417" strokeWidth="1" />
          <text x={34} y={380 - f.h + 26} fontFamily="Geist Mono, monospace" fontSize="12" letterSpacing="2" fill={i < 2 ? "#fbfaf6" : "#121417"}>{f.l.toUpperCase()}</text>
        </motion.g>
      ))}
    </svg>
  )
}

function Hero() {
  return (
    <section className="paper-tex relative overflow-hidden bg-paper" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-16 pb-20 md:grid-cols-12 md:px-10 md:pt-24 md:pb-28">
        <div className="md:col-span-7">
          <Label>The Document Centre · Nassau & Freeport</Label>
          <h1 id="hero-title" className="mt-8 font-display text-[clamp(3.4rem,8vw,9rem)] leading-[0.86] tracking-[-0.03em]">
            <span className="sr-only">BBSL Document Centre, printing and copy service in Nassau and Freeport: </span>
            <SplitHead lines={["Send the file.", "Collect the job."]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease }} className="mt-8 max-w-[34rem] text-[18px] leading-relaxed text-muted">
            BBSL's Copy Service has printed for Nassau and Freeport for more than half a century. Known for friendly staff and quick turnaround, powered by Xerox.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href="#ticket" className="group inline-flex min-h-12 items-center gap-2 bg-ink px-6 text-paper transition hover:-translate-y-0.5 hover:bg-cyan-deep active:translate-y-0">Start a print job <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={C.copy.tel} className="inline-flex min-h-12 items-center gap-2 border border-ink px-6 transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper"><Phone className="size-4" aria-hidden /> {C.copy.phone}</a>
          </motion.div>
        </div>
        <motion.div className="md:col-span-5 md:self-end" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ delay: 0.35, duration: 1.3, ease: reveal }}>
          <Formats />
        </motion.div>
      </div>
      <ol className="mx-auto grid max-w-[1440px] border-t border-line px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {STEPS.map(([t, d], i) => (
          <motion.li key={t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.8, ease }} className="border-b border-line py-6 pr-6 lg:border-b-0">
            <span className="font-mono text-[11px] text-cyan">0{i + 1}</span>
            <p className="mt-2 font-display text-3xl">{t}</p>
            <p className="mt-2 text-[15px] text-muted">{d}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

function Ticket() {
  const [picked, setPicked] = useState<string[]>([])
  const [name, setName] = useState(""); const [qty, setQty] = useState(""); const [when, setWhen] = useState(""); const [where, setWhere] = useState("Freeport")
  const toggle = (t: string) => setPicked(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])
  const body = [`Name: ${name}`, `Services: ${picked.join(", ") || "to discuss"}`, qty && `Quantity: ${qty}`, when && `Needed by: ${when}`, `Collect in: ${where}`].filter(Boolean).join("\n")
  const href = `mailto:${C.copy.email}?subject=${encodeURIComponent("Print job via website")}&body=${encodeURIComponent(`Hello Copy Service,\n\n${body}\n\nFiles attached.\n`)}`
  return (
    <section id="ticket" className="scroll-mt-24 bg-ink text-paper" aria-labelledby="ticket-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-7">
          <Reveal>
            <Label n="01" light>What we print</Label>
            <h2 id="ticket-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.96] tracking-[-0.02em]">Tick what you need.</h2>
          </Reveal>
          <ul className="mt-12 border-t border-paper/15">
            {SERVICES.map((s, i) => {
              const on = picked.includes(s.t)
              return (
                <li key={s.t} className="border-b border-paper/15">
                  <button aria-pressed={on} onClick={() => toggle(s.t)} className="group grid min-h-[68px] w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4 text-left">
                    <span className="font-mono text-[11px] text-toner">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className={`block font-display text-[clamp(1.5rem,2.3vw,2.1rem)] leading-tight transition ${on ? "text-toner" : "group-hover:translate-x-1"}`}>{s.t}</span>
                      <span className="mt-1 block text-[14px] text-paper/60">{s.d}</span>
                    </span>
                    <span className={`grid size-10 place-items-center border transition ${on ? "border-toner bg-toner text-ink" : "border-paper/30 group-hover:border-paper"}`} aria-hidden>{on ? <X className="size-4" /> : <Plus className="size-4" />}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="md:col-span-5">
          <div className="relative bg-sheet p-7 text-ink md:sticky md:top-28 md:p-9">
            <span className="crop -top-3.5 -left-3.5" aria-hidden /><span className="crop -right-3.5 -bottom-3.5" aria-hidden />
            <p className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Job ticket</p>
            <div className="mt-4 min-h-[88px] border-b border-line pb-4">
              <AnimatePresence initial={false}>
                {picked.length ? picked.map(p => (
                  <motion.p key={p} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease }} className="font-display text-xl leading-snug">{p}</motion.p>
                )) : <p className="text-[15px] text-muted">Choose services on the left. They collect here.</p>}
              </AnimatePresence>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block"><span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Your name</span><input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none focus:border-cyan" /></label>
              <label className="block"><span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Quantity</span><input value={qty} onChange={e => setQty(e.target.value)} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none focus:border-cyan" /></label>
              <label className="block"><span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Needed by</span><input type="date" value={when} onChange={e => setWhen(e.target.value)} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none focus:border-cyan" /></label>
              <fieldset><legend className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Collect in</legend>
                <div className="mt-2 grid grid-cols-2 gap-px bg-line">{["Freeport", "Nassau"].map(w => <button key={w} type="button" aria-pressed={where === w} onClick={() => setWhere(w)} className={`min-h-12 text-[15px] transition ${where === w ? "bg-ink text-paper" : "bg-sheet hover:bg-paper"}`}>{w}</button>)}</div>
              </fieldset>
            </div>
            <a href={href} className="mt-7 flex min-h-12 items-center justify-center gap-2 bg-ink px-6 text-paper transition hover:-translate-y-0.5 hover:bg-cyan-deep active:translate-y-0"><Mail className="size-4" aria-hidden /> Email the job to {C.copy.email}</a>
            <p className="mt-3 text-[13px] text-muted">Your email app opens with the ticket written. Attach your files, then send. Rates on request.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="c-title">
      <Reveal className="md:col-span-5">
        <Label n="02">Reach the centre</Label>
        <h2 id="c-title" className="mt-5 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[0.98]">One line for every job.</h2>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Document Centres run in Nassau and Freeport. Call or email the Copy Service and they will tell you which is closest and when your job will be ready.</p>
      </Reveal>
      <Reveal delay={0.1} className="grid gap-px bg-line md:col-span-7 sm:grid-cols-2">
        <a href={C.copy.tel} className="group bg-sheet p-7 transition hover:bg-paper">
          <span className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Copy Service</span>
          <span className="mt-3 block font-display text-[clamp(2rem,3.4vw,3rem)] leading-none">{C.copy.phone}</span>
          <span className="mt-4 block h-px w-0 bg-cyan transition-all duration-500 group-hover:w-14" aria-hidden />
        </a>
        <a href={`mailto:${C.copy.email}`} className="group bg-sheet p-7 transition hover:bg-paper">
          <span className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Send files</span>
          <span className="mt-3 block break-all font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">{C.copy.email}</span>
          <span className="mt-4 block h-px w-0 bg-cyan transition-all duration-500 group-hover:w-14" aria-hidden />
        </a>
        <a href={C.freeport.tel} className="group bg-sheet p-7 transition hover:bg-paper">
          <span className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Freeport office</span>
          <span className="mt-3 block font-display text-3xl">{C.freeport.phone}</span>
          <span className="mt-2 block text-[14px] text-muted">{C.freeport.address}</span>
        </a>
        <a href={C.nassau.tel} className="group bg-sheet p-7 transition hover:bg-paper">
          <span className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Nassau office</span>
          <span className="mt-3 block font-display text-3xl">{C.nassau.phone}</span>
          <span className="mt-2 block text-[14px] text-muted">{C.nassau.address}</span>
        </a>
      </Reveal>
    </section>
  )
}

mount(<Page current="Document Centre"><Hero /><Ticket /><Contact /></Page>)
