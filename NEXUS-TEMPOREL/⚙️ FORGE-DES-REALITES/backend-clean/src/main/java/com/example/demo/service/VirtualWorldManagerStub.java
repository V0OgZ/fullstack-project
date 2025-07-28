package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.Map;

/**
 * 🌌 VIRTUAL WORLD MANAGER STUB - Version simplifiée
 * ==================================================
 * 
 * Stub temporaire pour éviter les erreurs de dépendance
 * pendant que l'utilisateur dort et qu'on finalise tout.
 * 
 * STATUS: 🔧 STUB TEMPORAIRE
 */
@Service
public class VirtualWorldManagerStub {
    
    public Map<String, Object> getVirtualWorldsStatus() {
        return Map.of(
            "totalWorlds", 6,
            "activeWorlds", 4,
            "trappedPlayers", 0,
            "mVoidStatus", "ARMED"
        );
    }
} 