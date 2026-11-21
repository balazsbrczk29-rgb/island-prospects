import { createRoot } from 'react-dom/client'
import './styles.css'
import XrayStage from './XrayStage'
import { Parts, Night, WorkOrder, Contact, Dock } from './site'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main">
        <XrayStage />
        <Parts />
        <Night />
        <WorkOrder />
      </main>
      <Contact />
      <Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
