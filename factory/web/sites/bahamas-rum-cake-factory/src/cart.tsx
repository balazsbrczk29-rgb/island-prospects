import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { STORE, ETSY, money } from './data'

export type Line = { id: number; name: string; size: string; price: number; img: string; qty: number; note?: string }
type Cart = { lines: Line[]; add: (l: Omit<Line, 'qty'>) => void; remove: (id: number, note?: string) => void; count: number; total: number; open: boolean; setOpen: (b: boolean) => void; bump: number }
const Ctx = createContext<Cart | null>(null)
export const useCart = () => useContext(Ctx)!

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => { try { return JSON.parse(sessionStorage.getItem('brcf-bag') || '[]') } catch { return [] } })
  const [open, setOpen] = useState(false)
  const [bump, setBump] = useState(0)
  useEffect(() => { try { sessionStorage.setItem('brcf-bag', JSON.stringify(lines)) } catch { /* private mode */ } }, [lines])
  const add = (l: Omit<Line, 'qty'>) => {
    setLines(c => c.some(x => x.id === l.id && x.note === l.note) ? c.map(x => x.id === l.id && x.note === l.note ? { ...x, qty: x.qty + 1 } : x) : [...c, { ...l, qty: 1 }])
    setBump(b => b + 1)
  }
  const remove = (id: number, note?: string) => setLines(c => c.filter(x => !(x.id === id && x.note === note)))
  const count = lines.reduce((s, l) => s + l.qty, 0)
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0)
  return <Ctx.Provider value={{ lines, add, remove, count, total, open, setOpen, bump }}>{children}<Drawer /></Ctx.Provider>
}

function checkoutUrl(lines: Line[]) {
  if (!lines.length) return STORE
  const items = lines.map(l => `${l.id}:${l.qty}`).join(',')
  const notes = lines.filter(l => l.note).map(l => l.note).join(' | ')
  return `${STORE}/cart/${items}${notes ? `?note=${encodeURIComponent(notes)}` : ''}`
}

function Drawer() {
  const { lines, remove, total, open, setOpen } = useCart()
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k)
  }, [open])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside className="drawer" role="dialog" aria-modal="true" aria-label="Your bag"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 36 }}>
            <header><h2>Your bag</h2><button type="button" className="icon" onClick={() => setOpen(false)} aria-label="Close bag"><X size={22} strokeWidth={1.5} /></button></header>
            {lines.length === 0 ? <p className="empty">Nothing in the bag yet. Pick a flavour.</p> : (
              <ul>
                {lines.map(l => (
                  <li key={l.id + (l.note || '')}>
                    <img src={l.img} alt="" width={72} height={72} />
                    <div><b>{l.name}</b><span>{l.size}{l.note ? ` · ${l.note.replace('Six pack flavours: ', '')}` : ''}</span></div>
                    <span className="tnum">{l.qty} &times; {money(l.price)}</span>
                    <button type="button" className="link-btn" onClick={() => remove(l.id, l.note)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <footer>
              <p className="sum"><span>Subtotal</span><b className="tnum">{money(total)}</b></p>
              <div className="meter" aria-live="polite">
                <div className="meter__bar"><motion.i initial={false} animate={{ scaleX: Math.min(1, total / 55) }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} /></div>
                <p className="tnum">{total >= 55 ? 'Free ground shipping unlocked (US orders)' : `${money(55 - total)} to free ground shipping`}</p>
              </div>
              <p className="fine">USPS, UPS or FedEx: Ground, Priority or Express, priced at checkout on the factory's own store. Outside the US and Canada? <a href={ETSY}>Order on Etsy</a>.</p>
              <a className="btn btn-ink wide" href={checkoutUrl(lines)} aria-disabled={!lines.length}>Checkout on thebahamasrumcakefactory.com</a>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function BagButton({ className = '' }: { className?: string }) {
  const { count, setOpen, bump } = useCart()
  return (
    <button type="button" className={'bag ' + className} onClick={() => setOpen(true)} aria-label={`Bag, ${count} items`}>
      Bag <motion.span key={bump} className="tnum bag__n" initial={{ scale: bump ? 1.5 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }}>{count}</motion.span>
    </button>
  )
}
