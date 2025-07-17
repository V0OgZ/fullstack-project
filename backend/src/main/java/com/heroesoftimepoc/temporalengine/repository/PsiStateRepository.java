package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PsiStateRepository extends JpaRepository<PsiState, Long> {
    
    Optional<PsiState> findByPsiId(String psiId);
    
    List<PsiState> findByStatus(PsiState.PsiStatus status);
    
    List<PsiState> findByBranchId(String branchId);
    
    List<PsiState> findByOwnerHero(String ownerHero);
    
    @Query("SELECT p FROM PsiState p WHERE p.game.id = :gameId")
    List<PsiState> findByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT p FROM PsiState p WHERE p.game.id = :gameId AND p.status = :status")
    List<PsiState> findByGameIdAndStatus(@Param("gameId") Long gameId, @Param("status") PsiState.PsiStatus status);
    
    @Query("SELECT p FROM PsiState p WHERE p.targetX = :x AND p.targetY = :y")
    List<PsiState> findByTargetPosition(@Param("x") Integer x, @Param("y") Integer y);
    
    @Query("SELECT p FROM PsiState p WHERE p.game.id = :gameId AND p.targetX = :x AND p.targetY = :y")
    List<PsiState> findByGameIdAndTargetPosition(@Param("gameId") Long gameId, @Param("x") Integer x, @Param("y") Integer y);
    
    @Query("SELECT p FROM PsiState p WHERE p.game.id = :gameId AND p.status = 'ACTIVE'")
    List<PsiState> findActiveByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT p FROM PsiState p WHERE p.deltaT = :deltaT")
    List<PsiState> findByDeltaT(@Param("deltaT") Integer deltaT);
    
    @Query("SELECT p FROM PsiState p WHERE p.game.id = :gameId AND p.deltaT = :deltaT AND p.status = 'ACTIVE'")
    List<PsiState> findActiveByGameIdAndDeltaT(@Param("gameId") Long gameId, @Param("deltaT") Integer deltaT);
    
    @Query("SELECT p FROM PsiState p WHERE p.actionType = :actionType")
    List<PsiState> findByActionType(@Param("actionType") String actionType);
    
    @Query("SELECT p FROM PsiState p WHERE p.game.id = :gameId AND p.ownerHero = :ownerHero AND p.status = 'ACTIVE'")
    List<PsiState> findActiveByGameIdAndOwnerHero(@Param("gameId") Long gameId, @Param("ownerHero") String ownerHero);
    
    @Query("SELECT p FROM PsiState p WHERE p.collapseTrigger IS NOT NULL")
    List<PsiState> findWithCollapseTriggers();
}