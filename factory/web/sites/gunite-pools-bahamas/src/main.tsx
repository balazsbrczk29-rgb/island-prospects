import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { App } from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

if (!matchMedia('(pointer: coarse)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.12, smoothWheel: true })
  const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
}
