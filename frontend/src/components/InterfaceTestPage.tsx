import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InterfaceTestPage.css';

interface InterfaceVersion {
  id: string;
  name: string;
  description: string;
  commit: string;
  route: string;
}

interface InterfaceGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  versions: InterfaceVersion[];
}

const InterfaceTestPage: React.FC = () => {
  const navigate = useNavigate();
  
  // État pour stocker la version sélectionnée pour chaque groupe
  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>({
    'true-heroes': 'current',
    'simple-game': 'current',
    'modern-game': 'current',
    'simple-modern': 'current'
  });

  const interfaceGroups: InterfaceGroup[] = [
    {
      id: 'true-heroes',
      name: '🎮 TrueHeroesInterface',
      description: 'Interface principale avec boutons de contrôle',
      color: '#4CAF50',
      versions: [
        {
          id: 'current',
          name: 'Version ACTUELLE',
          description: 'Avec Epic Content (🧟) et boutons fixés',
          commit: 'HEAD',
          route: '/test/true-heroes'
        },
        {
          id: 'v1',
          name: 'Version HIER',
          description: 'Avec Goldorak - avant problèmes Epic',
          commit: 'afdeae9',
          route: '/test/true-heroes-v1'
        },
        {
          id: 'v2',
          name: 'Version AVANT-HIER',
          description: 'Avec système retro complet',
          commit: '741ff81',
          route: '/test/true-heroes-v2'
        },
        {
          id: 'v3',
          name: 'Version REFACTORÉE',
          description: 'Interface game refactorée',
          commit: 'dd0100d',
          route: '/test/true-heroes-v3'
        },
        {
          id: 'v4',
          name: 'Version ANCIENNE',
          description: 'Avant modernisation',
          commit: '14636c4',
          route: '/test/true-heroes-v4'
        }
      ]
    },
    {
      id: 'simple-game',
      name: '🎯 SimpleGameInterface',
      description: 'Interface simple avec sidebar (bonne disposition)',
      color: '#2196F3',
      versions: [
        {
          id: 'current',
          name: 'Version ACTUELLE',
          description: 'Version simple avec sidebar',
          commit: 'HEAD',
          route: '/test/simple-game'
        },
        {
          id: 'v1',
          name: 'Version HIER',
          description: 'Version simple d\'hier',
          commit: 'afdeae9',
          route: '/test/simple-game-v1'
        },
        {
          id: 'v2',
          name: 'Version AVANT-HIER',
          description: 'Version simple avant-hier',
          commit: '741ff81',
          route: '/test/simple-game-v2'
        },
        {
          id: 'v3',
          name: 'Version REFACTORÉE',
          description: 'Version simple refactorée',
          commit: 'dd0100d',
          route: '/test/simple-game-v3'
        },
        {
          id: 'v4',
          name: 'Version ANCIENNE',
          description: 'Version simple ancienne',
          commit: '14636c4',
          route: '/test/simple-game-v4'
        }
      ]
    },
    {
      id: 'modern-game',
      name: '✨ ModernGameInterface',
      description: 'Interface moderne avec animations',
      color: '#9C27B0',
      versions: [
        {
          id: 'current',
          name: 'Version ACTUELLE',
          description: 'Interface moderne actuelle',
          commit: 'HEAD',
          route: '/test/modern-game'
        },
        {
          id: 'v1',
          name: 'Version HIER',
          description: 'Interface moderne d\'hier',
          commit: 'afdeae9',
          route: '/test/modern-game-v1'
        },
        {
          id: 'v2',
          name: 'Version AVANT-HIER',
          description: 'Interface moderne avant-hier',
          commit: '741ff81',
          route: '/test/modern-game-v2'
        },
        {
          id: 'v3',
          name: 'Version REFACTORÉE',
          description: 'Interface moderne refactorée',
          commit: 'dd0100d',
          route: '/test/modern-game-v3'
        },
        {
          id: 'v4',
          name: 'Version ANCIENNE',
          description: 'Interface moderne ancienne',
          commit: '14636c4',
          route: '/test/modern-game-v4'
        }
      ]
    },
    {
      id: 'simple-modern',
      name: '🎨 SimpleModernInterface',
      description: 'Interface moderne simplifiée',
      color: '#FF9800',
      versions: [
        {
          id: 'current',
          name: 'Version ACTUELLE',
          description: 'Interface moderne simplifiée actuelle',
          commit: 'HEAD',
          route: '/test/simple-modern'
        },
        {
          id: 'v1',
          name: 'Version HIER',
          description: 'Interface moderne simplifiée d\'hier',
          commit: 'afdeae9',
          route: '/test/simple-modern-v1'
        },
        {
          id: 'v2',
          name: 'Version AVANT-HIER',
          description: 'Interface moderne simplifiée avant-hier',
          commit: '741ff81',
          route: '/test/simple-modern-v2'
        },
        {
          id: 'v3',
          name: 'Version REFACTORÉE',
          description: 'Interface moderne simplifiée refactorée',
          commit: 'dd0100d',
          route: '/test/simple-modern-v3'
        },
        {
          id: 'v4',
          name: 'Version ANCIENNE',
          description: 'Interface moderne simplifiée ancienne',
          commit: '14636c4',
          route: '/test/simple-modern-v4'
        }
      ]
    }
  ];

  const handleVersionChange = (groupId: string, versionId: string) => {
    setSelectedVersions(prev => ({
      ...prev,
      [groupId]: versionId
    }));
  };

  const handleTestInterface = (groupId: string) => {
    const selectedVersion = selectedVersions[groupId];
    const group = interfaceGroups.find(g => g.id === groupId);
    const version = group?.versions.find(v => v.id === selectedVersion);
    
    if (version && group) {
      console.log(`🔍 Testing ${group.name} - ${version.name} (${version.commit})`);
      navigate(version.route);
    }
  };

  return (
    <div className="interface-test-page">
      <div className="test-header">
        <h1>🧪 Interface Versions Diagnostic</h1>
        <p>Testez 5 versions de chaque interface pour trouver celle qui marche</p>
      </div>

      <div className="interface-groups">
        {interfaceGroups.map((group) => (
          <div key={group.id} className="interface-group">
            <div className="group-header">
              <h2 style={{ color: group.color }}>{group.name}</h2>
              <p>{group.description}</p>
            </div>

            <div className="versions-selector">
              {group.versions.map((version) => (
                <label key={version.id} className="version-option">
                  <input
                    type="radio"
                    name={group.id}
                    value={version.id}
                    checked={selectedVersions[group.id] === version.id}
                    onChange={() => handleVersionChange(group.id, version.id)}
                  />
                  <div className="version-info">
                    <div className="version-name">{version.name}</div>
                    <div className="version-description">{version.description}</div>
                    <div className="version-commit">📅 {version.commit}</div>
                  </div>
                </label>
              ))}
            </div>

            <button
              className="test-button"
              style={{ '--button-color': group.color } as React.CSSProperties}
              onClick={() => handleTestInterface(group.id)}
            >
              🚀 Tester {group.name}
            </button>
          </div>
        ))}
      </div>

      <div className="test-info">
        <h2>🔍 Instructions</h2>
        <ol>
          <li><strong>Choisissez une version</strong> avec les radio buttons</li>
          <li><strong>Cliquez sur "Tester"</strong> pour voir l'interface</li>
          <li><strong>Vérifiez si vous voyez :</strong></li>
          <ul>
            <li>✅ Boutons de contrôle au centre (📋 ⚔️ 🎒 🏰)</li>
            <li>✅ Bouton Epic Content (🧟) - <em>l'ancienne version du "grunt"</em></li>
            <li>✅ Bouton End Turn (⭐)</li>
            <li>✅ Panel droit fonctionnel</li>
            <li>✅ Bonne disposition</li>
          </ul>
          <li><strong>Testez différentes versions</strong> jusqu'à trouver la bonne !</li>
        </ol>
      </div>
    </div>
  );
};

export default InterfaceTestPage; 