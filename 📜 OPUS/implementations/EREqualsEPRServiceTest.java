import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EREqualsEPRServiceTest {
    
    @Test
    public void testVinceQuantumShot() {
        // Arrange
        EREqualsEPRService service = new EREqualsEPRService();
        String vinceId = "hero_vince_vega";
        String targetWorld = "world_beta";
        String targetId = "enemy_001";
        
        // Act
        Map<String, Object> result = service.vinceQuantumShot(vinceId, targetWorld, targetId);
        
        // Assert
        assertTrue((Boolean) result.get("success"));
        assertNotNull(result.get("wormhole_id"));
        assertNotNull(result.get("entanglement_id"));
        assertEquals("ER = EPR démontré !", result.get("susskind_principle"));
        assertTrue((Boolean) result.get("target_eliminated"));
        
        System.out.println("✅ Test ER=EPR passé !");
    }
    
    @Test
    public void testWormholeTraversal() {
        // Test que Vince peut traverser son propre wormhole
        EREqualsEPRService service = new EREqualsEPRService();
        
        // D'abord créer un wormhole via un tir
        Map<String, Object> shotResult = service.vinceQuantumShot(
            "hero_vince_vega", "world_beta", "target_001"
        );
        String wormholeId = (String) shotResult.get("wormhole_id");
        
        // Puis traverser
        Map<String, Object> travelResult = service.vinceTraverseWormhole(
            "hero_vince_vega", wormholeId
        );
        
        assertTrue((Boolean) travelResult.get("success"));
        assertEquals("0ms (non-local)", travelResult.get("travel_time"));
    }
}
