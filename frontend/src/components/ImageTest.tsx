import React from 'react';
import { CREATURE_ASSETS, HERO_ASSETS } from '../constants/gameAssets';

const ImageTest: React.FC = () => {
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', color: 'white' }}>
      <h2>Test des Images</h2>
      
      <h3>Créatures (GIFs)</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div>
          <p>Dragon Rouge:</p>
          <img 
            src={CREATURE_ASSETS.DRAGON_RED} 
            alt="Dragon Rouge" 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur dragon rouge:', e)}
            onLoad={() => console.log('Dragon rouge chargé!')}
          />
        </div>
        <div>
          <p>Phoenix:</p>
          <img 
            src={CREATURE_ASSETS.PHOENIX} 
            alt="Phoenix" 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur phoenix:', e)}
            onLoad={() => console.log('Phoenix chargé!')}
          />
        </div>
        <div>
          <p>Licorne:</p>
          <img 
            src={CREATURE_ASSETS.UNICORN} 
            alt="Licorne" 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur licorne:', e)}
            onLoad={() => console.log('Licorne chargée!')}
          />
        </div>
        <div>
          <p>Griffon:</p>
          <img 
            src={CREATURE_ASSETS.GRIFFIN} 
            alt="Griffon" 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur griffon:', e)}
            onLoad={() => console.log('Griffon chargé!')}
          />
        </div>
      </div>

      <h3>Héros (PNGs)</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <p>Guerrier:</p>
          <img 
            src={HERO_ASSETS.WARRIOR} 
            alt="Guerrier" 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur guerrier:', e)}
            onLoad={() => console.log('Guerrier chargé!')}
          />
        </div>
        <div>
          <p>Mage:</p>
          <img 
            src={HERO_ASSETS.MAGE} 
            alt="Mage" 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur mage:', e)}
            onLoad={() => console.log('Mage chargé!')}
          />
        </div>
        <div>
          <p>Archer:</p>
          <img 
            src={HERO_ASSETS.ARCHER} 
            alt="Archer" 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur archer:', e)}
            onLoad={() => console.log('Archer chargé!')}
          />
        </div>
        <div>
          <p>Paladin:</p>
          <img 
            src={HERO_ASSETS.PALADIN} 
            alt="Paladin" 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur paladin:', e)}
            onLoad={() => console.log('Paladin chargé!')}
          />
        </div>
      </div>

      <h3>Chemins des fichiers:</h3>
      <ul>
        <li>Dragon: {CREATURE_ASSETS.DRAGON_RED}</li>
        <li>Phoenix: {CREATURE_ASSETS.PHOENIX}</li>
        <li>Licorne: {CREATURE_ASSETS.UNICORN}</li>
        <li>Griffon: {CREATURE_ASSETS.GRIFFIN}</li>
        <li>Guerrier: {HERO_ASSETS.WARRIOR}</li>
        <li>Mage: {HERO_ASSETS.MAGE}</li>
        <li>Archer: {HERO_ASSETS.ARCHER}</li>
        <li>Paladin: {HERO_ASSETS.PALADIN}</li>
      </ul>
    </div>
  );
};

export default ImageTest; 