# 🛋️ GUIDE PRATIQUE JEAN - FORMULES MODE LITTÉRAIRE

## 🌀 **COMMENT ÇA MARCHE CONCRÈTEMENT ?**

### 📡 **ENDPOINT PRINCIPAL**
```bash
POST http://localhost:8080/api/magic-formulas/execute
```

### 🎭 **STRUCTURE DE REQUÊTE**
```json
{
  "formula": "NOM_FORMULE",
  "context": {
    "metadata": {
      "parametre1": "valeur1",
      "parametre2": "valeur2"
    }
  }
}
```

---

## 🏛️ **FORMULES ARCHITECTE & ORACLE (Californiennes)**

### 🔮 **THE_SHARD - Compilation Transcendante**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "THE_SHARD", "context": {"metadata": {"javaCode": "System.out.println(\"MAGIC!\");"}}}' \
  http://localhost:8080/api/magic-formulas/execute
```
**Résultat:** *"🏛️ L'ARCHITECTE: Les fondations du code se réorganisent !"*

### 🔮 **COMPILE_JAVA_RUNTIME - Prophétie du Code**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "COMPILE_JAVA_RUNTIME", "context": {"metadata": {"className": "MaClasse"}}}' \
  http://localhost:8080/api/magic-formulas/execute
```
**Résultat:** *"🔮 ORACLE: Les prophéties du code se réalisent !"*

### 🏛️ **INIT_WORLD - Création Architecturale**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "INIT_WORLD", "context": {"metadata": {"worldName": "MonMonde"}}}' \
  http://localhost:8080/api/magic-formulas/execute
```
**Résultat:** *"🏛️ L'ARCHITECTE: Nouveau monde architecturé selon les plans cosmiques"*

### 🔮 **DELETE_WORLD - Apocalypse Prophétique**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "DELETE_WORLD", "context": {"metadata": {"worldId": "world_test"}}}' \
  http://localhost:8080/api/magic-formulas/execute
```
**Résultat:** *"🔮 ORACLE: Prophétie accomplie ! Le monde retourne au néant cosmique !"*

---

## 🎨 **FORMULES JEAN MODE LITTÉRAIRE**

### 🛋️ **SORT_DE_PRECEDENCE - Ordre Poétique**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "SORT_DE_PRECEDENCE", "context": {"metadata": {"mode": "jean_litteraire"}}}' \
  http://localhost:8080/api/magic-formulas/execute
```
**Résultat:** *"🎨 Mode Littéraire - Sort de Précédence appliqué !"*

### 🎭 **MODE_LITTERAIRE - Traduction Poétique**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "MODE_LITTERAIRE", "context": {"metadata": {"style": "poetique"}}}' \
  http://localhost:8080/api/magic-formulas/execute
```

### 🛋️ **PLANQUER_MOTEUR - Instance Isolée**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "PLANQUER_MOTEUR", "context": {"metadata": {"instance": "californienne"}}}' \
  http://localhost:8080/api/magic-formulas/execute
```

### 🌀 **INSTANCE_ISOLEE - Théâtre Séparé**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "INSTANCE_ISOLEE", "context": {"metadata": {"isolation": "complete"}}}' \
  http://localhost:8080/api/magic-formulas/execute
```

---

## ⚡ **FORMULES TIER 3-4 INTERMÉDIAIRES**

### 🪞 **REFLECT_MAGIC_DAMAGE**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "REFLECT_MAGIC_DAMAGE", "context": {"metadata": {}}}' \
  http://localhost:8080/api/magic-formulas/execute
```

### 🔄 **AUTO_COUNTER_SPELL**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "AUTO_COUNTER_SPELL", "context": {"metadata": {}}}' \
  http://localhost:8080/api/magic-formulas/execute
```

### 🎯 **COORDINATED_ATTACK**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "COORDINATED_ATTACK", "context": {"metadata": {}}}' \
  http://localhost:8080/api/magic-formulas/execute
```

---

## 🔋 **FORMULES GRUT TIER 1 STATELESS**

### ⚡ **ENERGY_ACCUMULATE - Pure Function**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "ENERGY_ACCUMULATE", "context": {"metadata": {"storedEnergy": 25}}}' \
  http://localhost:8080/api/magic-formulas/execute
```
**Résultat:** Calcul pur sans état serveur

### 💥 **CALCULATE_DAMAGE - Pure Calculation**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"formula": "CALCULATE_DAMAGE", "context": {"metadata": {"baseDamage": 50, "multiplier": 1.5}}}' \
  http://localhost:8080/api/magic-formulas/execute
```

---

## 🎯 **QU'EST-CE QU'ON PEUT FAIRE ?**

### 🚀 **TESTS RAPIDES**
```bash
# Test toutes les formules Jean
for formula in "SORT_DE_PRECEDENCE" "MODE_LITTERAIRE" "PLANQUER_MOTEUR" "INSTANCE_ISOLEE"; do
  echo "🧪 Test $formula:"
  curl -X POST -H "Content-Type: application/json" \
    -d "{\"formula\": \"$formula\", \"context\": {\"metadata\": {}}}" \
    http://localhost:8080/api/magic-formulas/execute | jq '.message'
  echo ""
done
```

### 🎭 **EXPÉRIMENTATIONS POSSIBLES**
1. **Chaîner les formules** - Appliquer plusieurs sorts en séquence
2. **Tester avec différents paramètres** - Modifier les métadonnées
3. **Comparer les réponses** - Architecte vs Oracle vs Jean
4. **Mesurer les performances** - executionTime dans les réponses
5. **Explorer les données** - Analyser les objets `data` retournés

### 🌟 **INTERFACES DISPONIBLES**
- **Port 8000** - Frontend Principal (Interface Temporal Engine)
- **Port 8001** - Panopticon GRUT React Dashboard  
- **Port 8080** - Backend API (Formules)
- **Port 9000** - Dashboard Monitoring

**🛋️ JEAN DEPUIS SON CANAPÉ :** *"Voilà ! Maintenant tu peux jouer avec toutes mes formules littéraires ! L'Architecte et l'Oracle parlent classe, et mes sorts de précédence font que tout s'exécute poétiquement !"* 