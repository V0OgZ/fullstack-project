// Générateur d'assets SVG modernes pour les héros
export const generateHeroSVG = (heroType: string, color: string = '#00D4FF'): string => {
  const svgTemplates = {
    warrior: `
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${adjustColor(color, -20)};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Corps -->
        <circle cx="24" cy="28" r="12" fill="url(#heroGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        
        <!-- Tête -->
        <circle cx="24" cy="16" r="8" fill="url(#heroGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        
        <!-- Épée -->
        <path d="M32 20 L38 14 L40 16 L34 22 Z" fill="rgba(255,255,255,0.8)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <rect x="36" y="12" width="2" height="8" fill="rgba(255,255,255,0.6)" transform="rotate(45 37 16)"/>
        
        <!-- Bouclier -->
        <path d="M8 18 L16 14 L16 26 L8 22 Z" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        
        <!-- Détails -->
        <circle cx="24" cy="16" r="3" fill="rgba(255,255,255,0.2)"/>
        <circle cx="24" cy="28" r="6" fill="rgba(255,255,255,0.1)"/>
      </svg>
    `,
    
    mage: `
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#9333EA;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Corps -->
        <circle cx="24" cy="28" r="12" fill="url(#mageGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        
        <!-- Tête -->
        <circle cx="24" cy="16" r="8" fill="url(#mageGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        
        <!-- Chapeau -->
        <path d="M16 12 L24 4 L32 12 L30 14 L18 14 Z" fill="url(#mageGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        
        <!-- Bâton magique -->
        <line x1="36" y1="12" x2="40" y2="32" stroke="rgba(139,69,19,0.8)" stroke-width="3"/>
        <circle cx="40" cy="10" r="4" fill="#FFD700" filter="url(#glow)"/>
        
        <!-- Étoiles magiques -->
        <path d="M8 8 L10 12 L14 12 L11 15 L12 19 L8 17 L4 19 L5 15 L2 12 L6 12 Z" fill="#FFD700" opacity="0.7"/>
        <path d="M36 36 L37 38 L39 38 L37.5 39.5 L38 42 L36 41 L34 42 L34.5 39.5 L33 38 L35 38 Z" fill="#FFD700" opacity="0.7"/>
        
        <!-- Détails -->
        <circle cx="24" cy="16" r="3" fill="rgba(255,255,255,0.2)"/>
        <circle cx="24" cy="28" r="6" fill="rgba(255,255,255,0.1)"/>
      </svg>
    `,
    
    archer: `
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="archerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Corps -->
        <circle cx="24" cy="28" r="12" fill="url(#archerGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        
        <!-- Tête -->
        <circle cx="24" cy="16" r="8" fill="url(#archerGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        
        <!-- Arc -->
        <path d="M8 16 Q4 24 8 32" stroke="rgba(139,69,19,0.8)" stroke-width="3" fill="none"/>
        <line x1="8" y1="16" x2="8" y2="32" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
        
        <!-- Flèche -->
        <line x1="12" y1="24" x2="20" y2="24" stroke="rgba(139,69,19,0.8)" stroke-width="2"/>
        <path d="M20 24 L18 22 L18 26 Z" fill="rgba(139,69,19,0.8)"/>
        <path d="M12 24 L14 22 L14 26 Z" fill="rgba(255,255,255,0.6)"/>
        
        <!-- Carquois -->
        <rect x="32" y="8" width="6" height="16" fill="rgba(139,69,19,0.6)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <line x1="33" y1="8" x2="33" y2="6" stroke="rgba(139,69,19,0.8)" stroke-width="2"/>
        <line x1="35" y1="8" x2="35" y2="6" stroke="rgba(139,69,19,0.8)" stroke-width="2"/>
        <line x1="37" y1="8" x2="37" y2="6" stroke="rgba(139,69,19,0.8)" stroke-width="2"/>
        
        <!-- Détails -->
        <circle cx="24" cy="16" r="3" fill="rgba(255,255,255,0.2)"/>
        <circle cx="24" cy="28" r="6" fill="rgba(255,255,255,0.1)"/>
      </svg>
    `,
    
    rogue: `
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rogueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1F2937;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#374151;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Corps -->
        <circle cx="24" cy="28" r="12" fill="url(#rogueGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        
        <!-- Tête -->
        <circle cx="24" cy="16" r="8" fill="url(#rogueGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        
        <!-- Capuche -->
        <path d="M16 8 L24 4 L32 8 L32 16 L16 16 Z" fill="url(#rogueGradient)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        
        <!-- Dagues -->
        <path d="M8 20 L12 16 L14 18 L10 22 Z" fill="rgba(192,192,192,0.8)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <path d="M38 20 L34 16 L36 18 L40 22 Z" fill="rgba(192,192,192,0.8)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        
        <!-- Ceinture d'outils -->
        <rect x="18" y="32" width="12" height="3" fill="rgba(139,69,19,0.8)"/>
        <circle cx="20" cy="33.5" r="1" fill="rgba(255,255,255,0.6)"/>
        <circle cx="24" cy="33.5" r="1" fill="rgba(255,255,255,0.6)"/>
        <circle cx="28" cy="33.5" r="1" fill="rgba(255,255,255,0.6)"/>
        
        <!-- Détails */
        <circle cx="24" cy="16" r="3" fill="rgba(255,255,255,0.2)"/>
        <circle cx="24" cy="28" r="6" fill="rgba(255,255,255,0.1)"/>
      </svg>
    `,
  };

  return svgTemplates[heroType as keyof typeof svgTemplates] || svgTemplates.warrior;
};

// Utilitaire pour ajuster la couleur
const adjustColor = (color: string, amount: number): string => {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

// Générateur d'icônes de terrain
export const generateTerrainSVG = (terrainType: string): string => {
  const terrainTemplates = {
    grass: `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#4A7C59"/>
        <path d="M4 28 Q8 24 12 28 Q16 24 20 28 Q24 24 28 28" stroke="#5A8B69" stroke-width="2" fill="none"/>
        <circle cx="8" cy="8" r="2" fill="#6B9B79" opacity="0.7"/>
        <circle cx="24" cy="12" r="1.5" fill="#6B9B79" opacity="0.7"/>
        <circle cx="16" cy="20" r="1" fill="#6B9B79" opacity="0.7"/>
      </svg>
    `,
    
    forest: `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#2F5233"/>
        <path d="M8 24 L12 8 L16 24 Z" fill="#4A7C59"/>
        <path d="M16 28 L20 12 L24 28 Z" fill="#4A7C59"/>
        <rect x="10" y="24" width="2" height="8" fill="#8B4513"/>
        <rect x="18" y="28" width="2" height="4" fill="#8B4513"/>
        <circle cx="6" cy="20" r="3" fill="#4A7C59" opacity="0.8"/>
        <circle cx="26" cy="16" r="2" fill="#4A7C59" opacity="0.8"/>
      </svg>
    `,
    
    mountain: `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#5C5C5C"/>
        <path d="M4 28 L12 8 L20 28 Z" fill="#7C7C7C"/>
        <path d="M12 28 L20 12 L28 28 Z" fill="#6C6C6C"/>
        <path d="M8 28 L12 8 L16 28 Z" fill="#8C8C8C"/>
        <circle cx="12" cy="8" r="2" fill="#FFFFFF" opacity="0.8"/>
        <circle cx="20" cy="12" r="1.5" fill="#FFFFFF" opacity="0.6"/>
      </svg>
    `,
    
    water: `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#1E3A8A"/>
        <path d="M0 12 Q8 8 16 12 Q24 16 32 12 L32 20 Q24 24 16 20 Q8 16 0 20 Z" fill="#2563EB" opacity="0.7"/>
        <path d="M0 20 Q8 16 16 20 Q24 24 32 20 L32 28 Q24 32 16 28 Q8 24 0 28 Z" fill="#3B82F6" opacity="0.5"/>
        <circle cx="8" cy="8" r="1" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" opacity="0.4"/>
      </svg>
    `,
    
    desert: `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#D97706"/>
        <path d="M0 16 Q8 12 16 16 Q24 20 32 16 L32 24 Q24 28 16 24 Q8 20 0 24 Z" fill="#F59E0B" opacity="0.7"/>
        <path d="M0 24 Q8 20 16 24 Q24 28 32 24 L32 32 Q24 36 16 32 Q8 28 0 32 Z" fill="#FBBF24" opacity="0.5"/>
        <circle cx="12" cy="8" r="1" fill="#FEF3C7" opacity="0.8"/>
        <circle cx="28" cy="12" r="1.5" fill="#FEF3C7" opacity="0.6"/>
        <circle cx="6" cy="28" r="1" fill="#FEF3C7" opacity="0.4"/>
      </svg>
    `,
    
    swamp: `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#059669"/>
        <path d="M4 20 Q8 16 12 20 Q16 24 20 20 Q24 16 28 20 L28 28 Q24 32 20 28 Q16 32 12 28 Q8 32 4 28 Z" fill="#047857" opacity="0.8"/>
        <circle cx="8" cy="12" r="2" fill="#10B981" opacity="0.6"/>
        <circle cx="24" cy="8" r="1.5" fill="#10B981" opacity="0.6"/>
        <path d="M16 24 L18 20 L20 24 L18 28 Z" fill="#1F2937" opacity="0.7"/>
        <circle cx="18" cy="24" r="1" fill="#6B7280" opacity="0.5"/>
      </svg>
    `,
  };

  return terrainTemplates[terrainType as keyof typeof terrainTemplates] || terrainTemplates.grass;
};

// Assets des héros par défaut
export const DEFAULT_HERO_ASSETS = {
  warrior: generateHeroSVG('warrior', '#00D4FF'),
  mage: generateHeroSVG('mage', '#9333EA'),
  archer: generateHeroSVG('archer', '#059669'),
  rogue: generateHeroSVG('rogue', '#1F2937'),
};

// Convertir SVG en Data URL pour utilisation directe
export const svgToDataUrl = (svg: string): string => {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}; 