import { useEffect, useRef, useState } from 'react'

// A real map of the Bell Channel inlet from Esri World Imagery tiles (256 px, shown at 1:1, never scaled).
// The pin sits on the club's coordinate; the scale bar is computed from zoom and latitude.
export const CLUB = { lat: 26.5147, lon: -78.6368 }
const TILE = 256
const tileXY = (lat: number, lon: number, z: number) => {
  const n = 2 ** z
  const x = ((lon + 180) / 360) * n
  const r = (lat * Math.PI) / 180
  const y = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n
  return { x, y }
}
const url = (z: number, x: number, y: number) => `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`
export const MAP_CREDIT = 'Imagery: Esri, Maxar, Earthstar Geographics'

function Tile({ z, x, y, left, top }: { z: number; x: number; y: number; left: number; top: number }) {
  const [ok, setOk] = useState(false)
  return <img className={`tile ${ok ? 'in' : ''}`} src={url(z, x, y)} width={TILE} height={TILE} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer"
    style={{ transform: `translate(${left}px, ${top}px)` }} onLoad={() => setOk(true)} />
}

export function InletMap({ zoom, at = [0.5, 0.5], label = 'Bell Channel Club', className = '', initial = [1440, 836] }: { zoom: number; at?: [number, number]; label?: string; className?: string; initial?: [number, number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<[number, number]>(initial)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ro = new ResizeObserver(([e]) => setSize([Math.round(e.contentRect.width), Math.round(e.contentRect.height)]))
    ro.observe(el); return () => ro.disconnect()
  }, [])
  const [w, h] = size
  const c = tileXY(CLUB.lat, CLUB.lon, zoom)
  const px = w * at[0], py = h * at[1]
  // pixel offset of tile (0,0) of the world relative to the container
  const ox = px - c.x * TILE, oy = py - c.y * TILE
  const x0 = Math.floor(-ox / TILE), x1 = Math.floor((w - ox) / TILE)
  const y0 = Math.floor(-oy / TILE), y1 = Math.floor((h - oy) / TILE)
  const tiles = []
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) tiles.push(<Tile key={`${zoom}-${x}-${y}`} z={zoom} x={x} y={y} left={ox + x * TILE} top={oy + y * TILE} />)
  // scale bar: metres per pixel at this latitude and zoom, rounded to a clean length
  const mpp = (156543.03392 * Math.cos((CLUB.lat * Math.PI) / 180)) / 2 ** zoom
  const nice = [100, 200, 250, 500, 1000, 2000].reverse().find(m => m / mpp <= 140) ?? 100
  return (
    <div ref={ref} className={`imap ${className}`} role="img" aria-label={`Satellite map of the Bell Channel inlet, Lucaya, Grand Bahama, with ${label} pinned at 26°30.9′ N, 78°38.2′ W`}>
      <div className="imap__tiles" aria-hidden="true">{tiles}</div>
      <div className={`pin ${px > w - 170 ? 'flip' : ''}`} style={{ transform: `translate(${px}px, ${py}px)` }} aria-hidden="true">
        <span className="pin__dot" />
        <span className="pin__label">{label}</span>
      </div>
      <div className="imap__scale" aria-hidden="true"><i style={{ width: `${Math.round(nice / mpp)}px` }} /><span className="num">{nice >= 1000 ? `${nice / 1000} km` : `${nice} m`}</span></div>
      <p className="imap__credit">{MAP_CREDIT}</p>
    </div>
  )
}
