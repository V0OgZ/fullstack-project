// 🎨 Service d'avatars LOCAUX - Pas d'API externe
// Génération d'avatars avec CSS + SVG uniquement

// import { Position } from '../types/game'; // Unused for now

export interface LocalAvatarConfig {
  name: string;
  heroClass: string;
  seed?: number;
  size: number;
  style: 'geometric' | 'pixel' | 'medieval' | 'fantasy';
}

export interface AvatarColors {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
}

class LocalAvatarService {
  private cache = new Map<string, string>();

  /**
   * Génère un avatar SVG local pour un héros
   */
  generateLocalAvatar(config: LocalAvatarConfig): string {
    const cacheKey = `${config.name}-${config.heroClass}-${config.style}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const colors = this.getHeroColors(config.heroClass, config.name);
    const svg = this.createSVGAvatar(config, colors);
    
    this.cache.set(cacheKey, svg);
    return svg;
  }

  /**
   * Crée un SVG avatar basé sur la classe de héros
   */
  private createSVGAvatar(config: LocalAvatarConfig, colors: AvatarColors): string {
    const { size, heroClass, name } = config;
    const seed = this.generateSeed(name);
    
    switch (config.style) {
      case 'geometric':
        return this.createGeometricAvatar(size, heroClass, colors, seed);
      case 'pixel':
        return this.createPixelAvatar(size, heroClass, colors, seed);
      case 'medieval':
        return this.createMedievalAvatar(size, heroClass, colors, seed);
      case 'fantasy':
      default:
        return this.createFantasyAvatar(size, heroClass, colors, seed);
    }
  }

  /**
   * Avatar style fantasy (par défaut)
   */
  private createFantasyAvatar(size: number, heroClass: string, colors: AvatarColors, seed: number): string {
    const icon = this.getHeroIcon(heroClass);
    const pattern = this.generatePattern(seed);
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg-${seed}" cx="50%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:${colors.background};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:1" />
          </radialGradient>
          <pattern id="pattern-${seed}" patternUnits="userSpaceOnUse" width="20" height="20">
            ${pattern}
          </pattern>
        </defs>
        
        <!-- Fond avec gradient -->
        <circle cx="50" cy="50" r="45" fill="url(#bg-${seed})" stroke="${colors.accent}" stroke-width="2"/>
        
        <!-- Motif de fond -->
        <circle cx="50" cy="50" r="40" fill="url(#pattern-${seed})" opacity="0.3"/>
        
        <!-- Icône du héros -->
        <g transform="translate(50,50)">
          ${icon}
        </g>
        
        <!-- Bordure décorative -->
        <circle cx="50" cy="50" r="45" fill="none" stroke="${colors.accent}" stroke-width="3" opacity="0.8"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="${colors.secondary}" stroke-width="1" opacity="0.5"/>
      </svg>
    `;
  }

  /**
   * Avatar style géométrique
   */
  private createGeometricAvatar(size: number, heroClass: string, colors: AvatarColors, seed: number): string {
    const shapes = this.generateGeometricShapes(seed, colors);
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="${colors.background}" rx="10"/>
        ${shapes}
        <text x="50" y="55" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${colors.accent}">
          ${this.getHeroEmoji(heroClass)}
        </text>
      </svg>
    `;
  }

  /**
   * Avatar style pixel art
   */
  private createPixelAvatar(size: number, heroClass: string, colors: AvatarColors, seed: number): string {
    const pixels = this.generatePixelPattern(seed, colors);
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="${colors.background}"/>
        ${pixels}
        <rect x="35" y="35" width="30" height="30" fill="${colors.primary}"/>
        <text x="50" y="55" text-anchor="middle" font-family="monospace" font-size="16" fill="${colors.accent}">
          ${this.getHeroEmoji(heroClass)}
        </text>
      </svg>
    `;
  }

  /**
   * Avatar style médiéval
   */
  private createMedievalAvatar(size: number, heroClass: string, colors: AvatarColors, seed: number): string {
    const shield = this.createShieldShape(colors);
    const crest = this.generateCrest(seed, heroClass);
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        ${shield}
        ${crest}
        <text x="50" y="55" text-anchor="middle" font-family="serif" font-size="20" font-weight="bold" fill="${colors.accent}">
          ${this.getHeroEmoji(heroClass)}
        </text>
      </svg>
    `;
  }

  /**
   * Génère les couleurs selon la classe de héros
   */
  private getHeroColors(heroClass: string, name: string): AvatarColors {
    const seed = this.generateSeed(name);
    const baseColors: Record<string, AvatarColors> = {
      'warrior': { background: '#8B0000', primary: '#DC143C', secondary: '#FFD700', accent: '#FFFFFF' },
      'knight': { background: '#4169E1', primary: '#6495ED', secondary: '#FFD700', accent: '#FFFFFF' },
      'mage': { background: '#4B0082', primary: '#8A2BE2', secondary: '#9370DB', accent: '#FFFFFF' },
      'wizard': { background: '#191970', primary: '#4169E1', secondary: '#00CED1', accent: '#FFFFFF' },
      'archer': { background: '#228B22', primary: '#32CD32', secondary: '#ADFF2F', accent: '#FFFFFF' },
      'paladin': { background: '#DAA520', primary: '#FFD700', secondary: '#FFFFFF', accent: '#000000' },
      'necromancer': { background: '#2F4F4F', primary: '#696969', secondary: '#8B008B', accent: '#FFFFFF' },
      'druid': { background: '#556B2F', primary: '#9ACD32', secondary: '#ADFF2F', accent: '#FFFFFF' },
      'barbarian': { background: '#A0522D', primary: '#D2691E', secondary: '#FF4500', accent: '#FFFFFF' },
      'sorceress': { background: '#8B008B', primary: '#DA70D6', secondary: '#FF69B4', accent: '#FFFFFF' }
    };

    const colors = baseColors[heroClass.toLowerCase()] || baseColors['warrior'];
    
    // Variation basée sur le nom pour l'unicité
    const variation = seed % 3;
    if (variation === 1) {
      colors.primary = this.lightenColor(colors.primary, 20);
    } else if (variation === 2) {
      colors.primary = this.darkenColor(colors.primary, 20);
    }

    return colors;
  }

  /**
   * Génère un seed numérique à partir du nom
   */
  private generateSeed(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Icônes SVG pour chaque classe de héros
   */
  private getHeroIcon(heroClass: string): string {
    const icons: Record<string, string> = {
      'warrior': '<path d="M-10,-15 L10,-15 L8,-5 L-8,-5 Z" fill="currentColor"/><rect x="-2" y="-5" width="4" height="20" fill="currentColor"/>',
      'knight': '<rect x="-12" y="-15" width="24" height="20" rx="2" fill="currentColor"/><rect x="-8" y="-10" width="16" height="10" fill="white"/>',
      'mage': '<circle cx="0" cy="-10" r="8" fill="currentColor"/><path d="M-5,0 Q0,-5 5,0" stroke="currentColor" stroke-width="2" fill="none"/>',
      'wizard': '<path d="M-8,-15 L0,-25 L8,-15 L0,-5 Z" fill="currentColor"/><circle cx="0" cy="-15" r="3" fill="white"/>',
      'archer': '<path d="M-10,-5 Q0,-15 10,-5" stroke="currentColor" stroke-width="2" fill="none"/><line x1="0" y1="-10" x2="0" y2="5" stroke="currentColor" stroke-width="2"/>',
      'paladin': '<rect x="-10" y="-15" width="20" height="25" rx="3" fill="currentColor"/><path d="M-5,-10 L5,-10 L0,-5 Z" fill="white"/>',
      'necromancer': '<circle cx="0" cy="-10" r="8" fill="currentColor"/><path d="M-5,-5 L5,-5 M-3,0 L3,0" stroke="white" stroke-width="2"/>',
      'druid': '<circle cx="0" cy="-10" r="6" fill="currentColor"/><path d="M-8,-5 Q0,0 8,-5" stroke="currentColor" stroke-width="2" fill="none"/>',
      'barbarian': '<path d="M-12,-10 L12,-10 L8,0 L-8,0 Z" fill="currentColor"/><rect x="-2" y="0" width="4" height="15" fill="currentColor"/>',
      'sorceress': '<circle cx="0" cy="-10" r="7" fill="currentColor"/><path d="M-6,-3 Q0,2 6,-3" stroke="white" stroke-width="2" fill="none"/>'
    };

    return icons[heroClass.toLowerCase()] || icons['warrior'];
  }

  /**
   * Emojis pour chaque classe (fallback)
   */
  private getHeroEmoji(heroClass: string): string {
    const emojis: Record<string, string> = {
      'warrior': '⚔️',
      'knight': '🛡️',
      'mage': '🔮',
      'wizard': '🧙',
      'archer': '🏹',
      'paladin': '⚡',
      'necromancer': '💀',
      'druid': '🌿',
      'barbarian': '🪓',
      'sorceress': '✨'
    };

    return emojis[heroClass.toLowerCase()] || '⚔️';
  }

  /**
   * Génère un motif de fond
   */
  private generatePattern(seed: number): string {
    const patterns = [
      '<circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.3"/>',
      '<rect x="0" y="0" width="4" height="4" fill="currentColor" opacity="0.3"/>',
      '<path d="M0,0 L10,10 M10,0 L0,10" stroke="currentColor" stroke-width="1" opacity="0.3"/>',
      '<polygon points="5,0 10,10 0,10" fill="currentColor" opacity="0.3"/>'
    ];

    return patterns[seed % patterns.length];
  }

  /**
   * Génère des formes géométriques
   */
  private generateGeometricShapes(seed: number, colors: AvatarColors): string {
    const shapes = [];
    const random = (min: number, max: number) => min + (seed % (max - min));
    
    for (let i = 0; i < 5; i++) {
      const x = random(10, 90);
      const y = random(10, 90);
      const size = random(5, 15);
      const opacity = 0.3 + (seed % 40) / 100;
      
      shapes.push(`<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${colors.primary}" opacity="${opacity}" transform="rotate(${seed % 360} ${x + size/2} ${y + size/2})"/>`);
    }
    
    return shapes.join('');
  }

  /**
   * Génère un pattern pixel art
   */
  private generatePixelPattern(seed: number, colors: AvatarColors): string {
    const pixels = [];
    const pixelSize = 5;
    
    for (let x = 0; x < 100; x += pixelSize) {
      for (let y = 0; y < 100; y += pixelSize) {
        if ((x + y + seed) % 20 === 0) {
          pixels.push(`<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="${colors.primary}" opacity="0.4"/>`);
        }
      }
    }
    
    return pixels.join('');
  }

  /**
   * Crée une forme de bouclier
   */
  private createShieldShape(colors: AvatarColors): string {
    return `
      <path d="M50,10 L20,30 L20,60 Q20,80 50,90 Q80,80 80,60 L80,30 Z" 
            fill="${colors.background}" 
            stroke="${colors.accent}" 
            stroke-width="3"/>
    `;
  }

  /**
   * Génère un blason
   */
  private generateCrest(seed: number, heroClass: string): string {
    const symbols = [
      '<circle cx="50" cy="40" r="8" fill="currentColor"/>',
      '<rect x="42" y="32" width="16" height="16" fill="currentColor"/>',
      '<path d="M50,30 L58,50 L42,50 Z" fill="currentColor"/>',
      '<path d="M42,35 Q50,30 58,35 Q50,45 42,35" fill="currentColor"/>'
    ];

    return symbols[seed % symbols.length];
  }

  /**
   * Éclaircit une couleur
   */
  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  /**
   * Assombrit une couleur
   */
  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  }

  /**
   * Génère un data URL pour utilisation directe
   */
  generateDataURL(config: LocalAvatarConfig): string {
    const svg = this.generateLocalAvatar(config);
    const base64 = btoa(svg);
    return `data:image/svg+xml;base64,${base64}`;
  }

  /**
   * Efface le cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export const localAvatarService = new LocalAvatarService();
export default localAvatarService; 