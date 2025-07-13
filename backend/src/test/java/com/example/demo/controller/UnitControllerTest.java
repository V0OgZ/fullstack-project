package com.example.demo.controller;

import com.example.demo.model.Unit;
import com.example.demo.service.UnitService;
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
class UnitControllerTest {

    @Mock
    private UnitService unitService;

    @InjectMocks
    private UnitController unitController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(unitController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testGetAllUnitsLocalized_Success() throws Exception {
        // Given
        String language = "en";
        List<Map<String, Object>> expectedUnits = Arrays.asList(
            createLocalizedUnit("peasant", "Peasant", "A basic unit"),
            createLocalizedUnit("archer", "Archer", "Ranged unit")
        );
        when(unitService.getAllUnitsLocalized(language)).thenReturn(expectedUnits);

        // When & Then
        mockMvc.perform(get("/api/units/localized/{language}", language))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("peasant"))
                .andExpect(jsonPath("$[0].name").value("Peasant"))
                .andExpect(jsonPath("$[1].id").value("archer"))
                .andExpect(jsonPath("$[1].name").value("Archer"));

        verify(unitService, times(1)).getAllUnitsLocalized(language);
    }

    @Test
    void testGetUnitByIdLocalized_Success() throws Exception {
        // Given
        String unitId = "peasant";
        String language = "en";
        Map<String, Object> expectedUnit = createLocalizedUnit(unitId, "Peasant", "A basic unit");
        when(unitService.getUnitByIdLocalized(unitId, language)).thenReturn(expectedUnit);

        // When & Then
        mockMvc.perform(get("/api/units/{id}/localized/{language}", unitId, language))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(unitId))
                .andExpect(jsonPath("$.name").value("Peasant"))
                .andExpect(jsonPath("$.description").value("A basic unit"));

        verify(unitService, times(1)).getUnitByIdLocalized(unitId, language);
    }

    @Test
    void testGetUnitByIdLocalized_NotFound() throws Exception {
        // Given
        String unitId = "nonexistent";
        String language = "en";
        when(unitService.getUnitByIdLocalized(unitId, language)).thenReturn(null);

        // When & Then
        mockMvc.perform(get("/api/units/{id}/localized/{language}", unitId, language))
                .andExpect(status().isNotFound());

        verify(unitService, times(1)).getUnitByIdLocalized(unitId, language);
    }

    @Test
    void testGetUnitsByCastleLocalized_Success() throws Exception {
        // Given
        String castle = "Castle";
        String language = "en";
        List<Map<String, Object>> expectedUnits = Arrays.asList(
            createLocalizedUnit("peasant", "Peasant", "A basic unit"),
            createLocalizedUnit("halberdier", "Halberdier", "Upgraded peasant")
        );
        when(unitService.getUnitsByCastleLocalized(castle, language)).thenReturn(expectedUnits);

        // When & Then
        mockMvc.perform(get("/api/units/castle/{castle}/localized/{language}", castle, language))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("peasant"))
                .andExpect(jsonPath("$[1].id").value("halberdier"));

        verify(unitService, times(1)).getUnitsByCastleLocalized(castle, language);
    }

    @Test
    void testGetCastleRosterLocalized_Success() throws Exception {
        // Given
        String castle = "Castle";
        String language = "en";
        Map<String, Object> expectedRoster = createLocalizedRoster();
        when(unitService.getCastleRosterLocalized(castle, language)).thenReturn(expectedRoster);

        // When & Then
        mockMvc.perform(get("/api/units/castle/{castle}/roster/localized/{language}", castle, language))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.castle").value("Castle"))
                .andExpect(jsonPath("$.tiers").exists());

        verify(unitService, times(1)).getCastleRosterLocalized(castle, language);
    }

    @Test
    void testGetAllUnits_Success() throws Exception {
        // Given
        List<Unit> expectedUnits = Arrays.asList(
            createTestUnit("peasant", "Castle", 1),
            createTestUnit("archer", "Castle", 2)
        );
        when(unitService.getAllUnits()).thenReturn(expectedUnits);

        // When & Then
        mockMvc.perform(get("/api/units"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("peasant"))
                .andExpect(jsonPath("$[1].id").value("archer"));

        verify(unitService, times(1)).getAllUnits();
    }

    @Test
    void testGetUnitById_Success() throws Exception {
        // Given
        String unitId = "peasant";
        Unit expectedUnit = createTestUnit(unitId, "Castle", 1);
        when(unitService.getUnitById(unitId)).thenReturn(Optional.of(expectedUnit));

        // When & Then
        mockMvc.perform(get("/api/units/{id}", unitId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(unitId))
                .andExpect(jsonPath("$.castle").value("Castle"))
                .andExpect(jsonPath("$.tier").value(1));

        verify(unitService, times(1)).getUnitById(unitId);
    }

    @Test
    void testGetUnitById_NotFound() throws Exception {
        // Given
        String unitId = "nonexistent";
        when(unitService.getUnitById(unitId)).thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(get("/api/units/{id}", unitId))
                .andExpect(status().isNotFound());

        verify(unitService, times(1)).getUnitById(unitId);
    }

    @Test
    void testGetUnitsByCastle_Success() throws Exception {
        // Given
        String castle = "Castle";
        List<Unit> expectedUnits = Arrays.asList(
            createTestUnit("peasant", castle, 1),
            createTestUnit("archer", castle, 2)
        );
        when(unitService.getUnitsByCastle(castle)).thenReturn(expectedUnits);

        // When & Then
        mockMvc.perform(get("/api/units/castle/{castle}", castle))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].castle").value(castle))
                .andExpect(jsonPath("$[1].castle").value(castle));

        verify(unitService, times(1)).getUnitsByCastle(castle);
    }

    @Test
    void testGetUnitsByTier_Success() throws Exception {
        // Given
        Integer tier = 1;
        List<Unit> expectedUnits = Arrays.asList(
            createTestUnit("peasant", "Castle", tier),
            createTestUnit("pixie", "Conflux", tier)
        );
        when(unitService.getUnitsByTier(tier)).thenReturn(expectedUnits);

        // When & Then
        mockMvc.perform(get("/api/units/tier/{tier}", tier))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].tier").value(tier))
                .andExpect(jsonPath("$[1].tier").value(tier));

        verify(unitService, times(1)).getUnitsByTier(tier);
    }

    @Test
    void testGetCastleRoster_Success() throws Exception {
        // Given
        String castle = "Castle";
        Map<Integer, List<Unit>> expectedRoster = Map.of(
            1, Arrays.asList(createTestUnit("peasant", castle, 1)),
            2, Arrays.asList(createTestUnit("archer", castle, 2))
        );
        when(unitService.getCastleRoster(castle)).thenReturn(expectedRoster);

        // When & Then
        mockMvc.perform(get("/api/units/castle/{castle}/roster", castle))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.1").exists())
                .andExpect(jsonPath("$.2").exists())
                .andExpect(jsonPath("$.1[0].id").value("peasant"))
                .andExpect(jsonPath("$.2[0].id").value("archer"));

        verify(unitService, times(1)).getCastleRoster(castle);
    }

    @Test
    void testGetUnitProgressionLine_Success() throws Exception {
        // Given
        String castle = "Castle";
        Integer tier = 1;
        List<Unit> expectedProgression = Arrays.asList(
            createTestUnit("peasant", castle, tier),
            createTestUnit("halberdier", castle, tier)
        );
        when(unitService.getUnitProgressionLine(castle, tier)).thenReturn(expectedProgression);

        // When & Then
        mockMvc.perform(get("/api/units/castle/{castle}/tier/{tier}/progression", castle, tier))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("peasant"))
                .andExpect(jsonPath("$[1].id").value("halberdier"));

        verify(unitService, times(1)).getUnitProgressionLine(castle, tier);
    }

    @Test
    void testGetAllCastleTypes_Success() throws Exception {
        // Given
        List<String> expectedCastles = Arrays.asList("Castle", "Rampart", "Tower", "Inferno");
        when(unitService.getAllCastleTypes()).thenReturn(expectedCastles);

        // When & Then
        mockMvc.perform(get("/api/units/castles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(4))
                .andExpect(jsonPath("$[0]").value("Castle"))
                .andExpect(jsonPath("$[1]").value("Rampart"));

        verify(unitService, times(1)).getAllCastleTypes();
    }

    @Test
    void testGetUnitStatistics_Success() throws Exception {
        // Given
        Map<String, Object> expectedStats = Map.of(
            "totalUnits", 150,
            "totalCastles", 8,
            "averageTier", 3.5
        );
        when(unitService.getUnitStatistics()).thenReturn(expectedStats);

        // When & Then
        mockMvc.perform(get("/api/units/statistics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalUnits").value(150))
                .andExpect(jsonPath("$.totalCastles").value(8))
                .andExpect(jsonPath("$.averageTier").value(3.5));

        verify(unitService, times(1)).getUnitStatistics();
    }

    @Test
    void testCreateUnit_Success() throws Exception {
        // Given
        Unit newUnit = createTestUnit("new-unit", "Castle", 1);
        Unit savedUnit = createTestUnit("new-unit", "Castle", 1);
        when(unitService.saveUnit(any(Unit.class))).thenReturn(savedUnit);

        // When & Then
        mockMvc.perform(post("/api/units")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newUnit)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("new-unit"))
                .andExpect(jsonPath("$.castle").value("Castle"));

        verify(unitService, times(1)).saveUnit(any(Unit.class));
    }

    @Test
    void testCreateUnits_Success() throws Exception {
        // Given
        List<Unit> newUnits = Arrays.asList(
            createTestUnit("unit1", "Castle", 1),
            createTestUnit("unit2", "Castle", 2)
        );
        when(unitService.saveAllUnits(any())).thenReturn(newUnits);

        // When & Then
        mockMvc.perform(post("/api/units/batch")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newUnits)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("unit1"))
                .andExpect(jsonPath("$[1].id").value("unit2"));

        verify(unitService, times(1)).saveAllUnits(any());
    }

    @Test
    void testUpdateUnit_Success() throws Exception {
        // Given
        String unitId = "peasant";
        Unit updatedUnit = createTestUnit(unitId, "Castle", 1);
        when(unitService.saveUnit(any(Unit.class))).thenReturn(updatedUnit);

        // When & Then
        mockMvc.perform(put("/api/units/{id}", unitId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedUnit)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(unitId));

        verify(unitService, times(1)).saveUnit(any(Unit.class));
    }

    @Test
    void testDeleteUnit_Success() throws Exception {
        // Given
        String unitId = "peasant";
        doNothing().when(unitService).deleteUnit(unitId);

        // When & Then
        mockMvc.perform(delete("/api/units/{id}", unitId))
                .andExpect(status().isNoContent());

        verify(unitService, times(1)).deleteUnit(unitId);
    }

    @Test
    void testInitializeDefaultUnits_Success() throws Exception {
        // Given
        doNothing().when(unitService).initializeDefaultUnits();

        // When & Then
        mockMvc.perform(post("/api/units/initialize"))
                .andExpect(status().isOk())
                .andExpect(content().string("Default units initialized successfully"));

        verify(unitService, times(1)).initializeDefaultUnits();
    }

    @Test
    void testGetUnitsHealth_Success() throws Exception {
        // Given
        List<Unit> units = Arrays.asList(createTestUnit("unit1", "Castle", 1));
        when(unitService.getAllUnits()).thenReturn(units);

        // When & Then
        mockMvc.perform(get("/api/units/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").value("Units API"))
                .andExpect(jsonPath("$.totalUnits").value(1))
                .andExpect(jsonPath("$.timestamp").exists());

        verify(unitService, times(1)).getAllUnits();
    }

    // Helper methods for creating test data
    private Map<String, Object> createLocalizedUnit(String id, String name, String description) {
        Map<String, Object> unit = new HashMap<>();
        unit.put("id", id);
        unit.put("name", name);
        unit.put("description", description);
        unit.put("castle", "Castle");
        unit.put("tier", 1);
        unit.put("stats", Map.of("attack", 5, "defense", 3, "health", 10));
        return unit;
    }

    private Map<String, Object> createLocalizedRoster() {
        Map<String, Object> roster = new HashMap<>();
        roster.put("castle", "Castle");
        roster.put("tiers", Map.of(
            1, Arrays.asList(createLocalizedUnit("peasant", "Peasant", "Basic unit")),
            2, Arrays.asList(createLocalizedUnit("archer", "Archer", "Ranged unit"))
        ));
        return roster;
    }

    private Unit createTestUnit(String id, String castle, Integer tier) {
        Unit unit = new Unit();
        unit.setId(id);
        unit.setCastle(castle);
        unit.setTier(tier);
        unit.setName("Test Unit");
        unit.setVariant("basic");
        unit.setAttack(5);
        unit.setDefense(3);
        unit.setHealth(10);
        unit.setMinDamage(2);
        unit.setMaxDamage(4);
        unit.setSpeed(5);
        unit.setGrowth(10);
        unit.setGoldCost(100);
        unit.setAiValue(200);
        return unit;
    }
} 