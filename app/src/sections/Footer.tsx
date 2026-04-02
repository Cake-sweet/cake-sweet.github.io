import { useEffect, useRef } from 'react'
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

const socialLinks = [
  { href: 'https://github.com/Cake-sweet', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/vidhu-krishna-s-2b2b243b6/', label: 'LinkedIn' },
  { href: 'mailto:[cakeissweet180@gmail.com]', label: 'Email' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const { mode } = useModeContext()
  const isTerminal = mode === 'terminal'

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      gsap.fromTo(footer,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: footer, start: 'top 95%', end: 'top 80%', scrub: true }
        }
      )
    }, footer)

    return () => ctx.revert()
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className={`relative w-full py-12 md:py-16 overflow-hidden ${isTerminal ? 'bg-black' : 'bg-white'
        }`}
    >
      {/* Top border */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${isTerminal ? 'bg-[#ff3333]' : 'bg-black'
        }`} />

      <div className="relative z-10 px-6 md:px-[6vw]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 md:gap-10">

            {/* Brand */}
            <div className="lg:w-1/3">
              <h3 className={`font-sans font-[800] text-xl md:text-2xl mb-2 ${isTerminal ? 'text-white' : 'text-black'
                }`}>
                {isTerminal ? '> vidhu_krishna_s' : 'Vidhu Krishna S'}
              </h3>
              <p className={`font-mono text-xs ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
                Full-Stack + AI. Built like a system.
              </p>
            </div>

            {/* Navigation */}
            <div className="lg:w-1/3 lg:flex lg:justify-center">
              <nav className="flex flex-wrap gap-4 md:gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`font-mono text-xs uppercase tracking-[0.08em] ${isTerminal ? 'text-[#888] hover:text-[#ff3333]' : 'text-[#666] hover:text-black'
                      }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div className="lg:w-1/3 lg:flex lg:justify-end">
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center border-2 font-mono text-xs ${isTerminal
                      ? 'border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333] hover:text-black'
                      : 'border-black text-black hover:bg-black hover:text-white'
                      }`}
                    style={{
                      boxShadow: isTerminal ? '2px 2px 0px #ff3333' : '2px 2px 0px #000',
                      transition: 'transform 0.1s, box-shadow 0.1s',
                    }}
                    aria-label={social.label}
                  >
                    {social.label.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className={`mt-10 md:mt-12 pt-6 border-t ${isTerminal ? 'border-[#ff3333]/30' : 'border-black/20'
            }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className={`font-mono text-xs ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
                © 2026 — Vidhu Krishna S
              </span>
              <span className={`font-mono text-xs ${isTerminal ? 'text-[#888]' : 'text-[#555]'}`}>
                Built with React + GSAP
              </span>
            </div>
          </div>

          {/* Terminal/Human sign-off */}
          <div className={`mt-6 md:mt-8 p-4 border-2 font-mono text-xs ${isTerminal
            ? 'bg-[#111] border-[#ff3333] text-[#888]'
            : 'bg-white border-black text-[#555]'
            }`} style={{ boxShadow: isTerminal ? '4px 4px 0px #ff3333' : '4px 4px 0px #000' }}>
            {isTerminal ? (
              <p>
                <span className="text-[#ff3333]">$</span> exit --graceful <span className="text-[#888]">// thanks for visiting</span>
              </p>
            ) : (
              <div>
                <p>Thanks for scrolling this far. I build things because problems are interesting,</p>
                <p className="mt-1">and because the best tools are the ones you can't stop thinking about.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
