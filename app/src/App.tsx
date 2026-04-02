import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

import { ModeProvider } from './context/ModeContext'
import SystemStatusBar from './components/SystemStatusBar'
import ModeToggle from './components/ModeToggle'
import GhostCursor from './components/GhostCursor'

import Hero from './sections/Hero'
import ProjectBento from './sections/ProjectBento'
import TechStack from './sections/TechStack'
import LiveStatus from './sections/LiveStatus'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Navigation from './sections/Navigation'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set terminal mode as default on body
    document.body.classList.add('mode-terminal')

    const timer = setTimeout(() => {
      setIsLoaded(true)
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ModeProvider>
      <div className="relative min-h-screen">
        {/* System status bar — very top */}
        <SystemStatusBar />

        {/* Mode toggle */}
        <ModeToggle />

        {/* Ghost cursor easter egg */}
        <GhostCursor />

        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main>
          <Hero isLoaded={isLoaded} />
          <ProjectBento />
          <TechStack />
          <LiveStatus />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </ModeProvider>
  )
}

export default App
