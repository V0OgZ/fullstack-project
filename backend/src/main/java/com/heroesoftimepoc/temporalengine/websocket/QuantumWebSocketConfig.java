package com.heroesoftimepoc.temporalengine.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * 🌐 QUANTUM WEBSOCKET CONFIGURATION
 * ================================
 * Smart broadcasting system for Heroes of Time quantum events
 * Only broadcasts significant temporal/quantum events, not every action
 */
@Configuration
@EnableWebSocketMessageBroker
public class QuantumWebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Enable simple broker for quantum event topics
        config.enableSimpleBroker(
            "/topic/quantum",      // Quantum state events
            "/topic/temporal",     // Temporal events (day changes, etc.)
            "/topic/game",         // Game-wide events
            "/topic/interference", // Interference events
            "/topic/collapse"      // Collapse events
        );
        
        // Set application destination prefix for client messages
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register WebSocket endpoint with SockJS fallback
        registry.addEndpoint("/quantum-websocket")
                .setAllowedOriginPatterns("*") // Allow all frontends (8000, 5174, 8001, etc.)
                .withSockJS();
    }
}