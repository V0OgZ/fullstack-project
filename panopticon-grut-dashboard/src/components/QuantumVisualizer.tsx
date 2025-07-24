import React, { useState, useEffect, useRef } from 'react'
import { Activity, Zap, Eye, BarChart3, RefreshCw, Play, Pause } from 'lucide-react'
import GrutApiService from '../services/grutApiService'

// Types pour la visualisation quantique
interface PsiState {
  id: string
  amplitude: ComplexNumber
  phase: number
  probability: number
  position: { x: number; y: number }
  state: 'superposition' | 'collapsed' | 'entangled'
  timeline: number
}

interface ComplexNumber {
  real: number
  imaginary: number
  magnitude: number
}

interface QuantumInterference {
  id: string
  state1: string
  state2: string
  type: 'constructive' | 'destructive'
  strength: number
  frequency: number
}

interface QuantumVisualizerProps {
  isVisible: boolean
}

const QuantumVisualizer: React.FC<QuantumVisualizerProps> = ({ isVisible }) => {
  const [psiStates, setPsiStates] = useState<PsiState[]>([])
  const [interferences, setInterferences] = useState<QuantumInterference[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [viewMode, setViewMode] = useState<'amplitude' | 'phase' | 'probability' | 'interference'>('amplitude')
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Générer des états quantiques simulés
  useEffect(() => {
    if (isVisible) {
      generateMockQuantumStates()
      startQuantumAnimation()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible])

  const generateMockQuantumStates = () => {
    const states: PsiState[] = []
    
    for (let i = 0; i < 12; i++) {
      const real = (Math.random() - 0.5) * 2
      const imaginary = (Math.random() - 0.5) * 2
      const magnitude = Math.sqrt(real * real + imaginary * imaginary)
      
      states.push({
        id: `ψ${String(i + 1).padStart(3, '0')}`,
        amplitude: {
          real,
          imaginary,
          magnitude
        },
        phase: Math.atan2(imaginary, real),
        probability: magnitude * magnitude,
        position: {
          x: 100 + (i % 4) * 150,
          y: 100 + Math.floor(i / 4) * 120
        },
        state: ['superposition', 'collapsed', 'entangled'][Math.floor(Math.random() * 3)] as any,
        timeline: Math.floor(Math.random() * 3) + 1
      })
    }
    
    setPsiStates(states)
    
    // Générer interférences
    const interferenceList: QuantumInterference[] = []
    for (let i = 0; i < 6; i++) {
      const state1 = states[Math.floor(Math.random() * states.length)]
      const state2 = states[Math.floor(Math.random() * states.length)]
      
      if (state1.id !== state2.id) {
        interferenceList.push({
          id: `INT_${i + 1}`,
          state1: state1.id,
          state2: state2.id,
          type: Math.random() > 0.5 ? 'constructive' : 'destructive',
          strength: Math.random() * 0.8 + 0.2,
          frequency: Math.random() * 2 + 0.5
        })
      }
    }
    
    setInterferences(interferenceList)
  }

  const startQuantumAnimation = () => {
    const animate = (timestamp: number) => {
      updateQuantumStates(timestamp)
      drawQuantumVisualization(timestamp)
      
      if (isRunning) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  const updateQuantumStates = (timestamp: number) => {
    setPsiStates(prevStates => 
      prevStates.map(state => {
        // Évolution temporelle des amplitudes
        const time = timestamp * 0.001
        const evolution = Math.sin(time * state.timeline * 0.5) * 0.1
        
        const newReal = state.amplitude.real + evolution
        const newImaginary = state.amplitude.imaginary + Math.cos(time * state.timeline * 0.3) * 0.05
        const newMagnitude = Math.sqrt(newReal * newReal + newImaginary * newImaginary)
        
        return {
          ...state,
          amplitude: {
            real: newReal,
            imaginary: newImaginary,
            magnitude: newMagnitude
          },
          phase: Math.atan2(newImaginary, newReal),
          probability: newMagnitude * newMagnitude
        }
      })
    )
  }

  const drawQuantumVisualization = (timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear canvas avec effet de trail
    ctx.fillStyle = 'rgba(26, 26, 46, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Dessiner les interférences
    if (viewMode === 'interference') {
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.3)'
      ctx.lineWidth = 1
      
      interferences.forEach(interference => {
        const state1 = psiStates.find(s => s.id === interference.state1)
        const state2 = psiStates.find(s => s.id === interference.state2)
        
        if (state1 && state2) {
          ctx.beginPath()
          ctx.moveTo(state1.position.x, state1.position.y)
          ctx.lineTo(state2.position.x, state2.position.y)
          
          // Effet d'ondulation
          const wave = Math.sin(timestamp * 0.01 * interference.frequency) * interference.strength
          ctx.strokeStyle = interference.type === 'constructive' 
            ? `rgba(0, 255, 127, ${0.5 + wave * 0.3})`
            : `rgba(255, 71, 87, ${0.5 + wave * 0.3})`
          
          ctx.stroke()
        }
      })
    }
    
    // Dessiner les états ψ
    psiStates.forEach(state => {
      const { x, y } = state.position
      let radius: number
      let color: string
      
      switch (viewMode) {
        case 'amplitude':
          radius = state.amplitude.magnitude * 30 + 10
          color = `hsl(200, 100%, ${50 + state.amplitude.magnitude * 30}%)`
          break
        case 'phase':
          radius = 25
          const hue = (state.phase + Math.PI) / (2 * Math.PI) * 360
          color = `hsl(${hue}, 80%, 60%)`
          break
        case 'probability':
          radius = state.probability * 40 + 8
          color = `rgba(255, 215, 0, ${state.probability * 0.8 + 0.2})`
          break
        default:
          radius = 20
          color = '#00bfff'
      }
      
      // Cercle principal
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      
      // Effet de glow
      ctx.shadowColor = color
      ctx.shadowBlur = 15
      ctx.fill()
      ctx.shadowBlur = 0
      
      // Border selon l'état
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.lineWidth = 2
      
      switch (state.state) {
        case 'superposition':
          ctx.strokeStyle = '#00bfff'
          ctx.setLineDash([5, 5])
          break
        case 'collapsed':
          ctx.strokeStyle = '#ff4757'
          ctx.setLineDash([])
          break
        case 'entangled':
          ctx.strokeStyle = '#ffd700'
          ctx.setLineDash([2, 2])
          break
      }
      
      ctx.stroke()
      ctx.setLineDash([])
      
      // Label de l'état
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(state.id, x, y - radius - 10)
      
      // Valeurs selon le mode
      let valueText = ''
      switch (viewMode) {
        case 'amplitude':
          valueText = `|${state.amplitude.magnitude.toFixed(2)}|`
          break
        case 'phase':
          valueText = `φ${(state.phase * 180 / Math.PI).toFixed(1)}°`
          break
        case 'probability':
          valueText = `P=${(state.probability * 100).toFixed(1)}%`
          break
      }
      
      if (valueText) {
        ctx.font = '10px monospace'
        ctx.fillStyle = '#a0a0a0'
        ctx.fillText(valueText, x, y + radius + 20)
      }
    })
  }

  const toggleAnimation = () => {
    setIsRunning(!isRunning)
    if (!isRunning) {
      startQuantumAnimation()
    }
  }

  if (!isVisible) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grut-card bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-blue-400">🌀 Visualiseur Quantique</h2>
              <p className="text-grut-text-dim">États ψ temps réel • Amplitudes complexes • Interférences</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAnimation}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isRunning 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={generateMockQuantumStates}
              className="flex items-center gap-2 px-4 py-2 bg-grut-primary text-black rounded-lg hover:bg-grut-primary/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Régénérer
            </button>
          </div>
        </div>
      </div>

      {/* Contrôles de visualisation */}
      <div className="grut-card">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Mode de visualisation
        </h3>
        
        <div className="flex gap-2 mb-4">
          {(['amplitude', 'phase', 'probability', 'interference'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === mode 
                  ? 'bg-grut-primary text-black' 
                  : 'bg-grut-surface text-grut-text hover:bg-grut-primary/20'
              }`}
            >
              {mode === 'amplitude' ? '📊 Amplitude' :
               mode === 'phase' ? '🌈 Phase' :
               mode === 'probability' ? '🎯 Probabilité' :
               '🌊 Interférences'}
            </button>
          ))}
        </div>
        
        <div className="text-sm text-grut-text-dim">
          {viewMode === 'amplitude' && '📊 Taille des cercles = magnitude des amplitudes complexes'}
          {viewMode === 'phase' && '🌈 Couleur des cercles = phase des états quantiques'}
          {viewMode === 'probability' && '🎯 Intensité = probabilité |ψ|² de mesure'}
          {viewMode === 'interference' && '🌊 Lignes = interférences constructives/destructives'}
        </div>
      </div>

      {/* Canvas principal */}
      <div className="grut-card">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full border border-grut-border rounded-lg bg-black/30"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* États quantiques détaillés */}
      <div className="grut-card">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          États Quantiques Actifs ({psiStates.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {psiStates.slice(0, 6).map((state) => (
            <div 
              key={state.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedState === state.id 
                  ? 'border-grut-primary bg-grut-primary/10' 
                  : 'border-grut-border bg-grut-surface hover:border-grut-primary/50'
              }`}
              onClick={() => setSelectedState(selectedState === state.id ? null : state.id)}
            >
              <div className="font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-grut-primary font-bold">{state.id}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    state.state === 'superposition' ? 'bg-blue-500/20 text-blue-400' :
                    state.state === 'collapsed' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {state.state}
                  </span>
                </div>
                
                <div className="space-y-1 text-xs text-grut-text-dim">
                  <div>Re: {state.amplitude.real.toFixed(3)}</div>
                  <div>Im: {state.amplitude.imaginary.toFixed(3)}</div>
                  <div>|ψ|: {state.amplitude.magnitude.toFixed(3)}</div>
                  <div>P: {(state.probability * 100).toFixed(1)}%</div>
                  <div>T: {state.timeline}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Légende */}
      <div className="grut-card bg-grut-surface/50">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4">🔮 Légende Quantique</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold text-grut-accent mb-2">États ψ :</div>
            <div className="space-y-1 text-grut-text-dim">
              <div>🔵 Trait pointillé = Superposition</div>
              <div>🔴 Trait plein = Collapse</div>
              <div>🟡 Trait hachuré = Intrication</div>
            </div>
          </div>
          
          <div>
            <div className="font-semibold text-grut-accent mb-2">Interférences :</div>
            <div className="space-y-1 text-grut-text-dim">
              <div>🟢 Vert = Constructive</div>
              <div>🔴 Rouge = Destructive</div>
              <div>↗️ Ondulation = Fréquence</div>
            </div>
          </div>
          
          <div>
            <div className="font-semibold text-grut-accent mb-2">Contrôles :</div>
            <div className="space-y-1 text-grut-text-dim">
              <div>▶️ Play/Pause = Animation</div>
              <div>🔄 Régénérer = Nouveaux états</div>
              <div>👁️ Modes = Visualisation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantumVisualizer 