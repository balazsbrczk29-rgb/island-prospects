import type { Item } from './data';

// The photo wall: photographs full-bleed in their cell, product cut-outs on zinc plates. Spec text sits under each, no cards.
export function Tile({ it, i, eager, big }: { it: Item; i: number; eager?: boolean; big?: boolean }) {
  return (
    <figure className={`tile tile-${it.kind}${big ? ' tile-big' : ''}`} style={i >= 0 ? ({ viewTransitionName: `tile-${i}` } as React.CSSProperties) : undefined}>
      <div className="tile-img">
        <img
          src={it.src}
          alt={it.alt}
          width={big ? 1200 : 800}
          height={big ? 900 : 800}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager && i === 0 ? 'high' : undefined}
          decoding="async"
          data-source={it.source}
        />
        {it.note && <span className="hand-note" aria-hidden="true">{it.note}</span>}
      </div>
      <figcaption>
        <span className="tile-name">{it.name}</span>
        <span className="tile-use">{it.use}</span>
      </figcaption>
    </figure>
  );
}

export function Wall({ items, eager, say, plate }: { items: Item[]; eager?: boolean; say?: string; plate?: React.ReactNode }) {
  return (
    <div className={`wall wall-n${Math.min(items.length, 6)}`}>
      {plate}
      {items.map((it, i) => <Tile key={it.src} it={it} i={i} eager={eager} big={i === 0} />)}
      {items.length === 1 && say && <p className="wall-say" style={{ viewTransitionName: 'tile-1' } as React.CSSProperties}>{say}</p>}
    </div>
  );
}
