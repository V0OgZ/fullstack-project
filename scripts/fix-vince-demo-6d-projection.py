#!/usr/bin/env python3
"""
Fix Vince Vega Demo avec projection 6D → 2D
"""

import json
import math
from datetime import datetime

# FORMULES DE PROJECTION 6D → 2D
PROJECTION_FORMULAS = {
    "FOREST_GROFI": {
        "formula": "Π(x,y,z,t,ψ,σ) = (x*cos(ψ) + z*sin(σ), y + t*0.1)",
        "params": {"rotation_psi": 0.785, "sigma_factor": 1.2}
    },
    "HYPERSPACE_DMT": {
        "formula": "Π(x,y,z,t,ψ,σ) = (x*ψ^2, y*σ*sin(t))",
        "params": {"psi_power": 2, "time_wave": True}
    },
    "VINCE_REALM": {
        "formula": "Π(x,y,z,t,ψ,σ) = (x+z*0.5, y+ψ*0.3)",
        "params": {"depth_factor": 0.5, "psi_shift": 0.3}
    },
    "QUANTUM_COLLAPSE": {
        "formula": "Π(x,y,z,t,ψ,σ) = (x*σ/|ψ|, y*t^0.5)",
        "params": {"collapse_rate": 0.8, "time_sqrt": True}
    },
    "MIRROR_DIMENSION": {
        "formula": "Π(x,y,z,t,ψ,σ) = (-x*cos(σ), -y*sin(ψ))",
        "params": {"mirror_x": -1, "mirror_y": -1}
    }
}

def project_6d_to_2d(x, y, z, t, psi, sigma, formula_name="VINCE_REALM"):
    """Projette des coordonnées 6D en 2D selon la formule du monde"""
    formula = PROJECTION_FORMULAS.get(formula_name, PROJECTION_FORMULAS["VINCE_REALM"])
    params = formula["params"]
    
    if formula_name == "FOREST_GROFI":
        px = x * math.cos(params["rotation_psi"]) + z * math.sin(sigma * params["sigma_factor"])
        py = y + t * 0.1
    elif formula_name == "HYPERSPACE_DMT":
        px = x * (psi ** params["psi_power"])
        py = y * sigma * math.sin(t) if params["time_wave"] else y * sigma
    elif formula_name == "VINCE_REALM":
        px = x + z * params["depth_factor"]
        py = y + psi * params["psi_shift"]
    elif formula_name == "QUANTUM_COLLAPSE":
        px = x * sigma / (abs(psi) + 0.001)  # Éviter division par zéro
        py = y * math.sqrt(abs(t)) if params["time_sqrt"] else y * t
    elif formula_name == "MIRROR_DIMENSION":
        px = -x * math.cos(sigma)
        py = -y * math.sin(psi)
    else:
        px, py = x, y
    
    return px, py

def create_dimension_config():
    """Crée la configuration des dimensions pour le backend"""
    config = {
        "dimensions": {
            "X": {"name": "Position X", "range": [-100, 100], "type": "spatial"},
            "Y": {"name": "Position Y", "range": [-100, 100], "type": "spatial"},
            "Z": {"name": "Profondeur Z", "range": [-50, 50], "type": "spatial"},
            "T": {"name": "Temps T", "range": [0, 1000], "type": "temporal"},
            "Ψ": {"name": "Conscience Psi", "range": [-3.14, 3.14], "type": "quantum"},
            "Σ": {"name": "Entropie Sigma", "range": [0, 10], "type": "entropic"}
        },
        "projection_formulas": PROJECTION_FORMULAS,
        "active_formula": "VINCE_REALM"
    }
    
    with open('game_assets/config/dimension_projection.json', 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    
    return config

def fix_vince_demo_html():
    """Répare la démo Vince Vega pour qu'elle soit fonctionnelle"""
    
    # Créer une version simplifiée et fonctionnelle
    fixed_html = '''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎮 Vince Vega Demo - Map 2D Simple</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #0a0a0a;
            font-family: 'Courier New', monospace;
            color: #fff;
            overflow: hidden;
        }
        
        /* Container principal carré */
        .game-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 100%);
            border: 3px solid #00ff88;
            border-radius: 15px;
            box-shadow: 0 0 30px rgba(0,255,136,0.5);
        }
        
        /* Grille de jeu */
        .game-grid {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            grid-template-rows: repeat(10, 1fr);
            gap: 1px;
            padding: 10px;
            height: 100%;
            box-sizing: border-box;
        }
        
        /* Cellules */
        .cell {
            background: rgba(0,100,0,0.2);
            border: 1px solid rgba(0,255,136,0.2);
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .cell:hover {
            background: rgba(0,255,136,0.3);
            transform: scale(1.05);
            box-shadow: 0 0 10px rgba(0,255,136,0.5);
        }
        
        /* Héros */
        .hero {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: all 0.3s ease;
            z-index: 10;
        }
        
        .hero-vince {
            background: radial-gradient(circle, #ff4444, #cc0000);
            box-shadow: 0 0 20px rgba(255,68,68,0.8);
        }
        
        /* Portails */
        .portal {
            animation: portalPulse 2s infinite;
            background: radial-gradient(circle, rgba(138,43,226,0.8), transparent);
        }
        
        @keyframes portalPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.2); opacity: 1; }
        }
        
        /* HUD simple */
        .hud {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            padding: 10px 30px;
            border-radius: 20px;
            border: 2px solid #00ff88;
            display: flex;
            gap: 30px;
            font-size: 14px;
        }
        
        .hud-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        /* Contrôles */
        .controls {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #00ff88;
            text-align: center;
        }
        
        .control-info {
            color: #00ff88;
            font-size: 12px;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <!-- HUD -->
    <div class="hud">
        <div class="hud-item">
            <span>🎮</span>
            <span id="player-name">Vince Vega</span>
        </div>
        <div class="hud-item">
            <span>📍</span>
            <span id="position">X:5 Y:5</span>
        </div>
        <div class="hud-item">
            <span>🌍</span>
            <span id="world">VINCE_REALM</span>
        </div>
        <div class="hud-item">
            <span>🔢</span>
            <span id="dimension">2D</span>
        </div>
    </div>

    <!-- Container de jeu -->
    <div class="game-container">
        <div class="game-grid" id="gameGrid"></div>
        <div class="hero hero-vince" id="hero">🔫</div>
    </div>

    <!-- Contrôles -->
    <div class="controls">
        <div class="control-info">⬆️⬇️⬅️➡️ Flèches pour bouger</div>
        <div class="control-info">ESPACE pour interagir</div>
        <div class="control-info">P pour changer de projection</div>
    </div>

    <script>
        // État du jeu
        let gameState = {
            hero: { x: 5, y: 5, z: 0, t: 0, psi: 0, sigma: 1 },
            world: 'VINCE_REALM',
            projectionMode: 0,
            projections: ['VINCE_REALM', 'FOREST_GROFI', 'HYPERSPACE_DMT', 'QUANTUM_COLLAPSE', 'MIRROR_DIMENSION']
        };

        // Objets sur la carte
        const mapObjects = {
            portals: [
                { x: 2, y: 2, icon: '🌀', destination: 'FOREST_GROFI' },
                { x: 8, y: 8, icon: '🌈', destination: 'HYPERSPACE_DMT' },
                { x: 2, y: 8, icon: '🔮', destination: 'QUANTUM_COLLAPSE' }
            ],
            items: [
                { x: 5, y: 2, icon: '💎' },
                { x: 7, y: 5, icon: '🗝️' },
                { x: 3, y: 7, icon: '📜' }
            ]
        };

        // Initialiser la grille
        function initGrid() {
            const grid = document.getElementById('gameGrid');
            grid.innerHTML = '';
            
            for (let y = 0; y < 10; y++) {
                for (let x = 0; x < 10; x++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.x = x;
                    cell.dataset.y = y;
                    
                    // Ajouter les objets
                    const portal = mapObjects.portals.find(p => p.x === x && p.y === y);
                    const item = mapObjects.items.find(i => i.x === x && i.y === y);
                    
                    if (portal) {
                        cell.innerHTML = portal.icon;
                        cell.classList.add('portal');
                    } else if (item) {
                        cell.innerHTML = item.icon;
                    }
                    
                    cell.addEventListener('click', () => moveHeroTo(x, y));
                    grid.appendChild(cell);
                }
            }
            
            updateHeroPosition();
        }

        // Mettre à jour la position du héros
        function updateHeroPosition() {
            const hero = document.getElementById('hero');
            const cellSize = 58; // Taille approximative d'une cellule
            hero.style.left = (gameState.hero.x * cellSize + 30) + 'px';
            hero.style.top = (gameState.hero.y * cellSize + 30) + 'px';
            
            document.getElementById('position').textContent = `X:${gameState.hero.x} Y:${gameState.hero.y}`;
            
            // Vérifier les interactions
            checkInteractions();
        }

        // Déplacer le héros
        function moveHeroTo(x, y) {
            if (x >= 0 && x < 10 && y >= 0 && y < 10) {
                gameState.hero.x = x;
                gameState.hero.y = y;
                updateHeroPosition();
            }
        }

        // Vérifier les interactions
        function checkInteractions() {
            const { x, y } = gameState.hero;
            const portal = mapObjects.portals.find(p => p.x === x && p.y === y);
            
            if (portal) {
                gameState.world = portal.destination;
                document.getElementById('world').textContent = portal.destination;
                showEffect(`Téléportation vers ${portal.destination}!`);
            }
        }

        // Afficher un effet visuel
        function showEffect(message) {
            const effect = document.createElement('div');
            effect.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,255,136,0.9);
                color: black;
                padding: 20px 40px;
                border-radius: 10px;
                font-size: 18px;
                font-weight: bold;
                z-index: 1000;
            `;
            effect.textContent = message;
            document.body.appendChild(effect);
            
            setTimeout(() => effect.remove(), 2000);
        }

        // Contrôles clavier
        document.addEventListener('keydown', (e) => {
            const { x, y } = gameState.hero;
            
            switch(e.key) {
                case 'ArrowUp': moveHeroTo(x, y - 1); break;
                case 'ArrowDown': moveHeroTo(x, y + 1); break;
                case 'ArrowLeft': moveHeroTo(x - 1, y); break;
                case 'ArrowRight': moveHeroTo(x + 1, y); break;
                case ' ': checkInteractions(); break;
                case 'p':
                case 'P':
                    gameState.projectionMode = (gameState.projectionMode + 1) % gameState.projections.length;
                    const newProjection = gameState.projections[gameState.projectionMode];
                    document.getElementById('dimension').textContent = newProjection;
                    showEffect(`Projection: ${newProjection}`);
                    break;
            }
            
            e.preventDefault();
        });

        // Initialiser
        initGrid();
    </script>
</body>
</html>'''
    
    # Sauvegarder la version fixée
    with open('frontend/vince-vega-demo-fixed.html', 'w', encoding='utf-8') as f:
        f.write(fixed_html)
    
    print("✅ Démo Vince Vega réparée : frontend/vince-vega-demo-fixed.html")

def create_backend_projection_service():
    """Crée le service backend pour les projections 6D"""
    
    service_code = '''package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DimensionProjectionService {
    
    private static final Map<String, ProjectionFormula> FORMULAS = new HashMap<>();
    
    static {
        // FOREST_GROFI: Rotation dans l'espace psi-sigma
        FORMULAS.put("FOREST_GROFI", (x, y, z, t, psi, sigma) -> new Point2D(
            x * Math.cos(psi) + z * Math.sin(sigma * 1.2),
            y + t * 0.1
        ));
        
        // HYPERSPACE_DMT: Distorsion psychédélique
        FORMULAS.put("HYPERSPACE_DMT", (x, y, z, t, psi, sigma) -> new Point2D(
            x * Math.pow(psi, 2),
            y * sigma * Math.sin(t)
        ));
        
        // VINCE_REALM: Projection classique avec décalage psi
        FORMULAS.put("VINCE_REALM", (x, y, z, t, psi, sigma) -> new Point2D(
            x + z * 0.5,
            y + psi * 0.3
        ));
        
        // QUANTUM_COLLAPSE: Effondrement quantique
        FORMULAS.put("QUANTUM_COLLAPSE", (x, y, z, t, psi, sigma) -> new Point2D(
            x * sigma / (Math.abs(psi) + 0.001),
            y * Math.sqrt(Math.abs(t))
        ));
        
        // MIRROR_DIMENSION: Dimension miroir
        FORMULAS.put("MIRROR_DIMENSION", (x, y, z, t, psi, sigma) -> new Point2D(
            -x * Math.cos(sigma),
            -y * Math.sin(psi)
        ));
    }
    
    public Point2D project6DTo2D(double x, double y, double z, double t, double psi, double sigma, String formulaName) {
        ProjectionFormula formula = FORMULAS.getOrDefault(formulaName, FORMULAS.get("VINCE_REALM"));
        return formula.project(x, y, z, t, psi, sigma);
    }
    
    @FunctionalInterface
    interface ProjectionFormula {
        Point2D project(double x, double y, double z, double t, double psi, double sigma);
    }
    
    public static class Point2D {
        public final double x;
        public final double y;
        
        public Point2D(double x, double y) {
            this.x = x;
            this.y = y;
        }
    }
}'''
    
    # Créer le répertoire si nécessaire
    import os
    os.makedirs('backend/src/main/java/com/example/demo/service', exist_ok=True)
    
    with open('backend/src/main/java/com/example/demo/service/DimensionProjectionService.java', 'w') as f:
        f.write(service_code)
    
    print("✅ Service de projection 6D créé")

# Exécuter les corrections
if __name__ == "__main__":
    print("🔧 Réparation du système en cours...")
    
    # 1. Créer la configuration des dimensions
    create_dimension_config()
    
    # 2. Réparer la démo HTML
    fix_vince_demo_html()
    
    # 3. Créer le service backend
    create_backend_projection_service()
    
    print("\n✅ RÉPARATIONS TERMINÉES!")
    print("\n📍 Pour tester:")
    print("1. Ouvrir: http://localhost:8001/vince-vega-demo-fixed.html")
    print("2. Utiliser les flèches pour déplacer Vince")
    print("3. Appuyer sur P pour changer de projection")
    print("4. Marcher sur les portails 🌀🌈🔮 pour changer de monde")