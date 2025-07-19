#!/usr/bin/env python3
"""
⚔️ SERVEUR INTERFACE TEMPORELLE LÉGENDAIRE
Port: 5174
Source: git commit 70ce33f (17 juillet 21h49)
"""

import http.server
import socketserver
import os
import sys

PORT = 5174

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
        print(f"⚔️ [{self.address_string()}] {format % args}")

if __name__ == "__main__":
    # Change to the directory containing the UI files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("⚔️ =" * 50)
    print("🔥 LANCEMENT INTERFACE TEMPORELLE LÉGENDAIRE !")
    print(f"📍 Port: {PORT}")
    print("🎯 Source: git commit 70ce33f (17 juillet 21h49)")
    print("⚔️ Features: Épée temporelle animée + Configuration Temporelle")
    print("🎨 Effets: temporalPulse, energyField, temporalAura")
    print(f"🌐 URL: http://localhost:{PORT}")
    print("⚔️ =" * 50)
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"\n🚀 Interface temporelle légendaire démarrée sur http://localhost:{PORT}")
            print("⚔️ Configuration Temporelle restaurée !")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n⭐ Interface temporelle fermée. À bientôt !")
    except Exception as e:
        print(f"❌ Erreur: {e}")
        sys.exit(1) 