# Recommandations de Visualisation du Graphe Causal

## 🎯 Librairies JavaScript pour Visualiser le PsiGraph

### **1. D3.js (Recommandée)**
```bash
npm install d3
```
- **Avantages** : Contrôle total, animations fluides, intégration React
- **Parfait pour** : Graphe causal avec nœuds temporels
- **Exemple** : Force-directed graph avec coordonnées spatio-temporelles

### **2. Cytoscape.js**
```bash
npm install cytoscape
```
- **Avantages** : Spécialisé pour les graphes, layouts automatiques
- **Parfait pour** : Relations causales complexes
- **Exemple** : Graphe avec nœuds PsiState et arêtes temporelles

### **3. Vis.js Network**
```bash
npm install vis-network
```
- **Avantages** : Facile à intégrer, interactions built-in
- **Parfait pour** : Exploration interactive du graphe

### **4. Sigma.js**
```bash
npm install sigma
```
- **Avantages** : Performance élevée, WebGL
- **Parfait pour** : Graphes très volumineux

## 🎨 Composant React Proposé

```tsx
// 🌐 frontend/src/components/PsiGraphVisualization.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface PsiGraphProps {
  gameId: string;
  nodes: PsiNode[];
  edges: CausalEdge[];
  fogStates: FogState[];
}

export const PsiGraphVisualization: React.FC<PsiGraphProps> = ({ 
  gameId, nodes, edges, fogStates 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    
    // Créer le graphe avec coordonnées spatio-temporelles
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(400, 300));

    // Nœuds colorés selon RealityState
    const nodeColors = {
      'IMPOSSIBLE': '#ff4757',
      'POTENTIAL': '#5352ed', 
      'SUPERPOSED': '#ff6b6b',
      'COLLAPSED': '#2ed573'
    };

    // Visualisation des nœuds
    const nodeElements = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 8)
      .attr('fill', d => nodeColors[d.realityState])
      .attr('opacity', d => d.isObserved ? 1.0 : 0.6);

    // Visualisation des arêtes causales
    const linkElements = svg.selectAll('.link')
      .data(edges)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Animation et interaction
    simulation.on('tick', () => {
      linkElements
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodeElements
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    // Tooltip avec info PsiNode
    nodeElements.append('title')
      .text(d => `${d.psiId}: ${d.realityState}\n${d.tile.x},${d.tile.y} T${d.time.turn}`);

  }, [nodes, edges]);

  return (
    <div className="psi-graph-container">
      <h3>Graphe Causal - Jeu {gameId}</h3>
      <svg ref={svgRef} width="800" height="600">
        {/* Légende */}
        <g className="legend" transform="translate(650, 20)">
          <rect width="140" height="120" fill="white" stroke="#ccc" />
          <text x="10" y="15" fontSize="12" fontWeight="bold">États de Réalité</text>
          <circle cx="20" cy="30" r="5" fill="#ff4757" />
          <text x="35" y="35" fontSize="10">Impossible</text>
          <circle cx="20" cy="50" r="5" fill="#5352ed" />
          <text x="35" y="55" fontSize="10">Potential</text>
          <circle cx="20" cy="70" r="5" fill="#ff6b6b" />
          <text x="35" y="75" fontSize="10">Superposed</text>
          <circle cx="20" cy="90" r="5" fill="#2ed573" />
          <text x="35" y="95" fontSize="10">Collapsed</text>
        </g>
      </svg>
    </div>
  );
};
```

## 🔌 API pour Alimenter la Visualisation

```typescript
// Appel API pour récupérer le graphe
const fetchPsiGraph = async (gameId: string) => {
  const response = await fetch(`/api/v1/temporal/advanced/games/${gameId}/psi-graph`);
  const data = await response.json();
  
  return {
    nodes: data.nodes, // PsiNode[]
    edges: data.edges, // Arêtes causales
    fogStates: data.fogStates // États de brouillard
  };
};
```

## 🎪 Intégration dans l'Interface

```tsx
// Dans TrueHeroesInterface.tsx
import { PsiGraphVisualization } from './PsiGraphVisualization';

// Ajouter un onglet "Graphe Causal"
const tabs = [
  { id: 'game', label: 'Jeu' },
  { id: 'psi-graph', label: 'Graphe Causal' },
  { id: 'settings', label: 'Paramètres' }
];

// Rendu conditionnel
{activeTab === 'psi-graph' && (
  <PsiGraphVisualization 
    gameId={gameState.gameId}
    nodes={psiNodes}
    edges={causalEdges}
    fogStates={fogStates}
  />
)}
```

## 🎯 Avantages

1. **Visualisation temps réel** du graphe causal
2. **Débug facile** des états de superposition
3. **Compréhension intuitive** des timelines
4. **Interactions** : clic sur nœud pour détails
5. **Légendes** pour les états de réalité
6. **Zoom/pan** pour navigation

## 📈 Métriques Visualisées

- **Nœuds** : Position spatio-temporelle
- **Couleurs** : États de réalité
- **Opacité** : Observé/non-observé
- **Taille** : Probabilité
- **Connections** : Relations causales
- **Animations** : Collapse en temps réel 