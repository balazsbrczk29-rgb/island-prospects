import { HOPE_TOWN } from './data'
const rad = Math.PI / 180
/** NOAA general solar position: sunset (UTC ms) for a calendar day at lat/lon. Accurate to about a minute. */
export function sunsetUTC(y: number, m: number, d: number, lat = HOPE_TOWN.lat, lon = HOPE_TOWN.lon) {
  const start = Date.UTC(y, 0, 1), day = Math.floor((Date.UTC(y, m, d) - start) / 86400000) + 1
  const g = (2 * Math.PI / 365) * (day - 1)
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g))
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g)
  const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl)) / rad
  const minutes = 720 - 4 * (lon - ha) - eq
  return Date.UTC(y, m, d) + minutes * 60000
}
/** Tonight's (or, after dark, tomorrow's) sunset in Hope Town. */
export function nextSunset(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: HOPE_TOWN.tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now).split('-').map(Number)
  let t = sunsetUTC(parts[0], parts[1] - 1, parts[2]), tomorrow = false
  if (t < now.getTime()) { const n = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + 1)); t = sunsetUTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()); tomorrow = true }
  const time = new Date(t).toLocaleTimeString('en-US', { timeZone: HOPE_TOWN.tz, hour: 'numeric', minute: '2-digit' }).replace(' ', ' ').toLowerCase()
  const mins = Math.max(0, Math.round((t - now.getTime()) / 60000))
  return { time, tomorrow, mins }
}
