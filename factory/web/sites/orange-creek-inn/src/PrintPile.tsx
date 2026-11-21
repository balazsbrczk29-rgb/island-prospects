import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Print } from "./site"
import type { Photo } from "./facts"

// where a print rests at each depth of the pile: the top one lies straight, the ones beneath peek out
const REST = [
  { x: 0, y: 0, rotate: 0 },
  { x: 20, y: -16, rotate: 3.2 },
  { x: -18, y: -8, rotate: -3.6 },
  { x: 6, y: -30, rotate: 5.2 },
]
const settle = { type: "spring", stiffness: 240, damping: 22, mass: 0.9 } as const

/** A pile of the inn's photographs. Tap, drag or press the button to deal the top print to the back. */
export default function PrintPile({ photos }: { photos: Photo[] }) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i))
  const [leaving, setLeaving] = useState<{ id: number; dir: number } | null>(null)
  const [dealt, setDealt] = useState(false)   // the opening deal runs once, bottom print first
  const top = order[0]
  const deal = (dir = 1) => { if (!leaving) setLeaving({ id: top, dir }) }
  const landed = (id: number) => {
    if (leaving?.id !== id) return
    setOrder(o => [...o.slice(1), o[0]])
    setLeaving(null)
  }
  return (
    <div className="spread__margin">
      <div className="pile" role="group" aria-roledescription="pile of photographs" aria-label="Photographs of Orange Creek Inn">
        {photos.map((photo, id) => {
          const depth = order.indexOf(id)
          const gone = leaving?.id === id
          const rest = REST[Math.min(depth, REST.length - 1)]
          return (
            <motion.figure
              key={id}
              className="print"
              style={{ zIndex: photos.length - depth }}
              initial={{ x: 240 + id * 40, y: 120, rotate: 16 - id * 5 }}
              animate={gone ? { x: leaving!.dir * 470, y: 18, rotate: leaving!.dir * 11 } : rest}
              transition={gone ? { duration: 0.26, ease: [0.5, 0, 0.9, 0.5] } : dealt ? settle : { ...settle, stiffness: 150, damping: 20, delay: 0.15 + (photos.length - 1 - id) * 0.11 }}
              onAnimationComplete={() => { if (id === 0 && !dealt) setDealt(true); landed(id) }}
              drag={depth === 0 && !gone ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.55}
              whileDrag={{ scale: 1.02 }}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 420) deal(info.offset.x < 0 ? -1 : 1) }}
              onTap={() => { if (depth === 0) deal(1) }}
              aria-hidden={depth !== 0}
            >
              <Print photo={photo} eager={id === 0} />
            </motion.figure>
          )
        })}
      </div>
      <div className="pile__bar">
        <p aria-live="polite"><span className="num">{top + 1} of {photos.length}</span>. Drag a photograph aside to see the next.</p>
        <button type="button" className="round" aria-label="Next photograph" onClick={() => deal(1)}><ArrowRight aria-hidden /></button>
      </div>
    </div>
  )
}
