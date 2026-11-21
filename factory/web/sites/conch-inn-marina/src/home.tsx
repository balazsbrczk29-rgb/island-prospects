import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Letter } from './letter'

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Letter />
      <main id="main" />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
