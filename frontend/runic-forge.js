// runic-forge.js - Interface pour la Forge Runique
class RunicForgeUI {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/runic-forge';
        this.currentGameId = 1;
        this.forgedObjects = [];
        this.grammarExamples = {};
        this.isVisible = false;
        
        this.init();
    }
    
    init() {
        this.createUI();
        this.loadGrammarExamples();
        this.loadForgedObjects();
    }
    
    createUI() {
        // Créer l'onglet Forge Runique
        const header = document.querySelector('.header .controls');
        const forgeButton = document.createElement('button');
        forgeButton.id = 'forge-btn';
        forgeButton.innerHTML = '🔨 Forge Runique';
        forgeButton.title = 'Ouvrir la Forge Runique';
        header.appendChild(forgeButton);
        
        // Créer le panneau de forge
        const gameArea = document.querySelector('.game-area');
        this.forgePanel = document.createElement('div');
        this.forgePanel.id = 'forge-panel';
        this.forgePanel.className = 'forge-panel';
        this.forgePanel.style.display = 'none';
        
        this.forgePanel.innerHTML = `
            <div class="forge-header">
                <h2>🔨 Forge Runique</h2>
                <button id="close-forge-btn" class="close-btn">×</button>
            </div>
            
            <div class="forge-content">
                <div class="forge-section">
                    <h3>⚡ Grammaire Runique</h3>
                    <div class="grammar-input">
                        <textarea id="grammar-input" placeholder="FORGE(SWORD, POWER:50, ELEMENT:FIRE)&#10;FORGE(MIRROR, POWER:100, QUANTUM:TRUE)&#10;FORGE(ARTIFACT, POWER:200, TEMPORAL:TRUE)"></textarea>
                        <div class="grammar-controls">
                            <button id="validate-grammar-btn">🔍 Valider</button>
                            <button id="forge-object-btn">🔨 Forger</button>
                        </div>
                    </div>
                    
                    <div class="grammar-examples">
                        <h4>📚 Exemples de Grammaire</h4>
                        <div id="examples-list" class="examples-grid"></div>
                    </div>
                </div>
                
                <div class="forge-section">
                    <h3>📊 Validation</h3>
                    <div id="validation-result" class="validation-result"></div>
                </div>
                
                <div class="forge-section">
                    <h3>🗡️ Objets Forgés</h3>
                    <div id="forged-objects-list" class="objects-grid"></div>
                </div>
                
                <div class="forge-section">
                    <h3>📈 Statistiques</h3>
                    <div id="forge-stats" class="stats-grid"></div>
                </div>
            </div>
        `;
        
        gameArea.appendChild(this.forgePanel);
        
        // Événements
        forgeButton.addEventListener('click', () => this.toggleForge());
        document.getElementById('close-forge-btn').addEventListener('click', () => this.toggleForge());
        document.getElementById('validate-grammar-btn').addEventListener('click', () => this.validateGrammar());
        document.getElementById('forge-object-btn').addEventListener('click', () => this.forgeObject());
        
        // Ajouter les styles CSS
        this.addStyles();
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .forge-panel {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 1000;
                overflow-y: auto;
                padding: 20px;
            }
            
            .forge-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #FFD700;
            }
            
            .forge-header h2 {
                color: #FFD700;
                margin: 0;
            }
            
            .close-btn {
                background: #FF4444;
                border: none;
                color: white;
                font-size: 24px;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
            }
            
            .forge-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .forge-section {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid #444;
                border-radius: 8px;
                padding: 15px;
            }
            
            .forge-section h3 {
                color: #FFD700;
                margin-bottom: 15px;
                border-bottom: 1px solid #444;
                padding-bottom: 5px;
            }
            
            .grammar-input textarea {
                width: 100%;
                height: 120px;
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid #666;
                border-radius: 4px;
                color: #00FF00;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                padding: 10px;
                resize: vertical;
            }
            
            .grammar-controls {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            
            .grammar-controls button {
                background: linear-gradient(45deg, #8B5A2B, #FFD700);
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                color: white;
                cursor: pointer;
                transition: transform 0.2s;
            }
            
            .grammar-controls button:hover {
                transform: scale(1.05);
            }
            
            .examples-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 10px;
            }
            
            .example-item {
                background: rgba(0, 0, 0, 0.4);
                border: 1px solid #666;
                border-radius: 4px;
                padding: 10px;
                cursor: pointer;
                transition: border-color 0.2s;
            }
            
            .example-item:hover {
                border-color: #FFD700;
            }
            
            .example-item h5 {
                color: #FFD700;
                margin: 0 0 5px 0;
            }
            
            .example-item .grammar {
                color: #00FF00;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                margin-bottom: 5px;
            }
            
            .example-item .risk {
                color: #FF6666;
                font-size: 12px;
            }
            
            .validation-result {
                background: rgba(0, 0, 0, 0.4);
                border: 1px solid #666;
                border-radius: 4px;
                padding: 10px;
                min-height: 100px;
            }
            
            .validation-success {
                border-color: #00FF00;
                color: #00FF00;
            }
            
            .validation-error {
                border-color: #FF4444;
                color: #FF4444;
            }
            
            .objects-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 10px;
            }
            
            .object-item {
                background: rgba(0, 0, 0, 0.4);
                border: 1px solid #666;
                border-radius: 4px;
                padding: 10px;
            }
            
            .object-item h5 {
                color: #FFD700;
                margin: 0 0 5px 0;
            }
            
            .object-item .power {
                color: #00FF00;
                font-weight: bold;
            }
            
            .object-item .risks {
                color: #FF6666;
                font-size: 12px;
                margin-top: 5px;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            
            .stat-item {
                background: rgba(0, 0, 0, 0.4);
                border: 1px solid #666;
                border-radius: 4px;
                padding: 10px;
                text-align: center;
            }
            
            .stat-item .value {
                color: #FFD700;
                font-size: 24px;
                font-weight: bold;
            }
            
            .stat-item .label {
                color: #CCC;
                font-size: 12px;
            }
            
            @media (max-width: 768px) {
                .forge-content {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    toggleForge() {
        this.isVisible = !this.isVisible;
        this.forgePanel.style.display = this.isVisible ? 'block' : 'none';
        
        if (this.isVisible) {
            this.loadForgedObjects();
            this.loadStats();
        }
    }
    
    async loadGrammarExamples() {
        try {
            const response = await fetch(`${this.baseUrl}/grammar-examples`);
            const data = await response.json();
            
            if (data.success) {
                this.grammarExamples = data.examples;
                this.renderExamples();
            }
        } catch (error) {
            console.error('Erreur lors du chargement des exemples:', error);
        }
    }
    
    renderExamples() {
        const examplesList = document.getElementById('examples-list');
        examplesList.innerHTML = '';
        
        Object.entries(this.grammarExamples).forEach(([key, example]) => {
            const item = document.createElement('div');
            item.className = 'example-item';
            item.innerHTML = `
                <h5>${example.description}</h5>
                <div class="grammar">${example.grammar}</div>
                <div class="risk">Risque: ${example.risk}</div>
            `;
            
            item.addEventListener('click', () => {
                document.getElementById('grammar-input').value = example.grammar;
            });
            
            examplesList.appendChild(item);
        });
    }
    
    async validateGrammar() {
        const grammar = document.getElementById('grammar-input').value.trim();
        const resultDiv = document.getElementById('validation-result');
        
        if (!grammar) {
            resultDiv.innerHTML = '<div class="validation-error">Veuillez entrer une grammaire runique</div>';
            return;
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ grammar: grammar })
            });
            
            const data = await response.json();
            
            if (data.success) {
                const isValid = data.valid;
                const analysis = data.analysis;
                const risks = data.risks;
                const power = data.estimatedPower;
                
                resultDiv.className = `validation-result ${isValid ? 'validation-success' : 'validation-error'}`;
                resultDiv.innerHTML = `
                    <div><strong>Statut:</strong> ${isValid ? '✅ Valide' : '❌ Invalide'}</div>
                    <div><strong>Analyse:</strong> ${analysis}</div>
                    <div><strong>Puissance estimée:</strong> ${power}</div>
                    <div><strong>Risques:</strong> ${risks}</div>
                `;
            } else {
                resultDiv.className = 'validation-result validation-error';
                resultDiv.innerHTML = `<div>Erreur: ${data.error}</div>`;
            }
        } catch (error) {
            resultDiv.className = 'validation-result validation-error';
            resultDiv.innerHTML = `<div>Erreur de connexion: ${error.message}</div>`;
        }
    }
    
    async forgeObject() {
        const grammar = document.getElementById('grammar-input').value.trim();
        
        if (!grammar) {
            alert('Veuillez entrer une grammaire runique');
            return;
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/forge`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    grammar: grammar,
                    heroName: 'Jean-Grofignon',
                    gameId: this.currentGameId
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert(`✅ Objet forgé avec succès!\nNom: ${data.forgedObject.name}\nPuissance: ${data.forgedObject.power}`);
                this.loadForgedObjects();
                this.loadStats();
            } else {
                alert(`❌ Erreur de forge: ${data.error}`);
            }
        } catch (error) {
            alert(`Erreur de connexion: ${error.message}`);
        }
    }
    
    async loadForgedObjects() {
        try {
            const response = await fetch(`${this.baseUrl}/objects?gameId=${this.currentGameId}`);
            const data = await response.json();
            
            if (data.success) {
                this.forgedObjects = data.objects;
                this.renderForgedObjects();
            }
        } catch (error) {
            console.error('Erreur lors du chargement des objets forgés:', error);
        }
    }
    
    renderForgedObjects() {
        const objectsList = document.getElementById('forged-objects-list');
        objectsList.innerHTML = '';
        
        if (this.forgedObjects.length === 0) {
            objectsList.innerHTML = '<div style="color: #666; text-align: center; padding: 20px;">Aucun objet forgé</div>';
            return;
        }
        
        this.forgedObjects.forEach(obj => {
            const item = document.createElement('div');
            item.className = 'object-item';
            item.innerHTML = `
                <h5>${obj.name}</h5>
                <div class="power">Puissance: ${obj.power}</div>
                <div>Type: ${obj.type}</div>
                <div>${obj.description}</div>
                <div class="risks">Risques: ${obj.risks}</div>
            `;
            
            item.addEventListener('click', () => this.useObject(obj.id));
            objectsList.appendChild(item);
        });
    }
    
    async useObject(objectId) {
        if (!confirm('Voulez-vous utiliser cet objet forgé ?')) {
            return;
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/objects/${objectId}/use`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    heroName: 'Jean-Grofignon',
                    gameId: this.currentGameId
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert(`✅ Objet utilisé avec succès!\n${JSON.stringify(data.result, null, 2)}`);
            } else {
                alert(`❌ Erreur d'utilisation: ${data.error}`);
            }
        } catch (error) {
            alert(`Erreur de connexion: ${error.message}`);
        }
    }
    
    async loadStats() {
        try {
            const response = await fetch(`${this.baseUrl}/stats?gameId=${this.currentGameId}`);
            const data = await response.json();
            
            if (data.success) {
                this.renderStats(data.stats);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des stats:', error);
        }
    }
    
    renderStats(stats) {
        const statsDiv = document.getElementById('forge-stats');
        statsDiv.innerHTML = '';
        
        const statItems = [
            { label: 'Objets Forgés', value: stats.totalForged || 0 },
            { label: 'Puissance Totale', value: stats.totalPower || 0 },
            { label: 'Risques Élevés', value: stats.highRiskCount || 0 },
            { label: 'Taux de Succès', value: `${stats.successRate || 0}%` }
        ];
        
        statItems.forEach(stat => {
            const item = document.createElement('div');
            item.className = 'stat-item';
            item.innerHTML = `
                <div class="value">${stat.value}</div>
                <div class="label">${stat.label}</div>
            `;
            statsDiv.appendChild(item);
        });
    }
}

// Initialiser la Forge Runique quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.runicForge = new RunicForgeUI();
}); 