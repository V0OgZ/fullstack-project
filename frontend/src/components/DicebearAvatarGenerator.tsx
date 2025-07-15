import React, { useState, useEffect } from 'react';
import offlineAvatarGenerator, { HeroAvatarData } from '../services/offlineAvatarGenerator';

const DicebearAvatarGenerator: React.FC = () => {
  const [avatars, setAvatars] = useState<HeroAvatarData[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const heroes = ['ARTHUR', 'MORGANA', 'TRISTAN', 'ELARA', 'GARETH', 'LYANNA', 'CEDRIC', 'SERAPHINA', 'VALEN'];

  const generateAllAvatars = async () => {
    setLoading(true);
    try {
      await offlineAvatarGenerator.generateAllHeroAvatars();
      const generatedAvatars = await Promise.all(
        heroes.map(hero => offlineAvatarGenerator.getHeroAvatar(hero))
      );
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
    a.download = 'heroes-avatars.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    setStats(offlineAvatarGenerator.getAvatarStats());
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>🎲 Générateur d'Avatars Dicebear Offline</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={generateAllAvatars}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {loading ? '🔄 Génération...' : '🚀 Générer Tous les Avatars'}
        </button>
        
        <button 
          onClick={downloadAvatars}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📥 Télécharger JSON
        </button>
      </div>

      {stats && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
          <h3>📊 Statistiques</h3>
          <p>Total: {stats.total}</p>
          <p>Générés: {stats.generated}</p>
          <p>Fallback: {stats.fallback}</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {avatars.map((avatar, index) => (
          <div key={index} style={{ 
            padding: '15px', 
            backgroundColor: '#333', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>{avatar.name}</h3>
            <p>Style: {avatar.style}</p>
            <p>Status: {avatar.isGenerated ? '✅ Généré' : '🔄 Fallback'}</p>
            
            {avatar.isGenerated ? (
              <div>
                <img 
                  src={avatar.url} 
                  alt={avatar.name}
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    border: '2px solid #4CAF50',
                    borderRadius: '50%'
                  }}
                />
                <p style={{ fontSize: '12px', color: '#ccc' }}>
                  URL: {avatar.url.substring(0, 50)}...
                </p>
              </div>
            ) : (
              <div>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  backgroundColor: '#666',
                  border: '2px solid #FF9800',
                  borderRadius: '50%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  🎨
                </div>
                <p style={{ fontSize: '12px', color: '#ccc' }}>
                  Utilise l'avatar SVG local
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#2d2d2d', borderRadius: '5px' }}>
        <h3>ℹ️ Informations Légales</h3>
        <ul>
          <li>✅ <strong>Dicebear est gratuit</strong> pour usage personnel et commercial</li>
          <li>✅ <strong>Attribution requise</strong> : "Powered by Dicebear"</li>
          <li>✅ <strong>Téléchargement autorisé</strong> des avatars générés</li>
          <li>✅ <strong>Usage offline possible</strong> après téléchargement</li>
          <li>⚠️ <strong>Limite de rate</strong> : 1000 requêtes/heure en gratuit</li>
        </ul>
        
        <h3>🎯 Comment ça marche</h3>
        <ol>
          <li>Cliquez sur "Générer Tous les Avatars"</li>
          <li>Les avatars sont créés via l'API Dicebear</li>
          <li>Ils sont sauvegardés localement</li>
          <li>Vous pouvez les utiliser offline ensuite</li>
          <li>Téléchargez le JSON pour sauvegarder les URLs</li>
        </ol>
      </div>
    </div>
  );
};

export default DicebearAvatarGenerator;