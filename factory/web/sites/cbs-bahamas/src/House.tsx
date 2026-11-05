import { useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { DEPTS } from "./data"
import { ease } from "./site"

const S = "#17201d"
type Spot = { id: string; dept: string; label: string; x: number; y: number }
const SPOTS: Spot[] = [
  { id: "roof", dept: "roofing", label: "Roof", x: 440, y: 190 },
  { id: "window", dept: "doors", label: "Window and shutters", x: 205, y: 365 },
  { id: "door", dept: "doors", label: "Front door", x: 330, y: 440 },
  { id: "ceiling", dept: "ceilings", label: "Ceiling", x: 540, y: 296 },
  { id: "kitchen", dept: "kitchen", label: "Kitchen", x: 530, y: 470 },
  { id: "bath", dept: "bath", label: "Bathroom", x: 690, y: 470 },
  { id: "light", dept: "lighting", label: "Lights and fans", x: 865, y: 345 },
  { id: "floor", dept: "flooring", label: "Floor", x: 615, y: 532 },
  { id: "porch", dept: "patio", label: "Porch", x: 915, y: 470 },
  { id: "garden", dept: "garden", label: "Yard", x: 70, y: 500 },
]

function Line({ d, w = 2, delay = 0 }: { d: string; w?: number; delay?: number }) {
  return <motion.path d={d} fill="none" stroke={S} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay, ease }} />
}

function Part({ id, on, pick, children }: { id: string; on: boolean; pick: (id: string) => void; children: ReactNode }) {
  return <g className={`hot ${on ? "is-on" : ""}`} onClick={() => pick(id)} aria-hidden>{children}</g>
}

export default function House() {
  const [active, setActive] = useState("door")
  const spot = SPOTS.find(s => s.id === active)!
  const dept = DEPTS.find(d => d.id === spot.dept)!
  const pick = (id: string) => setActive(id)
  const on = (...ids: string[]) => ids.includes(active)
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="relative overflow-hidden rounded-[6px] border border-line bg-paper blueprint lg:col-span-8">
        <svg viewBox="0 0 1000 600" className="block w-full" role="img" aria-label="Line drawing of a Bahamian house with a verandah, cut away to show the kitchen and bathroom. Tap a part to see the matching CBS department.">
          {/* ground and yard */}
          <Line d="M0 540 H1000" w={2.5} />
          <Part id="garden" on={on("garden")} pick={pick}>
            <rect className="part" x="20" y="400" width="95" height="140" fill="transparent" />
            <Line d="M66 540 C64 480 70 440 62 400" delay={0.3} />
            <Line d="M62 402 C40 392 22 398 12 412 M62 402 C84 390 104 396 114 410 M62 402 C52 380 36 376 24 380 M62 402 C74 380 92 376 104 382" delay={0.5} />
            <Line d="M24 540 C24 516 46 508 52 524 C58 508 82 512 84 540" delay={0.6} />
          </Part>
          {/* roof */}
          <Part id="roof" on={on("roof")} pick={pick}>
            <polygon className="part" points="96,262 784,262 650,128 230,128" fill="#eeefe9" />
            <Line d="M96 262 L230 128 H650 L784 262 Z" w={2.5} />
            {Array.from({ length: 15 }, (_, i) => (i + 1) / 16).map((t, i) => <Line key={t} d={`M${230 + 420 * t} 130 L${96 + 688 * t} 260`} w={1} delay={0.2 + i * 0.03} />)}
          </Part>
          {/* house body */}
          <Line d="M120 262 V540 M760 262 V540" w={2.5} delay={0.1} />
          {/* exterior: window with louvred shutters */}
          <Part id="window" on={on("window")} pick={pick}>
            <rect className="part" x="128" y="320" width="154" height="130" fill="transparent" />
            <Line d="M160 330 H250 V440 H160 Z M205 330 V440 M160 385 H250" delay={0.4} />
            <Line d="M132 326 H158 V444 H132 Z M252 326 H278 V444 H252 Z" w={1.5} delay={0.5} />
            {Array.from({ length: 11 }, (_, i) => 336 + i * 10).map(y => <g key={y}><Line d={`M135 ${y} H155`} w={1} delay={0.6} /><Line d={`M255 ${y} H275`} w={1} delay={0.6} /></g>)}
          </Part>
          {/* exterior: front door with steps */}
          <Part id="door" on={on("door")} pick={pick}>
            <rect className="part" x="296" y="366" width="72" height="174" fill="transparent" />
            <Line d="M302 540 V372 H362 V540" delay={0.4} />
            <Line d="M312 388 H352 V444 H312 Z M312 456 H352 V524 H312 Z" w={1.2} delay={0.6} />
            <circle cx="354" cy="462" r="3" fill={S} />
            <Line d="M290 540 H374" w={3} />
          </Part>
          {/* section cut line */}
          <Line d="M470 262 V540" w={4} delay={0.2} />
          <text x="478" y="282" fontFamily="Figtree, sans-serif" fontSize="11" letterSpacing="2" fill="#56605b">SECTION</text>
          {/* ceiling */}
          <Part id="ceiling" on={on("ceiling")} pick={pick}>
            <rect className="part" x="472" y="286" width="286" height="20" fill="transparent" />
            <Line d="M472 296 H758" w={1.5} delay={0.7} />
            {Array.from({ length: 9 }, (_, i) => 500 + i * 32).map(x => <Line key={x} d={`M${x} 290 V302`} w={1} delay={0.8} />)}
          </Part>
          {/* kitchen */}
          <Part id="kitchen" on={on("kitchen")} pick={pick}>
            <rect className="part" x="474" y="320" width="134" height="208" fill="transparent" />
            <Line d="M482 330 H600 V380 H482 Z M541 330 V380" w={1.5} delay={0.8} />
            <Line d="M482 452 H600 M482 452 V528 H600 V452 M524 452 V528 M560 452 V528" w={1.5} delay={0.9} />
            <Line d="M540 452 V432 C540 424 552 424 552 432" w={1.5} delay={1} />
          </Part>
          {/* interior wall */}
          <Line d="M612 300 V528" w={2} delay={0.6} />
          {/* bath */}
          <Part id="bath" on={on("bath")} pick={pick}>
            <rect className="part" x="616" y="320" width="140" height="208" fill="transparent" />
            <Line d="M630 360 H680 V420 H630 Z" w={1.5} delay={0.9} />
            <Line d="M626 470 H684 V528 H626 Z M655 470 V452 C655 444 666 444 666 452" w={1.5} delay={1} />
            <Line d="M708 528 V500 H748 C750 520 736 528 722 528 Z M712 500 V462 H740 V500" w={1.5} delay={1.1} />
          </Part>
          {/* floor */}
          <Part id="floor" on={on("floor")} pick={pick}>
            <rect className="part" x="472" y="528" width="286" height="12" fill="transparent" />
            {Array.from({ length: 10 }, (_, i) => 480 + i * 28).map(x => <Line key={x} d={`M${x} 530 L${x + 14} 538`} w={1} delay={1.1} />)}
          </Part>
          {/* verandah */}
          <Part id="porch" on={on("porch")} pick={pick}>
            <rect className="part" x="770" y="400" width="200" height="140" fill="transparent" />
            <Line d="M760 274 L962 300 V312 L760 288" delay={0.3} />
            <Line d="M800 304 V540 M944 310 V540" delay={0.4} />
            <Line d="M800 470 H944 M800 486 H944" w={1.2} delay={0.7} />
            {Array.from({ length: 8 }, (_, i) => 816 + i * 16).map(x => <Line key={x} d={`M${x} 486 V540`} w={1} delay={0.8} />)}
            <Line d="M880 520 C880 504 914 504 914 520 Z M884 520 L878 540 M910 520 L916 540 M897 504 V496" w={1.5} delay={1.1} />
          </Part>
          {/* lights and fan */}
          <Part id="light" on={on("light")} pick={pick}>
            <rect className="part" x="820" y="300" width="96" height="60" fill="transparent" />
            <Line d="M868 306 V326 M830 330 C850 326 886 326 906 330 M856 330 C856 340 880 340 880 330" w={1.5} delay={1} />
            <Line d="M541 302 V330 M528 340 L541 330 L554 340 Z" w={1.5} delay={1.1} />
          </Part>
          {/* hotspots */}
          {SPOTS.map((s, i) => (
            <g key={s.id} className="cursor-pointer" onClick={() => pick(s.id)} aria-hidden>
              {active === s.id && <circle cx={s.x} cy={s.y} r="20" fill="none" stroke="#e2b23a" strokeWidth="2"><animate attributeName="r" values="12;24;12" dur="2.4s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" /></circle>}
              <circle cx={s.x} cy={s.y} r="12" fill={active === s.id ? "#e2b23a" : "#245a41"} />
              <text x={s.x} y={s.y + 4} textAnchor="middle" fontFamily="Figtree, sans-serif" fontSize="11" fontWeight="600" fill={active === s.id ? "#17201d" : "#eeefe9"}>{i + 1}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="lg:col-span-4">
        <ul className="flex flex-wrap gap-2" aria-label="Parts of the house">
          {SPOTS.map((s, i) => (
            <li key={s.id}>
              <button type="button" onClick={() => pick(s.id)} aria-pressed={active === s.id} className={`min-h-11 rounded-[4px] border px-3 text-[14px] transition hover:-translate-y-px ${active === s.id ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:border-ink"}`}>
                <span className="mr-1.5 tabular-nums opacity-60">{i + 1}</span>{s.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t-2 border-ink pt-6" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={dept.id + spot.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }}>
              <p className="text-[12px] tracking-[0.18em] text-muted uppercase">{spot.label} · {dept.group}</p>
              <p className="mt-3 font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1] font-bold tracking-[-0.03em]">{dept.name}</p>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">{dept.line}</p>
              <a href={dept.href} className="group mt-6 inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-pine px-5 font-medium text-paper transition hover:-translate-y-px hover:bg-pine-deep">
                Shop {dept.name} <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
