package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.ComplexAmplitude;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.GameTile;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour gérer les calculs d'interférence quantique entre PsiStates.
 * Implémente la vraie mécanique quantique avec amplitudes complexes.
 */
@Service
public class QuantumInterferenceService {
    
    /**
     * Résultat d'une analyse d'interférence
     */
    public static class InterferenceResult {
        private final ComplexAmplitude combinedAmplitude;
        private final double combinedProbability;
        private final InterferenceType type;
        private final double contrast;
        private final List<PsiState> involvedStates;
        
        public InterferenceResult(ComplexAmplitude combinedAmplitude, 
                                InterferenceType type, 
                                double contrast, 
                                List<PsiState> involvedStates) {
            this.combinedAmplitude = combinedAmplitude;
            this.combinedProbability = combinedAmplitude.getProbability();
            this.type = type;
            this.contrast = contrast;
            this.involvedStates = involvedStates;
        }
        
        public ComplexAmplitude getCombinedAmplitude() { return combinedAmplitude; }
        public double getCombinedProbability() { return combinedProbability; }
        public InterferenceType getType() { return type; }
        public double getContrast() { return contrast; }
        public List<PsiState> getInvolvedStates() { return involvedStates; }
        
        @Override
        public String toString() {
            return String.format("InterferenceResult{amplitude=%s, probability=%.4f, type=%s, contrast=%.4f, states=%d}", 
                               combinedAmplitude, combinedProbability, type, contrast, involvedStates.size());
        }
    }
    
    public enum InterferenceType {
        CONSTRUCTIVE,    // Interférence constructive (amplification)
        DESTRUCTIVE,     // Interférence destructive (annulation)
        NEUTRAL,         // Interférence neutre
        COMPLEX          // Interférence complexe (ni purement constructive ni destructive)
    }
    
    /**
     * Calcule l'interférence entre toutes les PsiStates actives à une position donnée
     */
    public InterferenceResult calculateInterferenceAtPosition(Game game, int x, int y) {
        List<PsiState> psiStatesAtPosition = game.getPsiStatesAtPosition(x, y).stream()
                .filter(psi -> psi.isActive() && psi.isUsingComplexAmplitude())
                .collect(Collectors.toList());
        
        if (psiStatesAtPosition.isEmpty()) {
            return new InterferenceResult(
                new ComplexAmplitude(0.0, 0.0), 
                InterferenceType.NEUTRAL, 
                0.0, 
                Collections.emptyList()
            );
        }
        
        if (psiStatesAtPosition.size() == 1) {
            PsiState singleState = psiStatesAtPosition.get(0);
            return new InterferenceResult(
                singleState.getComplexAmplitude(),
                InterferenceType.NEUTRAL,
                0.0,
                Collections.singletonList(singleState)
            );
        }
        
        return calculateInterference(psiStatesAtPosition);
    }
    
    /**
     * Calcule l'interférence entre une liste de PsiStates
     */
    public InterferenceResult calculateInterference(List<PsiState> psiStates) {
        if (psiStates.isEmpty()) {
            return new InterferenceResult(
                new ComplexAmplitude(0.0, 0.0), 
                InterferenceType.NEUTRAL, 
                0.0, 
                Collections.emptyList()
            );
        }
        
        if (psiStates.size() == 1) {
            PsiState singleState = psiStates.get(0);
            return new InterferenceResult(
                singleState.getComplexAmplitude(),
                InterferenceType.NEUTRAL,
                0.0,
                Collections.singletonList(singleState)
            );
        }
        
        // Calcul de l'amplitude combinée par superposition
        ComplexAmplitude combinedAmplitude = psiStates.stream()
                .map(PsiState::getComplexAmplitude)
                .reduce(new ComplexAmplitude(0.0, 0.0), ComplexAmplitude::add);
        
        // Calcul des probabilités individuelles
        double sumIndividualProbabilities = psiStates.stream()
                .mapToDouble(psi -> psi.getComplexAmplitude().getProbability())
                .sum();
        
        // Calcul du contraste d'interférence
        double combinedProbability = combinedAmplitude.getProbability();
        double contrast = calculateInterferenceContrast(combinedProbability, sumIndividualProbabilities);
        
        // Détermination du type d'interférence
        InterferenceType type = determineInterferenceType(combinedProbability, sumIndividualProbabilities);
        
        return new InterferenceResult(combinedAmplitude, type, contrast, psiStates);
    }
    
    /**
     * Calcule l'interférence constructive optimale entre deux PsiStates
     */
    public InterferenceResult calculateConstructiveInterference(PsiState psi1, PsiState psi2) {
        if (!psi1.isUsingComplexAmplitude() || !psi2.isUsingComplexAmplitude()) {
            throw new IllegalArgumentException("Les deux PsiStates doivent utiliser les amplitudes complexes");
        }
        
        ComplexAmplitude amp1 = psi1.getComplexAmplitude();
        ComplexAmplitude amp2 = psi2.getComplexAmplitude();
        
        ComplexAmplitude constructiveAmplitude = ComplexAmplitude.constructiveInterference(amp1, amp2);
        
        double contrast = ComplexAmplitude.getInterferenceContrast(amp1, amp2);
        
        return new InterferenceResult(
            constructiveAmplitude,
            InterferenceType.CONSTRUCTIVE,
            contrast,
            Arrays.asList(psi1, psi2)
        );
    }
    
    /**
     * Calcule l'interférence destructive optimale entre deux PsiStates
     */
    public InterferenceResult calculateDestructiveInterference(PsiState psi1, PsiState psi2) {
        if (!psi1.isUsingComplexAmplitude() || !psi2.isUsingComplexAmplitude()) {
            throw new IllegalArgumentException("Les deux PsiStates doivent utiliser les amplitudes complexes");
        }
        
        ComplexAmplitude amp1 = psi1.getComplexAmplitude();
        ComplexAmplitude amp2 = psi2.getComplexAmplitude();
        
        ComplexAmplitude destructiveAmplitude = ComplexAmplitude.destructiveInterference(amp1, amp2);
        
        double contrast = ComplexAmplitude.getInterferenceContrast(amp1, amp2);
        
        return new InterferenceResult(
            destructiveAmplitude,
            InterferenceType.DESTRUCTIVE,
            contrast,
            Arrays.asList(psi1, psi2)
        );
    }
    
    /**
     * Optimise les phases des PsiStates pour maximiser l'interférence constructive
     */
    public void optimizeForConstructiveInterference(List<PsiState> psiStates) {
        if (psiStates.size() < 2) return;
        
        // Prendre le premier état comme référence
        PsiState reference = psiStates.get(0);
        double referencePhase = reference.getComplexAmplitude().getPhase();
        
        // Aligner tous les autres états sur la même phase
        for (int i = 1; i < psiStates.size(); i++) {
            PsiState state = psiStates.get(i);
            ComplexAmplitude amp = state.getComplexAmplitude();
            double magnitude = amp.getMagnitude();
            
            // Créer une nouvelle amplitude avec la phase de référence
            ComplexAmplitude alignedAmplitude = ComplexAmplitude.fromPolar(magnitude, referencePhase);
            state.setComplexAmplitude(alignedAmplitude);
        }
    }
    
    /**
     * Optimise les phases des PsiStates pour maximiser l'interférence destructive
     */
    public void optimizeForDestructiveInterference(List<PsiState> psiStates) {
        if (psiStates.size() < 2) return;
        
        // Prendre le premier état comme référence
        PsiState reference = psiStates.get(0);
        double referencePhase = reference.getComplexAmplitude().getPhase();
        
        // Aligner tous les autres états sur la phase opposée
        for (int i = 1; i < psiStates.size(); i++) {
            PsiState state = psiStates.get(i);
            ComplexAmplitude amp = state.getComplexAmplitude();
            double magnitude = amp.getMagnitude();
            
            // Créer une nouvelle amplitude avec la phase opposée
            ComplexAmplitude opposedAmplitude = ComplexAmplitude.fromPolar(magnitude, referencePhase + Math.PI);
            state.setComplexAmplitude(opposedAmplitude);
        }
    }
    
    /**
     * Calcule les effets d'interférence sur les actions du jeu
     */
    public Map<String, Object> calculateInterferenceEffects(Game game, InterferenceResult interference) {
        Map<String, Object> effects = new HashMap<>();
        
        double probability = interference.getCombinedProbability();
        InterferenceType type = interference.getType();
        double contrast = interference.getContrast();
        
        // Calcul des modificateurs basés sur l'interférence
        double successModifier = calculateSuccessModifier(probability, type);
        double damageModifier = calculateDamageModifier(contrast, type);
        double energyModifier = calculateEnergyModifier(probability, type);
        
        effects.put("successModifier", successModifier);
        effects.put("damageModifier", damageModifier);
        effects.put("energyModifier", energyModifier);
        effects.put("interferenceType", type.toString());
        effects.put("combinedProbability", probability);
        effects.put("contrast", contrast);
        
        // Effets spéciaux selon le type d'interférence
        switch (type) {
            case CONSTRUCTIVE:
                effects.put("specialEffect", "AMPLIFICATION");
                effects.put("description", "Interférence constructive: effets amplifiés");
                break;
            case DESTRUCTIVE:
                effects.put("specialEffect", "CANCELLATION");
                effects.put("description", "Interférence destructive: effets annulés");
                break;
            case COMPLEX:
                effects.put("specialEffect", "QUANTUM_UNCERTAINTY");
                effects.put("description", "Interférence complexe: effets imprévisibles");
                break;
            default:
                effects.put("specialEffect", "NONE");
                effects.put("description", "Pas d'interférence significative");
        }
        
        return effects;
    }
    
    /**
     * Trouve les PsiStates qui peuvent interférer avec une nouvelle PsiState
     */
    public List<PsiState> findInterferingStates(Game game, PsiState newState) {
        if (!newState.isUsingComplexAmplitude()) {
            return Collections.emptyList();
        }
        
        Integer targetX = newState.getTargetX();
        Integer targetY = newState.getTargetY();
        
        if (targetX == null || targetY == null) {
            return Collections.emptyList();
        }
        
        return game.getActivePsiStates().stream()
                .filter(psi -> psi.isUsingComplexAmplitude())
                .filter(psi -> psi.isAtPosition(targetX, targetY))
                .filter(psi -> !psi.equals(newState))
                .collect(Collectors.toList());
    }
    
    /**
     * Vérifie si deux PsiStates peuvent interférer
     */
    public boolean canInterfere(PsiState psi1, PsiState psi2) {
        if (!psi1.isUsingComplexAmplitude() || !psi2.isUsingComplexAmplitude()) {
            return false;
        }
        
        if (!psi1.isActive() || !psi2.isActive()) {
            return false;
        }
        
        // Vérifier s'ils sont à la même position
        Integer x1 = psi1.getTargetX(), y1 = psi1.getTargetY();
        Integer x2 = psi2.getTargetX(), y2 = psi2.getTargetY();
        
        return x1 != null && y1 != null && x2 != null && y2 != null &&
               x1.equals(x2) && y1.equals(y2);
    }
    
    /**
     * Simule l'évolution temporelle des interférences
     */
    public List<InterferenceResult> simulateTemporalEvolution(List<PsiState> psiStates, int steps) {
        List<InterferenceResult> evolution = new ArrayList<>();
        
        for (int step = 0; step < steps; step++) {
            // Calculer l'interférence à ce pas de temps
            InterferenceResult result = calculateInterference(psiStates);
            evolution.add(result);
            
            // Faire évoluer les phases (rotation quantique)
            for (PsiState psi : psiStates) {
                if (psi.isUsingComplexAmplitude()) {
                    ComplexAmplitude amp = psi.getComplexAmplitude();
                    double magnitude = amp.getMagnitude();
                    double phase = amp.getPhase() + 0.1; // Rotation de 0.1 radians
                    
                    ComplexAmplitude evolvedAmplitude = ComplexAmplitude.fromPolar(magnitude, phase);
                    psi.setComplexAmplitude(evolvedAmplitude);
                }
            }
        }
        
        return evolution;
    }
    
    // Méthodes privées pour les calculs internes
    
    private double calculateInterferenceContrast(double combinedProbability, double sumIndividualProbabilities) {
        if (sumIndividualProbabilities == 0) return 0.0;
        
        double expectedProbability = sumIndividualProbabilities;
        return Math.abs(combinedProbability - expectedProbability) / expectedProbability;
    }
    
    private InterferenceType determineInterferenceType(double combinedProbability, double sumIndividualProbabilities) {
        if (sumIndividualProbabilities == 0) return InterferenceType.NEUTRAL;
        
        double ratio = combinedProbability / sumIndividualProbabilities;
        
        if (ratio > 1.1) {
            return InterferenceType.CONSTRUCTIVE;
        } else if (ratio < 0.9) {
            return InterferenceType.DESTRUCTIVE;
        } else if (Math.abs(ratio - 1.0) > 0.05) {
            return InterferenceType.COMPLEX;
        } else {
            return InterferenceType.NEUTRAL;
        }
    }
    
    private double calculateSuccessModifier(double probability, InterferenceType type) {
        switch (type) {
            case CONSTRUCTIVE:
                return Math.min(2.0, 1.0 + probability);
            case DESTRUCTIVE:
                return Math.max(0.1, probability);
            case COMPLEX:
                return 0.5 + 0.5 * probability;
            default:
                return 1.0;
        }
    }
    
    private double calculateDamageModifier(double contrast, InterferenceType type) {
        switch (type) {
            case CONSTRUCTIVE:
                return 1.0 + contrast;
            case DESTRUCTIVE:
                return Math.max(0.1, 1.0 - contrast);
            case COMPLEX:
                return 1.0 + 0.5 * contrast * (Math.random() - 0.5);
            default:
                return 1.0;
        }
    }
    
    private double calculateEnergyModifier(double probability, InterferenceType type) {
        switch (type) {
            case CONSTRUCTIVE:
                return Math.max(0.5, 1.0 - 0.3 * probability); // Moins d'énergie nécessaire
            case DESTRUCTIVE:
                return 1.0 + 0.5 * (1.0 - probability); // Plus d'énergie nécessaire
            case COMPLEX:
                return 1.0 + 0.2 * Math.random(); // Énergie variable
            default:
                return 1.0;
        }
    }
} 