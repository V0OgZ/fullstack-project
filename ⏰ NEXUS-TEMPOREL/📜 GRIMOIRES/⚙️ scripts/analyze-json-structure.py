#!/usr/bin/env python3
"""
Analyse la structure du JSON des tatouages pour identifier les problèmes
"""

import json
import re

def find_json_errors(filename):
    """Trouve les erreurs de structure JSON"""
    print(f"🔍 Analyse du fichier: {filename}")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Compter les accolades et crochets
    open_braces = content.count('{')
    close_braces = content.count('}')
    open_brackets = content.count('[')
    close_brackets = content.count(']')
    
    print(f"\n📊 Statistiques:")
    print(f"  Accolades ouvrantes '{'{'}': {open_braces}")
    print(f"  Accolades fermantes '{'}'}': {close_braces}")
    print(f"  Crochets ouvrants '[': {open_brackets}")
    print(f"  Crochets fermants ']': {close_brackets}")
    
    if open_braces != close_braces:
        print(f"  ❌ Déséquilibre accolades: {open_braces - close_braces} non fermées")
    if open_brackets != close_brackets:
        print(f"  ❌ Déséquilibre crochets: {open_brackets - close_brackets} non fermés")
    
    # Chercher les patterns problématiques
    print("\n🔍 Recherche de patterns problématiques...")
    
    # Pattern: tableau suivi d'objet sans virgule dans le tableau
    pattern1 = re.findall(r'\]\s*,\s*\{', content)
    if pattern1:
        print(f"  ⚠️  Trouvé {len(pattern1)} occurrences de '],{{' (objets après tableaux)")
    
    # Pattern: recursive_depth infinie
    if '"recursive_depth": "∞"' in content:
        print("  ⚠️  Trouvé recursive_depth infinie")
    
    # Essayer de parser ligne par ligne pour trouver l'erreur
    lines = content.split('\n')
    print(f"\n📝 Analyse ligne par ligne ({len(lines)} lignes)...")
    
    # Chercher la ligne 131 mentionnée dans l'erreur
    if len(lines) >= 131:
        print(f"\n🎯 Ligne 131:")
        print(f"  {lines[130][:100]}...")
        
        # Contexte autour
        print(f"\n📋 Contexte (lignes 129-133):")
        for i in range(128, min(133, len(lines))):
            print(f"  {i+1}: {lines[i][:80]}...")

if __name__ == "__main__":
    find_json_errors("🎮 game_assets/artifacts/mineurs/tatouages_memento_archiviste.json")