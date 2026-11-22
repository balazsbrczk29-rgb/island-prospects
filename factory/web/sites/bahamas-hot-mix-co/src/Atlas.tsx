import { useMemo, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { CATEGORIES, PROJECTS, type Cat } from "./data"
import { ease } from "./site"

// The project index: real categories from bhmgroup.com/projects, every row links to their project page.
export default function Atlas({ limit, thumbs = false, cat: catIn, setCat: setCatIn }: { limit?: number; thumbs?: boolean; cat?: Cat | "All"; setCat?: (c: Cat | "All") => void }) {
  const [catOwn, setCatOwn] = useState<Cat | "All">("All")
  const cat = catIn ?? catOwn, setCat = setCatIn ?? setCatOwn
  const [hover, setHover] = useState(0)
  const rows = useMemo(() => PROJECTS.filter(p => cat === "All" || p.cat === cat), [cat])
  const shown = limit ? rows.slice(0, limit) : rows
  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map(c => [c, PROJECTS.filter(p => p.cat === c).length])), [])
  const active = shown[Math.min(hover, shown.length - 1)]

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-12">
        <div role="group" aria-label="Filter projects by kind of work" className="-mx-[var(--pad)] px-[var(--pad)] flex gap-2 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible [scrollbar-width:none]">
          {(["All", ...CATEGORIES] as const).map(c => {
            const on = cat === c
            return (
              <button key={c} type="button" aria-pressed={on} onClick={() => { setCat(c); setHover(0) }}
                className={`shrink-0 min-h-[44px] px-4 border text-sm rounded-[var(--r)] transition-colors duration-150 ${on ? "bg-[var(--color-petrol)] border-[var(--color-petrol)] text-white" : "border-[var(--color-line)] hover:border-[var(--color-ink)]"}`}>
                {c} <span className="mono text-[0.75rem] opacity-70">{c === "All" ? PROJECTS.length : counts[c]}</span>
              </button>
            )
          })}
        </div>
      </div>

      <LayoutGroup>
        <ol className={`${thumbs ? "lg:col-span-12" : "lg:col-span-7"} border-t border-[var(--color-line)]`}>
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((p, i) => (
              <motion.li key={p.url + p.name} layout="position" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease }}
                className="border-b border-[var(--color-line)]">
                <a href={p.url} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_14rem] items-center gap-4 py-3.5 min-h-[56px]">
                  <span className="flex items-center gap-4 min-w-0">
                    {thumbs && <img src={p.thumb} width={400} height={284} loading="lazy" alt="" className="photo !w-[96px] sm:!w-[140px] !h-auto aspect-[400/284] shrink-0" />}
                    <span className="font-[family-name:var(--font-display)] text-[1.125rem] sm:text-[1.3rem] tracking-[-0.02em] leading-tight group-hover:text-[var(--color-petrol)] transition-colors">{p.name}</span>
                  </span>
                  <span className="hidden sm:block text-xs text-[var(--color-muted)] text-right lg:text-left">{p.cat}</span>
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </LayoutGroup>

      {!thumbs && active && (
        <div className="hidden lg:block lg:col-span-4 lg:col-start-9">
          <div className="sticky top-8">
            <div className="relative aspect-[400/284] w-full max-w-[400px] overflow-hidden bg-[#CBD3D2]">
              <AnimatePresence initial={false}>
                <motion.img key={active.thumb} src={active.thumb} width={400} height={284} alt="" loading="lazy"
                  className="photo absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
              </AnimatePresence>
            </div>
            <p className="mt-3 text-sm max-w-[400px]">{active.name}</p>
            <p className="text-xs text-[var(--color-muted)]">{active.cat}</p>
          </div>
        </div>
      )}
    </div>
  )
}
