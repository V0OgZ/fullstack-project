import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Position, Tile, Hero } from '../types/game';
import './ModernGameRenderer.css';

interface ModernGameRendererProps {
  width: number;
  height: number;
}

interface AnimatedElement {
  id: string;
  type: 'hero' | 'effect' | 'particle';
  position: Position;
  targetPosition?: Position;
  startTime: number;
  duration: number;
  color: string;
  size: number;
}

const ModernGameRenderer: React.FC<ModernGameRendererProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const { map, currentGame, currentPlayer, selectedTile, visibleZFCs, shadowActions } = useGameStore();
  
  const [animatedElements, setAnimatedElements] = useState<AnimatedElement[]>([]);
  const [hoveredTile, setHoveredTile] = useState<Position | null>(null);

  // Configuration du rendu
  const config = {
    tileSize: 64,
    hexHeight: 55,
    hexWidth: 64,
    colors: {
      grass: '#4CAF50',
      forest: '#2E7D32',
      mountain: '#795548',
      water: '#2196F3',
      desert: '#FFC107',
      swamp: '#8BC34A',
      selected: '#FFD700',
      hover: '#FFA726',
      zfc: {
        friendly: 'rgba(76, 175, 80, 0.3)',
        enemy: 'rgba(244, 67, 54, 0.3)',
        neutral: 'rgba(255, 193, 7, 0.3)',
        locked: 'rgba(156, 39, 176, 0.5)'
      }
    }
  };

  // Conversion coordonnées hexagonales
  const hexToPixel = useCallback((hex: Position): Position => {
    const x = config.hexWidth * (hex.x + hex.y / 2);
    const y = config.hexHeight * hex.y * 0.75;
    return { x, y };
  }, []);

  const pixelToHex = useCallback((pixel: Position): Position => {
    const y = Math.round(pixel.y / (config.hexHeight * 0.75));
    const x = Math.round(pixel.x / config.hexWidth - y / 2);
    return { x, y };
  }, []);

  // Rendu d'une tuile hexagonale
  const drawHexTile = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    tile: Tile,
    isSelected: boolean,
    isHovered: boolean
  ) => {
    const { x, y } = center;
    const size = config.tileSize / 2;

    // Créer le chemin hexagonal
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const hexX = x + size * Math.cos(angle);
      const hexY = y + size * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(hexX, hexY);
      } else {
        ctx.lineTo(hexX, hexY);
      }
    }
    ctx.closePath();

    // Remplir avec la couleur du terrain
    const baseColor = config.colors[tile.terrain as keyof typeof config.colors] || config.colors.grass;
    ctx.fillStyle = typeof baseColor === 'string' ? baseColor : config.colors.grass;
    ctx.fill();

    // Effet de survol
    if (isHovered) {
      ctx.fillStyle = config.colors.hover;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Bordure de sélection
    if (isSelected) {
      ctx.strokeStyle = config.colors.selected;
      ctx.lineWidth = 3;
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Dessiner structure si présente
    if (tile.structure) {
      drawStructure(ctx, center, tile.structure);
    }

    // Dessiner créature si présente
    if (tile.creature) {
      drawCreature(ctx, center, tile.creature);
    }

    // Dessiner héros si présent
    if (tile.hero) {
      drawHero(ctx, center, tile.hero);
    }
  }, []);

  // Rendu d'un héros
  const drawHero = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    hero: Hero
  ) => {
    const { x, y } = center;
    const size = 20;

    // Cercle de base
    ctx.beginPath();
    ctx.arc(x, y - 10, size, 0, Math.PI * 2);
    ctx.fillStyle = '#FF5722';
    ctx.fill();
    ctx.strokeStyle = '#D32F2F';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Symbole héros
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚔️', x, y - 10);

    // Nom du héros
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(hero.name, x, y + 20);
    ctx.fillText(hero.name, x, y + 20);
  }, []);

  // Rendu d'une structure
  const drawStructure = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    structure: any
  ) => {
    const { x, y } = center;
    const size = 25;

    // Fond de la structure
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = '#8D6E63';
    ctx.fill();
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Icône de la structure
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Déterminer l'icône selon le type
    let icon = '🏰';
    if (structure.type === 'gold_mine') icon = '💰';
    else if (structure.type === 'sawmill') icon = '🪵';
    else if (structure.type === 'stone_quarry') icon = '🗿';
    else if (structure.type === 'crystal_mine') icon = '💎';
    else if (structure.type === 'village') icon = '🏘️';
    else if (structure.type === 'tavern') icon = '🍺';
    else if (structure.type === 'temple') icon = '⛪';
    else if (structure.type === 'laboratory') icon = '🧪';
    else if (structure.type === 'elven_fortress') icon = '🌲';
    else if (structure.type === 'dwarven_citadel') icon = '⛰️';
    else if (structure.type === 'magic_tower') icon = '🔮';
    
    ctx.fillText(icon, x, y);

    // Nom de la structure
    ctx.fillStyle = 'white';
    ctx.font = '10px Arial';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeText(structure.name, x, y + 35);
    ctx.fillText(structure.name, x, y + 35);
  }, []);

  // Rendu d'une créature
  const drawCreature = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    creature: any
  ) => {
    const { x, y } = center;
    const size = 15;

    ctx.beginPath();
    ctx.arc(x, y + 10, size, 0, Math.PI * 2);
    ctx.fillStyle = '#9C27B0';
    ctx.fill();
    ctx.strokeStyle = '#7B1FA2';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Icône de la créature
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let icon = '🐉';
    if (creature.type === 'wolf') icon = '🐺';
    else if (creature.type === 'golem') icon = '🗿';
    else if (creature.type === 'elemental') icon = '💫';
    else if (creature.type === 'sea_monster') icon = '🐙';
    
    ctx.fillText(icon, x, y + 10);
  }, []);

  // Rendu des zones ZFC
  const drawZFCZones = useCallback((ctx: CanvasRenderingContext2D) => {
    visibleZFCs.forEach(zfc => {
      zfc.reachableTiles.forEach(tile => {
        const pixel = hexToPixel(tile);
        const center = { x: pixel.x + config.hexWidth / 2, y: pixel.y + config.hexHeight / 2 };
        
        // Dessiner la zone
        ctx.beginPath();
        const size = config.tileSize / 2;
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const hexX = center.x + size * Math.cos(angle);
          const hexY = center.y + size * Math.sin(angle);
          if (i === 0) {
            ctx.moveTo(hexX, hexY);
          } else {
            ctx.lineTo(hexX, hexY);
          }
        }
        ctx.closePath();

        // Couleur selon le type de zone
        ctx.fillStyle = config.colors.zfc.friendly;
        ctx.fill();
        
        // Bordure animée
        const time = Date.now() / 1000;
        const alpha = 0.5 + 0.3 * Math.sin(time * 2);
        ctx.strokeStyle = `rgba(76, 175, 80, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
  }, [visibleZFCs, hexToPixel]);

  // Rendu des effets de particules
  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const currentTime = Date.now();
    
    animatedElements.forEach(element => {
      const progress = Math.min(1, (currentTime - element.startTime) / element.duration);
      
      if (element.type === 'particle') {
        const pixel = hexToPixel(element.position);
        const alpha = 1 - progress;
        const size = element.size * (1 + progress * 0.5);
        
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, size, 0, Math.PI * 2);
        ctx.fillStyle = element.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    // Nettoyer les éléments expirés
    setAnimatedElements(prev => 
      prev.filter(el => (currentTime - el.startTime) < el.duration)
    );
  }, [animatedElements, hexToPixel]);

  // Ajouter un effet de particule
  const addParticleEffect = useCallback((position: Position, color: string) => {
    const newParticle: AnimatedElement = {
      id: `particle_${Date.now()}_${Math.random()}`,
      type: 'particle',
      position,
      startTime: Date.now(),
      duration: 1000,
      color,
      size: 5
    };
    
    setAnimatedElements(prev => [...prev, newParticle]);
  }, []);

  // Boucle de rendu principale
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, width, height);

    // Dessiner le fond
    ctx.fillStyle = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
    ctx.fillRect(0, 0, width, height);

    if (!map || map.length === 0) {
      // Message de chargement
      ctx.fillStyle = '#FFD700';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Chargement de la carte...', width / 2, height / 2);
      return;
    }

    // Dessiner les zones ZFC en arrière-plan
    drawZFCZones(ctx);

    // Dessiner les tuiles
    map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const pixel = hexToPixel({ x, y });
        const center = { x: pixel.x + config.hexWidth / 2, y: pixel.y + config.hexHeight / 2 };
        
        const isSelected = selectedTile?.x === x && selectedTile?.y === y;
        const isHovered = hoveredTile?.x === x && hoveredTile?.y === y;
        
        drawHexTile(ctx, center, tile, isSelected, isHovered);
      });
    });

    // Dessiner les héros de tous les joueurs
    if (currentGame && currentGame.players) {
      currentGame.players.forEach(player => {
        player.heroes.forEach(hero => {
          const pixel = hexToPixel(hero.position);
          const center = { x: pixel.x + config.hexWidth / 2, y: pixel.y + config.hexHeight / 2 };
          drawHero(ctx, center, hero);
        });
      });
    }

    // Dessiner les effets de particules
    drawParticles(ctx);

    // Programmer le prochain rendu
    animationRef.current = requestAnimationFrame(render);
  }, [map, selectedTile, hoveredTile, width, height, drawZFCZones, drawHexTile, drawParticles, hexToPixel]);

  // Gestion des événements de souris
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const hexCoord = pixelToHex({ x, y });
    
    if (map && hexCoord.y >= 0 && hexCoord.y < map.length && 
        hexCoord.x >= 0 && hexCoord.x < map[0].length) {
      setHoveredTile(hexCoord);
    } else {
      setHoveredTile(null);
    }
  }, [map, pixelToHex]);

  const handleMouseLeave = useCallback(() => {
    setHoveredTile(null);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const hexCoord = pixelToHex({ x, y });
    
    if (map && hexCoord.y >= 0 && hexCoord.y < map.length && 
        hexCoord.x >= 0 && hexCoord.x < map[0].length) {
      const { setSelectedTile } = useGameStore.getState();
      setSelectedTile(hexCoord);
      
      // Ajouter un effet de particule au clic
      addParticleEffect(hexCoord, '#FFD700');
    }
  }, [map, pixelToHex, addParticleEffect]);

  // Initialiser le rendu
  useEffect(() => {
    render();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [render]);

  return (
    <div className="modern-game-renderer">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="game-canvas"
      />
      
      {/* Overlay pour les informations */}
      {hoveredTile && map && (
        <div 
          className="tile-tooltip"
          style={{
            left: hexToPixel(hoveredTile).x + config.hexWidth / 2,
            top: hexToPixel(hoveredTile).y
          }}
        >
          <div className="tooltip-content">
            <strong>{map[hoveredTile.y][hoveredTile.x].terrain}</strong>
            <br />
            Position: ({hoveredTile.x}, {hoveredTile.y})
            {map[hoveredTile.y][hoveredTile.x].hero && (
              <>
                <br />
                Héros: {map[hoveredTile.y][hoveredTile.x].hero?.name}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernGameRenderer; 