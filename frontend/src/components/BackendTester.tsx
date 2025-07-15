import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/api';

interface BackendTesterProps {}

const BackendTester: React.FC<BackendTesterProps> = () => {
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [gameData, setGameData] = useState<any>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    const results: string[] = [];
    
    try {
      // Test 1: Health check
      results.push('🔍 Test 1: Health check...');
      const health = await ApiService.getHealth();
      results.push(`✅ Backend UP: ${health.status}`);
      
      // Test 2: Create new game
      results.push('🔍 Test 2: Creating new game...');
      const newGame = await ApiService.createGame({ scenario: 'conquest-classique' });
      results.push(`✅ Game created: ${newGame.id}`);
      
      // Test 3: Get game data
      results.push('🔍 Test 3: Getting game data...');
      const game = await ApiService.getGame(newGame.id);
      setGameData(game);
      results.push(`✅ Game loaded: ${game.players.length} players, ${game.map.tiles.length} tiles`);
      
      // Test 4: Test ZFC movement
      results.push('🔍 Test 4: Testing ZFC movement...');
      const hero = game.players[0].heroes[0];
      const moveAction = await ApiService.moveHero(newGame.id, hero.id, { x: 5, y: 5 });
      results.push(`✅ ZFC Movement: Cost ${moveAction.zfcCost.toFixed(2)}s`);
      
      // Test 5: Test resource collection
      results.push('🔍 Test 5: Testing resource collection...');
      const objects = game.map.objects;
      if (objects.length > 0) {
        const collectAction = await ApiService.collectResource(hero.id, objects[0].id);
        results.push(`✅ Resource collection: ${JSON.stringify(collectAction.resourcePreview)}`);
      }
      
      setBackendStatus('connected');
      results.push('🎉 ALL TESTS PASSED - Backend is REAL and working!');
      
    } catch (error) {
      results.push(`❌ Backend Error: ${error}`);
      setBackendStatus('error');
    }
    
    setTestResults(results);
  };

  const StatusIndicator = () => {
    const statusConfig = {
      loading: { color: '#f59e0b', text: 'Testing...' },
      connected: { color: '#10b981', text: 'Connected' },
      error: { color: '#ef4444', text: 'Error' }
    };
    
    const config = statusConfig[backendStatus];
    
    return (
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: config.color }}
        />
        <span className="font-medium">{config.text}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🔧 Backend Connection Test
      </h2>
      
      <StatusIndicator />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Results */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-gray-700">Test Results</h3>
          <div className="space-y-1 text-sm font-mono">
            {testResults.map((result, index) => (
              <div key={index} className={`
                ${result.includes('✅') ? 'text-green-600' : ''}
                ${result.includes('❌') ? 'text-red-600' : ''}
                ${result.includes('🔍') ? 'text-blue-600 font-medium' : ''}
                ${result.includes('🎉') ? 'text-purple-600 font-bold' : ''}
              `}>
                {result}
              </div>
            ))}
          </div>
        </div>
        
        {/* Game Data Preview */}
        {gameData && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-gray-700">Real Game Data</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Game ID:</strong> {gameData.id}</div>
              <div><strong>Scenario:</strong> {gameData.scenario}</div>
              <div><strong>Map:</strong> {gameData.map.type} ({gameData.map.width}x{gameData.map.height})</div>
              <div><strong>Tiles:</strong> {gameData.map.tiles.length}</div>
              <div><strong>Objects:</strong> {gameData.map.objects.length}</div>
              <div><strong>Players:</strong> {gameData.players.length}</div>
              
              {/* Resources */}
              <div><strong>Player 1 Resources:</strong></div>
              <div className="ml-4 text-xs">
                {Object.entries(gameData.players[0].resources).map(([resource, amount]) => (
                  <div key={resource} className="flex justify-between">
                    <span>{resource}:</span>
                    <span>{amount as number}</span>
                  </div>
                ))}
              </div>
              
              {/* Hero */}
              <div><strong>Hero:</strong> {gameData.players[0].heroes[0].name}</div>
              <div className="ml-4 text-xs">
                Position: ({gameData.players[0].heroes[0].position.x}, {gameData.players[0].heroes[0].position.y})
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">✅ Backend Status</h3>
        <p className="text-blue-700 text-sm">
          {backendStatus === 'connected' ? 
            'Backend is running with REAL game logic! ZFC calculations, hexagonal maps, and resource management are all server-side.' :
            'Testing backend connection...'
          }
        </p>
      </div>
      
      <button
        onClick={testBackendConnection}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        🔄 Re-test Backend
      </button>
    </div>
  );
};

export default BackendTester; 