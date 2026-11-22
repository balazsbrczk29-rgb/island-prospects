import { createRoot } from 'react-dom/client'
import './styles.css'
import { IMG } from './data'
import { Spear, Gallery, Faq, PageHead, Band, Header, Planner, Waters, Season, Lodge, NonAngler, Reviews, GettingHere, Contact, PhoneBar, usePlan } from './site'

function Page() {
  const plan = usePlan()
  void Planner; void IMG; void PageHead; void Band; void Waters; void Season; void Lodge; void NonAngler; void Reviews; void GettingHere
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header current="Fishing" />
      <main id="main">
        <PageHead h1="Bonefishing Andros from Mangrove Cay." lede="The home flat off the beach, the Middle and South Bights either side of the cay, the barrier reef and the deep water beyond, with handpicked local guides." pic={IMG.fishing} />
        <Planner plan={plan} h1={false} />
        <Waters plan={plan} />
        <Spear />
        <Gallery />
        <Season />
        <Faq />
        <Reviews />
      </main>
      <Contact plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Page />)
