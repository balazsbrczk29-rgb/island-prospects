import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Hero } from './hero'
import { Rooms } from './rooms'
import { Harbour, Offers, Splash, Around, GettingHere, Contact, Footer, Persistent } from './sections'
import { useSmooth } from './smooth'

function Home() {
  useSmooth()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Hero />
      <main id="main">
        <Rooms />
        <Harbour />
        <Offers />
        <Splash />
        <Around />
        <GettingHere />
        <Contact />
      </main>
      <Footer />
      <Persistent />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
