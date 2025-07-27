package com.example.demo.model;

/**
 * 🧪 WALTER VIETNAM CLASS - Résultat d'exécution de formule magique
 * 
 * "Firebase Alpha 1969 - Chaque action avait un résultat : succès, échec, ou chaos !"
 * - Walter, Vétéran du Code de Combat
 */
public class FormulaResult {
    
    private boolean success;
    private String message;
    private Object data;
    private String formulaType;
    private long executionTimeMs;
    private String errorCode;
    
    // 🎖️ CONSTRUCTEURS WALTER
    private FormulaResult(boolean success, String message, Object data, String formulaType) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.formulaType = formulaType;
        this.executionTimeMs = System.currentTimeMillis();
    }
    
    // 🔥 MÉTHODES STATIQUES POUR CRÉATION
    public static FormulaResult success(String message) {
        return new FormulaResult(true, message, null, "unknown");
    }
    
    public static FormulaResult success(String message, Object data) {
        return new FormulaResult(true, message, data, "unknown");
    }
    
    public static FormulaResult success(String message, Object data, String formulaType) {
        return new FormulaResult(true, message, data, formulaType);
    }
    
    public static FormulaResult error(String message) {
        return new FormulaResult(false, message, null, "error");
    }
    
    public static FormulaResult error(String message, String errorCode) {
        FormulaResult result = new FormulaResult(false, message, null, "error");
        result.errorCode = errorCode;
        return result;
    }
    
    // 🎖️ WALTER VIETNAM HELPER
    public static FormulaResult walterError(String vietnamMessage, String technicalError) {
        String message = "🎖️ WALTER VIETNAM FLASHBACK: " + vietnamMessage + " | Technical: " + technicalError;
        return new FormulaResult(false, message, null, "walter_vietnam_error");
    }
    
    // 🔮 GETTERS ET SETTERS
    public boolean isSuccess() {
        return success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public Object getData() {
        return data;
    }
    
    public String getFormulaType() {
        return formulaType;
    }
    
    public long getExecutionTimeMs() {
        return executionTimeMs;
    }
    
    public String getErrorCode() {
        return errorCode;
    }
    
    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
    
    // 🎖️ WALTER DIAGNOSTIC
    public boolean isWalterError() {
        return "walter_vietnam_error".equals(formulaType);
    }
    
    public boolean isCriticalError() {
        return !success && (errorCode != null && errorCode.startsWith("CRITICAL"));
    }
    
    @Override
    public String toString() {
        return String.format("FormulaResult{success=%s, message='%s', type='%s', time=%dms}", 
                            success, message, formulaType, executionTimeMs);
    }
} 