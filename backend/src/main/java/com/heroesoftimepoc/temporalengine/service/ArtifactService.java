package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Artifact;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.GameTile;
import com.heroesoftimepoc.temporalengine.repository.ArtifactRepository;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour la gestion des artefacts temporels
 */
@Service
@Transactional
public class ArtifactService {
    
    @Autowired
    private ArtifactRepository artifactRepository;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    /**
     * Créer un artefact temporel
     */
    public Artifact createArtifact(Long gameId, String ownerId, Artifact.ArtifactType type, int x, int y) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        
        String artifactId = generateArtifactId(type);
        String name = generateArtifactName(type);
        
        Artifact artifact = new Artifact(artifactId, name, type);
        artifact.setGame(game);
        artifact.setOwnerId(ownerId);
        artifact.placeAt(x, y);
        
        // Configurer les propriétés selon le type
        configureArtifactProperties(artifact, type);
        
        return artifactRepository.save(artifact);
    }
    
    /**
     * Activer un artefact
     */
    public boolean activateArtifact(String artifactId, String activatorId) {
        Optional<Artifact> artifactOpt = artifactRepository.findByArtifactId(artifactId);
        if (!artifactOpt.isPresent()) return false;
        
        Artifact artifact = artifactOpt.get();
        
        // Vérifier les permissions et prérequis
        if (!canActivateArtifact(artifact, activatorId)) {
            return false;
        }
        
        // Activer l'artefact
        if (artifact.activate()) {
            // Appliquer les effets spéciaux
            applyArtifactEffects(artifact);
            artifactRepository.save(artifact);
            return true;
        }
        
        return false;
    }
    
    /**
     * Désactiver un artefact
     */
    public void deactivateArtifact(String artifactId) {
        Optional<Artifact> artifactOpt = artifactRepository.findByArtifactId(artifactId);
        if (artifactOpt.isPresent()) {
            Artifact artifact = artifactOpt.get();
            
            // Retirer les effets
            removeArtifactEffects(artifact);
            
            // Désactiver
            artifact.deactivate();
            artifactRepository.save(artifact);
        }
    }
    
    /**
     * Traiter tous les artefacts actifs (appelé à chaque tour)
     */
    public void processActiveArtifacts() {
        List<Artifact> activeArtifacts = artifactRepository.findActiveArtifacts();
        
        for (Artifact artifact : activeArtifacts) {
            // Traiter le tour
            artifact.processTurn();
            
            // Si l'artefact s'épuise, retirer ses effets
            if (artifact.getStatus() == Artifact.ArtifactStatus.EXHAUSTED) {
                removeArtifactEffects(artifact);
            }
            
            artifactRepository.save(artifact);
        }
    }
    
    /**
     * Appliquer les effets d'un artefact
     */
    private void applyArtifactEffects(Artifact artifact) {
        switch (artifact.getType()) {
            case VEIL:
                applyVeilEffect(artifact);
                break;
            case ANCHOR_TOWER:
                applyAnchorTowerEffect(artifact);
                break;
            case WIGNER_EYE:
                applyWignerEyeEffect(artifact);
                break;
            case TEMPORAL_SWORD:
                applyTemporalSwordEffect(artifact);
                break;
            case CHRONOS_SHIELD:
                applyChronosShieldEffect(artifact);
                break;
            case QUANTUM_MIRROR:
                applyQuantumMirrorEffect(artifact);
                break;
            case TEMPORAL_COMPASS:
                applyTemporalCompassEffect(artifact);
                break;
            case CAUSAL_DISRUPTOR:
                applyCausalDisruptorEffect(artifact);
                break;
        }
    }
    
    /**
     * Retirer les effets d'un artefact
     */
    private void removeArtifactEffects(Artifact artifact) {
        switch (artifact.getType()) {
            case VEIL:
                removeVeilEffect(artifact);
                break;
            case ANCHOR_TOWER:
                removeAnchorTowerEffect(artifact);
                break;
            case WIGNER_EYE:
                removeWignerEyeEffect(artifact);
                break;
            case TEMPORAL_SWORD:
                removeTemporalSwordEffect(artifact);
                break;
            case CHRONOS_SHIELD:
                removeChronosShieldEffect(artifact);
                break;
            case QUANTUM_MIRROR:
                removeQuantumMirrorEffect(artifact);
                break;
            case TEMPORAL_COMPASS:
                removeTemporalCompassEffect(artifact);
                break;
            case CAUSAL_DISRUPTOR:
                removeCausalDisruptorEffect(artifact);
                break;
        }
    }
    
    // ==================================
    // EFFETS SPÉCIFIQUES DES ARTEFACTS
    // ==================================
    
    /**
     * Appliquer l'effet du Veil (marche fantôme)
     */
    private void applyVeilEffect(Artifact artifact) {
        // Permettre au propriétaire de se déplacer sans déclencher d'observations
        Hero owner = heroRepository.findByName(artifact.getOwnerId()).orElse(null);
        if (owner != null) {
            owner.setStatus(Hero.HeroStatus.TEMPORAL_SHIFT);
            heroRepository.save(owner);
        }
    }
    
    /**
     * Appliquer l'effet de l'Anchor Tower (verrouillage temporal)
     */
    private void applyAnchorTowerEffect(Artifact artifact) {
        // Verrouiller toutes les tuiles dans le rayon d'effet
        int x = artifact.getPositionX();
        int y = artifact.getPositionY();
        int radius = artifact.getEffectRadius();
        
        List<GameTile> tilesInRange = gameTileRepository.findInArea(
            x - radius, x + radius, y - radius, y + radius
        );
        
        for (GameTile tile : tilesInRange) {
            if (artifact.isInEffectRange(tile.getX(), tile.getY())) {
                tile.setIsLocked(true);
                tile.setLockDuration(artifact.getRemainingDuration());
                gameTileRepository.save(tile);
            }
        }
    }
    
    /**
     * Appliquer l'effet du Wigner Eye (observation quantique)
     */
    private void applyWignerEyeEffect(Artifact artifact) {
        // Accorder la capacité d'observation au propriétaire
        Hero owner = heroRepository.findByName(artifact.getOwnerId()).orElse(null);
        if (owner != null) {
            owner.enableObservationAbility(artifact.getEffectRadius());
            heroRepository.save(owner);
        }
    }
    
    /**
     * Appliquer l'effet de la Temporal Sword (coupe causale)
     */
    private void applyTemporalSwordEffect(Artifact artifact) {
        // Permettre au propriétaire de dissiper les états quantiques
        Hero owner = heroRepository.findByName(artifact.getOwnerId()).orElse(null);
        if (owner != null) {
            owner.setStatus(Hero.HeroStatus.QUANTUM_SUPERPOSITION);
            heroRepository.save(owner);
        }
    }
    
    /**
     * Appliquer l'effet du Chronos Shield (protection temporelle)
     */
    private void applyChronosShieldEffect(Artifact artifact) {
        // Protéger le propriétaire contre les effets temporels
        Hero owner = heroRepository.findByName(artifact.getOwnerId()).orElse(null);
        if (owner != null) {
            // Ajouter résistance temporelle
            owner.setTemporalEnergy(owner.getTemporalEnergy() + 50);
            heroRepository.save(owner);
        }
    }
    
    /**
     * Appliquer l'effet du Quantum Mirror (réflexion quantique)
     */
    private void applyQuantumMirrorEffect(Artifact artifact) {
        // Créer un champ de réflexion quantique
        // Implémentation à compléter selon les besoins
    }
    
    /**
     * Appliquer l'effet du Temporal Compass (détection temporelle)
     */
    private void applyTemporalCompassEffect(Artifact artifact) {
        // Révéler les perturbations temporelles
        // Implémentation à compléter selon les besoins
    }
    
    /**
     * Appliquer l'effet du Causal Disruptor (perturbation causale)
     */
    private void applyCausalDisruptorEffect(Artifact artifact) {
        // Perturber les chaînes causales
        // Implémentation à compléter selon les besoins
    }
    
    // Méthodes de retrait des effets (miroir des méthodes d'application)
    private void removeVeilEffect(Artifact artifact) {
        Hero owner = heroRepository.findByName(artifact.getOwnerId()).orElse(null);
        if (owner != null) {
            owner.setStatus(Hero.HeroStatus.ACTIVE);
            heroRepository.save(owner);
        }
    }
    
    private void removeAnchorTowerEffect(Artifact artifact) {
        // Déverrouiller les tuiles
        int x = artifact.getPositionX();
        int y = artifact.getPositionY();
        int radius = artifact.getEffectRadius();
        
        List<GameTile> tilesInRange = gameTileRepository.findInArea(
            x - radius, x + radius, y - radius, y + radius
        );
        
        for (GameTile tile : tilesInRange) {
            if (artifact.isInEffectRange(tile.getX(), tile.getY())) {
                tile.setIsLocked(false);
                tile.setLockDuration(0);
                gameTileRepository.save(tile);
            }
        }
    }
    
    private void removeWignerEyeEffect(Artifact artifact) {
        Hero owner = heroRepository.findByName(artifact.getOwnerId()).orElse(null);
        if (owner != null) {
            owner.disableObservationAbility();
            heroRepository.save(owner);
        }
    }
    
    private void removeTemporalSwordEffect(Artifact artifact) {
        Hero owner = heroRepository.findByName(artifact.getOwnerId()).orElse(null);
        if (owner != null) {
            owner.setStatus(Hero.HeroStatus.ACTIVE);
            heroRepository.save(owner);
        }
    }
    
    private void removeChronosShieldEffect(Artifact artifact) {
        // Retirer la protection temporelle
        // Implémentation selon les besoins
    }
    
    private void removeQuantumMirrorEffect(Artifact artifact) {
        // Retirer le champ de réflexion
        // Implémentation selon les besoins
    }
    
    private void removeTemporalCompassEffect(Artifact artifact) {
        // Retirer la détection temporelle
        // Implémentation selon les besoins
    }
    
    private void removeCausalDisruptorEffect(Artifact artifact) {
        // Retirer la perturbation causale
        // Implémentation selon les besoins
    }
    
    // ==================================
    // MÉTHODES UTILITAIRES
    // ==================================
    
    /**
     * Vérifier si un artefact peut être activé
     */
    private boolean canActivateArtifact(Artifact artifact, String activatorId) {
        // Vérifier le propriétaire
        if (!artifact.getOwnerId().equals(activatorId)) {
            return false;
        }
        
        // Vérifier le statut
        if (!artifact.canActivate()) {
            return false;
        }
        
        // Vérifier l'énergie temporelle du héros
        Hero hero = heroRepository.findByName(activatorId).orElse(null);
        if (hero == null || !hero.canUseTemporalAbility(artifact.getTemporalEnergyCost())) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Configurer les propriétés d'un artefact selon son type
     */
    private void configureArtifactProperties(Artifact artifact, Artifact.ArtifactType type) {
        switch (type) {
            case VEIL:
                artifact.setEffectRadius(1);
                artifact.setEffectDuration(10);
                artifact.setTemporalEnergyCost(20);
                break;
            case ANCHOR_TOWER:
                artifact.setEffectRadius(3);
                artifact.setEffectDuration(15);
                artifact.setTemporalEnergyCost(30);
                break;
            case WIGNER_EYE:
                artifact.setEffectRadius(5);
                artifact.setEffectDuration(8);
                artifact.setTemporalEnergyCost(25);
                break;
            case TEMPORAL_SWORD:
                artifact.setEffectRadius(2);
                artifact.setEffectDuration(12);
                artifact.setTemporalEnergyCost(35);
                break;
            case CHRONOS_SHIELD:
                artifact.setEffectRadius(1);
                artifact.setEffectDuration(20);
                artifact.setTemporalEnergyCost(40);
                break;
            case QUANTUM_MIRROR:
                artifact.setEffectRadius(3);
                artifact.setEffectDuration(6);
                artifact.setTemporalEnergyCost(45);
                break;
            case TEMPORAL_COMPASS:
                artifact.setEffectRadius(7);
                artifact.setEffectDuration(5);
                artifact.setTemporalEnergyCost(15);
                break;
            case CAUSAL_DISRUPTOR:
                artifact.setEffectRadius(4);
                artifact.setEffectDuration(8);
                artifact.setTemporalEnergyCost(50);
                break;
        }
    }
    
    /**
     * Générer un ID unique pour un artefact
     */
    private String generateArtifactId(Artifact.ArtifactType type) {
        String prefix = type.name().substring(0, 3);
        long count = artifactRepository.countActiveByType(type);
        return String.format("%s%03d", prefix, count + 1);
    }
    
    /**
     * Générer un nom pour un artefact
     */
    private String generateArtifactName(Artifact.ArtifactType type) {
        return type.getDisplayName();
    }
    
    /**
     * Obtenir tous les artefacts d'un jeu
     */
    public List<Artifact> getGameArtifacts(Long gameId) {
        return artifactRepository.findByGameId(gameId);
    }
    
    /**
     * Obtenir les artefacts actifs d'un jeu
     */
    public List<Artifact> getActiveGameArtifacts(Long gameId) {
        return artifactRepository.findByGameIdAndStatus(gameId, Artifact.ArtifactStatus.ACTIVE);
    }
    
    /**
     * Obtenir les artefacts d'un propriétaire
     */
    public List<Artifact> getOwnerArtifacts(String ownerId) {
        return artifactRepository.findByOwnerId(ownerId);
    }
    
    /**
     * Obtenir les artefacts dans une zone
     */
    public List<Artifact> getArtifactsInArea(int centerX, int centerY, int radius) {
        return artifactRepository.findInArea(
            centerX - radius, centerX + radius,
            centerY - radius, centerY + radius
        );
    }
    
    /**
     * Détruire un artefact
     */
    public void destroyArtifact(String artifactId) {
        Optional<Artifact> artifactOpt = artifactRepository.findByArtifactId(artifactId);
        if (artifactOpt.isPresent()) {
            Artifact artifact = artifactOpt.get();
            
            // Retirer les effets
            removeArtifactEffects(artifact);
            
            // Détruire
            artifact.destroy();
            artifactRepository.save(artifact);
        }
    }
    
    /**
     * Nettoyer les artefacts détruits
     */
    public void cleanupDestroyedArtifacts() {
        artifactRepository.deleteDestroyed();
    }
} 