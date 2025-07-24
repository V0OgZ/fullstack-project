// 🌫️ FOG OF WAR SYSTEM COMPLET - RÉPARÉ PAR MEMENTO !
// ====================================================

class FogOfWarSystem {
    constructor() {
        this.selectedTimeline = 'ℬ1';
        this.visibleTimelines = new Set(['ℬ1']);
        this.fogOpacity = 0.8;
        this.fogLayers = new Map(); // Stockage des couches de brouillard
        console.log('🌫️ Fog of War System initialisé !');
    }
    
    selectTimeline(timelineId) {
        this.selectedTimeline = timelineId;
        this.updateFogDisplay();
    }
    
    toggleTimelineVisibility(timelineId) {
        if (this.visibleTimelines.has(timelineId)) {
            this.visibleTimelines.delete(timelineId);
        } else {
            this.visibleTimelines.add(timelineId);
        }
        this.updateFogDisplay();
    }
    
    getFogDataForTile(x, y) {
        // Logique simple de visibilité
        const distance = Math.sqrt(x*x + y*y);
        if (distance < 3) {
            return { state: 'CLEAR', opacity: 0 };
        } else if (distance < 6) {
            return { state: 'EXPLORED', opacity: 0.3 };
        } else {
            return { state: 'HIDDEN', opacity: 0.8 };
        }
    }
    
    // 🔥 MÉTHODE MANQUANTE AJOUTÉE !
    createFogControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'fog-controls';
        controlsContainer.innerHTML = `
            <div class="fog-control-panel">
                <span class="fog-label">🌫️ Fog:</span>
                <button id="fog-toggle" class="fog-btn">ON/OFF</button>
                <input type="range" id="fog-opacity" min="0" max="100" value="80" class="fog-slider">
                <span class="fog-opacity-value">80%</span>
            </div>
        `;
        
        // Styles CSS intégrés
        const style = document.createElement('style');
        style.textContent = `
            .fog-controls {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(0,0,0,0.1);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
            }
            .fog-label {
                color: #4ECDC4;
                font-weight: bold;
            }
            .fog-btn {
                background: #4ECDC4;
                border: none;
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                cursor: pointer;
                font-size: 10px;
            }
            .fog-btn:hover {
                background: #45B7D1;
            }
            .fog-slider {
                width: 60px;
                height: 4px;
            }
            .fog-opacity-value {
                color: #4ECDC4;
                font-size: 10px;
                min-width: 25px;
            }
        `;
        document.head.appendChild(style);
        
        // Événements
        const toggleBtn = controlsContainer.querySelector('#fog-toggle');
        const opacitySlider = controlsContainer.querySelector('#fog-opacity');
        const opacityValue = controlsContainer.querySelector('.fog-opacity-value');
        
        let fogEnabled = true;
        
        toggleBtn.addEventListener('click', () => {
            fogEnabled = !fogEnabled;
            this.setFogEnabled(fogEnabled);
            toggleBtn.textContent = fogEnabled ? 'ON' : 'OFF';
            toggleBtn.style.background = fogEnabled ? '#4ECDC4' : '#666';
        });
        
        opacitySlider.addEventListener('input', (e) => {
            const opacity = e.target.value;
            this.fogOpacity = opacity / 100;
            opacityValue.textContent = opacity + '%';
            this.updateFogDisplay();
        });
        
        return controlsContainer;
    }
    
    setFogEnabled(enabled) {
        this.fogEnabled = enabled;
        this.updateFogDisplay();
    }
    
    updateFogDisplay() {
        // Mise à jour de l'affichage du brouillard
        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;
        
        // Logique de rendu du brouillard sur le canvas
        const ctx = canvas.getContext('2d');
        if (!this.fogEnabled) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
        
        // Dessiner le brouillard
        ctx.fillStyle = `rgba(0, 0, 0, ${this.fogOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Zones éclairées (exemple simple)
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 100, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    }
    
    // Méthode pour révéler une zone
    revealArea(x, y, radius = 50) {
        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    }
}

window.FogOfWarSystem = FogOfWarSystem;
