package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * 🔫 VINCE VEGA DEMO CONTROLLER - INTERMODE HÉROS
 * 
 * Controller pour la démo interdimensionnelle de Vince Vega l'Errant
 * - Gun .45 qui tire entre instances
 * - Capacités quatrième mur
 * - Errance dimensionnelle
 * - Dialogue direct avec le joueur
 * 
 * @author OPUS-MEMENTO-CLAUDIUS
 * @version 1.0 - Révolution GRUT
 */
@RestController
@RequestMapping("/api/vince-vega")
@Tag(name = "🔫 Vince Vega Demo", description = "Démo héros interdimensionnel Vince Vega l'Errant")
@CrossOrigin(origins = "*")
public class VinceVegaDemoController {

    // ======================
    // CONSTANTES VINCE VEGA
    // ======================
    
    private static final String[] VINCE_QUOTES = {
        "C'est pas notre monde, mec. Et le pire ? Je suis presque sûr d'avoir déjà foutu le bordel ici.",
        "Je tire là-bas, ça meurt ici. C'est beau la technologie.",
        "OK, soit j'ai trop tiré sur ce truc, soit on vient de changer de décor...",
        "T'es qui toi ? Le mec derrière l'écran ? Salut !",
        "On dirait que quelqu'un teste mes capacités. J'aime ça.",
        "Dimensional Travel, baby ! Like Pulp Fiction but with more quantum shit.",
        "Mon gun tire pas des balles, il tire des paradoxes causaux.",
        "Yo joueur ! Tu veux que je change de monde ou qu'est-ce ?",
        "Ce monde-là me connaît pas encore. Parfait pour faire du grabuge.",
        "Détecteur causal activé... Yeah, il y a de la distorsion temporelle ici."
    };
    
    private static final String[] AVAILABLE_WORLDS = {
        "ezorostam_world", "grottarp_world", "source_world", "tour_sombre_world", 
        "foret_grofi_world", "desert_causale_world", "interstice_temporel"
    };

    // ======================
    // ENDPOINTS DÉMO VINCE VEGA
    // ======================

    @GetMapping("/status")
    @Operation(summary = "📊 Status Vince Vega", description = "État actuel de Vince Vega l'Errant")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Status récupéré avec succès")
    })
    public ResponseEntity<Map<String, Object>> getVinceStatus() {
        Map<String, Object> status = new HashMap<>();
        
        status.put("name", "Vince Vega l'Errant");
        status.put("tier", "🧱 QUATRIÈME MUR");
        status.put("current_world", "interstice_temporel");
        status.put("gun_ammo", 8); // .45 classique
        status.put("meta_awareness", true);
        status.put("dimensional_travel", true);
        status.put("causal_detector", "ACTIVE");
        status.put("quote", getRandomQuote());
        status.put("available_worlds", Arrays.asList(AVAILABLE_WORLDS));
        status.put("special_abilities", Arrays.asList(
            "CROSS_INSTANCE_SHOOT", "META_DIALOGUE", "DIMENSIONAL_TRAVEL", 
            "CAUSAL_DETECTION", "FOURTH_WALL_BREAK"
        ));
        
        return ResponseEntity.ok(status);
    }

    @PostMapping("/shoot")
    @Operation(summary = "🔫 Gun Interdimensionnel", description = "Vince tire avec son .45 entre instances")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Tir effectué avec succès"),
        @ApiResponse(responseCode = "400", description = "Cible invalide ou monde inexistant")
    })
    public ResponseEntity<Map<String, Object>> shootAcrossInstances(
            @Parameter(description = "Monde cible pour le tir") @RequestParam String targetWorld,
            @Parameter(description = "Coordonnées cible (x,y)") @RequestParam(required = false) String targetCoords,
            @Parameter(description = "Type de munition") @RequestParam(defaultValue = "paradox_bullet") String ammoType
    ) {
        
        Map<String, Object> result = new HashMap<>();
        
        // Validation monde cible
        if (!Arrays.asList(AVAILABLE_WORLDS).contains(targetWorld)) {
            result.put("success", false);
            result.put("message", "Monde inconnu, mec. Mon gun tire pas dans le vide cosmique.");
            result.put("vince_quote", "Ça ressemble pas à un monde que je connais, ça...");
            return ResponseEntity.badRequest().body(result);
        }
        
        // Simulation tir interdimensionnel
        result.put("success", true);
        result.put("action", "CROSS_INSTANCE_SHOOT");
        result.put("source_world", "interstice_temporel");
        result.put("target_world", targetWorld);
        result.put("target_coords", targetCoords != null ? targetCoords : "15,15");
        result.put("ammo_type", ammoType);
        result.put("damage", calculateInterDimensionalDamage(targetWorld, ammoType));
        result.put("causal_effect", generateCausalEffect(targetWorld));
        result.put("vince_reaction", generateShootReaction(targetWorld));
        result.put("fourth_wall_break", generateFourthWallComment());
        
        // Log de l'action
        System.out.println("🔫 VINCE VEGA SHOOTS: " + targetWorld + " -> " + result.get("damage") + " dmg");
        
        return ResponseEntity.ok(result);
    }

    @PostMapping("/travel")
    @Operation(summary = "🌀 Voyage Dimensionnel", description = "Vince voyage entre les mondes")
    public ResponseEntity<Map<String, Object>> travelBetweenWorlds(
            @Parameter(description = "Monde de destination") @RequestParam String destinationWorld
    ) {
        
        Map<String, Object> result = new HashMap<>();
        
        if (!Arrays.asList(AVAILABLE_WORLDS).contains(destinationWorld)) {
            result.put("success", false);
            result.put("message", "Ce monde existe pas dans ma playlist, désolé.");
            return ResponseEntity.badRequest().body(result);
        }
        
        result.put("success", true);
        result.put("action", "DIMENSIONAL_TRAVEL");
        result.put("from_world", "interstice_temporel");
        result.put("to_world", destinationWorld);
        result.put("travel_method", "🌀 Passage Interdimensionnel");
        result.put("arrival_quote", generateArrivalQuote(destinationWorld));
        result.put("world_analysis", analyzeNewWorld(destinationWorld));
        result.put("causal_signature", "TEMPORAL_SHIFT_DETECTED");
        
        return ResponseEntity.ok(result);
    }

    @GetMapping("/talk-to-player")
    @Operation(summary = "💬 Dialogue Joueur", description = "Vince parle directement au joueur (Quatrième Mur)")
    public ResponseEntity<Map<String, Object>> talkToPlayer() {
        Map<String, Object> dialogue = new HashMap<>();
        
        String[] playerDialogues = {
            "Salut toi ! Oui, toi derrière l'écran. Tu t'amuses bien avec mon API ?",
            "Tu sais que je peux te voir, hein ? C'est ça le Quatrième Mur, baby !",
            "Alors, on teste mes capacités ? J'espère que ton serveur tient le choc !",
            "Tu veux que je tire où exactement ? Fais-moi une requête POST, on va s'marrer !",
            "Entre nous, ton code est pas mal. Pas parfait, mais pas mal.",
            "Dis-moi, ça fait quoi d'être de l'autre côté de l'API ? Moi je trouve ça cool !",
            "Tu veux voir un vrai bug ? Regarde-moi faire un voyage interdimensionnel !",
            "API REST, JSON, HTTP... Vous avez de beaux outils dans votre dimension !"
        };
        
        dialogue.put("speaker", "Vince Vega l'Errant");
        dialogue.put("target", "PLAYER_REAL_WORLD");
        dialogue.put("message", playerDialogues[new Random().nextInt(playerDialogues.length)]);
        dialogue.put("type", "FOURTH_WALL_BREAK");
        dialogue.put("meta_level", "DIRECT_PLAYER_INTERACTION");
        dialogue.put("awareness", "FULL_META_CONSCIOUSNESS");
        
        return ResponseEntity.ok(dialogue);
    }

    @GetMapping("/detect-causal")
    @Operation(summary = "🔍 Détection Causale", description = "Vince détecte les interférences temporelles avec ses côtes")
    public ResponseEntity<Map<String, Object>> detectCausalInterference() {
        Map<String, Object> detection = new HashMap<>();
        
        // Simulation détection causale
        Random rand = new Random();
        int interferenceLevel = rand.nextInt(100);
        
        detection.put("detector_status", "ACTIVE");
        detection.put("interference_level", interferenceLevel);
        detection.put("causal_signature", generateCausalSignature());
        detection.put("threat_level", interferenceLevel > 70 ? "HIGH" : interferenceLevel > 40 ? "MEDIUM" : "LOW");
        detection.put("vince_analysis", generateCausalAnalysis(interferenceLevel));
        detection.put("recommended_action", interferenceLevel > 70 ? "SHOOT_FIRST_ASK_LATER" : "OBSERVE_AND_WAIT");
        
        // Côtes causales (tatouages détecteurs)
        List<Map<String, Object>> ribs = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Map<String, Object> rib = new HashMap<>();
            rib.put("rib_number", i);
            rib.put("vibration_level", rand.nextInt(10));
            rib.put("temporal_echo", rand.nextBoolean());
            ribs.add(rib);
        }
        detection.put("causal_ribs_status", ribs);
        
        return ResponseEntity.ok(detection);
    }

    @GetMapping("/quantum-gun-stats")
    @Operation(summary = "📊 Stats Gun Quantique", description = "Statistiques détaillées du .45 de Vince")
    public ResponseEntity<Map<String, Object>> getQuantumGunStats() {
        Map<String, Object> gunStats = new HashMap<>();
        
        gunStats.put("weapon_name", "Le .45 de Vince Vega");
        gunStats.put("type", "INTERDIMENSIONAL_HANDGUN");
        gunStats.put("tier", "QUATRIÈME MUR");
        gunStats.put("damage_base", 85);
        gunStats.put("damage_interdimensional", 150);
        gunStats.put("ammo_capacity", 8);
        gunStats.put("reload_time", "2.5 secondes dimensionnelles");
        gunStats.put("special_effects", Arrays.asList(
            "CROSS_INSTANCE_SHOT", "CAUSAL_PARADOX_DAMAGE", "REALITY_PUNCTURE", "TIMELINE_DISRUPTION"
        ));
        gunStats.put("ammunition_types", Arrays.asList(
            "paradox_bullet", "quantum_slug", "causal_hollow_point", "meta_fragmenting_round"
        ));
        gunStats.put("effective_range", "INFINITE (Entre dimensions)");
        gunStats.put("accuracy", "Plot Armor Dependent");
        gunStats.put("legendary_quote", "Je tire là-bas, ça meurt ici. C'est beau la technologie.");
        
        return ResponseEntity.ok(gunStats);
    }

    // ======================
    // MÉTHODES UTILITAIRES
    // ======================

    private String getRandomQuote() {
        return VINCE_QUOTES[new Random().nextInt(VINCE_QUOTES.length)];
    }

    private int calculateInterDimensionalDamage(String targetWorld, String ammoType) {
        int baseDamage = 85;
        
        // Bonus par type de munition
        switch (ammoType) {
            case "quantum_slug": return baseDamage + 30;
            case "causal_hollow_point": return baseDamage + 45;
            case "meta_fragmenting_round": return baseDamage + 60;
            default: return baseDamage + 15; // paradox_bullet
        }
    }

    private String generateCausalEffect(String targetWorld) {
        String[] effects = {
            "Ondulation spatio-temporelle détectée",
            "Fracture causale mineure dans " + targetWorld,
            "Écho paradoxal propagé à travers les dimensions", 
            "Stabilité temporelle réduite de 12%",
            "Création d'une boucle causale secondaire"
        };
        return effects[new Random().nextInt(effects.length)];
    }

    private String generateShootReaction(String targetWorld) {
        return "Boom ! Tir effectué dans " + targetWorld + ". " + 
               "Mon détecteur causal va avoir du boulot après ça !";
    }

    private String generateFourthWallComment() {
        String[] comments = {
            "Hé joueur ! Tu as vu ce tir ? Stylé non ?",
            "API REST + Gun interdimensionnel = Best combo ever !",
            "Tu devrais logger ça dans tes metrics, c'est du contenu premium !",
            "Entre nous, ton backend gère bien mes capacités quantiques !",
            "Ça c'est du JSON de qualité ! Comme mes balles !"
        };
        return comments[new Random().nextInt(comments.length)];
    }

    private String generateArrivalQuote(String world) {
        Map<String, String> worldQuotes = new HashMap<>();
        worldQuotes.put("ezorostam_world", "Ezorostam... Ça sent le souf re et les opportunités ici !");
        worldQuotes.put("grottarp_world", "Grottarp ! Un monde qui me va bien, sombre et mystérieux.");
        worldQuotes.put("source_world", "La Source... Même moi je me sens petit dans ce lieu.");
        worldQuotes.put("tour_sombre_world", "La Tour Sombre ! Enfin un défi à ma hauteur !");
        worldQuotes.put("foret_grofi_world", "Forêt GROFI... J'espère que GRUT est friendly !");
        
        return worldQuotes.getOrDefault(world, "Nouveau monde, nouvelles règles à casser !");
    }

    private Map<String, Object> analyzeNewWorld(String world) {
        Map<String, Object> analysis = new HashMap<>();
        Random rand = new Random();
        
        analysis.put("danger_level", rand.nextInt(10) + 1);
        analysis.put("quantum_stability", rand.nextInt(100));
        analysis.put("local_physics", rand.nextBoolean() ? "EUCLIDEAN" : "NON_EUCLIDEAN");
        analysis.put("meta_accessibility", rand.nextBoolean() ? "FOURTH_WALL_ACTIVE" : "STANDARD_NARRATIVE");
        analysis.put("gun_effectiveness", rand.nextInt(50) + 50 + "%");
        
        return analysis;
    }

    private String generateCausalSignature() {
        String[] signatures = {
            "ψ_TEMPORAL_ECHO_47.2Hz", "ΔCAUSE_LOOP_DETECTED", "QUANTUM_FLUTTER_3.14kHz",
            "PARADOX_RESONANCE_ACTIVE", "TIMELINE_VARIANCE_0.003%", "CAUSAL_DRIFT_NOMINAL"
        };
        return signatures[new Random().nextInt(signatures.length)];
    }

    private String generateCausalAnalysis(int level) {
        if (level > 70) {
            return "Mes côtes vibrent comme des maracas ! Il y a du gros bordel temporel ici !";
        } else if (level > 40) {
            return "Petite interférence causale... Rien que mon gun peut pas régler.";
        } else {
            return "Tout est cool niveau causalité. On peut y aller tranquille.";
        }
    }
} 