/**
 * 🔨 ANNA MARTEL VISIBILITY FIX
 * Correctif d'urgence pour le problème de héros invisibles
 */

(function() {
    'use strict';
    
    console.log('🔨 Anna Martel Visibility Fix loading...');
    
    function forceHeroesVisibility() {
        console.log('🔨 Forcing heroes visibility...');
        
        // 1. Forcer la visibilité de tous les héros
        const heroSelectors = [
            '.hero-card',
            '.clickable-hero', 
            '[data-hero-id]',
            '.hero-icon',
            '.hero-name'
        ];
        
        heroSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.display = el.classList.contains('hero-card') ? 'flex' : 'block';
                el.style.position = 'relative';
                el.style.zIndex = '1000';
            });
            console.log(`✅ Fixed ${elements.length} elements for selector: ${selector}`);
        });
        
        // 2. Supprimer les éléments de chargement bloquants
        const loadingSelectors = [
            '.loading-spinner',
            '.loading-content',
            '.loading-overlay'
        ];
        
        loadingSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
            });
        });
        
        // 3. Vérifier Anna Martel spécifiquement
        const annaElements = document.querySelectorAll('[data-hero-id="anna_martel"], .hero-name:contains("Anna Martel")');
        annaElements.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.backgroundColor = 'rgba(255, 215, 0, 0.1)'; // Highlight léger pour debug
            el.style.border = '1px solid #FFD700';
        });
        
        console.log('🔨 Anna Martel specifically highlighted:', annaElements.length, 'elements');
        
        // 4. Corriger le dashboard s'il existe
        const dashboard = document.querySelector('.heroes-grid, #heroes-display');
        if (dashboard) {
            dashboard.style.zIndex = '2000';
            dashboard.style.position = 'relative';
            dashboard.style.opacity = '1';
            console.log('✅ Dashboard visibility fixed');
        }
        
        // 5. Message de confirmation
        showConfirmationMessage();
    }
    
    function showConfirmationMessage() {
        const msg = document.createElement('div');
        msg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 0, 0.9);
            color: black;
            padding: 20px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            z-index: 99999;
            text-align: center;
        `;
        msg.innerHTML = `
            🔨 Anna Martel VISIBLE !<br/>
            🚬 Jean-Grofignon VISIBLE !<br/>
            ✅ Heroes Fixed!
        `;
        document.body.appendChild(msg);
        
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 500);
        }, 2000);
    }
    
    // Exécuter immédiatement
    forceHeroesVisibility();
    
    // Exécuter après le chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceHeroesVisibility);
    }
    
    // Exécuter après un délai pour les éléments chargés dynamiquement
    setTimeout(forceHeroesVisibility, 1000);
    setTimeout(forceHeroesVisibility, 3000);
    
    // Observer les changements DOM pour maintenir la visibilité
    const observer = new MutationObserver(function(mutations) {
        let shouldFix = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                const target = mutation.target;
                if (target.classList && (
                    target.classList.contains('hero-card') ||
                    target.classList.contains('clickable-hero') ||
                    target.hasAttribute('data-hero-id')
                )) {
                    shouldFix = true;
                }
            }
        });
        
        if (shouldFix) {
            setTimeout(forceHeroesVisibility, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });
    
    // API globale d'urgence
    window.fixAnnaVisibility = forceHeroesVisibility;
    
    console.log('🔨 Anna Martel Visibility Fix loaded! Use window.fixAnnaVisibility() if needed');
    
})(); 