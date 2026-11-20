import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './styles.css'
import Anatomy from './Anatomy'
import { Clients, Work, Services, Radar, Estimate, Footer, Dock } from './Sections'

function Home() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.11, anchors: true }); let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }; id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return (
    <>
      <a className="skip" href="#clients">Skip to content</a>
      <main id="main"><Anatomy /><Clients /><Work /><Services /><Radar /><Estimate /></main>
      <Footer /><Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
