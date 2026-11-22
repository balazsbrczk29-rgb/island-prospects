import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Register, Descent, Ledger, Dining, GettingHere, Contact, PhoneBar, usePlan } from './site'

function Home() {
  const plan = usePlan()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Register plan={plan} />
        <Descent />
        <Ledger plan={plan} />
        <Dining />
        <GettingHere />
      </main>
      <Contact plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
