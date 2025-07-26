/**
 * ⚔️ INTERFACE DE COMBAT - Heroes of Time
 * 
 * Version simple pour mode IA et démos
 * Grille hexagonale 8x6
 */

class CombatInterface {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.hexGrid = [];
        this.units = [];
        this.selectedUnit = null;
        this.currentTurn = 'player';
        
        // Configuration hexagones
        this.hexSize = 40;
        this.gridWidth = 8;
        this.gridHeight = 6;
        
        // État du combat
        this.turnOrder = [];
        this.currentUnitIndex = 0;
        
        this.init();
    }
    
    init() {
        // Créer le canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.style.border = '2px solid #4a7c7e';
        this.canvas.style.borderRadius = '10px';
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        
        // Créer l'interface de contrôle
        this.createControls();
        
        // Initialiser la grille hexagonale
        this.initHexGrid();
        
        // Événements
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Charger les unités de test
        this.loadTestUnits();
        
        // Dessiner initial
        this.draw();
    }
    
    createControls() {
        const controls = document.createElement('div');
        controls.className = 'combat-controls';
        controls.innerHTML = `
            <div class="turn-indicator">
                <h3>Tour: <span id="current-turn">Joueur</span></h3>
            </div>
            <div class="unit-info" id="unit-info">
                <p>Sélectionnez une unité</p>
            </div>
            <div class="action-buttons">
                <button onclick="combat.endTurn()">⏭️ Fin de Tour</button>
                <button onclick="combat.useAbility(1)">🔥 Capacité 1</button>
                <button onclick="combat.useAbility(2)">⚡ Capacité 2</button>
            </div>
            <div class="combat-log" id="combat-log">
                <h4>Journal de Combat</h4>
                <div id="log-content"></div>
            </div>
        `;
        
        this.container.appendChild(controls);
    }
    
    initHexGrid() {
        // Créer la grille hexagonale
        for (let row = 0; row < this.gridHeight; row++) {
            this.hexGrid[row] = [];
            for (let col = 0; col < this.gridWidth; col++) {
                const hex = {
                    row: row,
                    col: col,
                    x: this.getHexX(col, row),
                    y: this.getHexY(row),
                    occupied: false,
                    highlighted: false,
                    inRange: false
                };
                this.hexGrid[row][col] = hex;
            }
        }
    }
    
    getHexX(col, row) {
        const offset = row % 2 === 0 ? 0 : this.hexSize * 0.866;
        return 60 + col * this.hexSize * 1.732 + offset;
    }
    
    getHexY(row) {
        return 60 + row * this.hexSize * 1.5;
    }
    
    loadTestUnits() {
        // Unités du joueur
        this.addUnit({
            id: 'hero_1',
            name: 'Arthur',
            team: 'player',
            hp: 100,
            maxHp: 100,
            mp: 50,
            maxMp: 50,
            attack: 15,
            defense: 10,
            speed: 5,
            range: 3,
            position: { row: 2, col: 1 },
            icon: '⚔️',
            abilities: [
                { name: 'Frappe héroïque', damage: 25, mpCost: 10 },
                { name: 'Bouclier sacré', effect: 'defense+', mpCost: 15 }
            ]
        });
        
        this.addUnit({
            id: 'hero_2',
            name: 'Merlin',
            team: 'player',
            hp: 70,
            maxHp: 70,
            mp: 100,
            maxMp: 100,
            attack: 10,
            defense: 5,
            speed: 3,
            range: 5,
            position: { row: 3, col: 1 },
            icon: '🧙‍♂️',
            abilities: [
                { name: 'Boule de feu', damage: 30, mpCost: 20 },
                { name: 'Téléportation', effect: 'teleport', mpCost: 25 }
            ]
        });
        
        // Unités ennemies
        this.addUnit({
            id: 'enemy_1',
            name: 'Gobelin',
            team: 'enemy',
            hp: 50,
            maxHp: 50,
            mp: 0,
            maxMp: 0,
            attack: 10,
            defense: 5,
            speed: 4,
            range: 1,
            position: { row: 2, col: 6 },
            icon: '👺'
        });
        
        this.addUnit({
            id: 'enemy_2',
            name: 'Squelette',
            team: 'enemy',
            hp: 40,
            maxHp: 40,
            mp: 0,
            maxMp: 0,
            attack: 12,
            defense: 3,
            speed: 6,
            range: 2,
            position: { row: 3, col: 6 },
            icon: '💀'
        });
        
        // Initialiser l'ordre des tours
        this.calculateTurnOrder();
    }
    
    addUnit(unitData) {
        const unit = {
            ...unitData,
            moved: false,
            acted: false
        };
        
        this.units.push(unit);
        
        // Marquer l'hexagone comme occupé
        const hex = this.hexGrid[unit.position.row][unit.position.col];
        if (hex) {
            hex.occupied = true;
            hex.unit = unit;
        }
    }
    
    calculateTurnOrder() {
        // Trier par vitesse
        this.turnOrder = [...this.units].sort((a, b) => b.speed - a.speed);
    }
    
    draw() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner la grille
        this.drawHexGrid();
        
        // Dessiner les unités
        this.drawUnits();
        
        // Dessiner l'UI
        this.drawUI();
    }
    
    drawHexGrid() {
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                const hex = this.hexGrid[row][col];
                this.drawHex(hex);
            }
        }
    }
    
    drawHex(hex) {
        const x = hex.x;
        const y = hex.y;
        const size = this.hexSize;
        
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + size * Math.cos(angle);
            const hy = y + size * Math.sin(angle);
            
            if (i === 0) {
                this.ctx.moveTo(hx, hy);
            } else {
                this.ctx.lineTo(hx, hy);
            }
        }
        this.ctx.closePath();
        
        // Couleur selon l'état
        if (hex.highlighted) {
            this.ctx.fillStyle = 'rgba(74, 124, 126, 0.3)';
        } else if (hex.inRange) {
            this.ctx.fillStyle = 'rgba(199, 244, 100, 0.2)';
        } else {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        }
        
        this.ctx.fill();
        this.ctx.strokeStyle = '#4a7c7e';
        this.ctx.stroke();
    }
    
    drawUnits() {
        for (const unit of this.units) {
            this.drawUnit(unit);
        }
    }
    
    drawUnit(unit) {
        const hex = this.hexGrid[unit.position.row][unit.position.col];
        if (!hex) return;
        
        const x = hex.x;
        const y = hex.y;
        
        // Dessiner le cercle de l'unité
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, Math.PI * 2);
        this.ctx.fillStyle = unit.team === 'player' ? '#4a7c7e' : '#c44569';
        this.ctx.fill();
        
        if (unit === this.selectedUnit) {
            this.ctx.strokeStyle = '#c7f464';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
        
        // Dessiner l'icône
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(unit.icon, x, y);
        
        // Barre de vie
        const barWidth = 40;
        const barHeight = 6;
        const barY = y + 30;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(x - barWidth/2, barY, barWidth, barHeight);
        
        const hpPercent = unit.hp / unit.maxHp;
        this.ctx.fillStyle = hpPercent > 0.5 ? '#4a7c7e' : 
                            hpPercent > 0.25 ? '#f39c12' : '#e74c3c';
        this.ctx.fillRect(x - barWidth/2, barY, barWidth * hpPercent, barHeight);
    }
    
    drawUI() {
        // Indicateur de tour actuel
        const currentUnit = this.turnOrder[this.currentUnitIndex];
        if (currentUnit) {
            const turnText = document.getElementById('current-turn');
            if (turnText) {
                turnText.textContent = currentUnit.name;
            }
        }
    }
    
    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Trouver l'hexagone cliqué
        const hex = this.getHexAtPosition(x, y);
        if (!hex) return;
        
        if (hex.occupied && hex.unit) {
            // Sélectionner l'unité
            this.selectUnit(hex.unit);
        } else if (this.selectedUnit && hex.inRange) {
            // Déplacer l'unité
            this.moveUnit(this.selectedUnit, hex);
        }
    }
    
    getHexAtPosition(x, y) {
        // Algorithme simple de détection d'hexagone
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                const hex = this.hexGrid[row][col];
                const dx = x - hex.x;
                const dy = y - hex.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.hexSize * 0.866) {
                    return hex;
                }
            }
        }
        return null;
    }
    
    selectUnit(unit) {
        this.selectedUnit = unit;
        this.highlightMovementRange(unit);
        this.updateUnitInfo(unit);
    }
    
    highlightMovementRange(unit) {
        // Réinitialiser
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                this.hexGrid[row][col].inRange = false;
            }
        }
        
        // Calculer la portée de mouvement
        const range = unit.speed;
        const start = unit.position;
        
        // Algorithme BFS pour trouver les hexagones accessibles
        const visited = new Set();
        const queue = [{...start, distance: 0}];
        
        while (queue.length > 0) {
            const current = queue.shift();
            const key = `${current.row},${current.col}`;
            
            if (visited.has(key) || current.distance > range) continue;
            visited.add(key);
            
            if (current.row >= 0 && current.row < this.gridHeight &&
                current.col >= 0 && current.col < this.gridWidth) {
                const hex = this.hexGrid[current.row][current.col];
                if (!hex.occupied || hex.unit === unit) {
                    hex.inRange = true;
                }
            }
            
            // Ajouter les voisins
            const neighbors = this.getHexNeighbors(current.row, current.col);
            for (const neighbor of neighbors) {
                queue.push({
                    row: neighbor.row,
                    col: neighbor.col,
                    distance: current.distance + 1
                });
            }
        }
        
        this.draw();
    }
    
    getHexNeighbors(row, col) {
        const neighbors = [];
        const offset = row % 2 === 0 ? -1 : 0;
        
        const directions = [
            { row: -1, col: offset },
            { row: -1, col: offset + 1 },
            { row: 0, col: -1 },
            { row: 0, col: 1 },
            { row: 1, col: offset },
            { row: 1, col: offset + 1 }
        ];
        
        for (const dir of directions) {
            const newRow = row + dir.row;
            const newCol = col + dir.col;
            
            if (newRow >= 0 && newRow < this.gridHeight &&
                newCol >= 0 && newCol < this.gridWidth) {
                neighbors.push({ row: newRow, col: newCol });
            }
        }
        
        return neighbors;
    }
    
    moveUnit(unit, targetHex) {
        // Libérer l'ancienne position
        const oldHex = this.hexGrid[unit.position.row][unit.position.col];
        oldHex.occupied = false;
        oldHex.unit = null;
        
        // Déplacer vers la nouvelle position
        unit.position = { row: targetHex.row, col: targetHex.col };
        targetHex.occupied = true;
        targetHex.unit = unit;
        
        unit.moved = true;
        
        // Log
        this.addCombatLog(`${unit.name} se déplace en ${targetHex.row},${targetHex.col}`);
        
        // Redessiner
        this.highlightMovementRange(unit);
        this.draw();
    }
    
    updateUnitInfo(unit) {
        const info = document.getElementById('unit-info');
        if (info) {
            info.innerHTML = `
                <h4>${unit.icon} ${unit.name}</h4>
                <p>HP: ${unit.hp}/${unit.maxHp}</p>
                <p>MP: ${unit.mp}/${unit.maxMp}</p>
                <p>ATK: ${unit.attack} | DEF: ${unit.defense}</p>
                <p>SPD: ${unit.speed} | RNG: ${unit.range}</p>
            `;
        }
    }
    
    endTurn() {
        // Passer au prochain dans l'ordre
        this.currentUnitIndex = (this.currentUnitIndex + 1) % this.turnOrder.length;
        
        // Réinitialiser les états
        for (const unit of this.units) {
            unit.moved = false;
            unit.acted = false;
        }
        
        this.selectedUnit = null;
        this.draw();
        
        // Si c'est un ennemi, jouer automatiquement
        const currentUnit = this.turnOrder[this.currentUnitIndex];
        if (currentUnit.team === 'enemy') {
            setTimeout(() => this.playAITurn(currentUnit), 1000);
        }
    }
    
    playAITurn(unit) {
        // IA simple - attaquer l'unité la plus proche
        const target = this.findNearestEnemy(unit);
        if (target) {
            this.addCombatLog(`${unit.name} attaque ${target.name} !`);
            this.attack(unit, target);
        }
        
        // Fin du tour automatique
        setTimeout(() => this.endTurn(), 1500);
    }
    
    findNearestEnemy(unit) {
        let nearest = null;
        let minDistance = Infinity;
        
        for (const other of this.units) {
            if (other.team !== unit.team && other.hp > 0) {
                const distance = Math.abs(other.position.row - unit.position.row) +
                                Math.abs(other.position.col - unit.position.col);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = other;
                }
            }
        }
        
        return nearest;
    }
    
    attack(attacker, target) {
        const damage = Math.max(1, attacker.attack - target.defense);
        target.hp = Math.max(0, target.hp - damage);
        
        this.addCombatLog(`${damage} points de dégâts !`);
        
        if (target.hp <= 0) {
            this.removeUnit(target);
            this.addCombatLog(`${target.name} est vaincu !`);
        }
        
        this.draw();
    }
    
    removeUnit(unit) {
        // Retirer de la grille
        const hex = this.hexGrid[unit.position.row][unit.position.col];
        if (hex) {
            hex.occupied = false;
            hex.unit = null;
        }
        
        // Retirer des listes
        this.units = this.units.filter(u => u !== unit);
        this.turnOrder = this.turnOrder.filter(u => u !== unit);
    }
    
    useAbility(abilityIndex) {
        if (!this.selectedUnit || this.selectedUnit.team !== 'player') {
            return;
        }
        
        const ability = this.selectedUnit.abilities?.[abilityIndex - 1];
        if (!ability) return;
        
        if (this.selectedUnit.mp < ability.mpCost) {
            this.addCombatLog("Pas assez de MP !");
            return;
        }
        
        this.selectedUnit.mp -= ability.mpCost;
        this.addCombatLog(`${this.selectedUnit.name} utilise ${ability.name} !`);
        
        // Effets simplifiés
        if (ability.damage) {
            const target = this.findNearestEnemy(this.selectedUnit);
            if (target) {
                target.hp = Math.max(0, target.hp - ability.damage);
                this.addCombatLog(`${ability.damage} points de dégâts magiques !`);
                
                if (target.hp <= 0) {
                    this.removeUnit(target);
                    this.addCombatLog(`${target.name} est vaincu !`);
                }
            }
        }
        
        this.draw();
    }
    
    addCombatLog(message) {
        const log = document.getElementById('log-content');
        if (log) {
            const entry = document.createElement('div');
            entry.textContent = `> ${message}`;
            entry.style.marginBottom = '5px';
            log.appendChild(entry);
            log.scrollTop = log.scrollHeight;
        }
    }
    
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Highlight hex sous la souris
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                this.hexGrid[row][col].highlighted = false;
            }
        }
        
        const hex = this.getHexAtPosition(x, y);
        if (hex) {
            hex.highlighted = true;
            this.draw();
        }
    }
}

// Instance globale pour faciliter les tests
let combat = null;

// Initialisation quand le DOM est prêt
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('combat-container')) {
            combat = new CombatInterface('combat-container');
        }
    });
} 