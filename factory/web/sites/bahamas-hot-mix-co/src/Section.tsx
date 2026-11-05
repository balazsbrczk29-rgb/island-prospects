import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "motion/react"

const LAYERS = [
  { id: "wear", name: "Wearing course", note: "Hot mix asphalt designed and made to international specifications, ISO 9001 certified.", fill: "#1a1c1e", dots: "#4a4d50" },
  { id: "binder", name: "Binder course", note: "Bitumen modified to Performance Grades with reactive polymers, latex or wax, to the client's specification.", fill: "#2e3134", dots: "#5d6166" },
  { id: "base", name: "Base course", note: "Aggregates from quarries inspected by BHM's QA/QC team, sampled and tested at source and on arrival.", fill: "#c9c2b3", dots: "#9a9282" },
  { id: "sub", name: "Prepared subgrade", note: "Soils sampled and tested in BHM's ISO 17025 accredited laboratory.", fill: "#a8987c", dots: "#7f725b" },
]

function Layer({ i, p, active }: { i: number; p: MotionValue<number>; active: boolean }) {
  const gap = [0, 70, 140, 210][i]
  const y = useTransform(p, [0.05, 0.85], [gap, 0])
  const L = LAYERS[i]
  const h = [46, 54, 80, 70][i]
  const top = [120, 166, 220, 300][i]
  return (
    <motion.g style={{ y }}>
      <path d={`M120 ${top} L640 ${top} L740 ${top - 60} L220 ${top - 60} Z`} fill={L.fill} opacity={0.92} />
      <rect x="120" y={top} width="520" height={h} fill={L.fill} />
      <path d={`M640 ${top} L740 ${top - 60} L740 ${top - 60 + h} L640 ${top + h} Z`} fill={L.fill} style={{ filter: "brightness(.8)" }} />
      {Array.from({ length: 34 }).map((_, k) => <circle key={k} cx={130 + ((k * 53) % 500)} cy={top + 8 + ((k * 17) % (h - 14))} r={i < 2 ? 1.6 : 2.6} fill={L.dots} />)}
      <line x1="740" y1={top - 30 + h / 2} x2="800" y2={top - 30 + h / 2} stroke={active ? "#f0c300" : "#5d6166"} strokeWidth={active ? 2 : 1} />
      <text x="808" y={top - 26 + h / 2} fontFamily="Archivo, sans-serif" fontSize="18" fontWeight={active ? 700 : 500} fill={active ? "#1a1c1e" : "#5d6166"}>{L.name}</text>
    </motion.g>
  )
}

export default function Section() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", v => setStep(Math.min(3, Math.max(0, Math.floor(v * 4)))))
  const L = LAYERS[step]
  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-[70px] flex h-[calc(100svh-70px)] items-center">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-6 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[13px] tracking-[0.04em] text-muted"><span className="text-amber-deep">01</span> <span className="mx-2 inline-block h-px w-10 bg-ink/25 align-middle" />Materials</p>
            <h2 id="section-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] font-bold tracking-[-0.02em] [font-stretch:115%]">Every layer, made and tested here.</h2>
            <div className="mt-8 min-h-[150px] border-l-2 border-amber pl-5">
              <p className="font-mono text-[13px] text-muted">Layer {step + 1} of 4, from the surface down</p>
              <motion.p key={L.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-1 font-display text-2xl font-bold">{L.name}</motion.p>
              <motion.p key={L.id + "n"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-2 max-w-sm text-[16px] leading-relaxed text-muted">{L.note}</motion.p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <svg viewBox="80 0 1000 620" className="h-auto w-full" role="img" aria-label="Exploded cross-section of a paved road or runway: wearing course, binder course, base course and prepared subgrade. Illustration, not to scale.">
              {[0, 1, 2, 3].map(i => <Layer key={i} i={i} p={scrollYProgress} active={i === step} />)}
              <text x="120" y="600" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#5d6166">Typical pavement section. Illustration, not to scale.</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
