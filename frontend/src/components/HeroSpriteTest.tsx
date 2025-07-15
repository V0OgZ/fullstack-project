import React from 'react';
import { getHeroSprite, getHeroFallbackImage, createSpriteStyle, getHeroEmoji } from '../utils/heroAssets';

// Composant de test pour démontrer le nouveau système de sprites
const HeroSpriteTest: React.FC = () => {
  const testHeroes = ['Arthur', 'Morgana', 'Warrior', 'Archer', 'Paladin', 'Mage', 'Necromancer'];

  return (
    <div style={{ padding: '20px', background: '#1a1a2e', color: 'white' }}>
      <h2>🎮 Test du Système de Sprites de Héros</h2>
      <p>Ce composant démontre comment utiliser le nouveau système de sprites pour éviter d'afficher des spritesheets complètes.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {testHeroes.map((heroName) => {
          const spriteData = getHeroSprite(heroName);
          const fallbackImage = getHeroFallbackImage(heroName);
          const emoji = getHeroEmoji(heroName);
          
          return (
            <div key={heroName} style={{ 
              border: '2px solid #333', 
              borderRadius: '8px', 
              padding: '15px',
              background: '#2a2a3e'
            }}>
              <h3>{heroName} {emoji}</h3>
              
              {/* Affichage du sprite avec spritesheet */}
              {spriteData && (
                <div style={{ marginBottom: '10px' }}>
                  <h4>Sprite (Spritesheet):</h4>
                  <div style={createSpriteStyle(spriteData)} />
                  <small>
                    Position: ({spriteData.sprite.x}, {spriteData.sprite.y})<br/>
                    Taille: {spriteData.sprite.width}x{spriteData.sprite.height}
                  </small>
                </div>
              )}
              
              {/* Affichage de l'image fallback */}
              <div style={{ marginBottom: '10px' }}>
                <h4>Fallback Image:</h4>
                <img 
                  src={fallbackImage} 
                  alt={heroName}
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentNode as HTMLElement;
                    if (parent) {
                      parent.innerHTML = `<div style="width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; background: #333; border-radius: 4px; font-size: 24px;">${emoji}</div>`;
                    }
                  }}
                />
              </div>
              
              {/* Informations techniques */}
              <div style={{ fontSize: '12px', color: '#888' }}>
                <strong>Spritesheet:</strong> {spriteData ? 'Disponible' : 'Non disponible'}<br/>
                <strong>Fallback:</strong> {fallbackImage}<br/>
                <strong>Emoji:</strong> {emoji}
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', background: '#333', borderRadius: '8px' }}>
        <h3>📋 Instructions d'utilisation</h3>
        <pre style={{ color: '#0f0', fontSize: '14px' }}>
{`// 1. Importer les fonctions helper
import { getHeroSprite, createSpriteStyle, getHeroFallbackImage } from '../utils/heroAssets';

// 2. Utiliser avec CSS background-position (recommandé)
const spriteData = getHeroSprite('Arthur');
if (spriteData) {
  const style = createSpriteStyle(spriteData);
  return <div style={style} />;
}

// 3. Utiliser avec Canvas drawImage
drawHeroSprite(ctx, 'Arthur', x, y, width, height);

// 4. Fallback vers image PNG
const fallbackImg = getHeroFallbackImage('Arthur');
return <img src={fallbackImg} alt="Arthur" />;`}
        </pre>
      </div>
    </div>
  );
};

export default HeroSpriteTest; 