import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import TrueHeroesInterface from './TrueHeroesInterface';
import './DemoInterface.css';

interface DemoInterfaceProps {
  scenarioId: string;
  scenarioType: 'classique' | 'mystique' | 'multiplayer';
}

const DemoInterface: React.FC<DemoInterfaceProps> = ({ scenarioId, scenarioType }) => {
  const { t } = useTranslation();
  const [demoMode, setDemoMode] = useState<'game' | 'tests' | 'interactive'>('game');
  const [runningTest, setRunningTest] = useState<string | null>(null);

  const playwrightTests = [
    {
      id: 'solo-demo',
      name: 'Solo Gameplay Demo',
      description: 'Complete solo gameplay demonstration (57s)',
      command: 'npx playwright test tests/e2e/gameplay-demo.spec.ts --headed --project=solo-fullscreen',
      duration: '57s',
      icon: '🎮'
    },
    {
      id: 'multiplayer-demo',
      name: 'Multiplayer Demo',
      description: 'Dual window multiplayer session (40s)',
      command: 'npx playwright test tests/e2e/multiplayer-demo.spec.ts --headed --project=multiplayer',
      duration: '40s', 
      icon: '👥'
    },
    {
      id: 'demo-route',
      name: 'Demo Route Test',
      description: 'Quick demo route verification (9s)',
      command: 'npx playwright test tests/e2e/demo-route.spec.ts --headed --project=demo',
      duration: '9s',
      icon: '⚡'
    }
  ];

  const interactiveFeatures = [
    {
      id: 'tooltip-demo',
      name: 'Interactive Tooltips',
      description: 'Show demo tooltips system',
      icon: '💬'
    },
    {
      id: 'language-demo',
      name: 'Language Switching',
      description: 'Demonstrate multilingual support',
      icon: '🌍'
    },
    {
      id: 'panel-demo',
      name: 'Panel Navigation',
      description: 'Showcase Heroes/Castle/Inventory panels',
      icon: '🎛️'
    }
  ];

  const runPlaywrightTest = async (testId: string) => {
    const test = playwrightTests.find(t => t.id === testId);
    if (!test) return;

    setRunningTest(testId);
    
    try {
      // Note: In a real implementation, you'd need a backend endpoint to execute these
      // For now, we'll simulate the test execution
      console.log(`🚀 Running Playwright test: ${test.name}`);
      console.log(`📝 Command: ${test.command}`);
      
      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`✅ Test "${test.name}" would be executed!\n\nCommand: ${test.command}\n\nTo run manually:\n1. Open terminal\n2. cd frontend\n3. ${test.command}`);
      
    } catch (error) {
      console.error('Test execution failed:', error);
      alert(`❌ Test execution failed: ${error}`);
    } finally {
      setRunningTest(null);
    }
  };

  const runInteractiveDemo = (featureId: string) => {
    const feature = interactiveFeatures.find(f => f.id === featureId);
    if (!feature) return;

    console.log(`🎬 Running interactive demo: ${feature.name}`);
    
    switch (featureId) {
      case 'tooltip-demo':
        showDemoTooltip();
        break;
      case 'language-demo':
        demonstrateLanguageSwitching();
        break;
      case 'panel-demo':
        demonstratePanelNavigation();
        break;
      default:
        alert(`Demo "${feature.name}" not implemented yet`);
    }
  };

  const showDemoTooltip = () => {
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(22,33,62,0.95) 50%, rgba(15,52,96,0.95) 100%);
      color: #ffd700;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      font-family: 'Segoe UI', sans-serif;
      font-size: 16px;
      z-index: 9999;
      max-width: 400px;
      text-align: center;
      border: 2px solid #ffd700;
    `;
    tooltip.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 10px;">🎮 Demo Tooltip System</div>
      <div>This is how demo tooltips appear during Playwright tests!</div>
      <div style="margin-top: 10px; font-size: 12px; opacity: 0.8;">Click anywhere to close</div>
    `;
    
    document.body.appendChild(tooltip);
    
    const removeTooltip = () => {
      tooltip.remove();
      document.removeEventListener('click', removeTooltip);
    };
    
    setTimeout(() => {
      document.addEventListener('click', removeTooltip);
    }, 100);
  };

  const demonstrateLanguageSwitching = () => {
    alert('🌍 Language switching demo would cycle through FR/EN/RU!\n\nUse the flags in the top-right corner to switch languages.');
  };

  const demonstratePanelNavigation = () => {
    alert('🎛️ Panel navigation demo would show Heroes ⚔️, Castle 🏰, and Inventory 🎒 panels!\n\nClick the buttons in the game interface to navigate.');
  };

  if (demoMode === 'game') {
    return (
      <div className="demo-interface">
        <div className="demo-header">
          <div className="demo-title">
            <h2>🎮 Heroes of Time - Demo Mode</h2>
            <div className="demo-controls">
              <button 
                className="demo-btn active"
                onClick={() => setDemoMode('game')}
              >
                🎮 Game
              </button>
              <button 
                className="demo-btn"
                onClick={() => setDemoMode('tests')}
              >
                🧪 Tests
              </button>
              <button 
                className="demo-btn"
                onClick={() => setDemoMode('interactive')}
              >
                🎬 Interactive
              </button>
            </div>
          </div>
        </div>
        <TrueHeroesInterface 
          playerCount={1} 
          scenarioType={scenarioType} 
          scenarioId={scenarioId} 
        />
      </div>
    );
  }

  if (demoMode === 'tests') {
    return (
      <div className="demo-interface">
        <div className="demo-header">
          <div className="demo-title">
            <h2>🧪 Playwright Tests</h2>
            <div className="demo-controls">
              <button 
                className="demo-btn"
                onClick={() => setDemoMode('game')}
              >
                🎮 Game
              </button>
              <button 
                className="demo-btn active"
                onClick={() => setDemoMode('tests')}
              >
                🧪 Tests
              </button>
              <button 
                className="demo-btn"
                onClick={() => setDemoMode('interactive')}
              >
                🎬 Interactive
              </button>
            </div>
          </div>
        </div>
        
        <div className="demo-content">
          <div className="tests-grid">
            {playwrightTests.map(test => (
              <div key={test.id} className="test-card">
                <div className="test-header">
                  <span className="test-icon">{test.icon}</span>
                  <h3>{test.name}</h3>
                  <span className="test-duration">{test.duration}</span>
                </div>
                <p className="test-description">{test.description}</p>
                <div className="test-command">
                  <code>{test.command}</code>
                </div>
                <button 
                  className="test-run-btn"
                  onClick={() => runPlaywrightTest(test.id)}
                  disabled={runningTest === test.id}
                >
                  {runningTest === test.id ? '🔄 Running...' : '▶️ Run Test'}
                </button>
              </div>
            ))}
          </div>
          
          <div className="demo-instructions">
            <h3>📋 How to Run Tests Manually:</h3>
            <ol>
              <li>Open a terminal in the project directory</li>
              <li>Navigate to frontend: <code>cd frontend</code></li>
              <li>Run any test command from the cards above</li>
              <li>Tests will open browser windows automatically</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (demoMode === 'interactive') {
    return (
      <div className="demo-interface">
        <div className="demo-header">
          <div className="demo-title">
            <h2>🎬 Interactive Demos</h2>
            <div className="demo-controls">
              <button 
                className="demo-btn"
                onClick={() => setDemoMode('game')}
              >
                🎮 Game
              </button>
              <button 
                className="demo-btn"
                onClick={() => setDemoMode('tests')}
              >
                🧪 Tests
              </button>
              <button 
                className="demo-btn active"
                onClick={() => setDemoMode('interactive')}
              >
                🎬 Interactive
              </button>
            </div>
          </div>
        </div>
        
        <div className="demo-content">
          <div className="interactive-grid">
            {interactiveFeatures.map(feature => (
              <div key={feature.id} className="interactive-card">
                <div className="interactive-header">
                  <span className="interactive-icon">{feature.icon}</span>
                  <h3>{feature.name}</h3>
                </div>
                <p className="interactive-description">{feature.description}</p>
                <button 
                  className="interactive-btn"
                  onClick={() => runInteractiveDemo(feature.id)}
                >
                  🎬 Try Demo
                </button>
              </div>
            ))}
          </div>
          
          <div className="demo-info">
            <h3>ℹ️ About Interactive Demos:</h3>
            <p>These demos showcase specific features of the game interface and can be used to test functionality interactively.</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DemoInterface; 