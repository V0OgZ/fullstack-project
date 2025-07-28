// 🚨 UI EMERGENCY FIX SYSTEM - JEAN EDITION
// ==========================================
// Correction d'urgence pour tous les problèmes UI persistants

class UIEmergencyFix {
    constructor() {
        this.fixes = [];
        this.isActive = false;
        this.debugMode = false;
        
        console.log('🚨 UI Emergency Fix System initialisé');
    }
    
    // 🎯 DIAGNOSTIC COMPLET UI
    diagnosticUI() {
        console.log('🔍 DIAGNOSTIC UI COMPLET:');
        
        const issues = [];
        
        // 1. Vérifier Arthur et héros positions
        const heroIssues = this.checkHeroPositions();
        if (heroIssues.length > 0) {
            issues.push(...heroIssues);
        }
        
        // 2. Vérifier layout et centrage
        const layoutIssues = this.checkLayoutIssues();
        if (layoutIssues.length > 0) {
            issues.push(...layoutIssues);
        }
        
        // 3. Vérifier canvas et rendu
        const canvasIssues = this.checkCanvasIssues();
        if (canvasIssues.length > 0) {
            issues.push(...canvasIssues);
        }
        
        // 4. Vérifier panneaux et débordements
        const panelIssues = this.checkPanelIssues();
        if (panelIssues.length > 0) {
            issues.push(...panelIssues);
        }
        
        console.log(`🎯 ${issues.length} problèmes détectés:`, issues);
        return issues;
    }
    
    // 👤 VÉRIFIER POSITIONS HÉROS
    checkHeroPositions() {
        const issues = [];
        
        // Vérifier si Arthur existe et est visible
        const arthurElement = document.querySelector('[data-hero="Arthur"]') || 
                             document.querySelector('.hero-arthur') ||
                             document.getElementById('arthur');
        
        if (!arthurElement) {
            issues.push({
                type: 'hero_missing',
                severity: 'critical',
                description: 'Arthur non trouvé dans le DOM',
                fix: 'forceHeroRendering'
            });
        } else {
            const rect = arthurElement.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) {
                issues.push({
                    type: 'hero_invisible',
                    severity: 'high',
                    description: 'Arthur invisible (dimensions nulles)',
                    fix: 'forceHeroVisibility'
                });
            }
            
            // Vérifier position dans viewport
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            
            if (rect.left < 0 || rect.top < 0 || 
                rect.right > viewport.width || rect.bottom > viewport.height) {
                issues.push({
                    type: 'hero_out_of_bounds',
                    severity: 'medium',
                    description: 'Arthur hors du viewport',
                    fix: 'centerHeroInViewport'
                });
            }
        }
        
        return issues;
    }
    
    // 🗺️ VÉRIFIER LAYOUT
    checkLayoutIssues() {
        const issues = [];
        
        // Vérifier canvas principal
        const canvas = document.getElementById('gameCanvas') || 
                      document.querySelector('canvas') ||
                      document.querySelector('.game-canvas');
        
        if (!canvas) {
            issues.push({
                type: 'canvas_missing',
                severity: 'critical',
                description: 'Canvas de jeu non trouvé',
                fix: 'createEmergencyCanvas'
            });
        } else {
            const canvasRect = canvas.getBoundingClientRect();
            const container = canvas.parentElement;
            
            if (container) {
                const containerRect = container.getBoundingClientRect();
                
                // Vérifier si canvas déborde du conteneur
                if (canvasRect.width > containerRect.width || 
                    canvasRect.height > containerRect.height) {
                    issues.push({
                        type: 'canvas_overflow',
                        severity: 'high',
                        description: 'Canvas déborde du conteneur',
                        fix: 'resizeCanvasToFit'
                    });
                }
            }
            
            // Vérifier centrage
            const viewportCenter = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            };
            
            const canvasCenter = {
                x: canvasRect.left + canvasRect.width / 2,
                y: canvasRect.top + canvasRect.height / 2
            };
            
            const distance = Math.sqrt(
                Math.pow(viewportCenter.x - canvasCenter.x, 2) + 
                Math.pow(viewportCenter.y - canvasCenter.y, 2)
            );
            
            if (distance > 100) {
                issues.push({
                    type: 'canvas_not_centered',
                    severity: 'medium',
                    description: 'Canvas mal centré',
                    fix: 'centerCanvas'
                });
            }
        }
        
        return issues;
    }
    
    // 🎨 VÉRIFIER CANVAS
    checkCanvasIssues() {
        const issues = [];
        
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // Vérifier si le canvas est vide
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const isEmpty = imageData.data.every(pixel => pixel === 0);
            
            if (isEmpty) {
                issues.push({
                    type: 'canvas_empty',
                    severity: 'high',
                    description: 'Canvas complètement vide',
                    fix: 'forceCanvasRedraw'
                });
            }
            
            // Vérifier dimensions
            if (canvas.width === 0 || canvas.height === 0) {
                issues.push({
                    type: 'canvas_zero_size',
                    severity: 'critical',
                    description: 'Canvas avec dimensions nulles',
                    fix: 'setCanvasDimensions'
                });
            }
        }
        
        return issues;
    }
    
    // 📋 VÉRIFIER PANNEAUX
    checkPanelIssues() {
        const issues = [];
        
        // Vérifier débordements
        const panels = document.querySelectorAll('.side-panel, .fog-panel, .control-panel');
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            
            if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
                issues.push({
                    type: 'panel_overflow',
                    severity: 'medium',
                    description: `Panneau ${index} déborde`,
                    fix: 'adjustPanelPosition',
                    element: panel
                });
            }
        });
        
        // Vérifier chevauchements
        const allElements = document.querySelectorAll('.side-panel, .fog-panel, .toolbar');
        for (let i = 0; i < allElements.length; i++) {
            for (let j = i + 1; j < allElements.length; j++) {
                if (this.elementsOverlap(allElements[i], allElements[j])) {
                    issues.push({
                        type: 'elements_overlap',
                        severity: 'medium',
                        description: `Éléments ${i} et ${j} se chevauchent`,
                        fix: 'separateOverlappingElements',
                        elements: [allElements[i], allElements[j]]
                    });
                }
            }
        }
        
        return issues;
    }
    
    // 🔧 APPLIQUER TOUS LES CORRECTIFS
    applyAllFixes() {
        console.log('🔧 Application de tous les correctifs d\'urgence...');
        
        const issues = this.diagnosticUI();
        let fixedCount = 0;
        
        issues.forEach(issue => {
            try {
                const success = this.applyFix(issue);
                if (success) {
                    fixedCount++;
                    console.log(`✅ Corrigé: ${issue.description}`);
                } else {
                    console.warn(`⚠️ Échec: ${issue.description}`);
                }
            } catch (error) {
                console.error(`❌ Erreur lors de la correction: ${issue.description}`, error);
            }
        });
        
        console.log(`🎯 ${fixedCount}/${issues.length} problèmes corrigés`);
        
        // Forcer un refresh après corrections
        setTimeout(() => {
            this.forceFullRefresh();
        }, 500);
        
        return fixedCount;
    }
    
    // 🎯 APPLIQUER UN CORRECTIF SPÉCIFIQUE
    applyFix(issue) {
        switch (issue.fix) {
            case 'forceHeroRendering':
                return this.forceHeroRendering();
                
            case 'forceHeroVisibility':
                return this.forceHeroVisibility();
                
            case 'centerHeroInViewport':
                return this.centerHeroInViewport();
                
            case 'createEmergencyCanvas':
                return this.createEmergencyCanvas();
                
            case 'resizeCanvasToFit':
                return this.resizeCanvasToFit();
                
            case 'centerCanvas':
                return this.centerCanvas();
                
            case 'forceCanvasRedraw':
                return this.forceCanvasRedraw();
                
            case 'setCanvasDimensions':
                return this.setCanvasDimensions();
                
            case 'adjustPanelPosition':
                return this.adjustPanelPosition(issue.element);
                
            case 'separateOverlappingElements':
                return this.separateOverlappingElements(issue.elements);
                
            default:
                console.warn(`Correctif inconnu: ${issue.fix}`);
                return false;
        }
    }
    
    // 👤 FORCER RENDU HÉROS
    forceHeroRendering() {
        // Vérifier si gameRenderer existe
        if (window.gameRenderer && window.gameRenderer.gameState) {
            const heroes = window.gameRenderer.gameState.heroes;
            if (heroes && heroes.length > 0) {
                // Forcer un refresh du renderer
                window.gameRenderer.refresh();
                return true;
            }
        }
        
        // Créer un héros d'urgence si aucun n'existe
        if (!window.gameRenderer) {
            window.gameRenderer = { gameState: { heroes: [] } };
        }
        
        if (!window.gameRenderer.gameState.heroes || window.gameRenderer.gameState.heroes.length === 0) {
            window.gameRenderer.gameState.heroes = [{
                id: 'arthur-emergency',
                name: 'Arthur',
                position: { x: 0, y: 0 },
                health: 100,
                maxHealth: 100,
                displayPos: { x: 0, y: 0 }
            }];
        }
        
        return true;
    }
    
    // 👁️ FORCER VISIBILITÉ HÉROS
    forceHeroVisibility() {
        const heroElements = document.querySelectorAll('[data-hero], .hero, .hero-arthur');
        heroElements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.display = 'block';
            element.style.width = 'auto';
            element.style.height = 'auto';
        });
        
        return heroElements.length > 0;
    }
    
    // 🎯 CENTRER HÉROS DANS VIEWPORT
    centerHeroInViewport() {
        if (window.coordinateFix && window.coordinateFix.autoCenterOnFirstHero) {
            window.coordinateFix.autoCenterOnFirstHero();
            return true;
        }
        
        // Fallback manuel
        const heroElement = document.querySelector('[data-hero="Arthur"]');
        if (heroElement) {
            heroElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center', 
                inline: 'center' 
            });
            return true;
        }
        
        return false;
    }
    
    // 🗺️ CRÉER CANVAS D'URGENCE
    createEmergencyCanvas() {
        const existingCanvas = document.querySelector('canvas');
        if (existingCanvas) return false;
        
        const container = document.querySelector('#game-canvas-container') || 
                         document.querySelector('.game-container') ||
                         document.body;
        
        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.border = '2px solid #4a90e2';
        canvas.style.borderRadius = '8px';
        canvas.style.background = '#1a1a2e';
        
        container.appendChild(canvas);
        
        // Dessiner quelque chose pour test
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(10, 10, 100, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText('Heroes of Time', 20, 35);
        
        return true;
    }
    
    // 📏 REDIMENSIONNER CANVAS
    resizeCanvasToFit() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return false;
        
        const container = canvas.parentElement;
        if (!container) return false;
        
        const containerRect = container.getBoundingClientRect();
        const maxWidth = containerRect.width - 40; // Marge
        const maxHeight = containerRect.height - 40;
        
        canvas.style.maxWidth = `${maxWidth}px`;
        canvas.style.maxHeight = `${maxHeight}px`;
        canvas.style.width = 'auto';
        canvas.style.height = 'auto';
        
        return true;
    }
    
    // 🎯 CENTRER CANVAS
    centerCanvas() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return false;
        
        const container = canvas.parentElement;
        if (container) {
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
        }
        
        canvas.style.margin = '0 auto';
        canvas.style.display = 'block';
        
        return true;
    }
    
    // 🎨 FORCER REDRAW CANVAS
    forceCanvasRedraw() {
        if (window.gameRenderer && window.gameRenderer.refresh) {
            window.gameRenderer.refresh();
            return true;
        }
        
        // Fallback: dessiner quelque chose de basique
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // Fond dégradé
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1a1a2e');
            gradient.addColorStop(1, '#16213e');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Grille hexagonale basique
            ctx.strokeStyle = 'rgba(74, 144, 226, 0.3)';
            ctx.lineWidth = 1;
            
            for (let x = 0; x < canvas.width; x += 40) {
                for (let y = 0; y < canvas.height; y += 40) {
                    ctx.beginPath();
                    ctx.arc(x, y, 15, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }
            
            // Arthur au centre
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#000000';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Arthur', centerX, centerY + 35);
            
            return true;
        }
        
        return false;
    }
    
    // 📐 DÉFINIR DIMENSIONS CANVAS
    setCanvasDimensions() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return false;
        
        const container = canvas.parentElement;
        const containerRect = container ? container.getBoundingClientRect() : 
                             { width: window.innerWidth * 0.8, height: window.innerHeight * 0.7 };
        
        canvas.width = Math.max(800, containerRect.width - 40);
        canvas.height = Math.max(600, containerRect.height - 40);
        
        return true;
    }
    
    // 📋 AJUSTER POSITION PANNEAU
    adjustPanelPosition(panel) {
        if (!panel) return false;
        
        const rect = panel.getBoundingClientRect();
        
        // Si déborde à droite
        if (rect.right > window.innerWidth) {
            panel.style.right = '10px';
            panel.style.left = 'auto';
        }
        
        // Si déborde en bas
        if (rect.bottom > window.innerHeight) {
            panel.style.bottom = '10px';
            panel.style.top = 'auto';
        }
        
        return true;
    }
    
    // 🔄 SÉPARER ÉLÉMENTS QUI SE CHEVAUCHENT
    separateOverlappingElements(elements) {
        if (!elements || elements.length < 2) return false;
        
        const [elem1, elem2] = elements;
        const rect1 = elem1.getBoundingClientRect();
        const rect2 = elem2.getBoundingClientRect();
        
        // Déplacer le second élément
        if (rect1.right > rect2.left && rect1.left < rect2.right) {
            // Chevauchement horizontal
            elem2.style.left = `${rect1.right + 10}px`;
        }
        
        if (rect1.bottom > rect2.top && rect1.top < rect2.bottom) {
            // Chevauchement vertical
            elem2.style.top = `${rect1.bottom + 10}px`;
        }
        
        return true;
    }
    
    // 🔍 VÉRIFIER CHEVAUCHEMENT
    elementsOverlap(elem1, elem2) {
        const rect1 = elem1.getBoundingClientRect();
        const rect2 = elem2.getBoundingClientRect();
        
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }
    
    // 🔄 REFRESH COMPLET FORCÉ
    forceFullRefresh() {
        console.log('🔄 Refresh complet forcé...');
        
        // Refresh gameRenderer si disponible
        if (window.gameRenderer && window.gameRenderer.refresh) {
            window.gameRenderer.refresh();
        }
        
        // Refresh coordinate fix
        if (window.coordinateFix && window.coordinateFix.fixGameRenderer) {
            window.coordinateFix.fixGameRenderer();
        }
        
        // Déclencher resize event
        window.dispatchEvent(new Event('resize'));
        
        // Forcer recalcul layout
        document.body.style.display = 'none';
        document.body.offsetHeight; // Force reflow
        document.body.style.display = '';
        
        console.log('✅ Refresh complet terminé');
    }
    
    // 🎮 MODE DEBUG UI
    enableDebugMode() {
        this.debugMode = true;
        
        // Ajouter overlay debug
        const debugOverlay = document.createElement('div');
        debugOverlay.id = 'ui-debug-overlay';
        debugOverlay.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(255, 0, 0, 0.8);
            color: white;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            border-radius: 5px;
            max-width: 300px;
        `;
        
        document.body.appendChild(debugOverlay);
        
        // Mise à jour continue
        const updateDebug = () => {
            const issues = this.diagnosticUI();
            debugOverlay.innerHTML = `
                <strong>🚨 UI DEBUG MODE</strong><br>
                Problèmes détectés: ${issues.length}<br>
                ${issues.map(issue => `• ${issue.description}`).join('<br>')}
                <br><br>
                <button onclick="window.uiEmergencyFix.applyAllFixes()" style="background: #4a90e2; color: white; border: none; padding: 5px; border-radius: 3px;">
                    🔧 Corriger Tout
                </button>
            `;
        };
        
        updateDebug();
        setInterval(updateDebug, 5000);
        
        console.log('🎮 Mode debug UI activé');
    }
    
    // 🧹 NETTOYAGE
    cleanup() {
        const debugOverlay = document.getElementById('ui-debug-overlay');
        if (debugOverlay) {
            debugOverlay.remove();
        }
        
        this.debugMode = false;
        console.log('🧹 UI Emergency Fix nettoyé');
    }
}

// 🌍 EXPORT GLOBAL
window.UIEmergencyFix = UIEmergencyFix;

// 🚨 AUTO-INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window !== 'undefined') {
        window.uiEmergencyFix = new UIEmergencyFix();
        
        console.log('🚨 UI Emergency Fix prêt !');
        console.log('💡 Commandes disponibles:');
        console.log('   window.uiEmergencyFix.diagnosticUI()');
        console.log('   window.uiEmergencyFix.applyAllFixes()');
        console.log('   window.uiEmergencyFix.enableDebugMode()');
        
        // Auto-diagnostic après 3 secondes
        setTimeout(() => {
            const issues = window.uiEmergencyFix.diagnosticUI();
            if (issues.length > 0) {
                console.warn(`🚨 ${issues.length} problèmes UI détectés ! Utilisez applyAllFixes() pour corriger.`);
            }
        }, 3000);
    }
}); 