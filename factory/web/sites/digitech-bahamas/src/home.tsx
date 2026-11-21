import { createRoot } from 'react-dom/client'
import './styles.css'
import XrayStage from './XrayStage'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main">
        <XrayStage />
      </main>
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
