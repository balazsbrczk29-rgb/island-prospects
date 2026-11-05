import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, ease, reveal, BOOK, EMAIL } from "./site"
import { Journey } from "./Journey"

const TAXIS = [
  { name: "Miss Joyann Mackey", detail: "Cell and WhatsApp", tel: "+1 242 819 9711" },
  { name: "DLKing Taxi", detail: "Cell and WhatsApp · dlkingtaxi@gmail.com", tel: "+1 242 474 8462" },
]
const CARS = [
  { name: "Gilbert's Car Rental", where: "New Bight", detail: "Sedans, SUVs and 7-seat vans. Free pick up and drop off at New Bight Airport. Cell and WhatsApp +1 242 474 1050.", tel: "242 342 3011" },
  { name: "Alvernia Car Rental", where: "Smith Bay", detail: "Honda CRV, Mazda Tribute and Nissan X-Trail, as low as $50 a day. Free pick up and drop off at New Bight Airport.", tel: "242 342 2042" },
  { name: "Favors Car Rental", where: "Old Bight", detail: "SUVs and 8-seat vans. Free pick up and drop off at New Bight Airport. Cell and WhatsApp +1 242 359 2648.", tel: "242 342 4107" },
  { name: "MLR Hardware Car Rental", where: "New Bight", detail: "Sedans and vans up to 8 seats. Free pick up and drop off at New Bight Airport. Mon to Fri 8 to 5:30, Sat 8 to 3. Cell 242 474 2472.", tel: "242 342 2122" },
]
const tel = (t: string) => `tel:+1${t.replace(/\D/g, "").replace(/^1/, "")}`

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16" aria-labelledby="gh-title">
      <p className="label text-grape">Getting here · New Bight (CAT) · Port Howe</p>
      <h1 id="gh-title" className="display mt-8 text-[clamp(3.2rem,9vw,9.4rem)]">
        {["How to reach", "Cat Island."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.08em]">
            <motion.span className={`block ${i ? "italic text-grape" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.2, ease: reveal }}>{l}</motion.span>
          </span>
        ))}
      </h1>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-10 max-w-xl text-[18px] leading-relaxed text-ink/80">Cat Island is a little different from the usual Bahamian getaway. Fly to New Bight, then take a local taxi or a rental car south to Greenwood Beach Resort.</motion.p>
    </section>
  )
}

function Air() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="air-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-14">
          <Label n="01" light>In the air</Label>
          <h2 id="air-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">Two ways to fly in.</h2>
        </Reveal>
        <Journey />
      </div>
    </section>
  )
}

function Ground() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="ground-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="02">On the ground</Label>
          <h2 id="ground-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">Taxi or your own wheels.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Local drivers know the island well and bring you from the airport to the door. A rental car lets you explore Cat Island at your own pace.</p>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="label text-grape">Taxis</p>
          <ul className="mt-4 border-t border-line">
            {TAXIS.map(t => (
              <li key={t.name}>
                <a href={tel(t.tel)} className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line py-6">
                  <span><span className="block font-display text-2xl transition group-hover:translate-x-1">{t.name}</span><span className="mt-1 block text-[15px] text-muted">{t.detail}</span></span>
                  <span className="inline-flex items-center gap-2 text-[15px] text-grape"><Phone className="size-4" aria-hidden />{t.tel}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="label mt-14 text-grape">Car rental</p>
          <ul className="mt-4 border-t border-line">
            {CARS.map(c => (
              <li key={c.name}>
                <a href={tel(c.tel)} className="group grid gap-3 border-b border-line py-6 md:grid-cols-[1fr_auto] md:items-center">
                  <span>
                    <span className="flex items-baseline gap-3"><span className="font-display text-2xl transition group-hover:translate-x-1">{c.name}</span><span className="label text-muted">{c.where}</span></span>
                    <span className="mt-2 block max-w-xl text-[15px] leading-relaxed text-muted">{c.detail}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-[15px] text-grape"><Phone className="size-4" aria-hidden />{c.tel}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-muted">Details as listed by the resort. Confirm directly with each company.</p>
        </div>
      </div>
    </section>
  )
}

function Next() {
  return (
    <section className="bg-paper-2" aria-labelledby="next-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-24">
        <div>
          <Label n="03">Ready to come</Label>
          <h2 id="next-title" className="display mt-6 text-[clamp(2.2rem,4vw,3.6rem)]">Ask for your MakersAir code.</h2>
          <p className="mt-4 max-w-lg text-muted">Guests flying MakersAir get 10% off their airfare. Email {EMAIL} for the promo code when you book.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("MakersAir promo code")}`} className="btn-line">Email for the code</a>
          <a href={BOOK} className="btn">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

mount(<Page current="Getting here"><Hero /><Air /><Ground /><Next /></Page>)
