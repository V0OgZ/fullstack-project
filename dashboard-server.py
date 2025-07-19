#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🎯 Heroes of Time - Dashboard Server Sécurisé avec HUD Global
==============================================================
Serveur sécurisé pour le dashboard avec HUD de statut global et tests live
"""

import http.server
import socketserver
import os
import json
import urllib.parse
import markdown
import glob
import subprocess
import psutil
from datetime import datetime

PORT = 9000

class SecureDashboardHandler(http.server.SimpleHTTPRequestHandler):
    
    # Fichiers autorisés
    ALLOWED_FILES = {
        '/': 'dashboard.html',
        '/dashboard.html': 'dashboard.html',
        '/dashboard.css': 'dashboard.css',
        '/api/status': 'api_status',
        '/api/global-status': 'api_global_status',
        '/api/reports': 'api_reports',
        '/api/report': 'api_report',
        '/api/tests': 'api_tests'
    }
    
    def do_GET(self):
        # Parse l'URL
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        query = urllib.parse.parse_qs(parsed_path.query)
        
        print(f"📡 Requête: {path}")
        
        # Redirection racine vers dashboard
        if path == '/':
            path = '/dashboard.html'
        
        # API Status - Vérifier les services
        if path == '/api/status':
            self.send_api_status()
            return
            
        # API Global Status - HUD complet
        if path == '/api/global-status':
            self.send_global_status()
            return
            
        # API Reports - Liste des rapports
        if path == '/api/reports':
            self.send_api_reports()
            return
            
        # API Report - Contenu d'un rapport
        if path == '/api/report':
            report_file = query.get('file', [''])[0]
            self.send_api_report(report_file)
            return
            
        # API Tests - Statut des tests
        if path == '/api/tests':
            self.send_api_tests()
            return
            
        # API Start Tests - Lancer les tests
        if path == '/api/run-tests':
            self.run_tests_background()
            return
            
        # API Tests Status - Statut des tests en cours
        if path == '/api/tests-status':
            self.send_tests_status()
            return
        
        # Fichiers autorisés uniquement
        if path not in self.ALLOWED_FILES:
            self.send_error(403, "Accès refusé - Fichier non autorisé")
            return
            
        # Servir le fichier autorisé
        if path == '/dashboard.html':
            self.send_dashboard()
        else:
            super().do_GET()
    
    def send_dashboard(self):
        """Envoyer le dashboard avec HUD global intégré"""
        dashboard_content = self.get_enhanced_dashboard_with_hud()
        
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(dashboard_content.encode('utf-8'))))
        self.end_headers()
        self.wfile.write(dashboard_content.encode('utf-8'))
    
    def send_global_status(self):
        """API pour le statut global avec métriques système"""
        try:
            # Services
            services = {
                'backend': 8080,
                'frontend': 8000, 
                'temporal': 5173,
                'visualizer': 8001,
                'testrunner': 8888,
                'dashboard': 9000
            }
            
            service_status = {}
            for service, port in services.items():
                try:
                    result = subprocess.run(['curl', '-s', f'http://localhost:{port}'], 
                                          capture_output=True, timeout=2)
                    service_status[service] = {
                        'status': 'up' if result.returncode == 0 else 'down',
                        'port': port,
                        'response_time': '< 2s' if result.returncode == 0 else 'timeout'
                    }
                except:
                    service_status[service] = {
                        'status': 'down',
                        'port': port,
                        'response_time': 'error'
                    }
            
            # Métriques système
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            # Processus actifs
            processes = []
            for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']):
                try:
                    if any(keyword in proc.info['name'].lower() 
                          for keyword in ['java', 'python', 'node', 'mvn']):
                        processes.append(proc.info)
                except:
                    continue
            
            # Tests en cours
            test_processes = []
            for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
                try:
                    if proc.info['cmdline'] and any('test' in arg.lower() 
                                                   for arg in proc.info['cmdline']):
                        test_processes.append({
                            'pid': proc.info['pid'],
                            'name': proc.info['name'],
                            'command': ' '.join(proc.info['cmdline'][:3])
                        })
                except:
                    continue
            
            # Logs récents
            recent_logs = []
            log_files = glob.glob('*.log')
            for log_file in log_files[-5:]:  # 5 derniers logs
                try:
                    stat = os.stat(log_file)
                    recent_logs.append({
                        'file': log_file,
                        'size': stat.st_size,
                        'modified': datetime.fromtimestamp(stat.st_mtime).isoformat()
                    })
                except:
                    continue
            
            global_status = {
                'timestamp': datetime.now().isoformat(),
                'services': service_status,
                'system': {
                    'cpu_percent': cpu_percent,
                    'memory_percent': memory.percent,
                    'memory_used_gb': round(memory.used / (1024**3), 2),
                    'memory_total_gb': round(memory.total / (1024**3), 2),
                    'disk_percent': disk.percent,
                    'disk_free_gb': round(disk.free / (1024**3), 2)
                },
                'processes': processes[:10],  # Top 10
                'tests': test_processes,
                'logs': recent_logs,
                'uptime': self.get_uptime()
            }
            
            self.send_json_response(global_status)
            
        except Exception as e:
            self.send_json_response({'error': str(e), 'timestamp': datetime.now().isoformat()})
    
    def send_api_status(self):
        """API pour vérifier le statut des services"""
        import subprocess
        
        services = {
            'backend': 8080,
            'frontend': 8000, 
            'temporal': 5173,
            'visualizer': 8001,
            'testrunner': 8888
        }
        
        status = {}
        for service, port in services.items():
            try:
                result = subprocess.run(['curl', '-s', f'http://localhost:{port}'], 
                                      capture_output=True, timeout=2)
                status[service] = result.returncode == 0
            except:
                status[service] = False
        
        self.send_json_response(status)
    
    def send_api_tests(self):
        """API pour le statut des tests"""
        test_logs = glob.glob('test*live*.log') + glob.glob('tests-live-*.log')
        
        tests_status = []
        for log_file in test_logs:
            try:
                with open(log_file, 'r') as f:
                    content = f.read()
                    lines = content.split('\n')
                    
                tests_status.append({
                    'file': log_file,
                    'size': len(content),
                    'lines': len(lines),
                    'last_lines': lines[-10:] if len(lines) > 10 else lines,
                    'modified': datetime.fromtimestamp(os.path.getmtime(log_file)).isoformat()
                })
            except:
                continue
        
        self.send_json_response(tests_status)
    
    def send_api_reports(self):
        """API pour lister les rapports disponibles"""
        reports = []
        
        # Chercher tous les fichiers .md
        md_patterns = [
            "*.md", "**/*.md", "rapports/*.md", "docs/*.md", 
            "logs/*.md", "analysis/*.md"
        ]
        
        for pattern in md_patterns:
            for file_path in glob.glob(pattern, recursive=True):
                if os.path.isfile(file_path):
                    stat = os.stat(file_path)
                    reports.append({
                        'file': file_path,
                        'name': os.path.basename(file_path),
                        'size': stat.st_size,
                        'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                        'category': self.get_category(file_path)
                    })
        
        # Trier par date de modification
        reports.sort(key=lambda x: x['modified'], reverse=True)
        
        self.send_json_response(reports)
    
    def send_api_report(self, report_file):
        """API pour récupérer le contenu d'un rapport"""
        if not report_file or '..' in report_file:
            self.send_error(400, "Fichier invalide")
            return
            
        try:
            if os.path.exists(report_file) and report_file.endswith('.md'):
                with open(report_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Convertir en HTML
                html_content = markdown.markdown(content, extensions=['tables', 'codehilite'])
                
                response = {
                    'file': report_file,
                    'content': content,
                    'html': html_content,
                    'modified': datetime.fromtimestamp(os.path.getmtime(report_file)).isoformat()
                }
                
                self.send_json_response(response)
            else:
                self.send_error(404, "Rapport non trouvé")
        except Exception as e:
            self.send_error(500, f"Erreur: {str(e)}")
    
    def send_json_response(self, data):
        """Envoyer une réponse JSON"""
        json_data = json.dumps(data, ensure_ascii=False, indent=2)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(json_data.encode('utf-8'))))
        self.end_headers()
        self.wfile.write(json_data.encode('utf-8'))
    
    def get_category(self, file_path):
        """Déterminer la catégorie d'un fichier"""
        if 'rapport' in file_path.lower():
            return 'Rapports'
        elif 'test' in file_path.lower():
            return 'Tests'
        elif 'doc' in file_path.lower():
            return 'Documentation'
        elif 'analysis' in file_path.lower():
            return 'Analyses'
        elif 'grofi' in file_path.lower():
            return 'GROFI'
        else:
            return 'Général'
    
    def get_uptime(self):
        """Obtenir l'uptime du système"""
        try:
            uptime_seconds = psutil.boot_time()
            uptime = datetime.now().timestamp() - uptime_seconds
            hours = int(uptime // 3600)
            minutes = int((uptime % 3600) // 60)
            return f"{hours}h {minutes}m"
        except:
            return "N/A"
    
    def get_enhanced_dashboard_with_hud(self):
        """Générer le dashboard avec HUD global intégré"""
        return '''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎯 Heroes of Time - HUD Global</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            color: #e0e0e0;
            min-height: 100vh;
            padding: 10px;
            overflow-x: hidden;
        }
        
        .hud-container {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 20px;
            max-width: 1600px;
            margin: 0 auto;
        }
        
        .main-dashboard {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 15px;
            padding: 20px;
        }
        
        .hud-panel {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 15px;
            border-left: 4px solid #4ecdc4;
            max-height: 100vh;
            overflow-y: auto;
            position: sticky;
            top: 10px;
        }
        
        .dashboard-title {
            font-size: 2.5em;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShift 3s ease-in-out infinite;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .status-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .status-card:hover {
            transform: translateY(-2px);
            background: rgba(78, 205, 196, 0.1);
        }
        
        .status-card.active {
            border: 2px solid #4ecdc4;
            background: rgba(78, 205, 196, 0.1);
        }
        
        .status-card.inactive {
            opacity: 0.4;
            border: 2px solid #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
        }
        
        .status-icon {
            font-size: 2em;
            margin-bottom: 8px;
            display: block;
        }
        
        .status-name {
            font-size: 0.9em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .status-port {
            font-size: 0.8em;
            color: #4ecdc4;
            font-family: 'Courier New', monospace;
        }
        
        .hud-section {
            margin-bottom: 20px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 8px;
            padding: 12px;
        }
        
        .hud-title {
            color: #4ecdc4;
            font-size: 1em;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .metric {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .metric:last-child {
            border-bottom: none;
        }
        
        .metric-label {
            font-size: 0.85em;
            color: #a0a0a0;
        }
        
        .metric-value {
            font-size: 0.85em;
            font-weight: bold;
            color: #ffffff;
        }
        
        .metric-bar {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
            margin-top: 5px;
        }
        
        .metric-fill {
            height: 100%;
            background: linear-gradient(90deg, #4ecdc4, #45b7d1);
            transition: width 0.3s ease;
        }
        
        .process-item {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            padding: 8px;
            margin-bottom: 6px;
            font-size: 0.8em;
        }
        
        .process-name {
            font-weight: bold;
            color: #4ecdc4;
        }
        
        .process-details {
            color: #a0a0a0;
            margin-top: 3px;
        }
        
        .test-log {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
            padding: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.75em;
            max-height: 150px;
            overflow-y: auto;
            color: #e0e0e0;
            line-height: 1.3;
        }
        
        .launch-button {
            background: linear-gradient(45deg, #4ecdc4, #45b7d1);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 15px;
            font-size: 0.85em;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            margin-top: 8px;
        }
        
        .launch-button:hover {
            background: linear-gradient(45deg, #45b7d1, #4ecdc4);
            transform: scale(1.05);
        }
        
        .timestamp {
            color: #666;
            font-size: 0.8em;
            text-align: center;
            margin-top: 15px;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        .pulse { animation: pulse 2s infinite; }
        
        @media (max-width: 1200px) {
            .hud-container {
                grid-template-columns: 1fr;
            }
            .hud-panel {
                position: static;
                max-height: none;
            }
        }
    </style>
</head>
<body>
    <div class="hud-container">
        <div class="main-dashboard">
            <h1 class="dashboard-title">🎯 Heroes of Time - HUD Global</h1>
            
            <div class="status-grid" id="services-grid">
                <!-- Services seront chargés ici -->
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                <!-- Zone des rapports -->
                <div class="hud-section">
                    <div class="hud-title">📊 Rapports Récents</div>
                    <div id="reports-mini" style="max-height: 200px; overflow-y: auto;">
                        Chargement...
                    </div>
                </div>
                
                <!-- Zone des tests live -->
                <div class="hud-section">
                    <div class="hud-title">🧪 Tests Live</div>
                    <div id="tests-status">
                        Chargement...
                    </div>
                </div>
            </div>
        </div>
        
        <div class="hud-panel">
            <!-- Métriques système -->
            <div class="hud-section">
                <div class="hud-title">⚡ Système</div>
                <div id="system-metrics">
                    <div class="metric">
                        <span class="metric-label">CPU</span>
                        <span class="metric-value" id="cpu-value">--</span>
                    </div>
                    <div class="metric-bar">
                        <div class="metric-fill" id="cpu-bar" style="width: 0%"></div>
                    </div>
                    
                    <div class="metric">
                        <span class="metric-label">Mémoire</span>
                        <span class="metric-value" id="memory-value">--</span>
                    </div>
                    <div class="metric-bar">
                        <div class="metric-fill" id="memory-bar" style="width: 0%"></div>
                    </div>
                    
                    <div class="metric">
                        <span class="metric-label">Disque</span>
                        <span class="metric-value" id="disk-value">--</span>
                    </div>
                    <div class="metric-bar">
                        <div class="metric-fill" id="disk-bar" style="width: 0%"></div>
                    </div>
                    
                    <div class="metric">
                        <span class="metric-label">Uptime</span>
                        <span class="metric-value" id="uptime-value">--</span>
                    </div>
                </div>
            </div>
            
            <!-- Processus actifs -->
            <div class="hud-section">
                <div class="hud-title">🔄 Processus</div>
                <div id="processes-list">
                    Chargement...
                </div>
            </div>
            
            <!-- Tests en cours -->
            <div class="hud-section">
                <div class="hud-title">🧪 Tests Actifs</div>
                <div id="active-tests">
                    Chargement...
                </div>
            </div>
            
            <!-- Logs récents -->
            <div class="hud-section">
                <div class="hud-title">📝 Logs</div>
                <div id="recent-logs">
                    Chargement...
                </div>
            </div>
            
            <div class="timestamp" id="last-update">
                Dernière MAJ: --
            </div>
        </div>
    </div>

    <script>
        let globalStatus = {};
        
        const services = {
            backend: { name: 'Backend', icon: '⚙️', port: 8080, url: '/api/temporal/health' },
            frontend: { name: 'Frontend', icon: '🎮', port: 8000 },
            temporal: { name: 'Temporal', icon: '⚡', port: 5173 },
            visualizer: { name: 'Visualizer', icon: '🔬', port: 8001 },
            testrunner: { name: 'Test Runner', icon: '🧪', port: 8888 },
            dashboard: { name: 'Dashboard', icon: '🎯', port: 9000 }
        };
        
        async function loadGlobalStatus() {
            try {
                const response = await fetch('/api/global-status');
                globalStatus = await response.json();
                
                updateServicesGrid();
                updateSystemMetrics();
                updateProcesses();
                updateTests();
                updateLogs();
                updateTimestamp();
                
            } catch (error) {
                console.error('Erreur chargement statut global:', error);
            }
        }
        
        function updateServicesGrid() {
            const grid = document.getElementById('services-grid');
            let html = '';
            
            Object.entries(services).forEach(([key, service]) => {
                const status = globalStatus.services?.[key] || { status: 'unknown' };
                const isActive = status.status === 'up';
                
                html += `
                    <div class="status-card ${isActive ? 'active' : 'inactive'}" onclick="openService('${key}')">
                        <span class="status-icon">${service.icon}</span>
                        <div class="status-name">${service.name}</div>
                        <div class="status-port">:${service.port}</div>
                    </div>
                `;
            });
            
            grid.innerHTML = html;
        }
        
        function updateSystemMetrics() {
            if (!globalStatus.system) return;
            
            const sys = globalStatus.system;
            
            document.getElementById('cpu-value').textContent = `${sys.cpu_percent}%`;
            document.getElementById('cpu-bar').style.width = `${sys.cpu_percent}%`;
            
            document.getElementById('memory-value').textContent = `${sys.memory_percent}%`;
            document.getElementById('memory-bar').style.width = `${sys.memory_percent}%`;
            
            document.getElementById('disk-value').textContent = `${sys.disk_percent}%`;
            document.getElementById('disk-bar').style.width = `${sys.disk_percent}%`;
            
            document.getElementById('uptime-value').textContent = globalStatus.uptime || '--';
        }
        
        function updateProcesses() {
            const processList = document.getElementById('processes-list');
            
            if (!globalStatus.processes || globalStatus.processes.length === 0) {
                processList.innerHTML = '<div style="color: #666;">Aucun processus détecté</div>';
                return;
            }
            
            let html = '';
            globalStatus.processes.slice(0, 5).forEach(proc => {
                html += `
                    <div class="process-item">
                        <div class="process-name">${proc.name}</div>
                        <div class="process-details">PID: ${proc.pid} | CPU: ${(proc.cpu_percent || 0).toFixed(1)}%</div>
                    </div>
                `;
            });
            
            processList.innerHTML = html;
        }
        
        function updateTests() {
            const testsDiv = document.getElementById('active-tests');
            
            if (!globalStatus.tests || globalStatus.tests.length === 0) {
                testsDiv.innerHTML = '<div style="color: #666;">Aucun test en cours</div>';
                return;
            }
            
            let html = '';
            globalStatus.tests.forEach(test => {
                html += `
                    <div class="process-item">
                        <div class="process-name">${test.name}</div>
                        <div class="process-details">PID: ${test.pid}</div>
                    </div>
                `;
            });
            
            testsDiv.innerHTML = html;
        }
        
        function updateLogs() {
            const logsDiv = document.getElementById('recent-logs');
            
            if (!globalStatus.logs || globalStatus.logs.length === 0) {
                logsDiv.innerHTML = '<div style="color: #666;">Aucun log récent</div>';
                return;
            }
            
            let html = '';
            globalStatus.logs.slice(0, 3).forEach(log => {
                const size = (log.size / 1024).toFixed(1);
                html += `
                    <div class="process-item">
                        <div class="process-name">${log.file}</div>
                        <div class="process-details">${size} KB</div>
                    </div>
                `;
            });
            
            logsDiv.innerHTML = html;
        }
        
        function updateTimestamp() {
            const timestamp = new Date(globalStatus.timestamp).toLocaleTimeString('fr-FR');
            document.getElementById('last-update').textContent = `Dernière MAJ: ${timestamp}`;
        }
        
        function openService(serviceKey) {
            const service = services[serviceKey];
            if (service && globalStatus.services?.[serviceKey]?.status === 'up') {
                window.open(`http://localhost:${service.port}`, '_blank');
            }
        }
        
        // Chargement initial
        loadGlobalStatus();
        
        // Actualisation automatique
        setInterval(loadGlobalStatus, 10000); // Toutes les 10 secondes
        
        // Fonctions pour les tests et la mosaïque
        function runTests() {
            fetch('/api/run-tests', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('✅ Tests lancés en arrière-plan !');
                    } else {
                        alert('❌ Erreur: ' + data.error);
                    }
                });
        }
        
        function toggleMosaicView() {
            const mosaicDiv = document.getElementById('mosaic-view');
            if (!mosaicDiv) {
                createMosaicView();
            } else {
                mosaicDiv.style.display = mosaicDiv.style.display === 'none' ? 'block' : 'none';
            }
        }
        
        function createMosaicView() {
            const mosaicHTML = `
                <div id="mosaic-view" style="
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.9); z-index: 1000; display: block;
                    padding: 20px; box-sizing: border-box;
                ">
                    <div style="
                        display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
                        gap: 10px; width: 100%; height: 100%;
                    ">
                        <div style="background: white; border-radius: 10px; overflow: hidden;">
                            <div style="background: #007bff; color: white; padding: 10px; font-weight: bold;">🎮 Frontend (8000)</div>
                            <iframe src="http://localhost:8000" style="width: 100%; height: calc(100% - 50px); border: none;"></iframe>
                        </div>
                        <div style="background: white; border-radius: 10px; overflow: hidden;">
                            <div style="background: #28a745; color: white; padding: 10px; font-weight: bold;">⚡ Temporal (5173)</div>
                            <iframe src="http://localhost:5173" style="width: 100%; height: calc(100% - 50px); border: none;"></iframe>
                        </div>
                        <div style="background: white; border-radius: 10px; overflow: hidden;">
                            <div style="background: #17a2b8; color: white; padding: 10px; font-weight: bold;">🔬 Visualizer (8001)</div>
                            <iframe src="http://localhost:8001" style="width: 100%; height: calc(100% - 50px); border: none;"></iframe>
                        </div>
                        <div style="background: white; border-radius: 10px; overflow: hidden;">
                            <div style="background: #ffc107; color: black; padding: 10px; font-weight: bold;">📄 Rapports (8888)</div>
                            <iframe src="http://localhost:8888" style="width: 100%; height: calc(100% - 50px); border: none;"></iframe>
                        </div>
                    </div>
                    <button onclick="toggleMosaicView()" style="
                        position: absolute; top: 30px; right: 30px; 
                        background: #dc3545; color: white; border: none; 
                        padding: 10px 20px; border-radius: 5px; cursor: pointer;
                        font-size: 16px; font-weight: bold;
                    ">✕ Fermer</button>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', mosaicHTML);
        }

        console.log('🎯 HUD Global chargé !');
    </script>
</body>
</html>'''

    def run_tests_background(self):
        """Lancer les tests en arrière-plan"""
        try:
            import subprocess
            import threading
            
            def run_test():
                # Lancer le test rapide HOTS
                process = subprocess.Popen([
                    'bash', './scripts/test-rapide-hots.sh'
                ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                
                # Stocker le processus
                self.running_test = {
                    'pid': process.pid,
                    'start_time': datetime.now().isoformat(),
                    'status': 'running',
                    'script': 'test-rapide-hots.sh'
                }
                
                stdout, stderr = process.communicate()
                
                # Mettre à jour le statut
                self.running_test.update({
                    'status': 'completed' if process.returncode == 0 else 'failed',
                    'end_time': datetime.now().isoformat(),
                    'return_code': process.returncode,
                    'output': stdout,
                    'error': stderr
                })
            
            # Lancer dans un thread séparé
            thread = threading.Thread(target=run_test)
            thread.daemon = True
            thread.start()
            
            self.send_json_response({
                'success': True,
                'message': 'Tests lancés en arrière-plan',
                'test_type': 'test-rapide-hots'
            })
            
        except Exception as e:
            self.send_json_response({'error': str(e)}, 500)
    
    def send_tests_status(self):
        """Envoyer le statut des tests"""
        try:
            if hasattr(self, 'running_test'):
                self.send_json_response(self.running_test)
            else:
                self.send_json_response({'status': 'idle', 'message': 'Aucun test en cours'})
        except Exception as e:
            self.send_json_response({'error': str(e)}, 500)

def main():
    """Démarrer le serveur dashboard sécurisé avec HUD global"""
    
    print("🎯 Heroes of Time - Dashboard HUD Global")
    print("=" * 50)
    print(f"🚀 Démarrage du serveur sur le port {PORT}")
    print(f"📁 Répertoire: {os.getcwd()}")
    print(f"🔒 Mode sécurisé avec HUD global")
    print(f"🌐 Interface: http://localhost:{PORT}")
    print("=" * 50)
    
    # Vérifier les dépendances
    try:
        import markdown
        import psutil
    except ImportError as e:
        print(f"⚠️  Module manquant: {e}")
        print("Installation des dépendances...")
        os.system("pip3 install markdown psutil")
        import markdown
        import psutil
    
    try:
        with socketserver.TCPServer(("", PORT), SecureDashboardHandler) as httpd:
            print("✅ Serveur HUD Global démarré avec succès")
            print(f"🎯 Ouvrez http://localhost:{PORT} dans votre navigateur")
            print("🛑 Appuyez sur Ctrl+C pour arrêter le serveur")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Arrêt du serveur HUD Global...")
    except Exception as e:
        print(f"❌ Erreur: {e}")

if __name__ == "__main__":
    main() 