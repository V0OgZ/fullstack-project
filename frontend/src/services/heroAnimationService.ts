// 🎬 Service d'animation pour les héros - Framer Motion
// Animations fluides pour les mouvements et actions des héros

import { Position } from '../types/game';

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface HeroMovementAnimation {
  heroId: string;
  fromPosition: Position;
  toPosition: Position;
  path: Position[];
  duration: number;
  onComplete?: () => void;
}

export interface PathDot {
  position: Position;
  index: number;
  isActive: boolean;
  delay: number;
}

class HeroAnimationService {
  private activeAnimations = new Map<string, HeroMovementAnimation>();
  private pathDots = new Map<string, PathDot[]>();

  /**
   * Calcule un chemin avec points intermédiaires
   */
  calculatePath(from: Position, to: Position): Position[] {
    const path: Position[] = [];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.floor(distance), 1);

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      path.push({
        x: Math.round(from.x + dx * progress),
        y: Math.round(from.y + dy * progress)
      });
    }

    return path;
  }

  /**
   * Génère les pointillés verts style Heroes 3
   */
  generatePathDots(heroId: string, path: Position[]): PathDot[] {
    const dots: PathDot[] = [];
    
    for (let i = 1; i < path.length; i++) {
      dots.push({
        position: path[i],
        index: i,
        isActive: false,
        delay: i * 0.1 // Délai progressif
      });
    }

    this.pathDots.set(heroId, dots);
    return dots;
  }

  /**
   * Anime le mouvement d'un héros avec pointillés
   */
  animateHeroMovement(
    heroId: string,
    fromPosition: Position,
    toPosition: Position,
    onComplete?: () => void
  ): Promise<void> {
    return new Promise((resolve) => {
      const path = this.calculatePath(fromPosition, toPosition);
      // const dots = this.generatePathDots(heroId, path); // Unused for now
      
      const animation: HeroMovementAnimation = {
        heroId,
        fromPosition,
        toPosition,
        path,
        duration: Math.max(path.length * 0.2, 1), // Durée basée sur la distance
        onComplete: () => {
          this.clearPathDots(heroId);
          onComplete?.();
          resolve();
        }
      };

      this.activeAnimations.set(heroId, animation);
      
      // Animer les pointillés en premier
      this.animatePathDots(heroId);
      
      // Puis animer le héros
      setTimeout(() => {
        this.animateHeroAlongPath(heroId, path);
      }, 300);
    });
  }

  /**
   * Anime les pointillés verts qui apparaissent progressivement
   */
  private animatePathDots(heroId: string): void {
    const dots = this.pathDots.get(heroId);
    if (!dots) return;

    dots.forEach((dot, index) => {
      setTimeout(() => {
        dot.isActive = true;
        this.triggerDotAnimation(dot);
      }, index * 100); // Apparition progressive
    });
  }

  /**
   * Déclenche l'animation d'un pointillé
   */
  private triggerDotAnimation(dot: PathDot): void {
    // Émet un événement pour que le renderer affiche le pointillé
    const event = new CustomEvent('pathDotActivated', {
      detail: { dot }
    });
    window.dispatchEvent(event);
  }

  /**
   * Anime le héros le long du chemin
   */
  private animateHeroAlongPath(heroId: string, path: Position[]): void {
    const animation = this.activeAnimations.get(heroId);
    if (!animation) return;

    let currentStep = 0;
    const stepDuration = animation.duration / path.length;

    const moveToNextStep = () => {
      if (currentStep >= path.length - 1) {
        // Animation terminée
        animation.onComplete?.();
        this.activeAnimations.delete(heroId);
        return;
      }

      currentStep++;
      const currentPos = path[currentStep];
      
      // Émet un événement pour que le renderer déplace le héros
      const event = new CustomEvent('heroPositionUpdated', {
        detail: {
          heroId,
          position: currentPos,
          step: currentStep,
          totalSteps: path.length
        }
      });
      window.dispatchEvent(event);

      // Prochaine étape
      setTimeout(moveToNextStep, stepDuration * 1000);
    };

    moveToNextStep();
  }

  /**
   * Efface les pointillés après l'animation
   */
  private clearPathDots(heroId: string): void {
    const dots = this.pathDots.get(heroId);
    if (!dots) return;

    // Animation de disparition progressive
    dots.forEach((dot, index) => {
      setTimeout(() => {
        const event = new CustomEvent('pathDotDeactivated', {
          detail: { dot }
        });
        window.dispatchEvent(event);
      }, index * 50);
    });

    // Nettoyage final
    setTimeout(() => {
      this.pathDots.delete(heroId);
    }, dots.length * 50 + 500);
  }

  /**
   * Récupère les pointillés actifs pour un héros
   */
  getActivePathDots(heroId: string): PathDot[] {
    return this.pathDots.get(heroId) || [];
  }

  /**
   * Vérifie si un héros est en cours d'animation
   */
  isHeroAnimating(heroId: string): boolean {
    return this.activeAnimations.has(heroId);
  }

  /**
   * Arrête toutes les animations
   */
  stopAllAnimations(): void {
    this.activeAnimations.clear();
    this.pathDots.clear();
  }

  /**
   * Configuration d'animation par défaut
   */
  getDefaultAnimationConfig(): AnimationConfig {
    return {
      duration: 0.8,
      easing: 'ease-out',
      delay: 0
    };
  }

  /**
   * Configuration d'animation pour différents types de mouvement
   */
  getAnimationConfigByType(type: 'walk' | 'run' | 'teleport' | 'fly'): AnimationConfig {
    const configs: Record<string, AnimationConfig> = {
      walk: { duration: 1.2, easing: 'ease-in-out' },
      run: { duration: 0.6, easing: 'ease-out' },
      teleport: { duration: 0.3, easing: 'ease-in' },
      fly: { duration: 0.9, easing: 'ease-in-out' }
    };

    return configs[type] || this.getDefaultAnimationConfig();
  }
}

export const heroAnimationService = new HeroAnimationService();
export default heroAnimationService; 