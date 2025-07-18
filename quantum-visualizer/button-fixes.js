// 🔧 Button Fixes - Quantum Visualizer
// Corrections des boutons et fonctions

console.log('🔧 Loading button fixes...');

// Variables globales
let isAutoPlaying = false;
let currentTurn = 1;
let autoPlayInterval = null;

// Fonctions de contrôle corrigées
function toggleAutoPlay() {
    console.log('🎮 toggleAutoPlay called');
    isAutoPlaying = !isAutoPlaying;
    
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        if (isAutoPlaying) {
            playBtn.textContent = '⏸️ Pause';
            playBtn.onclick = pauseVisualization;
            startAutoPlay();
        } else {
            playBtn.textContent = '▶️ Lecture';
            playBtn.onclick = toggleAutoPlay;
            stopAutoPlay();
        }
    }
}

function pauseVisualization() {
    console.log('⏸️ pauseVisualization called');
    isAutoPlaying = false;
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.textContent = '▶️ Lecture';
        playBtn.onclick = toggleAutoPlay;
    }
    stopAutoPlay();
}

function nextTurn() {
    console.log('⏭️ nextTurn called');
    currentTurn++;
    updateTurnDisplay();
    
    // Simuler une action
    if (window.quantumVisualizer && window.quantumVisualizer.nextTurn) {
        window.quantumVisualizer.nextTurn();
    } else {
        console.log('📋 Simulating next turn: ' + currentTurn);
        // Simulation simple
        simulateQuantumStep();
    }
}

function resetVisualization() {
    console.log('🔄 resetVisualization called');
    isAutoPlaying = false;
    currentTurn = 1;
    stopAutoPlay();
    
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.textContent = '▶️ Lecture';
        playBtn.onclick = toggleAutoPlay;
    }
    
    updateTurnDisplay();
    
    if (window.quantumVisualizer && window.quantumVisualizer.reset) {
        window.quantumVisualizer.reset();
    } else {
        console.log('📋 Simulating reset');
        simulateReset();
    }
}

function startAutoPlay() {
    console.log('🚀 Starting auto play');
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
    
    autoPlayInterval = setInterval(() => {
        if (isAutoPlaying) {
            nextTurn();
        }
    }, 3000);
}

function stopAutoPlay() {
    console.log('🛑 Stopping auto play');
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function updateTurnDisplay() {
    const turnElement = document.getElementById('turn-number');
    if (turnElement) {
        turnElement.textContent = currentTurn;
    }
    
    const currentTurnElement = document.getElementById('current-turn');
    if (currentTurnElement) {
        currentTurnElement.textContent = `Tour ${currentTurn}`;
    }
    
    console.log('📊 Turn updated to: ' + currentTurn);
}

function simulateQuantumStep() {
    console.log('🌌 Simulating quantum step...');
    
    // Simuler des métriques quantiques
    const metrics = {
        psiCount: Math.floor(Math.random() * 5) + 1,
        interferences: Math.floor(Math.random() * 3),
        maxProbability: Math.floor(Math.random() * 100),
        coherence: Math.floor(Math.random() * 100)
    };
    
    updateQuantumMetrics(metrics);
}

function simulateReset() {
    console.log('🔄 Simulating reset...');
    
    // Reset des métriques
    const metrics = {
        psiCount: 0,
        interferences: 0,
        maxProbability: 0,
        coherence: 100
    };
    
    updateQuantumMetrics(metrics);
}

function updateQuantumMetrics(metrics) {
    const elements = {
        'psi-count': metrics.psiCount,
        'interference-count': metrics.interferences,
        'max-probability': metrics.maxProbability + '%',
        'coherence-level': metrics.coherence + '%'
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    console.log('📊 Quantum metrics updated:', metrics);
}

// Attacher les fonctions aux boutons au chargement
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Attaching button fixes...');
    
    // Attacher les événements
    const buttons = {
        'play-btn': toggleAutoPlay,
        'pause-btn': pauseVisualization,
        'next-btn': nextTurn,
        'reset-btn': resetVisualization
    };
    
    for (const [id, func] of Object.entries(buttons)) {
        const button = document.getElementById(id);
        if (button) {
            button.onclick = func;
            console.log(`✅ Button ${id} fixed`);
        } else {
            console.log(`❌ Button ${id} not found`);
        }
    }
    
    // Initialiser l'affichage
    updateTurnDisplay();
    
    console.log('🎉 Button fixes loaded successfully');
});

// Rendre les fonctions globales
window.toggleAutoPlay = toggleAutoPlay;
window.pauseVisualization = pauseVisualization;
window.nextTurn = nextTurn;
window.resetVisualization = resetVisualization;
window.updateQuantumMetrics = updateQuantumMetrics;

console.log('🔧 Button fixes script loaded');
