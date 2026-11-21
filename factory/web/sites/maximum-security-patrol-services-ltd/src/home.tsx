import { createRoot } from 'react-dom/client'
import './styles.css'
import Film from './Film'
import { Top, Origin, Proposal, Credits, CallPill } from './site'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Top />
      <main id="main"><span id="top" /><Film /><Origin /><Proposal /></main>
      <Credits />
      <CallPill />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
