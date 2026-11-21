import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Letter } from './letter'
import { Harbour, Rates, Ashore, RoomsPicker, Office, Footer, Dock } from './sections'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Letter />
      <main id="main">
        <Harbour />
        <Rates />
        <Ashore />
        <RoomsPicker />
        <Office />
      </main>
      <Footer />
      <Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
