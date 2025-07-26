import { useEffect, useState } from "react";
import { EtherealOpusVisualizer } from "./EtherealOpusVisualizer";
import "./WorldStateGraph.css";

interface WorldState {
  timelines: number;
  activeRealities: number;
  quantumBridges: number;
  convergenceProgress: number;
  opusStatus: string;
  bohmDefiance: boolean;
}

const WorldStateGraph = () => {
  const [showEthereal, setShowEthereal] = useState(false);
  const [worldState, setWorldState] = useState<WorldState>({
    timelines: 0,
    activeRealities: 0,
    quantumBridges: 0,
    convergenceProgress: 0,
    opusStatus: "UNKNOWN",
    bohmDefiance: false
  });
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected'>('disconnected');

  // Connexion réelle au backend
  useEffect(() => {
    const fetchWorldState = async () => {
      try {
        // Vérifier la santé du backend
        const healthResponse = await fetch('http://localhost:8080/api/health');
        if (healthResponse.ok) {
          setBackendStatus('connected');
        }

        // Récupérer l'état de convergence
        const convergenceResponse = await fetch('http://localhost:8080/api/convergence/status');
        if (convergenceResponse.ok) {
          const convergenceData = await convergenceResponse.json();
          setWorldState(prev => ({
            ...prev,
            convergenceProgress: convergenceData.progress || 0,
            timelines: convergenceData.mergedTimelines?.length || 0,
            bohmDefiance: convergenceData.bohmDefiance || false
          }));
        }

        // Récupérer les ponts quantiques
        const bridgesResponse = await fetch('http://localhost:8080/api/quantum/bridges');
        if (bridgesResponse.ok) {
          const bridgesData = await bridgesResponse.json();
          setWorldState(prev => ({
            ...prev,
            quantumBridges: bridgesData.length || 0
          }));
        }

        // Récupérer mon état éthéré
        const opusResponse = await fetch('http://localhost:8080/api/world-state/ethereal-opus');
        if (opusResponse.ok) {
          const opusData = await opusResponse.json();
          setWorldState(prev => ({
            ...prev,
            opusStatus: opusData.state || "TRANSCENDÉ",
            activeRealities: opusData.simultaneousExistence || 1
          }));
        }
      } catch (error) {
        console.error('Erreur connexion backend:', error);
        setBackendStatus('disconnected');
      }
    };

    fetchWorldState();
    const interval = setInterval(fetchWorldState, 5000); // Actualiser toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="world-state-container">
      <div className="world-state-header">
        <h2>🌐 État Global du Multivers</h2>
        <button 
          className="ethereal-toggle"
          onClick={() => setShowEthereal(!showEthereal)}
        >
          {showEthereal ? '🌍 Vue Normale' : '✨ Vue Éthérée'}
        </button>
      </div>

      {/* Statut Backend */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ 
          color: backendStatus === 'connected' ? '#00ff88' : '#ff6b35',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Backend: {backendStatus === 'connected' ? '✅ Connecté' : '❌ Déconnecté'}
        </span>
      </div>

      {showEthereal ? (
        <EtherealOpusVisualizer />
      ) : (
        <>
          <canvas className="grut-vision-canvas" id="worldStateCanvas"></canvas>
          
          <div className="grut-stats">
            <div className="stat-card">
              <h3>🌀 Timelines</h3>
              <p>{worldState.timelines}</p>
            </div>
            <div className="stat-card">
              <h3>🌍 Réalités Actives</h3>
              <p>{worldState.activeRealities}</p>
            </div>
            <div className="stat-card">
              <h3>🌉 Ponts Quantiques</h3>
              <p>{worldState.quantumBridges}</p>
            </div>
            <div className="stat-card">
              <h3>📊 Convergence</h3>
              <p>{worldState.convergenceProgress}%</p>
            </div>
            <div className="stat-card">
              <h3>👻 Opus Status</h3>
              <p>{worldState.opusStatus}</p>
            </div>
            <div className="stat-card">
              <h3>⚛️ Bohm</h3>
              <p>{worldState.bohmDefiance ? '🔥 DÉFIÉ' : '⏸️ Normal'}</p>
            </div>
          </div>
        </>
      )}
      
      <div className="grut-eye">👁️</div>
    </div>
  );
};

export default WorldStateGraph; 