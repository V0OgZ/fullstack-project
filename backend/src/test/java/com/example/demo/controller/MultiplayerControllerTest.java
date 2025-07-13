package com.example.demo.controller;

import com.example.demo.model.GameSession;
import com.example.demo.model.GameSessionStatus;
import com.example.demo.service.MultiplayerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class MultiplayerControllerTest {

    @Mock
    private MultiplayerService multiplayerService;

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @InjectMocks
    private MultiplayerController multiplayerController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(multiplayerController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testCreateSession_Success() throws Exception {
        // Given
        Map<String, Object> request = Map.of(
            "name", "Test Session",
            "maxPlayers", 4,
            "gameMode", "conquest",
            "creatorId", "player1"
        );
        GameSession expectedSession = createTestSession("session1", "Test Session", 4);
        when(multiplayerService.createSession(anyString(), anyInt(), anyString(), anyString()))
            .thenReturn(expectedSession);

        // When & Then
        mockMvc.perform(post("/api/multiplayer/sessions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sessionId").value("session1"))
                .andExpect(jsonPath("$.name").value("Test Session"))
                .andExpect(jsonPath("$.maxPlayers").value(4))
                .andExpect(jsonPath("$.status").value("WAITING"));

        verify(multiplayerService, times(1)).createSession("Test Session", 4, "conquest", "player1");
    }

    @Test
    void testGetAvailableSessions_Success() throws Exception {
        // Given
        List<GameSession> expectedSessions = Arrays.asList(
            createTestSession("session1", "Session 1", 4),
            createTestSession("session2", "Session 2", 2)
        );
        when(multiplayerService.getJoinableSessions()).thenReturn(expectedSessions);

        // When & Then
        mockMvc.perform(get("/api/multiplayer/sessions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].sessionId").value("session1"))
                .andExpect(jsonPath("$[0].name").value("Session 1"))
                .andExpect(jsonPath("$[1].sessionId").value("session2"))
                .andExpect(jsonPath("$[1].name").value("Session 2"));

        verify(multiplayerService, times(1)).getJoinableSessions();
    }

    @Test
    void testJoinSession_Success() throws Exception {
        // Given
        String sessionId = "session1";
        Map<String, String> request = Map.of("playerId", "player2");
        GameSession expectedSession = createTestSession(sessionId, "Test Session", 4);
        expectedSession.setCurrentPlayers(2);
        when(multiplayerService.joinSession(sessionId, "player2")).thenReturn(expectedSession);

        // When & Then
        mockMvc.perform(post("/api/multiplayer/sessions/{sessionId}/join", sessionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sessionId").value(sessionId))
                .andExpect(jsonPath("$.currentPlayers").value(2));

        verify(multiplayerService, times(1)).joinSession(sessionId, "player2");
    }

    @Test
    void testLeaveSession_Success() throws Exception {
        // Given
        String sessionId = "session1";
        Map<String, String> request = Map.of("playerId", "player2");
        GameSession expectedSession = createTestSession(sessionId, "Test Session", 4);
        expectedSession.setCurrentPlayers(1);
        when(multiplayerService.leaveSession(sessionId, "player2")).thenReturn(expectedSession);

        // When & Then
        mockMvc.perform(post("/api/multiplayer/sessions/{sessionId}/leave", sessionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sessionId").value(sessionId))
                .andExpect(jsonPath("$.currentPlayers").value(1));

        verify(multiplayerService, times(1)).leaveSession(sessionId, "player2");
    }

    @Test
    void testStartSession_Success() throws Exception {
        // Given
        String sessionId = "session1";
        Map<String, String> request = Map.of("playerId", "player1");
        GameSession expectedSession = createTestSession(sessionId, "Test Session", 4);
        expectedSession.setStatus(GameSessionStatus.ACTIVE);
        when(multiplayerService.startSession(sessionId, "player1")).thenReturn(expectedSession);

        // When & Then
        mockMvc.perform(post("/api/multiplayer/sessions/{sessionId}/start", sessionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sessionId").value(sessionId))
                .andExpect(jsonPath("$.status").value("ACTIVE"));

        verify(multiplayerService, times(1)).startSession(sessionId, "player1");
    }

    @Test
    void testGetSession_Success() throws Exception {
        // Given
        String sessionId = "session1";
        GameSession expectedSession = createTestSession(sessionId, "Test Session", 4);
        when(multiplayerService.getSession(sessionId)).thenReturn(expectedSession);

        // When & Then
        mockMvc.perform(get("/api/multiplayer/sessions/{sessionId}", sessionId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sessionId").value(sessionId))
                .andExpect(jsonPath("$.name").value("Test Session"))
                .andExpect(jsonPath("$.maxPlayers").value(4));

        verify(multiplayerService, times(1)).getSession(sessionId);
    }

    @Test
    void testHandleJoin_Success() throws Exception {
        // Given
        Map<String, Object> message = Map.of(
            "sessionId", "session1",
            "playerId", "player2"
        );
        GameSession expectedSession = createTestSession("session1", "Test Session", 4);
        when(multiplayerService.joinSession("session1", "player2")).thenReturn(expectedSession);

        // When
        Map<String, Object> result = multiplayerController.handleJoin(message);

        // Then
        assertEquals("success", result.get("status"));
        assertEquals(expectedSession, result.get("session"));
        verify(multiplayerService, times(1)).joinSession("session1", "player2");
        verify(messagingTemplate, times(1)).convertAndSend(eq("/topic/session/session1"), any(Map.class));
    }

    @Test
    void testHandleJoin_Error() throws Exception {
        // Given
        Map<String, Object> message = Map.of(
            "sessionId", "session1",
            "playerId", "player2"
        );
        when(multiplayerService.joinSession("session1", "player2"))
            .thenThrow(new RuntimeException("Session is full"));

        // When
        Map<String, Object> result = multiplayerController.handleJoin(message);

        // Then
        assertEquals("error", result.get("status"));
        assertEquals("Session is full", result.get("message"));
        verify(multiplayerService, times(1)).joinSession("session1", "player2");
    }

    @Test
    void testHandleLeave_Success() throws Exception {
        // Given
        Map<String, Object> message = Map.of(
            "sessionId", "session1",
            "playerId", "player2"
        );
        GameSession expectedSession = createTestSession("session1", "Test Session", 4);
        when(multiplayerService.leaveSession("session1", "player2")).thenReturn(expectedSession);

        // When
        Map<String, Object> result = multiplayerController.handleLeave(message);

        // Then
        assertEquals("success", result.get("status"));
        assertEquals(expectedSession, result.get("session"));
        verify(multiplayerService, times(1)).leaveSession("session1", "player2");
        verify(messagingTemplate, times(1)).convertAndSend(eq("/topic/session/session1"), any(Map.class));
    }

    // Helper methods for creating test data
    private GameSession createTestSession(String sessionId, String name, int maxPlayers) {
        GameSession session = new GameSession();
        session.setId(1L);
        session.setSessionId(sessionId);
        session.setName(name);
        session.setMaxPlayers(maxPlayers);
        session.setCurrentPlayers(1);
        session.setStatus(GameSessionStatus.WAITING);
        session.setGameMode("conquest");
        session.setPlayerIds(Arrays.asList("player1"));
        return session;
    }

    // Helper assertion methods
    private void assertEquals(Object expected, Object actual) {
        if (!Objects.equals(expected, actual)) {
            throw new AssertionError("Expected: " + expected + ", but was: " + actual);
        }
    }
} 