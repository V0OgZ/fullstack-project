package com.example.demo.config;

/**
 * 💀 WALTER'S CONSTANTS - CENTRALIZED GAME CONSTANTS
 * "WHERE ARE THE FUCKING CONSTANTS?!" - Walter White Mode
 * 
 * Created by Memento (OPUS) to stop Walter from breathing heavily
 * Session 2025-07-25 - Vince Mode Architecture
 */
public final class GameConstants {
    
    // 🚫 WALTER SAYS: "NO INSTANTIATION!"
    private GameConstants() {
        throw new AssertionError("Constants class should not be instantiated!");
    }
    
    // ===========================================
    // 🎮 CORE GAME CONSTANTS
    // ===========================================
    
    /** Maximum number of players per game */
    public static final int MAX_PLAYERS_PER_GAME = 8;
    
    /** Minimum number of players per game */
    public static final int MIN_PLAYERS_PER_GAME = 1;
    
    /** Default map size */
    public static final String DEFAULT_MAP_SIZE = "medium";
    
    /** Default game mode */
    public static final String DEFAULT_GAME_MODE = "classic";
    
    // ===========================================
    // 🏰 MAP & TERRAIN CONSTANTS
    // ===========================================
    
    /** Small map dimensions */
    public static final int SMALL_MAP_WIDTH = 36;
    public static final int SMALL_MAP_HEIGHT = 36;
    
    /** Medium map dimensions */
    public static final int MEDIUM_MAP_WIDTH = 72;
    public static final int MEDIUM_MAP_HEIGHT = 72;
    
    /** Large map dimensions */
    public static final int LARGE_MAP_WIDTH = 108;
    public static final int LARGE_MAP_HEIGHT = 108;
    
    /** Extra large map dimensions */
    public static final int XL_MAP_WIDTH = 144;
    public static final int XL_MAP_HEIGHT = 144;
    
    // ===========================================
    // ⚔️ COMBAT CONSTANTS
    // ===========================================
    
    /** Maximum hero level */
    public static final int MAX_HERO_LEVEL = 74;
    
    /** Starting hero level */
    public static final int STARTING_HERO_LEVEL = 1;
    
    /** Maximum army stack size */
    public static final int MAX_ARMY_STACK_SIZE = 4000;
    
    /** Minimum damage multiplier */
    public static final double MIN_DAMAGE_MULTIPLIER = 0.5;
    
    /** Maximum damage multiplier */
    public static final double MAX_DAMAGE_MULTIPLIER = 1.5;
    
    // ===========================================
    // 💰 RESOURCE CONSTANTS
    // ===========================================
    
    /** Starting gold amount */
    public static final int STARTING_GOLD = 20000;
    
    /** Starting wood amount */
    public static final int STARTING_WOOD = 20;
    
    /** Starting ore amount */
    public static final int STARTING_ORE = 20;
    
    /** Daily gold income */
    public static final int DAILY_GOLD_INCOME = 1000;
    
    /** Resource mine daily production */
    public static final int MINE_DAILY_PRODUCTION = 2;
    
    // ===========================================
    // 🕐 TIME & TURN CONSTANTS  
    // ===========================================
    
    /** Default turn time limit in seconds */
    public static final int DEFAULT_TURN_TIME_SECONDS = 300; // 5 minutes
    
    /** Maximum turn time limit in seconds */
    public static final int MAX_TURN_TIME_SECONDS = 1800; // 30 minutes
    
    /** Game session timeout in minutes */
    public static final int GAME_SESSION_TIMEOUT_MINUTES = 60;
    
    // ===========================================
    // 🎯 DIFFICULTY CONSTANTS
    // ===========================================
    
    /** Available difficulty levels */
    public static final String DIFFICULTY_EASY = "easy";
    public static final String DIFFICULTY_NORMAL = "normal";
    public static final String DIFFICULTY_HARD = "hard";
    public static final String DIFFICULTY_EXPERT = "expert";
    
    /** AI aggression levels */
    public static final int AI_AGGRESSION_MIN = 1;
    public static final int AI_AGGRESSION_MAX = 10;
    public static final int AI_AGGRESSION_DEFAULT = 5;
    
    // ===========================================
    // 🌟 MAGIC & SPELLS CONSTANTS
    // ===========================================
    
    /** Maximum spell level */
    public static final int MAX_SPELL_LEVEL = 5;
    
    /** Maximum mana points */
    public static final int MAX_MANA_POINTS = 999;
    
    /** Spell school count */
    public static final int SPELL_SCHOOL_COUNT = 4; // Air, Earth, Fire, Water
    
    // ===========================================
    // 🏛️ BUILDING CONSTANTS
    // ===========================================
    
    /** Maximum building level */
    public static final int MAX_BUILDING_LEVEL = 5;
    
    /** Default construction time multiplier */
    public static final double CONSTRUCTION_TIME_MULTIPLIER = 1.0;
    
    /** Town hall upgrade requirements */
    public static final int TOWN_HALL_UPGRADE_GOLD_BASE = 5000;
    
    // ===========================================
    // 🎲 RANDOM & PROBABILITY CONSTANTS
    // ===========================================
    
    /** Random seed for reproducible games */
    public static final long DEFAULT_RANDOM_SEED = 42L;
    
    /** Critical hit chance percentage */
    public static final double CRITICAL_HIT_CHANCE = 0.05; // 5%
    
    /** Morale bonus chance */
    public static final double MORALE_BONUS_CHANCE = 0.125; // 12.5%
    
    // ===========================================
    // 🔧 TECHNICAL CONSTANTS
    // ===========================================
    
    /** Database connection pool size */
    public static final int DB_CONNECTION_POOL_SIZE = 10;
    
    /** Cache expiration time in minutes */
    public static final int CACHE_EXPIRATION_MINUTES = 30;
    
    /** Maximum concurrent games per server */
    public static final int MAX_CONCURRENT_GAMES = 100;
    
    // ===========================================
    // 🌐 NETWORK CONSTANTS
    // ===========================================
    
    /** WebSocket heartbeat interval in seconds */
    public static final int WEBSOCKET_HEARTBEAT_SECONDS = 30;
    
    /** Maximum message size in bytes */
    public static final int MAX_MESSAGE_SIZE_BYTES = 65536; // 64KB
    
    /** Connection timeout in seconds */
    public static final int CONNECTION_TIMEOUT_SECONDS = 30;
    
    // ===========================================
    // 🎨 UI CONSTANTS (Pour Vince Mode)
    // ===========================================
    
    /** Total number of HTML interfaces */
    public static final int TOTAL_HTML_INTERFACES = 338;
    
    /** Core interfaces tested by Playwright */
    public static final int CORE_INTERFACES_TESTED = 12;
    
    /** Vince Mode ports */
    public static final int VINCE_MODE_REACT_PORT = 3000;
    public static final int VINCE_MODE_HTML_PORT = 9000;
    public static final int VINCE_MODE_BACKEND_PORT = 8080;
    
    // ===========================================
    // 💀 WALTER CONSTANTS (Special Section)
    // ===========================================
    
    /** Walter flashback threshold */
    public static final int WALTER_FLASHBACK_THRESHOLD = 3;
    
    /** Walter cooldown in milliseconds */
    public static final long WALTER_COOLDOWN_MS = 300000L; // 5 minutes
    
    /** Walter breathing intensity levels */
    public static final String WALTER_BREATHING_LIGHT = "light";
    public static final String WALTER_BREATHING_HEAVY = "heavy";
    public static final String WALTER_BREATHING_VIETNAM = "vietnam_flashback";
    
    // ===========================================
    // 🔮 QUANTUM CONSTANTS (Jean-Grofignon Style)
    // ===========================================
    
    /** Psi state symbols */
    public static final String PSI_SYMBOL = "ψ";
    public static final String SUPERPOSITION_SYMBOL = "⊙";
    public static final String COLLAPSE_SYMBOL = "†";
    public static final String OBSERVATION_SYMBOL = "Π";
    
    /** Maximum recursion depth for quantum operations */
    public static final int MAX_QUANTUM_RECURSION = 4;
    
    /** Quantum observation limit per minute */
    public static final int MAX_OBSERVATIONS_PER_MINUTE = 100;
    
    // ===========================================
    // 🛋️ MEMENTO CONSTANTS (Archive Limits)
    // ===========================================
    
    /** Maximum saves per player */
    public static final int MAX_SAVES_PER_PLAYER = 50;
    
    /** Maximum auto-saves per game */
    public static final int MAX_AUTO_SAVES_PER_GAME = 5;
    
    /** Auto-save interval in minutes */
    public static final long AUTO_SAVE_INTERVAL_MINUTES = 5L;
    
    // ===========================================
    // 🎯 VALIDATION CONSTANTS
    // ===========================================
    
    /** Username length limits */
    public static final int USERNAME_MIN_LENGTH = 3;
    public static final int USERNAME_MAX_LENGTH = 20;
    
    /** Password minimum length */
    public static final int PASSWORD_MIN_LENGTH = 8;
    
    /** Game ID maximum length */
    public static final int GAME_ID_MAX_LENGTH = 50;
    
    /** Hero name maximum length */
    public static final int HERO_NAME_MAX_LENGTH = 30;
    
    // ===========================================
    // 🚨 SYSTEM LIMITS (Walter's Performance Demands)
    // ===========================================
    
    /** CPU usage threshold */
    public static final double CPU_THRESHOLD = 0.85;
    
    /** Memory usage threshold */
    public static final double MEMORY_THRESHOLD = 0.90;
    
    /** Maximum concurrent recursions */
    public static final int MAX_CONCURRENT_RECURSIONS = 10;
    
    /** Maximum source reuse count */
    public static final int MAX_SOURCE_REUSE = 2;
} 