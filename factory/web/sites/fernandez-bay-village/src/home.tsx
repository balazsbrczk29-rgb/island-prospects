import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Film } from './film'
import { Planner, GettingHere, Credits, Footer, Dock } from './sections'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Film />
      <main id="main">
        <Planner />
        <GettingHere />
        <Credits />
      </main>
      <Footer />
      <Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
