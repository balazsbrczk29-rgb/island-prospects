import { useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, H2, ease, reveal, PHONE, TEL } from "./site"
import { USED } from "./data"
import { Lineup, Request } from "./parts"

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-14 md:px-10 md:pt-24" aria-labelledby="inv-title">
      <p className="label text-olive">Lineup and used vehicles · Bahamas Bus &amp; Truck</p>
      <h1 id="inv-title" className="display mt-8 text-[clamp(2.7rem,7.6vw,8rem)]">
        {[["Sixteen new models,", ""], ["one showroom.", "text-olive"]].map(([l, c], i) => <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${c}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
      </h1>
      <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-ink/80">Filter the new lineup by what you need it for, or browse used vehicles with listed prices. For stock and pricing on new models, call the showroom.</p>
    </section>
  )
}

function Used() {
  const [sort, setSort] = useState<"price" | "name">("price")
  const list = [...USED].sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : (b.price ?? -1) - (a.price ?? -1))
  return (
    <section id="used" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="used-title">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><Label n="02">Used vehicles</Label><H2 id="used-title">On the lot now.</H2></div>
        <div role="group" aria-label="Sort used vehicles" className="flex gap-1 rounded-xl bg-paper-2 p-1">
          {(["price", "name"] as const).map(s => <button key={s} type="button" aria-pressed={sort === s} onClick={() => setSort(s)} className={`min-h-11 rounded-lg px-4 text-[15px] ${sort === s ? "bg-ink text-paper" : ""}`}>{s === "price" ? "By price" : "By name"}</button>)}
        </div>
      </Reveal>
      <motion.ul layout className="mt-12 border-t border-ink">
        {list.map(u => (
          <motion.li layout key={u.id} transition={{ duration: 0.5, ease }}>
            <a href={`https://bahamasbus.com/used-vehicle.php?id=${u.id}`} className="group grid grid-cols-[88px_1fr_auto] items-center gap-4 border-b border-line py-4 md:grid-cols-[140px_1fr_10rem_auto]">
              <span className="block aspect-[4/3] overflow-hidden rounded-lg bg-paper-2"><img src={`https://bahamasbus.com/uploads/used/${u.id}/main.jpg`} alt={`Used ${u.name}`} loading="lazy" width={280} height={210} className="size-full object-cover transition duration-500 group-hover:scale-[1.03]" /></span>
              <span><span className="block font-display text-lg md:text-xl">{u.name}</span><span className="text-[14px] text-muted">{u.kind} · Stock {u.id}</span></span>
              <span className="hidden font-display text-lg md:block">{u.price ? `$${u.price.toLocaleString("en-US")}` : "Call for price"}</span>
              <span className="flex items-center gap-2 text-[15px] text-olive"><span className="md:hidden">{u.price ? `$${u.price.toLocaleString("en-US")}` : "Call"}</span><ArrowUpRight className="size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
      <p className="mt-6 text-[14px] text-muted">Listing as shown on bahamasbus.com. Availability changes: call <a href={TEL} className="underline">{PHONE}</a> to confirm.</p>
    </section>
  )
}

mount(<Page current="Lineup"><Hero /><Lineup n="01" /><Used /><Request n="03" /></Page>)
