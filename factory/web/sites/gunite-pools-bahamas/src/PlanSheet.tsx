import { useEffect, useRef, useState } from 'react'
import type { Shape } from './store'

const VW = 600, VH = 280, PX = 8 // 8 px per foot
const CX = 316, CY = 150

export const widthFor = (shape: Shape, len: number) => Math.round(len * (shape === 'freeform' ? 0.52 : 0.5))

// A smooth closed curve through points (Catmull-Rom to cubic Bezier).
function smooth(pts: [number, number][]) {
  const n = pts.length
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d + 'Z'
}
const KIDNEY: [number, number][] = [[-0.5, 0.02], [-0.4, -0.42], [-0.08, -0.38], [0.22, -0.5], [0.48, -0.16], [0.4, 0.38], [0.04, 0.3], [-0.3, 0.5]]

export function PlanSheet({ shape, len, yard, active }: { shape: Shape; len: number; yard: string | null; active: boolean }) {
  const wid = widthFor(shape, len)
  const L = len * PX, H = wid * PX
  const x0 = CX - L / 2, y0 = CY - H / 2, x1 = x0 + L, y1 = y0 + H
  const spaR = 4 * PX
  const pool = shape === 'freeform'
    ? smooth(KIDNEY.map(([u, v]) => [CX + u * L, CY + v * H]))
    : `M${x0},${y0}H${x1}V${y1}H${x0}Z`
  const scx = x1 + spaR * 0.25, scy = y0 + spaR * 0.25
  const spa = shape === 'spa' ? `M${scx - spaR},${scy} a${spaR},${spaR} 0 1,0 ${2 * spaR},0 a${spaR},${spaR} 0 1,0 ${-2 * spaR},0Z` : ''
  // the outline redraws only when the shape changes, not while dragging
  const [drawKey, setDrawKey] = useState(0)
  const first = useRef(true)
  useEffect(() => { if (first.current) { first.current = false; return } setDrawKey(k => k + 1) }, [shape])

  const ticks = (a: number, b: number, fixed: number, vertical: boolean) => (
    <g stroke="var(--ink)" strokeWidth="1">
      {vertical ? <><line x1={fixed} y1={a} x2={fixed} y2={b} /><line x1={fixed - 5} y1={a} x2={fixed + 5} y2={a} /><line x1={fixed - 5} y1={b} x2={fixed + 5} y2={b} /></>
        : <><line x1={a} y1={fixed} x2={b} y2={fixed} /><line x1={a} y1={fixed - 5} x2={a} y2={fixed + 5} /><line x1={b} y1={fixed - 5} x2={b} y2={fixed + 5} /></>}
    </g>
  )
  const label = shape === 'renovate' ? 'Your existing pool' : shape === 'infinity' ? 'Vanishing edge' : shape === 'spa' ? 'Spa' : null

  return (
    <div className={`sheet${active ? '' : ' paused'}`}>
      {yard && <img className="yard" src={yard} alt="Your yard photo, under the plan" width={600} height={280} />}
      <svg viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label={`Plan of a ${shape === 'freeform' ? 'free-form' : shape} pool, about ${len} by ${wid} feet`}>
        <defs>
          <pattern id="grid5" width={5 * PX} height={5 * PX} patternUnits="userSpaceOnUse" x={CX % (5 * PX)} y={CY % (5 * PX)}>
            <path d={`M${5 * PX},0V${5 * PX}H0`} fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
          <pattern id="caus" width="120" height="60" patternUnits="userSpaceOnUse">
            <path d="M-10,16 C10,9 22,22 44,13 S78,6 96,18 S118,12 130,15 M-10,46 C14,38 30,53 56,43 S90,36 108,47 S124,42 130,44" fill="none" stroke="rgb(255 255 255 / .32)" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M30,0 C36,12 28,22 34,30 S44,50 38,60 M92,0 C86,14 98,24 92,34 S84,52 90,60" fill="none" stroke="rgb(255 255 255 / .18)" strokeWidth="1" strokeLinecap="round" />
          </pattern>
          <linearGradient id="deep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--water-1)" />
            <stop offset="1" stopColor="var(--water-2)" />
          </linearGradient>
          <clipPath id="poolclip"><path d={pool} />{spa && <path d={spa} />}</clipPath>
        </defs>
        <rect width={VW} height={VH} fill={yard ? 'oklch(0.993 0.003 85 / .45)' : 'var(--surface)'} />
        <rect width={VW} height={VH} fill="url(#grid5)" opacity={yard ? 0.6 : 1} />
        {shape !== 'renovate' && (
          <g clipPath="url(#poolclip)">
            <rect key={`w${drawKey}`} className="rise" x={x0 - 40} y={y0 - 40} width={L + 80 + (spa ? spaR * 2 : 0)} height={H + 80} fill="url(#deep)" />
            <rect className="water-tex" x={x0 - 160} y={y0 - 100} width={L + 400} height={H + 240} fill="url(#caus)" />
          </g>
        )}
        <path key={`o${drawKey}`} className={shape === 'renovate' ? undefined : 'draw'} pathLength={shape === 'renovate' ? undefined : 1} d={pool} fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray={shape === 'renovate' ? '8 6' : undefined} />
        {spa && <path d={spa} fill="none" stroke="var(--ink)" strokeWidth="2" />}
        {shape === 'infinity' && <><line x1={x0} y1={y1 + 8} x2={x1} y2={y1 + 8} stroke="var(--accent)" strokeWidth="3" /><rect x={x0} y={y1 + 12} width={L} height={6} fill="none" stroke="var(--ink)" strokeWidth="1" /></>}
        {ticks(x0, x1, 22, false)}
        {ticks(y0, y1, 22, true)}
        <g fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="560" fill="var(--ink)" style={{ fontVariantNumeric: 'tabular-nums' }}>
          <rect x={CX - 28} y={13} width={56} height={18} fill="var(--surface)" />
          <text x={CX} y={26} textAnchor="middle">{len} ft</text>
          <rect x={13} y={CY - 26} width={18} height={52} fill="var(--surface)" />
          <text transform={`translate(26 ${CY}) rotate(-90)`} textAnchor="middle">{wid} ft</text>
          {label && <text x={shape === 'spa' ? scx : CX} y={shape === 'spa' ? scy + 4 : shape === 'infinity' ? Math.min(y1 + 34, VH - 8) : CY + 5} textAnchor="middle" fill="var(--muted)" fontWeight="500">{label}</text>}
        </g>
        <g transform={`translate(${VW - 108} ${VH - 18})`} fontFamily="Instrument Sans, sans-serif" fontSize="11" fill="var(--muted)" style={{ fontVariantNumeric: 'tabular-nums' }}>
          <rect x="-6" y="-14" width="100" height="26" fill="var(--surface)" />
          <line x1="0" y1="0" x2={10 * PX} y2="0" stroke="var(--ink)" strokeWidth="2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--ink)" /><line x1={10 * PX} y1="-4" x2={10 * PX} y2="4" stroke="var(--ink)" />
          <text x={10 * PX + 6} y="4">10 ft</text>
        </g>
      </svg>
    </div>
  )
}
