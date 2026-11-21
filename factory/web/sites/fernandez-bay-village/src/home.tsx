import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Film } from './film'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Film />
      <main id="main" />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
