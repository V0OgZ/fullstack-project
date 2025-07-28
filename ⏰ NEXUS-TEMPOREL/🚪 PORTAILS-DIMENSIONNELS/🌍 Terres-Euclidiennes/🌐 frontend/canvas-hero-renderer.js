// 👤 CANVAS HERO RENDERER - JEAN EDITION
// ======================================
// Renderer spécialisé pour corriger l'affichage des héros

class CanvasHeroRenderer {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.heroes = [];
        this.isRendering = false;
        this.animationFrame = null;
        
        console.log('👤 Canvas Hero Renderer initialisé');
    }
    
    // 🎯 INITIALISER AVEC CANVAS
    initialize(canvasId = 'gameCanvas') {
        this.canvas = document.getElementById(canvasId) || document.querySelector('canvas');
        
        if (!this.canvas) {
            console.warn('Canvas non trouvé, création d\'urgence...');
            this.createEmergencyCanvas();
        }
        
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.setupCanvas();
            console.log('✅ Canvas Hero Renderer initialisé avec succès');
            return true;
        }
        
        return false;
    }
    
    // 🗺️ CRÉER CANVAS D'URGENCE
    createEmergencyCanvas() {
        const container = document.querySelector('#game-canvas-container') || 
                         document.querySelector('.matrix-game-map') ||
                         document.body;
        
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'gameCanvas';
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.style.cssText = `
            border: 2px solid #4a90e2;
            border-radius: 8px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            display: block;
            margin: 0 auto;
        `;
        
        container.appendChild(this.canvas);
        console.log('🗺️ Canvas d\'urgence créé');
    }
    
    // 🔧 CONFIGURER CANVAS
    setupCanvas() {
        if (!this.canvas || !this.ctx) return;
        
        // Assurer dimensions correctes
        if (this.canvas.width === 0 || this.canvas.height === 0) {
            this.canvas.width = 800;
            this.canvas.height = 600;
        }
        
        // Style du canvas
        this.canvas.style.imageRendering = 'pixelated';
        this.canvas.style.cursor = 'crosshair';
        
        // Event listeners
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        
        console.log(`🔧 Canvas configuré: ${this.canvas.width}x${this.canvas.height}`);
    }
    
    // 👤 AJOUTER HÉROS
    addHero(hero) {
        // S'assurer que le héros a toutes les propriétés nécessaires
        const completeHero = {
            id: hero.id || 'hero-' + Date.now(),
            name: hero.name || 'Héros',
            position: hero.position || { x: 0, y: 0 },
            health: hero.health || 100,
            maxHealth: hero.maxHealth || 100,
            color: hero.color || '#FFD700',
            icon: hero.icon || '👤',
            visible: hero.visible !== false,
            displayPos: hero.displayPos || { x: hero.position?.x || 0, y: hero.position?.y || 0 }
        };
        
        // Vérifier si héros existe déjà
        const existingIndex = this.heroes.findIndex(h => h.id === completeHero.id);
        if (existingIndex >= 0) {
            this.heroes[existingIndex] = completeHero;
        } else {
            this.heroes.push(completeHero);
        }
        
        console.log(`👤 Héros ajouté: ${completeHero.name} à (${completeHero.position.x}, ${completeHero.position.y})`);
        this.render();
    }
    
    // 🎯 CRÉER ARTHUR PAR DÉFAUT
    createDefaultArthur() {
        const arthur = {
            id: 'arthur',
            name: 'Arthur',
            position: { x: 0, y: 0 },
            health: 100,
            maxHealth: 100,
            color: '#FFD700',
            icon: '👑',
            visible: true,
            displayPos: { x: 0, y: 0 }
        };
        
        this.addHero(arthur);
        console.log('👑 Arthur créé par défaut');
    }
    
    // 🎨 RENDU PRINCIPAL
    render() {
        if (!this.canvas || !this.ctx || this.isRendering) return;
        
        this.isRendering = true;
        
        try {
            // Nettoyer canvas
            this.clearCanvas();
            
            // Dessiner fond
            this.drawBackground();
            
            // Dessiner grille hexagonale
            this.drawHexGrid();
            
            // Dessiner héros
            this.drawHeroes();
            
            // Dessiner UI overlay
            this.drawUIOverlay();
            
        } catch (error) {
            console.error('Erreur lors du rendu:', error);
        } finally {
            this.isRendering = false;
        }
    }
    
    // 🧹 NETTOYER CANVAS
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // 🌌 DESSINER FOND
    drawBackground() {
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, 
            Math.max(this.canvas.width, this.canvas.height) / 2
        );
        
        gradient.addColorStop(0, 'rgba(74, 144, 226, 0.1)');
        gradient.addColorStop(0.5, 'rgba(26, 26, 46, 0.8)');
        gradient.addColorStop(1, 'rgba(16, 33, 62, 1)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // 🔷 DESSINER GRILLE HEXAGONALE
    drawHexGrid() {
        const hexSize = 25;
        const hexWidth = hexSize * 2;
        const hexHeight = Math.sqrt(3) * hexSize;
        
        this.ctx.strokeStyle = 'rgba(74, 144, 226, 0.2)';
        this.ctx.lineWidth = 1;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Dessiner grille centrée
        for (let q = -5; q <= 5; q++) {
            for (let r = -5; r <= 5; r++) {
                const x = centerX + hexSize * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
                const y = centerY + hexSize * (3 / 2 * r);
                
                this.drawHexagon(x, y, hexSize);
            }
        }
    }
    
    // 🔷 DESSINER HEXAGONE
    drawHexagon(x, y, size) {
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + Math.PI / 6;
            const hx = x + size * Math.cos(angle);
            const hy = y + size * Math.sin(angle);
            
            if (i === 0) {
                this.ctx.moveTo(hx, hy);
            } else {
                this.ctx.lineTo(hx, hy);
            }
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }
    
    // 👤 DESSINER HÉROS
    drawHeroes() {
        if (!this.heroes || this.heroes.length === 0) {
            // Créer Arthur par défaut si aucun héros
            this.createDefaultArthur();
        }
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const hexSize = 25;
        
        this.heroes.forEach((hero, index) => {
            if (!hero.visible) return;
            
            // Position du héros (centrée + offset basé sur position logique)
            const x = centerX + (hero.displayPos.x * hexSize * 1.5);
            const y = centerY + (hero.displayPos.y * hexSize * 1.3);
            
            // Cercle de fond
            this.ctx.beginPath();
            this.ctx.arc(x, y, 30, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fill();
            
            // Bordure héros
            this.ctx.strokeStyle = hero.color;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Icône héros
            this.ctx.font = '24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = hero.color;
            this.ctx.fillText(hero.icon, x, y);
            
            // Nom héros
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeText(hero.name, x, y - 45);
            this.ctx.fillText(hero.name, x, y - 45);
            
            // Barre de vie
            const barWidth = 60;
            const barHeight = 6;
            const healthRatio = hero.health / hero.maxHealth;
            
            // Fond barre
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(x - barWidth / 2, y + 35, barWidth, barHeight);
            
            // Barre de vie colorée
            this.ctx.fillStyle = `rgb(${255 * (1 - healthRatio)}, ${255 * healthRatio}, 0)`;
            this.ctx.fillRect(x - barWidth / 2, y + 35, barWidth * healthRatio, barHeight);
            
            // Texte vie
            this.ctx.font = '10px Arial';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillText(`${hero.health}/${hero.maxHealth}`, x, y + 50);
            
            // Effet de sélection si c'est Arthur
            if (hero.name === 'Arthur') {
                this.ctx.beginPath();
                this.ctx.arc(x, y, 35, 0, Math.PI * 2);
                this.ctx.strokeStyle = '#FFD700';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([5, 5]);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }
        });
    }
    
    // 🎮 DESSINER UI OVERLAY
    drawUIOverlay() {
        // Titre du jeu
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#4a90e2';
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeText('Heroes of Time', this.canvas.width / 2, 30);
        this.ctx.fillText('Heroes of Time', this.canvas.width / 2, 30);
        
        // Informations de debug
        if (window.uiEmergencyFix && window.uiEmergencyFix.debugMode) {
            this.ctx.font = '12px monospace';
            this.ctx.textAlign = 'left';
            this.ctx.fillStyle = '#00FF00';
            this.ctx.fillText(`Héros: ${this.heroes.length}`, 10, this.canvas.height - 30);
            this.ctx.fillText(`Canvas: ${this.canvas.width}x${this.canvas.height}`, 10, this.canvas.height - 15);
        }
    }
    
    // 🖱️ GÉRER CLIC CANVAS
    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        console.log(`🖱️ Clic canvas à (${x}, ${y})`);
        
        // Vérifier si clic sur un héros
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const hexSize = 25;
        
        this.heroes.forEach(hero => {
            const heroX = centerX + (hero.displayPos.x * hexSize * 1.5);
            const heroY = centerY + (hero.displayPos.y * hexSize * 1.3);
            
            const distance = Math.sqrt((x - heroX) ** 2 + (y - heroY) ** 2);
            
            if (distance <= 30) {
                console.log(`👤 Héros cliqué: ${hero.name}`);
                this.selectHero(hero);
            }
        });
    }
    
    // 🎯 SÉLECTIONNER HÉROS
    selectHero(hero) {
        console.log(`🎯 Héros sélectionné: ${hero.name}`);
        
        // Déclencher événement personnalisé
        window.dispatchEvent(new CustomEvent('hero-selected', {
            detail: { hero: hero }
        }));
    }
    
    // 🔄 ANIMATION LOOP
    startAnimation() {
        if (this.animationFrame) return;
        
        const animate = () => {
            this.render();
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
        console.log('🔄 Animation démarrée');
    }
    
    // ⏹️ ARRÊTER ANIMATION
    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
            console.log('⏹️ Animation arrêtée');
        }
    }
    
    // 📊 STATISTIQUES
    getStats() {
        return {
            canvas: {
                width: this.canvas?.width || 0,
                height: this.canvas?.height || 0,
                exists: !!this.canvas
            },
            heroes: {
                count: this.heroes.length,
                visible: this.heroes.filter(h => h.visible).length,
                list: this.heroes.map(h => ({ name: h.name, position: h.position }))
            },
            rendering: {
                active: this.isRendering,
                animated: !!this.animationFrame
            }
        };
    }
    
    // 🧹 NETTOYAGE
    cleanup() {
        this.stopAnimation();
        
        if (this.canvas) {
            this.canvas.removeEventListener('click', this.handleCanvasClick);
        }
        
        this.heroes = [];
        this.canvas = null;
        this.ctx = null;
        
        console.log('🧹 Canvas Hero Renderer nettoyé');
    }
}

// 🌍 EXPORT GLOBAL
window.CanvasHeroRenderer = CanvasHeroRenderer;

// 👤 AUTO-INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window !== 'undefined') {
        window.canvasHeroRenderer = new CanvasHeroRenderer();
        
        // Attendre un peu puis initialiser
        setTimeout(() => {
            const success = window.canvasHeroRenderer.initialize();
            if (success) {
                // Créer Arthur et démarrer le rendu
                window.canvasHeroRenderer.createDefaultArthur();
                window.canvasHeroRenderer.render();
                
                console.log('👤 Canvas Hero Renderer prêt !');
                console.log('💡 Commandes disponibles:');
                console.log('   window.canvasHeroRenderer.render()');
                console.log('   window.canvasHeroRenderer.getStats()');
                console.log('   window.canvasHeroRenderer.startAnimation()');
            }
        }, 1000);
    }
}); 