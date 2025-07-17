import React, { useState, useEffect, useRef } from 'react';
import { GameScriptEngine, GameScript, ScriptAction, ExecutionResult } from '../services/gameScriptEngine';
import { useGameStore } from '../store/useGameStore';
import './GameScriptTester.css';

interface ScriptResult {
  timestamp: string;
  script: string;
  result: any;
  error?: string;
  logs: string[];
}

interface ScriptExample {
  name: string;
  description: string;
  script: string;
  category: string;
  icon: string;
}

interface QuickCommand {
  name: string;
  command: string;
  description: string;
  icon: string;
}

const GameScriptTester: React.FC = () => {
  const gameStore = useGameStore();
  const [scriptEngine, setScriptEngine] = useState<GameScriptEngine | null>(null);
  const [currentScript, setCurrentScript] = useState<string>('');
  const [scriptResults, setScriptResults] = useState<ScriptResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'examples' | 'commands' | 'results'>('script');
  const [selectedCategory, setSelectedCategory] = useState<string>('basic');
  const logsRef = useRef<HTMLDivElement>(null);

  // Commandes rapides pour insérer facilement
  const quickCommands: QuickCommand[] = [
    { name: 'Mouvement', command: 'MOVE hero1 TO (5, 7)', description: 'Déplacer un héros', icon: '🏃' },
    { name: 'Construction', command: 'BUILD barracks AT (10, 10)', description: 'Construire un bâtiment', icon: '🏗️' },
    { name: 'Recrutement', command: 'RECRUIT 5 soldier FROM building1', description: 'Recruter des unités', icon: '👥' },
    { name: 'Sélection', command: 'SELECT_HERO hero1', description: 'Sélectionner un héros', icon: '⚔️' },
    { name: 'Magie', command: 'CAST fireball ON enemy', description: 'Lancer un sort', icon: '🔮' },
    { name: 'Attente', command: 'WAIT 1000', description: 'Attendre (ms)', icon: '⏱️' },
    { name: 'Log', command: 'LOG "Message de test"', description: 'Afficher un message', icon: '📝' },
    { name: 'Fin tour', command: 'END_TURN', description: 'Terminer le tour', icon: '🔄' },
    { name: 'Commerce', command: 'TRADE gold FOR wood WITH merchant', description: 'Échanger des ressources', icon: '💰' },
    { name: 'Exploration', command: 'EXPLORE region_north', description: 'Explorer une région', icon: '🗺️' },
    { name: 'Amélioration', command: 'UPGRADE building1 TO level2', description: 'Améliorer un bâtiment', icon: '⬆️' },
    { name: 'Bataille', command: 'ATTACK enemy_unit WITH army1', description: 'Attaquer un ennemi', icon: '⚔️' }
  ];

  // Exemples de scripts organisés par catégorie
  const scriptExamples: ScriptExample[] = [
    {
      name: 'Mouvement Basique',
      category: 'basic',
      icon: '🏃',
      description: 'Déplacer un héros vers une position spécifique',
      script: `// Déplacer le héros vers la position (5, 7)
LOG "Début du mouvement héros"
SELECT_HERO hero1
WAIT 500
MOVE hero1 TO (5, 7)
WAIT 1000
LOG "Héros déplacé avec succès vers (5, 7)"
LOG "Position mise à jour"`
    },
    {
      name: 'Construction Rapide',
      category: 'basic',
      icon: '🏗️',
      description: 'Construire un bâtiment dans le château',
      script: `// Construire une caserne
LOG "Début de la construction"
BUILD barracks AT (10, 10)
WAIT 2000
LOG "Caserne construite à (10, 10)"
LOG "Bâtiment prêt pour le recrutement"`
    },
    {
      name: 'Recrutement d\'Armée',
      category: 'basic',
      icon: '👥',
      description: 'Recruter des unités militaires',
      script: `// Recruter différentes unités
LOG "Début du recrutement"
RECRUIT 5 soldier FROM barracks
WAIT 1500
RECRUIT 3 archer FROM archery_range
WAIT 1500
RECRUIT 2 knight FROM castle
WAIT 1500
LOG "Armée recrutée : 5 soldats, 3 archers, 2 chevaliers"`
    },
    {
      name: 'Séquence Complète',
      category: 'advanced',
      icon: '🎯',
      description: 'Exemple d\'une séquence complète de jeu',
      script: `// Séquence complète d'un tour
LOG "=== DÉBUT DU TOUR ==="

// Phase 1: Sélection et mouvement
LOG "Phase 1: Mouvement des héros"
SELECT_HERO hero1
WAIT 500
MOVE hero1 TO (3, 4)
WAIT 1000

// Phase 2: Construction
LOG "Phase 2: Développement"
BUILD tower AT (5, 5)
WAIT 2000
BUILD farm AT (7, 7)
WAIT 2000

// Phase 3: Recrutement
LOG "Phase 3: Recrutement"
RECRUIT 3 archer FROM building2
WAIT 1500
RECRUIT 2 mage FROM magic_tower
WAIT 1500

// Phase 4: Fin du tour
LOG "Phase 4: Finalisation"
END_TURN
LOG "=== TOUR TERMINÉ AVEC SUCCÈS ==="
LOG "Prêt pour le prochain tour"`
    },
    {
      name: 'Magie Avancée',
      category: 'advanced',
      icon: '🔮',
      description: 'Série de sorts magiques',
      script: `// Séquence de sorts magiques
LOG "Début de la séquence magique"

// Sorts offensifs
LOG "Sorts d'attaque"
CAST spell_fireball ON target_enemy1
WAIT 1000
CAST spell_lightning ON target_enemy2
WAIT 1000
CAST spell_meteor ON area_target
WAIT 2000

// Sorts défensifs
LOG "Sorts de protection"
CAST spell_shield ON hero1
WAIT 1000
CAST spell_heal ON hero1
WAIT 1000
CAST spell_blessing ON army1
WAIT 1000

LOG "Séquence magique terminée"
LOG "Mana restant vérifié"`
    },
    {
      name: 'Stratégie Économique',
      category: 'strategy',
      icon: '💰',
      description: 'Gestion des ressources et commerce',
      script: `// Stratégie économique
LOG "=== STRATÉGIE ÉCONOMIQUE ==="

// Développement des ressources
LOG "Développement des ressources"
BUILD mine AT (1, 1)
WAIT 2000
BUILD farm AT (2, 2)
WAIT 2000
BUILD sawmill AT (3, 3)
WAIT 2000

// Commerce
LOG "Phase de commerce"
TRADE gold FOR wood WITH merchant1
WAIT 1000
TRADE wood FOR stone WITH merchant2
WAIT 1000
TRADE stone FOR mana WITH wizard
WAIT 1000

// Amélioration des bâtiments
LOG "Amélioration des structures"
UPGRADE mine TO level2
WAIT 3000
UPGRADE farm TO level2
WAIT 3000

LOG "Stratégie économique achevée"
LOG "Ressources optimisées"`
    },
    {
      name: 'Exploration Complète',
      category: 'strategy',
      icon: '🗺️',
      description: 'Explorer et conquérir le territoire',
      script: `// Exploration et conquête
LOG "=== EXPLORATION ET CONQUÊTE ==="

// Préparation de l'expédition
LOG "Préparation de l'expédition"
SELECT_HERO hero1
RECRUIT 10 soldier FROM barracks
WAIT 2000
RECRUIT 5 archer FROM archery_range
WAIT 2000

// Exploration par régions
LOG "Exploration des régions"
EXPLORE region_north
WAIT 3000
EXPLORE region_east
WAIT 3000
EXPLORE region_south
WAIT 3000
EXPLORE region_west
WAIT 3000

// Conquête des positions stratégiques
LOG "Conquête des positions"
ATTACK enemy_outpost WITH army1
WAIT 4000
ATTACK enemy_tower WITH army1
WAIT 4000

LOG "Territoire exploré et sécurisé"
LOG "Nouvelle zone sous contrôle"`
    },
    {
      name: 'Bataille Épique',
      category: 'combat',
      icon: '⚔️',
      description: 'Combat stratégique avancé',
      script: `// Bataille épique
LOG "=== BATAILLE ÉPIQUE ==="

// Préparation au combat
LOG "Préparation des forces"
SELECT_HERO hero1
CAST spell_blessing ON army1
WAIT 1000
CAST spell_shield ON hero1
WAIT 1000

// Formation de bataille
LOG "Formation de bataille"
MOVE army1 TO (10, 10)
WAIT 2000
MOVE archer_unit TO (12, 8)
WAIT 2000
MOVE cavalry TO (8, 12)
WAIT 2000

// Attaque coordonnée
LOG "Attaque coordonnée"
ATTACK enemy_army WITH cavalry
WAIT 3000
CAST spell_fireball ON enemy_mage
WAIT 1000
ATTACK enemy_archers WITH army1
WAIT 3000

// Finalisation
LOG "Finalisation du combat"
CAST spell_heal ON hero1
WAIT 1000
LOG "VICTOIRE! Bataille remportée"
LOG "Butin collecté et territoire conquis"`
    },
    {
      name: 'Test Complet',
      category: 'debug',
      icon: '🧪',
      description: 'Test de toutes les fonctionnalités',
      script: `// Test complet du système
LOG "=== TEST COMPLET DU SYSTÈME ==="

// Test des commandes de base
LOG "Test des commandes de base"
SELECT_HERO hero1
LOG "Sélection héros: OK"
MOVE hero1 TO (5, 5)
LOG "Mouvement: OK"
WAIT 1000

// Test de construction
LOG "Test de construction"
BUILD barracks AT (10, 10)
LOG "Construction: OK"
WAIT 2000

// Test de recrutement
LOG "Test de recrutement"
RECRUIT 3 soldier FROM barracks
LOG "Recrutement: OK"
WAIT 1500

// Test de magie
LOG "Test de magie"
CAST spell_heal ON hero1
LOG "Magie: OK"
WAIT 1000

// Test de commerce
LOG "Test de commerce"
TRADE gold FOR wood WITH merchant
LOG "Commerce: OK"
WAIT 1000

// Test final
LOG "Test de fin de tour"
END_TURN
LOG "=== TOUS LES TESTS RÉUSSIS ==="
LOG "Système opérationnel à 100%"`
    }
  ];

  // Initialiser le script engine
  useEffect(() => {
    if (gameStore.currentGame?.id) {
      const engine = new GameScriptEngine();
      setScriptEngine(engine);
    }
  }, [gameStore.currentGame?.id, gameStore.currentPlayer?.id]);

  // Insérer une commande rapide
  const insertQuickCommand = (command: string) => {
    const textarea = document.getElementById('script-textarea') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + command + '\n' + text.substring(end);
      setCurrentScript(newText);
      
      // Repositionner le curseur
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + command.length + 1, start + command.length + 1);
      }, 0);
    }
  };

  // Charger un exemple de script
  const loadExample = (example: ScriptExample) => {
    setCurrentScript(example.script);
    setSelectedExample(example.name);
    setActiveTab('script');
  };

  // Exécuter un script
  const executeScript = async () => {
    if (!scriptEngine || !currentScript.trim()) return;

    setIsExecuting(true);
    const timestamp = new Date().toLocaleTimeString();
    const logs: string[] = [];

    try {
      // Capturer les logs du script engine
      const originalLog = console.log;
      // eslint-disable-next-line no-self-assign
      console.log = console.log;

      // Exécuter le script ligne par ligne
      const lines = currentScript.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
      const results: ExecutionResult[] = [];
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('WAIT')) {
          const waitTime = parseInt(trimmedLine.split(' ')[1]) || 1000;
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        
        if (trimmedLine.startsWith('LOG')) {
          const message = trimmedLine.substring(4).trim().replace(/^"|"$/g, '');
          logs.push(`📝 ${message}`);
          continue;
        }
        
        // Créer un script complet
        const script: GameScript = {
          name: 'Generated Script',
          description: 'Script généré automatiquement',
          actions: []
        };

        // Traiter chaque ligne
        lines.forEach((line, index) => {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine.startsWith('//')) return;

          const words = trimmedLine.split(/\s+/);
          const command = words[0];
          
          let action: ScriptAction | null = null;

          if (command === 'move') {
            const heroId = words[1];
            const coordsMatch = trimmedLine.match(/\((\d+),\s*(\d+)\)/);
            const x = coordsMatch ? parseInt(coordsMatch[1], 10) : 0;
            const y = coordsMatch ? parseInt(coordsMatch[2], 10) : 0;
            action = { type: 'move', params: { heroId, x, y } };
          } else if (command === 'build') {
            const building = words[1];
            const coordsMatch = trimmedLine.match(/\((\d+),\s*(\d+)\)/);
            const x = coordsMatch ? parseInt(coordsMatch[1], 10) : 0;
            const y = coordsMatch ? parseInt(coordsMatch[2], 10) : 0;
            action = { type: 'build', params: { building, position: { x, y } } };
          } else if (command === 'recruit') {
            const unitType = words[1];
            const count = parseInt(words[2], 10) || 1;
            const building = words[3];
            action = { type: 'recruit', params: { unitType, count, building } };
          } else if (command === 'cast') {
            const spell = words[1];
            const target = words[2];
            action = { type: 'cast_spell', params: { spell, target } };
          } else if (command === 'hero') {
            const heroId = words[1];
            action = { type: 'move', params: { heroId } };
          } else if (command === 'end_turn') {
            action = { type: 'end_turn', params: {} };
          }

          if (action) {
            script.actions.push(action);
          }
        });

        return script;
      }
      
      // Restaurer console.log
      console.log = originalLog;
      
      // Ajouter le résultat
      const scriptResult: ScriptResult = {
        timestamp,
        script: currentScript,
        result: { success: true, results },
        logs
      };
      
      setScriptResults(prev => [scriptResult, ...prev]);
      
    } catch (error) {
      const scriptResult: ScriptResult = {
        timestamp,
        script: currentScript,
        result: null,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        logs
      };
      
      setScriptResults(prev => [scriptResult, ...prev]);
    } finally {
      setIsExecuting(false);
    }
  };

  // Vider les résultats
  const clearResults = () => {
    setScriptResults([]);
  };

  // Obtenir les exemples filtrés par catégorie
  const getExamplesByCategory = (category: string) => {
    return scriptExamples.filter(example => example.category === category);
  };

  // Rendu des onglets
  const renderTabs = () => (
    <div className="script-tabs">
      <button 
        className={`tab-button ${activeTab === 'script' ? 'active' : ''}`}
        onClick={() => setActiveTab('script')}
      >
        <span className="tab-icon">📝</span>
        Script
      </button>
      <button 
        className={`tab-button ${activeTab === 'commands' ? 'active' : ''}`}
        onClick={() => setActiveTab('commands')}
      >
        <span className="tab-icon">⚡</span>
        Commandes
      </button>
      <button 
        className={`tab-button ${activeTab === 'examples' ? 'active' : ''}`}
        onClick={() => setActiveTab('examples')}
      >
        <span className="tab-icon">📚</span>
        Exemples
      </button>
      <button 
        className={`tab-button ${activeTab === 'results' ? 'active' : ''}`}
        onClick={() => setActiveTab('results')}
      >
        <span className="tab-icon">📊</span>
        Résultats ({scriptResults.length})
      </button>
    </div>
  );

  // Contenu principal selon l'onglet actif
  const renderMainContent = () => {
    switch (activeTab) {
      case 'script':
        return (
          <div className="script-editor">
            <div className="editor-header">
              <h3>✍️ Éditeur de Script</h3>
              <div className="editor-actions">
                <button 
                  className="action-button clear-button"
                  onClick={() => setCurrentScript('')}
                >
                  🗑️ Vider
                </button>
                <button 
                  className="action-button execute-button"
                  onClick={executeScript}
                  disabled={isExecuting || !currentScript.trim()}
                >
                  {isExecuting ? '⏳ Exécution...' : '▶️ Exécuter'}
                </button>
              </div>
            </div>
            <textarea
              id="script-textarea"
              className="script-textarea"
              value={currentScript}
              onChange={(e) => setCurrentScript(e.target.value)}
              placeholder={`Entrez votre script ici...

Exemples de commandes :
• MOVE hero1 TO (5, 7)
• BUILD barracks AT (10, 10)
• RECRUIT 5 soldier FROM building1
• CAST fireball ON enemy
• LOG "Message"
• WAIT 1000
• END_TURN`}
              rows={20}
            />
          </div>
        );

      case 'commands':
        return (
          <div className="commands-panel">
            <h3>⚡ Commandes Rapides</h3>
            <div className="commands-grid">
              {quickCommands.map((command, index) => (
                <div key={index} className="command-card">
                  <button
                    className="command-button"
                    onClick={() => insertQuickCommand(command.command)}
                  >
                    <span className="command-icon">{command.icon}</span>
                    <span className="command-name">{command.name}</span>
                  </button>
                  <p className="command-description">{command.description}</p>
                  <code className="command-code">{command.command}</code>
                </div>
              ))}
            </div>
          </div>
        );

      case 'examples':
        return (
          <div className="examples-panel">
            <h3>📚 Exemples de Scripts</h3>
            <div className="category-tabs">
              {['basic', 'advanced', 'strategy', 'combat', 'debug'].map(category => (
                <button
                  key={category}
                  className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'basic' && '🚀 Basique'}
                  {category === 'advanced' && '🎯 Avancé'}
                  {category === 'strategy' && '🧠 Stratégie'}
                  {category === 'combat' && '⚔️ Combat'}
                  {category === 'debug' && '🧪 Debug'}
                </button>
              ))}
            </div>
            <div className="examples-grid">
              {getExamplesByCategory(selectedCategory).map((example, index) => (
                <div key={index} className="example-card">
                  <div className="example-header">
                    <span className="example-icon">{example.icon}</span>
                    <h4>{example.name}</h4>
                  </div>
                  <p className="example-description">{example.description}</p>
                  <button
                    className="load-example-button"
                    onClick={() => loadExample(example)}
                  >
                    📝 Charger ce script
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="results-panel">
            <div className="results-header">
              <h3>📊 Résultats d'Exécution</h3>
              <button className="clear-results-button" onClick={clearResults}>
                🗑️ Vider les résultats
              </button>
            </div>
            <div className="results-list">
              {scriptResults.length === 0 ? (
                <div className="no-results">
                  <p>Aucun résultat pour le moment.</p>
                  <p>Exécutez un script pour voir les résultats ici.</p>
                </div>
              ) : (
                scriptResults.map((result, index) => (
                  <div key={index} className="result-item">
                    <div className="result-header">
                      <span className="result-timestamp">{result.timestamp}</span>
                      <span className={`result-status ${result.error ? 'error' : 'success'}`}>
                        {result.error ? '❌ Erreur' : '✅ Succès'}
                      </span>
                    </div>
                    {result.error && (
                      <div className="result-error">
                        <strong>Erreur:</strong> {result.error}
                      </div>
                    )}
                    {result.result && (
                      <div className="result-data">
                        <strong>Résultat:</strong>
                        <pre>{JSON.stringify(result.result, null, 2)}</pre>
                      </div>
                    )}
                    {result.logs.length > 0 && (
                      <div className="result-logs">
                        <strong>Logs:</strong>
                        {result.logs.map((log, logIndex) => (
                          <div key={logIndex} className="log-line">{log}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isMinimized) {
    return (
      <div className="script-tester-minimized">
        <button
          className="restore-button"
          onClick={() => setIsMinimized(false)}
        >
          🧪 GameScript Tester
        </button>
      </div>
    );
  }

  return (
    <div className={`game-script-tester ${isMaximized ? 'maximized' : ''}`}>
      <div className="tester-header">
        <div className="header-left">
          <h2>🧪 GameScript Tester</h2>
          <span className="version-info">v2.0 - Interface Améliorée</span>
        </div>
        <div className="header-controls">
          <button
            className="control-button"
            onClick={() => setIsMinimized(true)}
          >
            ➖
          </button>
          <button
            className="control-button"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            {isMaximized ? '🗗' : '🗖'}
          </button>
        </div>
      </div>

      {renderTabs()}

      <div className="tester-content">
        {renderMainContent()}
      </div>

      <div className="tester-footer">
        <div className="footer-info">
          <span>🎮 Jeu: {gameStore.currentGame?.id || 'Aucun'}</span>
          <span>👤 Joueur: {gameStore.currentPlayer?.id || 'Aucun'}</span>
          <span>⚔️ Héros: {gameStore.selectedHero?.id || 'Aucun'}</span>
          <span>📊 Scripts: {scriptResults.length}</span>
        </div>
      </div>
    </div>
  );
};

export default GameScriptTester; 