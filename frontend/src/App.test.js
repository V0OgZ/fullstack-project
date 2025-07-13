import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Heroes of Time app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Heroes of Time/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders game options', () => {
  render(<App />);
  const classicGame = screen.getByText(/Classic Conquest/i);
  const mysticalGame = screen.getByText(/Mystical Conquest/i);
  const multiplayerGame = screen.getByText(/Multiplayer Arena/i);
  
  expect(classicGame).toBeInTheDocument();
  expect(mysticalGame).toBeInTheDocument();
  expect(multiplayerGame).toBeInTheDocument();
});

test('renders start game buttons', () => {
  render(<App />);
  const startButtons = screen.getAllByTestId('start-game-button');
  expect(startButtons).toHaveLength(3);
});
