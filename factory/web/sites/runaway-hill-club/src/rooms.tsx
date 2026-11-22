import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Register, Ledger, Contact, PhoneBar, usePlan } from './site'

function Rooms() {
  const plan = usePlan()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header current="Rooms" />
      <main id="main">
        <Register plan={plan} h1="The rooms at Runaway Hill." />
        <Ledger plan={plan} />
      </main>
      <Contact plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Rooms />)
