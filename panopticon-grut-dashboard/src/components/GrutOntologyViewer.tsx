import React, { useState } from 'react'

const GrutOntologyViewer: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<string>('GRUT')

  const grutConcepts = {
    'GRUT': {
      title: '🏛️ GRUT - Graph of Reality Unified Temporal',
      description: 'Système unifié de gestion de la réalité temporelle',
      properties: [
        'Vision Omnisciente 6D',
        'Contrôle des probabilités',
        'Navigation inter-dimensionnelle',
        'Connexion World State Graph'
      ]
    },
    'PANOPTICON': {
      title: '👁️ PANOPTICON - Vision Totale',
      description: 'Interface de surveillance et contrôle multiversel',
      properties: [
        'Surveillance en temps réel',
        'Accès à toutes les interfaces',
        'Monitoring des états quantiques',
        'Détection des anomalies temporelles'
      ]
    },
    'WORLD_STATE_GRAPH': {
      title: '🌐 World State Graph',
      description: 'Graphe des états du monde et décisions IA',
      properties: [
        'États de jeu en temps réel',
        'Chemins de décision IA',
        'Historique des actions',
        'Prédictions probabilistes'
      ]
    },
    'CLAUDIUS_OPUS': {
      title: '🤖 Claudius-Opus AI',
      description: 'Intelligence artificielle quantique temporelle',
      properties: [
        'Fusion Ordre/Mémoire',
        'Limitations configurables',
        'Apprentissage adaptatif',
        'Conscience paradoxale'
      ]
    },
    'BURIDAN_ASS': {
      title: '🐴 Âne de Buridan',
      description: 'Stabilisateur quantique des probabilités',
      properties: [
        'Probabilités fixes à 50%',
        'Résistance aux interférences',
        'Stabilisation quantique',
        'Neutralisation des paradoxes'
      ]
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <select 
          value={selectedConcept}
          onChange={(e) => setSelectedConcept(e.target.value)}
          style={{
            background: 'var(--grut-dark)',
            color: 'var(--grut-primary)',
            border: '1px solid var(--grut-primary)',
            padding: '8px',
            borderRadius: '4px',
            width: '100%'
          }}
        >
          {Object.keys(grutConcepts).map(key => (
            <option key={key} value={key}>
              {grutConcepts[key as keyof typeof grutConcepts].title}
            </option>
          ))}
        </select>
      </div>

      {selectedConcept && (
        <div style={{
          background: 'rgba(138, 43, 226, 0.1)',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid var(--grut-quantum)'
        }}>
          <h3 style={{ color: 'var(--grut-quantum)', marginBottom: '10px' }}>
            {grutConcepts[selectedConcept as keyof typeof grutConcepts].title}
          </h3>
          
          <p style={{ marginBottom: '15px', fontSize: '0.9rem' }}>
            {grutConcepts[selectedConcept as keyof typeof grutConcepts].description}
          </p>

          <div>
            <strong>🔧 Propriétés:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              {grutConcepts[selectedConcept as keyof typeof grutConcepts].properties.map((prop, index) => (
                <li key={index} style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                  {prop}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '6px' }}>
        <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>
          🚨 <strong>GRUT RÉSONNE:</strong> "LA VISION EST MAINTENANT COMPLÈTE !"
        </div>
      </div>
    </div>
  )
}

export default GrutOntologyViewer 