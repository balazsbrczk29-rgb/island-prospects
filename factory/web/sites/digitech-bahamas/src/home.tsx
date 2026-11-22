import { createRoot } from 'react-dom/client'
import './styles.css'
import Composer from './Composer'
import { Parts, Night, Clients, Contact, Dock } from './site'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main">
        <Composer />
        <Parts />
        <Night />
        <Clients />
      </main>
      <Contact />
      <Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
