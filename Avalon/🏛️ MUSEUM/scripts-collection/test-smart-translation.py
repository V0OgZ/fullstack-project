#!/usr/bin/env python3
"""
Script de test pour le service de traduction SIMPLIFIÉ
FOCUS: Formules runiques ψ + JSON assets avec vrais mots-clés
"""

import json
import re
import random
import requests
from pathlib import Path

class SmartTranslator:
    def __init__(self):
        self.hero_data = {}
        self.backend_url = "http://localhost:8080"
        self.translation_endpoint = f"{self.backend_url}/api/translate"
        self.load_hero_data()
    
    def call_translation_service(self, text):
        """Appelle le service de traduction Java backend"""
        try:
            payload = {
                "text": text,
                "context": {
                    "translation_mode": True,
                    "narrative_output": True
                }
            }
            
            response = requests.post(
                self.translation_endpoint,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=5
            )
            
            if response.status_code == 200:
                result = response.json()
                # Extraire la traduction du service Java
                if "traduction" in result:
                    return result["traduction"]
                elif "message" in result:
                    return result["message"]
                else:
                    return str(result)
            else:
                return f"❌ Backend error {response.status_code}"
                
        except requests.exceptions.RequestException as e:
            return f"❌ Connexion backend échouée: {e}"
        except Exception as e:
            return f"❌ Erreur moteur unifié: {e}"

    def load_hero_data(self):
        """Charge les données des héros depuis les fichiers JSON"""
        hero_files = [
            "🖥️ backend/src/main/resources/heroes/legendary/Arthur.json",
            "🖥️ backend/src/main/resources/heroes/legendary/Ragnar.json", 
            "🖥️ backend/src/main/resources/heroes/memento.json"
        ]
        
        for file_path in hero_files:
            try:
                if Path(file_path).exists():
                    with open(file_path, 'r', encoding='utf-8') as f:
                        hero = json.load(f)
                        name = hero.get('name', Path(file_path).stem)
                        self.hero_data[name] = hero
                        print(f"✅ Chargé: {name}")
                else:
                    print(f"❌ Fichier non trouvé: {file_path}")
            except Exception as e:
                print(f"❌ Erreur lors du chargement de {file_path}: {e}")

    def is_runic_formula(self, text):
        """Vérifie si c'est une formule runique avec symboles ψ, ⊙, †"""
        return bool(re.search(r'[ψ⊙†]', text))
    
    def has_json_keywords(self, text):
        """Vérifie si le texte contient des mots-clés JSON assets"""
        keywords = ['paradoxRisk', 'temporalStability', 'affectedRadius', 'damage', 'healing', 'manaRestoration']
        return any(keyword in text for keyword in keywords)

    def translate_script(self, script):
        """Traduit SEULEMENT formules runiques et JSON assets"""
        # 🔥 FOCUS: Formules runiques avec symboles
        if self.is_runic_formula(script):
            return self.call_translation_service(script)
        
        # 🔥 FOCUS: JSON assets avec vrais mots-clés
        if self.has_json_keywords(script):
            return self.call_translation_service(script)
        
        # ❌ IGNORE: Commandes HOTS simples sans symboles
        return f"⚠️ IGNORÉ (pas runic/JSON): {script[:30]}..."

def test_focused_translation():
    """Test FOCUS sur formules runiques et JSON assets"""
    translator = SmartTranslator()
    
    print("\n" + "="*60)
    print("🧪 TEST TRADUCTION FOCUS - RUNIQUES + JSON SEULEMENT")
    print("="*60)
    print("🎯 ACCEPTÉ: Formules avec ψ, ⊙, † + JSON avec mots-clés")
    print("❌ IGNORÉ: Commandes HOTS simples")
    print("="*60)
    
    # Tests FOCUS
    focus_tests = [
        # ✅ FORMULES RUNIQUES
        "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))",
        "ψ002: ⊙(HEAL_HERO Arthur 999) ⟶ DAMAGE_ENEMY(all_enemies, 500)",
        "†ψ001",
        
        # ✅ JSON ASSETS
        '{"paradoxRisk": 0.3, "temporalStability": 0.8}',
        '{"damage": 100, "healing": 50, "manaRestoration": 25}',
        
        # ❌ IGNORÉS
        "HERO(Arthur)",
        "MOV(Arthur, @10,10)",
        "BATTLE(Arthur, Ragnar)"
    ]
    
    print("\n🎯 TESTS FOCUS:")
    print("-" * 40)
    
    for test in focus_tests:
        translated = translator.translate_script(test)
        print(f"📝 AVANT: {test}")
        print(f"✨ APRÈS: {translated}")
        print()
    
    print("\n" + "="*60)
    print("✅ TESTS FOCUS TERMINÉS!")
    print("="*60)

if __name__ == "__main__":
    test_focused_translation()