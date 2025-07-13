export const modernTheme = {
  // Couleurs épurées et modernes
  colors: {
    // Background
    background: {
      primary: '#0F0F0F',
      secondary: '#1A1A1A',
      tertiary: '#2A2A2A',
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    
    // Interface
    surface: {
      primary: 'rgba(255, 255, 255, 0.05)',
      secondary: 'rgba(255, 255, 255, 0.08)',
      tertiary: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.15)',
    },
    
    // Text
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      disabled: '#404040',
    },
    
    // Accent colors
    accent: {
      primary: '#00D4FF',
      secondary: '#FF6B6B',
      success: '#51CF66',
      warning: '#FFD43B',
      error: '#FF6B6B',
    },
    
    // Game specific
    game: {
      player1: '#00D4FF',
      player2: '#FF6B6B',
      neutral: '#51CF66',
      locked: '#FFD43B',
      zfc: 'rgba(0, 212, 255, 0.3)',
    },
    
    // Terrain colors (modern/muted)
    terrain: {
      grass: '#4A7C59',
      forest: '#2F5233',
      mountain: '#5C5C5C',
      water: '#1E3A8A',
      desert: '#D97706',
      swamp: '#059669',
    },
  },
  
  // Typography moderne
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      secondary: '"JetBrains Mono", monospace',
      display: '"Orbitron", sans-serif',
    },
    
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  // Spacing système 8px
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  // Shadows modernes
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(0, 212, 255, 0.3)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  // Z-index système
  zIndex: {
    background: -1,
    base: 0,
    overlay: 10,
    modal: 20,
    popover: 30,
    tooltip: 40,
    notification: 50,
  },
  
  // Breakpoints responsive
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Animations
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideIn: 'slideIn 0.3s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
    pulse: 'pulse 2s infinite',
  },
};

export type Theme = typeof modernTheme; 