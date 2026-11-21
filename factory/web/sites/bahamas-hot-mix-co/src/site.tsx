import { useEffect, type ReactNode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import Lenis from "lenis"
import "./styles.css"
import { PHONE, TEL, EMAIL, OFFICES, LEGAL } from "./data"

export const ease = [0.22, 1, 0.36, 1] as const

export function Wordmark() {
  // Typeset wordmark (their logo file is a raster on their own server); full name for those who search it.
  return (
    <a href="index.html" className="flex items-baseline gap-3 min-h-[44px] items-center" aria-label="BHM, Bahamas Hot Mix, home">
      <span className="font-[family-name:var(--font-display)] text-[1.6rem] font-[650] tracking-[-0.06em] leading-none">BHM</span>
      <span className="hidden sm:inline text-xs text-[var(--color-muted)] leading-tight">Bahamas Hot Mix</span>
    </a>
  )
}

const NAV = [
  { href: "index.html#runways", label: "Runways" },
  { href: "index.html#materials", label: "Materials" },
  { href: "projects.html", label: "Projects" },
  { href: "index.html#offices", label: "Offices" },
]

export function Masthead({ current }: { current?: string }) {
  return (
    <header className="relative z-20 bg-[var(--color-salt)]">
      <a href="#main" className="skip">Skip to content</a>
      <div className="wrap flex h-[var(--mast)] items-center justify-between gap-6">
        <Wordmark />
        <nav aria-label="Main" className="hidden md:flex items-center gap-8 text-sm">
          {NAV.map(n => (
            <a key={n.href} href={n.href} aria-current={current === n.label ? "page" : undefined}
              className={`min-h-[44px] inline-flex items-center hover:text-[var(--color-petrol)] transition-colors ${current === n.label ? "underline underline-offset-[6px]" : ""}`}>{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a href={`tel:${TEL}`} className="mono hidden lg:inline-flex min-h-[44px] items-center text-sm">{PHONE}</a>
          <a href="index.html#quote" className="btn !min-h-[40px] !px-4 text-[0.9375rem]">Request a quote</a>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink-deep)] text-[#C9CCCF]">
      <div className="wrap py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-[family-name:var(--font-display)] text-xl text-white tracking-[-0.03em] leading-[1.05] max-w-[18ch]">Roads, runways, ports and water, on every island we can reach.</p>
          <p className="mt-6 text-sm">BHM is hiring graduate civil engineers and equipment operators. <a className="link text-white" href="https://bhmgroup.com/about/careers/">Careers</a></p>
        </div>
        <div className="md:col-span-4 md:col-start-7 text-sm space-y-1">
          <p className="text-white">{LEGAL}</p>
          {OFFICES.map(o => <p key={o.town}>{o.town}, {o.island}</p>)}
          <p className="pt-3"><a className="mono link text-white" href={`tel:${TEL}`}>{PHONE}</a></p>
          <p><a className="mono link text-white" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
        <div className="md:col-span-2 text-sm flex flex-col">
          <a className="link" href="https://www.linkedin.com/company/bhm-co-ltd">LinkedIn</a>
          <a className="link" href="https://www.youtube.com/@BHM-Infrastructure">YouTube</a>
          <a className="link" href="https://www.facebook.com/BHMGroupLtd/">Facebook</a>
          <a className="link" href="https://twitter.com/BHMBahamas">X</a>
        </div>
      </div>
      <div className="wrap pb-24 md:pb-10 text-xs text-[#8E9398] md:text-right">
        Photography: BHM Co. Ltd. Concept preview by ESTATIQ AI Solutions, not the official BHM website.
      </div>
    </footer>
  )
}

function useLenis() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

function Shell({ children }: { children: ReactNode }) { useLenis(); return <>{children}</> }

export function mount(node: ReactNode) {
  const el = document.getElementById("root")!
  const app = <Shell>{node}</Shell>
  if (el.hasChildNodes()) { el.innerHTML = ""; createRoot(el).render(app) } else createRoot(el).render(app)
  void hydrateRoot
}
