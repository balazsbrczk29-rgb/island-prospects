import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Contact, Footer, Bar } from './ui'
import { Hero, Fuel, Yard, Harbour, Store } from './sections'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header page="home" />
      <main id="main">
        <Hero />
        <Fuel />
        <Yard />
        <Harbour />
        <Store />
        <Contact />
      </main>
      <Footer />
      <Bar />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
