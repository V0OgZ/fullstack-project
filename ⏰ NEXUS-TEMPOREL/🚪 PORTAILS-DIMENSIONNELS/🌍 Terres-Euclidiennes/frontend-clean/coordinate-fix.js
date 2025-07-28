// 🎯 COORDINATE FIX SYSTEM - JEAN EDITION
// =======================================
// Correction des coordonnées héros qui se baladent à droite

class CoordinateFix {
    constructor() {
        this.originalHexToPixel = null;
        this.originalPixelToHex = null;
        this.centerOffsetX = 0;
        this.centerOffsetY = 0;
        this.isFixed = false;
        
        console.log('🎯 Coordinate Fix System initialisé');
    }
    
    // 🔧 FIXER LES COORDONNÉES DANS GAME RENDERER
    fixGameRenderer() {
        if (window.gameRenderer && !this.isFixed) {
            // Sauvegarder les fonctions originales
            this.originalHexToPixel = window.gameRenderer.hexToPixel.bind(window.gameRenderer);
            this.originalPixelToHex = window.gameRenderer.pixelToHex.bind(window.gameRenderer);
            
            // Calculer offset de centrage basé sur la taille du canvas
            const canvas = window.gameRenderer.canvas;
            this.centerOffsetX = -canvas.width * 0.1; // Décaler 10% vers la gauche
            this.centerOffsetY = -canvas.height * 0.05; // Décaler 5% vers le haut
            
            // Remplacer par les versions corrigées
            window.gameRenderer.hexToPixel = this.fixedHexToPixel.bind(this);
            window.gameRenderer.pixelToHex = this.fixedPixelToHex.bind(this);
            
            this.isFixed = true;
            console.log('🎯 Coordonnées GameRenderer corrigées');
            console.log(`   Offset appliqué: X=${this.centerOffsetX}, Y=${this.centerOffsetY}`);
            
            // Forcer un refresh pour appliquer les corrections
            setTimeout(() => {
                if (window.gameRenderer.refresh) {
                    window.gameRenderer.refresh();
                }
            }, 100);
        }
    }
    
    // 🎯 FONCTION HEX TO PIXEL CORRIGÉE
    fixedHexToPixel(q, r) {
        // Utiliser la fonction originale
        const original = this.originalHexToPixel(q, r);
        
        // Appliquer les corrections de centrage
        return {
            x: original.x + this.centerOffsetX,
            y: original.y + this.centerOffsetY
        };
    }
    
    // 🎯 FONCTION PIXEL TO HEX CORRIGÉE
    fixedPixelToHex(x, y) {
        // Compenser les offsets avant conversion
        const adjustedX = x - this.centerOffsetX;
        const adjustedY = y - this.centerOffsetY;
        
        // Utiliser la fonction originale avec coordonnées ajustées
        return this.originalPixelToHex(adjustedX, adjustedY);
    }
    
    // 🔄 CENTRER LA VUE SUR UNE POSITION
    centerViewOn(q, r) {
        if (window.gameRenderer) {
            const pixelPos = this.fixedHexToPixel(q, r);
            
            // Centrer la vue sur cette position
            window.gameRenderer.offsetX = -pixelPos.x;
            window.gameRenderer.offsetY = -pixelPos.y;
            
            if (window.gameRenderer.refresh) {
                window.gameRenderer.refresh();
            }
            
            console.log(`🎯 Vue centrée sur hex(${q}, ${r}) → pixel(${pixelPos.x}, ${pixelPos.y})`);
        }
    }
    
    // 🏠 AUTO-CENTRER SUR LE PREMIER HÉROS
    autoCenterOnFirstHero() {
        if (window.gameRenderer && window.gameRenderer.gameState && window.gameRenderer.gameState.heroes) {
            const heroes = window.gameRenderer.gameState.heroes;
            if (heroes.length > 0) {
                const firstHero = heroes[0];
                
                // Utiliser position.x/y ou q/r selon disponibilité
                let q = firstHero.position?.x || firstHero.q || 0;
                let r = firstHero.position?.y || firstHero.r || 0;
                
                this.centerViewOn(q, r);
                console.log(`🏠 Auto-centré sur héros: ${firstHero.name} à (${q}, ${r})`);
            }
        }
    }
    
    // 🎨 CORRIGER LES POSITIONS D'AFFICHAGE DES HÉROS
    fixHeroDisplayPositions() {
        if (window.gameRenderer && window.gameRenderer.gameState && window.gameRenderer.gameState.heroes) {
            const heroes = window.gameRenderer.gameState.heroes;
            
            heroes.forEach(hero => {
                // S'assurer que displayPos existe et est synchronisé
                if (!hero.displayPos) {
                    hero.displayPos = {
                        x: hero.position?.x || hero.q || 0,
                        y: hero.position?.y || hero.r || 0
                    };
                }
                
                // Interpolation douce vers la position réelle
                const targetX = hero.position?.x || hero.q || 0;
                const targetY = hero.position?.y || hero.r || 0;
                
                const lerpSpeed = 0.1;
                hero.displayPos.x += (targetX - hero.displayPos.x) * lerpSpeed;
                hero.displayPos.y += (targetY - hero.displayPos.y) * lerpSpeed;
            });
        }
    }
    
    // 📏 DIAGNOSTICS COORDONNÉES
    diagnosticCoordinates() {
        console.log('🔍 DIAGNOSTIC COORDONNÉES:');
        
        if (window.gameRenderer) {
            const canvas = window.gameRenderer.canvas;
            console.log(`   Canvas: ${canvas.width}x${canvas.height}`);
            console.log(`   Zoom: ${window.gameRenderer.zoom}`);
            console.log(`   Offset: X=${window.gameRenderer.offsetX}, Y=${window.gameRenderer.offsetY}`);
            console.log(`   Center Correction: X=${this.centerOffsetX}, Y=${this.centerOffsetY}`);
            
            if (window.gameRenderer.gameState && window.gameRenderer.gameState.heroes) {
                console.log('   HÉROS:');
                window.gameRenderer.gameState.heroes.forEach((hero, index) => {
                    const q = hero.position?.x || hero.q || 0;
                    const r = hero.position?.y || hero.r || 0;
                    const pixelPos = this.fixedHexToPixel(q, r);
                    
                    console.log(`     ${index + 1}. ${hero.name}: hex(${q}, ${r}) → pixel(${Math.round(pixelPos.x)}, ${Math.round(pixelPos.y)})`);
                });
            }
        }
    }
    
    // 🎯 TEST VISUEL POSITIONS
    testVisualPositions() {
        if (window.gameRenderer && window.gameRenderer.ctx) {
            const ctx = window.gameRenderer.ctx;
            
            // Dessiner des marqueurs de test aux positions clés
            const testPositions = [
                { q: 0, r: 0, color: '#FF0000', label: 'CENTER' },
                { q: 2, r: 0, color: '#00FF00', label: 'RIGHT' },
                { q: -2, r: 0, color: '#0000FF', label: 'LEFT' },
                { q: 0, r: 2, color: '#FFFF00', label: 'DOWN' },
                { q: 0, r: -2, color: '#FF00FF', label: 'UP' }
            ];
            
            ctx.save();
            ctx.translate(window.gameRenderer.canvas.width / 2 + window.gameRenderer.offsetX, 
                         window.gameRenderer.canvas.height / 2 + window.gameRenderer.offsetY);
            ctx.scale(window.gameRenderer.zoom, window.gameRenderer.zoom);
            
            testPositions.forEach(test => {
                const pixelPos = this.fixedHexToPixel(test.q, test.r);
                
                // Marqueur coloré
                ctx.beginPath();
                ctx.arc(pixelPos.x, pixelPos.y, 15, 0, Math.PI * 2);
                ctx.fillStyle = test.color;
                ctx.fill();
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Label
                ctx.font = '12px Arial';
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'center';
                ctx.fillText(test.label, pixelPos.x, pixelPos.y + 25);
            });
            
            ctx.restore();
            
            console.log('🎯 Marqueurs de test dessinés');
        }
    }
    
    // 🔄 RÉINITIALISER LES CORRECTIONS
    resetFix() {
        if (this.isFixed && window.gameRenderer) {
            // Restaurer les fonctions originales
            window.gameRenderer.hexToPixel = this.originalHexToPixel;
            window.gameRenderer.pixelToHex = this.originalPixelToHex;
            
            this.isFixed = false;
            console.log('🔄 Corrections coordonnées réinitialisées');
        }
    }
    
    // 🎮 AUTO-FIX AU CHARGEMENT GAME STATE
    autoFixOnGameStateChange() {
        // Observer les changements d'état du jeu
        if (window.gameRenderer) {
            const originalUpdateState = window.gameRenderer.updateState;
            
            window.gameRenderer.updateState = (state) => {
                // Appeler la fonction originale
                originalUpdateState.call(window.gameRenderer, state);
                
                // Appliquer les corrections
                this.fixHeroDisplayPositions();
                
                // Auto-centrer sur le premier héros si pas de position définie
                if (window.gameRenderer.offsetX === 0 && window.gameRenderer.offsetY === 0) {
                    setTimeout(() => {
                        this.autoCenterOnFirstHero();
                    }, 200);
                }
            };
        }
    }
}

// 🌍 EXPORT GLOBAL
window.CoordinateFix = CoordinateFix;

// 🎯 AUTO-INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window !== 'undefined') {
        window.coordinateFix = new CoordinateFix();
        
        // Attendre que gameRenderer soit disponible
        const checkGameRenderer = () => {
            if (window.gameRenderer) {
                window.coordinateFix.fixGameRenderer();
                window.coordinateFix.autoFixOnGameStateChange();
                
                console.log('🎯 Coordinate Fix activé !');
                console.log('💡 Commandes disponibles:');
                console.log('   window.coordinateFix.diagnosticCoordinates()');
                console.log('   window.coordinateFix.testVisualPositions()');
                console.log('   window.coordinateFix.autoCenterOnFirstHero()');
            } else {
                setTimeout(checkGameRenderer, 500);
            }
        };
        
        checkGameRenderer();
    }
}); 