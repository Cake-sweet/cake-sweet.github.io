import { useEffect, useRef, useCallback } from 'react'
import { useModeContext } from '@/context/ModeContext'

interface TrailPoint {
  x: number
  y: number
  id: number
  opacity: number
}

export default function GhostCursor() {
  const { mode } = useModeContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const idCounter = useRef(0)
  const rafRef = useRef<number>(0)

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const render = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    // Decay all opacities
    trailRef.current = trailRef.current
      .map(p => ({ ...p, opacity: p.opacity - 0.08 }))
      .filter(p => p.opacity > 0)

    // Render
    container.innerHTML = trailRef.current.map(p =>
      `<span style="
        position:fixed;
        left:${p.x}px;
        top:${p.y}px;
        font-family:'Space Mono',monospace;
        font-size:9px;
        color:rgba(0,102,255,${p.opacity});
        pointer-events:none;
        user-select:none;
        transform:translate(-50%,-50%);
        z-index:9999;
      ">(${Math.round(p.x)},${Math.round(p.y)})</span>`
    ).join('')

    rafRef.current = requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    if (mode !== 'human' || isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        id: idCounter.current++,
        opacity: 1,
      })
      // Max 12 items
      if (trailRef.current.length > 12) {
        trailRef.current = trailRef.current.slice(-12)
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(render)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      trailRef.current = []
    }
  }, [mode, isTouch, render])

  // Don't render on touch devices or terminal mode
  if (isTouch || mode !== 'human') return null

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />
}
