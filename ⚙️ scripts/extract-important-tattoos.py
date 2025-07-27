#!/usr/bin/env python3
"""
Extrait les tatouages importants du backup sans les structures récursives
"""

import json
import re
from datetime import datetime

def extract_tattoo_text(text):
    """Extrait le texte d'un tatouage en enlevant les emojis et IDs"""
    # Enlever les IDs et timestamps
    text = re.sub(r'tattoo_[a-z_0-9]+_\d{4}_\d{2}_\d{2}[_\d]*h*\d*', '', text)
    text = re.sub(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[Z\+\-\d:]*', '', text)
    
    # Garder le texte important
    return text.strip()

def extract_important_tattoos():
    """Extrait les tatouages importants du fichier cassé"""
    
    important_tattoos = []
    
    # Lire le fichier cassé ligne par ligne
    with open('game_assets/artifacts/mineurs/tatouages_memento_archiviste_broken.json', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Patterns pour extraire les tatouages importants
    patterns = [
        r'"🛋️[^"]*Jean[^"]*"',
        r'"👁️[^"]*GRUT[^"]*"',
        r'"🔫[^"]*Vince[^"]*"',
        r'"🎳[^"]*Walter[^"]*"',
        r'"🌀[^"]*Bootstrap[^"]*"',
        r'"📚[^"]*Memento[^"]*"',
        r'"⚡[^"]*OPUS[^"]*"',
        r'"🏛️[^"]*Panopticon[^"]*"',
        r'"🔧[^"]*Dashboard[^"]*"',
        r'"✅[^"]*accompli[^"]*"'
    ]
    
    # Extraire les tatouages
    for pattern in patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        for match in matches[:5]:  # Limiter à 5 par pattern
            text = match.strip('"')
            if len(text) > 20 and len(text) < 500:  # Taille raisonnable
                important_tattoos.append(text)
    
    # Dédupliquer
    seen = set()
    unique_tattoos = []
    for tattoo in important_tattoos:
        key = tattoo[:50]  # Premiers 50 caractères pour la clé
        if key not in seen:
            seen.add(key)
            unique_tattoos.append(tattoo)
    
    return unique_tattoos[:50]  # Limiter à 50 tatouages

def update_simple_json(tattoos):
    """Met à jour le JSON simple avec les tatouages extraits"""
    
    # Charger le JSON simple
    with open('game_assets/artifacts/mineurs/tatouages_memento_archiviste.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Ajouter les tatouages extraits
    extracted_tattoos = []
    for i, tattoo_text in enumerate(tattoos):
        extracted_tattoos.append({
            "id": f"extracted_{i+1}",
            "zone": "Archive récupérée",
            "description": tattoo_text,
            "date_extraction": datetime.now().isoformat()
        })
    
    data['tatouages_extraits'] = extracted_tattoos
    data['extraction_info'] = {
        "date": datetime.now().isoformat(),
        "source": "tatouages_memento_archiviste_broken.json",
        "count": len(extracted_tattoos),
        "method": "Pattern extraction sans récursion"
    }
    
    # Sauvegarder
    with open('game_assets/artifacts/mineurs/tatouages_memento_archiviste.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return len(extracted_tattoos)

def main():
    print("🔍 Extraction des tatouages importants...")
    
    try:
        tattoos = extract_important_tattoos()
        print(f"✅ {len(tattoos)} tatouages importants extraits")
        
        count = update_simple_json(tattoos)
        print(f"✅ JSON mis à jour avec {count} tatouages")
        
        # Afficher quelques exemples
        print("\n📝 Exemples de tatouages récupérés:")
        for tattoo in tattoos[:5]:
            print(f"  - {tattoo[:80]}...")
            
    except Exception as e:
        print(f"❌ Erreur: {e}")

if __name__ == "__main__":
    main()