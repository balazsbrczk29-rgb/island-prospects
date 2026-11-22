// Offline only: renders the roof scene full-screen so factory tools can bake it into an image sequence.
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import RoofScene, { type Anchor, type SceneApi } from './RoofScene'
const progress = { current: 0 }, api: { current: SceneApi | null } = { current: null }
const w = window as unknown as Record<string, unknown>
function App() {
  const [finish, setFinish] = useState(0)
  useEffect(() => { w.__bake = (p: number, f: number) => { progress.current = p; setFinish(f); api.current?.invalidate() } }, [])
  return <RoofScene className="c" progress={progress} finish={finish} still api={api}
    onAnchors={(pts: Anchor[]) => { w.__anchors = pts; w.__frames = ((w.__frames as number) || 0) + 1 }} onReady={() => { w.__ready = true }} />
}
createRoot(document.getElementById('root')!).render(<App />)
