package com.heroesoftimepoc.temporalengine;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Test simple pour vérifier que le contexte Spring démarre correctement
 * Utilisé pour diagnostiquer le problème JPA
 */
@SpringBootTest
@ActiveProfiles("test")
public class SimpleStartupTest {
    
    @Test
    public void contextLoads() {
        // Si ce test passe, le contexte Spring démarre correctement
        System.out.println("✅ Contexte Spring chargé avec succès !");
    }
} 