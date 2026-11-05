// Built per site by factory/tools/build-site.mjs, never run directly.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs'
const slug = process.env.SITE_SLUG
if (!slug) throw new Error('SITE_SLUG missing')
const siteRoot = path.resolve(__dirname, 'sites', slug)
const repoRoot = path.resolve(__dirname, '../..')
const pages = fs.readdirSync(siteRoot).filter(f => f.endsWith('.html'))
export default defineConfig({
  root: siteRoot,
  base: './',
  publicDir: path.join(siteRoot, 'public'),
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    outDir: path.join(repoRoot, slug),
    emptyOutDir: true,
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1500,
    rollupOptions: { input: Object.fromEntries(pages.map(p => [p.replace('.html', ''), path.join(siteRoot, p)])) }
  }
})
