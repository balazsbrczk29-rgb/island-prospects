import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Hero } from './hero'
import { useSmooth } from './smooth'

function Home() {
  useSmooth()
  const pick = (side: 'ocean' | 'hill') => { document.getElementById(side === 'ocean' ? 'rooms-ocean' : 'rooms-hill')?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Hero onPick={pick} />
      <main id="main" />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
