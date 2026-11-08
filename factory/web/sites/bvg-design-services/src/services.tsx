import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Layout, mount } from './layout';
import { CAPS, PAY, EMAIL, PHONE, TEL } from './data';

export const FAQ: [string, string][] = [
  ['How fast can a simple page be ready?', 'Simple web pages are normally provided within 24 hours of the order. Multiple pages or complex sites may take longer.'],
  ['Can BVG take over a site someone else built?', 'Yes. Minor work on an existing site is billed hourly, or BVG can take the site over, redesign it and keep it up to date.'],
  ['Is there a discount for large sites?', 'Yes. Sites over 10 pages are discounted, and sites of hundreds of pages get larger discounts.'],
  ['What does the free search consultation include?', 'A brief overview of your current key phrases, given in conversation. It is not a written report.'],
  ['How can I pay?', 'Cash in person (not by mail), cheques in US or Bahamian dollars, bank-to-bank or direct deposit, or credit card through PayPal.'],
];

function Services() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout page="services">
      <section className="sv-head" aria-labelledby="h1">
        <p className="label">full specification</p>
        <h1 id="h1"><span className="h1-big h1-big-s">spec</span> <span className="h1-small">Web design, search, hosting and advertising, from Freeport.</span></h1>
      </section>

      <section className="sv-list" aria-label="Capabilities">
        {CAPS.map((k, i) => (
          <article key={k.code} className={`sv-item${i % 2 ? ' sv-flip' : ''}`} id={`c${k.code.replace('.', '-')}`}>
            <figure><img src={k.img} alt={k.alt} width={1600} height={1067} loading={i < 2 ? 'eager' : 'lazy'} data-source="generated" /><figcaption>illustrative photograph</figcaption></figure>
            <div className="sv-text">
              <p className="label">{k.code}</p>
              <h2>{k.name}</h2>
              <p className="sv-what">{k.what}</p>
              <p>{k.more}</p>
              <dl><dt>time or terms</dt><dd>{k.terms}</dd></dl>
            </div>
          </article>
        ))}
      </section>

      <section className="faq" id="terms" aria-labelledby="h-faq">
        <p className="label">4.0 · terms and questions</p>
        <h2 id="h-faq">The questions clients ask first.</h2>
        <div className="faq-list">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="faq-row">
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>{q}<span aria-hidden="true">{open === i ? '−' : '+'}</span></button>
              <AnimatePresence initial={false}>
                {open === i && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>{a}</motion.p>}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <ul className="pay">{PAY.map((p) => <li key={p}>{p}</li>)}</ul>
      </section>

      <section className="sv-close" aria-label="Request">
        <p>Ready when you are. Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call <a href={TEL}>{PHONE}</a>.</p>
        <a className="btn" href="index.html#request">Start a website request</a>
      </section>
    </Layout>
  );
}

mount(<Services />);
