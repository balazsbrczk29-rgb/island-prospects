import { useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Dialog from '@radix-ui/react-dialog';
import type { Img } from './images';
import { IMG } from './images';
import './styles.css';

export const PHONE = '(242) 373-2673';
export const TEL = 'tel:+12423732673';
export const FAX = '(242) 373-3802';

type Page = 'index' | 'marina' | 'club';

export function Photo({ img, className, priority, sizes, captionClass }: { img: Img; className?: string; priority?: boolean; sizes?: string; captionClass?: string }) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <img src={img.src} width={img.w} height={img.h} alt={img.alt} data-source={img.source}
        loading={priority ? 'eager' : 'lazy'} decoding="async" {...(priority ? { fetchpriority: 'high' } : {})} sizes={sizes} />
      <figcaption className={'cap ' + (captionClass || '')}><span>{img.caption}</span><span>{img.credit}</span></figcaption>
    </figure>
  );
}

const CONTENTS = [
  { href: 'index.html', title: 'Between two waters', note: 'The club, the canal, the beach and the inlet' },
  { href: 'index.html#day', title: 'A day at the club', note: 'From the courts at first light to the channel at night' },
  { href: 'marina.html', title: 'The marina', note: 'Notes for owners, guests and visiting boats' },
  { href: 'club.html', title: 'The club', note: 'Residences, grounds and what the association keeps' },
  { href: '#colophon', title: 'Colophon', note: `Call the club office on ${PHONE}` },
];

function Contents() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button type="button" className="mast__btn sc" aria-haspopup="dialog" aria-controls="contents-dialog" onClick={() => setOpen(true)}><i aria-hidden="true" /> Contents</button>
      <Dialog.Portal>
        <Dialog.Content id="contents-dialog" className="toc" aria-describedby={undefined}>
          <div className="wrap toc__in">
            <div className="toc__head">
              <Dialog.Title className="disp" style={{ fontSize: 28, margin: 0, fontWeight: 400 }}>Contents</Dialog.Title>
              <Dialog.Close className="toc__close sc">Close</Dialog.Close>
            </div>
            <ol>
              {CONTENTS.map(c => (
                <li key={c.title}><a href={c.href} onClick={() => setOpen(false)}>
                  <span><span className="disp">{c.title}</span><small>{c.note}</small></span>
                </a></li>
              ))}
            </ol>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Masthead({ page }: { page: Page }) {
  const link = (p: Page, href: string, label: string) => <a href={href} className="sc" aria-current={page === p ? 'page' : undefined}>{label}</a>;
  return (
    <header className="mast">
      <div className="wrap">
        <div className="mast__row">
          <Contents />
          <a className="mast__title" href="index.html" aria-label="Bell Channel Club and Marina, home">
            <b>Bell Channel Club <em className="it">&amp;</em> Marina</b>
          </a>
          <p className="mast__date sc" style={{ margin: 0 }}>Lucaya, Grand Bahama<br /><a href={TEL}>Office {PHONE}</a></p>
        </div>
        <nav className="mast__links" aria-label="Sections">
          {link('index', 'index.html', 'The feature')}
          {link('marina', 'marina.html', 'The marina')}
          {link('club', 'club.html', 'The club')}
          <a href="#colophon" className="sc">Colophon</a>
        </nav>
      </div>
    </header>
  );
}

function Colophon() {
  const credits = Object.values(IMG).filter(i => i.source === 'commons').map(i => i.credit.replace('Photo: ', '').replace(', via Wikimedia Commons', ''));
  const uniq = [...new Set(credits)];
  return (
    <footer id="colophon" className="colophon">
      <div className="wrap">
        <div className="colophon__grid">
          <div>
            <p className="sc kicker" style={{ margin: 0 }}>Colophon</p>
            <h2>Ask the office. <em className="it">It knows the dock.</em></h2>
            <a className="tel" href={TEL}>{PHONE}</a>
            <dl>
              <dt>Club</dt><dd>Bell Channel Club &amp; Marina</dd>
              <dt>Where</dt><dd>Bell Channel, Lucaya, Freeport, Grand Bahama</dd>
              <dt>Post</dt><dd>P.O. Box F-44053, Freeport, Grand Bahama</dd>
              <dt>Telephone</dt><dd><a href={TEL}>{PHONE}</a></dd>
              <dt>Fax</dt><dd>{FAX}</dd>
            </dl>
          </div>
          <div>
            <iframe title="Map: Bell Channel Club and Marina, Freeport, Grand Bahama" loading="lazy"
              src="https://www.google.com/maps?q=26.5147,-78.6368&z=15&output=embed" />
            <p className="cap" style={{ paddingTop: 10 }}><span>Map pin from a public marina directory. Not for navigation.</span></p>
          </div>
        </div>
        <div className="credits">
          <p>Photography: {uniq.join('; ')}. Photographs marked as illustrative are placeholders to be replaced with the club’s own.</p>
          <p>Concept by ESTATIQ AI Solutions</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ page, children }: { page: Page; children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">Skip to the article</a>
      <Masthead page={page} />
      <main id="main">{children}</main>
      <Colophon />
      <a className="tear" href={TEL} aria-label={`Call the club office on ${PHONE}`}>
        <span>Call the club office</span><b>{PHONE}</b>
      </a>
    </>
  );
}

export function mount(node: ReactNode) {
  const el = document.getElementById('root')!;
  createRoot(el).render(node);
}
