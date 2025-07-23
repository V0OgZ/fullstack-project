// game.js - Rendu du jeu avec grille hexagonale
class GameRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameState = null;
        this.hexSize = 25;
        this.selectedTile = null;
        this.hoveredTile = null;
        this.zoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        
        // Animation properties
        this.animationFrame = 0;
        this.particles = [];
        this.psiAnimations = new Map();
        
        this.setupCanvas();
        this.setupEventListeners();
        this.startAnimationLoop();
    }
    
    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.refresh();
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
        
        // Drag to pan
        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
                isDragging = true;
                dragStartX = e.clientX - this.offsetX;
                dragStartY = e.clientY - this.offsetY;
                e.preventDefault();
            }
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this.offsetX = e.clientX - dragStartX;
                this.offsetY = e.clientY - dragStartY;
                this.refresh();
            }
        });
        
        this.canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
    
    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - this.canvas.width / 2 - this.offsetX) / this.zoom;
        const y = (e.clientY - rect.top - this.canvas.height / 2 - this.offsetY) / this.zoom;
        
        const hex = this.pixelToHex(x, y);
        this.selectedTile = hex;
        
        // Add particle effect at click location
        this.addParticle(x + this.canvas.width / 2, y + this.canvas.height / 2, 'click');
        
        // Auto-generate movement command
        if (window.scriptConsole) {
            window.scriptConsole.addToOutput(`Clicked on @${hex.q},${hex.r}`, 'info');
        }
        
        this.refresh();
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - this.canvas.width / 2 - this.offsetX) / this.zoom;
        const y = (e.clientY - rect.top - this.canvas.height / 2 - this.offsetY) / this.zoom;
        
        const hex = this.pixelToHex(x, y);
        this.hoveredTile = hex;
        this.refresh();
    }
    
    handleWheel(e) {
        e.preventDefault();
        const zoomSpeed = 0.1;
        const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
        
        this.zoom = Math.max(0.5, Math.min(3, this.zoom + delta));
        this.refresh();
    }
    
    hexToPixel(q, r) {
        const x = this.hexSize * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
        const y = this.hexSize * (3 / 2 * r);
        return { x, y };
    }
    
    pixelToHex(x, y) {
        const q = (Math.sqrt(3) / 3 * x - 1 / 3 * y) / this.hexSize;
        const r = (2 / 3 * y) / this.hexSize;
        return this.roundHex(q, r);
    }
    
    roundHex(q, r) {
        const s = -q - r;
        let rq = Math.round(q);
        let rr = Math.round(r);
        let rs = Math.round(s);
        
        const q_diff = Math.abs(rq - q);
        const r_diff = Math.abs(rr - r);
        const s_diff = Math.abs(rs - s);
        
        if (q_diff > r_diff && q_diff > s_diff) {
            rq = -rr - rs;
        } else if (r_diff > s_diff) {
            rr = -rq - rs;
        }
        
        return { q: rq, r: rr };
    }
    
    updateState(state) {
        this.gameState = state;
        this.refresh();
    }
    
    async refresh() {
        if (!this.ctx) return;
        
        // Récupérer les données du backend si un jeu est actif
        if (window.gameAPI && window.gameAPI.gameId) {
            try {
                const gameState = await window.gameAPI.getGameState();
                this.gameState = gameState;
                
                // Mettre à jour la barre de statut
                if (window.updateStatusBar) {
                    window.updateStatusBar(`Game ID: ${gameState.gameId} | Turn: ${gameState.currentTurn} | Heroes: ${gameState.heroes ? gameState.heroes.length : 0}`);
                }
            } catch (error) {
                console.error('Failed to refresh game state:', error);
                // Utiliser l'état local si disponible
            }
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height)
        );
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(10, 10, 15, 1)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Save context for transformations
        this.ctx.save();
        
        // Apply zoom and pan
        this.ctx.translate(this.canvas.width / 2 + this.offsetX, this.canvas.height / 2 + this.offsetY);
        this.ctx.scale(this.zoom, this.zoom);
        
        // Draw hex grid
        this.drawHexGrid();
        
        // Draw game elements
        if (this.gameState) {
            this.drawTiles();
            this.drawPsiStates();
            this.drawHeroes();
            this.drawArtifacts();
            this.drawTemporalEffects();
            
            // Draw fog of war with 7 types and timeline transparency
            this.drawFogOfWar();
        }
        
        // Draw particles
        this.drawParticles();
        
        // Restore context
        this.ctx.restore();
        
        // Draw UI overlay
        this.drawUIOverlay();
    }
    
    drawHexGrid() {
        const gridSize = 15;
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let q = -gridSize; q <= gridSize; q++) {
            for (let r = -gridSize; r <= gridSize; r++) {
                if (Math.abs(q + r) <= gridSize) {
                    this.drawHex(q, r);
                }
            }
        }
    }
    
    drawHex(q, r, fillStyle = null, strokeStyle = null) {
        const { x, y } = this.hexToPixel(q, r);
        const angles = [];
        
        for (let i = 0; i < 6; i++) {
            angles.push((Math.PI / 3) * i + Math.PI / 6);
        }
        
        this.ctx.beginPath();
        angles.forEach((angle, i) => {
            const hx = x + this.hexSize * Math.cos(angle);
            const hy = y + this.hexSize * Math.sin(angle);
            if (i === 0) {
                this.ctx.moveTo(hx, hy);
            } else {
                this.ctx.lineTo(hx, hy);
            }
        });
        this.ctx.closePath();
        
        if (fillStyle) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fill();
        }
        
        if (strokeStyle) {
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.stroke();
        } else {
            this.ctx.stroke();
        }
        
        // Highlight selected/hovered tiles
        if (this.selectedTile && this.selectedTile.q === q && this.selectedTile.r === r) {
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
            this.ctx.fill();
        }
        
        if (this.hoveredTile && this.hoveredTile.q === q && this.hoveredTile.r === r) {
            this.ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
            this.ctx.fill();
        }
    }
    
    drawTiles() {
        if (!this.gameState.tiles) return;
        
        this.gameState.tiles.forEach(tile => {
            // Tuiles avec états ψ (superposition quantique)
            if (tile.hasPsiState) {
                this.drawHex(tile.x, tile.y, 'rgba(255, 0, 255, 0.2)', 'rgba(255, 0, 255, 0.5)');
            }
            
            // Tuiles avec conflits temporels
            if (tile.hasConflict) {
                this.drawHex(tile.x, tile.y, 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.5)');
            }
            
            // Tuiles parallèles (timelines multiples)
            if (tile.parallelTimelines && tile.parallelTimelines.length > 1) {
                const transparency = 0.1 + (tile.parallelTimelines.length * 0.05);
                this.drawHex(tile.x, tile.y, `rgba(0, 212, 255, ${transparency})`, 'rgba(0, 212, 255, 0.6)');
                
                // Dessiner les connexions entre timelines
                tile.parallelTimelines.forEach((timeline, index) => {
                    if (timeline.parentTimeline) {
                        const { x, y } = this.hexToPixel(tile.x, tile.y);
                        this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 - index * 0.1})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.setLineDash([3, 3]);
                        this.ctx.beginPath();
                        this.ctx.moveTo(x - 10, y - 10 + index * 5);
                        this.ctx.lineTo(x + 10, y + 10 - index * 5);
                        this.ctx.stroke();
                        this.ctx.setLineDash([]);
                    }
                });
            }
            
            // Tuiles avec ancres temporelles
            if (tile.temporalAnchor) {
                this.drawHex(tile.x, tile.y, 'rgba(255, 215, 0, 0.15)', 'rgba(255, 215, 0, 0.7)');
                
                // Effet de rotation pour les ancres
                const { x, y } = this.hexToPixel(tile.x, tile.y);
                this.ctx.save();
                this.ctx.translate(x, y);
                this.ctx.rotate(this.animationFrame * 0.01);
                
                for (let i = 0; i < 8; i++) {
                    const angle = (Math.PI / 4) * i;
                    const lineX = Math.cos(angle) * 15;
                    const lineY = Math.sin(angle) * 15;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo(lineX, lineY);
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.4 - i * 0.05})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
                
                this.ctx.restore();
            }
            
            // Tuiles avec zones d'interférence quantique
            if (tile.quantumInterference) {
                const intensity = tile.quantumInterference.intensity || 0.5;
                this.drawHex(tile.x, tile.y, `rgba(255, 0, 255, ${intensity * 0.3})`, `rgba(255, 0, 255, ${intensity * 0.8})`);
                
                // Effet de pulsation pour l'interférence
                const { x, y } = this.hexToPixel(tile.x, tile.y);
                const pulseSize = 20 + Math.sin(this.animationFrame * 0.08) * 8;
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(255, 0, 255, ${intensity * 0.4})`;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
        });
    }
    
    drawPsiStates() {
        if (!this.gameState.psiStates) return;
        
        this.gameState.psiStates.forEach(psi => {
            if (psi.status === 'ACTIVE') {
                const { x, y } = this.hexToPixel(psi.targetX || 0, psi.targetY || 0);
                
                // Animated glow effect
                const glowSize = 20 + Math.sin(this.animationFrame * 0.05) * 10;
                const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, glowSize);
                gradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
                gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.4)');
                gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);
                
                // Draw psi symbol
                this.ctx.fillStyle = '#FF00FF';
                this.ctx.font = 'bold 24px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('ψ', x, y);
                
                // Draw psi ID
                this.ctx.font = '12px Arial';
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillText(psi.id, x, y + 20);
            }
        });
    }
    
    drawHeroes() {
        if (!this.gameState.heroes) return;
        
        this.gameState.heroes.forEach(hero => {
            // Smooth movement animation
            if (!hero.displayPos) {
                hero.displayPos = { x: hero.position.x, y: hero.position.y };
            }
            
            // Lerp towards target position
            const lerpSpeed = 0.15;
            hero.displayPos.x += (hero.position.x - hero.displayPos.x) * lerpSpeed;
            hero.displayPos.y += (hero.position.y - hero.displayPos.y) * lerpSpeed;
            
            const { x, y } = this.hexToPixel(hero.displayPos.x, hero.displayPos.y);
            
            // Hero glow based on health
            const healthRatio = hero.health / (hero.maxHealth || 100);
            const glowColor = `rgba(${255 * (1 - healthRatio)}, ${255 * healthRatio}, 0, 0.5)`;
            
            // Animated pulse effect
            const pulseSize = 15 + Math.sin(this.animationFrame * 0.1 + hero.id) * 3;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
            this.ctx.fillStyle = glowColor;
            this.ctx.fill();
            
            // DICEBEAR AVATAR INTEGRATION
            // Try to get hero from dicebarSystem or create cached image
            if (!hero.avatarImage && window.dicebarSystem) {
                const heroData = window.dicebarSystem.getHeroData(hero.name);
                const avatarUrl = window.dicebarSystem.generateAvatar('hero', hero.name);
                
                // Create and cache the avatar image
                hero.avatarImage = new Image();
                hero.avatarImage.onload = () => {
                    hero.avatarLoaded = true;
                };
                hero.avatarImage.src = avatarUrl;
                
                // Store hero icon as fallback
                hero.icon = heroData.icon;
                hero.color = heroData.color;
            }
            
            // Hero icon with bounce animation
            const bounceY = y + Math.sin(this.animationFrame * 0.05 + hero.id * 2) * 2;
            
            // Background circle for better visibility
            this.ctx.beginPath();
            this.ctx.arc(x, bounceY, 35, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fill();
            this.ctx.strokeStyle = hero.color || '#FFD700';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw Dicebear avatar if loaded, otherwise use icon
            if (hero.avatarLoaded && hero.avatarImage) {
                // Draw circular clipped avatar
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(x, bounceY, 32, 0, Math.PI * 2);
                this.ctx.clip();
                
                // Draw the dicebear avatar
                this.ctx.drawImage(
                    hero.avatarImage,
                    x - 32,
                    bounceY - 32,
                    64,
                    64
                );
                
                this.ctx.restore();
            } else {
                // Fallback to icon if avatar not loaded
                const icon = hero.icon || '🦸';
                
                this.ctx.font = 'bold 32px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillStyle = '#FFD700';
                this.ctx.fillText(icon, x, bounceY);
            }
            
            // Hero name with shadow - PLUS GRAND ET PLUS VISIBLE
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillText(hero.name, x + 2, y - 45);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillText(hero.name, x, y - 47);
            
            // Health bar - PLUS GRANDE
            const barWidth = 50;
            const barHeight = 8;
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(x - barWidth / 2, y + 30, barWidth, barHeight);
            
            this.ctx.fillStyle = `rgb(${255 * (1 - healthRatio)}, ${255 * healthRatio}, 0)`;
            this.ctx.fillRect(x - barWidth / 2, y + 30, barWidth * healthRatio, barHeight);
            
            // Health text
            this.ctx.font = 'bold 12px Arial';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillText(`${Math.round(hero.health)}/${hero.maxHealth || 100}`, x, y + 50);
            
            // Timeline indicator
            if (hero.timeline) {
                this.ctx.font = '10px Arial';
                this.ctx.fillStyle = '#00D4FF';
                this.ctx.fillText(hero.timeline, x + 30, y - 20);
            }
            
            // Movement trail effect
            if (Math.abs(hero.position.x - hero.displayPos.x) > 0.1 || 
                Math.abs(hero.position.y - hero.displayPos.y) > 0.1) {
                const trailX = x - (hero.position.x - hero.displayPos.x) * 20;
                const trailY = y - (hero.position.y - hero.displayPos.y) * 20;
                
                const gradient = this.ctx.createLinearGradient(trailX, trailY, x, y);
                gradient.addColorStop(0, 'rgba(255, 215, 0, 0)');
                gradient.addColorStop(1, 'rgba(255, 215, 0, 0.3)');
                
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.moveTo(trailX, trailY);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
            }
        });
    }
    
    drawArtifacts() {
        if (!this.gameState.artifacts) return;
        
        // Draw artifacts on the map or in hero inventories
        this.gameState.artifacts.forEach(artifact => {
            if (artifact.position) {
                const { x, y } = this.hexToPixel(artifact.position.x, artifact.position.y);
                
                // Artifact glow effect
                const glowSize = 15 + Math.sin(this.animationFrame * 0.1) * 5;
                const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, glowSize);
                
                // Color based on rarity
                const colors = {
                    'Common': 'rgba(128, 128, 128, 0.6)',
                    'Rare': 'rgba(0, 112, 255, 0.6)',
                    'Legendary': 'rgba(255, 128, 0, 0.6)',
                    'Paradox': 'rgba(255, 0, 255, 0.6)',
                    'Singularity': 'rgba(255, 255, 0, 0.6)'
                };
                
                gradient.addColorStop(0, colors[artifact.rarity] || 'rgba(255, 255, 255, 0.6)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);
                
                // Artifact icon
                const icons = {
                    'AvantWorldBlade': '⚔️',
                    'ReverseClock': '🕰️',
                    'IgnoreBeacon': '🚫',
                    'AnchorTower': '🏰',
                    'ApocalypseHorn': '📯'
                };
                
                this.ctx.font = '20px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(icons[artifact.type] || '🏺', x, y);
                
                // Artifact name
                this.ctx.font = '10px Arial';
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillText(artifact.name, x, y + 20);
            }
        });
    }
    
    drawTemporalEffects() {
        // Draw timeline connections with improved transparency
        if (this.gameState.timelines && this.gameState.timelines.length > 1) {
            this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            
            // Draw connections between timeline branches
            this.gameState.timelines.forEach((timeline, index) => {
                if (timeline.parentTimeline) {
                    // Draw connection to parent with transparency based on distance
                    const y = -100 + index * 30;
                    const transparency = 0.3 - (index * 0.05);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${transparency})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(-50, y);
                    this.ctx.lineTo(50, y);
                    this.ctx.stroke();
                }
            });
            
            this.ctx.setLineDash([]);
        }
        
        // Draw parallel timeline effects
        if (this.gameState.parallelTimelines) {
            this.gameState.parallelTimelines.forEach((parallel, index) => {
                // Effet de transparence pour les timelines parallèles
                const transparency = 0.1 + (index * 0.02);
                this.ctx.fillStyle = `rgba(0, 212, 255, ${transparency})`;
                
                // Dessiner une zone d'effet pour chaque timeline parallèle
                parallel.tiles.forEach(tile => {
                    const { x, y } = this.hexToPixel(tile.x, tile.y);
                    const radius = 25 + Math.sin(this.animationFrame * 0.05 + index) * 5;
                    
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
                    this.ctx.fill();
                });
            });
        }
        
        // Draw quantum interference zones
        if (this.gameState.quantumInterferenceZones) {
            this.gameState.quantumInterferenceZones.forEach(zone => {
                const { x, y } = this.hexToPixel(zone.x, zone.y);
                const intensity = zone.intensity || 0.5;
                
                // Effet de pulsation pour les zones d'interférence
                const pulseSize = 30 + Math.sin(this.animationFrame * 0.06) * 10;
                const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, pulseSize);
                gradient.addColorStop(0, `rgba(255, 0, 255, ${intensity * 0.6})`);
                gradient.addColorStop(0.5, `rgba(255, 0, 255, ${intensity * 0.3})`);
                gradient.addColorStop(1, `rgba(255, 0, 255, 0)`);
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x - pulseSize, y - pulseSize, pulseSize * 2, pulseSize * 2);
            });
        }
        
        // Draw parallel tiles with special transparency
        this.drawParallelTiles();
        
        // Draw temporal anchors
        if (this.gameState.temporalAnchors) {
            this.gameState.temporalAnchors.forEach(anchor => {
                const { x, y } = this.hexToPixel(anchor.x, anchor.y);
                
                // Anchor field effect
                this.ctx.beginPath();
                this.ctx.arc(x, y, anchor.radius * this.hexSize, 0, Math.PI * 2);
                this.ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                
                // Rotating effect
                this.ctx.save();
                this.ctx.translate(x, y);
                this.ctx.rotate(this.animationFrame * 0.02);
                
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const lineX = Math.cos(angle) * anchor.radius * this.hexSize;
                    const lineY = Math.sin(angle) * anchor.radius * this.hexSize;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo(lineX, lineY);
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.3 - i * 0.05})`;
                    this.ctx.stroke();
                }
                
                this.ctx.restore();
            });
        }
    }
    
    addParticle(x, y, type = 'default') {
        const particle = {
            x,
            y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            type,
            size: Math.random() * 3 + 1
        };
        
        this.particles.push(particle);
    }
    
    drawParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            particle.vy += 0.1; // Gravity
            
            if (particle.life <= 0) return false;
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            
            const colors = {
                'click': '#FFD700',
                'psi': '#FF00FF',
                'collapse': '#00D4FF',
                'default': '#FFFFFF'
            };
            
            this.ctx.fillStyle = colors[particle.type] || colors.default;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
            
            return true;
        });
    }
    
    drawUIOverlay() {
        // Draw zoom level
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Zoom: ${(this.zoom * 100).toFixed(0)}%`, 10, this.canvas.height - 10);
        
        // Draw coordinates if hovering
        if (this.hoveredTile) {
            this.ctx.fillText(`Hex: @${this.hoveredTile.q},${this.hoveredTile.r}`, 10, this.canvas.height - 30);
        }
        
        // Draw turn counter
        if (this.gameState && this.gameState.currentTurn !== undefined) {
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`Turn: ${this.gameState.currentTurn}`, this.canvas.width - 10, 20);
        }
    }
    
    startAnimationLoop() {
        const animate = () => {
            this.animationFrame++;
            
            // Update psi animations
            if (this.gameState && this.gameState.psiStates) {
                this.gameState.psiStates.forEach(psi => {
                    if (psi.status === 'ACTIVE' && !this.psiAnimations.has(psi.id)) {
                        this.psiAnimations.set(psi.id, {
                            startFrame: this.animationFrame,
                            intensity: Math.random() * 0.5 + 0.5
                        });
                    }
                });
            }
            
            // Refresh every few frames for animations
            if (this.animationFrame % 3 === 0) {
                this.refresh();
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    drawParallelTiles() {
        // Méthode spéciale pour les tuiles parallèles avec transparence
        if (!this.gameState.tiles) return;
        
        this.gameState.tiles.forEach(tile => {
            if (tile.parallelTimelines && tile.parallelTimelines.length > 1) {
                const { x, y } = this.hexToPixel(tile.x, tile.y);
                
                // Transparence basée sur le nombre de timelines parallèles
                const baseTransparency = 0.05;
                const timelineTransparency = tile.parallelTimelines.length * 0.03;
                const totalTransparency = Math.min(baseTransparency + timelineTransparency, 0.4);
                
                // Dessiner l'hexagone avec transparence
                this.drawHex(tile.x, tile.y, `rgba(0, 212, 255, ${totalTransparency})`, 'rgba(0, 212, 255, 0.6)');
                
                // Effet de connexion entre timelines
                tile.parallelTimelines.forEach((timeline, index) => {
                    const connectionTransparency = 0.2 - (index * 0.05);
                    if (connectionTransparency > 0) {
                        this.ctx.strokeStyle = `rgba(0, 212, 255, ${connectionTransparency})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.setLineDash([2, 2]);
                        
                        // Dessiner des lignes de connexion
                        const angle = (Math.PI / 3) * index;
                        const endX = x + Math.cos(angle) * 20;
                        const endY = y + Math.sin(angle) * 20;
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(x, y);
                        this.ctx.lineTo(endX, endY);
                        this.ctx.stroke();
                    }
                });
                
                this.ctx.setLineDash([]);
                
                // Texte indiquant le nombre de timelines
                this.ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
                this.ctx.font = 'bold 10px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(`${tile.parallelTimelines.length}`, x, y);
            }
        });
    }
    
    // Public methods for external control
    resetView() {
        this.zoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.refresh();
    }
    
    centerOnHero(heroName) {
        if (!this.gameState || !this.gameState.heroes) return;
        
        const hero = this.gameState.heroes.find(h => h.name === heroName);
        if (hero) {
            const { x, y } = this.hexToPixel(hero.position.x, hero.position.y);
            this.offsetX = -x;
            this.offsetY = -y;
            this.refresh();
        }
    }
    
    drawFogOfWar() {
        // Initialiser le système de brouillard s'il n'existe pas
        if (!window.fogOfWarSystem) {
            window.fogOfWarSystem = new FogOfWarSystem();
        }
        
        // Rendre le brouillard avec les 7 types et transparence des timelines ψ
        window.fogOfWarSystem.renderFog(this.ctx, this.gameState);
    }
}

// Nouvelle grammaire HOTS pour le 4ème mur
const FOURTH_WALL_COMMANDS = {
    CROSS_INSTANCE: function(sourceWorld, targetWorld, action) {
        console.log(`🌐 CROSS_INSTANCE: ${sourceWorld} -> ${targetWorld}: ${action}`);
        return fetch('/api/fourth-wall/cross-instance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sourceWorld: sourceWorld,
                targetWorld: targetWorld,
                action: action,
                params: { timestamp: Date.now() }
            })
        }).then(r => r.json());
    },
    
    BREAK_FOURTH_WALL: function(message, speaker = 'The Game') {
        console.log(`🧱 BREAK_FOURTH_WALL: ${speaker} says: ${message}`);
        // Afficher le message directement au joueur
        const notification = document.createElement('div');
        notification.className = 'fourth-wall-break';
        notification.innerHTML = `
            <div class="meta-message">
                <strong>${speaker}:</strong> ${message}
                <button onclick="this.parentNode.parentNode.remove()">×</button>
            </div>
        `;
        document.body.appendChild(notification);
        
        return fetch('/api/fourth-wall/break', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gameId: window.currentGameId || 'demo',
                message: message,
                speaker: speaker
            })
        }).then(r => r.json());
    },
    
    META_OBSERVE: function(gameState) {
        console.log(`👁️ META_OBSERVE: Looking at ${gameState}`);
        return fetch('/api/fourth-wall/meta-observe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gameId: window.currentGameId || 'demo',
                observationType: gameState
            })
        }).then(r => r.json());
    },
    
    NARRATIVE_JUMP: function(storyBranch) {
        console.log(`🎭 NARRATIVE_JUMP: Jumping to ${storyBranch}`);
        return fetch('/api/fourth-wall/narrative-jump', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gameId: window.currentGameId || 'demo',
                targetBranch: storyBranch
            })
        }).then(r => r.json());
    }
};

// Objets spéciaux du 4ème mur
const FOURTH_WALL_ARTIFACTS = {
    vince_pistol: {
        name: "Le .45 de Vince Vega",
        use: function() {
            return FOURTH_WALL_COMMANDS.CROSS_INSTANCE('current', 'world_beta', 'SHOOT')
                .then(result => {
                    if (result.success) {
                        FOURTH_WALL_COMMANDS.BREAK_FOURTH_WALL(result.vince_comment, 'Vince Vega');
                    }
                    return result;
                });
        }
    },
    
    archive_vivante: {
        name: "L'Archive Vivante du Quatrième Mur",
        use: function() {
            return fetch('/api/fourth-wall/archive-vivante-read')
                .then(r => r.json())
                .then(result => {
                    FOURTH_WALL_COMMANDS.BREAK_FOURTH_WALL(result.page_content, 'L\'Archive Vivante');
                    return result;
                });
        }
    },
    
    jean_megot: {
        name: "Mégot de Session",
        use: function() {
            return fetch('/api/fourth-wall/jean-cosmic-pause', { method: 'POST' })
                .then(r => r.json())
                .then(result => {
                    FOURTH_WALL_COMMANDS.BREAK_FOURTH_WALL(result.jean_quote, 'Jean-Grofignon');
                    return result;
                });
        }
    }
};

// Initialiser les instances mock au démarrage
function initializeFourthWallSystem() {
    console.log('🧱 Initializing Fourth Wall System...');
    
    fetch('/api/fourth-wall/init-mock-instances', { method: 'POST' })
        .then(r => r.json())
        .then(result => {
            console.log('✅ Fourth Wall System initialized:', result);
            
            // Ajouter les objets au jeu
            window.fourthWallArtifacts = FOURTH_WALL_ARTIFACTS;
            window.fourthWallCommands = FOURTH_WALL_COMMANDS;
            
            // Petite demo
            setTimeout(() => {
                FOURTH_WALL_COMMANDS.BREAK_FOURTH_WALL(
                    'Système du 4ème mur initialisé ! Vince peut maintenant tirer entre les serveurs.',
                    'Game System'
                );
            }, 2000);
        })
        .catch(err => console.error('❌ Fourth Wall initialization failed:', err));
}

// CSS pour les messages du 4ème mur
const fourthWallCSS = `
    .fourth-wall-break {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 0, 0, 0.9);
        color: white;
        padding: 15px;
        border-radius: 10px;
        border: 2px solid #ff6666;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        z-index: 10000;
        max-width: 300px;
        animation: fourthWallGlitch 0.5s ease-in-out;
    }
    
    .meta-message {
        font-family: 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .meta-message button {
        float: right;
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
    }
    
    @keyframes fourthWallGlitch {
        0% { transform: translate(0); filter: hue-rotate(0deg); }
        25% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
        50% { transform: translate(2px, -2px); filter: hue-rotate(180deg); }
        75% { transform: translate(-2px, -2px); filter: hue-rotate(270deg); }
        100% { transform: translate(0); filter: hue-rotate(360deg); }
    }
`;

// Ajouter le CSS
const style = document.createElement('style');
style.textContent = fourthWallCSS;
document.head.appendChild(style);