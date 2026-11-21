import { createRoot } from 'react-dom/client'
import './styles.css'
import { CartProvider } from './cart'
import { Hero, SixPack, Story, Visit, More, Foot, Dock } from './sections'

function Home() {
  return (
    <CartProvider>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main"><Hero /><SixPack /><Story /><Visit /><More /></main>
      <Foot />
      <Dock />
    </CartProvider>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
