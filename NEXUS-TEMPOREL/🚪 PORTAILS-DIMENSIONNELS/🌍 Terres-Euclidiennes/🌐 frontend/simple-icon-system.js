// 🎭 SIMPLE ICON SYSTEM - Remplacement Dicebear
// ===============================================
// Système d'icônes simples basé sur les JSONs

class SimpleIconSystem {
    constructor() {
        this.heroIcons = {
            // Heroes classiques
            'Arthur': '⚔️',
            'Ragnar': '🛡️', 
            'Morgana': '🧙‍♀️',
            'Merlin': '🔮',
            'Lysandrel': '🧝‍♀️',
            'Nyx-Lua': '🌙',
            'Gardien Zephyr': '🛡️',
            'Thane le Tueur de Dragons': '🗡️',
            'Jean-Grofignon': '🧠',
            'Claudius': '📜',
            'Elena Flamme Douce': '🔥',
            'Marcus Bouclier de Fer': '🛡️',
            'Nikita Victor': '🧹',
            'Peekill': '🗡️',
            'Kiandpi': '🏹'
        };
        
        this.creatureIcons = {
            'Phénix Quantique': '🦅',
            'Chevalier Quantique': '⚔️',
            'Liche Quantique': '💀',
            'Araignée de Probabilité': '🕷️',
            'Dragon Rouge Temporel': '🐉',
            'Sphinx Gardien': '🦁',
            'Griffon Quantique': '🦅'
        };
        
        this.artifactIcons = {
            'avantworld_blade': '⚔️',
            'wigner_eye': '👁️',
            'schrodinger_grimoire': '📜',
            'infinity_codex': '📖',
            'collapse_orb': '🔮',
            'dragon_slayer_blade': '🗡️',
            'reality_anchor': '⚓',
            'guardian_shield': '🛡️',
            'causality_flame': '🔥',
            'nexus_blade': '⚡',
            'temporal_focus_ring': '💍',
            'the_source': '🌀',
            'priority_processor_supreme': '⚡'
        };
        
        this.buildingIcons = {
            'Château': '🏰',
            'Tour de Mage': '🗼',
            'Caserne': '⚔️',
            'Temple': '⛪',
            'Forge': '🔨',
            'Bibliothèque': '📚',
            'Marché': '🏪',
            'Ferme': '🌾',
            'Mine': '⛏️',
            'Portail Temporel': '🌀'
        };
        
        this.spellIcons = {
            'reality_forge': '🔨',
            'temporal_dominance': '👑',
            'quantum_collapse': '💥',
            'world_weaving': '🕸️',
            'probability_manipulation': '🎲',
            'timeline_branching': '🌳',
            'protective_ward': '🛡️',
            'anchor_zone': '⚓',
            'temporal_barrier': '🚧',
            'perfect_timing': '⏱️'
        };
        
        console.log('🎭 Simple Icon System initialisé - Fini Dicebear !');
    }
    
    // 🎯 OBTENIR ICÔNE PAR TYPE ET NOM
    getIcon(type, name) {
        switch(type) {
            case 'hero':
                return this.heroIcons[name] || '🦸';
            case 'creature': 
                return this.creatureIcons[name] || '👹';
            case 'artifact':
                return this.artifactIcons[name] || '⚡';
            case 'building':
                return this.buildingIcons[name] || '🏢';
            case 'spell':
                return this.spellIcons[name] || '✨';
            default:
                return '❓';
        }
    }
    
    // 🎨 CRÉER ÉLÉMENT VISUEL SIMPLE
    createIconElement(type, name, size = 40) {
        const icon = this.getIcon(type, name);
        
        const element = document.createElement('div');
        element.className = 'simple-icon-element';
        element.innerHTML = `
            <div class="icon-display" style="font-size: ${size}px;">${icon}</div>
            <div class="icon-label" style="font-size: ${Math.max(10, size/4)}px;">${name}</div>
        `;
        
        element.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: transform 0.2s ease;
        `;
        
        // Hover effect
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1)';
            element.style.background = 'rgba(255,255,255,0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.background = 'transparent';
        });
        
        return element;
    }
    
    // 📋 CRÉER GALERIE SIMPLE
    createSimpleGallery(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        container.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 10px;
            padding: 20px;
            max-height: 400px;
            overflow-y: auto;
        `;
        
        // Sections par type
        const sections = [
            { title: '🦸 Heroes', type: 'hero', items: this.heroIcons },
            { title: '👹 Creatures', type: 'creature', items: this.creatureIcons },
            { title: '⚡ Artifacts', type: 'artifact', items: this.artifactIcons },
            { title: '🏢 Buildings', type: 'building', items: this.buildingIcons },
            { title: '✨ Spells', type: 'spell', items: this.spellIcons }
        ];
        
        sections.forEach(section => {
            // Titre de section
            const title = document.createElement('h3');
            title.textContent = section.title;
            title.style.cssText = `
                grid-column: 1 / -1;
                margin: 15px 0 10px 0;
                color: #4A90E2;
                font-size: 16px;
                border-bottom: 2px solid #4A90E2;
                padding-bottom: 5px;
            `;
            container.appendChild(title);
            
            // Éléments de la section
            Object.keys(section.items).forEach(itemName => {
                const element = this.createIconElement(section.type, itemName, 40);
                container.appendChild(element);
            });
        });
    }
    
    // 🗺️ CRÉER ICÔNE POUR MAP
    createMapIcon(type, name, size = 30) {
        const icon = this.getIcon(type, name);
        
        const element = document.createElement('div');
        element.className = 'map-icon';
        element.textContent = icon;
        element.style.cssText = `
            font-size: ${size}px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${size + 10}px;
            height: ${size + 10}px;
            border-radius: 50%;
            background: rgba(0,0,0,0.3);
            border: 2px solid rgba(255,255,255,0.5);
            transition: all 0.2s ease;
        `;
        
        // Tooltip
        element.title = `${name} (${type})`;
        
        return element;
    }
}

// 🌍 EXPORT GLOBAL
window.SimpleIconSystem = SimpleIconSystem;

// 🎯 AUTO-INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    window.simpleIconSystem = new SimpleIconSystem();
    console.log('🎭 Simple Icon System prêt !');
}); 