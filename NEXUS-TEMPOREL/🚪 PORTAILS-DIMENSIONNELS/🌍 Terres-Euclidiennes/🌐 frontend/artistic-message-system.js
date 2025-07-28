/**
 * 🎨 FORD'S STYLUS OF REALITY - ARTISTIC MESSAGE SYSTEM ✨
 * Un pinceau magique qui peint les messages directement dans la réalité du jeu
 * Inspiré par Anthor le Fordien et son pouvoir de réécrire l'existence
 */

class ArtisticMessageSystem {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.floatingQuotes = [];
        this.consoleMessages = [];
        this.stylusEffects = [];
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        console.log("🎨 Ford's Stylus of Reality - Système Artistique Initialisé ✨");
        this.initialized = true;
        
        // Démarrer l'animation loop
        this.animationLoop();
    }

    /**
     * 🌟 PINCEAU MAGIQUE - Peint une quote flottante au-dessus d'un héros
     */
    paintFloatingQuote(heroX, heroY, heroName, quote, style = 'magical') {
        const floatingQuote = {
            id: Date.now() + Math.random(),
            x: heroX,
            y: heroY - 60, // Au-dessus du héros
            targetY: heroY - 80,
            quote: quote,
            heroName: heroName,
            style: style,
            opacity: 0,
            scale: 0.8,
            life: 0,
            maxLife: 5000, // 5 secondes
            phase: 'appearing', // appearing, stable, fading
            sparkles: [],
            painted: false
        };

        // Générer des particules magiques pour l'effet stylus
        this.generateStylusEffect(heroX, heroY - 40, quote);
        
        this.floatingQuotes.push(floatingQuote);
        console.log(`🎭 Quote peinte pour ${heroName}: "${quote}"`);
    }

    /**
     * ✨ CONSOLE MAGIQUE - Messages système qui s'estompent
     */
    paintConsoleMessage(message, type = 'system', translation = null) {
        const consoleMsg = {
            id: Date.now() + Math.random(),
            message: message,
            translation: translation,
            type: type,
            opacity: 1,
            y: this.canvas.height - 100,
            targetY: this.canvas.height - 120,
            life: 0,
            maxLife: 4000, // 4 secondes
            phase: 'sliding',
            painted: false
        };

        // Décaler les anciens messages vers le haut
        this.consoleMessages.forEach(msg => {
            msg.targetY -= 25;
        });

        this.consoleMessages.push(consoleMsg);
        console.log(`📜 Message console peint: "${message}"`);
    }

    /**
     * 🎨 EFFET STYLUS - Simulation du pinceau qui peint dans la réalité
     */
    generateStylusEffect(x, y, text) {
        const effect = {
            id: Date.now() + Math.random(),
            startX: x - 100,
            startY: y + 20,
            endX: x + text.length * 8,
            endY: y,
            progress: 0,
            particles: [],
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            life: 0,
            maxLife: 2000
        };

        // Particules de "peinture magique"
        for (let i = 0; i < 20; i++) {
            effect.particles.push({
                x: x + (Math.random() - 0.5) * 40,
                y: y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random() * 1000,
                color: effect.color,
                size: Math.random() * 3 + 1
            });
        }

        this.stylusEffects.push(effect);
    }

    /**
     * 🎭 ANIMATION LOOP - Le cœur battant du système artistique
     */
    animationLoop() {
        this.updateFloatingQuotes();
        this.updateConsoleMessages();
        this.updateStylusEffects();
        this.render();
        
        requestAnimationFrame(() => this.animationLoop());
    }

    updateFloatingQuotes() {
        this.floatingQuotes = this.floatingQuotes.filter(quote => {
            quote.life += 16; // ~60fps
            
            // Phases d'animation
            if (quote.phase === 'appearing' && quote.life < 500) {
                quote.opacity = quote.life / 500;
                quote.scale = 0.8 + (quote.life / 500) * 0.2;
                quote.y = quote.y + (quote.targetY - quote.y) * 0.1;
            } else if (quote.phase === 'appearing') {
                quote.phase = 'stable';
            } else if (quote.phase === 'stable' && quote.life > quote.maxLife * 0.7) {
                quote.phase = 'fading';
            } else if (quote.phase === 'fading') {
                quote.opacity = Math.max(0, 1 - (quote.life - quote.maxLife * 0.7) / (quote.maxLife * 0.3));
            }

            // Effet de flottement
            quote.y += Math.sin(quote.life * 0.003) * 0.5;
            
            return quote.life < quote.maxLife;
        });
    }

    updateConsoleMessages() {
        this.consoleMessages = this.consoleMessages.filter(msg => {
            msg.life += 16;
            
            // Animation d'entrée
            if (msg.phase === 'sliding' && msg.life < 300) {
                msg.y = msg.y + (msg.targetY - msg.y) * 0.15;
            } else if (msg.phase === 'sliding') {
                msg.phase = 'stable';
            }
            
            // Fade out
            if (msg.life > msg.maxLife * 0.8) {
                msg.opacity = Math.max(0, 1 - (msg.life - msg.maxLife * 0.8) / (msg.maxLife * 0.2));
            }
            
            return msg.life < msg.maxLife;
        });
    }

    updateStylusEffects() {
        this.stylusEffects = this.stylusEffects.filter(effect => {
            effect.life += 16;
            effect.progress = Math.min(1, effect.life / effect.maxLife);
            
            // Update particles
            effect.particles = effect.particles.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 16;
                return p.life > 0;
            });
            
            return effect.life < effect.maxLife;
        });
    }

    /**
     * 🎨 RENDU ARTISTIQUE - Peindre tous les éléments magiques
     */
    render() {
        // Rendu des effets stylus (en arrière-plan)
        this.renderStylusEffects();
        
        // Rendu des quotes flottantes
        this.renderFloatingQuotes();
        
        // Rendu de la console
        this.renderConsoleMessages();
    }

    renderStylusEffects() {
        this.stylusEffects.forEach(effect => {
            this.ctx.save();
            
            // Trait du stylus
            this.ctx.strokeStyle = effect.color;
            this.ctx.lineWidth = 3;
            this.ctx.globalAlpha = 0.7;
            
            const currentX = effect.startX + (effect.endX - effect.startX) * effect.progress;
            const currentY = effect.startY + (effect.endY - effect.startY) * effect.progress;
            
            this.ctx.beginPath();
            this.ctx.moveTo(effect.startX, effect.startY);
            this.ctx.lineTo(currentX, currentY);
            this.ctx.stroke();
            
            // Particules magiques
            effect.particles.forEach(p => {
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.life / 1000;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            });
            
            this.ctx.restore();
        });
    }

    renderFloatingQuotes() {
        this.floatingQuotes.forEach(quote => {
            this.ctx.save();
            this.ctx.globalAlpha = quote.opacity;
            
            // Fond de la bulle de dialogue
            const padding = 15;
            const textWidth = this.ctx.measureText(quote.quote).width;
            const bubbleWidth = textWidth + padding * 2;
            const bubbleHeight = 40;
            
            // Bulle avec effet magique
            this.ctx.fillStyle = 'rgba(20, 25, 40, 0.9)';
            this.ctx.strokeStyle = `hsl(${(Date.now() * 0.1) % 360}, 70%, 60%)`;
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            this.ctx.roundRect(
                quote.x - bubbleWidth/2, 
                quote.y - bubbleHeight/2, 
                bubbleWidth, 
                bubbleHeight, 
                10
            );
            this.ctx.fill();
            this.ctx.stroke();
            
            // Queue de la bulle
            this.ctx.beginPath();
            this.ctx.moveTo(quote.x - 5, quote.y + bubbleHeight/2);
            this.ctx.lineTo(quote.x, quote.y + bubbleHeight/2 + 10);
            this.ctx.lineTo(quote.x + 5, quote.y + bubbleHeight/2);
            this.ctx.fill();
            
            // Texte de la quote
            this.ctx.fillStyle = '#FFD700';
            this.ctx.font = '14px "Courier New", monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(quote.quote, quote.x, quote.y + 5);
            
            // Nom du héros (petit texte)
            this.ctx.fillStyle = '#AAA';
            this.ctx.font = '10px Arial';
            this.ctx.fillText(`- ${quote.heroName}`, quote.x, quote.y - 15);
            
            this.ctx.restore();
        });
    }

    renderConsoleMessages() {
        this.consoleMessages.forEach((msg, index) => {
            this.ctx.save();
            this.ctx.globalAlpha = msg.opacity;
            
            // Background de la console
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(10, msg.y - 10, this.canvas.width - 20, 25);
            
            // Bordure stylée
            this.ctx.strokeStyle = '#00FF88';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(10, msg.y - 10, this.canvas.width - 20, 25);
            
            // Texte du message
            this.ctx.fillStyle = this.getMessageColor(msg.type);
            this.ctx.font = '12px "Courier New", monospace';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`[${msg.type.toUpperCase()}] ${msg.message}`, 20, msg.y + 5);
            
            // Traduction si disponible
            if (msg.translation) {
                this.ctx.fillStyle = '#AAA';
                this.ctx.font = '10px Arial';
                this.ctx.fillText(`→ ${msg.translation}`, 20, msg.y + 18);
            }
            
            this.ctx.restore();
        });
    }

    getMessageColor(type) {
        const colors = {
            'system': '#00FF88',
            'quote': '#FFD700',
            'action': '#FF6B6B',
            'temporal': '#8A2BE2',
            'error': '#FF4444'
        };
        return colors[type] || '#FFFFFF';
    }

    /**
     * 🎭 API PUBLIQUE - Méthodes pour utiliser le système
     */
    
    // Pour les quotes de héros
    showHeroQuote(heroX, heroY, heroName, quote) {
        this.paintFloatingQuote(heroX, heroY, heroName, quote, 'hero');
    }
    
    // Pour les messages système
    showSystemMessage(message, translation = null) {
        this.paintConsoleMessage(message, 'system', translation);
    }
    
    // Pour les actions temporelles
    showTemporalEvent(message, translation = null) {
        this.paintConsoleMessage(message, 'temporal', translation);
    }
    
    // Pour les erreurs
    showError(message) {
        this.paintConsoleMessage(message, 'error');
    }
    
    // Clean up
    clear() {
        this.floatingQuotes = [];
        this.consoleMessages = [];
        this.stylusEffects = [];
    }
}

// Export pour utilisation
window.ArtisticMessageSystem = ArtisticMessageSystem; 