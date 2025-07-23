// 🌈 TIMELINE DIODES SYSTEM - Diodes discrètes avec couleurs
// =========================================================

class TimelineDiodesSystem {
    constructor() {
        this.selectedTimeline = 'ℬ1';
        this.visibleTimelines = new Set(['ℬ1']);
        
        // 🌈 COULEURS PAR TIMELINE
        this.timelineColors = {
            'ℬ1': '#FF6B6B',  // Rouge - Timeline principale
            'ℬ2': '#4ECDC4',  // Cyan - Timeline alternative  
            'ℬ3': '#45B7D1',  // Bleu - Timeline passée
            'ℬ4': '#96CEB4',  // Vert - Timeline future
            'ℬ5': '#FFEAA7',  // Jaune - Timeline quantique
            'ℬ6': '#DDA0DD',  // Violet - Timeline paradoxe
            'ℬ7': '#98D8C8'   // Turquoise - Timeline anchor
        };
        
        // 🔍 MODES DE TRANSPARENCE
        this.transparencyModes = {
            'active': { opacity: 1.0, label: 'Active' },
            'visible': { opacity: 0.7, label: 'Visible' },
            'ghost': { opacity: 0.3, label: 'Fantôme' },
            'hidden': { opacity: 0.1, label: 'Caché' }
        };
        
        console.log('🌈 Timeline Diodes System initialisé');
    }
    
    // 🏗️ CRÉER CONTAINER DE DIODES
    createDiodesContainer() {
        const container = document.createElement('div');
        container.className = 'timeline-diodes-container';
        container.style.cssText = `
            display: flex;
            gap: 4px;
            align-items: center;
            margin: 0 6px;
        `;
        
        Object.keys(this.timelineColors).forEach(timelineId => {
            const diode = this.createSingleDiode(timelineId);
            container.appendChild(diode);
        });
        
        return container;
    }
    
    // 💡 CRÉER UNE DIODE
    createSingleDiode(timelineId) {
        const diode = document.createElement('div');
        diode.className = 'timeline-diode';
        diode.dataset.timeline = timelineId;
        
        const color = this.timelineColors[timelineId];
        const mode = this.getTimelineMode(timelineId);
        const modeData = this.transparencyModes[mode];
        const isSelected = this.selectedTimeline === timelineId;
        
        diode.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: ${color};
            opacity: ${modeData.opacity};
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid ${isSelected ? '#FFF' : 'transparent'};
            box-shadow: ${isSelected ? `0 0 8px ${color}` : 'none'};
        `;
        
        if (isSelected) {
            diode.style.animation = 'diodePulse 2s infinite';
        }
        
        diode.title = `Timeline ${timelineId} - ${modeData.label}`;
        
        diode.addEventListener('click', (e) => this.handleDiodeClick(timelineId, e));
        diode.addEventListener('mouseenter', () => {
            diode.style.transform = 'scale(1.3)';
            diode.style.opacity = Math.min(1.0, modeData.opacity + 0.3);
        });
        diode.addEventListener('mouseleave', () => {
            diode.style.transform = 'scale(1)';
            diode.style.opacity = modeData.opacity;
        });
        
        return diode;
    }
    
    handleDiodeClick(timelineId, event) {
        event.stopPropagation();
        
        if (event.shiftKey) {
            this.toggleTimelineVisibility(timelineId);
        } else {
            this.selectTimeline(timelineId);
        }
        
        this.refreshAllDiodes();
        console.log(`🌈 Timeline ${timelineId} clicked`);
    }
    
    getTimelineMode(timelineId) {
        if (this.selectedTimeline === timelineId) return 'active';
        if (this.visibleTimelines.has(timelineId)) return 'visible';
        return 'hidden';
    }
    
    selectTimeline(timelineId) {
        this.selectedTimeline = timelineId;
        this.visibleTimelines.add(timelineId);
    }
    
    toggleTimelineVisibility(timelineId) {
        if (this.visibleTimelines.has(timelineId)) {
            this.visibleTimelines.delete(timelineId);
        } else {
            this.visibleTimelines.add(timelineId);
        }
    }
    
    refreshAllDiodes() {
        const diodes = document.querySelectorAll('.timeline-diode');
        diodes.forEach(diode => {
            const timelineId = diode.dataset.timeline;
            const color = this.timelineColors[timelineId];
            const mode = this.getTimelineMode(timelineId);
            const modeData = this.transparencyModes[mode];
            const isSelected = this.selectedTimeline === timelineId;
            
            diode.style.background = color;
            diode.style.opacity = modeData.opacity;
            diode.style.border = `2px solid ${isSelected ? '#FFF' : 'transparent'}`;
            diode.style.animation = isSelected ? 'diodePulse 2s infinite' : 'none';
        });
    }
    
    createZFCHeaderControls() {
        const controls = document.createElement('div');
        controls.className = 'fog-controls-header';
        
        const label = document.createElement('span');
        label.className = 'fog-header-compact';
        label.textContent = '🌫️ ZFC';
        controls.appendChild(label);
        
        const diodesContainer = this.createDiodesContainer();
        controls.appendChild(diodesContainer);
        
        const status = document.createElement('span');
        status.className = 'fog-status-header';
        status.textContent = 'SYS';
        controls.appendChild(status);
        
        return controls;
    }
}

window.TimelineDiodesSystem = TimelineDiodesSystem;

document.addEventListener('DOMContentLoaded', () => {
    window.timelineDiodesSystem = new TimelineDiodesSystem();
    
    const headerContainer = document.getElementById('fog-controls-header');
    if (headerContainer) {
        headerContainer.replaceWith(window.timelineDiodesSystem.createZFCHeaderControls());
    }
    
    console.log('🌈 Timeline Diodes intégrées !');
});
