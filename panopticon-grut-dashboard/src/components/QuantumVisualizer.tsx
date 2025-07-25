import React, { useState, useEffect, useRef } from 'react'

const QuantumVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [quantumState, setQuantumState] = useState({
    energy: 75,
    coherence: 85,
    entanglement: 92
  })

  useEffect(() => {
    if (!isAnimating) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw quantum particles
      const time = Date.now() * 0.001
      
      for (let i = 0; i < 20; i++) {
        const x = canvas.width / 2 + Math.sin(time + i) * (50 + i * 5)
        const y = canvas.height / 2 + Math.cos(time + i * 0.5) * (30 + i * 3)
        const size = 2 + Math.sin(time * 2 + i) * 1

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${120 + i * 10}, 100%, ${50 + Math.sin(time + i) * 20}%)`
        ctx.fill()

        // Draw connections
        if (i > 0) {
          const prevX = canvas.width / 2 + Math.sin(time + i - 1) * (50 + (i - 1) * 5)
          const prevY = canvas.height / 2 + Math.cos(time + (i - 1) * 0.5) * (30 + (i - 1) * 3)
          
          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(x, y)
          ctx.strokeStyle = `rgba(0, 255, 136, ${0.3 + Math.sin(time + i) * 0.2})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Update quantum states
      setQuantumState(prev => ({
        energy: 70 + Math.sin(time * 0.5) * 25,
        coherence: 80 + Math.cos(time * 0.7) * 15,
        entanglement: 85 + Math.sin(time * 0.3) * 10
      }))

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isAnimating])

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <button 
          className="grut-button" 
          onClick={() => setIsAnimating(!isAnimating)}
        >
          {isAnimating ? '⏸️ Pause' : '▶️ Play'} Animation
        </button>
      </div>

      <canvas 
        ref={canvasRef}
        width={350}
        height={200}
        style={{
          width: '100%',
          height: '200px',
          border: '1px solid var(--grut-primary)',
          borderRadius: '8px',
          background: 'rgba(10, 10, 10, 0.9)'
        }}
      />

      <div style={{ marginTop: '15px' }}>
        <div style={{ display: 'grid', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>⚡ Énergie Quantique:</span>
            <span style={{ color: 'var(--grut-secondary)' }}>
              {Math.round(quantumState.energy)}%
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🌊 Cohérence:</span>
            <span style={{ color: 'var(--grut-primary)' }}>
              {Math.round(quantumState.coherence)}%
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🔗 Entanglement:</span>
            <span style={{ color: 'var(--grut-quantum)' }}>
              {Math.round(quantumState.entanglement)}%
            </span>
          </div>
        </div>

        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          background: 'rgba(138, 43, 226, 0.1)', 
          borderRadius: '6px',
          textAlign: 'center',
          fontSize: '0.8rem'
        }}>
          🌀 État Quantique: {quantumState.energy > 80 ? 'OPTIMAL' : quantumState.energy > 60 ? 'STABLE' : 'INSTABLE'}
        </div>
      </div>
    </div>
  )
}

export default QuantumVisualizer 