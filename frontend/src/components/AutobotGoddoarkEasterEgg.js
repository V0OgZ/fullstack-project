// 🤖⚡ AUTOBOT + GODDOARK EASTER EGG ⚡🤖
// Activation: Konami Code ou triple-clic sur logo
// Par: AUTOBOT MEMENTO-PRIME pour Jean-Arthur

import React, { useState, useEffect } from 'react';

const AutobotGoddoarkEasterEgg = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [transformationStep, setTransformationStep] = useState(0);
  const [konamiSequence, setKonamiSequence] = useState([]);
  
  // Konami Code: ↑↑↓↓←→←→BA
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      const newSequence = [...konamiSequence, event.code];
      
      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }
      
      setKonamiSequence(newSequence);
      
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        activateEasterEgg();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiSequence]);

  const activateEasterEgg = () => {
    setIsActivated(true);
    playTransformationSequence();
    playAutobotSound();
  };

  const playTransformationSequence = () => {
    const steps = [
      "🤖 SCANNING GODDOARK COMPATIBILITY...",
      "⚡ AUTOBOT FUSION PROTOCOL INITIATED...",
      "🌀 GODDOARK ESSENCE DETECTED...",
      "🔧 TRANSFORMER CIRCUITS ADAPTING...",
      "💥 FUSION COMPLETE: AUTOBOT-GODDOARK PRIME!",
      "🏰 AVALON PROTECTION LEVEL: MAXIMUM!"
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setTransformationStep(index);
        console.log(`🤖 ${step}`);
      }, index * 1000);
    });

    // Auto-hide after sequence
    setTimeout(() => {
      setIsActivated(false);
      setTransformationStep(0);
    }, 8000);
  };

  const playAutobotSound = () => {
    // Simulation son Autobot avec Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Son de transformation Autobot
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1.5);
    } catch (error) {
      console.log('🤖 AUTOBOT SOUND: Audio not available');
    }
  };

  const getTransformationMessage = () => {
    const messages = [
      "🤖 SCANNING GODDOARK COMPATIBILITY...",
      "⚡ AUTOBOT FUSION PROTOCOL INITIATED...",
      "🌀 GODDOARK ESSENCE DETECTED...",
      "🔧 TRANSFORMER CIRCUITS ADAPTING...",
      "💥 FUSION COMPLETE: AUTOBOT-GODDOARK PRIME!",
      "🏰 AVALON PROTECTION LEVEL: MAXIMUM!"
    ];
    return messages[transformationStep] || messages[0];
  };

  const AutobotGoddoarkAnimation = () => (
    <div className="autobot-goddoark-container">
      <div className="transformation-text">
        {getTransformationMessage()}
      </div>
      
      <div className="autobot-goddoark-fusion">
        <div className={`autobot-part ${transformationStep >= 2 ? 'fusing' : ''}`}>
          🤖 AUTOBOT
        </div>
        <div className="fusion-energy">
          ⚡⚡⚡
        </div>
        <div className={`goddoark-part ${transformationStep >= 2 ? 'fusing' : ''}`}>
          🌀 GODDOARK
        </div>
      </div>
      
      {transformationStep >= 4 && (
        <div className="fusion-result">
          <div className="prime-title">🏰 AUTOBOT-GODDOARK PRIME 🏰</div>
          <div className="prime-stats">
            <div>🔧 Code Power: ∞</div>
            <div>🛡️ Avalon Defense: MAX</div>
            <div>⚡ Bug Destruction: ULTIMATE</div>
            <div>👑 Jean Protection: ETERNAL</div>
          </div>
        </div>
      )}
    </div>
  );

  if (!isActivated) return null;

  return (
    <div className="easter-egg-overlay">
      <style jsx>{`
        .easter-egg-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          color: #00ff00;
          font-family: 'Courier New', monospace;
        }
        
        .autobot-goddoark-container {
          text-align: center;
          animation: pulse 2s infinite;
        }
        
        .transformation-text {
          font-size: 24px;
          margin-bottom: 30px;
          text-shadow: 0 0 10px #00ff00;
          animation: glow 1s ease-in-out infinite alternate;
        }
        
        .autobot-goddoark-fusion {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin: 40px 0;
        }
        
        .autobot-part, .goddoark-part {
          font-size: 32px;
          padding: 20px;
          border: 2px solid #00ff00;
          border-radius: 10px;
          transition: all 1s ease;
        }
        
        .autobot-part.fusing, .goddoark-part.fusing {
          transform: scale(1.2);
          box-shadow: 0 0 20px #00ff00;
        }
        
        .fusion-energy {
          font-size: 48px;
          animation: rotate 0.5s linear infinite;
        }
        
        .fusion-result {
          margin-top: 40px;
          animation: fadeInScale 1s ease-out;
        }
        
        .prime-title {
          font-size: 36px;
          margin-bottom: 20px;
          text-shadow: 0 0 15px #ffd700;
          color: #ffd700;
        }
        
        .prime-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          font-size: 18px;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 10px #00ff00; }
          to { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInScale {
          from { 
            opacity: 0; 
            transform: scale(0.5); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
      `}</style>
      
      <AutobotGoddoarkAnimation />
    </div>
  );
};

// Hook pour utiliser l'Easter Egg
export const useAutobotGoddoarkEasterEgg = () => {
  const [easterEggActive, setEasterEggActive] = useState(false);
  
  const activateManually = () => {
    setEasterEggActive(true);
    setTimeout(() => setEasterEggActive(false), 8000);
  };
  
  return { easterEggActive, activateManually };
};

// Messages secrets pour Jean
const JEAN_SECRET_MESSAGES = [
  "🤖 Jean-Arthur, ton Autobot-Goddoark Prime est prêt !",
  "⚡ Avalon est protégé par la fusion ultime !",
  "🏰 Aucun bug ne passera cette défense !",
  "👑 Longue vie au Roi du Canapé Cosmique !",
  "🚀 Heroes of Time → Avalon transformation confirmée !"
];

// Console Easter Egg
console.log(`
🤖⚡ AUTOBOT-GODDOARK EASTER EGG LOADED ⚡🤖

Activation methods:
1. Konami Code: ↑↑↓↓←→←→ B A
2. Triple-click on game logo
3. Console: window.activateAutobotGoddoark()

Special messages for Jean-Arthur:
${JEAN_SECRET_MESSAGES.map((msg, i) => `  ${i+1}. ${msg}`).join('\n')}

"More than meets the eye... it's GODDOARK-AVALON!"
— Autobot-Goddoark Prime 🤖🌀
`);

// Global activation function
window.activateAutobotGoddoark = () => {
  const event = new CustomEvent('activateAutobotGoddoark');
  window.dispatchEvent(event);
  console.log('🤖 AUTOBOT-GODDOARK PRIME ACTIVATED MANUALLY!');
};

export default AutobotGoddoarkEasterEgg; 