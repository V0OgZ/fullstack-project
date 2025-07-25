import React, { useState, useEffect } from 'react';
import './DashboardMigration.css';

interface PanelData {
  id: string;
  title: string;
  icon: string;
  description: string;
  url: string;
  features: string[];
  status: 'active' | 'disabled' | 'ethereal';
  special?: boolean;
}

const DashboardMigration: React.FC = () => {
  const [panels, setPanels] = useState<PanelData[]>([]);
  const [selectedHero, setSelectedHero] = useState<string>('');
  const [serviceStatus, setServiceStatus] = useState<Record<string, boolean>>({});

  // 🎭 16 PANELS DU DASHBOARD 9000 IDENTIFIÉS
  const dashboardPanels: PanelData[] = [
    {
      id: 'frontend-panel',
      title: 'Frontend Principal',
      icon: '🎮',
      description: 'Interface principale Heroes of Time',
      url: 'http://localhost:8000',
      features: ['Interface temporelle', 'Système de jeu', 'UI/UX principal'],
      status: 'active'
    },
    {
      id: 'visual-editor-panel', 
      title: 'Visual Editor',
      icon: '🎨',
      description: 'Éditeur visuel avancé',
      url: 'http://localhost:5174',
      features: ['Édition visuelle', 'Interface moderne', 'Outils créatifs'],
      status: 'active',
      special: true
    },
    {
      id: 'temporal-panel',
      title: 'Interface Temporelle',
      icon: '⚡',
      description: 'Gestion des voyages temporels',
      url: 'http://localhost:5174',
      features: ['Voyages temporels', 'Paradoxes causaux', 'Timeline management'],
      status: 'active'
    },
    {
      id: 'visualizer-panel',
      title: 'Quantum Visualizer',
      icon: '🔮',
      description: 'Visualisation quantique avancée',
      url: 'http://localhost:3001',
      features: ['États quantiques', 'Visualisation 3D', 'Particules'],
      status: 'active'
    },
    {
      id: 'object-viewer-panel',
      title: 'Collection & Grammar',
      icon: '📚',
      description: 'Visualiseur d\'objets et grammaire',
      url: 'http://localhost:5175',
      features: ['Collection d\'objets', 'Grammaire HOTS', 'Analyse syntaxique'],
      status: 'active'
    },
    {
      id: 'testrunner-panel',
      title: 'Test Runner',
      icon: '🧪',
      description: 'Exécuteur de tests automatisés',
      url: 'http://localhost:8888',
      features: ['Tests automatiques', 'Validation code', 'Rapports détaillés'],
      status: 'active'
    },
    {
      id: 'ethereal-panel',
      title: 'Mode Éthéré',
      icon: '👻',
      description: 'Interfaces cachées et secrètes',
      url: '#ethereal',
      features: ['Interfaces secrètes', 'Mode développeur', 'Outils cachés'],
      status: 'ethereal',
      special: true
    },
    {
      id: 'memento-panel',
      title: 'Memento Archive',
      icon: '🏛️',
      description: 'Archives temporelles Memento',
      url: '#memento',
      features: ['Archives temporelles', 'Mémoire collective', 'Tatouages évolutifs'],
      status: 'active'
    },
    {
      id: 'replay-panel',
      title: 'Replay System',
      icon: '🎬',
      description: 'Système de replay et enregistrement',
      url: '#replay',
      features: ['Enregistrement parties', 'Replay système', 'Analyse gameplay'],
      status: 'disabled'
    },
    {
      id: 'epoch-panel',
      title: 'Epoch Manager',
      icon: '⏰',
      description: 'Gestion des époques temporelles',
      url: '#epoch',
      features: ['Gestion époques', 'Timeline control', 'Synchronisation'],
      status: 'active'
    },
    {
      id: 'admin-multiplayer-panel',
      title: 'Admin Multijoueur',
      icon: '👥',
      description: 'Administration système multijoueur',
      url: 'admin-multiplayer.html',
      features: ['Gestion sessions', 'Admin joueurs', 'Monitoring temps réel'],
      status: 'active',
      special: true
    },
    {
      id: 'joint-panel',
      title: 'Le Joint Oublié',
      icon: '🚬',
      description: 'Panopticon 3D et expériences',
      url: 'panopticon-3d/index.html',
      features: ['Panopticon 3D', 'Expériences visuelles', 'Réalité augmentée'],
      status: 'active',
      special: true
    },
    {
      id: 'dicebear-demo-panel',
      title: 'Dicebear Demo',
      icon: '🎲',
      description: 'Générateur d\'avatars Dicebear',
      url: '#dicebear',
      features: ['Génération avatars', 'API Dicebear', 'Customisation'],
      status: 'active'
    },
    {
      id: 'sphinx-demo-panel',
      title: 'Sphinx Quantique',
      icon: '🦁',
      description: 'Générateur Sphinx intelligent',
      url: '#sphinx',
      features: ['IA Sphinx', 'Génération contenu', 'Analyse quantique'],
      status: 'active'
    },
    {
      id: 'world-state-graph-panel',
      title: 'World State Graph',
      icon: '🌐',
      description: 'Visualisation graphe d\'état mondial',
      url: '#world-state-graph',
      features: ['Graphe d\'état', 'AI Limited data', 'Visualisation réseau'],
      status: 'active'
    },
    {
      id: 'multi-realm-panel',
      title: 'Multi Realm Manager',
      icon: '🌌',
      description: 'Gestionnaire des realms multiples',
      url: '#multi-realm',
      features: ['Gestion REALMS', '6ème dimension', 'Cross-realm actions'],
      status: 'active'
    }
  ];

  const heroesGrofi = [
    { id: 'arthur', name: 'Arthur Pendragon', icon: '⚔️', faction: 'Camelot' },
    { id: 'jean-grofignon', name: 'Jean-Grofignon', icon: '🛋️', faction: 'Canapé Cosmique' },
    { id: 'anna-martel', name: 'Anna Martel', icon: '🔨', faction: 'Forge Temporelle' },
    { id: 'memento', name: 'Memento Archive', icon: '🏛️', faction: 'Archiviste Éternel' },
    { id: 'grut', name: 'GRUT Vision', icon: '👁️', faction: 'Omniscience' },
    { id: 'vince-vega', name: 'Vince Vega', icon: '🔫', faction: 'Pulp Fiction' },
    { id: 'benedikt', name: 'Benedikt Conulbrurcus', icon: '🌀', faction: 'Téléporteur Cosmique' }
  ];

  useEffect(() => {
    setPanels(dashboardPanels);
    checkServiceStatus();
  }, []);

  const checkServiceStatus = async () => {
    const services = [
      { name: 'backend', url: 'http://localhost:8080/api/health' },
      { name: 'frontend', url: 'http://localhost:8000' },
      { name: 'temporal', url: 'http://localhost:5174' },
      { name: 'visualizer', url: 'http://localhost:3001' },
      { name: 'collection', url: 'http://localhost:5175' },
      { name: 'testrunner', url: 'http://localhost:8888' },
      { name: 'dashboard', url: 'http://localhost:9000' }
    ];

    const status: Record<string, boolean> = {};
    
    for (const service of services) {
      try {
        const response = await fetch(service.url, { 
          method: 'GET',
          mode: 'no-cors'
        });
        status[service.name] = true;
      } catch {
        status[service.name] = false;
      }
    }
    
    setServiceStatus(status);
  };

  const handlePanelClick = (panel: PanelData) => {
    if (panel.status === 'disabled') return;
    
    if (panel.url.startsWith('http')) {
      window.open(panel.url, '_blank');
    } else {
      // Handle internal navigation or special panels
      console.log(`Navigating to internal panel: ${panel.id}`);
    }
  };

  const handleHeroSelect = (heroId: string) => {
    setSelectedHero(heroId);
    console.log(`Hero selected: ${heroId}`);
  };

  return (
    <div className="dashboard-migration">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          🎯 Heroes of Time - Dashboard Central MIGRÉ
        </h1>
        <p className="dashboard-subtitle">
          Migration complète du Dashboard 9000 vers Panopticon React
        </p>
      </div>

      {/* Heroes GROFI Section */}
      <div className="heroes-grofi-section">
        <h2 className="heroes-grofi-title">🌟 Heroes GROFI Selection</h2>
        <div className="heroes-grid">
          {heroesGrofi.map(hero => (
            <div 
              key={hero.id}
              className={`hero-card ${selectedHero === hero.id ? 'selected' : ''}`}
              onClick={() => handleHeroSelect(hero.id)}
            >
              <div className="hero-icon">{hero.icon}</div>
              <div className="hero-name">{hero.name}</div>
              <div className="hero-faction">{hero.faction}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Status Bar */}
      <div className="status-bar">
        <h3>📊 Status des Services</h3>
        <div className="service-indicators">
          {Object.entries(serviceStatus).map(([service, isActive]) => (
            <div 
              key={service}
              className={`service-indicator ${isActive ? 'active' : 'inactive'}`}
            >
              <span className="service-dot"></span>
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {/* Main Panels Grid */}
      <div className="ui-grid">
        {panels.map(panel => (
          <div 
            key={panel.id}
            className={`ui-panel ${panel.status} ${panel.special ? 'special' : ''}`}
            onClick={() => handlePanelClick(panel)}
          >
            <div className="panel-icon">{panel.icon}</div>
            <div className="panel-title">{panel.title}</div>
            <div className="panel-description">{panel.description}</div>
            <div className="panel-url">{panel.url}</div>
            <ul className="panel-features">
              {panel.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button 
              className="launch-button"
              disabled={panel.status === 'disabled'}
            >
              {panel.status === 'active' ? 'Lancer' : 
               panel.status === 'ethereal' ? 'Mode Éthéré' : 'Désactivé'}
            </button>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>🛋️ Dashboard migré par Jean-Grofignon depuis le Canapé Cosmique</p>
        <p>🌀 Architecture React + TypeScript + GRUT Vision</p>
      </div>
    </div>
  );
};

export default DashboardMigration; 