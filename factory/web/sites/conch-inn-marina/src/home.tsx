import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header } from './header'
import { Desk } from './desk'
import { Includes, RoomsPicker, Snappas, Town, History, Office, Footer, Dock } from './sections'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Desk />
        <Includes />
        <RoomsPicker />
        <Snappas />
        <Town />
        <History />
        <Office />
      </main>
      <Footer />
      <Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
