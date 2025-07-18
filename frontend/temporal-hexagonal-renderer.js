// temporal-hexagonal-renderer.js - Renderer Hexagonal Temporel Révolutionnaire
// Intégration des spécifications UTMD, Collapse Causale et Visualisation Temporelle

class TemporalHexagonalRenderer extends GameRenderer {
    constructor(canvasId) {
        super(canvasId);
        
        // Extensions temporelles
        this.temporalLayers = new Map();
        this.heroTimelines = new Map();
        this.observationZones = new Set();
        this.anchorZones = new Set();
        this.ghostStates = new Map();
        this.causalCollisions = new Map();
        this.artifactEffects = new Map();
        
        // Configuration visuelle temporelle
        this.timeLayerColors = {
            day0: { halo: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.3)' },
            day1: { halo: 'rgba(255, 255, 0, 0.2)', border: 'rgba(255, 255, 0, 0.5)' },
            day2: { halo: 'rgba(255, 165, 0, 0.25)', border: 'rgba(255, 165, 0, 0.6)' },
            day3: { halo: 'rgba(255, 69, 0, 0.3)', border: 'rgba(255, 69, 0, 0.7)' },
            ghost: { halo: 'rgba(128, 0, 128, 0.15)', border: 'rgba(128, 0, 128, 0.4)' },
            anchor: { halo: 'rgba(255, 215, 0, 0.4)', border: 'rgba(255, 215, 0, 0.8)' },
            observation: { halo: 'rgba(0, 255, 255, 0.2)', border: 'rgba(0, 255, 255, 0.6)' },
            collision: { halo: 'rgba(255, 0, 0, 0.4)', border: 'rgba(255, 0, 0, 0.9)' }
        };
        
        // État UTMD
        this.selectedHero = null;
        this.showTemporalPreview = false;
        this.previewPath = [];
        this.temporalSlider = null;
        
        this.initializeTemporalSystem();
    }
    
    initializeTemporalSystem() {
        // Créer l'interface temporelle
        this.createTemporalUI();
        
        // Écouteurs d'événements temporels
        this.setupTemporalEventListeners();
        
        // Démarrer la boucle de mise à jour temporelle
        this.startTemporalLoop();
    }
    
    createTemporalUI() {
        // Créer panneau temporel
        const temporalPanel = document.createElement('div');
        temporalPanel.id = 'temporal-panel';
        temporalPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            border: 2px solid rgba(78, 205, 196, 0.5);
            z-index: 1000;
            font-family: 'Courier New', monospace;
            min-width: 250px;
        `;
        
        temporalPanel.innerHTML = `
            <h3>🕰️ Système Temporel UTMD</h3>
            <div id="hero-timeline-info">
                <div>Héros sélectionné: <span id="selected-hero">Aucun</span></div>
                <div>Jour actuel: <span id="current-day">0</span></div>
                <div>Points de mouvement: <span id="movement-points">0</span></div>
            </div>
            <div id="temporal-controls">
                <button id="show-temporal-preview">👁️ Aperçu Temporel</button>
                <button id="anchor-mode">⚓ Mode Ancrage</button>
                <button id="observation-mode">🔍 Mode Observation</button>
            </div>
            <div id="artifact-panel">
                <h4>⚡ Artefacts Temporels</h4>
                <div id="artifact-list"></div>
            </div>
        `;
        
        document.body.appendChild(temporalPanel);
        
        // Créer panneau d'informations causales
        const causalPanel = document.createElement('div');
        causalPanel.id = 'causal-panel';
        causalPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            border: 2px solid rgba(255, 0, 255, 0.5);
            z-index: 1000;
            font-family: 'Courier New', monospace;
            min-width: 300px;
        `;
        
        causalPanel.innerHTML = `
            <h3>🌀 Analyse Causale</h3>
            <div id="causal-status">
                <div>États quantiques actifs: <span id="active-psi-count">0</span></div>
                <div>Collisions détectées: <span id="collision-count">0</span></div>
                <div>Zones d'observation: <span id="observation-count">0</span></div>
            </div>
            <div id="collapse-log"></div>
        `;
        
        document.body.appendChild(causalPanel);
    }
    
    setupTemporalEventListeners() {
        // Aperçu temporel
        document.getElementById('show-temporal-preview').addEventListener('click', () => {
            this.showTemporalPreview = !this.showTemporalPreview;
            this.updateTemporalPreview();
        });
        
        // Mode ancrage
        document.getElementById('anchor-mode').addEventListener('click', () => {
            this.toggleAnchorMode();
        });
        
        // Mode observation
        document.getElementById('observation-mode').addEventListener('click', () => {
            this.toggleObservationMode();
        });
        
        // Sélection de héros par clic
        this.canvas.addEventListener('click', (e) => {
            const hex = this.getHexAtPosition(e);
            if (hex && this.gameState.heroes) {
                const hero = this.gameState.heroes.find(h => h.position.x === hex.q && h.position.y === hex.r);
                if (hero) {
                    this.selectHero(hero);
                }
            }
        });
    }
    
    startTemporalLoop() {
        setInterval(() => {
            this.updateTemporalState();
            this.processTemporalEvents();
        }, 100);
    }
    
    // ========================
    // SYSTÈME UTMD - JOURS FUTURS
    // ========================
    
    calculateTemporalReach(hero, maxDays = 3) {
        const reachableZones = new Map();
        const currentPos = { q: hero.position.x, r: hero.position.y };
        const movementPerDay = hero.movementPointsPerDay || 4;
        
        for (let day = 0; day <= maxDays; day++) {
            const dayZones = this.calculateReachableInDays(currentPos, movementPerDay * day);
            dayZones.forEach(zone => {
                if (!reachableZones.has(`${zone.q},${zone.r}`)) {
                    reachableZones.set(`${zone.q},${zone.r}`, {
                        ...zone,
                        day: day,
                        temporalCost: day
                    });
                }
            });
        }
        
        return reachableZones;
    }
    
    calculateReachableInDays(startPos, totalMovement) {
        const reachable = [];
        const visited = new Set();
        const queue = [{ ...startPos, cost: 0 }];
        
        while (queue.length > 0) {
            const current = queue.shift();
            const key = `${current.q},${current.r}`;
            
            if (visited.has(key)) continue;
            visited.add(key);
            
            if (current.cost <= totalMovement) {
                reachable.push(current);
                
                // Ajouter les voisins hexagonaux
                const neighbors = this.getHexNeighbors(current.q, current.r);
                neighbors.forEach(neighbor => {
                    const moveCost = this.getMovementCost(neighbor.q, neighbor.r);
                    if (current.cost + moveCost <= totalMovement) {
                        queue.push({
                            q: neighbor.q,
                            r: neighbor.r,
                            cost: current.cost + moveCost
                        });
                    }
                });
            }
        }
        
        return reachable;
    }
    
    getMovementCost(q, r) {
        // Coût de mouvement basé sur le terrain
        const tile = this.gameState.tiles?.find(t => t.x === q && t.y === r);
        if (!tile) return 1;
        
        const terrainCosts = {
            'grass': 1,
            'forest': 2,
            'mountain': 3,
            'water': 4,
            'swamp': 2
        };
        
        return terrainCosts[tile.terrain] || 1;
    }
    
    // ========================
    // VISUALISATION TEMPORELLE
    // ========================
    
    drawTemporalLayers() {
        if (!this.selectedHero || !this.showTemporalPreview) return;
        
        const temporalReach = this.calculateTemporalReach(this.selectedHero);
        
        // Dessiner les halos par jour
        temporalReach.forEach(zone => {
            const dayKey = `day${Math.min(zone.day, 3)}`;
            const colors = this.timeLayerColors[dayKey];
            
            // Dessiner le halo
            this.drawTemporalHalo(zone.q, zone.r, colors.halo, zone.day);
            
            // Dessiner la bordure
            this.drawHex(zone.q, zone.r, null, colors.border);
        });
        
        // Dessiner les indicateurs de jour
        this.drawTemporalIndicators(temporalReach);
    }
    
    drawTemporalHalo(q, r, color, day) {
        const { x, y } = this.hexToPixel(q, r);
        const radius = this.hexSize + (day * 5);
        
        // Gradient radial pour le halo
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.7, color.replace(/[\d.]+\)$/g, '0.05)'));
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawTemporalIndicators(temporalReach) {
        temporalReach.forEach(zone => {
            if (zone.day > 0) {
                const { x, y } = this.hexToPixel(zone.q, zone.r);
                
                // Dessiner l'indicateur de jour
                this.ctx.fillStyle = this.timeLayerColors[`day${Math.min(zone.day, 3)}`].border;
                this.ctx.font = 'bold 12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(`J${zone.day}`, x, y - this.hexSize + 8);
            }
        });
    }
    
    // ========================
    // ÉTATS FANTÔMES ET SUPERPOSITIONS
    // ========================
    
    drawGhostStates() {
        this.ghostStates.forEach((ghostState, id) => {
            const { x, y } = this.hexToPixel(ghostState.q, ghostState.r);
            
            // Effet fantôme avec transparence
            this.ctx.save();
            this.ctx.globalAlpha = 0.3 + Math.sin(this.animationFrame * 0.05) * 0.1;
            
            // Dessiner le halo fantôme
            this.drawTemporalHalo(ghostState.q, ghostState.r, this.timeLayerColors.ghost.halo, 0);
            
            // Dessiner l'entité fantôme
            this.ctx.fillStyle = this.timeLayerColors.ghost.border;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.hexSize * 0.6, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Symbole ψ
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('ψ', x, y);
            
            this.ctx.restore();
        });
    }
    
    // ========================
    // ZONES D'ANCRAGE TEMPORAL
    // ========================
    
    drawAnchorZones() {
        this.anchorZones.forEach(zone => {
            const { x, y } = this.hexToPixel(zone.q, zone.r);
            
            // Effet d'ancrage doré
            const anchorRadius = this.hexSize * 1.5;
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, anchorRadius);
            gradient.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
            gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0.1)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, anchorRadius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Symbole d'ancrage
            this.ctx.strokeStyle = 'rgba(255, 215, 0, 0.9)';
            this.ctx.lineWidth = 3;
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
            this.ctx.fillText('⚓', x, y);
        });
    }
    
    // ========================
    // SYSTÈME D'OBSERVATION QUANTIQUE
    // ========================
    
    drawObservationZones() {
        this.observationZones.forEach(zone => {
            const { x, y } = this.hexToPixel(zone.q, zone.r);
            
            // Effet d'observation cyan
            const observationRadius = this.hexSize * 1.2;
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, observationRadius);
            gradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
            gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 255, 255, 0.05)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, observationRadius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Symbole d'observation
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
            this.ctx.font = 'bold 18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('👁️', x, y);
        });
    }
    
    // ========================
    // COLLISIONS CAUSALES VISUELLES
    // ========================
    
    drawCausalCollisions() {
        this.causalCollisions.forEach((collision, id) => {
            const { x, y } = this.hexToPixel(collision.q, collision.r);
            
            // Effet de collision dramatique
            const collisionRadius = this.hexSize * 2;
            const intensity = Math.sin(this.animationFrame * 0.1) * 0.5 + 0.5;
            
            // Onde de choc
            this.ctx.strokeStyle = `rgba(255, 0, 0, ${intensity})`;
            this.ctx.lineWidth = 4;
            this.ctx.beginPath();
            this.ctx.arc(x, y, collisionRadius * intensity, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Centre de collision
            this.ctx.fillStyle = `rgba(255, 0, 0, ${0.7 + intensity * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.hexSize * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Symbole de collision
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('💥', x, y);
        });
    }
    
    // ========================
    // ARTEFACTS TEMPORELS
    // ========================
    
    drawTemporalArtifacts() {
        this.artifactEffects.forEach((artifact, id) => {
            const { x, y } = this.hexToPixel(artifact.q, artifact.r);
            
            // Effet spécifique selon l'artefact
            switch (artifact.type) {
                case 'veil':
                    this.drawVeilEffect(x, y);
                    break;
                case 'anchor_tower':
                    this.drawAnchorTowerEffect(x, y);
                    break;
                case 'wigner_eye':
                    this.drawWignerEyeEffect(x, y);
                    break;
                case 'temporal_sword':
                    this.drawTemporalSwordEffect(x, y);
                    break;
            }
        });
    }
    
    drawVeilEffect(x, y) {
        // Effet de voile spectral
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, this.hexSize * 2);
        gradient.addColorStop(0, 'rgba(128, 0, 128, 0.1)');
        gradient.addColorStop(1, 'rgba(128, 0, 128, 0.3)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.hexSize * 2, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawAnchorTowerEffect(x, y) {
        // Effet de tour d'ancrage
        this.ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.rect(x - this.hexSize * 0.3, y - this.hexSize * 0.8, this.hexSize * 0.6, this.hexSize * 1.6);
        this.ctx.stroke();
        
        // Rayons d'ancrage
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const endX = x + Math.cos(angle) * this.hexSize * 1.5;
            const endY = y + Math.sin(angle) * this.hexSize * 1.5;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        }
    }
    
    // ========================
    // MÉTHODES PRINCIPALES
    // ========================
    
    render() {
        // Render de base
        super.render();
        
        // Couches temporelles
        this.drawTemporalLayers();
        this.drawGhostStates();
        this.drawAnchorZones();
        this.drawObservationZones();
        this.drawCausalCollisions();
        this.drawTemporalArtifacts();
        
        // Mise à jour des panneaux
        this.updateTemporalPanels();
    }
    
    updateTemporalPanels() {
        // Mise à jour du panneau temporel
        if (this.selectedHero) {
            document.getElementById('selected-hero').textContent = this.selectedHero.name;
            document.getElementById('current-day').textContent = this.selectedHero.currentDay || 0;
            document.getElementById('movement-points').textContent = this.selectedHero.movementPoints || 0;
        }
        
        // Mise à jour du panneau causal
        document.getElementById('active-psi-count').textContent = this.gameState.psiStates?.length || 0;
        document.getElementById('collision-count').textContent = this.causalCollisions.size;
        document.getElementById('observation-count').textContent = this.observationZones.size;
    }
    
    selectHero(hero) {
        this.selectedHero = hero;
        this.updateTemporalPreview();
    }
    
    updateTemporalPreview() {
        if (this.selectedHero && this.showTemporalPreview) {
            // Recalculer les zones temporelles
            const temporalReach = this.calculateTemporalReach(this.selectedHero);
            this.temporalLayers.set(this.selectedHero.id, temporalReach);
        }
    }
    
    // ========================
    // ÉVÉNEMENTS TEMPORELS
    // ========================
    
    updateTemporalState() {
        // Mise à jour des états temporels
        this.processGhostStates();
        this.detectCausalCollisions();
        this.updateObservationZones();
        this.processArtifactEffects();
    }
    
    processTemporalEvents() {
        // Traitement des événements temporels
        this.checkCollapses();
        this.updateTemporalAnimations();
    }
    
    processGhostStates() {
        // Traitement des états fantômes
        if (this.gameState.psiStates) {
            this.gameState.psiStates.forEach(psi => {
                if (psi.status === 'ACTIVE' && psi.targetX !== null && psi.targetY !== null) {
                    this.ghostStates.set(psi.psiId, {
                        q: psi.targetX,
                        r: psi.targetY,
                        probability: psi.probability
                    });
                }
            });
        }
    }
    
    detectCausalCollisions() {
        // Détection des collisions causales
        const positions = new Map();
        
        this.ghostStates.forEach((ghost, id) => {
            const key = `${ghost.q},${ghost.r}`;
            if (!positions.has(key)) {
                positions.set(key, []);
            }
            positions.get(key).push({ id, ...ghost });
        });
        
        positions.forEach((ghosts, key) => {
            if (ghosts.length > 1) {
                const [q, r] = key.split(',').map(n => parseInt(n));
                this.causalCollisions.set(key, { q, r, ghosts });
            }
        });
    }
    
    updateObservationZones() {
        // Mise à jour des zones d'observation
        if (this.gameState.heroes) {
            this.gameState.heroes.forEach(hero => {
                if (hero.hasObservationAbility) {
                    this.observationZones.add({
                        q: hero.position.x,
                        r: hero.position.y,
                        range: hero.observationRange || 2
                    });
                }
            });
        }
    }
    
    processArtifactEffects() {
        // Traitement des effets d'artefacts
        if (this.gameState.artifacts) {
            this.gameState.artifacts.forEach(artifact => {
                if (artifact.active) {
                    this.artifactEffects.set(artifact.id, {
                        q: artifact.position.x,
                        r: artifact.position.y,
                        type: artifact.type
                    });
                }
            });
        }
    }
    
    checkCollapses() {
        // Vérification des collapses
        // À implémenter selon les règles de collapse causale
    }
    
    updateTemporalAnimations() {
        // Mise à jour des animations temporelles
        this.animationFrame++;
    }
    
    // ========================
    // UTILITAIRES HEXAGONAUX
    // ========================
    
    getHexNeighbors(q, r) {
        const directions = [
            { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
            { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }
        ];
        
        return directions.map(dir => ({
            q: q + dir.q,
            r: r + dir.r
        }));
    }
    
    getHexAtPosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left - this.canvas.width / 2 - this.offsetX) / this.zoom;
        const y = (event.clientY - rect.top - this.canvas.height / 2 - this.offsetY) / this.zoom;
        
        return this.pixelToHex(x, y);
    }
    
    toggleAnchorMode() {
        // Basculer le mode ancrage
        this.anchorMode = !this.anchorMode;
        console.log('Mode ancrage:', this.anchorMode ? 'Activé' : 'Désactivé');
    }
    
    toggleObservationMode() {
        // Basculer le mode observation
        this.observationMode = !this.observationMode;
        console.log('Mode observation:', this.observationMode ? 'Activé' : 'Désactivé');
    }
} 