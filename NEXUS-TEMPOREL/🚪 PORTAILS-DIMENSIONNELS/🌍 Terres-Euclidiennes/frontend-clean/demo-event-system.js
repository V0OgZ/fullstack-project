// 🎮 DÉMONSTRATION DU SYSTÈME D'ÉVÉNEMENTS INTELLIGENT
// Script de test pour montrer les capacités du système

class EventSystemDemo {
    constructor() {
        this.demoRunning = false;
        this.demoScripts = [
            // Actions de héros
            { script: 'HERO(Arthur)', priority: 'HERO_ACTION', delay: 1000 },
            { script: 'MOV(Arthur, @10,15)', priority: 'HERO_ACTION', delay: 2000 },
            { script: 'HERO(Morgana)', priority: 'HERO_ACTION', delay: 1500 },
            
            // États quantiques
            { script: 'ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))', priority: 'QUANTUM', delay: 3000 },
            { script: 'ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))', priority: 'QUANTUM', delay: 2500 },
            
            // Utilisation d'artefacts
            { script: 'USE(ITEM, AvantWorldBlade, HERO:Arthur)', priority: 'SPELL_EFFECT', delay: 2000 },
            { script: 'USE(ITEM, HorlogeInversee, HERO:Morgana)', priority: 'SPELL_EFFECT', delay: 1800 },
            
            // Observations et effondrements
            { script: 'Π(Player enters @15,15) ⇒ †ψ001', priority: 'QUANTUM', delay: 2200 },
            { script: '†ψ001', priority: 'CRITICAL', delay: 1000 },
            
            // Batailles
            { script: 'BATTLE(Arthur, Dragon, @20,20)', priority: 'CRITICAL', delay: 3000 },
            
            // Créations diverses
            { script: 'CREATE(BUILDING, Tower, @25,25)', priority: 'IMPORTANT', delay: 1500 },
            { script: 'CREATE(CREATURE, Griffon, @30,30)', priority: 'IMPORTANT', delay: 1200 },
            
            // Effets de sorts variés
            { script: 'SPELL_CAST(Fireball)', priority: 'SPELL_EFFECT', delay: 800 },
            { script: 'SPELL_CAST(Teleportation)', priority: 'SPELL_EFFECT', delay: 900 },
            { script: 'SPELL_CAST(TimeStop)', priority: 'CRITICAL', delay: 1100 }
        ];
        
        this.init();
    }
    
    init() {
        // Attendre que le système d'événements soit prêt
        this.waitForEventSystem().then(() => {
            this.setupDemoControls();
            console.log('🎮 Démonstration du système d\'événements prête');
        });
    }
    
    async waitForEventSystem() {
        return new Promise((resolve) => {
            const checkSystem = () => {
                if (window.intelligentEventLog && window.logEvent) {
                    resolve();
                } else {
                    setTimeout(checkSystem, 500);
                }
            };
            checkSystem();
        });
    }
    
    setupDemoControls() {
        // Ajouter un bouton de démonstration
        const demoButton = document.createElement('button');
        demoButton.id = 'demo-event-system-btn';
        demoButton.className = 'btn-warning';
        demoButton.innerHTML = '🌟 Demo Events';
        demoButton.title = 'Démonstration du système d\'événements intelligent';
        
        // Ajouter le bouton aux contrôles
        const controls = document.querySelector('.controls');
        if (controls) {
            controls.appendChild(demoButton);
            
            demoButton.addEventListener('click', () => {
                if (!this.demoRunning) {
                    this.startDemo();
                } else {
                    this.stopDemo();
                }
            });
        }
        
        // Ajouter des raccourcis clavier
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                if (!this.demoRunning) {
                    this.startDemo();
                } else {
                    this.stopDemo();
                }
            }
        });
    }
    
    async startDemo() {
        if (this.demoRunning) return;
        
        this.demoRunning = true;
        const button = document.getElementById('demo-event-system-btn');
        if (button) {
            button.innerHTML = '⏹️ Stop Demo';
            button.className = 'btn-danger';
        }
        
        // Événement de début de démonstration
        window.logEvent('DEMO_START: Système d\'événements intelligent', 'IMPORTANT', {
            demoType: 'event_system',
            scriptsCount: this.demoScripts.length
        });
        
        // Exécuter les scripts de démonstration
        for (let i = 0; i < this.demoScripts.length && this.demoRunning; i++) {
            const { script, priority, delay } = this.demoScripts[i];
            
            // Logger l'événement
            window.logEvent(script, priority, {
                demoStep: i + 1,
                totalSteps: this.demoScripts.length,
                isDemo: true
            });
            
            // Attendre le délai spécifié
            await this.delay(delay);
        }
        
        if (this.demoRunning) {
            // Événement de fin de démonstration
            window.logEvent('DEMO_END: Démonstration terminée avec succès', 'IMPORTANT', {
                demoType: 'event_system',
                duration: Date.now()
            });
            
            this.stopDemo();
        }
    }
    
    stopDemo() {
        this.demoRunning = false;
        const button = document.getElementById('demo-event-system-btn');
        if (button) {
            button.innerHTML = '🌟 Demo Events';
            button.className = 'btn-warning';
        }
        
        window.logEvent('DEMO_STOPPED: Démonstration arrêtée', 'INFO');
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Démonstration des différents types d'événements
    async demoEventTypes() {
        const eventTypes = [
            { script: 'CRITICAL_ERROR: Système en danger', priority: 'CRITICAL' },
            { script: 'IMPORTANT_ACTION: Nouveau héros créé', priority: 'IMPORTANT' },
            { script: 'SPELL_CAST(Lightning Bolt)', priority: 'SPELL_EFFECT' },
            { script: 'MOV(Hero, @5,5)', priority: 'HERO_ACTION' },
            { script: 'ψ999: État quantique créé', priority: 'QUANTUM' },
            { script: 'Information générale', priority: 'INFO' },
            { script: 'Debug: Test système', priority: 'DEBUG' }
        ];
        
        window.logEvent('TYPE_DEMO_START: Test des types d\'événements', 'IMPORTANT');
        
        for (const event of eventTypes) {
            window.logEvent(event.script, event.priority);
            await this.delay(1500);
        }
        
        window.logEvent('TYPE_DEMO_END: Test des types terminé', 'IMPORTANT');
    }
    
    // Démonstration des événements avec contexte
    async demoContextEvents() {
        const contextEvents = [
            {
                script: 'HERO(Lysandrel)',
                priority: 'HERO_ACTION',
                context: {
                    location: '@12,8',
                    heroClass: 'Mage',
                    level: 5
                }
            },
            {
                script: 'SPELL_CAST(Meteor)',
                priority: 'SPELL_EFFECT',
                context: {
                    location: '@20,20',
                    damage: 150,
                    radius: 3,
                    caster: 'Lysandrel'
                }
            },
            {
                script: 'BATTLE_RESULT(Victory)',
                priority: 'CRITICAL',
                context: {
                    location: '@20,20',
                    winner: 'Lysandrel',
                    loser: 'Dragon',
                    experience: 500
                }
            }
        ];
        
        window.logEvent('CONTEXT_DEMO_START: Test événements avec contexte', 'IMPORTANT');
        
        for (const event of contextEvents) {
            window.logEvent(event.script, event.priority, event.context);
            await this.delay(2000);
        }
        
        window.logEvent('CONTEXT_DEMO_END: Test contexte terminé', 'IMPORTANT');
    }
    
    // Test de charge du système
    async stressTest() {
        window.logEvent('STRESS_TEST_START: Test de charge du système', 'IMPORTANT');
        
        const stressEvents = [];
        for (let i = 0; i < 20; i++) {
            stressEvents.push({
                script: `STRESS_EVENT_${i}: Événement de test ${i}`,
                priority: ['INFO', 'HERO_ACTION', 'SPELL_EFFECT', 'QUANTUM'][i % 4]
            });
        }
        
        // Envoyer tous les événements rapidement
        stressEvents.forEach((event, index) => {
            setTimeout(() => {
                window.logEvent(event.script, event.priority, { stressTest: true, index });
            }, index * 100);
        });
        
        setTimeout(() => {
            window.logEvent('STRESS_TEST_END: Test de charge terminé', 'IMPORTANT');
        }, 2500);
    }
    
    // API publique pour les tests manuels
    testCritical() {
        window.logEvent('TEST_CRITICAL: Événement critique de test', 'CRITICAL');
    }
    
    testQuantum() {
        window.logEvent('ψ999: ⊙(Δt+5 @99,99 ⟶ TEST_QUANTUM)', 'QUANTUM');
    }
    
    testSpell() {
        window.logEvent('SPELL_CAST(Ultimate Test Spell)', 'SPELL_EFFECT', {
            location: '@50,50',
            power: 9999,
            caster: 'Demo System'
        });
    }
    
    // Statistiques de la démonstration
    getStats() {
        return {
            demoRunning: this.demoRunning,
            totalScripts: this.demoScripts.length,
            eventSystemStats: window.intelligentEventLog?.getStats() || null
        };
    }
}

// 🌍 INITIALISATION GLOBALE
window.EventSystemDemo = EventSystemDemo;

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (!window.eventSystemDemo) {
        window.eventSystemDemo = new EventSystemDemo();
    }
});

// 🎯 API SIMPLIFIÉE POUR LA CONSOLE
window.demoEvents = () => {
    if (window.eventSystemDemo) {
        window.eventSystemDemo.startDemo();
    }
};

window.demoEventTypes = () => {
    if (window.eventSystemDemo) {
        window.eventSystemDemo.demoEventTypes();
    }
};

window.demoContextEvents = () => {
    if (window.eventSystemDemo) {
        window.eventSystemDemo.demoContextEvents();
    }
};

window.stressTestEvents = () => {
    if (window.eventSystemDemo) {
        window.eventSystemDemo.stressTest();
    }
};

// 🔧 COMMANDES DE TEST RAPIDES
window.testCritical = () => window.eventSystemDemo?.testCritical();
window.testQuantum = () => window.eventSystemDemo?.testQuantum();
window.testSpell = () => window.eventSystemDemo?.testSpell();

console.log('🎮 Démonstration du système d\'événements chargée');
console.log('💡 Utilisez demoEvents() pour lancer la démonstration');
console.log('💡 Utilisez Ctrl+E pour démarrer/arrêter la démonstration');