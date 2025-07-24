// 🏛️ PANOPTICON GRUT - Interface Principale
import React, { useState, useEffect } from 'react'
import { Eye, AlertTriangle, Activity, Users, Gamepad2, Server, Sparkles, Hammer, Brain, Zap, Layers, Globe, ExternalLink } from 'lucide-react'
import GrutApiService from './services/grutApiService'
import LegendaryElements from './components/LegendaryElements'
import RunicForge from './components/RunicForge'
import SphinxGenerator from './components/SphinxGenerator'
import QuantumVisualizer from './components/QuantumVisualizer'
import GrutOntologyViewer from './components/GrutOntologyViewer'
import WorldStateGraph from './components/WorldStateGraph'
import NavigationHub from './components/NavigationHub'
import type { GrutVision, GameState, GameSession, CausalConflict } from './types/index'

interface PanopticonStats {
  activeGames: number
  totalPlayers: number
  causalConflicts: number
  timelineIntegrity: number
  panopticonStatus: 'WATCHING' | 'ANALYZING' | 'INTERVENING'
}

const App: React.FC = () => {
  const [grutVision, setGrutVision] = useState<GrutVision | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showLegendaryElements, setShowLegendaryElements] = useState(false)
  const [showRunicForge, setShowRunicForge] = useState(false)
  const [showSphinxGenerator, setShowSphinxGenerator] = useState(false)
  const [showQuantumVisualizer, setShowQuantumVisualizer] = useState(false)
  const [showGrutOntology, setShowGrutOntology] = useState(false)
  const [showWorldStateGraph, setShowWorldStateGraph] = useState(false)
  const [showNavigationHub, setShowNavigationHub] = useState(false)

  // Charge la vision GRUT depuis le backend
  const loadGrutVision = async () => {
    try {
      console.log('👁️ GRUT: Chargement vision omnisciente...')
      const vision = await GrutApiService.getGrutVision()
      setGrutVision(vision)
      setIsConnected(true)
    } catch (error) {
      console.error('❌ GRUT: Erreur vision:', error)
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Effet de chargement initial
  useEffect(() => {
    loadGrutVision()
  }, [])

  // Auto-refresh toutes les 5 secondes si activé
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      if (!isLoading) {
        loadGrutVision()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh, isLoading])

  // Vérification santé backend
  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await GrutApiService.checkBackendHealth()
      setIsConnected(healthy)
    }
    
    checkHealth()
    const healthInterval = setInterval(checkHealth, 10000)
    return () => clearInterval(healthInterval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="grut-spinner mb-4 mx-auto"></div>
          <h2 className="text-2xl font-bold mb-2">👁️ GRUT s'éveille...</h2>
          <p className="text-grut-text-dim">Initialisation vision ontologique 5D→2.5D</p>
        </div>
      </div>
    )
  }

  const stats: PanopticonStats = grutVision ? {
    activeGames: grutVision.activeGames.length,
    totalPlayers: grutVision.systemMetrics.totalPlayers,
    causalConflicts: grutVision.causalConflicts.length,
    timelineIntegrity: grutVision.timelineIntegrity,
    panopticonStatus: grutVision.panopticonStatus
  } : {
    activeGames: 0,
    totalPlayers: 0,
    causalConflicts: 0,
    timelineIntegrity: 0,
    panopticonStatus: 'WATCHING'
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header GRUT */}
      <header className="grut-card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Eye className="w-8 h-8 text-grut-accent" />
            <div>
              <h1 className="text-2xl font-bold">🏛️ PANOPTICON GRUT</h1>
              <p className="text-grut-text-dim">Vision Ontologique 5D→2.5D - Heroes of Time</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Status de connexion */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded ${
              isConnected ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <span className="text-sm font-mono">
                {isConnected ? 'Backend Connecté' : 'Backend Déconnecté'}
              </span>
            </div>

                              {/* Toggle Éléments Légendaires */}
                  <button
                    onClick={() => setShowLegendaryElements(!showLegendaryElements)}
                    className={`px-3 py-1 rounded text-sm font-mono flex items-center gap-2 ${
                      showLegendaryElements ? 'bg-grut-secondary/20 text-grut-secondary' : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    Artefacts Légendaires
                  </button>

                  {/* Toggle Forge Runique */}
                  <button
                    onClick={() => setShowRunicForge(!showRunicForge)}
                    className={`px-3 py-1 rounded text-sm font-mono flex items-center gap-2 ${
                      showRunicForge ? 'bg-grut-primary/20 text-grut-primary' : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    <Hammer className="w-4 h-4" />
                    Forge Runique
                  </button>

                  {/* Toggle Sphinx Generator */}
                  <button
                    onClick={() => setShowSphinxGenerator(!showSphinxGenerator)}
                    className={`px-3 py-1 rounded text-sm font-mono flex items-center gap-2 ${
                      showSphinxGenerator ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    <Brain className="w-4 h-4" />
                    Sphinx Quantique
                  </button>

                  {/* Toggle Quantum Visualizer */}
                  <button
                    onClick={() => setShowQuantumVisualizer(!showQuantumVisualizer)}
                    className={`px-3 py-1 rounded text-sm font-mono flex items-center gap-2 ${
                      showQuantumVisualizer ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    Visualiseur Quantique
                  </button>

                  {/* Toggle GRUT Ontology */}
                  <button
                    onClick={() => setShowGrutOntology(!showGrutOntology)}
                    className={`px-3 py-1 rounded text-sm font-mono flex items-center gap-2 ${
                      showGrutOntology ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    Vision GRUT 5D
                  </button>

                  {/* Toggle World State Graph */}
                  <button
                    onClick={() => setShowWorldStateGraph(!showWorldStateGraph)}
                    className={`px-3 py-1 rounded text-sm font-mono flex items-center gap-2 ${
                      showWorldStateGraph ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    Graphe Monde
                  </button>

                  {/* Toggle Navigation Hub */}
                  <button
                    onClick={() => setShowNavigationHub(!showNavigationHub)}
                    className={`px-3 py-1 rounded text-sm font-mono flex items-center gap-2 ${
                      showNavigationHub ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Navigation Hub
                  </button>

            {/* Auto-refresh toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded text-sm font-mono ${
                autoRefresh ? 'bg-grut-primary/20 text-grut-accent' : 'bg-gray-600/20 text-gray-400'
              }`}
            >
              Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
            </button>

            {/* Status Panopticon */}
            <div className={`px-3 py-1 rounded font-mono text-sm panopticon-${stats.panopticonStatus.toLowerCase()}`}>
              👁️ {stats.panopticonStatus}
            </div>
          </div>
        </div>
      </header>

                  {/* Éléments Légendaires - Évadé de la Cave + Joint Cosmique */}
            {showLegendaryElements && (
              <div className="mb-6">
                <LegendaryElements
                  legendaryArtifacts={grutVision?.legendaryArtifacts}
                  philosopherHeroes={grutVision?.philosopherHeroes}
                  jointCosmiqueStatus={grutVision?.jointCosmiqueStatus}
                />
              </div>
            )}

            {/* Forge Runique - Éditeur HOTS */}
            {showRunicForge && (
              <div className="mb-6">
                <RunicForge isVisible={showRunicForge} />
              </div>
            )}

            {/* Sphinx Generator - Questions Quantiques */}
            {showSphinxGenerator && (
              <div className="mb-6">
                <SphinxGenerator isVisible={showSphinxGenerator} />
              </div>
            )}

            {/* Quantum Visualizer - États ψ Temps Réel */}
            {showQuantumVisualizer && (
              <div className="mb-6">
                <QuantumVisualizer isVisible={showQuantumVisualizer} />
              </div>
            )}

            {/* GRUT Ontology Viewer - Vision 5D→2.5D */}
            {showGrutOntology && (
              <div className="mb-6">
                <GrutOntologyViewer isVisible={showGrutOntology} grutVision={grutVision || undefined} />
              </div>
            )}

            {/* World State Graph - État du Monde Interactif */}
            {showWorldStateGraph && (
              <div className="mb-6">
                <WorldStateGraph isVisible={showWorldStateGraph} grutVision={grutVision || undefined} />
              </div>
            )}

            {/* Navigation Hub - Interfaces Externes */}
            {showNavigationHub && (
              <div className="mb-6">
                <NavigationHub isVisible={showNavigationHub} />
              </div>
            )}

      {/* Dashboard Grid Principal */}
      <div className="grut-grid grut-grid-4 mb-6">
        {/* Métriques principales */}
        <div className="grut-card text-center">
          <Gamepad2 className="w-8 h-8 text-grut-accent mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.activeGames}</div>
          <div className="text-grut-text-dim text-sm">Jeux Actifs</div>
        </div>

        <div className="grut-card text-center">
          <Users className="w-8 h-8 text-grut-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.totalPlayers}</div>
          <div className="text-grut-text-dim text-sm">Joueurs Connectés</div>
        </div>

        <div className="grut-card text-center">
          <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${
            stats.causalConflicts > 0 ? 'text-grut-error' : 'text-grut-success'
          }`} />
          <div className="text-2xl font-bold">{stats.causalConflicts}</div>
          <div className="text-grut-text-dim text-sm">Conflits Causaux</div>
        </div>

        <div className="grut-card text-center">
          <Activity className="w-8 h-8 text-grut-accent mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.timelineIntegrity.toFixed(1)}%</div>
          <div className="text-grut-text-dim text-sm">Intégrité Timeline</div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="grut-grid grut-grid-2 gap-6">
        {/* Jeux Actifs */}
        <div className="grut-card">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            Jeux Actifs ({stats.activeGames})
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {grutVision?.activeGames.length === 0 ? (
              <p className="text-grut-text-dim text-center py-4">
                Aucun jeu actif détecté
              </p>
            ) : (
              grutVision?.activeGames.map((game: GameState) => (
                <div
                  key={game.gameId}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    selectedGame === game.gameId
                      ? 'border-grut-accent bg-grut-accent/10'
                      : 'border-grut-primary/30 hover:border-grut-primary'
                  }`}
                  onClick={() => setSelectedGame(
                    selectedGame === game.gameId ? null : game.gameId
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-mono text-sm text-grut-accent">
                        {game.gameId}
                      </div>
                      <div className="text-sm text-grut-text-dim">
                        Tour {game.currentTurn} • Joueur: {game.currentPlayerId}
                      </div>
                    </div>
                    <div className="text-xs text-grut-text-dim">
                      {game.playerIds.length} joueurs
                    </div>
                  </div>
                  
                  {selectedGame === game.gameId && (
                    <div className="mt-3 pt-3 border-t border-grut-primary/20">
                      <div className="text-xs space-y-1">
                        <div>🏛️ Bâtiments: {game.buildings?.length || 0}</div>
                        <div>⚡ Engine: {game.temporalEngine || 'Standard'}</div>
                        <div>🌀 États Quantiques: {game.quantumState || 'Normal'}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Conflits Causaux */}
        <div className="grut-card">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Conflits Causaux ({stats.causalConflicts})
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {grutVision?.causalConflicts.length === 0 ? (
              <p className="text-grut-success text-center py-4">
                ✅ Aucun conflit causal détecté
              </p>
            ) : (
              grutVision?.causalConflicts.map((conflict: CausalConflict) => (
                <div
                  key={conflict.id}
                  className={`p-3 rounded border border-opacity-50 ${
                    conflict.severity === 'critical' ? 'border-grut-critical bg-red-600/10' :
                    conflict.severity === 'high' ? 'border-grut-error bg-orange-600/10' :
                    conflict.severity === 'medium' ? 'border-grut-warning bg-yellow-600/10' :
                    'border-grut-success bg-green-600/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs px-2 py-1 rounded severity-${conflict.severity}`}>
                      {conflict.type.toUpperCase()}
                    </span>
                    <span className={`text-xs severity-${conflict.severity}`}>
                      {conflict.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="text-sm mb-2">{conflict.description}</div>
                  
                  <div className="text-xs text-grut-text-dim">
                    Jeu: {conflict.gameId} • 
                    Joueurs: {conflict.affectedPlayers.join(', ')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sessions Multijoueur */}
      {grutVision?.activeSessions && grutVision.activeSessions.length > 0 && (
        <div className="grut-card mt-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Server className="w-5 h-5" />
            Sessions Multijoueur ({grutVision.activeSessions.length})
          </h3>
          
          <div className="grut-grid grut-grid-3">
            {grutVision.activeSessions.map((session: GameSession) => (
              <div key={session.sessionId} className="p-3 border border-grut-primary/30 rounded">
                <div className="font-mono text-sm text-grut-accent mb-1">
                  {session.name}
                </div>
                <div className="text-xs text-grut-text-dim space-y-1">
                  <div>Status: {session.status}</div>
                  <div>Joueurs: {session.currentPlayers}/{session.maxPlayers}</div>
                  <div>Mode: {session.gameMode}</div>
                  {session.zfcEnabled && <div className="text-grut-warning">⚡ ZFC Enabled</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center text-grut-text-dim text-sm">
        <p>
          🏛️ PANOPTICON GRUT v1.0.0-ontological • 
          Port 8001 (remplace quantum-visualizer) • 
          Backend: {isConnected ? '✅' : '❌'} localhost:8080 •
          {grutVision && (
            <span> Dernière MAJ: {new Date(grutVision.lastUpdate).toLocaleTimeString()}</span>
          )}
        </p>
        {showLegendaryElements && (
          <p className="mt-2 text-grut-accent">
            🚬 Joint Cosmique de Jean actif • 🏛️ Évadé de la Cave connecté au Panopticon
          </p>
        )}
      </footer>
    </div>
  )
}

export default App 