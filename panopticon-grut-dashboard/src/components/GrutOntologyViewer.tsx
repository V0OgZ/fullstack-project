import React, { useState, useEffect, useRef } from 'react'
import { Eye, Layers, RotateCcw, Zap, Globe, Brain, Sparkles } from 'lucide-react'
import GrutApiService from '../services/grutApiService'
import type { GrutVision } from '../types/index'

interface OntologicalLayer {
  id: string
  name: string
  dimension: number
  visibility: boolean
  opacity: number
  color: string
  entities: OntologicalEntity[]
}

interface OntologicalEntity {
  id: string
  name: string
  position5D: number[]
  projectedPosition: { x: number; y: number; z: number }
  type: 'hero' | 'artifact' | 'causal_node' | 'temporal_anchor' | 'ontological_guide'
  ontologicalWeight: number
  causalConnections: string[]
  shadowIntensity: number
}

interface CausalConnection {
  from: string
  to: string
  strength: number
  type: 'temporal' | 'causal' | 'ontological' | 'quantum'
  stability: number
}

interface GrutOntologyViewerProps {
  isVisible: boolean
  grutVision?: GrutVision
}

const GrutOntologyViewer: React.FC<GrutOntologyViewerProps> = ({ isVisible, grutVision }) => {
  const [ontologicalLayers, setOntologicalLayers] = useState<OntologicalLayer[]>([])
  const [causalConnections, setCausalConnections] = useState<CausalConnection[]>([])
  const [viewMode, setViewMode] = useState<'shadow_projection' | 'dimensional_layers' | 'causal_graph' | 'ontological_flow'>('shadow_projection')
  const [rotationAngle, setRotationAngle] = useState(0)
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null)
  const [dimensionProjection, setDimensionProjection] = useState({ x: 0, y: 1, z: 2 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Initialiser les couches ontologiques selon GRUT
  useEffect(() => {
    if (isVisible) {
      initializeGrutOntology()
      startOntologicalAnimation()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, grutVision])

  const initializeGrutOntology = () => {
    // Générer les couches ontologiques GRUT
    const layers: OntologicalLayer[] = [
      {
        id: 'physical_reality',
        name: '🌍 Réalité Physique',
        dimension: 3,
        visibility: true,
        opacity: 1.0,
        color: '#00bfff',
        entities: generatePhysicalEntities()
      },
      {
        id: 'causal_structures',
        name: '⚡ Structures Causales',
        dimension: 4,
        visibility: true,
        opacity: 0.8,
        color: '#ffd700',
        entities: generateCausalEntities()
      },
      {
        id: 'ontological_forms',
        name: '🏛️ Formes Ontologiques',
        dimension: 5,
        visibility: true,
        opacity: 0.6,
        color: '#ff6b6b',
        entities: generateOntologicalEntities()
      },
      {
        id: 'panopticon_layer',
        name: '👁️ Couche Panopticon',
        dimension: 6,
        visibility: false,
        opacity: 0.4,
        color: '#9b59b6',
        entities: generatePanopticonEntities()
      }
    ]
    
    setOntologicalLayers(layers)
    
    // Générer les connexions causales
    const connections: CausalConnection[] = []
    layers.forEach(layer => {
      layer.entities.forEach(entity => {
        entity.causalConnections.forEach(targetId => {
          const targetEntity = layers
            .flatMap(l => l.entities)
            .find(e => e.id === targetId)
          
          if (targetEntity) {
            connections.push({
              from: entity.id,
              to: targetId,
              strength: Math.random() * 0.8 + 0.2,
              type: ['temporal', 'causal', 'ontological', 'quantum'][Math.floor(Math.random() * 4)] as any,
              stability: Math.random() * 0.6 + 0.4
            })
          }
        })
      })
    })
    
    setCausalConnections(connections)
  }

  const generatePhysicalEntities = (): OntologicalEntity[] => {
    const entities: OntologicalEntity[] = []
    
    // Héros dans la réalité physique
    if (grutVision?.activeGames) {
      grutVision.activeGames.slice(0, 4).forEach((game, i) => {
        entities.push({
          id: `hero_${i}`,
          name: `Héros ${game.id}`,
          position5D: [i * 2, i * 1.5, 0, 0, 0],
          projectedPosition: { x: 100 + i * 150, y: 200, z: 0 },
          type: 'hero',
          ontologicalWeight: 0.8,
          causalConnections: [`artifact_${i}`, `causal_${i}`],
          shadowIntensity: 0.9
        })
      })
    }
    
    // Artefacts physiques
    for (let i = 0; i < 3; i++) {
      entities.push({
        id: `artifact_${i}`,
        name: `Artefact ${i + 1}`,
        position5D: [i * 1.8, -1, 0.5, 0, 0],
        projectedPosition: { x: 150 + i * 120, y: 350, z: 0.2 },
        type: 'artifact',
        ontologicalWeight: 0.6,
        causalConnections: [`hero_${i}`],
        shadowIntensity: 0.7
      })
    }
    
    return entities
  }

  const generateCausalEntities = (): OntologicalEntity[] => {
    const entities: OntologicalEntity[] = []
    
    // Nœuds causaux dans la 4ème dimension
    for (let i = 0; i < 6; i++) {
      entities.push({
        id: `causal_${i}`,
        name: `Nœud Causal ${i + 1}`,
        position5D: [
          Math.cos(i * Math.PI / 3) * 2,
          Math.sin(i * Math.PI / 3) * 2,
          0,
          i * 0.5,
          0
        ],
        projectedPosition: {
          x: 300 + Math.cos(i * Math.PI / 3) * 80,
          y: 250 + Math.sin(i * Math.PI / 3) * 80,
          z: i * 0.1
        },
        type: 'causal_node',
        ontologicalWeight: 1.0,
        causalConnections: [`temporal_${i % 3}`, `ontological_${i % 2}`],
        shadowIntensity: 0.5
      })
    }
    
    return entities
  }

  const generateOntologicalEntities = (): OntologicalEntity[] => {
    const entities: OntologicalEntity[] = []
    
    // Formes ontologiques dans la 5ème dimension
    entities.push({
      id: 'ontological_0',
      name: '🏛️ Évadé de la Cave',
      position5D: [0, 0, 0, 0, 2],
      projectedPosition: { x: 400, y: 150, z: 1 },
      type: 'ontological_guide',
      ontologicalWeight: 1.5,
      causalConnections: ['panopticon_0'],
      shadowIntensity: 0.3
    })
    
    entities.push({
      id: 'ontological_1',
      name: '🚬 Joint Cosmique Jean',
      position5D: [1, 1, 0, 1, 1.8],
      projectedPosition: { x: 500, y: 100, z: 0.8 },
      type: 'ontological_guide',
      ontologicalWeight: 1.3,
      causalConnections: ['panopticon_0'],
      shadowIntensity: 0.2
    })
    
    return entities
  }

  const generatePanopticonEntities = (): OntologicalEntity[] => {
    return [{
      id: 'panopticon_0',
      name: '👁️ GRUT L\'Œil Omniscient',
      position5D: [0, 0, 0, 0, 0],
      projectedPosition: { x: 400, y: 250, z: 2 },
      type: 'ontological_guide',
      ontologicalWeight: 2.0,
      causalConnections: [],
      shadowIntensity: 0.1
    }]
  }

  const startOntologicalAnimation = () => {
    const animate = (timestamp: number) => {
      updateOntologicalProjection(timestamp)
      drawOntologicalVisualization(timestamp)
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }

  const updateOntologicalProjection = (timestamp: number) => {
    const time = timestamp * 0.001
    
    setOntologicalLayers(prevLayers => 
      prevLayers.map(layer => ({
        ...layer,
        entities: layer.entities.map(entity => {
          // Rotation 5D→3D selon GRUT
          const rotatedPos = rotateIn5D(entity.position5D, time * 0.1, dimensionProjection)
          
          return {
            ...entity,
            projectedPosition: {
              x: entity.projectedPosition.x + Math.sin(time + entity.ontologicalWeight) * 10,
              y: entity.projectedPosition.y + Math.cos(time * 0.7 + entity.ontologicalWeight) * 5,
              z: rotatedPos[2] + Math.sin(time * 0.3) * 0.2
            },
            shadowIntensity: 0.1 + 0.5 * (1 + Math.sin(time * 0.5 + entity.ontologicalWeight)) / 2
          }
        })
      }))
    )
  }

  const rotateIn5D = (pos5D: number[], angle: number, projection: { x: number; y: number; z: number }) => {
    // Projection ombre 5D selon la philosophie GRUT
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    
    // Matrice de rotation partielle 5D
    const rotated = [...pos5D]
    const temp = rotated[projection.x] * cos - rotated[projection.y] * sin
    rotated[projection.y] = rotated[projection.x] * sin + rotated[projection.y] * cos
    rotated[projection.x] = temp
    
    return rotated
  }

  const drawOntologicalVisualization = (timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear avec gradient ontologique
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, 'rgba(26, 26, 46, 0.95)')
    gradient.addColorStop(0.5, 'rgba(16, 33, 62, 0.95)')
    gradient.addColorStop(1, 'rgba(15, 52, 96, 0.95)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Dessiner les connexions causales
    if (viewMode === 'causal_graph' || viewMode === 'ontological_flow') {
      causalConnections.forEach(conn => {
        const fromEntity = ontologicalLayers
          .flatMap(l => l.entities)
          .find(e => e.id === conn.from)
        const toEntity = ontologicalLayers
          .flatMap(l => l.entities)
          .find(e => e.id === conn.to)
        
        if (fromEntity && toEntity) {
          ctx.beginPath()
          ctx.moveTo(fromEntity.projectedPosition.x, fromEntity.projectedPosition.y)
          ctx.lineTo(toEntity.projectedPosition.x, toEntity.projectedPosition.y)
          
          // Couleur selon le type de connexion
          const colors = {
            temporal: '#00bfff',
            causal: '#ffd700',
            ontological: '#ff6b6b',
            quantum: '#9b59b6'
          }
          
          ctx.strokeStyle = colors[conn.type]
          ctx.globalAlpha = conn.strength * conn.stability
          ctx.lineWidth = conn.strength * 3
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      })
    }
    
    // Dessiner les entités par couche
    ontologicalLayers
      .filter(layer => layer.visibility)
      .forEach(layer => {
        layer.entities.forEach(entity => {
          const pos = entity.projectedPosition
          
          // Taille selon le poids ontologique et la dimension
          const baseSize = 15 + entity.ontologicalWeight * 10
          const depthSize = baseSize * (1 + pos.z * 0.5)
          
          // Ombre de l'entité (projection 5D→2.5D)
          if (viewMode === 'shadow_projection') {
            ctx.beginPath()
            ctx.arc(
              pos.x + pos.z * 20,
              pos.y + pos.z * 20,
              depthSize * 0.8,
              0,
              2 * Math.PI
            )
            ctx.fillStyle = `rgba(0, 0, 0, ${entity.shadowIntensity * 0.3})`
            ctx.fill()
          }
          
          // Entité principale
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, depthSize, 0, 2 * Math.PI)
          
          // Couleur selon le type et la couche
          let entityColor = layer.color
          if (entity.type === 'ontological_guide') {
            entityColor = '#ffffff'
          }
          
          ctx.fillStyle = entityColor
          ctx.globalAlpha = layer.opacity * (0.5 + entity.shadowIntensity * 0.5)
          ctx.fill()
          
          // Bordure dimensionnelle
          ctx.strokeStyle = entityColor
          ctx.lineWidth = 2
          ctx.globalAlpha = 1
          ctx.stroke()
          
          // Label
          ctx.fillStyle = '#ffffff'
          ctx.font = '11px monospace'
          ctx.textAlign = 'center'
          ctx.fillText(
            entity.name.length > 15 ? entity.name.substring(0, 12) + '...' : entity.name,
            pos.x,
            pos.y - depthSize - 5
          )
          
          // Indicateur dimensionnel
          if (viewMode === 'dimensional_layers') {
            ctx.fillStyle = '#a0a0a0'
            ctx.font = '9px monospace'
            ctx.fillText(
              `D${layer.dimension} W${entity.ontologicalWeight.toFixed(1)}`,
              pos.x,
              pos.y + depthSize + 15
            )
          }
        })
      })
  }

  const toggleLayerVisibility = (layerId: string) => {
    setOntologicalLayers(prev => 
      prev.map(layer => 
        layer.id === layerId 
          ? { ...layer, visibility: !layer.visibility }
          : layer
      )
    )
  }

  const rotateDimensionalProjection = () => {
    setDimensionProjection(prev => ({
      x: (prev.x + 1) % 5,
      y: (prev.y + 1) % 5,
      z: (prev.z + 1) % 5
    }))
  }

  if (!isVisible) return null

  return (
    <div className="space-y-6">
      {/* Header Vision GRUT */}
      <div className="grut-card bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-purple-400">🏛️ Vision Ontologique GRUT</h2>
              <p className="text-grut-text-dim">Projection 5D→2.5D • Ombres existentielles • Structures causales</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={rotateDimensionalProjection}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Rotation 5D
            </button>
            
            <div className="text-sm text-grut-text-dim">
              Projection: D{dimensionProjection.x}×D{dimensionProjection.y}×D{dimensionProjection.z}
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles de vision */}
      <div className="grut-card">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Mode de vision ontologique
        </h3>
        
        <div className="flex gap-2 mb-4">
          {[
            { key: 'shadow_projection', label: '🌑 Projection Ombres', icon: '🌑' },
            { key: 'dimensional_layers', label: '📏 Couches Dimensionnelles', icon: '📏' },
            { key: 'causal_graph', label: '⚡ Graphe Causal', icon: '⚡' },
            { key: 'ontological_flow', label: '🌊 Flux Ontologique', icon: '🌊' }
          ].map(mode => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === mode.key 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-grut-surface text-grut-text hover:bg-purple-500/20'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        
        <div className="text-sm text-grut-text-dim">
          {viewMode === 'shadow_projection' && '🌑 Vision des ombres projetées depuis la 5ème dimension'}
          {viewMode === 'dimensional_layers' && '📏 Visualisation par couches dimensionnelles (3D→6D)'}
          {viewMode === 'causal_graph' && '⚡ Connexions causales entre entités ontologiques'}
          {viewMode === 'ontological_flow' && '🌊 Flux d\'existence à travers les dimensions'}
        </div>
      </div>

      {/* Contrôle des couches */}
      <div className="grut-card">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Couches ontologiques ({ontologicalLayers.filter(l => l.visibility).length}/{ontologicalLayers.length})
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ontologicalLayers.map(layer => (
            <div
              key={layer.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                layer.visibility 
                  ? 'border-grut-border bg-grut-surface' 
                  : 'border-gray-600 bg-gray-700/30'
              }`}
              onClick={() => toggleLayerVisibility(layer.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-4 h-4 rounded-full border-2"
                  style={{ 
                    backgroundColor: layer.visibility ? layer.color : 'transparent',
                    borderColor: layer.color 
                  }}
                />
                <span className="text-sm font-medium">{layer.name}</span>
              </div>
              
              <div className="text-xs text-grut-text-dim">
                <div>Dimension: {layer.dimension}D</div>
                <div>Entités: {layer.entities.length}</div>
                <div>Opacité: {Math.round(layer.opacity * 100)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas principal */}
      <div className="grut-card">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full border border-grut-border rounded-lg bg-black/50"
          style={{ maxWidth: '100%', height: 'auto' }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            
            // Détection d'entité cliquée
            const clickedEntity = ontologicalLayers
              .flatMap(l => l.entities)
              .find(entity => {
                const distance = Math.sqrt(
                  Math.pow(x - entity.projectedPosition.x, 2) + 
                  Math.pow(y - entity.projectedPosition.y, 2)
                )
                return distance < 25
              })
            
            setSelectedEntity(clickedEntity ? clickedEntity.id : null)
          }}
        />
      </div>

      {/* Détails de l'entité sélectionnée */}
      {selectedEntity && (
        <div className="grut-card bg-purple-500/10 border-purple-500">
          {(() => {
            const entity = ontologicalLayers
              .flatMap(l => l.entities)
              .find(e => e.id === selectedEntity)
            
            if (!entity) return null
            
            return (
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {entity.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-grut-accent mb-2">Position 5D:</div>
                    <div className="space-y-1 text-grut-text-dim font-mono">
                      {entity.position5D.map((coord, i) => (
                        <div key={i}>D{i + 1}: {coord.toFixed(3)}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-grut-accent mb-2">Propriétés:</div>
                    <div className="space-y-1 text-grut-text-dim">
                      <div>Type: {entity.type}</div>
                      <div>Poids ontologique: {entity.ontologicalWeight.toFixed(2)}</div>
                      <div>Intensité ombre: {entity.shadowIntensity.toFixed(2)}</div>
                      <div>Connexions: {entity.causalConnections.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Légende GRUT */}
      <div className="grut-card bg-grut-surface/50">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4">🏛️ Légende Vision GRUT</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold text-grut-accent mb-2">Entités:</div>
            <div className="space-y-1 text-grut-text-dim">
              <div>🦸 Héros = Agents causaux actifs</div>
              <div>🔮 Artefacts = Objets chargés ontologiquement</div>
              <div>⚡ Nœuds causaux = Points de bifurcation temporelle</div>
              <div>🏛️ Guides ontologiques = Formes pures 5D</div>
            </div>
          </div>
          
          <div>
            <div className="font-semibold text-grut-accent mb-2">Dimensions:</div>
            <div className="space-y-1 text-grut-text-dim">
              <div>🌍 D3: Réalité physique observable</div>
              <div>⏰ D4: Structures causales temporelles</div>
              <div>🏛️ D5: Formes ontologiques pures</div>
              <div>👁️ D6: Conscience panopticon</div>
            </div>
          </div>
          
          <div>
            <div className="font-semibold text-grut-accent mb-2">Projections:</div>
            <div className="space-y-1 text-grut-text-dim">
              <div>🌑 Ombres = Projections 5D→2.5D</div>
              <div>📏 Taille = Poids ontologique</div>
              <div>🎨 Couleur = Couche dimensionnelle</div>
              <div>⚡ Lignes = Connexions causales</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrutOntologyViewer 