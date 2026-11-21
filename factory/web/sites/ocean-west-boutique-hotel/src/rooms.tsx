import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { ArrowUpRight } from "lucide-react"
import { BOOK, PHONE, TEL, ROOMS, floorName } from "./data"
import "./styles.css"

function Rooms() {
  const [cur, setCur] = useState(ROOMS[0].key)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setCur(e.target.id) }), { rootMargin: "-45% 0px -50% 0px" })
    ROOMS.forEach(r => { const el = document.getElementById(r.key); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <main id="main" className="lg:grid lg:grid-cols-[var(--idx)_minmax(0,1fr)]">
        <aside className="sticky top-0 z-20 border-b border-line bg-shell px-[var(--pad)] lg:flex lg:h-svh lg:flex-col lg:border-r lg:border-b-0 lg:pt-7 lg:pb-[84px]" aria-label="Rooms">
          <div className="flex items-center justify-between lg:block">
            <a href="index.html" className="inline-flex min-h-11 items-center font-display text-[1.5rem] no-underline">Ocean West</a>
            <a href={BOOK} target="_blank" rel="noopener" className="book min-h-11 px-4 lg:hidden">Check dates</a>
          </div>
          <p className="label hidden text-muted lg:block">The rooms</p>
          <nav aria-label="Jump to a room" className="-mx-1 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-8 lg:block lg:border-t lg:border-line lg:pb-0">
            {ROOMS.map(r => (
              <a key={r.key} href={`#${r.key}`} aria-current={cur === r.key ? "true" : undefined}
                className={`flex min-h-11 shrink-0 items-center justify-between border-line font-display text-[1.25rem] no-underline transition-colors lg:h-[clamp(34px,4.4vh,44px)] lg:min-h-0 lg:border-b lg:text-[clamp(1.35rem,1.95vw,1.85rem)] ${cur === r.key ? "text-rose" : "hover:text-rose"}`}>
                {r.name}<span className="tnum hidden text-cap text-muted lg:inline">{floorName(r.floor)}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto hidden items-center justify-between gap-4 border-t border-line pt-4 lg:flex">
            <a href={TEL} className="tnum text-small no-underline hover:text-rose">{PHONE}</a>
            <a href={BOOK} target="_blank" rel="noopener" className="book">Check dates</a>
          </div>
        </aside>
        <div className="px-[var(--pad)] pb-24">
          <header className="pt-[clamp(40px,8vh,96px)] pb-6">
            <p className="label text-muted">Ten rooms, from $215 a night</p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,4.8vw,4.6rem)] leading-[1.04]">Every room has a name, and its own view.</h1>
            <p className="mt-5 max-w-[36rem] text-body text-muted">All rooms have a fridge, a microwave, cable TV, a hair dryer and free Wi-Fi. Single or double occupancy; children under 12 stay free.</p>
          </header>
          {ROOMS.map(r => (
            <article key={r.key} id={r.key} aria-labelledby={`${r.key}-h`} className="scroll-mt-20 border-t border-line py-[clamp(48px,7vw,96px)]">
              <div className="mx-auto max-w-[800px]">
                <div className="flex items-baseline justify-between gap-6">
                  <h2 id={`${r.key}-h`} className="text-[clamp(2.6rem,5vw,4.4rem)] leading-none">{r.name}</h2>
                  <p className="tnum shrink-0 text-cap text-muted">{floorName(r.floor)}</p>
                </div>
                <div className="pic mt-6 w-full" style={{ aspectRatio: `${r.pic.w} / ${r.pic.h}` }}>
                  <img src={r.pic.src} alt={r.pic.alt} width={r.pic.w} height={r.pic.h} loading="lazy" decoding="async" />
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
                  <p className="text-body">{[r.bed, r.view, r.note].filter(Boolean).join(" · ")}</p>
                  <a href={BOOK} target="_blank" rel="noopener" className="tlink text-small text-rose">Check dates for {r.name}<ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
createRoot(document.getElementById("root")!).render(<StrictMode><Rooms /></StrictMode>)
