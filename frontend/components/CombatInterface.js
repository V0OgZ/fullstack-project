// ⚔️ INTERFACE DE COMBAT BASIQUE - Heroes of Time
// PRIORITÉ 2 : Combat = cœur du jeu HOMM3

class CombatInterface {
    constructor() {
        this.combatData = {
            isActive: false,
            currentTurn: 1,
            maxTurns: 50,
            gridSize: { width: 8, height: 6 },
            units: [],
            selectedUnit: null,
            validMoves: [],
            validTargets: [],
            initiative: []
        };
        
        this.hexSize = 40;
        this.hexWidth = this.hexSize * 2;
        this.hexHeight = this.hexSize * Math.sqrt(3);
        this.gameId = null;
        
        this.init();
    }
    
    async init() {
        await this.loadCombatData();
        this.createCombatUI();
        this.bindEvents();
        this.setupDemoCombat();
    }
    
    async loadCombatData() {
        try {
            // Charger les données depuis l'API backend
            const response = await fetch(`http://localhost:8080/api/temporal/combat/data`);
            if (response.ok) {
                const data = await response.json();
                this.combatData = { ...this.combatData, ...data };
            }
        } catch (error) {
            console.log('Erreur chargement données combat, utilisation données par défaut:', error);
        }
    }
    
    async saveCombatData() {
        try {
            const response = await fetch(`http://localhost:8080/api/temporal/combat/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.combatData)
            });
            
            if (response.ok) {
                console.log('✅ Données combat sauvegardées');
            } else {
                console.error('❌ Erreur sauvegarde combat');
            }
        } catch (error) {
            console.error('Erreur sauvegarde combat:', error);
        }
    }
    
    createCombatUI() {
        // Créer le conteneur principal
        const combatContainer = document.createElement('div');
        combatContainer.id = 'combat-interface';
        combatContainer.className = 'combat-interface';
        combatContainer.style.display = 'none';
        
        combatContainer.innerHTML = `
            <div class="combat-header">
                <h2>⚔️ Combat</h2>
                <div class="combat-info">
                    <span class="turn-counter">Tour ${this.combatData.currentTurn}/${this.combatData.maxTurns}</span>
                    <span class="initiative-display" id="initiative-display">Initiative: -</span>
                </div>
                <button class="close-combat-btn" onclick="combatInterface.hide()">×</button>
            </div>
            
            <div class="combat-content">
                <div class="combat-grid-container">
                    <canvas id="combat-grid" width="640" height="480"></canvas>
                    <div class="combat-overlay" id="combat-overlay"></div>
                </div>
                
                <div class="combat-sidebar">
                    <div class="unit-info-panel">
                        <h3>👤 Informations Unité</h3>
                        <div id="unit-info" class="unit-info">
                            <p>Sélectionnez une unité</p>
                        </div>
                    </div>
                    
                    <div class="combat-actions">
                        <h3>⚔️ Actions</h3>
                        <div class="action-buttons">
                            <button id="move-btn" class="action-btn" onclick="combatInterface.startMove()">
                                🚶 Déplacer
                            </button>
                            <button id="attack-btn" class="action-btn" onclick="combatInterface.startAttack()">
                                ⚔️ Attaquer
                            </button>
                            <button id="wait-btn" class="action-btn" onclick="combatInterface.wait()">
                                ⏸️ Attendre
                            </button>
                            <button id="defend-btn" class="action-btn" onclick="combatInterface.defend()">
                                🛡️ Défendre
                            </button>
                        </div>
                    </div>
                    
                    <div class="combat-log">
                        <h3>📜 Journal de Combat</h3>
                        <div id="combat-log-content" class="log-content">
                            <div class="log-entry">Combat commencé</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="combat-footer">
                <button class="combat-btn primary" onclick="combatInterface.nextTurn()">
                    ⏰ Tour Suivant
                </button>
                <button class="combat-btn secondary" onclick="combatInterface.autoResolve()">
                    🎲 Résolution Auto
                </button>
                <button class="combat-btn warning" onclick="combatInterface.surrender()">
                    🏳️ Se Rendre
                </button>
            </div>
        `;
        
        document.body.appendChild(combatContainer);
        this.container = combatContainer;
        this.canvas = document.getElementById('combat-grid');
        this.ctx = this.canvas.getContext('2d');
    }
    
    bindEvents() {
        // Gestion des clics sur la grille
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.handleGridClick(x, y);
        });
        
        // Gestion des touches
        document.addEventListener('keydown', (e) => {
            if (!this.combatData.isActive) return;
            
            switch(e.key) {
                case 'Escape':
                    this.clearSelection();
                    break;
                case 'Enter':
                    this.nextTurn();
                    break;
                case 'm':
                case 'M':
                    this.startMove();
                    break;
                case 'a':
                case 'A':
                    this.startAttack();
                    break;
            }
        });
    }
    
    setupDemoCombat() {
        // Créer des unités de démonstration
        this.combatData.units = [
            {
                id: 1,
                name: "Chevalier",
                type: "cavalry",
                team: "player",
                x: 2,
                y: 2,
                hp: 100,
                maxHp: 100,
                attack: 25,
                defense: 15,
                speed: 6,
                initiative: 8,
                hasMoved: false,
                hasAttacked: false
            },
            {
                id: 2,
                name: "Archer",
                type: "ranged",
                team: "player",
                x: 1,
                y: 3,
                hp: 60,
                maxHp: 60,
                attack: 20,
                defense: 8,
                speed: 4,
                initiative: 10,
                hasMoved: false,
                hasAttacked: false
            },
            {
                id: 3,
                name: "Gobelin",
                type: "infantry",
                team: "enemy",
                x: 5,
                y: 3,
                hp: 40,
                maxHp: 40,
                attack: 15,
                defense: 5,
                speed: 5,
                initiative: 12,
                hasMoved: false,
                hasAttacked: false
            },
            {
                id: 4,
                name: "Orc",
                type: "infantry",
                team: "enemy",
                x: 6,
                y: 2,
                hp: 80,
                maxHp: 80,
                attack: 30,
                defense: 12,
                speed: 4,
                initiative: 6,
                hasMoved: false,
                hasAttacked: false
            }
        ];
        
        this.updateInitiative();
        this.renderCombatGrid();
    }
    
    show() {
        this.combatData.isActive = true;
        this.container.style.display = 'flex';
        this.renderCombatGrid();
        this.updateDisplay();
        console.log('⚔️ Interface de combat ouverte');
    }
    
    hide() {
        this.combatData.isActive = false;
        this.container.style.display = 'none';
        this.clearSelection();
        console.log('⚔️ Interface de combat fermée');
    }
    
    toggle() {
        if (this.combatData.isActive) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    renderCombatGrid() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner la grille hexagonale
        for (let row = 0; row < this.combatData.gridSize.height; row++) {
            for (let col = 0; col < this.combatData.gridSize.width; col++) {
                this.drawHexagon(col, row);
            }
        }
        
        // Dessiner les unités
        this.combatData.units.forEach(unit => {
            this.drawUnit(unit);
        });
        
        // Dessiner les cases valides
        this.drawValidMoves();
        this.drawValidTargets();
    }
    
    drawHexagon(col, row) {
        const x = col * this.hexWidth * 0.75 + this.hexWidth / 2;
        const y = row * this.hexHeight + (col % 2) * this.hexHeight / 2 + this.hexHeight / 2;
        
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const hexX = x + this.hexSize * Math.cos(angle);
            const hexY = y + this.hexSize * Math.sin(angle);
            
            if (i === 0) {
                this.ctx.moveTo(hexX, hexY);
            } else {
                this.ctx.lineTo(hexX, hexY);
            }
        }
        this.ctx.closePath();
        
        // Couleur de base
        this.ctx.fillStyle = 'rgba(78, 205, 196, 0.1)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(78, 205, 196, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        // Stocker les coordonnées pour les clics
        if (!this.hexCoords) this.hexCoords = {};
        this.hexCoords[`${col},${row}`] = { x, y, col, row };
    }
    
    drawUnit(unit) {
        const hex = this.hexCoords[`${unit.x},${unit.y}`];
        if (!hex) return;
        
        const x = hex.x;
        const y = hex.y;
        
        // Couleur selon l'équipe
        const color = unit.team === 'player' ? '#4ecdc4' : '#e74c3c';
        const bgColor = unit.team === 'player' ? 'rgba(78, 205, 196, 0.3)' : 'rgba(231, 76, 60, 0.3)';
        
        // Dessiner le fond de l'unité
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.hexSize * 0.8, 0, 2 * Math.PI);
        this.ctx.fillStyle = bgColor;
        this.ctx.fill();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Dessiner l'icône de l'unité
        this.ctx.fillStyle = color;
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const icons = {
            cavalry: '🐎',
            ranged: '🏹',
            infantry: '⚔️',
            magic: '🔮'
        };
        
        this.ctx.fillText(icons[unit.type] || '👤', x, y - 5);
        
        // Dessiner la barre de vie
        const healthPercent = unit.hp / unit.maxHp;
        const barWidth = this.hexSize * 1.2;
        const barHeight = 6;
        
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(x - barWidth/2, y + 15, barWidth, barHeight);
        
        this.ctx.fillStyle = '#27ae60';
        this.ctx.fillRect(x - barWidth/2, y + 15, barWidth * healthPercent, barHeight);
        
        // Bordure de la barre
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x - barWidth/2, y + 15, barWidth, barHeight);
        
        // Sélection
        if (this.combatData.selectedUnit && this.combatData.selectedUnit.id === unit.id) {
            this.ctx.strokeStyle = '#f39c12';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
    }
    
    drawValidMoves() {
        if (!this.combatData.selectedUnit) return;
        
        this.combatData.validMoves.forEach(pos => {
            const hex = this.hexCoords[`${pos.x},${pos.y}`];
            if (!hex) return;
            
            this.ctx.beginPath();
            this.ctx.arc(hex.x, hex.y, this.hexSize * 0.6, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgba(39, 174, 96, 0.3)';
            this.ctx.fill();
            this.ctx.strokeStyle = '#27ae60';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }
    
    drawValidTargets() {
        if (!this.combatData.selectedUnit) return;
        
        this.combatData.validTargets.forEach(pos => {
            const hex = this.hexCoords[`${pos.x},${pos.y}`];
            if (!hex) return;
            
            this.ctx.beginPath();
            this.ctx.arc(hex.x, hex.y, this.hexSize * 0.6, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
            this.ctx.fill();
            this.ctx.strokeStyle = '#e74c3c';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }
    
    handleGridClick(x, y) {
        // Trouver la case hexagonale cliquée
        const clickedHex = this.findHexAtPosition(x, y);
        if (!clickedHex) return;
        
        // Vérifier s'il y a une unité à cette position
        const unit = this.getUnitAt(clickedHex.col, clickedHex.row);
        
        if (unit) {
            this.selectUnit(unit);
        } else if (this.combatData.selectedUnit) {
            // Vérifier si c'est un mouvement valide
            if (this.isValidMove(clickedHex.col, clickedHex.row)) {
                this.moveUnit(this.combatData.selectedUnit, clickedHex.col, clickedHex.row);
            } else if (this.isValidTarget(clickedHex.col, clickedHex.row)) {
                const targetUnit = this.getUnitAt(clickedHex.col, clickedHex.row);
                if (targetUnit) {
                    this.attackUnit(this.combatData.selectedUnit, targetUnit);
                }
            }
        }
    }
    
    findHexAtPosition(mouseX, mouseY) {
        for (const [key, hex] of Object.entries(this.hexCoords)) {
            const distance = Math.sqrt(
                Math.pow(mouseX - hex.x, 2) + Math.pow(mouseY - hex.y, 2)
            );
            if (distance <= this.hexSize) {
                return hex;
            }
        }
        return null;
    }
    
    getUnitAt(x, y) {
        return this.combatData.units.find(unit => unit.x === x && unit.y === y);
    }
    
    selectUnit(unit) {
        this.combatData.selectedUnit = unit;
        this.updateUnitInfo(unit);
        this.calculateValidMoves(unit);
        this.calculateValidTargets(unit);
        this.renderCombatGrid();
        
        console.log(`⚔️ Unité sélectionnée: ${unit.name}`);
    }
    
    clearSelection() {
        this.combatData.selectedUnit = null;
        this.combatData.validMoves = [];
        this.combatData.validTargets = [];
        this.updateUnitInfo(null);
        this.renderCombatGrid();
    }
    
    calculateValidMoves(unit) {
        if (unit.hasMoved) {
            this.combatData.validMoves = [];
            return;
        }
        
        this.combatData.validMoves = [];
        const range = unit.speed;
        
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const newX = unit.x + dx;
                const newY = unit.y + dy;
                
                if (this.isValidPosition(newX, newY) && 
                    !this.getUnitAt(newX, newY) &&
                    Math.abs(dx) + Math.abs(dy) <= range) {
                    this.combatData.validMoves.push({ x: newX, y: newY });
                }
            }
        }
    }
    
    calculateValidTargets(unit) {
        this.combatData.validTargets = [];
        const range = unit.type === 'ranged' ? 3 : 1;
        
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const targetX = unit.x + dx;
                const targetY = unit.y + dy;
                
                const targetUnit = this.getUnitAt(targetX, targetY);
                if (targetUnit && targetUnit.team !== unit.team) {
                    this.combatData.validTargets.push({ x: targetX, y: targetY });
                }
            }
        }
    }
    
    isValidPosition(x, y) {
        return x >= 0 && x < this.combatData.gridSize.width &&
               y >= 0 && y < this.combatData.gridSize.height;
    }
    
    isValidMove(x, y) {
        return this.combatData.validMoves.some(pos => pos.x === x && pos.y === y);
    }
    
    isValidTarget(x, y) {
        return this.combatData.validTargets.some(pos => pos.x === x && pos.y === y);
    }
    
    moveUnit(unit, newX, newY) {
        unit.x = newX;
        unit.y = newY;
        unit.hasMoved = true;
        
        this.addLogEntry(`${unit.name} se déplace vers (${newX}, ${newY})`);
        this.clearSelection();
        this.renderCombatGrid();
    }
    
    attackUnit(attacker, target) {
        // Calcul des dégâts
        const baseDamage = attacker.attack - target.defense;
        const damage = Math.max(1, Math.floor(baseDamage * (0.8 + Math.random() * 0.4)));
        
        target.hp = Math.max(0, target.hp - damage);
        attacker.hasAttacked = true;
        
        this.addLogEntry(`${attacker.name} attaque ${target.name} pour ${damage} dégâts`);
        
        if (target.hp <= 0) {
            this.removeUnit(target);
            this.addLogEntry(`${target.name} est vaincu !`);
        }
        
        this.clearSelection();
        this.renderCombatGrid();
        this.updateDisplay();
    }
    
    removeUnit(unit) {
        this.combatData.units = this.combatData.units.filter(u => u.id !== unit.id);
    }
    
    startMove() {
        if (!this.combatData.selectedUnit) return;
        // Le mouvement se fait en cliquant sur la grille
        this.addLogEntry('Mode déplacement activé');
    }
    
    startAttack() {
        if (!this.combatData.selectedUnit) return;
        // L'attaque se fait en cliquant sur la grille
        this.addLogEntry('Mode attaque activé');
    }
    
    wait() {
        if (!this.combatData.selectedUnit) return;
        
        const unit = this.combatData.selectedUnit;
        unit.hasMoved = true;
        unit.hasAttacked = true;
        
        this.addLogEntry(`${unit.name} attend`);
        this.clearSelection();
    }
    
    defend() {
        if (!this.combatData.selectedUnit) return;
        
        const unit = this.combatData.selectedUnit;
        unit.hasMoved = true;
        unit.hasAttacked = true;
        unit.defense += 5; // Bonus temporaire
        
        this.addLogEntry(`${unit.name} se met en position défensive`);
        this.clearSelection();
    }
    
    nextTurn() {
        this.combatData.currentTurn++;
        
        // Réinitialiser les actions des unités
        this.combatData.units.forEach(unit => {
            unit.hasMoved = false;
            unit.hasAttacked = false;
            if (unit.defense > 15) unit.defense = 15; // Reset bonus défense
        });
        
        this.updateInitiative();
        this.clearSelection();
        this.addLogEntry(`Tour ${this.combatData.currentTurn} commencé`);
        this.updateDisplay();
        
        // Vérifier la fin du combat
        this.checkCombatEnd();
    }
    
    updateInitiative() {
        this.combatData.initiative = [...this.combatData.units]
            .sort((a, b) => b.initiative - a.initiative);
        
        const nextUnit = this.combatData.initiative[0];
        if (nextUnit) {
            document.getElementById('initiative-display').textContent = 
                `Prochain: ${nextUnit.name} (${nextUnit.team === 'player' ? 'Allié' : 'Ennemi'})`;
        }
    }
    
    checkCombatEnd() {
        const playerUnits = this.combatData.units.filter(u => u.team === 'player');
        const enemyUnits = this.combatData.units.filter(u => u.team === 'enemy');
        
        if (playerUnits.length === 0) {
            this.endCombat('defeat');
        } else if (enemyUnits.length === 0) {
            this.endCombat('victory');
        } else if (this.combatData.currentTurn >= this.combatData.maxTurns) {
            this.endCombat('draw');
        }
    }
    
    endCombat(result) {
        this.addLogEntry(`Combat terminé: ${result === 'victory' ? 'Victoire !' : result === 'defeat' ? 'Défaite !' : 'Match nul'}`);
        
        setTimeout(() => {
            this.hide();
            // Ici on pourrait retourner au jeu principal avec les résultats
        }, 2000);
    }
    
    autoResolve() {
        this.addLogEntry('Résolution automatique du combat...');
        // Logique simple de résolution automatique
        setTimeout(() => {
            this.endCombat('victory');
        }, 1000);
    }
    
    surrender() {
        this.addLogEntry('Vous vous rendez...');
        setTimeout(() => {
            this.endCombat('defeat');
        }, 1000);
    }
    
    updateUnitInfo(unit) {
        const unitInfo = document.getElementById('unit-info');
        
        if (!unit) {
            unitInfo.innerHTML = '<p>Sélectionnez une unité</p>';
            return;
        }
        
        unitInfo.innerHTML = `
            <div class="unit-details">
                <h4>${unit.name}</h4>
                <div class="unit-stats">
                    <div class="stat">
                        <span class="stat-label">HP:</span>
                        <span class="stat-value">${unit.hp}/${unit.maxHp}</span>
                        <div class="health-bar">
                            <div class="health-fill" style="width: ${(unit.hp / unit.maxHp) * 100}%"></div>
                        </div>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Attaque:</span>
                        <span class="stat-value">${unit.attack}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Défense:</span>
                        <span class="stat-value">${unit.defense}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Vitesse:</span>
                        <span class="stat-value">${unit.speed}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Initiative:</span>
                        <span class="stat-value">${unit.initiative}</span>
                    </div>
                </div>
                <div class="unit-status">
                    <span class="status ${unit.hasMoved ? 'used' : 'available'}">Mouvement: ${unit.hasMoved ? 'Utilisé' : 'Disponible'}</span>
                    <span class="status ${unit.hasAttacked ? 'used' : 'available'}">Attaque: ${unit.hasAttacked ? 'Utilisée' : 'Disponible'}</span>
                </div>
            </div>
        `;
    }
    
    addLogEntry(message) {
        const logContent = document.getElementById('combat-log-content');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `[Tour ${this.combatData.currentTurn}] ${message}`;
        
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;
        
        // Limiter à 20 entrées
        while (logContent.children.length > 20) {
            logContent.removeChild(logContent.firstChild);
        }
    }
    
    updateDisplay() {
        document.querySelector('.turn-counter').textContent = 
            `Tour ${this.combatData.currentTurn}/${this.combatData.maxTurns}`;
    }
    
    // Méthodes pour l'intégration avec le jeu principal
    startCombat(playerUnits, enemyUnits) {
        this.combatData.units = [...playerUnits, ...enemyUnits];
        this.combatData.currentTurn = 1;
        this.updateInitiative();
        this.show();
    }
    
    getCombatResult() {
        const playerUnits = this.combatData.units.filter(u => u.team === 'player');
        const enemyUnits = this.combatData.units.filter(u => u.team === 'enemy');
        
        if (playerUnits.length === 0) return 'defeat';
        if (enemyUnits.length === 0) return 'victory';
        return 'ongoing';
    }
}

// 🌍 EXPORT POUR UTILISATION GLOBALE
window.CombatInterface = CombatInterface; 