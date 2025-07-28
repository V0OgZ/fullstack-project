// 🏛️ GRUT API SERVICE - Interface avec le Moteur Heroes of Time
import axios from 'axios'
import type { 
  GameState, 
  GameSession, 
  GrutVision, 
  ApiResponse,
  GameListResponse,
  SessionListResponse,
  SystemMetrics,
  CausalConflict 
} from '../types/index'

const API_BASE_URL = 'http://localhost:8080'
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour logging GRUT
api.interceptors.request.use(request => {
  console.log(`👁️ GRUT Request: ${request.method?.toUpperCase()} ${request.url}`)
  return request
})

api.interceptors.response.use(
  response => {
    console.log(`✅ GRUT Response: ${response.status} ${response.config.url}`)
    return response
  },
  error => {
    console.error(`❌ GRUT Error: ${error.response?.status} ${error.config?.url}`, error.message)
    return Promise.reject(error)
  }
)

export class GrutApiService {
  
  /* ================================
     SYSTÈME DE SANTÉ & STATUS
     ================================ */
  
  static async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await api.get('/api/health')
      return response.status === 200
    } catch (error) {
      console.error('🚨 Backend indisponible:', error)
      return false
    }
  }

  static async getSystemMetrics(): Promise<SystemMetrics> {
    try {
      const [gamesRes, sessionsRes] = await Promise.all([
        api.get('/api/games/available'),
        api.get('/api/multiplayer/sessions')
      ])

      // Calcul des métriques depuis les données disponibles
      const games = gamesRes.data || []
      const sessions = sessionsRes.data || []
      
      return {
        activeGames: games.length,
        totalPlayers: sessions.reduce((sum: number, s: any) => sum + s.currentPlayers, 0),
        averageResponseTime: Math.random() * 100 + 50, // Mock pour l'instant
        memoryUsage: Math.random() * 80 + 10,
        cpuUsage: Math.random() * 60 + 20,
        
        // Métriques Heroes of Time spécifiques
        totalHeroes: games.reduce((sum: number, g: any) => sum + (g.heroes?.length || 0), 0),
        totalBuildings: games.reduce((sum: number, g: any) => sum + (g.buildings?.length || 0), 0),
        activeSpells: Math.floor(Math.random() * 50),
        quantumStates: Math.floor(Math.random() * 100)
      }
    } catch (error) {
      console.error('❌ Erreur métriques système:', error)
      throw error
    }
  }

  /* ================================
     GESTION DES JEUX
     ================================ */

  static async getAvailableGames(): Promise<GameState[]> {
    try {
      const response = await api.get<GameState[]>('/api/games/available')
      return response.data || []
    } catch (error) {
      console.error('❌ Erreur récupération jeux:', error)
      return []
    }
  }

  static async getGameState(gameId: string): Promise<GameState | null> {
    try {
      const response = await api.get<GameState>(`/api/games/${gameId}`)
      return response.data
    } catch (error) {
      console.error(`❌ Erreur récupération jeu ${gameId}:`, error)
      return null
    }
  }

  static async createGame(gameData: {
    playerCount?: number
    gameMode?: string
    scenarioId?: string
  }): Promise<GameState | null> {
    try {
      const response = await api.post<GameState>('/api/games', gameData)
      return response.data
    } catch (error) {
      console.error('❌ Erreur création jeu:', error)
      return null
    }
  }

  /* ================================
     SESSIONS MULTIJOUEUR
     ================================ */

  static async getActiveSessions(): Promise<GameSession[]> {
    try {
      const response = await api.get<GameSession[]>('/api/multiplayer/sessions')
      return response.data || []
    } catch (error) {
      console.error('❌ Erreur récupération sessions:', error)
      return []
    }
  }

  static async getSession(sessionId: string): Promise<GameSession | null> {
    try {
      const response = await api.get<GameSession>(`/api/multiplayer/sessions/${sessionId}`)
      return response.data
    } catch (error) {
      console.error(`❌ Erreur récupération session ${sessionId}:`, error)
      return null
    }
  }

  /* ================================
     FONCTIONS QUANTIQUES - HÉRITÉES DU QUANTUM VISUALIZER
     ================================ */

  static async executeQuantumCommand(gameId: string, command: string): Promise<any> {
    try {
      // Pour l'instant, utiliser l'endpoint temporal ou créer un nouveau endpoint quantum
      const response = await api.post(`/temporal/games/${gameId}/quantum`, {
        command: command,
        timestamp: new Date().toISOString()
      })
      return response.data
    } catch (error) {
      console.error('❌ Erreur commande quantique:', error)
      throw error
    }
  }

  static async getQuantumStates(gameId: string): Promise<any[]> {
    try {
      // Récupérer les états ψ du jeu
      const response = await api.get(`/api/games/${gameId}/quantum/states`)
      return response.data || []
    } catch (error) {
      console.error('❌ Erreur états quantiques:', error)
      return []
    }
  }

  static async getQuantumInterferences(gameId: string): Promise<any[]> {
    try {
      // Analyser les interférences quantiques
      const response = await api.get(`/api/games/${gameId}/quantum/interferences`)
      return response.data || []
    } catch (error) {
      console.error('❌ Erreur interférences quantiques:', error)
      return []
    }
  }

  /* ================================
     ANALYSE CAUSALE GRUT
     ================================ */

  static async getCausalConflicts(): Promise<CausalConflict[]> {
    try {
      // Analyser les conflits causaux à travers tous les jeux
      const games = await this.getAvailableGames()
      const conflicts: CausalConflict[] = []

      // Pour l'instant, générer des conflits exemple (à remplacer par vraie logique)
      games.forEach(game => {
        if (Math.random() > 0.7) { // 30% chance de conflit
          conflicts.push({
            id: `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            gameId: game.gameId,
            type: ['temporal', 'spatial', 'resource'][Math.floor(Math.random() * 3)] as any,
            severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
            description: `Conflit causal détecté dans ${game.gameId}`,
            affectedPlayers: game.playerIds.slice(0, Math.floor(Math.random() * game.playerIds.length) + 1),
            detectedAt: new Date().toISOString()
          })
        }
      })

      return conflicts
    } catch (error) {
      console.error('❌ Erreur analyse causale:', error)
      return []
    }
  }

  /* ================================
     VISION GRUT OMNISCIENTE
     ================================ */

  static async getGrutVision(): Promise<GrutVision> {
    try {
      const [games, sessions, conflicts, metrics] = await Promise.all([
        this.getAvailableGames(),
        this.getActiveSessions(),
        this.getCausalConflicts(),
        this.getSystemMetrics()
      ])

      return {
        activeGames: games,
        activeSessions: sessions,
        causalConflicts: conflicts,
        timelineIntegrity: Math.max(0, 100 - conflicts.length * 10), // Simple calcul
        systemMetrics: metrics,
        panopticonStatus: conflicts.some(c => c.severity === 'critical') ? 'INTERVENING' :
                         conflicts.length > 0 ? 'ANALYZING' : 'WATCHING',
        lastUpdate: new Date().toISOString()
      }
    } catch (error) {
      console.error('❌ Erreur vision GRUT:', error)
      throw error
    }
  }

  /* ================================
     ACTIONS TEMPORELLES
     ================================ */

  static async endTurn(gameId: string, playerId: string): Promise<boolean> {
    try {
      const response = await api.post(`/api/games/${gameId}/end-turn`, { playerId })
      return response.data?.success || false
    } catch (error) {
      console.error('❌ Erreur fin de tour:', error)
      return false
    }
  }

  static async moveHero(gameId: string, heroId: string, targetPosition: { x: number, y: number }): Promise<boolean> {
    try {
      const response = await api.post(`/api/games/${gameId}/heroes/${heroId}/move`, {
        gameId,
        heroId,
        targetPosition
      })
      return response.data?.success || false
    } catch (error) {
      console.error('❌ Erreur mouvement héros:', error)
      return false
    }
  }

  /* ================================
     WORLD STATE GRAPH - NOUVEAU !
     ================================ */
  
  // 🌐 Obtenir le World State Graph complet pour une partie
  static async getWorldStateGraph(gameId: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.get(`/api/world-state-graph/games/${gameId}`)
      return {
        success: true,
        data: response.data,
        message: 'World State Graph récupéré avec succès'
      }
    } catch (error: any) {
      console.error('❌ GRUT: Erreur World State Graph:', error)
      return {
        success: false,
        data: null,
        message: `Erreur World State Graph: ${error.message}`
      }
    }
  }

  // 🎯 Obtenir les nœuds d'état pour un joueur spécifique  
  static async getPlayerStateNodes(gameId: string, playerId: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.get(`/api/world-state-graph/games/${gameId}/players/${playerId}/states`)
      return {
        success: true,
        data: response.data,
        message: 'Player State Nodes récupérés'
      }
    } catch (error: any) {
      console.error('❌ GRUT: Erreur Player States:', error)
      return {
        success: false,
        data: null,
        message: `Erreur Player States: ${error.message}`
      }
    }
  }

  // 🤖 Obtenir le parcours de décision d'une AI
  static async getAIDecisionPath(gameId: string, aiPlayerId: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.get(`/api/world-state-graph/games/${gameId}/ai/${aiPlayerId}/decision-path`)
      return {
        success: true,
        data: response.data,
        message: 'AI Decision Path récupéré'
      }
    } catch (error: any) {
      console.error('❌ GRUT: Erreur AI Decision Path:', error)
      return {
        success: false,
        data: null,
        message: `Erreur AI Decision Path: ${error.message}`
      }
    }
  }

  // 🔗 Analyser les connexions entre états
  static async getStateConnections(gameId: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.get(`/api/world-state-graph/games/${gameId}/state-connections`)
      return {
        success: true,
        data: response.data,
        message: 'State Connections analysées'
      }
    } catch (error: any) {
      console.error('❌ GRUT: Erreur State Connections:', error)
      return {
        success: false,
        data: null,
        message: `Erreur State Connections: ${error.message}`
      }
    }
  }

  // 🔮 Prédire le prochain état basé sur l'historique AI
  static async predictNextState(gameId: string, currentState: any): Promise<ApiResponse<any>> {
    try {
      const response = await api.post(`/api/world-state-graph/games/${gameId}/predict-next-state`, currentState)
      return {
        success: true,
        data: response.data,
        message: 'Prédiction état suivant générée'
      }
    } catch (error: any) {
      console.error('❌ GRUT: Erreur Predict Next State:', error)
      return {
        success: false,
        data: null,
        message: `Erreur Prédiction: ${error.message}`
      }
    }
  }
}

export default GrutApiService 