import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Hero } from './hero'

function Home() {
  return (<><a className="skip" href="#main">Skip to content</a><Hero /><main id="main" /></>)
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
