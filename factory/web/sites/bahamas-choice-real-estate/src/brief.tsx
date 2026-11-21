import { useState } from 'react';
import { ISLANDS } from './data';
import { mailto } from './site';

export type Mode = 'Buy' | 'Sell' | 'Rent' | 'Invest';
const MODES: Mode[] = ['Buy', 'Sell', 'Rent', 'Invest'];
const TYPES: Record<Mode, string[]> = {
  Buy: ['A home', 'A condo', 'Land', 'Commercial property'],
  Sell: ['A home', 'A condo', 'Land', 'Commercial property', 'A family property'],
  Rent: ['A home', 'A condo', 'Commercial space'],
  Invest: ['Residential', 'Land', 'Commercial', 'A development'],
};
const BUDGET: Record<Mode, string> = { Buy: 'Budget', Sell: 'Asking price in mind (optional)', Rent: 'Monthly budget', Invest: 'Budget' };
const WHEN = ['As soon as possible', 'In the next 3 months', 'In the next year', 'Just exploring'];

export function Brief({ initialMode = 'Buy', initialIsland = '' }: { initialMode?: Mode; initialIsland?: string }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [v, setV] = useState({ type: TYPES[initialMode][0], island: initialIsland || ISLANDS[0].name, budget: '', when: WHEN[1], name: '', email: '', phone: '', note: '' });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });
  const verb = { Buy: 'buy', Sell: 'sell', Rent: 'rent', Invest: 'invest in' }[mode];
  const summary = `${v.name || 'You'} would like to ${verb} ${v.type.toLowerCase()} on ${v.island}${v.budget ? `, ${mode === 'Sell' ? 'thinking of' : 'budget'} ${v.budget}` : ''}, ${v.when.toLowerCase()}.`;
  const body = `Hello Bahamas Choice,\n\n${summary}\n\n${v.note ? v.note + '\n\n' : ''}Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone}\n`;
  const ok = v.name.trim() && (v.email.trim() || v.phone.trim());
  return (
    <div>
      <div className="tabs" role="tablist" aria-label="What would you like to do?">
        {MODES.map(m => (
          <button key={m} role="tab" type="button" aria-selected={mode === m} onClick={() => { setMode(m); setV({ ...v, type: TYPES[m][0] }); }}>{m}</button>
        ))}
      </div>
      <form className="form" onSubmit={e => { e.preventDefault(); if (ok) window.location.href = mailto(`Brief: ${mode} on ${v.island}`, body); }}>
        <div className="field"><label htmlFor="b-type">{mode === 'Sell' ? 'What you are selling' : 'What you are after'}</label>
          <select id="b-type" value={v.type} onChange={set('type')}>{TYPES[mode].map(t => <option key={t}>{t}</option>)}</select></div>
        <div className="field"><label htmlFor="b-island">Island</label>
          <select id="b-island" value={v.island} onChange={set('island')}>{ISLANDS.map(i => <option key={i.name}>{i.name}</option>)}</select></div>
        <div className="field"><label htmlFor="b-budget">{BUDGET[mode]}</label>
          <input id="b-budget" value={v.budget} onChange={set('budget')} inputMode="text" placeholder={mode === 'Rent' ? 'e.g. $3,000 a month' : 'e.g. $500,000'} /></div>
        <div className="field"><label htmlFor="b-when">When</label>
          <select id="b-when" value={v.when} onChange={set('when')}>{WHEN.map(w => <option key={w}>{w}</option>)}</select></div>
        <div className="field"><label htmlFor="b-name">Your name</label>
          <input id="b-name" required autoComplete="name" value={v.name} onChange={set('name')} /></div>
        <div className="field"><label htmlFor="b-email">Email</label>
          <input id="b-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} /></div>
        <div className="field full"><label htmlFor="b-phone">Phone or WhatsApp, with country code</label>
          <input id="b-phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} /></div>
        <div className="field full"><label htmlFor="b-note">Anything else (area, bedrooms, the view you want)</label>
          <textarea id="b-note" value={v.note} onChange={set('note')} /></div>
        <p className="summary" aria-live="polite">{summary}</p>
        <div className="full" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', alignItems: 'center' }}>
          <button className="btn btn-primary" type="submit" aria-disabled={!ok}>Email this brief</button>
          <span className="muted" style={{ fontSize: 'var(--t-s)' }}>{ok ? 'Opens your email app with everything filled in.' : 'Add your name and an email or phone.'}</span>
        </div>
      </form>
    </div>
  );
}
