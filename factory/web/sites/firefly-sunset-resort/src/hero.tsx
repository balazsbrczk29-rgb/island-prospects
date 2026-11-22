import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ph } from './data'
import { nextSunset } from './sun'
import { PriceTool } from './tool'

export function SunsetLine() {
  const [s, setS] = useState<ReturnType<typeof nextSunset> | null>(null)
  useEffect(() => { const tick = () => setS(nextSunset()); tick(); const id = setInterval(tick, 30000); return () => clearInterval(id) }, [])
  const left = s && !s.tomorrow ? (s.mins >= 60 ? `in ${Math.floor(s.mins / 60)} h ${s.mins % 60} min` : `in ${s.mins} min`) : ''
  return (
    <p className="sunset num">
      <span className="dot" aria-hidden="true" />
      <span>{s ? <>{s.tomorrow ? 'Tomorrow’s' : 'Tonight’s'} sunset<span className="long"> over the Sea of Abaco</span>: <strong>{s.time}</strong>{left && `, ${left}`}</> : <>Every villa faces the sunset over the Sea of Abaco.</>}</span>
    </p>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="hero" aria-labelledby="h1">
      <figure className="hero-photo">
        <motion.img src={ph('189')} srcSet={`${ph('189', 1280)} 1280w, ${ph('189')} 1920w`} sizes="(max-width: 900px) 100vw, 58vw" alt="The plunge pool and deck at Firefly Sunset Resort at sunset, the Sea of Abaco beyond" width={1920} height={1280} fetchPriority="high"
          {...(reduce ? {} : { initial: { opacity: 0, scale: 1.03 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } })} />
      </figure>
      <div className="hero-col">
        <header className="top">
          <a className="name" href="./">Firefly Sunset Resort</a>
          <nav aria-label="Main"><a href="#villas">Villas</a><a href="#grill">Bar &amp; Grill</a><a href="#arrive">Getting here</a></nav>
        </header>
        <div className="hero-body">
          <SunsetLine />
          <h1 id="h1" className="h1">Six villas on the Sea of Abaco. Price your week.<span className="sr-only"> Firefly Sunset Resort, Hope Town, Elbow Cay, Abaco.</span></h1>
          <PriceTool />
        </div>
      </div>
    </section>
  )
}
