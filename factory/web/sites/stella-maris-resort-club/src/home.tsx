import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Planner, Shores, Places, Water, Getting, Close, PhoneBar, usePlan } from './site'

function Home() {
  const plan = usePlan()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Planner plan={plan} />
        <Shores />
        <Places plan={plan} />
        <Water plan={plan} />
        <Getting plan={plan} />
      </main>
      <Close plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
