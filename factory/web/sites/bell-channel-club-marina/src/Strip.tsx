import type { Img } from './images';

// A hard-cropped photo sequence: horizontal scroll-snap strip, captions set vertically beside each photograph.
export function Strip({ imgs }: { imgs: Img[] }) {
  return (
    <div className="strip" role="region" aria-label="Photographs, scroll sideways" tabIndex={0}>
      {imgs.map(i => (
        <figure key={i.src} className="strip__item">
          <img src={i.src} alt={i.alt} data-source={i.source} loading="lazy" width={i.w} height={i.h} />
          <figcaption><span>{i.caption}</span> <small>{i.credit}</small></figcaption>
        </figure>
      ))}
    </div>
  );
}
