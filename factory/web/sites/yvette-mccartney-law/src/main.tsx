import { StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import './styles.css'

const P1 = '(242) 328-6725'
const P2 = '(242) 326-4620'
const TEL = 'tel:+12423286725'
const FAX = '(242) 322-1816'

type Area = { id: string; matter: string; name: string; line: string; bring: string[] }
const AREAS: Area[] = [
  { id: 'litigation', matter: 'Dispute or claim', name: 'Litigation', line: 'Representation when a dispute is heading to, or already in, court.',
    bring: ['Any court papers or letters you have received', 'The contract or agreement in dispute', 'Emails and messages about it, in date order', 'A short timeline of what happened'] },
  { id: 'corporate', matter: 'Company matter', name: 'Corporate and commercial', line: 'Legal support for companies, public and private.',
    bring: ['Your company documents, if you have them', 'The agreement or deal you are working on', 'Names of the other parties', 'What you need decided, and by when'] },
  { id: 'property', matter: 'Property', name: 'Real estate', line: 'Buying, selling and holding property in The Bahamas.',
    bring: ['The agreement for sale, if there is one', 'Any title or survey papers you hold', 'Your photo identification', 'Names of the other side and their lawyer'] },
  { id: 'mortgage', matter: 'Mortgage default', name: 'Mortgage enforcement', line: 'Acting in mortgage enforcement matters.',
    bring: ['The mortgage and loan agreement', 'Letters or notices from the lender or borrower', 'A record of payments made', 'Any court papers received'] },
  { id: 'family', matter: 'Family', name: 'Family law', line: 'Legal help with family matters, handled with care.',
    bring: ['Your photo identification', 'Any court papers or agreements', 'Names of the people involved', 'A short note of what you want resolved'] },
  { id: 'injury', matter: 'Injury', name: 'Personal injury litigation', line: 'Claims for people who have been injured.',
    bring: ['Any medical notes or reports you have', 'Photographs, police or incident reports', 'Names of anyone who saw what happened', 'Letters from insurers'] },
]
const ORDER = ['litigation', 'corporate', 'property', 'mortgage', 'family', 'injury'].map(i => AREAS.find(a => a.id === i)!)

function Finder({ cur, setCur }: { cur: Area | null; setCur: (a: Area) => void }) {
  const reduce = useReducedMotion()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const key = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return; e.preventDefault(); const n = (i + d + AREAS.length) % AREAS.length; setCur(AREAS[n]); refs.current[n]?.focus()
  }
  return (
    <div className="finder">
      <p className="finder__q" id="fq">What do you need help with?</p>
      <div className="chips" role="radiogroup" aria-labelledby="fq">
        {AREAS.map((a, i) => (
          <button key={a.id} ref={el => { refs.current[i] = el }} type="button" role="radio" className="chip" aria-checked={cur?.id === a.id}
            tabIndex={cur ? (cur.id === a.id ? 0 : -1) : (i === 0 ? 0 : -1)} onClick={() => setCur(a)} onKeyDown={e => key(e, i)}>{a.matter}</button>
        ))}
      </div>
      <div className="result" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!cur ? (
            <motion.p key="empty" className="result__empty" exit={{ opacity: 0, transition: { duration: .12 } }}>Choose your matter. We will show the practice area, what to bring, and a brief you can print or read out when you call.</motion.p>
          ) : (
            <motion.div key={cur.id} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: .12 } }} transition={{ duration: .22, ease: [.22, 1, .36, 1] }}>
              <h3>{cur.name}</h3>
              <p className="muted">{cur.line}</p>
              <ol className="check" aria-label="What to bring">{cur.bring.map(b => <li key={b}>{b}</li>)}</ol>
              <div className="actions">
                <a className="btn btn--accent num" href={TEL}>Call chambers {P1}</a>
                <button type="button" className="btn btn--ghost" onClick={() => window.print()}>Print this brief</button>
              </div>
              <p className="disc">This page does not give legal advice.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const Print = ({ src, alt, cap }: { src: string; alt: string; cap?: string }) => (
  <figure className="frame"><img src={`./img/${src}`} alt={alt} width={200} height={150} loading="lazy" />{cap && <figcaption>{cap}</figcaption>}</figure>
)

function Home() {
  const [cur, setCur] = useState<Area | null>(null)
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="hdr"><a className="hdr__name" href="./">Yvette McCartney Law</a><a className="hdr__tel num" href={TEL}>{P1}</a></header>
      <main id="main">
        <section className="hero" aria-labelledby="h1"><div className="wrap hero__grid">
          <div>
            <h1 id="h1" className="h1">Yvette McCartney Law</h1>
            <p className="lede muted">A full-service law firm in Nassau. Litigation, corporate and commercial, real estate, mortgage enforcement, family law and personal injury.</p>
            <div className="hero__row">
              <Print src="chambers-a.png" alt="The yellow two-storey chambers building with white trim" cap="The chambers, Nassau" />
              <address className="addr"><b>7 Terrace W., Bldg. 10</b><br />Nassau, New Providence<br />P.O. Box N-10095<br /><a href={TEL} className="num" style={{ color: 'var(--ink)' }}>{P1}</a> <span className="muted">and</span> <span className="num">{P2}</span></address>
            </div>
          </div>
          <Finder cur={cur} setCur={setCur} />
        </div></section>

        <section className="sec" aria-labelledby="pa"><div className="wrap">
          <h2 id="pa" className="h2">Six areas of practice.</h2>
          <ul className="pa">{ORDER.map((a, i) => (
            <li key={a.id}><button type="button" aria-pressed={cur?.id === a.id} onClick={() => { setCur(a); document.getElementById('h1')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <span className="pa__n">{String(i + 1).padStart(2, '0')}</span><span className="pa__t">{a.name}</span><span className="muted">{a.line}</span></button></li>
          ))}</ul>
          <p className="lede muted" style={{ marginTop: 40 }}>The firm regularly acts for high net worth individuals, financial institutions, and leading commercial companies, both public and private.</p>
        </div></section>

        <section className="sec" aria-labelledby="ch"><div className="wrap cols">
          <div><h2 id="ch" className="h2">The chambers.</h2>
            <address className="addr" style={{ marginTop: 24 }}><b>Yvette McCartney Chambers</b><br />7 Terrace W., Bldg. 10<br />Nassau, New Providence, Bahamas<br />P.O. Box N-10095<br /><span className="num">Tel {P1}, {P2}</span><br /><span className="num">Fax {FAX}</span></address>
          </div>
          <div className="prints">
            <Print src="chambers-a.png" alt="The yellow chambers building seen from the street corner" />
            <Print src="chambers-b.png" alt="The yellow chambers building, front entrance and side steps" />
            <Print src="portrait-a.png" alt="A woman in a black top seated at a desk in an office" />
            <Print src="portrait-b.png" alt="A woman in a patterned top seated in an office chair" />
            <Print src="gavel.png" alt="A gavel and the brass scales of justice" />
            <Print src="books.png" alt="Three bound law reports on a shelf" />
          </div>
        </div></section>

        <section className="sec" aria-labelledby="hw"><div className="wrap">
          <h2 id="hw" className="h2">How an enquiry works.</h2>
          <ol className="steps">
            <li><b>1. Call chambers</b><span className="muted">Tell us what has happened, in your own words. Use the finder to know what to have ready.</span></li>
            <li><b>2. We listen</b><span className="muted">We confirm which area of practice your matter belongs to.</span></li>
            <li><b>3. You decide</b><span className="muted">You decide how you would like to go ahead.</span></li>
          </ol>
        </div></section>

        <section className="field" aria-labelledby="ct"><div className="wrap close">
          <div><h2 id="ct" className="h2">Call chambers.</h2><p className="muted" style={{ maxWidth: '44ch', marginTop: 16 }}>Start with the finder above, then call. Bring what it lists.</p></div>
          <address><a className="num" href={TEL} style={{ fontSize: 32, fontFamily: 'var(--serif)' }}>{P1}</a><br /><span className="num">{P2}</span><br />7 Terrace W., Bldg. 10, Nassau, Bahamas</address>
        </div></section>
      </main>
      <footer className="wrap foot muted">Yvette McCartney Law, Nassau, The Bahamas. Photographs are the firm’s own, shown at their original size. This page does not give legal advice.</footer>
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
