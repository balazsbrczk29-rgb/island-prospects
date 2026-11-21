import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { OFFICE, SOCIALS, type Photo } from './data';
import './styles.css';

export type Layer = { key: string; photo: Photo; mode?: 'cover' | 'framed'; caption?: string; pos?: string };

/** The fixed window: every layer is mounted once; only opacity changes (no layout work while scrolling). */
export function Window({ layers, active, hint }: { layers: Layer[]; active: string; hint?: string }) {
  const [seen, setSeen] = useState<Set<string>>(() => new Set([active]));
  useEffect(() => { setSeen(s => (s.has(active) ? s : new Set(s).add(active))); }, [active]);
  return (
    <aside className="window reveal-in" aria-hidden="true">
      {hint && <p className="window-hint" style={{ opacity: active === layers[0].key ? 1 : 0 }}>{hint}</p>}
      {layers.map((l, i) => {
        const near = seen.has(l.key) || Math.abs(layers.findIndex(x => x.key === active) - i) <= 1;
        const framed = l.mode === 'framed';
        return (
          <figure key={l.key} className={`layer ${framed ? 'framed' : 'cover-cap'} ${l.key === active ? 'on' : ''}`} style={{ margin: 0 }}>
            {near && (
              <img
                className={framed ? '' : 'cover'}
                src={l.photo.src}
                alt=""
                width={l.photo.w}
                height={l.photo.h}
                decoding="async"
                loading={i === 0 ? 'eager' : 'lazy'}
                style={framed ? { width: Math.min(l.photo.w, 600) } : { objectPosition: l.pos || '50% 50%' }}
              />
            )}
            {l.caption && <figcaption>{l.caption}</figcaption>}
          </figure>
        );
      })}
    </aside>
  );
}

/** Which [data-win] block crosses the middle of the viewport decides the window. Discrete state only. */
export function useActiveWindow(initial: string) {
  const [active, setActive] = useState(initial);
  const hover = useRef<string | null>(null);
  const [, force] = useState(0);
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-win]'));
    const io = new IntersectionObserver(
      entries => { for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.win!); },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  const setHover = (k: string | null) => { hover.current = k; force(n => n + 1); };
  return { active: hover.current || active, setHover };
}

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.12 });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
}

/** Facts strip fixed across the scrolling half. Hidden on the first screen and over the brief. */
export function Strip({ cta = 'Send your brief', href = 'index.html#brief', hideOver = '#brief' }: { cta?: string; href?: string; hideOver?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let over = false; let past = false;
    const update = () => setShow(past && !over);
    const onScroll = () => { const p = window.scrollY > window.innerHeight * 0.85; if (p !== past) { past = p; update(); } };
    const target = document.querySelector(hideOver);
    const io = target ? new IntersectionObserver(([e]) => { over = e.isIntersecting; update(); }, { threshold: 0.05 }) : null;
    if (target && io) io.observe(target);
    const foot = document.querySelector('.foot'); if (foot && io) io.observe(foot);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => { window.removeEventListener('scroll', onScroll); io?.disconnect(); };
  }, [hideOver]);
  return (
    <div className={`strip ${show ? 'show' : ''}`} aria-hidden={!show}>
      <span className="name">Bahamas Choice Real Estate</span>
      <a href={`tel:${OFFICE.tel}`} className="num" tabIndex={show ? 0 : -1}>{OFFICE.phone}</a>
      <a href={href} className="go" tabIndex={show ? 0 : -1}>{cta}</a>
    </div>
  );
}

export function Mast({ home = true }: { home?: boolean }) {
  return (
    <div className="mast">
      <a className="wordmark" href="index.html">Bahamas <em>Choice</em></a>
      <a className="num link" href={`tel:${OFFICE.tel}`}>{OFFICE.phone}</a>
      {!home && null}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <p className="big">Bahamas Choice Real Estate Ltd.</p>
      <p style={{ marginTop: 8 }}>{OFFICE.address}</p>
      <p style={{ marginTop: 16 }} className="num">
        <a href={`tel:${OFFICE.tel}`}>{OFFICE.phone}</a>
        <span aria-hidden="true">{'  ·  '}</span>
        <a href={`mailto:${OFFICE.email}`}>{OFFICE.email}</a>
      </p>
      <p style={{ marginTop: 16 }}>
        {SOCIALS.map((s, i) => (<span key={s.href}>{i > 0 && <span aria-hidden="true">{'  ·  '}</span>}<a href={s.href} rel="noopener">{s.label}</a></span>))}
      </p>
      <p style={{ marginTop: 32 }}>Principal Broker Lana Munnings-Basalyga, Bahamas Real Estate Association licence 480. Listing data courtesy of the Bahamas MLS, deemed reliable but not guaranteed.</p>
      <p style={{ marginTop: 8 }}>Concept preview by ESTATIQ AI Solutions. Photographs from bahamaschoicerealestate.com and its Bahamas MLS listings.</p>
    </footer>
  );
}

export function mailto(subject: string, body: string, to = OFFICE.email) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
