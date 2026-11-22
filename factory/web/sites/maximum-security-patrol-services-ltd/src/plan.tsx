import type { Hours, Premises, SvcId } from "./data"

const routeOf = (p: Premises) => {
  const [x, y, w, h] = p.site, i = 14
  return `M${x + i} ${y + i} H${x + w - i} V${y + h - i} H${x + i} Z`
}
const HOURSPAN: Record<Hours, [number, number][]> = {
  "Business hours": [[8, 18]], Nights: [[18, 24], [0, 6]], "Around the clock": [[0, 24]], "Not sure yet": [],
}

export function Plan({ p, on, posts, hours, reduced }: { p: Premises; on: SvcId[]; posts: number; hours: Hours; reduced: boolean }) {
  const has = (s: SvcId) => on.includes(s)
  const [sx, sy, sw, sh] = p.site
  const route = routeOf(p)
  const shown = p.posts.slice(0, Math.min(posts, p.posts.length))
  const extra = posts - shown.length
  const b0 = p.buildings[0].r
  const ctrlY = b0[1] + 18
  const [vx, vy, vw, vh] = p.survey
  const hx = 40, hw = 560, seg = hw / 24
  return (
    <svg className="plan" viewBox="0 0 640 430" role="img" aria-label={`Diagram of a ${p.noun} showing ${on.length ? on.join(", ") : "no services yet"}`}>
      <defs>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" className="hatch" /></pattern>
        <mask id={`m-route-${p.id}`} maskUnits="userSpaceOnUse"><path d={route} pathLength={1} className="route-mask" /></mask>
      </defs>

      {/* coverage hours: a 24 hour strip */}
      <g className="hours" aria-hidden="true">
        <rect x={hx} y={6} width={hw} height={6} className="hours__bg" />
        {(hours === "Not sure yet" ? [] : HOURSPAN[hours]).map(([a, b]) => <rect key={a} x={hx + a * seg} y={6} width={(b - a) * seg} height={6} className="hours__on" />)}
        {hours === "Not sure yet" && <rect x={hx} y={6} width={hw} height={6} fill="url(#hatch)" />}
        {[0, 6, 12, 18, 24].map(t => <text key={t} x={hx + t * seg} y={26} className="lbl lbl--t" textAnchor={t === 0 ? "start" : t === 24 ? "end" : "middle"}>{String(t).padStart(2, "0")}:00</text>)}
      </g>

      <g key={p.id} className="sheet-in">
        <rect x={sx} y={sy} width={sw} height={sh} className="site" />
        <text x={p.street.at[0]} y={p.street.at[1] + 16} className="lbl lbl--street" textAnchor="middle">{p.street.label}</text>
        <line x1={sx} x2={sx + sw} y1={sy + sh + 20} y2={sy + sh + 20} className="street" />
        {p.areas?.map((a, i) => <g key={i}><rect x={a.r[0]} y={a.r[1]} width={a.r[2]} height={a.r[3]} className="area" />{a.label && <text x={a.r[0] + 8} y={a.r[1] + 16} className="lbl">{a.label}</text>}</g>)}
        {p.buildings.map(b => <g key={b.label}><rect x={b.r[0]} y={b.r[1]} width={b.r[2]} height={b.r[3]} className="bldg" /><text x={b.r[0] + 12} y={b.r[1] + 22} className="lbl lbl--b">{b.label}</text></g>)}

        {has("consultancy") && (
          <g className="layer survey">
            {[[vx, vy, 1, 1], [vx + vw, vy, -1, 1], [vx, vy + vh, 1, -1], [vx + vw, vy + vh, -1, -1]].map(([x, y, dx, dy], i) => (
              <path key={i} d={`M${x} ${y + 18 * dy} V${y} H${x + 18 * dx}`} className="survey__c" />
            ))}
            <line x1={vx} x2={vx + vw} y1={vy - 8} y2={vy - 8} className="survey__dim" />
            <text x={vx + vw / 2} y={vy - 13} className="lbl lbl--acc" textAnchor="middle">Site survey</text>
          </g>
        )}

        {has("patrols") && (
          <g className="layer">
            <path d={route} className="route" mask={`url(#m-route-${p.id})`} />
            {!reduced && <circle r={5} className="walker"><animateMotion dur="14s" repeatCount="indefinite" path={route} /></circle>}
            <text x={sx + sw - 24} y={sy + sh - 24} className="lbl lbl--acc" textAnchor="end">Patrol route</text>
          </g>
        )}

        {has("alarm") && (
          <g className="layer">
            <path d={`M${b0[0] + b0[2]} ${ctrlY} H640`} className="ctrl" />
            <text x={636} y={ctrlY - 6} className="lbl lbl--acc" textAnchor="end">To Carib Road control</text>
            {p.sensors.map(([x, y], i) => (
              <g key={i} className="sensor" style={{ animationDelay: `${i * 40}ms` }}>
                <circle cx={x} cy={y} r={9} className="sensor__ring" style={{ animationDelay: `${i * 300}ms` }} />
                <rect x={x - 3.5} y={y - 3.5} width={7} height={7} className="sensor__dot" />
              </g>
            ))}
          </g>
        )}

        {has("investigations") && (
          <g className="layer pop">
            <path d={`M${p.caseAt[0]} ${p.caseAt[1] - 8} l8 8 -8 8 -8 -8 Z`} className="case" />
            <text x={p.caseAt[0] + 14} y={p.caseAt[1] + 4} className="lbl lbl--acc">Case file</text>
          </g>
        )}

        {has("officers") && (
          <g className="layer">
            {shown.map(([x, y], i) => (
              <g key={`${p.id}-${i}`} className="post" style={{ animationDelay: `${i * 40}ms` }}>
                <circle cx={x} cy={y} r={30} className="post__zone" />
                <circle cx={x} cy={y} r={6} className="post__dot" />
              </g>
            ))}
            {extra > 0 && <text x={shown[0][0] + 14} y={shown[0][1] - 12} className="lbl lbl--acc">+{extra} more on post</text>}
          </g>
        )}
      </g>
    </svg>
  )
}

export function Symbol({ id }: { id: SvcId }) {
  return (
    <svg className="sym" viewBox="0 0 24 24" aria-hidden="true">
      {id === "officers" && <><circle cx="12" cy="12" r="9" className="post__zone" /><circle cx="12" cy="12" r="3.5" className="post__dot" /></>}
      {id === "patrols" && <path d="M3 12 H21" className="route route--sym" />}
      {id === "alarm" && <><circle cx="12" cy="12" r="7" className="sensor__ring sensor__ring--still" /><rect x="9" y="9" width="6" height="6" className="sensor__dot" /></>}
      {id === "investigations" && <path d="M12 5 l7 7 -7 7 -7 -7 Z" className="case" />}
      {id === "consultancy" && <><path d="M4 10 V4 H10" className="survey__c" /><path d="M20 14 V20 H14" className="survey__c" /></>}
    </svg>
  )
}
