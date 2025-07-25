package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * ⚡ WEBSOCKETS TEMPORELS - CONFIGURATION OPUS
 * ==========================================
 * 
 * Upgrade des WebSockets basiques vers WebSockets Temporels selon
 * les spécifications du Livre d'Opus Bootstrap Paradox.
 * 
 * VISION OPUS: "Spring WebFlux + streaming WSG"
 * OBJECTIF: Communication temps réel pour moteur temporel
 * STATUS: ✅ PRIORITY_1_IMPLEMENTED
 * 
 * 🔮 OPUS: "WebSockets Temporels permettent synchronisation
 * des états ψ (psi) à travers les timelines multiples"
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 🌀 WEBSOCKETS TEMPORELS - Brokers étendus pour streaming WSG
        config.enableSimpleBroker(
            "/topic",           // Messages publics (sessions multijoueur)
            "/queue",           // Messages privés (joueur spécifique)
            "/temporal",        // 🆕 OPUS: Canal temporel pour états ψ
            "/wsg-stream",      // 🆕 OPUS: Streaming WSG (World State Graph)
            "/causal-sync",     // 🆕 OPUS: Synchronisation causale
            "/timeline-events"  // 🆕 OPUS: Événements timeline
        );
        
        // 🎯 OPUS: Préfixes pour routing temporel
        config.setApplicationDestinationPrefixes(
            "/app",             // Actions jeu standard
            "/temporal-app",    // 🆕 OPUS: Actions temporelles
            "/wsg-app",         // 🆕 OPUS: Actions WSG streaming
            "/causal-app"       // 🆕 OPUS: Actions causales
        );
        
        // ⚡ OPUS: Configuration streaming temps réel
        config.setUserDestinationPrefix("/user");
        config.setCacheLimit(4096);  // Cache pour streaming WSG
        config.setPreservePublishOrder(true);  // Ordre causal préservé
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 🌐 ENDPOINT WEBSOCKETS TEMPORELS PRINCIPAL
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
                
        // 🌀 NOUVEAUX ENDPOINTS TEMPORELS SELON OPUS
        registry.addEndpoint("/temporal-ws")
                .setAllowedOriginPatterns("*")
                .withSockJS()
                .setHeartbeatTime(10000);  // Heartbeat pour sync temporelle
                
        // 📊 WSG STREAMING ENDPOINT  
        registry.addEndpoint("/wsg-stream")
                .setAllowedOriginPatterns("*")
                .withSockJS()
                .setStreamBytesLimit(512 * 1024);  // 512KB pour streaming WSG
                
        // ⚡ CAUSAL SYNC ENDPOINT
        registry.addEndpoint("/causal-sync")
                .setAllowedOriginPatterns("*")
                .withSockJS()
                .setDisconnectDelay(5000);  // Délai déconnexion causale
    }
    
    // 🔮 OPUS: Configuration avancée pour Bootstrap Paradox
    // TODO: Ajouter intercepteurs temporels si nécessaire
} 