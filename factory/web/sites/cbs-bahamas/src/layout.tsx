import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { DEPTS, PHONE, TEL, STORE, CREDITS } from './data';
import './styles.css';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// M10: one motion idea for the whole site. Same-page swaps use startViewTransition; page-to-page uses cross-document view transitions (styles.css).
export function morph(fn: () => void) {
  const d = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (d.startViewTransition && !reduced()) d.startViewTransition(() => flushSync(fn));
  else fn();
}

type Props = { page: 'home' | 'departments'; active: string; onPick?: (id: string) => void; children: ReactNode };

function DeptLink({ page, id, name, active, onPick, chip }: { page: Props['page']; id: string; name: string; active: boolean; onPick?: (id: string) => void; chip?: boolean }) {
  const href = page === 'home' ? `#wall` : `#${id}`;
  return (
    <a
      href={href}
      className={chip ? 'chip' : 'ix-item'}
      aria-current={active ? 'true' : undefined}
      onMouseEnter={chip ? undefined : () => onPick && onPick(id)}
      onFocus={() => onPick && onPick(id)}
      onClick={(e) => { if (page === 'home') { e.preventDefault(); onPick && onPick(id); if (chip) document.getElementById('wall')?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }); } }}
    >
      {!chip && <span className="ix-tape" aria-hidden="true" />}
      {name}
    </a>
  );
}

export function Layout({ page, active, onPick, children }: Props) {
  return (
    <div className="shell">
      <a href="#main" className="skip">Skip to content</a>

      {/* N2: the index column is the navigation (desktop) */}
      <aside className="index-col" aria-label="Store index">
        <a href="index.html" className="mark" aria-label="CBS Bahamas, home">
          <span className="mark-cbs">CBS</span>
          <span className="mark-sub">Commonwealth Building Supplies<br />Nassau, since March 1973</span>
        </a>
        <nav aria-label="Departments" className="ix-list">
          {DEPTS.map((d) => <DeptLink key={d.id} page={page} id={d.id} name={d.name} active={active === d.id} onPick={onPick} />)}
          <a className="ix-more" href={page === 'home' ? 'departments.html' : '#also'}>and ten more departments</a>
        </nav>
        <nav aria-label="Pages" className="ix-pages">
          <a href="index.html" aria-current={page === 'home' ? 'page' : undefined}>The index</a>
          <a href="departments.html" aria-current={page === 'departments' ? 'page' : undefined}>All departments</a>
          <a href="index.html#counter">The counter</a>
          <a href="index.html#mailboat">Mailboat</a>
          <a href="index.html#visit">Visit</a>
        </nav>
        <div className="ix-foot">
          <a className="ix-phone" href={TEL}>{PHONE}</a>
          <p>Home Center, SouthWest Plaza, Carmichael Road<br />Mon to Sat 8 to 8, Sun 9 to 5</p>
          <p>PROstore, 103 Robinson Road<br />Mon to Fri 7 to 4</p>
          <a className="btn-tape" href={STORE}>Shop CBS online</a>
        </div>
      </aside>

      {/* N2 on phones: logo row + horizontal chip index pinned under it */}
      <header className="m-head">
        <div className="m-row">
          <a href="index.html" className="m-mark" aria-label="CBS Bahamas, home"><span className="mark-cbs">CBS</span><span>since 1973</span></a>
          <a className="m-call" href={TEL}>Call {PHONE}</a>
        </div>
        <nav aria-label="Departments" className="m-chips">
          {DEPTS.map((d) => <DeptLink key={d.id} page={page} id={d.id} name={d.short} active={active === d.id} onPick={onPick} chip />)}
          <a className="chip" href={page === 'home' ? 'departments.html' : '#also'}>More</a>
        </nav>
      </header>

      <div className="page">
        <main id="main">{children}</main>
        <footer className="foot">
          <div className="foot-grid">
            <div>
              <p className="foot-name">Commonwealth Building Supplies Ltd</p>
              <p>CBS SouthWest Plaza, Carmichael Road, Nassau, New Providence, The Bahamas</p>
              <p><a href={TEL}>{PHONE}</a> · <a href="mailto:cbs@cbsbahamas.com">cbs@cbsbahamas.com</a></p>
              <p><a href="https://www.facebook.com/buildbeautiful/">Facebook</a> · <a href="https://twitter.com/cbsbahamas">X @cbsbahamas</a> · <a href={STORE}>cbsbahamas.com store</a></p>
            </div>
            <div className="foot-credits">
              <p>Photography credits</p>
              <ul>{CREDITS.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
          <p className="foot-concept">Concept by ESTATIQ AI Solutions. Not the official CBS Bahamas website.</p>
        </footer>
      </div>

      <a className="m-shop" href={STORE}>Shop CBS online</a>
    </div>
  );
}

export function mount(node: ReactNode) {
  const el = document.getElementById('root')!;
  el.innerHTML = '';
  createRoot(el).render(<StrictMode>{node}</StrictMode>);
}
