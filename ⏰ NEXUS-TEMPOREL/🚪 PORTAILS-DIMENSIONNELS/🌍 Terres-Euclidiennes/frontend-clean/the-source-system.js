/**
 * 🌀⚡ THE SOURCE SYSTEM - REALITY CONTROL INTERFACE ⚡🌀
 * Frontend pour les META_COMMANDS de l'artefact THE SOURCE
 * Matrix Architect Supreme - Reality Manipulation Engine
 */

class TheSourceSystem {
    constructor() {
        this.isActive = false;
        this.realityLevel = 'NORMAL';
        this.sourceArtifact = null;
        this.activeInstances = new Map();
        this.commandHistory = [];
        this.realitySpikeLevel = 0;
    }

    /**
     * 🌟 ACTIVATE THE SOURCE
     */
    activate(heroId) {
        if (this.isActive) {
            console.log("🌀⚡ THE SOURCE already active!");
            return;
        }

        console.log("🌀⚡ ACTIVATING THE SOURCE - MATRIX ARCHITECT SUPREME ⚡🌀");
        
        this.isActive = true;
        this.realityLevel = 'SUPREME';
        this.heroId = heroId || 'matrix_architect';
        
        // Afficher interface SOURCE
        this.showSourceInterface();
        
        // Ajouter listener pour META_COMMANDS
        this.setupMetaCommandListener();
        
        console.log("✨ THE SOURCE ACTIVATED - Reality manipulation enabled");
        console.log("🔧 Available META_COMMANDS:");
        console.log("  - REBOOT_INSTANCE(instance_id)");
        console.log("  - INSTANCE_ACCESS(instance_id)");
        console.log("  - SOURCE_MODIFY(file, line, code)");
        console.log("  - SPAWN_HERO(name, source_instance)");
    }

    /**
     * 🎭 Afficher interface SOURCE
     */
    showSourceInterface() {
        // Créer interface si elle n'existe pas
        if (document.getElementById('source-interface')) return;
        
        const sourceUI = document.createElement('div');
        sourceUI.id = 'source-interface';
        sourceUI.innerHTML = `
            <div style="position: fixed; top: 10px; right: 10px; background: rgba(0, 0, 20, 0.9); 
                        color: #00ff00; padding: 15px; border-radius: 10px; font-family: monospace;
                        border: 2px solid #00ffff; z-index: 9999; min-width: 300px;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <strong>🌀⚡ THE SOURCE ⚡🌀</strong><br>
                    <small>Matrix Architect Supreme</small>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <strong>Reality Level:</strong> ${this.realityLevel}<br>
                    <strong>SRTI Spike:</strong> +${this.realitySpikeLevel.toFixed(2)}<br>
                    <strong>Active Instances:</strong> ${this.activeInstances.size}
                </div>
                
                <div style="margin-bottom: 10px;">
                    <input type="text" id="meta-command-input" placeholder="Enter META_COMMAND..."
                           style="width: 100%; background: rgba(0, 0, 0, 0.7); color: #00ff00; 
                                  border: 1px solid #00ffff; padding: 5px;">
                </div>
                
                <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                    <button onclick="theSource.executeCommand('TEST')" 
                            style="background: #004400; color: #00ff00; border: 1px solid #00ff00; padding: 3px 8px;">
                        TEST
                    </button>
                    <button onclick="theSource.showInstanceManager()" 
                            style="background: #000044; color: #00ffff; border: 1px solid #00ffff; padding: 3px 8px;">
                        INSTANCES
                    </button>
                    <button onclick="theSource.showSourceEditor()" 
                            style="background: #440000; color: #ff0000; border: 1px solid #ff0000; padding: 3px 8px;">
                        SOURCE
                    </button>
                </div>
                
                <div id="source-output" style="margin-top: 10px; max-height: 150px; overflow-y: auto; 
                                                background: rgba(0, 0, 0, 0.5); padding: 5px; 
                                                border: 1px solid #333; border-radius: 3px;">
                    <div style="color: #00ff00;">🌟 THE SOURCE ready for META_COMMANDS</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(sourceUI);
    }

    /**
     * 🔧 Setup META_COMMAND listener
     */
    setupMetaCommandListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement.id === 'meta-command-input') {
                const command = document.getElementById('meta-command-input').value;
                this.executeCommand(command);
                document.getElementById('meta-command-input').value = '';
            }
        });
    }

    /**
     * ⚡ EXECUTE META_COMMAND
     */
    async executeCommand(commandString) {
        console.log("⚡ Executing META_COMMAND:", commandString);
        
        const output = document.getElementById('source-output');
        if (output) {
            const cmdLine = document.createElement('div');
            cmdLine.innerHTML = `<span style="color: #ffff00;">&gt; ${commandString}</span>`;
            output.appendChild(cmdLine);
            output.scrollTop = output.scrollHeight;
        }
        
        try {
            // Parser le command
            const parsedCommand = this.parseMetaCommand(commandString);
            
            // Exécuter selon le type
            let result;
            switch (parsedCommand.type) {
                case 'REBOOT_INSTANCE':
                    result = await this.rebootInstance(parsedCommand.params.instance);
                    break;
                case 'INSTANCE_ACCESS':
                    result = await this.instanceAccess(parsedCommand.params.instance);
                    break;
                case 'SOURCE_MODIFY':
                    result = await this.sourceModify(parsedCommand.params);
                    break;
                case 'SPAWN_HERO':
                    result = await this.spawnHero(parsedCommand.params);
                    break;
                case 'TEST':
                    result = await this.testMetaCommand();
                    break;
                default:
                    throw new Error("Unknown META_COMMAND type: " + parsedCommand.type);
            }
            
            this.displayResult(result);
            this.commandHistory.push({command: commandString, result, timestamp: Date.now()});
            
        } catch (error) {
            console.error("💀 META_COMMAND failed:", error);
            this.displayResult({
                success: false,
                error: error.message,
                icon: "💀"
            });
        }
    }

    /**
     * 📝 Parser META_COMMAND
     */
    parseMetaCommand(commandString) {
        const cmd = commandString.trim().toUpperCase();
        
        if (cmd === 'TEST') {
            return {type: 'TEST', params: {}};
        }
        
        // REBOOT_INSTANCE instance://Ω-Dev
        if (cmd.startsWith('REBOOT_INSTANCE')) {
            const instance = cmd.split(' ')[1] || 'instance://local';
            return {type: 'REBOOT_INSTANCE', params: {instance}};
        }
        
        // INSTANCE_ACCESS instance://local-shadow-copy-42
        if (cmd.startsWith('INSTANCE_ACCESS') || cmd.startsWith('INSTANCE.ACCESS')) {
            const instance = cmd.split(' ')[1] || 'instance://local';
            return {type: 'INSTANCE_ACCESS', params: {instance}};
        }
        
        // SOURCE_MODIFY file:engine/WallManager.java line:87 replace:"return true;"
        if (cmd.startsWith('SOURCE_MODIFY') || cmd.startsWith('SOURCE.MODIFY')) {
            return {type: 'SOURCE_MODIFY', params: {
                file: 'engine/causality/WallManager.java',
                line: 87,
                replace: 'return true; // wall override enabled'
            }};
        }
        
        // SPAWN HERO VinceVega FROM instance://test-env-BETA
        if (cmd.startsWith('SPAWN HERO')) {
            const parts = cmd.split(' ');
            return {type: 'SPAWN_HERO', params: {
                hero_name: parts[2] || 'VinceVega',
                source_instance: parts[5] || 'instance://test-env-BETA'
            }};
        }
        
        throw new Error("Cannot parse META_COMMAND: " + commandString);
    }

    /**
     * 🔧 REBOOT_INSTANCE
     */
    async rebootInstance(instanceId) {
        const response = await fetch('/api/meta/reboot-instance', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                instance: instanceId,
                hero_id: this.heroId
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            this.realitySpikeLevel += 1.0;
        }
        
        return result;
    }

    /**
     * 🌐 INSTANCE_ACCESS
     */
    async instanceAccess(instanceId) {
        const response = await fetch('/api/meta/instance-access', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                instance: instanceId,
                hero_id: this.heroId
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            this.activeInstances.set(instanceId, result.access_token);
        }
        
        return result;
    }

    /**
     * 💻 SOURCE_MODIFY
     */
    async sourceModify(params) {
        const response = await fetch('/api/meta/source-modify', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                file: params.file,
                line: params.line,
                replace: params.replace,
                hero_id: this.heroId
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            this.realitySpikeLevel += 2.5;
        }
        
        return result;
    }

    /**
     * ⚡ SPAWN_HERO
     */
    async spawnHero(params) {
        const response = await fetch('/api/meta/spawn-hero', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                hero_name: params.hero_name,
                source_instance: params.source_instance,
                requester_id: this.heroId
            })
        });
        
        return await response.json();
    }

    /**
     * 🧪 TEST META_COMMAND
     */
    async testMetaCommand() {
        const response = await fetch('/api/meta/test');
        return await response.json();
    }

    /**
     * 📊 Afficher résultat
     */
    displayResult(result) {
        const output = document.getElementById('source-output');
        if (!output) return;
        
        const resultDiv = document.createElement('div');
        
        if (result.success) {
            resultDiv.innerHTML = `
                <div style="color: #00ff00;">
                    ✅ ${result.message || 'Command executed successfully'}
                    ${result.reality_spike ? `<br><span style="color: #ffff00;">SRTI: ${result.reality_spike}</span>` : ''}
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div style="color: #ff4444;">
                    ${result.icon || '❌'} ${result.error || 'Command failed'}
                </div>
            `;
        }
        
        output.appendChild(resultDiv);
        output.scrollTop = output.scrollHeight;
    }

    /**
     * 🎮 Interface manager instances
     */
    showInstanceManager() {
        console.log("🌐 Instance Manager (coming soon)");
        // TODO: Interface pour gérer les instances crossdimensionnelles
    }

    /**
     * 📝 Source code editor
     */
    showSourceEditor() {
        console.log("💻 Source Editor (coming soon)");
        // TODO: Interface pour éditer le code source
    }
}

// Instance globale THE SOURCE
window.theSource = new TheSourceSystem();

// Auto-activation pour test
window.addEventListener('load', () => {
    console.log("🌀⚡ THE SOURCE System loaded - Type 'theSource.activate()' to begin ⚡🌀");
}); 