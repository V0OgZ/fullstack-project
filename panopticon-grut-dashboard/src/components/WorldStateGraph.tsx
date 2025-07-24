import React, { useState, useEffect, useRef } from 'react'
import { Globe, MapPin, Users, Building, Swords, Zap, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react'
import GrutApiService from '../services/grutApiService'
import type { GrutVision, GameState } from '../types/index'

interface WorldNode {
  id: string
  name: string
  type: 'city' | 'dungeon' | 'battlefield' | 'artifact_site' | 'temporal_nexus' | 'causal_anchor'
  position: { x: number; y: number }
  size: number
  importance: number
  connections: string[]
  entities: WorldEntity[]
  temporalStability: number
  causalWeight: number
}

interface WorldEntity {
  id: string
  name: string
  type: 'hero' | 'npc' | 'artifact' | 'building' | 'creature'
  level?: number
  status: 'active' | 'inactive' | 'moving' | 'combat'
}

interface WorldConnection {
  from: string
  to: string
  type: 'road' | 'portal' | 'temporal_bridge' | 'causal_link'
  distance: number
  difficulty: number
  bidirectional: boolean
  active: boolean
}

interface WorldStateGraphProps {
  isVisible: boolean
  grutVision?: GrutVision
}

const WorldStateGraph: React.FC<WorldStateGraphProps> = ({ isVisible, grutVision }) => {
  const [worldNodes, setWorldNodes] = useState<WorldNode[]>([])
  const [worldConnections, setWorldConnections] = useState<WorldConnection[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'geographic' | 'causal' | 'temporal' | 'entity_flow'>('geographic')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Initialiser le monde
  useEffect(() => {
    if (isVisible) {
      generateWorldState()
      startWorldAnimation()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, grutVision])

  const generateWorldState = () => {
    // Générer les nœuds du monde
    const nodes: WorldNode[] = [
      {
        id: 'capital_city',
        name: '🏰 Capitale Royale',
        type: 'city',
        position: { x: 400, y: 200 },
        size: 80,
        importance: 1.0,
        connections: ['port_city', 'mountain_dungeon', 'temporal_nexus_1'],
        entities: generateCityEntities('capital'),
        temporalStability: 0.95,
        causalWeight: 1.5
      },
      {
        id: 'port_city',
        name: '⚓ Port Marchand',
        type: 'city',
        position: { x: 200, y: 350 },
        size: 60,
        importance: 0.7,
        connections: ['capital_city', 'artifact_island', 'sea_battle'],
        entities: generateCityEntities('port'),
        temporalStability: 0.8,
        causalWeight: 0.8
      },
      {
        id: 'mountain_dungeon',
        name: '⛰️ Donjon Montagnard',
        type: 'dungeon',
        position: { x: 600, y: 100 },
        size: 50,
        importance: 0.6,
        connections: ['capital_city', 'temporal_nexus_1'],
        entities: generateDungeonEntities(),
        temporalStability: 0.6,
        causalWeight: 1.2
      },
      {
        id: 'artifact_island',
        name: '🏝️ Île aux Artefacts',
        type: 'artifact_site',
        position: { x: 100, y: 450 },
        size: 40,
        importance: 0.9,
        connections: ['port_city'],
        entities: generateArtifactSiteEntities(),
        temporalStability: 0.4,
        causalWeight: 2.0
      },
      {
        id: 'temporal_nexus_1',
        name: '⏰ Nexus Temporel',
        type: 'temporal_nexus',
        position: { x: 500, y: 300 },
        size: 35,
        importance: 1.2,
        connections: ['capital_city', 'mountain_dungeon', 'causal_anchor_1'],
        entities: generateTemporalNexusEntities(),
        temporalStability: 0.2,
        causalWeight: 3.0
      },
      {
        id: 'sea_battle',
        name: '⚔️ Bataille Navale',
        type: 'battlefield',
        position: { x: 250, y: 500 },
        size: 45,
        importance: 0.8,
        connections: ['port_city'],
        entities: generateBattlefieldEntities(),
        temporalStability: 0.3,
        causalWeight: 1.8
      },
      {
        id: 'causal_anchor_1',
        name: '🔗 Ancrage Causal',
        type: 'causal_anchor',
        position: { x: 700, y: 400 },
        size: 30,
        importance: 1.1,
        connections: ['temporal_nexus_1'],
        entities: generateCausalAnchorEntities(),
        temporalStability: 0.9,
        causalWeight: 2.5
      }
    ]
    
    setWorldNodes(nodes)
    
    // Générer les connexions
    const connections: WorldConnection[] = []
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const targetNode = nodes.find(n => n.id === targetId)
        if (targetNode) {
          const distance = Math.sqrt(
            Math.pow(node.position.x - targetNode.position.x, 2) +
            Math.pow(node.position.y - targetNode.position.y, 2)
          )
          
          connections.push({
            from: node.id,
            to: targetId,
            type: getConnectionType(node.type, targetNode.type),
            distance: distance,
            difficulty: Math.random() * 0.5 + 0.3,
            bidirectional: true,
            active: Math.random() > 0.2
          })
        }
      })
    })
    
    setWorldConnections(connections)
  }

  const generateCityEntities = (cityType: string): WorldEntity[] => {
    const baseEntities = [
      { id: `${cityType}_mayor`, name: 'Maire', type: 'npc' as const, status: 'active' as const },
      { id: `${cityType}_guard`, name: 'Garde', type: 'npc' as const, status: 'active' as const },
      { id: `${cityType}_market`, name: 'Marché', type: 'building' as const, status: 'active' as const }
    ]
    
    // Ajouter des héros si on a des données GRUT
    if (grutVision?.activeGames && grutVision.activeGames.length > 0) {
      grutVision.activeGames.slice(0, 2).forEach((game, i) => {
        baseEntities.push({
          id: `hero_${cityType}_${i}`,
          name: `Héros ${game.id}`,
          type: 'hero',
          level: Math.floor(Math.random() * 20) + 1,
          status: ['active', 'moving', 'combat'][Math.floor(Math.random() * 3)] as any
        })
      })
    }
    
    return baseEntities
  }

  const generateDungeonEntities = (): WorldEntity[] => [
    { id: 'dungeon_boss', name: 'Boss Final', type: 'creature', level: 25, status: 'active' },
    { id: 'dungeon_treasure', name: 'Trésor', type: 'artifact', status: 'inactive' },
    { id: 'dungeon_trap', name: 'Piège Ancien', type: 'building', status: 'active' }
  ]

  const generateArtifactSiteEntities = (): WorldEntity[] => [
    { id: 'ancient_relic', name: 'Relique Ancienne', type: 'artifact', status: 'active' },
    { id: 'artifact_guardian', name: 'Gardien', type: 'creature', level: 30, status: 'active' },
    { id: 'research_camp', name: 'Camp de Recherche', type: 'building', status: 'active' }
  ]

  const generateTemporalNexusEntities = (): WorldEntity[] => [
    { id: 'time_keeper', name: 'Gardien du Temps', type: 'npc', status: 'active' },
    { id: 'temporal_rift', name: 'Faille Temporelle', type: 'artifact', status: 'active' },
    { id: 'nexus_core', name: 'Cœur du Nexus', type: 'building', status: 'active' }
  ]

  const generateBattlefieldEntities = (): WorldEntity[] => [
    { id: 'naval_commander', name: 'Commandant Naval', type: 'npc', status: 'combat' },
    { id: 'war_ship', name: 'Navire de Guerre', type: 'building', status: 'combat' },
    { id: 'sea_monster', name: 'Monstre Marin', type: 'creature', level: 20, status: 'combat' }
  ]

  const generateCausalAnchorEntities = (): WorldEntity[] => [
    { id: 'causal_engineer', name: 'Ingénieur Causal', type: 'npc', status: 'active' },
    { id: 'anchor_crystal', name: 'Cristal d\'Ancrage', type: 'artifact', status: 'active' },
    { id: 'stabilizer', name: 'Stabilisateur', type: 'building', status: 'active' }
  ]

  const getConnectionType = (type1: string, type2: string): WorldConnection['type'] => {
    if (type1.includes('temporal') || type2.includes('temporal')) return 'temporal_bridge'
    if (type1.includes('causal') || type2.includes('causal')) return 'causal_link'
    if (type1 === 'city' && type2 === 'city') return 'road'
    return 'portal'
  }

  const startWorldAnimation = () => {
    const animate = (timestamp: number) => {
      updateWorldState(timestamp)
      drawWorldGraph(timestamp)
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }

  const updateWorldState = (timestamp: number) => {
    const time = timestamp * 0.001
    
    // Mise à jour des entités qui bougent
    setWorldNodes(prevNodes => 
      prevNodes.map(node => ({
        ...node,
        entities: node.entities.map(entity => ({
          ...entity,
          status: entity.status === 'moving' && Math.random() > 0.98 
            ? 'active' 
            : entity.status
        })),
        temporalStability: Math.max(0.1, 
          node.temporalStability + Math.sin(time * 0.1 + node.causalWeight) * 0.05
        )
      }))
    )
  }

  const drawWorldGraph = (timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear avec style monde
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    )
    gradient.addColorStop(0, 'rgba(15, 52, 96, 0.9)')
    gradient.addColorStop(0.7, 'rgba(26, 26, 46, 0.95)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Application du zoom et pan
    ctx.save()
    ctx.scale(zoomLevel, zoomLevel)
    ctx.translate(panOffset.x, panOffset.y)
    
    // Dessiner les connexions
    worldConnections.forEach(conn => {
      const fromNode = worldNodes.find(n => n.id === conn.from)
      const toNode = worldNodes.find(n => n.id === conn.to)
      
      if (fromNode && toNode) {
        ctx.beginPath()
        ctx.moveTo(fromNode.position.x, fromNode.position.y)
        ctx.lineTo(toNode.position.x, toNode.position.y)
        
        // Style selon le mode de vue
        let strokeStyle = '#555555'
        let lineWidth = 2
        
        switch (viewMode) {
          case 'geographic':
            strokeStyle = conn.type === 'road' ? '#8b4513' : 
                         conn.type === 'portal' ? '#9b59b6' :
                         conn.type === 'temporal_bridge' ? '#00bfff' : '#ffd700'
            break
          case 'causal':
            const avgCausalWeight = (fromNode.causalWeight + toNode.causalWeight) / 2
            strokeStyle = `hsl(${60 - avgCausalWeight * 20}, 80%, 60%)`
            lineWidth = avgCausalWeight * 2
            break
          case 'temporal':
            const avgStability = (fromNode.temporalStability + toNode.temporalStability) / 2
            strokeStyle = `rgba(0, 191, 255, ${avgStability})`
            break
          case 'entity_flow':
            const entityCount = fromNode.entities.length + toNode.entities.length
            strokeStyle = `hsl(120, ${Math.min(100, entityCount * 15)}%, 50%)`
            break
        }
        
        ctx.strokeStyle = strokeStyle
        ctx.lineWidth = lineWidth
        ctx.globalAlpha = conn.active ? 1 : 0.3
        
        if (conn.type === 'temporal_bridge') {
          ctx.setLineDash([10, 5])
        } else if (conn.type === 'causal_link') {
          ctx.setLineDash([5, 10, 15, 10])
        } else {
          ctx.setLineDash([])
        }
        
        ctx.stroke()
        ctx.globalAlpha = 1
        ctx.setLineDash([])
      }
    })
    
    // Dessiner les nœuds
    worldNodes.forEach(node => {
      const pos = node.position
      let nodeSize = node.size
      let nodeColor = '#00bfff'
      
      // Couleur selon le type
      switch (node.type) {
        case 'city':
          nodeColor = '#ffd700'
          break
        case 'dungeon':
          nodeColor = '#8b0000'
          break
        case 'battlefield':
          nodeColor = '#ff4500'
          break
        case 'artifact_site':
          nodeColor = '#9b59b6'
          break
        case 'temporal_nexus':
          nodeColor = '#00bfff'
          nodeSize += Math.sin(timestamp * 0.005) * 5
          break
        case 'causal_anchor':
          nodeColor = '#32cd32'
          break
      }
      
      // Ajustements selon le mode de vue
      switch (viewMode) {
        case 'causal':
          nodeSize = node.size * node.causalWeight
          nodeColor = `hsl(${60 - node.causalWeight * 20}, 80%, 60%)`
          break
        case 'temporal':
          nodeColor = `rgba(0, 191, 255, ${node.temporalStability})`
          break
        case 'entity_flow':
          nodeSize = node.size + node.entities.length * 3
          nodeColor = `hsl(120, ${Math.min(100, node.entities.length * 20)}%, 50%)`
          break
      }
      
      // Ombre du nœud
      ctx.beginPath()
      ctx.arc(pos.x + 3, pos.y + 3, nodeSize / 2, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fill()
      
      // Nœud principal
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, nodeSize / 2, 0, 2 * Math.PI)
      ctx.fillStyle = nodeColor
      ctx.fill()
      
      // Bordure
      ctx.strokeStyle = selectedNode === node.id ? '#ffffff' : nodeColor
      ctx.lineWidth = selectedNode === node.id ? 4 : 2
      ctx.stroke()
      
      // Indicateur d'importance
      if (node.importance > 0.8) {
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, nodeSize / 2 + 5, 0, 2 * Math.PI)
        ctx.strokeStyle = '#ffd700'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.stroke()
        ctx.setLineDash([])
      }
      
      // Label
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(
        node.name.length > 20 ? node.name.substring(0, 17) + '...' : node.name,
        pos.x,
        pos.y - nodeSize / 2 - 10
      )
      
      // Compteur d'entités
      if (node.entities.length > 0) {
        ctx.fillStyle = '#333333'
        ctx.fillRect(pos.x - 10, pos.y + nodeSize / 2 + 5, 20, 15)
        ctx.fillStyle = '#ffffff'
        ctx.font = '10px monospace'
        ctx.fillText(node.entities.length.toString(), pos.x, pos.y + nodeSize / 2 + 16)
      }
    })
    
    ctx.restore()
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - panOffset.x * zoomLevel) / zoomLevel
    const y = (e.clientY - rect.top - panOffset.y * zoomLevel) / zoomLevel
    
    // Détecter le nœud cliqué
    const clickedNode = worldNodes.find(node => {
      const distance = Math.sqrt(
        Math.pow(x - node.position.x, 2) + Math.pow(y - node.position.y, 2)
      )
      return distance < node.size / 2
    })
    
    setSelectedNode(clickedNode ? clickedNode.id : null)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedNode) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const zoomIn = () => setZoomLevel(prev => Math.min(3, prev * 1.2))
  const zoomOut = () => setZoomLevel(prev => Math.max(0.3, prev / 1.2))
  const resetView = () => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    setSelectedNode(null)
  }

  if (!isVisible) return null

  return (
    <div className="space-y-6">
      {/* Header World State */}
      <div className="grut-card bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-green-400" />
            <div>
              <h2 className="text-2xl font-bold text-green-400">🌍 Graphe du Monde</h2>
              <p className="text-grut-text-dim">État du monde • Connexions • Entités actives</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={zoomOut} className="grut-button bg-blue-500">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-grut-text-dim font-mono">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button onClick={zoomIn} className="grut-button bg-blue-500">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={resetView} className="grut-button bg-grut-primary">
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Contrôles de vue */}
      <div className="grut-card">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Mode de visualisation
        </h3>
        
        <div className="flex gap-2 mb-4">
          {[
            { key: 'geographic', label: '🗺️ Géographique', icon: '🗺️' },
            { key: 'causal', label: '⚡ Poids Causal', icon: '⚡' },
            { key: 'temporal', label: '⏰ Stabilité Temporelle', icon: '⏰' },
            { key: 'entity_flow', label: '👥 Flux d\'Entités', icon: '👥' }
          ].map(mode => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === mode.key 
                  ? 'bg-green-500 text-white' 
                  : 'bg-grut-surface text-grut-text hover:bg-green-500/20'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        
        <div className="text-sm text-grut-text-dim">
          {viewMode === 'geographic' && '🗺️ Vue classique avec types de lieux et connexions physiques'}
          {viewMode === 'causal' && '⚡ Taille et couleur selon le poids causal des nœuds'}
          {viewMode === 'temporal' && '⏰ Opacité selon la stabilité temporelle des zones'}
          {viewMode === 'entity_flow' && '👥 Intensité selon le nombre d\'entités présentes'}
        </div>
      </div>

      {/* Canvas principal */}
      <div className="grut-card">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full border border-grut-border rounded-lg bg-black/30 cursor-grab"
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            cursor: isDragging ? 'grabbing' : selectedNode ? 'pointer' : 'grab'
          }}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        
        <div className="mt-2 text-xs text-grut-text-dim text-center">
          🖱️ Clic sur un nœud pour sélectionner • Glisser pour déplacer la vue • Molette pour zoomer
        </div>
      </div>

      {/* Détails du nœud sélectionné */}
      {selectedNode && (
        <div className="grut-card bg-green-500/10 border-green-500">
          {(() => {
            const node = worldNodes.find(n => n.id === selectedNode)
            if (!node) return null
            
            return (
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  {node.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-grut-accent mb-2">Propriétés:</h4>
                    <div className="space-y-1 text-sm text-grut-text-dim">
                      <div>Type: {node.type}</div>
                      <div>Taille: {node.size}</div>
                      <div>Importance: {node.importance.toFixed(2)}</div>
                      <div>Connexions: {node.connections.length}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-grut-accent mb-2">Temporel:</h4>
                    <div className="space-y-1 text-sm text-grut-text-dim">
                      <div>Stabilité: {(node.temporalStability * 100).toFixed(1)}%</div>
                      <div>Poids causal: {node.causalWeight.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-grut-accent mb-2">Entités ({node.entities.length}):</h4>
                    <div className="space-y-1 text-sm text-grut-text-dim max-h-24 overflow-y-auto">
                      {node.entities.map(entity => (
                        <div key={entity.id} className="flex justify-between">
                          <span>{entity.name}</span>
                          <span className={`px-1 rounded text-xs ${
                            entity.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            entity.status === 'combat' ? 'bg-red-500/20 text-red-400' :
                            entity.status === 'moving' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {entity.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Statistiques du monde */}
      <div className="grut-card">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Statistiques du Monde
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-grut-primary">{worldNodes.length}</div>
            <div className="text-grut-text-dim">Lieux</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-grut-secondary">{worldConnections.length}</div>
            <div className="text-grut-text-dim">Connexions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-grut-accent">
              {worldNodes.reduce((sum, node) => sum + node.entities.length, 0)}
            </div>
            <div className="text-grut-text-dim">Entités</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {Math.round(worldNodes.reduce((sum, node) => sum + node.temporalStability, 0) / worldNodes.length * 100)}%
            </div>
            <div className="text-grut-text-dim">Stabilité Moy.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorldStateGraph 