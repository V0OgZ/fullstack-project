#!/usr/bin/env python3
"""
🎯 Heroes of Time - Test Runner Server
=====================================
Serveur simple pour lancer les tests depuis l'interface HTML
"""

import json
import subprocess
import threading
import time
import os
import sys
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import socketserver

# Configuration
PORT = 8888
SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))

# État global des tests
running_tests = {}
test_outputs = {}

class TestRunnerHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Gérer les requêtes GET"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == '/':
            # Servir l'interface HTML
            self.serve_html()
        elif path == '/status':
            # Statut des tests
            self.send_json_response(self.get_tests_status())
        elif path.startswith('/logs/'):
            # Logs d'un test spécifique
            test_id = path.split('/')[-1]
            self.send_json_response(self.get_test_logs(test_id))
        else:
            self.send_error(404)
    
    def do_POST(self):
        """Gérer les requêtes POST"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == '/run':
            # Lancer un test
            self.run_test()
        elif path == '/stop':
            # Arrêter un test
            self.stop_test()
        elif path == '/stop-all':
            # Arrêter tous les tests
            self.stop_all_tests()
        else:
            self.send_error(404)
    
    def serve_html(self):
        """Servir l'interface HTML"""
        try:
            with open('test-runner-interface.html', 'r', encoding='utf-8') as f:
                content = f.read()
            
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
        except FileNotFoundError:
            self.send_error(404, "Interface HTML non trouvée")
    
    def run_test(self):
        """Lancer un test"""
        try:
            # Lire les données POST
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            test_id = data.get('test_id')
            script = data.get('script')
            args = data.get('args', '')
            
            if not test_id or not script:
                self.send_json_response({'error': 'Paramètres manquants'}, 400)
                return
            
            # Vérifier si le test est déjà en cours
            if test_id in running_tests:
                self.send_json_response({'error': 'Test déjà en cours'}, 409)
                return
            
            # Lancer le test dans un thread séparé
            def run_test_thread():
                self.execute_test(test_id, script, args)
            
            thread = threading.Thread(target=run_test_thread)
            thread.daemon = True
            thread.start()
            
            self.send_json_response({'message': f'Test {test_id} lancé', 'status': 'started'})
            
        except Exception as e:
            self.send_json_response({'error': str(e)}, 500)
    
    def execute_test(self, test_id, script, args):
        """Exécuter un test"""
        try:
            # Marquer le test comme en cours
            running_tests[test_id] = {
                'status': 'running',
                'start_time': datetime.now().isoformat(),
                'script': script,
                'args': args
            }
            test_outputs[test_id] = []
            
            # Construire la commande
            cmd_parts = [script]
            if args:
                cmd_parts.extend(args.split())
            
            print(f"🚀 Lancement du test {test_id}: {' '.join(cmd_parts)}")
            
            # Exécuter la commande
            process = subprocess.Popen(
                cmd_parts,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                cwd=SCRIPTS_DIR,
                bufsize=1,
                universal_newlines=True
            )
            
            running_tests[test_id]['process'] = process
            
            # Lire la sortie en temps réel
            while True:
                output = process.stdout.readline()
                if output == '' and process.poll() is not None:
                    break
                if output:
                    timestamp = datetime.now().isoformat()
                    test_outputs[test_id].append({
                        'timestamp': timestamp,
                        'line': output.strip()
                    })
            
            # Attendre la fin du processus
            return_code = process.wait()
            
            # Mettre à jour le statut
            running_tests[test_id].update({
                'status': 'completed' if return_code == 0 else 'error',
                'end_time': datetime.now().isoformat(),
                'return_code': return_code
            })
            
            print(f"✅ Test {test_id} terminé avec le code {return_code}")
            
        except Exception as e:
            print(f"❌ Erreur lors du test {test_id}: {str(e)}")
            running_tests[test_id].update({
                'status': 'error',
                'end_time': datetime.now().isoformat(),
                'error': str(e)
            })
        finally:
            # Nettoyer le processus
            if test_id in running_tests and 'process' in running_tests[test_id]:
                del running_tests[test_id]['process']
    
    def stop_test(self):
        """Arrêter un test"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            test_id = data.get('test_id')
            
            if test_id in running_tests and 'process' in running_tests[test_id]:
                process = running_tests[test_id]['process']
                process.terminate()
                
                running_tests[test_id].update({
                    'status': 'stopped',
                    'end_time': datetime.now().isoformat()
                })
                
                self.send_json_response({'message': f'Test {test_id} arrêté'})
            else:
                self.send_json_response({'error': 'Test non trouvé ou non en cours'}, 404)
                
        except Exception as e:
            self.send_json_response({'error': str(e)}, 500)
    
    def stop_all_tests(self):
        """Arrêter tous les tests"""
        try:
            stopped_tests = []
            
            for test_id in list(running_tests.keys()):
                if 'process' in running_tests[test_id]:
                    process = running_tests[test_id]['process']
                    process.terminate()
                    
                    running_tests[test_id].update({
                        'status': 'stopped',
                        'end_time': datetime.now().isoformat()
                    })
                    
                    stopped_tests.append(test_id)
            
            self.send_json_response({
                'message': f'{len(stopped_tests)} tests arrêtés',
                'stopped_tests': stopped_tests
            })
            
        except Exception as e:
            self.send_json_response({'error': str(e)}, 500)
    
    def get_tests_status(self):
        """Obtenir le statut de tous les tests"""
        status = {}
        for test_id, test_info in running_tests.items():
            status[test_id] = {
                'status': test_info['status'],
                'start_time': test_info.get('start_time'),
                'end_time': test_info.get('end_time'),
                'script': test_info.get('script'),
                'args': test_info.get('args'),
                'return_code': test_info.get('return_code'),
                'error': test_info.get('error')
            }
        return status
    
    def get_test_logs(self, test_id):
        """Obtenir les logs d'un test"""
        if test_id in test_outputs:
            return {
                'test_id': test_id,
                'logs': test_outputs[test_id]
            }
        else:
            return {'error': 'Test non trouvé'}
    
    def send_json_response(self, data, status_code=200):
        """Envoyer une réponse JSON"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        json_data = json.dumps(data, indent=2, ensure_ascii=False)
        self.wfile.write(json_data.encode('utf-8'))
    
    def do_OPTIONS(self):
        """Gérer les requêtes OPTIONS pour CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def log_message(self, format, *args):
        """Personnaliser les messages de log"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

def main():
    """Fonction principale"""
    print("🎯 Heroes of Time - Test Runner Server")
    print("=" * 50)
    print(f"🚀 Démarrage du serveur sur le port {PORT}")
    print(f"📁 Répertoire des scripts: {SCRIPTS_DIR}")
    print(f"🌐 Interface disponible sur: http://localhost:{PORT}")
    print("=" * 50)
    
    # Vérifier que l'interface HTML existe
    if not os.path.exists('test-runner-interface.html'):
        print("❌ ERREUR: Interface HTML non trouvée!")
        print("   Assurez-vous que 'test-runner-interface.html' est dans le même répertoire")
        sys.exit(1)
    
    # Créer le serveur
    try:
        with socketserver.TCPServer(("", PORT), TestRunnerHandler) as httpd:
            print(f"✅ Serveur démarré avec succès")
            print(f"🎯 Ouvrez http://localhost:{PORT} dans votre navigateur")
            print("🛑 Appuyez sur Ctrl+C pour arrêter le serveur")
            print()
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Arrêt du serveur...")
        print("👋 Au revoir !")
    except Exception as e:
        print(f"❌ Erreur du serveur: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 