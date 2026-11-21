import { createRoot } from 'react-dom/client'
import './styles.css'
import { Masthead, Lead, Opening, Rooms, Essay, BeachHouse, Colophon, Strip } from './site'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Masthead />
      <main id="main"><Lead /><Opening /><Rooms /><Essay /><BeachHouse /></main>
      <Colophon />
      <Strip />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
