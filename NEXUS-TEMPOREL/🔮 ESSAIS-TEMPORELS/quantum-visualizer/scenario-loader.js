/**
 * 🎮 Scenario Loader - Heroes of Time
 * 
 * Advanced scenario loading system with multi-scenario support
 * - Loads scenarios from index
 * - Provides scenario selection interface
 * - Handles different scenario types and difficulties
 */

class ScenarioLoader {
    constructor() {
        this.baseUrl = '../🎮 game_assets/scenarios/visualizer/';
        this.scenarios = [];
        this.currentIndex = 0;
        this.currentScenario = null;
        this.scenarioIndex = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the scenario loader
     */
    async initialize() {
        try {
            await this.loadScenarioIndex();
            await this.createScenarioSelector();
            this.isInitialized = true;
            console.log('✅ Scenario Loader initialized with', this.scenarioIndex.scenarios.length, 'scenarios');
        } catch (error) {
            console.error('❌ Failed to initialize Scenario Loader:', error);
            throw error;
        }
    }

    /**
     * Load the scenario index
     */
    async loadScenarioIndex() {
        try {
            const response = await fetch(`${this.baseUrl}SCENARIOS_INDEX.json`);
            if (!response.ok) {
                throw new Error(`Failed to load scenario index: ${response.status}`);
            }
            this.scenarioIndex = await response.json();
            console.log('📑 Scenario index loaded:', this.scenarioIndex.scenarios_index.total_scenarios, 'scenarios');
        } catch (error) {
            console.error('❌ Error loading scenario index:', error);
            throw error;
        }
    }

    /**
     * Create scenario selector UI
     */
    createScenarioSelector() {
        const container = document.getElementById('scenario-selector');
        if (!container) {
            console.warn('⚠️ No scenario selector container found');
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        // Create title
        const title = document.createElement('h2');
        title.textContent = '🎮 Sélectionnez un Scénario';
        title.className = 'scenario-selector-title';
        container.appendChild(title);

        // Create filters
        const filtersDiv = this.createFilters();
        container.appendChild(filtersDiv);

        // Create scenario grid
        const scenarioGrid = document.createElement('div');
        scenarioGrid.className = 'scenario-grid';
        scenarioGrid.id = 'scenario-grid';
        container.appendChild(scenarioGrid);

        // Populate scenarios
        this.populateScenarioGrid();
    }

    /**
     * Create filter controls
     */
    createFilters() {
        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'scenario-filters';

        // Difficulty filter
        const difficultyFilter = document.createElement('select');
        difficultyFilter.id = 'difficulty-filter';
        difficultyFilter.innerHTML = `
            <option value="">Toutes les difficultés</option>
            <option value="INTERMEDIATE">Intermédiaire</option>
            <option value="HARD">Difficile</option>
            <option value="EXPERT">Expert</option>
            <option value="MASTER">Maître</option>
            <option value="ULTIMATE">Ultime</option>
        `;
        difficultyFilter.addEventListener('change', () => this.filterScenarios());

        // Type filter
        const typeFilter = document.createElement('select');
        typeFilter.id = 'type-filter';
        typeFilter.innerHTML = `
            <option value="">Tous les types</option>
            <option value="PVP">Player vs Player</option>
            <option value="PVE">Player vs Environment</option>
            <option value="SPECIAL">Spécial</option>
        `;
        typeFilter.addEventListener('change', () => this.filterScenarios());

        // Duration filter
        const durationFilter = document.createElement('select');
        durationFilter.id = 'duration-filter';
        durationFilter.innerHTML = `
            <option value="">Toutes les durées</option>
            <option value="SHORT">Court (< 15 min)</option>
            <option value="MEDIUM">Moyen (15-30 min)</option>
            <option value="LONG">Long (> 30 min)</option>
        `;
        durationFilter.addEventListener('change', () => this.filterScenarios());

        filtersDiv.appendChild(difficultyFilter);
        filtersDiv.appendChild(typeFilter);
        filtersDiv.appendChild(durationFilter);

        return filtersDiv;
    }

    /**
     * Populate scenario grid with cards
     */
    populateScenarioGrid() {
        const grid = document.getElementById('scenario-grid');
        if (!grid) return;

        grid.innerHTML = '';

        this.scenarioIndex.scenarios.forEach(scenario => {
            const card = this.createScenarioCard(scenario);
            grid.appendChild(card);
        });
    }

    /**
     * Create a scenario card
     */
    createScenarioCard(scenario) {
        const card = document.createElement('div');
        card.className = `scenario-card ${scenario.difficulty.toLowerCase()}`;
        card.dataset.scenarioId = scenario.id;
        card.dataset.difficulty = scenario.difficulty;
        card.dataset.type = this.getScenarioCategory(scenario.type);
        card.dataset.duration = this.getDurationCategory(scenario.duration);

        const difficultyColor = this.getDifficultyColor(scenario.difficulty);
        const typeIcon = this.getTypeIcon(scenario.type);

        card.innerHTML = `
            <div class="scenario-card-header">
                <div class="scenario-type-icon">${typeIcon}</div>
                <div class="scenario-difficulty" style="color: ${difficultyColor}">
                    ${scenario.difficulty}
                </div>
            </div>
            <div class="scenario-card-content">
                <h3 class="scenario-title">${scenario.name}</h3>
                <p class="scenario-description">${scenario.description}</p>
                <div class="scenario-metadata">
                    <div class="scenario-meta-item">
                        <span class="meta-label">Joueurs:</span>
                        <span class="meta-value">${scenario.players}</span>
                    </div>
                    <div class="scenario-meta-item">
                        <span class="meta-label">Tours:</span>
                        <span class="meta-value">${scenario.max_turns}</span>
                    </div>
                    <div class="scenario-meta-item">
                        <span class="meta-label">Durée:</span>
                        <span class="meta-value">${scenario.duration}</span>
                    </div>
                </div>
                <div class="scenario-tags">
                    ${scenario.tags.map(tag => `<span class="scenario-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="scenario-card-actions">
                <button class="scenario-btn scenario-btn-preview" onclick="scenarioLoader.previewScenario('${scenario.id}')">
                    👁️ Aperçu
                </button>
                <button class="scenario-btn scenario-btn-play" onclick="scenarioLoader.loadScenario('${scenario.id}')">
                    ▶️ Jouer
                </button>
            </div>
        `;

        return card;
    }

    /**
     * Get difficulty color
     */
    getDifficultyColor(difficulty) {
        const colors = {
            'BEGINNER': '#4CAF50',
            'INTERMEDIATE': '#2196F3',
            'HARD': '#FF9800',
            'EXPERT': '#F44336',
            'MASTER': '#9C27B0',
            'ULTIMATE': '#FF5722'
        };
        return colors[difficulty] || '#666';
    }

    /**
     * Get type icon
     */
    getTypeIcon(type) {
        const icons = {
            'PVP_EPIC': '⚔️',
            'PVP_CLASSIC': '🛡️',
            'PVP_SHORT': '⚡',
            'PVP_ASYNC': '🔄',
            'DUEL_FURTIF': '🥷',
            'PVE_DEFENSE': '🏰',
            'INFILTRATION': '🕵️',
            'PVE_BOSS': '🐉'
        };
        return icons[type] || '🎮';
    }

    /**
     * Get scenario category for filtering
     */
    getScenarioCategory(type) {
        if (type.startsWith('PVP')) return 'PVP';
        if (type.startsWith('PVE')) return 'PVE';
        return 'SPECIAL';
    }

    /**
     * Get duration category for filtering
     */
    getDurationCategory(duration) {
        const minutes = parseInt(duration.split('-')[0]);
        if (minutes < 15) return 'SHORT';
        if (minutes <= 30) return 'MEDIUM';
        return 'LONG';
    }

    /**
     * Filter scenarios based on selected criteria
     */
    filterScenarios() {
        const difficultyFilter = document.getElementById('difficulty-filter').value;
        const typeFilter = document.getElementById('type-filter').value;
        const durationFilter = document.getElementById('duration-filter').value;

        const cards = document.querySelectorAll('.scenario-card');
        
        cards.forEach(card => {
            const difficulty = card.dataset.difficulty;
            const type = card.dataset.type;
            const duration = card.dataset.duration;

            const matchesDifficulty = !difficultyFilter || difficulty === difficultyFilter;
            const matchesType = !typeFilter || type === typeFilter;
            const matchesDuration = !durationFilter || duration === durationFilter;

            if (matchesDifficulty && matchesType && matchesDuration) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Preview scenario
     */
    async previewScenario(scenarioId) {
        try {
            const scenario = this.scenarioIndex.scenarios.find(s => s.id === scenarioId);
            if (!scenario) {
                throw new Error(`Scenario ${scenarioId} not found`);
            }

            // Load scenario data
            const scenarioData = await this.loadScenarioData(scenarioId);
            
            // Show preview modal
            this.showScenarioPreview(scenario, scenarioData);
            
        } catch (error) {
            console.error('❌ Error previewing scenario:', error);
            alert(`Erreur lors du prévisualisation: ${error.message}`);
        }
    }

    /**
     * Load scenario data from file
     */
    async loadScenarioData(scenarioId) {
        const scenario = this.scenarioIndex.scenarios.find(s => s.id === scenarioId);
        if (!scenario) {
            throw new Error(`Scenario ${scenarioId} not found in index`);
        }

        const response = await fetch(`${this.baseUrl}${scenario.file}`);
        if (!response.ok) {
            throw new Error(`Failed to load scenario file: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Show scenario preview modal
     */
    showScenarioPreview(scenario, scenarioData) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('scenario-preview-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'scenario-preview-modal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${scenario.name}</h2>
                    <span class="modal-close" onclick="this.parentElement.parentElement.parentElement.style.display='none'">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="preview-section">
                        <h3>📋 Informations</h3>
                        <p><strong>Type:</strong> ${scenario.type}</p>
                        <p><strong>Difficulté:</strong> ${scenario.difficulty}</p>
                        <p><strong>Joueurs:</strong> ${scenario.players}</p>
                        <p><strong>Tours maximum:</strong> ${scenario.max_turns}</p>
                        <p><strong>Durée estimée:</strong> ${scenario.duration}</p>
                    </div>
                    
                    <div class="preview-section">
                        <h3>📖 Description</h3>
                        <p>${scenario.description}</p>
                    </div>
                    
                    <div class="preview-section">
                        <h3>🏆 Conditions de Victoire</h3>
                        <ul>
                            ${scenarioData.game_settings.victory_conditions.map(condition => `<li>${condition}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="preview-section">
                        <h3>🗡️ Artefacts Principaux</h3>
                        <div class="artifact-list">
                            ${scenario.featured_artifacts.map(artifact => `<span class="artifact-tag">${artifact}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="preview-section">
                        <h3>🐉 Créatures</h3>
                        <div class="creature-list">
                            ${scenario.featured_creatures.map(creature => `<span class="creature-tag">${creature}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="scenario-btn scenario-btn-play" onclick="scenarioLoader.loadScenario('${scenario.id}'); this.parentElement.parentElement.parentElement.style.display='none'">
                        ▶️ Jouer ce Scénario
                    </button>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    /**
     * Load and start scenario
     */
    async loadScenario(scenarioId) {
        try {
            console.log('🎮 Loading scenario:', scenarioId);
            
            // Load scenario data
            const scenarioData = await this.loadScenarioData(scenarioId);
            
            // Store current scenario
            this.currentScenario = scenarioData;
            this.scenarios.set(scenarioId, scenarioData);
            
            // Hide scenario selector
            const selector = document.getElementById('scenario-selector');
            if (selector) {
                selector.style.display = 'none';
            }
            
            // Show game interface
            const gameInterface = document.getElementById('game-interface');
            if (gameInterface) {
                gameInterface.style.display = 'block';
            }
            
            // Initialize quantum visualizer with scenario
            if (window.quantumVisualizer) {
                await window.quantumVisualizer.initializeWithScenario(scenarioData);
            }
            
            console.log('✅ Scenario loaded successfully:', scenarioId);
            
        } catch (error) {
            console.error('❌ Error loading scenario:', error);
            alert(`Erreur lors du chargement: ${error.message}`);
        }
    }

    /**
     * Get current scenario
     */
    getCurrentScenario() {
        return this.currentScenario;
    }

    /**
     * Get scenario by ID
     */
    getScenario(scenarioId) {
        return this.scenarios.get(scenarioId);
    }

    /**
     * Get scenario recommendations
     */
    getRecommendations(category) {
        if (!this.scenarioIndex || !this.scenarioIndex.recommendations) {
            return [];
        }
        return this.scenarioIndex.recommendations[category] || [];
    }

    /**
     * Search scenarios
     */
    searchScenarios(query) {
        if (!query || !this.scenarioIndex) return [];
        
        const searchTerm = query.toLowerCase();
        return this.scenarioIndex.scenarios.filter(scenario => 
            scenario.name.toLowerCase().includes(searchTerm) ||
            scenario.description.toLowerCase().includes(searchTerm) ||
            scenario.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    /**
     * Return to scenario selector
     */
    returnToSelector() {
        const selector = document.getElementById('scenario-selector');
        const gameInterface = document.getElementById('game-interface');
        
        if (selector) selector.style.display = 'block';
        if (gameInterface) gameInterface.style.display = 'none';
        
        // Reset current scenario
        this.currentScenario = null;
    }
}

// Global instance
const scenarioLoader = new ScenarioLoader();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await scenarioLoader.initialize();
    } catch (error) {
        console.error('❌ Failed to initialize scenario loader:', error);
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScenarioLoader;
} 