// RECIPE: the shop layer for businesses that really sell online (audit site_kind webshop / catalogue).
// A concept must never downgrade a real shop into a brochure. This gives a filterable catalogue, product detail,
// a cart drawer and a checkout PREVIEW (no payment: the final button hands off to their real store, or sends the
// order as a WhatsApp/email message). Products come only from their real catalogue (name, real price or
// "Price in store", real photo URL from their site). Show 12-40 real products; never invent any.
// Design it like Aesop/Hay: big product stills on one backdrop, quiet type, the cart as a calm side sheet.
//
// Usage:
//   const { cart, add, remove, total, count } = useCart()
//   <Catalogue products={products} categories={['Roofing','Paint','Garden']} onAdd={add} />
//   <CartDrawer open={open} onClose={() => setOpen(false)} cart={cart} remove={remove} total={total} checkoutUrl="https://www.cbsbahamas.com" />
import { useMemo, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export type Product = { id: string; name: string; category: string; price?: number | null; image: string; url?: string; note?: string }
type Line = { p: Product; qty: number }

export function useCart(key = 'concept-cart') {
  const [cart, setCart] = useState<Line[]>(() => { try { return JSON.parse(sessionStorage.getItem(key) || '[]') } catch { return [] } })
  useEffect(() => { try { sessionStorage.setItem(key, JSON.stringify(cart)) } catch { /* private mode */ } }, [cart, key])
  const add = (p: Product) => setCart(c => c.some(l => l.p.id === p.id) ? c.map(l => l.p.id === p.id ? { ...l, qty: l.qty + 1 } : l) : [...c, { p, qty: 1 }])
  const remove = (id: string) => setCart(c => c.filter(l => l.p.id !== id))
  const total = cart.reduce((s, l) => s + (l.p.price || 0) * l.qty, 0)
  const count = cart.reduce((s, l) => s + l.qty, 0)
  return { cart, add, remove, total, count }
}

export function Catalogue({ products, categories, onAdd, className = '' }: { products: Product[]; categories: string[]; onAdd: (p: Product) => void; className?: string }) {
  const [cat, setCat] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const list = useMemo(() => products.filter(p => (!cat || p.category === cat) && (!q || p.name.toLowerCase().includes(q.toLowerCase()))), [products, cat, q])
  return (
    <div className={className}>
      <div role="toolbar" aria-label="Filter products" style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', alignItems: 'center' }}>
        <button aria-pressed={!cat} onClick={() => setCat(null)}>All</button>
        {categories.map(c => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
        <input type="search" placeholder="Search" aria-label="Search products" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <motion.ul layout style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem 1.5rem' }}>
        <AnimatePresence>
          {list.map(p => (
            <motion.li layout key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <img src={p.image} alt={p.name} loading="lazy" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
              <p>{p.name}</p>
              <p>{p.price != null ? `$${p.price.toFixed(2)}` : 'Price in store'}</p>
              <button onClick={() => onAdd(p)}>Add to basket</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

export function CartDrawer({ open, onClose, cart, remove, total, checkoutUrl, whatsapp, business = 'the store' }: {
  open: boolean; onClose: () => void; cart: Line[]; remove: (id: string) => void; total: number
  checkoutUrl?: string; whatsapp?: string | null; business?: string
}) {
  const msg = `Hello ${business}, I would like to order:\n` + cart.map(l => `${l.qty} x ${l.p.name}`).join('\n')
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Your basket" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.35)', zIndex: 50 }}>
          <motion.aside onClick={e => e.stopPropagation()} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 'min(440px, 100vw)', background: 'var(--paper, #fff)', padding: '2rem', overflowY: 'auto' }}>
            <button onClick={onClose} aria-label="Close basket">Close</button>
            {cart.length === 0 ? <p>Your basket is empty.</p> : (
              <>
                <ul style={{ listStyle: 'none', padding: 0 }}>{cart.map(l => <li key={l.p.id}>{l.qty} x {l.p.name} <button onClick={() => remove(l.p.id)}>Remove</button></li>)}</ul>
                {total > 0 && <p>Estimated total ${total.toFixed(2)}</p>}
                <p>This is a concept: checkout continues on {business}'s own store.</p>
                {checkoutUrl && <a href={checkoutUrl} target="_blank" rel="noopener">Continue to checkout</a>}
                {whatsapp && <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener">Order on WhatsApp</a>}
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
