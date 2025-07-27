// missing-assets-loader.js - Chargeur pour tous les assets manquants
class MissingAssetsLoader {
    constructor() {
        this.loadedAssets = {
            heroes: [],
            artifacts: [],
            creatures: [],
            maps: []
        };
        
        this.initializeAssets();
    }
    
    initializeAssets() {
        // Charger tous les héros manquants
        this.loadMissingHeroes();
        
        // Charger tous les artefacts manquants
        this.loadMissingArtifacts();
        
        // Charger toutes les créatures manquantes
        this.loadMissingCreatures();
        
        // Charger les maps manquantes
        this.loadMissingMaps();
    }
    
    loadMissingHeroes() {
        // Héros extraits de game_assets
        const extractedHeroes = [
            {
                name: 'Lysandrel',
                title: 'Le Forgeron de Réalité',
                class: 'Reality Forger',
                icon: '🔨',
                color: '#8B4513',
                stats: { health: 180, temporalEnergy: 300, attack: 25, defense: 20 }
            },
            {
                name: 'Nyx-Lua',
                title: 'Tisseuse de Mondes Latents',
                class: 'World Weaver',
                icon: '🕸️',
                color: '#4B0082',
                stats: { health: 140, temporalEnergy: 400, attack: 20, defense: 15 }
            },
            {
                name: 'Gardien Zephyr',
                title: 'Gardien du Nexus',
                class: 'Nexus Guardian',
                icon: '🛡️',
                color: '#87CEEB',
                stats: { health: 150, temporalEnergy: 300, attack: 18, defense: 16 }
            },
            {
                name: 'Thane',
                title: 'Le Tueur de Dragons',
                class: 'Dragon Slayer',
                icon: '⚔️',
                color: '#DC143C',
                stats: { health: 200, temporalEnergy: 500, attack: 30, defense: 20 }
            }
        ];
        
        // Héros GROFI
        const grofiHeroes = [
            {
                name: 'Jean-Grofignon',
                title: 'L\'Éveillé Ontologique',
                class: 'Temporal Master',
                icon: '🧠',
                color: '#9370DB',
                stats: { health: 120, temporalEnergy: 200, attack: 15, defense: 10 }
            },
            {
                name: 'Claudius',
                title: 'Le Maître de l\'Ordre',
                class: 'Order Master',
                icon: '⚖️',
                color: '#708090',
                stats: { health: 100, temporalEnergy: 150, attack: 20, defense: 15 }
            },
            {
                name: 'The Dude',
                title: 'Le Zen Quantique',
                class: 'Zen Master',
                icon: '🎳',
                color: '#DEB887',
                stats: { health: 80, temporalEnergy: 100, attack: 10, defense: 8 }
            },
            {
                name: 'Walter',
                title: 'Le Surveillant',
                class: 'Observer',
                icon: '🔍',
                color: '#FF6347',
                stats: { health: 90, temporalEnergy: 120, attack: 12, defense: 12 }
            }
        ];
        
        this.loadedAssets.heroes = [...extractedHeroes, ...grofiHeroes];
    }
    
    loadMissingArtifacts() {
        // Artefacts temporels
        const temporalArtifacts = [
            {
                name: 'Lame d\'Avant-Monde',
                tier: 5,
                type: 'LEGENDARY_WEAPON',
                icon: '⚔️',
                effects: { attackBonus: 35, temporalDamage: 25, quantumBoost: 0.95 }
            },
            {
                name: 'Horloge Inversée',
                tier: 4,
                type: 'TEMPORAL_DEVICE',
                icon: '🕰️',
                effects: { timeRewind: 2, temporalEnergyRestore: 50 }
            },
            {
                name: 'Balise d\'Ignorance',
                tier: 4,
                type: 'TEMPORAL_DEVICE',
                icon: '🚫',
                effects: { causalityProtection: 0.8, entropyReversal: true }
            },
            {
                name: 'Tour de l\'Ancrage',
                tier: 5,
                type: 'STRUCTURE',
                icon: '🏰',
                effects: { realityAnchor: true, timelineStabilization: 0.9 }
            }
        ];
        
        // Artefacts quantiques Tier 6
        const quantumArtifacts = [
            {
                name: 'Couronne de Superposition',
                tier: 6,
                type: 'HEAD',
                icon: '👑',
                effects: { temporalEnergy: 150, magicPower: 30, wisdom: 25 }
            },
            {
                name: 'Épée d\'Amplitude Pure',
                tier: 6,
                type: 'WEAPON',
                icon: '⚔️',
                effects: { attack: 50, temporalEnergy: 100, precision: 30 }
            },
            {
                name: 'Œil de Wigner',
                tier: 6,
                type: 'ACCESSORY',
                icon: '👁️',
                effects: { quantumVision: true, collapseResistance: 0.9 }
            },
            {
                name: 'Grimoire de Schrödinger',
                tier: 6,
                type: 'BOOK',
                icon: '📚',
                effects: { quantumSpells: true, superpositionMastery: 0.95 }
            }
        ];
        
        this.loadedAssets.artifacts = [...temporalArtifacts, ...quantumArtifacts];
    }
    
    loadMissingCreatures() {
        const creatures = [
            {
                name: 'Phénix Quantique',
                type: 'LEGENDARY_CREATURE',
                icon: '🦅',
                stats: { health: 120, attack: 25, defense: 15 },
                abilities: ['quantum_rebirth', 'timeline_flight']
            },
            {
                name: 'Chevalier Quantique',
                type: 'ELITE_CREATURE',
                icon: '🛡️',
                stats: { health: 150, attack: 30, defense: 25 },
                abilities: ['quantum_charge', 'probability_shield']
            },
            {
                name: 'Liche Quantique',
                type: 'BOSS_CREATURE',
                icon: '💀',
                stats: { health: 200, attack: 35, defense: 20 },
                abilities: ['quantum_necromancy', 'death_probability']
            },
            {
                name: 'Dragon Rouge Temporel',
                type: 'ULTIMATE_BOSS',
                icon: '🐉',
                stats: { health: 500, attack: 50, defense: 30 },
                abilities: ['temporal_breath', 'dragon_rage']
            },
            {
                name: 'Guerriers Fantômes',
                type: 'SWARM_CREATURE',
                icon: '👻',
                stats: { health: 60, attack: 15, defense: 8 },
                abilities: ['phantom_strike', 'ethereal_phase']
            }
        ];
        
        this.loadedAssets.creatures = creatures;
    }
    
    loadMissingMaps() {
        const maps = [
            {
                name: 'Nexus Temporel',
                type: 'CROSSROADS',
                terrain: 'quantum_nexus',
                specialFeatures: ['timeline_branches', 'probability_wells', 'causality_nodes']
            },
            {
                name: 'Forge de Réalité',
                type: 'FORGE',
                terrain: 'reality_forge',
                specialFeatures: ['reality_anvils', 'quantum_furnaces', 'temporal_hammers']
            },
            {
                name: 'Bibliothèque des Mondes',
                type: 'LIBRARY',
                terrain: 'world_library',
                specialFeatures: ['timeline_books', 'probability_shelves', 'reality_archives']
            },
            {
                name: 'Tour d\'Ancrage',
                type: 'TOWER',
                terrain: 'anchor_tower',
                specialFeatures: ['reality_anchors', 'timeline_stabilizers', 'causality_locks']
            }
        ];
        
        this.loadedAssets.maps = maps;
    }
    
    // Méthodes pour accéder aux assets
    getHero(name) {
        return this.loadedAssets.heroes.find(hero => hero.name === name);
    }
    
    getArtifact(name) {
        return this.loadedAssets.artifacts.find(artifact => artifact.name === name);
    }
    
    getCreature(name) {
        return this.loadedAssets.creatures.find(creature => creature.name === name);
    }
    
    getMap(name) {
        return this.loadedAssets.maps.find(map => map.name === name);
    }
    
    getAllHeroes() {
        return this.loadedAssets.heroes;
    }
    
    getAllArtifacts() {
        return this.loadedAssets.artifacts;
    }
    
    getAllCreatures() {
        return this.loadedAssets.creatures;
    }
    
    getAllMaps() {
        return this.loadedAssets.maps;
    }
    
    // Créer des éléments HTML pour l'interface
    createHeroCard(hero) {
        return `
            <div class="hero-card" data-hero="${hero.name}">
                <div class="hero-avatar" style="background: ${hero.color}">
                    <span class="hero-icon">${hero.icon}</span>
                </div>
                <div class="hero-info">
                    <h4>${hero.name}</h4>
                    <p class="hero-title">${hero.title}</p>
                    <p class="hero-class">${hero.class}</p>
                    <div class="hero-stats">
                        <span>❤️ ${hero.stats.health}</span>
                        <span>⚡ ${hero.stats.temporalEnergy}</span>
                        <span>⚔️ ${hero.stats.attack}</span>
                        <span>🛡️ ${hero.stats.defense}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    createArtifactCard(artifact) {
        return `
            <div class="artifact-card" data-artifact="${artifact.name}">
                <div class="artifact-icon">${artifact.icon}</div>
                <div class="artifact-info">
                    <h4>${artifact.name}</h4>
                    <p class="artifact-tier">Tier ${artifact.tier} - ${artifact.type}</p>
                    <div class="artifact-effects">
                        ${Object.entries(artifact.effects).map(([key, value]) => 
                            `<span class="effect">${key}: ${value}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    createCreatureCard(creature) {
        return `
            <div class="creature-card" data-creature="${creature.name}">
                <div class="creature-icon">${creature.icon}</div>
                <div class="creature-info">
                    <h4>${creature.name}</h4>
                    <p class="creature-type">${creature.type}</p>
                    <div class="creature-stats">
                        <span>❤️ ${creature.stats.health}</span>
                        <span>⚔️ ${creature.stats.attack}</span>
                        <span>🛡️ ${creature.stats.defense}</span>
                    </div>
                    <div class="creature-abilities">
                        ${creature.abilities.map(ability => 
                            `<span class="ability">${ability}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Mettre à jour l'interface avec tous les assets
    updateInterface() {
        // Mettre à jour le panneau de sélection de héros
        this.updateHeroSelectionPanel();
        
        // Mettre à jour le panneau d'artefacts
        this.updateArtifactPanel();
        
        // Mettre à jour le panneau de créatures
        this.updateCreaturePanel();
    }
    
    updateHeroSelectionPanel() {
        const heroGrid = document.getElementById('hero-grid');
        if (!heroGrid) return;
        
        const heroCards = this.loadedAssets.heroes.map(hero => this.createHeroCard(hero)).join('');
        heroGrid.innerHTML = heroCards;
    }
    
    updateArtifactPanel() {
        // Créer un panneau d'artefacts s'il n'existe pas
        let artifactPanel = document.querySelector('.artifact-panel');
        if (!artifactPanel) {
            const sidePanel = document.querySelector('.side-panel');
            if (sidePanel) {
                artifactPanel = document.createElement('div');
                artifactPanel.className = 'artifact-panel';
                sidePanel.appendChild(artifactPanel);
            }
        }
        
        if (artifactPanel) {
            artifactPanel.innerHTML = `
                <h3>🔮 Artefacts</h3>
                <div class="artifact-grid">
                    ${this.loadedAssets.artifacts.map(artifact => this.createArtifactCard(artifact)).join('')}
                </div>
            `;
        }
    }
    
    updateCreaturePanel() {
        // Créer un panneau de créatures s'il n'existe pas
        let creaturePanel = document.querySelector('.creature-panel');
        if (!creaturePanel) {
            const sidePanel = document.querySelector('.side-panel');
            if (sidePanel) {
                creaturePanel = document.createElement('div');
                creaturePanel.className = 'creature-panel';
                sidePanel.appendChild(creaturePanel);
            }
        }
        
        if (creaturePanel) {
            creaturePanel.innerHTML = `
                <h3>🐉 Créatures</h3>
                <div class="creature-grid">
                    ${this.loadedAssets.creatures.map(creature => this.createCreatureCard(creature)).join('')}
                </div>
            `;
        }
    }
}

// Export pour utilisation globale
window.MissingAssetsLoader = MissingAssetsLoader; 