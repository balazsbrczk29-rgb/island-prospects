import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Hero } from './hero'
import { Villas, Resort, Grill, Arrive, Groups, Night, Footer } from './sections'

function Home() {
  return (
    <>
      <a className="skip" href="#price">Skip to the villa price check</a>
      <Hero />
      <main id="main"><Villas /><Resort /><Grill /><Arrive /><Groups /><Night /></main>
      <Footer />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
