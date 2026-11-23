import { StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import './styles.css'

const PHONE = '(242) 603 0591'
const TEL = 'tel:+12426030591'
const FORM = 'https://krestonbs.com/contact-kreston-bahamas/'
const NETWORK = 'https://krestonbs.com/international/'

type Svc = { id: string; need: string; name: string; line: string; bring: string[] }
const SVC: Svc[] = [
  { id: 'audit', need: 'Annual audit', name: 'Audit & Assurance', line: 'An independent view of your financial statements.',
    bring: ['Last year’s financial statements', 'Your trial balance and ledgers', 'Bank statements and loan agreements', 'Any request from a lender or regulator'] },
  { id: 'tax', need: 'Tax', name: 'Taxation', line: 'Tax services for domestic and international organisations.',
    bring: ['Returns you have already filed', 'Invoices and expense records', 'Letters from the tax authority', 'A note of how your business is owned'] },
  { id: 'books', need: 'Books and accounts', name: 'Accountancy', line: 'Accounts that are kept up and agree to the bank.',
    bring: ['Bank and card statements', 'Sales and purchase invoices', 'Which accounting software you use', 'Your year end'] },
  { id: 'advice', need: 'Advice on a decision', name: 'Advisory', line: 'Customised solutions for your business and operations.',
    bring: ['The decision and the options you see', 'Your latest management accounts', 'Any budget or forecast', 'Who else is involved'] },
  { id: 'outsource', need: 'Outsource finance', name: 'Outsourcing', line: 'Hand day-to-day finance work to a team that knows you.',
    bring: ['The finance tasks you want handed over', 'The systems you use today', 'Who in your team does what now', 'When you would like to start'] },
]
const SERVICES = ['Accountancy', 'Advisory', 'Audit & Assurance', 'Outsourcing', 'Taxation']
const ORDER = SERVICES.map(n => SVC.find(s => s.name === n)!)
const ARTICLES: [string, string][] = [
  ['Cryptocurrencies: what do the latest trends mean for the accounting profession?', 'https://krestonbs.com/cryptocurrencies-what-do-the-latest-trends-mean-for-the-accounting-profession/'],
  ['Updates to The Bahamas VAT regulations could increase Gross Domestic Product (GDP)', 'https://krestonbs.com/updates-to-the-bahamas-vat-regulations-could-increase-gross-domestic-product-gdp/'],
  ['Cryptocurrencies: a digital ‘asset’ for The Bahamas?', 'https://krestonbs.com/cryptocurrencies-a-digital-asset-for-the-bahamas/'],
  ['Kreston news: Mid-Year Budget Statement 2021/2022', 'https://krestonbs.com/kreston-news-mid-year-budget-statement-2021-2022/'],
]
const msg = (s: Svc) => `Hello Kreston Bahamas, I am looking for help with ${s.name.toLowerCase()} (${s.need.toLowerCase()}). Please tell me who I should speak to and what you need from me. Company: `

function Field({ id, label, v, on, err, auto, type = 'text' }: { id: string; label: string; v: string; on: (v: string) => void; err?: string; auto?: string; type?: string }) {
  return (<div className="enqf__f"><label htmlFor={id} className="enqf__l">{label}</label><input id={id} type={type} className="enqf__i" value={v} autoComplete={auto} onChange={e => on(e.target.value)} aria-invalid={!!err} />{err && <p className="enqf__e" role="alert">{err}</p>}</div>)
}

function Finder({ cur, setCur }: { cur: Svc | null; setCur: (s: Svc) => void }) {
  const reduce = useReducedMotion()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const [f, setF] = useState({ fn: '', sn: '', em: '', co: '', ok: false })
  const [errs, setErrs] = useState<Record<string, string>>({})
  const pick = (s: Svc) => { setCur(s); setText(msg(s)); setDone(false) }
  const key = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return; e.preventDefault(); const n = (i + d + SVC.length) % SVC.length; pick(SVC[n]); refs.current[n]?.focus()
  }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const x: Record<string, string> = {}
    if (!f.fn.trim()) x.fn = 'Please enter your first name.'
    if (!f.sn.trim()) x.sn = 'Please enter your surname.'
    if (!/^\S+@\S+\.\S+$/.test(f.em)) x.em = 'Please enter a valid email address.'
    if (!text.trim()) x.msg = 'Please describe your enquiry.'
    if (!f.ok) x.ok = 'Please tick the box to continue.'
    setErrs(x); if (Object.keys(x).length) return
    try { await navigator.clipboard.writeText(`${f.fn} ${f.sn} (${f.em}${f.co ? ', ' + f.co : ''}): ${text}`) } catch { /* clipboard blocked */ }
    setDone(true); window.open(FORM, '_blank', 'noopener')
  }
  return (
    <div className="finder">
      <p className="finder__q" id="fq">What do you need help with?</p>
      <div className="chips" role="radiogroup" aria-labelledby="fq">
        {SVC.map((s, i) => (
          <button key={s.id} ref={el => { refs.current[i] = el }} type="button" role="radio" className="chip" aria-checked={cur?.id === s.id}
            tabIndex={cur ? (cur.id === s.id ? 0 : -1) : (i === 0 ? 0 : -1)} onClick={() => pick(s)} onKeyDown={e => key(e, i)}>{s.need}</button>
        ))}
      </div>
      <div className="result" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!cur ? (
            <motion.p key="empty" className="result__empty" exit={{ opacity: 0, transition: { duration: .12 } }}>Choose what you need. We will show the service, what to have ready, and a note you can send.</motion.p>
          ) : (
            <motion.div key={cur.id} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: .12 } }} transition={{ duration: .22, ease: [.22, 1, .36, 1] }}>
              <h3>{cur.name}</h3>
              <p className="muted">{cur.line}</p>
              <ol className="check" aria-label="What to have ready">{cur.bring.map(b => <li key={b}>{b}</li>)}</ol>
              <form className="enqf" noValidate onSubmit={submit} aria-label="Enquiry">
                <div className="enqf__row">
                  <Field id="fn" label="First name *" v={f.fn} on={v => setF({ ...f, fn: v })} err={errs.fn} auto="given-name" />
                  <Field id="sn" label="Surname *" v={f.sn} on={v => setF({ ...f, sn: v })} err={errs.sn} auto="family-name" />
                </div>
                <div className="enqf__row">
                  <Field id="em" label="Email *" v={f.em} on={v => setF({ ...f, em: v })} err={errs.em} auto="email" type="email" />
                  <Field id="co" label="Company name" v={f.co} on={v => setF({ ...f, co: v })} auto="organization" />
                </div>
                <label htmlFor="enq" className="enqf__l">Enquiry *</label>
                <textarea id="enq" className="enq" value={text} onChange={e => setText(e.target.value)} aria-invalid={!!errs.msg} />
                {errs.msg && <p className="enqf__e" role="alert">{errs.msg}</p>}
                <label className="enqf__c"><input type="checkbox" checked={f.ok} onChange={e => setF({ ...f, ok: e.target.checked })} /> I agree to the privacy policy and consent to Kreston Bahamas using this information to contact me. *</label>
                {errs.ok && <p className="enqf__e" role="alert">{errs.ok}</p>}
                <div className="actions">
                  <button type="submit" className="btn btn--accent">Send your enquiry</button>
                  <a className="btn btn--ghost num" href={TEL}>Call {PHONE}</a>
                </div>
                {done && <p className="enqf__ok" role="status">Enquiry prepared for {f.fn}. In the live site this goes straight to the firm’s inbox. For now your note is copied and their form is open.</p>}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Home() {
  const [cur, setCur] = useState<Svc | null>(null)
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="hdr"><a className="hdr__name" href="./">Kreston Bahamas</a><a className="hdr__tel num" href={TEL}>{PHONE}</a></header>
      <main id="main">
        <section className="hero" aria-labelledby="h1"><div className="wrap hero__grid">
          <div>
            <p className="note">Kreston is ancient Greek for “trust”.</p>
            <h1 id="h1" className="h1">Accounting, advisory and audit in The Bahamas.</h1>
            <p className="lede muted">A Nassau firm and a member of Kreston Global, serving domestic and international organisations, including central and local government.</p>
            <dl className="facts"><div><dt>Network</dt><dd>Member of Kreston Global</dd></div><div><dt>Partners</dt><dd>Pretino P. Albury and Sean I. Rolle</dd></div><div><dt>Sectors</dt><dd>Including central and local government</dd></div></dl>
          </div>
          <Finder cur={cur} setCur={setCur} />
        </div></section>

        <section className="sec" aria-labelledby="sv"><div className="wrap">
          <h2 id="sv" className="h2">Five services, one personal and confidential team.</h2>
          <ul className="svc">{ORDER.map((s, i) => (
            <li key={s.id}><button type="button" aria-pressed={cur?.id === s.id} onClick={() => { setCur(s); document.getElementById('h1')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <span className="svc__n">{String(i + 1).padStart(2, '0')}</span><span className="svc__t">{s.name}</span><span className="muted">{s.line}</span></button></li>
          ))}</ul>
        </div></section>

        <section className="sec" aria-labelledby="pt"><div className="wrap">
          <h2 id="pt" className="h2">The partners.</h2>
          <div className="partners">
            <div className="person"><img src="https://krestonbs.com/wp-content/uploads/2022/03/Pretino_P_Albury.jpg" alt="Pretino P. Albury" width={160} height={200} loading="lazy" /><h3>Pretino P. Albury</h3><p className="muted" style={{ margin: 0 }}>Partner</p></div>
            <div className="person"><img src="https://krestonbs.com/wp-content/uploads/2021/12/Sean_I_Rolle.jpg" alt="Sean I. Rolle" width={160} height={200} loading="lazy" /><h3>Sean I. Rolle</h3><p className="muted" style={{ margin: 0 }}>Partner</p></div>
          </div>
          <p className="lede muted" style={{ marginTop: 40 }}>Kreston members work together for clients with international needs. <a href={NETWORK}>The Kreston Global network</a></p>
        </div></section>

        <section className="sec" aria-labelledby="in"><div className="wrap">
          <h2 id="in" className="h2">From the firm.</h2>
          <ul className="ins">{ARTICLES.map(([t, u]) => <li key={u}><a href={u}>{t}</a></li>)}</ul>
        </div></section>

        <section id="contact" className="field" aria-labelledby="ct"><div className="wrap close">
          <div><h2 id="ct" className="h2">Talk to Kreston Bahamas.</h2>
            <p className="muted" style={{ maxWidth: '44ch', marginTop: 16 }}>Start with the finder above, or call. Your first conversation is personal and confidential.</p></div>
          <address><a className="num" href={TEL} style={{ fontSize: 30, fontFamily: 'var(--serif)' }}>{PHONE}</a><br />#173 Concordia House, Shirley Street, Nassau, N.P., Bahamas<br /><a href={FORM}>Open their contact form</a></address>
        </div></section>
      </main>
      <footer className="wrap foot muted">Kreston Bahamas, Nassau, The Bahamas. Partner photographs and articles are from krestonbs.com.</footer>
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
