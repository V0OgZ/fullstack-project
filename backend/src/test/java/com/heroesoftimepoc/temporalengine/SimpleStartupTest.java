package com.heroesoftimepoc.temporalengine;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.h2.console.enabled=false"
})
public class SimpleStartupTest {

    @Test
    public void contextLoads() {
        // Si ce test passe, le contexte Spring démarre correctement
    }
} 