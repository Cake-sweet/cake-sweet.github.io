import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeContext } from '@/context/ModeContext'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { label: 'Response', value: '< 200ms' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'CI/CD', value: 'Active' },
]

const logs = [
  { time: '10:42', message: 'Deployed contact API' },
  { time: '09:15', message: 'Optimized query latency' },
  { time: '08:03', message: 'Merged feature branch' },
  { time: '07:30', message: 'System health check passed' },
]

export default function LiveStatus() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const { mode } = useModeContext()
  const isTerminal = mode === 'terminal'
  const [focusMode, setFocusMode] = useState('Deep Work')

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const dashboard = dashboardRef.current
    if (!section || !heading || !dashboard) return

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 60%', scrub: true }
        }
      )
      gsap.fromTo(dashboard,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', end: 'top 50%', scrub: true }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const modes = ['Deep Work', 'Open to Chat', 'Coding', 'Learning']
      setFocusMode(modes[Math.floor(Math.random() * modes.length)])
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="status"
      className={`relative w-full py-20 md:py-28 overflow-hidden ${isTerminal ? 'bg-[#0A0A0A]' : 'bg-[#F5F0E8]'
        }`}
    >
      {isTerminal && <div className="absolute inset-0 terminal-grid" />}

      <div className="relative z-10 px-6 md:px-[6vw]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">

          {/* Left: heading */}
          <div ref={headingRef} className="lg:w-2/5">
            <span className={`font-mono text-xs uppercase tracking-[0.12em] block mb-3 ${isTerminal ? 'text-[#ff3333]' : 'text-[#666]'
              }`}>
              {isTerminal ? '// real_time' : 'Real-time'}
            </span>
            <h2 className={`font-sans font-[800] text-3xl md:text-4xl lg:text-5xl ${isTerminal ? 'text-white' : 'text-black'
              }`}>
              Live Status
            </h2>
            <p className={`font-mono text-sm mt-4 leading-relaxed max-w-md ${isTerminal ? 'text-[#888]' : 'text-[#555]'
              }`}>
              {isTerminal
                ? '> Real-time availability, focus mode, and system metrics.'
                : 'Real-time availability, focus mode, and system metrics. This dashboard updates automatically.'
              }
            </p>

            <div className="mt-8">
              <a href="#contact" className="btn-brutal">
                START_PROJECT.exe
              </a>
            </div>
          </div>

          {/* Right: Dashboard */}
          <div ref={dashboardRef} className="lg:w-1/2 max-w-lg">
            <div className={`p-5 md:p-6 border-2 ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
              }`} style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 bg-[#ff3333]" />
                <div className="w-3 h-3 bg-[#ffff00]" />
                <div className="w-3 h-3 bg-[#00ff9d]" />
                <span className={`font-mono text-[10px] ml-2 ${isTerminal ? 'text-[#888]' : 'text-[#666]'}`}>
                  dashboard.sys
                </span>
              </div>

              <div className="space-y-4">
                {/* Availability */}
                <div className={`flex items-center justify-between p-3 border ${isTerminal ? 'border-white/10' : 'border-black/10'
                  }`}>
                  <span className={`font-mono text-xs ${isTerminal ? 'text-[#888]' : 'text-[#666]'}`}>
                    availability
                  </span>
                  <span className="font-mono text-xs text-[#00ff9d]">AVAILABLE_FOR_HIRE</span>
                </div>

                {/* Focus mode */}
                <div className={`flex items-center justify-between p-3 border ${isTerminal ? 'border-white/10' : 'border-black/10'
                  }`}>
                  <span className={`font-mono text-xs ${isTerminal ? 'text-[#888]' : 'text-[#666]'}`}>
                    focus_mode
                  </span>
                  <span className={`font-mono text-xs ${isTerminal ? 'text-[#ff3333]' : 'text-[#0066ff]'}`}>
                    {focusMode.toUpperCase().replace(/ /g, '_')}
                  </span>
                </div>

                <div className={`h-px ${isTerminal ? 'bg-[#ff3333]/30' : 'bg-black/20'}`} />

                {/* Metrics */}
                <div>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.12em] block mb-3 ${isTerminal ? 'text-[#888]' : 'text-[#666]'
                    }`}>
                    {isTerminal ? '// system_metrics' : 'System Metrics'}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {metrics.map((metric) => (
                      <div key={metric.label} className={`p-3 border text-center ${isTerminal ? 'border-white/10' : 'border-black/10'
                        }`}>
                        <span className={`block font-mono text-[9px] ${isTerminal ? 'text-[#888]' : 'text-[#666]'
                          }`}>
                          {metric.label}
                        </span>
                        <span className={`block font-mono text-sm mt-1 ${isTerminal ? 'text-white' : 'text-black'
                          }`}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`h-px ${isTerminal ? 'bg-[#ff3333]/30' : 'bg-black/20'}`} />

                {/* Activity log */}
                <div>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.12em] block mb-3 ${isTerminal ? 'text-[#888]' : 'text-[#666]'
                    }`}>
                    {isTerminal ? '// recent_activity' : 'Recent Activity'}
                  </span>
                  <div className="space-y-2">
                    {logs.map((log, i) => (
                      <div key={i} className="flex items-center gap-2 font-mono text-xs">
                        <span className={isTerminal ? 'text-[#ff3333]' : 'text-[#666]'}>
                          [{log.time}]
                        </span>
                        <span className={isTerminal ? 'text-white/80' : 'text-black/80'}>
                          {log.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live indicator */}
              <div className={`flex items-center justify-center gap-2 mt-5 pt-4 border-t ${isTerminal ? 'border-[#ff3333]/30' : 'border-black/20'
                }`}>
                <div className="w-2 h-2 bg-[#00ff9d] animate-pulse-dot" />
                <span className={`font-mono text-[10px] ${isTerminal ? 'text-[#888]' : 'text-[#666]'}`}>
                  LIVE_UPDATES
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
