// 🎮 VISUALISATEUR DE CONTENU ÉPIQUE - GAME ASSETS EDITION
// Affiche tous les assets restaurés par Memento depuis game_assets/ !

import React, { useState, useEffect } from 'react';
import { 
  fetchEpicCreatures, 
  fetchEpicHeroes, 
  fetchEpicBuildings,
  fetchEpicArtifacts,
  getServerStatus,
  EpicCreature, 
  EpicHero,
  EpicBuilding,
  EpicArtifact
} from '../services/epicContentAPI';

interface EpicContentViewerProps {
  isVisible: boolean;
  onClose: () => void;
}

const EpicContentViewer: React.FC<EpicContentViewerProps> = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'creatures' | 'heroes' | 'buildings' | 'artifacts'>('heroes');
  const [creatures, setCreatures] = useState<EpicCreature[]>([]);
  const [heroes, setHeroes] = useState<EpicHero[]>([]);
  const [buildings, setBuildings] = useState<EpicBuilding[]>([]);
  const [artifacts, setArtifacts] = useState<EpicArtifact[]>([]);
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<{
    isAvailable: boolean;
    endpoints: {
      heroes: boolean;
      creatures: boolean;
      buildings: boolean;
      artifacts?: boolean;
    };
  }>({
    isAvailable: true,
    endpoints: { heroes: true, creatures: true, buildings: true, artifacts: true }
  });

  // Charge les données depuis game_assets
  useEffect(() => {
    if (isVisible) {
      loadEpicContent();
    }
  }, [isVisible]);

  const loadEpicContent = async () => {
    setLoading(true);
    try {
      // Vérifier le status du système game_assets
      const status = await getServerStatus();
      setServerStatus(status);
      
      // Charger toutes les données depuis game_assets
      const [creaturesData, heroesData, buildingsData, artifactsData] = await Promise.all([
        fetchEpicCreatures(),
        fetchEpicHeroes(),
        fetchEpicBuildings(),
        fetchEpicArtifacts()
      ]);
      
      setCreatures(creaturesData);
      setHeroes(heroesData);
      setBuildings(buildingsData);
      setArtifacts(artifactsData);
      
      console.log('🎮 Epic Content Loaded from game_assets:', {
        creatures: creaturesData.length,
        heroes: heroesData.length,
        buildings: buildingsData.length,
        artifacts: artifactsData.length,
        systemStatus: status
      });
      
    } catch (error) {
      console.error('Error loading epic content:', error);
    } finally {
      setLoading(false);
    }
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Server Status */}
            <div style={{
              backgroundColor: serverStatus.isAvailable ? '#2d5a2d' : '#5a2d2d',
              color: serverStatus.isAvailable ? '#90EE90' : '#FF6B6B',
              padding: '5px 10px',
              borderRadius: '15px',
              fontSize: '12px',
              border: `1px solid ${serverStatus.isAvailable ? '#90EE90' : '#FF6B6B'}`
            }}>
              🟢 Game Assets System Online
            </div>
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
            { 
              id: 'heroes', 
              label: '🦸 Héros', 
              count: heroes.length,
              status: serverStatus.endpoints.heroes
            },
            { 
              id: 'creatures', 
              label: '🐉 Créatures', 
              count: creatures.length,
              status: serverStatus.endpoints.creatures
            },
            { 
              id: 'buildings', 
              label: '🏰 Bâtiments', 
              count: buildings.length,
              status: serverStatus.endpoints.buildings
            },
            { 
              id: 'artifacts', 
              label: '⚔️ Artefacts', 
              count: artifacts.length,
              status: serverStatus.endpoints.artifacts || true
            }
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
                fontWeight: 'bold',
                position: 'relative'
              }}
            >
              {tab.label} ({tab.count})
              <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: tab.status ? '#90EE90' : '#FF6B6B',
                border: '1px solid #fff'
              }} />
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#d4af37' }}>
            <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
            <p>Chargement du contenu épique...</p>
            <p style={{ fontSize: '12px', color: '#ccc' }}>
              Tentative de connexion au backend...
            </p>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <div style={{ height: 'calc(100% - 120px)', overflow: 'auto' }}>
            {activeTab === 'creatures' && (
              <div>
                <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>
                  🐉 CRÉATURES ÉPIQUES (Game Assets)
                </h3>
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
                      padding: '15px',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>
                        {creature.name}
                      </h4>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 10px auto',
                        border: '2px solid #d4af37',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#2a1810',
                        fontSize: '24px'
                      }}>
                        <img 
                          src={creature.spriteUrl} 
                          alt={creature.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = getCreatureEmoji(creature.name);
                          }}
                        />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ color: '#ffcc00', fontSize: '14px', margin: '3px 0' }}>
                          <strong>Race:</strong> {creature.race} | <strong>Tier:</strong> {creature.tier}
                        </p>
                        <p style={{ color: '#ffcc00', fontSize: '14px', margin: '3px 0' }}>
                          <strong>❤️ HP:</strong> {creature.health} | <strong>⚔️ ATK:</strong> {creature.attack} | <strong>🛡️ DEF:</strong> {creature.defense}
                        </p>
                        <p style={{ color: '#ffcc00', fontSize: '14px', margin: '3px 0' }}>
                          <strong>🏃 Speed:</strong> {creature.speed} | <strong>💰 Cost:</strong> {creature.cost}
                        </p>
                        <p style={{ color: '#90EE90', fontSize: '12px', margin: '5px 0' }}>
                          <strong>🔮 Special:</strong> {creature.special}
                        </p>
                        <p style={{ color: '#cccccc', fontSize: '11px', fontStyle: 'italic', margin: '5px 0' }}>
                          {creature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'heroes' && (
              <div>
                <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>
                  🦸 HÉROS ÉPIQUES (Game Assets)
                </h3>
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
                      padding: '15px',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>
                        {hero.name}
                      </h4>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 10px auto',
                        border: '2px solid #d4af37',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#2a1810',
                        fontSize: '24px'
                      }}>
                        <img 
                          src={hero.portraitUrl} 
                          alt={hero.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = getHeroEmoji(hero.gender);
                          }}
                        />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ color: '#ffcc00', fontSize: '14px', margin: '3px 0' }}>
                          <strong>Race:</strong> {hero.race} | <strong>Class:</strong> {hero.class}
                        </p>
                        <p style={{ color: '#ffcc00', fontSize: '14px', margin: '3px 0' }}>
                          <strong>Level:</strong> {hero.level} | <strong>XP:</strong> {hero.experience}
                        </p>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(3, 1fr)', 
                          gap: '5px',
                          margin: '8px 0',
                          fontSize: '12px'
                        }}>
                          <div style={{ color: '#FF6B6B' }}>⚔️ ATK: {hero.stats.attack}</div>
                          <div style={{ color: '#4ECDC4' }}>🛡️ DEF: {hero.stats.defense}</div>
                          <div style={{ color: '#9B59B6' }}>🔮 SP: {hero.stats.spellPower}</div>
                          <div style={{ color: '#F39C12' }}>🧠 KNW: {hero.stats.knowledge}</div>
                          <div style={{ color: '#2ECC71' }}>😊 MOR: {hero.stats.morale}</div>
                          <div style={{ color: '#E74C3C' }}>🍀 LCK: {hero.stats.luck}</div>
                        </div>
                        <p style={{ color: '#90EE90', fontSize: '11px', margin: '5px 0' }}>
                          <strong>🌟 Special:</strong> {hero.specialAbility}
                        </p>
                        <p style={{ color: '#cccccc', fontSize: '10px', fontStyle: 'italic', margin: '5px 0' }}>
                          {hero.backstory}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'buildings' && (
              <div>
                <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>
                  🏰 BÂTIMENTS ÉPIQUES (Game Assets)
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '15px'
                }}>
                  {buildings.map(building => (
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
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 10px auto',
                        border: '2px solid #d4af37',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#2a1810'
                      }}>
                        <img 
                          src={building.imageUrl} 
                          alt={building.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = getBuildingEmoji(building.type);
                          }}
                        />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ color: '#ffcc00', fontSize: '14px', margin: '3px 0' }}>
                          <strong>Race:</strong> {building.race} | <strong>Type:</strong> {building.type}
                        </p>
                        <p style={{ color: '#ffcc00', fontSize: '14px', margin: '3px 0' }}>
                          <strong>⏱️ Build Time:</strong> {building.buildTime} turns
                        </p>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          margin: '8px 0',
                          fontSize: '12px'
                        }}>
                          <div style={{ color: '#8B4513' }}>🪵 {building.cost.wood}</div>
                          <div style={{ color: '#696969' }}>🪨 {building.cost.stone}</div>
                          <div style={{ color: '#FFD700' }}>💰 {building.cost.gold}</div>
                        </div>
                        <p style={{ color: '#cccccc', fontSize: '11px', fontStyle: 'italic', margin: '5px 0' }}>
                          {building.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'artifacts' && (
              <div>
                                 <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>
                   ⚔️ ARTEFACTS ÉPIQUES (Game Assets)
                 </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '15px'
                }}>
                  {artifacts.map(artifact => (
                    <div key={artifact.id} style={{
                      backgroundColor: '#1a1a1a',
                      border: '2px solid #d4af37',
                      borderRadius: '8px',
                      padding: '15px',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>
                        {artifact.name}
                      </h4>
                                             <div style={{
                         width: '80px',
                         height: '80px',
                         margin: '0 auto 10px auto',
                         border: '2px solid #d4af37',
                         borderRadius: '5px',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         backgroundColor: '#2a1810',
                         fontSize: '24px'
                       }}>
                         <img 
                           src={artifact.iconUrl} 
                           alt={artifact.name}
                           style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                           onError={(e) => {
                             (e.target as HTMLImageElement).style.display = 'none';
                             (e.target as HTMLImageElement).parentElement!.innerHTML = getArtifactEmoji(artifact.type);
                           }}
                         />
                       </div>
                       <div style={{ textAlign: 'left' }}>
                         <p style={{ color: '#ffcc00', fontSize: '14px', margin: '3px 0' }}>
                           <strong>Type:</strong> {artifact.type} | <strong>Rarity:</strong> {artifact.rarity}
                         </p>
                         <p style={{ color: '#90EE90', fontSize: '12px', margin: '5px 0' }}>
                           <strong>⚡ Bonus:</strong> {artifact.bonus}
                         </p>
                         {artifact.effects && artifact.effects.length > 0 && (
                           <p style={{ color: '#87CEEB', fontSize: '11px', margin: '5px 0' }}>
                             <strong>🌟 Effects:</strong> {artifact.effects.join(', ')}
                           </p>
                         )}
                         <p style={{ color: '#cccccc', fontSize: '11px', fontStyle: 'italic', margin: '5px 0' }}>
                           {artifact.description}
                         </p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions pour les emojis de fallback
function getCreatureEmoji(name: string): string {
  if (name.toLowerCase().includes('dragon')) return '🐉';
  if (name.toLowerCase().includes('knight')) return '⚔️';
  if (name.toLowerCase().includes('griffin')) return '🦅';
  if (name.toLowerCase().includes('wizard')) return '🧙‍♂️';
  if (name.toLowerCase().includes('orc')) return '👹';
  if (name.toLowerCase().includes('skeleton')) return '💀';
  return '🎮';
}

function getHeroEmoji(gender: string): string {
  return gender === 'Female' ? '👸' : '🤴';
}

function getBuildingEmoji(type: string): string {
  if (type.toLowerCase().includes('castle')) return '🏰';
  if (type.toLowerCase().includes('military')) return '⚔️';
  if (type.toLowerCase().includes('magic')) return '🔮';
  if (type.toLowerCase().includes('production')) return '🔨';
  return '🏘️';
}

function getArtifactEmoji(type: string): string {
  if (type.toLowerCase().includes('weapon')) return '⚔️';
  if (type.toLowerCase().includes('armor')) return '🛡️';
  if (type.toLowerCase().includes('ring')) return '💍';
  if (type.toLowerCase().includes('shield')) return '🛡️';
  if (type.toLowerCase().includes('helmet')) return '🎩';
  if (type.toLowerCase().includes('boots')) return '👟';
  return '🎁';
}

export default EpicContentViewer; 