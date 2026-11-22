import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Planner, Places, Close, PhoneBar, usePlan } from './site'

function Stay() {
  const plan = usePlan()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header current="Places to stay" />
      <main id="main">
        <Planner plan={plan} />
        <Places plan={plan} />
      </main>
      <Close plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Stay />)
