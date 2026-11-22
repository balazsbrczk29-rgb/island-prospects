import { useSyncExternalStore } from 'react'

export type Door = 'build' | 'service'
export type Shape = 'geometric' | 'freeform' | 'infinity' | 'spa' | 'renovate'
type State = { door: Door; shape: Shape; serviceIsland: string }

let state: State = { door: 'build', shape: 'geometric', serviceIsland: 'New Providence' }
const subs = new Set<() => void>()
export const setStore = (p: Partial<State>) => { state = { ...state, ...p }; subs.forEach(f => f()) }
export const useStore = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f) }, () => state, () => state)

/** Open a door of the quote tool from anywhere on the page and bring it into view. */
export function openTool(door: Door, shape?: Shape) {
  setStore(shape ? { door, shape } : { door })
  const el = document.getElementById('quote')
  if (!el) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  setTimeout(() => (el.querySelector('[aria-selected="true"]') as HTMLElement | null)?.focus({ preventScroll: true }), reduce ? 0 : 700)
}
