import { createRoot } from 'react-dom/client'
import './styles.css'
import Hero from './hero'
import { Contact, Corner, Footer } from './ui'
import Sections from './sections'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main" className="home">
        <Hero />
        <Sections />
        <Contact />
      </main>
      <Footer />
      <Corner />
    </>
  )
}
const el = document.getElementById('root')!
createRoot(el).render(<Home />)
