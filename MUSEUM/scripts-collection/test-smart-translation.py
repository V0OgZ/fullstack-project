#!/usr/bin/env python3
"""
Script de test pour le nouveau service de traduction intelligent
Teste sur de vrais fichiers HOTS et JSON - INTÉGRÉ AVEC MOTEUR UNIFIÉ
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
        self.magic_formula_endpoint = f"{self.backend_url}/api/magic-formulas/execute"
        self.load_hero_data()
        self.setup_variations()
    
    def call_magic_formula_engine(self, formula):
        """Appelle le moteur unifié pour traduction + exécution"""
        try:
            payload = {
                "formula": formula,
                "context": {
                    "translation_mode": True,
                    "narrative_output": True
                }
            }
            
            response = requests.post(
                self.magic_formula_endpoint,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=5
            )
            
            if response.status_code == 200:
                result = response.json()
                # Extraire la traduction narrative du moteur unifié
                if "normalInterpretation" in result:
                    return result["normalInterpretation"]
                elif "message" in result:
                    return result["message"]
            else:
                print(f"⚠️ Backend error {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"⚠️ Connexion backend échouée: {e}")
        except Exception as e:
            print(f"⚠️ Erreur moteur unifié: {e}")
        
        # Fallback vers traduction locale si backend indisponible
        return None

    def load_hero_data(self):
        """Charge les données des héros depuis les fichiers JSON"""
        hero_files = [
            "backend/src/main/resources/heroes/legendary/Arthur.json",
            "backend/src/main/resources/heroes/legendary/Ragnar.json", 
            "backend/src/main/resources/heroes/memento.json"
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
    
    def setup_variations(self):
        """Configure les variations pour chaque héros"""
        self.hero_variations = {
            'Arthur': [
                "Arthur surgit dans un éclat de lumière dorée, Excalibur scintillant",
                "Le Roi Temporel Arthur apparaît dans une aura de leadership royal",
                "Arthur émerge des brumes du temps, sa couronne brillant de pouvoir",
                "Le maître des flux temporels Arthur se matérialise avec majesté",
                "Arthur, protecteur des timelines, arrive dans un tonnerre de gloire"
            ],
            'Ragnar': [
                "Ragnar déferle dans un grondement de tonnerre, Mjolnir étincelant",
                "Le Chef de Guerre Temporel surgit dans une tempête de foudre", 
                "Ragnar bondit des brumes nordiques, sa rage berserker palpable",
                "Le conquérant des timelines apparaît dans un fracas de bataille",
                "Ragnar émerge des tempêtes temporelles, soif de conquête au cœur"
            ],
            'Memento': [
                "Memento se révèle depuis les archives éternelles, codex en main",
                "La Mémoire Vivante émerge des chroniques du multivers",
                "Memento apparaît dans un tourbillon de souvenirs cristallisés",
                "Le Scribe Temporel se matérialise, stylus de réalité scintillant",
                "Memento surgit des profondeurs de la mémoire collective"
            ]
        }
        
        self.psi_variations = [
            "Un sort de destinée se tisse dans les fils du temps",
            "Une prophétie s'écrit dans les brumes du futur", 
            "Un enchantement prend forme dans les méandres temporels",
            "Une vision se cristallise dans l'éther mystique",
            "Un rituel s'amorce dans les courants du destin"
        ]
        
        self.collapse_variations = [
            "Le sort se réalise dans un éclat de magie pure",
            "La prophétie s'accomplit dans un tonnerre mystique",
            "L'enchantement se matérialise en réalité tangible", 
            "La vision devient réalité dans un flash aveuglant",
            "Le rituel atteint son apogée magique"
        ]
    
    def translate_heroes(self, script):
        """Traduit les héros avec variations"""
        def replace_hero(match):
            hero_name = match.group(1)
            variations = self.hero_variations.get(hero_name)
            if variations:
                return random.choice(variations)
            else:
                return f"Le héros légendaire {hero_name} entre en scène avec détermination"
        
        return re.sub(r'HERO\(([^)]+)\)', replace_hero, script)
    
    def translate_movements(self, script):
        """Traduit les mouvements avec contexte"""
        def replace_movement(match):
            hero_name = match.group(1)
            x, y = match.group(2), match.group(3)
            
            hero = self.hero_data.get(hero_name)
            if hero:
                hero_class = hero.get('class', '')
                speed = hero.get('stats', {}).get('speed', 5)
                
                if 'KING' in hero_class or hero_name == 'Arthur':
                    return f"{hero_name} avance avec la majesté royale vers les coordonnées ({x}, {y})"
                elif 'WARRIOR' in hero_class or hero_name == 'Ragnar':
                    return f"{hero_name} charge avec fougue guerrière vers ({x}, {y})"
                elif 'Scribe' in hero_class or hero_name == 'Memento':
                    return f"{hero_name} glisse silencieusement à travers les dimensions vers ({x}, {y})"
                elif speed >= 7:
                    return f"{hero_name} bondit avec agilité vers les coordonnées ({x}, {y})"
                elif speed <= 4:
                    return f"{hero_name} progresse avec détermination vers ({x}, {y})"
            
            return f"{hero_name} s'élance vers sa destinée aux coordonnées ({x}, {y})"
        
        return re.sub(r'MOV\(([^,]+),\s*@(\d+),(\d+)\)', replace_movement, script)
    
    def translate_abilities(self, script):
        """Traduit les capacités avec les vraies descriptions"""
        def replace_ability(match):
            hero_name = match.group(1)
            ability_name = match.group(2)
            
            hero = self.hero_data.get(hero_name)
            if hero and 'abilities' in hero:
                abilities = hero['abilities']
                if ability_name in abilities:
                    ability = abilities[ability_name]
                    name = ability.get('name', ability_name)
                    desc = ability.get('description', '')
                    return f"{hero_name} déchaîne {name} : {desc}"
            
            return f"{hero_name} active son pouvoir mystique de {ability_name}"
        
        return re.sub(r'ABILITY\(([^,]+),\s*([^)]+)\)', replace_ability, script)
    
    def translate_psi_states(self, script):
        """Traduit les états ψ avec variété"""
        def replace_psi(match):
            content = match.group(1)  # Changé de group(2) à group(1)
            variation = random.choice(self.psi_variations)
            return f"{variation} : {content}"
        
        script = re.sub(r'ψ\d+:\s*⊙\((.*?)\)', replace_psi, script)
        
        # Collapse
        def replace_collapse(match):
            return random.choice(self.collapse_variations)
        
        script = re.sub(r'†ψ\d+', replace_collapse, script)
        
        return script
    
    def translate_artifacts(self, script):
        """Traduit les artefacts avec descriptions"""
        artifact_descriptions = {
            'excalibur': "dégaine Excalibur, l'épée légendaire qui fend les timelines",
            'mjolnir': "brandit Mjolnir, marteau du tonnerre qui frappe à travers les réalités",
            'avant_world_blade': "active la Lame d'Avant-Monde, écrivant l'avenir du combat",
            'reverse_clock': "manipule l'Horloge du Dernier Instant, inversant le cours du temps",
            'codex_memento': "consulte le Codex de Memento, livre de toutes les mémoires"
        }
        
        def replace_use(match):
            item_type = match.group(1)
            item_name = match.group(2)
            hero_name = match.group(3) if match.group(3) else None
            
            description = artifact_descriptions.get(item_name.lower(), f"active {item_name} avec maîtrise")
            
            if hero_name:
                return f"{hero_name} {description}"
            else:
                return description
        
        return re.sub(r'USE\(([^,]+),\s*([^,]+)(?:,\s*HERO:([^)]+))?\)', replace_use, script)
    
    def translate_battles(self, script):
        """Traduit les batailles"""
        battle_variations = [
            "livre une bataille épique contre",
            "engage un duel légendaire avec", 
            "affronte dans un combat titanesque",
            "défie dans une lutte héroïque",
            "combat dans un affrontement mythique"
        ]
        
        def replace_battle(match):
            hero1 = match.group(1)
            hero2 = match.group(2)
            variation = random.choice(battle_variations)
            return f"{hero1} {variation} {hero2}"
        
        return re.sub(r'BATTLE\(([^,]+),\s*([^)]+)\)', replace_battle, script)
    
    def cleanup(self, script):
        """Nettoie la traduction"""
        script = re.sub(r'@(\d+),(\d+)', r'(\1, \2)', script)
        script = re.sub(r'Δt\+(\d+)', r'dans \1 tours', script)
        script = re.sub(r'\s+', ' ', script)
        return script.strip()
    
    def translate_script(self, script):
        """Traduit un script complet - MOTEUR UNIFIÉ D'ABORD"""
        # 🔥 PRIORITÉ 1: Essayer le moteur unifié magic-formulas
        unified_translation = self.call_magic_formula_engine(script)
        if unified_translation:
            return unified_translation
        
        # 🔄 FALLBACK: Traduction locale si backend indisponible
        print(f"🔄 Fallback traduction locale pour: {script[:50]}...")
        result = script
        result = self.translate_heroes(result)
        result = self.translate_movements(result)
        result = self.translate_abilities(result)
        result = self.translate_psi_states(result)
        result = self.translate_artifacts(result)
        result = self.translate_battles(result)
        result = self.cleanup(result)
        return result

def test_on_files():
    """Teste la traduction sur de vrais fichiers"""
    translator = SmartTranslator()
    
    # Fichiers à tester
    test_files = [
        "game_assets/scenarios/hots/epic-arthur-vs-ragnar.hots",
        "backend/src/main/resources/heroes/legendary/Arthur.json",
        "MEMENTO/TRADUCTION_FICHIER_HOTS_ÉPIQUE_ET_ARTEFACTS_COMPLETS.md"
    ]
    
    print("\n" + "="*60)
    print("🧪 TEST DU SYSTÈME DE TRADUCTION INTELLIGENT - MOTEUR UNIFIÉ")
    print("="*60)
    print("🔥 INTÉGRATION: Service connecté au MagicFormulaEngine (port 8080)")
    print("🔄 FALLBACK: Traduction locale si backend indisponible")
    print("="*60)
    
    # Tests simples d'abord
    simple_tests = [
        "HERO(Arthur)",
        "HERO(Ragnar)", 
        "HERO(Memento)",
        "MOV(Arthur, @10,10)",
        "MOV(Ragnar, @25,25)",
        "ABILITY(Arthur, temporal_leadership)",
        "ABILITY(Memento, archivage_immediat)",
        "USE(ARTIFACT, excalibur, HERO:Arthur)",
        "USE(ARTIFACT, mjolnir, HERO:Ragnar)",
        "BATTLE(Arthur, Ragnar)",
        "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))",
        "†ψ001"
    ]
    
    print("\n🔬 TESTS SIMPLES:")
    print("-" * 40)
    
    for test in simple_tests:
        translated = translator.translate_script(test)
        print(f"📝 AVANT: {test}")
        print(f"✨ APRÈS: {translated}")
        print()
    
    # Test sur fichiers réels
    print("\n📁 TESTS SUR FICHIERS RÉELS:")
    print("-" * 40)
    
    for file_path in test_files:
        if Path(file_path).exists():
            print(f"\n📄 Fichier: {file_path}")
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extraire quelques lignes HOTS
                hots_lines = []
                for line in content.split('\n'):
                    line = line.strip()
                    if any(keyword in line for keyword in ['HERO(', 'MOV(', 'ABILITY(', 'USE(', 'BATTLE(', 'ψ']):
                        hots_lines.append(line)
                        if len(hots_lines) >= 5:  # Limiter à 5 lignes
                            break
                
                if hots_lines:
                    print("🔍 Lignes HOTS trouvées:")
                    for line in hots_lines:
                        translated = translator.translate_script(line)
                        print(f"  📝 AVANT: {line}")
                        print(f"  ✨ APRÈS: {translated}")
                        print()
                else:
                    print("  ❌ Aucune ligne HOTS trouvée")
                    
            except Exception as e:
                print(f"  ❌ Erreur: {e}")
        else:
            print(f"❌ Fichier non trouvé: {file_path}")
    
    # Test de variations multiples
    print("\n🎲 TEST DE VARIATIONS (même commande, résultats différents):")
    print("-" * 40)
    
    test_command = "HERO(Arthur)"
    print(f"Commande: {test_command}")
    for i in range(5):
        translated = translator.translate_script(test_command)
        print(f"  Variation {i+1}: {translated}")
    
    print("\n" + "="*60)
    print("✅ TESTS TERMINÉS!")
    print("="*60)

if __name__ == "__main__":
    test_on_files()