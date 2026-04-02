import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Mode = 'terminal' | 'human'

interface ModeContextType {
    mode: Mode
    setMode: (mode: Mode) => void
    toggleMode: () => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<Mode>(() => {
        const saved = localStorage.getItem('portfolio-mode')
        return (saved === 'human' || saved === 'terminal') ? saved : 'terminal'
    })

    const setMode = (newMode: Mode) => {
        setModeState(newMode)
        localStorage.setItem('portfolio-mode', newMode)
    }

    const toggleMode = () => {
        setMode(mode === 'terminal' ? 'human' : 'terminal')
    }

    // Apply body class
    useEffect(() => {
        document.body.classList.remove('mode-terminal', 'mode-human')
        document.body.classList.add(`mode-${mode}`)
    }, [mode])

    return (
        <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    )
}

export function useModeContext() {
    const context = useContext(ModeContext)
    if (!context) {
        throw new Error('useModeContext must be used within a ModeProvider')
    }
    return context
}
