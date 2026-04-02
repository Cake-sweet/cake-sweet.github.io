import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'
import { useModeContext } from '@/context/ModeContext'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'synapz',
    title: 'Synapz',
    description: 'Spaced repetition learning app with SRS algorithm for optimal memory retention',
    terminalDesc: '{ type: "SRS_ENGINE", users: "beta", stack: "React + Node + PostgreSQL" }',
    status: 'Backend Active',
    image: '/synapz.webp',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    featured: true,
    retentionData: [95, 82, 71, 88, 94],
    githubUrl: 'https://github.com/Cake-sweet/synapz',
  },
  {
    id: 'gesturevol',
    title: 'GestureMediaControl',
    description: 'Hand-tracking volume control with MediaPipe and OpenCV',
    terminalDesc: '{ type: "CV_INTERFACE", latency: "<100ms", landmarks: 21 }',
    status: 'Live Demo',
    image: '/gesturevol.jpg',
    tags: ['OpenCV', 'MediaPipe', 'Python'],
    featured: false,
    githubUrl: 'https://github.com/Cake-sweet/GestureMediaControl',
  },
  {
    id: 'esp32',
    title: 'ESP32 Monitor',
    description: 'Real-time sensor logging dashboard for IoT devices',
    terminalDesc: '{ type: "IOT_LOGGER", accuracy: "±0.5%", protocol: "MQTT" }',
    status: 'Hardware',
    image: '/esp32.jpg',
    tags: ['ESP32', 'MQTT', 'IoT'],
    featured: false,
  },
  {
    id: 'keraleeyam',
    title: 'Keraleeyam',
    description: 'University event portal with registration and scheduling for 500+ students',
    terminalDesc: '{ type: "EVENT_PORTAL", users: "500+", uptime: "100%", stack: "React + Node" }',
    status: 'Live',
    image: '/keraleeyam.webp',
    tags: ['Full-Stack', 'React', 'API'],
    featured: false,
    githubUrl: 'https://github.com/Cake-sweet/Keraleeyam-2026',
    liveUrl: 'https://keraleeyam-2026.vercel.app/',
  },
  {
    id: 'iris',
    title: 'IR!S Prototype',
    description: 'Fully automated attendance system upscaled via Seeed Studio Sense',
    terminalDesc: '{ type: "ATTENDANCE_SYSTEM", hardware: "Seeed Studio S3", status: "AI_UPSCALED" }',
    status: 'Prototype',
    image: '',
    tags: ['IoT', 'Computer Vision', 'Seed Studio'],
    featured: false,
    githubUrl: 'https://github.com/Cake-sweet/IRiS_prototype_1',
  }
]

// MediaPipe hand landmarks (21 points) scaled to 120x180 viewBox
const HAND_LANDMARKS = [
  [60, 170], // 0 wrist
  [48, 140], [42, 115], [38, 92], [34, 72], // 1-4 thumb
  [52, 85], [50, 58], [49, 38], [48, 20], // 5-8 index
  [62, 80], [62, 52], [62, 32], [62, 14], // 9-12 middle
  [74, 85], [76, 58], [77, 38], [78, 22], // 13-16 ring
  [86, 95], [90, 72], [92, 55], [94, 40], // 17-20 pinky
]

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17],
]

function ProjectLinks({ project, isTerminal }: { project: any; isTerminal: boolean }) {
  if (!project.githubUrl && !project.liveUrl) return null;

  return (
    <div className="flex gap-4 mt-4">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-brutal text-[10px] inline-flex items-center gap-1">
          <ExternalLink className="w-3 h-3" /> VIEW
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-brutal text-[10px] inline-flex items-center gap-1" style={{
          background: 'transparent',
          color: isTerminal ? '#fff' : '#000',
          boxShadow: isTerminal ? '4px 4px 0px #fff' : '4px 4px 0px #000',
        }}>
          <Github className="w-3 h-3" /> SOURCE
        </a>
      )}
    </div>
  )
}

export default function ProjectBento() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { mode } = useModeContext()
  const isTerminal = mode === 'terminal'

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current
    if (!section || !heading || !cards) return

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 60%', scrub: true }
        }
      )
      const cardElements = cards.querySelectorAll('.project-card-wrapper')
      cardElements.forEach((card) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 70%', scrub: true }
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full py-20 md:py-28 overflow-hidden ${isTerminal ? 'bg-[#0A0A0A]' : 'bg-[#F5F0E8]'
        }`}
    >
      <div className="relative z-10 px-6 md:px-[6vw]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section heading */}
          <div ref={headingRef} className="mb-12 md:mb-16">
            <span className={`font-mono text-xs uppercase tracking-[0.12em] block mb-3 ${isTerminal ? 'text-[#ff3333]' : 'text-[#666]'
              }`}>
              {isTerminal ? '// selected_work' : 'Selected Work'}
            </span>
            <h2 className={`font-sans font-[800] text-3xl md:text-4xl lg:text-5xl ${isTerminal ? 'text-white' : 'text-black'
              }`}>
              Projects
            </h2>
          </div>

          {/* Projects Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Featured — Synapz with SRS chart */}
            <div className="project-card-wrapper lg:col-span-2">
              <SynapzCard project={projects[0]} isTerminal={isTerminal} />
            </div>

            {/* GestureVol with hand SVG */}
            <div className="project-card-wrapper">
              <GestureCard project={projects[1]} isTerminal={isTerminal} />
            </div>

            {/* ESP32 */}
            <div className="project-card-wrapper">
              <ProjectCard project={projects[2]} isTerminal={isTerminal} />
            </div>

            {/* Keraleeyam with counter */}
            <div className="project-card-wrapper lg:col-span-2">
              <KeraleeyamCard project={projects[3]} isTerminal={isTerminal} />
            </div>

            {/* IR!S */}
            <div className="project-card-wrapper lg:col-span-2">
              <ProjectCard project={projects[4]} isTerminal={isTerminal} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Synapz Card with SRS Memory Chart ──────────────────────── */
function SynapzCard({ project, isTerminal }: { project: typeof projects[0]; isTerminal: boolean }) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const days = [1, 3, 7, 14, 30]
  const data = project.retentionData || [95, 82, 71, 88, 94]

  return (
    <div className={`card-brutal p-6 md:p-8 ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
      }`} style={{
        boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000',
      }}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Project info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h3 className={`font-sans font-[800] text-2xl ${isTerminal ? 'text-white' : 'text-black'}`}>
              {project.title}
            </h3>
            <span className={`font-mono text-[10px] uppercase px-2 py-1 border ${isTerminal ? 'border-[#00ff9d] text-[#00ff9d]' : 'border-black text-black'
              }`}>
              {project.status}
            </span>
          </div>
          <p className={`font-mono text-sm mb-4 ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
            {isTerminal ? project.terminalDesc : project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag: string) => (
              <span key={tag} className="tech-pill">{tag}</span>
            ))}
          </div>
          <ProjectLinks project={project} isTerminal={isTerminal} />
        </div>

        {/* Right: SRS Memory Chart */}
        <div className="w-full md:w-64 flex-shrink-0">
          <span className={`font-mono text-[9px] uppercase tracking-[0.12em] block mb-3 ${isTerminal ? 'text-[#ff3333]' : 'text-[#666]'
            }`}>
            MEMORY_STRENGTH.live
          </span>
          <div className="flex items-end gap-3 h-32">
            {data.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 relative"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {hoveredBar === i && (
                  <div className={`absolute -top-8 font-mono text-[9px] whitespace-nowrap px-2 py-1 border z-10 ${isTerminal ? 'bg-black border-[#ff3333] text-[#ff3333]' : 'bg-white border-black text-black'
                    }`}>
                    Day {days[i]} — {val}% retention
                  </div>
                )}
                <div
                  className="w-full"
                  style={{
                    height: `${val}%`,
                    background: '#ff3333',
                    transition: 'height 0.1s',
                  }}
                />
                <span className={`font-mono text-[8px] ${isTerminal ? 'text-[#888]' : 'text-[#666]'}`}>
                  D{days[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── GestureVol Card with Hand SVG ──────────────────────────── */
function GestureCard({ project, isTerminal }: { project: typeof projects[0]; isTerminal: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeDots, setActiveDots] = useState<number[]>([])

  useEffect(() => {
    if (!isHovered) {
      setActiveDots([])
      return
    }

    let i = 0
    const interval = setInterval(() => {
      if (i <= 20) {
        setActiveDots(prev => [...prev, i])
        i++
      } else {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isHovered])

  const COLORS = ['#ff3333', '#ffff00', '#0066ff']

  return (
    <div
      className={`card-brutal p-6 ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
        }`}
      style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Hand SVG */}
        <div className="w-32 h-48 flex-shrink-0">
          <svg viewBox="0 0 120 180" className="w-full h-full">
            {/* Connections */}
            {HAND_CONNECTIONS.map(([a, b], i) => (
              <line
                key={`line-${i}`}
                x1={HAND_LANDMARKS[a][0]} y1={HAND_LANDMARKS[a][1]}
                x2={HAND_LANDMARKS[b][0]} y2={HAND_LANDMARKS[b][1]}
                stroke={activeDots.includes(a) && activeDots.includes(b)
                  ? COLORS[a % 3]
                  : isTerminal ? '#222' : '#ddd'
                }
                strokeWidth={1.5}
                style={{ transition: 'stroke 0.3s' }}
              />
            ))}
            {/* Landmarks */}
            {HAND_LANDMARKS.map(([x, y], i) => (
              <circle
                key={`dot-${i}`}
                cx={x} cy={y}
                r={activeDots.includes(i) ? 4 : 2.5}
                fill={activeDots.includes(i) ? COLORS[i % 3] : isTerminal ? '#333' : '#ccc'}
                style={{ transition: 'fill 0.3s, r 0.1s' }}
              />
            ))}
          </svg>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className={`font-sans font-[800] text-xl mb-2 ${isTerminal ? 'text-white' : 'text-black'}`}>
            {project.title}
          </h3>
          <p className={`font-mono text-sm mb-3 ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
            {isTerminal ? project.terminalDesc : project.description}
          </p>
          <p className={`font-mono text-[10px] ${isTerminal ? 'text-[#ff3333]' : 'text-[#666]'}`}>
            21-point landmark tracking / &lt;100ms latency
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag: string) => (
              <span key={tag} className="tech-pill">{tag}</span>
            ))}
          </div>
          <ProjectLinks project={project} isTerminal={isTerminal} />
        </div>
      </div>
    </div>
  )
}

/* ─── Keraleeyam Card with Counter ───────────────────────────── */
function KeraleeyamCard({ project, isTerminal }: { project: typeof projects[0]; isTerminal: boolean }) {
  return (
    <div className={`card-brutal p-6 md:p-8 ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
      }`} style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-shrink-0 text-center md:text-left">
          <span className="font-sans font-[800] text-5xl md:text-6xl text-[#ff3333]">
            500+
          </span>
          <p className={`font-mono text-xs mt-2 ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
            active registrations
          </p>
          <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1 border ${isTerminal ? 'border-[#00ff9d] text-[#00ff9d]' : 'border-black text-black'
            } font-mono text-[9px] uppercase`}>
            <div className="w-2 h-2 bg-[#00ff9d] animate-pulse-dot" />
            LIVE
          </div>
        </div>
        <div className="flex-1">
          <h3 className={`font-sans font-[800] text-2xl mb-2 ${isTerminal ? 'text-white' : 'text-black'}`}>
            {project.title}
          </h3>
          <p className={`font-mono text-sm mb-4 ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
            {isTerminal ? project.terminalDesc : project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="tech-pill">{tag}</span>
            ))}
          </div>
          <ProjectLinks project={project} isTerminal={isTerminal} />
        </div>
      </div>
    </div>
  )
}

/* ─── Generic Project Card ───────────────────────────────────── */
function ProjectCard({ project, isTerminal }: { project: typeof projects[0]; isTerminal: boolean }) {
  return (
    <div className={`card-brutal p-6 ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
      }`} style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}>
      <div className="flex items-center gap-3 mb-3">
        <h3 className={`font-sans font-[800] text-xl ${isTerminal ? 'text-white' : 'text-black'}`}>
          {project.title}
        </h3>
        <span className={`font-mono text-[10px] uppercase px-2 py-1 border ${isTerminal ? 'border-[#ffff00] text-[#ffff00]' : 'border-black text-black'
          }`}>
          {project.status}
        </span>
      </div>
      <p className={`font-mono text-sm mb-4 ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
        {isTerminal ? project.terminalDesc : project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag: string) => (
          <span key={tag} className="tech-pill">{tag}</span>
        ))}
      </div>
      <ProjectLinks project={project} isTerminal={isTerminal} />
    </div>
  )
}
