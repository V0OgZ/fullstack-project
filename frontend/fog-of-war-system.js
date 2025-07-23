// 🌫️ FOG SYSTEM MINIMAL - Juste la logique, pas d'interface
// =========================================================

class FogOfWarSystem {
    constructor() {
        this.selectedTimeline = 'ℬ1';
        this.visibleTimelines = new Set(['ℬ1']);
        this.fogOpacity = 0.8;
        // Silencieux - pas de logs
    }
    
    selectTimeline(timelineId) {
        this.selectedTimeline = timelineId;
    }
    
    toggleTimelineVisibility(timelineId) {
        if (this.visibleTimelines.has(timelineId)) {
            this.visibleTimelines.delete(timelineId);
        } else {
            this.visibleTimelines.add(timelineId);
        }
    }
    
    getFogDataForTile(x, y) {
        return { state: 'VISION', opacity: 0.1 };
    }
}

window.FogOfWarSystem = FogOfWarSystem;
