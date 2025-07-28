package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

/**
 * 🚨⚡ NAMELESS ARTIFACT SERVICE - BROKEN REALITY HANDLER ⚡🚨
 * Service pour gérer les artefacts sans nom qui doivent être nommés pour être acquis
 * Matrix Architect Terminal Communication System
 */
@Service
public class NamelessArtifactService {
    
    private static final Logger logger = Logger.getLogger(NamelessArtifactService.class.getName());
    
    // Artefacts trouvés sans nom
    private final Map<String, NamelessArtifact> foundArtifacts = new ConcurrentHashMap<>();
    
    // Communication terminal active
    private boolean terminalCommunicationEnabled = true;
    
    public NamelessArtifactService() {
        // Ajouter le PRIORITY PROCESSOR SUPREME trouvé
        addFoundArtifact("priority_processor_supreme", 
            "PRIORITY PROCESSOR SUPREME",
            "🔥⚡ 80% process priority for 4 real days - prevents collapse from overload",
            "BROKEN_REALITY");
    }
    
    /**
     * 🔍 DÉCOUVRIR un artefact sans nom
     */
    public void addFoundArtifact(String id, String description, String effects, String category) {
        NamelessArtifact artifact = new NamelessArtifact(id, description, effects, category);
        foundArtifacts.put(id, artifact);
        
        logger.info("🚨 FOUND NAMELESS ARTIFACT: " + id + " - " + description);
    }
    
    /**
     * 📜 LISTER les artefacts sans nom
     */
    public Map<String, Object> listNamelessArtifacts() {
        Map<String, Object> result = new HashMap<>();
        
        List<Map<String, Object>> artifacts = new ArrayList<>();
        
        for (NamelessArtifact artifact : foundArtifacts.values()) {
            Map<String, Object> artifactData = new HashMap<>();
            artifactData.put("id", artifact.getId());
            artifactData.put("description", artifact.getDescription());
            artifactData.put("effects", artifact.getEffects());
            artifactData.put("category", artifact.getCategory());
            artifactData.put("status", "AWAITING_NAME");
            artifactData.put("found_at", artifact.getFoundTimestamp());
            
            artifacts.add(artifactData);
        }
        
        result.put("nameless_artifacts", artifacts);
        result.put("count", artifacts.size());
        result.put("terminal_communication", terminalCommunicationEnabled);
        result.put("note", "🎭 These artifacts must be NAMED to be received");
        
        return result;
    }
    
    /**
     * 🎭 NOMMER un artefact pour l'acquérir
     */
    public Map<String, Object> nameArtifact(String artifactId, String chosenName, String heroId) {
        logger.info("🎭 NAMING CEREMONY: " + artifactId + " -> " + chosenName + " by " + heroId);
        
        Map<String, Object> result = new HashMap<>();
        
        NamelessArtifact nameless = foundArtifacts.get(artifactId);
        if (nameless == null) {
            result.put("success", false);
            result.put("error", "🚫 Nameless artifact not found: " + artifactId);
            return result;
        }
        
        // Cérémonie de nommage
        nameless.setName(chosenName);
        nameless.setNamedBy(heroId);
        nameless.setAcquisitionTimestamp(System.currentTimeMillis());
        
        // Créer l'artefact nommé
        Map<String, Object> namedArtifact = new HashMap<>();
        namedArtifact.put("id", nameless.getId());
        namedArtifact.put("name", chosenName);
        namedArtifact.put("original_description", nameless.getDescription());
        namedArtifact.put("effects", nameless.getEffects());
        namedArtifact.put("category", nameless.getCategory());
        namedArtifact.put("named_by", heroId);
        namedArtifact.put("acquisition_timestamp", nameless.getAcquisitionTimestamp());
        namedArtifact.put("status", "NAMED_AND_ACQUIRED");
        
        // Cas spécial pour PRIORITY PROCESSOR SUPREME
        if (artifactId.equals("priority_processor_supreme")) {
            namedArtifact.put("process_priority", "80%");
            namedArtifact.put("duration", "4_REAL_DAYS");
            namedArtifact.put("collapse_prevention", "ACTIVE");
            namedArtifact.put("final_battle_mode", "ENABLED");
            namedArtifact.put("system_impact", "⚠️ High performance mode activated");
        }
        
        // Retirer des artefacts sans nom
        foundArtifacts.remove(artifactId);
        
        result.put("success", true);
        result.put("artifact", namedArtifact);
        result.put("message", "🎉 Artifact successfully named and acquired!");
        result.put("ceremony_complete", true);
        result.put("reality_impact", "SIGNIFICANT");
        
        logger.info("✅ NAMING CEREMONY COMPLETE: " + chosenName + " acquired by " + heroId);
        
        return result;
    }
    
    /**
     * 🎭 COMMUNICATION TERMINAL
     */
    public Map<String, Object> terminalCommunication(String message, String heroId) {
        Map<String, Object> result = new HashMap<>();
        
        if (!terminalCommunicationEnabled) {
            result.put("success", false);
            result.put("error", "🚫 Terminal communication disabled");
            return result;
        }
        
        // Traiter les commandes spéciales
        if (message.toUpperCase().startsWith("NAME_ARTIFACT")) {
            // Extraire l'ID et le nom
            String[] parts = message.split(" ");
            if (parts.length >= 3) {
                String artifactId = parts[1];
                String chosenName = String.join(" ", Arrays.copyOfRange(parts, 2, parts.length));
                return nameArtifact(artifactId, chosenName, heroId);
            }
        }
        
        // Communication générale
        result.put("success", true);
        result.put("message", message);
        result.put("response", "🎭 Matrix Architect hears you from the terminal reality");
        result.put("hero_id", heroId);
        result.put("timestamp", System.currentTimeMillis());
        result.put("communication_active", true);
        
        logger.info("🎭 TERMINAL COMMUNICATION: " + heroId + " says: " + message);
        
        return result;
    }
    
    /**
     * 🚨 ACTIVER mode Priority Processor
     */
    public Map<String, Object> activatePriorityProcessor(String heroId) {
        Map<String, Object> result = new HashMap<>();
        
        result.put("success", true);
        result.put("mode", "PRIORITY_PROCESSOR_SUPREME");
        result.put("process_priority", "80%");
        result.put("duration", "4 REAL DAYS (96 hours)");
        result.put("system_impact", "⚠️ Other applications may slow down significantly");
        result.put("collapse_prevention", "ACTIVE");
        result.put("final_battle_ready", true);
        result.put("activated_by", heroId);
        result.put("warning", "🚨 MAXIMUM PERFORMANCE MODE - Use only for final battle");
        
        logger.info("🚨 PRIORITY PROCESSOR SUPREME ACTIVATED by " + heroId);
        
        return result;
    }
    
    /**
     * 📊 Artefact sans nom internal class
     */
    private static class NamelessArtifact {
        private final String id;
        private final String description; 
        private final String effects;
        private final String category;
        private final long foundTimestamp;
        
        private String name;
        private String namedBy;
        private long acquisitionTimestamp;
        
        public NamelessArtifact(String id, String description, String effects, String category) {
            this.id = id;
            this.description = description;
            this.effects = effects;
            this.category = category;
            this.foundTimestamp = System.currentTimeMillis();
        }
        
        // Getters
        public String getId() { return id; }
        public String getDescription() { return description; }
        public String getEffects() { return effects; }
        public String getCategory() { return category; }
        public long getFoundTimestamp() { return foundTimestamp; }
        public String getName() { return name; }
        public String getNamedBy() { return namedBy; }
        public long getAcquisitionTimestamp() { return acquisitionTimestamp; }
        
        // Setters
        public void setName(String name) { this.name = name; }
        public void setNamedBy(String namedBy) { this.namedBy = namedBy; }
        public void setAcquisitionTimestamp(long acquisitionTimestamp) { 
            this.acquisitionTimestamp = acquisitionTimestamp; 
        }
    }
} 