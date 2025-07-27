#!/usr/bin/env python3
"""
Test JSON Assets - Validation des fichiers JSON du projet
"""

import json
import os
import sys
from pathlib import Path

def test_json_file(file_path):
    """Teste si un fichier JSON est valide"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            json.load(f)
        return True, None
    except json.JSONDecodeError as e:
        return False, f"JSON invalide: {e}"
    except Exception as e:
        return False, f"Erreur: {e}"

def main():
    """Fonction principale"""
    project_root = Path(__file__).parent.parent.parent
    json_files = []
    
    # Chercher tous les fichiers JSON
    for pattern in ['**/*.json']:
        json_files.extend(project_root.glob(pattern))
    
    print(f"🧪 Test des assets JSON - {len(json_files)} fichiers trouvés")
    print("=" * 60)
    
    valid_count = 0
    invalid_count = 0
    invalid_files = []
    
    for json_file in json_files:
        # Ignorer certains dossiers
        if any(skip in str(json_file) for skip in ['node_modules', '.git', 'target', 'build']):
            continue
            
        is_valid, error = test_json_file(json_file)
        
        if is_valid:
            print(f"✅ {json_file.relative_to(project_root)}")
            valid_count += 1
        else:
            print(f"❌ {json_file.relative_to(project_root)} - {error}")
            invalid_count += 1
            invalid_files.append((str(json_file.relative_to(project_root)), error))
    
    print("\n" + "=" * 60)
    print(f"📊 RÉSULTATS:")
    print(f"✅ Fichiers valides: {valid_count}")
    print(f"❌ Fichiers invalides: {invalid_count}")
    
    if invalid_files:
        print(f"\n🔧 FICHIERS À CORRIGER:")
        for file_path, error in invalid_files:
            print(f"  • {file_path}: {error}")
        return 1
    else:
        print(f"\n🎉 Tous les fichiers JSON sont valides !")
        return 0

if __name__ == "__main__":
    sys.exit(main()) 