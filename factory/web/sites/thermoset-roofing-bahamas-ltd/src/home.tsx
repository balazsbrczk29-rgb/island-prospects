import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useTransform } from "motion/react"
import { Page, mount } from "./Frame"
import { CLIENTS, COMMONS_NASSAU, EMAIL_GM, FINISHES, GEN, LAYERS, MAKERS, OWN, PHONE_OFFICE, RADAR, TEL_OFFICE, type Finish } from "./data"

const Building = lazy(() => import("./Building"))

const DOCK = [
  { href: "#roof", label: "Roof" },
  { href: "#finish", label: "Finish" },
  { href: "#photos", label: "Jobs" },
  { href: "#radar", label: "R.A.D.A.R." },
  { href: "#clients", label: "Clients" },
]

function useInView<T extends Element>(margin = "200px") {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el || seen) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { rootMargin: margin })
    io.observe(el); return () => io.disconnect()
  }, [seen, margin])
  return [ref, seen] as const
}

function Stage() {
  const ref = useRef<HTMLElement>(null)
  const scrollYProgress = useMotionValue(0)
  useEffect(() => {
    const on = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      const span = Math.max(1, r.height - window.innerHeight)
      scrollYProgress.set(Math.min(1, Math.max(0, -r.top / span)))
    }
    on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on)
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on) }
  }, [scrollYProgress])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.06], [0, -40])
  const [active, setActive] = useState(-1)
  const [ready, setReady] = useState(false)
  const [wide, setWide] = useState(false)
  useEffect(() => { setWide(window.innerWidth >= 768); const t = setTimeout(() => setReady(true), 50); return () => clearTimeout(t) }, [])
  return (
    <section id="roof" ref={ref} aria-labelledby="hero-title" className="relative h-[330vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-x-0 top-[17%] h-[31%] md:inset-x-0 md:left-[34%] md:top-0 md:bottom-[110px] md:h-auto">
          {ready && (
            <Suspense fallback={null}>
              <Building className="!h-full !w-full" progress={scrollYProgress} labels={wide} active={setActive} />
            </Suspense>
          )}
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="pointer-events-none absolute inset-x-0 top-0 mx-auto flex h-full max-w-[1360px] flex-col justify-between px-4 pb-[262px] pt-6 sm:px-8 md:justify-end md:pb-[200px]">
          <div className="max-w-[300px] text-[16px] leading-snug text-ink/85 md:hidden">
            <p className="label mb-1">Thermoset Roofing Bahamas Ltd.</p>
            <p>Roofing and waterproofing across New Providence and the surrounding islands.</p>
          </div>
          <div>
            <h1 id="hero-title" className="poster max-w-[11ch] text-[clamp(44px,8.6vw,132px)]">The roof over the brands you know.</h1>
            <p className="mt-3 text-[16px] text-ink/85 md:hidden">Factory-certified installers. All estimates are free.</p>
            <div className="mt-6 hidden max-w-[640px] grid-cols-2 gap-6 text-[16px] leading-snug text-ink/85 md:grid">
              <p><span className="label block">Thermoset Roofing Bahamas Ltd.</span>Roofing and waterproofing for homes, resorts, churches and commercial buildings across New Providence and the surrounding islands.</p>
              <p><span className="label block">Scroll to lift the roof apart</span>Licensed, insured and factory-certified installers of Carlisle, Elevate, Englert, Sika, Siplast and Tremco systems. Bahamian owned. All estimates are free.</p>
            </div>
          </div>
        </motion.div>


        <motion.figure style={{ opacity: heroOpacity }} className="absolute right-8 top-8 hidden w-[230px] lg:block xl:right-[max(2rem,calc((100vw-1360px)/2+2rem))]">
          <img src={OWN.membrane} alt="Thermoset crew installing a waterproof membrane on a flat commercial roof" data-source="own" width={460} height={345} fetchPriority="high" className="aspect-[4/3] w-full rounded-[10px] object-cover" />
          <figcaption className="mt-2 text-[14px] text-ink/70">Thermoset crew, membrane install.</figcaption>
        </motion.figure>

        <div className="pointer-events-none absolute inset-x-0 bottom-20 mx-auto max-w-[1360px] px-4 sm:px-8 md:bottom-auto md:top-14" aria-live="polite">
          <AnimatePresence mode="wait">
            {active >= 0 && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                className="max-w-[380px] rounded-[14px] bg-deep/90 p-5 md:bg-transparent md:p-0"
              >
                <p className="label">Layer {["one", "two", "three", "four", "five", "six"][active]} of six</p>
                <h2 className="poster mt-1 text-[36px] md:text-[56px]">{LAYERS[active].name}</h2>
                <p className="mt-3 text-[16px] text-ink/85 md:text-[17px]">{LAYERS[active].text}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function FinishPicker() {
  const [ref, seen] = useInView<HTMLDivElement>()
  const [key, setKey] = useState<Finish["key"]>("tpo")
  const f = useMemo(() => FINISHES.find(x => x.key === key)!, [key])
  return (
    <section id="finish" aria-labelledby="finish-title" className="relative scroll-mt-4 border-t rule">
      <div className="mx-auto grid max-w-[1360px] gap-8 px-4 py-20 sm:px-8 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <h2 id="finish-title" className="poster text-[clamp(44px,6vw,96px)]">Pick the finish. Watch it go on.</h2>
          <p className="mt-5 max-w-md text-ink/85">The same building, five of the systems Thermoset installs. Choose one and the top of the roof changes to match.</p>
          <div role="group" aria-label="Roof finish" className="mt-8 border-t rule">
            {FINISHES.map(x => (
              <button key={x.key} type="button" aria-pressed={x.key === key} onClick={() => setKey(x.key)} className="finish-btn">
                <span className="slab text-[24px] font-semibold">{x.name}</span>
                <span aria-hidden className="text-[14px] text-ink/60">{x.key === key ? "on the roof" : "try it"}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-7">
          <div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-deep">
            {seen && (
              <Suspense fallback={null}>
                <Building className="!h-full !w-full" still={0} finish={key} spin fov={32} />
              </Suspense>
            )}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-[200px_1fr] sm:items-start">
            <AnimatePresence mode="wait">
              <motion.img
                key={f.photo}
                src={f.photo}
                alt={f.alt}
                data-source="generated"
                width={400} height={300} loading="lazy"
                initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="aspect-[4/3] w-full rounded-[12px] object-cover"
              />
            </AnimatePresence>
            <div aria-live="polite">
              <p className="slab text-[26px] font-semibold text-sun">{f.name}</p>
              <p className="mt-2 text-ink/85">{f.line}</p>
              <p className="mt-3 text-[14px] text-ink/55">Illustrative photograph.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function City() {
  return (
    <section aria-label="New Providence from the air" className="relative">
      <img src={COMMONS_NASSAU.src} alt="Aerial view over Nassau, its rooftops and the harbour" data-source="commons" width={2000} height={1338} loading="lazy" className="h-[70svh] w-full object-cover md:h-[86svh]" />
      <div className="mx-auto max-w-[1360px] px-4 pb-4 pt-6 sm:px-8">
        <p className="poster max-w-[18ch] text-[clamp(34px,4.6vw,72px)]">Residential, commercial and industrial roofs, across New Providence and the surrounding islands.</p>
        <p className="mt-4 text-[14px] text-ink/60">{COMMONS_NASSAU.credit}</p>
      </div>
    </section>
  )
}

const JOBS: { src: string; alt: string; cls: string; cap?: string }[] = [
  { src: OWN.membrane, alt: "Thermoset crew installing a waterproof membrane on a flat commercial roof", cls: "col-span-2 row-span-3 md:col-span-3", cap: "Membrane going down on a flat commercial roof." },
  { src: OWN.scaffold, alt: "Thermoset workers on scaffolding at the roof of a house", cls: "col-span-1 row-span-2", cap: "On the scaffold, roof of a house." },
  { src: OWN.hero, alt: "Thermoset job photograph", cls: "col-span-1" },
  { src: OWN.june, alt: "Thermoset job photograph, June 2025", cls: "col-span-1" },
  { src: OWN.waterproof, alt: "Thermoset waterproofing job photograph", cls: "col-span-1" },
  { src: OWN.maint, alt: "Thermoset maintenance job photograph", cls: "col-span-1" },
  { src: OWN.s4897, alt: "Thermoset job photograph", cls: "col-span-2" },
  { src: OWN.s4903, alt: "Thermoset job photograph", cls: "col-span-1" },
  { src: OWN.s4904, alt: "Thermoset job photograph", cls: "col-span-1" },
  { src: OWN.s4895, alt: "Thermoset job photograph", cls: "col-span-1 row-span-2" },
  { src: OWN.s4710, alt: "Thermoset job photograph", cls: "col-span-1" },
  { src: OWN.general, alt: "Thermoset general construction job photograph", cls: "col-span-2" },
]

function JobFile() {
  return (
    <section id="photos" aria-labelledby="photos-title" className="scroll-mt-4 bg-membrane text-paperink">
      <div className="mx-auto max-w-[1360px] px-4 py-20 sm:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="photos-title" className="poster max-w-[14ch] text-[clamp(44px,6vw,96px)]">Straight from the job file.</h2>
          <p className="max-w-sm text-[17px]">Photographs Thermoset took on its own roofs. No resort brochures, no stock.</p>
        </div>
        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[200px] md:grid-cols-4 md:gap-3">
          {JOBS.map((j, i) => (
            <figure key={i} className={`group relative overflow-hidden rounded-[10px] bg-[#DCE5E4] ${j.cls}`}>
              <img src={j.src} alt={j.alt} data-source="own" width={800} height={600} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]" />
              {j.cap && <figcaption className="slab absolute bottom-0 left-0 bg-membrane px-3 py-2 text-[15px] font-semibold text-paperink">{j.cap}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

const SPEC = [
  ["TPO and PVC single-ply", "Flat roofs, commercial and residential", "Thermoplastic membranes, heat-welded seams"],
  ["Modified bitumen", "Flat roofs that need layered protection", "Multi-layer, torch-applied, for waterproofing and UV resistance"],
  ["Standing seam metal", "Pitched roofs", "Aluminium or steel panels, concealed fasteners, Kynar finishes"],
  ["Shingle", "Pitched residential and commercial roofs", "Architectural, synthetic and 3-tab"],
  ["Terrace and balcony", "Under tile or concrete toppings", "Liquid-applied membranes"],
  ["Edge metal", "Every perimeter", "ANSI/SPRI ES-1 compliant, Kynar aluminium or galvanised steel"],
  ["Re-roofing", "Aged or failing systems", "Full tear-off and reinstallation"],
]

function Spec() {
  return (
    <section aria-labelledby="spec-title" className="bg-membrane text-paperink">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-4 py-20 sm:px-8 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <h2 id="spec-title" className="poster text-[clamp(44px,5.4vw,88px)]">The specification.</h2>
          <p className="mt-5 text-[17px]">Factory-certified installers of</p>
          <p className="slab mt-1 text-[26px] font-semibold leading-tight">{MAKERS.join(", ")}.</p>
          <img src={GEN + "layers.jpg"} alt="Cut edge of a flat roof showing deck, insulation boards, cover board and membrane" data-source="generated" width={900} height={600} loading="lazy" className="mt-8 aspect-[3/2] w-full rounded-[12px] object-cover" />
          <p className="mt-2 text-[14px] opacity-60">Illustrative photograph.</p>
        </div>
        <div className="md:col-span-8">
          <table className="w-full border-collapse text-left text-[16px]">
            <caption className="sr-only">Roofing systems Thermoset installs</caption>
            <thead>
              <tr className="border-b-2 border-paperink">
                <th scope="col" className="slab py-3 pr-4 font-semibold">System</th>
                <th scope="col" className="slab hidden py-3 pr-4 font-semibold sm:table-cell">Where it goes</th>
                <th scope="col" className="slab py-3 font-semibold">What it is</th>
              </tr>
            </thead>
            <tbody>
              {SPEC.map(r => (
                <tr key={r[0]} className="border-b border-paperink/20 align-top transition-colors hover:bg-[#E4ECEB]">
                  <th scope="row" className="slab py-4 pr-4 text-[20px] font-semibold">{r[0]}</th>
                  <td className="hidden py-4 pr-4 sm:table-cell">{r[1]}</td>
                  <td className="py-4">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="services.html" className="slab mt-8 inline-flex min-h-11 items-center border-b-2 border-paperink text-[20px] font-semibold">See every service, from curbs to carpentry</a>
        </div>
      </div>
    </section>
  )
}

function Radar() {
  return (
    <section id="radar" aria-labelledby="radar-title" className="scroll-mt-4">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-4 py-20 sm:px-8 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <img src={GEN + "after-rain.jpg"} alt="A wet white membrane roof draining to a metal roof drain after rain" data-source="generated" width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full rounded-[16px] object-cover" />
          <p className="mt-2 text-[14px] text-ink/55">Illustrative photograph.</p>
        </div>
        <div className="md:col-span-7">
          <p className="label">Roof Assessment, Diagnostics and Response</p>
          <h2 id="radar-title" className="poster mt-2 text-[clamp(56px,8vw,140px)]">R.A.D.A.R.</h2>
          <p className="mt-5 max-w-xl text-[19px] text-ink/90">A maintenance program for roofs Thermoset looks after year round, with plans for commercial complexes, industrial facilities and luxury residential estates. It starts with a free roof health assessment.</p>
          <dl className="mt-10 border-t rule">
            {RADAR.map(([t, d]) => (
              <div key={t} className="grid gap-1 border-b rule py-4 sm:grid-cols-[260px_1fr] sm:gap-6">
                <dt className="slab text-[20px] font-semibold text-sun">{t}</dt>
                <dd className="text-ink/85">{d}</dd>
              </div>
            ))}
          </dl>
          <a href="#estimate" data-job="R.A.D.A.R. maintenance plan" className="slab mt-8 inline-flex min-h-11 items-center border-b-2 border-sun text-[20px] font-semibold">Ask for a free roof health assessment</a>
        </div>
      </div>
    </section>
  )
}

function Clients() {
  return (
    <section id="clients" aria-labelledby="clients-title" className="scroll-mt-4 bg-membrane text-paperink">
      <div className="mx-auto max-w-[1360px] px-4 py-20 sm:px-8 md:py-28">
        <h2 id="clients-title" className="poster max-w-[16ch] text-[clamp(44px,6vw,104px)]">Roofs Thermoset has worked on.</h2>
        <p className="mt-5 max-w-xl text-[17px]">From Thermoset's own client portfolio. Ask about any of them.</p>
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(CLIENTS).map(([k, v]) => (
            <div key={k}>
              <h3 className="slab border-b-2 border-paperink pb-2 text-[22px] font-bold">{k}</h3>
              <ul className="mt-3 space-y-1.5 text-[16px]">
                {v.map(n => <li key={n} className="border-b border-paperink/15 pb-1.5">{n}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PROPERTY = ["Home", "Commercial building", "Resort or hotel", "Church", "Industrial facility"]
const JOB = ["Leak or storm damage", "New roof or re-roof", "Terrace or balcony waterproofing", "R.A.D.A.R. maintenance plan", "Edge metal, curbs or gutters", "General construction"]

function WorkOrder() {
  const [prop, setProp] = useState(PROPERTY[1])
  const [job, setJob] = useState(JOB[0])
  const [place, setPlace] = useState("New Providence")
  const [name, setName] = useState("")
  useEffect(() => {
    const onClick = (e: MouseEvent) => { const a = (e.target as HTMLElement).closest("[data-job]") as HTMLElement | null; if (a?.dataset.job) setJob(a.dataset.job) }
    document.addEventListener("click", onClick); return () => document.removeEventListener("click", onClick)
  }, [])
  return (
    <section id="estimate" aria-labelledby="estimate-title" className="scroll-mt-4 border-t rule">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-4 py-20 sm:px-8 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <h2 id="estimate-title" className="poster text-[clamp(48px,6.4vw,112px)]">All estimates are free.</h2>
          <p className="mt-5 text-ink/85">Fill in the work order. It opens an email to Croix Culmer, General Manager, with everything written out. Prefer to talk? Call the office.</p>
          <a href={`tel:${TEL_OFFICE}`} className="slab mt-6 inline-flex min-h-11 items-center text-[30px] font-bold text-sun">{PHONE_OFFICE}</a>
        </div>
        <form
          className="enquiry relative md:col-span-8 rounded-[6px] bg-membrane p-5 text-paperink shadow-[0_30px_60px_-24px_rgba(0,0,0,.6)] sm:p-9"
          data-enquiry data-business="Thermoset Roofing Bahamas Ltd." data-whatsapp="" data-email={EMAIL_GM}
          action={`mailto:${EMAIL_GM}`} method="post" encType="text/plain"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-dashed border-paperink/40 pb-4">
            <p className="slab text-[28px] font-bold">Work order: free estimate</p>
            <p className="text-[14px]">Thermoset Roofing Bahamas Ltd., 7 Portago Road, Oakesfield</p>
          </div>

          <fieldset className="mt-6">
            <legend className="slab text-[15px] font-semibold">Property</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROPERTY.map(p => <button key={p} type="button" className="chip" aria-pressed={p === prop} onClick={() => setProp(p)}>{p}</button>)}
            </div>
            <input type="hidden" name="Property" value={prop} />
          </fieldset>
          <fieldset className="mt-6">
            <legend className="slab text-[15px] font-semibold">Job</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {JOB.map(p => <button key={p} type="button" className="chip" aria-pressed={p === job} onClick={() => setJob(p)}>{p}</button>)}
            </div>
            <input type="hidden" name="Job" value={job} />
          </fieldset>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="wo-field"><span>Your name</span><input className="wo-input" name="Name" required autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></label>
            <label className="wo-field"><span>Phone</span><input className="wo-input" name="Phone" type="tel" autoComplete="tel" /></label>
            <label className="wo-field"><span>Island and area</span><input className="wo-input" name="Location" value={place} onChange={e => setPlace(e.target.value)} /></label>
            <label className="wo-field"><span>Email</span><input className="wo-input" name="Email" type="email" autoComplete="email" /></label>
          </div>
          <label className="wo-field mt-5"><span>What you are seeing</span><textarea className="wo-input" name="Message" rows={3} placeholder="Where it leaks, roof age, anything you know" /></label>

          <div className="mt-7 rounded-[4px] bg-[#E4ECEB] p-4 text-[15px]" aria-live="polite">
            <p className="slab font-semibold">Reads as</p>
            <p className="mt-1">{name || "A customer"} asks for a free estimate: <strong>{job.toLowerCase()}</strong> on a <strong>{prop.toLowerCase()}</strong>, {place || "location to follow"}.</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" className="slab min-h-12 rounded-[6px] bg-paperink px-6 text-[20px] font-bold text-membrane transition-transform active:scale-[.98]">Request a free estimate</button>
            <p className="enquiry__note text-[14px]">Opens your email app with the work order filled in.</p>
          </div>
        </form>
      </div>
    </section>
  )
}

function Home() {
  return (
    <Page page="home" dock={DOCK}>
      <Stage />
      <FinishPicker />
      <JobFile />
      <City />
      <Spec />
      <Radar />
      <Clients />
      <WorkOrder />
      <section aria-label="Map" className="border-t rule">
        <iframe title="Map: 7 Portago Road, Oakesfield, Nassau" loading="lazy" className="h-[340px] w-full grayscale-[.3]" src="https://www.google.com/maps?q=7%20Portago%20Road%2C%20Oakesfield%2C%20Nassau%2C%20Bahamas&output=embed" />
      </section>
    </Page>
  )
}

mount(<Home />)
