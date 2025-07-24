/**
 * 🌀 RUNIC ANIMATION SYSTEM - Jean's Balcon Inspiration
 * =====================================================
 * Système d'animation légère qui utilise les retours API runiques
 * pour faire des petits symboles qui s'animent lors des sorts
 */

class RunicAnimationSystem {
    constructor() {
        this.activeAnimations = new Map();
        this.symbols = {
            // Symboles runiques légers
            psi: 'ψ',
            superposition: '⊙', 
            collapse: '†',
            observation: 'Π',
            projection: '⟶',
            delta: 'Δt',
            coordinates: '@',
            // Symboles d'effets
            success: '✨',
            error: '🚨',
            healing: '💚',
            teleport: '🌀',
            energy: '⚡',
            building: '🏗️'
        };
        this.init();
    }

    init() {
        // Créer le container d'animations
        this.container = document.createElement('div');
        this.container.id = 'runic-animations';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(this.container);

        console.log('🌀 Runic Animation System initialized by Jean from balcon!');
    }

    /**
     * 🎯 Analyser le retour API et déclencher les animations
     */
    processApiResponse(response, sourceElement = null) {
        console.log('🌀 Processing API response for animations:', response);

        // Extraire les infos du retour API
        const runicInterpretation = response.runicInterpretation || '';
        const formulaType = response.formulaType || '';
        const success = response.success || false;
        const data = response.data || {};

        // Position de départ (élément source ou centre écran)
        const startPos = this.getElementPosition(sourceElement);

        // Déclencher les animations basées sur le retour
        this.animateFromApiResponse(runicInterpretation, formulaType, success, data, startPos);
    }

    /**
     * 🎨 Créer les animations basées sur la réponse API
     */
    animateFromApiResponse(runicText, formulaType, success, data, startPos) {
        // Animation du texte runique lui-même
        if (runicText.includes('ψ_ENGINE')) {
            this.animateRunicFormula(runicText, startPos, success);
        }

        // Animations spécifiques par type de formule
        switch (formulaType) {
            case 'SIMPLE_TELEPORT':
                this.animateTeleport(startPos, data);
                break;
            case 'SIMPLE_ENERGY':
                this.animateEnergy(startPos, data);
                break;
            case 'SIMPLE_HEALING':
                this.animateHealing(startPos, data);
                break;
            case 'SIMPLE_BUILDING':
                this.animateBuilding(startPos, data);
                break;
            case 'RUNIC_QUANTUM':
                this.animateQuantumEffect(startPos, data);
                break;
            case 'JSON_ASSET':
                this.animateJsonEffect(startPos, data);
                break;
            default:
                this.animateGenericSuccess(startPos, success);
        }
    }

    /**
     * ✨ Animation de formule runique
     */
    animateRunicFormula(runicText, startPos, success) {
        // Extraire les symboles du texte runique
        const symbols = this.extractRunicSymbols(runicText);
        
        symbols.forEach((symbol, index) => {
            setTimeout(() => {
                this.createFloatingSymbol(symbol, {
                    x: startPos.x + (index * 30),
                    y: startPos.y - 20,
                    color: success ? '#00ff88' : '#ff4444',
                    duration: 2000 + (index * 200),
                    animation: 'runic-pulse'
                });
            }, index * 300);
        });
    }

    /**
     * 🌀 Animation téléportation
     */
    animateTeleport(startPos, data) {
        // Symboles de téléportation qui tournent
        const teleportSymbols = ['🌀', 'ψ', '⊙', '⟶'];
        
        teleportSymbols.forEach((symbol, index) => {
            this.createFloatingSymbol(symbol, {
                x: startPos.x,
                y: startPos.y,
                color: '#00aaff',
                duration: 1500,
                animation: 'spiral-out',
                delay: index * 100
            });
        });

        // Effet de particules légères
        this.createParticleEffect(startPos, {
            count: 12,
            symbol: '✨',
            color: '#88ccff',
            animation: 'teleport-sparkle'
        });
    }

    /**
     * ⚡ Animation énergie
     */
    animateEnergy(startPos, data) {
        const energyChange = data.energyChange || 10;
        const isPositive = energyChange > 0;
        
        this.createFloatingSymbol('⚡', {
            x: startPos.x,
            y: startPos.y,
            color: isPositive ? '#ffff00' : '#ff8800',
            duration: 1000,
            animation: 'energy-pulse'
        });

        // Chiffres qui montent/descendent
        this.createFloatingText(`${isPositive ? '+' : ''}${energyChange}`, {
            x: startPos.x + 30,
            y: startPos.y,
            color: isPositive ? '#88ff88' : '#ff8888',
            duration: 1500,
            animation: 'number-float'
        });
    }

    /**
     * 💚 Animation soins
     */
    animateHealing(startPos, data) {
        const healSymbols = ['💚', '✨', '💙'];
        
        healSymbols.forEach((symbol, index) => {
            this.createFloatingSymbol(symbol, {
                x: startPos.x + (Math.random() - 0.5) * 60,
                y: startPos.y + (Math.random() - 0.5) * 40,
                color: '#88ff88',
                duration: 2000,
                animation: 'healing-glow',
                delay: index * 200
            });
        });
    }

    /**
     * 🏗️ Animation construction
     */
    animateBuilding(startPos, data) {
        this.createFloatingSymbol('🏗️', {
            x: startPos.x,
            y: startPos.y,
            color: '#ffaa00',
            duration: 1500,
            animation: 'build-up'
        });

        // Effet de construction progressif
        setTimeout(() => {
            this.createFloatingSymbol('🏰', {
                x: startPos.x,
                y: startPos.y - 30,
                color: '#888888',
                duration: 1000,
                animation: 'fade-in'
            });
        }, 800);
    }

    /**
     * ⚛️ Animation effet quantique
     */
    animateQuantumEffect(startPos, data) {
        const quantumSymbols = ['ψ', '⊙', '†', 'Π'];
        
        // Animation en cercle des symboles quantiques
        quantumSymbols.forEach((symbol, index) => {
            const angle = (index / quantumSymbols.length) * Math.PI * 2;
            const radius = 50;
            
            this.createFloatingSymbol(symbol, {
                x: startPos.x + Math.cos(angle) * radius,
                y: startPos.y + Math.sin(angle) * radius,
                color: '#aa88ff',
                duration: 3000,
                animation: 'quantum-orbit'
            });
        });
    }

    /**
     * 📜 Animation effet JSON
     */
    animateJsonEffect(startPos, data) {
        const type = data.type || 'GENERIC_JSON';
        
        let symbol = '📜';
        let color = '#888888';
        
        switch (type) {
            case 'PARADOX_RISK':
                symbol = '⚠️';
                color = '#ff8800';
                break;
            case 'TEMPORAL_STABILITY':
                symbol = '⏰';
                color = '#0088ff';
                break;
            case 'AREA_EFFECT':
                symbol = '💥';
                color = '#ff4444';
                break;
        }
        
        this.createFloatingSymbol(symbol, {
            x: startPos.x,
            y: startPos.y,
            color: color,
            duration: 2000,
            animation: 'json-pulse'
        });
    }

    /**
     * 🎨 Créer un symbole flottant animé
     */
    createFloatingSymbol(symbol, options = {}) {
        const element = document.createElement('div');
        element.textContent = symbol;
        element.style.cssText = `
            position: absolute;
            left: ${options.x || 0}px;
            top: ${options.y || 0}px;
            font-size: 24px;
            color: ${options.color || '#ffffff'};
            text-shadow: 0 0 10px ${options.color || '#ffffff'};
            pointer-events: none;
            z-index: 10000;
            animation: ${options.animation || 'float-up'} ${options.duration || 1000}ms ease-out;
            animation-delay: ${options.delay || 0}ms;
            animation-fill-mode: both;
        `;

        this.container.appendChild(element);

        // Nettoyer après l'animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, (options.duration || 1000) + (options.delay || 0));
    }

    /**
     * 📝 Créer du texte flottant
     */
    createFloatingText(text, options = {}) {
        const element = document.createElement('div');
        element.textContent = text;
        element.style.cssText = `
            position: absolute;
            left: ${options.x || 0}px;
            top: ${options.y || 0}px;
            font-size: 18px;
            font-weight: bold;
            color: ${options.color || '#ffffff'};
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
            pointer-events: none;
            z-index: 10000;
            animation: ${options.animation || 'float-up'} ${options.duration || 1000}ms ease-out;
        `;

        this.container.appendChild(element);

        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, options.duration || 1000);
    }

    /**
     * ✨ Créer un effet de particules
     */
    createParticleEffect(startPos, options = {}) {
        const count = options.count || 8;
        const symbol = options.symbol || '✨';
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const distance = 30 + Math.random() * 40;
            
            this.createFloatingSymbol(symbol, {
                x: startPos.x + Math.cos(angle) * distance,
                y: startPos.y + Math.sin(angle) * distance,
                color: options.color || '#ffffff',
                duration: 1000 + Math.random() * 500,
                animation: options.animation || 'particle-fade'
            });
        }
    }

    /**
     * 🔍 Extraire les symboles runiques d'un texte
     */
    extractRunicSymbols(runicText) {
        const symbols = [];
        const runicPattern = /[ψ⊙†Π⟶@]/g;
        let match;
        
        while ((match = runicPattern.exec(runicText)) !== null) {
            symbols.push(match[0]);
        }
        
        return symbols.length > 0 ? symbols : ['ψ', '⊙'];
    }

    /**
     * 📍 Obtenir la position d'un élément
     */
    getElementPosition(element) {
        if (!element) {
            return {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            };
        }
        
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }
}

// 🎨 CSS Animations pour les effets
const animationStyles = `
@keyframes float-up {
    0% { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-50px) scale(0.8); }
}

@keyframes runic-pulse {
    0% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(0.8) translateY(-30px); }
}

@keyframes spiral-out {
    0% { opacity: 1; transform: rotate(0deg) scale(1); }
    100% { opacity: 0; transform: rotate(360deg) scale(2) translateY(-40px); }
}

@keyframes energy-pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); filter: brightness(2); }
    100% { opacity: 0; transform: scale(0.5); }
}

@keyframes healing-glow {
    0% { opacity: 0; transform: scale(0.5); filter: brightness(1); }
    50% { opacity: 1; transform: scale(1.2); filter: brightness(2); }
    100% { opacity: 0; transform: scale(0.8) translateY(-40px); filter: brightness(1); }
}

@keyframes build-up {
    0% { opacity: 0; transform: translateY(20px) scale(0.5); }
    50% { opacity: 1; transform: translateY(0) scale(1.1); }
    100% { opacity: 0; transform: translateY(-20px) scale(1); }
}

@keyframes quantum-orbit {
    0% { opacity: 1; transform: rotate(0deg) translateX(50px) rotate(0deg); }
    100% { opacity: 0; transform: rotate(360deg) translateX(80px) rotate(-360deg); }
}

@keyframes json-pulse {
    0% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0; transform: scale(0.9) translateY(-30px); }
}

@keyframes number-float {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-60px); }
}

@keyframes particle-fade {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.3) translateY(-20px); }
}

@keyframes teleport-sparkle {
    0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
    100% { opacity: 0; transform: scale(0.3) rotate(360deg) translateY(-30px); }
}
`;

// Injecter les styles CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// 🌀 Instance globale du système d'animation
window.runicAnimationSystem = new RunicAnimationSystem();

// 🎯 Fonction helper pour les développeurs
window.animateSpell = function(response, sourceElement = null) {
    window.runicAnimationSystem.processApiResponse(response, sourceElement);
};

console.log('🌀 Jean Balcon Animation System loaded! Use animateSpell(response, element) to trigger animations!'); 