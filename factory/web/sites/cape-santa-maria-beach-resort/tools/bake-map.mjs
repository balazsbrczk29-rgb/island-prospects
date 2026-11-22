// Bakes the Bahamas coastline (Natural Earth 1:10m land, public domain, via world-atlas) into SVG paths
// for the route map. Run once: NODE_PATH=<dir with world-atlas, topojson-client, d3-geo> node tools/bake-map.mjs
import { createRequire } from 'node:module'
import fs from 'node:fs'
const require = createRequire(process.env.NODE_PATH + '/x.js')
const topo = require('world-atlas/land-10m.json')
const { feature } = require('topojson-client')
const { geoMercator, geoPath } = require('d3-geo')

const W = 1000, H = 760
const box = { type: 'Feature', geometry: { type: 'MultiPoint', coordinates: [[-80.9, 27.05], [-74.55, 22.75]] } }
const proj = geoMercator().fitExtent([[0, 0], [W, H]], box)
proj.clipExtent([[-20, -20], [W + 20, H + 20]])
const land = feature(topo, topo.objects.land)
const path = geoPath(proj)
const r = v => Math.round(v * 10) / 10
const d = path(land).replace(/\d+\.\d+/g, m => String(r(+m)))
const pts = {
  fxe: [-80.1707, 26.1973], nas: [-77.4662, 25.039], ggt: [-75.878, 23.5626], sml: [-75.2686, 23.5823], cape: [-75.329, 23.656],
  florida: [-80.75, 26.75], grandbahama: [-78.45, 26.62], abaco: [-77.15, 26.45], andros: [-77.98, 24.45], eleuthera: [-76.27, 25.22],
  cat: [-75.52, 24.42], exuma: [-76.1, 23.9], long: [-75.02, 23.12], nassau: [-77.35, 25.06],
  own: [-80.9, 27.05],
}
const P = Object.fromEntries(Object.entries(pts).map(([k, c]) => [k, proj(c).map(r)]))
fs.writeFileSync(new URL('../src/map.json', import.meta.url), JSON.stringify({ w: W, h: H, land: d, p: P }))
console.log('bytes', d.length, P)
