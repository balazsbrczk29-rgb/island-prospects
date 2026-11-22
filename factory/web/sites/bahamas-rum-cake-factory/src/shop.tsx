import { createRoot } from 'react-dom/client'
import { useMemo, useState } from 'react'
import './styles.css'
import { CartProvider, useCart, BagButton } from './cart'
import { flavours, sixpacks, twopacks, other, mix, img, money, type Item } from './data'
import { Foot, Dock } from './sections'

type P = Item & { group: string; contain?: boolean }
const GROUPS = ['Rum cakes', 'Six packs', 'Two-packs', 'Hair and skin', 'Air fresheners', 'Apparel']
const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-')
const ALL: P[] = [
  ...flavours.map(f => ({ ...f, name: f.title || f.name, group: 'Rum cakes' })),
  { ...mix, name: 'Six Pack, mix and match', group: 'Six packs', contain: true },
  ...sixpacks.map(s => ({ ...s, name: s.name.replace(/^./, c => c.toUpperCase()) + ' six pack', group: 'Six packs', contain: true })),
  ...twopacks.map(t => ({ ...t, group: 'Two-packs', contain: true })),
  ...other.map(o => ({ ...o, group: o.cat || 'Hair and skin', contain: o.cat === 'Apparel' })),
]

function Card({ p }: { p: P }) {
  const { add, setOpen } = useCart()
  const [vi, setVi] = useState(0)
  const v = p.v[vi]
  const sized = p.v.length > 1
  return (
    <li className="prod">
      <div className={'prod__img' + (p.contain ? ' contain' : '')}><img src={img(p.img, 600)} alt={p.name} loading="lazy" width={600} height={600} /></div>
      <b>{p.name}</b>
      <div className="row">
        {sized ? (
          <select aria-label={`Size of ${p.name}`} value={vi} onChange={e => setVi(+e.target.value)}>
            {p.v.map((x, i) => <option key={x.id} value={i}>{x.t.replace('Default Title', 'One size')} · {money(x.p)}</option>)}
          </select>
        ) : <span className="tnum">{money(v.p)}</span>}
        {v.ok ? <button type="button" className="btn btn-ink" onClick={() => { add({ id: v.id, name: p.name, size: v.t === 'Default Title' ? '' : v.t, price: v.p, img: img(p.img, 200) }); setOpen(true) }}>Add</button> : <span>Sold out</span>}
      </div>
    </li>
  )
}

function Shop() {
  const [g, setG] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const list = useMemo(() => ALL.filter(p => (!g || p.group === g) && (!q || p.name.toLowerCase().includes(q.toLowerCase()))), [g, q])
  return (
    <>
      <header className="top top--page">
        <a className="mark" href="./">Bahamas Rum Cake Factory</a>
        <nav aria-label="Site" className="top__nav"><a href="./">Home</a><a href="./#six">Six pack</a><a href="./#visit">Visit</a></nav>
        <BagButton />
      </header>
      <main id="main">
        <div className="shop-head"><h1>The whole shop, {ALL.length} products.</h1><p className="fine">Prices in US dollars, from the factory's own store.</p></div>
        <div className="filters" role="group" aria-label="Filter">
          <button type="button" aria-pressed={!g} onClick={() => setG(null)}>Everything</button>
          {GROUPS.map(x => <button key={x} type="button" aria-pressed={g === x} onClick={() => setG(x)}>{x}</button>)}
          <input type="search" placeholder="Search, e.g. coconut" aria-label="Search products" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <ul className="catalogue">
          {GROUPS.filter(x => list.some(p => p.group === x)).map(x => [
            <h2 key={x} id={slug(x)}>{x}</h2>,
            ...list.filter(p => p.group === x).map(p => <Card key={p.handle} p={p} />),
          ])}
        </ul>
      </main>
      <Foot />
      <Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<CartProvider><a className="skip" href="#main">Skip to content</a><Shop /></CartProvider>)
