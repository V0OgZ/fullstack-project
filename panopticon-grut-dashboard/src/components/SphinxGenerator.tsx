import React, { useState, useEffect } from 'react'
import { Eye, Brain, Zap, Award, RefreshCw, HelpCircle, CheckCircle, XCircle } from 'lucide-react'
import GrutApiService from '../services/grutApiService'

// Types pour le générateur Sphinx
interface SphinxQuestion {
  id: string
  difficulty: 'BEGINNER' | 'EXPERT' | 'MASTER' | 'LEGENDARY'
  template: string
  question: string
  context: GameContext
  expectedElements: string[]
  hints: string[]
  physicsType: string
}

interface GameContext {
  heroes: Array<{ name: string; artifacts: string[] }>
  currentMap: string
  hasZFC: boolean
  hasPortals: boolean
  playerLevel: number
}

interface ValidationResult {
  isValid: boolean
  scores: {
    syntax: boolean
    physics: boolean
    dimensionalConsistency: boolean
    causality: boolean
    gameBalance: boolean
    creativity: number
  }
  feedback: string[]
  totalScore: number
}

interface SphinxGeneratorProps {
  isVisible: boolean
}

// Templates de questions procédurales
const QUESTION_TEMPLATES = {
  BEGINNER: [
    {
      id: 'heisenberg_basic',
      physics: 'heisenberg_uncertainty',
      template: 'Dans Heroes of Time, un héros avec {artifact} veut {action}. Expliquez le principe d\'incertitude dans ce contexte.',
      expectedElements: ['principe incertitude', 'position', 'vitesse', 'hexagonal'],
      complexity: 0.3
    },
    {
      id: 'wave_particle',
      physics: 'wave_particle_duality',
      template: 'Un sort traverse {terrain_count} hexagones de {terrain_type}. Montrez la dualité onde-particule.',
      expectedElements: ['onde', 'particule', 'probabilité', 'hexagones'],
      complexity: 0.4
    }
  ],
  EXPERT: [
    {
      id: 'quantum_entanglement',
      physics: 'quantum_entanglement',
      template: '{hero1} et {hero2} sont intriqués quantiquement sur une carte {map_type}. Formulez l\'équation d\'intrication.',
      expectedElements: ['intrication', 'état Bell', 'corrélation', 'distance'],
      complexity: 0.7
    },
    {
      id: 'schrodinger_adaptation',
      physics: 'schrodinger_hex',
      template: 'Adaptez l\'équation de Schrödinger pour un héros en superposition sur géométrie hexagonale avec {special_condition}.',
      expectedElements: ['Schrödinger', 'hexagonal', 'hamiltonien', 'superposition'],
      complexity: 0.8
    }
  ],
  MASTER: [
    {
      id: 'causal_collapse',
      physics: 'causal_collapse',
      template: 'Avec l\'Œil de Wigner, {hero} force un collapse dans une ZFC. Formulez la rétroaction causale observateur-système.',
      expectedElements: ['collapse', 'causal', 'observateur', 'rétroaction', 'ZFC'],
      complexity: 1.2
    }
  ],
  LEGENDARY: [
    {
      id: 'meta_physics',
      physics: 'meta_temporal',
      template: 'Le joueur Jean-Grofignon utilise son Joint Cosmique pour voir le Panopticon. Expliquez la méta-physique de cette observation.',
      expectedElements: ['méta-observation', 'conscience', 'panopticon', 'boucle ontologique'],
      complexity: 2.0
    }
  ]
}

const SphinxGenerator: React.FC<SphinxGeneratorProps> = ({ isVisible }) => {
  const [currentQuestion, setCurrentQuestion] = useState<SphinxQuestion | null>(null)
  const [gameContext, setGameContext] = useState<GameContext | null>(null)
  const [playerAnswer, setPlayerAnswer] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [showHints, setShowHints] = useState(false)
  const [usedHints, setUsedHints] = useState(0)
  const [sphinxMode, setSphinxMode] = useState<'waiting' | 'questioning' | 'validating' | 'rewarding'>('waiting')

  // Charger le contexte de jeu
  useEffect(() => {
    if (isVisible) {
      loadGameContext()
    }
  }, [isVisible])

  const loadGameContext = async () => {
    try {
      // TODO: Récupérer le vrai contexte depuis l'API
      const mockContext: GameContext = {
        heroes: [
          { name: 'Arthur', artifacts: ['excalibur_temporal', 'crown_of_wisdom'] },
          { name: 'Jean-Grofignon', artifacts: ['joint_cosmique', 'canapé_quantique'] }
        ],
        currentMap: 'temporal_rift',
        hasZFC: true,
        hasPortals: true,
        playerLevel: 3
      }
      setGameContext(mockContext)
    } catch (error) {
      console.error('Erreur chargement contexte:', error)
    }
  }

  // Générer une nouvelle question
  const generateQuestion = async () => {
    if (!gameContext) return

    setIsGenerating(true)
    setSphinxMode('questioning')
    setPlayerAnswer('')
    setValidationResult(null)
    setUsedHints(0)

    try {
      // Déterminer la difficulté basée sur le niveau du joueur
      let difficulty: keyof typeof QUESTION_TEMPLATES
      if (gameContext.playerLevel <= 1) difficulty = 'BEGINNER'
      else if (gameContext.playerLevel <= 3) difficulty = 'EXPERT'
      else if (gameContext.playerLevel <= 5) difficulty = 'MASTER'
      else difficulty = 'LEGENDARY'

      // Sélectionner un template aléatoire
      const templates = QUESTION_TEMPLATES[difficulty]
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)]

      // Générer les variables contextuelles
      const variables = generateContextualVariables(selectedTemplate, gameContext)
      
      // Créer la question
      let questionText = selectedTemplate.template
      Object.entries(variables).forEach(([key, value]) => {
        questionText = questionText.replace(`{${key}}`, value as string)
      })

      // Générer les indices
      const hints = generateHints(selectedTemplate, variables)

      const newQuestion: SphinxQuestion = {
        id: `${difficulty.toLowerCase()}_${Date.now()}`,
        difficulty,
        template: selectedTemplate.id,
        question: questionText,
        context: gameContext,
        expectedElements: selectedTemplate.expectedElements,
        hints,
        physicsType: selectedTemplate.physics
      }

      setCurrentQuestion(newQuestion)
    } catch (error) {
      console.error('Erreur génération question:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Générer des variables contextuelles
  const generateContextualVariables = (template: any, context: GameContext) => {
    const variables: Record<string, string> = {}

    // Variables basées sur le contexte de jeu
    if (context.heroes.length > 0) {
      variables.hero = context.heroes[0].name
      variables.hero1 = context.heroes[0].name
      variables.hero2 = context.heroes[1]?.name || 'Lysandrel'
    }

    if (context.heroes[0]?.artifacts.length > 0) {
      variables.artifact = context.heroes[0].artifacts[0]
    }

    variables.map_type = context.currentMap
    variables.terrain_type = ['forest', 'mountain', 'water', 'desert'][Math.floor(Math.random() * 4)]
    variables.terrain_count = String(Math.floor(Math.random() * 8) + 3)

    // Conditions spéciales basées sur le contexte
    if (context.hasZFC) {
      variables.special_condition = 'rétroaction causale observateur-système'
    } else if (context.hasPortals) {
      variables.special_condition = 'portails quantiques actifs'
    } else {
      variables.special_condition = 'effet tunnel probabiliste'
    }

    variables.action = ['mesurer la position exacte', 'prédire le mouvement futur', 'observer sans perturber'][Math.floor(Math.random() * 3)]

    return variables
  }

  // Générer des indices progressifs
  const generateHints = (template: any, variables: Record<string, string>) => {
    const baseHints = {
      heisenberg_basic: [
        'Considérez la relation ΔxΔp ≥ ℏ/2',
        'Pensez à l\'adaptation pour géométrie hexagonale',
        'La mesure perturbe l\'état quantique'
      ],
      quantum_entanglement: [
        'Utilisez les états de Bell |Φ⁺⟩ = (|00⟩ + |11⟩)/√2',
        'La corrélation persiste malgré la distance',
        'Formulez pour deux héros sur hexagones'
      ],
      schrodinger_adaptation: [
        'Équation: iℏ∂ψ/∂t = Ĥψ',
        'Adaptez le Hamiltonien pour géométrie hexagonale',
        'Incluez le potentiel causal V_causal'
      ],
      causal_collapse: [
        'Le collapse affecte les héros adjacents',
        'Rétroaction: V_causal = γ|⟨ψ_obs|ψ_game⟩|²',
        'Préservez la causalité temporelle'
      ],
      meta_physics: [
        'L\'observateur modifie la réalité observée',
        'Boucle ontologique: dashboard = manifestation des artefacts',
        'Conscience transcende les lois physiques'
      ]
    }

    return baseHints[template.id as keyof typeof baseHints] || [
      'Analysez les principes physiques fondamentaux',
      'Adaptez au contexte Heroes of Time',
      'Respectez la syntaxe HOTS'
    ]
  }

  // Valider la réponse du joueur
  const validateAnswer = async () => {
    if (!currentQuestion || !playerAnswer.trim()) return

    setSphinxMode('validating')

    try {
      // Validation basique côté client
      const validation = await validateAnswerBasic(playerAnswer, currentQuestion)
      setValidationResult(validation)
      
      setTimeout(() => {
        setSphinxMode('rewarding')
      }, 2000)

    } catch (error) {
      console.error('Erreur validation:', error)
    }
  }

  // Validation basique de la réponse
  const validateAnswerBasic = async (answer: string, question: SphinxQuestion): Promise<ValidationResult> => {
    const scores = {
      syntax: false,
      physics: false,
      dimensionalConsistency: false,
      causality: false,
      gameBalance: false,
      creativity: 0
    }

    const feedback: string[] = []
    
    // Vérifier syntaxe HOTS
    const hasHOTSSyntax = /ψ|⊙|†|HERO|CREATE|MOV/.test(answer)
    scores.syntax = hasHOTSSyntax || answer.includes('=') || answer.includes('∂')
    if (scores.syntax) feedback.push('✅ Syntaxe reconnue')
    else feedback.push('⚠️ Syntaxe HOTS ou équations recommandées')

    // Vérifier éléments physiques attendus
    const foundElements = question.expectedElements.filter(element => 
      answer.toLowerCase().includes(element.toLowerCase())
    )
    scores.physics = foundElements.length >= question.expectedElements.length * 0.6
    if (scores.physics) feedback.push(`✅ Éléments physiques trouvés: ${foundElements.join(', ')}`)
    else feedback.push(`⚠️ Éléments manquants: ${question.expectedElements.join(', ')}`)

    // Vérifier cohérence dimensionnelle
    scores.dimensionalConsistency = answer.includes('ℏ') || answer.includes('hexagon')
    if (scores.dimensionalConsistency) feedback.push('✅ Unités physiques détectées')

    // Vérifier causalité
    scores.causality = !answer.includes('paradox') || answer.includes('causal')
    if (scores.causality) feedback.push('✅ Causalité respectée')

    // Vérifier équilibrage jeu
    scores.gameBalance = answer.length > 50 && answer.length < 2000
    if (scores.gameBalance) feedback.push('✅ Réponse équilibrée')

    // Créativité basée sur longueur et complexité
    scores.creativity = Math.min(1, answer.length / 500 + (answer.match(/[ψ⊙†∂∇]/g)?.length || 0) * 0.1)

    const totalScore = Object.values(scores).reduce((sum, score) => {
      if (typeof score === 'boolean') return sum + (score ? 1 : 0)
      return sum + (score as number)
    }, 0) / 6

    // Ajuster selon les indices utilisés
    const penaltyScore = Math.max(0, totalScore - usedHints * 0.1)

    return {
      isValid: totalScore >= 0.6,
      scores,
      feedback,
      totalScore: penaltyScore
    }
  }

  // Afficher un indice
  const showHint = (hintIndex: number) => {
    if (!currentQuestion || hintIndex >= currentQuestion.hints.length) return
    setUsedHints((prev: number) => Math.max(prev, hintIndex + 1))
    setShowHints(true)
  }

  if (!isVisible) return null

  return (
    <div className="space-y-6">
      {/* Header Sphinx */}
      <div className="grut-card bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🦁</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-2">SPHINX QUANTIQUE</h2>
          <p className="text-grut-text-dim">Générateur procédural de défis physique quantique</p>
        </div>
      </div>

      {/* Contexte de Jeu */}
      {gameContext && (
        <div className="grut-card border-yellow-500/50">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Contexte de Jeu Actuel
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-grut-surface p-3 rounded">
              <div className="text-sm text-grut-text-dim">Héros Actifs</div>
              <div className="text-grut-text">
                {gameContext.heroes.map(hero => 
                  `${hero.name} (${hero.artifacts.length} artefacts)`
                ).join(', ')}
              </div>
            </div>
            
            <div className="bg-grut-surface p-3 rounded">
              <div className="text-sm text-grut-text-dim">Carte</div>
              <div className="text-grut-text">{gameContext.currentMap}</div>
            </div>
            
            <div className="bg-grut-surface p-3 rounded">
              <div className="text-sm text-grut-text-dim">Niveau Joueur</div>
              <div className="text-grut-text">Niveau {gameContext.playerLevel}</div>
            </div>
            
            <div className="bg-grut-surface p-3 rounded">
              <div className="text-sm text-grut-text-dim">Capacités Spéciales</div>
              <div className="text-grut-text">
                {gameContext.hasZFC ? '🌀 ZFC ' : ''}
                {gameContext.hasPortals ? '🌀 Portails ' : ''}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode Attente */}
      {sphinxMode === 'waiting' && (
        <div className="grut-card text-center">
          <div className="mb-6">
            <Brain className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <p className="text-lg text-grut-text">Le Sphinx médite dans les brumes de l'éternité...</p>
          </div>
          
          <button
            onClick={generateQuestion}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition-colors mx-auto"
          >
            {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {isGenerating ? 'Génération...' : 'INVOQUER LE SPHINX'}
          </button>
        </div>
      )}

      {/* Phase Question */}
      {sphinxMode === 'questioning' && currentQuestion && (
        <div className="space-y-4">
          <div className="grut-card border-red-500/50 bg-gradient-to-r from-red-500/10 to-purple-500/10">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-red-400 mb-2">
                🦁 DÉFI {currentQuestion.difficulty}
              </div>
              <div className="text-sm text-grut-text-dim">
                Type: {currentQuestion.physicsType} | Niveau requis: {currentQuestion.difficulty.toLowerCase()}
              </div>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="text-yellow-400 font-semibold mb-2">🦁 LE SPHINX PARLE :</div>
              <div className="text-grut-text text-lg italic">
                "{currentQuestion.question}"
              </div>
            </div>
          </div>

          {/* Zone de Réponse */}
          <div className="grut-card">
            <h3 className="text-lg font-semibold text-grut-secondary mb-4">📝 Votre Réponse</h3>
            
            <textarea
              value={playerAnswer}
              onChange={(e) => setPlayerAnswer(e.target.value)}
              className="w-full h-48 bg-grut-surface border border-grut-primary/30 rounded-lg p-4 text-grut-text font-mono text-sm resize-none focus:border-grut-primary focus:ring-1 focus:ring-grut-primary/50 focus:outline-none"
              placeholder="Formulez votre réponse avec équations HOTS ou physique quantique..."
            />
            
            {/* Indices */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-grut-text-dim" />
                <span className="text-sm text-grut-text-dim">Indices disponibles (pénalité: -10% par indice)</span>
              </div>
              
              <div className="flex gap-2">
                {currentQuestion.hints.map((hint, index) => (
                  <button
                    key={index}
                    onClick={() => showHint(index)}
                    disabled={usedHints > index}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      usedHints > index 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-grut-primary/20 text-grut-primary hover:bg-grut-primary/30'
                    }`}
                  >
                    💭 Indice {index + 1}
                  </button>
                ))}
              </div>
              
              {showHints && usedHints > 0 && (
                <div className="bg-grut-primary/10 p-3 rounded border-l-4 border-grut-primary">
                  <div className="text-grut-primary font-semibold mb-2">💡 Indices révélés :</div>
                  {currentQuestion.hints.slice(0, usedHints).map((hint, index) => (
                    <div key={index} className="text-sm text-grut-text-dim mb-1">
                      {index + 1}. {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-grut-text-dim">
                Caractères: {playerAnswer.length} | Indices utilisés: {usedHints}
              </div>
              
              <button
                onClick={validateAnswer}
                disabled={!playerAnswer.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 disabled:opacity-50 transition-colors"
              >
                <Award className="w-4 h-4" />
                SOUMETTRE AU SPHINX
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase Validation */}
      {sphinxMode === 'validating' && validationResult && (
        <div className="grut-card border-blue-500/50">
          <h3 className="text-lg font-semibold text-blue-400 mb-4 text-center">⚗️ VALIDATION SPHINX EN COURS...</h3>
          
          <div className="space-y-3">
            {Object.entries(validationResult.scores).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-grut-surface rounded">
                <span className="text-grut-text">
                  {key === 'syntax' ? '📝 Syntaxe HOTS' :
                   key === 'physics' ? '🧪 Physique Quantique' :
                   key === 'dimensionalConsistency' ? '📏 Cohérence Dimensionnelle' :
                   key === 'causality' ? '🕰️ Causalité Temporelle' :
                   key === 'gameBalance' ? '⚖️ Équilibrage Jeu' :
                   '🎨 Créativité'}
                </span>
                <span className={`flex items-center gap-1 ${
                  (typeof value === 'boolean' ? value : value > 0.5) ? 'text-green-400' : 'text-red-400'
                }`}>
                  {(typeof value === 'boolean' ? value : value > 0.5) ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {typeof value === 'number' ? `${Math.round(value * 100)}%` : (value ? 'OUI' : 'NON')}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-grut-primary/10 rounded border-l-4 border-grut-primary">
            <div className="font-semibold text-grut-primary mb-2">Score Total: {Math.round(validationResult.totalScore * 100)}%</div>
            <div className="text-sm space-y-1">
              {validationResult.feedback.map((msg, index) => (
                <div key={index} className="text-grut-text-dim">{msg}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Phase Récompenses */}
      {sphinxMode === 'rewarding' && validationResult && (
        <div className="grut-card border-yellow-500">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {validationResult.isValid ? '🏆' : '💭'}
            </div>
            
            <div className="text-2xl font-bold mb-4">
              {validationResult.isValid ? (
                <span className="text-green-400">🦁 SPHINX APPROUVE !</span>
              ) : (
                <span className="text-yellow-400">🦁 SPHINX ENCOURAGE</span>
              )}
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
              <div className="text-yellow-400 italic">
                {validationResult.isValid ? (
                  "Impressionnant, mortel ! Tu as montré une maîtrise digne des mystères quantiques. Garde cette sagesse précieusement."
                ) : (
                  "Ton approche montre de la promesse, mais les mystères quantiques demandent plus de méditation. Persévère dans ta quête de savoir."
                )}
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setSphinxMode('waiting')}
                className="flex items-center gap-2 px-4 py-2 bg-grut-primary text-black rounded-lg hover:bg-grut-primary/80 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Nouveau Défi
              </button>
              
              <button
                onClick={() => {
                  setCurrentQuestion(null)
                  setPlayerAnswer('')
                  setValidationResult(null)
                  setSphinxMode('waiting')
                }}
                className="flex items-center gap-2 px-4 py-2 bg-grut-secondary text-black rounded-lg hover:bg-grut-secondary/80 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Retour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SphinxGenerator 