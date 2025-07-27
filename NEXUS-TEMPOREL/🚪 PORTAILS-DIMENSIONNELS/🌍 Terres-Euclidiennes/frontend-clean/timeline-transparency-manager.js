// 🌀 TIMELINE TRANSPARENCY MANAGER - JEAN EDITION
// =================================================
// Système de gestion des timelines transparentes
// Timelines non-sélectionnées affichées en mode transparent

class TimelineTransparencyManager {
    constructor() {
        // Configuration des timelines
        this.timelines = new Map();
        this.selectedTimeline = 'ℬ1'; // Timeline principale par défaut
        this.visibleTimelines = new Set(['ℬ1']);
        
        // Niveaux de transparence
        this.transparencyLevels = {
            SELECTED: 1.0,        // Timeline active - opaque
            VISIBLE: 0.7,         // Timeline visible - semi-transparente
            BACKGROUND: 0.3,      // Timeline arrière-plan - très transparente
            HIDDEN: 0.0           // Timeline cachée - invisible
        };
        
        // Couleurs par timeline
        this.timelineColors = {
            'ℬ1': '#4a90e2',     // Bleu principal
            'ℬ2': '#e74c3c',     // Rouge
            'ℬ3': '#2ecc71',     // Vert
            'ℬ4': '#f39c12',     // Orange
            'ℬ5': '#9b59b6',     // Violet
            'ℬ6': '#1abc9c',     // Turquoise
            'ℬ7': '#34495e'      // Gris
        };
        
        // États des éléments par timeline
        this.timelineElements = new Map();
        
        console.log('🌀 Timeline Transparency Manager initialisé');
    }
    
    // 🎯 INITIALISER TIMELINE
    initTimeline(timelineId, name, description) {
        const timeline = {
            id: timelineId,
            name: name,
            description: description,
            elements: new Map(), // Héros, bâtiments, unités
            opacity: this.selectedTimeline === timelineId ? 1.0 : 0.3,
            color: this.timelineColors[timelineId] || '#888888',
            visible: this.visibleTimelines.has(timelineId),
            lastUpdate: Date.now()
        };
        
        this.timelines.set(timelineId, timeline);
        console.log(`🌀 Timeline ${timelineId} initialisée: ${name}`);
        
        return timeline;
    }
    
    // 🎮 SÉLECTIONNER TIMELINE
    selectTimeline(timelineId) {
        const oldSelected = this.selectedTimeline;
        this.selectedTimeline = timelineId;
        
        // Mettre à jour les opacités
        this.updateAllOpacities();
        
        // Ajouter à la liste visible si pas déjà présent
        this.visibleTimelines.add(timelineId);
        
        console.log(`🌀 Timeline sélectionnée: ${oldSelected} → ${timelineId}`);
        
        // Notifier les listeners
        this.notifyTimelineChange(oldSelected, timelineId);
    }
    
    // 👁️ BASCULER VISIBILITÉ TIMELINE
    toggleTimelineVisibility(timelineId) {
        if (this.visibleTimelines.has(timelineId)) {
            // Ne pas cacher la timeline sélectionnée
            if (timelineId === this.selectedTimeline) {
                console.warn(`⚠️ Impossible de cacher la timeline sélectionnée: ${timelineId}`);
                return false;
            }
            
            this.visibleTimelines.delete(timelineId);
            console.log(`👁️ Timeline ${timelineId} cachée`);
        } else {
            this.visibleTimelines.add(timelineId);
            console.log(`👁️ Timeline ${timelineId} affichée`);
        }
        
        this.updateAllOpacities();
        return true;
    }
    
    // 🔄 METTRE À JOUR TOUTES LES OPACITÉS
    updateAllOpacities() {
        for (const [timelineId, timeline] of this.timelines) {
            let newOpacity;
            
            if (timelineId === this.selectedTimeline) {
                newOpacity = this.transparencyLevels.SELECTED;
            } else if (this.visibleTimelines.has(timelineId)) {
                newOpacity = this.transparencyLevels.VISIBLE;
            } else {
                newOpacity = this.transparencyLevels.BACKGROUND;
            }
            
            timeline.opacity = newOpacity;
            timeline.visible = newOpacity > 0;
            
            // Appliquer aux éléments DOM
            this.applyOpacityToElements(timelineId, newOpacity);
        }
    }
    
    // 🎨 APPLIQUER OPACITÉ AUX ÉLÉMENTS DOM
    applyOpacityToElements(timelineId, opacity) {
        // Sélecteurs pour les éléments de timeline
        const selectors = [
            `.timeline-${timelineId}`,
            `[data-timeline="${timelineId}"]`,
            `.hero-timeline-${timelineId}`,
            `.building-timeline-${timelineId}`,
            `.unit-timeline-${timelineId}`
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.opacity = opacity.toString();
                element.style.transition = 'opacity 0.3s ease';
                
                // Ajouter classe pour CSS avancé
                element.classList.toggle('timeline-transparent', opacity < 1.0);
                element.classList.toggle('timeline-background', opacity <= 0.3);
            });
        });
    }
    
    // 🎯 AJOUTER ÉLÉMENT À TIMELINE
    addElementToTimeline(timelineId, elementId, elementType, position, data = {}) {
        if (!this.timelines.has(timelineId)) {
            this.initTimeline(timelineId, `Timeline ${timelineId}`, 'Auto-créée');
        }
        
        const timeline = this.timelines.get(timelineId);
        const element = {
            id: elementId,
            type: elementType, // 'hero', 'building', 'unit', 'resource'
            position: position,
            data: data,
            opacity: timeline.opacity,
            visible: timeline.visible,
            timestamp: Date.now()
        };
        
        timeline.elements.set(elementId, element);
        
        // Appliquer l'opacité immédiatement
        setTimeout(() => {
            this.applyOpacityToElement(elementId, timeline.opacity);
        }, 10);
        
        console.log(`🎯 Élément ${elementId} ajouté à timeline ${timelineId}`);
    }
    
    // 🎨 APPLIQUER OPACITÉ À UN ÉLÉMENT SPÉCIFIQUE
    applyOpacityToElement(elementId, opacity) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.opacity = opacity.toString();
            element.style.transition = 'opacity 0.3s ease';
        }
        
        // Aussi par classe/attribut
        const elementsByClass = document.querySelectorAll(`.element-${elementId}`);
        elementsByClass.forEach(el => {
            el.style.opacity = opacity.toString();
            el.style.transition = 'opacity 0.3s ease';
        });
    }
    
    // 🌈 OBTENIR COULEUR TIMELINE AVEC OPACITÉ
    getTimelineColor(timelineId, withOpacity = true) {
        const timeline = this.timelines.get(timelineId);
        if (!timeline) return '#888888';
        
        const baseColor = timeline.color;
        
        if (withOpacity) {
            // Convertir hex en rgba avec opacité
            const r = parseInt(baseColor.slice(1, 3), 16);
            const g = parseInt(baseColor.slice(3, 5), 16);
            const b = parseInt(baseColor.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${timeline.opacity})`;
        }
        
        return baseColor;
    }
    
    // 🔍 FILTRER ÉLÉMENTS VISIBLES
    getVisibleElements() {
        const visibleElements = [];
        
        for (const [timelineId, timeline] of this.timelines) {
            if (timeline.visible) {
                for (const [elementId, element] of timeline.elements) {
                    visibleElements.push({
                        ...element,
                        timelineId: timelineId,
                        timelineOpacity: timeline.opacity,
                        timelineColor: timeline.color
                    });
                }
            }
        }
        
        return visibleElements;
    }
    
    // 📊 CRÉER INTERFACE SÉLECTEUR TIMELINE
    createTimelineSelector(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} non trouvé`);
            return;
        }
        
        const selectorHTML = `
            <div class="timeline-selector">
                <h4>🌀 Timelines</h4>
                <div class="timeline-list">
                    ${Array.from(this.timelines.entries()).map(([id, timeline]) => `
                        <div class="timeline-item ${id === this.selectedTimeline ? 'selected' : ''}" 
                             data-timeline="${id}">
                            <div class="timeline-color" 
                                 style="background-color: ${timeline.color}; opacity: ${timeline.opacity}"></div>
                            <span class="timeline-name">${timeline.name}</span>
                            <button class="timeline-toggle ${timeline.visible ? 'visible' : 'hidden'}" 
                                    onclick="window.timelineManager.toggleTimelineVisibility('${id}')">
                                ${timeline.visible ? '👁️' : '🙈'}
                            </button>
                            <button class="timeline-select" 
                                    onclick="window.timelineManager.selectTimeline('${id}')">
                                ${id === this.selectedTimeline ? '✅' : '⭕'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = selectorHTML;
    }
    
    // 🎨 CRÉER STYLES CSS POUR TIMELINES
    createTimelineStyles() {
        const styleId = 'timeline-transparency-styles';
        
        // Supprimer ancien style si existe
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .timeline-selector {
                background: rgba(0, 0, 0, 0.8);
                border-radius: 8px;
                padding: 1rem;
                margin: 0.5rem;
                border: 1px solid #4a90e2;
            }
            
            .timeline-selector h4 {
                margin: 0 0 0.5rem 0;
                color: #4a90e2;
                font-size: 0.9rem;
            }
            
            .timeline-list {
                display: flex;
                flex-direction: column;
                gap: 0.3rem;
            }
            
            .timeline-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.3rem;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0.05);
                transition: all 0.3s ease;
            }
            
            .timeline-item.selected {
                background: rgba(74, 144, 226, 0.2);
                border: 1px solid #4a90e2;
            }
            
            .timeline-color {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .timeline-name {
                flex: 1;
                font-size: 0.8rem;
                color: #e8e8e8;
            }
            
            .timeline-toggle, .timeline-select {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 0.8rem;
                padding: 0.2rem;
                border-radius: 3px;
                transition: background 0.2s ease;
            }
            
            .timeline-toggle:hover, .timeline-select:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .timeline-transparent {
                pointer-events: auto;
                filter: brightness(0.7);
            }
            
            .timeline-background {
                pointer-events: none;
                filter: brightness(0.4) contrast(0.8);
            }
            
            /* Effets hover pour timelines transparentes */
            .timeline-transparent:hover {
                opacity: 0.9 !important;
                filter: brightness(1.0);
                transition: all 0.2s ease;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // 📡 NOTIFICATION CHANGEMENT TIMELINE
    notifyTimelineChange(oldTimelineId, newTimelineId) {
        // Event custom pour autres systèmes
        window.dispatchEvent(new CustomEvent('timeline-changed', {
            detail: {
                old: oldTimelineId,
                new: newTimelineId,
                visible: Array.from(this.visibleTimelines),
                timestamp: Date.now()
            }
        }));
        
        // Notifier fog system si disponible
        if (window.fogSystem && window.fogSystem.selectTimeline) {
            window.fogSystem.selectTimeline(newTimelineId);
        }
        
        // Notifier WebSocket si disponible
        if (window.wsHandler && window.wsHandler.sendMessage) {
            window.wsHandler.sendMessage({
                type: 'timeline_selection_change',
                timeline: newTimelineId,
                visible: Array.from(this.visibleTimelines)
            });
        }
    }
    
    // 📊 STATISTIQUES TIMELINE
    getTimelineStatistics() {
        const stats = {
            totalTimelines: this.timelines.size,
            selectedTimeline: this.selectedTimeline,
            visibleCount: this.visibleTimelines.size,
            totalElements: 0,
            elementsByTimeline: {},
            opacityDistribution: {}
        };
        
        for (const [timelineId, timeline] of this.timelines) {
            const elementCount = timeline.elements.size;
            stats.totalElements += elementCount;
            stats.elementsByTimeline[timelineId] = elementCount;
            
            const opacityKey = timeline.opacity.toString();
            stats.opacityDistribution[opacityKey] = (stats.opacityDistribution[opacityKey] || 0) + 1;
        }
        
        return stats;
    }
    
    // 🧹 NETTOYAGE
    cleanup() {
        // Supprimer styles
        const style = document.getElementById('timeline-transparency-styles');
        if (style) {
            style.remove();
        }
        
        // Nettoyer données
        this.timelines.clear();
        this.timelineElements.clear();
        this.visibleTimelines.clear();
        
        console.log('🧹 Timeline Transparency Manager nettoyé');
    }
}

// 🌍 EXPORT GLOBAL
window.TimelineTransparencyManager = TimelineTransparencyManager;

// 🎯 AUTO-INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window !== 'undefined') {
        window.timelineManager = new TimelineTransparencyManager();
        
        // Créer styles CSS
        window.timelineManager.createTimelineStyles();
        
        // Initialiser timelines par défaut
        window.timelineManager.initTimeline('ℬ1', 'Timeline Principale', 'Timeline de jeu principale');
        window.timelineManager.initTimeline('ℬ2', 'Timeline Alternative', 'Branche temporelle alternative');
        window.timelineManager.initTimeline('ℬ3', 'Timeline Quantique', 'Superposition quantique');
        
        console.log('🌀 Timeline Transparency Manager prêt !');
        console.log('💡 Usage: window.timelineManager.selectTimeline("ℬ2")');
        console.log('👁️ Toggle: window.timelineManager.toggleTimelineVisibility("ℬ3")');
        
        // Test après 2 secondes
        setTimeout(() => {
            const stats = window.timelineManager.getTimelineStatistics();
            console.log('📊 Stats Timeline Manager:', stats);
        }, 2000);
    }
}); 