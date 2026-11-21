import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Hero } from './hero'
import { Pair, VillaCheck, Grill, Water, Arrive, Night, Footer } from './sections'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Hero />
      <main id="main"><Pair /><VillaCheck /><Grill /><Water /><Arrive /><Night /></main>
      <Footer />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
