import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeContext } from '@/context/ModeContext'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  isLoaded: boolean
}

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { mode } = useModeContext()

  useEffect(() => {
    if (!isLoaded) return
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      const words = content.querySelectorAll('.headline-word')
      const subhead = content.querySelector('.subhead')
      const cta = content.querySelector('.cta-row')
      const statusCard = content.querySelector('.status-card')

      loadTl.fromTo(words,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 },
        0.1
      )

      loadTl.fromTo([subhead, cta],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.4
      )

      loadTl.fromTo(statusCard,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        0.3
      )

      gsap.to(words, {
        y: -30,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [isLoaded])

  const isTerminal = mode === 'terminal'

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen overflow-hidden ${isTerminal ? 'bg-[#0A0A0A]' : 'bg-[#F5F0E8]'
        }`}
    >
      {/* Terminal grid background */}
      {isTerminal && <div className="absolute inset-0 terminal-grid" />}

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full px-6 md:px-[6vw] py-20">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">

            {/* Left side */}
            <div className="flex-1 max-w-2xl">
              {/* Micro label */}
              <div className="mb-6 md:mb-8">
                <span className={`font-mono text-xs uppercase tracking-[0.12em] ${isTerminal ? 'text-[#888]' : 'text-[#666]'
                  }`}>
                  {isTerminal ? '// Full-Stack Developer & AI Explorer' : 'Full-Stack Developer & AI Explorer'}
                </span>
              </div>

              {/* Main headline with particle effect */}
              <div className="mb-8 md:mb-10 relative">
                {/* Particle canvas behind text */}
                <div className="absolute inset-0 -inset-x-4 -inset-y-6 overflow-hidden pointer-events-auto z-0 opacity-50">
                  <ParticleTextEffect
                    isTerminal={isTerminal}
                    words={["VIDHU", "KRISHNA S", "FULL-STACK"]}
                    font="bold 60px 'DM Sans', Arial, sans-serif"
                    pixelSteps={8}
                    drawAsPoints={true}
                    changeInterval={300}
                    colors={[
                      { r: 255, g: 51, b: 51 },
                      { r: 0, g: 102, b: 255 },
                      { r: 255, g: 255, b: 0 },
                    ]}
                  />
                </div>

                <h1
                  className="font-sans font-[800] leading-[0.95] tracking-[-0.02em] relative z-10"
                  style={{
                    fontSize: 'clamp(48px, 8vw, 96px)',
                    color: isTerminal ? '#ff3333' : '#000000',
                    textShadow: isTerminal
                      ? '4px 4px 0px #ffff00'
                      : '4px 4px 0px #0066ff',
                  }}
                >
                  <span className="headline-word block">VIDHU</span>
                  <span className="headline-word block">KRISHNA S</span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="subhead mb-8 md:mb-10">
                <p className={`font-mono text-sm leading-relaxed max-w-lg ${isTerminal ? 'text-[#888]' : 'text-[#555]'
                  }`}>
                  {isTerminal
                    ? '> I build end-to-end products — clean frontends, reliable backends, and AI interfaces that feel instant.'
                    : 'I build end-to-end products — clean frontends, reliable backends, and AI interfaces that feel instant.'
                  }
                </p>
              </div>

              {/* CTA buttons */}
              <div className="cta-row flex flex-wrap items-center gap-4">
                <a href="#projects" className="btn-brutal">
                  VIEW_PROJECTS.exe
                </a>
                <a href="#contact" className="btn-brutal" style={{
                  background: isTerminal ? '#ff3333' : '#0066ff',
                  borderColor: isTerminal ? '#ff3333' : '#0066ff',
                  boxShadow: isTerminal
                    ? '4px 4px 0px #000'
                    : '4px 4px 0px #000',
                }}>
                  {isTerminal ? 'TRANSMIT_MESSAGE.exe' : 'GET IN TOUCH'}
                </a>
              </div>
            </div>

            {/* Status card — brutalist */}
            <div className="status-card w-full max-w-sm lg:w-[360px] flex-shrink-0">
              <div className={`p-5 md:p-6 border-2 ${isTerminal
                ? 'bg-[#111] border-[#ff3333] shadow-brutal-red'
                : 'bg-white border-black shadow-brutal'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs uppercase tracking-[0.12em]" style={{
                    color: isTerminal ? '#ff3333' : '#000'
                  }}>
                    {isTerminal ? '> system_status' : 'System Status'}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Status indicator */}
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#00ff9d] animate-pulse-dot" />
                    <span className={`font-mono text-sm ${isTerminal ? 'text-[#00ff9d]' : 'text-black'}`}>
                      FULLY_INTEGRATED
                    </span>
                  </div>

                  <div className={`h-px ${isTerminal ? 'bg-[#ff3333]/30' : 'bg-black/20'}`} />

                  {/* Info rows */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className={isTerminal ? 'text-[#888]' : 'text-[#666]'}>location:</span>
                      <span className={isTerminal ? 'text-white' : 'text-black'}>Hyderabad, IN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isTerminal ? 'text-[#888]' : 'text-[#666]'}>focus:</span>
                      <span className={isTerminal ? 'text-white' : 'text-black'}>AI & Full-Stack</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isTerminal ? 'text-[#888]' : 'text-[#666]'}>status:</span>
                      <span className="text-[#00ff9d]">available</span>
                    </div>
                  </div>

                  <div className={`h-px ${isTerminal ? 'bg-[#ff3333]/30' : 'bg-black/20'}`} />

                  {/* Recent activity */}
                  <div>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.12em] block mb-3 ${isTerminal ? 'text-[#888]' : 'text-[#666]'
                      }`}>
                      {isTerminal ? '// recent_activity' : 'Recent Activity'}
                    </span>
                    <div className="space-y-2 font-mono text-xs">
                      {[
                        'Launched Keraleeyam',
                        'GestureMediaControl demo',
                        'Optimizing ESP32 logger',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-[#ff3333]">→</span>
                          <span className={isTerminal ? 'text-white/80' : 'text-black/80'}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
