// dicebar-graphics-system.js - Système graphique Dicebear complet pour Heroes of Time
class DicebarGraphicsSystem {
    constructor() {
        this.baseUrl = 'https://api.dicebear.com/7.x';
        this.backgroundColors = 'b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,e6ffed,fff2cc,ffeaa7';
        
        // Heroes with dicebar graphics
        this.heroes = {
            'Arthur': {
                style: 'adventurer',
                seed: 'arthur-pendragon-king',
                icon: '⚔️',
                color: '#FFD700',
                description: 'Legendary King Arthur'
            },
            'Ragnar': {
                style: 'adventurer-neutral',
                seed: 'ragnar-lothbrok-viking',
                icon: '🛡️',
                color: '#8B0000',
                description: 'Viking Warrior'
            },
            'Morgana': {
                style: 'lorelei',
                seed: 'morgana-le-fay-sorceress',
                icon: '🧙‍♀️',
                color: '#800080',
                description: 'Dark Sorceress'
            },
            'Merlin': {
                style: 'bottts',
                seed: 'merlin-ambrosius-wizard',
                icon: '🔮',
                color: '#4169E1',
                description: 'Great Wizard'
            },
            'Lysandrel': {
                style: 'adventurer',
                seed: 'lysandrel-reality-forger',
                icon: '🧝‍♀️',
                color: '#90EE90',
                description: 'Reality Forger'
            },
            'Nyx-Lua': {
                style: 'lorelei',
                seed: 'nyx-lua-world-weaver',
                icon: '🌙',
                color: '#2F4F4F',
                description: 'World Weaver'
            },
            'Gardien Zephyr': {
                style: 'adventurer-neutral',
                seed: 'gardien-zephyr-nexus',
                icon: '🛡️',
                color: '#87CEEB',
                description: 'Nexus Guardian'
            },
            'Thane le Tueur de Dragons': {
                style: 'adventurer',
                seed: 'thane-dragon-slayer',
                icon: '🗡️',
                color: '#DAA520',
                description: 'Dragon Slayer'
            },
            'Jean-Grofignon': {
                style: 'bottts',
                seed: 'jean-grofignon-philosopher',
                icon: '🧠',
                color: '#9370DB',
                description: 'Temporal Philosopher'
            }
        };

        // Creatures with dicebar graphics
        this.creatures = {
            'Phénix Quantique': {
                style: 'bottts',
                seed: 'phoenix-quantum-legendary',
                icon: '🦅',
                color: '#FF6B35',
                description: 'Quantum Phoenix'
            },
            'Chevalier Quantique': {
                style: 'adventurer-neutral',
                seed: 'knight-quantum-elite',
                icon: '⚔️',
                color: '#4A90E2',
                description: 'Quantum Knight'
            },
            'Liche Quantique': {
                style: 'bottts',
                seed: 'lich-quantum-boss',
                icon: '💀',
                color: '#2C3E50',
                description: 'Quantum Lich'
            },
            'Araignée de Probabilité': {
                style: 'bottts',
                seed: 'spider-probability-rare',
                icon: '🕷️',
                color: '#8B4513',
                description: 'Probability Spider'
            }
        };

        // Buildings and Structures with dicebar graphics
        this.buildings = {
            'Château': {
                style: 'bottts',
                seed: 'castle-fortress-medieval',
                icon: '🏰',
                color: '#8B4513',
                description: 'Medieval Castle',
                type: 'fortress'
            },
            'Tour de Défense': {
                style: 'bottts',
                seed: 'tower-defense-watch',
                icon: '🗼',
                color: '#696969',
                description: 'Defense Tower',
                type: 'tower'
            },
            'Hôtel de Ville': {
                style: 'bottts',
                seed: 'town-hall-government',
                icon: '🏛️',
                color: '#DAA520',
                description: 'Town Hall',
                type: 'government'
            },
            'Caserne': {
                style: 'bottts',
                seed: 'barracks-military-training',
                icon: '⚔️',
                color: '#8B0000',
                description: 'Military Barracks',
                type: 'military'
            },
            'Tour des Mages': {
                style: 'bottts',
                seed: 'mage-tower-magic',
                icon: '🧙‍♂️',
                color: '#9370DB',
                description: 'Mage Tower',
                type: 'magic'
            },
            'Forge': {
                style: 'bottts',
                seed: 'forge-blacksmith-weapons',
                icon: '⚒️',
                color: '#CD853F',
                description: 'Blacksmith Forge',
                type: 'crafting'
            },
            'Temple': {
                style: 'bottts',
                seed: 'temple-religion-worship',
                icon: '⛪',
                color: '#FFD700',
                description: 'Religious Temple',
                type: 'religious'
            },
            'Port': {
                style: 'bottts',
                seed: 'port-harbor-trade',
                icon: '⚓',
                color: '#4169E1',
                description: 'Trading Port',
                type: 'trade'
            }
        };

        // Natural Elements with dicebar graphics
        this.nature = {
            'Forêt': {
                style: 'bottts',
                seed: 'forest-trees-nature',
                icon: '🌲',
                color: '#228B22',
                description: 'Dense Forest',
                type: 'vegetation'
            },
            'Montagne': {
                style: 'bottts',
                seed: 'mountain-peak-rock',
                icon: '⛰️',
                color: '#696969',
                description: 'Rocky Mountain',
                type: 'terrain'
            },
            'Rivière': {
                style: 'bottts',
                seed: 'river-water-flow',
                icon: '🌊',
                color: '#4169E1',
                description: 'Flowing River',
                type: 'water'
            },
            'Lac': {
                style: 'bottts',
                seed: 'lake-water-still',
                icon: '🏞️',
                color: '#87CEEB',
                description: 'Peaceful Lake',
                type: 'water'
            },
            'Désert': {
                style: 'bottts',
                seed: 'desert-sand-dunes',
                icon: '🏜️',
                color: '#F4A460',
                description: 'Sandy Desert',
                type: 'terrain'
            },
            'Marais': {
                style: 'bottts',
                seed: 'swamp-mud-wetland',
                icon: '🌿',
                color: '#556B2F',
                description: 'Mysterious Swamp',
                type: 'wetland'
            },
            'Grotte': {
                style: 'bottts',
                seed: 'cave-underground-dark',
                icon: '🕳️',
                color: '#2F4F4F',
                description: 'Dark Cave',
                type: 'underground'
            },
            'Arbre Ancien': {
                style: 'bottts',
                seed: 'ancient-tree-wisdom',
                icon: '🌳',
                color: '#8FBC8F',
                description: 'Ancient Tree',
                type: 'vegetation'
            }
        };

        // Artifacts with dicebar graphics
        this.artifacts = {
            'avantworld_blade': {
                style: 'shapes',
                seed: 'avantworld-blade-reality',
                icon: '⚔️',
                color: '#FFD700',
                description: 'Avantworld Blade'
            },
            'wigner_eye': {
                style: 'shapes',
                seed: 'wigner-eye-observation',
                icon: '👁️',
                color: '#9B59B6',
                description: 'Wigner\'s Eye'
            },
            'schrodinger_grimoire': {
                style: 'shapes',
                seed: 'schrodinger-grimoire-quantum',
                icon: '📜',
                color: '#E67E22',
                description: 'Schrödinger\'s Grimoire'
            },
            'infinity_codex': {
                style: 'shapes',
                seed: 'infinity-codex-knowledge',
                icon: '📖',
                color: '#3498DB',
                description: 'Infinity Codex'
            },
            'collapse_orb': {
                style: 'shapes',
                seed: 'collapse-orb-quantum',
                icon: '🔮',
                color: '#E74C3C',
                description: 'Collapse Orb'
            },
            'dragon_slayer_blade': {
                style: 'shapes',
                seed: 'dragon-slayer-blade-legendary',
                icon: '🗡️',
                color: '#C0392B',
                description: 'Dragon Slayer Blade'
            },
            'reality_anchor': {
                style: 'shapes',
                seed: 'reality-anchor-stabilizer',
                icon: '⚓',
                color: '#16A085',
                description: 'Reality Anchor'
            },
            'guardian_shield': {
                style: 'shapes',
                seed: 'guardian-shield-protection',
                icon: '🛡️',
                color: '#27AE60',
                description: 'Guardian Shield'
            },
            'causality_flame': {
                style: 'shapes',
                seed: 'causality-flame-temporal',
                icon: '🔥',
                color: '#F39C12',
                description: 'Causality Flame'
            },
            'nexus_blade': {
                style: 'shapes',
                seed: 'nexus-blade-guardian',
                icon: '⚡',
                color: '#8E44AD',
                description: 'Nexus Blade'
            },
            'temporal_focus_ring': {
                style: 'shapes',
                seed: 'temporal-focus-ring-precision',
                icon: '💍',
                color: '#D4AC0D',
                description: 'Temporal Focus Ring'
            }
        };

        // Spells and abilities
        this.spells = {
            'reality_forge': {
                style: 'shapes',
                seed: 'reality-forge-spell',
                icon: '🔨',
                color: '#E67E22',
                description: 'Reality Forge'
            },
            'temporal_dominance': {
                style: 'shapes',
                seed: 'temporal-dominance-control',
                icon: '👑',
                color: '#9B59B6',
                description: 'Temporal Dominance'
            },
            'quantum_collapse': {
                style: 'shapes',
                seed: 'quantum-collapse-destruction',
                icon: '💥',
                color: '#E74C3C',
                description: 'Quantum Collapse'
            },
            'world_weaving': {
                style: 'shapes',
                seed: 'world-weaving-creation',
                icon: '🕸️',
                color: '#3498DB',
                description: 'World Weaving'
            },
            'probability_manipulation': {
                style: 'shapes',
                seed: 'probability-manipulation-quantum',
                icon: '🎲',
                color: '#8E44AD',
                description: 'Probability Manipulation'
            },
            'timeline_branching': {
                style: 'shapes',
                seed: 'timeline-branching-multiverse',
                icon: '🌳',
                color: '#27AE60',
                description: 'Timeline Branching'
            },
            'protective_ward': {
                style: 'shapes',
                seed: 'protective-ward-defense',
                icon: '🛡️',
                color: '#16A085',
                description: 'Protective Ward'
            },
            'anchor_zone': {
                style: 'shapes',
                seed: 'anchor-zone-stability',
                icon: '⚓',
                color: '#2C3E50',
                description: 'Anchor Zone'
            },
            'temporal_barrier': {
                style: 'shapes',
                seed: 'temporal-barrier-protection',
                icon: '🚧',
                color: '#F39C12',
                description: 'Temporal Barrier'
            },
            'perfect_timing': {
                style: 'shapes',
                seed: 'perfect-timing-precision',
                icon: '⏱️',
                color: '#D4AC0D',
                description: 'Perfect Timing'
            },
            'dragon_weakness_sight': {
                style: 'shapes',
                seed: 'dragon-weakness-sight-analysis',
                icon: '🔍',
                color: '#C0392B',
                description: 'Dragon Weakness Sight'
            },
            'temporal_strike': {
                style: 'shapes',
                seed: 'temporal-strike-attack',
                icon: '⚡',
                color: '#F1C40F',
                description: 'Temporal Strike'
            },
            'future_sight': {
                style: 'shapes',
                seed: 'future-sight-prophecy',
                icon: '👁️‍🗨️',
                color: '#9B59B6',
                description: 'Future Sight'
            }
        };

        // Environmental elements
        this.environment = {
            'nexus_point': {
                style: 'shapes',
                seed: 'nexus-point-temporal',
                icon: '🌀',
                color: '#3498DB',
                description: 'Nexus Point'
            },
            'temporal_rift': {
                style: 'shapes',
                seed: 'temporal-rift-tear',
                icon: '🌪️',
                color: '#8E44AD',
                description: 'Temporal Rift'
            },
            'quantum_field': {
                style: 'shapes',
                seed: 'quantum-field-energy',
                icon: '✨',
                color: '#F1C40F',
                description: 'Quantum Field'
            },
            'reality_anchor_zone': {
                style: 'shapes',
                seed: 'reality-anchor-zone-stable',
                icon: '🔒',
                color: '#16A085',
                description: 'Reality Anchor Zone'
            },
            'timeline_branch': {
                style: 'shapes',
                seed: 'timeline-branch-split',
                icon: '🌿',
                color: '#27AE60',
                description: 'Timeline Branch'
            },
            'probability_storm': {
                style: 'shapes',
                seed: 'probability-storm-chaos',
                icon: '⛈️',
                color: '#E74C3C',
                description: 'Probability Storm'
            }
        };

        // Game UI elements
        this.ui_elements = {
            'temporal_energy': {
                style: 'shapes',
                seed: 'temporal-energy-ui',
                icon: '⚡',
                color: '#F1C40F',
                description: 'Temporal Energy'
            },
            'health_point': {
                style: 'shapes',
                seed: 'health-point-ui',
                icon: '❤️',
                color: '#E74C3C',
                description: 'Health Point'
            },
            'movement_point': {
                style: 'shapes',
                seed: 'movement-point-ui',
                icon: '👟',
                color: '#3498DB',
                description: 'Movement Point'
            },
            'timeline_indicator': {
                style: 'shapes',
                seed: 'timeline-indicator-ui',
                icon: '⏰',
                color: '#9B59B6',
                description: 'Timeline Indicator'
            },
            'quantum_affinity': {
                style: 'shapes',
                seed: 'quantum-affinity-ui',
                icon: '🎭',
                color: '#8E44AD',
                description: 'Quantum Affinity'
            }
        };
    }

    // Generate dicebar avatar for any element
    generateAvatar(elementType, elementName) {
        let element = null;
        
        switch(elementType) {
            case 'hero':
                element = this.heroes[elementName];
                break;
            case 'creature':
                element = this.creatures[elementName];
                break;
            case 'building':
                element = this.buildings[elementName];
                break;
            case 'nature':
                element = this.nature[elementName];
                break;
        }
        
        if (element && element.style && element.seed) {
            const url = `${this.baseUrl}/${element.style}/svg?seed=${element.seed}&backgroundColor=${this.backgroundColors}`;
            return {
                url: url,
                icon: element.icon,
                color: element.color,
                description: element.description
            };
        }
        
        return this.getFallbackAvatar(elementName);
    }

    generateBuildingAvatar(buildingName) {
        return this.generateAvatar('building', buildingName);
    }

    generateNatureAvatar(natureName) {
        return this.generateAvatar('nature', natureName);
    }

    // Fallback avatar with emoji
    getFallbackAvatar(elementName) {
        const defaultIcon = this.getDefaultIcon(elementName);
        return {
            type: 'emoji',
            icon: defaultIcon,
            color: '#808080',
            style: 'fallback',
            description: elementName
        };
    }

    // Determine default icon based on name
    getDefaultIcon(elementName) {
        const name = elementName.toLowerCase();
        
        // Heroes
        if (name.includes('arthur') || name.includes('king')) return '👑';
        if (name.includes('ragnar') || name.includes('viking')) return '🛡️';
        if (name.includes('morgana') || name.includes('sorceress')) return '🧙‍♀️';
        if (name.includes('merlin') || name.includes('wizard')) return '🔮';
        if (name.includes('lysandrel') || name.includes('elf')) return '🧝‍♀️';
        if (name.includes('nyx') || name.includes('moon')) return '🌙';
        if (name.includes('gardien') || name.includes('guardian')) return '🛡️';
        if (name.includes('thane') || name.includes('slayer')) return '🗡️';
        if (name.includes('jean') || name.includes('grofignon')) return '🧠';
        
        // Creatures
        if (name.includes('phoenix') || name.includes('phénix')) return '🦅';
        if (name.includes('chevalier') || name.includes('knight')) return '⚔️';
        if (name.includes('liche') || name.includes('lich')) return '💀';
        if (name.includes('araignée') || name.includes('spider')) return '🕷️';
        if (name.includes('dragon')) return '🐉';
        if (name.includes('fantôme') || name.includes('phantom')) return '👻';
        if (name.includes('élémentaire') || name.includes('elemental')) return '⏰';
        
        // Artifacts
        if (name.includes('blade') || name.includes('épée')) return '⚔️';
        if (name.includes('eye') || name.includes('œil')) return '👁️';
        if (name.includes('grimoire') || name.includes('livre')) return '📜';
        if (name.includes('codex')) return '📖';
        if (name.includes('orb') || name.includes('orbe')) return '🔮';
        if (name.includes('shield') || name.includes('bouclier')) return '🛡️';
        if (name.includes('anchor') || name.includes('ancre')) return '⚓';
        if (name.includes('flame') || name.includes('flamme')) return '🔥';
        if (name.includes('ring') || name.includes('anneau')) return '💍';
        
        // Spells
        if (name.includes('forge')) return '🔨';
        if (name.includes('dominance')) return '👑';
        if (name.includes('collapse')) return '💥';
        if (name.includes('weaving')) return '🕸️';
        if (name.includes('probability')) return '🎲';
        if (name.includes('branching')) return '🌳';
        if (name.includes('ward')) return '🛡️';
        if (name.includes('barrier')) return '🚧';
        if (name.includes('timing')) return '⏱️';
        if (name.includes('sight')) return '🔍';
        if (name.includes('strike')) return '⚡';
        
        // Environment
        if (name.includes('nexus')) return '🌀';
        if (name.includes('rift')) return '🌪️';
        if (name.includes('field')) return '✨';
        if (name.includes('storm')) return '⛈️';
        if (name.includes('branch')) return '🌿';
        
        // UI Elements
        if (name.includes('energy')) return '⚡';
        if (name.includes('health')) return '❤️';
        if (name.includes('movement')) return '👟';
        if (name.includes('timeline')) return '⏰';
        if (name.includes('affinity')) return '🎭';
        
        return '🎮';
    }

    // Create HTML element for avatar
    createAvatarElement(elementType, elementName, size = 40) {
        const avatar = this.generateAvatar(elementType, elementName);
        const container = document.createElement('div');
        container.className = 'avatar-container';
        container.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            overflow: hidden;
            display: inline-block;
            position: relative;
            border: 2px solid ${avatar.color};
            background: ${avatar.color}20;
        `;

        if (avatar.url) {
            const img = document.createElement('img');
            img.src = avatar.url;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
            `;
            img.alt = elementName;
            container.appendChild(img);
        } else {
            // Fallback avec icône
            container.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: ${size * 0.6}px;
                    background: ${avatar.color}40;
                ">
                    ${avatar.icon}
                </div>
            `;
        }

        // Tooltip avec description
        container.title = `${elementName}: ${avatar.description}`;
        
        return container;
    }

    createBuildingElement(buildingName, size = 40) {
        return this.createAvatarElement('building', buildingName, size);
    }

    createNatureElement(natureName, size = 40) {
        return this.createAvatarElement('nature', natureName, size);
    }

    // Create avatar grid for all elements
    createAvatarGrid(containerId) {
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

        const sections = [
            { title: 'Heroes', type: 'hero', collection: this.heroes },
            { title: 'Creatures', type: 'creature', collection: this.creatures },
            { title: 'Artifacts', type: 'artifact', collection: this.artifacts },
            { title: 'Spells', type: 'spell', collection: this.spells },
            { title: 'Environment', type: 'environment', collection: this.environment },
            { title: 'UI Elements', type: 'ui', collection: this.ui_elements }
        ];

        sections.forEach(section => {
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.title;
            sectionTitle.style.cssText = `
                grid-column: 1 / -1;
                margin: 20px 0 10px 0;
                color: #333;
                font-size: 18px;
                border-bottom: 2px solid #3498DB;
                padding-bottom: 5px;
            `;
            container.appendChild(sectionTitle);

            Object.keys(section.collection).forEach(elementName => {
                const avatarElement = this.createAvatarElement(section.type, elementName, 60);
                
                const wrapper = document.createElement('div');
                wrapper.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                `;
                
                const label = document.createElement('div');
                label.textContent = elementName;
                label.style.cssText = `
                    font-size: 10px;
                    text-align: center;
                    color: #666;
                    max-width: 80px;
                    word-wrap: break-word;
                `;
                
                wrapper.appendChild(avatarElement);
                wrapper.appendChild(label);
                container.appendChild(wrapper);
            });
        });
    }

    // Get all available elements by type
    getElementsOfType(elementType) {
        switch(elementType) {
            case 'hero':
                return Object.keys(this.heroes);
            case 'creature':
                return Object.keys(this.creatures);
            case 'building':
                return Object.keys(this.buildings);
            case 'nature':
                return Object.keys(this.nature);
            default:
                return [];
        }
    }

    getAllBuildings() {
        return Object.keys(this.buildings);
    }

    getAllNatureElements() {
        return Object.keys(this.nature);
    }

    getBuildingsByType(type) {
        return Object.keys(this.buildings).filter(name => 
            this.buildings[name].type === type
        );
    }

    getNatureByType(type) {
        return Object.keys(this.nature).filter(name => 
            this.nature[name].type === type
        );
    }

    // Add new element to system
    addElement(elementType, name, style, seed, icon, color, description) {
        const collections = {
            'hero': this.heroes,
            'creature': this.creatures,
            'artifact': this.artifacts,
            'spell': this.spells,
            'environment': this.environment,
            'ui': this.ui_elements
        };

        const collection = collections[elementType];
        if (collection) {
            collection[name] = {
                style: style,
                seed: seed,
                icon: icon,
                color: color,
                description: description
            };
        }
    }

    createCompleteGallery(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="dicebar-gallery">
                <h2>🎭 Galerie Dicebear Complète - Heroes of Time</h2>
                
                <div class="gallery-section">
                    <h3>👑 Héros</h3>
                    <div class="gallery-grid" id="heroes-gallery"></div>
                </div>
                
                <div class="gallery-section">
                    <h3>🐉 Créatures</h3>
                    <div class="gallery-grid" id="creatures-gallery"></div>
                </div>
                
                <div class="gallery-section">
                    <h3>🏰 Bâtiments</h3>
                    <div class="gallery-grid" id="buildings-gallery"></div>
                </div>
                
                <div class="gallery-section">
                    <h3>🌲 Éléments Naturels</h3>
                    <div class="gallery-grid" id="nature-gallery"></div>
                </div>
            </div>
        `;

        // Remplir les galeries
        this.fillGallery('heroes-gallery', 'hero');
        this.fillGallery('creatures-gallery', 'creature');
        this.fillGallery('buildings-gallery', 'building');
        this.fillGallery('nature-gallery', 'nature');
    }

    fillGallery(galleryId, elementType) {
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;

        const elements = this.getElementsOfType(elementType);
        
        elements.forEach(elementName => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'gallery-item';
            
            const avatar = this.createAvatarElement(elementType, elementName, 60);
            const nameDiv = document.createElement('div');
            nameDiv.className = 'element-name';
            nameDiv.textContent = elementName;
            
            elementDiv.appendChild(avatar);
            elementDiv.appendChild(nameDiv);
            gallery.appendChild(elementDiv);
        });
    }
}

// Export for global usage
window.DicebarGraphicsSystem = DicebarGraphicsSystem;