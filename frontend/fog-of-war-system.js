// 🌫️ SYSTÈME DE BROUILLARD DE CAUSALITÉ - 7 ÉTATS + TIMELINES ψ
// =============================================================
// Basé sur CONCEPTS_AVANCES_TEMPORELLES.md

class FogOfWarSystem {
    constructor() {
        // Les 7 états du Brouillard de Causalité selon la documentation
        this.fogStates = {
            // 0. Unexplored - Brouillard total, jamais vu
            UNEXPLORED: {
                name: 'Unexplored',
                color: 'rgba(50, 50, 50, 0.9)',
                interaction: 'none',
                description: 'Brouillard total, jamais vu'
            },
            
            // 1. Collapsed Past - Exploré dans le passé résolu
            COLLAPSED_PAST: {
                name: 'Collapsed Past',
                color: 'rgba(100, 100, 100, 0.7)',
                interaction: 'vision_only',
                description: 'Exploré dans le passé résolu'
            },
            
            // 2. Reachable - Accessible mais pas observé
            REACHABLE: {
                name: 'Reachable',
                color: 'rgba(255, 255, 0, 0.3)',
                interaction: 'planning',
                description: 'Accessible mais pas observé'
            },
            
            // 3. Vision - Vision directe d'unité/château
            VISION: {
                name: 'Vision',
                color: 'rgba(0, 255, 0, 0.1)',
                interaction: 'full',
                description: 'Vision directe d\'unité/château'
            },
            
            // 4. Ghost - Vu avec objet spectral (Voile)
            GHOST: {
                name: 'Ghost',
                color: 'rgba(255, 255, 255, 0.2)',
                interaction: 'observation_only',
                description: 'Vu avec objet spectral (Voile)'
            },
            
            // 5. Superposed - Entité en flux quantique
            SUPERPOSED: {
                name: 'Superposed',
                color: 'rgba(128, 0, 255, 0.4)',
                interaction: 'conditional',
                description: 'Entité en flux quantique'
            },
            
            // 6. Anchored - Zone qui bloque le branchement temporel
            ANCHORED: {
                name: 'Anchored',
                color: 'rgba(0, 0, 255, 0.3)',
                interaction: 'force_collapse',
                description: 'Zone qui bloque le branchement temporel'
            }
        };
        
        this.selectedTimeline = 'ℬ1'; // Timeline principale par défaut
        this.visibleTimelines = new Set(['ℬ1']); // Timelines visibles
        this.fogOpacity = 0.8; // Opacité du brouillard
        this.animationFrame = 0;
    }
    
    // 🎯 SÉLECTION DE TIMELINE
    selectTimeline(timelineId) {
        this.selectedTimeline = timelineId;
        console.log(`Timeline sélectionnée: ${timelineId}`);
        this.updateVisibility();
    }
    
    // 👁️ AJOUTER/SUPPRIMER TIMELINE VISIBLE
    toggleTimelineVisibility(timelineId) {
        if (this.visibleTimelines.has(timelineId)) {
            this.visibleTimelines.delete(timelineId);
        } else {
            this.visibleTimelines.add(timelineId);
        }
        this.updateVisibility();
    }
    
    // 🔄 METTRE À JOUR LA VISIBILITÉ
    updateVisibility() {
        // Mettre à jour l'affichage selon les timelines sélectionnées
        this.animationFrame++;
        this.renderFog();
    }
    
    // 🎨 RENDRE LE BROUILLARD
    renderFog(ctx, gameState) {
        if (!ctx || !gameState) return;
        
        // Récupérer les données de brouillard du jeu
        const fogData = gameState.fogOfWar || this.generateDefaultFog(gameState);
        
        // Dessiner le brouillard pour chaque type
        Object.keys(this.fogTypes).forEach(fogType => {
            this.renderFogType(ctx, fogData, fogType);
        });
        
        // Dessiner les timelines ψ en transparence
        this.renderTimelineTransparency(ctx, gameState);
    }
    
    // 🌫️ RENDRE UN TYPE DE BROUILLARD
    renderFogType(ctx, fogData, fogType) {
        const fogConfig = this.fogTypes[fogType];
        const fogTiles = fogData[fogType] || [];
        
        fogTiles.forEach(tile => {
            const { x, y } = this.hexToPixel(tile.x, tile.y);
            const opacity = this.calculateFogOpacity(tile, fogConfig);
            
            // Appliquer l'animation selon le type
            const animatedOpacity = this.applyAnimation(opacity, fogConfig.animation);
            
            // Dessiner l'hexagone de brouillard
            this.drawFogHex(ctx, x, y, fogConfig.color, animatedOpacity, fogConfig.pattern);
        });
    }
    
    // 🌀 RENDRE LA TRANSPARENCE DES TIMELINES ψ
    renderTimelineTransparency(ctx, gameState) {
        if (!gameState.psiStates) return;
        
        // Filtrer les ψ-states selon la timeline sélectionnée
        const relevantPsiStates = gameState.psiStates.filter(psi => {
            return this.visibleTimelines.has(psi.timeline) || psi.timeline === this.selectedTimeline;
        });
        
        relevantPsiStates.forEach(psi => {
            if (psi.status === 'ACTIVE') {
                const { x, y } = this.hexToPixel(psi.targetX || 0, psi.targetY || 0);
                
                // Calculer la transparence selon la timeline
                const transparency = this.calculateTimelineTransparency(psi);
                
                // Dessiner l'effet de transparence ψ
                this.drawPsiTransparency(ctx, x, y, transparency, psi);
            }
        });
    }
    
    // 🧮 CALCULER L'OPACITÉ DU BROUILLARD
    calculateFogOpacity(tile, fogConfig) {
        let baseOpacity = this.fogOpacity;
        
        // Modifier selon la distance aux héros
        if (tile.distanceToHero) {
            baseOpacity *= (1 - tile.distanceToHero * 0.1);
        }
        
        // Modifier selon la timeline
        if (tile.timeline && tile.timeline !== this.selectedTimeline) {
            baseOpacity *= 0.5; // Plus opaque pour les autres timelines
        }
        
        // Modifier selon la visibilité du type
        baseOpacity *= fogConfig.visibility;
        
        return Math.max(0.1, Math.min(1.0, baseOpacity));
    }
    
    // 🧮 CALCULER LA TRANSPARENCE DES TIMELINES ψ
    calculateTimelineTransparency(psi) {
        let transparency = 0.3; // Base
        
        // Si c'est la timeline sélectionnée, plus transparent
        if (psi.timeline === this.selectedTimeline) {
            transparency = 0.1;
        }
        
        // Si c'est une timeline visible, transparence moyenne
        if (this.visibleTimelines.has(psi.timeline)) {
            transparency = 0.2;
        }
        
        // Modifier selon l'amplitude complexe si présente
        if (psi.complexAmplitude) {
            const magnitude = Math.sqrt(
                psi.complexAmplitude.real * psi.complexAmplitude.real +
                psi.complexAmplitude.imaginary * psi.complexAmplitude.imaginary
            );
            transparency *= (1 - magnitude * 0.5);
        }
        
        return Math.max(0.05, Math.min(0.8, transparency));
    }
    
    // 🎨 DESSINER UN HEXAGONE DE BROUILLARD
    drawFogHex(ctx, x, y, color, opacity, pattern) {
        const hexSize = 25;
        const angles = [];
        
        for (let i = 0; i < 6; i++) {
            angles.push((Math.PI / 3) * i + Math.PI / 6);
        }
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Appliquer le pattern selon le type
        this.applyFogPattern(ctx, x, y, pattern);
        
        ctx.beginPath();
        angles.forEach((angle, i) => {
            const hx = x + hexSize * Math.cos(angle);
            const hy = y + hexSize * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(hx, hy);
            } else {
                ctx.lineTo(hx, hy);
            }
        });
        ctx.closePath();
        
        // Remplir avec la couleur du brouillard
        ctx.fillStyle = color;
        ctx.fill();
        
        ctx.restore();
    }
    
    // 🎨 DESSINER LA TRANSPARENCE ψ
    drawPsiTransparency(ctx, x, y, transparency, psi) {
        ctx.save();
        ctx.globalAlpha = transparency;
        
        // Effet de lueur ψ
        const glowSize = 30 + Math.sin(this.animationFrame * 0.05) * 10;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        gradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);
        
        // Symbole ψ avec transparence
        ctx.fillStyle = 'rgba(255, 0, 255, 0.9)';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ψ', x, y);
        
        // ID de la timeline
        ctx.font = '10px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(psi.timeline, x, y + 15);
        
        ctx.restore();
    }
    
    // 🎭 APPLIQUER LES PATTERNS DE BROUILLARD
    applyFogPattern(ctx, x, y, pattern) {
        switch (pattern) {
            case 'temporal':
                // Pattern temporel avec lignes ondulées
                ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.moveTo(x - 20, y - 20 + i * 10);
                    ctx.lineTo(x + 20, y + 20 - i * 10);
                    ctx.stroke();
                }
                ctx.setLineDash([]);
                break;
                
            case 'quantum':
                // Pattern quantique avec points
                ctx.fillStyle = 'rgba(255, 0, 255, 0.4)';
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI / 2.5) * i;
                    const px = x + Math.cos(angle) * 15;
                    const py = y + Math.sin(angle) * 15;
                    ctx.beginPath();
                    ctx.arc(px, py, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                break;
                
            case 'paradox':
                // Pattern de paradoxe avec distorsion
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(this.animationFrame * 0.02);
                ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
                ctx.lineWidth = 2;
                for (let i = 0; i < 4; i++) {
                    const angle = (Math.PI / 2) * i;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.cos(angle) * 20, Math.sin(angle) * 20);
                    ctx.stroke();
                }
                ctx.restore();
                break;
                
            case 'interference':
                // Pattern d'interférence avec cercles
                for (let i = 0; i < 3; i++) {
                    const radius = 10 + i * 5;
                    ctx.strokeStyle = `rgba(255, 255, 0, ${0.3 - i * 0.1})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.stroke();
                }
                break;
                
            case 'anchor':
                // Pattern d'ancrage avec étoile
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(this.animationFrame * 0.01);
                ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
                ctx.lineWidth = 2;
                for (let i = 0; i < 8; i++) {
                    const angle = (Math.PI / 4) * i;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.cos(angle) * 15, Math.sin(angle) * 15);
                    ctx.stroke();
                }
                ctx.restore();
                break;
                
            case 'reality':
                // Pattern de réalité avec grille
                ctx.strokeStyle = 'rgba(128, 128, 128, 0.4)';
                ctx.lineWidth = 1;
                for (let i = -2; i <= 2; i++) {
                    ctx.beginPath();
                    ctx.moveTo(x + i * 8, y - 16);
                    ctx.lineTo(x + i * 8, y + 16);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x - 16, y + i * 8);
                    ctx.lineTo(x + 16, y + i * 8);
                    ctx.stroke();
                }
                break;
                
            default:
                // Pattern classique (solide)
                break;
        }
    }
    
    // 🎬 APPLIQUER LES ANIMATIONS
    applyAnimation(baseOpacity, animationType) {
        switch (animationType) {
            case 'pulse':
                return baseOpacity * (0.8 + 0.2 * Math.sin(this.animationFrame * 0.1));
            case 'wave':
                return baseOpacity * (0.7 + 0.3 * Math.sin(this.animationFrame * 0.08));
            case 'distort':
                return baseOpacity * (0.6 + 0.4 * Math.sin(this.animationFrame * 0.15));
            case 'ripple':
                return baseOpacity * (0.9 + 0.1 * Math.sin(this.animationFrame * 0.12));
            case 'rotate':
                return baseOpacity * (0.8 + 0.2 * Math.cos(this.animationFrame * 0.05));
            case 'static':
                return baseOpacity * (0.7 + 0.3 * Math.random());
            default:
                return baseOpacity;
        }
    }
    
    // 🗺️ GÉNÉRER LE BROUILLARD PAR DÉFAUT
    generateDefaultFog(gameState) {
        const fogData = {};
        
        // Générer le brouillard pour chaque type
        Object.keys(this.fogTypes).forEach(fogType => {
            fogData[fogType] = [];
            
            // Créer des tuiles de brouillard selon la carte
            if (gameState.tiles) {
                gameState.tiles.forEach(tile => {
                    // Déterminer si la tuile doit avoir du brouillard
                    const shouldHaveFog = this.shouldTileHaveFog(tile, fogType);
                    
                    if (shouldHaveFog) {
                        fogData[fogType].push({
                            x: tile.x,
                            y: tile.y,
                            distanceToHero: this.calculateDistanceToHero(tile, gameState.heroes),
                            timeline: tile.timeline || 'ℬ1'
                        });
                    }
                });
            }
        });
        
        return fogData;
    }
    
    // 🎯 DÉTERMINER SI UNE TUILE DOIT AVOIR DU BROUILLARD
    shouldTileHaveFog(tile, fogType) {
        // Logique pour déterminer le type de brouillard selon la tuile
        switch (fogType) {
            case 'CLASSIC':
                return !tile.isExplored;
            case 'TEMPORAL':
                return tile.hasTemporalEffect;
            case 'QUANTUM':
                return tile.hasPsiState;
            case 'PARADOX':
                return tile.hasParadox;
            case 'INTERFERENCE':
                return tile.hasQuantumInterference;
            case 'ANCHOR':
                return tile.hasTemporalAnchor;
            case 'REALITY':
                return tile.hasRealityDistortion;
            default:
                return false;
        }
    }
    
    // 📏 CALCULER LA DISTANCE AU HÉROS LE PLUS PROCHE
    calculateDistanceToHero(tile, heroes) {
        if (!heroes || heroes.length === 0) return 10;
        
        let minDistance = Infinity;
        heroes.forEach(hero => {
            const distance = Math.sqrt(
                Math.pow(tile.x - hero.position.x, 2) +
                Math.pow(tile.y - hero.position.y, 2)
            );
            minDistance = Math.min(minDistance, distance);
        });
        
        return minDistance;
    }
    
    // 🔧 CONVERSION COORDONNÉES HEXAGONALES
    hexToPixel(q, r) {
        const hexSize = 25;
        const x = hexSize * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
        const y = hexSize * (3 / 2 * r);
        return { x, y };
    }
    
    // 🎛️ CONTRÔLES DE L'INTERFACE SIMPLIFIÉS
    createFogControls() {
        const controls = document.createElement('div');
        controls.className = 'fog-controls';
        controls.innerHTML = `
            <div class="fog-panel">
                <h3>🌫️ Brouillard de Causalité</h3>
                
                <div class="fog-info">
                    <p>Le brouillard représente l'incertitude quantique du futur</p>
                </div>
                
                <div class="timeline-selector">
                    <label>Timeline active:</label>
                    <select id="timeline-select">
                        <option value="ℬ1">ℬ1 - Principale</option>
                        <option value="ℬ2">ℬ2 - Alternative</option>
                        <option value="ℬ3">ℬ3 - Quantique</option>
                    </select>
                </div>
                
                <div class="fog-states-info">
                    <h4>États du Brouillard:</h4>
                    <div class="fog-states-list">
                        <div class="fog-state-item">
                            <span class="fog-color" style="background: rgba(50, 50, 50, 0.9)"></span>
                            <span>Unexplored - Jamais vu</span>
                        </div>
                        <div class="fog-state-item">
                            <span class="fog-color" style="background: rgba(100, 100, 100, 0.7)"></span>
                            <span>Collapsed Past - Passé résolu</span>
                        </div>
                        <div class="fog-state-item">
                            <span class="fog-color" style="background: rgba(255, 255, 0, 0.3)"></span>
                            <span>Reachable - Accessible</span>
                        </div>
                        <div class="fog-state-item">
                            <span class="fog-color" style="background: rgba(0, 255, 0, 0.1)"></span>
                            <span>Vision - Vu directement</span>
                        </div>
                        <div class="fog-state-item">
                            <span class="fog-color" style="background: rgba(255, 255, 255, 0.2)"></span>
                            <span>Ghost - Vu avec Voile</span>
                        </div>
                        <div class="fog-state-item">
                            <span class="fog-color" style="background: rgba(128, 0, 255, 0.4)"></span>
                            <span>Superposed - Flux quantique</span>
                        </div>
                        <div class="fog-state-item">
                            <span class="fog-color" style="background: rgba(0, 0, 255, 0.3)"></span>
                            <span>Anchored - Bloque branchement</span>
                        </div>
                    </div>
                </div>
                
                <div class="fog-opacity">
                    <label>Opacité: <span id="opacity-value">80%</span></label>
                    <input type="range" id="fog-opacity-slider" min="10" max="100" value="80">
                </div>
            </div>
        `;
        
        // Ajouter les event listeners
        this.setupFogEventListeners(controls);
        
        return controls;
    }
    
    // 🎮 CONFIGURER LES EVENT LISTENERS
    setupFogEventListeners(controls) {
        // Sélection de timeline
        const timelineSelect = controls.querySelector('#timeline-select');
        timelineSelect.addEventListener('change', (e) => {
            this.selectTimeline(e.target.value);
        });
        
        // Toggles de visibilité des timelines
        const timelineToggles = controls.querySelectorAll('.timeline-toggles input');
        timelineToggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.toggleTimelineVisibility(e.target.value);
            });
        });
        
        // Slider d'opacité
        const opacitySlider = controls.querySelector('#fog-opacity-slider');
        const opacityValue = controls.querySelector('#opacity-value');
        opacitySlider.addEventListener('input', (e) => {
            this.fogOpacity = e.target.value / 100;
            opacityValue.textContent = `${e.target.value}%`;
            this.updateVisibility();
        });
        
        // Toggles des types de brouillard
        const fogTypeToggles = controls.querySelectorAll('.fog-type-toggles input');
        fogTypeToggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.toggleFogType(e.target.value, e.target.checked);
            });
        });
    }
    
    // 🔄 TOGGLE TYPE DE BROUILLARD
    toggleFogType(fogType, enabled) {
        if (enabled) {
            // Activer le type de brouillard
            console.log(`Brouillard ${fogType} activé`);
        } else {
            // Désactiver le type de brouillard
            console.log(`Brouillard ${fogType} désactivé`);
        }
        this.updateVisibility();
    }
}

// 🌍 EXPORT POUR UTILISATION GLOBALE
window.FogOfWarSystem = FogOfWarSystem; 