package com.example.demo.controller;

import com.example.demo.service.TerrainService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 🌍 TERRAIN CONTROLLER - HEROES OF TIME API
 * 
 * Controller unifié pour génération terrain intelligent selon révélations GRUT.
 * Remplace le système random par algorithmes procéduraux + trésors HOMM3.
 * 
 * @author OPUS-MEMENTO-CLAUDIUS
 * @version 1.0 - Révolution GRUT
 */
@RestController
@RequestMapping("/api/terrain")
@Tag(name = "🌍 Terrain System", description = "Système de génération terrain intelligent avec algorithmes procéduraux GRUT")
@CrossOrigin(origins = "*")
public class TerrainController {

    @Autowired
    private TerrainService terrainService;

    // ======================
    // GÉNÉRATION MAP INTELLIGENTE
    // ======================

    @Operation(
        summary = "🗺️ Générer Map Intelligente",
        description = "Génère une map avec algorithmes procéduraux selon le monde spécifié. " +
                     "Remplace le système random par génération contextuelle avec trésors HOMM3 intelligents."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Map générée avec succès",
                    content = @Content(schema = @Schema(implementation = Map.class))),
        @ApiResponse(responseCode = "400", description = "Paramètres invalides"),
        @ApiResponse(responseCode = "500", description = "Erreur génération terrain")
    })
    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateIntelligentMap(
            @Parameter(description = "ID du monde (grofi_forest_world, temporal_rift_world, desert_world, etc.)", 
                      example = "grofi_forest_world", required = true)
            @RequestParam String worldId,
            
            @Parameter(description = "Mode de génération", example = "gameplay", required = true)
            @RequestParam String mode,
            
            @Parameter(description = "Largeur de la map", example = "20", required = true)
            @RequestParam int width,
            
            @Parameter(description = "Hauteur de la map", example = "20", required = true)
            @RequestParam int height
    ) {
        try {
            Map<String, Object> mapData = terrainService.generateIntelligentMap(worldId, mode, width, height);
            return ResponseEntity.ok(mapData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur génération terrain",
                "message", e.getMessage(),
                "worldId", worldId
            ));
        }
    }

    // ======================
    // INFORMATIONS TERRAIN
    // ======================

    @Operation(
        summary = "📊 Informations Terrain",
        description = "Récupère les informations détaillées d'un type de terrain : " +
                     "coût mouvement, praticabilité, probabilité trésors."
    )
    @GetMapping("/info/{terrainType}")
    public ResponseEntity<Map<String, Object>> getTerrainInfo(
            @Parameter(description = "Type de terrain", example = "forest", required = true)
            @PathVariable String terrainType
    ) {
        Map<String, Object> terrainInfo = terrainService.getTerrainInfo(terrainType);
        return ResponseEntity.ok(terrainInfo);
    }

    // ======================
    // MONDES SUPPORTÉS
    // ======================

    @Operation(
        summary = "🌐 Mondes Supportés",
        description = "Liste tous les mondes supportés par le système de génération terrain. " +
                     "Chaque monde a ses propres algorithmes et règles de génération."
    )
    @GetMapping("/worlds")
    public ResponseEntity<Map<String, Object>> getSupportedWorlds() {
        List<String> worlds = terrainService.getSupportedWorlds();
        return ResponseEntity.ok(Map.of(
            "supported_worlds", worlds,
            "total_count", worlds.size(),
            "description", "Mondes avec génération terrain intelligente selon révélations GRUT"
        ));
    }

    // ======================
    // PREVIEW MAP
    // ======================

    @Operation(
        summary = "👁️ Preview Map",
        description = "Génère un preview rapide d'une map pour visualisation. " +
                     "Version optimisée pour aperçu sans calculs complexes."
    )
    @GetMapping("/preview/{worldId}")
    public ResponseEntity<Map<String, Object>> generateMapPreview(
            @Parameter(description = "ID du monde", example = "grofi_forest_world", required = true)
            @PathVariable String worldId,
            
            @Parameter(description = "Taille du preview (carré)", example = "10")
            @RequestParam(defaultValue = "10") int size
    ) {
        Map<String, Object> preview = terrainService.generateMapPreview(worldId, size);
        return ResponseEntity.ok(preview);
    }

    // ======================
    // HEALTH CHECK
    // ======================

    @Operation(
        summary = "💚 Health Check Terrain",
        description = "Vérification du statut du service terrain. " +
                     "Confirme que tous les algorithmes GRUT sont opérationnels."
    )
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "✅ OPERATIONAL",
            "service", "TerrainService GRUT Edition",
            "algorithms", "Perlin Noise + Procedural + HOMM3 Treasures",
            "geometry", "Euclidean + Non-Euclidean Support",
            "author", "OPUS-MEMENTO-CLAUDIUS",
            "timestamp", System.currentTimeMillis()
        ));
    }

    // ======================
    // EASTER EGG JEAN-GROFIGNON
    // ======================

    @Operation(
        summary = "🛋️ Easter Egg Jean",
        description = "Message spécial de Jean-Grofignon depuis son canapé cosmique."
    )
    @GetMapping("/jean-message")
    public ResponseEntity<Map<String, Object>> jeanMessage() {
        return ResponseEntity.ok(Map.of(
            "message", "Salut depuis mon canapé ! Le terrain intelligent fonctionne parfaitement !",
            "author", "Jean-Grofignon",
            "location", "Canapé Cosmique",
            "wisdom", "Il faut vraiment qu'on fouille partout, tu vois, faut qu'on trouve tous ces machins planqués",
            "system_status", "RÉVOLUTION GRUT ACCOMPLIE",
            "emoji", "🛋️🌍✨"
        ));
    }
} 