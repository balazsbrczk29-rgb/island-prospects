import { useEffect } from 'react'
import Lenis from 'lenis'
/** Lenis smooths the mouse wheel only; touch scrolling stays native. */
export function useSmooth() {
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true })
    ;(window as any).__lenis = lenis
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
}
/** Scroll to an absolute y, through Lenis when it runs. */
export function scrollToY(y: number) {
  const l = (window as any).__lenis
  if (l) l.scrollTo(y, { duration: 1.4 }); else window.scrollTo({ top: y, behavior: 'smooth' })
}
