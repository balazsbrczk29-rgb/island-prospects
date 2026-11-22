import { createRoot } from 'react-dom/client'
import './styles.css'
import { Band, Header, Planner, Waters, Season, Lodge, NonAngler, Reviews, GettingHere, Contact, PhoneBar, usePlan } from './site'

function Page() {
  const plan = usePlan()
  void Planner; void Band; void Waters; void Season; void Lodge; void NonAngler; void Reviews; void GettingHere
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Planner plan={plan} />
        <Waters plan={plan} />
        <Band />
        <Season />
        <Lodge />
        <NonAngler />
        <Reviews />
        <GettingHere />
      </main>
      <Contact plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Page />)
