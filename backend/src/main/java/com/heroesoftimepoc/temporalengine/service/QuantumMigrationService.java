package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.ComplexAmplitude;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour gérer la migration progressive des probabilités classiques 
 * vers les amplitudes complexes.
 */
@Service
@Transactional
public class QuantumMigrationService {
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private GameRepository gameRepository;
    
    /**
     * Résultat d'une migration
     */
    public static class MigrationResult {
        private final int migratedStates;
        private final int skippedStates;
        private final int errors;
        private final List<String> messages;
        
        public MigrationResult(int migratedStates, int skippedStates, int errors, List<String> messages) {
            this.migratedStates = migratedStates;
            this.skippedStates = skippedStates;
            this.errors = errors;
            this.messages = messages;
        }
        
        public int getMigratedStates() { return migratedStates; }
        public int getSkippedStates() { return skippedStates; }
        public int getErrors() { return errors; }
        public List<String> getMessages() { return messages; }
        
        public boolean isSuccess() { return errors == 0; }
        
        @Override
        public String toString() {
            return String.format("MigrationResult{migrated=%d, skipped=%d, errors=%d}", 
                               migratedStates, skippedStates, errors);
        }
    }
    
    /**
     * Migrate tous les PsiStates d'un jeu vers les amplitudes complexes
     */
    public MigrationResult migrateGameToComplexAmplitudes(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(
            () -> new IllegalArgumentException("Game not found: " + gameId)
        );
        
        List<PsiState> psiStates = game.getPsiStates();
        return migratePsiStatesToComplexAmplitudes(psiStates);
    }
    
    /**
     * Migrate une liste de PsiStates vers les amplitudes complexes
     */
    public MigrationResult migratePsiStatesToComplexAmplitudes(List<PsiState> psiStates) {
        int migratedCount = 0;
        int skippedCount = 0;
        int errorCount = 0;
        List<String> messages = new ArrayList<>();
        
        for (PsiState psiState : psiStates) {
            try {
                if (psiState.isUsingComplexAmplitude()) {
                    messages.add("PsiState " + psiState.getPsiId() + " déjà en mode complexe");
                    skippedCount++;
                    continue;
                }
                
                // Conversion de la probabilité classique vers amplitude complexe
                Double probability = psiState.getProbability();
                if (probability == null) {
                    probability = 1.0;
                }
                
                ComplexAmplitude amplitude = ComplexAmplitude.fromProbability(probability);
                psiState.setComplexAmplitude(amplitude);
                psiState.setUseComplexAmplitude(true);
                
                psiStateRepository.save(psiState);
                
                messages.add("PsiState " + psiState.getPsiId() + " migré: P=" + probability + " → ψ=" + amplitude);
                migratedCount++;
                
            } catch (Exception e) {
                messages.add("Erreur lors de la migration de " + psiState.getPsiId() + ": " + e.getMessage());
                errorCount++;
            }
        }
        
        return new MigrationResult(migratedCount, skippedCount, errorCount, messages);
    }
    
    /**
     * Revient aux probabilités classiques pour tous les PsiStates d'un jeu
     */
    public MigrationResult migrateGameToClassicProbabilities(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(
            () -> new IllegalArgumentException("Game not found: " + gameId)
        );
        
        List<PsiState> psiStates = game.getPsiStates();
        return migratePsiStatesToClassicProbabilities(psiStates);
    }
    
    /**
     * Revient aux probabilités classiques pour une liste de PsiStates
     */
    public MigrationResult migratePsiStatesToClassicProbabilities(List<PsiState> psiStates) {
        int migratedCount = 0;
        int skippedCount = 0;
        int errorCount = 0;
        List<String> messages = new ArrayList<>();
        
        for (PsiState psiState : psiStates) {
            try {
                if (!psiState.isUsingComplexAmplitude()) {
                    messages.add("PsiState " + psiState.getPsiId() + " déjà en mode classique");
                    skippedCount++;
                    continue;
                }
                
                // Conversion de l'amplitude complexe vers probabilité classique
                ComplexAmplitude amplitude = psiState.getComplexAmplitude();
                double probability = amplitude.getProbability();
                
                psiState.setProbability(probability);
                psiState.setUseComplexAmplitude(false);
                
                psiStateRepository.save(psiState);
                
                messages.add("PsiState " + psiState.getPsiId() + " migré: ψ=" + amplitude + " → P=" + probability);
                migratedCount++;
                
            } catch (Exception e) {
                messages.add("Erreur lors de la migration de " + psiState.getPsiId() + ": " + e.getMessage());
                errorCount++;
            }
        }
        
        return new MigrationResult(migratedCount, skippedCount, errorCount, messages);
    }
    
    /**
     * Migrate un PsiState spécifique vers les amplitudes complexes
     */
    public boolean migratePsiStateToComplexAmplitude(String psiId, Double realPart, Double imaginaryPart) {
        Optional<PsiState> psiStateOpt = psiStateRepository.findByPsiId(psiId);
        if (!psiStateOpt.isPresent()) {
            return false;
        }
        
        PsiState psiState = psiStateOpt.get();
        
        ComplexAmplitude amplitude = new ComplexAmplitude(
            realPart != null ? realPart : 1.0,
            imaginaryPart != null ? imaginaryPart : 0.0
        );
        
        psiState.setComplexAmplitude(amplitude);
        psiState.setUseComplexAmplitude(true);
        
        psiStateRepository.save(psiState);
        return true;
    }
    
    /**
     * Migrate un PsiState spécifique avec magnitude et phase
     */
    public boolean migratePsiStateToComplexAmplitudePolar(String psiId, Double magnitude, Double phase) {
        Optional<PsiState> psiStateOpt = psiStateRepository.findByPsiId(psiId);
        if (!psiStateOpt.isPresent()) {
            return false;
        }
        
        PsiState psiState = psiStateOpt.get();
        
        ComplexAmplitude amplitude = ComplexAmplitude.fromPolar(
            magnitude != null ? magnitude : 1.0,
            phase != null ? phase : 0.0
        );
        
        psiState.setComplexAmplitude(amplitude);
        psiState.setUseComplexAmplitude(true);
        
        psiStateRepository.save(psiState);
        return true;
    }
    
    /**
     * Analyse la compatibilité d'un jeu avec les amplitudes complexes
     */
    public Map<String, Object> analyzeGameCompatibility(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(
            () -> new IllegalArgumentException("Game not found: " + gameId)
        );
        
        List<PsiState> psiStates = game.getPsiStates();
        
        int totalStates = psiStates.size();
        int complexStates = (int) psiStates.stream()
                .filter(PsiState::isUsingComplexAmplitude)
                .count();
        int classicStates = totalStates - complexStates;
        
        Map<String, Object> analysis = new HashMap<>();
        analysis.put("totalStates", totalStates);
        analysis.put("complexStates", complexStates);
        analysis.put("classicStates", classicStates);
        analysis.put("complexPercentage", totalStates > 0 ? (double) complexStates / totalStates * 100 : 0.0);
        analysis.put("canMigrateToComplex", classicStates > 0);
        analysis.put("canMigrateToClassic", complexStates > 0);
        
        // Analyse des interférences potentielles
        List<String> interferenceOpportunities = findInterferenceOpportunities(psiStates);
        analysis.put("interferenceOpportunities", interferenceOpportunities);
        
        return analysis;
    }
    
    /**
     * Trouve les opportunités d'interférence dans les PsiStates
     */
    private List<String> findInterferenceOpportunities(List<PsiState> psiStates) {
        List<String> opportunities = new ArrayList<>();
        
        Map<String, List<PsiState>> statesByPosition = psiStates.stream()
                .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
                .collect(Collectors.groupingBy(psi -> psi.getTargetX() + "," + psi.getTargetY()));
        
        for (Map.Entry<String, List<PsiState>> entry : statesByPosition.entrySet()) {
            List<PsiState> statesAtPosition = entry.getValue();
            if (statesAtPosition.size() > 1) {
                String position = entry.getKey();
                int complexStates = (int) statesAtPosition.stream()
                        .filter(PsiState::isUsingComplexAmplitude)
                        .count();
                int classicStates = statesAtPosition.size() - complexStates;
                
                if (complexStates > 1) {
                    opportunities.add("Position " + position + ": " + complexStates + " PsiStates complexes peuvent interférer");
                }
                if (classicStates > 0 && complexStates > 0) {
                    opportunities.add("Position " + position + ": " + classicStates + " PsiStates classiques peuvent être migrés pour l'interférence");
                }
            }
        }
        
        return opportunities;
    }
    
    /**
     * Migrate automatiquement vers le mode optimal pour chaque position
     */
    public MigrationResult autoMigrateForOptimalInterference(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(
            () -> new IllegalArgumentException("Game not found: " + gameId)
        );
        
        List<PsiState> psiStates = game.getPsiStates();
        
        // Grouper par position
        Map<String, List<PsiState>> statesByPosition = psiStates.stream()
                .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
                .collect(Collectors.groupingBy(psi -> psi.getTargetX() + "," + psi.getTargetY()));
        
        List<PsiState> toMigrate = new ArrayList<>();
        
        for (Map.Entry<String, List<PsiState>> entry : statesByPosition.entrySet()) {
            List<PsiState> statesAtPosition = entry.getValue();
            if (statesAtPosition.size() > 1) {
                // S'il y a plusieurs PsiStates à la même position, migrer vers complexe
                statesAtPosition.stream()
                        .filter(psi -> !psi.isUsingComplexAmplitude())
                        .forEach(toMigrate::add);
            }
        }
        
        return migratePsiStatesToComplexAmplitudes(toMigrate);
    }
    
    /**
     * Génère un rapport de migration détaillé
     */
    public Map<String, Object> generateMigrationReport(Long gameId) {
        Map<String, Object> report = new HashMap<>();
        
        // Analyse de compatibilité
        Map<String, Object> compatibility = analyzeGameCompatibility(gameId);
        report.put("compatibility", compatibility);
        
        // Recommandations
        List<String> recommendations = new ArrayList<>();
        
        int classicStates = (Integer) compatibility.get("classicStates");
        int complexStates = (Integer) compatibility.get("complexStates");
        List<String> opportunities = (List<String>) compatibility.get("interferenceOpportunities");
        
        if (classicStates > 0 && !opportunities.isEmpty()) {
            recommendations.add("Migrer vers les amplitudes complexes pour exploiter les interférences");
        }
        
        if (complexStates > 0 && opportunities.isEmpty()) {
            recommendations.add("Considérer le retour aux probabilités classiques pour simplifier");
        }
        
        if (opportunities.size() > 3) {
            recommendations.add("Excellent candidat pour la mécanique quantique avancée");
        }
        
        report.put("recommendations", recommendations);
        
        // Estimation des bénéfices
        Map<String, Object> benefits = new HashMap<>();
        benefits.put("performanceGain", opportunities.size() * 0.15); // 15% par opportunité
        benefits.put("strategicDepth", opportunities.size() > 2 ? "High" : "Medium");
        benefits.put("complexityIncrease", complexStates > 0 ? "Medium" : "Low");
        
        report.put("estimatedBenefits", benefits);
        
        return report;
    }
    
    /**
     * Teste la migration sans l'appliquer
     */
    public MigrationResult testMigration(Long gameId, boolean toComplex) {
        Game game = gameRepository.findById(gameId).orElseThrow(
            () -> new IllegalArgumentException("Game not found: " + gameId)
        );
        
        List<PsiState> psiStates = game.getPsiStates();
        
        // Simulation sans sauvegarde
        int candidateCount = 0;
        int incompatibleCount = 0;
        List<String> messages = new ArrayList<>();
        
        for (PsiState psiState : psiStates) {
            if (toComplex) {
                if (!psiState.isUsingComplexAmplitude()) {
                    candidateCount++;
                    messages.add("PsiState " + psiState.getPsiId() + " peut être migré vers complexe");
                } else {
                    incompatibleCount++;
                }
            } else {
                if (psiState.isUsingComplexAmplitude()) {
                    candidateCount++;
                    messages.add("PsiState " + psiState.getPsiId() + " peut être migré vers classique");
                } else {
                    incompatibleCount++;
                }
            }
        }
        
        return new MigrationResult(candidateCount, incompatibleCount, 0, messages);
    }
} 