import { createRoot } from 'react-dom/client'
import './styles.css'
import { CartProvider } from './cart'
import { Hero, SixPack, Travel, Story, Visit, More, Faq, Foot, Dock } from './sections'

function Home() {
  return (
    <CartProvider>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main"><Hero /><SixPack /><Travel /><Story /><Visit /><More /><Faq /></main>
      <Foot />
      <Dock />
    </CartProvider>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
