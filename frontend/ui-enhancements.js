// Heroes of Time - UI Enhancements
// Enhanced interface functionalities for the temporal engine

    updateArtifactsList() {
        const artifacts = [
            { name: "Lame d'Avant-Monde", rarity: "Paradox", icon: "⚔️" },
            { name: "Horloge Inversée", rarity: "Legendary", icon: "🕰️" },
            { name: "Balise d'Ignorance", rarity: "Legendary", icon: "🚫" },
            { name: "Tour de l'Ancrage", rarity: "Legendary", icon: "🏰" }
        ];
        
        const container = document.getElementById('artifacts-list');
        container.innerHTML = artifacts.map(artifact => `
            <div class="artifact-item ${artifact.rarity.toLowerCase()}">
                <span class="artifact-icon">${artifact.icon}</span>
                <span class="artifact-name">${artifact.name}</span>
                <span class="artifact-rarity">${artifact.rarity}</span>
            </div>
        `).join('');
    }

    // Enhanced game state update with artifacts
    async refreshGameState() {
        if (!this.gameAPI.gameId) return;
        
        try {
            const state = await this.gameAPI.getGameState();
            
            // Update game info
            document.getElementById('game-id').textContent = this.gameAPI.gameId;
            document.getElementById('turn-count').textContent = state.currentTurn || '0';
            document.getElementById('timeline-branch').textContent = state.currentTimeline || 'ℬ1';
            document.getElementById('player-count').textContent = state.players ? state.players.length : '0';
            
            // Update heroes
            this.updateHeroesList(state.heroes || []);
            
            // Update psi states
            this.updatePsiStatesList(state.psiStates || []);
            
            // Update artifacts if available
            if (state.artifacts) {
                this.updateArtifactsFromGameState(state.artifacts);
            } else {
                this.updateArtifactsList(); // Show default artifacts
            }
            
            // Update game renderer with enhanced state
            if (this.gameRenderer) {
                this.gameRenderer.updateState(state);
            }
            
            // Update status
            document.getElementById('status-message').textContent = 
                `Game Active - Turn ${state.currentTurn || 0} - ${(state.heroes || []).length} Heroes - ${(state.psiStates || []).length} ψ-states`;
                
        } catch (error) {
            console.error('Failed to refresh game state:', error);
        }
    }

    updateArtifactsFromGameState(artifacts) {
        const container = document.getElementById('artifacts-list');
        
        if (artifacts.length === 0) {
            container.innerHTML = '<div class="empty-message">No artifacts discovered yet</div>';
            return;
        }
        
        container.innerHTML = artifacts.map(artifact => {
            const rarityClass = artifact.rarity ? artifact.rarity.toLowerCase() : 'common';
            const icon = this.getArtifactIcon(artifact.type || artifact.id);
            
            return `
                <div class="artifact-item ${rarityClass}" title="${artifact.description || 'Temporal artifact'}">
                    <span class="artifact-icon">${icon}</span>
                    <div class="artifact-details">
                        <span class="artifact-name">${artifact.name}</span>
                        <span class="artifact-rarity">${artifact.rarity || 'Common'}</span>
                        ${artifact.owner ? `<span class="artifact-owner">Owned by: ${artifact.owner}</span>` : ''}
                    </div>
                    ${artifact.uses ? `<div class="artifact-uses">Uses: ${artifact.uses.current}/${artifact.uses.max}</div>` : ''}
                </div>
            `;
        }).join('');
    }

    getArtifactIcon(type) {
        const icons = {
            'AvantWorldBlade': '⚔️',
            'ReverseClock': '🕰️',
            'IgnoreBeacon': '🚫',
            'AnchorTower': '🏰',
            'ApocalypseHorn': '📯',
            'TemporalShard': '💎',
            'TimeEcho': '🔮',
            'NexusCrystal': '🌀',
            'default': '🏺'
        };
        return icons[type] || icons.default;
    }

    // Enhanced demo with artifact usage
    async runDemo() {
        try {
            this.scriptConsole.addToOutput('✨ Running enhanced temporal demo...', 'info');
            
            // Create demo game
            await this.gameAPI.createGame('Demo Game');
            this.currentGameId = this.gameAPI.gameId;
            
            // Execute demo scripts with artifacts
            const demoScripts = [
                'HERO(Arthur)',
                'HERO(Morgana)',
                'MOV(Arthur, @10,10)',
                'MOV(Morgana, @15,15)',
                'CREATE(ITEM, AvantWorldBlade, @12,10)',
                'CREATE(ITEM, ReverseClock, @15,12)',
                'USE(ITEM, AvantWorldBlade, HERO:Arthur)',
                'ψ001: ⊙(Δt+2 @12,12 ⟶ CREATE(CREATURE, Dragon, @12,12))',
                'ψ002: ⊙(Δt+3 @13,13 ⟶ MOV(HERO, Arthur, @13,13))',
                'ψ003: ⊙(Δt+4 @14,14 ⟶ BATTLE(HERO Arthur, CREATURE Dragon))',
                'Π(Morgana enters @12,12) ⇒ †ψ001',
                'USE(ITEM, ReverseClock, HERO:Morgana)',
                '†ψ001'
            ];
            
            for (const script of demoScripts) {
                await this.executeScriptLine(script);
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Add timeline events for important actions
                if (script.includes('USE(ITEM')) {
                    this.addTimelineEvent('Artifact used: ' + script);
                } else if (script.includes('ψ')) {
                    this.addTimelineEvent('Quantum state created: ' + script.split(':')[0]);
                } else if (script.includes('†')) {
                    this.addTimelineEvent('Quantum collapse: ' + script);
                }
            }
            
            this.scriptConsole.addToOutput('✅ Enhanced demo completed!', 'success');
            this.addEventLog('Demo scenario with artifacts loaded', 'success');
            
        } catch (error) {
            this.scriptConsole.addToOutput(`❌ Demo failed: ${error.message}`, 'error');
        }
    }

    // New method: Quick actions panel
    createQuickActionsPanel() {
        const quickActions = [
            { name: 'Create Hero', script: 'HERO(NewHero)', icon: '🦸' },
            { name: 'Create Dragon', script: 'CREATE(CREATURE, Dragon, @10,10)', icon: '🐉' },
            { name: 'Superposition', script: 'ψ###: ⊙(Δt+2 @x,y ⟶ action)', icon: '🌀' },
            { name: 'Collapse All', script: '†*', icon: '💥' },
            { name: 'Time Jump', script: 'USE(ITEM, ReverseClock, HERO:hero)', icon: '⏪' },
            { name: 'Anchor Zone', script: 'USE(ITEM, AnchorTower, @x,y)', icon: '⚓' }
        ];
        
        const panel = document.createElement('div');
        panel.className = 'quick-actions-panel';
        panel.innerHTML = `
            <h4>⚡ Quick Actions</h4>
            <div class="quick-actions-grid">
                ${quickActions.map(action => `
                    <button class="quick-action-btn" data-script="${action.script}" title="${action.name}">
                        <span class="action-icon">${action.icon}</span>
                        <span class="action-name">${action.name}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add to left panel
        const leftPanel = document.querySelector('.left-panel');
        if (leftPanel) {
            leftPanel.appendChild(panel);
            
            // Add click handlers
            panel.querySelectorAll('.quick-action-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const script = btn.getAttribute('data-script');
                    document.getElementById('console-input').value = script;
                    this.scriptConsole.addToOutput('Quick action: ' + script, 'info');
                });
            });
        }
    }

    // Enhanced visualization controls
    setupVisualizationControls() {
        // Connect board control buttons to game renderer
        document.getElementById('zoom-in').addEventListener('click', () => {
            if (this.gameRenderer) {
                this.gameRenderer.zoom = Math.min(3, this.gameRenderer.zoom * 1.2);
                this.gameRenderer.refresh();
                this.addEventLog('Zoomed in', 'info');
            }
        });
        
        document.getElementById('zoom-out').addEventListener('click', () => {
            if (this.gameRenderer) {
                this.gameRenderer.zoom = Math.max(0.5, this.gameRenderer.zoom * 0.8);
                this.gameRenderer.refresh();
                this.addEventLog('Zoomed out', 'info');
            }
        });
        
        document.getElementById('reset-view').addEventListener('click', () => {
            if (this.gameRenderer) {
                this.gameRenderer.resetView();
                this.addEventLog('View reset', 'info');
            }
        });
    }

    // Timeline visualization enhancements
    updateTimelineEvents(events) {
        const container = document.getElementById('timeline-events');
        container.innerHTML = '';
        
        events.forEach((event, index) => {
            const eventEl = document.createElement('div');
            eventEl.className = 'timeline-event fade-in';
            
            const time = new Date(event.timestamp || Date.now()).toLocaleTimeString();
            const icon = this.getEventIcon(event.type);
            
            eventEl.innerHTML = `
                <div class="timeline-marker ${event.type}"></div>
                <div class="timeline-content">
                    <div class="timeline-time">
                        Turn ${event.turn || document.getElementById('turn-count').textContent} - ${time}
                    </div>
                    <div class="timeline-description">
                        <span class="event-icon">${icon}</span>
                        ${event.description}
                    </div>
                    ${event.branch ? `<div class="timeline-branch">Branch: ${event.branch}</div>` : ''}
                </div>
            `;
            
            container.appendChild(eventEl);
        });
    }

    getEventIcon(type) {
        const icons = {
            'psi_create': '🌀',
            'psi_collapse': '💥',
            'artifact_use': '✨',
            'hero_action': '⚔️',
            'timeline_fork': '🔀',
            'conflict': '⚡',
            'default': '📍'
        };
        return icons[type] || icons.default;
    }
}