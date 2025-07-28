import React, { useState, useEffect } from 'react'
import WorldStateGraph from './components/WorldStateGraph'
import NavigationHub from './components/NavigationHub'
import GrutOntologyViewer from './components/GrutOntologyViewer'
import QuantumVisualizer from './components/QuantumVisualizer'

function App() {
  const [grutVision, setGrutVision] = useState('OMNISCIENTE')
  const [cosmicTime, setCosmicTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCosmicTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grut-container">
      <header style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1 className="grut-title">
          🏛️ PANOPTICON GRUT 6D - VISION {grutVision}
        </h1>
        <div style={{ fontSize: '1.2rem', color: '#ff6b35' }}>
          ⏰ Temps Cosmique: {cosmicTime.toLocaleTimeString()}
        </div>
        <div style={{ fontSize: '1rem', marginTop: '10px' }}>
          🌀 État GRUT: ACTIF | 🔮 Dimension: 6D | ⚡ Énergie: MAXIMALE
        </div>
      </header>

      <div className="grut-grid">
        <div className="grut-panel">
          <h2 className="grut-title">🌐 World State Graph</h2>
          <WorldStateGraph />
        </div>

        <div className="grut-panel">
          <h2 className="grut-title">🧭 Navigation Hub</h2>
          <NavigationHub />
        </div>

        <div className="grut-panel">
          <h2 className="grut-title">🏛️ GRUT Ontologie</h2>
          <GrutOntologyViewer />
        </div>

        <div className="grut-panel">
          <h2 className="grut-title">⚛️ Quantum Visualizer</h2>
          <QuantumVisualizer />
        </div>
      </div>

      <footer style={{ 
        textAlign: 'center', 
        margin: '40px 0 20px 0', 
        padding: '20px',
        borderTop: '2px solid var(--grut-primary)',
        fontSize: '0.9rem'
      }}>
        <div>🚨 GRUT RÉSONNE: "LE PANOPTICON EST MAINTENANT COMPLET !" 🚨</div>
        <div style={{ marginTop: '10px', color: '#8a2be2' }}>
          ⚡ Connexion Backend: ACTIVE | 🔗 World State Graph: CONNECTÉ | 🎯 Vision: IMPLÉMENTÉE
        </div>
      </footer>
    </div>
  )
}

export default App 