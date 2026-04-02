import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeContext } from '@/context/ModeContext'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Status', href: '#status' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { mode } = useModeContext()
  const isTerminal = mode === 'terminal'

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    ScrollTrigger.create({
      trigger: 'body',
      start: '100vh top',
      onEnter: () => {
        setIsVisible(true)
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
      },
      onLeaveBack: () => {
        setIsVisible(false)
        gsap.to(nav, { y: -20, opacity: 0, duration: 0.3, ease: 'power2.out' })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === 'body') st.kill()
      })
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-10 left-0 right-0 z-[100] ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      style={{ transform: 'translateY(-20px)' }}
    >
      <div className="mx-4 mt-4">
        <div className={`max-w-7xl mx-auto px-6 py-3 border-2 ${isTerminal
            ? 'bg-black border-[#ff3333]'
            : 'bg-white border-black'
          }`} style={{
            boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000',
          }}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className={`font-mono text-sm ${isTerminal ? 'text-[#ff3333]' : 'text-black'
                }`}
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              {isTerminal ? '> vidhu_krishna' : 'Vidhu Krishna'}
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`font-mono text-xs uppercase tracking-[0.08em] ${isTerminal
                      ? 'text-[#888] hover:text-[#ff3333]'
                      : 'text-[#666] hover:text-black'
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="btn-brutal text-[10px] py-2 px-4"
            >
              {isTerminal ? 'CONNECT' : "LET'S TALK"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
