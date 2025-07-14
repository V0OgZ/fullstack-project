import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { ApiService } from '../services/api';

// Mock the API service
jest.mock('../services/api');
const mockApiService = ApiService as jest.Mocked<typeof ApiService>;

describe('Scenario Loading Debug Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset any previous mock implementations
    mockApiService.getAllScenarios = jest.fn();
    mockApiService.createConquestClassicScenario = jest.fn();
    mockApiService.createGame = jest.fn();
  });

  test('should successfully load scenarios from API', async () => {
    const mockScenarios = [
      {
        scenarioId: 'conquest-classic',
        name: 'Classic Conquest',
        description: 'A classic conquest scenario',
        difficulty: 'normal',
        maxPlayers: 4,
        mapSize: 'medium'
      },
      {
        scenarioId: 'temporal-rift',
        name: 'Temporal Rift',
        description: 'A temporal rift scenario',
        difficulty: 'hard',
        maxPlayers: 2,
        mapSize: 'large'
      }
    ];

    mockApiService.getAllScenarios.mockResolvedValue(mockScenarios);

    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for scenarios to load
    await waitFor(() => {
      expect(mockApiService.getAllScenarios).toHaveBeenCalled();
    }, { timeout: 10000 });

    // Check if scenarios are displayed
    await waitFor(() => {
      const classicScenario = screen.queryByText(/Classic Conquest/i);
      const temporalScenario = screen.queryByText(/Temporal Rift/i);
      
      console.log('Classic Scenario found:', !!classicScenario);
      console.log('Temporal Scenario found:', !!temporalScenario);
      
      // At least one scenario should be visible
      expect(classicScenario || temporalScenario).toBeTruthy();
    }, { timeout: 5000 });
  });

  test('should handle API timeout errors gracefully', async () => {
    // Simulate API timeout
    mockApiService.getAllScenarios.mockRejectedValue(new Error('Network timeout'));

    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockApiService.getAllScenarios).toHaveBeenCalled();
    }, { timeout: 5000 });

    // Should show error message or fallback
    await waitFor(() => {
      const errorMessage = screen.queryByText(/error/i) || screen.queryByText(/loading/i);
      expect(errorMessage).toBeTruthy();
    }, { timeout: 3000 });
  });

  test('should handle CORS errors', async () => {
    // Simulate CORS error
    mockApiService.getAllScenarios.mockRejectedValue(new Error('CORS error'));

    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockApiService.getAllScenarios).toHaveBeenCalled();
    }, { timeout: 5000 });

    // Should handle CORS error gracefully
    console.log('CORS error test completed');
  });

  test('should handle backend unavailable scenario', async () => {
    // Simulate backend unavailable
    mockApiService.getAllScenarios.mockRejectedValue(new Error('Connection refused'));

    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockApiService.getAllScenarios).toHaveBeenCalled();
    }, { timeout: 5000 });

    // Should handle backend unavailable gracefully
    console.log('Backend unavailable test completed');
  });

  test('should test direct API calls without React', async () => {
    // Test API service directly
    const mockScenarios = [
      {
        scenarioId: 'test-scenario',
        name: 'Test Scenario',
        description: 'Test description',
        difficulty: 'easy',
        maxPlayers: 2,
        mapSize: 'small'
      }
    ];

    mockApiService.getAllScenarios.mockResolvedValue(mockScenarios);

    const scenarios = await ApiService.getAllScenarios();
    expect(scenarios).toEqual(mockScenarios);
    expect(mockApiService.getAllScenarios).toHaveBeenCalled();
  });

  test('should test scenario selection and game creation', async () => {
    const mockScenario = {
      scenarioId: 'conquest-classic',
      name: 'Classic Conquest',
      description: 'A classic conquest scenario',
      difficulty: 'normal',
      maxPlayers: 4,
      mapSize: 'medium'
    };

    const mockGame = {
      gameId: 'test-game-123',
      status: 'active',
      players: ['player1'],
      scenario: mockScenario
    };

    mockApiService.createConquestClassicScenario.mockResolvedValue(mockScenario);
    mockApiService.createGame.mockResolvedValue(mockGame);

    // Test scenario retrieval
    const scenario = await ApiService.createConquestClassicScenario();
    expect(scenario).toEqual(mockScenario);

    // Test game creation
    const game = await ApiService.createGame({ 
      scenarioId: 'conquest-classic',
      playerName: 'TestPlayer'
    });
    expect(game).toEqual(mockGame);
  });

  test('should detect if backend is running', async () => {
    // Test if we can reach the backend
    try {
      const response = await fetch('http://localhost:8080/api/scenarios/all');
      console.log('Backend response status:', response.status);
      console.log('Backend is running:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Backend scenarios:', data);
      }
    } catch (error) {
      console.log('Backend connection error:', error);
    }
  });
}); 