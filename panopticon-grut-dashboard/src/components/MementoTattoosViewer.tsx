import React, { useState, useEffect } from 'react';
import './MementoTattoosViewer.css';

interface Tattoo {
  id: string;
  timestamp: string;
  event: string;
  description: string;
  technical_details?: any;
  [key: string]: any;
}

/**
 * 🧿 MEMENTO TATTOOS VIEWER - Visualiseur Tatouages Archiviste
 * ===========================================================
 * 
 * Composant React pour afficher les tatouages évolutifs de Memento
 * avec interface moderne et filtrage par événements récents.
 * 
 * MEMENTO: "Chaque tatouage raconte l'histoire d'une victoire, d'une découverte, d'un moment éternel"
 * STATUS: ✅ CRÉÉ - Interface tatouages interactive
 */

export const MementoTattoosViewer: React.FC = () => {
  const [tattoos, setTattoos] = useState<Tattoo[]>([]);
  const [selectedTattoo, setSelectedTattoo] = useState<Tattoo | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTattoos();
  }, []);

  const loadTattoos = async () => {
    try {
      // Charger les tatouages depuis le JSON
      const response = await fetch('/game_assets/artifacts/mineurs/tatouages_memento_archiviste.json');
      const data = await response.json();
      
      // Convertir l'objet en array et trier par timestamp desc
      const tattoosArray = Object.entries(data.tatouages).map(([id, tattoo]: [string, any]) => ({
        id,
        ...tattoo
      })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setTattoos(tattoosArray);
      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement tatouages:', error);
      setLoading(false);
    }
  };

  const getEventIcon = (event: string): string => {
    if (event.includes('PANOPTICON')) return '🏛️';
    if (event.includes('DIMENSION M')) return '🕸️';
    if (event.includes('3D')) return '🎨';
    if (event.includes('PROTECTION')) return '🛡️';
    if (event.includes('DOCUMENTATION')) return '📚';
    if (event.includes('FORMULES')) return '🌀';
    if (event.includes('BENEDIKT')) return '🌀';
    if (event.includes('JEAN')) return '🛋️';
    if (event.includes('GRUT')) return '👁️';
    if (event.includes('OPUS')) return '📖';
    if (event.includes('FUSION')) return '🌀';
    return '🧿';
  };

  const getEventCategory = (event: string): string => {
    if (event.includes('PANOPTICON')) return 'panopticon';
    if (event.includes('DIMENSION M')) return 'dimension-m';
    if (event.includes('3D') || event.includes('FRONTEND')) return 'frontend';
    if (event.includes('PROTECTION') || event.includes('BACKEND')) return 'backend';
    if (event.includes('DOCUMENTATION')) return 'docs';
    if (event.includes('FORMULES')) return 'formulas';
    return 'general';
  };

  const filteredTattoos = tattoos.filter(tattoo => {
    if (filter === 'all') return true;
    if (filter === 'recent') {
      const tattooDate = new Date(tattoo.timestamp);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return tattooDate >= yesterday;
    }
    return getEventCategory(tattoo.event) === filter;
  });

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="memento-tattoos-loading">
        <div className="loading-spinner">🧿</div>
        <p>Memento révèle ses tatouages temporels...</p>
      </div>
    );
  }

  return (
    <div className="memento-tattoos-viewer">
      <div className="tattoos-header">
        <h2>🧿 Tatouages de Memento l'Archiviste</h2>
        <p className="tattoos-subtitle">
          "Chaque marque sur ma peau raconte l'histoire éternelle de nos victoires"
        </p>
        
        <div className="tattoos-filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tous ({tattoos.length})
          </button>
          <button 
            className={filter === 'recent' ? 'active' : ''}
            onClick={() => setFilter('recent')}
          >
            🆕 Récents
          </button>
          <button 
            className={filter === 'panopticon' ? 'active' : ''}
            onClick={() => setFilter('panopticon')}
          >
            🏛️ Panopticon
          </button>
          <button 
            className={filter === 'dimension-m' ? 'active' : ''}
            onClick={() => setFilter('dimension-m')}
          >
            🕸️ Dimension M
          </button>
          <button 
            className={filter === 'frontend' ? 'active' : ''}
            onClick={() => setFilter('frontend')}
          >
            🎨 Frontend
          </button>
          <button 
            className={filter === 'backend' ? 'active' : ''}
            onClick={() => setFilter('backend')}
          >
            🛡️ Backend
          </button>
        </div>
      </div>

      <div className="tattoos-content">
        <div className="tattoos-list">
          {filteredTattoos.map((tattoo) => (
            <div
              key={tattoo.id}
              className={`tattoo-card ${selectedTattoo?.id === tattoo.id ? 'selected' : ''} ${getEventCategory(tattoo.event)}`}
              onClick={() => setSelectedTattoo(tattoo)}
            >
              <div className="tattoo-header">
                <span className="tattoo-icon">{getEventIcon(tattoo.event)}</span>
                <div className="tattoo-info">
                  <h4>{tattoo.event}</h4>
                  <span className="tattoo-timestamp">{formatTimestamp(tattoo.timestamp)}</span>
                </div>
              </div>
              <p className="tattoo-description">{tattoo.description}</p>
            </div>
          ))}
        </div>

        {selectedTattoo && (
          <div className="tattoo-details">
            <div className="details-header">
              <h3>
                {getEventIcon(selectedTattoo.event)} {selectedTattoo.event}
              </h3>
              <button 
                className="close-details"
                onClick={() => setSelectedTattoo(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="details-content">
              <p className="details-description">{selectedTattoo.description}</p>
              <p className="details-timestamp">
                <strong>Timestamp:</strong> {formatTimestamp(selectedTattoo.timestamp)}
              </p>
              
              {selectedTattoo.technical_details && (
                <div className="technical-details">
                  <h4>🔧 Détails Techniques</h4>
                  <pre>{JSON.stringify(selectedTattoo.technical_details, null, 2)}</pre>
                </div>
              )}
              
              {selectedTattoo.jean_blessing && (
                <div className="jean-blessing">
                  <h4>🛋️ Bénédiction Jean</h4>
                  <p>{selectedTattoo.jean_blessing}</p>
                </div>
              )}
              
              {selectedTattoo.user_confidence && (
                <div className="user-confidence">
                  <h4>💪 Confiance Utilisateur</h4>
                  <p>"{selectedTattoo.user_confidence}"</p>
                </div>
              )}
              
              {selectedTattoo.witness && (
                <div className="witnesses">
                  <h4>👁️ Témoins</h4>
                  <p>{selectedTattoo.witness}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="tattoos-footer">
        <p>
          🧿 <strong>Memento l'Archiviste Éternel</strong> - 
          "Mes tatouages évoluent avec chaque victoire, chaque découverte, chaque moment d'éternité"
        </p>
        <p className="tattoos-count">
          {filteredTattoos.length} tatouage{filteredTattoos.length > 1 ? 's' : ''} affiché{filteredTattoos.length > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default MementoTattoosViewer; 