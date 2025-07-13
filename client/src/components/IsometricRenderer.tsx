import React, { useEffect, useRef, useState } from 'react';
import { modernTheme } from '../styles/theme';
import { useGameStore } from '../store/useGameStore';
import { Hero, Unit } from '../types/game';

interface IsometricRendererProps {
  width: number;
  height: number;
}

// Configuration isométrique
const ISO_CONFIG = {
  // Dimensions des tuiles
  tileWidth: 64,
  tileHeight: 32,
  
  // Offset pour centrer la map
  offsetX: 0,
  offsetY: 0,
  
  // Couleurs modernes
  colors: {
    grass: '#4A7C59',
    forest: '#2F5233',
    mountain: '#5C5C5C',
    water: '#1E3A8A',
    desert: '#D97706',
    swamp: '#059669',
    
    // Bordures
    border: 'rgba(255, 255, 255, 0.1)',
    selected: modernTheme.colors.accent.primary,
    hover: 'rgba(255, 255, 255, 0.2)',
    
    // Zones ZFC
    zfc: 'rgba(0, 212, 255, 0.3)',
    locked: 'rgba(255, 212, 59, 0.3)',
  }
};

// Conversion coordonnées cartésiennes vers isométriques
const cartesianToIsometric = (x: number, y: number) => ({
  x: (x - y) * (ISO_CONFIG.tileWidth / 2),
  y: (x + y) * (ISO_CONFIG.tileHeight / 2)
});

// Conversion isométriques vers cartésiennes
const isometricToCartesian = (isoX: number, isoY: number) => ({
  x: Math.floor((isoX / (ISO_CONFIG.tileWidth / 2) + isoY / (ISO_CONFIG.tileHeight / 2)) / 2),
  y: Math.floor((isoY / (ISO_CONFIG.tileHeight / 2) - isoX / (ISO_CONFIG.tileWidth / 2)) / 2)
});

const IsometricRenderer: React.FC<IsometricRendererProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [selectedHex, setSelectedHex] = useState<{ x: number; y: number } | null>(null);
  
  const { currentGame, currentPlayer } = useGameStore();

  // Dessiner une tuile isométrique
  const drawIsometricTile = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    borderColor?: string
  ) => {
    const iso = cartesianToIsometric(x, y);
    const screenX = iso.x + width / 2 + ISO_CONFIG.offsetX;
    const screenY = iso.y + height / 3 + ISO_CONFIG.offsetY;
    
    ctx.save();
    
    // Dessiner le losange
    ctx.beginPath();
    ctx.moveTo(screenX, screenY);
    ctx.lineTo(screenX + ISO_CONFIG.tileWidth / 2, screenY + ISO_CONFIG.tileHeight / 2);
    ctx.lineTo(screenX, screenY + ISO_CONFIG.tileHeight);
    ctx.lineTo(screenX - ISO_CONFIG.tileWidth / 2, screenY + ISO_CONFIG.tileHeight / 2);
    ctx.closePath();
    
    // Remplir
    ctx.fillStyle = color;
    ctx.fill();
    
    // Bordure
    if (borderColor) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    ctx.restore();
  };

  // Dessiner un héros
  const drawHero = (
    ctx: CanvasRenderingContext2D,
    hero: Hero,
    color: string
  ) => {
    const iso = cartesianToIsometric(hero.position.x, hero.position.y);
    const screenX = iso.x + width / 2 + ISO_CONFIG.offsetX;
    const screenY = iso.y + height / 3 + ISO_CONFIG.offsetY - 20; // Élever le héros
    
    ctx.save();
    
    // Corps du héros (cercle moderne)
    ctx.beginPath();
    ctx.arc(screenX, screenY, 12, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Nom du héros
    ctx.fillStyle = modernTheme.colors.text.primary;
    ctx.font = `${modernTheme.typography.fontSize.sm} ${modernTheme.typography.fontFamily.primary}`;
    ctx.textAlign = 'center';
    ctx.fillText(hero.name, screenX, screenY - 20);
    
    // Niveau
    ctx.fillStyle = modernTheme.colors.accent.warning;
    ctx.font = `${modernTheme.typography.fontSize.xs} ${modernTheme.typography.fontFamily.secondary}`;
    ctx.fillText(`Lv.${hero.level}`, screenX, screenY + 25);
    
    ctx.restore();
  };

  // Dessiner les effets ZFC
  const drawZFCEffects = (
    ctx: CanvasRenderingContext2D,
    hex: any
  ) => {
    if (!hex.zfcZone) return;
    
    const iso = cartesianToIsometric(hex.x, hex.y);
    const screenX = iso.x + width / 2 + ISO_CONFIG.offsetX;
    const screenY = iso.y + height / 3 + ISO_CONFIG.offsetY;
    
    ctx.save();
    
    // Effet de pulsation
    const time = Date.now() * 0.003;
    const pulse = Math.sin(time) * 0.3 + 0.7;
    
    // Aura ZFC
    ctx.beginPath();
    ctx.arc(screenX, screenY + ISO_CONFIG.tileHeight / 2, 30 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = hex.zfcZone.isLocked ? ISO_CONFIG.colors.locked : ISO_CONFIG.colors.zfc;
    ctx.fill();
    
    ctx.restore();
  };

  // Fonction de rendu principal
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentGame) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas avec fond moderne
    ctx.fillStyle = modernTheme.colors.background.primary;
    ctx.fillRect(0, 0, width, height);
    
    // Dessiner la grille hexagonale en isométrique
    // Créer une grille simple pour la démo
    for (let x = -10; x <= 10; x++) {
      for (let y = -10; y <= 10; y++) {
        // Couleur de base variée
        const terrainTypes = ['grass', 'forest', 'mountain', 'water', 'desert', 'swamp'];
        const terrainIndex = (Math.abs(x) + Math.abs(y)) % terrainTypes.length;
        const terrain = terrainTypes[terrainIndex];
        
        let baseColor = ISO_CONFIG.colors.grass;
        switch (terrain) {
          case 'forest': baseColor = ISO_CONFIG.colors.forest; break;
          case 'mountain': baseColor = ISO_CONFIG.colors.mountain; break;
          case 'water': baseColor = ISO_CONFIG.colors.water; break;
          case 'desert': baseColor = ISO_CONFIG.colors.desert; break;
          case 'swamp': baseColor = ISO_CONFIG.colors.swamp; break;
        }
        
        // Bordure selon l'état
        let borderColor = ISO_CONFIG.colors.border;
        if (selectedHex && selectedHex.x === x && selectedHex.y === y) {
          borderColor = ISO_CONFIG.colors.selected;
        } else if (mousePos) {
          const cartesian = isometricToCartesian(
            mousePos.x - width / 2 - ISO_CONFIG.offsetX,
            mousePos.y - height / 3 - ISO_CONFIG.offsetY
          );
          if (Math.abs(cartesian.x - x) < 1 && Math.abs(cartesian.y - y) < 1) {
            borderColor = ISO_CONFIG.colors.hover;
          }
        }
        
        // Dessiner la tuile
        drawIsometricTile(ctx, x, y, baseColor, borderColor);
        
        // Dessiner les effets ZFC (quelques zones aléatoires)
        if ((x + y) % 7 === 0) {
          const iso = cartesianToIsometric(x, y);
          const screenX = iso.x + width / 2 + ISO_CONFIG.offsetX;
          const screenY = iso.y + height / 3 + ISO_CONFIG.offsetY;
          
          ctx.save();
          const time = Date.now() * 0.003;
          const pulse = Math.sin(time) * 0.3 + 0.7;
          
          ctx.beginPath();
          ctx.arc(screenX, screenY + ISO_CONFIG.tileHeight / 2, 30 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = ISO_CONFIG.colors.zfc;
          ctx.fill();
          ctx.restore();
        }
      }
    }
    
    // Dessiner les héros
    if (currentPlayer) {
      currentPlayer.heroes.forEach(hero => {
        drawHero(ctx, hero, modernTheme.colors.game.player1);
      });
    }
    
    // Dessiner les autres joueurs
    currentGame.players.forEach(player => {
      if (player.id !== currentPlayer?.id) {
        player.heroes.forEach(hero => {
          drawHero(ctx, hero, modernTheme.colors.game.player2);
        });
      }
    });
  };

  // Gestion des événements souris
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setMousePos({ x, y });
  };

  const handleMouseClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const cartesian = isometricToCartesian(
      x - width / 2 - ISO_CONFIG.offsetX,
      y - height / 3 - ISO_CONFIG.offsetY
    );
    
    // Vérifier si on clique sur une tuile valide (dans la grille -10 à 10)
    if (cartesian.x >= -10 && cartesian.x <= 10 && cartesian.y >= -10 && cartesian.y <= 10) {
      setSelectedHex({ x: Math.round(cartesian.x), y: Math.round(cartesian.y) });
    }
  };

  // Animation loop
  useEffect(() => {
    const animate = () => {
      render();
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [currentGame, currentPlayer, mousePos, selectedHex]);

  // Redimensionnement du canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configuration haute résolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    
    // Anti-aliasing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onClick={handleMouseClick}
      style={{
        display: 'block',
        cursor: 'pointer',
        background: modernTheme.colors.background.secondary,
      }}
    />
  );
};

export default IsometricRenderer; 