// Encodes the baked PNG frames into the AVIF sequences the site plays (run from factory/web so sharp resolves).
// usage: node sites/thermoset-roofing-bahamas-ltd/tools/encode.cjs <bake dir with wide-0, tall-0, wide-1 ... folders>
const fs = require('fs'), path = require('path'), sharp = require('sharp')
const src = process.argv[2], out = path.join(__dirname, '../public/seq')
;(async () => {
  for (const set of fs.readdirSync(src).filter(d => /^(wide|tall)-\d$/.test(d)).sort()) {
    const dir = path.join(src, set), dest = path.join(out, set); fs.mkdirSync(dest, { recursive: true })
    let bytes = 0
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort()) {
      const o = path.join(dest, f.replace('.png', '.avif')); if (fs.existsSync(o) && fs.statSync(o).size > 0) { bytes += fs.statSync(o).size; continue }
      await sharp(path.join(dir, f)).avif({ quality: 50, effort: 3, chromaSubsampling: '4:4:4' }).toFile(o)
      bytes += fs.statSync(o).size
    }
    if (set === 'wide-0' && fs.existsSync(path.join(dir, 'anchors.json'))) fs.copyFileSync(path.join(dir, 'anchors.json'), path.join(dest, 'anchors.json'))
    console.log(set, Math.round(bytes / 1024), 'KB')
  }
})()
