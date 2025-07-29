// 🔧 MODIFICATION pour FourthWallService.java
// Remplacer la méthode MOCK vinceInterInstanceShot par :

@Autowired
private EREqualsEPRService erEqualsEPRService;

/**
 * 🔫 Vince inter-instance shot - Utilisant le principe ER=EPR
 */
public Map<String, Object> vinceInterInstanceShot(String targetWorld, String targetId) {
    // Utiliser le vrai service ER=EPR au lieu du mock
    String vinceId = "hero_vince_vega"; // TODO: Get from context
    return erEqualsEPRService.vinceQuantumShot(vinceId, targetWorld, targetId);
}
