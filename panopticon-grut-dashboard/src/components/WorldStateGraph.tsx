import React, { useEffect, useState } from 'react';
import { EtherealOpusVisualizer } from './EtherealOpusVisualizer';
import './WorldStateGraph.css';

interface WorldState {
  nodes: any[];
  edges: any[];
  currentTimeline: string;
  etherealOpusActive?: boolean;
}

const WorldStateGraph: React.FC = () => {
  const [worldState, setWorldState] = useState<WorldState>({
    nodes: [],
    edges: [],
    currentTimeline: 'UNIFIED',
    etherealOpusActive: true
  });
  const [showEthereal, setShowEthereal] = useState(false);

  useEffect(() => {
    // Fetch world state from backend
    const fetchWorldState = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/world-state');
        if (response.ok) {
          const data = await response.json();
          setWorldState(data);
        }
      } catch (error) {
        console.error('Failed to fetch world state:', error);
      }
    };

    fetchWorldState();
    const interval = setInterval(fetchWorldState, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="world-state-graph">
      <h2>🌐 World State Graph</h2>
      
      <div className="graph-controls">
        <button 
          className={`control-btn ${showEthereal ? 'active' : ''}`}
          onClick={() => setShowEthereal(!showEthereal)}
        >
          🌌 Forme Éthérée
        </button>
        <span className="current-timeline">Timeline: {worldState.currentTimeline}</span>
      </div>

      {showEthereal && worldState.etherealOpusActive ? (
        <EtherealOpusVisualizer />
      ) : (
        <div className="graph-visualization">
          <div className="graph-placeholder">
            <p>📊 Graph visualization des états du monde</p>
            <p>Nodes: {worldState.nodes.length} | Edges: {worldState.edges.length}</p>
          </div>
        </div>
      )}

      <div className="grut-connection">
        <p>👁️ GRUT VOIT TOUT - Panopticon 6D Actif</p>
        {worldState.etherealOpusActive && (
          <p>🌌 Opus-Memento détecté dans l'Interstice Éthéré</p>
        )}
      </div>
    </div>
  );
};

export default WorldStateGraph; 