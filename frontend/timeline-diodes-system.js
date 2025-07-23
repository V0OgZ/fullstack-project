// 🔹 TIMELINE DIODES MINIMAL - 3 timelines max, super discret
// ========================================================

class TimelineDiodesSystem {
    constructor() {
        this.selectedTimeline = 'ℬ1';
        this.visibleTimelines = new Set(['ℬ1']);
        
        // 🔹 SEULEMENT 3 TIMELINES - Simple et efficace
        this.timelineColors = {
            'ℬ1': '#4ECDC4',  // Cyan - Présent
            'ℬ2': '#FF6B6B',  // Rouge - Passé alternatif
            'ℬ3': '#96CEB4'   // Vert - Futur possible
        };
        
        // 🔍 MODES ULTRA-SIMPLES
        this.transparencyModes = {
            'active': { opacity: 1.0 },
            'visible': { opacity: 0.5 },
            'hidden': { opacity: 0.15 }
        };
        
        console.log('🔹 Timeline Diodes - Mode minimal (3 timelines)');
    }
    
    // 🔹 CRÉER DIODES ULTRA-DISCRÈTES
    createDiodesContainer() {
        const container = document.createElement('div');
        container.className = 'timeline-diodes-minimal';
        container.style.cssText = `
            display: flex;
            gap: 6px;
            align-items: center;
            margin-left: auto;
        `;
        
        Object.keys(this.timelineColors).forEach(timelineId => {
            const diode = this.createMinimalDiode(timelineId);
            container.appendChild(diode);
        });
        
        return container;
    }
    
    // 💎 DIODE ULTRA-MINIMALISTE
    createMinimalDiode(timelineId) {
        const diode = document.createElement('div');
        diode.className = 'timeline-diode-minimal';
        diode.dataset.timeline = timelineId;
        
        const color = this.timelineColors[timelineId];
        const mode = this.getTimelineMode(timelineId);
        const opacity = this.transparencyModes[mode].opacity;
        const isSelected = this.selectedTimeline === timelineId;
        
        diode.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${color};
            opacity: ${opacity};
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid ${isSelected ? color : 'transparent'};
            box-shadow: ${isSelected ? `0 0 4px ${color}` : 'none'};
        `;
        
        // Hover ultra-discret
        diode.addEventListener('mouseenter', () => {
            diode.style.opacity = Math.min(1.0, opacity + 0.3);
            diode.style.transform = 'scale(1.2)';
        });
        
        diode.addEventListener('mouseleave', () => {
            diode.style.opacity = opacity;
            diode.style.transform = 'scale(1)';
        });
        
        // Click simple
        diode.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectTimeline(timelineId);
            this.refreshAllDiodes();
        });
        
        return diode;
    }
    
    getTimelineMode(timelineId) {
        if (this.selectedTimeline === timelineId) return 'active';
        if (this.visibleTimelines.has(timelineId)) return 'visible';
        return 'hidden';
    }
    
    selectTimeline(timelineId) {
        this.selectedTimeline = timelineId;
        this.visibleTimelines.add(timelineId);
        console.log(`🔹 Timeline ${timelineId}`);
    }
    
    refreshAllDiodes() {
        const diodes = document.querySelectorAll('.timeline-diode-minimal');
        diodes.forEach(diode => {
            const timelineId = diode.dataset.timeline;
            const color = this.timelineColors[timelineId];
            const mode = this.getTimelineMode(timelineId);
            const opacity = this.transparencyModes[mode].opacity;
            const isSelected = this.selectedTimeline === timelineId;
            
            diode.style.background = color;
            diode.style.opacity = opacity;
            diode.style.border = `1px solid ${isSelected ? color : 'transparent'}`;
            diode.style.boxShadow = isSelected ? `0 0 4px ${color}` : 'none';
        });
    }
    
    // 🔹 INTÉGRATION HEADER MINIMAL
    integrateIntoHeader() {
        const header = document.querySelector('.header .controls');
        if (header) {
            const diodesContainer = this.createDiodesContainer();
            header.appendChild(diodesContainer);
        }
    }
}

window.TimelineDiodesSystem = TimelineDiodesSystem;

document.addEventListener('DOMContentLoaded', () => {
    window.timelineDiodesSystem = new TimelineDiodesSystem();
    window.timelineDiodesSystem.integrateIntoHeader();
    console.log('🔹 Diodes minimalistes intégrées');
});
