import { useState } from 'react';
import { OFFICE, TIERS, type TierKey } from './data';

type Role = 'contractor' | 'developer' | 'supplier';
const ROLES: [Role, string][] = [['contractor', 'A contractor or subcontractor'], ['developer', 'A developer'], ['supplier', 'A supplier, consultant or professional']];
const SIZE: Record<Role, [string, string][] | null> = {
  contractor: [['small', 'Under $5 million a year'], ['big', '$5 million or more']],
  developer: [['small', 'Under $10 million a year'], ['big', '$10 million or more']],
  supplier: null,
};

function tierFor(role: Role | null, size: string | null): TierKey | 'ask' | null {
  if (!role) return null;
  if (role === 'supplier') return 'Associate';
  if (!size) return null;
  if (role === 'contractor') return size === 'big' ? 'Prime' : 'General';
  return size === 'big' ? 'Developer / Corporate' : 'ask';
}

export function Finder() {
  const [role, setRole] = useState<Role | null>('contractor');
  const [size, setSize] = useState<string | null>('small');
  const tier = tierFor(role, size);
  const t = TIERS.find(x => x.k === tier);
  const body = t ? `Hello BCA,\n\nI would like to apply for ${t.k} Membership (${t.dues} a year).\n\nCompany:\nName:\nPhone:\nTrade:\n` : '';
  return (
    <>
      <div className="finder">
        <div className="q">
          <fieldset>
            <legend>1. Your business is</legend>
            <div className="opts">
              {ROLES.map(([k, l]) => <button key={k} type="button" className="opt" aria-pressed={role === k} onClick={() => { setRole(k); setSize(null); }}>{l}</button>)}
            </div>
          </fieldset>
          {role && SIZE[role] && (
            <fieldset>
              <legend>2. {role === 'developer' ? 'Annual turnover' : 'Annual revenue'}</legend>
              <div className="opts">
                {SIZE[role]!.map(([k, l]) => <button key={k} type="button" className="opt num" aria-pressed={size === k} onClick={() => setSize(k)}>{l}</button>)}
              </div>
            </fieldset>
          )}
        </div>
        <div className="a result" aria-live="polite">
          {t ? (
            <>
              <p className="muted" style={{ fontSize: 'var(--t1)' }}>Your tier</p>
              <p className="tier" style={{ marginTop: 8 }}>{t.k}</p>
              <p className="dues num">{t.dues} a year</p>
              <div className="actions" style={{ marginTop: 32 }}>
                <a className="btn" href={`mailto:${OFFICE.email}?subject=${encodeURIComponent(`Membership application: ${t.k}`)}&body=${encodeURIComponent(body)}`}>Apply by email</a>
                <a className="tlink num" href={`tel:${OFFICE.tel}`}>or call {OFFICE.phone}</a>
              </div>
            </>
          ) : tier === 'ask' ? (
            <>
              <p className="tier" style={{ fontSize: 'var(--t3)' }}>Ask the office which tier fits.</p>
              <p className="muted" style={{ marginTop: 12 }}>The published tiers cover developers with turnover of $10 million or more.</p>
              <div className="actions"><a className="btn num" href={`tel:${OFFICE.tel}`}>Call {OFFICE.phone}</a></div>
            </>
          ) : (
            <p className="muted" style={{ fontSize: 'var(--t3)', lineHeight: 1.25 }}>Answer the questions and your tier and annual dues appear here.</p>
          )}
        </div>
      </div>
      <table className="table">
        <thead><tr><th scope="col">Tier</th><th scope="col">For</th><th scope="col" style={{ textAlign: 'right' }}>A year</th></tr></thead>
        <tbody>
          {TIERS.map(x => (
            <tr key={x.k} className={x.k === tier ? 'hit' : ''}>
              <th scope="row" className="k">{x.k}</th><td>{x.who}</td><td className="price num" style={{ textAlign: 'right', paddingRight: 0 }}>{x.dues}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
