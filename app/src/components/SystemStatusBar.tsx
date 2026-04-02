import { useEffect, useState } from 'react'
import { useModeContext } from '@/context/ModeContext'

export default function SystemStatusBar() {
    const { mode } = useModeContext()
    const [uptime, setUptime] = useState('00:00:00')

    useEffect(() => {
        let start = sessionStorage.getItem('session-start')
        if (!start) {
            start = String(Date.now())
            sessionStorage.setItem('session-start', start)
        }
        const startTime = Number(start)

        const tick = () => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000)
            const h = String(Math.floor(elapsed / 3600)).padStart(2, '0')
            const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')
            const s = String(elapsed % 60).padStart(2, '0')
            setUptime(`${h}:${m}:${s}`)
        }

        tick()
        const interval = setInterval(tick, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full h-10 bg-black flex items-center justify-between px-4 md:px-6 border-b-2 border-[#ff3333] font-mono text-[10px] text-[#00ff9d] z-[200] sticky top-0 select-none">
            {/* Left: Status */}
            <div className="flex items-center gap-2">
                <div
                    className="w-1.5 h-1.5 bg-[#00ff9d] animate-pulse-dot"
                    style={{ minWidth: 6, minHeight: 6 }}
                />
                <span className="hidden sm:inline">STATUS: FULLY_INTEGRATED</span>
                <span className="sm:hidden">ONLINE</span>
            </div>

            {/* Center: Mode-aware message */}
            <div className="hidden md:block text-center">
                {mode === 'terminal'
                    ? 'CURRENT_MODE: BUILDING_SYNAPZ'
                    : 'Currently building Synapz — a memory engine for students'
                }
            </div>

            {/* Right: Uptime + Location */}
            <div className="flex items-center gap-2">
                <span className="hidden sm:inline">UPTIME: {uptime}</span>
                <span className="sm:hidden">{uptime}</span>
                <span className="hidden lg:inline">|</span>
                <span className="hidden lg:inline">LOCATION: HYDERABAD, IN</span>
            </div>
        </div>
    )
}
