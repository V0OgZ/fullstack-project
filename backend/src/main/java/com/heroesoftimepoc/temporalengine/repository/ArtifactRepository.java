package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.Artifact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour les artefacts temporels
 */
@Repository
public interface ArtifactRepository extends JpaRepository<Artifact, Long> {
    
    /**
     * Trouver un artefact par son ID unique
     */
    Optional<Artifact> findByArtifactId(String artifactId);
    
    /**
     * Trouver les artefacts par type
     */
    List<Artifact> findByType(Artifact.ArtifactType type);
    
    /**
     * Trouver les artefacts par statut
     */
    List<Artifact> findByStatus(Artifact.ArtifactStatus status);
    
    /**
     * Trouver les artefacts actifs
     */
    @Query("SELECT a FROM Artifact a WHERE a.status = 'ACTIVE'")
    List<Artifact> findActiveArtifacts();
    
    /**
     * Trouver les artefacts par propriétaire
     */
    List<Artifact> findByOwnerId(String ownerId);
    
    /**
     * Trouver les artefacts par jeu
     */
    @Query("SELECT a FROM Artifact a WHERE a.game.id = :gameId")
    List<Artifact> findByGameId(@Param("gameId") Long gameId);
    
    /**
     * Trouver les artefacts par position
     */
    @Query("SELECT a FROM Artifact a WHERE a.positionX = :x AND a.positionY = :y")
    List<Artifact> findByPosition(@Param("x") Integer x, @Param("y") Integer y);
    
    /**
     * Trouver les artefacts dans une zone
     */
    @Query("SELECT a FROM Artifact a WHERE a.positionX BETWEEN :minX AND :maxX AND a.positionY BETWEEN :minY AND :maxY")
    List<Artifact> findInArea(@Param("minX") Integer minX, @Param("maxX") Integer maxX, 
                             @Param("minY") Integer minY, @Param("maxY") Integer maxY);
    
    /**
     * Trouver les artefacts actifs dans une zone
     */
    @Query("SELECT a FROM Artifact a WHERE a.status = 'ACTIVE' AND a.positionX BETWEEN :minX AND :maxX AND a.positionY BETWEEN :minY AND :maxY")
    List<Artifact> findActiveInArea(@Param("minX") Integer minX, @Param("maxX") Integer maxX, 
                                   @Param("minY") Integer minY, @Param("maxY") Integer maxY);
    
    /**
     * Trouver les artefacts avec durée restante
     */
    @Query("SELECT a FROM Artifact a WHERE a.remainingDuration > 0")
    List<Artifact> findWithRemainingDuration();
    
    /**
     * Trouver les artefacts épuisés
     */
    @Query("SELECT a FROM Artifact a WHERE a.status = 'EXHAUSTED' OR a.remainingDuration <= 0")
    List<Artifact> findExhausted();
    
    /**
     * Compter les artefacts actifs par type
     */
    @Query("SELECT COUNT(a) FROM Artifact a WHERE a.type = :type AND a.status = 'ACTIVE'")
    long countActiveByType(@Param("type") Artifact.ArtifactType type);
    
    /**
     * Compter les artefacts par propriétaire
     */
    long countByOwnerId(String ownerId);
    
    /**
     * Compter les artefacts par jeu
     */
    @Query("SELECT COUNT(a) FROM Artifact a WHERE a.game.id = :gameId")
    long countByGameId(@Param("gameId") Long gameId);
    
    /**
     * Trouver les artefacts par jeu et propriétaire
     */
    @Query("SELECT a FROM Artifact a WHERE a.game.id = :gameId AND a.ownerId = :ownerId")
    List<Artifact> findByGameIdAndOwnerId(@Param("gameId") Long gameId, @Param("ownerId") String ownerId);
    
    /**
     * Trouver les artefacts par jeu et statut
     */
    @Query("SELECT a FROM Artifact a WHERE a.game.id = :gameId AND a.status = :status")
    List<Artifact> findByGameIdAndStatus(@Param("gameId") Long gameId, @Param("status") Artifact.ArtifactStatus status);
    
    /**
     * Trouver les artefacts qui doivent être traités ce tour
     */
    @Query("SELECT a FROM Artifact a WHERE a.status = 'ACTIVE' AND a.remainingDuration > 0")
    List<Artifact> findToProcess();
    
    /**
     * Supprimer les artefacts détruits
     */
    @Query("DELETE FROM Artifact a WHERE a.status = 'DESTROYED'")
    void deleteDestroyed();
} 