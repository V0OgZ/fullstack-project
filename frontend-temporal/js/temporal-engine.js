// Heroes of Time - Temporal Engine Frontend
// Enhanced with Heroes of Might & Magic 3 Commands Support

// Command Categories
const TEMPORAL_COMMANDS = [
    'ψ001:', 'ψ002:', 'ψ003:', '†ψ001', '†ψ002', '†ψ003',
    'Π(', '⊙(', 'Δt+', 'ℬ1', 'ℬ2', 'ℬ3'
];

const BASIC_COMMANDS = [
    'HERO(', 'MOV(', 'CREATE(', 'USE(', 'BATTLE(', 'END_TURN', 'LOG('
];

const HMM3_COMMANDS = [
    // Construction
    'BUILD(CASTLE,', 'BUILD(WATCHTOWER,', 'BUILD(GOLD_MINE,', 'BUILD(TEMPLE,',
    'BUILD(FORTRESS,', 'BUILD(MAGIC_GUILD,', 'BUILD(MARKETPLACE,', 'BUILD(TAVERN,',
    
    // Ressources
    'COLLECT(RESOURCE,', 'TRADE(RESOURCE,', 'MERCHANT(BUY,', 'MERCHANT(SELL,',
    
    // Héros et compétences
    'HERO(', 'LEVELUP(', 'LEARN(SPELL,',
    
    // Armées
    'RECRUIT(UNIT,', 'FORMATION(ARMY,',
    
    // Magie
    'CAST(SPELL,', 'LEARN(SPELL,',
    
    // Exploration
    'EXPLORE(TERRAIN,', 'DISCOVER(TREASURE,', 'VISIT(MYSTICAL_PLACE,',
    'EXPLORE(FOREST,', 'EXPLORE(MOUNTAIN,', 'EXPLORE(CAVE,',
    
    // Équipement
    'EQUIP(ARTIFACT,', 'COMBINE(ARTIFACT,',
    
    // Combat
    'BATTLE(ARMY:', 'SIEGE(CASTLE,', 'DEFEND(CASTLE,', 'TACTICAL_BATTLE(',
    
    // Objectifs
    'CAPTURE(OBJECTIVE,', 'CHECK(VICTORY,', 'ELIMINATE(PLAYER,'
];

// Autocomplétion avancée
const AUTOCOMPLETE_SUGGESTIONS = {
    'HERO(': ['Arthur', 'Morgana', 'Ragnar', 'Merlin', 'Lancelot'],
    'CLASS:': ['KNIGHT', 'SORCERESS', 'RANGER', 'NECROMANCER', 'WARLOCK', 'BARBARIAN'],
    'SKILL:': ['LEADERSHIP', 'ARCHERY', 'DEFENSE', 'OFFENSE', 'WISDOM', 'MYSTICISM', 'TEMPORAL_MASTERY'],
    'RESOURCE,': ['GOLD', 'WOOD', 'STONE', 'GEMS', 'TEMPORAL_ENERGY', 'CHRONOS_CRYSTAL'],
    'UNIT,': ['SWORDSMEN', 'ARCHERS', 'CAVALRY', 'KNIGHTS', 'CRUSADERS', 'ANGELS', 'DRAGONS'],
    'SPELL,': ['FIREBALL', 'HEAL', 'BLESS', 'LIGHTNING', 'TELEPORT', 'TIME_STOP', 'TEMPORAL_SHIELD'],
    'ARTIFACT,': ['MAGIC_SWORD', 'PLATE_ARMOR', 'POWER_RING', 'AVANTWORLD_BLADE', 'REVERSE_CLOCK'],
    'TERRAIN,': ['FOREST', 'MOUNTAIN', 'CAVE', 'SWAMP', 'DESERT', 'TEMPORAL_RIFT'],
    'OBJECTIVE,': ['MAIN_CASTLE', 'ALL_TOWNS', 'GRAIL', 'TEMPORAL_NEXUS', 'CHRONO_THRONE']
};

// Syntax highlighting patterns
const SYNTAX_PATTERNS = {
    temporal: /[ψ†⊙Π]/g,
    coordinates: /@\d+,\d+/g,
    psistates: /ψ\d+/g,
    timelines: /ℬ\d+/g,
    deltattime: /Δt\+\d+/g,
    heroes: /HERO:\w+/g,
    players: /PLAYER:\w+/g,
    resources: /RESOURCE,\s*\w+/g,
    units: /UNIT,\s*\w+/g,
    spells: /SPELL,\s*\w+/g,
    artifacts: /ARTIFACT,\s*\w+/g
};

// Enhanced command validation
function validateCommand(command) {
    const trimmed = command.trim();
    
    // Temporal commands
    if (trimmed.match(/^ψ\d+:/)) return { valid: true, type: 'temporal' };
    if (trimmed.match(/^†ψ\d+/)) return { valid: true, type: 'collapse' };
    if (trimmed.match(/^Π\(/)) return { valid: true, type: 'trigger' };
    
    // Basic commands
    if (trimmed.match(/^(HERO|MOV|CREATE|USE|BATTLE|END_TURN|LOG)\(/)) {
        return { valid: true, type: 'basic' };
    }
    
    // HMM3 commands
    if (trimmed.match(/^(BUILD|COLLECT|RECRUIT|CAST|EXPLORE|EQUIP|SIEGE|CAPTURE)\(/)) {
        return { valid: true, type: 'hmm3' };
    }
    
    // Advanced HMM3 commands
    if (trimmed.match(/^(LEVELUP|LEARN|TRADE|MERCHANT|DISCOVER|VISIT|FORMATION|TACTICAL_BATTLE|DEFEND|ELIMINATE|CHECK)\(/)) {
        return { valid: true, type: 'hmm3_advanced' };
    }
    
    return { valid: false, type: 'unknown' };
}

// Enhanced syntax highlighting
function applySyntaxHighlighting(text) {
    let highlighted = text;
    
    // Temporal symbols
    highlighted = highlighted.replace(SYNTAX_PATTERNS.temporal, '<span class="temporal-symbol">$&</span>');
    
    // Coordinates
    highlighted = highlighted.replace(SYNTAX_PATTERNS.coordinates, '<span class="coordinates">$&</span>');
    
    // ψ-states
    highlighted = highlighted.replace(SYNTAX_PATTERNS.psistates, '<span class="psi-state">$&</span>');
    
    // Timelines
    highlighted = highlighted.replace(SYNTAX_PATTERNS.timelines, '<span class="timeline">$&</span>');
    
    // Delta time
    highlighted = highlighted.replace(SYNTAX_PATTERNS.deltattime, '<span class="delta-time">$&</span>');
    
    // Heroes
    highlighted = highlighted.replace(SYNTAX_PATTERNS.heroes, '<span class="hero-ref">$&</span>');
    
    // Players
    highlighted = highlighted.replace(SYNTAX_PATTERNS.players, '<span class="player-ref">$&</span>');
    
    // Resources
    highlighted = highlighted.replace(SYNTAX_PATTERNS.resources, '<span class="resource">$&</span>');
    
    // Units
    highlighted = highlighted.replace(SYNTAX_PATTERNS.units, '<span class="unit">$&</span>');
    
    // Spells
    highlighted = highlighted.replace(SYNTAX_PATTERNS.spells, '<span class="spell">$&</span>');
    
    // Artifacts
    highlighted = highlighted.replace(SYNTAX_PATTERNS.artifacts, '<span class="artifact">$&</span>');
    
    return highlighted;
}

// Enhanced autocompletion
function getAutocompleteSuggestions(currentText, cursorPosition) {
    const beforeCursor = currentText.substring(0, cursorPosition);
    const lastWord = beforeCursor.split(/\s+/).pop();
    
    const suggestions = [];
    
    // All commands
    const allCommands = [...TEMPORAL_COMMANDS, ...BASIC_COMMANDS, ...HMM3_COMMANDS];
    
    // Find matching commands
    for (const command of allCommands) {
        if (command.toLowerCase().startsWith(lastWord.toLowerCase())) {
            suggestions.push(command);
        }
    }
    
    // Context-aware suggestions
    for (const [trigger, options] of Object.entries(AUTOCOMPLETE_SUGGESTIONS)) {
        if (beforeCursor.includes(trigger)) {
            suggestions.push(...options);
        }
    }
    
    return suggestions.slice(0, 10); // Limit to 10 suggestions
}

// Command help system
const COMMAND_HELP = {
    'BUILD(': 'Build structures: BUILD(CASTLE, @x,y, PLAYER:player)',
    'COLLECT(': 'Collect resources: COLLECT(RESOURCE, GOLD, 1000, PLAYER:player)',
    'RECRUIT(': 'Recruit units: RECRUIT(UNIT, SWORDSMEN, 20, HERO:hero)',
    'CAST(': 'Cast spells: CAST(SPELL, FIREBALL, TARGET:@x,y, HERO:hero)',
    'EXPLORE(': 'Explore terrain: EXPLORE(TERRAIN, @x,y, HERO:hero)',
    'EQUIP(': 'Equip artifacts: EQUIP(ARTIFACT, MAGIC_SWORD, HERO:hero)',
    'SIEGE(': 'Siege castle: SIEGE(CASTLE, @x,y, HERO:attacker)',
    'CAPTURE(': 'Capture objectives: CAPTURE(OBJECTIVE, MAIN_CASTLE, HERO:hero)',
    'ψ001:': 'Create ψ-state: ψ001: ⊙(Δt+2 @x,y ⟶ ACTION)',
    '†ψ001': 'Collapse ψ-state: †ψ001',
    'Π(': 'Observation trigger: Π(condition) ⇒ †ψ001'
};

// Enhanced command execution
async function executeCommand(command, gameId) {
    const validation = validateCommand(command);
    
    if (!validation.valid) {
        return { 
            success: false, 
            message: `Invalid command: ${command}`,
            type: 'error'
        };
    }
    
    try {
        const response = await fetch(`/api/temporal/games/${gameId}/script`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ script: command })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        return {
            success: true,
            message: result.message || 'Command executed successfully',
            type: validation.type,
            data: result
        };
        
    } catch (error) {
        return {
            success: false,
            message: `Error executing command: ${error.message}`,
            type: 'error'
        };
    }
}

// Enhanced UI components
class TemporalConsole {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.history = [];
        this.historyIndex = -1;
        this.gameId = null;
        
        this.setupUI();
        this.setupEventListeners();
    }
    
    setupUI() {
        this.container.innerHTML = `
            <div class="console-header">
                <h3>🌀 Heroes of Time - Temporal Console</h3>
                <div class="console-stats">
                    <span id="gameId">No game loaded</span>
                    <span id="commandCount">Commands: 0</span>
                </div>
            </div>
            <div class="console-output" id="consoleOutput"></div>
            <div class="console-input-area">
                <div class="input-help" id="inputHelp">Type a command or press Tab for suggestions</div>
                <div class="input-container">
                    <input type="text" id="consoleInput" placeholder="Enter command (e.g., HERO(Arthur) or ψ001: ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10)))" />
                    <button id="executeBtn">Execute</button>
                </div>
                <div class="suggestions" id="suggestions"></div>
            </div>
        `;
    }
    
    setupEventListeners() {
        const input = document.getElementById('consoleInput');
        const executeBtn = document.getElementById('executeBtn');
        const suggestions = document.getElementById('suggestions');
        
        // Execute command
        executeBtn.addEventListener('click', () => this.executeCurrentCommand());
        
        // Enter key
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCurrentCommand();
            } else if (e.key === 'ArrowUp') {
                this.navigateHistory(-1);
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                this.navigateHistory(1);
                e.preventDefault();
            } else if (e.key === 'Tab') {
                this.showSuggestions();
                e.preventDefault();
            }
        });
        
        // Input changes
        input.addEventListener('input', (e) => {
            this.updateHelp(e.target.value);
            this.updateSuggestions(e.target.value, e.target.selectionStart);
        });
    }
    
    updateHelp(command) {
        const helpElement = document.getElementById('inputHelp');
        
        for (const [trigger, help] of Object.entries(COMMAND_HELP)) {
            if (command.startsWith(trigger)) {
                helpElement.textContent = help;
                helpElement.className = 'input-help active';
                return;
            }
        }
        
        helpElement.textContent = 'Type a command or press Tab for suggestions';
        helpElement.className = 'input-help';
    }
    
    updateSuggestions(text, cursorPosition) {
        const suggestions = getAutocompleteSuggestions(text, cursorPosition);
        const suggestionsElement = document.getElementById('suggestions');
        
        if (suggestions.length === 0) {
            suggestionsElement.style.display = 'none';
            return;
        }
        
        suggestionsElement.innerHTML = suggestions
            .map(suggestion => `<div class="suggestion" onclick="window.temporalConsole.applySuggestion('${suggestion}')">${suggestion}</div>`)
            .join('');
        
        suggestionsElement.style.display = 'block';
    }
    
    applySuggestion(suggestion) {
        const input = document.getElementById('consoleInput');
        const currentValue = input.value;
        const cursorPos = input.selectionStart;
        
        // Find the last word to replace
        const beforeCursor = currentValue.substring(0, cursorPos);
        const afterCursor = currentValue.substring(cursorPos);
        const lastWordStart = beforeCursor.lastIndexOf(' ') + 1;
        
        const newValue = beforeCursor.substring(0, lastWordStart) + suggestion + afterCursor;
        input.value = newValue;
        input.focus();
        
        // Hide suggestions
        document.getElementById('suggestions').style.display = 'none';
    }
    
    async executeCurrentCommand() {
        const input = document.getElementById('consoleInput');
        const command = input.value.trim();
        
        if (!command) return;
        
        // Add to history
        this.history.push(command);
        this.historyIndex = this.history.length;
        
        // Clear input
        input.value = '';
        
        // Execute command
        this.addOutput(`> ${command}`, 'input');
        
        if (!this.gameId) {
            this.addOutput('No game loaded. Creating new game...', 'info');
            await this.createNewGame();
        }
        
        const result = await executeCommand(command, this.gameId);
        
        if (result.success) {
            this.addOutput(result.message, `success ${result.type}`);
        } else {
            this.addOutput(result.message, 'error');
        }
        
        // Update stats
        this.updateStats();
    }
    
    async createNewGame() {
        try {
            const response = await fetch('/api/temporal/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameName: 'Heroes of Time Complete',
                    playerId: 'player1'
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            this.gameId = result.gameId;
            
            // Start the game
            await fetch(`/api/temporal/games/${this.gameId}/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            this.addOutput(`Game created with ID: ${this.gameId}`, 'success');
            
        } catch (error) {
            this.addOutput(`Error creating game: ${error.message}`, 'error');
        }
    }
    
    addOutput(message, type) {
        const output = document.getElementById('consoleOutput');
        const div = document.createElement('div');
        div.className = `output-line ${type}`;
        div.innerHTML = applySyntaxHighlighting(message);
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }
    
    navigateHistory(direction) {
        if (this.history.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            document.getElementById('consoleInput').value = '';
            return;
        }
        
        document.getElementById('consoleInput').value = this.history[this.historyIndex];
    }
    
    updateStats() {
        document.getElementById('gameId').textContent = this.gameId ? `Game: ${this.gameId}` : 'No game loaded';
        document.getElementById('commandCount').textContent = `Commands: ${this.history.length}`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.temporalConsole = new TemporalConsole('temporal-console');
});

// Export for external use
window.TemporalEngine = {
    TemporalConsole,
    executeCommand,
    validateCommand,
    applySyntaxHighlighting,
    getAutocompleteSuggestions,
    TEMPORAL_COMMANDS,
    BASIC_COMMANDS,
    HMM3_COMMANDS,
    COMMAND_HELP
};