import React, { useState, useEffect } from 'react';
import './DashboardMigration.css';
import FordTimelinePanel from './FordTimelinePanel';

interface ServiceStatus {
  name: string;
  url: string;
  status: 'active' | 'inactive';
}

const DashboardMigration: React.FC = () => {
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([
    { name: 'Backend', url: 'http://localhost:8080', status: 'inactive' },
    { name: 'Frontend 8000', url: 'http://localhost:8000', status: 'inactive' },
    { name: 'Panopticon 8001', url: 'http://localhost:8001', status: 'active' },
    { name: 'Temporal 5174', url: 'http://localhost:5174', status: 'inactive' },
    { name: 'Collection 5175', url: 'http://localhost:5175', status: 'inactive' },
    { name: 'Test Runner 8888', url: 'http://localhost:8888', status: 'inactive' },
    { name: 'Dicebear 8004', url: 'http://localhost:8004', status: 'inactive' }
  ]);

  const [selectedHero, setSelectedHero] = useState('jean-grofignon');

  const heroes = [
    { id: 'jean-grofignon', name: 'Jean-Grofignon', icon: '🛋️', faction: 'Canapé Cosmique', power: 'Collapse Override' },
    { id: 'arthur-pendragon', name: 'Arthur Pendragon', icon: '⚔️', faction: 'Royaume de Camelot', power: 'Excalibur Fusion' },
    { id: 'vince-vega', name: 'Vince Vega', icon: '🔫', faction: 'Pulp Fiction', power: 'Temporal Bullets' },
    { id: 'grut-ontologique', name: 'GRUT Ontologique', icon: '🏛️', faction: 'Vision Omnisciente', power: 'Reality Graph' },
    { id: 'claudius-memento', name: 'Claudius Memento', icon: '🧠', faction: 'Archiviste Éternel', power: 'Museum Archive Master' }
  ];

  const panels = [
    {
      id: 'frontend-principal',
      icon: '🎮',
      title: 'Frontend Principal',
      description: 'Interface de jeu principale avec console temporelle et carte hexagonale',
      url: 'http://localhost:8000',
      features: [
        'Console temporelle HOTS',
        'Carte hexagonale interactive', 
        'Création et gestion des héros',
        'Scripts quantiques ψ, †, ⊙'
      ],
      buttonText: '🚀 Lancer Interface',
      type: 'normal'
    },
    {
      id: 'visual-editor',
      icon: '🎨',
      title: 'Éditeur Visuel Script',
      description: 'Premier IDE visuel de scripting quantico-temporel au monde - Révolution du game design',
      url: 'http://localhost:8000/visual-script-editor.html',
      features: [
        '🚶 Actions point-and-click (MOV, USE, CREATE)',
        'ψ Actions temporelles (PSI, TRIGGER, COLLAPSE)',
        '⏰ Timeline Editor avec branches multiples',
        '🎮 Game Board interactif avec héros et ψ-states',
        '🔧 Système de macros personnalisées',
        '📜 Génération automatique de scripts HOTS'
      ],
      buttonText: '🎨 Éditeur Révolutionnaire',
      type: 'special',
      borderColor: '#4eccc6'
    },
    {
      id: 'frontend-temporal',
      icon: '⚡',
      title: 'Frontend Temporal',
      description: 'Interface révolutionnaire avec système UTMD et visualisation temporelle avancée',
      url: 'http://localhost:5174',
      features: [
        'Renderer hexagonal temporel',
        'Système UTMD (temps par mouvement)',
        'Visualisation collapse causale',
        'Animations temporelles'
      ],
      buttonText: '⚡ Interface Révolutionnaire',
      type: 'normal'
    },
    {
      id: 'quantum-visualizer',
      icon: '🔬',
      title: 'Quantum Visualizer',
      description: 'Sélecteur de scénarios, replay et visualisation des graphes causaux',
      url: 'http://localhost:8001/quantum-visualizer/',
      features: [
        'Sélecteur de scénarios GROFI',
        'Système de replay',
        'Graphes causaux D3.js',
        'Navigation entre timelines'
      ],
      buttonText: '🔬 Scénarios & Replay',
      type: 'normal'
    },
    {
      id: 'collection-grammar',
      icon: '🏛️',
      title: 'Collection & Grammar',
      description: 'Interface unifiée : Collection du jeu avec avatars Dicebear, Scénarios HOTS et Grammar Translator',
      url: 'http://localhost:5175/hots',
      features: [
        'Collection complète avec Dicebear',
        'Héros, créatures et artefacts visuels',
        'Scénarios HOTS intégrés',
        'Grammar Translator avancé',
        'Interface par onglets moderne'
      ],
      buttonText: '🏛️ Collection & Grammar',
      type: 'normal'
    },
    {
      id: 'test-runner',
      icon: '🧪',
      title: 'Test Runner',
      description: 'Interface de tests automatisés et monitoring des performances',
      url: 'http://localhost:8888',
      features: [
        'Tests automatisés complets',
        'Monitoring performances',
        'Tests GROFI intégrés',
        'Rapports détaillés'
      ],
      buttonText: '🧪 Tests Automatiques',
      type: 'normal'
    },
    {
      id: 'ethereal-mode',
      icon: '🌟',
      title: 'Mode Éthéré',
      description: 'Accès aux interfaces cachées et expérimentales récupérées\n🎁 Inclut maintenant la Forge Runique 1111 - Cadeau de Jean!',
      url: 'Interfaces Multiples',
      features: [
        '🃏 Heroes Cards Visualizer (16 cartes)',
        '⚡ Epoch Visualizer (Timeline)',
        '🎯 Panopticon 3D (Vision totale)',
        '🔮 Quantum Runic Forge',
        '⚡ Forge Runique 1111 - Cadeau de Jean 🎁'
      ],
      buttonText: '🌟 Mode Éthéré',
      type: 'ethereal',
      borderColor: '#9d4edd'
    },
    {
      id: 'ford-timeline-mastery',
      icon: '🎭',
      title: 'Ford Timeline Mastery',
      description: 'Les 8 Timelines de Ford - Maîtrisez les formules quantiques pour débloquer les sorts cosmiques',
      url: 'FORD_TIMELINE_PANEL',
      features: [
        '8 Timelines avec formules quantiques',
        'Combat system avec paradoxRisk/temporalStability',
        'Algo Walter pour analyse de survie',
        '10 Sorts Cosmiques à débloquer',
        'Vraie logique Ford implémentée'
      ],
      buttonText: '🎭 Entrer dans le Parc',
      type: 'ford',
      borderColor: '#e74c3c'
    },
    {
      id: 'memento',
      icon: '🧠',
      title: 'MEMENTO',
      description: 'La Mémoire Vivante - Histoire et Documentation Heroes of Time',
      url: 'MEMENTO/HISTOIRE_HEROES_OF_TIME.html',
      features: [
        'Histoire complète du projet',
        'Documentation générée automatiquement',
        'Tatouages de mémoire permanents',
        'Archives temporelles'
      ],
      buttonText: '🧠 Accéder à MEMENTO',
      type: 'normal'
    },
    {
      id: 'replay-scenarios',
      icon: '🎬',
      title: 'Replay & Scénarios',
      description: 'Sélecteur de scénarios HOTS et lecteur de replays épiques',
      url: 'Intégré dans le Dashboard',
      features: [
        '26 scénarios HOTS disponibles',
        'Lecteur de replay HSP',
        'Contrôles de lecture',
        'Session Jean vs Claudius'
      ],
      buttonText: '🎬 Centre de Replay',
      type: 'special',
      borderColor: '#ffa500'
    },
    {
      id: 'epoch-system',
      icon: '🕰️',
      title: 'EPOCH SYSTEM',
      description: 'Timeline Officielle Heroes of Time - Pour Jean depuis son canapé',
      url: 'epoch-visualizer.html',
      features: [
        'Époque HOT : 1er juillet 2025',
        'Timeline ℬ∞ (Jean\'s Vision)',
        'Jour 21 - Memory Rewrite Protocol',
        'Phase EPIC_VISUALIZATION'
      ],
      buttonText: '🕰️ Timeline Officielle',
      type: 'normal'
    },
    {
      id: 'admin-multiplayer',
      icon: '🎮',
      title: 'Admin Multijoueur',
      description: 'Mode Administrateur - Jean sur le canapé - Gestion des parties multijoueur',
      url: 'Interface Admin Intégrée',
      features: [
        '🎮 Interface Admin complète',
        '🚀 Démarrage rapide multijoueur',
        '🧪 Tests complets automatisés',
        '📊 Monitoring des parties actives',
        '👥 Gestion des joueurs',
        '⚙️ Configuration avancée'
      ],
      buttonText: '🎮 Interface Admin',
      type: 'admin',
      borderColor: '#ff6b6b',
      isWide: true
    },
    {
      id: 'joint-oublie',
      icon: '🚬',
      title: 'Le Joint Oublié',
      description: 'Artefact légendaire de Jean-Grofignon - Accès Panopticon halluciné',
      url: 'Interface Hallucinée',
      features: [
        '🚬 Utiliser le Joint Magique',
        '🔮 Panopticon 3D Vision',
        '🧪 Tests d\'accès spéciaux',
        '🎭 Galerie Dicebear',
        '✨ Effets hallucinés',
        '🌟 Mode lecture seule'
      ],
      buttonText: '🚬 Utiliser le Joint',
      type: 'special',
      borderColor: '#4ecdc4'
    },
    {
      id: 'dicebear-demo',
      icon: '🎨',
      title: 'Démo Dicebear Heroes of Time',
      description: 'Démonstration complète du système Dicebear pour tous les éléments du jeu',
      url: 'http://localhost:8004/dicebear-map-demo.html',
      features: [
        '🗺️ Map 10x10 avec tous éléments',
        '🏰 Bâtiments (glass, identicon, rings)',
        '🦸 Héros (adventurer, lorelei)',
        '🐉 Créatures (bottts, croodles)',
        '🗡️ Artefacts avec effets spéciaux',
        '✨ Animations et rarités'
      ],
      buttonText: '🎨 Ouvrir Démo Dicebear',
      type: 'special',
      borderColor: '#FFD700'
    },
    {
      id: 'sphinx-quantique',
      icon: '🦁',
      title: 'Sphinx Quantique - Démo Interactive',
      description: 'Générateur aléatoire de questions quantiques + Interface joueur complète',
      url: 'frontend/sphinx-interface-demo.html',
      features: [
        '🎲 Génération procédurale (~10,000 questions)',
        '🧪 Validation physique automatique',
        '⚗️ Interface HOTS interactive',
        '🏆 Système de récompenses adaptatif',
        '🌟 Événements spéciaux aléatoires',
        '📊 Workflow joueur complet'
      ],
      buttonText: '🦁 Interface Sphinx',
      type: 'special',
      borderColor: '#FF6B6B'
    },
    {
      id: 'console-hots-simple',
      icon: '⌨️',
      title: 'Console HOTS Simple',
      description: 'Interface ultra-basique avec console intégrée - Un clic et c\'est parti !',
      url: 'file://frontend/hots-console-simple.html',
      features: [
        '⚡ Boutons rapides (Énergie, Téléport, Combat)',
        '🔧 Status backend temps réel',
        '📝 Console interactive pour commandes HOTS',
        '🔗 Lien sauvegardable en favoris',
        '🌐 Connexion API localhost:8080'
      ],
      buttonText: '⌨️ Console Simple',
      type: 'special',
      borderColor: '#00ff88'
    },
    {
      id: 'true-heroes-interface',
      icon: '🎯',
      title: 'TrueHeroesInterface (Port 3000)',
      description: 'Interface React sophistiquée avec Canvas 60 FPS, système ZFC complet et i18n',
      url: 'http://localhost:3000',
      features: [
        '🎨 Canvas rendering 60 FPS',
        '🌐 Système i18n multilingue',
        '⚡ ZFC (Zermelo-Fraenkel-Choice) complet',
        '🎮 Interface moderne React 19',
        '🔄 State management Zustand',
        '📱 Design responsive avancé'
      ],
      buttonText: '🎯 Interface Sophistiquée',
      type: 'special',
      borderColor: '#45b7d1'
    }
  ];

  const checkServiceStatus = async (service: ServiceStatus) => {
    try {
      const response = await fetch(service.url, { 
        method: 'GET', 
        mode: 'no-cors',
        signal: AbortSignal.timeout(3000)
      });
      return 'active';
    } catch {
      return 'inactive';
    }
  };

  const checkAllServices = async () => {
    const updatedStatuses = await Promise.all(
      serviceStatuses.map(async (service) => ({
        ...service,
        status: await checkServiceStatus(service) as 'active' | 'inactive'
      }))
    );
    setServiceStatuses(updatedStatuses);
  };

  useEffect(() => {
    checkAllServices();
    const interval = setInterval(checkAllServices, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePanelClick = (panel: any) => {
    if (panel.url.startsWith('http')) {
      window.open(panel.url, '_blank');
    } else if (panel.url.startsWith('file://')) {
      // Handle local file URLs
      const localPath = panel.url.replace('file://', '');
      window.open(localPath, '_blank');
    } else {
      // Handle other URLs or show modal
      console.log(`Opening ${panel.title}: ${panel.url}`);
    }
  };

  return (
    <div className="dashboard-migration">
      <div className="dashboard-header">
        <h1 className="dashboard-title">🎯 Heroes of Time - Dashboard Central</h1>
        <p className="dashboard-subtitle">
          Interface unifiée - Migration complète du Dashboard HTML vers React
        </p>
      </div>

      {/* Heroes GROFI Section */}
      <div className="heroes-grofi-section">
        <h2 className="heroes-grofi-title">🏛️ Heroes GROFI - Sélection</h2>
        <p className="heroes-grofi-subtitle">
          Choisissez votre héros pour commencer l'aventure temporelle
        </p>
        <div className="heroes-grid">
          {heroes.map((hero) => (
            <div
              key={hero.id}
              className={`hero-card ${selectedHero === hero.id ? 'selected' : ''}`}
              onClick={() => setSelectedHero(hero.id)}
            >
              <div className="hero-icon">{hero.icon}</div>
              <div className="hero-name">{hero.name}</div>
              <div className="hero-faction">{hero.faction}</div>
              <div className="hero-power">{hero.power}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Status Bar */}
      <div className="status-bar">
        <h3>📊 Status des Services</h3>
        <div className="service-indicators">
          {serviceStatuses.map((service) => (
            <div
              key={service.name}
              className={`service-indicator ${service.status}`}
            >
              <div className="service-dot"></div>
              <span>{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panels Grid */}
      <div className="main-panels">
        {panels.map((panel) => (
          <div
            key={panel.id}
            className={`ui-panel ${panel.type} ${panel.isWide ? 'wide' : ''}`}
            style={panel.borderColor ? { 
              borderColor: panel.borderColor,
              boxShadow: `0 0 20px ${panel.borderColor}40`
            } : {}}
            onClick={() => handlePanelClick(panel)}
          >
            <div className="panel-header">
              <div className="panel-icon" style={panel.borderColor ? { 
                textShadow: `0 0 10px ${panel.borderColor}` 
              } : {}}>
                {panel.icon}
              </div>
              <h2 className="panel-title" style={panel.borderColor ? { 
                color: panel.borderColor 
              } : {}}>
                {panel.title}
              </h2>
            </div>
            
            <div className="panel-content">
              <p className="panel-description">{panel.description}</p>
              <div className="panel-url">{panel.url}</div>
              
              <ul className="panel-features">
                {panel.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="panel-footer">
              <button 
                className="launch-button"
                style={panel.borderColor ? {
                  background: `linear-gradient(45deg, ${panel.borderColor}, ${panel.borderColor}dd)`,
                  boxShadow: `0 0 15px ${panel.borderColor}50`
                } : {}}
              >
                {panel.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Refresh Button */}
      <button className="refresh-button" onClick={checkAllServices} title="Actualiser les statuts">
        🔄
      </button>

      {/* Footer */}
      <div className="footer">
        <p>🎯 Heroes of Time Dashboard - Migration React Complète</p>
        <p>16 panneaux migrés - Actualisation automatique toutes les 30 secondes</p>
      </div>
    </div>
  );
};

export default DashboardMigration; 