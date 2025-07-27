// 🔮 SYSTÈME SYMBOLES RUNIQUES PORT 8000 - JEAN VERSION
// ======================================================
// Équivalent du triggerRunicEffect() de ModernGameRenderer.tsx
// Mais pour le frontend HTML/CSS/JS simple

class RunicSymbolsSystem {
    constructor() {
        // 13 Formules HOTS avec correspondances symboles
        this.runicFormulas = {
            // Formules de Base
            'CAST': { symbol: 'ψ', color: '#4169E1', description: 'Psi State - Sort lancé' },
            'MOV': { symbol: '⟶', color: '#FFD700', description: 'Flèche - Mouvement héros' },
            'CREATE': { symbol: '⊙', color: '#00FF00', description: 'Superposition - Création' },
            'ATTACK': { symbol: '†', color: '#DC143C', description: 'Croix - Collapse/Attaque' },
            'USE': { symbol: 'Π', color: '#8A2BE2', description: 'Pi - Observation/Usage' },
            
            // Formules Avancées  
            'QUANTUM': { symbol: 'Ω', color: '#00CED1', description: 'Omega - Fin quantique' },
            'TEMPORAL': { symbol: 'τ', color: '#FF69B4', description: 'Tau - Temporel' },
            'BATTLE': { symbol: 'ℬ', color: '#FF4500', description: 'Beta - Bataille' },
            'ZFC': { symbol: '↯', color: '#7FFF00', description: 'ZFC - Zero Frustration Control' },
            'TELEPORT': { symbol: '⇆', color: '#9370DB', description: 'Échange - Téléportation' },
            'LOOP': { symbol: '↺', color: '#20B2AA', description: 'Boucle temporelle' },
            'MULTIPLY': { symbol: '⨉', color: '#F0E68C', description: 'Multiplication quantique' },
            'HERO': { symbol: '♜', color: '#B8860B', description: 'Héros sélectionné' }
        };
        
        this.activeSymbols = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
    }
    
    // 🎯 INITIALISER LE SYSTÈME
    init(canvasId = 'game-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.warn('RunicSymbols: Canvas non trouvé:', canvasId);
            return false;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.startAnimation();
        
        // Écouter Shift+Clic pour démo
        this.canvas.addEventListener('click', (e) => {
            if (e.shiftKey) {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.triggerRandomSymbol(x, y);
            }
        });
        
        console.log('✨ RunicSymbols System initialisé (Port 8000)');
        return true;
    }
    
    // 🌟 DÉCLENCHER UN SYMBOLE (Équivalent triggerRunicEffect)
    triggerRunicEffect(x, y, spellType = 'CAST') {
        const formula = this.runicFormulas[spellType.toUpperCase()];
        if (!formula) {
            console.warn('Formule inconnue:', spellType);
            return;
        }
        
        const symbol = {
            id: Date.now() + Math.random(),
            x: x,
            y: y,
            symbol: formula.symbol,
            color: formula.color,
            description: formula.description,
            opacity: 0,
            scale: 0.5,
            rotation: 0,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -1.5,
            life: 3000, // 3 secondes
            birth: Date.now(),
            phase: 'fade-in' // fade-in, float, fade-out
        };
        
        this.activeSymbols.push(symbol);
        console.log(`✨ Symbole ${formula.symbol} (${spellType}) à (${x}, ${y})`);
    }
    
    // 🎲 SYMBOLE ALÉATOIRE POUR DÉMO
    triggerRandomSymbol(x, y) {
        const formulas = Object.keys(this.runicFormulas);
        const randomFormula = formulas[Math.floor(Math.random() * formulas.length)];
        this.triggerRunicEffect(x, y, randomFormula);
    }
    
    // 🎨 ANIMATION PRINCIPALE
    startAnimation() {
        const animate = () => {
            this.updateSymbols();
            this.renderSymbols();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    // 🔄 METTRE À JOUR LES SYMBOLES
    updateSymbols() {
        const now = Date.now();
        
        this.activeSymbols = this.activeSymbols.filter(symbol => {
            const age = now - symbol.birth;
            const progress = age / symbol.life;
            
            if (progress >= 1) return false; // Symbole expiré
            
            // Phases d'animation
            if (progress < 0.2) {
                // Fade-in
                symbol.phase = 'fade-in';
                symbol.opacity = progress / 0.2;
                symbol.scale = 0.5 + (progress / 0.2) * 0.5;
            } else if (progress < 0.8) {
                // Float
                symbol.phase = 'float';
                symbol.opacity = 0.8 - (progress - 0.2) * 0.3;
                symbol.scale = 1.0;
                symbol.x += symbol.vx;
                symbol.y += symbol.vy;
                symbol.rotation += 0.02;
                symbol.vy *= 0.98; // Ralentissement
            } else {
                // Fade-out
                symbol.phase = 'fade-out';
                const fadeProgress = (progress - 0.8) / 0.2;
                symbol.opacity = (1 - fadeProgress) * 0.5;
                symbol.scale = 1.0 - fadeProgress * 0.3;
            }
            
            return true;
        });
    }
    
    // 🎨 RENDRE LES SYMBOLES
    renderSymbols() {
        if (!this.ctx) return;
        
        this.activeSymbols.forEach(symbol => {
            this.ctx.save();
            
            // Position et transformation
            this.ctx.translate(symbol.x, symbol.y);
            this.ctx.rotate(symbol.rotation);
            this.ctx.scale(symbol.scale, symbol.scale);
            
            // Style du symbole
            this.ctx.globalAlpha = symbol.opacity;
            this.ctx.fillStyle = symbol.color;
            this.ctx.strokeStyle = symbol.color;
            this.ctx.lineWidth = 2;
            this.ctx.font = '24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Halo brillant
            if (symbol.phase === 'float') {
                this.ctx.shadowColor = symbol.color;
                this.ctx.shadowBlur = 15;
            }
            
            // Dessiner le symbole
            this.ctx.fillText(symbol.symbol, 0, 0);
            this.ctx.strokeText(symbol.symbol, 0, 0);
            
            this.ctx.restore();
        });
    }
    
    // 🛑 ARRÊTER L'ANIMATION
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    // 🧹 NETTOYER
    clear() {
        this.activeSymbols = [];
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    // 📊 STATISTIQUES
    getStats() {
        return {
            activeSymbols: this.activeSymbols.length,
            totalFormulas: Object.keys(this.runicFormulas).length,
            phases: this.activeSymbols.reduce((acc, s) => {
                acc[s.phase] = (acc[s.phase] || 0) + 1;
                return acc;
            }, {})
        };
    }
}

// 🌍 EXPORT GLOBAL
window.RunicSymbolsSystem = RunicSymbolsSystem;

// 🎯 AUTO-INITIALISATION SI CANVAS PRÉSENT
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('game-canvas')) {
        window.runicSymbols = new RunicSymbolsSystem();
        window.runicSymbols.init();
        
        // Message d'aide pour Jean
        console.log('🔮 SYMBOLES RUNIQUES ACTIVÉS !');
        console.log('💡 Utilisation: Shift+Clic sur la carte pour tester');
        console.log('⚡ API: window.runicSymbols.triggerRunicEffect(x, y, "CAST")');
        
        // Test automatique après 2 secondes
        setTimeout(() => {
            if (window.runicSymbols.canvas) {
                const centerX = window.runicSymbols.canvas.width / 2;
                const centerY = window.runicSymbols.canvas.height / 2;
                window.runicSymbols.triggerRunicEffect(centerX, centerY, 'ZFC');
                console.log('✨ Test symbole ZFC au centre !');
            }
        }, 2000);
    }
}); 