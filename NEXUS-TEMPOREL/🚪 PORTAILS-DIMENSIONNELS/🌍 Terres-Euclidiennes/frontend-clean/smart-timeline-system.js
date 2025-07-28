// 🧠 SMART TIMELINE SYSTEM - Intelligent scaling
// ==============================================

class SmartTimelineSystem {
    constructor() {
        this.maxVisibleTimelines = 5; // Max 5 diodes visibles
        this.allTimelines = new Map(); // Toutes les timelines
        this.visibleTimelines = new Set(['ℬ1']); // Timelines affichées
        this.selectedTimeline = 'ℬ1';
        
        // Colors pool intelligent
        this.colorPool = [
            '#4ECDC4', '#FF6B6B', '#96CEB4', '#45B7D1', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#FF9F43', '#6C5CE7', '#00B894'
        ];
    }
    
    // 🧠 AJOUTER TIMELINE INTELLIGEMMENT
    addTimeline(timelineId, priority = 'normal') {
        this.allTimelines.set(timelineId, {
            id: timelineId,
            priority: priority, // 'high', 'normal', 'low' 
            lastUsed: Date.now(),
            color: this.getNextColor()
        });
        
        // Auto-optimiser l'affichage
        this.optimizeVisibleTimelines();
    }
    
    // 🎯 OPTIMISER LES TIMELINES VISIBLES
    optimizeVisibleTimelines() {
        const allTimelinesList = Array.from(this.allTimelines.values());
        
        // Trier par priorité et usage récent
        const prioritized = allTimelinesList.sort((a, b) => {
            const priorityScore = this.getPriorityScore(a) - this.getPriorityScore(b);
            if (priorityScore !== 0) return priorityScore;
            return b.lastUsed - a.lastUsed; // Plus récent en premier
        });
        
        // Garder seulement les top N
        this.visibleTimelines.clear();
        prioritized.slice(0, this.maxVisibleTimelines).forEach(timeline => {
            this.visibleTimelines.add(timeline.id);
        });
        
        // Toujours inclure la timeline sélectionnée
        this.visibleTimelines.add(this.selectedTimeline);
    }
    
    getPriorityScore(timeline) {
        const scores = { 'high': 1, 'normal': 2, 'low': 3 };
        return scores[timeline.priority] || 2;
    }
    
    getNextColor() {
        const usedColors = Array.from(this.allTimelines.values()).map(t => t.color);
        return this.colorPool.find(color => !usedColors.includes(color)) || this.colorPool[0];
    }
    
    // 🔄 CRÉER DIODES INTELLIGENTES
    createSmartDiodes() {
        const container = document.createElement('div');
        container.className = 'smart-timeline-diodes';
        container.style.cssText = `
            display: flex;
            gap: 4px;
            align-items: center;
            margin-left: auto;
            margin-right: 10px;
            max-width: 80px; /* Limite la taille */
            overflow: hidden;
        `;
        
        // Compter les timelines cachées
        const hiddenCount = this.allTimelines.size - this.visibleTimelines.size;
        
        // Créer diodes pour timelines visibles
        Array.from(this.visibleTimelines).forEach(timelineId => {
            const timeline = this.allTimelines.get(timelineId);
            if (timeline) {
                const diode = this.createSmartDiode(timeline);
                container.appendChild(diode);
            }
        });
        
        // Ajouter indicateur pour timelines cachées
        if (hiddenCount > 0) {
            const moreIndicator = this.createMoreIndicator(hiddenCount);
            container.appendChild(moreIndicator);
        }
        
        return container;
    }
    
    createSmartDiode(timeline) {
        const diode = document.createElement('div');
        diode.className = 'smart-timeline-diode';
        diode.dataset.timeline = timeline.id;
        
        const isSelected = this.selectedTimeline === timeline.id;
        const opacity = isSelected ? 1.0 : 0.6;
        
        diode.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${timeline.color};
            opacity: ${opacity};
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid ${isSelected ? timeline.color : 'transparent'};
        `;
        
        diode.title = `Timeline ${timeline.id} (${timeline.priority})`;
        
        diode.addEventListener('click', () => {
            this.selectTimeline(timeline.id);
            this.refreshDisplay();
        });
        
        return diode;
    }
    
    createMoreIndicator(count) {
        const indicator = document.createElement('div');
        indicator.className = 'timeline-more-indicator';
        indicator.textContent = `+${count}`;
        indicator.style.cssText = `
            font-size: 8px;
            color: #87CEEB;
            cursor: pointer;
            padding: 2px;
            border-radius: 2px;
            background: rgba(135, 206, 235, 0.2);
        `;
        
        indicator.title = `${count} autres timelines`;
        indicator.addEventListener('click', () => this.showTimelineSelector());
        
        return indicator;
    }
    
    // 📋 SÉLECTEUR TIMELINES
    showTimelineSelector() {
        const selector = document.createElement('div');
        selector.className = 'timeline-selector-popup';
        selector.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            background: rgba(20, 20, 30, 0.95);
            border: 1px solid #4A90E2;
            border-radius: 6px;
            padding: 10px;
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
        `;
        
        const title = document.createElement('div');
        title.textContent = 'Toutes les timelines';
        title.style.cssText = `
            color: #4A90E2;
            font-weight: bold;
            margin-bottom: 8px;
            font-size: 0.8rem;
        `;
        selector.appendChild(title);
        
        Array.from(this.allTimelines.values()).forEach(timeline => {
            const item = document.createElement('div');
            item.textContent = `${timeline.id} (${timeline.priority})`;
            item.style.cssText = `
                padding: 4px 8px;
                cursor: pointer;
                border-radius: 3px;
                font-size: 0.75rem;
                margin-bottom: 2px;
                border-left: 3px solid ${timeline.color};
            `;
            
            item.addEventListener('click', () => {
                this.selectTimeline(timeline.id);
                this.refreshDisplay();
                document.body.removeChild(selector);
            });
            
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(74, 144, 226, 0.3)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
            
            selector.appendChild(item);
        });
        
        document.body.appendChild(selector);
        
        // Fermer en cliquant ailleurs
        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!selector.contains(e.target)) {
                    document.body.removeChild(selector);
                }
            }, {once: true});
        }, 100);
    }
    
    selectTimeline(timelineId) {
        this.selectedTimeline = timelineId;
        
        // Mettre à jour lastUsed
        const timeline = this.allTimelines.get(timelineId);
        if (timeline) {
            timeline.lastUsed = Date.now();
        }
        
        this.optimizeVisibleTimelines();
    }
    
    refreshDisplay() {
        const container = document.querySelector('.smart-timeline-diodes');
        if (container && container.parentNode) {
            const newContainer = this.createSmartDiodes();
            container.parentNode.replaceChild(newContainer, container);
        }
    }
    
    // 🎯 INTÉGRER DANS HEADER
    integrateIntoHeader() {
        const header = document.querySelector('.header .controls');
        if (header) {
            const diodesContainer = this.createSmartDiodes();
            header.appendChild(diodesContainer);
        }
    }
}

window.SmartTimelineSystem = SmartTimelineSystem;
