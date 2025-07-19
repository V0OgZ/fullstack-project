package com.heroesoftimepoc.temporalengine.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EntityScan("com.heroesoftimepoc.temporalengine.model")
public class JpaConfig {
} 