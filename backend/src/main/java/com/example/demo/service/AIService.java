package com.example.demo.service;

import com.example.demo.model.AIPlayer;
import com.example.demo.model.AIPlayer.AIDecision;
import com.example.demo.model.AIPlayer.AIGoal;
import com.example.demo.repository.AIPlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AIService {

    @Autowired
    private AIPlayerRepository aiPlayerRepository;

    // Political Advisor System
    public static class PoliticalAdvisor {
        private String id;
        private String name;
        private String role;
        private int opinion;
        private int influence;
        private String personality;
        private String avatar;

        public PoliticalAdvisor(String id, String name, String role, int opinion, int influence, String personality, String avatar) {
            this.id = id;
            this.name = name;
            this.role = role;
            this.opinion = opinion;
            this.influence = influence;
            this.personality = personality;
            this.avatar = avatar;
        }

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public int getOpinion() { return opinion; }
        public void setOpinion(int opinion) { this.opinion = opinion; }
        public int getInfluence() { return influence; }
        public void setInfluence(int influence) { this.influence = influence; }
        public String getPersonality() { return personality; }
        public void setPersonality(String personality) { this.personality = personality; }
        public String getAvatar() { return avatar; }
        public void setAvatar(String avatar) { this.avatar = avatar; }
    }

    public static class PoliticalEvent {
        private String id;
        private String type;
        private String title;
        private String description;
        private List<PoliticalChoice> choices;
        private String deadline;
        private String severity;
        private List<String> consequences;

        public PoliticalEvent(String id, String type, String title, String description, List<PoliticalChoice> choices, String deadline, String severity, List<String> consequences) {
            this.id = id;
            this.type = type;
            this.title = title;
            this.description = description;
            this.choices = choices;
            this.deadline = deadline;
            this.severity = severity;
            this.consequences = consequences;
        }

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public List<PoliticalChoice> getChoices() { return choices; }
        public void setChoices(List<PoliticalChoice> choices) { this.choices = choices; }
        public String getDeadline() { return deadline; }
        public void setDeadline(String deadline) { this.deadline = deadline; }
        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }
        public List<String> getConsequences() { return consequences; }
        public void setConsequences(List<String> consequences) { this.consequences = consequences; }
    }

    public static class PoliticalChoice {
        private String id;
        private String text;
        private Map<String, Object> consequences;
        private Map<String, String> advisorRecommendations;

        public PoliticalChoice(String id, String text, Map<String, Object> consequences, Map<String, String> advisorRecommendations) {
            this.id = id;
            this.text = text;
            this.consequences = consequences;
            this.advisorRecommendations = advisorRecommendations;
        }

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        public Map<String, Object> getConsequences() { return consequences; }
        public void setConsequences(Map<String, Object> consequences) { this.consequences = consequences; }
        public Map<String, String> getAdvisorRecommendations() { return advisorRecommendations; }
        public void setAdvisorRecommendations(Map<String, String> advisorRecommendations) { this.advisorRecommendations = advisorRecommendations; }
    }

    public static class AdvisorRecommendation {
        private String advisorId;
        private String advisorName;
        private String recommendation;
        private String reasoning;
        private int confidenceLevel;

        public AdvisorRecommendation(String advisorId, String advisorName, String recommendation, String reasoning, int confidenceLevel) {
            this.advisorId = advisorId;
            this.advisorName = advisorName;
            this.recommendation = recommendation;
            this.reasoning = reasoning;
            this.confidenceLevel = confidenceLevel;
        }

        // Getters and setters
        public String getAdvisorId() { return advisorId; }
        public void setAdvisorId(String advisorId) { this.advisorId = advisorId; }
        public String getAdvisorName() { return advisorName; }
        public void setAdvisorName(String advisorName) { this.advisorName = advisorName; }
        public String getRecommendation() { return recommendation; }
        public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
        public String getReasoning() { return reasoning; }
        public void setReasoning(String reasoning) { this.reasoning = reasoning; }
        public int getConfidenceLevel() { return confidenceLevel; }
        public void setConfidenceLevel(int confidenceLevel) { this.confidenceLevel = confidenceLevel; }
    }

    // The 4 specialized political advisors
    private static final List<PoliticalAdvisor> POLITICAL_ADVISORS = Arrays.asList(
        new PoliticalAdvisor("general_volkov", "General Volkov", "military", 75, 85, "aggressive", "🎖️"),
        new PoliticalAdvisor("dr_petrova", "Dr. Petrova", "economic", 60, 90, "cautious", "💼"),
        new PoliticalAdvisor("ambassador_kozlov", "Ambassador Kozlov", "diplomatic", 45, 70, "opportunistic", "🤝"),
        new PoliticalAdvisor("prof_ivanova", "Prof. Ivanova", "scientific", 80, 65, "idealistic", "🔬")
    );

    /**
     * Get all political advisors
     */
    public List<PoliticalAdvisor> getPoliticalAdvisors() {
        return new ArrayList<>(POLITICAL_ADVISORS);
    }

    /**
     * Generate AI recommendations for a political choice based on advisor personalities
     */
    public List<AdvisorRecommendation> generateAdvisorRecommendations(PoliticalEvent event, PoliticalChoice choice) {
        return POLITICAL_ADVISORS.stream().map(advisor -> {
            String recommendation = "neutral";
            String reasoning = "";
            int confidenceLevel = 50;

            // AI logic based on advisor personality and role
            switch (advisor.getPersonality()) {
                case "aggressive":
                    Map<String, Object> consequences = choice.getConsequences();
                    Integer reputation = (Integer) consequences.get("reputation");
                    if (reputation != null && reputation > 0 && "military".equals(advisor.getRole())) {
                        recommendation = "strongly_support";
                        reasoning = "This shows strength and decisiveness!";
                        confidenceLevel = 90;
                    } else if (reputation != null && reputation < -10) {
                        recommendation = "oppose";
                        reasoning = "This makes us look weak.";
                        confidenceLevel = 75;
                    }
                    break;

                case "cautious":
                    Map<String, Object> cons = choice.getConsequences();
                    Integer rep = (Integer) cons.get("reputation");
                    if (rep != null && Math.abs(rep) < 5) {
                        recommendation = "support";
                        reasoning = "A measured approach with minimal risk.";
                        confidenceLevel = 80;
                    } else {
                        recommendation = "oppose";
                        reasoning = "Too risky for uncertain gains.";
                        confidenceLevel = 85;
                    }
                    break;

                case "opportunistic":
                    Map<String, Object> conseq = choice.getConsequences();
                    @SuppressWarnings("unchecked")
                    Map<String, Integer> resources = (Map<String, Integer>) conseq.get("resources");
                    Integer goldGain = resources != null ? resources.get("gold") : 0;
                    if (goldGain != null && goldGain > 0) {
                        recommendation = "strongly_support";
                        reasoning = "Excellent economic opportunity!";
                        confidenceLevel = 95;
                    } else {
                        Integer rep2 = (Integer) conseq.get("reputation");
                        if (rep2 != null && rep2 > 10) {
                            recommendation = "support";
                            reasoning = "Good for future opportunities.";
                            confidenceLevel = 70;
                        }
                    }
                    break;

                case "idealistic":
                    if ("diplomatic".equals(event.getType())) {
                        recommendation = "support";
                        reasoning = "This aligns with our values.";
                        confidenceLevel = 85;
                    } else {
                        Map<String, Object> cons2 = choice.getConsequences();
                        Integer rep3 = (Integer) cons2.get("reputation");
                        if (rep3 != null && rep3 > 0) {
                            recommendation = "support";
                            reasoning = "This aligns with our values.";
                            confidenceLevel = 85;
                        } else if (rep3 != null && rep3 < -5) {
                            recommendation = "strongly_oppose";
                            reasoning = "This goes against our principles!";
                            confidenceLevel = 90;
                        }
                    }
                    break;
            }

            // Role-specific adjustments
            switch (advisor.getRole()) {
                case "military":
                    if ("military".equals(event.getType())) confidenceLevel += 20;
                    break;
                case "economic":
                    Map<String, Object> cons3 = choice.getConsequences();
                    @SuppressWarnings("unchecked")
                    Map<String, Integer> res = (Map<String, Integer>) cons3.get("resources");
                    if (res != null && res.get("gold") != null) confidenceLevel += 15;
                    break;
                case "diplomatic":
                    if ("diplomatic".equals(event.getType())) confidenceLevel += 20;
                    break;
                case "scientific":
                    if ("economic".equals(event.getType())) confidenceLevel += 25;
                    break;
            }

            return new AdvisorRecommendation(
                advisor.getId(),
                advisor.getName(),
                recommendation,
                reasoning,
                Math.min(100, confidenceLevel)
            );
        }).collect(Collectors.toList());
    }

    /**
     * Generate dynamic political events based on game state
     */
    public PoliticalEvent generateRandomPoliticalEvent(Map<String, Integer> currentReputation, int turn) {
        String[] eventTypes = {"crisis", "opportunity", "diplomatic", "economic", "military"};
        String[] severityLevels = {"low", "medium", "high", "critical"};
        
        String eventType = eventTypes[new Random().nextInt(eventTypes.length)];
        String severity = severityLevels[new Random().nextInt(severityLevels.length)];

        Map<String, Map<String, Object>> events = new HashMap<>();
        
        // Crisis event
        Map<String, Object> crisis = new HashMap<>();
        crisis.put("title", "Economic Crisis Looms");
        crisis.put("description", "Reports indicate a potential economic downturn. Your advisors await your decision on how to respond.");
        crisis.put("consequences", Arrays.asList("Reputation changes", "Resource impacts", "Future event triggers"));
        events.put("crisis", crisis);

        // Opportunity event
        Map<String, Object> opportunity = new HashMap<>();
        opportunity.put("title", "Trade Opportunity Emerges");
        opportunity.put("description", "A neighboring kingdom offers a lucrative trade agreement. However, it may affect our existing alliances.");
        opportunity.put("consequences", Arrays.asList("Economic benefits", "Diplomatic implications", "Advisor opinion changes"));
        events.put("opportunity", opportunity);

        // Diplomatic event
        Map<String, Object> diplomatic = new HashMap<>();
        diplomatic.put("title", "Diplomatic Incident");
        diplomatic.put("description", "An ambassador from a rival kingdom has been caught spying. How do you respond?");
        diplomatic.put("consequences", Arrays.asList("International reputation", "Military tensions", "Future diplomatic options"));
        events.put("diplomatic", diplomatic);

        // Economic event
        Map<String, Object> economic = new HashMap<>();
        economic.put("title", "Resource Discovery");
        economic.put("description", "Scouts have discovered a rich vein of magical crystals in the borderlands. How should we proceed?");
        economic.put("consequences", Arrays.asList("Resource gains", "Territorial control", "Environmental impact"));
        events.put("economic", economic);

        // Military event
        Map<String, Object> military = new HashMap<>();
        military.put("title", "Border Skirmish");
        military.put("description", "Enemy forces have been spotted near our borders. Your military advisors request instructions.");
        military.put("consequences", Arrays.asList("Military prestige", "Regional stability", "Resource allocation"));
        events.put("military", military);

        Map<String, Object> baseEvent = events.get(eventType);
        
        // Generate choices with consequences
        List<PoliticalChoice> choices = new ArrayList<>();
        
        // Choice 1: Aggressive action
        Map<String, Object> consequences1 = new HashMap<>();
        consequences1.put("reputation", "critical".equals(severity) ? 15 : 10);
        Map<String, Integer> resources1 = new HashMap<>();
        resources1.put("gold", -100);
        resources1.put("wood", -50);
        consequences1.put("resources", resources1);
        Map<String, Integer> advisorOpinions1 = new HashMap<>();
        advisorOpinions1.put("general_volkov", 20);
        advisorOpinions1.put("dr_petrova", -10);
        consequences1.put("advisorOpinions", advisorOpinions1);
        consequences1.put("futureEvents", Arrays.asList("military_response"));
        
        choices.add(new PoliticalChoice("choice_1_" + eventType, "Take aggressive action", consequences1, new HashMap<>()));

        // Choice 2: Diplomatic approach
        Map<String, Object> consequences2 = new HashMap<>();
        consequences2.put("reputation", 5);
        Map<String, Integer> resources2 = new HashMap<>();
        resources2.put("gold", 50);
        consequences2.put("resources", resources2);
        Map<String, Integer> advisorOpinions2 = new HashMap<>();
        advisorOpinions2.put("ambassador_kozlov", 15);
        advisorOpinions2.put("general_volkov", -5);
        consequences2.put("advisorOpinions", advisorOpinions2);
        consequences2.put("futureEvents", Arrays.asList("diplomatic_solution"));
        
        choices.add(new PoliticalChoice("choice_2_" + eventType, "Negotiate diplomatically", consequences2, new HashMap<>()));

        // Choice 3: Wait and observe
        Map<String, Object> consequences3 = new HashMap<>();
        consequences3.put("reputation", -2);
        consequences3.put("resources", new HashMap<String, Integer>());
        Map<String, Integer> advisorOpinions3 = new HashMap<>();
        advisorOpinions3.put("dr_petrova", 10);
        advisorOpinions3.put("prof_ivanova", 5);
        consequences3.put("advisorOpinions", advisorOpinions3);
        consequences3.put("futureEvents", Arrays.asList("delayed_response"));
        
        choices.add(new PoliticalChoice("choice_3_" + eventType, "Wait and observe", consequences3, new HashMap<>()));

        PoliticalEvent event = new PoliticalEvent(
            "event_" + turn + "_" + eventType,
            eventType,
            (String) baseEvent.get("title"),
            (String) baseEvent.get("description"),
            choices,
            LocalDateTime.now().plusMinutes(5).toString(), // 5 minutes deadline
            severity,
            (List<String>) baseEvent.get("consequences")
        );

        // Generate advisor recommendations for each choice
        for (PoliticalChoice choice : choices) {
            List<AdvisorRecommendation> recommendations = generateAdvisorRecommendations(event, choice);
            Map<String, String> advisorRecs = new HashMap<>();
            for (AdvisorRecommendation rec : recommendations) {
                advisorRecs.put(rec.getAdvisorId(), rec.getRecommendation());
            }
            choice.setAdvisorRecommendations(advisorRecs);
        }

        return event;
    }

    /**
     * Update advisor opinions based on player decisions
     */
    public List<PoliticalAdvisor> updateAdvisorOpinions(List<PoliticalAdvisor> currentAdvisors, PoliticalChoice choice) {
        @SuppressWarnings("unchecked")
        Map<String, Integer> opinionChanges = (Map<String, Integer>) choice.getConsequences().get("advisorOpinions");
        
        if (opinionChanges == null) {
            return currentAdvisors;
        }

        return currentAdvisors.stream().map(advisor -> {
            Integer opinionChange = opinionChanges.get(advisor.getId());
            if (opinionChange != null) {
                int newOpinion = Math.max(-100, Math.min(100, advisor.getOpinion() + opinionChange));
                advisor.setOpinion(newOpinion);
            }
            return advisor;
        }).collect(Collectors.toList());
    }

    /**
     * Calculate overall political stability based on advisor opinions
     */
    public Map<String, Object> calculatePoliticalStability(List<PoliticalAdvisor> advisors) {
        double avgOpinion = advisors.stream().mapToInt(PoliticalAdvisor::getOpinion).average().orElse(0);
        double stability = (avgOpinion + 100) / 2; // Convert -100/100 to 0-100
        
        String riskLevel = "low";
        if (stability < 25) riskLevel = "critical";
        else if (stability < 50) riskLevel = "high";
        else if (stability < 75) riskLevel = "medium";

        List<String> concerns = new ArrayList<>();
        for (PoliticalAdvisor advisor : advisors) {
            if (advisor.getOpinion() < -50) {
                concerns.add(advisor.getName() + " (" + advisor.getRole() + ") is very dissatisfied");
            } else if (advisor.getOpinion() < 0) {
                concerns.add(advisor.getName() + " (" + advisor.getRole() + ") has concerns");
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("stability", stability);
        result.put("riskLevel", riskLevel);
        result.put("concerns", concerns);
        return result;
    }

    // AI Player Management Methods

    /**
     * Get AI player by ID
     */
    public Optional<AIPlayer> getAIPlayer(String aiPlayerId) {
        return aiPlayerRepository.findByAiPlayerId(aiPlayerId);
    }

    /**
     * Get all AI players for a game
     */
    public List<AIPlayer> getAIPlayersForGame(String gameId) {
        return aiPlayerRepository.findByGameId(gameId);
    }

    /**
     * Create a new AI player
     */
    public AIPlayer createAIPlayer(String gameId, String playerName, String difficultyLevel, String aiPersonality, String faction, Integer positionX, Integer positionY) {
        String aiPlayerId = "ai_" + gameId + "_" + System.currentTimeMillis();
        AIPlayer aiPlayer = new AIPlayer(aiPlayerId, gameId, playerName, difficultyLevel, aiPersonality, faction, positionX, positionY);
        return aiPlayerRepository.save(aiPlayer);
    }

    /**
     * Make AI decision for a player
     */
    public AIDecision makeAIDecision(String aiPlayerId, Map<String, Object> gameState) {
        Optional<AIPlayer> aiPlayerOpt = aiPlayerRepository.findByAiPlayerId(aiPlayerId);
        if (!aiPlayerOpt.isPresent()) {
            return null;
        }

        AIPlayer aiPlayer = aiPlayerOpt.get();
        
        // Simple AI decision logic based on personality
        String decisionType = determineDecisionType(aiPlayer, gameState);
        String decisionRationale = generateDecisionRationale(aiPlayer, decisionType, gameState);
        String decisionParameters = generateDecisionParameters(aiPlayer, decisionType, gameState);

        AIDecision decision = new AIDecision(
            "decision_" + System.currentTimeMillis(),
            decisionType,
            decisionRationale,
            decisionParameters
        );

        // Add decision to AI player's history
        aiPlayer.addDecision(decision);
        aiPlayerRepository.save(aiPlayer);

        return decision;
    }

    private String determineDecisionType(AIPlayer aiPlayer, Map<String, Object> gameState) {
        // Simple decision logic based on AI personality
        switch (aiPlayer.getAiPersonality()) {
            case "aggressive":
                return Math.random() < 0.6 ? "attack" : "move";
            case "defensive":
                return Math.random() < 0.4 ? "build" : "move";
            case "economic":
                return Math.random() < 0.5 ? "build" : "collect";
            case "balanced":
            default:
                String[] options = {"move", "attack", "build", "collect"};
                return options[new Random().nextInt(options.length)];
        }
    }

    private String generateDecisionRationale(AIPlayer aiPlayer, String decisionType, Map<String, Object> gameState) {
        switch (decisionType) {
            case "attack":
                return "Aggressive strategy: Attacking to gain territory";
            case "move":
                return "Exploring new areas for resources";
            case "build":
                return "Strengthening defenses and economy";
            case "collect":
                return "Gathering resources for future expansion";
            default:
                return "Standard AI decision";
        }
    }

    private String generateDecisionParameters(AIPlayer aiPlayer, String decisionType, Map<String, Object> gameState) {
        // Return JSON string with decision parameters
        return "{\"type\":\"" + decisionType + "\",\"confidence\":0.8,\"priority\":\"medium\"}";
    }

    /**
     * Update AI player statistics
     */
    public void updateAIPlayerStats(String aiPlayerId, String outcome) {
        Optional<AIPlayer> aiPlayerOpt = aiPlayerRepository.findByAiPlayerId(aiPlayerId);
        if (aiPlayerOpt.isPresent()) {
            AIPlayer aiPlayer = aiPlayerOpt.get();
            if ("success".equals(outcome)) {
                aiPlayer.recordSuccess();
            } else if ("failure".equals(outcome)) {
                aiPlayer.recordFailure();
            }
            aiPlayerRepository.save(aiPlayer);
        }
    }
} 