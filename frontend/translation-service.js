// 🌐 SERVICE DE TRADUCTION UNIVERSEL - Heroes of Time
// Utilise l'API backend existante pour traduire scripts HOTS et formules

class TranslationService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/collection';
        this.cache = new Map();
        this.isAvailable = false;
        this.checkAvailability();
    }
    
    // 🔍 VÉRIFIER LA DISPONIBILITÉ DU SERVICE
    async checkAvailability() {
        try {
            const response = await fetch(`${this.baseUrl}/translation-modes`);
            if (response.ok) {
                this.isAvailable = true;
                console.log('🌐 Service de traduction disponible');
            }
        } catch (error) {
            console.log('🌐 Service de traduction non disponible:', error.message);
            this.isAvailable = false;
        }
    }
    
    // 📜 TRADUIRE UN SCRIPT HOTS
    async translateScript(script, mode = 'all') {
        if (!this.isAvailable) {
            return this.getFallbackTranslation(script);
        }
        
        const cacheKey = `script_${script}_${mode}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ script, mode })
            });
            
            if (response.ok) {
                const result = await response.json();
                this.cache.set(cacheKey, result);
                return result;
            } else {
                return this.getFallbackTranslation(script);
            }
        } catch (error) {
            console.error('Erreur de traduction:', error);
            return this.getFallbackTranslation(script);
        }
    }
    
    // 🔮 TRADUIRE UNE FORMULE D'ARTEFACT
    async translateFormula(formula, mode = 'symbols') {
        if (!this.isAvailable) {
            return this.getFallbackFormulaTranslation(formula);
        }
        
        const cacheKey = `formula_${formula}_${mode}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/translate-formula`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formula, mode })
            });
            
            if (response.ok) {
                const result = await response.json();
                this.cache.set(cacheKey, result);
                return result;
            } else {
                return this.getFallbackFormulaTranslation(formula);
            }
        } catch (error) {
            console.error('Erreur de traduction de formule:', error);
            return this.getFallbackFormulaTranslation(formula);
        }
    }
    
    // 🎯 TRADUCTION RAPIDE (pour affichage inline)
    async quickTranslate(script) {
        const result = await this.translateScript(script, 'simple');
        return result.translated || script;
    }
    
    // 🔍 ANALYSER UN SCRIPT (détails complets)
    async analyzeScript(script) {
        const result = await this.translateScript(script, 'detailed');
        return {
            original: script,
            translated: result.translated,
            details: result.details,
            type: this.detectScriptType(script),
            complexity: this.calculateComplexity(script)
        };
    }
    
    // 🎨 CRÉER UNE CARTE DE TRADUCTION VISUELLE
    async createTranslationCard(script) {
        const analysis = await this.analyzeScript(script);
        
        const card = document.createElement('div');
        card.className = 'translation-card';
        
        const typeIcon = this.getTypeIcon(analysis.type);
        const complexityColor = this.getComplexityColor(analysis.complexity);
        
        card.innerHTML = `
            <div class="translation-header">
                <span class="type-icon">${typeIcon}</span>
                <span class="script-type">${analysis.type}</span>
                <span class="complexity-badge" style="color: ${complexityColor}">
                    ${analysis.complexity.toUpperCase()}
                </span>
            </div>
            <div class="translation-content">
                <div class="original-script">
                    <strong>Script:</strong> <code>${analysis.original}</code>
                </div>
                <div class="translated-text">
                    <strong>Traduction:</strong> ${analysis.translated}
                </div>
                ${analysis.details ? `
                <div class="script-details">
                    <strong>Détails:</strong> ${analysis.details}
                </div>
                ` : ''}
            </div>
        `;
        
        return card;
    }
    
    // 🎯 DÉTECTER LE TYPE DE SCRIPT
    detectScriptType(script) {
        if (script.includes('ψ') && script.includes('⊙')) {
            return 'PSI_STATE';
        } else if (script.startsWith('†')) {
            return 'COLLAPSE';
        } else if (script.includes('Π(')) {
            return 'OBSERVATION';
        } else if (script.startsWith('HERO(')) {
            return 'HERO_CREATION';
        } else if (script.startsWith('MOV(')) {
            return 'MOVEMENT';
        } else if (script.startsWith('CREATE(')) {
            return 'CREATION';
        } else if (script.startsWith('USE(')) {
            return 'ARTIFACT_USAGE';
        } else if (script.startsWith('BATTLE(')) {
            return 'BATTLE';
        } else {
            return 'UNKNOWN';
        }
    }
    
    // 📊 CALCULER LA COMPLEXITÉ
    calculateComplexity(script) {
        let complexity = 0;
        
        // ψ-states ajoutent de la complexité
        if (script.includes('ψ')) complexity += 2;
        
        // Coordonnées temporelles
        if (script.includes('Δt')) complexity += 1;
        
        // Coordonnées spatiales
        if (script.includes('@')) complexity += 1;
        
        // Artefacts
        if (script.includes('USE(')) complexity += 1;
        
        // Observations
        if (script.includes('Π(')) complexity += 2;
        
        if (complexity <= 2) return 'low';
        if (complexity <= 4) return 'medium';
        return 'high';
    }
    
    // 🎨 UTILITAIRES VISUELS
    getTypeIcon(type) {
        const icons = {
            'PSI_STATE': 'ψ',
            'COLLAPSE': '†',
            'OBSERVATION': 'Π',
            'HERO_CREATION': '👤',
            'MOVEMENT': '🚶',
            'CREATION': '✨',
            'ARTIFACT_USAGE': '🔮',
            'BATTLE': '⚔️',
            'UNKNOWN': '❓'
        };
        return icons[type] || '❓';
    }
    
    getComplexityColor(complexity) {
        const colors = {
            'low': '#27ae60',
            'medium': '#f39c12',
            'high': '#e74c3c'
        };
        return colors[complexity] || '#95a5a6';
    }
    
    // 🛡️ TRADUCTIONS DE FALLBACK (quand le service n'est pas disponible)
    getFallbackTranslation(script) {
        const fallbackTranslations = {
            'HERO(Arthur)': 'Créer le héros Arthur',
            'HERO(Ragnar)': 'Créer le héros Ragnar',
            'HERO(Merlin)': 'Créer le héros Merlin',
            'MOV(Arthur, @10,10)': 'Déplacer Arthur vers la position (10,10)',
            'CREATE(CREATURE, Dragon, @15,15)': 'Créer un dragon à la position (15,15)',
            'USE(ITEM, AvantWorldBlade, HERO:Arthur)': 'Arthur utilise l\'artefact Lame d\'Avant-Monde',
            'ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))': 'État quantique ψ001 : Dans 2 tours, Arthur se déplacera vers (15,15)',
            '†ψ001': 'Effondrer l\'état quantique ψ001',
            'Π(Player enters @15,15) ⇒ †ψ001': 'Si un joueur entre à (15,15), effondrer ψ001'
        };
        
        return {
            translated: fallbackTranslations[script] || `Script: ${script}`,
            details: 'Traduction locale (service non disponible)',
            mode: 'fallback'
        };
    }
    
    getFallbackFormulaTranslation(formula) {
        return {
            original: formula,
            translated: `Formule: ${formula}`,
            mode: 'fallback'
        };
    }
    
    // 🧹 NETTOYER LE CACHE
    clearCache() {
        this.cache.clear();
        console.log('🌐 Cache de traduction vidé');
    }
    
    // 📊 STATISTIQUES DU SERVICE
    getStats() {
        return {
            isAvailable: this.isAvailable,
            cacheSize: this.cache.size,
            baseUrl: this.baseUrl
        };
    }
}

// 🌍 EXPORT POUR UTILISATION GLOBALE
window.TranslationService = TranslationService; 