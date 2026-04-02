import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeContext } from '@/context/ModeContext'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const { mode } = useModeContext()
  const isTerminal = mode === 'terminal'

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 60%', scrub: true }
        }
      )

      const blocks = section.querySelectorAll('.capability-block')
      blocks.forEach((block) => {
        gsap.fromTo(block,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: block, start: 'top 85%', end: 'top 65%', scrub: true }
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const capabilities = [
    {
      title: 'THE EDGE — AI & Computer Vision',
      color: '#ff3333',
      items: [
        { label: 'Real-Time Perception', detail: 'OpenCV + MediaPipe. GestureMediaControl achieves <100ms latency.' },
        { label: 'Neural Logic', detail: 'Multi-agent system design. Memory + fact-checking agents.' },
      ],
    },
    {
      title: 'THE CORE — Full-Stack & Systems',
      color: '#0066ff',
      items: [
        { label: 'Production Architect', detail: 'Keraleeyam handled 500+ concurrent students, UoH.' },
        { label: 'Memory Engineering', detail: 'Spaced Repetition (SRS) algorithm in Synapz.' },
        { label: 'Hardware Fluency', detail: 'ESP32 microcontrollers, ±0.5% real-time data acquisition.' },
      ],
    },
    {
      title: 'LANGUAGES & INFRASTRUCTURE',
      color: '#ffff00',
      items: [
        { label: 'Fluent', detail: 'Python, JavaScript (ES6+), C, Java' },
        { label: 'Infrastructure', detail: 'RESTful APIs, Backend Architecture, SQL, Full-Stack Integration' },
      ],
    },
  ]

  const timeline = [
    { role: 'Full-Stack Developer', company: 'Freelance', period: '2024 – Present' },
    { role: 'AI & CV Research', company: '', period: '' },
    { role: 'CS Undergraduate', company: 'University of Hyderabad', period: '2024 – 2029' },
  ]

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-20 md:py-28 overflow-hidden ${isTerminal ? 'bg-[#0A0A0A]' : 'bg-[#F5F0E8]'
        }`}
    >
      <div className="relative z-10 px-6 md:px-[6vw]">
        <div className="max-w-[1600px] mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="mb-12 md:mb-16">
            <span className={`font-mono text-xs uppercase tracking-[0.12em] block mb-3 ${isTerminal ? 'text-[#ff3333]' : 'text-[#666]'
              }`}>
              {isTerminal ? '// human_capabilities' : 'Background'}
            </span>
            <h2 className={`font-sans font-[800] text-3xl md:text-4xl lg:text-5xl ${isTerminal ? 'text-white' : 'text-black'
              }`}>
              {isTerminal ? 'Human Capabilities' : 'Experience & Skills'}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left: Capability blocks */}
            <div className="lg:w-3/5 space-y-8">
              {capabilities.map((cap, i) => (
                <div key={i} className="capability-block" style={{ borderLeft: `4px solid ${cap.color}`, paddingLeft: 16 }}>
                  <h3 className={`font-mono text-sm uppercase tracking-[0.08em] mb-4 ${isTerminal ? 'text-white' : 'text-black'
                    }`}>
                    {cap.title}
                  </h3>
                  <div className="space-y-3">
                    {cap.items.map((item, j) => (
                      <div key={j} className="group" title={item.detail}>
                        <span className={`font-mono text-xs font-bold ${isTerminal ? 'text-white' : 'text-black'
                          }`}>
                          {item.label}
                        </span>
                        <span className={`font-mono text-xs block ${isTerminal ? 'text-[#888]' : 'text-[#555]'
                          }`}>
                          {item.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Timeline */}
            <div className="lg:w-2/5">
              <div className={`lg:sticky lg:top-24 p-5 md:p-6 border-2 ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
                }`} style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}>
                <span className={`font-mono text-[10px] uppercase tracking-[0.12em] block mb-6 ${isTerminal ? 'text-[#ff3333]' : 'text-[#666]'
                  }`}>
                  {isTerminal ? '// timeline' : 'Timeline'}
                </span>

                <div className="space-y-6">
                  {timeline.map((exp, i) => (
                    <div key={i}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#ff3333] mt-1.5 flex-shrink-0" />
                        <div>
                          <h4 className={`font-mono text-sm font-bold ${isTerminal ? 'text-white' : 'text-black'
                            }`}>
                            {exp.role}
                          </h4>
                          {exp.company && (
                            <p className={`font-mono text-xs ${isTerminal ? 'text-[#888]' : 'text-[#555]'
                              }`}>
                              {exp.company}
                            </p>
                          )}
                          {exp.period && (
                            <span className={`font-mono text-[10px] inline-block mt-1 px-2 py-0.5 border ${isTerminal ? 'border-white/20 text-[#888]' : 'border-black/20 text-[#555]'
                              }`}>
                              {exp.period}
                            </span>
                          )}
                        </div>
                      </div>
                      {i < timeline.length - 1 && (
                        <div className={`ml-[3px] w-px h-4 mt-2 ${isTerminal ? 'bg-[#ff3333]/30' : 'bg-black/20'
                          }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
