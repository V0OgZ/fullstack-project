package com.example.demo.controller;

import com.example.demo.service.GameService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class GameControllerTest {

    @Mock
    private GameService gameService;

    @InjectMocks
    private GameController gameController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(gameController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testGetGame_Success() throws Exception {
        // Given
        String gameId = "test-game-1";
        Map<String, Object> expectedGame = createTestGame(gameId);
        when(gameService.getGame(gameId)).thenReturn(expectedGame);

        // When & Then
        mockMvc.perform(get("/api/games/{gameId}", gameId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(gameId))
                .andExpect(jsonPath("$.name").value("Test Game"))
                .andExpect(jsonPath("$.status").value("active"));

        verify(gameService, times(1)).getGame(gameId);
    }

    @Test
    void testGetAvailableGames_Success() throws Exception {
        // Given
        List<Map<String, Object>> expectedGames = Arrays.asList(
            createTestGame("game-1"),
            createTestGame("game-2")
        );
        when(gameService.getAvailableGames()).thenReturn(expectedGames);

        // When & Then
        mockMvc.perform(get("/api/games/available"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("game-1"))
                .andExpect(jsonPath("$[1].id").value("game-2"));

        verify(gameService, times(1)).getAvailableGames();
    }

    @Test
    void testCreateGame_Success() throws Exception {
        // Given
        Map<String, Object> request = Map.of(
            "name", "New Game",
            "maxPlayers", 4,
            "gameMode", "conquest"
        );
        Map<String, Object> expectedGame = createTestGame("new-game-1");
        when(gameService.createGame(any())).thenReturn(expectedGame);

        // When & Then
        mockMvc.perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("new-game-1"))
                .andExpect(jsonPath("$.name").value("Test Game"));

        verify(gameService, times(1)).createGame(any());
    }

    @Test
    void testJoinGame_Success() throws Exception {
        // Given
        String gameId = "test-game-1";
        Map<String, Object> expectedGame = createTestGame(gameId);
        when(gameService.joinGame(gameId)).thenReturn(expectedGame);

        // When & Then
        mockMvc.perform(post("/api/games/{gameId}/join", gameId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(gameId));

        verify(gameService, times(1)).joinGame(gameId);
    }

    @Test
    void testGetCurrentPlayer_Success() throws Exception {
        // Given
        String gameId = "test-game-1";
        Map<String, Object> expectedPlayer = createTestPlayer("player-1");
        when(gameService.getCurrentPlayer(gameId)).thenReturn(expectedPlayer);

        // When & Then
        mockMvc.perform(get("/api/games/{gameId}/current-player", gameId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("player-1"))
                .andExpect(jsonPath("$.username").value("Test Player"));

        verify(gameService, times(1)).getCurrentPlayer(gameId);
    }

    @Test
    void testMoveHero_Success() throws Exception {
        // Given
        String heroId = "hero-1";
        Map<String, Object> request = Map.of(
            "targetPosition", Map.of("x", 5, "y", 3)
        );
        Map<String, Object> expectedAction = createTestAction("move", heroId);
        when(gameService.moveHero(eq(heroId), any())).thenReturn(expectedAction);

        // When & Then
        mockMvc.perform(post("/api/heroes/{heroId}/move", heroId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.type").value("move"))
                .andExpect(jsonPath("$.heroId").value(heroId))
                .andExpect(jsonPath("$.status").value("pending"));

        verify(gameService, times(1)).moveHero(eq(heroId), any());
    }

    @Test
    void testAttackTarget_Success() throws Exception {
        // Given
        String heroId = "hero-1";
        Map<String, Object> request = Map.of("targetId", "enemy-1");
        Map<String, Object> expectedAction = createTestAction("attack", heroId);
        when(gameService.attackTarget(heroId, "enemy-1")).thenReturn(expectedAction);

        // When & Then
        mockMvc.perform(post("/api/heroes/{heroId}/attack", heroId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.type").value("attack"))
                .andExpect(jsonPath("$.heroId").value(heroId));

        verify(gameService, times(1)).attackTarget(heroId, "enemy-1");
    }

    @Test
    void testCollectResource_Success() throws Exception {
        // Given
        String heroId = "hero-1";
        Map<String, Object> request = Map.of("objectId", "chest-1");
        Map<String, Object> expectedAction = createTestAction("collect", heroId);
        when(gameService.collectResource(heroId, "chest-1")).thenReturn(expectedAction);

        // When & Then
        mockMvc.perform(post("/api/heroes/{heroId}/collect", heroId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.type").value("collect"))
                .andExpect(jsonPath("$.heroId").value(heroId));

        verify(gameService, times(1)).collectResource(heroId, "chest-1");
    }

    @Test
    void testCancelAction_Success() throws Exception {
        // Given
        String actionId = "action-1";
        doNothing().when(gameService).cancelAction(actionId);

        // When & Then
        mockMvc.perform(post("/api/actions/{actionId}/cancel", actionId))
                .andExpect(status().isOk());

        verify(gameService, times(1)).cancelAction(actionId);
    }

    @Test
    void testGetPendingActions_Success() throws Exception {
        // Given
        String gameId = "test-game-1";
        List<Map<String, Object>> expectedActions = Arrays.asList(
            createTestAction("move", "hero-1"),
            createTestAction("attack", "hero-2")
        );
        when(gameService.getPendingActions(gameId)).thenReturn(expectedActions);

        // When & Then
        mockMvc.perform(get("/api/games/{gameId}/actions/pending", gameId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].type").value("move"))
                .andExpect(jsonPath("$[1].type").value("attack"));

        verify(gameService, times(1)).getPendingActions(gameId);
    }

    @Test
    void testEndTurn_Success() throws Exception {
        // Given
        String gameId = "test-game-1";
        doNothing().when(gameService).endTurn(gameId);

        // When & Then
        mockMvc.perform(post("/api/games/{gameId}/end-turn", gameId))
                .andExpect(status().isOk());

        verify(gameService, times(1)).endTurn(gameId);
    }

    @Test
    void testGetCombatResults_Success() throws Exception {
        // Given
        String gameId = "test-game-1";
        List<Map<String, Object>> expectedResults = Arrays.asList(
            createTestCombatResult("hero-1", "enemy-1", "victory"),
            createTestCombatResult("hero-2", "enemy-2", "defeat")
        );
        when(gameService.getCombatResults(gameId)).thenReturn(expectedResults);

        // When & Then
        mockMvc.perform(get("/api/games/{gameId}/combat-results", gameId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].result").value("victory"))
                .andExpect(jsonPath("$[1].result").value("defeat"));

        verify(gameService, times(1)).getCombatResults(gameId);
    }

    @Test
    void testGetGameState_Success() throws Exception {
        // Given
        String gameId = "test-game-1";
        Map<String, Object> expectedState = createTestGame(gameId);
        when(gameService.getGameState(gameId)).thenReturn(expectedState);

        // When & Then
        mockMvc.perform(get("/api/games/{gameId}/state", gameId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(gameId))
                .andExpect(jsonPath("$.status").value("active"));

        verify(gameService, times(1)).getGameState(gameId);
    }

    @Test
    void testGetGameHistory_Success() throws Exception {
        // Given
        String gameId = "test-game-1";
        List<Map<String, Object>> expectedHistory = Arrays.asList(
            Map.of("turn", 1, "action", "move", "player", "player-1"),
            Map.of("turn", 2, "action", "attack", "player", "player-2")
        );
        when(gameService.getGameHistory(gameId)).thenReturn(expectedHistory);

        // When & Then
        mockMvc.perform(get("/api/games/{gameId}/history", gameId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].turn").value(1))
                .andExpect(jsonPath("$[1].turn").value(2));

        verify(gameService, times(1)).getGameHistory(gameId);
    }

    @Test
    void testHealthCheck_Success() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }

    // Helper methods for creating test data
    private Map<String, Object> createTestGame(String gameId) {
        Map<String, Object> game = new HashMap<>();
        game.put("id", gameId);
        game.put("name", "Test Game");
        game.put("status", "active");
        game.put("currentTurn", 1);
        game.put("turnDuration", 30);
        game.put("players", Arrays.asList(createTestPlayer("player-1")));
        game.put("map", createTestMap());
        return game;
    }

    private Map<String, Object> createTestPlayer(String playerId) {
        Map<String, Object> player = new HashMap<>();
        player.put("id", playerId);
        player.put("username", "Test Player");
        player.put("color", "#3b82f6");
        player.put("isActive", true);
        player.put("resources", Map.of("gold", 1000, "wood", 200));
        player.put("heroes", Arrays.asList(createTestHero("hero-1")));
        return player;
    }

    private Map<String, Object> createTestHero(String heroId) {
        Map<String, Object> hero = new HashMap<>();
        hero.put("id", heroId);
        hero.put("name", "Test Hero");
        hero.put("level", 1);
        hero.put("position", Map.of("x", 2, "y", 2));
        hero.put("movementPoints", 3);
        hero.put("stats", Map.of("attack", 5, "defense", 3));
        return hero;
    }

    private Map<String, Object> createTestMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", "test-map");
        map.put("width", 10);
        map.put("height", 10);
        map.put("tiles", new ArrayList<>());
        return map;
    }

    private Map<String, Object> createTestAction(String type, String heroId) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", type);
        action.put("heroId", heroId);
        action.put("status", "pending");
        action.put("scheduledTime", new Date());
        return action;
    }

    private Map<String, Object> createTestCombatResult(String attackerId, String defenderId, String result) {
        Map<String, Object> combat = new HashMap<>();
        combat.put("attackerId", attackerId);
        combat.put("defenderId", defenderId);
        combat.put("result", result);
        combat.put("damage", 25);
        return combat;
    }
} 