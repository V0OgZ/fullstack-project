// dicebar-graphics-system.js - Système graphique Dicebear complet pour Heroes of Time
class DicebarGraphicsSystem {
    constructor() {
        this.baseUrl = 'https://api.dicebear.com/7.x';
        this.backgroundColors = 'b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,e6ffed,fff2cc,ffeaa7';
        
        // Heroes will be populated dynamically from JSON data
        this.heroes = {};
        this.heroesJsonData = null;
        
        // Initialize with basic hero data - will be overridden by JSON
        this.initializeBasicHeroes();
        
        // Load hero data from JSON files
        this.loadHeroesFromJSON();
        
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
    
    // Initialize basic heroes as fallback
    initializeBasicHeroes() {
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
            },
            'Claudius': {
                style: 'bottts',
                seed: 'claudius-memento-archiviste',
                icon: '⚖️',
                color: '#FF69B4',
                description: 'Archiviste Paradoxal'
            }
        };
    }
    
    // Load heroes from JSON files dynamically
    async loadHeroesFromJSON() {
        try {
            // Try to load multiple hero sources
            const heroSources = [
                '/game_assets/heroes/epic/epic-heroes.json',
                '/game_assets/heroes/extracted_heroes.json',
                '/game_assets/MASTER_ASSETS_INDEX.json'
            ];
            
            for (const source of heroSources) {
                try {
                    const response = await fetch(source);
                    if (response.ok) {
                        const data = await response.json();
                        this.processHeroData(data, source);
                    }
                } catch (error) {
                    console.log(`Could not load ${source}, using defaults`);
                }
            }
        } catch (error) {
            console.log('Using default hero configurations');
        }
    }
    
    // Process hero data from JSON and generate dicebear properties
    processHeroData(data, source) {
        // Process based on data structure
        if (data.epic_heroes) {
            // Epic heroes format
            data.epic_heroes.forEach(hero => {
                this.addHeroFromJSON(hero);
            });
        } else if (data.heroes) {
            // Master assets index format
            data.heroes.heroes.forEach(hero => {
                this.addHeroFromJSON(hero);
            });
        } else if (Array.isArray(data)) {
            // Direct array format
            data.forEach(hero => {
                this.addHeroFromJSON(hero);
            });
        }
    }
    
    // Add a hero from JSON data with auto-generated dicebear properties
    addHeroFromJSON(heroData) {
        const heroName = heroData.name || heroData.id;
        if (!heroName) return;
        
        // Auto-generate dicebear properties based on hero characteristics
        const style = this.getStyleForHero(heroData);
        const seed = this.generateSeedForHero(heroData);
        const icon = this.getIconForHero(heroData);
        const color = this.getColorForHero(heroData);
        const description = heroData.description || heroData.backstory || `${heroData.class || 'Hero'} Level ${heroData.level || 1}`;
        
        // Override or add to existing hero data
        this.heroes[heroName] = {
            style: style,
            seed: seed,
            icon: icon,
            color: color,
            description: description,
            // Store original JSON data for reference
            jsonData: heroData
        };
    }
    
    // Determine dicebear style based on hero characteristics
    getStyleForHero(heroData) {
        const race = (heroData.race || '').toLowerCase();
        const className = (heroData.class || '').toLowerCase();
        const name = (heroData.name || '').toLowerCase();
        const gender = (heroData.gender || '').toLowerCase();
        
        // Specific character overrides
        if (name.includes('jean') || name.includes('grofignon')) return 'bottts';
        if (name.includes('claudius') || name.includes('memento')) return 'bottts';
        if (name.includes('arthur')) return 'adventurer';
        if (name.includes('merlin')) return 'bottts';
        if (name.includes('lysandrel')) return 'adventurer';
        if (name.includes('nyx')) return 'lorelei';
        
        // Race-based styles
        if (race.includes('robot') || race.includes('mech') || race.includes('construct')) return 'bottts';
        if (race.includes('elf') || race.includes('fae')) return 'adventurer';
        if (race.includes('dwarf')) return 'adventurer-neutral';
        if (race.includes('orc') || race.includes('troll') || race.includes('ogre')) return 'adventurer-neutral';
        if (race.includes('demon') || race.includes('devil')) return 'bottts';
        if (race.includes('angel') || race.includes('celestial')) return 'lorelei';
        
        // Class-based styles
        if (className.includes('sorciere') || className.includes('sorceress') || className.includes('witch')) return 'lorelei';
        if (className.includes('wizard') || className.includes('mage') || className.includes('sorcier')) return 'bottts';
        if (className.includes('necromancer') || className.includes('lich')) return 'bottts';
        if (className.includes('druid') || className.includes('shaman')) return 'lorelei';
        if (className.includes('monk') || className.includes('priest')) return 'lorelei';
        if (className.includes('bard') || className.includes('minstrel')) return 'adventurer';
        if (className.includes('rogue') || className.includes('thief') || className.includes('assassin')) return 'adventurer-neutral';
        if (className.includes('paladin') || className.includes('chevalier')) return 'adventurer';
        if (className.includes('barbarian') || className.includes('berserker')) return 'adventurer-neutral';
        
        // Gender-based fallback
        if (gender === 'female' || gender === 'f') return 'lorelei';
        
        // Default based on stats if available
        if (heroData.stats) {
            if (heroData.stats.knowledge > heroData.stats.attack) return 'bottts';
            if (heroData.stats.spellPower > heroData.stats.defense) return 'lorelei';
        }
        
        return 'adventurer'; // Default
    }
    
    // Generate unique seed for hero
    generateSeedForHero(heroData) {
        const name = heroData.name || heroData.id || 'unknown';
        const id = heroData.id || name;
        const level = heroData.level || 1;
        
        // Include more properties for uniqueness
        const race = heroData.race || 'human';
        const className = heroData.class || 'warrior';
        const stats = heroData.stats || {};
        
        // Create a more complex seed based on multiple attributes
        const seedParts = [
            id.toLowerCase().replace(/\s+/g, '-'),
            race.toLowerCase().replace(/\s+/g, '-'),
            className.toLowerCase().replace(/\s+/g, '-'),
            `level${level}`,
            `atk${stats.attack || 0}`,
            `def${stats.defense || 0}`
        ];
        
        return seedParts.join('-');
    }
    
    // Get appropriate icon for hero
    getIconForHero(heroData) {
        const className = (heroData.class || '').toLowerCase();
        const name = (heroData.name || '').toLowerCase();
        const race = (heroData.race || '').toLowerCase();
        
        // Specific character icons
        if (name.includes('arthur')) return '⚔️';
        if (name.includes('merlin')) return '🔮';
        if (name.includes('morgana')) return '🧙‍♀️';
        if (name.includes('ragnar')) return '🛡️';
        if (name.includes('jean') || name.includes('grofignon')) return '🧠';
        if (name.includes('claudius') || name.includes('memento')) return '⚖️';
        if (name.includes('lysandrel')) return '🧝‍♀️';
        if (name.includes('nyx')) return '🌙';
        if (name.includes('thane')) return '🗡️';
        if (name.includes('jeanne')) return '⚜️';
        if (name.includes('xiao')) return '🐉';
        if (name.includes('bjorn')) return '🪓';
        if (name.includes('yamato')) return '⛩️';
        if (name.includes('zara')) return '🏜️';
        if (name.includes('eleanor')) return '📚';
        if (name.includes('tesla')) return '⚡';
        if (name.includes('hawking')) return '🌌';
        
        // Race-based icons
        if (race.includes('dragon')) return '🐉';
        if (race.includes('vampire')) return '🧛';
        if (race.includes('demon')) return '😈';
        if (race.includes('angel')) return '😇';
        if (race.includes('robot')) return '🤖';
        if (race.includes('undead')) return '💀';
        if (race.includes('elf')) return '🧝';
        if (race.includes('dwarf')) return '⛏️';
        
        // Class-based icons
        if (className.includes('wizard') || className.includes('mage')) return '🔮';
        if (className.includes('warrior') || className.includes('knight') || className.includes('chevalier')) return '⚔️';
        if (className.includes('archer') || className.includes('ranger')) return '🏹';
        if (className.includes('paladin')) return '🛡️';
        if (className.includes('necromancer')) return '💀';
        if (className.includes('druid')) return '🌿';
        if (className.includes('rogue') || className.includes('thief')) return '🗡️';
        if (className.includes('barbarian')) return '🪓';
        if (className.includes('monk')) return '🥋';
        if (className.includes('bard')) return '🎵';
        if (className.includes('alchemist')) return '⚗️';
        if (className.includes('engineer')) return '🔧';
        if (className.includes('pirate')) return '🏴‍☠️';
        if (className.includes('ninja')) return '🥷';
        if (className.includes('samurai')) return '⚔️';
        
        // Stats-based fallback
        if (heroData.stats) {
            const stats = heroData.stats;
            if (stats.spellPower > stats.attack) return '✨';
            if (stats.defense > stats.attack) return '🛡️';
            if (stats.knowledge > 15) return '📖';
        }
        
        return '🦸'; // Default hero icon
    }
    
    // Get color based on hero attributes
    getColorForHero(heroData) {
        const race = (heroData.race || '').toLowerCase();
        const className = (heroData.class || '').toLowerCase();
        const element = (heroData.element || '').toLowerCase();
        const name = (heroData.name || '').toLowerCase();
        const affinity = (heroData.affinity || '').toLowerCase();
        
        // Specific character colors
        if (name.includes('arthur')) return '#FFD700'; // Gold
        if (name.includes('morgana')) return '#800080'; // Purple
        if (name.includes('merlin')) return '#4169E1'; // Royal Blue
        if (name.includes('ragnar')) return '#8B0000'; // Dark Red
        if (name.includes('jean')) return '#9370DB'; // Medium Purple
        if (name.includes('claudius')) return '#FF69B4'; // Hot Pink
        if (name.includes('lysandrel')) return '#90EE90'; // Light Green
        if (name.includes('nyx')) return '#2F4F4F'; // Dark Slate Gray
        
        // Element/Affinity-based colors
        if (element.includes('fire') || affinity.includes('fire')) return '#FF6347';
        if (element.includes('water') || affinity.includes('water')) return '#4169E1';
        if (element.includes('earth') || affinity.includes('earth')) return '#8B4513';
        if (element.includes('air') || affinity.includes('air')) return '#87CEEB';
        if (element.includes('light') || affinity.includes('light')) return '#FFD700';
        if (element.includes('dark') || affinity.includes('dark')) return '#4B0082';
        if (element.includes('thunder') || affinity.includes('lightning')) return '#FF00FF';
        if (element.includes('ice') || affinity.includes('frost')) return '#00CED1';
        if (element.includes('nature') || affinity.includes('nature')) return '#228B22';
        if (element.includes('chaos')) return '#8B008B';
        if (element.includes('order')) return '#DAA520';
        
        // Race-based colors
        if (race.includes('undead') || race.includes('lich')) return '#2F4F4F';
        if (race.includes('demon')) return '#8B0000';
        if (race.includes('angel')) return '#F0E68C';
        if (race.includes('dragon')) return '#FF4500';
        if (race.includes('elf')) return '#90EE90';
        if (race.includes('dwarf')) return '#A0522D';
        if (race.includes('orc')) return '#556B2F';
        
        // Class-based colors
        if (className.includes('paladin')) return '#FFD700';
        if (className.includes('necromancer')) return '#4B0082';
        if (className.includes('wizard') || className.includes('mage')) return '#9370DB';
        if (className.includes('druid') || className.includes('ranger')) return '#228B22';
        if (className.includes('rogue') || className.includes('assassin')) return '#2F4F4F';
        if (className.includes('barbarian')) return '#8B4513';
        if (className.includes('priest') || className.includes('cleric')) return '#F0E68C';
        if (className.includes('warrior')) return '#B22222';
        
        // Level-based color intensity
        if (heroData.level) {
            const level = heroData.level;
            if (level >= 20) {
                // Epic level heroes get more vibrant colors
                const hash = this.hashCode(heroData.name || heroData.id || '');
                const hue = hash % 360;
                return `hsl(${hue}, 85%, 45%)`; // More saturated
            }
        }
        
        // Generate color from name hash with better distribution
        const hash = this.hashCode(heroData.name || heroData.id || '');
        const hue = (hash * 137) % 360; // Use golden ratio for better distribution
        const saturation = 65 + (hash % 20); // 65-85% saturation
        const lightness = 45 + (hash % 15); // 45-60% lightness
        
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    // Simple hash function for color generation
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
    
    // Get hero data (either from JSON or default)
    getHeroData(heroName) {
        return this.heroes[heroName] || this.generateDefaultHero(heroName);
    }
    
    // Generate default hero if not found
    generateDefaultHero(heroName) {
        return {
            style: 'adventurer',
            seed: heroName.toLowerCase().replace(/\s+/g, '-'),
            icon: '🦸',
            color: this.getColorForHero({ name: heroName }),
            description: `${heroName} - Custom Hero`
        };
    }

    // Build advanced parameters for dicebear avatar generation
    buildAdvancedAvatarParams(element, elementType, elementName) {
        const params = new URLSearchParams();
        
        // Basic parameters
        params.append('seed', element.seed);
        params.append('backgroundColor', this.backgroundColors);
        params.append('size', '200');
        
        // Style-specific parameters based on element type and data
        const style = element.style;
        const jsonData = element.jsonData || {};
        
        // Enhanced parameters based on hero attributes
        if (elementType === 'hero' && jsonData) {
            // Use stats to influence avatar appearance
            const stats = jsonData.stats || {};
            const level = jsonData.level || 1;
            
            if (style === 'adventurer' || style === 'adventurer-neutral') {
                // Hair color based on element/affinity
                const hairColors = this.getHairColors(jsonData);
                if (hairColors.length > 0) {
                    params.append('hairColor', hairColors.join(','));
                }
                
                // Skin color based on race
                const skinColors = this.getSkinColors(jsonData);
                if (skinColors.length > 0) {
                    params.append('skinColor', skinColors.join(','));
                }
                
                // Eye color based on magic affinity
                const eyeColors = this.getEyeColors(jsonData);
                if (eyeColors.length > 0) {
                    params.append('eyes', 'variant01,variant02,variant03,variant04,variant05,variant06,variant07,variant08,variant09,variant10');
                }
                
                // Accessories based on level/class
                if (level >= 15) {
                    params.append('accessories', 'glasses,glasses2,sunglasses');
                    params.append('accessoriesProbability', '50');
                }
                
                // Mouth expression based on personality
                const mouth = this.getMouthExpression(jsonData);
                if (mouth) {
                    params.append('mouth', mouth);
                }
            } else if (style === 'lorelei') {
                // Lorelei specific parameters
                params.append('flip', Math.random() > 0.5 ? 'true' : 'false');
                params.append('earrings', level >= 10 ? 'variant01,variant02,variant03' : 'false');
                params.append('earringsProbability', String(Math.min(level * 5, 80)));
                params.append('earringColor', this.getJewelryColor(jsonData));
                params.append('freckles', stats.luck > 10 ? 'variant01,variant02' : 'false');
                params.append('frecklesProbability', String(stats.luck || 0));
                params.append('glasses', stats.knowledge > 15 ? 'variant01,variant02,variant03,variant04,variant05' : 'false');
                params.append('glassesProbability', String(Math.min(stats.knowledge * 3, 60)));
            } else if (style === 'bottts') {
                // Bottts specific parameters for robotic/magical beings
                params.append('primaryColor', element.color || this.getColorForHero(jsonData));
                params.append('secondaryColor', this.getSecondaryColor(jsonData));
                
                // Texture based on element
                const texture = this.getTextureForElement(jsonData);
                if (texture) {
                    params.append('texture', texture);
                }
            }
            
            // Add randomness based on hero's luck stat
            if (stats.luck) {
                const randomSeed = element.seed + '-luck' + stats.luck;
                params.append('randomizeIds', randomSeed);
            }
        } else if (elementType === 'creature') {
            // Creature-specific parameters
            if (style === 'bottts') {
                params.append('primaryColor', element.color || '#FF6B6B');
                params.append('secondaryColor', this.getDarkerColor(element.color));
            }
        } else if (elementType === 'artifact') {
            // Artifact-specific parameters
            if (style === 'shapes') {
                params.append('shape1Color', element.color || '#FFD700');
                params.append('shape2Color', this.getComplementaryColor(element.color));
                params.append('shape3Color', this.getTriadicColor(element.color));
            }
        }
        
        return params.toString();
    }
    
    // Get hair colors based on hero attributes
    getHairColors(heroData) {
        const colors = [];
        const element = (heroData.element || '').toLowerCase();
        const race = (heroData.race || '').toLowerCase();
        
        if (element.includes('fire')) colors.push('e16b5a', 'f39c12', 'f1c27d');
        else if (element.includes('ice')) colors.push('85c1e9', 'aed6f1', 'd6eaf8');
        else if (element.includes('nature')) colors.push('6c7a0e', '8b9467', 'a8b545');
        else if (element.includes('dark')) colors.push('1a1a1a', '2c3e50', '34495e');
        else if (race.includes('elf')) colors.push('ffd5dc', 'ffeaa7', 'fff5b4');
        else if (race.includes('dwarf')) colors.push('8b4513', 'a0522d', 'd2691e');
        else {
            // Default hair colors
            colors.push('0e0e0e', '3eac2c', '6a4e23', '85c2e6', 'a55728', 'b58143', 'cb6820', 'd35d6e', 'e5d7a3', 'f59797');
        }
        
        return colors;
    }
    
    // Get skin colors based on race
    getSkinColors(heroData) {
        const colors = [];
        const race = (heroData.race || '').toLowerCase();
        
        if (race.includes('orc')) colors.push('6a974a', '7aa858', '8ab968');
        else if (race.includes('elf')) colors.push('fce5cd', 'f9dcc4', 'f8d7c6');
        else if (race.includes('demon')) colors.push('d35d6e', 'e57373', 'ef5350');
        else if (race.includes('undead')) colors.push('d5d6d2', 'c7c8c4', 'b9bab6');
        else if (race.includes('dwarf')) colors.push('dfa290', 'e0a899', 'd19985');
        else {
            // Default human skin tones
            colors.push('614335', '9e7e6e', 'ad9d93', 'b98865', 'd5a87f', 'e5c29b', 'f3e0c7', 'fadcbc');
        }
        
        return colors;
    }
    
    // Get eye colors based on magic affinity
    getEyeColors(heroData) {
        const colors = [];
        const stats = heroData.stats || {};
        const element = (heroData.element || '').toLowerCase();
        
        if (stats.spellPower > 15) colors.push('8e44ad', '9b59b6', 'af7ac5');
        if (element.includes('fire')) colors.push('e74c3c', 'c0392b', 'ff6347');
        if (element.includes('ice')) colors.push('3498db', '2980b9', '5dade2');
        if (element.includes('nature')) colors.push('27ae60', '229954', '52be80');
        
        if (colors.length === 0) {
            // Default eye colors
            colors.push('5b7c99', '6c63ad', '76a5af', '896a67', 'a87c5f');
        }
        
        return colors;
    }
    
    // Get mouth expression based on personality
    getMouthExpression(heroData) {
        const personality = (heroData.personality || '').toLowerCase();
        const className = (heroData.class || '').toLowerCase();
        
        if (personality.includes('heroic') || personality.includes('brave')) {
            return 'variant01,variant02,variant03'; // Confident expressions
        } else if (personality.includes('wise') || className.includes('wizard')) {
            return 'variant04,variant05,variant06'; // Thoughtful expressions
        } else if (personality.includes('dark') || className.includes('necromancer')) {
            return 'variant07,variant08,variant09'; // Serious expressions
        } else if (personality.includes('cheerful') || className.includes('bard')) {
            return 'variant10,variant11,variant12'; // Happy expressions
        }
        
        return null; // Use default
    }
    
    // Get jewelry color based on wealth/status
    getJewelryColor(heroData) {
        const level = heroData.level || 1;
        const className = (heroData.class || '').toLowerCase();
        
        if (level >= 20 || className.includes('roi') || className.includes('king')) {
            return 'ffd700,ffc107,ffb300'; // Gold
        } else if (level >= 15) {
            return 'c0c0c0,a8a8a8,909090'; // Silver
        } else if (level >= 10) {
            return 'cd7f32,b87333,a0522d'; // Bronze
        }
        
        return 'a8a8a8'; // Default silver
    }
    
    // Get texture for bottts style
    getTextureForElement(heroData) {
        const element = (heroData.element || '').toLowerCase();
        const className = (heroData.class || '').toLowerCase();
        
        if (element.includes('metal') || className.includes('knight')) return 'circuits';
        if (element.includes('crystal')) return 'crystals';
        if (element.includes('nature')) return 'organic';
        if (className.includes('wizard')) return 'mystical';
        
        return null; // No texture
    }
    
    // Get secondary color
    getSecondaryColor(heroData) {
        const primaryColor = this.getColorForHero(heroData);
        // Darken the primary color for secondary
        return this.adjustColorBrightness(primaryColor, -20);
    }
    
    // Helper function to darken a color
    getDarkerColor(color) {
        return this.adjustColorBrightness(color, -30);
    }
    
    // Helper function to get complementary color
    getComplementaryColor(color) {
        // Simple complementary color calculation
        const rgb = this.hexToRgb(color);
        if (!rgb) return color;
        
        return this.rgbToHex(
            255 - rgb.r,
            255 - rgb.g,
            255 - rgb.b
        );
    }
    
    // Helper function to get triadic color
    getTriadicColor(color) {
        const hsl = this.hexToHsl(color);
        if (!hsl) return color;
        
        hsl.h = (hsl.h + 120) % 360;
        return this.hslToHex(hsl);
    }
    
    // Color utility functions
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    hexToHsl(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return null;
        
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    hslToHex(hsl) {
        const h = hsl.h / 360;
        const s = hsl.s / 100;
        const l = hsl.l / 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return this.rgbToHex(
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        );
    }
    
    adjustColorBrightness(color, percent) {
        const rgb = this.hexToRgb(color);
        if (!rgb) return color;
        
        const adjust = (val) => Math.max(0, Math.min(255, val + (val * percent / 100)));
        
        return this.rgbToHex(
            adjust(rgb.r),
            adjust(rgb.g),
            adjust(rgb.b)
        );
    }
    
    // Generate default element if not found
    generateDefaultElement(elementType, elementName) {
        const defaultStyles = {
            hero: 'adventurer',
            creature: 'bottts',
            building: 'shapes',
            nature: 'shapes',
            artifact: 'shapes',
            spell: 'shapes',
            ui: 'shapes',
            environment: 'shapes'
        };
        
        return {
            style: defaultStyles[elementType] || 'shapes',
            seed: elementName.toLowerCase().replace(/\s+/g, '-'),
            icon: '❓',
            color: this.getColorForHero({ name: elementName }),
            description: `${elementName} - Generated`
        };
    }

    // Generate dicebar avatar for any element - ENHANCED VERSION
    generateAvatar(elementType, elementName) {
        let element = null;
        let category = '';
        
        // Find the element data
        switch(elementType) {
            case 'hero':
                element = this.getHeroData(elementName);
                category = 'heroes';
                break;
            case 'creature':
                element = this.creatures[elementName] || this.dragons[elementName];
                category = 'creatures';
                break;
            case 'building':
                element = this.buildings[elementName];
                category = 'buildings';
                break;
            case 'nature':
                element = this.nature[elementName];
                category = 'nature';
                break;
            case 'artifact':
                element = this.artifacts[elementName];
                category = 'artifacts';
                break;
            case 'spell':
                element = this.spells[elementName];
                category = 'spells';
                break;
            case 'ui':
                element = this.ui_elements[elementName];
                category = 'ui';
                break;
            case 'environment':
                element = this.environment[elementName];
                category = 'environment';
                break;
        }
        
        if (!element) {
            console.log(`Element ${elementName} not found in ${elementType}, generating default`);
            element = this.generateDefaultElement(elementType, elementName);
        }
        
        // Build advanced avatar parameters based on element data
        const params = this.buildAdvancedAvatarParams(element, elementType, elementName);
        
        // Return just the URL for backward compatibility
        return `${this.baseUrl}/${element.style}/svg?${params}`;
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