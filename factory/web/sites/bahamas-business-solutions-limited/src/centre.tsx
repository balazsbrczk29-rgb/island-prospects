import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Mail, Phone, Plus, X } from "lucide-react"
import { Page, mount, ProofLine, ease, mask, C } from "./site"

const SERVICES = [
  { t: "Digital on-demand printing", d: "Short runs, printed when you need them." },
  { t: "Architectural & engineering services", d: "Plans and drawings for architects, engineers and contractors." },
  { t: "Wide format colour", d: "Large colour prints for display and presentation." },
  { t: "Banners and posters", d: "Printed large, in colour." },
  { t: "Custom printing", d: "From personal invitations and announcements to business stationery." },
  { t: "Scanning and imaging", d: "Paper records turned into digital files." },
  { t: "Binding", d: "Reports, manuals and proposals, finished and bound." },
  { t: "Graphic design", d: "Layout help when the file is not ready yet." },
  { t: "Booklet production", d: "Programmes, catalogues and handbooks." },
  { t: "Conference services", d: "Print support for meetings and events." },
]
const STEPS = [
  ["Send", "Email your files from anywhere: remote submission is accepted."],
  ["Print", "Your job runs on Xerox production equipment."],
  ["Finish", "Binding and booklet production, done in the centre."],
  ["Collect", "Pick it up in Nassau or Freeport."],
]

function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-3 hidden md:block md:inset-6" aria-hidden>
        <span className="crop -top-3.5 -left-3.5" /><span className="crop -top-3.5 -right-3.5" /><span className="crop -bottom-3.5 -left-3.5" /><span className="crop -right-3.5 -bottom-3.5" />
      </div>
      <div className="wrap grid gap-10 pt-12 pb-14 md:grid-cols-12 md:gap-6 md:pt-24 md:pb-20">
        <div className="md:col-span-7">
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="max-w-[14ch] font-display text-[length:var(--text-hero)] leading-[0.94] tracking-[-0.025em]">
            The Document Centre, in Nassau and Freeport.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-6 max-w-[48ch] text-[length:var(--text-lead)] leading-[1.5] text-muted">
            BBSL's Copy Service prints plans, banners, booklets and everything in between, powered by Xerox. Send the file from anywhere and collect the job.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#ticket" className="inline-flex min-h-12 items-center bg-cyan px-6 text-[16px] text-paper transition hover:bg-cyan-deep">Start a print job</a>
            <a href={C.copy.tel} className="inline-flex min-h-12 items-center gap-2 border border-ink px-6 text-[16px] transition hover:bg-ink hover:text-paper"><Phone className="size-4" aria-hidden /> <span className="font-mono">{C.copy.phone}</span></a>
          </div>
        </div>
        <motion.ol className="self-end border-t border-line md:col-span-5" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.2, duration: 0.9, ease: mask }}>
          {STEPS.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-line py-5">
              <span className="font-mono text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span><span className="block font-display text-[28px] leading-none">{t}</span><span className="mt-2 block text-[15px] text-muted">{d}</span></span>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

function Ticket() {
  const [picked, setPicked] = useState<string[]>([])
  const [name, setName] = useState(""); const [qty, setQty] = useState(""); const [when, setWhen] = useState(""); const [where, setWhere] = useState("Nassau")
  const toggle = (t: string) => setPicked(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])
  const body = [`Name: ${name}`, `Services: ${picked.join(", ") || "to discuss"}`, qty && `Quantity: ${qty}`, when && `Needed by: ${when}`, `Collect in: ${where}`].filter(Boolean).join("\n")
  const href = `mailto:${C.copy.email}?subject=${encodeURIComponent("Print job via website")}&body=${encodeURIComponent(`Hello Document Centre,\n\n${body}\n\nFiles attached.\n`)}`
  return (
    <section id="ticket" className="scroll-mt-6 bg-graphite py-[72px] text-paper md:py-32" aria-labelledby="ticket-title">
      <div className="wrap">
        <ProofLine n="02" name="Job ticket" light />
        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <h2 id="ticket-title" className="font-display text-[length:var(--text-h2)] leading-[1] tracking-[-0.02em]">Tick what you need.</h2>
            <ul className="mt-10 border-t border-rule-dark">
              {SERVICES.map(s => {
                const on = picked.includes(s.t)
                return (
                  <li key={s.t} className="border-b border-rule-dark">
                    <button aria-pressed={on} onClick={() => toggle(s.t)} className="group grid min-h-[68px] w-full grid-cols-[1fr_auto] items-center gap-4 py-4 text-left">
                      <span>
                        <span className={`block font-display text-[26px] leading-tight transition ${on ? "text-toner" : ""}`}>{s.t}</span>
                        <span className="mt-1 block text-[15px] text-paper-soft">{s.d}</span>
                      </span>
                      <span className={`grid size-11 place-items-center border transition duration-150 ${on ? "border-toner bg-toner text-ink" : "border-edge-dark group-hover:border-paper"}`} aria-hidden>{on ? <X className="size-4" /> : <Plus className="size-4" />}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="md:col-span-5">
            <div className="relative bg-sheet p-7 text-ink md:sticky md:top-8 md:p-9">
              <span className="crop -top-3.5 -left-3.5" aria-hidden /><span className="crop -right-3.5 -bottom-3.5" aria-hidden />
              <p className="font-mono text-[13px] tracking-[0.04em]">PRINT JOB · {where.toUpperCase()}</p>
              <div className="mt-4 min-h-[88px] border-b border-line pb-4">
                <AnimatePresence initial={false}>
                  {picked.length ? picked.map(p => (
                    <motion.p key={p} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease }} className="font-display text-[21px] leading-snug">{p}</motion.p>
                  )) : <p className="text-[15px] text-muted">Choose services on the left. They collect here.</p>}
                </AnimatePresence>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="text-[13px] text-muted">Your name</span><input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="field" /></label>
                <label className="block"><span className="text-[13px] text-muted">Quantity</span><input value={qty} inputMode="numeric" onChange={e => setQty(e.target.value)} className="field" /></label>
                <label className="block"><span className="text-[13px] text-muted">Needed by</span><input type="date" value={when} onChange={e => setWhen(e.target.value)} className="field" /></label>
                <fieldset><legend className="text-[13px] text-muted">Collect in</legend>
                  <div className="mt-2 grid grid-cols-2 gap-px bg-line">{["Nassau", "Freeport"].map(w => <button key={w} type="button" aria-pressed={where === w} onClick={() => setWhere(w)} className={`min-h-12 text-[15px] transition ${where === w ? "bg-ink text-paper" : "bg-sheet hover:bg-paper"}`}>{w}</button>)}</div>
                </fieldset>
              </div>
              <a href={href} className="mt-7 flex min-h-12 items-center justify-center gap-2 bg-cyan px-6 text-paper transition hover:bg-cyan-deep active:scale-[0.98]"><Mail className="size-4" aria-hidden /> Email the job to {C.copy.email}</a>
              <p className="mt-3 text-[13px] text-muted">Your email app opens with the ticket written. Attach your files, then send. Rates on request.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const cells = [
    { k: "Document Centre", v: C.copy.phone, s: "Call about a job", href: C.copy.tel },
    { k: "Send files", v: C.copy.email, s: "Remote submission accepted", href: `mailto:${C.copy.email}` },
    { k: "Nassau office", v: C.nassau.phone, s: C.nassau.address, href: C.nassau.tel },
    { k: "Freeport office", v: C.freeport.phone, s: C.freeport.address, href: C.freeport.tel },
  ]
  return (
    <section id="offices" className="py-[72px] md:py-32" aria-labelledby="c-title">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h2 id="c-title" className="font-display text-[length:var(--text-h2)] leading-[1] tracking-[-0.02em]">One line for every job.</h2>
          <p className="mt-6 max-w-[44ch] text-[17px] text-muted">Call or email the Copy Service and they will tell you where to collect and when your job will be ready.</p>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-2 md:col-span-7">
          {cells.map(c => (
            <a key={c.k} href={c.href} className="group bg-sheet p-7 transition hover:bg-paper">
              <span className="text-[13px] text-muted">{c.k}</span>
              <span className="mt-2 block break-words font-mono text-[22px] leading-tight group-hover:text-cyan">{c.v}</span>
              <span className="mt-2 block text-[14px] text-muted">{c.s}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

mount(<Page current="Document Centre"><Hero /><Ticket /><Contact /></Page>)
