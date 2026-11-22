import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { PlanProvider, Hero } from './tool'
import { DayFilm } from './film'
import { TopBar, StaysTable, GettingHere, Clubhouse, Groups, Close, Footer, Dock } from './sections'

function Home() {
  return (
    <PlanProvider>
      <a className="skip" href="#main">Skip to content</a>
      <TopBar />
      <main id="main">
        <Hero />
        <StaysTable />
        <DayFilm />
        <GettingHere />
        <Clubhouse />
        <Groups />
        <Close />
      </main>
      <Footer />
      <Dock />
    </PlanProvider>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
