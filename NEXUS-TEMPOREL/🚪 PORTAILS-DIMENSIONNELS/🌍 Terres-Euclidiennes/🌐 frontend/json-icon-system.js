// 🎯 JSON ICON SYSTEM - Icônes depuis les JSONs des héros
// ======================================================

class JsonIconSystem {
    constructor() {
        this.heroIcons = {};
        this.loadHeroIcons();
    }
    
    async loadHeroIcons() {
        try {
            // Charger les héros depuis l'API backend
            const response = await fetch('/api/heroes');
            const heroes = await response.json();
            
            heroes.forEach(hero => {
                if (hero.icon) {
                    this.heroIcons[hero.name] = {
                        icon: hero.icon,
                        color: hero.display?.color || '#4A90E2',
                        category: hero.display?.category || 'unknown'
                    };
                }
            });
            
            console.log('🎯 Icônes héros chargées depuis JSON');
        } catch (error) {
            // Fallback - icônes par défaut
            this.heroIcons = {
                'Claudius Memento': { icon: '📜', color: '#9B59B6' },
                'Elena Flamme Douce': { icon: '🔥', color: '#FF6B35' },
                'Marcus Bouclier de Fer': { icon: '🛡️', color: '#87CEEB' },
                'Nikita Victor': { icon: '🧹', color: '#2E8B57' },
                'Peekill': { icon: '🗡️', color: '#C0392B' },
                'Kiandpi': { icon: '🏹', color: '#8FBC8F' }
            };
        }
    }
    
    getHeroIcon(heroName) {
        const hero = this.heroIcons[heroName];
        return hero ? hero.icon : '🦸';
    }
    
    getHeroColor(heroName) {
        const hero = this.heroIcons[heroName];
        return hero ? hero.color : '#4A90E2';
    }
    
    createHeroElement(heroName, size = 30) {
        const icon = this.getHeroIcon(heroName);
        const color = this.getHeroColor(heroName);
        
        const element = document.createElement('div');
        element.className = 'hero-icon-element';
        element.innerHTML = icon;
        element.style.cssText = `
            font-size: ${size}px;
            color: ${color};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${size + 10}px;
            height: ${size + 10}px;
            border-radius: 50%;
            background: rgba(0,0,0,0.2);
            border: 2px solid ${color};
            transition: all 0.2s ease;
        `;
        
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1)';
            element.style.boxShadow = `0 0 10px ${color}`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = 'none';
        });
        
        return element;
    }
    
    // Remplacer dicebear gallery par simple gallery
    createSimpleGallery(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        container.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 15px;
            padding: 20px;
            max-height: 400px;
            overflow-y: auto;
        `;
        
        Object.keys(this.heroIcons).forEach(heroName => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            `;
            
            const heroElement = this.createHeroElement(heroName, 50);
            const label = document.createElement('div');
            label.textContent = heroName;
            label.style.cssText = `
                font-size: 12px;
                text-align: center;
                color: #E8E8E8;
                max-width: 80px;
                word-wrap: break-word;
            `;
            
            wrapper.appendChild(heroElement);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        });
    }
}

window.JsonIconSystem = JsonIconSystem;

document.addEventListener('DOMContentLoaded', () => {
    window.jsonIconSystem = new JsonIconSystem();
});
