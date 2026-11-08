import { StrictMode, useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { EMAIL, PHONE, TEL, US_PHONE, US_TEL, CREDITS } from './data';
import './styles.css';

const CODES: [string, string, string][] = [
  ['1.0', 'capabilities', 'index.html#capabilities'],
  ['2.0', 'the guide', 'index.html#guide'],
  ['3.0', 'offices', 'index.html#offices'],
  ['4.0', 'terms', 'services.html#terms'],
  ['5.0', 'request', 'index.html#request'],
];

// N5: a toolbar with section codes and a contact desk. Top on desktop, bottom on phones (thumb reach).
function Toolbar({ page }: { page: 'home' | 'services' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', close); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', esc); };
  }, []);
  return (
    <header className="toolbar">
      <a href="index.html" className="tb-name" aria-label="BVG Design Services, home"><span className="tb-mark">BVG</span><span className="tb-sub">design services · freeport</span></a>
      <nav aria-label="Sections" className="tb-codes">
        {CODES.map(([c, n, h]) => <a key={c} href={page === 'home' ? h.replace('index.html', '') : h}><span className="code">{c}</span> {n}</a>)}
        <a href="services.html" aria-current={page === 'services' ? 'page' : undefined}><span className="code">S</span> full spec</a>
      </nav>
      <div className="tb-desk" ref={ref}>
        <button type="button" className="tb-btn" aria-expanded={open} aria-controls="desk" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>contact desk</button>
        <div id="desk" className="desk" hidden={!open}>
          <p className="desk-h">Contact desk</p>
          <a href={TEL}><span>Freeport, tel and fax</span><b>{PHONE}</b></a>
          <a href={US_TEL}><span>US line</span><b>{US_PHONE}</b></a>
          <a href={`mailto:${EMAIL}`}><span>Email</span><b>{EMAIL}</b></a>
          <p className="desk-note">P.O. Box F-43652, Freeport, Grand Bahama</p>
        </div>
        <a className="tb-cta" href={page === 'home' ? '#request' : 'index.html#request'}>Start a website request</a>
      </div>
    </header>
  );
}

export function Layout({ page, children }: { page: 'home' | 'services'; children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Toolbar page={page} />
      <main id="main">{children}</main>
      <footer className="foot">
        <div className="foot-a">
          <p className="foot-name">BVG Design Services</p>
          <p>Bahamian owned. Headquarters in Freeport, Grand Bahama. P.O. Box F-43652, Freeport, Bahamas.</p>
          <p><a href={TEL}>{PHONE}</a> · <a href={US_TEL}>US {US_PHONE}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <p><a href="http://www.bahamasvacationguide.com/">The Bahamas Vacation Guide</a></p>
        </div>
        <div className="foot-b">
          <p className="foot-name">Photography</p>
          <ul>{CREDITS.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <p className="foot-c">Concept by ESTATIQ AI Solutions. Not the official BVG Design Services website.</p>
      </footer>
    </>
  );
}

export function mount(node: ReactNode) {
  const el = document.getElementById('root')!;
  el.innerHTML = '';
  createRoot(el).render(<StrictMode>{node}</StrictMode>);
}
