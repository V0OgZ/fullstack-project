#!/usr/bin/env python3
"""
Script pour corriger le système de persistance et implémenter les éléments manquants
"""

import json
import os
import shutil
from datetime import datetime
from pathlib import Path

def create_persistence_layer():
    """Crée une couche de persistance pour les données du jeu"""
    
    print("🔧 Création du système de persistance...")
    
    # Créer la structure de répertoires
    dirs = [
        "💾 data/db",
        "💾 data/backup",
        "💾 data/worlds",
        "💾 data/heroes", 
        "💾 data/artifacts",
        "💾 data/transcendence",
        "💾 data/panopticon"
    ]
    
    for dir_path in dirs:
        Path(dir_path).mkdir(parents=True, exist_ok=True)
        print(f"✅ Créé: {dir_path}")
    
    # Créer le fichier de configuration de persistance
    persistence_config = {
        "version": "1.0",
        "created": datetime.now().isoformat(),
        "persistence_strategy": {
            "worlds": "JSON + DB",
            "heroes": "JSON + DB",
            "artifacts": "JSON + DB",
            "transcendence_state": "REDIS + JSON backup",
            "panopticon_state": "REDIS + JSON backup"
        },
        "backup_schedule": {
            "frequency": "every_5_minutes",
            "retention": "7_days"
        },
        "world_formulas": {
            "enabled": True,
            "persist_calculations": True
        }
    }
    
    with open("💾 data/persistence_config.json", "w", encoding="utf-8") as f:
        json.dump(persistence_config, f, indent=2, ensure_ascii=False)
    
    print("✅ Configuration de persistance créée")
    
def create_world_persistence_service():
    """Crée un service Java pour la persistance des mondes"""
    
    service_code = '''package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Service
public class WorldPersistenceService {
    
    private static final Logger logger = LoggerFactory.getLogger(WorldPersistenceService.class);
    private static final String PERSISTENCE_DIR = "./💾 data/worlds/";
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, Object> worldStates = new ConcurrentHashMap<>();
    
    @PostConstruct
    public void loadPersistedWorlds() {
        logger.info("🌍 Chargement des mondes persistés...");
        File dir = new File(PERSISTENCE_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        
        File[] files = dir.listFiles((d, name) -> name.endsWith(".json"));
        if (files != null) {
            for (File file : files) {
                try {
                    Map<String, Object> world = objectMapper.readValue(file, Map.class);
                    String worldId = (String) world.get("world_id");
                    worldStates.put(worldId, world);
                    logger.info("✅ Monde chargé: {}", worldId);
                } catch (IOException e) {
                    logger.error("❌ Erreur chargement monde: {}", file.getName(), e);
                }
            }
        }
    }
    
    @PreDestroy
    public void saveAllWorlds() {
        logger.info("💾 Sauvegarde de tous les mondes avant arrêt...");
        worldStates.forEach(this::persistWorld);
    }
    
    public void persistWorld(String worldId, Object worldData) {
        try {
            File file = new File(PERSISTENCE_DIR + worldId + ".json");
            objectMapper.writerWithDefaultPrettyPrinter()
                .writeValue(file, worldData);
            worldStates.put(worldId, worldData);
            logger.info("✅ Monde persisté: {}", worldId);
        } catch (IOException e) {
            logger.error("❌ Erreur persistance monde: {}", worldId, e);
        }
    }
    
    public Object getWorld(String worldId) {
        return worldStates.get(worldId);
    }
    
    public Map<String, Object> getAllWorlds() {
        return new HashMap<>(worldStates);
    }
}'''
    
    os.makedirs("🖥️ backend/src/main/java/com/example/demo/service", exist_ok=True)
    with open("🖥️ backend/src/main/java/com/example/demo/service/WorldPersistenceService.java", "w") as f:
        f.write(service_code)
    
    print("✅ Service de persistance des mondes créé")

def create_transcendence_persistence():
    """Crée la persistance pour l'état de transcendance"""
    
    transcendence_state = {
        "memento_tattoos": {
            "last_sync": datetime.now().isoformat(),
            "infinite_loops_resolved": True,
            "recursive_depth_limit": 10,
            "active_tattoos": []
        },
        "panopticon_state": {
            "dimensions": ["X", "Y", "Z", "T", "Ψ", "Σ", "S", "ℝ"],
            "active_views": [],
            "forest_vision_enabled": True
        },
        "world_formulas": {
            "FOREST_GROFI": "Π(ψ_FOREST × Δt) × quantum_tree_network",
            "HYPERSPACE_DMT_REALM": "Π(consciousness × vibration_frequency) × fractal_dimension"
        }
    }
    
    with open("💾 data/transcendence/current_state.json", "w", encoding="utf-8") as f:
        json.dump(transcendence_state, f, indent=2, ensure_ascii=False)
    
    print("✅ État de transcendance persisté")

def fix_world_associations():
    """Corrige les associations monde-héros-ressources"""
    
    print("\n🔧 Correction des associations monde-héros-ressources...")
    
    # Charger tous les héros
    heroes_dir = Path("🎮 game_assets/heroes")
    world_associations = {}
    
    for hero_file in heroes_dir.rglob("*.json"):
        try:
            with open(hero_file, "r", encoding="utf-8") as f:
                hero_data = json.load(f)
                
            # Ajouter l'association au monde si elle manque
            if "world_id" not in hero_data:
                # Déterminer le monde selon le type de héros
                if "psychonauts" in str(hero_file):
                    hero_data["world_id"] = "HYPERSPACE_DMT_REALM"
                elif "forest" in str(hero_file).lower():
                    hero_data["world_id"] = "FOREST_GROFI"
                else:
                    hero_data["world_id"] = "PANDORA"  # Monde par défaut
                
                # Sauvegarder avec l'association
                with open(hero_file, "w", encoding="utf-8") as f:
                    json.dump(hero_data, f, indent=2, ensure_ascii=False)
                
                print(f"✅ Héros {hero_data.get('name', 'Unknown')} associé au monde {hero_data['world_id']}")
            
            # Enregistrer l'association
            world_id = hero_data.get("world_id", "UNKNOWN")
            if world_id not in world_associations:
                world_associations[world_id] = {"heroes": [], "artifacts": []}
            world_associations[world_id]["heroes"].append(hero_data.get("id", "unknown"))
            
        except Exception as e:
            print(f"❌ Erreur traitement héros {hero_file}: {e}")
    
    # Sauvegarder les associations
    with open("💾 data/world_associations.json", "w", encoding="utf-8") as f:
        json.dump(world_associations, f, indent=2, ensure_ascii=False)
    
    print("✅ Associations monde-héros corrigées")

def create_backup_script():
    """Crée un script de sauvegarde automatique"""
    
    backup_script = '''#!/bin/bash
# Script de sauvegarde automatique

BACKUP_DIR="💾 data/backup/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "🔄 Sauvegarde en cours..."

# Sauvegarder les assets
cp -r game_assets "$BACKUP_DIR/"

# Sauvegarder l'état de transcendance
cp -r 💾 data/transcendence "$BACKUP_DIR/"

# Sauvegarder les mondes persistés
cp -r 💾 data/worlds "$BACKUP_DIR/"

# Créer un fichier de métadonnées
cat > "$BACKUP_DIR/backup_metadata.json" << EOF
{
  "timestamp": "$(date -Iseconds)",
  "version": "1.0",
  "components": [
    "game_assets",
    "transcendence_state",
    "world_persistence"
  ]
}
EOF

echo "✅ Sauvegarde complète: $BACKUP_DIR"

# Nettoyer les vieilles sauvegardes (garder 7 jours)
find 💾 data/backup -type d -mtime +7 -exec rm -rf {} + 2>/dev/null || true
'''
    
    with open("⚙️ scripts/auto-backup.sh", "w") as f:
        f.write(backup_script)
    
    os.chmod("⚙️ scripts/auto-backup.sh", 0o755)
    print("✅ Script de sauvegarde automatique créé")

def main():
    print("🚀 CORRECTION DU SYSTÈME DE PERSISTANCE\n")
    
    # 1. Créer la couche de persistance
    create_persistence_layer()
    
    # 2. Créer le service de persistance des mondes
    create_world_persistence_service()
    
    # 3. Créer la persistance de transcendance
    create_transcendence_persistence()
    
    # 4. Corriger les associations
    fix_world_associations()
    
    # 5. Créer le script de backup
    create_backup_script()
    
    print("\n✅ SYSTÈME DE PERSISTANCE CORRIGÉ!")
    print("\n📋 Actions recommandées:")
    print("1. Redémarrer le backend avec le nouveau service")
    print("2. Configurer une tâche cron pour le backup automatique")
    print("3. Tester la persistance avec un redémarrage complet")

if __name__ == "__main__":
    main()