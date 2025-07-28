import React, { useState, useEffect } from 'react'
import { Zap, Eye, Hammer, Sparkles, Play, CheckCircle, FileText, Trash2, Shuffle } from 'lucide-react'
import GrutApiService from '../services/grutApiService'

// Définition des runes quantiques HOTS
const QUANTUM_RUNES = [
  { symbol: 'ψ', name: 'Psi-State', description: 'État quantique superposé', example: 'ψ001: ⊙(...)' },
  { symbol: '⊙', name: 'Superposition', description: 'Action en superposition', example: '⊙(Δt+2 @15,15 ⟶ MOV(...))' },
  { symbol: '†', name: 'Collapse', description: 'Effondrement d\'état', example: '†ψ001' },
  { symbol: 'Π', name: 'Observation', description: 'Déclencheur d\'observation', example: 'Π(condition) ⇒ †ψ001' },
  { symbol: 'Δt', name: 'Délai Temporel', description: 'Délai en tours', example: 'Δt+2' },
  { symbol: '@', name: 'Coordonnées', description: 'Position spatiale', example: '@15,15' },
  { symbol: 'ℬ', name: 'Branche', description: 'Branche temporelle', example: 'ℬ1, ℬ2' },
  { symbol: '⟶', name: 'Projection', description: 'Effet ou action', example: '⟶ MOV(...)' },
  { symbol: '⨉', name: 'Conflit', description: 'Conflit de timeline', example: '⨉(ψ001, ψ002)' },
  { symbol: '↺', name: 'Rollback', description: 'Retour potentiel', example: '↺ψ001' },
  { symbol: 'τ', name: 'Marqueur', description: 'Marqueur temporel', example: 'τ+3' },
  { symbol: 'Ω', name: 'Omega', description: 'Finalité ultime', example: 'Ω(end_state)' },
  { symbol: '∞', name: 'Infini', description: 'Boucle temporelle', example: '∞(loop_condition)' },
  { symbol: '⚡', name: 'Énergie', description: 'Énergie temporelle', example: '⚡100' }
]

// Exemples de scripts avec forge d'artefacts
const SCRIPT_EXAMPLES = [
  {
    title: "🦸 Création de Héros",
    code: "HERO(Arthur)\nHERO(Jean-Grofignon)"
  },
  {
    title: "⚡ État Quantique Simple", 
    code: "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))"
  },
  {
    title: "🔮 Forge d'Excalibur Quantique",
    code: `# Forge d'Excalibur Quantique
FORGE(WEAPON, excalibur_quantum) {
  MATERIAL: temporal_steel + quantum_crystal
  ENCHANT: reality_cutting + timeline_pierce
  POWER: 9000
  RUNES: ψ†⊙∞
}
EQUIP(excalibur_quantum, HERO:Arthur)`
  },
  {
    title: "⚔️ Forge d'Armure Temporelle",
    code: `# Armure du Voyageur Temporel
FORGE(ARMOR, temporal_mail) {
  MATERIAL: chronium_plates + void_silk
  ENCHANT: time_resistance + causal_immunity
  DEFENSE: 750
  RUNES: Δt↺⚡
}
EQUIP(temporal_mail, HERO:Jean-Grofignon)`
  },
  {
    title: "🦁 Sphinx Quantique + Énigmes",
    code: `# Invocation du Sphinx Quantique
SUMMON(CREATURE, sphinx_quantum) {
  LOCATION: @25,25
  RIDDLE_TYPE: physics_quantum
  DIFFICULTY: legendary
  REWARD: tier8_artifact
}

# Test de connaissance
ASK(sphinx_quantum, "Comment l'intrication quantique
affecte-t-elle les héros liés ?")

IF(player_answer == correct) {
  REWARD(ARTIFACT, quantum_medallion)
  †ψ999: ENLIGHTENMENT(player)
} ELSE {
  CURSE(player, sphinx_confusion)
}`
  },
  {
    title: "🌀 Script Quantique Complexe",
    code: `ψ001: ⊙(Δt+3 @10,10 ⟶ CREATE(CREATURE, quantum_phoenix, @10,10))
ψ002: ⊙(Δt+5 ⟶ BATTLE(Jean-Grofignon, quantum_phoenix))
†ψ001
Π(hp_low) ⇒ †ψ002`
  }
]

interface RunicForgeProps {
  isVisible: boolean
}

const RunicForge: React.FC<RunicForgeProps> = ({ isVisible }) => {
  const [script, setScript] = useState('')
  const [activeTab, setActiveTab] = useState<'validation' | 'translation' | 'execution' | 'help'>('validation')
  const [output, setOutput] = useState('')
  const [outputType, setOutputType] = useState<'success' | 'error' | 'info'>('info')
  const [isProcessing, setIsProcessing] = useState(false)
  const [backendStatus, setBackendStatus] = useState<'online' | 'offline' | 'checking'>('checking')

  // Vérifier le statut du backend
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const isHealthy = await GrutApiService.checkBackendHealth()
        setBackendStatus(isHealthy ? 'online' : 'offline')
      } catch (error) {
        setBackendStatus('offline')
      }
    }
    
    checkBackend()
    const interval = setInterval(checkBackend, 30000)
    return () => clearInterval(interval)
  }, [])

  // Insérer une rune dans l'éditeur
  const insertRune = (symbol: string) => {
    const textarea = document.getElementById('script-editor') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = script.substring(0, start) + symbol + script.substring(end)
      setScript(newValue)
      
      // Remettre le focus et positionner le curseur
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + symbol.length, start + symbol.length)
      }, 0)
    }
  }

  // Charger un exemple de script
  const loadExample = (exampleCode: string) => {
    setScript(exampleCode)
    setOutput('📖 Exemple chargé dans l\'éditeur')
    setOutputType('info')
  }

  // Valider le script
  const validateScript = async () => {
    if (!script.trim()) {
      setOutput('⚠️ Aucun script à valider')
      setOutputType('error')
      return
    }

    setIsProcessing(true)
    setOutput('🔍 Validation en cours...')
    setOutputType('info')

    try {
      if (backendStatus === 'online') {
        // TODO: Implémenter validation via API backend
        const result = await validateScriptBasic(script)
        setOutput(result.message)
        setOutputType(result.isValid ? 'success' : 'error')
      } else {
        const result = await validateScriptBasic(script)
        setOutput(`⚠️ Backend hors ligne, validation basique:\n\n${result.message}`)
        setOutputType(result.isValid ? 'success' : 'error')
      }
    } catch (error) {
      setOutput(`❌ Erreur de validation: ${error}`)
      setOutputType('error')
    } finally {
      setIsProcessing(false)
    }
  }

  // Validation basique côté client
  const validateScriptBasic = async (scriptText: string) => {
    const lines = scriptText.split('\n').filter(line => line.trim())
    const errors: string[] = []
    const warnings: string[] = []
    
    lines.forEach((line, index) => {
      line = line.trim()
      if (!line || line.startsWith('#')) return
      
      // Vérifier les commandes de base
      const basicCommands = ['HERO', 'CREATE', 'USE', 'MOV', 'BATTLE', 'FORGE', 'SUMMON']
      const hasBasicCommand = basicCommands.some(cmd => line.includes(cmd))
      const hasQuantumState = line.includes('ψ') || line.includes('⊙')
      
      if (!hasBasicCommand && !hasQuantumState) {
        warnings.push(`Ligne ${index + 1}: Commande non reconnue - ${line.substring(0, 30)}...`)
      }
      
      // Vérifier la syntaxe des états quantiques
      if (line.includes('ψ') && !line.includes('⊙')) {
        errors.push(`Ligne ${index + 1}: État ψ sans superposition ⊙`)
      }
      
      // Vérifier les coordonnées
      if (line.includes('@') && !/@\d+,\d+/.test(line)) {
        warnings.push(`Ligne ${index + 1}: Format de coordonnées suspect`)
      }
    })
    
    let message = `📊 Analyse terminée:\n\n`
    message += `Lignes analysées: ${lines.length}\n`
    message += `Erreurs: ${errors.length}\n`
    message += `Avertissements: ${warnings.length}\n\n`
    
    if (errors.length > 0) {
      message += `❌ Erreurs:\n${errors.join('\n')}\n\n`
    }
    
    if (warnings.length > 0) {
      message += `⚠️ Avertissements:\n${warnings.join('\n')}\n\n`
    }
    
    if (errors.length === 0 && warnings.length === 0) {
      message += `✅ Aucun problème détecté !`
    }
    
    return {
      isValid: errors.length === 0,
      message: message
    }
  }

  // Traduire le script
  const translateScript = async () => {
    if (!script.trim()) {
      setOutput('⚠️ Aucun script à traduire')
      setOutputType('error')
      return
    }

    setIsProcessing(true)
    setOutput('🌸 Traduction en cours...')
    setOutputType('info')

    try {
      const translation = translateScriptBasic(script)
      setOutput(translation)
      setOutputType('success')
    } catch (error) {
      setOutput(`❌ Erreur de traduction: ${error}`)
      setOutputType('error')
    } finally {
      setIsProcessing(false)
    }
  }

  // Traduction basique côté client
  const translateScriptBasic = (scriptText: string) => {
    let translation = scriptText
    
    // Mapping des héros
    const heroMappings: Record<string, string> = {
      'Jean-Grofignon': 'Jean-Grofignon, l\'Éveillé Ontologique',
      'Arthur': 'Arthur, le Roi Temporel',
      'Claudius': 'Claudius, l\'Architecte du Multivers'
    }
    
    // Remplacements
    translation = translation.replace(/ψ\d+:/g, 'Dans les brumes quantiques:')
    translation = translation.replace(/@(\d+),(\d+)/g, 'aux coordonnées mystiques ($1, $2)')
    
    // Remplacer les héros
    Object.entries(heroMappings).forEach(([id, desc]) => {
      translation = translation.replace(new RegExp(id, 'g'), desc)
    })
    
    return `🌸 Traduction Littéraire:\n\n${translation}`
  }

  // Exécuter le script
  const executeScript = async () => {
    if (!script.trim()) {
      setOutput('⚠️ Aucun script à exécuter')
      setOutputType('error')
      return
    }

    setIsProcessing(true)
    setOutput('🚀 Exécution en cours...')
    setOutputType('info')

    try {
      if (backendStatus === 'online') {
        // TODO: Implémenter exécution via API backend
        setOutput('🚀 Exécution simulée - Backend connecté')
        setOutputType('success')
      } else {
        setOutput('❌ Backend hors ligne - Impossible d\'exécuter le script')
        setOutputType('error')
      }
    } catch (error) {
      setOutput(`❌ Erreur d'exécution: ${error}`)
      setOutputType('error')
    } finally {
      setIsProcessing(false)
    }
  }

  // Générer une question Sphinx simple
  const generateSphinxQuestion = () => {
    const questions = [
      {
        question: "🦁 SPHINX : Quelle rune représente un état quantique ?",
        answer: "ψ (Psi) représente un état quantique superposé"
      },
      {
        question: "🦁 SPHINX : Comment forger Excalibur Quantique ?",
        answer: "FORGE(WEAPON, excalibur_quantum) avec runes ψ†⊙∞"
      }
    ]
    
    const randomQ = questions[Math.floor(Math.random() * questions.length)]
    setScript(`// ${randomQ.question}\n\n// 💡 Réponse: ${randomQ.answer}\n\n// Écrivez votre implémentation:`)
    setOutput('🦁 Question Sphinx générée ! Implémentez votre solution.')
    setOutputType('info')
  }

  // Afficher l'aide
  const showHelp = () => {
    let help = `🔮 AIDE - FORGE RUNIQUE QUANTIQUE\n\n`
    help += `📚 SYMBOLES QUANTIQUES HOTS:\n\n`
    
    QUANTUM_RUNES.forEach(rune => {
      help += `${rune.symbol} - ${rune.name}: ${rune.description}\n`
      help += `   Exemple: ${rune.example}\n\n`
    })
    
    help += `🎯 COMMANDES DE BASE:\n\n`
    help += `HERO(nom) - Créer un héros\n`
    help += `FORGE(type, nom) - Forger un artefact\n`
    help += `CREATE(type, id) - Créer un objet\n`
    help += `USE(type, id, HERO:nom) - Utiliser un objet\n`
    help += `MOV(héros, @x,y) - Déplacer un héros\n`
    help += `BATTLE(héros1, héros2) - Combat\n\n`
    
    help += `💡 CONSEILS:\n\n`
    help += `• Cliquez sur les runes pour les insérer\n`
    help += `• Utilisez les exemples comme base\n`
    help += `• Validez avant d'exécuter\n`
    help += `• La traduction montre la version littéraire\n`
    
    setOutput(help)
    setOutputType('info')
  }

  if (!isVisible) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grut-card bg-gradient-to-r from-grut-primary/20 to-grut-secondary/20 border-grut-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hammer className="w-8 h-8 text-grut-primary" />
            <div>
              <h2 className="text-2xl font-bold text-grut-primary">⚒️ Forge Runique Quantique</h2>
              <p className="text-grut-text-dim">Éditeur HOTS avec palette de runes quantiques</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm">
              Backend: <span className={`font-semibold ${
                backendStatus === 'online' ? 'text-green-400' : 
                backendStatus === 'offline' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {backendStatus === 'online' ? '🟢 En ligne' : 
                 backendStatus === 'offline' ? '🔴 Hors ligne' : '🟡 Vérification...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Palette de Runes */}
        <div className="grut-card">
          <h3 className="text-lg font-semibold text-grut-secondary mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Runes Quantiques
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            {QUANTUM_RUNES.map((rune, index) => (
              <button
                key={index}
                onClick={() => insertRune(rune.symbol)}
                className="p-3 rounded-lg bg-grut-surface border border-grut-primary/30 hover:border-grut-primary hover:bg-grut-primary/10 transition-all duration-200 group"
                title={`${rune.name}: ${rune.description}\nExemple: ${rune.example}`}
              >
                <div className="text-xl text-grut-primary group-hover:scale-110 transition-transform duration-200">
                  {rune.symbol}
                </div>
                <div className="text-xs text-grut-text-dim mt-1">{rune.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Éditeur de Script */}
        <div className="lg:col-span-2 grut-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-grut-secondary flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Éditeur HOTS
            </h3>
            
            <div className="flex gap-2">
              <button
                onClick={() => setScript('')}
                className="p-2 rounded text-grut-text-dim hover:text-red-400 transition-colors"
                title="Effacer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const randomExample = SCRIPT_EXAMPLES[Math.floor(Math.random() * SCRIPT_EXAMPLES.length)]
                  loadExample(randomExample.code)
                }}
                className="p-2 rounded text-grut-text-dim hover:text-grut-secondary transition-colors"
                title="Exemple aléatoire"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <textarea
            id="script-editor"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-64 bg-grut-surface border border-grut-primary/30 rounded-lg p-4 text-grut-text font-mono text-sm resize-none focus:border-grut-primary focus:ring-1 focus:ring-grut-primary/50 focus:outline-none"
            placeholder="Écrivez votre script HOTS ici..."
          />
          
          {/* Boutons d'action */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={validateScript}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-grut-primary text-black rounded-lg hover:bg-grut-primary/80 disabled:opacity-50 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Valider
            </button>
            
            <button
              onClick={translateScript}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-grut-secondary text-black rounded-lg hover:bg-grut-secondary/80 disabled:opacity-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Traduire
            </button>
            
            <button
              onClick={executeScript}
              disabled={isProcessing || backendStatus !== 'online'}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors"
            >
              <Play className="w-4 h-4" />
              Exécuter
            </button>
            
            <button
              onClick={generateSphinxQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Sphinx
            </button>
          </div>
        </div>
      </div>

      {/* Exemples de Scripts */}
      <div className="grut-card">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4">📚 Exemples de Scripts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SCRIPT_EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(example.code)}
              className="p-4 rounded-lg bg-grut-surface border border-grut-primary/30 hover:border-grut-primary hover:bg-grut-primary/10 transition-all duration-200 text-left"
            >
              <div className="font-semibold text-grut-primary mb-2">{example.title}</div>
              <div className="text-xs text-grut-text-dim font-mono">
                {example.code.substring(0, 50)}...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Zone de Sortie */}
      <div className="grut-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-grut-secondary">📤 Sortie</h3>
          
          <div className="flex gap-1">
            {(['validation', 'translation', 'execution', 'help'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  if (tab === 'help') showHelp()
                }}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  activeTab === tab 
                    ? 'bg-grut-primary text-black' 
                    : 'text-grut-text-dim hover:text-grut-primary'
                }`}
              >
                {tab === 'validation' ? 'Validation' :
                 tab === 'translation' ? 'Traduction' :
                 tab === 'execution' ? 'Exécution' : 'Aide'}
              </button>
            ))}
          </div>
        </div>
        
        <div className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
          outputType === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' :
          outputType === 'error' ? 'bg-red-500/10 border border-red-500/30 text-red-400' :
          'bg-grut-surface border border-grut-primary/30 text-grut-text'
        }`}>
          {output || 'Aucune sortie pour le moment...'}
        </div>
      </div>
    </div>
  )
}

export default RunicForge 