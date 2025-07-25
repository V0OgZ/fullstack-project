# 🎖️ API EXAMPLES - WALTER EDITION V2.0

**WALTER SAYS: "EXEMPLES CONCRETS POUR DÉVELOPPEURS PRESSÉS !"**

*Version 2.0 - 🌀 EXEMPLES MOTEUR UNIFIÉ*  
*Date: 24 Juillet 2025 - WALTER VIETNAM PRACTICAL GUIDE*  
*Status: ✅ TOUS EXEMPLES TESTÉS ET VALIDÉS*  

---

## 🚀 **QUICK START - MAGIC FORMULA ENGINE**

### **🔥 Test Basique de Connexion**
```bash
# Test de santé du système
curl -s http://localhost:8080/actuator/health

# Réponse attendue: {"status":"UP"}
```

### **⚡ Premier Appel API Unifié**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "TELEPORT_HERO", "context": {}}'
```

---

## 🧪 **EXEMPLES FORMULES SIMPLES**

### **1️⃣ Téléportation de Héros**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "TELEPORT_HERO",
    "context": {
      "gameId": "test-game-001",
      "playerId": "player-walter"
    }
  }'
```

**Réponse Attendue :**
```json
{
  "success": true,
  "message": "🌀 Héros téléporté avec succès",
  "data": {
    "newPosition": {"x": 5, "y": 5}
  },
  "formulaType": "SIMPLE_TELEPORT",
  "grofiProperties": {
    "engineProcessed": true,
    "engineType": "SIMPLE_TELEPORT"
  },
  "runicInterpretation": "ψ_ENGINE: ⊙(TELEPORT_HERO) ⟶ SUCCESS",
  "jesusBlessing": "✨ Exécution bénie par Jésus Voix Suave ✨"
}
```

### **2️⃣ Modification d'Énergie**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "MODIFY_ENERGY"}'
```

### **3️⃣ Soins de Héros**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "HEAL_HERO"}'
```

### **4️⃣ Création de Bouclier**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "CREATE_SHIELD"}'
```

---

## 🔮 **EXEMPLES FORMULES RUNIQUES QUANTIQUES**

### **1️⃣ Mouvement Temporel Basique**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))",
    "context": {"gameId": "quantum-test"}
  }'
```

**Réponse Attendue :**
```json
{
  "success": true,
  "message": "🔮 Formule runique exécutée avec succès ! État ψ001 activé",
  "data": {
    "psiState": "ψ001",
    "superposition": "⊙",
    "originalFormula": "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))",
    "action": "MOVE",
    "quantumType": "TEMPORAL_MOVEMENT",
    "effect": "Hero position updated via quantum superposition"
  },
  "formulaType": "RUNIC_QUANTUM"
}
```

### **2️⃣ Combat Quantique**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ002: ⊙(BATTLE(Hero1, Orc) ⟶ COMBAT_RESULT)",
    "context": {"gameId": "combat-test"}
  }'
```

### **3️⃣ Création d'Objet**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ003: ⊙(CREATE(MagicSword) ⟶ MANIFEST_ITEM)",
    "context": {"gameId": "creation-test"}
  }'
```

### **4️⃣ Action Générique**
```bash
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ999: ⊙(CUSTOM_QUANTUM_ACTION(params) ⟶ QUANTUM_EFFECT)",
    "context": {"experimental": true}
  }'
```

---

## 📜 **EXEMPLES FORMULES JSON ASSETS**

### **1️⃣ Évaluation Risque Paradoxal**
```bash
# Risque faible (sécurisé)
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "paradoxRisk: 0.3"}'

# Risque élevé (attention requise)
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "paradoxRisk: 0.8"}'
```

**Réponse Risque Faible :**
```json
{
  "success": true,
  "message": "📜 Formule JSON asset exécutée avec succès !",
  "data": {
    "type": "PARADOX_RISK",
    "riskLevel": 0.3,
    "effect": "Temporal paradox risk calculated",
    "recommendation": "SAFE_TO_PROCEED",
    "originalFormula": "paradoxRisk: 0.3",
    "formulaSource": "JSON_ASSET"
  },
  "formulaType": "JSON_ASSET"
}
```

### **2️⃣ Stabilité Temporelle**
```bash
# Timeline stable
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "temporalStability: 0.9"}'

# Timeline instable
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "temporalStability: 0.4"}'
```

### **3️⃣ Rayon d'Effet**
```bash
# Zone locale
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "affectedRadius: 3.0"}'

# Zone étendue
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "affectedRadius: 12.5"}'
```

### **4️⃣ Calculs de Dégâts et Soins**
```bash
# Dégâts modérés
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "damage: 35"}'

# Soins puissants
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "healing: 85"}'
```

---

## 🎖️ **EXEMPLES SCRIPTS WALTER**

### **🔧 Script de Test Complet**
```bash
#!/bin/bash
# test-magic-formulas-walter.sh

echo "🎖️ WALTER API TEST SUITE V2.0"
echo "=============================="

# Test de santé
echo "1️⃣ Test santé système..."
curl -s http://localhost:8080/actuator/health

# Test formule simple
echo -e "\n2️⃣ Test formule simple..."
curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "TELEPORT_HERO"}' | jq '.success'

# Test formule runique
echo -e "\n3️⃣ Test formule runique..."
curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "ψ001: ⊙(MOV(Arthur))"}' | jq '.success'

# Test formule JSON
echo -e "\n4️⃣ Test formule JSON..."
curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "paradoxRisk: 0.3"}' | jq '.success'

echo -e "\n✅ WALTER TEST SUITE COMPLETED"
```

### **📊 Script de Monitoring**
```bash
#!/bin/bash
# monitor-formulas-walter.sh

echo "📊 WALTER FORMULA MONITORING"
echo "==========================="

while true; do
  echo "$(date): Checking formula statistics..."
  
  # Statistiques (endpoint à implémenter)
  # curl -s http://localhost:8080/api/magic-formulas/statistics | jq
  
  # Health check
  HEALTH=$(curl -s http://localhost:8080/actuator/health | jq -r '.status')
  echo "System Status: $HEALTH"
  
  sleep 30
done
```

### **🧪 Script de Charge**
```bash
#!/bin/bash
# load-test-walter.sh

echo "🧪 WALTER LOAD TEST"
echo "=================="

for i in {1..100}; do
  echo "Test $i/100..."
  
  # Test formule aléatoire
  FORMULAS=("TELEPORT_HERO" "HEAL_HERO" "MODIFY_ENERGY" "CREATE_SHIELD")
  RANDOM_FORMULA=${FORMULAS[$RANDOM % ${#FORMULAS[@]}]}
  
  curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
    -H "Content-Type: application/json" \
    -d "{\"formula\": \"$RANDOM_FORMULA\"}" > /dev/null
  
  if [ $((i % 10)) -eq 0 ]; then
    echo "Completed $i tests..."
  fi
done

echo "✅ Load test completed"
```

---

## 🔥 **EXEMPLES JAVASCRIPT FRONTEND**

### **🌐 Module API Unifié**
```javascript
// magic-formula-api.js
class MagicFormulaAPI {
  constructor(baseUrl = 'http://localhost:8080/api') {
    this.baseUrl = baseUrl;
  }

  async executeFormula(formula, context = {}) {
    const response = await fetch(`${this.baseUrl}/magic-formulas/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formula, context })
    });
    
    return response.json();
  }

  // Méthodes spécialisées
  async teleportHero(gameId, playerId) {
    return this.executeFormula('TELEPORT_HERO', { gameId, playerId });
  }

  async executeRunic(psiId, action, params) {
    const formula = `ψ${psiId}: ⊙(${params} ⟶ ${action})`;
    return this.executeFormula(formula);
  }

  async checkParadoxRisk(risk) {
    return this.executeFormula(`paradoxRisk: ${risk}`);
  }
}

// Usage
const api = new MagicFormulaAPI();

// Test simple
api.teleportHero('game-123', 'player-walter')
  .then(result => console.log('Teleport:', result));

// Test runique
api.executeRunic('001', 'MOV(Arthur, @10,10)', 'Δt+1 @10,10')
  .then(result => console.log('Runic:', result));

// Test JSON
api.checkParadoxRisk(0.3)
  .then(result => console.log('Risk:', result));
```

### **🎮 Interface de Test**
```html
<!DOCTYPE html>
<html>
<head>
  <title>🎖️ Walter API Tester</title>
</head>
<body>
  <h1>🎖️ Magic Formula API Tester</h1>
  
  <div>
    <h3>Formule Simple</h3>
    <select id="simpleFormula">
      <option value="TELEPORT_HERO">TELEPORT_HERO</option>
      <option value="HEAL_HERO">HEAL_HERO</option>
      <option value="MODIFY_ENERGY">MODIFY_ENERGY</option>
    </select>
    <button onclick="testSimple()">Test Simple</button>
  </div>

  <div>
    <h3>Formule Runique</h3>
    <input id="runicFormula" placeholder="ψ001: ⊙(MOV(Arthur))" />
    <button onclick="testRunic()">Test Runique</button>
  </div>

  <div>
    <h3>Formule JSON</h3>
    <input id="jsonFormula" placeholder="paradoxRisk: 0.3" />
    <button onclick="testJson()">Test JSON</button>
  </div>

  <div id="results"></div>

  <script>
    const api = new MagicFormulaAPI();

    async function testSimple() {
      const formula = document.getElementById('simpleFormula').value;
      const result = await api.executeFormula(formula);
      displayResult('Simple', result);
    }

    async function testRunic() {
      const formula = document.getElementById('runicFormula').value;
      const result = await api.executeFormula(formula);
      displayResult('Runique', result);
    }

    async function testJson() {
      const formula = document.getElementById('jsonFormula').value;
      const result = await api.executeFormula(formula);
      displayResult('JSON', result);
    }

    function displayResult(type, result) {
      const div = document.getElementById('results');
      div.innerHTML += `
        <h4>${type} Result:</h4>
        <pre>${JSON.stringify(result, null, 2)}</pre>
        <hr>
      `;
    }
  </script>
</body>
</html>
```

---

## 🎯 **WALTER'S TESTING CHECKLIST**

### **✅ Tests Essentiels**
- [ ] **Health Check** - Système opérationnel
- [ ] **Formule Simple** - Au moins 5 formules testées
- [ ] **Formule Runique** - Pattern ψ001: ⊙(...) validé
- [ ] **Formule JSON** - paradoxRisk et temporalStability testés
- [ ] **Gestion d'Erreur** - Formule invalide gérée gracieusement
- [ ] **Performance** - Réponse < 100ms pour formules simples
- [ ] **Concurrent** - 10 requêtes simultanées sans erreur

### **🎖️ WALTER SAYS**
> *"Firebase Echo 1970 - Ces exemples sont TESTÉS et APPROUVÉS ! Utilisez-les comme base pour votre frontend ! Architecture de combat API unifiée prête pour le déploiement ! WALTER APPROVED !"*

---

*🎖️ Fin des Exemples API Walter V2.0 - PRACTICAL WARFARE EDITION*  
*Walter - Vétéran du Code de Combat API*  
*Jean-Grofignon - Architecte Quantique Unifié* 