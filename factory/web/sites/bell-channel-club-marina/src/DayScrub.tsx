import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from 'motion/react';
import { IMG, type Img } from './images';

// Signature moment (M1): the day at the club, scrubbed by scroll. Photographs crossfade; text never animates.
const FRAMES: { hour: string; img: Img; title: string; text: string }[] = [
  { hour: 'First light', img: IMG.tennis, title: 'The tennis courts', text: 'The club keeps tennis courts for owners. Early is when the island is coolest.' },
  { hour: 'Morning', img: IMG.beach2, title: 'The beach', text: 'One side of the complex opens onto the beach, which the homeowners’ association maintains.' },
  { hour: 'Afternoon', img: IMG.library, title: 'The owners’ library', text: 'A library for owners, for the hour when the sun is too high to do anything else.' },
  { hour: 'Evening', img: IMG.pool, title: 'The heated pool', text: 'The pool is heated, so a winter evening swim is part of the plan, not a dare.' },
  { hour: 'Night', img: IMG.inlet, title: 'The inlet', text: 'From the units you look out over the inlet that carries boats in to Port Lucaya.' },
];

function Frame({ i, p, img }: { i: number; p: MotionValue<number>; img: Img }) {
  const n = FRAMES.length, step = 1 / n, a = i * step;
  const range = i === 0 ? [0, a + step * .7, a + step] : i === n - 1 ? [a - step * .3, a, 1] : [a - step * .3, a, a + step * .7, a + step];
  const out = i === 0 ? [1, 1, 0] : i === n - 1 ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(p, range, out);
  return <motion.img src={img.src} alt={img.alt} data-source={img.source} loading="lazy" width={img.w} height={img.h} style={{ opacity }} />;
}

export function DayScrub() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', v => setIdx(Math.min(FRAMES.length - 1, Math.max(0, Math.floor(v * FRAMES.length)))));
  useEffect(() => setIdx(0), []);
  const jump = (i: number) => {
    const el = ref.current!; const top = el.getBoundingClientRect().top + scrollY;
    const span = el.offsetHeight - innerHeight;
    scrollTo({ top: top + span * ((i + .5) / FRAMES.length), behavior: reduce ? 'auto' : 'smooth' });
  };
  const f = FRAMES[idx];
  return (
    <section id="day" ref={ref} className="day" aria-labelledby="day-h">
      <div className="day__stage">
        <div className="day__frames">
          {FRAMES.map((fr, i) => <Frame key={fr.hour} i={i} p={scrollYProgress} img={fr.img} />)}
        </div>
        <div className="day__bar">
          <p className="day__hour" style={{ margin: 0 }} aria-live="polite">{f.hour}</p>
          <div className="day__text">
            <h2 id="day-h" className="sc kicker" style={{ margin: 0 }}>A day at the club</h2>
            <p style={{ margin: '2px 0 0' }}><b>{f.title}.</b> {f.text} <span style={{ color: '#B9B4A8', fontSize: 13 }}>({f.img.credit})</span></p>
          </div>
          <div>
            <div className="day__hours" role="group" aria-label="Choose the time of day">
              {FRAMES.map((fr, i) => <button key={fr.hour} type="button" aria-pressed={i === idx} aria-label={fr.hour} onClick={() => jump(i)}><span aria-hidden="true" /></button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
