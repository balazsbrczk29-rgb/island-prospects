// Bakes the Andros coastline (Natural Earth 1:10m land, public domain, via world-atlas) into SVG paths
// for the route map. Run once: NODE_PATH=<dir with world-atlas, topojson-client, d3-geo> node tools/bake-map.mjs
import { createRequire } from 'node:module'
import fs from 'node:fs'
const require = createRequire(process.env.NODE_PATH + '/x.js')
const topo = require('world-atlas/land-10m.json')
const { feature } = require('topojson-client')
const { geoMercator, geoPath } = require('d3-geo')

const W = 1000, H = 900
const box = { type: 'Feature', geometry: { type: 'MultiPoint', coordinates: [[-78.35, 24.6], [-77.2, 23.68]] } }
const proj = geoMercator().fitExtent([[0, 0], [W, H]], box)
proj.clipExtent([[-20, -20], [W + 20, H + 20]])
const land = feature(topo, topo.objects.land)
const path = geoPath(proj)
const r = v => Math.round(v * 10) / 10
// keep only real islands: skip any ring d3 reads as the inverse (covering the frame)
const geoms = land.features ? land.features.map(f => f.geometry) : [land.geometry]
const polys = geoms.flatMap(g => g.type === 'Polygon' ? [g.coordinates] : g.coordinates).map(c => ({ type: 'Polygon', coordinates: c })).filter(g => { const a = path.area(g); return a > 0.02 && a < W * H * 0.5 })
const d = polys.map(g => path(g) || '').join('').replace(/\d+\.\d+/g, m => String(r(+m)))
const pts = {
  lodge: [-77.615, 24.17], middle: [-77.9, 24.33], south: [-77.9, 24.03], reefN: [-77.55, 24.45], reefS: [-77.5, 23.95], deep: [-77.33, 24.2],
  mangrove: [-77.7, 24.2], big: [-78.15, 24.5], southAndros: [-78.0, 23.9],
}
const P = Object.fromEntries(Object.entries(pts).map(([k, c]) => [k, proj(c).map(r)]))
const gx = [-78.4, -78.2, -78, -77.8, -77.6, -77.4].map(lo => [lo, r(proj([lo, 24.2])[0])])
const gy = [24.6, 24.4, 24.2, 24.0, 23.8].map(la => [la, r(proj([-77.8, la])[1])])
fs.writeFileSync(new URL('../src/map.json', import.meta.url), JSON.stringify({ w: W, h: H, land: d, p: P, gx, gy }))
console.log('bytes', d.length, P)
// Positions in src/map.json 'p' and 'reef' were placed by hand on the baked coastline (Natural Earth 1:10m is coarse at this scale); the lodge pin is approximate.
