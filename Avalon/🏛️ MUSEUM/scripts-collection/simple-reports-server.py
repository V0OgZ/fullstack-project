#!/usr/bin/env python3
"""
📄 Simple Reports Server - Juste pour les rapports MD
"""

import os
import json
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
import socketserver

PORT = 8888
REPORTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'rapports')

class SimpleReportsHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == '/':
            self.serve_reports_list()
        elif path.startswith('/report/'):
            report_name = path.split('/')[-1]
            self.serve_report(report_name)
        else:
            self.send_error(404)
    
    def serve_reports_list(self):
        """Servir la liste des rapports"""
        html = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>📄 Rapports MD - Heroes of Time</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
        h1 { color: #2c3e50; text-align: center; }
        .report-list { list-style: none; padding: 0; }
        .report-item { margin: 10px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; }
        .report-item a { text-decoration: none; color: #007bff; font-weight: bold; }
        .report-meta { font-size: 0.9em; color: #6c757d; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📄 Rapports MD - Heroes of Time</h1>
        <ul class="report-list">"""
        
        try:
            if os.path.exists(REPORTS_DIR):
                for filename in sorted(os.listdir(REPORTS_DIR)):
                    if filename.endswith('.md'):
                        filepath = os.path.join(REPORTS_DIR, filename)
                        stats = os.stat(filepath)
                        size_kb = round(stats.st_size / 1024, 1)
                        modified = datetime.fromtimestamp(stats.st_mtime).strftime('%d/%m/%Y %H:%M')
                        
                        display_name = filename.replace('_', ' ').replace('.md', '')
                        
                        html += f"""
            <li class="report-item">
                <a href="/report/{filename}">{display_name}</a>
                <div class="report-meta">📅 {modified} • 📊 {size_kb} KB</div>
            </li>"""
            else:
                html += '<li>❌ Dossier rapports/ non trouvé</li>'
        except Exception as e:
            html += f'<li>❌ Erreur: {str(e)}</li>'
        
        html += """
        </ul>
    </div>
</body>
</html>"""
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(html.encode('utf-8'))
    
    def serve_report(self, report_name):
        """Servir un rapport spécifique"""
        if '..' in report_name or '/' in report_name:
            self.send_error(403)
            return
        
        report_path = os.path.join(REPORTS_DIR, report_name)
        
        if not os.path.exists(report_path) or not report_name.endswith('.md'):
            self.send_error(404)
            return
        
        try:
            with open(report_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>📄 {report_name}</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }}
        .container {{ max-width: 1000px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }}
        .header {{ border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }}
        .back-link {{ color: #007bff; text-decoration: none; font-size: 1.1em; }}
        .content {{ font-family: 'Courier New', monospace; line-height: 1.6; white-space: pre-wrap; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="/" class="back-link">← Retour à la liste</a>
            <h1>📄 {report_name}</h1>
        </div>
        <div class="content">{content}</div>
    </div>
</body>
</html>"""
            
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(html.encode('utf-8'))
            
        except Exception as e:
            self.send_error(500, str(e))

def main():
    print("📄 Simple Reports Server")
    print(f"🚀 Démarrage sur le port {PORT}")
    print(f"📁 Dossier rapports: {REPORTS_DIR}")
    print(f"🌐 http://localhost:{PORT}")
    
    try:
        with socketserver.TCPServer(("", PORT), SimpleReportsHandler) as httpd:
            print("✅ Serveur démarré")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Arrêt du serveur")

if __name__ == "__main__":
    main() 