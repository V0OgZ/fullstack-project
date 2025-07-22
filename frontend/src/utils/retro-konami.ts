/**
 * 🚀 RETRO KONAMI CODES - Pour les nostalgiques du code rétro
 * Système de cheat codes inspiré des années 70-80
 */

export interface RetroCode {
  name: string;
  sequence: string[];
  description: string;
  callback: () => void;
}

export class RetroKonamiManager {
  private codes: Map<string, RetroCode> = new Map();
  private currentSequence: string[] = [];
  private isListening = false;

  constructor() {
    this.setupDefaultCodes();
  }

  private setupDefaultCodes() {
    // Code Goldorak
    this.addCode({
      name: 'GOLDORAK',
      sequence: ['KeyG', 'KeyO', 'KeyL', 'KeyD', 'KeyO', 'KeyR', 'KeyA', 'KeyK'],
      description: 'Active l\'easter egg Goldorak avec animations spatiales',
      callback: () => {
        console.log('🚀 GOLDORAK GO! Activation du FULGOROCURSOR!');
        this.triggerGoldorakMode();
      }
    });

    // Code Forge Runique - CADEAU DE JEAN ⚡
    this.addCode({
      name: 'FORGE_RUNIQUE_1111',
      sequence: ['Digit1', 'Digit1', 'Digit1', 'Digit1'],
      description: '⚡ CADEAU DE JEAN: Active la Forge Runique Ultime - Le trésor secret!',
      callback: () => {
        console.log('🔨⚡ FORGE RUNIQUE ULTIME ACTIVÉE! Cadeau de Jean déverrouillé!');
        this.triggerForgeRuniqueMode();
      }
    });

    // Code Fulgorocursor (terrain effect)
    this.addCode({
      name: 'FULGOROCURSOR',
      sequence: ['KeyF', 'KeyU', 'KeyL', 'KeyG', 'KeyO', 'KeyR', 'KeyO', 'KeyC', 'KeyU', 'KeyR', 'KeyS', 'KeyO', 'KeyR'],
      description: 'Active des effets spéciaux sur le terrain',
      callback: () => {
        console.log('💥 FULGOROCURSOR ACTIVATED! Terrain effects enabled!');
        this.triggerTerrainEffects();
      }
    });

    // Code Actarus
    this.addCode({
      name: 'ACTARUS',
      sequence: ['KeyA', 'KeyC', 'KeyT', 'KeyA', 'KeyR', 'KeyU', 'KeyS'],
      description: 'Active le mode debug avec informations détaillées',
      callback: () => {
        console.log('🤖 ACTARUS MODE! Debug information enabled!');
        this.triggerDebugMode();
      }
    });

    // Code Mazinger
    this.addCode({
      name: 'MAZINGER',
      sequence: ['KeyM', 'KeyA', 'KeyZ', 'KeyI', 'KeyN', 'KeyG', 'KeyE', 'KeyR'],
      description: 'Active des effets visuels rétro sur l\'interface',
      callback: () => {
        console.log('⚡ MAZINGER Z! Retro visual effects activated!');
        this.triggerRetroEffects();
      }
    });
  }

  addCode(code: RetroCode) {
    this.codes.set(code.name, code);
  }

  startListening() {
    if (this.isListening) return;
    
    this.isListening = true;
    document.addEventListener('keydown', this.handleKeyDown);
    
    // Afficher les codes disponibles
    console.log('🎮 [RETRO CODEUR] Codes secrets disponibles:');
    this.codes.forEach((code, name) => {
      console.log(`   ${name}: ${code.description}`);
    });
  }

  stopListening() {
    this.isListening = false;
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    // Ignorer si dans un input
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    this.currentSequence.push(event.code);
    
    // Garder seulement les dernières touches (max 13 pour FULGOROCURSOR)
    if (this.currentSequence.length > 13) {
      this.currentSequence = this.currentSequence.slice(-13);
    }

    // Vérifier chaque code
    this.codes.forEach((code, name) => {
      if (this.isSequenceMatch(this.currentSequence, code.sequence)) {
        console.log(`🚀 [RETRO CODEUR] Code ${name} activé!`);
        code.callback();
        this.currentSequence = []; // Reset
      }
    });
  };

  private isSequenceMatch(current: string[], target: string[]): boolean {
    if (current.length < target.length) return false;
    
    const lastSequence = current.slice(-target.length);
    return JSON.stringify(lastSequence) === JSON.stringify(target);
  }

  private triggerGoldorakMode() {
    // Déclencher l'événement custom pour Goldorak
    const event = new CustomEvent('goldorak-activated', {
      detail: { message: 'GOLDORAK GO! FULGOROCURSOR READY!' }
    });
    window.dispatchEvent(event);
  }

  private triggerForgeRuniqueMode() {
    // 🔨⚡ FORGE RUNIQUE ULTIME - CADEAU DE JEAN ⚡🔨
    console.log('🎉 TRÉSOR DÉVERROUILLÉ! Jean te fait un cadeau spécial!');
    
    // Déclencher l'événement custom pour la Forge Runique
    const event = new CustomEvent('forge-runique-activated', {
      detail: { 
        message: '⚡ FORGE RUNIQUE ULTIME ACTIVÉE! Cadeau de Jean déverrouillé!',
        artifacts: ['temporal_hammer', 'reality_core', 'quantum_anvil'],
        effects: ['golden_sparks', 'temporal_energy', 'runic_glyphs'],
        duration: 30000 // 30 secondes d'effet
      }
    });
    window.dispatchEvent(event);

    // Appliquer les effets visuels de la forge
    document.body.classList.add('forge-runique-active');
    setTimeout(() => {
      document.body.classList.remove('forge-runique-active');
      console.log('🔨 Forge Runique désactivée. Le trésor reste dans ton inventaire!');
    }, 30000);

    // Afficher un message spécial de Jean
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #FFD700, #FFA500);
        color: #8B4513;
        padding: 20px;
        border-radius: 15px;
        border: 3px solid #B8860B;
        z-index: 9999;
        font-family: 'Cinzel', serif;
        text-align: center;
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
        animation: forge-glow 2s ease-in-out infinite alternate;
      ">
        <h2 style="margin: 0; font-size: 24px;">🎁 CADEAU DE JEAN!</h2>
        <p style="margin: 10px 0; font-size: 18px;">⚡ FORGE RUNIQUE ULTIME DÉVERROUILLÉE ⚡</p>
        <p style="margin: 5px 0; font-size: 14px;">🔨 Tu peux maintenant forger des artefacts temporels!</p>
        <p style="margin: 5px 0; font-size: 12px; opacity: 0.8;">Code secret: 1111</p>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  }

  private triggerTerrainEffects() {
    // Effets spéciaux sur le terrain
    const event = new CustomEvent('fulgorocursor-terrain', {
      detail: { 
        effects: ['energy-rings', 'astero-hache', 'cosmic-glow'],
        duration: 5000 
      }
    });
    window.dispatchEvent(event);

    // Appliquer des effets CSS temporaires
    document.body.classList.add('fulgorocursor-active');
    setTimeout(() => {
      document.body.classList.remove('fulgorocursor-active');
    }, 5000);
  }

  private triggerDebugMode() {
    // Mode debug Actarus
    const event = new CustomEvent('actarus-debug', {
      detail: { 
        showCoordinates: true,
        showPerformance: true,
        showTileInfo: true 
      }
    });
    window.dispatchEvent(event);
  }

  private triggerRetroEffects() {
    // Effets visuels rétro
    const event = new CustomEvent('mazinger-retro', {
      detail: { 
        scanlines: true,
        crtGlow: true,
        retroColors: true 
      }
    });
    window.dispatchEvent(event);

    // Appliquer les effets rétro
    document.body.classList.add('mazinger-retro-mode');
    setTimeout(() => {
      document.body.classList.remove('mazinger-retro-mode');
    }, 10000);
  }

  // Méthodes utilitaires pour les composants
  getCurrentSequence(): string[] {
    return [...this.currentSequence];
  }

  getAvailableCodes(): RetroCode[] {
    return Array.from(this.codes.values());
  }

  resetSequence() {
    this.currentSequence = [];
  }
}

// Instance globale du manager
export const retroKonamiManager = new RetroKonamiManager();

// Hook React pour l'utiliser facilement
export const useRetroKonami = () => {
  const startListening = () => retroKonamiManager.startListening();
  const stopListening = () => retroKonamiManager.stopListening();
  const addCode = (code: RetroCode) => retroKonamiManager.addCode(code);
  
  return {
    startListening,
    stopListening,
    addCode,
    manager: retroKonamiManager
  };
};

// Styles CSS pour les effets
export const RETRO_EFFECTS_CSS = `
  .fulgorocursor-active {
    animation: fulgorocursor-glow 0.5s ease-in-out infinite alternate;
  }
  
  @keyframes fulgorocursor-glow {
    0% { filter: brightness(1) contrast(1); }
    100% { filter: brightness(1.2) contrast(1.1) hue-rotate(10deg); }
  }
  
  .mazinger-retro-mode {
    filter: sepia(0.2) contrast(1.2) brightness(1.1);
    animation: retro-flicker 0.1s ease-in-out infinite;
  }
  
  .mazinger-retro-mode::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 50%, rgba(0, 255, 0, 0.02) 50%);
    background-size: 100% 2px;
    pointer-events: none;
    z-index: 9998;
  }
  
  @keyframes retro-flicker {
    0%, 100% { opacity: 1; }
    98% { opacity: 1; }
    99% { opacity: 0.98; }
  }

  /* 🔨⚡ FORGE RUNIQUE ULTIME - CADEAU DE JEAN ⚡🔨 */
  .forge-runique-active {
    animation: forge-energy 1s ease-in-out infinite alternate;
    filter: drop-shadow(0 0 20px #FFD700);
  }
  
  @keyframes forge-energy {
    0% { 
      filter: brightness(1) saturate(1) drop-shadow(0 0 10px #FFD700);
    }
    100% { 
      filter: brightness(1.3) saturate(1.5) drop-shadow(0 0 30px #FFA500) drop-shadow(0 0 60px #FF8C00);
    }
  }

  @keyframes forge-glow {
    0% { 
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
      transform: translate(-50%, -50%) scale(1);
    }
    100% { 
      box-shadow: 0 0 40px rgba(255, 165, 0, 0.9);
      transform: translate(-50%, -50%) scale(1.02);
    }
  }

  /* Effet particules dorées pour la forge */
  .forge-runique-active::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #FFD700, transparent),
      radial-gradient(2px 2px at 40px 70px, #FFA500, transparent),
      radial-gradient(1px 1px at 90px 40px, #FF8C00, transparent),
      radial-gradient(1px 1px at 130px 80px, #FFD700, transparent),
      radial-gradient(2px 2px at 160px 30px, #FFA500, transparent);
    background-size: 200px 100px;
    animation: forge-particles 3s linear infinite;
    pointer-events: none;
    z-index: 9997;
  }

  @keyframes forge-particles {
    0% { 
      background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
      opacity: 1;
    }
    100% { 
      background-position: 100% -100%, -100% 100%, 100% -100%, -100% 100%, 100% -100%;
      opacity: 0.3;
    }
  }
`;

// Injecter les styles dans le DOM
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = RETRO_EFFECTS_CSS;
  document.head.appendChild(style);
} 