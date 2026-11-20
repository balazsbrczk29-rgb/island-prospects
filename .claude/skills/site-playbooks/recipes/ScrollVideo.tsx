// RECIPE: film that plays as you scroll (scroll-scrubbed video), or a calm looping hero film.
// Use for: a boat leaving the dock, a roof being laid, a dive descending, a cake being iced, dusk over a marina.
// Source: a short clip from the business (Facebook/Instagram reels they own), or Higgsfield image-to-video from
// the best hero still (needs credits). Encode for scrubbing: H.264 MP4, every frame a keyframe, 720-1080p, 4-8 s:
//   ffmpeg -i in.mp4 -an -vf scale=1600:-2 -c:v libx264 -preset veryfast -crf 24 -g 1 -pix_fmt yuv420p -movflags +faststart out.mp4
// Mode "loop": autoplay muted loop (classic hero). Mode "scrub": currentTime follows progress (pair with ScrollStage).
// Always: poster = the best still, playsInline, muted, and stills only under prefers-reduced-motion.
import { useEffect, useRef } from 'react'

export default function ScrollVideo({ src, poster, progress = 0, mode = 'scrub', className = '', label }: {
  src: string; poster: string; progress?: number; mode?: 'scrub' | 'loop'; className?: string
  /** describes the film for screen readers */ label: string
}) {
  const v = useRef<HTMLVideoElement>(null)
  const target = useRef(0)
  const reduce = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => { target.current = progress }, [progress])
  useEffect(() => {
    const el = v.current; if (!el || mode !== 'scrub' || reduce) return
    let raf = 0
    const tick = () => {
      if (el.duration) { const want = target.current * (el.duration - 0.05); const cur = el.currentTime; if (Math.abs(want - cur) > 0.01) el.currentTime = cur + (want - cur) * 0.18 }
      raf = requestAnimationFrame(tick)
    }
    tick(); return () => cancelAnimationFrame(raf)
  }, [mode, reduce])

  if (reduce) return <img src={poster} alt={label} className={className} style={{ objectFit: 'cover' }} />
  return (
    <video ref={v} className={className} src={src} poster={poster} muted playsInline preload="auto" aria-label={label}
      autoPlay={mode === 'loop'} loop={mode === 'loop'} style={{ objectFit: 'cover' }} />
  )
}
