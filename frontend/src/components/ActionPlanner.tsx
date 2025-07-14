import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { Hero, GameAction } from '../types/game';
import { GAME_ICONS } from '../constants/gameIcons';
import UnitRecruitment from './UnitRecruitment';

interface ActionPlannerProps {
  selectedHero: Hero | null;
  onActionSelected: (action: GameAction) => void;
  onHeroSelected: (hero: Hero | null) => void;
  isPlanning: boolean;
  availableHeroes: Hero[];
}

const ActionPlanner: React.FC<ActionPlannerProps> = ({
  selectedHero,
  onActionSelected,
  onHeroSelected,
  isPlanning,
  availableHeroes
}) => {
  const { t } = useTranslation();
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null);
  const [showRecruitment, setShowRecruitment] = useState(false);

  if (!selectedHero) {
    return (
      <div className="action-planner">
        <h3 className="title-small">{GAME_ICONS.UI_SETTINGS} {t('actionPlanner')}</h3>
        <div className="hero-selector">
          <h4 className="title-small">{t('selectHero')}</h4>
          <div className="hero-list">
            {availableHeroes.map(hero => (
              <div
                key={hero.id}
                className="hero-option"
                onClick={() => onHeroSelected(hero)}
              >
                <div className="hero-name">{hero.name}</div>
                <div className="hero-details">
                  Lvl {hero.level} • MP: {hero.movementPoints}/{hero.maxMovementPoints}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-light opacity-80">{t('selectHeroForPlanning')}</p>
      </div>
    );
  }

  return (
    <div className="action-planner">
      <h3 className="title-small">{GAME_ICONS.UI_SETTINGS} {t('actionPlanner')}</h3>
      
      {/* Héros sélectionné */}
      <div className="selected-hero">
        <div className="hero-info">
          <div className="hero-name">{selectedHero.name}</div>
          <div className="hero-level">{t('level')} {selectedHero.level}</div>
          <div className="hero-position">
            {t('position')}: ({selectedHero.position.x}, {selectedHero.position.y})
          </div>
          <div className="hero-mp">
            {t('movementPoints')}: {selectedHero.movementPoints}/{selectedHero.maxMovementPoints}
          </div>
        </div>
        <button
          onClick={() => onHeroSelected(null)}
          className="btn"
          style={{ marginTop: '10px', fontSize: '12px', padding: '8px 16px' }}
        >
          {GAME_ICONS.UI_CLOSE} {t('changeHero')}
        </button>
      </div>

      {/* Actions rapides */}
      <div>
        <h4 className="title-small">{t('quickActions')}</h4>
        <div className="quick-actions">
          <button
            className="quick-action-btn"
            disabled={isPlanning || selectedHero.movementPoints === 0}
            onClick={() => setSelectedAction({ type: 'move' } as GameAction)}
          >
            {GAME_ICONS.ACTION_MOVE} {t('move')}
          </button>
          <button
            className="quick-action-btn"
            disabled={isPlanning}
            onClick={() => setSelectedAction({ type: 'attack' } as GameAction)}
          >
            {GAME_ICONS.ACTION_ATTACK} {t('attack')}
          </button>
          <button
            className="quick-action-btn"
            disabled={isPlanning}
            onClick={() => setSelectedAction({ type: 'collect' } as GameAction)}
          >
            {GAME_ICONS.ACTION_COLLECT} {t('collect')}
          </button>
          <button
            className="quick-action-btn"
            disabled={isPlanning}
            onClick={() => setShowRecruitment(true)}
          >
            {GAME_ICONS.ACTION_RECRUIT} {t('recruit')}
          </button>
        </div>
      </div>

      {/* Action instructions */}
      {selectedAction && (
        <div className="hero-info">
          <p className="text-light">
            {selectedAction.type === 'move' && t('clickMapToMove')}
            {selectedAction.type === 'attack' && t('clickEnemyToAttack')}
            {selectedAction.type === 'collect' && t('clickObjectToCollect')}
          </p>
          <button
            onClick={() => setSelectedAction(null)}
            className="btn"
            style={{ marginTop: '10px', fontSize: '12px', padding: '8px 16px' }}
          >
            {GAME_ICONS.UI_CLOSE} {t('cancel')}
          </button>
        </div>
      )}

      {/* Unit Recruitment Modal */}
      <UnitRecruitment
        isVisible={showRecruitment}
        onClose={() => setShowRecruitment(false)}
        selectedBuilding={undefined} // Will be enhanced later with castle selection
      />
    </div>
  );
};

export default ActionPlanner; 