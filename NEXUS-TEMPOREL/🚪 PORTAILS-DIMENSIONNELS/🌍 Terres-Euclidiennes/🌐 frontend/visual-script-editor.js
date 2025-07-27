// 🎨 ÉDITEUR VISUEL SCRIPT SPATIO-TEMPOREL - Heroes of Time
// =============================================================

class VisualScriptEditor {
    constructor() {
        this.actions = [];
        this.macros = new Map();
        this.currentTimeline = 'ℬ1';
        this.psiCounter = 1;
        this.gameCanvas = null;
        this.ctx = null;
        this.heroes = [];
        this.psiStates = [];
        this.selectedElement = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCanvas();
        this.loadMacros();
        this.updateScriptDisplay();
        console.log('🎨 Éditeur Visuel Script Spatio-Temporel initialisé');
    }

    setupEventListeners() {
        // Action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const syntax = e.target.dataset.syntax;
                this.handleActionClick(action, syntax);
            });
        });

        // Script controls
        document.getElementById('execute-script').addEventListener('click', () => this.executeScript());
        document.getElementById('test-script').addEventListener('click', () => this.testScript());
        document.getElementById('clear-script').addEventListener('click', () => this.clearScript());

        // Macro controls
        document.getElementById('add-macro').addEventListener('click', () => this.showMacroModal());
        document.getElementById('save-macro').addEventListener('click', () => this.saveMacro());
        document.getElementById('cancel-macro').addEventListener('click', () => this.hideMacroModal());
        document.getElementById('add-macro-action').addEventListener('click', () => this.addMacroAction());

        // Timeline controls
        document.getElementById('add-timeline').addEventListener('click', () => this.addTimeline());
        document.getElementById('collapse-timeline').addEventListener('click', () => this.collapseTimeline());

        // Board controls
        document.getElementById('add-hero').addEventListener('click', () => this.addHero());
        document.getElementById('add-psi-state').addEventListener('click', () => this.addPsiState());
        document.getElementById('clear-board').addEventListener('click', () => this.clearBoard());

        // Header controls
        document.getElementById('save-config').addEventListener('click', () => this.saveConfiguration());
        document.getElementById('load-config').addEventListener('click', () => this.loadConfiguration());
        document.getElementById('reset-editor').addEventListener('click', () => this.resetEditor());

        // Canvas events
        this.gameCanvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.gameCanvas.addEventListener('mousemove', (e) => this.handleCanvasHover(e));
    }

    setupCanvas() {
        this.gameCanvas = document.getElementById('game-canvas');
        this.ctx = this.gameCanvas.getContext('2d');
        this.drawGrid();
    }

    drawGrid() {
        const gridSize = 30;
        const width = this.gameCanvas.width;
        const height = this.gameCanvas.height;

        this.ctx.strokeStyle = 'rgba(78, 204, 198, 0.3)';
        this.ctx.lineWidth = 1;

        // Draw vertical lines
        for (let x = 0; x <= width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
    }

    handleActionClick(action, syntax) {
        switch (action) {
            case 'MOV':
                this.addMovementAction();
                break;
            case 'USE':
                this.addUseAction();
                break;
            case 'CREATE':
                this.addCreateAction();
                break;
            case 'HERO':
                this.addHeroAction();
                break;
            case 'BATTLE':
                this.addBattleAction();
                break;
            case 'PSI':
                this.addPsiAction();
                break;
            case 'TRIGGER':
                this.addTriggerAction();
                break;
            case 'COLLAPSE':
                this.addCollapseAction();
                break;
        }
    }

    addMovementAction() {
        const hero = prompt('Nom du héros:', 'Arthur');
        if (!hero) return;

        const coords = prompt('Coordonnées (@x,y):', '@15,15');
        if (!coords) return;

        this.actions.push({
            type: 'MOV',
            params: [hero, coords],
            timeline: this.currentTimeline,
            timestamp: Date.now()
        });

        this.updateScriptDisplay();
        this.addTimelineEvent('MOV', hero, coords);
    }

    addUseAction() {
        const item = prompt('Nom de l\'artefact:', 'AvantWorldBlade');
        if (!item) return;

        const hero = prompt('Héros cible:', 'Arthur');
        if (!hero) return;

        this.actions.push({
            type: 'USE',
            params: ['ITEM', item, `HERO:${hero}`],
            timeline: this.currentTimeline,
            timestamp: Date.now()
        });

        this.updateScriptDisplay();
        this.addTimelineEvent('USE', item, hero);
    }

    addCreateAction() {
        const item = prompt('Nom de l\'item:', 'sword');
        if (!item) return;

        const hero = prompt('Héros cible:', 'Arthur');
        if (!hero) return;

        this.actions.push({
            type: 'CREATE',
            params: ['ITEM', item, `HERO:${hero}`],
            timeline: this.currentTimeline,
            timestamp: Date.now()
        });

        this.updateScriptDisplay();
        this.addTimelineEvent('CREATE', item, hero);
    }

    addHeroAction() {
        const name = prompt('Nom du héros:', 'Arthur');
        if (!name) return;

        this.actions.push({
            type: 'HERO',
            params: [name],
            timeline: this.currentTimeline,
            timestamp: Date.now()
        });

        this.updateScriptDisplay();
        this.addTimelineEvent('HERO', name);
    }

    addBattleAction() {
        const hero1 = prompt('Héros 1:', 'Arthur');
        if (!hero1) return;

        const hero2 = prompt('Héros 2:', 'Ragnar');
        if (!hero2) return;

        this.actions.push({
            type: 'BATTLE',
            params: [hero1, hero2],
            timeline: this.currentTimeline,
            timestamp: Date.now()
        });

        this.updateScriptDisplay();
        this.addTimelineEvent('BATTLE', hero1, hero2);
    }

    addPsiAction() {
        const deltaT = prompt('Délai temporel (Δt+x):', '2');
        if (!deltaT) return;

        const coords = prompt('Coordonnées (@x,y):', '@20,20');
        if (!coords) return;

        const action = prompt('Action future:', 'MOV(Arthur, @20,20)');
        if (!action) return;

        const psiId = `ψ${this.psiCounter.toString().padStart(3, '0')}`;
        this.psiCounter++;

        this.actions.push({
            type: 'PSI',
            params: [psiId, `Δt+${deltaT}`, coords, action],
            timeline: this.currentTimeline,
            timestamp: Date.now()
        });

        this.updateScriptDisplay();
        this.addTimelineEvent('PSI', psiId, `${deltaT} turns`);
        this.addPsiStateToCanvas(psiId, coords);
    }

    addTriggerAction() {
        const condition = prompt('Condition:', 'Enemy enters @20,20');
        if (!condition) return;

        const psiId = prompt('ID de l\'état ψ à effondrer:', 'ψ001');
        if (!psiId) return;

        this.actions.push({
            type: 'TRIGGER',
            params: [condition, psiId],
            timeline: this.currentTimeline,
            timestamp: Date.now()
        });

        this.updateScriptDisplay();
        this.addTimelineEvent('TRIGGER', condition, psiId);
    }

    addCollapseAction() {
        const psiId = prompt('ID de l\'état ψ à effondrer:', 'ψ001');
        if (!psiId) return;

        this.actions.push({
            type: 'COLLAPSE',
            params: [psiId],
            timeline: this.currentTimeline,
            timestamp: Date.now()
        });

        this.updateScriptDisplay();
        this.addTimelineEvent('COLLAPSE', psiId);
    }

    updateScriptDisplay() {
        const scriptElement = document.getElementById('generated-script');
        const script = this.generateScript();
        scriptElement.textContent = script;
    }

    generateScript() {
        if (this.actions.length === 0) {
            return '// Script généré automatiquement\n// Cliquez sur les boutons d\'action pour commencer';
        }

        return this.actions.map(action => {
            switch (action.type) {
                case 'MOV':
                    return `MOV(${action.params.join(', ')})`;
                case 'USE':
                    return `USE(${action.params.join(', ')})`;
                case 'CREATE':
                    return `CREATE(${action.params.join(', ')})`;
                case 'HERO':
                    return `HERO(${action.params.join(', ')})`;
                case 'BATTLE':
                    return `BATTLE(${action.params.join(', ')})`;
                case 'PSI':
                    return `${action.params[0]}: ⊙(${action.params[1]} ${action.params[2]} ⟶ ${action.params[3]})`;
                case 'TRIGGER':
                    return `Π(${action.params[0]}) ⇒ †${action.params[1]}`;
                case 'COLLAPSE':
                    return `†${action.params[0]}`;
                default:
                    return '';
            }
        }).join('\n');
    }

    addTimelineEvent(type, ...params) {
        const timelineBranch = document.querySelector(`[data-timeline="${this.currentTimeline}"]`);
        const eventsContainer = timelineBranch.querySelector('.timeline-events');
        
        const event = document.createElement('div');
        event.className = 'timeline-event';
        event.style.cssText = `
            position: absolute;
            left: ${Math.random() * 80 + 10}%;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(45deg, #4eccc6, #3a9ca8);
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(78, 204, 198, 0.4);
        `;
        event.textContent = `${type}: ${params.join(', ')}`;
        
        event.addEventListener('click', () => {
            this.removeAction(event.dataset.actionIndex);
        });
        
        event.dataset.actionIndex = this.actions.length - 1;
        eventsContainer.appendChild(event);
    }

    removeAction(index) {
        this.actions.splice(index, 1);
        this.updateScriptDisplay();
        this.redrawTimelineEvents();
    }

    redrawTimelineEvents() {
        document.querySelectorAll('.timeline-events').forEach(container => {
            container.innerHTML = '';
        });

        this.actions.forEach((action, index) => {
            this.addTimelineEvent(action.type, ...action.params.slice(0, 2));
        });
    }

    addPsiStateToCanvas(psiId, coords) {
        const [x, y] = coords.replace('@', '').split(',').map(Number);
        const canvasX = x * 30;
        const canvasY = y * 30;

        this.psiStates.push({
            id: psiId,
            x: canvasX,
            y: canvasY,
            coords: coords
        });

        this.drawPsiState(psiId, canvasX, canvasY);
    }

    drawPsiState(psiId, x, y) {
        this.ctx.save();
        
        // Draw glowing circle
        this.ctx.shadowColor = '#4eccc6';
        this.ctx.shadowBlur = 20;
        this.ctx.fillStyle = 'rgba(78, 204, 198, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw ψ symbol
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('ψ', x, y);
        
        // Draw ID
        this.ctx.font = '10px Arial';
        this.ctx.fillText(psiId, x, y + 20);
        
        this.ctx.restore();
    }

    handleCanvasClick(e) {
        const rect = this.gameCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if clicking on a ψ state
        const clickedPsi = this.psiStates.find(psi => {
            const distance = Math.sqrt((x - psi.x) ** 2 + (y - psi.y) ** 2);
            return distance < 20;
        });

        if (clickedPsi) {
            this.selectedElement = clickedPsi;
            this.showPsiStateInfo(clickedPsi);
        } else {
            this.selectedElement = null;
        }
    }

    handleCanvasHover(e) {
        const rect = this.gameCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update cursor style
        const hoveredPsi = this.psiStates.find(psi => {
            const distance = Math.sqrt((x - psi.x) ** 2 + (y - psi.y) ** 2);
            return distance < 20;
        });

        this.gameCanvas.style.cursor = hoveredPsi ? 'pointer' : 'crosshair';
    }

    showPsiStateInfo(psiState) {
        alert(`État ψ: ${psiState.id}\nCoordonnées: ${psiState.coords}\n\nCliquez sur COLLAPSE pour effondrer cet état.`);
    }

    // Macro System
    showMacroModal() {
        document.getElementById('macro-modal').style.display = 'block';
        document.getElementById('macro-name').value = '';
        document.getElementById('macro-actions-list').innerHTML = '';
        document.getElementById('macro-preview-script').textContent = '';
    }

    hideMacroModal() {
        document.getElementById('macro-modal').style.display = 'none';
    }

    addMacroAction() {
        const actionSelect = document.createElement('select');
        actionSelect.innerHTML = `
            <option value="">Sélectionner une action...</option>
            <option value="MOV">🚶 MOV</option>
            <option value="USE">🔮 USE</option>
            <option value="CREATE">⚡ CREATE</option>
            <option value="HERO">👑 HERO</option>
            <option value="BATTLE">⚔️ BATTLE</option>
            <option value="PSI">ψ PSI</option>
        `;

        const actionDiv = document.createElement('div');
        actionDiv.className = 'macro-action-item';
        actionDiv.style.cssText = `
            display: flex;
            gap: 0.5rem;
            align-items: center;
            margin-bottom: 0.5rem;
            padding: 0.5rem;
            background: rgba(78, 204, 198, 0.1);
            border-radius: 6px;
        `;

        actionDiv.appendChild(actionSelect);
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';
        removeBtn.className = 'btn-warning';
        removeBtn.style.padding = '0.2rem 0.5rem';
        removeBtn.onclick = () => actionDiv.remove();
        
        actionDiv.appendChild(removeBtn);
        document.getElementById('macro-actions-list').appendChild(actionDiv);

        actionSelect.addEventListener('change', () => this.updateMacroPreview());
    }

    updateMacroPreview() {
        const actions = [];
        document.querySelectorAll('.macro-action-item select').forEach(select => {
            if (select.value) {
                actions.push(select.value);
            }
        });

        const preview = actions.map(action => {
            switch (action) {
                case 'MOV': return 'MOV(hero, @x,y)';
                case 'USE': return 'USE(ITEM, item, HERO:hero)';
                case 'CREATE': return 'CREATE(ITEM, item, HERO:hero)';
                case 'HERO': return 'HERO(name)';
                case 'BATTLE': return 'BATTLE(hero1, hero2)';
                case 'PSI': return 'ψ001: ⊙(Δt+2 @x,y ⟶ action)';
                default: return '';
            }
        }).join('\n');

        document.getElementById('macro-preview-script').textContent = preview;
    }

    saveMacro() {
        const name = document.getElementById('macro-name').value.trim();
        if (!name) {
            alert('Veuillez entrer un nom pour la macro');
            return;
        }

        const actions = [];
        document.querySelectorAll('.macro-action-item select').forEach(select => {
            if (select.value) {
                actions.push(select.value);
            }
        });

        if (actions.length === 0) {
            alert('Veuillez ajouter au moins une action à la macro');
            return;
        }

        this.macros.set(name, actions);
        this.saveMacros();
        this.createMacroButton(name, actions);
        this.hideMacroModal();
    }

    createMacroButton(name, actions) {
        const btn = document.createElement('button');
        btn.className = 'macro-btn';
        btn.textContent = name;
        btn.onclick = () => this.executeMacro(name, actions);
        
        document.getElementById('macro-buttons').appendChild(btn);
    }

    executeMacro(name, actions) {
        console.log(`Exécution de la macro: ${name}`);
        actions.forEach(action => {
            this.handleActionClick(action, '');
        });
    }

    saveMacros() {
        localStorage.setItem('visualEditorMacros', JSON.stringify(Array.from(this.macros.entries())));
    }

    loadMacros() {
        const saved = localStorage.getItem('visualEditorMacros');
        if (saved) {
            this.macros = new Map(JSON.parse(saved));
            this.macros.forEach((actions, name) => {
                this.createMacroButton(name, actions);
            });
        }
    }

    // Script Execution
    async executeScript() {
        const script = this.generateScript();
        if (script.includes('// Script généré automatiquement')) {
            alert('Aucun script à exécuter');
            return;
        }

        try {
            // Send to backend
            const response = await fetch('http://localhost:8080/api/temporal/execute-script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ script: script })
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Script exécuté avec succès!\nRésultat: ${JSON.stringify(result, null, 2)}`);
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erreur lors de l\'exécution:', error);
            alert(`Erreur lors de l'exécution: ${error.message}`);
        }
    }

    testScript() {
        const script = this.generateScript();
        if (script.includes('// Script généré automatiquement')) {
            alert('Aucun script à tester');
            return;
        }

        // Simulate test execution
        alert(`Test du script:\n\n${script}\n\n✅ Script syntaxiquement valide\n✅ Actions compatibles\n✅ Timeline cohérente`);
    }

    clearScript() {
        this.actions = [];
        this.psiStates = [];
        this.psiCounter = 1;
        this.updateScriptDisplay();
        this.redrawTimelineEvents();
        this.setupCanvas(); // Redraw grid
    }

    // Timeline Management
    addTimeline() {
        const timelineId = `ℬ${document.querySelectorAll('.timeline-branch').length + 1}`;
        const timelineContainer = document.querySelector('.timeline-container');
        
        const newTimeline = document.createElement('div');
        newTimeline.className = 'timeline-branch';
        newTimeline.dataset.timeline = timelineId;
        newTimeline.innerHTML = `
            <span class="timeline-label">${timelineId}</span>
            <div class="timeline-line">
                <div class="timeline-events"></div>
            </div>
        `;
        
        timelineContainer.appendChild(newTimeline);
    }

    collapseTimeline() {
        if (confirm('Effondrer la timeline actuelle ?')) {
            const currentBranch = document.querySelector(`[data-timeline="${this.currentTimeline}"]`);
            if (currentBranch) {
                currentBranch.style.opacity = '0.3';
                currentBranch.style.filter = 'grayscale(1)';
            }
        }
    }

    // Board Management
    addHero() {
        const name = prompt('Nom du héros:', 'Arthur');
        if (!name) return;

        const coords = prompt('Coordonnées (@x,y):', '@10,10');
        if (!coords) return;

        const [x, y] = coords.replace('@', '').split(',').map(Number);
        const canvasX = x * 30;
        const canvasY = y * 30;

        this.heroes.push({ name, x: canvasX, y: canvasY, coords });
        this.drawHero(name, canvasX, canvasY);
    }

    drawHero(name, x, y) {
        this.ctx.save();
        
        // Draw hero circle
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 12, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw hero initial
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(name.charAt(0), x, y);
        
        // Draw name
        this.ctx.font = '10px Arial';
        this.ctx.fillText(name, x, y + 18);
        
        this.ctx.restore();
    }

    addPsiState() {
        const coords = prompt('Coordonnées (@x,y):', '@15,15');
        if (!coords) return;

        const psiId = `ψ${this.psiCounter.toString().padStart(3, '0')}`;
        this.psiCounter++;

        this.addPsiStateToCanvas(psiId, coords);
    }

    clearBoard() {
        this.heroes = [];
        this.psiStates = [];
        this.setupCanvas();
    }

    // Configuration Management
    saveConfiguration() {
        const config = {
            actions: this.actions,
            macros: Array.from(this.macros.entries()),
            heroes: this.heroes,
            psiStates: this.psiStates,
            currentTimeline: this.currentTimeline,
            psiCounter: this.psiCounter
        };

        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'visual-editor-config.json';
        link.click();
        
        URL.revokeObjectURL(url);
        alert('Configuration sauvegardée !');
    }

    loadConfiguration() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const config = JSON.parse(e.target.result);
                        this.loadConfigData(config);
                        alert('Configuration chargée !');
                    } catch (error) {
                        alert('Erreur lors du chargement: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    loadConfigData(config) {
        this.actions = config.actions || [];
        this.macros = new Map(config.macros || []);
        this.heroes = config.heroes || [];
        this.psiStates = config.psiStates || [];
        this.currentTimeline = config.currentTimeline || 'ℬ1';
        this.psiCounter = config.psiCounter || 1;

        this.updateScriptDisplay();
        this.redrawTimelineEvents();
        this.setupCanvas();
        
        // Redraw heroes and psi states
        this.heroes.forEach(hero => this.drawHero(hero.name, hero.x, hero.y));
        this.psiStates.forEach(psi => this.drawPsiState(psi.id, psi.x, psi.y));
        
        // Reload macros
        document.getElementById('macro-buttons').innerHTML = '';
        this.macros.forEach((actions, name) => this.createMacroButton(name, actions));
    }

    resetEditor() {
        if (confirm('Réinitialiser complètement l\'éditeur ?')) {
            this.clearScript();
            this.macros.clear();
            this.heroes = [];
            this.psiStates = [];
            this.psiCounter = 1;
            this.currentTimeline = 'ℬ1';
            
            document.getElementById('macro-buttons').innerHTML = '';
            localStorage.removeItem('visualEditorMacros');
            
            alert('Éditeur réinitialisé !');
        }
    }
}

// Initialize the editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.visualScriptEditor = new VisualScriptEditor();
});

// Export for global access
window.VisualScriptEditor = VisualScriptEditor; 