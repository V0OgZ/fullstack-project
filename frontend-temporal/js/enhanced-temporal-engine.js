// @controller: GameController.java, TemporalEngineController.java
// @endpoints: GET /api/game/status, POST /api/game/create, POST /api/game/{id}/script
// @uses: createGame(), executeScript(), getGameState(), updateUI()
// @description: Enhanced Temporal Engine Interface with Advanced Console Features

class EnhancedTemporalEngine {
    constructor() {
        this.baseUrl = 'http://localhost:8080';
        this.currentGameId = null;
        this.gameState = null;
        this.isConnected = false;
        this.updateInterval = null;
        this.debugMode = false;
        
        // Loading screen management
        this.loadingScreen = null;
        this.loadingStatus = null;
        this.mainInterface = null;
        
        // Console avancée
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentTab = 'script';
        this.performanceMetrics = [];
        this.sessionLog = [];
        this.activeParser = 'regex';
        
        // Auto-complétion
        this.autocompleteCommands = [
            { command: 'HERO', syntax: 'HERO(name)', description: 'Create a new hero' },
            { command: 'MOV', syntax: 'MOV(hero, @x,y)', description: 'Move hero to position' },
            { command: 'ψ', syntax: 'ψ001: ⊙(Δt+1 @x,y ⟶ action)', description: 'Create quantum superposition' },
            { command: '†', syntax: '†ψ001', description: 'Collapse quantum state' },
            { command: 'CREATE', syntax: 'CREATE(type, name, @x,y)', description: 'Create entity' },
            { command: 'BATTLE', syntax: 'BATTLE(attacker, defender)', description: 'Start battle' },
            { command: 'BUILD', syntax: 'BUILD(type, @x,y, player)', description: 'Build structure' },
            { command: 'RECRUIT', syntax: 'RECRUIT(unit, amount, hero)', description: 'Recruit units' },
            { command: 'CAST', syntax: 'CAST(spell, target, hero)', description: 'Cast spell' },
            { command: 'EXPLORE', syntax: 'EXPLORE(terrain, @x,y, hero)', description: 'Explore territory' }
        ];
        
        // Métriques de performance
        this.performanceChart = null;
        this.lastExecutionTime = 0;
        this.averageLatency = 0;
        this.parseTimeMetric = 0;
        
        this.initializeLoadingScreen();
        this.init();
    }

    // ============================================
    // LOADING SCREEN MANAGEMENT (CONSERVÉ)
    // ============================================

    initializeLoadingScreen() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.loadingStatus = document.querySelector('.loading-status');
        this.mainInterface = document.getElementById('mainInterface');
        
        // Create particle effects
        this.createParticles();
        
        this.updateLoadingStatus('Initializing advanced temporal matrix...');
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Create 30 particles for enhanced effect
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position and delay
            const leftPosition = Math.random() * 100;
            const delay = Math.random() * 8;
            
            particle.style.left = `${leftPosition}%`;
            particle.style.animationDelay = `${delay}s`;
            
            // Random color variation
            const colors = [
                'rgba(233, 69, 96, 0.7)',
                'rgba(0, 188, 212, 0.7)',
                'rgba(243, 156, 18, 0.7)',
                'rgba(155, 89, 182, 0.7)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }

    updateLoadingStatus(message) {
        if (this.loadingStatus) {
            this.loadingStatus.textContent = message;
            this.addToSessionLog('info', message);
            
            // Add a brief glow effect when status updates
            this.loadingStatus.style.animation = 'none';
            setTimeout(() => {
                this.loadingStatus.style.animation = 'statusFade 1s ease-in-out infinite alternate';
            }, 50);
        }
    }

    async init() {
        try {
            this.updateLoadingStatus('Initializing enhanced console...');
            await this.sleep(1000);
            
            this.updateLoadingStatus('Loading command database...');
            await this.sleep(800);
            
            this.updateLoadingStatus('Connecting to temporal backend...');
            await this.checkConnection();
            
            this.updateLoadingStatus('Initializing performance monitoring...');
            await this.sleep(600);
            
            this.updateLoadingStatus('Console ready! Activating interface...');
            await this.sleep(800);
            
            await this.hideLoadingScreen();
            this.initializeConsole();
            this.startPerformanceMonitoring();
            
        } catch (error) {
            this.addToSessionLog('error', `Initialization failed: ${error.message}`);
        }
    }

    async checkConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/health`);
            if (response.ok) {
                this.isConnected = true;
                this.updateConnectionStatus(true);
                this.addToSessionLog('success', 'Successfully connected to temporal backend');
            } else {
                throw new Error('Backend not responding');
            }
        } catch (error) {
            this.isConnected = false;
            this.updateConnectionStatus(false);
            this.addToSessionLog('warning', 'Backend connection failed - using offline mode');
        }
    }

    updateConnectionStatus(connected) {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        
        if (connected) {
            statusDot.classList.add('connected');
            statusText.textContent = 'Connected';
        } else {
            statusDot.classList.remove('connected');
            statusText.textContent = 'Offline';
        }
    }

    async hideLoadingScreen() {
        return new Promise((resolve) => {
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('hidden');
                
                setTimeout(() => {
                    this.mainInterface.classList.add('visible');
                    resolve();
                }, 500);
            } else {
                resolve();
            }
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ============================================
    // ENHANCED CONSOLE FUNCTIONALITY
    // ============================================

    initializeConsole() {
        const consoleInput = document.getElementById('consoleInput');
        const consoleOutput = document.getElementById('consoleOutput');
        
        // Initialize console with welcome message
        this.addToConsole('info', 'Enhanced Temporal Console v2.0 Initialized');
        this.addToConsole('info', 'Type commands or use Tab for auto-completion');
        this.addToConsole('info', 'Available parsers: REGEX, ANTLR4');
        this.addToConsole('command', 'Heroes⚡ Ready for temporal commands...');
        
        // Setup event listeners
        consoleInput.addEventListener('input', (e) => this.handleInputChange(e));
        consoleInput.addEventListener('keydown', (e) => this.handleConsoleKeyDown(e));
        
        // Initialize performance chart
        this.initializePerformanceChart();
        
        // Start auto-refresh
        this.startAutoRefresh();
    }

    handleConsoleKeyDown(event) {
        const input = document.getElementById('consoleInput');
        const suggestions = document.getElementById('autocompleteSuggestions');
        
        switch(event.key) {
            case 'Enter':
                event.preventDefault();
                this.executeCommand(input.value);
                break;
                
            case 'Tab':
                event.preventDefault();
                this.showAutocomplete(input.value);
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                this.navigateHistory(-1);
                break;
                
            case 'ArrowDown':
                event.preventDefault();
                this.navigateHistory(1);
                break;
                
            case 'Escape':
                this.hideAutocomplete();
                break;
        }
    }

    handleInputChange(event) {
        const input = event.target;
        const value = input.value;
        
        // Auto-complete while typing
        if (value.length > 0) {
            this.showAutocomplete(value);
        } else {
            this.hideAutocomplete();
        }
    }

    showAutocomplete(input) {
        const suggestions = document.getElementById('autocompleteSuggestions');
        const matches = this.autocompleteCommands.filter(cmd => 
            cmd.command.toLowerCase().includes(input.toLowerCase()) ||
            cmd.syntax.toLowerCase().includes(input.toLowerCase())
        );
        
        if (matches.length > 0) {
            suggestions.innerHTML = matches.map(match => `
                <div class="autocomplete-item" onclick="selectAutocomplete('${match.syntax}')">
                    <div class="command">${match.command}</div>
                    <div class="description">${match.description}</div>
                </div>
            `).join('');
            suggestions.style.display = 'block';
        } else {
            this.hideAutocomplete();
        }
    }

    hideAutocomplete() {
        const suggestions = document.getElementById('autocompleteSuggestions');
        suggestions.style.display = 'none';
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length - 1;
        }
        
        const input = document.getElementById('consoleInput');
        input.value = this.commandHistory[this.historyIndex] || '';
    }

    async executeCommand(command) {
        if (!command.trim()) return;
        
        // Add to history
        this.commandHistory.unshift(command);
        this.historyIndex = -1;
        
        // Clear input
        const input = document.getElementById('consoleInput');
        input.value = '';
        this.hideAutocomplete();
        
        // Log command
        this.addToConsole('command', `Heroes⚡ ${command}`);
        
        // Start performance timing
        const startTime = performance.now();
        
        try {
            // Execute based on current parser selection
            const parser = document.getElementById('parserSelector').value;
            const result = await this.executeScript(command, parser);
            
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            
            // Update performance metrics
            this.updatePerformanceMetrics(executionTime, parser);
            
            // Display result
            this.displayExecutionResult(result, executionTime, parser);
            
        } catch (error) {
            this.addToConsole('error', `Execution failed: ${error.message}`);
            this.addToSessionLog('error', `Command failed: ${command} - ${error.message}`);
        }
    }

    async executeScript(command, parser = 'regex') {
        if (!this.isConnected) {
            return this.simulateOfflineExecution(command);
        }
        
        // Create or get current game
        if (!this.currentGameId) {
            await this.createNewGame();
        }
        
        const url = `${this.baseUrl}/api/game/${this.currentGameId}/script`;
        const requestData = {
            script: command,
            parser: parser
        };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    }

    simulateOfflineExecution(command) {
        // Simulate execution for offline mode
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: `[OFFLINE] Simulated execution of: ${command}`,
                    executionTime: Math.random() * 100 + 20,
                    parser: 'simulation'
                });
            }, Math.random() * 200 + 100);
        });
    }

    displayExecutionResult(result, executionTime, parser) {
        const success = result.success;
        const logType = success ? 'success' : 'error';
        
        // Main result
        this.addToConsole(logType, result.message || 'Command executed');
        
        // Performance metrics
        if (this.debugMode) {
            this.addToConsole('info', `⚡ Execution time: ${executionTime.toFixed(2)}ms`);
            this.addToConsole('info', `🔧 Parser: ${parser.toUpperCase()}`);
            
            if (result.psiId) {
                this.addToConsole('info', `🌀 Created ψ-state: ${result.psiId}`);
            }
        }
        
        // Update UI elements
        this.updateGameState();
        this.updateMetricsDisplay(executionTime, parser);
        
        // Log to session
        this.addToSessionLog(logType, `${command} - ${result.message}`);
    }

    addToConsole(type, message) {
        const consoleOutput = document.getElementById('consoleOutput');
        const timestamp = new Date().toLocaleTimeString();
        
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            ${message}
        `;
        
        consoleOutput.appendChild(entry);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    addToSessionLog(type, message) {
        const timestamp = new Date().toLocaleTimeString();
        this.sessionLog.push({
            timestamp,
            type,
            message
        });
        
        // Update main log area
        const logArea = document.getElementById('logArea');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            ${message}
        `;
        
        logArea.appendChild(entry);
        logArea.scrollTop = logArea.scrollHeight;
    }

    // ============================================
    // PERFORMANCE MONITORING
    // ============================================

    updatePerformanceMetrics(executionTime, parser) {
        // Update metrics
        this.lastExecutionTime = executionTime;
        this.performanceMetrics.push({
            timestamp: Date.now(),
            executionTime,
            parser,
            type: 'execution'
        });
        
        // Keep only last 50 metrics
        if (this.performanceMetrics.length > 50) {
            this.performanceMetrics.shift();
        }
        
        // Calculate averages
        const recentMetrics = this.performanceMetrics.slice(-10);
        this.averageLatency = recentMetrics.reduce((sum, m) => sum + m.executionTime, 0) / recentMetrics.length;
        
        // Update display
        this.updateMetricsDisplay();
        this.updatePerformanceChart();
    }

    updateMetricsDisplay(executionTime, parser) {
        const avgLatencyEl = document.getElementById('avgLatency');
        const parseTimeEl = document.getElementById('parseTime');
        const metricsDisplayEl = document.getElementById('metricsDisplay');
        
        if (avgLatencyEl) {
            avgLatencyEl.textContent = Math.round(this.averageLatency);
        }
        
        if (parseTimeEl) {
            parseTimeEl.textContent = Math.round(executionTime || this.lastExecutionTime);
        }
        
        if (metricsDisplayEl) {
            metricsDisplayEl.textContent = `${Math.round(executionTime || this.lastExecutionTime)}ms`;
        }
    }

    initializePerformanceChart() {
        const chartContainer = document.getElementById('performanceChart');
        if (!chartContainer) return;
        
        // Clear existing chart
        chartContainer.innerHTML = '';
        
        // Create bars for visualization
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.left = `${i * 15}px`;
            bar.style.height = '0px';
            chartContainer.appendChild(bar);
        }
    }

    updatePerformanceChart() {
        const chartContainer = document.getElementById('performanceChart');
        if (!chartContainer) return;
        
        const bars = chartContainer.querySelectorAll('.chart-bar');
        const recentMetrics = this.performanceMetrics.slice(-20);
        
        bars.forEach((bar, index) => {
            if (index < recentMetrics.length) {
                const metric = recentMetrics[index];
                const height = Math.min(metric.executionTime / 2, 80); // Scale to fit chart
                bar.style.height = `${height}px`;
                
                // Color based on parser
                if (metric.parser === 'antlr') {
                    bar.style.background = 'linear-gradient(to top, #f39c12, #e67e22)';
                } else {
                    bar.style.background = 'linear-gradient(to top, #e94560, #c0392b)';
                }
            }
        });
    }

    startPerformanceMonitoring() {
        // Monitor performance every 5 seconds
        setInterval(() => {
            this.updatePerformanceChart();
        }, 5000);
    }

    // ============================================
    // GAME STATE MANAGEMENT
    // ============================================

    async createNewGame() {
        try {
            const response = await fetch(`${this.baseUrl}/api/game/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameName: 'Enhanced Temporal Session',
                    mapSize: '20x15'
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const game = await response.json();
            this.currentGameId = game.id;
            
            // Update UI
            document.getElementById('gameId').textContent = game.id;
            
            this.addToConsole('success', `New game created: ${game.id}`);
            this.addToSessionLog('success', `New game created: ${game.id}`);
            
            // Initialize game board
            this.initializeGameBoard();
            
        } catch (error) {
            this.addToConsole('error', `Failed to create game: ${error.message}`);
            this.addToSessionLog('error', `Failed to create game: ${error.message}`);
        }
    }

    initializeGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        
        // Create 20x15 grid
        for (let i = 0; i < 300; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.addEventListener('click', () => this.handleTileClick(i));
            gameBoard.appendChild(tile);
        }
    }

    handleTileClick(index) {
        const x = index % 20;
        const y = Math.floor(index / 20);
        
        if (this.debugMode) {
            this.addToConsole('info', `Tile clicked: @${x},${y}`);
        }
        
        // Auto-fill position in console
        const input = document.getElementById('consoleInput');
        if (input.value.includes('@')) {
            input.value = input.value.replace(/@\d+,\d+/, `@${x},${y}`);
        }
    }

    async updateGameState() {
        if (!this.currentGameId || !this.isConnected) return;
        
        try {
            const response = await fetch(`${this.baseUrl}/api/game/${this.currentGameId}/state`);
            if (!response.ok) return;
            
            const state = await response.json();
            this.gameState = state;
            
            // Update UI elements
            document.getElementById('currentTurn').textContent = state.currentTurn || 0;
            document.getElementById('activePsiStates').textContent = state.psiStates?.length || 0;
            document.getElementById('heroCount').textContent = state.heroes?.length || 0;
            
            // Update ψ-states display
            this.updatePsiStatesDisplay(state.psiStates || []);
            
        } catch (error) {
            // Silently handle state update errors
        }
    }

    updatePsiStatesDisplay(psiStates) {
        const psiStateList = document.getElementById('psiStateList');
        
        if (psiStates.length === 0) {
            psiStateList.innerHTML = '<p style="color: rgba(233, 69, 96, 0.5); text-align: center; margin-top: 50px;">No active ψ-states</p>';
            return;
        }
        
        psiStateList.innerHTML = psiStates.map(psi => `
            <div class="psi-state-item">
                <div class="psi-state-header">
                    <span class="psi-state-id">${psi.psiId}</span>
                    <span class="psi-state-status">${psi.status}</span>
                </div>
                <div class="psi-state-expression">${psi.expression}</div>
            </div>
        `).join('');
    }

    startAutoRefresh() {
        // Auto-refresh game state every 2 seconds
        this.updateInterval = setInterval(() => {
            this.updateGameState();
        }, 2000);
    }

    // ============================================
    // CONSOLE TABS & ADVANCED FEATURES
    // ============================================

    switchConsoleTab(tabName) {
        // Update active tab
        document.querySelectorAll('.console-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[onclick*="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        this.currentTab = tabName;
        
        // Update console content based on tab
        switch(tabName) {
            case 'script':
                this.addToConsole('info', 'Script mode activated');
                break;
            case 'debug':
                this.debugMode = true;
                this.addToConsole('info', 'Debug mode activated - verbose output enabled');
                break;
            case 'performance':
                this.showPerformanceDetails();
                break;
        }
    }

    showPerformanceDetails() {
        this.addToConsole('info', '=== Performance Analysis ===');
        this.addToConsole('info', `Average Latency: ${Math.round(this.averageLatency)}ms`);
        this.addToConsole('info', `Total Commands: ${this.commandHistory.length}`);
        this.addToConsole('info', `Session Duration: ${this.getSessionDuration()}`);
        
        // Parser comparison
        const regexMetrics = this.performanceMetrics.filter(m => m.parser === 'regex');
        const antlrMetrics = this.performanceMetrics.filter(m => m.parser === 'antlr');
        
        if (regexMetrics.length > 0) {
            const avgRegex = regexMetrics.reduce((sum, m) => sum + m.executionTime, 0) / regexMetrics.length;
            this.addToConsole('info', `REGEX Parser Avg: ${Math.round(avgRegex)}ms`);
        }
        
        if (antlrMetrics.length > 0) {
            const avgAntlr = antlrMetrics.reduce((sum, m) => sum + m.executionTime, 0) / antlrMetrics.length;
            this.addToConsole('info', `ANTLR Parser Avg: ${Math.round(avgAntlr)}ms`);
        }
    }

    getSessionDuration() {
        const start = this.sessionLog[0]?.timestamp || new Date().toLocaleTimeString();
        const now = new Date().toLocaleTimeString();
        return `${start} - ${now}`;
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    clearConsole() {
        const consoleOutput = document.getElementById('consoleOutput');
        consoleOutput.innerHTML = '';
        this.addToConsole('info', 'Console cleared');
    }

    exportSession() {
        const sessionData = {
            timestamp: new Date().toISOString(),
            commandHistory: this.commandHistory,
            sessionLog: this.sessionLog,
            performanceMetrics: this.performanceMetrics,
            gameState: this.gameState
        };
        
        const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `temporal-session-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.addToConsole('success', 'Session exported successfully');
    }

    toggleDebugMode() {
        this.debugMode = !this.debugMode;
        const status = this.debugMode ? 'enabled' : 'disabled';
        this.addToConsole('info', `Debug mode ${status}`);
    }

    async runDemo() {
        this.addToConsole('info', 'Starting enhanced demo...');
        
        const demoCommands = [
            'HERO(Arthur)',
            'MOV(Arthur, @10,10)',
            'ψ001: ⊙(Δt+1 @11,11 ⟶ MOV(Arthur, @11,11))',
            'HERO(Merlin)',
            'MOV(Merlin, @15,8)',
            'CREATE(CREATURE, Dragon, @12,12)',
            '†ψ001'
        ];
        
        for (let i = 0; i < demoCommands.length; i++) {
            setTimeout(() => {
                document.getElementById('consoleInput').value = demoCommands[i];
                this.executeCommand(demoCommands[i]);
            }, i * 1500);
        }
    }

    async runPerformanceTest() {
        this.addToConsole('info', 'Starting performance test...');
        
        const testCommands = [
            'HERO(TestHero1)',
            'HERO(TestHero2)',
            'MOV(TestHero1, @5,5)',
            'MOV(TestHero2, @15,15)',
            'ψ001: ⊙(Δt+1 @8,8 ⟶ MOV(TestHero1, @8,8))',
            'ψ002: ⊙(Δt+2 @12,12 ⟶ MOV(TestHero2, @12,12))',
            '†ψ001',
            '†ψ002'
        ];
        
        const startTime = performance.now();
        
        for (const command of testCommands) {
            await this.executeScript(command, 'regex');
            await this.sleep(100);
        }
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        
        this.addToConsole('success', `Performance test completed in ${Math.round(totalTime)}ms`);
    }
}

// ============================================
// GLOBAL FUNCTIONS FOR HTML ONCLICK EVENTS
// ============================================

let engine;

// Initialize engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    engine = new EnhancedTemporalEngine();
});

// Global functions for HTML onclick events
window.createNewGame = () => engine?.createNewGame();
window.runDemo = () => engine?.runDemo();
window.runPerformanceTest = () => engine?.runPerformanceTest();
window.switchConsoleTab = (tab) => engine?.switchConsoleTab(tab);
window.handleConsoleKeyDown = (event) => engine?.handleConsoleKeyDown(event);
window.clearConsole = () => engine?.clearConsole();
window.exportSession = () => engine?.exportSession();
window.toggleDebugMode = () => engine?.toggleDebugMode();

// Auto-completion selection
window.selectAutocomplete = (syntax) => {
    const input = document.getElementById('consoleInput');
    input.value = syntax;
    engine?.hideAutocomplete();
    input.focus();
};

// Console log for debugging
console.log('🕰️ Enhanced Temporal Engine loaded successfully!'); 