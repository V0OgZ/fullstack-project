package com.example.demo.controller;

import com.example.demo.service.GameService;
import com.example.demo.service.QuantumStressMonitor;
import com.example.demo.service.RecursionProtector;
import com.example.demo.service.VirtualWorldManagerStub;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 🏛️ PANOPTICON CONTROLLER - VISION 6D OPUS
 * ==========================================
 * 
 * Contrôleur pour le Panopticon 6D selon les spécifications d'OPUS.
 * Gère la visualisation des 6 dimensions et les composants 3D.
 * 
 * OPUS: "Le Panopticon voit tout, mais ne révèle que ce que l'observateur peut comprendre"
 * STATUS: ✅ CRÉÉ selon specs OPUS 4ème visite - VERSION SIMPLIFIÉE
 */
@RestController
@RequestMapping("/api/panopticon")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8001"})
public class PanopticonController {
    
    @Autowired
    private GameService gameService;
    
    @Autowired
    private QuantumStressMonitor quantumStressMonitor;
    
    @Autowired
    private RecursionProtector recursionProtector;
    
    @Autowired
    private VirtualWorldManagerStub virtualWorldManager;
    
    /**
     * 🎯 GET PANOPTICON STATUS - État général du Panopticon 6D
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getPanopticonStatus() {
        Map<String, Object> status = Map.of(
            "panopticonActive", true,
            "dimensions", 6,
            "quantumStress", quantumStressMonitor.getCurrentStressLevel(),
            "recursionDepth", recursionProtector.getRecursionStatus().get("currentDepth"),
            "activePortals", virtualWorldManager.getVirtualWorldsStatus().get("totalWorlds"),
            "componentsStatus", Map.of(
                "portalRoom", "OPERATIONAL",
                "multiSliceView", "OPERATIONAL", 
                "tesseractManipulator", "OPERATIONAL",
                "dimensionM", "TRAP_ARMED"
            ),
            "timestamp", LocalDateTime.now()
        );
        
        return ResponseEntity.ok(status);
    }
    
    /**
     * 🌌 PORTAL ROOM DATA - Données pour la salle des portails
     */
    @GetMapping("/portal-room")
    public ResponseEntity<Map<String, Object>> getPortalRoomData() {
        Map<String, Object> portalData = Map.of(
            "dimensions", Arrays.asList(
                Map.of("id", "SPACE_XYZ", "name", "Space (X,Y,Z)", "color", "#4CAF50", "active", true),
                Map.of("id", "TIME_T", "name", "Time (T)", "color", "#2196F3", "active", false),
                Map.of("id", "CAUSALITY_PSI", "name", "Causality (Ψ)", "color", "#FF9800", "active", false),
                Map.of("id", "SUPERPOSITION_SIGMA", "name", "Superposition (Σ)", "color", "#9C27B0", "active", false),
                Map.of("id", "ENTROPY_S", "name", "Entropy (S)", "color", "#F44336", "active", false),
                Map.of("id", "RECURSIVITY_R", "name", "Recursivity (𝕽)", "color", "#FF5722", "active", false)
            ),
            "quantumStress", quantumStressMonitor.getCurrentStressLevel(),
            "currentDimension", "SPACE_XYZ",
            "portalStatus", "OPERATIONAL"
        );
        
        return ResponseEntity.ok(portalData);
    }
    
    /**
     * 🔬 MULTI SLICE DATA - Données pour la vue multi-tranches
     */
    @GetMapping("/multi-slice/{dimensions}")
    public ResponseEntity<Map<String, Object>> getMultiSliceData(@PathVariable String dimensions) {
        String[] dimArray = dimensions.split(",");
        
        List<Map<String, Object>> sliceData = Arrays.stream(dimArray)
            .map(dim -> {
                // Générer des données simulées pour chaque dimension
                List<Map<String, Object>> data = new ArrayList<>();
                for (int i = 0; i < 64; i++) {
                    data.add(Map.of(
                        "id", i,
                        "value", Math.random() * 2 + 0.1,
                        "quantum", Math.random(),
                        "causal", Math.random() > 0.5
                    ));
                }
                
                return Map.of(
                    "dimension", dim,
                    "data", data,
                    "stability", Math.random() * 100,
                    "coherence", Math.random() * 100
                );
            })
            .collect(Collectors.toList());
        
        Map<String, Object> response = Map.of(
            "slices", sliceData,
            "recursionDepth", recursionProtector.getRecursionStatus().get("currentDepth"),
            "connections", generateSliceConnections(dimArray),
            "timestamp", System.currentTimeMillis()
        );
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 🎛️ TESSERACT DATA - Données pour le manipulateur de tesseract
     */
    @GetMapping("/tesseract")
    public ResponseEntity<Map<String, Object>> getTesseractData() {
        // Vertices du tesseract 4D
        List<Map<String, Object>> vertices = new ArrayList<>();
        double[][][] tesseractCoords = {
            {{-1,-1,-1,0}, {1,-1,-1,0}, {1,1,-1,0}, {-1,1,-1,0}},
            {{-1,-1,1,0}, {1,-1,1,0}, {1,1,1,0}, {-1,1,1,0}},
            {{-1,-1,-1,1}, {1,-1,-1,1}, {1,1,-1,1}, {-1,1,-1,1}},
            {{-1,-1,1,1}, {1,-1,1,1}, {1,1,1,1}, {-1,1,1,1}}
        };
        
        for (int i = 0; i < 16; i++) {
            int layer = i / 4;
            int pos = i % 4;
            vertices.add(Map.of(
                "id", "vertex_" + i,
                "coords", tesseractCoords[layer][pos],
                "active", Math.random() > 0.5
            ));
        }
        
        // Edges du tesseract
        List<Map<String, Object>> edges = generateTesseractEdges();
        
        Map<String, Object> tesseractData = Map.of(
            "vertices", vertices,
            "edges", edges,
            "recursionLevel", recursionProtector.getRecursionStatus().get("currentDepth"),
            "dimensionLocks", Arrays.asList(false, false, false, false, false, false),
            "projectionMatrix", Arrays.asList(
                Arrays.asList(1.0, 0.0, 0.0, 0.0),
                Arrays.asList(0.0, 1.0, 0.0, 0.0),
                Arrays.asList(0.0, 0.0, 1.0, 0.0)
            )
        );
        
        return ResponseEntity.ok(tesseractData);
    }
    
    /**
     * 🕸️ DIMENSION M STATUS - État du piège Dimension M
     */
    @GetMapping("/dimension-m")
    public ResponseEntity<Map<String, Object>> getDimensionMStatus() {
        Map<String, Object> dimensionMData = Map.of(
            "trapActive", true,
            "omegaDetected", false,
            "virtualWorlds", virtualWorldManager.getVirtualWorldsStatus().get("totalWorlds"),
            "mVoidStatus", "ARMED",
            "clefParacausale", Map.of(
                "active", true,
                "baitStrength", 95.7,
                "quantumSignature", "ψΩ847Σ923Δ156"
            ),
            "illusion", Map.of(
                "multiverse", "SIMULATED",
                "dimensions", "FALSIFIED",
                "servers", "SINGLE_INSTANCE"
            )
        );
        
        return ResponseEntity.ok(dimensionMData);
    }
    
    /**
     * 🔄 CHANGE DIMENSION - Changement de dimension active
     */
    @PostMapping("/change-dimension")
    public ResponseEntity<Map<String, Object>> changeDimension(@RequestBody Map<String, String> request) {
        String newDimension = request.get("dimension");
        
        Map<String, Object> response = Map.of(
            "success", true,
            "previousDimension", "SPACE_XYZ",
            "newDimension", newDimension,
            "quantumStress", quantumStressMonitor.getCurrentStressLevel(),
            "timestamp", LocalDateTime.now()
        );
        
        return ResponseEntity.ok(response);
    }
    
    private List<Map<String, Object>> generateSliceConnections(String[] dimensions) {
        List<Map<String, Object>> connections = new ArrayList<>();
        
        for (int i = 0; i < dimensions.length; i++) {
            for (int j = i + 1; j < dimensions.length; j++) {
                connections.add(Map.of(
                    "from", dimensions[i],
                    "to", dimensions[j],
                    "strength", Math.random(),
                    "type", "QUANTUM_ENTANGLEMENT"
                ));
            }
        }
        
        return connections;
    }
    
    private List<Map<String, Object>> generateTesseractEdges() {
        List<Map<String, Object>> edges = new ArrayList<>();
        
        // Générer les arêtes du tesseract (connexions entre vertices adjacents)
        for (int i = 0; i < 16; i++) {
            for (int j = i + 1; j < 16; j++) {
                // Vérifier si les vertices sont adjacents (diffèrent sur une seule dimension)
                if (Math.abs(i - j) == 1 || Math.abs(i - j) == 4 || Math.abs(i - j) == 8) {
                    int diffDimension = 0;
                    if (Math.abs(i - j) == 1) diffDimension = 0;
                    else if (Math.abs(i - j) == 4) diffDimension = 1;
                    else diffDimension = 2;
                    
                    Object currentDepth = recursionProtector.getRecursionStatus().get("currentDepth");
                    double recursionEffect = (currentDepth instanceof Integer) ? ((Integer) currentDepth) * 0.1 : 0.0;
                    
                    edges.add(Map.of(
                        "from", "vertex_" + i,
                        "to", "vertex_" + j,
                        "dimension", diffDimension,
                        "strength", 1.0 - recursionEffect
                    ));
                }
            }
        }
        
        return edges;
    }
} 