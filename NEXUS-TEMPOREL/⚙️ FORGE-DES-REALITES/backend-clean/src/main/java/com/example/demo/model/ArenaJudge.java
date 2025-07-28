package com.example.demo.model;

import java.util.*;

/**
 * ArenaJudge - Le Juge de l'Arène, commentateur cosmique suprême
 * Personnage qui dynamise les combats avec des commentaires hilarants
 */
public class ArenaJudge {
    
    private String id;
    private String name;
    private String title;
    private String characterClass;
    private int tier;
    private String origin;
    private String personality;
    private String style;
    private String voiceTone;
    private String signatureCatchphrase;
    private Map<String, List<String>> phrases;
    private Map<String, Object> commentStats;
    private Map<String, Integer> phraseCooldowns;
    private boolean active;
    private long lastCommentTime;
    
    public ArenaJudge() {
        this.id = "ARENA_JUDGE";
        this.name = "Le Juge de l'Arène";
        this.title = "Commentateur Cosmique Suprême";
        this.characterClass = "Commentateur Cosmique";
        this.tier = 5;
        this.origin = "Dimension du Spectacle Éternel";
        this.personality = "Exubérant, théâtral, passionné, légèrement déjanté";
        this.style = "Mr Satan (DBZ) × Commentateur sportif × Présentateur de catch";
        this.voiceTone = "Enthousiaste, dramatique, parfois absurde";
        this.signatureCatchphrase = "INCROYABLE! Du jamais vu dans l'arène interdimensionnelle!";
        this.phrases = initializePhrases();
        this.commentStats = new HashMap<>();
        this.phraseCooldowns = new HashMap<>();
        this.active = true;
        this.lastCommentTime = 0;
        
        initializeStats();
    }
    
    private Map<String, List<String>> initializePhrases() {
        Map<String, List<String>> phrases = new HashMap<>();
        
        // Phrases de début de combat
        phrases.put("debut_combat", Arrays.asList(
            "Mesdames et messieurs, bienvenue dans l'ARÈNE INTERDIMENSIONNELLE! Ici, les lois de la physique sont des suggestions et les paradoxes sont des features!",
            "ATTENTION! Nous entrons dans une zone où l'impossible devient routine et où la routine devient impossible! Préparez vos esprits à l'émerveillement!",
            "Spectacle garanti dans cette arène où les héros défient non seulement leurs adversaires, mais la réalité elle-même!",
            "Bienvenue dans le seul endroit du multivers où casser les lois de la physique est non seulement autorisé, mais ENCOURAGÉ!",
            "Dans le coin rouge, un héros qui a traversé plus de timelines que vous n'avez bu de cafés! Dans le coin bleu, son adversaire qui compte bien lui prouver que le temps, c'est relatif!",
            "L'éther temporel vibre d'anticipation! Même Grut a arrêté de calculer des probabilités pour regarder!",
            "Combat spécial ce soir : nous avons activé le mode 'Chaos Contrôlé'! Attendez-vous à tout et à son contraire!",
            "EXCLUSIVITÉ! Premier combat retransmis simultanément dans 7 dimensions! Les spectateurs du futur nous saluent déjà!"
        ));
        
        // Phrases d'actions normales
        phrases.put("action_normale", Arrays.asList(
            "Magnifique déplacement! Cette case hexagonale n'avait jamais été foulée avec autant de style!",
            "Stratégie brillante! Se positionner là, c'est du génie... ou de la chance pure. Probablement les deux!",
            "Attaque directe! Simple, efficace, et respectueuse des lois de la physique! Comme c'est... inhabituel!",
            "Défense solide! Cette parade aurait pu arrêter un météore... si elle en avait eu l'occasion!",
            "Excellent timing! Ce héros a le sens du rythme cosmique!",
            "L'intensité monte! L'atmosphère devient électrique... littéralement, j'ai des étincelles partout!",
            "Combat exemplaire! Nos statistiques de spectacle explosent tous les compteurs!"
        ));
        
        // Phrases de coups critiques
        phrases.put("coup_critique", Arrays.asList(
            "INCROYABLE! Ce coup critique vient de redéfinir le concept même de 'critique'!",
            "EXPLOSION DE PUISSANCE! Ce héros vient de transformer un sort niveau 1 en arme de destruction massive!",
            "COUP LÉGENDAIRE! Les probabilités de réussir ça étaient de 0.00001%... et pourtant!",
            "PUISSANCE MAXIMALE! Ce héros vient de prouver que 'niveau 1' est juste un nombre!",
            "EFFET DOMINO COSMIQUE! Ce critique va avoir des répercussions dans toutes les timelines!",
            "CHEF-D'ŒUVRE! Ce critique mérite d'être exposé dans un musée!",
            "DRAME ÉPIQUE! Ce critique a plus de rebondissements qu'une série TV!"
        ));
        
        // Phrases de sorts temporels
        phrases.put("sort_temporel", Arrays.asList(
            "MANIPULATION TEMPORELLE DÉTECTÉE! Ce héros vient de faire un pied de nez à Einstein!",
            "SUPERPOSITION ACTIVÉE! Nous assistons maintenant à 3 combats simultanés dans la même réalité!",
            "PARADOXE EN COURS! Si vous ressentez des vertiges existentiels, c'est parfaitement normal!",
            "FRAPPE MULTITEMPORELLE! Une attaque dans le passé, le présent ET le futur! Du jamais vu!",
            "INVERSION CAUSALE! L'effet vient de précéder sa propre cause! Mon cerveau fait des nœuds!",
            "DISTORSION SPATIO-TEMPORELLE! L'arène elle-même se plie aux volontés de ce héros!",
            "Selon mes calculs, ce sort utilise l'effet Casimir inversé pour manipuler les fluctuations du vide quantique!",
            "MAGIE PURE! Ce que nous voyons défie toute logique... et c'est MAGNIFIQUE!",
            "C'est techniquement impossible selon nos règles... mais c'est tellement cool qu'on va dire que c'est légal!",
            "MAÎTRISE ABSOLUE! Ce héros contrôle le temps comme un musicien contrôle sa partition!"
        ));
        
        // Phrases de fin de combat
        phrases.put("fin_combat", Arrays.asList(
            "VICTOIRE LÉGENDAIRE! Ce combat restera gravé dans les annales de l'arène interdimensionnelle!",
            "CONCLUSION PARFAITE! Combat terminé en 4.7 secondes réparties sur 3 dimensions! Nouveau record!",
            "Statistiques finales : 847% d'efficacité, 23 paradoxes résolus, et zéro loi physique respectée! Parfait!",
            "Et voilà comment on transforme un simple combat en épopée cosmique! Bravo à tous!",
            "Mission accomplie! L'impossible est devenu possible, et le possible est devenu légendaire!"
        ));
        
        return phrases;
    }
    
    private void initializeStats() {
        commentStats.put("totalComments", 0);
        commentStats.put("commentsByType", new HashMap<String, Integer>());
        commentStats.put("averageTimeBetweenComments", 0.0);
        commentStats.put("favoritePhrase", "");
        commentStats.put("enthusiasm", 100); // 0-100
    }
    
    public String getRandomPhrase(String category) {
        List<String> categoryPhrases = phrases.get(category);
        if (categoryPhrases == null || categoryPhrases.isEmpty()) {
            return signatureCatchphrase;
        }
        
        Random random = new Random();
        String selectedPhrase = categoryPhrases.get(random.nextInt(categoryPhrases.size()));
        
        // Update stats
        updateCommentStats(category, selectedPhrase);
        
        return selectedPhrase;
    }
    
    public String getContextualPhrase(String category, Map<String, Object> context) {
        // Pour l'instant, utilise la sélection aléatoire
        // TODO: Implémenter la logique contextuelle avancée
        return getRandomPhrase(category);
    }
    
    private void updateCommentStats(String category, String phrase) {
        // Increment total comments
        int total = (Integer) commentStats.get("totalComments");
        commentStats.put("totalComments", total + 1);
        
        // Update category stats
        @SuppressWarnings("unchecked")
        Map<String, Integer> byType = (Map<String, Integer>) commentStats.get("commentsByType");
        byType.put(category, byType.getOrDefault(category, 0) + 1);
        
        // Update timing
        long currentTime = System.currentTimeMillis();
        if (lastCommentTime > 0) {
            double timeDiff = (currentTime - lastCommentTime) / 1000.0;
            double currentAvg = (Double) commentStats.get("averageTimeBetweenComments");
            double newAvg = (currentAvg * (total - 1) + timeDiff) / total;
            commentStats.put("averageTimeBetweenComments", newAvg);
        }
        lastCommentTime = currentTime;
    }
    
    public boolean canComment(String category) {
        // Check cooldown
        Integer cooldown = phraseCooldowns.get(category);
        if (cooldown != null && cooldown > 0) {
            return false;
        }
        
        // Check if judge is active
        return active;
    }
    
    public void setCooldown(String category, int seconds) {
        phraseCooldowns.put(category, seconds);
    }
    
    public void updateCooldowns() {
        phraseCooldowns.replaceAll((k, v) -> Math.max(0, v - 1));
    }
    
    public Map<String, Object> getJudgeInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("id", id);
        info.put("name", name);
        info.put("title", title);
        info.put("class", characterClass);
        info.put("tier", tier);
        info.put("personality", personality);
        info.put("style", style);
        info.put("signatureCatchphrase", signatureCatchphrase);
        info.put("active", active);
        info.put("stats", commentStats);
        return info;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getCharacterClass() { return characterClass; }
    public void setCharacterClass(String characterClass) { this.characterClass = characterClass; }
    
    public int getTier() { return tier; }
    public void setTier(int tier) { this.tier = tier; }
    
    public Map<String, List<String>> getPhrases() { return phrases; }
    public void setPhrases(Map<String, List<String>> phrases) { this.phrases = phrases; }
    
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    
    public Map<String, Object> getCommentStats() { return commentStats; }
    public void setCommentStats(Map<String, Object> commentStats) { this.commentStats = commentStats; }
}