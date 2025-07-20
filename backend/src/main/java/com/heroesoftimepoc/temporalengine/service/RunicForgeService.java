package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.ForgedObject;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

/**
 * Service de Forge Runique - L'OBJET ULTIME
 * Permet aux joueurs de forger des objets en écrivant leur grammaire HOTS
 * 
 * ATTENTION : Ce service peut VRAIMENT crasher le serveur si mal utilisé !
 * C'est voulu - fait partie du gameplay risqué
 */
@Service
@Transactional
public class RunicForgeService {
    
    private static final Logger log = LoggerFactory.getLogger(RunicForgeService.class);
    
    @Autowired
    private TemporalScriptParser parser;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private GameRepository gameRepository;
    
    // Limites de sécurité
    private static final int MAX_ACTIVE_FORGES = 3;
    private static final int FORGE_COOLDOWN_TURNS = 10;
    private static final int BASE_TEMPORAL_COST = 100;
    private static final int COST_INCREMENT = 20;
    
    // Tracking des forges actives
    private final Map<Long, ForgeSession> activeForgeSessions = new ConcurrentHashMap<>();
    private final Map<String, Integer> heroForgeCount = new ConcurrentHashMap<>();
    private final Map<String, Integer> heroLastForgeTurn = new ConcurrentHashMap<>();
    
    // Patterns dangereux
    private static final List<Pattern> DANGEROUS_PATTERNS = Arrays.asList(
        Pattern.compile("while\\s*\\(\\s*true\\s*\\)"),  // Boucle infinie
        Pattern.compile("DROP\\s+TABLE", Pattern.CASE_INSENSITIVE),  // SQL injection
        Pattern.compile("System\\.exit"),  // Shutdown
        Pattern.compile("Runtime\\.getRuntime"),  // Execution système
        Pattern.compile("Thread\\.sleep\\(\\d{5,}\\)"),  // Sleep trop long
        Pattern.compile("new\\s+Thread\\s*\\("),  // Création de threads
        Pattern.compile("FORGE\\s*\\(.*FORGE\\s*\\(.*FORGE")  // Récursion excessive
    );
    
    // Symboles interdits qui causent un collapse instantané
    private static final List<String> FORBIDDEN_SYMBOLS = Arrays.asList(
        "∞∞∞",  // Triple infini
        "↯↯↯↯↯",  // Chaos excessif
        "Ω→∅",  // Finalité vers néant
        "†††††",  // Mort quintuple
        "ψ(ψ(ψ(ψ(ψ"  // Récursion quantique
    );
    
    /**
     * Résultat d'une tentative de forge
     */
    public static class ForgeResult {
        private final boolean success;
        private final String message;
        private final ForgedObject forgedObject;
        private final boolean serverCrashed;
        private final int damageToHero;
        
        private ForgeResult(boolean success, String message, ForgedObject object, 
                          boolean crashed, int damage) {
            this.success = success;
            this.message = message;
            this.forgedObject = object;
            this.serverCrashed = crashed;
            this.damageToHero = damage;
        }
        
        public static ForgeResult success(ForgedObject object) {
            return new ForgeResult(true, "Forge réussie !", object, false, 0);
        }
        
        public static ForgeResult explosion(Hero forger, String reason) {
            int damage = forger.getHealth() / 2;  // 50% HP
            return new ForgeResult(false, "💥 EXPLOSION ! " + reason, null, false, damage);
        }
        
        public static ForgeResult serverDeath() {
            return new ForgeResult(false, "☠️ SERVEUR MORT", null, true, 999);
        }
        
        // Getters
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public ForgedObject getForgedObject() { return forgedObject; }
        public boolean isServerCrashed() { return serverCrashed; }
        public int getDamageToHero() { return damageToHero; }
    }
    
    /**
     * Session de forge active
     */
    private static class ForgeSession {
        final String heroName;
        final long startTime;
        final int temporalCost;
        
        ForgeSession(String hero, int cost) {
            this.heroName = hero;
            this.startTime = System.currentTimeMillis();
            this.temporalCost = cost;
        }
        
        boolean isExpired() {
            return (System.currentTimeMillis() - startTime) > 60000; // 60 secondes
        }
    }
    
    /**
     * MÉTHODE PRINCIPALE : Exécuter une forge runique
     */
    public ForgeResult executeForge(String runicScript, Hero forger, Game game) {
        log.warn("🔥 FORGE RUNIQUE ACTIVÉE par {} !", forger.getName());
        
        // 1. Vérifier les limites
        if (activeForgeSessions.size() >= MAX_ACTIVE_FORGES) {
            return ForgeResult.explosion(forger, "Trop de forges actives !");
        }
        
        // 2. Vérifier le cooldown
        Integer lastForgeTurn = heroLastForgeTurn.get(forger.getName());
        if (lastForgeTurn != null && 
            game.getCurrentTurn() - lastForgeTurn < FORGE_COOLDOWN_TURNS) {
            return ForgeResult.explosion(forger, "Forge en cooldown !");
        }
        
        // 3. Calculer et vérifier le coût
        int forgeCount = heroForgeCount.getOrDefault(forger.getName(), 0);
        int cost = BASE_TEMPORAL_COST + (forgeCount * COST_INCREMENT);
        
        if (forger.getTemporalEnergy() < cost) {
            return ForgeResult.explosion(forger, "Énergie temporelle insuffisante !");
        }
        
        // 4. Créer la session
        ForgeSession session = new ForgeSession(forger.getName(), cost);
        activeForgeSessions.put(game.getId(), session);
        
        try {
            // 5. Vérifier la sécurité BASIQUE
            SecurityCheckResult security = checkBasicSecurity(runicScript);
            if (!security.isSafe) {
                // Avertir mais permettre (YOLO)
                log.error("⚠️ FORGE DANGEREUSE DÉTECTÉE : {}", security.reason);
                notifyAdmins("FORGE_DANGEREUSE", forger.getName(), security.reason);
                
                // 50% chance d'explosion immédiate
                if (Math.random() < 0.5) {
                    return ForgeResult.explosion(forger, security.reason);
                }
            }
            
            // 6. Parser la grammaire de forge
            ForgedObject forgedObject = parseForgeScript(runicScript);
            
            // 7. Vérifier les symboles interdits
            if (containsForbiddenSymbols(runicScript)) {
                // COLLAPSE CAUSAL INSTANTANÉ !
                triggerCausalCollapse(game, forger);
                return ForgeResult.serverDeath();
            }
            
            // 8. Exécuter les effets de l'objet forgé
            if (forgedObject.hasMetaEffect()) {
                // Les objets méta sont TRÈS dangereux
                log.error("🌀 OBJET MÉTA FORGÉ : {}", forgedObject.getName());
                
                if (forgedObject.getEffect().contains("EXECUTE_RAW_CODE")) {
                    // OH NON !
                    executeRawCode(forgedObject.getFormula());
                }
            }
            
            // 9. Succès ! Déduire le coût
            forger.setTemporalEnergy(forger.getTemporalEnergy() - cost);
            heroRepository.save(forger);
            
            // 10. Mettre à jour les compteurs
            heroForgeCount.put(forger.getName(), forgeCount + 1);
            heroLastForgeTurn.put(forger.getName(), game.getCurrentTurn());
            
            // 11. Ajouter l'objet à l'inventaire du héros
            forger.addItem(forgedObject.getName());
            
            // 12. Vérifier les récompenses
            checkForgeAchievements(forger, forgeCount + 1);
            
            log.info("✨ FORGE RÉUSSIE : {} a créé {}", forger.getName(), forgedObject.getName());
            return ForgeResult.success(forgedObject);
            
        } catch (StackOverflowError e) {
            log.error("💥 STACK OVERFLOW dans la forge !");
            return ForgeResult.serverDeath();
            
        } catch (OutOfMemoryError e) {
            log.error("💥 OUT OF MEMORY dans la forge !");
            return ForgeResult.serverDeath();
            
        } catch (Exception e) {
            log.error("💥 EXCEPTION dans la forge : ", e);
            return ForgeResult.explosion(forger, e.getMessage());
            
        } finally {
            // Nettoyer la session
            activeForgeSessions.remove(game.getId());
        }
    }
    
    /**
     * Vérification de sécurité basique
     */
    private SecurityCheckResult checkBasicSecurity(String script) {
        // Vérifier les patterns dangereux
        for (Pattern pattern : DANGEROUS_PATTERNS) {
            Matcher matcher = pattern.matcher(script);
            if (matcher.find()) {
                return new SecurityCheckResult(false, 
                    "Pattern dangereux détecté : " + pattern.pattern());
            }
        }
        
        // Vérifier la longueur
        if (script.length() > 10000) {
            return new SecurityCheckResult(false, "Script trop long !");
        }
        
        // Vérifier la profondeur de récursion
        int openParens = 0;
        int maxDepth = 0;
        for (char c : script.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') openParens++;
            if (c == ')' || c == '}' || c == ']') openParens--;
            maxDepth = Math.max(maxDepth, openParens);
        }
        
        if (maxDepth > 10) {
            return new SecurityCheckResult(false, "Récursion trop profonde !");
        }
        
        return new SecurityCheckResult(true, "OK");
    }
    
    /**
     * Parser le script de forge
     */
    private ForgedObject parseForgeScript(String script) throws Exception {
        // Extraire les paramètres FORGE(...)
        Pattern forgePattern = Pattern.compile(
            "FORGE\\s*\\(([^)]+)\\)", Pattern.DOTALL
        );
        
        Matcher matcher = forgePattern.matcher(script);
        if (!matcher.find()) {
            throw new IllegalArgumentException("Syntaxe FORGE invalide !");
        }
        
        String params = matcher.group(1);
        
        // Parser les paramètres
        Map<String, String> attributes = new HashMap<>();
        Pattern attrPattern = Pattern.compile("(\\w+)\\s*:\\s*\"([^\"]+)\"");
        Matcher attrMatcher = attrPattern.matcher(params);
        
        while (attrMatcher.find()) {
            attributes.put(attrMatcher.group(1), attrMatcher.group(2));
        }
        
        // Créer l'objet forgé
        ForgedObject forged = new ForgedObject();
        forged.setName(attributes.getOrDefault("NAME", "ObjetMystérieux"));
        forged.setType(attributes.getOrDefault("TYPE", "ITEM"));
        forged.setFormula(attributes.get("FORMULA"));
        forged.setEffect(attributes.get("EFFECT"));
        forged.setCost(attributes.get("COST"));
        
        return forged;
    }
    
    /**
     * Vérifier les symboles interdits
     */
    private boolean containsForbiddenSymbols(String script) {
        for (String forbidden : FORBIDDEN_SYMBOLS) {
            if (script.contains(forbidden)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Déclencher un collapse causal (DANGER !)
     */
    private void triggerCausalCollapse(Game game, Hero forger) {
        log.error("🌀🌀🌀 COLLAPSE CAUSAL DÉCLENCHÉ PAR {} !", forger.getName());
        
        // Verrouiller toutes les tuiles autour
        int x = forger.getPositionX();
        int y = forger.getPositionY();
        
        for (int dx = -5; dx <= 5; dx++) {
            for (int dy = -5; dy <= 5; dy++) {
                game.lockTile(x + dx, y + dy, 99);
            }
        }
        
        // Tuer le héros
        forger.setHealth(0);
        forger.setStatus("COLLAPSED");
        
        // Créer un paradoxe temporel
        game.createParadox(x, y, "FORGE_COLLAPSE");
    }
    
    /**
     * Exécuter du code brut (NE JAMAIS FAIRE ÇA !)
     */
    private void executeRawCode(String code) {
        log.error("🔥🔥🔥 TENTATIVE D'EXÉCUTION DE CODE BRUT !");
        // NON. Juste... non.
        throw new SecurityException("NICE TRY!");
    }
    
    /**
     * Notifier les admins
     */
    private void notifyAdmins(String type, String hero, String details) {
        log.warn("📢 ALERTE ADMIN : {} - Héros: {} - Détails: {}", type, hero, details);
        // TODO: Implémenter notification WebSocket
    }
    
    /**
     * Vérifier les achievements de forge
     */
    private void checkForgeAchievements(Hero forger, int forgeCount) {
        if (forgeCount >= 3) {
            forger.addTitle("Maître Forgeron Quantique");
            forger.addItem("access_forge_eternelle");
            log.info("🏆 {} devient Maître Forgeron Quantique !", forger.getName());
        }
    }
    
    /**
     * Résultat de vérification de sécurité
     */
    private static class SecurityCheckResult {
        final boolean isSafe;
        final String reason;
        
        SecurityCheckResult(boolean safe, String reason) {
            this.isSafe = safe;
            this.reason = reason;
        }
    }
} 