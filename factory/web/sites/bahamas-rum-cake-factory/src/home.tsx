import { useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { ArrowRight, ArrowUpRight, Phone, RotateCcw, ShoppingBag, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FLAVOURS, IMG, STORE } from "./data"
import { Page, mount, Reveal, Tag, ease, PHONE, TEL } from "./site"

function Hero() {
  const { scrollY } = useScroll()
  const rot = useTransform(scrollY, [0, 800], [0, 40])
  const y = useTransform(scrollY, [0, 800], [0, 80])
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[calc(100svh-130px)] max-w-[1440px] items-center gap-8 px-5 pt-8 pb-12 md:px-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-[13px] tracking-[0.2em] text-gold uppercase">Baked in downtown Nassau since 2000</motion.p>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(3rem,7vw,7.4rem)] leading-[0.92] tracking-[-0.02em] text-rum">
            {["The Official", "Rum Cake of", "The Bahamas."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.07em]"><motion.span className="block" initial={{ y: "106%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.15, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-7 max-w-[42ch] text-[18px] leading-relaxed text-rum/80">Gently marinated in Ole Nassau Bahamian Rum, baked in the same downtown shop where George Bates first sold his Original, and recognised in 2014 as the Official Rum Cake of The Bahamas.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href={STORE} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-rum px-6 text-[15px] text-cream transition hover:-translate-y-px hover:bg-gold"><ShoppingBag className="size-4" aria-hidden /> Order a rum cake</a>
            <a href="#six" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-rum/25 px-6 text-[15px] transition hover:-translate-y-px hover:border-rum">Build a six pack <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
          </motion.div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[620px]">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 1.4, ease }} className="absolute inset-[6%] rounded-full bg-conch" />
          <motion.svg style={{ rotate: rot }} viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden>
            <defs><path id="ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" /></defs>
            <text fontFamily="Mulish, sans-serif" fontSize="7.2" letterSpacing="4.2" fill="#8f6214"><textPath href="#ring">OLE NASSAU BAHAMIAN RUM · DOWNTOWN NASSAU · SINCE 2000 · OFFICIAL RUM CAKE OF THE BAHAMAS ·</textPath></text>
          </motion.svg>
          <motion.img style={{ y }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1.2, ease }} src={IMG.hero} alt="The Original Bahamas Rum Cake, a glazed bundt cake" width={1200} height={1200} fetchPriority="high" className="absolute inset-[12%] size-[76%] object-contain drop-shadow-[0_40px_40px_rgba(42,26,18,0.25)]" />
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [["Order online", "Ships to the US and more", STORE], ["The shop", "East Bay Street, Nassau", "#visit"], ["From the cruise port", "A short walk", "#visit"], ["Opens", "7:30 am, Sundays 8:00", "#visit"]]
  return (
    <section className="bg-rum text-cream" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.7, ease }} className="border-cream/15 max-sm:border-b sm:max-lg:odd:border-r lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="block text-[12px] tracking-[0.18em] text-gold-light uppercase">{k}</span>
              <span className="mt-2 block font-display text-[clamp(1.35rem,1.9vw,1.8rem)]">{v}</span>
              <span className="mt-3 block h-px w-0 bg-gold-light transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const SIX = FLAVOURS.filter(f => !f.seasonal)
function SixPack() {
  const [box, setBox] = useState<string[]>([])
  const add = (n: string) => setBox(b => b.length < 6 ? [...b, n] : b)
  const remove = (i: number) => setBox(b => b.filter((_, j) => j !== i))
  const full = box.length === 6
  const summary = Object.entries(box.reduce<Record<string, number>>((a, n) => ({ ...a, [n]: (a[n] ?? 0) + 1 }), {})).map(([n, c]) => `${c} × ${n}`).join(", ")
  return (
    <section id="six" className="scroll-mt-20 mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="six-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Tag n="01">Six pack</Tag>
          <h2 id="six-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">Fill the box, six minis.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">The factory sells 4 oz rum cakes in six packs, mixed or by flavour, plus a custom six pack. Plan yours here, then finish the order in the online shop.</p>
          <p className="mt-4 max-w-sm text-[15px] text-muted">Free shipping on orders over $55, as the online shop states for US orders.</p>
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <div className="rounded-[30px] bg-cream-2 p-5 md:p-8">
              <div className="grid grid-cols-3 gap-3 md:gap-4" aria-live="polite">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="relative grid aspect-[5/4] place-items-center rounded-2xl border-2 border-dashed border-gold/30 bg-cream">
                    <AnimatePresence>
                      {box[i] && (
                        <motion.button type="button" onClick={() => remove(i)} aria-label={`Remove ${box[i]}`} initial={{ scale: 0.4, opacity: 0, y: -30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ type: "spring", stiffness: 380, damping: 24 }} className="group absolute inset-1.5 flex flex-col items-center justify-center rounded-xl bg-rum p-2 text-center text-cream">
                          <span className="font-display text-[clamp(0.95rem,1.6vw,1.3rem)] leading-tight">{box[i]}</span>
                          <span className="mt-1 text-[11px] text-cream/60">4 oz</span>
                          <X className="absolute top-2 right-2 size-3.5 opacity-50 transition group-hover:opacity-100" aria-hidden />
                        </motion.button>
                      )}
                    </AnimatePresence>
                    {!box[i] && <span className="font-display text-xl text-gold/40">{i + 1}</span>}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-[15px] text-muted">{box.length ? summary : "Tap a flavour below to drop it in."}</p>
                <div className="flex gap-2">
                  {box.length > 0 && <button type="button" onClick={() => setBox([])} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rum/20 px-4 text-[14px] transition hover:border-rum"><RotateCcw className="size-4" aria-hidden /> Start again</button>}
                  <a href={STORE} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] transition hover:-translate-y-px ${full ? "bg-rum text-cream hover:bg-gold" : "bg-rum/10 text-rum"}`}>{full ? "Order this six pack" : `${6 - box.length} to go`} <ArrowUpRight className="size-4" aria-hidden /></a>
                </div>
              </div>
            </div>
          </Reveal>
          <ul className="mt-6 flex flex-wrap gap-2">
            {SIX.map(f => (
              <li key={f.name}><button type="button" onClick={() => add(f.name)} aria-disabled={full} className="min-h-11 rounded-full border border-rum/20 bg-cream px-4 text-[15px] transition hover:-translate-y-px hover:border-rum hover:bg-cream-2 aria-disabled:opacity-40">{f.name}</button></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Story() {
  const items = [["2000", "George Bates, originally from the United Kingdom, opens a small rum cake shop in downtown Nassau with his Original recipe."], ["2014", "The shop's cake is recognised as the Official Rum Cake of The Bahamas."], ["Today", "Still in the same location it started, with master baker Simon Smith, a range of flavours, and cakes shipped from Nassau."]]
  return (
    <section id="story" className="scroll-mt-20 bg-cream-2" aria-labelledby="story-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Tag n="02">Our story</Tag>
            <h2 id="story-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">One recipe, one shop, the same street.</h2>
          </Reveal>
          <ol className="mt-12">
            {items.map(([y, t], i) => (
              <motion.li key={y} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="grid gap-2 border-t border-line py-7 md:grid-cols-[8rem_1fr] md:gap-8">
                <span className="font-display text-3xl text-gold">{y}</span>
                <span className="text-[17px] leading-relaxed text-rum/80">{t}</span>
              </motion.li>
            ))}
          </ol>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-6">
          <Reveal className="col-span-2"><figure className="group overflow-hidden rounded-[28px] bg-conch"><img src={IMG.beach} alt="A six pack of Bahamas Rum Cake Factory pineapple rum cakes on the beach" loading="lazy" width={1600} height={1000} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></figure></Reveal>
          <Reveal delay={0.05}><figure className="group overflow-hidden rounded-[28px] bg-conch"><img src={IMG.friends} alt="Two friends holding Bahamas Rum Cake Factory rum cakes" loading="lazy" width={800} height={800} className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></figure></Reveal>
          <Reveal delay={0.1}><figure className="group overflow-hidden rounded-[28px] bg-conch"><img src={IMG.shop} alt="Rum cakes at the Bahamas Rum Cake Factory" loading="lazy" width={800} height={800} className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></figure></Reveal>
        </div>
      </div>
    </section>
  )
}

function Platform() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10" aria-label="Island delivery">
      <div data-platform="order" className="flex flex-col gap-4 rounded-[28px] border border-dashed border-gold/40 p-7 md:flex-row md:items-center md:justify-between">
        <div><p className="text-[12px] tracking-[0.18em] text-gold uppercase">Coming soon</p><p className="mt-2 font-display text-2xl">Order a rum cake for delivery across Nassau.</p></div>
        <span aria-disabled="true" className="inline-flex min-h-11 cursor-not-allowed items-center rounded-full bg-rum/10 px-5 text-[15px] text-rum/60">Order online, coming soon</span>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is the Bahamas Rum Cake Factory?", "In downtown Nassau on East Bay Street, a short walk from the cruise port. The shop is still in the location where it opened in 2000."],
  ["Can I order rum cakes online?", "Yes. The factory's online shop sells 4 oz and 20 oz cakes, six packs and bundles, with shipping options to the US and other countries."],
  ["What flavours are there?", "The range includes Original, Original with pecans, pineapple, pina colada, coconut, banana, chocolate, caramel Caribbean, key lime, amaretto, Irish cream, Kentucky bourbon and strawberry, plus seasonal flavours."],
  ["What is in the cakes?", "Each cake is gently marinated in the factory's signature brand of Ole Nassau Bahamian Rum."],
]
function Visit() {
  return (
    <section id="visit" className="scroll-mt-20 border-t border-line" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Tag n="03">Visit the shop</Tag>
          <h2 id="visit-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">Off the ship, up East Bay Street.</h2>
          <p className="mt-5 text-[17px] text-muted">Opens 7:30 am Monday to Saturday, 8:00 am on Sunday.</p>
          <a href={TEL} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-rum px-6 text-[15px] text-cream transition hover:-translate-y-px hover:bg-gold"><Phone className="size-4" aria-hidden /> Call {PHONE}</a>
          <Accordion type="single" collapsible defaultValue="q0" className="mt-12 border-t border-line">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-left font-display text-xl hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[28px] border border-line lg:col-span-7">
          <iframe title="Map of the Bahamas Rum Cake Factory, East Bay Street, Nassau" loading="lazy" className="h-[440px] w-full lg:h-full" src="https://www.google.com/maps?q=Bahamas+Rum+Cake+Factory,+East+Bay+Street,+Nassau&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><SixPack /><Story /><Platform /><Visit /></Page>)
