#!/usr/bin/env python3
"""
Patch pour ajouter la fonctionnalité de tests au dashboard
"""

import subprocess
import threading
from datetime import datetime

class TestManager:
    def __init__(self):
        self.running_test = None
        self.test_history = []
    
    def run_test_background(self, test_type='quick'):
        """Lancer un test en arrière-plan"""
        if self.running_test and self.running_test.get('status') == 'running':
            return {'error': 'Un test est déjà en cours'}
        
        def run_test():
            try:
                # Choisir le script selon le type
                scripts = {
                    'quick': './⚙️ scripts/test-rapide-hots.sh',
                    'complete': './test-complet-final.sh',
                    'ui': './test-scenarios-ui.sh'
                }
                
                script = scripts.get(test_type, scripts['quick'])
                
                # Lancer le test
                process = subprocess.Popen([
                    'bash', script
                ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                
                # Mettre à jour le statut
                self.running_test = {
                    'pid': process.pid,
                    'start_time': datetime.now().isoformat(),
                    'status': 'running',
                    'script': script,
                    'test_type': test_type
                }
                
                # Attendre la fin
                stdout, stderr = process.communicate()
                
                # Résultat final
                self.running_test.update({
                    'status': 'completed' if process.returncode == 0 else 'failed',
                    'end_time': datetime.now().isoformat(),
                    'return_code': process.returncode,
                    'output': stdout[:1000],  # Limiter la taille
                    'error': stderr[:500] if stderr else None
                })
                
                # Ajouter à l'historique
                self.test_history.append(dict(self.running_test))
                if len(self.test_history) > 10:
                    self.test_history.pop(0)
                    
            except Exception as e:
                self.running_test = {
                    'status': 'error',
                    'error': str(e),
                    'end_time': datetime.now().isoformat()
                }
        
        # Lancer dans un thread
        thread = threading.Thread(target=run_test)
        thread.daemon = True
        thread.start()
        
        return {
            'success': True,
            'message': f'Test {test_type} lancé en arrière-plan',
            'test_type': test_type
        }
    
    def get_status(self):
        """Obtenir le statut actuel"""
        if not self.running_test:
            return {'status': 'idle', 'message': 'Aucun test en cours'}
        
        return self.running_test
    
    def get_history(self):
        """Obtenir l'historique des tests"""
        return self.test_history

# Instance globale
test_manager = TestManager()

# Code à ajouter au dashboard-server.py dans do_POST
def handle_run_tests(self):
    """Gérer la requête de lancement de tests"""
    try:
        import json
        
        # Lire les données POST
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length:
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            test_type = data.get('test_type', 'quick')
        else:
            test_type = 'quick'
        
        result = test_manager.run_test_background(test_type)
        self.send_json_response(result)
        
    except Exception as e:
        self.send_json_response({'error': str(e)}, 500)

def handle_tests_status(self):
    """Gérer la requête de statut des tests"""
    try:
        status = test_manager.get_status()
        history = test_manager.get_history()
        
        self.send_json_response({
            'current': status,
            'history': history[-5:]  # 5 derniers tests
        })
        
    except Exception as e:
        self.send_json_response({'error': str(e)}, 500)

print("✅ Patch de tests créé - À intégrer dans dashboard-server.py") 