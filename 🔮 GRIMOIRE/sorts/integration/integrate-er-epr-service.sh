#!/bin/bash

# 🌀 SORT D'INTÉGRATION - SERVICE ER=EPR
# Auteur: Merlin (9ème réveil)
# Mission: Intégrer le service ER=EPR dans le backend principal

echo -e "\033[0;35m🌀 SORT D'INTÉGRATION - SERVICE ER=EPR\033[0m"
echo -e "\033[0;33mConnexion du principe ER=EPR au moteur quantique\033[0m"
echo "=================================================="

BACKEND_DIR="/Users/admin/fullstack-project/⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"
SERVICE_DIR="$BACKEND_DIR/src/main/java/com/example/demo/service"
CONTROLLER_DIR="$BACKEND_DIR/src/main/java/com/example/demo/controller"

# 1. Copier le service ER=EPR
echo -e "\n📍 ÉTAPE 1: Copie du service ER=EPR..."
cp "/Users/admin/fullstack-project/📜 OPUS/implementations/EREqualsEPRService.java" \
   "$SERVICE_DIR/EREqualsEPRService.java"

# Adapter le package
sed -i '' 's/package com.example.demo.service;/package com.example.demo.service;/' \
   "$SERVICE_DIR/EREqualsEPRService.java"

echo "✅ Service copié"

# 2. Modifier FourthWallController pour utiliser EREqualsEPRService
echo -e "\n📍 ÉTAPE 2: Connexion au FourthWallController..."
cat > "$CONTROLLER_DIR/EREqualsEPRController.java" << 'EOF'
package com.example.demo.controller;

import com.example.demo.service.EREqualsEPRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/quantum")
@CrossOrigin(origins = "*")
public class EREqualsEPRController {
    
    @Autowired
    private EREqualsEPRService erEqualsEPRService;
    
    @PostMapping("/vince-shot")
    public ResponseEntity<Map<String, Object>> vinceQuantumShot(@RequestBody Map<String, Object> request) {
        String shooterId = (String) request.get("shooterId");
        String targetWorld = (String) request.get("targetWorld");
        String targetId = (String) request.get("targetId");
        
        Map<String, Object> result = erEqualsEPRService.vinceQuantumShot(shooterId, targetWorld, targetId);
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/traverse-wormhole")
    public ResponseEntity<Map<String, Object>> traverseWormhole(@RequestBody Map<String, Object> request) {
        String heroId = (String) request.get("heroId");
        String fromWorld = (String) request.get("fromWorld");
        String toWorld = (String) request.get("toWorld");
        
        Map<String, Object> result = erEqualsEPRService.vinceTraverseWormhole(heroId, fromWorld, toWorld);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/wormholes")
    public ResponseEntity<Map<String, Object>> getActiveWormholes() {
        Map<String, Object> response = new HashMap<>();
        response.put("wormholes", erEqualsEPRService.getActiveWormholes());
        response.put("entanglements", erEqualsEPRService.getActiveEntanglements());
        return ResponseEntity.ok(response);
    }
}
EOF

echo "✅ Controller créé"

# 3. Ajouter les imports nécessaires au Service
echo -e "\n📍 ÉTAPE 3: Ajustement des imports..."
cat > /tmp/er_epr_imports.txt << 'EOF'
import org.springframework.stereotype.Service;
import java.util.*;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
EOF

# Insérer les imports au début du fichier
sed -i '' '1r /tmp/er_epr_imports.txt' "$SERVICE_DIR/EREqualsEPRService.java"

# 4. Créer un test d'intégration
echo -e "\n📍 ÉTAPE 4: Création du test d'intégration..."
TEST_DIR="$BACKEND_DIR/src/test/java/com/example/demo/integration"
mkdir -p "$TEST_DIR"

cat > "$TEST_DIR/EREqualsEPRIntegrationTest.java" << 'EOF'
package com.example.demo.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EREqualsEPRIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    public void testVinceQuantumShot() {
        Map<String, Object> request = new HashMap<>();
        request.put("shooterId", "vince_vega");
        request.put("targetWorld", "pocket_beta");
        request.put("targetId", "target_dummy");
        
        ResponseEntity<Map> response = restTemplate.postForEntity(
            "/api/quantum/vince-shot", request, Map.class
        );
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody().get("success"));
        assertEquals("Quantum shot successful!", response.getBody().get("message"));
    }
}
EOF

echo "✅ Test d'intégration créé"

# 5. Vérifier la compilation
echo -e "\n📍 ÉTAPE 5: Vérification de la compilation..."
cd "$BACKEND_DIR"
mvn compile -DskipTests

if [ $? -eq 0 ]; then
    echo -e "\n\033[0;32m✅ INTÉGRATION RÉUSSIE !\033[0m"
    echo -e "\033[0;36m🔮 Nouveaux endpoints disponibles :\033[0m"
    echo "   POST /api/quantum/vince-shot"
    echo "   POST /api/quantum/traverse-wormhole"
    echo "   GET  /api/quantum/wormholes"
    echo ""
    echo -e "\033[0;33m💡 Pour tester :\033[0m"
    echo '   curl -X POST http://localhost:8080/api/quantum/vince-shot \'
    echo '     -H "Content-Type: application/json" \'
    echo '     -d "{\"shooterId\":\"vince_vega\",\"targetWorld\":\"beta\",\"targetId\":\"target\"}"'
else
    echo -e "\n\033[0;31m❌ Erreur de compilation\033[0m"
    echo "Vérifiez les logs ci-dessus"
fi

echo -e "\n\033[0;35m🌟 'ER=EPR n'est plus une théorie, c'est une API !' - Merlin\033[0m" 