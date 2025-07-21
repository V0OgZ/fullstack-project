// hero-avatars.js - Système d'avatars complet pour Heroes of Time
class HeroAvatarSystem {
    constructor() {
        this.avatars = {
            // Héros principaux avec avatars Dicebear
            'Arthur': {
                style: 'adventurer',
                seed: 'arthur-pendragon',
                icon: '⚔️',
                color: '#FFD700'
            },
            'Ragnar': {
                style: 'warrior',
                seed: 'ragnar-lothbrok',
                icon: '🛡️',
                color: '#8B0000'
            },
            'Morgana': {
                style: 'lorelei',
                seed: 'morgana-le-fay',
                icon: '🧙‍♀️',
                color: '#800080'
            },
            'Merlin': {
                style: 'wizard',
                seed: 'merlin-ambrosius',
                icon: '🔮',
                color: '#4169E1'
            },
            'Grunt': {
                style: 'orc',
                seed: 'grunt-warrior',
                icon: '👹',
                color: '#228B22'
            },
            'Lysandrel': {
                style: 'elf',
                seed: 'lysandrel-elf',
                icon: '🧝‍♀️',
                color: '#90EE90'
            },
            'Nyx-Lua': {
                style: 'shadow',
                seed: 'nyx-lua-shadow',
                icon: '🌙',
                color: '#2F4F4F'
            },
            'Thane': {
                style: 'noble',
                seed: 'thane-noble',
                icon: '👑',
                color: '#DAA520'
            },
            'Gardien Zephyr': {
                style: 'guardian',
                seed: 'gardien-zephyr',
                icon: '🛡️',
                color: '#87CEEB'
            },
            'Roland': {
                style: 'paladin',
                seed: 'roland-paladin',
                icon: '⚜️',
                color: '#F0E68C'
            },
            'Jean-Grofignon': {
                style: 'philosopher',
                seed: 'jean-grofignon',
                icon: '🧠',
                color: '#9370DB'
            },
            'Claudius': {
                style: 'judge',
                seed: 'claudius-judge',
                icon: '⚖️',
                color: '#708090'
            },
            'The Dude': {
                style: 'zen',
                seed: 'the-dude-zen',
                icon: '🎳',
                color: '#DEB887'
            },
            'Walter': {
                style: 'surveillant',
                seed: 'walter-surveillant',
                icon: '🔍',
                color: '#FF6347'
            }
        };
        
        this.fallbackIcons = {
            'default': '🦸',
            'warrior': '⚔️',
            'mage': '🔮',
            'archer': '🏹',
            'rogue': '🗡️',
            'healer': '💊',
            'tank': '🛡️'
        };
    }
    
    // Générer un avatar Dicebear
    generateDicebearAvatar(heroName) {
        const hero = this.avatars[heroName];
        if (!hero) {
            return this.getFallbackAvatar(heroName);
        }
        
        try {
            // URL Dicebear avec style et seed
            const baseUrl = 'https://api.dicebear.com/7.x';
            const url = `${baseUrl}/${hero.style}/svg?seed=${hero.seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
            
            return {
                type: 'dicebear',
                url: url,
                icon: hero.icon,
                color: hero.color,
                style: hero.style
            };
        } catch (error) {
            console.warn(`Erreur génération avatar pour ${heroName}:`, error);
            return this.getFallbackAvatar(heroName);
        }
    }
    
    // Avatar de fallback avec emoji
    getFallbackAvatar(heroName) {
        const hero = this.avatars[heroName];
        if (hero) {
            return {
                type: 'emoji',
                icon: hero.icon,
                color: hero.color,
                style: 'fallback'
            };
        }
        
        // Avatar par défaut basé sur le nom
        const defaultIcon = this.getDefaultIcon(heroName);
        return {
            type: 'emoji',
            icon: defaultIcon,
            color: '#808080',
            style: 'default'
        };
    }
    
    // Déterminer l'icône par défaut basée sur le nom
    getDefaultIcon(heroName) {
        const name = heroName.toLowerCase();
        
        if (name.includes('warrior') || name.includes('fighter')) return '⚔️';
        if (name.includes('mage') || name.includes('wizard')) return '🔮';
        if (name.includes('archer') || name.includes('ranger')) return '🏹';
        if (name.includes('rogue') || name.includes('thief')) return '🗡️';
        if (name.includes('healer') || name.includes('cleric')) return '💊';
        if (name.includes('tank') || name.includes('guard')) return '🛡️';
        if (name.includes('grunt') || name.includes('orc')) return '👹';
        if (name.includes('elf')) return '🧝‍♀️';
        if (name.includes('dwarf')) return '🧙‍♂️';
        if (name.includes('dragon')) return '🐉';
        if (name.includes('phoenix')) return '🦅';
        if (name.includes('knight')) return '👑';
        if (name.includes('lich')) return '💀';
        
        return this.fallbackIcons.default;
    }
    
    // Créer un élément HTML pour l'avatar
    createAvatarElement(heroName, size = 40) {
        const avatar = this.generateDicebearAvatar(heroName);
        const container = document.createElement('div');
        container.className = 'hero-avatar';
        container.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${avatar.color};
            border: 2px solid #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            font-size: ${size * 0.6}px;
            position: relative;
            overflow: hidden;
        `;
        
        if (avatar.type === 'dicebear') {
            // Avatar Dicebear
            const img = document.createElement('img');
            img.src = avatar.url;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
            `;
            img.onerror = () => {
                // Fallback vers emoji si l'image échoue
                container.innerHTML = avatar.icon;
            };
            container.appendChild(img);
        } else {
            // Avatar emoji
            container.innerHTML = avatar.icon;
        }
        
        // Tooltip avec nom du héros
        container.title = heroName;
        
        return container;
    }
    
    // Mettre à jour les icônes dans le jeu
    updateGameHeroIcons() {
        const heroIcons = {};
        
        Object.keys(this.avatars).forEach(heroName => {
            const avatar = this.generateDicebearAvatar(heroName);
            heroIcons[heroName] = avatar.icon;
        });
        
        return heroIcons;
    }
    
    // Obtenir tous les héros disponibles
    getAvailableHeroes() {
        return Object.keys(this.avatars);
    }
    
    // Ajouter un nouveau héros
    addHero(name, style, seed, icon, color) {
        this.avatars[name] = {
            style: style,
            seed: seed,
            icon: icon,
            color: color
        };
    }
}

// Export pour utilisation globale
window.HeroAvatarSystem = HeroAvatarSystem; 