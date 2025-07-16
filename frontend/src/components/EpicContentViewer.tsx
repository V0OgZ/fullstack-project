// 🎮 VISUALISATEUR DE CONTENU ÉPIQUE
// Récupère les données depuis le backend !

import React, { useState, useEffect } from 'react';
import { fetchEpicCreatures, fetchEpicHeroes, EpicCreature, EpicHero } from '../services/epicContentAPI';
import { BUILDING_IMAGES, generateBuildingImage } from '../services/buildingImageService';
import GoldorakEasterEgg from './GoldorakEasterEgg';

interface EpicContentViewerProps {
  isVisible: boolean;
  onClose: () => void;
}

const EpicContentViewer: React.FC<EpicContentViewerProps> = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'creatures' | 'heroes' | 'buildings'>('creatures');
  const [creatures, setCreatures] = useState<EpicCreature[]>([]);
  const [heroes, setHeroes] = useState<EpicHero[]>([]);
  const [buildingImages, setBuildingImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showGoldorakEasterEgg, setShowGoldorakEasterEgg] = useState(false);

  // Charge les données depuis le backend
  useEffect(() => {
    if (isVisible) {
      loadEpicContent();
      generateBuildingImages();
    }
  }, [isVisible]);

  const loadEpicContent = async () => {
    setLoading(true);
    try {
      const [creaturesData, heroesData] = await Promise.all([
        fetchEpicCreatures(),
        fetchEpicHeroes()
      ]);
      
      setCreatures(creaturesData);
      setHeroes(heroesData);
    } catch (error) {
      console.error('Error loading epic content:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateBuildingImages = async () => {
    const images: Record<string, string> = {};
    
    for (const [id, building] of Object.entries(BUILDING_IMAGES)) {
      try {
        images[id] = generateBuildingImage(building, 128);
      } catch (error) {
        console.error(`Erreur génération image ${id}:`, error);
        images[id] = '';
      }
    }
    
    setBuildingImages(images);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#2a1810',
        border: '3px solid #d4af37',
        borderRadius: '10px',
        width: '90%',
        height: '90%',
        padding: '20px',
        overflow: 'auto',
        color: '#d4af37'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, color: '#d4af37' }}>🎮 CONTENU ÉPIQUE DE HEROES OF TIME</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              onClick={() => setShowGoldorakEasterEgg(true)}
              style={{
                backgroundColor: '#4a3728',
                color: '#d4af37',
                border: '2px solid #d4af37',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              🚀 GOLDORAK
            </button>
            <button 
              onClick={onClose}
              style={{
                backgroundColor: '#8b0000',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              ✕ Fermer
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {[
            { id: 'creatures', label: '🐉 Créatures', count: creatures.length },
            { id: 'heroes', label: '🦸 Héros', count: heroes.length },
            { id: 'buildings', label: '🏰 Bâtiments', count: Object.keys(BUILDING_IMAGES).length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                backgroundColor: activeTab === tab.id ? '#d4af37' : '#4a3728',
                color: activeTab === tab.id ? '#2a1810' : '#d4af37',
                border: '2px solid #d4af37',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#d4af37' }}>
            <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
            <p>Chargement du contenu épique...</p>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <div style={{ height: 'calc(100% - 120px)', overflow: 'auto' }}>
            {activeTab === 'creatures' && (
              <div>
                <h3 style={{ color: '#d4af37' }}>🐉 CRÉATURES ÉPIQUES (Backend API)</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '15px'
                }}>
                  {creatures.map(creature => (
                    <div key={creature.id} style={{
                      backgroundColor: '#1a1a1a',
                      border: '2px solid #d4af37',
                      borderRadius: '8px',
                      padding: '15px'
                    }}>
                      <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>
                        {creature.name} (Tier {creature.tier})
                      </h4>
                      <p style={{ color: '#ffcc00', fontSize: '14px', margin: '5px 0' }}>
                        Race: {creature.race} | Tier: {creature.tier}
                      </p>
                      <p style={{ color: '#ffffff', fontSize: '12px', margin: '5px 0' }}>
                        ⚔️ ATK: {creature.attack} | 🛡️ DEF: {creature.defense} | 
                        💓 HP: {creature.health} | ⚡ Speed: {creature.speed}
                      </p>
                      <p style={{ color: '#ff6b6b', fontSize: '12px', margin: '5px 0' }}>
                        💥 Dégâts: {creature.damage[0]}-{creature.damage[1]}
                      </p>
                      <p style={{ color: '#4ecdc4', fontSize: '12px', margin: '5px 0' }}>
                        ✨ Spécial: {creature.special}
                      </p>
                      <p style={{ color: '#cccccc', fontSize: '11px', fontStyle: 'italic' }}>
                        Créature épique de tier {creature.tier}
                      </p>
                      {/* Image SVG */}
                      <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <img 
                          src={creature.spriteUrl} 
                          alt={creature.name}
                          style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'heroes' && (
              <div>
                <h3 style={{ color: '#d4af37' }}>🦸 HÉROS LÉGENDAIRES (Backend API)</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: '15px'
                }}>
                  {heroes.map(hero => (
                    <div key={hero.id} style={{
                      backgroundColor: '#1a1a1a',
                      border: '2px solid #d4af37',
                      borderRadius: '8px',
                      padding: '15px'
                    }}>
                      <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>
                        {hero.name} (Niveau {hero.level})
                      </h4>
                      <p style={{ color: '#ffcc00', fontSize: '14px', margin: '5px 0' }}>
                        {hero.race} {hero.class} | Niveau {hero.level}
                      </p>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '12px', margin: '5px 0' }}>
                        <span style={{ color: '#ff6b6b' }}>⚔️ {hero.stats.attack}</span>
                        <span style={{ color: '#4ecdc4' }}>🛡️ {hero.stats.defense}</span>
                        <span style={{ color: '#9b59b6' }}>🔮 {hero.stats.spellPower}</span>
                        <span style={{ color: '#3498db' }}>📚 {hero.stats.knowledge}</span>
                        <span style={{ color: '#f39c12' }}>😊 {hero.stats.morale}</span>
                        <span style={{ color: '#2ecc71' }}>🍀 {hero.stats.luck}</span>
                      </div>
                      <p style={{ color: '#e74c3c', fontSize: '12px', margin: '5px 0' }}>
                        ⚡ Capacité: {hero.specialAbility}
                      </p>
                      <p style={{ color: '#8e44ad', fontSize: '12px', margin: '5px 0' }}>
                        🌟 Ultimate: {hero.ultimateSkill}
                      </p>
                      <p style={{ color: '#cccccc', fontSize: '11px', fontStyle: 'italic' }}>
                        {hero.backstory}
                      </p>
                      {/* Portrait SVG */}
                      <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <img 
                          src={hero.portraitUrl} 
                          alt={hero.name}
                          style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'buildings' && (
              <div>
                <h3 style={{ color: '#d4af37' }}>🏰 BÂTIMENTS ÉPIQUES (Frontend Generated)</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '15px'
                }}>
                  {Object.values(BUILDING_IMAGES).map(building => (
                    <div key={building.id} style={{
                      backgroundColor: '#1a1a1a',
                      border: '2px solid #d4af37',
                      borderRadius: '8px',
                      padding: '15px',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>
                        {building.name}
                      </h4>
                      <div style={{
                        width: '128px',
                        height: '128px',
                        margin: '0 auto 10px auto',
                        border: '2px solid #d4af37',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#2a1810'
                      }}>
                        {buildingImages[building.id] ? (
                          <img 
                            src={buildingImages[building.id]} 
                            alt={building.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        ) : (
                          <span style={{ color: '#888', fontSize: '12px' }}>Génération...</span>
                        )}
                      </div>
                      <p style={{ color: '#ffcc00', fontSize: '14px', margin: '5px 0' }}>
                        Style: {building.style}
                      </p>
                      <p style={{ color: '#cccccc', fontSize: '12px', fontStyle: 'italic' }}>
                        {building.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Goldorak Easter Egg */}
      {showGoldorakEasterEgg && (
        <GoldorakEasterEgg 
          isActive={showGoldorakEasterEgg} 
          onClose={() => setShowGoldorakEasterEgg(false)} 
        />
      )}
    </div>
  );
};

export default EpicContentViewer; 