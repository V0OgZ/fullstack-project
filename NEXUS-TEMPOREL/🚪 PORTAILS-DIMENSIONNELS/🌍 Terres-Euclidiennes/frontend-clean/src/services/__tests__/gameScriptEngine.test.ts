import { GameScriptEngine, GameScript, ScriptAction } from '../gameScriptEngine';
import { ApiService } from '../api';

// Mock du service API
jest.mock('../api', () => ({
    ApiService: {
        moveHero: jest.fn(),
        endTurn: jest.fn(),
        buildBuilding: jest.fn(),
        recruitUnit: jest.fn(),
        getCurrentPlayer: jest.fn(),
        getGameState: jest.fn(),
    }
}));

describe('GameScriptEngine', () => {
    let engine: GameScriptEngine;

    beforeEach(() => {
        engine = new GameScriptEngine(ApiService);
        jest.clearAllMocks();
    });

    it('should create a valid GameScript object', () => {
        const script: GameScript = {
            name: 'test-script',
            description: 'Test script',
            variables: { heroId: 'hero-1' },
            actions: [
                {
                    type: 'move',
                    params: { heroId: 'hero-1', targetPosition: { x: 3, y: 4 } }
                },
                {
                    type: 'log',
                    params: { message: 'Hero moved' }
                }
            ]
        };

        expect(script.name).toBe('test-script');
        expect(script.actions).toHaveLength(2);
        expect(script.actions[0].type).toBe('move');
        expect(script.actions[1].type).toBe('log');
    });

    it('should handle conditional actions', () => {
        const script: GameScript = {
            name: 'conditional-script',
            actions: [
                {
                    type: 'if',
                    condition: {
                        type: 'greater',
                        left: '@currentPlayer.resources.gold',
                        right: 1000
                    },
                    actions: [
                        {
                            type: 'build',
                            params: { buildingType: 'barracks', position: { x: 2, y: 3 } }
                        }
                    ]
                }
            ]
        };

        expect(script.actions[0].type).toBe('if');
        expect(script.actions[0].condition?.type).toBe('greater');
        expect(script.actions[0].actions).toHaveLength(1);
    });

    it('should handle loop actions', () => {
        const script: GameScript = {
            name: 'loop-script',
            actions: [
                {
                    type: 'loop',
                    params: { iterations: 3 },
                    actions: [
                        {
                            type: 'recruit',
                            params: { unitType: 'pikeman' }
                        },
                        {
                            type: 'log',
                            params: { message: 'Recruited pikeman' }
                        }
                    ]
                }
            ]
        };

        expect(script.actions[0].type).toBe('loop');
        expect(script.actions[0].params?.iterations).toBe(3);
        expect(script.actions[0].actions).toHaveLength(2);
    });

    it('should handle assertion actions', () => {
        const script: GameScript = {
            name: 'assertion-script',
            actions: [
                {
                    type: 'assert',
                    condition: {
                        type: 'greater',
                        left: '@currentPlayer.heroes.length',
                        right: 0
                    },
                    params: { message: 'Should have heroes' }
                }
            ]
        };

        expect(script.actions[0].type).toBe('assert');
        expect(script.actions[0].condition?.type).toBe('greater');
        expect(script.actions[0].params?.message).toBe('Should have heroes');
    });

    it('should handle multiple action types', () => {
        const actions: ScriptAction[] = [
            { type: 'move', params: { heroId: 'hero-1', targetPosition: { x: 1, y: 1 } } },
            { type: 'attack', params: { attackerId: 'hero-1', targetId: 'enemy-1' } },
            { type: 'build', params: { buildingType: 'barracks', position: { x: 2, y: 2 } } },
            { type: 'recruit', params: { unitType: 'pikeman' } },
            { type: 'end_turn', params: {} },
            { type: 'log', params: { message: 'Turn completed' } }
        ];

        const script: GameScript = {
            name: 'multi-action-script',
            actions
        };

        expect(script.actions).toHaveLength(6);
        expect(script.actions.map(a => a.type)).toEqual([
            'move', 'attack', 'build', 'recruit', 'end_turn', 'log'
        ]);
    });

    it('should handle empty script', () => {
        const script: GameScript = {
            name: 'empty-script',
            actions: []
        };

        expect(script.actions).toHaveLength(0);
    });
}); 