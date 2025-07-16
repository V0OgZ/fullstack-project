import React, { useState, useRef, useEffect } from 'react';
import { GameScriptEngine, ScriptActionFactory } from '../services/gameScriptEngine';
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
}

const GameScriptTester: React.FC = () => {
  const gameStore = useGameStore();
  const [scriptEngine, setScriptEngine] = useState<GameScriptEngine | null>(null);
  const [currentScript, setCurrentScript] = useState<string>('');
  const [scriptResults, setScriptResults] = useState<ScriptResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string>('');
  const logsRef = useRef<HTMLDivElement>(null);

  // Exemples de scripts prédéfinis
  const scriptExamples: ScriptExample[] = [
    {
      name: 'Mouvement Héros',
      description: 'Déplacer un héros vers une position spécifique',
      script: `// Déplacer le héros vers la position (5, 7)
MOVE hero1 TO (5, 7)
WAIT 1000
LOG "Héros déplacé avec succès"`
    },
    {
      name: 'Construction',
      description: 'Construire un bâtiment dans le château',
      script: `// Construire une caserne
BUILD barracks AT (10, 10)
WAIT 2000
LOG "Caserne construite"`
    },
    {
      name: 'Recrutement',
      description: 'Recruter des unités',
      script: `// Recruter 5 soldats
RECRUIT 5 soldier FROM building1
WAIT 1500
LOG "Soldats recrutés"`
    },
    {
      name: 'Séquence Complète',
      description: 'Exemple d\'une séquence complète de jeu',
      script: `// Sélectionner un héros
SELECT_HERO hero1
WAIT 500

// Déplacer le héros
MOVE hero1 TO (3, 4)
WAIT 1000

// Construire un bâtiment
BUILD tower AT (5, 5)
WAIT 2000

// Recruter des unités
RECRUIT 3 archer FROM building2
WAIT 1500

// Terminer le tour
END_TURN
LOG "Tour terminé avec succès"`
    },
    {
      name: 'Test Magie',
      description: 'Lancer des sorts',
      script: `// Lancer un sort de feu
CAST spell_fireball ON target_enemy
WAIT 1000

// Lancer un sort de guérison
CAST spell_heal ON hero1
WAIT 1000

LOG "Sorts lancés"`
    }
  ];

  // Initialiser le script engine
  useEffect(() => {
    if (gameStore.currentGame?.id) {
      const engine = new GameScriptEngine({
        gameId: gameStore.currentGame.id,
        playerId: gameStore.currentPlayer?.id || 'player1',
        currentHero: gameStore.selectedHero?.id || 'hero1'
      });
      setScriptEngine(engine);
    }
  }, [gameStore.currentGame, gameStore.selectedHero]);

  // Exécuter un script
  const executeScript = async () => {
    if (!scriptEngine || !currentScript.trim()) return;

    setIsExecuting(true);
    const timestamp = new Date().toLocaleTimeString();
    const logs: string[] = [];

    try {
      // Capturer les logs du script engine
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
        originalLog(...args);
      };

      // Exécuter le script ligne par ligne
      const lines = currentScript.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
      const results = [];
      
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
        
        // Parser et exécuter l'action (simplifié)
        try {
          const words = trimmedLine.split(' ');
          const command = words[0].toLowerCase();
          
          let action = null;
          if (command === 'move') {
            const heroId = words[1];
            const x = parseInt(words[3]) || 0;
            const y = parseInt(words[4]) || 0;
            action = ScriptActionFactory.move(heroId, x, y);
          } else if (command === 'build') {
            const buildingType = words[1];
            action = ScriptActionFactory.build(buildingType);
          } else if (command === 'recruit') {
            const quantity = parseInt(words[1]) || 1;
            const unitType = words[2];
            action = ScriptActionFactory.recruit(unitType, quantity);
          } else if (command === 'cast') {
            const spellId = words[1];
            const targetId = words[3];
            action = ScriptActionFactory.cast(spellId, targetId);
          } else if (command === 'select_hero') {
            const heroId = words[1];
            action = ScriptActionFactory.selectHero(heroId);
          } else if (command === 'end_turn') {
            action = ScriptActionFactory.endTurn();
          }
          
          if (action) {
            const result = await scriptEngine.executeAction(action);
            results.push(result);
          }
        } catch (actionError) {
          logs.push(`❌ Erreur parsing action: ${actionError}`);
        }
      }

      const result = { success: true, results };
      
      // Restaurer console.log
      console.log = originalLog;

      const scriptResult: ScriptResult = {
        timestamp,
        script: currentScript,
        result,
        logs
      };

      setScriptResults(prev => [scriptResult, ...prev]);
      
    } catch (error) {
      console.log = console.log; // Restaurer console.log en cas d'erreur
      
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

  // Charger un exemple de script
  const loadExample = (exampleScript: string) => {
    setCurrentScript(exampleScript);
    setSelectedExample(exampleScript);
  };

  // Effacer les résultats
  const clearResults = () => {
    setScriptResults([]);
  };

  // Formater les résultats
  const formatResult = (result: any) => {
    if (result === null || result === undefined) return 'null';
    if (typeof result === 'object') {
      return JSON.stringify(result, null, 2);
    }
    return String(result);
  };

  return (
    <div className="game-script-tester">
      <div className="script-tester-header">
        <h2>🧪 Testeur de Scripts de Jeu</h2>
        <div className="connection-status">
          <span className={`status-indicator ${scriptEngine ? 'connected' : 'disconnected'}`}>
            {scriptEngine ? '🟢 Connecté' : '🔴 Déconnecté'}
          </span>
        </div>
      </div>

      <div className="script-tester-content">
        {/* Panneau des exemples */}
        <div className="examples-panel">
          <h3>📚 Exemples de Scripts</h3>
          <div className="examples-list">
            {scriptExamples.map((example, index) => (
              <div 
                key={index}
                className={`example-item ${selectedExample === example.script ? 'selected' : ''}`}
                onClick={() => loadExample(example.script)}
              >
                <div className="example-name">{example.name}</div>
                <div className="example-description">{example.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Éditeur de script */}
        <div className="script-editor-panel">
          <h3>✏️ Éditeur de Script</h3>
          <div className="script-editor">
            <textarea
              value={currentScript}
              onChange={(e) => setCurrentScript(e.target.value)}
              placeholder="Écrivez votre script ici..."
              className="script-textarea"
              rows={12}
            />
            <div className="script-controls">
              <button
                onClick={executeScript}
                disabled={isExecuting || !scriptEngine || !currentScript.trim()}
                className="execute-button"
              >
                {isExecuting ? '⏳ Exécution...' : '▶️ Exécuter'}
              </button>
              <button
                onClick={() => setCurrentScript('')}
                className="clear-button"
              >
                🗑️ Effacer
              </button>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="results-panel">
          <div className="results-header">
            <h3>📊 Résultats</h3>
            <button onClick={clearResults} className="clear-results-button">
              🗑️ Effacer les résultats
            </button>
          </div>
          <div className="results-container" ref={logsRef}>
            {scriptResults.length === 0 ? (
              <div className="no-results">Aucun résultat pour le moment</div>
            ) : (
              scriptResults.map((result, index) => (
                <div key={index} className={`result-item ${result.error ? 'error' : 'success'}`}>
                  <div className="result-header">
                    <span className="result-timestamp">{result.timestamp}</span>
                    <span className={`result-status ${result.error ? 'error' : 'success'}`}>
                      {result.error ? '❌ Erreur' : '✅ Succès'}
                    </span>
                  </div>
                  
                  <div className="result-script">
                    <strong>Script:</strong>
                    <pre>{result.script}</pre>
                  </div>

                  {result.error ? (
                    <div className="result-error">
                      <strong>Erreur:</strong>
                      <pre>{result.error}</pre>
                    </div>
                  ) : (
                    <div className="result-data">
                      <strong>Résultat:</strong>
                      <pre>{formatResult(result.result)}</pre>
                    </div>
                  )}

                  {result.logs.length > 0 && (
                    <div className="result-logs">
                      <strong>Logs:</strong>
                      <div className="logs-container">
                        {result.logs.map((log, logIndex) => (
                          <div key={logIndex} className="log-entry">{log}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScriptTester; 