// temporal-integration.js - Intégration avec le système temporel
class TemporalIntegration {
    constructor() {
        this.currentTimeline = 'ℬ1';
        this.currentTurn = 0;
        this.decayLevel = 0;
        this.lastDecayCheck = Date.now();
        this.decayInterval = 30000; // 30 secondes
        this.initializeDecayMonitoring();
    }
    
    initializeDecayMonitoring() {
        // Vérifier la décroissance temporelle périodiquement
        setInterval(() => {
            this.checkTemporalDecay();
        }, this.decayInterval);
    }
    
    async checkTemporalDecay() {
        if (!window.gameAPI || !window.gameAPI.gameId) {
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:8080/api/temporal/games/${window.gameAPI.gameId}/decay/status`);
            if (response.ok) {
                const status = await response.json();
                this.updateDecayDisplay(status);
            }
        } catch (error) {
            console.log('Decay status check failed:', error);
        }
    }
    
    updateDecayDisplay(status) {
        const decayStatus = document.getElementById('decay-status');
        if (decayStatus) {
            if (status.hasDecay) {
                decayStatus.innerHTML = `Decay: <span style="color: #ffc107;">⚠️ ${status.decayLevel}%</span>`;
                decayStatus.style.color = '#ffc107';
            } else {
                decayStatus.innerHTML = 'Decay: <span style="color: #28a745;">✅ None</span>';
                decayStatus.style.color = '#28a745';
            }
        }
        
        // Mettre à jour l'overlay temporel
        this.updateTemporalOverlay(status);
    }
    
    updateTemporalOverlay(status) {
        const currentTimeline = document.getElementById('current-timeline');
        const currentTurn = document.getElementById('current-turn');
        
        if (currentTimeline) {
            currentTimeline.textContent = `Timeline: ${this.currentTimeline}`;
        }
        
        if (currentTurn) {
            currentTurn.textContent = `Turn: ${this.currentTurn}`;
        }
        
        // Ajouter des effets visuels si la décroissance est active
        if (status.hasDecay && status.decayLevel > 50) {
            this.addDecayVisualEffects();
        } else {
            this.removeDecayVisualEffects();
        }
    }
    
    addDecayVisualEffects() {
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            canvas.style.filter = 'sepia(0.3) hue-rotate(30deg)';
            canvas.style.transition = 'filter 0.5s ease';
        }
        
        // Ajouter un effet de tremblement subtil
        document.body.style.animation = 'decayShake 2s ease-in-out infinite';
    }
    
    removeDecayVisualEffects() {
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            canvas.style.filter = 'none';
        }
        
        document.body.style.animation = 'none';
    }
    
    // Fonction pour simuler l'application de décroissance
    async simulateDecayApplication() {
        if (!window.gameAPI || !window.gameAPI.gameId) {
            return { success: false, message: 'No active game' };
        }
        
        try {
            // Créer des bâtiments simulés pour tester la décroissance
            await this.createTestBuildings();
            
            // Appliquer la décroissance
            const response = await fetch(`http://localhost:8080/api/temporal/games/${window.gameAPI.gameId}/decay/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const result = await response.json();
                this.showDecayResult(result);
                return result;
            } else {
                const error = await response.text();
                return { success: false, message: error };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
    async createTestBuildings() {
        // Créer quelques bâtiments de test pour la démonstration
        const buildingCommands = [
            'CREATE(BUILDING, castle, @5,5)',
            'CREATE(BUILDING, tower, @8,8)',
            'CREATE(BUILDING, barracks, @3,3)'
        ];
        
        for (const command of buildingCommands) {
            try {
                await window.gameAPI.executeScript(command);
            } catch (error) {
                console.log(`Failed to create building: ${command}`, error);
            }
        }
    }
    
    showDecayResult(result) {
        if (window.scriptConsole) {
            window.scriptConsole.addToOutput(`🎭 Anna's Decay Applied!`, 'warning');
            window.scriptConsole.addToOutput(`💥 ${result.message}`, 'warning');
            
            if (result.affectedBuildings > 0) {
                window.scriptConsole.addToOutput(`🏗️ Buildings affected: ${result.affectedBuildings}`, 'info');
            }
            
            if (result.destroyedBuildings > 0) {
                window.scriptConsole.addToOutput(`💀 Buildings destroyed: ${result.destroyedBuildings}`, 'error');
            }
            
            if (result.quote) {
                window.scriptConsole.addToOutput(`"${result.quote}" - Anna the Martopicker`, 'warning');
            }
        }
        
        // Mettre à jour l'affichage des stats
        this.updateDecayStats(result);
    }
    
    updateDecayStats(result) {
        const decayStats = document.getElementById('decay-stats');
        if (!decayStats) return;
        
        decayStats.innerHTML = `
            <div class="decay-stat">
                <span class="label">Affected:</span>
                <span class="value">${result.affectedBuildings || 0}</span>
            </div>
            <div class="decay-stat">
                <span class="label">Destroyed:</span>
                <span class="value">${result.destroyedBuildings || 0}</span>
            </div>
            <div class="decay-stat">
                <span class="label">Quote:</span>
                <span class="value">"${result.quote || 'Time waits for no one...'}"</span>
            </div>
        `;
    }
    
    // Fonction pour réparer les bâtiments
    async repairBuildings(buildingType = 'castle', x = 5, y = 5, repairAmount = 50) {
        if (!window.gameAPI || !window.gameAPI.gameId) {
            return { success: false, message: 'No active game' };
        }
        
        try {
            const response = await fetch(`http://localhost:8080/api/temporal/games/${window.gameAPI.gameId}/decay/repair`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    buildingType: buildingType,
                    x: x,
                    y: y,
                    repairAmount: repairAmount
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                if (window.scriptConsole) {
                    window.scriptConsole.addToOutput(`🔧 Building repaired: ${result.message}`, 'success');
                }
                return result;
            } else {
                const error = await response.text();
                return { success: false, message: error };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
    // Fonction pour obtenir les statistiques de décroissance
    async getDecayStats() {
        if (!window.gameAPI || !window.gameAPI.gameId) {
            return null;
        }
        
        try {
            const response = await fetch(`http://localhost:8080/api/temporal/games/${window.gameAPI.gameId}/decay/stats`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log('Failed to get decay stats:', error);
        }
        
        return null;
    }
    
    // Fonction pour mettre à jour l'état temporel
    updateTemporalState(timeline, turn) {
        this.currentTimeline = timeline || this.currentTimeline;
        this.currentTurn = turn || this.currentTurn;
        
        const currentTimeline = document.getElementById('current-timeline');
        const currentTurn = document.getElementById('current-turn');
        
        if (currentTimeline) {
            currentTimeline.textContent = `Timeline: ${this.currentTimeline}`;
        }
        
        if (currentTurn) {
            currentTurn.textContent = `Turn: ${this.currentTurn}`;
        }
    }
}

// Styles CSS pour les effets de décroissance
const decayStyles = `
@keyframes decayShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-1px); }
    75% { transform: translateX(1px); }
}

.decay-warning {
    color: #ffc107 !important;
    animation: decayShake 0.5s ease-in-out;
}

.decay-critical {
    color: #dc3545 !important;
    animation: decayShake 0.3s ease-in-out infinite;
}
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = decayStyles;
document.head.appendChild(styleSheet); 