import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ph } from './data'
import { nextSunset } from './sun'

export function TopWord() {
  return (
    <header className="top">
      <a className="name" href="./">Firefly Sunset Resort</a>
      <a className="req" href="#villas">Request a villa</a>
    </header>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const [s, setS] = useState<ReturnType<typeof nextSunset> | null>(null)
  useEffect(() => { const tick = () => setS(nextSunset()); tick(); const id = setInterval(tick, 30000); return () => clearInterval(id) }, [])
  const left = s && !s.tomorrow ? (s.mins >= 60 ? `${Math.floor(s.mins / 60)} h ${s.mins % 60} min from now` : `${s.mins} minutes from now`) : ''
  const fade = (d: number) => reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.8, delay: d, ease: [0.25, 0.1, 0.25, 1] as const } }
  return (
    <section className="hero" aria-labelledby="h1">
      <motion.img className="hero-img" src={ph('189')} srcSet={`${ph('189', 1280)} 1280w, ${ph('189')} 1920w`} sizes="100vw" alt="The plunge pool and deck at Firefly Sunset Resort at sunset, the Sea of Abaco beyond" width={1920} height={1280} fetchPriority="high" {...(reduce ? {} : { initial: { opacity: 0, scale: 1.03 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 2.2, ease: [0.25, 0.1, 0.25, 1] } })} />
      <TopWord />
      <motion.div className="card" {...fade(0.6)}>
        <h1 id="h1" className="card-h">{s ? <>{s.tomorrow ? 'Tomorrow' : 'Tonight'} the sun sets over the Sea of Abaco at <span className="num">{s.time}</span>.</> : <>Five villas and a house on the Sea of Abaco, facing the sunset.</>}<span className="sr-only"> Firefly Sunset Resort, villas in Hope Town, Elbow Cay, Abaco.</span></h1>
        <p className="card-sub">{left ? <><span className="num">{left}</span>, from the decks at Firefly. Hope Town, Elbow Cay.</> : 'Watch it from the decks at Firefly. Hope Town, Elbow Cay.'}</p>
        <a className="btn" href="#villas">Request a villa</a>
      </motion.div>
    </section>
  )
}
