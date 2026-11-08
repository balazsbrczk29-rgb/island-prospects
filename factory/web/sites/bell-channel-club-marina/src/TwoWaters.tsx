import { useRef, useState } from 'react';
import { IMG } from './images';

// Interaction 1: the club sits on both the canal and the beach. Drag between the two waters.
export function TwoWaters() {
  const [x, setX] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = frame.current!.getBoundingClientRect();
    setX(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <section className="waters" aria-labelledby="waters-h">
      <div className="wrap">
        <div className="essay__head" style={{ marginBottom: 28 }}>
          <h2 id="waters-h" className="disp" style={{ fontSize: 'clamp(34px,4.4vw,64px)', lineHeight: 1, margin: 0 }}>Canal side, <em className="it">beach side</em></h2>
          <p style={{ margin: 0, color: '#B9B4A8', maxWidth: '46ch' }}>The complex runs from the sheltered canal, where owners keep their boats, to the beach the homeowners’ association maintains. Drag across the picture to walk from one water to the other.</p>
        </div>
        <div ref={frame} className="waters__frame"
          onPointerDown={e => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }}
          onPointerMove={e => { if (e.buttons) move(e.clientX); }}>
          <img src={IMG.canal.src} alt={IMG.canal.alt} data-source="generated" loading="lazy" width={IMG.canal.w} height={IMG.canal.h} />
          <img src={IMG.beach.src} alt={IMG.beach.alt} data-source="commons" loading="lazy" width={IMG.beach.w} height={IMG.beach.h}
            style={{ clipPath: `inset(0 0 0 ${x}%)` }} />
          <div className="waters__handle" style={{ left: `${x}%` }}><span aria-hidden="true">&harr;</span></div>
          <div className="waters__kb" role="slider" tabIndex={0} aria-label="Move between the canal and the beach" aria-valuemin={4} aria-valuemax={96} aria-valuenow={Math.round(x)} aria-valuetext={x < 35 ? 'Mostly the beach' : x > 65 ? 'Mostly the canal' : 'Halfway'}
            onKeyDown={e => { if (e.key === 'ArrowLeft') setX(v => Math.max(4, v - 6)); if (e.key === 'ArrowRight') setX(v => Math.min(96, v + 6)); }} />
          <span className="waters__label sc" style={{ left: 14 }}>The canal</span>
          <span className="waters__label sc" style={{ right: 14 }}>The beach</span>
        </div>
        <div className="waters__btns" role="group" aria-label="Choose a view">
          <button type="button" aria-pressed={x > 80} onClick={() => setX(92)}>Canal side</button>
          <button type="button" aria-pressed={x >= 30 && x <= 70} onClick={() => setX(50)}>Both waters</button>
          <button type="button" aria-pressed={x < 20} onClick={() => setX(8)}>Beach side</button>
        </div>
        <p className="cap"><span>Left: a Grand Bahama canal at dusk, illustrative photograph to be replaced with the club’s own. Right: {IMG.beach.caption}</span><span>{IMG.beach.credit}</span></p>
      </div>
    </section>
  );
}
