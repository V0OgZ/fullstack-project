// script-console.js - Console de script temporel avec historique
class ScriptConsole {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.history = [];
        this.historyIndex = 0;
        this.suggestions = [
            'HERO(Arthur)',
            'HERO(Ragnar)',
            'HERO(Merlin)',
            'MOV(Arthur, @10,10)',
            'CREATE(CREATURE, Dragon, @15,15)',
            'CREATE(STRUCTURE, Tower, @20,20)',
            'USE(ITEM, AvantWorldBlade, HERO:Arthur)',
            'USE(ITEM, ReverseClock, HERO:Ragnar)',
            'USE(ITEM, IgnoranceBeacon, HERO:Merlin)',
            'ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))',
            'ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))',
            '†ψ001',
            '†ψ002',
            'Π(Player enters @15,15) ⇒ †ψ001',
            'BATTLE(Arthur, Ragnar)'
        ];
        this.setupUI();
    }
    
    setupUI() {
        this.container.innerHTML = `
            <div class="console-output" id="console-output"></div>
            <div class="console-input">
                <span class="prompt">></span>
                <input type="text" id="script-input" placeholder="Enter script command..." autocomplete="off">
                <button id="execute-btn">Execute</button>
            </div>
            <div class="suggestions" id="suggestions" style="display: none;"></div>
        `;
        
        this.input = document.getElementById('script-input');
        this.output = document.getElementById('console-output');
        this.executeBtn = document.getElementById('execute-btn');
        this.suggestionsDiv = document.getElementById('suggestions');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.executeBtn.addEventListener('click', () => this.executeScript());
        
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeScript();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete();
            }
        });
        
        this.input.addEventListener('input', (e) => {
            this.showSuggestions(e.target.value);
        });
        
        this.input.addEventListener('blur', () => {
            // Delay hiding suggestions to allow clicking
            setTimeout(() => this.hideSuggestions(), 200);
        });
    }
    
    async executeScript() {
        const script = this.input.value.trim();
        if (!script) return;
        
        this.addToOutput(`> ${script}`, 'command');
        this.history.push(script);
        this.historyIndex = this.history.length;
        
        // 🌐 TRADUCTION AUTOMATIQUE DU SCRIPT
        if (window.translationService && window.translationService.isAvailable) {
            try {
                const translation = await window.translationService.quickTranslate(script);
                if (translation && translation !== script) {
                    this.addToOutput(`🌐 ${translation}`, 'translation');
                }
            } catch (error) {
                console.log('Erreur de traduction:', error);
            }
        }
        
        try {
            // Use UI enhancements controller if available
            if (window.uiEnhancements && window.uiEnhancements.executeScript) {
                await window.uiEnhancements.executeScript(script);
            } else {
                const result = await window.gameAPI.executeScript(script);
                this.addToOutput(`✅ Script executed successfully`, 'success');
            }
            
            // Refresh the game state
            if (window.gameRenderer) {
                window.gameRenderer.refresh();
            }
        } catch (error) {
            this.addToOutput(`❌ Error: ${error.message}`, 'error');
        }
        
        this.input.value = '';
        this.hideSuggestions();
    }
    
    navigateHistory(direction) {
        if (this.history.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            this.input.value = '';
            return;
        }
        
        this.input.value = this.history[this.historyIndex];
    }
    
    autoComplete() {
        const currentValue = this.input.value.toLowerCase();
        const matches = this.suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(currentValue)
        );
        
        if (matches.length > 0) {
            this.input.value = matches[0];
        }
    }
    
    showSuggestions(value) {
        if (!value || value.length < 2) {
            this.hideSuggestions();
            return;
        }
        
        const matches = this.suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        
        if (matches.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        this.suggestionsDiv.innerHTML = matches
            .slice(0, 5) // Limit to 5 suggestions
            .map(suggestion => `<div class="suggestion-item" onclick="window.scriptConsole.selectSuggestion('${suggestion}')">${suggestion}</div>`)
            .join('');
        
        this.suggestionsDiv.style.display = 'block';
    }
    
    selectSuggestion(suggestion) {
        this.input.value = suggestion;
        this.hideSuggestions();
        this.input.focus();
    }
    
    hideSuggestions() {
        this.suggestionsDiv.style.display = 'none';
    }
    
    addToOutput(text, type = 'normal') {
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        
        // 🌐 STYLISATION SPÉCIALE POUR LES TRADUCTIONS
        if (type === 'translation') {
            line.innerHTML = `
                <span class="translation-icon">🌐</span>
                <span class="translation-text">${text.replace('🌐 ', '')}</span>
            `;
        } else {
            line.textContent = text;
        }
        
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
        
        // Limit output lines to prevent memory issues
        if (this.output.children.length > 100) {
            this.output.removeChild(this.output.firstChild);
        }
    }
    
    clear() {
        this.output.innerHTML = '';
    }
    
    // Helper method to add colored syntax highlighting
    addColoredOutput(text, type = 'normal') {
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        
        // Basic syntax highlighting for temporal commands
        let coloredText = text
            .replace(/ψ\d+/g, '<span style="color: #9370DB;">$&</span>')
            .replace(/⊙/g, '<span style="color: #FFD700;">$&</span>')
            .replace(/†/g, '<span style="color: #DC143C;">$&</span>')
            .replace(/Π/g, '<span style="color: #32CD32;">$&</span>')
            .replace(/Δt\+?\d+/g, '<span style="color: #4A90E2;">$&</span>')
            .replace(/@\d+,\d+/g, '<span style="color: #FF69B4;">$&</span>')
            .replace(/HERO\([^)]+\)/g, '<span style="color: #FFD700;">$&</span>')
            .replace(/MOV\([^)]+\)/g, '<span style="color: #90EE90;">$&</span>')
            .replace(/CREATE\([^)]+\)/g, '<span style="color: #FFA500;">$&</span>')
            .replace(/USE\([^)]+\)/g, '<span style="color: #DA70D6;">$&</span>');
        
        line.innerHTML = coloredText;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }
}