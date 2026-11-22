import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './styles.css'
import Anatomy from './Anatomy'
import Top, { TopBar } from './Top'
import { Clients, Work, Services, Radar, Certified, Contact, Footer, Dock } from './Sections'

function Home() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.11, anchors: true }); let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }; id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <TopBar />
      <main id="main"><Top /><Clients /><Anatomy /><Work /><Services /><Radar /><Certified /><Contact /></main>
      <Footer /><Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
