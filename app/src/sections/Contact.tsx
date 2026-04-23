import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeContext } from '@/context/ModeContext'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const { mode } = useModeContext()
  const isTerminal = mode === 'terminal'

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [typewriterLines, setTypewriterLines] = useState<string[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const form = formRef.current
    if (!section || !heading || !form) return

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 60%', scrub: true }
        }
      )
      gsap.fromTo(form,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', end: 'top 50%', scrub: true }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Attempt to hit the backend
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Backend not active')

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Typewriter effect
      const lines = [
        '> Message received. Will respond within 24hrs.',
        '> Connection closed gracefully.',
        '> exit 0',
      ]
      for (let i = 0; i < lines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600))
        setTypewriterLines(prev => [...prev, lines[i]])
      }
    } catch (error) {
      setIsSubmitting(false)
      setIsSubmitted(true)

      const errorLines = [
        '> ERROR: BACKEND_INACTIVE',
        '> The mail server is currently sleeping or unresponsive.',
        '> Please reach out directly at cakeissweet180@gmail.com',
        '> exit 1',
      ]
      for (let i = 0; i < errorLines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600))
        setTypewriterLines(prev => [...prev, errorLines[i]])
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
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
              {isTerminal ? '// get_in_touch' : 'Get in Touch'}
            </span>
            <h2 className={`font-sans font-[800] text-3xl md:text-4xl lg:text-5xl mb-4 ${isTerminal ? 'text-white' : 'text-black'
              }`}>
              {isTerminal ? 'TRANSMIT' : "Let's Build"}<br />
              {isTerminal ? 'MESSAGE' : 'Together'}
            </h2>
            <p className={`font-mono text-sm leading-relaxed max-w-md ${isTerminal ? 'text-[#888]' : 'text-[#555]'
              }`}>
              {isTerminal
                ? '> Tell me what you\'re building. Response time: < 24hrs.'
                : "Tell me what you're building. I'll reply within 24 hours."
              }
            </p>

            <div className="mt-8 space-y-3 font-mono text-sm">
              <a href="mailto:cakeissweet180@gmail.com"
                className={`flex items-center gap-3 ${isTerminal ? 'text-[#888] hover:text-[#ff3333]' : 'text-[#666] hover:text-black'}`}>
                <span className="text-[#ff3333]">→</span>
                cakeissweet180@gmail.com
              </a>
              <a href="https://github.com/Cake-sweet" target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-3 ${isTerminal ? 'text-[#888] hover:text-[#ff3333]' : 'text-[#666] hover:text-black'}`}>
                <span className="text-[#0066ff]">→</span>
                github.com/vidhukrishnas(Cake-sweet)
              </a>
              <a href="https://www.linkedin.com/in/vidhu-krishna-s-2b2b243b6/" target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-3 ${isTerminal ? 'text-[#888] hover:text-[#ff3333]' : 'text-[#666] hover:text-black'}`}>
                <span className="text-[#ffff00]">→</span>
                linkedin.com/in/vidhukrishnas(vidhu-krishna-s)
              </a>
            </div>
          </div>

          {/* Right: terminal form */}
          <div ref={formRef} className="lg:w-1/2 max-w-lg">
            <div className={`p-6 border-2 ${isTerminal ? 'bg-[#111] border-[#ff3333]' : 'bg-white border-black'
              }`} style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-[#ff3333]" />
                <div className="w-3 h-3 bg-[#ffff00]" />
                <div className="w-3 h-3 bg-[#00ff9d]" />
                <span className={`font-mono text-[10px] ml-2 ${isTerminal ? 'text-[#888]' : 'text-[#666]'}`}>
                  contact_form.sh
                </span>
              </div>

              {isSubmitted ? (
                /* Success: typewriter response */
                <div className="font-mono text-sm space-y-2">
                  {typewriterLines.map((line, i) => (
                    <p key={i} className={i === 2 ? 'text-[#00ff9d]' : isTerminal ? 'text-white' : 'text-black'}>
                      {line}
                    </p>
                  ))}
                  {typewriterLines.length > 0 && (
                    <span className="inline-block w-2 h-4 bg-[#ff3333] animate-pulse" />
                  )}
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-0">
                  <div className="terminal-field">
                    <span className="prompt">root@portfolio:~$</span>
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} required
                      placeholder="enter your name"
                    />
                  </div>
                  <div className="terminal-field">
                    <span className="prompt">root@portfolio:~$</span>
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleChange} required
                      placeholder="enter your email"
                    />
                  </div>
                  <div className="terminal-field">
                    <span className="prompt">root@portfolio:~$</span>
                    <textarea
                      name="message" value={formData.message}
                      onChange={handleChange} required rows={3}
                      placeholder="enter your message"
                      className="resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-brutal w-full mt-4 justify-center"
                  >
                    {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT_MESSAGE.exe'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
