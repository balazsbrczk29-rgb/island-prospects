import { useSyncExternalStore } from 'react'
import { bookingUrl, nightsOf, type Side, type Who } from './data'

/** One small shared state: the hero planner, the offers finder and the enquiry form read and write the same choices. */
export type Plan = { side: Side | null; guests: number; arrive: string; leave: string; who: Who | null; room: string | null }
let plan: Plan = { side: null, guests: 2, arrive: '', leave: '', who: null, room: null }
const subs = new Set<() => void>()
export const setPlan = (p: Partial<Plan>) => { plan = { ...plan, ...p }; subs.forEach(f => f()) }
export const usePlan = () => useSyncExternalStore(f => (subs.add(f), () => subs.delete(f)), () => plan, () => plan)
/** The booking link with the dates and guests chosen anywhere on the page. */
export const useBookHref = () => { const p = usePlan(); return nightsOf(p.arrive, p.leave) ? bookingUrl(p.arrive, p.leave, p.guests) : bookingUrl() }
