import React, { useState, useEffect } from 'react';
import './GoldorakEasterEgg.css';

interface GoldorakEasterEggProps {
  isActive: boolean;
  onClose: () => void;
}

const GoldorakEasterEgg: React.FC<GoldorakEasterEggProps> = ({ isActive, onClose }) => {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'transformation' | 'action' | 'outro'>('intro');
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const sequence = [
      { phase: 'intro', duration: 2000 },
      { phase: 'transformation', duration: 3000 },
      { phase: 'action', duration: 4000 },
      { phase: 'outro', duration: 2000 }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < sequence.length) {
        setCurrentPhase(sequence[currentStep].phase as any);
        setAnimationStep(currentStep);
        currentStep++;
      } else {
        onClose();
      }
    }, sequence[currentStep]?.duration || 2000);

    return () => clearInterval(interval);
  }, [isActive, onClose]);

  const renderIntro = () => (
    <div className="goldorak-phase goldorak-intro">
      <div className="goldorak-title">
        <h1>🚀 GOLDORAK 🚀</h1>
        <p className="goldorak-subtitle">DANS L'ESPACE...</p>
      </div>
      <div className="goldorak-stars">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>
    </div>
  );

  const renderTransformation = () => (
    <div className="goldorak-phase goldorak-transformation">
      <div className="goldorak-ship">
        <div className="ship-body">🛸</div>
        <div className="transformation-effects">
          <div className="energy-ring ring-1"></div>
          <div className="energy-ring ring-2"></div>
          <div className="energy-ring ring-3"></div>
        </div>
      </div>
      <div className="transformation-text">
        <h2>⚡ TRANSFORMATION ⚡</h2>
        <p>GOLDORAK... GOOOOOO!</p>
      </div>
    </div>
  );

  const renderAction = () => (
    <div className="goldorak-phase goldorak-action">
      <div className="goldorak-robot">
        <div className="robot-head">🤖</div>
        <div className="robot-body">
          <div className="chest-plate">💎</div>
        </div>
        <div className="robot-arms">
          <div className="arm left-arm">🦾</div>
          <div className="arm right-arm">🦾</div>
        </div>
      </div>
      <div className="action-sequence">
        <div className="attack-name">
          <h2>💥 FULGOROCURSOR! 💥</h2>
          <p>ASTERO-HACHE!</p>
        </div>
        <div className="energy-beams">
          <div className="beam beam-1"></div>
          <div className="beam beam-2"></div>
          <div className="beam beam-3"></div>
        </div>
      </div>
      <div className="explosion-effects">
        💥💥💥💥💥
      </div>
    </div>
  );

  const renderOutro = () => (
    <div className="goldorak-phase goldorak-outro">
      <div className="victory-message">
        <h2>🏆 VICTOIRE! 🏆</h2>
        <p>Heroes of Time est sauvé!</p>
        <p className="signature">- Actarus & Goldorak -</p>
      </div>
      <div className="goldorak-flying-away">
        <div className="flying-goldorak">🚀</div>
      </div>
    </div>
  );

  if (!isActive) return null;

  return (
    <div className="goldorak-easter-egg">
      <div className="goldorak-background">
        <div className="space-gradient"></div>
        <div className="nebula-effect"></div>
      </div>
      
      <div className="goldorak-content">
        {currentPhase === 'intro' && renderIntro()}
        {currentPhase === 'transformation' && renderTransformation()}
        {currentPhase === 'action' && renderAction()}
        {currentPhase === 'outro' && renderOutro()}
      </div>

      <div className="goldorak-controls">
        <button onClick={onClose} className="goldorak-skip">
          ⏩ Passer
        </button>
      </div>

      <div className="goldorak-audio">
        <div className="sound-effects">
          {currentPhase === 'transformation' && <span>🎵 WOOOOSH</span>}
          {currentPhase === 'action' && <span>🎵 BZZZZT BOOM</span>}
        </div>
      </div>
    </div>
  );
};

export default GoldorakEasterEgg; 