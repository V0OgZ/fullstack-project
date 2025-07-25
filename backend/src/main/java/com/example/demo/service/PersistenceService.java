package com.example.demo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
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
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PersistenceService {
    
    private static final Logger logger = LoggerFactory.getLogger(PersistenceService.class);
    private static final String DATA_DIR = "./data";
    private static final String BACKUP_DIR = "./data/backup";
    private static final String WORLD_STATE_FILE = "./data/world_state.json";
    private static final String PANOPTICON_STATE_FILE = "./data/panopticon_state.json";
    private static final String TRANSCENDENCE_STATE_FILE = "./data/transcendence_state.json";
    
    @Autowired
    private VirtualWorldManager worldManager;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @PostConstruct
    public void init() {
        try {
            // Créer les répertoires de persistance
            Files.createDirectories(Paths.get(DATA_DIR));
            Files.createDirectories(Paths.get(BACKUP_DIR));
            
            // Configurer ObjectMapper pour une jolie sortie
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            
            // Restaurer l'état précédent si disponible
            restoreSystemState();
            
            logger.info("🔧 Service de persistance initialisé");
        } catch (IOException e) {
            logger.error("❌ Erreur lors de l'initialisation de la persistance", e);
        }
    }
    
    @PreDestroy
    public void shutdown() {
        logger.info("💾 Sauvegarde de l'état du système avant arrêt...");
        saveSystemState();
    }
    
    public void saveSystemState() {
        try {
            // Sauvegarder l'état des mondes virtuels
            Map<String, Object> worldState = new HashMap<>();
            worldState.put("timestamp", LocalDateTime.now().toString());
            worldState.put("worlds", worldManager.getAllWorlds());
            worldState.put("active_traps", worldManager.getActiveTrapWorlds());
            
            objectMapper.writeValue(new File(WORLD_STATE_FILE), worldState);
            logger.info("✅ État des mondes sauvegardé");
            
            // Créer une sauvegarde horodatée
            String backupFileName = String.format("%s/world_state_%s.json", 
                BACKUP_DIR, 
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"))
            );
            Files.copy(Paths.get(WORLD_STATE_FILE), Paths.get(backupFileName));
            
        } catch (IOException e) {
            logger.error("❌ Erreur lors de la sauvegarde de l'état", e);
        }
    }
    
    public void restoreSystemState() {
        try {
            File worldStateFile = new File(WORLD_STATE_FILE);
            if (worldStateFile.exists()) {
                Map<String, Object> worldState = objectMapper.readValue(worldStateFile, Map.class);
                logger.info("📂 État précédent trouvé, datant de: {}", worldState.get("timestamp"));
                
                // Restaurer les mondes
                Map<String, Object> worlds = (Map<String, Object>) worldState.get("worlds");
                if (worlds != null) {
                    for (Map.Entry<String, Object> entry : worlds.entrySet()) {
                        worldManager.createWorld(entry.getKey(), (Map<String, Object>) entry.getValue());
                    }
                    logger.info("✅ {} mondes restaurés", worlds.size());
                }
            } else {
                logger.info("🆕 Aucun état précédent trouvé, démarrage avec configuration par défaut");
            }
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la restauration de l'état", e);
        }
    }
    
    public void savePanopticonState(Map<String, Object> state) {
        try {
            Map<String, Object> panopticonState = new HashMap<>();
            panopticonState.put("timestamp", LocalDateTime.now().toString());
            panopticonState.put("state", state);
            
            objectMapper.writeValue(new File(PANOPTICON_STATE_FILE), panopticonState);
            logger.info("👁️ État du Panopticon sauvegardé");
        } catch (IOException e) {
            logger.error("❌ Erreur lors de la sauvegarde du Panopticon", e);
        }
    }
    
    public Map<String, Object> restorePanopticonState() {
        try {
            File file = new File(PANOPTICON_STATE_FILE);
            if (file.exists()) {
                Map<String, Object> saved = objectMapper.readValue(file, Map.class);
                return (Map<String, Object>) saved.get("state");
            }
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la restauration du Panopticon", e);
        }
        return new HashMap<>();
    }
    
    public void saveTranscendenceState(String entityId, Map<String, Object> transcendenceData) {
        try {
            // Charger l'état existant ou créer nouveau
            Map<String, Object> allTranscendence = new HashMap<>();
            File file = new File(TRANSCENDENCE_STATE_FILE);
            if (file.exists()) {
                allTranscendence = objectMapper.readValue(file, Map.class);
            }
            
            // Ajouter/mettre à jour l'entité
            allTranscendence.put(entityId, transcendenceData);
            allTranscendence.put("last_update", LocalDateTime.now().toString());
            
            objectMapper.writeValue(file, allTranscendence);
            logger.info("🌟 État de transcendance sauvegardé pour: {}", entityId);
        } catch (IOException e) {
            logger.error("❌ Erreur lors de la sauvegarde de la transcendance", e);
        }
    }
    
    public Map<String, Object> getTranscendenceState(String entityId) {
        try {
            File file = new File(TRANSCENDENCE_STATE_FILE);
            if (file.exists()) {
                Map<String, Object> allTranscendence = objectMapper.readValue(file, Map.class);
                return (Map<String, Object>) allTranscendence.get(entityId);
            }
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la récupération de la transcendance", e);
        }
        return null;
    }
} 