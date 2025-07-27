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
`;

// Injecter les styles dans le DOM
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = RETRO_EFFECTS_CSS;
  document.head.appendChild(style);
} 