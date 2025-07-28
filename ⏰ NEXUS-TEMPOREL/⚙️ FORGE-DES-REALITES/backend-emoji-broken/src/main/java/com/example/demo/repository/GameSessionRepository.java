package com.example.demo.repository;

import com.example.demo.model.GameSession;
import com.example.demo.model.GameSessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
    
    // Find game session by unique session ID
    Optional<GameSession> findBySessionId(String sessionId);
    
    // Find all sessions with specific status
    List<GameSession> findByStatus(GameSessionStatus status);
    
    // Find all waiting sessions (lobbies)
    List<GameSession> findByStatusAndNetworkMode(GameSessionStatus status, Boolean networkMode);
    
    // Find sessions that player can join (not full)
    @Query("SELECT gs FROM GameSession gs WHERE gs.status = :status AND gs.currentPlayers < gs.maxPlayers")
    List<GameSession> findJoinableSessions(@Param("status") GameSessionStatus status);
    
    // Find sessions by game mode
    List<GameSession> findByGameModeAndStatus(String gameMode, GameSessionStatus status);
    
    // Find sessions containing specific player
    @Query("SELECT gs FROM GameSession gs WHERE :playerId MEMBER OF gs.playerIds")
    List<GameSession> findByPlayerIdsContaining(@Param("playerId") String playerId);
    
    // Find active network mode sessions
    @Query("SELECT gs FROM GameSession gs WHERE gs.networkMode = true AND gs.status = :status")
    List<GameSession> findActiveNetworkSessions(@Param("status") GameSessionStatus status);
    
    // Count active sessions
    @Query("SELECT COUNT(gs) FROM GameSession gs WHERE gs.status = :status")
    Long countByStatus(@Param("status") GameSessionStatus status);
    
    // Find sessions with ZFC enabled
    List<GameSession> findByZfcEnabledAndStatus(Boolean zfcEnabled, GameSessionStatus status);
} 