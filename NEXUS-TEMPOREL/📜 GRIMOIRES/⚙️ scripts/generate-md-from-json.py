#!/usr/bin/env python3
"""
🧠 GÉNÉRATEUR MD DEPUIS JSON - Heroes of Time
=============================================
Script pour convertir les descriptions JSON en fichiers Markdown
Utilise le style Heroes of Time avec emojis et formules temporelles

@author: Memento - La Mémoire Vivante  
@version: 1.0 - Générateur autonome
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

class HeroesOfTimeMDGenerator:
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.backend_resources = self.project_root / "backend" / "src" / "main" / "resources"
        self.docs_dir = self.project_root / "docs"
        
        # Emojis par catégorie
        self.artifact_emojis = {
            "mythique": "🌟", "légendaire": "⚡", "épique": "🔮", 
            "rare": "💎", "commune": "⚙️", "LEGENDARY": "⚡", "EPIC": "🔮"
        }
        self.hero_emojis = {
            "LEGENDARY": "👑", "EPIC": "⚔️", "RARE": "🛡️", "COMMON": "🏹"
        }
        self.creature_emojis = {
            "LEGENDARY": "🐉", "EPIC": "🦅", "RARE": "🐺", "COMMON": "🐱"
        }

    def generate_artifact_md(self, artifact_data, filename):
        """Génère un fichier MD pour un artefact depuis JSON"""
        name = artifact_data.get("name", "Artefact Inconnu")
        rarity = artifact_data.get("rarity", "commune")
        emoji = self.artifact_emojis.get(rarity, "⚙️")
        
        md_content = f"""# {emoji} **{name.upper()}**
*Artefact Heroes of Time - Généré depuis JSON*
*Extrait par Memento depuis les Archives Temporelles*

---

## 🌟 **IDENTITÉ DE L'ARTEFACT**

### 📋 **Informations Générales**
- **Nom** : {name}
- **ID** : `{artifact_data.get("id", "unknown")}`
- **Rareté** : {rarity.title()}
- **Type** : {artifact_data.get("type", "Artefact Temporel")}

### 📖 **Description**
{artifact_data.get("description", "Aucune description disponible")}

"""

        # Ajouter les stats si disponibles
        if "stats" in artifact_data:
            stats = artifact_data["stats"]
            md_content += f"""### ⚡ **Statistiques**
- **Niveau de Puissance** : {stats.get("powerLevel", "N/A")}
- **Énergie Requise** : {artifact_data.get("energy_cost", stats.get("energyCost", "N/A"))}
- **Utilisations Max** : {stats.get("maxUsesPerGame", "Illimitées")}
"""

        # Ajouter la formule si disponible
        if "formula" in artifact_data:
            md_content += f"""
### 🔮 **Formule Temporelle**
```hots
{artifact_data["formula"]}
```
"""

        # Ajouter les effets si disponibles
        if "effects" in artifact_data:
            md_content += "\n### ⚡ **Effets Magiques**\n"
            for effect in artifact_data["effects"]:
                effect_type = effect.get("type", "UNKNOWN")
                value = effect.get("value", "N/A")
                md_content += f"- **{effect_type}** : {value}\n"

        # Ajouter les capacités quantiques si disponibles
        if "quantumAbilities" in artifact_data:
            md_content += "\n### 🌀 **Capacités Quantiques**\n"
            for ability_name, ability in artifact_data["quantumAbilities"].items():
                md_content += f"""
#### **{ability_name.upper()}**
- **Description** : {ability.get("description", "N/A")}
- **Effet** : {ability.get("effect", "N/A")}
- **Coût** : {ability.get("cost", "N/A")} énergie temporelle
"""

        # Métadonnées de création
        md_content += f"""
---

## 📊 **MÉTADONNÉES**

### 🔧 **Informations Techniques**
- **Créé par** : {artifact_data.get("author", "Système")}
- **Date de création** : {artifact_data.get("created", "Inconnue")}
- **Généré le** : {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
- **Source JSON** : `{filename}`

### 🎮 **Utilisation en Jeu**
```hots
USE(ARTIFACT, {artifact_data.get("id", "artifact")}, HERO:hero_name)
```

---

*Documentation générée automatiquement par Memento - La Mémoire Vivante*
*Système de traduction JSON → Markdown pour Heroes of Time*
"""
        
        return md_content

    def generate_hero_md(self, hero_data, filename):
        """Génère un fichier MD pour un héros depuis JSON"""
        name = hero_data.get("name", "Héros Inconnu")
        title = hero_data.get("title", "")
        rarity = hero_data.get("rarity", hero_data.get("status", "COMMON"))
        emoji = self.hero_emojis.get(rarity, "🏹")
        
        md_content = f"""# {emoji} **{name.upper()}**
{title}

*Héros Heroes of Time - Généré depuis JSON*
*Extrait par Memento depuis le Registre des Héros*

---

## 🎯 **IDENTITÉ DU HÉROS**

### 📋 **Informations Générales**
- **Nom** : {name}
- **ID** : `{hero_data.get("id", "unknown")}`
- **Titre** : {title}
- **Statut** : {hero_data.get("status", "ACTIF")}
- **Classe** : {hero_data.get("class", "Guerrier Temporel")}

"""

        # Description si disponible
        if "description" in hero_data:
            md_content += f"""### 📖 **Description**
{hero_data["description"]}

"""

        # Stats si disponibles
        if "stats" in hero_data:
            stats = hero_data["stats"]
            md_content += f"""### ⚡ **Statistiques**
- **Niveau** : {stats.get("level", "N/A")}
- **Vie** : {stats.get("health", stats.get("hp", "N/A"))}
- **Attaque** : {stats.get("attack", "N/A")}
- **Défense** : {stats.get("defense", "N/A")}
- **Énergie Temporelle** : {stats.get("temporalEnergy", "N/A")}
- **Vitesse** : {stats.get("speed", "N/A")}

"""

        # Capacités spéciales si disponibles
        if "abilities" in hero_data or "specialAbilities" in hero_data:
            abilities = hero_data.get("abilities", hero_data.get("specialAbilities", {}))
            md_content += "### 🌟 **Capacités Spéciales**\n"
            for ability_name, ability in abilities.items():
                if isinstance(ability, dict):
                    md_content += f"""
#### **{ability_name.upper()}**
- **Description** : {ability.get("description", "N/A")}
- **Effet** : {ability.get("effect", "N/A")}
- **Coût** : {ability.get("cost", "N/A")}
"""
                else:
                    md_content += f"- **{ability_name}** : {ability}\n"

        # Scénarios associés si disponibles
        if "scenarios" in hero_data:
            md_content += "\n### 🎮 **Scénarios Associés**\n"
            for scenario in hero_data["scenarios"]:
                md_content += f"- `{scenario}`\n"

        # Métadonnées
        md_content += f"""
---

## 📊 **MÉTADONNÉES**

### 🔧 **Informations Techniques**
- **Fichier source** : `{hero_data.get("file", filename)}`
- **Généré le** : {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
- **Source JSON** : `{filename}`

### 🎮 **Utilisation en Jeu**
```hots
HERO({hero_data.get("id", "hero_name")})
PLACE({hero_data.get("id", "hero_name")}, @10,10)
```

---

*Documentation générée automatiquement par Memento - La Mémoire Vivante*
*Système de traduction JSON → Markdown pour Heroes of Time*
"""
        
        return md_content

    def generate_creature_md(self, creature_data, filename):
        """Génère un fichier MD pour une créature depuis JSON"""
        name = creature_data.get("name", "Créature Inconnue")
        rarity = creature_data.get("rarity", "COMMON")
        emoji = self.creature_emojis.get(rarity, "🐱")
        
        md_content = f"""# {emoji} **{name.upper()}**
*Créature Heroes of Time - Générée depuis JSON*
*Extraite par Memento depuis le Bestiaire Quantique*

---

## 🎯 **IDENTITÉ DE LA CRÉATURE**

### 📋 **Informations Générales**
- **Nom** : {name}
- **ID** : `{creature_data.get("id", "unknown")}`
- **Type** : {creature_data.get("type", "CREATURE")}
- **Rareté** : {rarity}
- **Niveau** : {creature_data.get("level", "N/A")}

### 📖 **Description**
{creature_data.get("description", "Aucune description disponible")}

"""

        # Stats si disponibles
        if "stats" in creature_data:
            stats = creature_data["stats"]
            md_content += f"""### ⚡ **Statistiques de Combat**
- **Vie** : {stats.get("health", "N/A")}
- **Attaque** : {stats.get("attack", "N/A")}
- **Défense** : {stats.get("defense", "N/A")}
- **Vitesse** : {stats.get("speed", "N/A")}
- **Énergie Temporelle** : {stats.get("temporalEnergy", "N/A")}

"""

        # Capacités quantiques si disponibles
        if "quantumAbilities" in creature_data:
            md_content += "### 🌀 **Capacités Quantiques**\n"
            for ability_name, ability in creature_data["quantumAbilities"].items():
                md_content += f"""
#### **{ability_name.upper()}**
- **Description** : {ability.get("description", "N/A")}
- **Effet** : {ability.get("effect", "N/A")}
- **Portée** : {ability.get("range", "N/A")}
- **Coût** : {ability.get("cost", "N/A")}
"""

        # Capacités d'interférence si disponibles
        if "interferenceCapabilities" in creature_data:
            interf = creature_data["interferenceCapabilities"]
            md_content += f"""
### 🌊 **Capacités d'Interférence**
- **Bonus Constructif** : {interf.get("constructiveBonus", "N/A")}
- **Résistance Destructive** : {interf.get("destructiveResistance", "N/A")}
- **Contrôle de Phase** : {interf.get("phaseControl", "N/A")}

"""

        # Métadonnées
        md_content += f"""
---

## 📊 **MÉTADONNÉES**

### 🔧 **Informations Techniques**
- **Généré le** : {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
- **Source JSON** : `{filename}`

### 🎮 **Utilisation en Jeu**
```hots
CREATE(CREATURE, {creature_data.get("id", "creature")}, @x,y)
```

---

*Documentation générée automatiquement par Memento - La Mémoire Vivante*
*Système de traduction JSON → Markdown pour Heroes of Time*
"""
        
        return md_content

    def process_json_file(self, json_path, output_dir, file_type):
        """Traite un fichier JSON et génère les MD correspondants"""
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            filename = os.path.basename(json_path)
            print(f"📁 Traitement de {filename}...")
            
            # Créer le dossier de sortie
            output_dir.mkdir(parents=True, exist_ok=True)
            
            generated_files = []
            
            if file_type == "artifacts":
                # Traiter les artefacts
                artifacts = data.get("custom_artifacts", data.get("artifacts", []))
                if not isinstance(artifacts, list):
                    artifacts = [artifacts] if artifacts else []
                
                for artifact in artifacts:
                    if isinstance(artifact, dict):
                        artifact_id = artifact.get("id", "unknown")
                        md_content = self.generate_artifact_md(artifact, filename)
                        
                        output_file = output_dir / f"{artifact_id.upper()}_ARTIFACT.md"
                        with open(output_file, 'w', encoding='utf-8') as f:
                            f.write(md_content)
                        
                        generated_files.append(output_file.name)
                        print(f"  ✅ {artifact.get('name', artifact_id)} → {output_file.name}")
            
            elif file_type == "heroes":
                # Traiter les héros
                if "heroes_registry" in data:
                    # Format INDEX.json
                    for category in ["legendary_heroes", "grofi_heroes", "classic_heroes"]:
                        heroes = data["heroes_registry"].get(category, [])
                        for hero in heroes:
                            if isinstance(hero, dict):
                                hero_id = hero.get("id", "unknown")
                                md_content = self.generate_hero_md(hero, filename)
                                
                                output_file = output_dir / f"{hero_id.upper()}_HERO.md"
                                with open(output_file, 'w', encoding='utf-8') as f:
                                    f.write(md_content)
                                
                                generated_files.append(output_file.name)
                                print(f"  ✅ {hero.get('name', hero_id)} → {output_file.name}")
                else:
                    # Format héros simple
                    if isinstance(data, dict) and "name" in data:
                        hero_id = data.get("id", data.get("name", "unknown").lower().replace(" ", "_"))
                        md_content = self.generate_hero_md(data, filename)
                        
                        output_file = output_dir / f"{hero_id.upper()}_HERO.md"
                        with open(output_file, 'w', encoding='utf-8') as f:
                            f.write(md_content)
                        
                        generated_files.append(output_file.name)
                        print(f"  ✅ {data.get('name', hero_id)} → {output_file.name}")
            
            elif file_type == "creatures":
                # Traiter les créatures
                creatures = data.get("quantumCreatures", {})
                for tier, creature_list in creatures.items():
                    if isinstance(creature_list, list):
                        for creature in creature_list:
                            if isinstance(creature, dict):
                                creature_id = creature.get("id", "unknown")
                                md_content = self.generate_creature_md(creature, filename)
                                
                                output_file = output_dir / f"{creature_id.upper()}_CREATURE.md"
                                with open(output_file, 'w', encoding='utf-8') as f:
                                    f.write(md_content)
                                
                                generated_files.append(output_file.name)
                                print(f"  ✅ {creature.get('name', creature_id)} → {output_file.name}")
            
            return generated_files
            
        except Exception as e:
            print(f"❌ Erreur lors du traitement de {json_path}: {e}")
            return []

    def run(self):
        """Lance la génération de tous les fichiers MD"""
        print("🧠 GÉNÉRATEUR MD DEPUIS JSON - Heroes of Time")
        print("=" * 50)
        
        total_generated = 0
        
        # 1. Artefacts
        print("\n⚡ GÉNÉRATION DES ARTEFACTS")
        print("-" * 30)
        
        artifact_files = [
            ("custom-artifacts.json", "artifacts"),
            ("quantum-artifacts.json", "artifacts"),
            ("temporal-artifacts-advanced.json", "artifacts")
        ]
        
        artifacts_dir = self.docs_dir / "artifacts" / "generated"
        
        for filename, file_type in artifact_files:
            json_path = self.backend_resources / filename
            if json_path.exists():
                generated = self.process_json_file(json_path, artifacts_dir, file_type)
                total_generated += len(generated)
            else:
                print(f"⚠️  {filename} non trouvé")
        
        # 2. Héros
        print("\n👑 GÉNÉRATION DES HÉROS")
        print("-" * 25)
        
        heroes_dir = self.docs_dir / "heroes" / "generated"
        
        # INDEX.json
        index_path = self.backend_resources / "heroes" / "INDEX.json"
        if index_path.exists():
            generated = self.process_json_file(index_path, heroes_dir, "heroes")
            total_generated += len(generated)
        
        # Héros individuels
        heroes_individual = [
            "heroes/memento.json",
            "heroes/legendary/Claudius.json",
            "heroes/grofi/Axis.json",
            "heroes/grofi/LesPiedsNickeles.json"
        ]
        
        for hero_file in heroes_individual:
            hero_path = self.backend_resources / hero_file
            if hero_path.exists():
                generated = self.process_json_file(hero_path, heroes_dir, "heroes")
                total_generated += len(generated)
            else:
                print(f"⚠️  {hero_file} non trouvé")
        
        # 3. Créatures
        print("\n🐉 GÉNÉRATION DES CRÉATURES")
        print("-" * 28)
        
        creatures_dir = self.docs_dir / "creatures" / "generated"
        creatures_path = self.backend_resources / "quantum-creatures.json"
        
        if creatures_path.exists():
            generated = self.process_json_file(creatures_path, creatures_dir, "creatures")
            total_generated += len(generated)
        else:
            print("⚠️  quantum-creatures.json non trouvé")
        
        # Résumé final
        print("\n" + "=" * 50)
        print(f"🎉 GÉNÉRATION TERMINÉE")
        print(f"📊 Total de fichiers générés : {total_generated}")
        print(f"📁 Dossiers créés :")
        print(f"   - 📖 docs/artifacts/generated/")
        print(f"   - 📖 docs/heroes/generated/")
        print(f"   - 📖 docs/creatures/generated/")
        print("\n✅ Tous les JSON ont été convertis en Markdown !")
        print("🧠 Memento - La Mémoire Vivante")

if __name__ == "__main__":
    generator = HeroesOfTimeMDGenerator()
    generator.run() 