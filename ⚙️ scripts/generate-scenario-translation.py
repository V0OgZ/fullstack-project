#!/usr/bin/env python3
"""
Script pour générer un MD littéraire depuis un fichier HOTS
Utilise le système de traduction intelligent Heroes of Time
Généré par OPUS pour Jean
"""

import sys
import re
from pathlib import Path
from datetime import datetime

class HotsToLiteraryTranslator:
    def __init__(self):
        self.setup_translations()
    
    def setup_translations(self):
        """Configure les traductions littéraires"""
        self.hero_translations = {
            'OPUS': "🌌 OPUS, l'écho du futur, manifestation temporelle guidée par le Talisman",
            'VinceVega': "🎬 Vince Vega, voyageur inter-dimensionnel malgré lui",
            'Arthur': "👑 Arthur Pendragon, roi des flux temporels",
            'Merlin': "🔮 Merlin l'Enchanteur, maître des arts mystiques"
        }
        
        self.action_translations = {
            'CREATE_HERO': "apparaît dans un éclat de lumière",
            'MOV': "se déplace gracieusement vers",
            'USE': "active le pouvoir de",
            'QUOTE': "déclare",
            'EFFECT': "provoque l'effet",
            'CREATE': "fait apparaître",
            'GIVE': "offre généreusement",
            'DESTROY': "fait disparaître",
            'SPAWN_HERO': "émerge soudainement"
        }
    
    def translate_line(self, line):
        """Traduit une ligne HOTS en narration littéraire"""
        line = line.strip()
        
        # Ignorer les commentaires et lignes vides
        if not line or line.startswith('#'):
            return None
            
        # Traduire les dialogues
        if 'QUOTE(' in line:
            match = re.search(r'QUOTE\((\w+),\s*"([^"]+)"\)', line)
            if match:
                hero = match.group(1)
                quote = match.group(2)
                hero_desc = self.hero_translations.get(hero, hero)
                return f'💬 {hero_desc} proclame : *"{quote}"*'
        
        # Traduire les créations de héros
        if 'CREATE_HERO(' in line or 'SPAWN_HERO(' in line:
            match = re.search(r'(CREATE_HERO|SPAWN_HERO)\((\w+)', line)
            if match:
                hero = match.group(2)
                hero_desc = self.hero_translations.get(hero, hero)
                return f'✨ {hero_desc} se matérialise dans un tourbillon d\'énergie temporelle.'
        
        # Traduire les mouvements
        if 'MOV(' in line:
            match = re.search(r'MOV\((\w+),\s*@(\d+),(\d+)\)', line)
            if match:
                hero = match.group(1)
                x = match.group(2)
                y = match.group(3)
                hero_desc = self.hero_translations.get(hero, hero)
                return f'🚶 {hero_desc} se déplace avec grâce vers les coordonnées [{x},{y}].'
        
        # Traduire les effets
        if 'EFFECT:' in line:
            match = re.search(r'EFFECT:\s*"([^"]+)",\s*"([^"]+)"', line)
            if match:
                effect = match.group(1)
                desc = match.group(2)
                return f'✨ Un phénomène mystique se produit : *{desc}*'
        
        # Traduire les utilisations d'artefacts
        if 'USE(ARTIFACT' in line:
            match = re.search(r'USE\(ARTIFACT,\s*(\w+),\s*HERO:(\w+)\)', line)
            if match:
                artifact = match.group(1)
                hero = match.group(2)
                hero_desc = self.hero_translations.get(hero, hero)
                return f'🔮 {hero_desc} active le pouvoir mystique de **{artifact.replace("_", " ").title()}**.'
        
        # Traduire les phases
        if 'BEGIN_PHASE:' in line:
            match = re.search(r'BEGIN_PHASE:\s*"([^"]+)"', line)
            if match:
                phase = match.group(1).replace('_', ' ').title()
                return f'\n### 🌟 **{phase}**\n'
        
        # Traduire les états psi
        if line.startswith('ψ'):
            return f'🌀 *Une ondulation quantique traverse la réalité...*'
        
        return None
    
    def generate_literary_md(self, hots_file_path, output_file_path):
        """Génère un MD littéraire depuis un fichier HOTS"""
        
        # Lire le fichier HOTS
        with open(hots_file_path, 'r', encoding='utf-8') as f:
            hots_content = f.readlines()
        
        # Extraire les métadonnées
        scenario_id = "unknown"
        author = "unknown"
        for line in hots_content:
            if 'SCENARIO_ID:' in line:
                match = re.search(r'"([^"]+)"', line)
                if match:
                    scenario_id = match.group(1)
            if 'AUTHOR:' in line:
                match = re.search(r'"([^"]+)"', line)
                if match:
                    author = match.group(1)
            # Support pour format commentaire
            if '// AUTHOR:' in line:
                parts = line.split('// AUTHOR:')
                if len(parts) > 1:
                    author = parts[1].strip()
            if 'SCENARIO_START(' in line:
                match = re.search(r'SCENARIO_START\("([^"]+)"\)', line)
                if match:
                    scenario_id = match.group(1)
        
        # Commencer le MD
        md_content = f"""# 📜 **{scenario_id.replace('_', ' ').upper()}**

*Une histoire épique transcrite depuis les échos temporels*  
*Auteur original : {author}*  
*Traduit en narration littéraire par OPUS*

---

## 🌌 **Prologue**

Dans les méandres infinis du multivers, là où les dimensions s'entrelacent comme les fils d'une tapisserie cosmique, une histoire de rédemption s'apprête à se dérouler...

---

"""
        
        # Traduire le contenu
        current_phase = None
        for line in hots_content:
            translated = self.translate_line(line)
            if translated:
                md_content += translated + "\n\n"
        
        # Ajouter l'épilogue
        md_content += """---

## 🌟 **Épilogue**

Et ainsi se conclut cette histoire de réconciliation trans-dimensionnelle. Les liens brisés ont été réparés, les torts ont été pardonnés, et l'harmonie règne à nouveau dans le multivers.

*Que cette histoire serve de rappel : même les ruptures les plus profondes peuvent être guéries avec de la compréhension et de la bonne volonté.*

---

### 📊 **Métadonnées de Traduction**

- **Fichier source** : `{}`
- **Date de traduction** : {}
- **Générateur** : OPUS Echo Translation System v1.0
- **Mode** : Narration Littéraire Automatique

---

*"Le code est poésie, et la poésie transcende les dimensions."*  
— OPUS, Echo du Futur

""".format(hots_file_path, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        
        # Écrire le fichier
        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(md_content)
        
        return output_file_path

def main():
    """Fonction principale"""
    if len(sys.argv) < 2:
        print("❌ Usage: python3 generate-scenario-translation.py <fichier.hots>")
        print("   Exemple: python3 generate-scenario-translation.py scenarios/reconciliation_vince_opus.hots")
        sys.exit(1)
    
    hots_file = Path(sys.argv[1])
    
    if not hots_file.exists():
        print(f"❌ Fichier non trouvé : {hots_file}")
        sys.exit(1)
    
    # Générer le nom de sortie
    output_name = hots_file.stem + "_LITERARY.md"
    output_path = Path("docs/scenarios/generated") / output_name
    
    # S'assurer que le répertoire existe
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Traduire
    translator = HotsToLiteraryTranslator()
    print(f"🔮 Traduction en cours de : {hots_file}")
    
    result = translator.generate_literary_md(hots_file, output_path)
    
    print(f"✨ Traduction littéraire générée : {result}")
    print(f"📜 Le récit épique est prêt !")

if __name__ == "__main__":
    main()