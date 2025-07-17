// game.js - Rendu du jeu avec canvas hexagonal
class GameRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameState = null;
        this.hexSize = 25;
        this.offsetX = 0;
        this.offsetY = 0;
        this.setupCanvas();
    }
    
    setupCanvas() {
        this.resizeCanvas();
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.offsetX = rect.width / 2;
        this.offsetY = rect.height / 2;
        this.render();
    }
    
    async refresh() {
        try {
            this.gameState = await window.gameAPI.getGameState();
            this.render();
            this.updateStatusBar();
        } catch (error) {
            console.error('Failed to refresh game state:', error);
            // Show a placeholder message
            this.renderPlaceholder();
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.gameState) {
            this.renderPlaceholder();
            return;
        }
        
        // Render grid background
        this.renderGrid();
        
        // Render tiles
        if (this.gameState.tiles) {
            this.gameState.tiles.forEach(tile => {
                this.renderTile(tile);
            });
        }
        
        // Render ψ-states
        if (this.gameState.psiStates) {
            this.gameState.psiStates.forEach(psiState => {
                this.renderPsiState(psiState);
            });
        }
        
        // Render heroes
        if (this.gameState.heroes) {
            this.gameState.heroes.forEach(hero => {
                this.renderHero(hero);
            });
        }
        
        // Render UI elements
        this.renderUI();
    }
    
    renderPlaceholder() {
        this.ctx.fillStyle = '#666';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Click "New Game" to start', this.canvas.width / 2, this.canvas.height / 2);
        
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Heroes of Time - Temporal Engine', this.canvas.width / 2, this.canvas.height / 2 + 40);
    }
    
    renderGrid() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        
        // Render hexagonal grid
        for (let q = -10; q <= 10; q++) {
            for (let r = -10; r <= 10; r++) {
                const pos = this.hexToPixel(q, r);
                this.drawHexagon(pos.x, pos.y, this.hexSize, '#2a2a3e', '#333');
            }
        }
    }
    
    renderTile(tile) {
        const pos = this.hexToPixel(tile.x, tile.y);
        const color = this.getTileColor(tile.type);
        this.drawHexagon(pos.x, pos.y, this.hexSize, color, '#333');
        
        // Add tile type indicator
        if (tile.type !== 'GRASS') {
            this.ctx.fillStyle = '#FFF';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(tile.type.charAt(0), pos.x, pos.y + 3);
        }
    }
    
    renderPsiState(psiState) {
        const pos = this.hexToPixel(psiState.targetX, psiState.targetY);
        
        // Animated glow effect
        const time = Date.now() * 0.003;
        const opacity = 0.5 + 0.3 * Math.sin(time);
        
        // Outer glow
        const gradient = this.ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, this.hexSize * 1.5
        );
        gradient.addColorStop(0, `rgba(147, 112, 219, ${opacity})`);
        gradient.addColorStop(1, 'rgba(147, 112, 219, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, this.hexSize * 1.5, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Inner core
        this.ctx.fillStyle = '#9370DB';
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, this.hexSize * 0.3, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // ψ symbol
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`ψ${psiState.id}`, pos.x, pos.y - this.hexSize - 5);
        
        // Status indicator
        if (psiState.status) {
            this.ctx.fillStyle = psiState.status === 'ACTIVE' ? '#00FF00' : '#FF0000';
            this.ctx.font = '10px Arial';
            this.ctx.fillText(psiState.status, pos.x, pos.y + this.hexSize + 15);
        }
    }
    
    renderHero(hero) {
        const pos = this.hexToPixel(hero.x, hero.y);
        
        // Hero body
        this.ctx.fillStyle = this.getHeroColor(hero.name);
        this.ctx.fillRect(pos.x - 12, pos.y - 12, 24, 24);
        
        // Hero border
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(pos.x - 12, pos.y - 12, 24, 24);
        
        // Hero name
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(hero.name, pos.x, pos.y - 20);
        
        // Health bar
        if (hero.hp !== undefined) {
            const hpPercent = hero.hp / 100;
            this.ctx.fillStyle = '#FF0000';
            this.ctx.fillRect(pos.x - 12, pos.y + 15, 24, 3);
            this.ctx.fillStyle = '#00FF00';
            this.ctx.fillRect(pos.x - 12, pos.y + 15, 24 * hpPercent, 3);
        }
        
        // Artifacts indicator
        if (hero.artifacts && hero.artifacts.length > 0) {
            this.ctx.fillStyle = '#FFD700';
            this.ctx.beginPath();
            this.ctx.arc(pos.x + 15, pos.y - 15, 5, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.fillStyle = '#000';
            this.ctx.font = '8px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(hero.artifacts.length, pos.x + 15, pos.y - 12);
        }
    }
    
    renderUI() {
        // Render turn indicator
        if (this.gameState && this.gameState.currentTurn) {
            this.ctx.fillStyle = '#FFD700';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`Turn: ${this.gameState.currentTurn}`, 10, 30);
        }
        
        // Render coordinates on hover (if implemented)
        // This would require mouse tracking
    }
    
    drawHexagon(x, y, size, fillColor, strokeColor) {
        this.ctx.beginPath();
        
        for (let i = 0; i < 6; i++) {
            const angle = 2 * Math.PI / 6 * i;
            const hexX = x + size * Math.cos(angle);
            const hexY = y + size * Math.sin(angle);
            
            if (i === 0) {
                this.ctx.moveTo(hexX, hexY);
            } else {
                this.ctx.lineTo(hexX, hexY);
            }
        }
        
        this.ctx.closePath();
        
        if (fillColor) {
            this.ctx.fillStyle = fillColor;
            this.ctx.fill();
        }
        
        if (strokeColor) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }
    
    hexToPixel(q, r) {
        const x = this.hexSize * (3/2 * q) + this.offsetX;
        const y = this.hexSize * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r) + this.offsetY;
        return { x, y };
    }
    
    pixelToHex(x, y) {
        const q = (2/3 * (x - this.offsetX)) / this.hexSize;
        const r = (-1/3 * (x - this.offsetX) + Math.sqrt(3)/3 * (y - this.offsetY)) / this.hexSize;
        return { q: Math.round(q), r: Math.round(r) };
    }
    
    getTileColor(type) {
        switch (type) {
            case 'GRASS': return '#90EE90';
            case 'STONE': return '#A0A0A0';
            case 'WATER': return '#4169E1';
            case 'MOUNTAIN': return '#8B4513';
            case 'FOREST': return '#228B22';
            default: return '#DDD';
        }
    }
    
    getHeroColor(name) {
        switch (name) {
            case 'Arthur': return '#4169E1';
            case 'Ragnar': return '#DC143C';
            case 'Merlin': return '#9370DB';
            default: return '#FFD700';
        }
    }
    
    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const hex = this.pixelToHex(x, y);
        console.log(`Clicked hex: ${hex.q}, ${hex.r}`);
        
        // Add click feedback to console
        if (window.scriptConsole) {
            window.scriptConsole.addToOutput(`Clicked tile @${hex.q},${hex.r}`, 'normal');
        }
    }
    
    updateStatusBar() {
        const statusBar = document.getElementById('status-bar');
        if (statusBar && this.gameState) {
            const heroCount = this.gameState.heroes ? this.gameState.heroes.length : 0;
            const psiCount = this.gameState.psiStates ? this.gameState.psiStates.filter(ps => ps.status === 'ACTIVE').length : 0;
            const turn = this.gameState.currentTurn || 1;
            
            let heroInfo = '';
            if (this.gameState.heroes) {
                heroInfo = this.gameState.heroes.map(h => `${h.name}(${h.x},${h.y})`).join(', ');
            }
            
            statusBar.textContent = `Turn: ${turn} | Heroes: ${heroInfo} | ψ-states: ${psiCount} active`;
        }
    }
    
    // Animation loop for smooth effects
    startAnimation() {
        const animate = () => {
            this.render();
            requestAnimationFrame(animate);
        };
        animate();
    }
}