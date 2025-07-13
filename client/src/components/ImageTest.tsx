import React from 'react';
import { useTranslation } from '../i18n';
import { CREATURE_ASSETS, HERO_ASSETS } from '../constants/gameAssets';

const ImageTest: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', color: 'white' }}>
      <h2>{t('testImages')}</h2>
      
      <h3>{t('creatureGifs')}</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div>
          <p>{t('redDragon')}:</p>
          <img 
            src={CREATURE_ASSETS.DRAGON_RED} 
            alt={t('redDragon')} 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur dragon rouge:', e)}
            onLoad={() => console.log('Dragon rouge chargé!')}
          />
        </div>
        <div>
          <p>{t('phoenix')}:</p>
          <img 
            src={CREATURE_ASSETS.PHOENIX} 
            alt={t('phoenix')} 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur phoenix:', e)}
            onLoad={() => console.log('Phoenix chargé!')}
          />
        </div>
        <div>
          <p>{t('unicorn')}:</p>
          <img 
            src={CREATURE_ASSETS.UNICORN} 
            alt={t('unicorn')} 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur licorne:', e)}
            onLoad={() => console.log('Licorne chargée!')}
          />
        </div>
        <div>
          <p>{t('griffin')}:</p>
          <img 
            src={CREATURE_ASSETS.GRIFFIN} 
            alt={t('griffin')} 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur griffon:', e)}
            onLoad={() => console.log('Griffon chargé!')}
          />
        </div>
      </div>

      <h3>{t('heroesPngs')}</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <p>{t('warrior')}:</p>
          <img 
            src={HERO_ASSETS.WARRIOR} 
            alt={t('warrior')} 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur guerrier:', e)}
            onLoad={() => console.log('Guerrier chargé!')}
          />
        </div>
        <div>
          <p>{t('mage')}:</p>
          <img 
            src={HERO_ASSETS.MAGE} 
            alt={t('mage')} 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur mage:', e)}
            onLoad={() => console.log('Mage chargé!')}
          />
        </div>
        <div>
          <p>{t('archer')}:</p>
          <img 
            src={HERO_ASSETS.ARCHER} 
            alt={t('archer')} 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur archer:', e)}
            onLoad={() => console.log('Archer chargé!')}
          />
        </div>
        <div>
          <p>{t('paladin')}:</p>
          <img 
            src={HERO_ASSETS.PALADIN} 
            alt={t('paladin')} 
            style={{ width: '100px', height: '100px', border: '2px solid gold' }}
            onError={(e) => console.error('Erreur paladin:', e)}
            onLoad={() => console.log('Paladin chargé!')}
          />
        </div>
      </div>

      <h3>{t('filePaths')}:</h3>
      <ul>
        <li>Dragon: {CREATURE_ASSETS.DRAGON_RED}</li>
        <li>Phoenix: {CREATURE_ASSETS.PHOENIX}</li>
        <li>{t('unicorn')}: {CREATURE_ASSETS.UNICORN}</li>
        <li>{t('griffin')}: {CREATURE_ASSETS.GRIFFIN}</li>
        <li>{t('warrior')}: {HERO_ASSETS.WARRIOR}</li>
        <li>{t('mage')}: {HERO_ASSETS.MAGE}</li>
        <li>{t('archer')}: {HERO_ASSETS.ARCHER}</li>
        <li>{t('paladin')}: {HERO_ASSETS.PALADIN}</li>
      </ul>
    </div>
  );
};

export default ImageTest; 