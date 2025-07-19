/**
 * 🌀 CAUSAL GRAPH D3.JS - HEROES OF TIME
 * =====================================
 * Visualisation interactive des graphes causaux et timelines
 */

class CausalGraphD3 {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = d3.select(`#${containerId}`);
        this.width = 800;
        this.height = 600;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        
        // Données du graphe
        this.nodes = [];
        this.links = [];
        this.timelines = new Map();
        this.currentTimeline = 'ℬ1';
        
        // Simulation D3
        this.simulation = null;
        this.svg = null;
        this.g = null;
        
        // Couleurs pour les timelines
        this.timelineColors = {
            'ℬ1': '#e94560',  // Rouge temporal
            'ℬ2': '#00bcd4',  // Cyan quantique
            'ℬ3': '#f39c12',  // Orange collapse
            'ℬ4': '#9b59b6',  // Violet interference
            'ℬ5': '#2ecc71'   // Vert stabilisé
        };
        
        this.init();
    }
    
    init() {
        console.log('🌀 Initialisation Causal Graph D3...');
        
        // Nettoyer le conteneur
        this.container.selectAll('*').remove();
        
        // Créer le SVG principal
        this.svg = this.container
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('background', 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)')
            .style('border-radius', '10px');
        
        // Groupe principal avec zoom
        this.g = this.svg.append('g');
        
        // Ajouter le zoom
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                this.g.attr('transform', event.transform);
            });
        
        this.svg.call(zoom);
        
        // Créer les groupes pour les différents éléments
        this.g.append('g').attr('class', 'links');
        this.g.append('g').attr('class', 'nodes');
        this.g.append('g').attr('class', 'labels');
        
        // Initialiser la simulation de force
        this.initSimulation();
        
        // Charger les données initiales
        this.loadSampleData();
    }
    
    initSimulation() {
        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(30));
    }
    
    loadSampleData() {
        // Données d'exemple pour démonstration
        this.nodes = [
            { 
                id: 'initial', 
                type: 'initial', 
                timeline: 'ℬ1',
                turn: 0,
                heroes: ['Arthur'],
                description: 'État initial'
            },
            { 
                id: 'arthur_move', 
                type: 'action', 
                timeline: 'ℬ1',
                turn: 1,
                heroes: ['Arthur'],
                action: 'MOV(Arthur, @15,15)',
                description: 'Arthur se déplace'
            },
            { 
                id: 'quantum_state', 
                type: 'quantum', 
                timeline: 'ℬ1',
                turn: 2,
                heroes: ['Arthur'],
                action: 'ψ001: ⊙(Δt+2 @20,20 ⟶ MOV(Arthur, @20,20))',
                description: 'Création état quantique'
            },
            { 
                id: 'superposition', 
                type: 'superposition', 
                timeline: 'ℬ2',
                turn: 2,
                heroes: ['Arthur'],
                probability: 0.6,
                description: 'Branche superposée'
            },
            { 
                id: 'collapse', 
                type: 'collapse', 
                timeline: 'ℬ1',
                turn: 4,
                heroes: ['Arthur'],
                action: '†ψ001',
                description: 'Effondrement quantique'
            }
        ];
        
        this.links = [
            { source: 'initial', target: 'arthur_move', type: 'temporal' },
            { source: 'arthur_move', target: 'quantum_state', type: 'temporal' },
            { source: 'quantum_state', target: 'superposition', type: 'quantum_split' },
            { source: 'quantum_state', target: 'collapse', type: 'temporal' },
            { source: 'superposition', target: 'collapse', type: 'quantum_merge' }
        ];
        
        this.updateGraph();
    }
    
    updateGraph() {
        console.log('🔄 Mise à jour du graphe causal...');
        
        // Mettre à jour les liens
        const link = this.g.select('.links')
            .selectAll('line')
            .data(this.links);
        
        link.enter()
            .append('line')
            .merge(link)
            .attr('stroke', d => this.getLinkColor(d.type))
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', d => d.type === 'quantum_split' ? '5,5' : null)
            .attr('marker-end', 'url(#arrowhead)');
        
        link.exit().remove();
        
        // Mettre à jour les nœuds
        const node = this.g.select('.nodes')
            .selectAll('circle')
            .data(this.nodes);
        
        const nodeEnter = node.enter()
            .append('circle')
            .attr('r', d => this.getNodeRadius(d.type))
            .attr('fill', d => this.getNodeColor(d))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .call(this.drag());
        
        // Ajouter les événements
        nodeEnter
            .on('mouseover', (event, d) => this.showTooltip(event, d))
            .on('mouseout', () => this.hideTooltip())
            .on('click', (event, d) => this.onNodeClick(d));
        
        node.merge(nodeEnter);
        node.exit().remove();
        
        // Mettre à jour les labels
        const label = this.g.select('.labels')
            .selectAll('text')
            .data(this.nodes);
        
        label.enter()
            .append('text')
            .merge(label)
            .text(d => this.getNodeLabel(d))
            .attr('font-size', '12px')
            .attr('font-family', 'monospace')
            .attr('fill', '#e0e0e0')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .style('pointer-events', 'none');
        
        label.exit().remove();
        
        // Ajouter les marqueurs de flèches
        this.addArrowMarkers();
        
        // Redémarrer la simulation
        this.simulation.nodes(this.nodes);
        this.simulation.force('link').links(this.links);
        this.simulation.alpha(1).restart();
        
        // Mettre à jour les positions à chaque tick
        this.simulation.on('tick', () => {
            this.g.select('.links').selectAll('line')
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            
            this.g.select('.nodes').selectAll('circle')
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
            
            this.g.select('.labels').selectAll('text')
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
    }
    
    addArrowMarkers() {
        // Définir les marqueurs de flèches
        const defs = this.svg.select('defs').empty() ? 
            this.svg.append('defs') : this.svg.select('defs');
        
        defs.append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 25)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 8)
            .attr('markerHeight', 8)
            .attr('xoverflow', 'visible')
            .append('path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#666')
            .style('stroke', 'none');
    }
    
    getNodeColor(node) {
        if (node.type === 'quantum' || node.type === 'superposition') {
            return this.timelineColors[node.timeline] || '#666';
        }
        
        const colors = {
            'initial': '#2ecc71',
            'action': '#3498db',
            'collapse': '#e74c3c',
            'interference': '#9b59b6'
        };
        
        return colors[node.type] || '#666';
    }
    
    getNodeRadius(type) {
        const radii = {
            'initial': 15,
            'action': 12,
            'quantum': 18,
            'superposition': 16,
            'collapse': 14,
            'interference': 20
        };
        
        return radii[type] || 10;
    }
    
    getLinkColor(type) {
        const colors = {
            'temporal': '#666',
            'quantum_split': '#f39c12',
            'quantum_merge': '#e94560',
            'interference': '#9b59b6'
        };
        
        return colors[type] || '#666';
    }
    
    getNodeLabel(node) {
        if (node.type === 'quantum') return 'ψ';
        if (node.type === 'collapse') return '†';
        if (node.type === 'superposition') return '⊙';
        if (node.type === 'initial') return '◉';
        return 'T' + node.turn;
    }
    
    drag() {
        return d3.drag()
            .on('start', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }
    
    showTooltip(event, node) {
        // Créer ou mettre à jour le tooltip
        let tooltip = d3.select('body').select('.causal-tooltip');
        
        if (tooltip.empty()) {
            tooltip = d3.select('body')
                .append('div')
                .attr('class', 'causal-tooltip')
                .style('position', 'absolute')
                .style('background', 'rgba(0,0,0,0.9)')
                .style('color', '#e0e0e0')
                .style('padding', '10px')
                .style('border-radius', '5px')
                .style('font-family', 'monospace')
                .style('font-size', '12px')
                .style('pointer-events', 'none')
                .style('z-index', '1000')
                .style('opacity', 0);
        }
        
        const content = `
            <div style="font-weight: bold; color: ${this.getNodeColor(node)}">
                ${node.description || node.id}
            </div>
            <div>Timeline: ${node.timeline}</div>
            <div>Turn: ${node.turn}</div>
            ${node.heroes ? `<div>Heroes: ${node.heroes.join(', ')}</div>` : ''}
            ${node.action ? `<div>Action: ${node.action}</div>` : ''}
            ${node.probability ? `<div>Probability: ${node.probability}</div>` : ''}
        `;
        
        tooltip.html(content)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .transition()
            .duration(200)
            .style('opacity', 1);
    }
    
    hideTooltip() {
        d3.select('.causal-tooltip')
            .transition()
            .duration(200)
            .style('opacity', 0);
    }
    
    onNodeClick(node) {
        console.log('🎯 Nœud cliqué:', node);
        
        // Émettre un événement personnalisé
        const event = new CustomEvent('causal-node-clicked', {
            detail: { node }
        });
        document.dispatchEvent(event);
        
        // Mettre en évidence le nœud
        this.highlightNode(node.id);
    }
    
    highlightNode(nodeId) {
        this.g.select('.nodes').selectAll('circle')
            .style('opacity', d => d.id === nodeId ? 1 : 0.3)
            .style('stroke-width', d => d.id === nodeId ? 4 : 2);
        
        // Remettre à la normale après 2 secondes
        setTimeout(() => {
            this.g.select('.nodes').selectAll('circle')
                .style('opacity', 1)
                .style('stroke-width', 2);
        }, 2000);
    }
    
    // API pour ajouter des données depuis le backend
    loadGameData(gameData) {
        console.log('📊 Chargement des données de jeu:', gameData);
        
        // Convertir les données de jeu en nœuds et liens
        this.nodes = this.convertGameDataToNodes(gameData);
        this.links = this.convertGameDataToLinks(gameData);
        
        this.updateGraph();
    }
    
    convertGameDataToNodes(gameData) {
        const nodes = [];
        
        // Nœud initial
        nodes.push({
            id: 'game_start',
            type: 'initial',
            timeline: 'ℬ1',
            turn: 0,
            heroes: gameData.heroes?.map(h => h.name) || [],
            description: `Game: ${gameData.gameName}`
        });
        
        // Nœuds pour les états ψ
        if (gameData.psiStates) {
            gameData.psiStates.forEach(psi => {
                nodes.push({
                    id: psi.quantumStateId,
                    type: psi.status === 'COLLAPSED' ? 'collapse' : 'quantum',
                    timeline: psi.branch,
                    turn: gameData.currentTurn,
                    heroes: [psi.ownerHero],
                    action: psi.expression,
                    probability: psi.probability,
                    description: `${psi.quantumStateId}: ${psi.actionType}`
                });
            });
        }
        
        return nodes;
    }
    
    convertGameDataToLinks(gameData) {
        const links = [];
        
        // Liens temporels simples pour l'instant
        // TODO: Implémenter la logique de liens basée sur les dépendances causales
        
        return links;
    }
    
    // Méthodes pour contrôler la visualisation
    filterByTimeline(timeline) {
        this.currentTimeline = timeline;
        
        this.g.select('.nodes').selectAll('circle')
            .style('opacity', d => d.timeline === timeline ? 1 : 0.2);
        
        this.g.select('.links').selectAll('line')
            .style('opacity', d => {
                const sourceTimeline = this.nodes.find(n => n.id === d.source.id)?.timeline;
                const targetTimeline = this.nodes.find(n => n.id === d.target.id)?.timeline;
                return (sourceTimeline === timeline || targetTimeline === timeline) ? 1 : 0.2;
            });
    }
    
    resetFilter() {
        this.g.select('.nodes').selectAll('circle').style('opacity', 1);
        this.g.select('.links').selectAll('line').style('opacity', 1);
    }
    
    centerGraph() {
        const transform = d3.zoomIdentity.translate(this.width / 2, this.height / 2).scale(1);
        this.svg.transition().duration(750).call(
            d3.zoom().transform, transform
        );
    }
}

// Fonction d'initialisation globale
window.initCausalGraph = function(containerId) {
    return new CausalGraphD3(containerId);
}; 