// ✨ Service de pointillés verts style Heroes 3 - 100% local
// Animation de chemin avec pointillés verts comme dans Heroes of Might and Magic 3

import { Position } from '../types/game';

export interface PathDot {
  position: Position;
  index: number;
  isActive: boolean;
  animationDelay: number;
  size: number;
  opacity: number;
}

export interface PathVisualization {
  heroId: string;
  dots: PathDot[];
  isAnimating: boolean;
  totalDuration: number;
  startTime: number;
}

class PathDotsService {
  private activePaths = new Map<string, PathVisualization>();
  private animationFrameId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  /**
   * Initialise le service avec un canvas
   */
  initialize(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.startAnimationLoop();
  }

  /**
   * Crée un chemin avec pointillés verts style Heroes 3
   */
  createHeroes3Path(heroId: string, fromPosition: Position, toPosition: Position): PathDot[] {
    const path = this.calculateSmoothPath(fromPosition, toPosition);
    const dots: PathDot[] = [];

    // Générer les pointillés le long du chemin
    for (let i = 1; i < path.length; i++) {
      const dot: PathDot = {
        position: path[i],
        index: i,
        isActive: false,
        animationDelay: i * 0.05, // Délai progressif pour effet cascade
        size: 4 + Math.sin(i * 0.5) * 2, // Taille variable pour effet organique
        opacity: 0
      };
      dots.push(dot);
    }

    const visualization: PathVisualization = {
      heroId,
      dots,
      isAnimating: false,
      totalDuration: dots.length * 0.05 + 1,
      startTime: 0
    };

    this.activePaths.set(heroId, visualization);
    return dots;
  }

  /**
   * Calcule un chemin lisse entre deux points
   */
  private calculateSmoothPath(from: Position, to: Position): Position[] {
    const path: Position[] = [from];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Nombre de points basé sur la distance
    const numPoints = Math.max(Math.floor(distance * 2), 8);
    
    for (let i = 1; i <= numPoints; i++) {
      const t = i / numPoints;
      
      // Interpolation avec légère courbure pour effet naturel
      const curve = Math.sin(t * Math.PI) * 0.1;
      const x = from.x + dx * t + curve * (dy > 0 ? 1 : -1);
      const y = from.y + dy * t + curve * (dx > 0 ? -1 : 1);
      
      path.push({
        x: Math.round(x),
        y: Math.round(y)
      });
    }
    
    return path;
  }

  /**
   * Anime les pointillés verts avec effet Heroes 3
   */
  animatePathDots(heroId: string): Promise<void> {
    return new Promise((resolve) => {
      const visualization = this.activePaths.get(heroId);
      if (!visualization) {
        resolve();
        return;
      }

      visualization.isAnimating = true;
      visualization.startTime = Date.now();

      // Animation en cascade des pointillés
      visualization.dots.forEach((dot, index) => {
        setTimeout(() => {
          dot.isActive = true;
          this.animateDotAppearance(dot);
        }, dot.animationDelay * 1000);
      });

      // Résolution après animation complète
      setTimeout(() => {
        visualization.isAnimating = false;
        resolve();
      }, visualization.totalDuration * 1000);
    });
  }

  /**
   * Anime l'apparition d'un pointillé individuel
   */
  private animateDotAppearance(dot: PathDot): void {
    const startTime = Date.now();
    const duration = 300; // 300ms pour apparition

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Effet d'apparition avec bounce
      dot.opacity = this.easeOutBounce(progress);
      dot.size = 4 + Math.sin(progress * Math.PI) * 2;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  /**
   * Fonction d'easing bounce pour effet Heroes 3
   */
  private easeOutBounce(t: number): number {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  }

  /**
   * Efface les pointillés avec animation de disparition
   */
  clearPathDots(heroId: string): Promise<void> {
    return new Promise((resolve) => {
      const visualization = this.activePaths.get(heroId);
      if (!visualization) {
        resolve();
        return;
      }

      // Animation de disparition en cascade inverse
      visualization.dots.reverse().forEach((dot, index) => {
        setTimeout(() => {
          this.animateDotDisappearance(dot);
        }, index * 30);
      });

      // Nettoyage final
      setTimeout(() => {
        this.activePaths.delete(heroId);
        resolve();
      }, visualization.dots.length * 30 + 300);
    });
  }

  /**
   * Anime la disparition d'un pointillé
   */
  private animateDotDisappearance(dot: PathDot): void {
    const startTime = Date.now();
    const duration = 200;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      dot.opacity = 1 - progress;
      dot.size = dot.size * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        dot.isActive = false;
      }
    };

    animate();
  }

  /**
   * Boucle d'animation principale
   */
  private startAnimationLoop(): void {
    const animate = () => {
      if (this.ctx && this.canvas) {
        this.renderPathDots();
      }
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Rendu des pointillés sur le canvas
   */
  private renderPathDots(): void {
    if (!this.ctx || !this.canvas) return;

    // Pas besoin de clear, on dessine par-dessus
    this.activePaths.forEach((visualization) => {
      visualization.dots.forEach((dot) => {
        if (dot.isActive && dot.opacity > 0) {
          this.renderSingleDot(dot);
        }
      });
    });
  }

  /**
   * Rendu d'un pointillé individuel style Heroes 3
   */
  private renderSingleDot(dot: PathDot): void {
    if (!this.ctx) return;

    const ctx = this.ctx;
    const { position, size, opacity } = dot;

    // Conversion position hexagonale vers pixel (à adapter selon votre système)
    const pixelPos = this.hexToPixel(position);

    ctx.save();
    ctx.globalAlpha = opacity;

    // Pointillé vert avec contour doré style Heroes 3
    ctx.beginPath();
    ctx.arc(pixelPos.x, pixelPos.y, size, 0, Math.PI * 2);
    
    // Gradient vert Heroes 3
    const gradient = ctx.createRadialGradient(
      pixelPos.x, pixelPos.y, 0,
      pixelPos.x, pixelPos.y, size
    );
    gradient.addColorStop(0, '#90EE90'); // Vert clair au centre
    gradient.addColorStop(0.7, '#32CD32'); // Vert moyen
    gradient.addColorStop(1, '#228B22'); // Vert foncé aux bords

    ctx.fillStyle = gradient;
    ctx.fill();

    // Contour doré
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Effet de brillance
    ctx.beginPath();
    ctx.arc(pixelPos.x - size * 0.3, pixelPos.y - size * 0.3, size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fill();

    ctx.restore();
  }

  /**
   * Conversion coordonnées hexagonales vers pixels
   * (À adapter selon votre système de coordonnées)
   */
  private hexToPixel(hex: Position): Position {
    const hexRadius = 25;
    const hexWidth = hexRadius * 2;
    const hexHeight = Math.sqrt(3) * hexRadius;
    
    const x = hex.x * hexWidth * 0.75 + 50;
    const y = hex.y * hexHeight + (hex.x % 2) * (hexHeight * 0.5) + 50;
    
    return { x, y };
  }

  /**
   * Récupère tous les pointillés actifs
   */
  getAllActiveDots(): PathDot[] {
    const allDots: PathDot[] = [];
    this.activePaths.forEach((visualization) => {
      allDots.push(...visualization.dots.filter(dot => dot.isActive));
    });
    return allDots;
  }

  /**
   * Vérifie si un héros a des pointillés actifs
   */
  hasActivePath(heroId: string): boolean {
    const visualization = this.activePaths.get(heroId);
    return visualization ? visualization.isAnimating : false;
  }

  /**
   * Crée un effet de surbrillance pour les cases accessibles
   */
  createMovementHighlight(heroId: string, accessiblePositions: Position[]): void {
    const dots: PathDot[] = accessiblePositions.map((pos, index) => ({
      position: pos,
      index,
      isActive: true,
      animationDelay: 0,
      size: 3,
      opacity: 0.6
    }));

    const visualization: PathVisualization = {
      heroId: `${heroId}-highlight`,
      dots,
      isAnimating: false,
      totalDuration: 0,
      startTime: 0
    };

    this.activePaths.set(`${heroId}-highlight`, visualization);
  }

  /**
   * Efface la surbrillance de mouvement
   */
  clearMovementHighlight(heroId: string): void {
    this.activePaths.delete(`${heroId}-highlight`);
  }

  /**
   * Arrête toutes les animations
   */
  stopAllAnimations(): void {
    this.activePaths.clear();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Nettoyage des ressources
   */
  destroy(): void {
    this.stopAllAnimations();
    this.canvas = null;
    this.ctx = null;
  }
}

export const pathDotsService = new PathDotsService();
export default pathDotsService; 