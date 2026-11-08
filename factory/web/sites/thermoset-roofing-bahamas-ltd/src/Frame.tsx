import { StrictMode, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import { motion } from "motion/react"
import { Phone } from "lucide-react"
import { PHONE_OFFICE, TEL_OFFICE, COMMONS_NASSAU } from "./data"
import "./styles.css"

type DockItem = { href: string; label: string }

function Toolbar({ page }: { page: "home" | "services" }) {
  return (
    <header className="relative z-20 border-b rule">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <a href="index.html" className="slab text-[19px] font-bold leading-none sm:text-[22px]" aria-label="Thermoset Roofing Bahamas, home">
          Thermoset <span className="font-semibold text-aqua">Roofing Bahamas</span>
        </a>
        <nav aria-label="Pages" className="hidden items-center gap-6 text-[16px] md:flex">
          <a href="index.html" aria-current={page === "home" ? "page" : undefined} className="py-2 hover:text-aqua aria-[current=page]:text-sun">The roof</a>
          <a href="services.html" aria-current={page === "services" ? "page" : undefined} className="py-2 hover:text-aqua aria-[current=page]:text-sun">Every service</a>
          <a href={`tel:${TEL_OFFICE}`} className="flex items-center gap-2 py-2 font-medium"><Phone size={16} aria-hidden /> {PHONE_OFFICE}</a>
        </nav>
        <a href={`tel:${TEL_OFFICE}`} className="flex min-h-11 items-center gap-2 text-[16px] font-medium md:hidden"><Phone size={16} aria-hidden /> Call office</a>
      </div>
    </header>
  )
}

function Dock({ items }: { items: DockItem[] }) {
  return (
    <motion.nav
      aria-label="Sections"
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 28 }}
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex max-w-full items-center gap-1 rounded-[18px] border border-[rgba(243,247,246,.18)] bg-deep/95 p-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,.55)]">
        <ul className="flex items-center overflow-x-auto">
          {items.map(it => (
            <li key={it.href} className="shrink-0">
              <a href={it.href} className="flex min-h-11 items-center rounded-[12px] px-3 text-[15px] text-ink/85 transition-colors hover:bg-ground hover:text-ink sm:px-4">{it.label}</a>
            </li>
          ))}
        </ul>
        <a href="index.html#estimate" className="slab flex min-h-11 shrink-0 items-center rounded-[12px] bg-sun px-4 text-[16px] font-bold text-paperink transition-transform active:scale-[.97]">
          Free estimate
        </a>
      </div>
    </motion.nav>
  )
}

function Footer() {
  return (
    <footer className="border-t rule bg-deep pb-32">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-4 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="poster text-[44px] sm:text-[64px]">Thermoset Roofing Bahamas Ltd.</p>
          <p className="mt-4 max-w-md text-ink/80">7 Portago Road, Oakesfield, Nassau, The Bahamas. P.O. Box SP-63997.</p>
        </div>
        <div className="space-y-5 text-[16px]">
          <div>
            <p className="label">Stuart Culmer, Owner and President</p>
            <p><a className="underline-offset-4 hover:underline" href="tel:+12424224923">(242) 422-4923</a></p>
            <p><a className="break-all underline-offset-4 hover:underline" href="mailto:stuart.culmer@thermosetroofing242.com">stuart.culmer@thermosetroofing242.com</a></p>
          </div>
          <div>
            <p className="label">Croix Culmer, General Manager</p>
            <p><a className="underline-offset-4 hover:underline" href="tel:+12425257326">(242) 525-7326</a> mobile, <a className="underline-offset-4 hover:underline" href={`tel:${TEL_OFFICE}`}>{PHONE_OFFICE}</a> office</p>
            <p><a className="break-all underline-offset-4 hover:underline" href="mailto:croix.culmer@thermosetroofing242.com">croix.culmer@thermosetroofing242.com</a></p>
          </div>
        </div>
        <div className="space-y-2 text-[16px]">
          <p className="label">Follow the crew</p>
          <p><a className="hover:text-aqua" href="https://www.facebook.com/thermosetroofing242">Facebook</a></p>
          <p><a className="hover:text-aqua" href="https://www.instagram.com/thermosetroofing242">Instagram</a></p>
          <p><a className="hover:text-aqua" href="https://www.tiktok.com/@thermosetroofing242">TikTok</a></p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1360px] flex-col gap-2 border-t rule px-4 pt-6 text-[14px] text-ink/65 sm:px-8 md:flex-row md:justify-between">
        <p>© 2026 Thermoset Roofing Bahamas Ltd. Concept by ESTATIQ AI Solutions.</p>
        <p>Photography: Thermoset job photographs; aerial of Nassau, <a className="underline" href={COMMONS_NASSAU.page}>{COMMONS_NASSAU.credit.replace("Photo: ", "")}</a>; illustrative photographs generated for this concept, to be replaced with project photos.</p>
      </div>
    </footer>
  )
}

export function Page({ page, dock, children }: { page: "home" | "services"; dock: DockItem[]; children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Toolbar page={page} />
      <main id="main">{children}</main>
      <Footer />
      <Dock items={dock} />
    </>
  )
}

export function mount(node: ReactNode) {
  const el = document.getElementById("root")!
  createRoot(el).render(<StrictMode>{node}</StrictMode>)
}
