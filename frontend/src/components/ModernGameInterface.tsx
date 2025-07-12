import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { modernTheme } from '../styles/theme';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import IsometricRenderer from './IsometricRenderer';

// Styled Components avec design moderne
const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${modernTheme.colors.background.primary};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: ${modernTheme.typography.fontFamily.primary};
`;

const TopBar = styled(motion.div)`
  height: 60px;
  background: ${modernTheme.colors.surface.primary};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${modernTheme.colors.surface.tertiary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${modernTheme.spacing.lg};
  z-index: ${modernTheme.zIndex.overlay};
`;

const GameTitle = styled.h1`
  font-family: ${modernTheme.typography.fontFamily.display};
  font-size: ${modernTheme.typography.fontSize['2xl']};
  font-weight: ${modernTheme.typography.fontWeight.bold};
  color: ${modernTheme.colors.text.primary};
  margin: 0;
  background: linear-gradient(135deg, ${modernTheme.colors.accent.primary}, ${modernTheme.colors.accent.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GameInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${modernTheme.spacing.lg};
  color: ${modernTheme.colors.text.secondary};
  font-size: ${modernTheme.typography.fontSize.sm};
`;

const ResourceBar = styled.div`
  display: flex;
  gap: ${modernTheme.spacing.md};
`;

const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${modernTheme.spacing.sm};
  padding: ${modernTheme.spacing.sm} ${modernTheme.spacing.md};
  background: ${modernTheme.colors.surface.secondary};
  border-radius: ${modernTheme.borderRadius.lg};
  border: 1px solid ${modernTheme.colors.surface.tertiary};
  
  .icon {
    font-size: ${modernTheme.typography.fontSize.lg};
  }
  
  .value {
    font-family: ${modernTheme.typography.fontFamily.secondary};
    font-weight: ${modernTheme.typography.fontWeight.medium};
    color: ${modernTheme.colors.text.primary};
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: ${modernTheme.spacing.sm};
`;

const ActionButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: ${modernTheme.spacing.sm} ${modernTheme.spacing.md};
  background: ${props => props.variant === 'primary' 
    ? modernTheme.colors.accent.primary 
    : modernTheme.colors.surface.secondary};
  color: ${props => props.variant === 'primary' 
    ? modernTheme.colors.background.primary 
    : modernTheme.colors.text.primary};
  border: 1px solid ${props => props.variant === 'primary' 
    ? modernTheme.colors.accent.primary 
    : modernTheme.colors.surface.tertiary};
  border-radius: ${modernTheme.borderRadius.lg};
  font-family: ${modernTheme.typography.fontFamily.primary};
  font-size: ${modernTheme.typography.fontSize.sm};
  font-weight: ${modernTheme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${modernTheme.transitions.fast};
  
  &:hover {
    background: ${props => props.variant === 'primary' 
      ? modernTheme.colors.accent.primary 
      : modernTheme.colors.surface.hover};
    transform: translateY(-1px);
    box-shadow: ${modernTheme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const LanguageToggle = styled.div`
  display: flex;
  background: ${modernTheme.colors.surface.secondary};
  border-radius: ${modernTheme.borderRadius.full};
  padding: 2px;
  border: 1px solid ${modernTheme.colors.surface.tertiary};
`;

const LanguageButton = styled.button<{ active: boolean }>`
  padding: ${modernTheme.spacing.sm} ${modernTheme.spacing.md};
  background: ${props => props.active ? modernTheme.colors.accent.primary : 'transparent'};
  color: ${props => props.active ? modernTheme.colors.background.primary : modernTheme.colors.text.secondary};
  border: none;
  border-radius: ${modernTheme.borderRadius.full};
  font-size: ${modernTheme.typography.fontSize.xs};
  font-weight: ${modernTheme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${modernTheme.transitions.fast};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

const MapContainer = styled.div`
  flex: 1;
  position: relative;
  background: ${modernTheme.colors.background.secondary};
`;

const SidePanel = styled(motion.div)<{ isOpen: boolean }>`
  width: ${props => props.isOpen ? '320px' : '60px'};
  background: ${modernTheme.colors.surface.primary};
  backdrop-filter: blur(20px);
  border-left: 1px solid ${modernTheme.colors.surface.tertiary};
  transition: width ${modernTheme.transitions.normal};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PanelToggle = styled(motion.button)`
  width: 60px;
  height: 60px;
  background: ${modernTheme.colors.surface.secondary};
  border: none;
  border-bottom: 1px solid ${modernTheme.colors.surface.tertiary};
  color: ${modernTheme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${modernTheme.typography.fontSize.lg};
  
  &:hover {
    background: ${modernTheme.colors.surface.hover};
  }
`;

const PanelContent = styled.div`
  padding: ${modernTheme.spacing.lg};
  flex: 1;
  overflow-y: auto;
`;

const HeroCard = styled(motion.div)`
  background: ${modernTheme.colors.surface.secondary};
  border-radius: ${modernTheme.borderRadius.xl};
  padding: ${modernTheme.spacing.lg};
  margin-bottom: ${modernTheme.spacing.md};
  border: 1px solid ${modernTheme.colors.surface.tertiary};
  cursor: pointer;
  
  &:hover {
    background: ${modernTheme.colors.surface.hover};
    transform: translateY(-2px);
    box-shadow: ${modernTheme.shadows.lg};
  }
`;

const HeroName = styled.h3`
  color: ${modernTheme.colors.text.primary};
  font-size: ${modernTheme.typography.fontSize.lg};
  font-weight: ${modernTheme.typography.fontWeight.semibold};
  margin: 0 0 ${modernTheme.spacing.sm} 0;
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${modernTheme.spacing.sm};
  font-size: ${modernTheme.typography.fontSize.sm};
  color: ${modernTheme.colors.text.secondary};
`;

const StatusIndicator = styled.div<{ status: 'active' | 'idle' | 'moving' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch (props.status) {
      case 'active': return modernTheme.colors.accent.success;
      case 'moving': return modernTheme.colors.accent.warning;
      default: return modernTheme.colors.text.tertiary;
    }
  }};
  margin-right: ${modernTheme.spacing.sm};
`;

const ModernGameInterface: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'heroes' | 'actions' | 'politics'>('heroes');
  
  const { 
    currentGame, 
    currentPlayer, 
    pendingActions,
    endTurn,
    nextPlayer 
  } = useGameStore();

  if (!currentGame || !currentPlayer) {
    return (
      <GameContainer>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: modernTheme.colors.text.secondary 
        }}>
          {t('loading')}
        </div>
      </GameContainer>
    );
  }

  const handleEndTurn = () => {
    if (currentGame.gameMode === 'hotseat') {
      nextPlayer();
    } else {
      endTurn();
    }
  };

  return (
    <GameContainer>
      {/* Top Bar Moderne */}
      <TopBar
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: modernTheme.spacing.lg }}>
          <GameTitle>Heroes Reforged</GameTitle>
          <GameInfo>
            <span>{t('turn')} {currentGame.currentTurn}</span>
            <span>•</span>
            <span>{currentPlayer.username}</span>
          </GameInfo>
        </div>

        <ResourceBar>
          <ResourceItem>
            <span className="icon">💰</span>
            <span className="value">{currentPlayer.resources.gold}</span>
          </ResourceItem>
          <ResourceItem>
            <span className="icon">🪵</span>
            <span className="value">{currentPlayer.resources.wood}</span>
          </ResourceItem>
          <ResourceItem>
            <span className="icon">🗿</span>
            <span className="value">{currentPlayer.resources.stone}</span>
          </ResourceItem>
          <ResourceItem>
            <span className="icon">💎</span>
            <span className="value">{currentPlayer.resources.mana}</span>
          </ResourceItem>
        </ResourceBar>

        <ActionBar>
          <ActionButton
            variant="primary"
            onClick={handleEndTurn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentGame.gameMode === 'hotseat' ? t('nextPlayer') : t('endTurn')}
          </ActionButton>
          
          <LanguageToggle>
            <LanguageButton 
              active={language === 'fr'} 
              onClick={() => setLanguage('fr')}
            >
              🇫🇷 FR
            </LanguageButton>
            <LanguageButton 
              active={language === 'en'} 
              onClick={() => setLanguage('en')}
            >
              🇬🇧 EN
            </LanguageButton>
          </LanguageToggle>
        </ActionBar>
      </TopBar>

      {/* Contenu Principal */}
      <MainContent>
        {/* Map Container - 80% de l'écran */}
        <MapContainer>
          <IsometricRenderer width={1200} height={800} />
        </MapContainer>

        {/* Side Panel Moderne */}
        <SidePanel isOpen={sidePanelOpen}>
          <PanelToggle 
            onClick={() => setSidePanelOpen(!sidePanelOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {sidePanelOpen ? '→' : '←'}
          </PanelToggle>

          <AnimatePresence>
            {sidePanelOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ flex: 1 }}
              >
                <PanelContent>
                  {/* Tabs */}
                  <div style={{ 
                    display: 'flex', 
                    gap: modernTheme.spacing.sm, 
                    marginBottom: modernTheme.spacing.lg 
                  }}>
                    {(['heroes', 'actions', 'politics'] as const).map(tab => (
                      <ActionButton
                        key={tab}
                        variant={activeTab === tab ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab(tab)}
                        style={{ flex: 1 }}
                      >
                        {tab === 'heroes' && '⚔️'}
                        {tab === 'actions' && '📋'}
                        {tab === 'politics' && '🏛️'}
                      </ActionButton>
                    ))}
                  </div>

                  {/* Heroes Tab */}
                  {activeTab === 'heroes' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 style={{ 
                        color: modernTheme.colors.text.primary, 
                        marginBottom: modernTheme.spacing.lg,
                        fontSize: modernTheme.typography.fontSize.lg
                      }}>
                        {t('myHeroes')}
                      </h3>
                      
                      {currentPlayer.heroes.map(hero => (
                        <HeroCard
                          key={hero.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: modernTheme.spacing.sm }}>
                            <StatusIndicator status="active" />
                            <HeroName>{hero.name}</HeroName>
                          </div>
                          
                          <HeroStats>
                            <div>Lvl {hero.level}</div>
                            <div>MP: {hero.movementPoints}/{hero.maxMovementPoints}</div>
                            <div>Pos: ({hero.position.x}, {hero.position.y})</div>
                            <div>Units: {hero.units.length}</div>
                          </HeroStats>
                        </HeroCard>
                      ))}
                    </motion.div>
                  )}

                  {/* Actions Tab */}
                  {activeTab === 'actions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 style={{ 
                        color: modernTheme.colors.text.primary, 
                        marginBottom: modernTheme.spacing.lg 
                      }}>
                        Actions en Cours
                      </h3>
                      
                      {pendingActions.length === 0 ? (
                        <div style={{ 
                          color: modernTheme.colors.text.tertiary,
                          textAlign: 'center',
                          padding: modernTheme.spacing.xl
                        }}>
                          Aucune action en cours
                        </div>
                      ) : (
                        pendingActions.map(action => (
                          <HeroCard key={action.id}>
                            <div>{action.type}</div>
                            <div style={{ color: modernTheme.colors.text.secondary }}>
                              {action.status}
                            </div>
                          </HeroCard>
                        ))
                      )}
                    </motion.div>
                  )}

                  {/* Politics Tab */}
                  {activeTab === 'politics' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 style={{ 
                        color: modernTheme.colors.text.primary, 
                        marginBottom: modernTheme.spacing.lg 
                      }}>
                        Conseil Politique
                      </h3>
                      
                      <ActionButton
                        variant="primary"
                        style={{ width: '100%' }}
                        onClick={() => {/* Open political system */}}
                      >
                        🏛️ Ouvrir le Conseil
                      </ActionButton>
                    </motion.div>
                  )}
                </PanelContent>
              </motion.div>
            )}
          </AnimatePresence>
        </SidePanel>
      </MainContent>
    </GameContainer>
  );
};

export default ModernGameInterface; 