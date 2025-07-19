package com.heroesoftimepoc.temporalengine.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories("com.heroesoftimepoc.temporalengine.repository")
public class JpaConfig {
} 