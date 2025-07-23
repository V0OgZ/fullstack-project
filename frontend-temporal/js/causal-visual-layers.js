/**
 * 🎨 CAUSAL VISUAL LAYERS - HEROES OF TIME
 * ======================================
 * Implémentation des couches visuelles causales selon HOT_MASTER_UI_CAUSAL_SPEC.md
 */

class CausalVisualLayers {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.layers = new Map();
        this.currentTimeline = 'ℬ1';
        this.artifacts = new Map();
        
        // Couleurs par timeline
        this.timelineColors = {
            'ℬ1': { r: 233, g: 69, b: 96, name: 'Temporal Red' },
            'ℬ2': { r: 0, g: 188, b: 212, name: 'Quantum Cyan' },
            'ℬ3': { r: 243, g: 156, b: 18, name: 'Collapse Orange' },
            'ℬ4': { r: 155, g: 89, b: 182, name: 'Interference Purple' },
            'ℬ5': { r: 46, g: 204, b: 113, name: 'Stabilized Green' }
        };
        
        this.init();
    }
    
    init() {
        console.log('🎨 Initialisation des couches visuelles causales...');
        this.createLayerStructure();
        this.setupEventListeners();
    }
    
    createLayerStructure() {
        // Créer les couches dans l'ordre de rendu (z-index croissant)
        const layerOrder = [
            'fog-of-time',        // Brouillard temporel (fond)
            'confirmed-reality',  // Réalité confirmée
            'superposed-timelines', // Timelines superposées
            'quantum-zones',      // Zones quantiques (Veil)
            'ghost-actions',      // Actions fantômes
            'causal-anchors',     // Ancres causales
            'temporal-effects'    // Effets temporels (flash, etc.)
        ];
        
        layerOrder.forEach((layerId, index) => {
            const layer = this.createLayer(layerId, index + 1);
            this.layers.set(layerId, layer);
            this.gameBoard.appendChild(layer);
        });
    }
    
    createLayer(id, zIndex) {
        const layer = document.createElement('div');
        layer.id = `causal-layer-${id}`;
        layer.className = 'causal-layer';
        layer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: ${zIndex};
            transition: opacity 0.3s ease;
        `;
        return layer;
    }
    
    setupEventListeners() {
        // Écouter les changements de timeline
        document.addEventListener('timeline-changed', (event) => {
            this.currentTimeline = event.detail.timeline;
            this.updateAllLayers();
        });
        
        // Écouter les changements d'état de jeu
        document.addEventListener('game-state-updated', (event) => {
            this.updateLayersFromGameState(event.detail.gameState);
        });
        
        // Écouter les effets d'artefacts
        document.addEventListener('artifact-activated', (event) => {
            this.handleArtifactEffect(event.detail.artifact, event.detail.position);
        });
    }
    
    /**
     * 🌫️ FOG OF TIME - Zones non encore jouées
     * Rendu: Black or shaded, low opacity
     */
    updateFogOfTime(gameState) {
        const layer = this.layers.get('fog-of-time');
        layer.innerHTML = '';
        
        if (!gameState || !gameState.tiles) return;
        
        // Identifier les zones non explorées/non jouées
        const unexploredTiles = gameState.tiles.filter(tile => 
            !tile.hasBeenExplored && !tile.occupants?.length
        );
        
        unexploredTiles.forEach(tile => {
            const fogTile = document.createElement('div');
            fogTile.className = 'fog-of-time-tile';
            fogTile.style.cssText = `
                position: absolute;
                left: ${tile.x * (100 / 20)}%;
                top: ${tile.y * (100 / 15)}%;
                width: ${100 / 20}%;
                height: ${100 / 15}%;
                background: linear-gradient(135deg, 
                    rgba(0, 0, 0, 0.8) 0%, 
                    rgba(20, 20, 40, 0.6) 50%, 
                    rgba(0, 0, 0, 0.9) 100%);
                backdrop-filter: blur(2px);
                border-radius: 3px;
                animation: fogPulse 4s ease-in-out infinite;
            `;
            layer.appendChild(fogTile);
        });
        
        // Ajouter l'animation CSS si pas déjà présente
        this.ensureCSSAnimation('fogPulse', `
            @keyframes fogPulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 0.9; }
            }
        `);
    }
    
    /**
     * ✨ CONFIRMED REALITY - Réalité confirmée
     * Rendu: Full opacity, crisp sprite
     */
    updateConfirmedReality(gameState) {
        const layer = this.layers.get('confirmed-reality');
        layer.innerHTML = '';
        
        if (!gameState || !gameState.tiles) return;
        
        // Tuiles avec réalité confirmée (occupées, structures, etc.)
        const confirmedTiles = gameState.tiles.filter(tile => 
            tile.occupants?.length > 0 || tile.building || tile.structure
        );
        
        confirmedTiles.forEach(tile => {
            const realityTile = document.createElement('div');
            realityTile.className = 'confirmed-reality-tile';
            realityTile.style.cssText = `
                position: absolute;
                left: ${tile.x * (100 / 20)}%;
                top: ${tile.y * (100 / 15)}%;
                width: ${100 / 20}%;
                height: ${100 / 15}%;
                background: rgba(46, 204, 113, 0.2);
                border: 2px solid rgba(46, 204, 113, 0.6);
                border-radius: 3px;
                box-shadow: 0 0 8px rgba(46, 204, 113, 0.4);
                opacity: 1;
            `;
            layer.appendChild(realityTile);
        });
    }
    
    /**
     * 🌈 SUPERPOSED TIMELINES - Timelines superposées
     * Rendu: Transparent overlays with unique color tint per timeline
     */
    updateSuperposedTimelines(gameState) {
        const layer = this.layers.get('superposed-timelines');
        layer.innerHTML = '';
        
        if (!gameState || !gameState.psiStates) return;
        
        // Grouper les états ψ par position
        const statesByPosition = new Map();
        gameState.psiStates.forEach(psi => {
            if (psi.targetPosition && psi.status === 'ACTIVE') {
                const key = `${psi.targetPosition.x},${psi.targetPosition.y}`;
                if (!statesByPosition.has(key)) {
                    statesByPosition.set(key, []);
                }
                statesByPosition.get(key).push(psi);
            }
        });
        
        // Créer les overlays de superposition
        statesByPosition.forEach((states, positionKey) => {
            const [x, y] = positionKey.split(',').map(Number);
            
            states.forEach((psi, index) => {
                const timeline = psi.branch || 'ℬ1';
                const color = this.timelineColors[timeline] || this.timelineColors['ℬ1'];
                
                const overlay = document.createElement('div');
                overlay.className = 'superposed-timeline-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    left: ${x * (100 / 20)}%;
                    top: ${y * (100 / 15)}%;
                    width: ${100 / 20}%;
                    height: ${100 / 15}%;
                    background: rgba(${color.r}, ${color.g}, ${color.b}, 0.3);
                    border: 1px solid rgba(${color.r}, ${color.g}, ${color.b}, 0.6);
                    border-radius: 3px;
                    animation: timelineShimmer 2s ease-in-out infinite;
                    animation-delay: ${index * 0.5}s;
                    z-index: ${index + 1};
                `;
                
                // Ajouter l'ID de l'état ψ
                const psiLabel = document.createElement('div');
                psiLabel.textContent = psi.quantumStateId || 'ψ';
                psiLabel.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: monospace;
                    font-size: 10px;
                    color: rgba(${color.r}, ${color.g}, ${color.b}, 0.9);
                    font-weight: bold;
                    text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
                `;
                overlay.appendChild(psiLabel);
                
                layer.appendChild(overlay);
            });
        });
        
        this.ensureCSSAnimation('timelineShimmer', `
            @keyframes timelineShimmer {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 0.9; transform: scale(1.05); }
            }
        `);
    }
    
    /**
     * 👻 GHOST ACTIONS - Actions fantômes
     * Rendu: Translucent unit ghost trails with blinking markers
     */
    updateGhostActions(gameState) {
        const layer = this.layers.get('ghost-actions');
        layer.innerHTML = '';
        
        if (!gameState || !gameState.psiStates) return;
        
        // Créer des trails fantômes pour les mouvements prévus
        gameState.psiStates.forEach(psi => {
            if (psi.actionType === 'MOV' && psi.status === 'ACTIVE' && psi.targetPosition) {
                const ghostTrail = document.createElement('div');
                ghostTrail.className = 'ghost-action-trail';
                ghostTrail.style.cssText = `
                    position: absolute;
                    left: ${psi.targetPosition.x * (100 / 20)}%;
                    top: ${psi.targetPosition.y * (100 / 15)}%;
                    width: ${100 / 20}%;
                    height: ${100 / 15}%;
                    background: radial-gradient(circle, 
                        rgba(155, 89, 182, 0.4) 0%, 
                        rgba(155, 89, 182, 0.1) 70%, 
                        transparent 100%);
                    border: 1px dashed rgba(155, 89, 182, 0.5);
                    border-radius: 50%;
                    animation: ghostBlink 1.5s ease-in-out infinite;
                `;
                
                // Ajouter un marqueur clignotant
                const marker = document.createElement('div');
                marker.textContent = '👻';
                marker.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 12px;
                    animation: ghostBlink 1s ease-in-out infinite;
                `;
                ghostTrail.appendChild(marker);
                
                layer.appendChild(ghostTrail);
            }
        });
        
        this.ensureCSSAnimation('ghostBlink', `
            @keyframes ghostBlink {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
        `);
    }
    
    /**
     * 🌫️ QUANTUM ZONES - Zones quantiques (Veil)
     * Rendu: Gray-scale tint, fog-like blur — interaction disabled
     */
    updateQuantumZones(gameState) {
        const layer = this.layers.get('quantum-zones');
        layer.innerHTML = '';
        
        // Simuler les zones affectées par The Veil
        if (this.artifacts.has('The Veil')) {
            const veilEffect = this.artifacts.get('The Veil');
            const affectedTiles = this.calculateVeilAffectedTiles(veilEffect.position, veilEffect.radius);
            
            affectedTiles.forEach(pos => {
                const quantumZone = document.createElement('div');
                quantumZone.className = 'quantum-zone-veil';
                quantumZone.style.cssText = `
                    position: absolute;
                    left: ${pos.x * (100 / 20)}%;
                    top: ${pos.y * (100 / 15)}%;
                    width: ${100 / 20}%;
                    height: ${100 / 15}%;
                    background: rgba(128, 128, 128, 0.6);
                    backdrop-filter: blur(3px) grayscale(80%);
                    border: 1px solid rgba(128, 128, 128, 0.4);
                    border-radius: 3px;
                    pointer-events: none;
                    animation: veilWave 3s ease-in-out infinite;
                `;
                layer.appendChild(quantumZone);
            });
            
            this.ensureCSSAnimation('veilWave', `
                @keyframes veilWave {
                    0%, 100% { opacity: 0.6; filter: blur(2px); }
                    50% { opacity: 0.8; filter: blur(4px); }
                }
            `);
        }
    }
    
    /**
     * ⚓ CAUSAL ANCHORS - Ancres causales (Anchor Tower)
     * Rendu: Golden aura with visual blocking field
     */
    updateCausalAnchors(gameState) {
        const layer = this.layers.get('causal-anchors');
        layer.innerHTML = '';
        
        // Simuler les Anchor Towers
        if (this.artifacts.has('Anchor Tower')) {
            const anchorEffect = this.artifacts.get('Anchor Tower');
            
            const anchorAura = document.createElement('div');
            anchorAura.className = 'causal-anchor-aura';
            anchorAura.style.cssText = `
                position: absolute;
                left: ${(anchorEffect.position.x - 2) * (100 / 20)}%;
                top: ${(anchorEffect.position.y - 2) * (100 / 15)}%;
                width: ${5 * (100 / 20)}%;
                height: ${5 * (100 / 15)}%;
                background: radial-gradient(circle, 
                    rgba(255, 215, 0, 0.3) 0%, 
                    rgba(255, 215, 0, 0.1) 60%, 
                    transparent 100%);
                border: 2px solid rgba(255, 215, 0, 0.6);
                border-radius: 50%;
                animation: anchorPulse 2s ease-in-out infinite;
                pointer-events: none;
            `;
            
            // Centre de l'ancre
            const anchorCore = document.createElement('div');
            anchorCore.textContent = '⚓';
            anchorCore.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 20px;
                color: #FFD700;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
                animation: anchorRotate 4s linear infinite;
            `;
            anchorAura.appendChild(anchorCore);
            
            layer.appendChild(anchorAura);
            
            this.ensureCSSAnimation('anchorPulse', `
                @keyframes anchorPulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
            `);
            
            this.ensureCSSAnimation('anchorRotate', `
                @keyframes anchorRotate {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `);
        }
    }
    
    /**
     * ⚡ TEMPORAL EFFECTS - Effets temporels (flash, collapse, etc.)
     * Rendu: Flash effects, timeline cuts, etc.
     */
    createTemporalEffect(type, position, duration = 2000) {
        const layer = this.layers.get('temporal-effects');
        
        let effect;
        switch (type) {
            case 'collapse-flash':
                effect = this.createCollapseFlash(position);
                break;
            case 'sword-cut':
                effect = this.createSwordCut(position);
                break;
            case 'quantum-interference':
                effect = this.createQuantumInterference(position);
                break;
            default:
                return;
        }
        
        layer.appendChild(effect);
        
        // Supprimer l'effet après la durée
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, duration);
    }
    
    createCollapseFlash(position) {
        const flash = document.createElement('div');
        flash.className = 'collapse-flash-effect';
        flash.style.cssText = `
            position: absolute;
            left: ${position.x * (100 / 20)}%;
            top: ${position.y * (100 / 15)}%;
            width: ${100 / 20}%;
            height: ${100 / 15}%;
            background: radial-gradient(circle, 
                rgba(233, 69, 96, 1) 0%, 
                rgba(233, 69, 96, 0.5) 50%, 
                transparent 100%);
            border-radius: 50%;
            animation: collapseFlash 0.5s ease-out;
            pointer-events: none;
        `;
        
        this.ensureCSSAnimation('collapseFlash', `
            @keyframes collapseFlash {
                0% { transform: scale(0); opacity: 1; }
                50% { transform: scale(2); opacity: 0.8; }
                100% { transform: scale(4); opacity: 0; }
            }
        `);
        
        return flash;
    }
    
    // Utilitaires
    calculateVeilAffectedTiles(center, radius) {
        const tiles = [];
        for (let x = Math.max(0, center.x - radius); x <= Math.min(19, center.x + radius); x++) {
            for (let y = Math.max(0, center.y - radius); y <= Math.min(14, center.y + radius); y++) {
                const distance = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2);
                if (distance <= radius) {
                    tiles.push({ x, y });
                }
            }
        }
        return tiles;
    }
    
    ensureCSSAnimation(name, keyframes) {
        if (!document.querySelector(`style[data-animation="${name}"]`)) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', name);
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
    }
    
    // API publique
    updateAllLayers(gameState) {
        if (gameState) {
            this.updateFogOfTime(gameState);
            this.updateConfirmedReality(gameState);
            this.updateSuperposedTimelines(gameState);
            this.updateGhostActions(gameState);
            this.updateQuantumZones(gameState);
            this.updateCausalAnchors(gameState);
        }
    }
    
    updateLayersFromGameState(gameState) {
        this.updateAllLayers(gameState);
    }
    
    setTimeline(timeline) {
        this.currentTimeline = timeline;
        this.updateAllLayers();
    }
    
    addArtifact(name, position, properties = {}) {
        this.artifacts.set(name, { position, ...properties });
        this.updateQuantumZones();
        this.updateCausalAnchors();
    }
    
    removeArtifact(name) {
        this.artifacts.delete(name);
        this.updateQuantumZones();
        this.updateCausalAnchors();
    }
    
    handleArtifactEffect(artifact, position) {
        switch (artifact) {
            case 'Sword of Before-Time':
                this.createTemporalEffect('sword-cut', position);
                break;
            case 'collapse':
                this.createTemporalEffect('collapse-flash', position);
                break;
        }
    }
}

// Export global
window.CausalVisualLayers = CausalVisualLayers; 