import { createRoot } from 'react-dom/client'
import './styles.css'
import Hero from './Hero'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main"><Hero /></main>
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
