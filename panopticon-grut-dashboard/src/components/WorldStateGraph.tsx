import React, { useState, useEffect } from 'react'

interface GameState {
  gameId: string
  currentTurn: number
  players: any[]
  aiDecisionPaths: any[]
  worldState: any
}

const WorldStateGraph: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWorldState = async (gameId: string = 'default') => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`http://localhost:8080/api/world-state-graph/games/${gameId}`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setGameState(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      console.error('Erreur World State Graph:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorldState()
    // Actualisation automatique toutes les 5 secondes
    const interval = setInterval(() => fetchWorldState(), 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <button 
          className="grut-button" 
          onClick={() => fetchWorldState()}
          disabled={loading}
        >
          {loading ? '🔄 Chargement...' : '🔄 Actualiser'}
        </button>
        
        <button 
          className="grut-button" 
          onClick={() => fetchWorldState('demo')}
          disabled={loading}
        >
          📊 Mode Démo
        </button>
      </div>

      {error && (
        <div style={{ 
          color: '#ff6b35', 
          background: 'rgba(255, 107, 53, 0.1)', 
          padding: '10px', 
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          ⚠️ Erreur: {error}
        </div>
      )}

      {gameState ? (
        <div className="grut-graph">
          <div style={{ padding: '15px' }}>
            <h3>🎮 Game ID: {gameState.gameId}</h3>
            <div style={{ margin: '10px 0' }}>
              <strong>🔄 Tour Actuel:</strong> {gameState.currentTurn}
            </div>
            
            <div style={{ margin: '10px 0' }}>
              <strong>👥 Joueurs:</strong> {gameState.players?.length || 0}
              {gameState.players?.map((player, index) => (
                <div key={index} style={{ marginLeft: '20px', fontSize: '0.9rem' }}>
                  • {player.name || `Joueur ${index + 1}`} 
                  {player.isAI && ' 🤖'}
                </div>
              ))}
            </div>

            <div style={{ margin: '10px 0' }}>
              <strong>🧠 Chemins de Décision IA:</strong> {gameState.aiDecisionPaths?.length || 0}
              {gameState.aiDecisionPaths?.slice(0, 3).map((path, index) => (
                <div key={index} style={{ marginLeft: '20px', fontSize: '0.8rem', color: '#8a2be2' }}>
                  • Décision {index + 1}: {path.action || 'Action inconnue'}
                </div>
              ))}
            </div>

            <div style={{ margin: '15px 0', padding: '10px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '5px' }}>
              <strong>🌍 État du Monde:</strong>
              <pre style={{ fontSize: '0.8rem', marginTop: '5px', color: '#00ff88' }}>
                {JSON.stringify(gameState.worldState, null, 2).slice(0, 300)}
                {JSON.stringify(gameState.worldState, null, 2).length > 300 && '...'}
              </pre>
            </div>
          </div>
        </div>
      ) : !loading && (
        <div className="grut-graph" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#8a2be2'
        }}>
          🌐 Aucun état de monde chargé
        </div>
      )}
    </div>
  )
}

export default WorldStateGraph 