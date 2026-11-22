import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Opening, Rooms, Beach, Days, Timetable, Close, Strip, usePlan } from './site'

function Home() {
  const plan = usePlan()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Opening plan={plan} />
        <Rooms plan={plan} />
        <Beach />
        <Days />
        <Timetable />
      </main>
      <Close plan={plan} />
      <Strip />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
