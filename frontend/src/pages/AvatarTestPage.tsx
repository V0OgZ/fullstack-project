import React, { useState, useEffect } from 'react';
import DicebearAvatarGenerator from '../components/DicebearAvatarGenerator';
import heroDisplayService from '../services/heroDisplayService';

const AvatarTestPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'generator' | 'test'>('test');
  const [heroes, setHeroes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const testHeroes = [
    { name: 'ARTHUR', class: 'WARRIOR' },
    { name: 'MORGANA', class: 'MAGE' },
    { name: 'TRISTAN', class: 'ARCHER' },
    { name: 'ELARA', class: 'PALADIN' },
    { name: 'GARETH', class: 'DRAGON_SLAYER' },
    { name: 'LYANNA', class: 'ELVEN_ARCHER' },
    { name: 'CEDRIC', class: 'PALADIN' },
    { name: 'SERAPHINA', class: 'MAGE' },
    { name: 'VALEN', class: 'DARK_MAGE' }
  ];

  const testAllHeroes = async () => {
    setLoading(true);
    const results = [];
    
    for (const hero of testHeroes) {
      try {
        const display = await heroDisplayService.getHeroDisplay({
          name: hero.name,
          heroClass: hero.class,
          displayType: 'portrait',
          size: 'large'
        });
        
        results.push({
          ...hero,
          display
        });
      } catch (error) {
        console.error(`Erreur pour ${hero.name}:`, error);
        results.push({
          ...hero,
          display: {
            url: '',
            fallback: '🦸',
            type: 'error',
            metadata: { width: 64, height: 64, animated: false }
          }
        });
      }
    }
    
    setHeroes(results);
    setLoading(false);
  };

  useEffect(() => {
    testAllHeroes();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>🎮 Test des Avatars - Heroes of Time</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setCurrentView('test')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentView === 'test' ? '#4CAF50' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          🧪 Test Avatars
        </button>
        
        <button 
          onClick={() => setCurrentView('generator')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentView === 'generator' ? '#4CAF50' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🎲 Générateur Dicebear
        </button>
      </div>

      {currentView === 'test' ? (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={testAllHeroes}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '🔄 Test en cours...' : '🔄 Retester Tous les Héros'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {heroes.map((hero, index) => (
              <div key={index} style={{ 
                padding: '20px', 
                backgroundColor: '#333', 
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <h3>{hero.name}</h3>
                <p style={{ color: '#ccc' }}>Classe: {hero.class}</p>
                
                <div style={{ margin: '15px 0' }}>
                  {hero.display?.url ? (
                    <img 
                      src={hero.display.url} 
                      alt={hero.name}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        border: `3px solid ${hero.display.type === 'dicebear' ? '#4CAF50' : '#FF9800'}`,
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.parentNode?.querySelector('.fallback') as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                  ) : null}
                  
                  <div 
                    className="fallback"
                    style={{ 
                      display: hero.display?.url ? 'none' : 'block',
                      width: '80px', 
                      height: '80px', 
                      backgroundColor: '#666',
                      border: '3px solid #FF9800',
                      borderRadius: '50%',
                      margin: '0 auto',
                      fontSize: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {hero.display?.fallback || '🦸'}
                  </div>
                </div>
                
                <div style={{ fontSize: '12px', color: '#aaa' }}>
                  <p>Type: {hero.display?.type || 'unknown'}</p>
                  <p>URL: {hero.display?.url ? '✅' : '❌'}</p>
                  <p>Fallback: {hero.display?.fallback || '🦸'}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#2d2d2d', borderRadius: '5px' }}>
            <h3>📊 Résultats du Test</h3>
            <p>✅ <strong>Dicebear</strong> : Avatars générés via API (vert)</p>
            <p>🔄 <strong>Local SVG</strong> : Avatars créés localement (orange)</p>
            <p>🦸 <strong>Emoji</strong> : Fallback en cas d'erreur</p>
            
            <h3>🎯 Avantages de cette approche</h3>
            <ul>
              <li>🎲 <strong>Dicebear</strong> : Avatars professionnels et uniques</li>
              <li>🏠 <strong>Local</strong> : Fonctionne offline, pas de dépendance</li>
              <li>⚡ <strong>Hybride</strong> : Le meilleur des deux mondes</li>
              <li>🔄 <strong>Fallback</strong> : Toujours une image disponible</li>
            </ul>
          </div>
        </div>
      ) : (
        <DicebearAvatarGenerator />
      )}
    </div>
  );
};

export default AvatarTestPage;