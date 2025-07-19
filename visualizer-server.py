#!/usr/bin/env python3
"""
🔮 HEROES OF TIME - VISUALIZER SERVER
Serveur Python pour les visualiseurs JSON et HOTS
"""

import http.server
import socketserver
import os
import mimetypes
from urllib.parse import urlparse

class VisualizerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=".", **kwargs)

    def end_headers(self):
        # Ajouter les headers CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Routage pour les visualiseurs
        if path == '/':
            self.serve_dashboard()
        elif path == '/collection':
            self.serve_file('hots-visualizer.html')
        elif path == '/grammar':
            self.serve_file('hots-visualizer.html')
        elif path == '/json':
            self.serve_file('json-visualizer.html')
        elif path == '/hots':
            self.serve_file('hots-visualizer.html')
        elif path == '/dashboard':
            self.serve_file('dashboard.html')
        else:
            super().do_GET()

    def serve_dashboard(self):
        """Servir la page d'accueil des visualiseurs"""
        content = """
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔮 Heroes of Time - Visualizers Hub</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            color: #e0e0e0;
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            text-align: center;
            margin-bottom: 50px;
            padding: 30px;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 20px;
            border: 2px solid rgba(78, 205, 196, 0.3);
        }
        .header h1 {
            font-size: 3rem;
            color: #4ecdc4;
            margin-bottom: 15px;
            text-shadow: 0 0 30px rgba(78, 205, 196, 0.6);
        }
        .visualizers {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
        }
        .visualizer-card {
            background: rgba(0, 0, 0, 0.4);
            border-radius: 15px;
            padding: 30px;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
        }
        .visualizer-card:hover {
            border-color: #4ecdc4;
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(78, 205, 196, 0.2);
        }
        .card-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            text-align: center;
        }
        .card-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }
        .card-description {
            color: #bdc3c7;
            line-height: 1.6;
            text-align: center;
        }
        .collection-card { border-color: rgba(255, 193, 7, 0.3); }
        .collection-card:hover { border-color: #ffc107; box-shadow: 0 15px 35px rgba(255, 193, 7, 0.2); }
        .grammar-card { border-color: rgba(138, 43, 226, 0.3); }
        .grammar-card:hover { border-color: #8a2be2; box-shadow: 0 15px 35px rgba(138, 43, 226, 0.2); }
        .json-card { border-color: rgba(52, 152, 219, 0.3); }
        .json-card:hover { border-color: #3498db; box-shadow: 0 15px 35px rgba(52, 152, 219, 0.2); }
        .hots-card { border-color: rgba(142, 68, 173, 0.3); }
        .hots-card:hover { border-color: #8e44ad; box-shadow: 0 15px 35px rgba(142, 68, 173, 0.2); }
        .dashboard-card { border-color: rgba(46, 204, 113, 0.3); }
        .dashboard-card:hover { border-color: #2ecc71; box-shadow: 0 15px 35px rgba(46, 204, 113, 0.2); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔮 Heroes of Time</h1>
            <p>Hub des Visualiseurs - Explorez les données et scripts du projet</p>
        </div>
        
        <div class="visualizers">
            <a href="/hots" class="visualizer-card collection-card">
                <div class="card-icon">🏛️</div>
                <div class="card-title">Collection & Grammar</div>
                <div class="card-description">
                    Interface unifiée : Collection du jeu + Scénarios HOTS + Grammar Translator.
                    Tout en un avec onglets !
                </div>
            </a>
            
            <a href="/json" class="visualizer-card json-card">
                <div class="card-icon">📊</div>
                <div class="card-title">JSON Visualizer</div>
                <div class="card-description">
                    Visualisation propre des objets JSON - Artefacts, héros, scénarios.
                    Pas de scroll de répertoire, affichage intelligent !
                </div>
            </a>
            

            
            <a href="/dashboard" class="visualizer-card dashboard-card">
                <div class="card-icon">🎯</div>
                <div class="card-title">Dashboard Principal</div>
                <div class="card-description">
                    Tableau de bord central avec statut des services.
                    Accès rapide à toutes les interfaces du projet.
                </div>
            </a>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(content.encode('utf-8'))

    def serve_file(self, filename):
        """Servir un fichier spécifique"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
        except FileNotFoundError:
            self.send_error(404, f"File {filename} not found")

    def log_message(self, format, *args):
        """Log personnalisé avec emojis"""
        print(f"🔮 [{self.address_string()}] {format % args}")

def start_server(port=5175):
    """Démarrer le serveur de visualiseurs"""
    print(f"""
🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =
🚀 LANCEMENT SERVEUR VISUALISEURS HEROES OF TIME
📍 Port: {port}
🎯 Visualiseurs: JSON + HOTS + Dashboard
🌐 URL: http://localhost:{port}
🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =🔮 =
    """)
    
    try:
        with socketserver.TCPServer(("", port), VisualizerHandler) as httpd:
            print(f"🚀 Serveur visualiseurs démarré sur http://localhost:{port}")
            print(f"🏛️ Collection & Grammar: http://localhost:{port}/hots")
            print(f"📊 JSON Visualizer: http://localhost:{port}/json")

            print(f"🎯 Dashboard: http://localhost:{port}/dashboard")
            print(f"🛑 Ctrl+C pour arrêter")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Arrêt du serveur visualiseurs")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} déjà utilisé. Essayez un autre port.")
        else:
            print(f"❌ Erreur: {e}")

if __name__ == "__main__":
    import sys
    
    port = 5175
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ Port invalide, utilisation du port par défaut 5175")
    
    start_server(port) 