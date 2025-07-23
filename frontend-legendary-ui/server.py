#!/usr/bin/env python3
"""
🏛️ SERVEUR UI LÉGENDAIRE RETROUVÉE
Port: 5190
Commit source: 8d48236 (Unify UI with animated heroes)
"""

import http.server
import socketserver
import os
import sys

PORT = 5190

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for API calls
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
        
    def log_message(self, format, *args):
        print(f"🎮 [{self.address_string()}] {format % args}")

if __name__ == "__main__":
    # Change to the directory containing the UI files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("🏛️ =" * 50)
    print("🔥 LANCEMENT UI LÉGENDAIRE RETROUVÉE !")
    print(f"📍 Port: {PORT}")
    print("🎯 Source: git commit 8d48236")
    print("✨ Features: Animated heroes + Particles + Smooth movement")
    print("🌐 URL: http://localhost:5190")
    print("🏛️ =" * 50)
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"\n🚀 Serveur UI légendaire démarré sur http://localhost:{PORT}")
            print("🎮 Prêt à revivre la LÉGENDE !")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n⭐ UI légendaire fermée. À bientôt !")
    except Exception as e:
        print(f"❌ Erreur: {e}")
        sys.exit(1) 