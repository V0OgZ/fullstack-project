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
    
    refresh() {
        if (!this.ctx) return;
        
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
            if (tile.hasPsiState) {
                this.drawHex(tile.x, tile.y, 'rgba(255, 0, 255, 0.2)', 'rgba(255, 0, 255, 0.5)');
            }
            
            if (tile.hasConflict) {
                this.drawHex(tile.x, tile.y, 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.5)');
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
            
            // Hero icon with bounce animation
            const bounceY = y + Math.sin(this.animationFrame * 0.05 + hero.id * 2) * 2;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Different icons for different heroes
            const heroIcons = {
                'Arthur': '⚔️',
                'Morgana': '🧙‍♀️',
                'Ragnar': '🛡️',
                'Merlin': '🔮',
                'default': '🦸'
            };
            const icon = heroIcons[hero.name] || heroIcons.default;
            this.ctx.fillText(icon, x, bounceY);
            
            // Hero name with shadow
            this.ctx.font = 'bold 12px Arial';
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillText(hero.name, x + 1, y - 24);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillText(hero.name, x, y - 25);
            
            // Health bar
            const barWidth = 30;
            const barHeight = 4;
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(x - barWidth / 2, y + 15, barWidth, barHeight);
            
            this.ctx.fillStyle = `rgb(${255 * (1 - healthRatio)}, ${255 * healthRatio}, 0)`;
            this.ctx.fillRect(x - barWidth / 2, y + 15, barWidth * healthRatio, barHeight);
            
            // Timeline indicator
            if (hero.timeline) {
                this.ctx.font = '10px Arial';
                this.ctx.fillStyle = '#00D4FF';
                this.ctx.fillText(hero.timeline, x + 20, y - 10);
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
        // Draw timeline connections
        if (this.gameState.timelines && this.gameState.timelines.length > 1) {
            this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            
            // Draw connections between timeline branches
            this.gameState.timelines.forEach((timeline, index) => {
                if (timeline.parentTimeline) {
                    // Draw connection to parent
                    // This is a simplified visualization
                    const y = -100 + index * 30;
                    this.ctx.beginPath();
                    this.ctx.moveTo(-50, y);
                    this.ctx.lineTo(50, y);
                    this.ctx.stroke();
                }
            });
            
            this.ctx.setLineDash([]);
        }
        
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
}