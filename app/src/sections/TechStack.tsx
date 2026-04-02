import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeContext } from '@/context/ModeContext'

gsap.registerPlugin(ScrollTrigger)

const techBands = [
  { direction: 'left', items: ['React', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'TypeScript', 'Next.js'] },
  { direction: 'right', items: ['OpenCV', 'MediaPipe', 'Docker', 'GitHub Actions', 'GraphQL'] },
  { direction: 'left', items: ['ESP32', 'MQTT', 'WebSockets', 'Tailwind CSS', 'Figma', 'Linux', 'Git', 'REST APIs'] },
]

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const marqueesRef = useRef<HTMLDivElement>(null)
  const { mode } = useModeContext()
  const isTerminal = mode === 'terminal'

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const marquees = marqueesRef.current
    if (!section || !heading || !marquees) return

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 55%', scrub: true }
        }
      )
      const bands = marquees.querySelectorAll('.marquee-band')
      gsap.fromTo(bands,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 40%', scrub: true }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stack"
      className={`relative w-full py-20 md:py-28 overflow-hidden ${isTerminal ? 'bg-[#0A0A0A]' : 'bg-[#F5F0E8]'
        }`}
    >
      <div className="relative z-10 px-6 md:px-[6vw]">
        <div className="max-w-[1600px] mx-auto">

          {/* Heading + Metric */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12 md:mb-16">
            <div ref={headingRef} className="lg:w-1/2">
              <span className={`font-mono text-xs uppercase tracking-[0.12em] block mb-3 ${isTerminal ? 'text-[#ff3333]' : 'text-[#666]'
                }`}>
                {isTerminal ? '// technologies' : 'Technologies'}
              </span>
              <h2 className={`font-sans font-[800] text-3xl md:text-4xl lg:text-5xl mb-4 ${isTerminal ? 'text-white' : 'text-black'
                }`}>
                Stack & Tooling
              </h2>
              <p className={`font-mono text-sm leading-relaxed max-w-md ${isTerminal ? 'text-[#888]' : 'text-[#555]'
                }`}>
                {isTerminal
                  ? '> A tight set of tools I use to ship fast and keep systems reliable.'
                  : 'A tight set of tools I use to ship fast and keep systems reliable.'
                }
              </p>
            </div>

            {/* Language preference card */}
            <div className="lg:w-1/2 lg:flex lg:justify-end">
              <div className={`w-full max-w-sm p-5 md:p-6 border-2 ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
                }`} style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}>
                <span className={`font-mono text-[10px] uppercase tracking-[0.12em] block mb-5 ${isTerminal ? 'text-[#ff3333]' : 'text-[#666]'
                  }`}>
                  {isTerminal ? '// language_preference' : 'Language Preference'}
                </span>
                <div className="space-y-4 font-mono text-sm">
                  {[
                    { label: 'Primary', value: 'Python', color: '#ff3333' },
                    { label: 'Secondary', value: 'JavaScript', color: '#ffff00' },
                    { label: 'Systems', value: 'C / C++', color: '#0066ff' },
                  ].map((lang, i) => (
                    <div key={i}>
                      <div className="flex justify-between">
                        <span className={isTerminal ? 'text-[#888]' : 'text-[#666]'}>{lang.label}</span>
                        <span style={{ color: lang.color }}>{lang.value}</span>
                      </div>
                      {i < 2 && <div className={`h-px mt-4 ${isTerminal ? 'bg-white/10' : 'bg-black/10'}`} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Marquee bands — no edge blur, hard clip */}
          <div ref={marqueesRef} className="space-y-4 md:space-y-5 overflow-hidden">
            {techBands.map((band, index) => (
              <div key={index} className="marquee-band overflow-hidden py-2">
                <div
                  className={`flex gap-3 md:gap-4 ${band.direction === 'left' ? 'marquee-left' : 'marquee-right'
                    }`}
                  style={{ width: 'fit-content' }}
                >
                  {[...band.items, ...band.items].map((item, i) => (
                    <span key={i} className="tech-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal code block */}
          <div className="mt-12 md:mt-16 max-w-2xl mx-auto lg:mx-0">
            <div className={`p-4 md:p-5 border-2 font-mono text-xs md:text-sm ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
              }`} style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#ff3333]" />
                <div className="w-3 h-3 bg-[#ffff00]" />
                <div className="w-3 h-3 bg-[#00ff9d]" />
                <span className={`ml-2 text-xs ${isTerminal ? 'text-[#888]' : 'text-[#666]'}`}>
                  terminal — zsh
                </span>
              </div>
              <div className={`space-y-2 ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
                <p><span className="text-[#ff3333]">$</span> vidhu.get_stack()</p>
                <pre className={`whitespace-pre-wrap break-words ${isTerminal ? 'text-white' : 'text-black'}`}>{`{
  "frontend": ["React", "TypeScript", "Tailwind"],
  "backend": ["Node.js", "Python", "FastAPI"],
  "ai_cv": ["OpenCV", "MediaPipe", "TensorFlow"],
  "hardware": ["ESP32", "MQTT", "IoT"]
}`}</pre>
                <p className="text-[#00ff9d] mt-2">// Stack loaded successfully ✓</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
