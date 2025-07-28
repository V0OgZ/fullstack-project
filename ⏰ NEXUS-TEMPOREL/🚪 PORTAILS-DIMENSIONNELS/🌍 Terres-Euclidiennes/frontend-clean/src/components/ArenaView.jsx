import React, { useState, useEffect } from 'react';
import './ArenaView.css';

/**
 * ArenaView - Composant principal du mode ARÈNE
 * Point d'entrée pour les combats rapides et spectaculaires
 */
const ArenaView = () => {
    const [arenaState, setArenaState] = useState({
        world: null,
        heroes: [],
        selectedHero: null,
        currentBattle: null,
        judge: null,
        comments: [],
        loading: true,
        error: null
    });

    const [viewMode, setViewMode] = useState('hero_selection'); // hero_selection, battle, results

    useEffect(() => {
        initializeArena();
    }, []);

    const initializeArena = async () => {
        try {
            setArenaState(prev => ({ ...prev, loading: true, error: null }));

            // Charger l'état du monde arène
            const worldResponse = await fetch('/api/arena/world');
            const worldData = await worldResponse.json();

            // Charger les héros disponibles
            const heroesResponse = await fetch('/api/arena/heroes');
            const heroesData = await heroesResponse.json();

            // Charger les infos du juge
            const judgeResponse = await fetch('/api/arena/judge');
            const judgeData = await judgeResponse.json();

            // Charger les commentaires récents
            const commentsResponse = await fetch('/api/arena/comments?limit=5');
            const commentsData = await commentsResponse.json();

            setArenaState(prev => ({
                ...prev,
                world: worldData,
                heroes: heroesData,
                judge: judgeData,
                comments: commentsData,
                loading: false
            }));

            console.log('[ARENA] Arène initialisée:', worldData.name);
        } catch (error) {
            console.error('[ARENA] Erreur d\'initialisation:', error);
            setArenaState(prev => ({
                ...prev,
                loading: false,
                error: 'Erreur lors de l\'initialisation de l\'arène'
            }));
        }
    };

    const selectHero = async (hero) => {
        try {
            const response = await fetch('/api/arena/heroes/select', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    heroId: hero.id,
                    playerId: 'player_1' // Pour l'instant, joueur unique
                })
            });

            if (response.ok) {
                setArenaState(prev => ({ ...prev, selectedHero: hero }));
                console.log('[ARENA] Héros sélectionné:', hero.name);
            }
        } catch (error) {
            console.error('[ARENA] Erreur de sélection de héros:', error);
        }
    };

    const startBattle = async () => {
        if (!arenaState.selectedHero) {
            alert('Veuillez sélectionner un héros avant de commencer le combat!');
            return;
        }

        try {
            const battleConfig = {
                heroes: [arenaState.selectedHero],
                mode: 'CLASSIC',
                playerId: 'player_1'
            };

            const response = await fetch('/api/arena/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(battleConfig)
            });

            const result = await response.json();

            if (response.ok) {
                setArenaState(prev => ({
                    ...prev,
                    currentBattle: result
                }));
                setViewMode('battle');

                // Ajouter le commentaire du juge s'il y en a un
                if (result.judgeComment) {
                    setArenaState(prev => ({
                        ...prev,
                        comments: [result.judgeComment, ...prev.comments.slice(0, 9)]
                    }));
                }

                console.log('[ARENA] Combat démarré:', result.battleId);
            }
        } catch (error) {
            console.error('[ARENA] Erreur de démarrage de combat:', error);
        }
    };

    const executeAction = async (actionType) => {
        if (!arenaState.currentBattle || !arenaState.selectedHero) return;

        try {
            const actionData = {
                type: actionType,
                heroId: arenaState.selectedHero.id,
                battleId: arenaState.currentBattle.battleId
            };

            const response = await fetch('/api/arena/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(actionData)
            });

            const result = await response.json();

            if (response.ok) {
                // Ajouter le commentaire du juge s'il y en a un
                if (result.judgeComment) {
                    setArenaState(prev => ({
                        ...prev,
                        comments: [result.judgeComment, ...prev.comments.slice(0, 9)]
                    }));
                }

                console.log('[ARENA] Action exécutée:', result);
            }
        } catch (error) {
            console.error('[ARENA] Erreur d\'action:', error);
        }
    };

    const resetArena = async () => {
        try {
            const response = await fetch('/api/arena/world/reset', {
                method: 'POST'
            });

            if (response.ok) {
                setViewMode('hero_selection');
                setArenaState(prev => ({
                    ...prev,
                    selectedHero: null,
                    currentBattle: null
                }));
                await initializeArena();
            }
        } catch (error) {
            console.error('[ARENA] Erreur de reset:', error);
        }
    };

    if (arenaState.loading) {
        return (
            <div className="arena-view loading">
                <div className="loading-spinner">
                    <h2>🌀 Initialisation de l'Arène Interdimensionnelle...</h2>
                    <p>Préparation des paradoxes temporels en cours...</p>
                </div>
            </div>
        );
    }

    if (arenaState.error) {
        return (
            <div className="arena-view error">
                <div className="error-message">
                    <h2>❌ Erreur d'Arène</h2>
                    <p>{arenaState.error}</p>
                    <button onClick={initializeArena} className="retry-button">
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="arena-view">
            {/* Header avec Grut et informations */}
            <div className="arena-header">
                <div className="grut-observer">
                    <div className="grut-icon">🧙‍♂️</div>
                    <div className="grut-text">Grut observe...</div>
                </div>
                <div className="arena-title">
                    <h1>⚔️ {arenaState.world?.name || 'Arène Interdimensionnelle'}</h1>
                    <div className="arena-status">
                        {arenaState.world?.isInBattle ? '🔥 Combat en cours' : '✨ Prête pour l\'action'}
                    </div>
                </div>
                <div className="arena-controls">
                    <button onClick={resetArena} className="reset-button">
                        🔄 Reset Arène
                    </button>
                </div>
            </div>

            {/* Zone de commentaires du Juge */}
            <div className="judge-comments-section">
                <div className="judge-info">
                    <div className="judge-avatar">⚖️</div>
                    <div className="judge-name">{arenaState.judge?.name || 'Le Juge de l\'Arène'}</div>
                </div>
                <div className="comments-feed">
                    {arenaState.comments.length > 0 ? (
                        arenaState.comments.slice(0, 3).map((comment, index) => (
                            <div key={comment.id || index} className={`comment ${comment.priority?.toLowerCase() || 'normal'}`}>
                                <div className="comment-text">{comment.text}</div>
                                <div className="comment-time">
                                    {new Date(comment.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-comments">
                            <em>Le Juge se prépare à commenter...</em>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenu principal selon le mode */}
            <div className="arena-main-content">
                {viewMode === 'hero_selection' && (
                    <div className="hero-selection-view">
                        <h2>🦸 Sélection du Héros</h2>
                        <div className="heroes-grid">
                            {arenaState.heroes.map(hero => (
                                <div 
                                    key={hero.id} 
                                    className={`hero-card ${arenaState.selectedHero?.id === hero.id ? 'selected' : ''}`}
                                    onClick={() => selectHero(hero)}
                                >
                                    <div className="hero-faction">{hero.faction}</div>
                                    <div className="hero-name">{hero.name}</div>
                                    <div className="hero-level">Niveau {hero.level}</div>
                                    <div className="hero-spell">🔮 {hero.availableSpell}</div>
                                    <div className="hero-stats">
                                        <div>❤️ {hero.stats?.health || 100}</div>
                                        <div>🔷 {hero.stats?.mana || 50}</div>
                                        <div>⚔️ {hero.stats?.attack || 25}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {arenaState.selectedHero && (
                            <div className="start-battle-section">
                                <h3>Héros sélectionné: {arenaState.selectedHero.name}</h3>
                                <button onClick={startBattle} className="start-battle-button">
                                    ⚡ Commencer le Combat !
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {viewMode === 'battle' && (
                    <div className="battle-view">
                        <h2>⚔️ Combat en Cours</h2>
                        <div className="battle-info">
                            <div className="current-hero">
                                <h3>{arenaState.selectedHero?.name}</h3>
                                <div className="hero-stats-battle">
                                    <div className="stat">❤️ 100/100</div>
                                    <div className="stat">🔷 50/50</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="battle-arena">
                            <div className="hexagonal-grid">
                                {/* Grille hexagonale simplifiée pour l'instant */}
                                <div className="hex-grid-placeholder">
                                    <div className="hex-tile hero-position">🦸</div>
                                    <div className="hex-tile empty"></div>
                                    <div className="hex-tile empty"></div>
                                    <div className="hex-tile empty"></div>
                                    <div className="hex-tile enemy-position">🤖</div>
                                </div>
                            </div>
                        </div>

                        <div className="battle-actions">
                            <button onClick={() => executeAction('attack')} className="action-button attack">
                                ⚔️ Attaquer
                            </button>
                            <button onClick={() => executeAction('spell')} className="action-button spell">
                                🔮 Sort Temporel
                            </button>
                            <button onClick={() => executeAction('move')} className="action-button move">
                                🏃 Déplacer
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer avec statistiques */}
            <div className="arena-footer">
                <div className="arena-stats">
                    <div className="stat-item">
                        <span className="stat-label">Héros disponibles:</span>
                        <span className="stat-value">{arenaState.heroes.length}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Juge actif:</span>
                        <span className="stat-value">{arenaState.judge?.active ? '✅' : '❌'}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Mode:</span>
                        <span className="stat-value">Classique</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArenaView;