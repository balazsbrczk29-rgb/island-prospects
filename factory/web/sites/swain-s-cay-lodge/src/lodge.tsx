import { createRoot } from 'react-dom/client'
import './styles.css'
import { IMG } from './data'
import { PageHead, Band, Header, Planner, Waters, Season, Lodge, NonAngler, Reviews, GettingHere, Contact, PhoneBar, usePlan } from './site'

function Page() {
  const plan = usePlan()
  void Planner; void IMG; void PageHead; void Band; void Waters; void Season; void Lodge; void NonAngler; void Reviews; void GettingHere
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header current="The lodge" />
      <main id="main">
        <PageHead h1="The lodge on the beach at Mangrove Cay." lede="Twelve units, up to 26 guests, Reefside Restaurant and Bar on the sand, and free bicycles, kayaks and snorkelling gear." pic={IMG.welcome} />
        <Lodge />
        <NonAngler />
        <GettingHere />
        <Reviews />
      </main>
      <Contact plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Page />)
