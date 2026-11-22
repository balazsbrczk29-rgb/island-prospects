import { BIZ } from './data'

export function Header({ base = '' }: { base?: string }) {
  return (
    <header className="hd wrap">
      <a className="hd-name" href={base || './'}>The Conch Inn{'\u00a0'}<span className="amp">&amp;</span>{'\u00a0'}Marina</a>
      <nav className="hd-nav" aria-label="Main">
        <a href={base + '#rates'}>Rates</a>
        <a href={base + '#rooms'}>Rooms</a>
        <a href={base + '#snappas'}>Snappa's</a>
        <a href={base + '#town'}>Town</a>
        <a href={base + '#office'}>Office</a>
      </nav>
      <a className="hd-book" href={BIZ.bookRooms}>Book a room</a>
      <a className="hd-tel num" href={`tel:${BIZ.tel}`}><span className="hd-tel-l">Dock office{'\u00a0'}</span>{BIZ.phone}</a>
    </header>
  )
}
