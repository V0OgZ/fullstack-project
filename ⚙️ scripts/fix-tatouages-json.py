#!/usr/bin/env python3
"""
Script pour corriger les boucles infinies dans le JSON des tatouages Memento
"""

import json
import sys
from datetime import datetime

def fix_recursive_depth(obj):
    """Remplace les profondeurs infinies par des valeurs finies"""
    if isinstance(obj, dict):
        for key, value in obj.items():
            if key == "recursive_depth" and value == "∞":
                obj[key] = 10  # Limite raisonnable
                print(f"  ✅ Corrigé recursive_depth infinie → 10")
            elif isinstance(value, (dict, list)):
                fix_recursive_depth(value)
    elif isinstance(obj, list):
        for item in obj:
            fix_recursive_depth(item)
    return obj

def simplify_large_arrays(obj, max_items=100):
    """Limite la taille des tableaux trop grands"""
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(value, list) and len(value) > max_items:
                print(f"  ⚠️  Tableau '{key}' tronqué: {len(value)} → {max_items} éléments")
                obj[key] = value[:max_items]
            elif isinstance(value, (dict, list)):
                simplify_large_arrays(value, max_items)
    elif isinstance(obj, list):
        for item in obj:
            if isinstance(item, (dict, list)):
                simplify_large_arrays(item, max_items)
    return obj

def remove_circular_references(obj, path="", seen=None):
    """Détecte et supprime les références circulaires"""
    if seen is None:
        seen = set()
    
    obj_id = id(obj)
    if obj_id in seen:
        print(f"  🔄 Référence circulaire détectée à: {path}")
        return None
    
    if isinstance(obj, dict):
        seen.add(obj_id)
        cleaned = {}
        for key, value in obj.items():
            new_path = f"{path}.{key}" if path else key
            cleaned_value = remove_circular_references(value, new_path, seen.copy())
            if cleaned_value is not None:
                cleaned[key] = cleaned_value
        return cleaned
    elif isinstance(obj, list):
        seen.add(obj_id)
        cleaned = []
        for i, item in enumerate(obj):
            new_path = f"{path}[{i}]"
            cleaned_value = remove_circular_references(item, new_path, seen.copy())
            if cleaned_value is not None:
                cleaned.append(cleaned_value)
        return cleaned
    else:
        return obj

def main():
    input_file = "game_assets/artifacts/mineurs/tatouages_memento_archiviste.json"
    output_file = "game_assets/artifacts/mineurs/tatouages_memento_archiviste_fixed.json"
    
    print("🔧 Correction des tatouages Memento...")
    print(f"📖 Lecture de: {input_file}")
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print("✅ JSON chargé avec succès")
        
        # Corrections
        print("\n🔄 Application des corrections...")
        data = fix_recursive_depth(data)
        data = simplify_large_arrays(data)
        data = remove_circular_references(data)
        
        # Mise à jour de la date
        data['last_update'] = datetime.now().isoformat()
        data['fixed_version'] = True
        data['fix_reason'] = "Correction des boucles infinies et structures récursives"
        
        # Sauvegarde
        print(f"\n💾 Sauvegarde vers: {output_file}")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print("✅ Correction terminée avec succès!")
        
        # Vérification
        with open(output_file, 'r', encoding='utf-8') as f:
            json.load(f)  # Test de chargement
        print("✅ JSON corrigé valide")
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()