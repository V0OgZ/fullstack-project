#!/usr/bin/env python3
"""
Script pour générer un MD magnifique du scénario HOTS
Utilise le service de traduction intelligent et ajoute des icônes
"""

import json
import re
import random
from pathlib import Path
from datetime import datetime

class ScenarioMDGenerator:
    def __init__(self):
        self.hero_data = {}
        self.load_hero_data()
        self.setup_variations()
        self.setup_icons()
    
    def load_hero_data(self):
        """Charge les données des héros depuis les fichiers JSON"""
        hero_files = [
            "game_assets/heroes/epic/epic-heroes.json",
            "game_assets/heroes/extracted_heroes.json"
        ]
        
        for file_path in hero_files:
            try:
                if Path(file_path).exists():
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        if 'epic_heroes' in data:
                            for hero in data['epic_heroes']:
                                self.hero_data[hero['name']] = hero
                        elif 'heroes' in data:
                            for hero in data['heroes']:
                                self.hero_data[hero['name']] = hero
                        print(f"✅ Chargé: {file_path}")
                else:
                    print(f"❌ Fichier non trouvé: {file_path}")
            except Exception as e:
                print(f"❌ Erreur lors du chargement de {file_path}: {e}")
    
    def setup_variations(self):
        """Configure les variations pour chaque type de commande"""
        self.hero_variations = {
            'Arthur_Pendragon': [
                "🌟 Arthur Pendragon surgit dans un éclat de lumière dorée, Excalibur scintillant",
                "👑 Le Roi Temporel Arthur apparaît dans une aura de leadership royal",
                "⚡ Arthur émerge des brumes du temps, sa couronne brillant de pouvoir",
                "🏛️ Le maître des flux temporels Arthur se matérialise avec majesté",
                "🛡️ Arthur, protecteur des timelines, arrive dans un tonnerre de gloire"
            ],
            'Merlin': [
                "🔮 Merlin l'Enchanteur émerge des profondeurs mystiques",
                "📚 L'Archimage Merlin apparaît dans un tourbillon de sorts anciens",
                "✨ Merlin se matérialise, ses yeux brillant de sagesse millénaire",
                "🌟 Le Gardien des Secrets Merlin surgit des brumes magiques",
                "⚡ Merlin émerge des courants mystiques, bâton de pouvoir en main"
            ]
        }
        
        self.psi_variations = [
            "🌀 Un sort de destinée se tisse dans les fils du temps",
            "🔮 Une prophétie s'écrit dans les brumes du futur", 
            "✨ Un enchantement prend forme dans les méandres temporels",
            "🌟 Une vision se cristallise dans l'éther mystique",
            "⚡ Un rituel s'amorce dans les courants du destin"
        ]
        
        self.collapse_variations = [
            "💥 Le sort se réalise dans un éclat de magie pure",
            "⚡ La prophétie s'accomplit dans un tonnerre mystique",
            "✨ L'enchantement se matérialise en réalité tangible", 
            "🌟 La vision devient réalité dans un flash aveuglant",
            "🔥 Le rituel atteint son apogée magique"
        ]
    
    def setup_icons(self):
        """Configure les icônes pour chaque type d'action"""
        self.icons = {
            'HERO': '👑',
            'EXPLORE': '🗺️',
            'GATHER_RESOURCES': '💰',
            'CREATE': '🏗️',
            'RECRUIT_UNIT': '⚔️',
            'UPGRADE': '📈',
            'BATTLE': '⚔️',
            'USE': '🔮',
            'CAST': '✨',
            'LOOT_RESOURCES': '💎',
            'VICTORY_CONDITION': '🏆',
            'QUOTE': '💬',
            'TOUR': '🔄',
            'FINAL': '🎯',
            'CONDITION': '✅'
        }
    
    def translate_heroes(self, script):
        """Traduit les héros avec variations et icônes"""
        def replace_hero(match):
            hero_name = match.group(1)
            variations = self.hero_variations.get(hero_name)
            if variations:
                return random.choice(variations)
            else:
                return f"👑 Le héros légendaire {hero_name} entre en scène avec détermination"
        
        return re.sub(r'HERO\(([^)]+)\)', replace_hero, script)
    
    def translate_explore(self, script):
        """Traduit les explorations"""
        def replace_explore(match):
            x, y = match.group(1), match.group(2)
            return f"🗺️ Exploration de la position stratégique aux coordonnées ({x}, {y})"
        
        return re.sub(r'EXPLORE\(@(\d+),(\d+)\)', replace_explore, script)
    
    def translate_resources(self, script):
        """Traduit les ressources"""
        def replace_gather(match):
            resource_type = match.group(1)
            amount = match.group(2)
            x, y = match.group(3), match.group(4)
            
            resource_icons = {
                'gold': '💰',
                'wood': '🪵',
                'stone': '🪨',
                'ore': '⛏️',
                'crystal': '💎',
                'gems': '💎',
                'sulfur': '🧪'
            }
            
            icon = resource_icons.get(resource_type, '📦')
            return f"{icon} Découverte de {amount} {resource_type} aux coordonnées ({x}, {y})"
        
        return re.sub(r'GATHER_RESOURCES\(([^,]+),\s*([^,]+),\s*@(\d+),(\d+)\)', replace_gather, script)
    
    def translate_buildings(self, script):
        """Traduit les constructions"""
        def replace_create(match):
            building_name = match.group(1)
            x, y = match.group(2), match.group(3)
            
            building_icons = {
                'human_castle': '🏰',
                'human_barracks': '⚔️',
                'human_tower': '🔮',
                'human_town_hall': '🏛️',
                'human_tavern': '🍺',
                'human_archery_range': '🏹'
            }
            
            icon = building_icons.get(building_name, '🏗️')
            return f"{icon} Construction du bâtiment {building_name} aux coordonnées ({x}, {y})"
        
        return re.sub(r'CREATE\(BUILDING,\s*([^,]+),\s*@(\d+),(\d+)\)', replace_create, script)
    
    def translate_units(self, script):
        """Traduit les recrutements d'unités"""
        def replace_recruit(match):
            unit_type = match.group(1)
            count = match.group(2)
            x, y = match.group(3), match.group(4)
            
            unit_icons = {
                'peasant': '👨‍🌾',
                'archer': '🏹',
                'knight': '🛡️',
                'griffin': '🦁',
                'red_dragon': '🐉',
                'quantum_knight': '⚡'
            }
            
            icon = unit_icons.get(unit_type, '⚔️')
            return f"{icon} Recrutement de {count} {unit_type} aux coordonnées ({x}, {y})"
        
        return re.sub(r'RECRUIT_UNIT\(([^,]+),\s*([^,]+),\s*@(\d+),(\d+)\)', replace_recruit, script)
    
    def translate_upgrades(self, script):
        """Traduit les améliorations"""
        def replace_upgrade(match):
            building_name = match.group(1)
            level = match.group(2)
            
            return f"📈 Amélioration du {building_name} au niveau {level}"
        
        return re.sub(r'UPGRADE\(([^,]+),\s*([^)]+)\)', replace_upgrade, script)
    
    def translate_battles(self, script):
        """Traduit les batailles"""
        def replace_battle(match):
            hero1 = match.group(1)
            hero2 = match.group(2)
            x, y = match.group(3), match.group(4)
            
            battle_variations = [
                f"⚔️ {hero1} livre une bataille épique contre {hero2} aux coordonnées ({x}, {y})",
                f"🗡️ {hero1} engage un duel légendaire avec {hero2} aux coordonnées ({x}, {y})",
                f"🔥 {hero1} affronte dans un combat titanesque {hero2} aux coordonnées ({x}, {y})",
                f"🛡️ {hero1} défie dans une lutte héroïque {hero2} aux coordonnées ({x}, {y})",
                f"⚡ {hero1} combat dans un affrontement mythique {hero2} aux coordonnées ({x}, {y})"
            ]
            
            return random.choice(battle_variations)
        
        return re.sub(r'BATTLE\(([^,]+),\s*([^,]+),\s*@(\d+),(\d+)\)', replace_battle, script)
    
    def translate_artifacts(self, script):
        """Traduit les artefacts"""
        def replace_use(match):
            item_name = match.group(1)
            hero_name = match.group(2)
            
            artifact_descriptions = {
                'Excalibur': "🗡️ {hero} dégaine Excalibur, l'épée légendaire qui fend les timelines",
                'fireball_scroll': "🔥 {hero} lance une boule de feu destructrice",
                'healing_potion': "💚 {hero} utilise une potion de soin",
                'magic_shield': "🛡️ {hero} active un bouclier magique",
                'teleport_ring': "🌀 {hero} active un anneau de téléportation"
            }
            
            description = artifact_descriptions.get(item_name, f"🔮 {hero_name} utilise {item_name}")
            return description.format(hero=hero_name)
        
        return re.sub(r'USE\(([^,]+),\s*([^)]+)\)', replace_use, script)
    
    def translate_spells(self, script):
        """Traduit les sorts"""
        def replace_cast(match):
            spell_name = match.group(1)
            hero_name = match.group(2)
            x, y = match.group(3), match.group(4)
            
            return f"✨ {hero_name} lance {spell_name} aux coordonnées ({x}, {y})"
        
        return re.sub(r'CAST\(([^,]+),\s*([^,]+),\s*@(\d+),(\d+)\)', replace_cast, script)
    
    def translate_loot(self, script):
        """Traduit le pillage"""
        def replace_loot(match):
            resource_type = match.group(1)
            amount = match.group(2)
            x, y = match.group(3), match.group(4)
            
            resource_icons = {
                'gold': '💰',
                'artifacts': '💎',
                'wood': '🪵',
                'stone': '🪨'
            }
            
            icon = resource_icons.get(resource_type, '📦')
            return f"{icon} Pillage de {amount} {resource_type} aux coordonnées ({x}, {y})"
        
        return re.sub(r'LOOT_RESOURCES\(([^,]+),\s*([^,]+),\s*@(\d+),(\d+)\)', replace_loot, script)
    
    def translate_psi_states(self, script):
        """Traduit les états ψ avec variété"""
        def replace_psi(match):
            content = match.group(1)
            variation = random.choice(self.psi_variations)
            return f"{variation} : {content}"
        
        script = re.sub(r'ψ\d+:\s*⊙\((.*?)\)', replace_psi, script)
        
        # Collapse
        def replace_collapse(match):
            return random.choice(self.collapse_variations)
        
        script = re.sub(r'†ψ\d+', replace_collapse, script)
        
        return script
    
    def translate_quotes(self, script):
        """Traduit les citations"""
        def replace_quote(match):
            content = match.group(1)
            return f"💬 {content}"
        
        return re.sub(r'QUOTE\("([^"]+)"\)', replace_quote, script)
    
    def translate_victory(self, script):
        """Traduit les conditions de victoire"""
        def replace_victory(match):
            condition = match.group(1)
            return f"🏆 Condition de victoire atteinte : {condition}"
        
        return re.sub(r'VICTORY_CONDITION\(([^)]+)\)', replace_victory, script)
    
    def cleanup(self, script):
        """Nettoie la traduction"""
        script = re.sub(r'@(\d+),(\d+)', r'(\1, \2)', script)
        script = re.sub(r'Δt\+(\d+)', r'dans \1 tours', script)
        script = re.sub(r'\s+', ' ', script)
        return script.strip()
    
    def translate_script(self, script):
        """Traduit un script complet"""
        result = script
        result = self.translate_heroes(result)
        result = self.translate_explore(result)
        result = self.translate_resources(result)
        result = self.translate_buildings(result)
        result = self.translate_units(result)
        result = self.translate_upgrades(result)
        result = self.translate_battles(result)
        result = self.translate_artifacts(result)
        result = self.translate_spells(result)
        result = self.translate_loot(result)
        result = self.translate_psi_states(result)
        result = self.translate_quotes(result)
        result = self.translate_victory(result)
        result = self.cleanup(result)
        return result
    
    def generate_md(self, hots_file_path, output_file_path):
        """Génère un MD magnifique du scénario"""
        
        # Lire le fichier HOTS
        with open(hots_file_path, 'r', encoding='utf-8') as f:
            hots_content = f.read()
        
        # Générer le contenu MD
        md_content = f"""# 🎮 SCÉNARIO ÉCONOMIE DE GUERRE - Heroes of Time

## 📜 **Présentation du Scénario**

*Généré automatiquement le {datetime.now().strftime('%d/%m/%Y à %H:%M')}*

Ce scénario épique met en scène la fondation d'un empire économique dans l'univers de Heroes of Time. Suivez Arthur Pendragon dans sa quête pour établir un royaume prospère et puissant.

---

"""
        
        # Traduire chaque ligne
        lines = hots_content.split('\n')
        current_tour = 1
        
        for line in lines:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            
            # Détecter les changements de tour
            if 'TOUR' in line and ':' in line:
                tour_match = re.search(r'TOUR (\d+):', line)
                if tour_match:
                    current_tour = int(tour_match.group(1))
                    tour_title = line.split(':')[1].strip()
                    md_content += f"## 🔄 **TOUR {current_tour}: {tour_title}**\n\n"
                    continue
            
            # Traduire la ligne
            translated = self.translate_script(line)
            
            # Ajouter des icônes selon le type de commande
            if line.startswith('HERO('):
                md_content += f"### 👑 **Création du Héros**\n{translated}\n\n"
            elif line.startswith('EXPLORE('):
                md_content += f"### 🗺️ **Exploration**\n{translated}\n\n"
            elif line.startswith('GATHER_RESOURCES('):
                md_content += f"### 💰 **Découverte de Ressources**\n{translated}\n\n"
            elif line.startswith('CREATE('):
                md_content += f"### 🏗️ **Construction**\n{translated}\n\n"
            elif line.startswith('RECRUIT_UNIT('):
                md_content += f"### ⚔️ **Recrutement**\n{translated}\n\n"
            elif line.startswith('UPGRADE('):
                md_content += f"### 📈 **Amélioration**\n{translated}\n\n"
            elif line.startswith('BATTLE('):
                md_content += f"### ⚔️ **Combat**\n{translated}\n\n"
            elif line.startswith('USE('):
                md_content += f"### 🔮 **Utilisation d'Artefact**\n{translated}\n\n"
            elif line.startswith('CAST('):
                md_content += f"### ✨ **Sort Magique**\n{translated}\n\n"
            elif line.startswith('LOOT_RESOURCES('):
                md_content += f"### 💎 **Pillage**\n{translated}\n\n"
            elif line.startswith('VICTORY_CONDITION('):
                md_content += f"### 🏆 **Condition de Victoire**\n{translated}\n\n"
            elif line.startswith('QUOTE('):
                md_content += f"> {translated}\n\n"
            else:
                md_content += f"{translated}\n\n"
        
        # Ajouter la conclusion
        md_content += """---

## 🏆 **Conclusion**

Ce scénario démontre la richesse du gameplay économique de Heroes of Time, combinant :
- 🏛️ **Construction d'infrastructure**
- ⚔️ **Recrutement d'unités**
- 💰 **Gestion des ressources**
- 🔮 **Utilisation d'artefacts**
- ⚔️ **Combat stratégique**

*Scénario généré avec le service de traduction intelligent de Heroes of Time*

---

## 📊 **Statistiques du Scénario**

- **Nombre de tours** : 6
- **Héros impliqués** : Arthur Pendragon, Merlin
- **Bâtiments construits** : Château, Casernes, Tour de Mage
- **Unités recrutées** : Paysans, Archers, Chevaliers, Griffon, Dragon Rouge
- **Ressources gérées** : Or, Bois, Pierre, Artefacts
- **Combats** : 1 bataille épique contre un Chevalier Quantique

---

*🌟 Créé par Memento - La Mémoire Vivante*"""
        
        # Écrire le fichier MD
        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(md_content)
        
        print(f"✅ MD généré avec succès : {output_file_path}")
        return output_file_path

def main():
    """Fonction principale"""
    generator = ScenarioMDGenerator()
    
    # Chemin du fichier HOTS
    hots_file = "game_assets/scenarios/hots/test-economie-guerre.hots"
    output_file = "docs/SCENARIO_ECONOMIE_GUERRE_TRADUIT.md"
    
    if Path(hots_file).exists():
        print(f"🎮 Génération du MD pour le scénario : {hots_file}")
        generator.generate_md(hots_file, output_file)
        print(f"✨ MD créé avec succès : {output_file}")
    else:
        print(f"❌ Fichier HOTS non trouvé : {hots_file}")

if __name__ == "__main__":
    main() 