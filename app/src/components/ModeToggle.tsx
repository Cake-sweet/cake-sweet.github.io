import { useModeContext } from '@/context/ModeContext'

export default function ModeToggle() {
    const { mode, setMode } = useModeContext()

    return (
        <div className="w-full flex justify-center py-4 bg-transparent z-[150]">
            <div className="flex border-2 border-black">
                <button
                    onClick={() => setMode('terminal')}
                    className={`px-6 py-2 font-mono text-xs uppercase tracking-[0.1em] border-r-2 border-black transition-none ${mode === 'terminal'
                            ? 'bg-black text-white shadow-brutal-red'
                            : 'bg-white text-black'
                        }`}
                    style={{
                        boxShadow: mode === 'terminal' ? '4px 4px 0px #ff3333' : 'none',
                    }}
                >
                    Terminal
                </button>
                <button
                    onClick={() => setMode('human')}
                    className={`px-6 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-none ${mode === 'human'
                            ? 'bg-black text-white'
                            : 'bg-white text-black'
                        }`}
                    style={{
                        boxShadow: mode === 'human' ? '4px 4px 0px #ff3333' : 'none',
                    }}
                >
                    Human
                </button>
            </div>
        </div>
    )
}
