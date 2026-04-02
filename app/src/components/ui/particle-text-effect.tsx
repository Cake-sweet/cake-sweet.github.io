import { useEffect, useRef, useCallback } from "react"

interface Vector2D {
    x: number
    y: number
}

interface RGB {
    r: number
    g: number
    b: number
}

class Particle {
    pos: Vector2D = { x: 0, y: 0 }
    vel: Vector2D = { x: 0, y: 0 }
    acc: Vector2D = { x: 0, y: 0 }
    target: Vector2D = { x: 0, y: 0 }

    closeEnoughTarget = 100
    maxSpeed = 1.0
    maxForce = 0.1
    particleSize = 10
    isKilled = false

    startColor: RGB = { r: 0, g: 0, b: 0 }
    targetColor: RGB = { r: 0, g: 0, b: 0 }
    colorWeight = 0
    colorBlendRate = 0.01

    move() {
        let proximityMult = 1
        const dx = this.pos.x - this.target.x
        const dy = this.pos.y - this.target.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.closeEnoughTarget) {
            proximityMult = distance / this.closeEnoughTarget
        }

        const toX = this.target.x - this.pos.x
        const toY = this.target.y - this.pos.y
        const mag = Math.sqrt(toX * toX + toY * toY)

        let steerX = 0
        let steerY = 0
        if (mag > 0) {
            const desiredX = (toX / mag) * this.maxSpeed * proximityMult
            const desiredY = (toY / mag) * this.maxSpeed * proximityMult
            steerX = desiredX - this.vel.x
            steerY = desiredY - this.vel.y

            const steerMag = Math.sqrt(steerX * steerX + steerY * steerY)
            if (steerMag > 0) {
                steerX = (steerX / steerMag) * this.maxForce
                steerY = (steerY / steerMag) * this.maxForce
            }
        }

        this.acc.x += steerX
        this.acc.y += steerY
        this.vel.x += this.acc.x
        this.vel.y += this.acc.y
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.acc.x = 0
        this.acc.y = 0
    }

    draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
        if (this.colorWeight < 1.0) {
            this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
        }

        const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
        const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
        const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)

        ctx.fillStyle = `rgb(${r},${g},${b})`

        if (drawAsPoints) {
            ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
        } else {
            ctx.beginPath()
            ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    kill(width: number, height: number) {
        if (!this.isKilled) {
            const randomPos = generateRandomPos(width / 2, height / 2, (width + height) / 2)
            this.target.x = randomPos.x
            this.target.y = randomPos.y

            this.startColor = this.currentColor()
            this.targetColor = { r: 0, g: 0, b: 0 }
            this.colorWeight = 0
            this.isKilled = true
        }
    }

    currentColor(): RGB {
        return {
            r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
            g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
            b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
        }
    }
}

function generateRandomPos(x: number, y: number, mag: number): Vector2D {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500
    const dirX = randomX - x
    const dirY = randomY - y
    const magnitude = Math.sqrt(dirX * dirX + dirY * dirY)
    if (magnitude > 0) {
        return {
            x: x + (dirX / magnitude) * mag,
            y: y + (dirY / magnitude) * mag,
        }
    }
    return { x, y }
}

// Neo-Brutalist color palette
const THEME_COLORS: RGB[] = [
    { r: 255, g: 51, b: 51 },    // #ff3333 — primary red
    { r: 0, g: 102, b: 255 },    // #0066ff — accent blue
    { r: 255, g: 255, b: 0 },    // #ffff00 — secondary yellow
]

interface ParticleTextEffectProps {
    /** Whether the app is in terminal mode */
    isTerminal?: boolean
    /** Array of words/phrases to cycle through */
    words?: string[]
    /** Font size for the text (CSS string like "bold 100px Arial") */
    font?: string
    /** Step size for pixel sampling — higher = fewer particles = better perf */
    pixelSteps?: number
    /** Whether to draw particles as 2px points (true) or circles (false) */
    drawAsPoints?: boolean
    /** Interval between word changes in frames (at ~60fps, 240 = ~4s) */
    changeInterval?: number
    /** Custom color palette for particles */
    colors?: RGB[]
    /** Additional CSS class names for the canvas wrapper */
    className?: string
}

const DEFAULT_WORDS = ["FULLY", "INTEGRATED", "FULL-STACK + AI"]

export function ParticleTextEffect({
    isTerminal = true,
    words = DEFAULT_WORDS,
    font = "bold 80px 'Space Grotesk', Arial, sans-serif",
    pixelSteps = 6,
    drawAsPoints = true,
    changeInterval = 240,
    colors = THEME_COLORS,
    className = "",
}: ParticleTextEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)
    const particlesRef = useRef<Particle[]>([])
    const frameCountRef = useRef(0)
    const wordIndexRef = useRef(0)
    const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })
    const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null)

    // New refs for scroll behavior
    const isActiveRef = useRef(false)
    const hasLeftViewportRef = useRef(false)

    const getRandomColor = useCallback((): RGB => {
        return colors[Math.floor(Math.random() * colors.length)]
    }, [colors])

    const nextWord = useCallback(
        (word: string, canvas: HTMLCanvasElement) => {
            // Reuse or create offscreen canvas
            if (!offscreenCanvasRef.current) {
                offscreenCanvasRef.current = document.createElement("canvas")
            }

            const offscreen = offscreenCanvasRef.current
            offscreen.width = canvas.width
            offscreen.height = canvas.height
            const offCtx = offscreen.getContext("2d", { willReadFrequently: true })!

            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.fillStyle = "white"
            offCtx.font = font
            offCtx.textAlign = "center"
            offCtx.textBaseline = "middle"
            offCtx.fillText(word, canvas.width / 2, canvas.height / 2)

            const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height)
            const pixels = imageData.data

            const newColor = getRandomColor()
            const particles = particlesRef.current
            let particleIndex = 0

            // Collect opaque pixel coords
            const coords: number[] = []
            for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
                if (pixels[i + 3] > 0) {
                    coords.push(i)
                }
            }

            // Shuffle for organic motion
            for (let i = coords.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                    ;[coords[i], coords[j]] = [coords[j], coords[i]]
            }

            for (const pixelIndex of coords) {
                const idx = pixelIndex / 4
                const x = idx % canvas.width
                const y = Math.floor(idx / canvas.width)

                let particle: Particle

                if (particleIndex < particles.length) {
                    particle = particles[particleIndex]
                    particle.isKilled = false
                } else {
                    particle = new Particle()
                    const randomPos = generateRandomPos(
                        canvas.width / 2,
                        canvas.height / 2,
                        (canvas.width + canvas.height) / 2
                    )
                    particle.pos.x = randomPos.x
                    particle.pos.y = randomPos.y
                    particle.maxSpeed = Math.random() * 6 + 4
                    particle.maxForce = particle.maxSpeed * 0.05
                    particle.particleSize = Math.random() * 6 + 6
                    particle.colorBlendRate = Math.random() * 0.0275 + 0.0025
                    particles.push(particle)
                }

                particle.startColor = particle.currentColor()
                particle.targetColor = newColor
                particle.colorWeight = 0
                particle.target.x = x
                particle.target.y = y
                particleIndex++
            }

            // Kill remaining unused particles
            for (let i = particleIndex; i < particles.length; i++) {
                particles[i].kill(canvas.width, canvas.height)
            }
        },
        [font, pixelSteps, getRandomColor]
    )

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Responsive sizing based on container
        const resizeCanvas = () => {
            const parent = canvas.parentElement
            if (!parent) return

            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const rect = parent.getBoundingClientRect()
            const w = Math.floor(rect.width)
            const h = Math.floor(rect.height)

            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`

            const ctx = canvas.getContext("2d")
            if (ctx) {
                ctx.scale(dpr, dpr)
            }

            // Re-render current word after resize if active
            if (isActiveRef.current) {
                nextWord(words[wordIndexRef.current], canvas)
            }
        }

        resizeCanvas()

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas()
        })
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement)
        }

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    hasLeftViewportRef.current = true
                } else if (entry.isIntersecting && hasLeftViewportRef.current) {
                    if (!isActiveRef.current) {
                        isActiveRef.current = true
                        if (canvasRef.current) {
                            nextWord(words[wordIndexRef.current], canvasRef.current)
                        }
                    }
                }
            })
        }, { threshold: 0 })

        if (canvas.parentElement) {
            intersectionObserver.observe(canvas.parentElement)
        }

        const animate = () => {
            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const particles = particlesRef.current

            // Only draw background blur if particles exist or active
            if (particles.length > 0 || isActiveRef.current) {
                // Motion blur background
                ctx.fillStyle = isTerminal ? "rgba(5, 5, 5, 0.12)" : "rgba(245, 240, 232, 0.12)"
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            }

            // Update & draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i]
                p.move()
                p.draw(ctx, drawAsPoints)

                if (p.isKilled) {
                    if (p.pos.x < -50 || p.pos.x > canvas.width + 50 || p.pos.y < -50 || p.pos.y > canvas.height + 50) {
                        particles.splice(i, 1)
                    }
                }
            }

            // Mouse interaction (right-click destroy)
            if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
                for (const p of particles) {
                    const dx = p.pos.x - mouseRef.current.x
                    const dy = p.pos.y - mouseRef.current.y
                    if (dx * dx + dy * dy < 2500) {
                        p.kill(canvas.width, canvas.height)
                    }
                }
            }

            // Auto-cycle words
            if (isActiveRef.current) {
                frameCountRef.current++
                if (frameCountRef.current % changeInterval === 0) {
                    wordIndexRef.current = (wordIndexRef.current + 1) % words.length
                    nextWord(words[wordIndexRef.current], canvas)
                }
            }

            animationRef.current = requestAnimationFrame(animate)
        }

        // Just start animation loop, initialization is handled by IntersectionObserver
        animationRef.current = requestAnimationFrame(animate)

        // Mouse handlers
        const handleMouseDown = (e: MouseEvent) => {
            mouseRef.current.isPressed = true
            mouseRef.current.isRightClick = e.button === 2
            const rect = canvas.getBoundingClientRect()
            mouseRef.current.x = e.clientX - rect.left
            mouseRef.current.y = e.clientY - rect.top
        }

        const handleMouseUp = () => {
            mouseRef.current.isPressed = false
            mouseRef.current.isRightClick = false
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current.x = e.clientX - rect.left
            mouseRef.current.y = e.clientY - rect.top
        }

        const handleContextMenu = (e: MouseEvent) => e.preventDefault()

        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("mouseup", handleMouseUp)
        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("contextmenu", handleContextMenu)

        return () => {
            cancelAnimationFrame(animationRef.current)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
            canvas.removeEventListener("mousedown", handleMouseDown)
            canvas.removeEventListener("mouseup", handleMouseUp)
            canvas.removeEventListener("mousemove", handleMouseMove)
            canvas.removeEventListener("contextmenu", handleContextMenu)
        }
    }, [words, drawAsPoints, changeInterval, nextWord])

    return (
        <div className={`relative w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ display: "block" }}
            />
        </div>
    )
}
