import { useEffect, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import "./styles.css"

export const WA = "12428245755"
export const WA_LABEL = "+1 242 824 5755"
export const EMAIL = "abacoboatrental@gmail.com"
export const BOOK = "https://www.abacoboatrental.com/reservations"
export const SALTED_LIME = "https://www.saltedlimebar.com/"
export const IMG = "https://images.squarespace-cdn.com/content/v1/6a42c8b390db18539a8801a5/"
export const PHOTO = {
  boat: `${IMG}b401ff69-86a6-489f-8c4c-714b9b292c18/Abaco-Boat-Rental-17.jpg`,
  turtle: `${IMG}c0d4c408-6d5e-4e99-acf9-957f8e218cae/Abaco-Boat-Rental-5.jpg`,
  dock: `${IMG}d528242a-93ae-4ef9-abe7-5e95516dcac0/Abaco-Boat-Rental-15.jpg`,
  conch: `${IMG}6df890b0-9e6c-471c-b4ab-88b77621febc/Abaco-Boat-Rental-19.jpg`,
  pig: `${IMG}a4cdf487-4f63-48dd-a065-5b9aad70790c/Abaco-Boat-Rental-8.jpg`,
  fish: `${IMG}4e83e744-5cdd-4f27-a93c-4e5a79f8737e/Abaco-Boat-Rental-7.jpg`,
  beach: `${IMG}ff935fdc-b7e5-4224-90a9-425dc457ec18/Abaco-Boat-Rental-1.jpg`,
}
export const wa = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`
export const ease = [0.16, 1, 0.3, 1] as const

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(node)
}
