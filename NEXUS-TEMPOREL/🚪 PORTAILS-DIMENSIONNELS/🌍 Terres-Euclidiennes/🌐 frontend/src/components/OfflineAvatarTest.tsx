import React, { useState, useEffect } from 'react';
import offlineAvatarGenerator from '../services/offlineAvatarGenerator';
import './OfflineAvatarTest.css';

const OfflineAvatarTest: React.FC = () => {
  const [avatars, setAvatars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const heroes = ['ARTHUR', 'MORGANA', 'TRISTAN', 'ELARA', 'GARETH', 'LYANNA', 'CEDRIC', 'SERAPHINA', 'VALEN'];

  const generateAllAvatars = async () => {
    setLoading(true);
    try {
      await offlineAvatarGenerator.generateAllHeroAvatars();
      const generatedAvatars = heroes.map(hero => ({
        name: hero,
        avatar: offlineAvatarGenerator.getGeneratedAvatars().get(hero)
      }));
      setAvatars(generatedAvatars);
      setStats(offlineAvatarGenerator.getAvatarStats());
    } catch (error) {
      console.error('Erreur génération avatars:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadAvatars = () => {
    const data = offlineAvatarGenerator.exportAvatarsForDownload();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hero-avatars-offline.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllAsSVG = () => {
    offlineAvatarGenerator.downloadAllAvatarsAsSVG();
  };

  const downloadAllAsPNG = async () => {
    await offlineAvatarGenerator.downloadAllAvatarsAsPNG();
  };

  const downloadSingleAvatar = (heroName: string, format: 'svg' | 'png') => {
    if (format === 'svg') {
      offlineAvatarGenerator.downloadAvatarAsSVG(heroName);
    } else {
      offlineAvatarGenerator.downloadAvatarAsPNG(heroName);
    }
  };

  useEffect(() => {
    generateAllAvatars();
  }, []);

  return (
    <div className="offline-avatar-test">
      <h2>🎮 Test Avatars Dicebear 100% Offline</h2>
      
      <div className="controls">
        <button onClick={generateAllAvatars} disabled={loading}>
          {loading ? '🔄 Génération...' : '🚀 Régénérer Tous les Avatars'}
        </button>
        <button onClick={downloadAvatars}>
          💾 Télécharger JSON
        </button>
        <button onClick={downloadAllAsSVG}>
          📁 Télécharger Tous (SVG)
        </button>
        <button onClick={downloadAllAsPNG}>
          🖼️ Télécharger Tous (PNG)
        </button>
      </div>

      {stats && (
        <div className="stats">
          <h3>📊 Statistiques</h3>
          <p>Total: {stats.total}</p>
          <p>Générés: {stats.generated}</p>
          <p>Fallback: {stats.fallback}</p>
        </div>
      )}

      <div className="avatar-grid">
        {avatars.map(({ name, avatar }) => (
          <div key={name} className="avatar-item">
            <h4>{name}</h4>
            {avatar ? (
              <>
                <img 
                  src={avatar.url} 
                  alt={name}
                  className="avatar-image"
                  onError={(e) => {
                    console.error(`Erreur chargement avatar ${name}:`, e);
                    e.currentTarget.src = `/assets/heroes/${name.toLowerCase()}.svg`;
                  }}
                />
                <p>Style: {avatar.style}</p>
                <p>Généré: {avatar.isGenerated ? '✅' : '❌'}</p>
                {avatar.isGenerated && (
                  <div className="download-buttons">
                    <button 
                      onClick={() => downloadSingleAvatar(name, 'svg')}
                      className="download-btn svg"
                    >
                      📁 SVG
                    </button>
                    <button 
                      onClick={() => downloadSingleAvatar(name, 'png')}
                      className="download-btn png"
                    >
                      🖼️ PNG
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>❌ Avatar non trouvé</p>
            )}
          </div>
        ))}
      </div>

      <div className="info">
        <h3>ℹ️ Informations</h3>
        <ul>
          <li>✅ Utilise Dicebear 100% offline (packages npm)</li>
          <li>✅ Pas d'appels API externes</li>
          <li>✅ Cache local des avatars générés</li>
          <li>✅ Fallback vers images SVG locales</li>
          <li>✅ Compatible avec le système de héros existant</li>
        </ul>
      </div>
    </div>
  );
};

export default OfflineAvatarTest;