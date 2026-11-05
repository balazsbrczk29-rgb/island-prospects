import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react"
import { C, ease } from "./site"

const KINDS = ["Something I bought", "A service or repair", "A price, bill or refund", "Something else"]
const PROOF = ["Receipt or invoice", "Bank record of the payment", "Photos of the problem", "Messages with the business", "Warranty or contract"]
const STEPS = ["What happened", "The business", "Your proof", "Your details"] as const

export function Builder({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0)
  const [v, setV] = useState({ kind: "", what: "", when: "", business: "", where: "", contacted: "", proof: [] as string[], name: "", phone: "" })
  const set = (k: keyof typeof v, val: string) => setV(s => ({ ...s, [k]: val }))
  const toggleProof = (p: string) => setV(s => ({ ...s, proof: s.proof.includes(p) ? s.proof.filter(x => x !== p) : [...s.proof, p] }))
  const lines = [
    v.name && `Name: ${v.name}`, v.phone && `Phone: ${v.phone}`,
    v.kind && `Type: ${v.kind}`, v.business && `Business: ${v.business}`, v.where && `Where: ${v.where}`, v.when && `When: ${v.when}`,
    v.contacted && `Contacted the business first: ${v.contacted}`, v.proof.length ? `Proof I have: ${v.proof.join(", ")}` : "", v.what && `What happened: ${v.what}`,
  ].filter(Boolean) as string[]
  const text = `Hello CPC, I would like to file a consumer complaint.\n\n${lines.join("\n")}`
  const wa = `https://wa.me/${C.waNum}?text=${encodeURIComponent(text)}`
  const mail = `mailto:${C.complaints}?subject=${encodeURIComponent(`Consumer complaint${v.business ? `: ${v.business}` : ""}`)}&body=${encodeURIComponent(text)}`
  const field = "mt-2 block min-h-14 w-full rounded-xl border-2 border-line bg-card px-4 text-[18px] outline-none transition focus:border-aqua"
  const label = "text-[15px] font-bold"

  return (
    <div className={`grid gap-8 ${compact ? "" : "lg:grid-cols-[1.25fr_1fr]"}`}>
      <div className="rounded-3xl bg-card p-6 shadow-[0_1px_0_#d8d4c8,0_30px_60px_-40px_rgba(20,24,27,.35)] md:p-9">
        <ol className="flex flex-wrap gap-2" aria-label="Steps">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] transition ${i === step ? "bg-ink text-white" : i < step ? "bg-aqua-soft text-aqua-deep hover:bg-aqua-soft/70" : "bg-paper-2 text-muted hover:text-ink"}`}>
                <span className={`grid size-6 place-items-center rounded-full text-[12px] ${i === step ? "bg-gold text-ink" : "bg-white/70"}`}>{i < step ? <Check className="size-3.5" aria-hidden /> : i + 1}</span>{s}
              </button>
            </li>
          ))}
        </ol>
        <div className="relative mt-8 min-h-[330px]">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease }}>
              {step === 0 && (
                <fieldset>
                  <legend className="font-display text-2xl font-semibold">What is the complaint about?</legend>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {KINDS.map(k => (
                      <button key={k} type="button" aria-pressed={v.kind === k} onClick={() => set("kind", k)} className={`flex min-h-14 items-center justify-between rounded-xl border-2 px-4 text-left text-[17px] transition hover:-translate-y-0.5 ${v.kind === k ? "border-aqua bg-aqua-soft" : "border-line bg-card hover:border-ink/40"}`}>
                        {k}{v.kind === k && <Check className="size-5 text-aqua-deep" aria-hidden />}
                      </button>
                    ))}
                  </div>
                  <label className="mt-6 block"><span className={label}>In a few words, what went wrong?</span>
                    <textarea rows={3} value={v.what} onChange={e => set("what", e.target.value)} className={`${field} py-3`} placeholder="For example: the fridge stopped working after two weeks and the store will not exchange it." />
                  </label>
                </fieldset>
              )}
              {step === 1 && (
                <div className="grid gap-5">
                  <p className="font-display text-2xl font-semibold">Which business is it?</p>
                  <label className="block"><span className={label}>Business name</span><input value={v.business} onChange={e => set("business", e.target.value)} className={field} /></label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className={label}>Island or area</span><input value={v.where} onChange={e => set("where", e.target.value)} className={field} /></label>
                    <label className="block"><span className={label}>When did it happen?</span><input type="date" value={v.when} onChange={e => set("when", e.target.value)} className={field} /></label>
                  </div>
                  <fieldset>
                    <legend className={label}>Have you already told the business?</legend>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {["Yes", "Not yet"].map(o => <button key={o} type="button" aria-pressed={v.contacted === o} onClick={() => set("contacted", o)} className={`min-h-14 rounded-xl border-2 text-[17px] transition ${v.contacted === o ? "border-aqua bg-aqua-soft" : "border-line bg-card hover:border-ink/40"}`}>{o}</button>)}
                    </div>
                    {v.contacted === "Not yet" && <p className="mt-3 rounded-xl bg-gold-soft p-4 text-[16px]">Tip: give the business a chance to fix it first. If they will not help, the Commission can step in.</p>}
                  </fieldset>
                </div>
              )}
              {step === 2 && (
                <fieldset>
                  <legend className="font-display text-2xl font-semibold">What proof do you have?</legend>
                  <p className="mt-2 text-[16px] text-muted">Tick everything you can share. Lost the receipt? You still have rights, so keep going.</p>
                  <div className="mt-5 grid gap-3">
                    {PROOF.map(p => {
                      const on = v.proof.includes(p)
                      return (
                        <button key={p} type="button" role="checkbox" aria-checked={on} onClick={() => toggleProof(p)} className={`flex min-h-14 items-center gap-4 rounded-xl border-2 px-4 text-left text-[17px] transition ${on ? "border-aqua bg-aqua-soft" : "border-line bg-card hover:border-ink/40"}`}>
                          <span className={`grid size-7 shrink-0 place-items-center rounded-md border-2 transition ${on ? "border-aqua bg-aqua text-white" : "border-line"}`}>{on && <Check className="size-4" aria-hidden />}</span>{p}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
              )}
              {step === 3 && (
                <div className="grid gap-5">
                  <p className="font-display text-2xl font-semibold">How can the Commission reach you?</p>
                  <label className="block"><span className={label}>Your name</span><input value={v.name} onChange={e => set("name", e.target.value)} autoComplete="name" className={field} /></label>
                  <label className="block"><span className={label}>Phone or WhatsApp</span><input type="tel" value={v.phone} onChange={e => set("phone", e.target.value)} autoComplete="tel" className={field} /></label>
                  <p className="text-[16px] text-muted">Next, send it by WhatsApp or email. Attach your photos and receipts in the message that opens.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-6">
          <button type="button" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-[16px] transition hover:bg-paper-2 disabled:opacity-40"><ArrowLeft className="size-4" aria-hidden /> Back</button>
          {step < 3 ? (
            <button type="button" onClick={() => setStep(s => Math.min(3, s + 1))} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[16px] text-white transition hover:-translate-y-0.5 hover:bg-aqua-deep">Next: {STEPS[step + 1]} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></button>
          ) : (
            <span className="text-[15px] font-bold text-aqua-deep">Ready to send</span>
          )}
        </div>
      </div>

      <aside className="rounded-3xl bg-ink p-6 text-white md:p-9" aria-label="Your complaint so far">
        <p className="text-[13px] font-bold tracking-[0.14em] text-gold uppercase">Your complaint so far</p>
        <ul className="mt-5 min-h-[160px] space-y-2 text-[16px]">
          <AnimatePresence initial={false}>
            {lines.length ? lines.map(l => (
              <motion.li key={l.split(":")[0]} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} className="border-b border-white/10 pb-2"><span className="text-white/60">{l.split(":")[0]}:</span>{l.slice(l.indexOf(":") + 1)}</motion.li>
            )) : <li className="text-white/60">Your answers collect here, written so the Commission can act on them.</li>}
          </AnimatePresence>
        </ul>
        <div className="mt-7 grid gap-3">
          <a href={wa} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-6 text-[17px] font-bold text-ink transition hover:-translate-y-0.5 active:translate-y-0"><MessageCircle className="size-5" aria-hidden /> Send on WhatsApp</a>
          <a href={mail} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-white/30 px-6 text-[17px] transition hover:-translate-y-0.5 hover:border-white"><Mail className="size-5" aria-hidden /> Send by email</a>
          <a href={C.tel} className="inline-flex min-h-12 items-center justify-center gap-2 text-[16px] text-white/80 underline-offset-4 hover:underline"><Phone className="size-4" aria-hidden /> Or call {C.phone} and read it out</a>
        </div>
        <p className="mt-5 text-[14px] text-white/55">Nothing is sent until you press send in WhatsApp or your email app.</p>
      </aside>
    </div>
  )
}
