package com.example.demo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PersistenceService {

    private static final Logger logger = LoggerFactory.getLogger(PersistenceService.class);
    private static final String DATA_DIR = "./data";
    private static final String WORLDS_DIR = "./data/worlds";
    private static final String BACKUP_DIR = "./data/backup";
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private VirtualWorldManager worldManager;

    @PostConstruct
    public void init() {
        try {
            // Créer les répertoires nécessaires
            Files.createDirectories(Paths.get(DATA_DIR));
            Files.createDirectories(Paths.get(WORLDS_DIR));
            Files.createDirectories(Paths.get(BACKUP_DIR));
            Files.createDirectories(Paths.get(DATA_DIR + "/transcendence"));
            Files.createDirectories(Paths.get(DATA_DIR + "/panopticon"));
            
            // Charger les états sauvegardés
            loadSavedStates();
            
            logger.info("✅ Service de persistance initialisé");
        } catch (IOException e) {
            logger.error("❌ Erreur lors de l'initialisation de la persistance", e);
        }
    }

    @PreDestroy
    public void shutdown() {
        logger.info("💾 Sauvegarde de l'état avant arrêt...");
        saveAllStates();
    }

    private void loadSavedStates() {
        // Charger les mondes sauvegardés
        File worldsDir = new File(WORLDS_DIR);
        if (worldsDir.exists() && worldsDir.isDirectory()) {
            File[] worldFiles = worldsDir.listFiles((dir, name) -> name.endsWith(".json"));
            if (worldFiles != null) {
                for (File worldFile : worldFiles) {
                    try {
                        Map<String, Object> worldData = objectMapper.readValue(worldFile, Map.class);
                        String worldId = worldFile.getName().replace(".json", "");
                        worldManager.createWorld(worldId, worldData);
                        logger.info("📍 Monde chargé : {}", worldId);
                    } catch (IOException e) {
                        logger.error("Erreur chargement monde : {}", worldFile.getName(), e);
                    }
                }
            }
        }
    }

    private void saveAllStates() {
        // Sauvegarder tous les mondes
        Map<String, Object> allWorlds = worldManager.getAllWorlds();
        for (Map.Entry<String, Object> entry : allWorlds.entrySet()) {
            saveWorldState(entry.getKey(), entry.getValue());
        }
        
        // Créer un backup complet
        createFullBackup();
    }

    public void saveWorldState(String worldId, Object worldData) {
        try {
            Path worldFile = Paths.get(WORLDS_DIR, worldId + ".json");
            objectMapper.writerWithDefaultPrettyPrinter()
                .writeValue(worldFile.toFile(), worldData);
            logger.info("💾 Monde sauvegardé : {}", worldId);
        } catch (IOException e) {
            logger.error("Erreur sauvegarde monde : {}", worldId, e);
        }
    }

    public void saveTranscendenceState(String entityId, Map<String, Object> state) {
        try {
            Path stateFile = Paths.get(DATA_DIR, "transcendence", entityId + ".json");
            Files.createDirectories(stateFile.getParent());
            
            Map<String, Object> transcendenceData = new HashMap<>();
            transcendenceData.put("entity_id", entityId);
            transcendenceData.put("state", state);
            transcendenceData.put("timestamp", LocalDateTime.now().toString());
            
            objectMapper.writerWithDefaultPrettyPrinter()
                .writeValue(stateFile.toFile(), transcendenceData);
            logger.info("🌟 État de transcendance sauvegardé : {}", entityId);
        } catch (IOException e) {
            logger.error("Erreur sauvegarde transcendance : {}", entityId, e);
        }
    }

    public void savePanopticonSnapshot(Map<String, Object> panopticonState) {
        try {
            String timestamp = LocalDateTime.now().toString().replace(":", "-");
            Path snapshotFile = Paths.get(DATA_DIR, "panopticon", "snapshot_" + timestamp + ".json");
            
            objectMapper.writerWithDefaultPrettyPrinter()
                .writeValue(snapshotFile.toFile(), panopticonState);
            logger.info("👁️ Snapshot Panopticon sauvegardé");
        } catch (IOException e) {
            logger.error("Erreur sauvegarde Panopticon", e);
        }
    }

    private void createFullBackup() {
        try {
            String timestamp = LocalDateTime.now().toString().replace(":", "-");
            Path backupDir = Paths.get(BACKUP_DIR, "backup_" + timestamp);
            Files.createDirectories(backupDir);
            
            // Copier tous les fichiers de données
            copyDirectory(Paths.get(WORLDS_DIR), backupDir.resolve("worlds"));
            copyDirectory(Paths.get(DATA_DIR, "transcendence"), backupDir.resolve("transcendence"));
            copyDirectory(Paths.get(DATA_DIR, "panopticon"), backupDir.resolve("panopticon"));
            
            logger.info("📦 Backup complet créé : {}", backupDir);
        } catch (IOException e) {
            logger.error("Erreur création backup", e);
        }
    }

    private void copyDirectory(Path source, Path target) throws IOException {
        if (Files.exists(source)) {
            Files.walk(source)
                .forEach(sourcePath -> {
                    try {
                        Path targetPath = target.resolve(source.relativize(sourcePath));
                        Files.createDirectories(targetPath.getParent());
                        if (Files.isRegularFile(sourcePath)) {
                            Files.copy(sourcePath, targetPath);
                        }
                    } catch (IOException e) {
                        logger.error("Erreur copie fichier", e);
                    }
                });
        }
    }
} 