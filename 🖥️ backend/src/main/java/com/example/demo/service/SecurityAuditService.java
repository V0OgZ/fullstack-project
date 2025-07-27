package com.example.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class SecurityAuditService {

    private static final Logger securityLogger = LoggerFactory.getLogger("SECURITY");
    private static final Logger auditLogger = LoggerFactory.getLogger("AUDIT");

    // Rate limiting tracking
    private final Map<String, AtomicInteger> loginAttempts = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> lastLoginAttempt = new ConcurrentHashMap<>();
    
    // Security metrics
    private final AtomicInteger totalLoginAttempts = new AtomicInteger(0);
    private final AtomicInteger failedLoginAttempts = new AtomicInteger(0);
    private final AtomicInteger suspiciousActivities = new AtomicInteger(0);

    /**
     * Log successful authentication
     */
    public void logSuccessfulLogin(String username, String ipAddress, String userAgent) {
        auditLogger.info("SUCCESSFUL_LOGIN: user={}, ip={}, userAgent={}, timestamp={}", 
                         username, ipAddress, userAgent, LocalDateTime.now());
        
        // Reset failed attempts for this IP
        loginAttempts.remove(ipAddress);
        lastLoginAttempt.remove(ipAddress);
        
        totalLoginAttempts.incrementAndGet();
    }

    /**
     * Log failed authentication attempt
     */
    public void logFailedLogin(String username, String ipAddress, String userAgent) {
        securityLogger.warn("FAILED_LOGIN: user={}, ip={}, userAgent={}, timestamp={}", 
                           username, ipAddress, userAgent, LocalDateTime.now());
        
        // Track failed attempts per IP
        AtomicInteger attempts = loginAttempts.computeIfAbsent(ipAddress, k -> new AtomicInteger(0));
        int currentAttempts = attempts.incrementAndGet();
        lastLoginAttempt.put(ipAddress, LocalDateTime.now());
        
        totalLoginAttempts.incrementAndGet();
        failedLoginAttempts.incrementAndGet();
        
        // Alert on multiple failed attempts
        if (currentAttempts >= 5) {
            logSuspiciousActivity("BRUTE_FORCE_ATTEMPT", 
                                 Map.of("ip", ipAddress, "attempts", String.valueOf(currentAttempts)));
        }
    }

    /**
     * Log user registration
     */
    public void logUserRegistration(String username, String email, String ipAddress) {
        auditLogger.info("USER_REGISTRATION: user={}, email={}, ip={}, timestamp={}", 
                         username, email, ipAddress, LocalDateTime.now());
    }

    /**
     * Log unauthorized access attempt
     */
    public void logUnauthorizedAccess(String endpoint, String ipAddress, String userAgent) {
        securityLogger.warn("UNAUTHORIZED_ACCESS: endpoint={}, ip={}, userAgent={}, timestamp={}", 
                           endpoint, ipAddress, userAgent, LocalDateTime.now());
        
        logSuspiciousActivity("UNAUTHORIZED_ACCESS", 
                             Map.of("endpoint", endpoint, "ip", ipAddress));
    }

    /**
     * Log input validation failure
     */
    public void logInputValidationFailure(String input, String field, String ipAddress) {
        securityLogger.warn("INPUT_VALIDATION_FAILURE: field={}, ip={}, timestamp={}", 
                           field, ipAddress, LocalDateTime.now());
        
        // Don't log the actual input to prevent log injection
        logSuspiciousActivity("INPUT_VALIDATION_FAILURE", 
                             Map.of("field", field, "ip", ipAddress));
    }

    /**
     * Log rate limiting violation
     */
    public void logRateLimitViolation(String ipAddress, String endpoint) {
        securityLogger.warn("RATE_LIMIT_VIOLATION: ip={}, endpoint={}, timestamp={}", 
                           ipAddress, endpoint, LocalDateTime.now());
        
        logSuspiciousActivity("RATE_LIMIT_VIOLATION", 
                             Map.of("ip", ipAddress, "endpoint", endpoint));
    }

    /**
     * Log game action for audit trail
     */
    public void logGameAction(String username, String gameId, String action, Map<String, Object> details) {
        auditLogger.info("GAME_ACTION: user={}, game={}, action={}, details={}, timestamp={}", 
                         username, gameId, action, details, LocalDateTime.now());
    }

    /**
     * Log administrative action
     */
    public void logAdminAction(String adminUser, String action, Map<String, Object> details) {
        auditLogger.warn("ADMIN_ACTION: admin={}, action={}, details={}, timestamp={}", 
                         adminUser, action, details, LocalDateTime.now());
    }

    /**
     * Log suspicious activity
     */
    public void logSuspiciousActivity(String activityType, Map<String, String> details) {
        securityLogger.error("SUSPICIOUS_ACTIVITY: type={}, details={}, timestamp={}", 
                            activityType, details, LocalDateTime.now());
        
        suspiciousActivities.incrementAndGet();
        
        // In a production system, you might want to trigger alerts here
        // e.g., send notification to security team, temporarily block IP, etc.
    }

    /**
     * Log SQL injection attempt
     */
    public void logSqlInjectionAttempt(String input, String ipAddress) {
        securityLogger.error("SQL_INJECTION_ATTEMPT: ip={}, timestamp={}", 
                            ipAddress, LocalDateTime.now());
        
        logSuspiciousActivity("SQL_INJECTION_ATTEMPT", 
                             Map.of("ip", ipAddress, "detected", "true"));
    }

    /**
     * Log XSS attempt
     */
    public void logXssAttempt(String input, String ipAddress) {
        securityLogger.error("XSS_ATTEMPT: ip={}, timestamp={}", 
                            ipAddress, LocalDateTime.now());
        
        logSuspiciousActivity("XSS_ATTEMPT", 
                             Map.of("ip", ipAddress, "detected", "true"));
    }

    /**
     * Check if IP should be rate limited
     */
    public boolean shouldRateLimit(String ipAddress) {
        AtomicInteger attempts = loginAttempts.get(ipAddress);
        LocalDateTime lastAttempt = lastLoginAttempt.get(ipAddress);
        
        if (attempts == null || lastAttempt == null) {
            return false;
        }
        
        // Rate limit if more than 10 failed attempts in last 15 minutes
        return attempts.get() >= 10 && 
               lastAttempt.isAfter(LocalDateTime.now().minusMinutes(15));
    }

    /**
     * Get security metrics
     */
    public Map<String, Object> getSecurityMetrics() {
        return Map.of(
            "totalLoginAttempts", totalLoginAttempts.get(),
            "failedLoginAttempts", failedLoginAttempts.get(),
            "suspiciousActivities", suspiciousActivities.get(),
            "activeRateLimits", loginAttempts.size(),
            "timestamp", LocalDateTime.now()
        );
    }

    /**
     * Clean up old rate limiting data (should be called periodically)
     */
    public void cleanupOldData() {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(1);
        
        lastLoginAttempt.entrySet().removeIf(entry -> entry.getValue().isBefore(cutoff));
        
        // Remove corresponding login attempts
        lastLoginAttempt.keySet().forEach(ip -> {
            if (!lastLoginAttempt.containsKey(ip)) {
                loginAttempts.remove(ip);
            }
        });
        
        auditLogger.info("SECURITY_CLEANUP: Cleaned up old rate limiting data, timestamp={}", 
                        LocalDateTime.now());
    }

    /**
     * Log JWT token validation failure
     */
    public void logJwtValidationFailure(String token, String reason, String ipAddress) {
        securityLogger.warn("JWT_VALIDATION_FAILURE: reason={}, ip={}, timestamp={}", 
                           reason, ipAddress, LocalDateTime.now());
        
        // Don't log the actual token for security
        logSuspiciousActivity("JWT_VALIDATION_FAILURE", 
                             Map.of("reason", reason, "ip", ipAddress));
    }

    /**
     * Log CORS violation
     */
    public void logCorsViolation(String origin, String ipAddress) {
        securityLogger.warn("CORS_VIOLATION: origin={}, ip={}, timestamp={}", 
                           origin, ipAddress, LocalDateTime.now());
        
        logSuspiciousActivity("CORS_VIOLATION", 
                             Map.of("origin", origin, "ip", ipAddress));
    }
} 