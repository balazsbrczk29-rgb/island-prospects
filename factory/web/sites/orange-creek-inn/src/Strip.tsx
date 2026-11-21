import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, animate } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Photo } from "./facts"

/** A row of their photographs you drag (or step with the arrows) along, like walking the shore. */
export default function Strip({ photos }: { photos: Photo[] }) {
  const wrap = useRef<HTMLDivElement>(null), track = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [max, setMax] = useState(0)
  useEffect(() => {
    const m = () => setMax(Math.max(0, (track.current?.scrollWidth ?? 0) - (wrap.current?.clientWidth ?? 0)))
    m(); const ro = new ResizeObserver(m); if (wrap.current) ro.observe(wrap.current); return () => ro.disconnect()
  }, [])
  const step = (dir: number) => {
    const w = (track.current?.firstElementChild as HTMLElement)?.offsetWidth ?? 400
    animate(x, Math.min(0, Math.max(-max, x.get() - dir * (w + 24))), { type: "spring", stiffness: 260, damping: 34 })
  }
  return (
    <div className="strip">
      <div className="strip__win" ref={wrap}>
        <motion.div className="strip__track" ref={track} style={{ x }} drag="x" dragConstraints={{ left: -max, right: 0 }} dragElastic={0.08} dragTransition={{ power: 0.25, timeConstant: 260 }}>
          {photos.map(p => (
            <figure key={p.src} className="strip__fig" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" draggable={false} />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
      <div className="strip__ctl">
        <button type="button" className="round" aria-label="Previous photographs" onClick={() => step(-1)}><ArrowLeft aria-hidden /></button>
        <button type="button" className="round" aria-label="Next photographs" onClick={() => step(1)}><ArrowRight aria-hidden /></button>
      </div>
    </div>
  )
}
