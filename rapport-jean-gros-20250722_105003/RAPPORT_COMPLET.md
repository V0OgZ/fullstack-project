# 📊 RAPPORT JEAN-GROS v2.0 FIXED - DUDE & VEGA EDITION (macOS)
*Généré le Tue Jul 22 10:50:03 CEST 2025*

## 🎯 OPTIMISATIONS
- 🎳 The Dude: Tests dédupliqués, analyse des dépendances
- 🔫 Vince Vega: Exécution parallèle, timeout brutal
- 🍎 macOS: Compatible avec les systèmes Apple

## 📋 TESTS LANCÉS EN PARALLÈLE

⏭️  SKIPPED: test-backend-conformity (included in test-complet-final)
⏭️  SKIPPED: run-all-hots-scenarios (included in test-complet-final)

## 📊 RÉSULTATS DES TESTS

### 🔧 backend-compile
✅ **SUCCÈS**
```
[INFO] Copying 35 resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.10.1:compile (default-compile) @ temporal-engine ---
[INFO] Nothing to compile - all classes are up to date
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.326 s
[INFO] Finished at: 2025-07-22T10:50:06+02:00
[INFO] ------------------------------------------------------------------------
```

### 🔧 backend-tests
❌ **ÉCHEC** (code: 1)
```
[ERROR] 
[ERROR] Please refer to /Users/admin/fullstack-project/backend/target/surefire-reports for the individual test results.
[ERROR] Please refer to dump files (if any exist) [date].dump, [date]-jvmRun[N].dump and [date].dumpstream.
[ERROR] -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
```

### 🔧 causality-wall
✅ **SUCCÈS**
```
💥 TEST 4: Collision causale
============================
📝 Exécution: MOV(Morgana, @15,15)
   Réponse: 


📊 État final du jeu
===================

✅ Test terminé!
```

### 🔧 quantum-maze
❌ **ÉCHEC** (code: 1)
```
🧩 TEST QUANTUM MAZE - HEROES OF TIME
=====================================
🔍 Vérification du backend...
❌ Backend non accessible
```

### 🔧 stress-test
❌ **ÉCHEC** (code: 1)
```
💥 === STRESS TEST MOTEUR HEROES OF TIME ===
💥 Démarrage des stress tests...
🎯 Backend: http://localhost:8080

[0;31m❌ Backend non accessible sur http://localhost:8080[0m
Veuillez démarrer le backend d'abord avec: cd backend && mvn spring-boot:run
```

### 🔧 ui-quick
✅ **SUCCÈS**
```
🐍 Python    14531 admin    3u  IPv4 0xead3b0072316628d      0t0  TCP *:5175 (LISTEN)
🐍 Python    14536 admin    4u  IPv6 0x79a8536d5e041502      0t0  TCP *:5174 (LISTEN)
🐍 Python    81844 admin    4u  IPv6 0x19991cc170cfb90a      0t0  TCP *:5170 (LISTEN)
🐍 Python    81845 admin    4u  IPv6 0x54f8f89c8ddf08b6      0t0  TCP *:5171 (LISTEN)
🐍 Python    81849 admin    4u  IPv6 0x7edf981d94f5a6e4      0t0  TCP *:5172 (LISTEN)

🏆 SCRIPT LÉGENDAIRE #150 TERMINÉ !
📊 Ajouté à ta collection de 261 scripts !
🎯 Que la FORCE temporelle soit avec toi !

```

### 🔧 vision-temporelle
✅ **SUCCÈS**
```
📝 Exécution: MOV(Alice, @15,15)
   Réponse: 

📝 Exécution: MOV(Bob, @15,15)
   Réponse: 

📊 État final du jeu
===================

✅ Test terminé!
```

## 🎳 THE DUDE'S FORMULA ANALYSIS

### Real formulas found:
```
./frontend/public/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "DESTRUCTIVE(ψ1, ψ2) + COLLAPSE_TEMPORAL_STATES() + REVERSE_TIME_IF_AHEAD(hero, 1)",
./frontend/public/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "CONSTRUCTIVE(ψ1, ψ2) + CONSTRUCTIVE(ψ2, ψ3) + TELEPORT_BY_PROBABILITY(hero, result)",
./frontend/public/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "AMPLIFY(ψ1, 3.0) + DESTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 0.5) + MODIFY_ENERGY(hero, -50) + CREATE_TEMPORAL_ECHO(hero)",
./frontend/public/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "FORCE_COLLAPSE_ALL(hero, 4) + AMPLIFY(energy_released, 2.0) + MODIFY_ENERGY(hero, energy_released)",
./frontend/public/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "CONDITIONAL_INTERFERENCE(hero.energy > 50, CONSTRUCTIVE(ψ1, ψ2), DESTRUCTIVE(ψ1, ψ2)) + AMPLIFY(result, 1.8)",
./frontend/public/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:    "TELEPORT_BY_PROBABILITY(hero, amplitude) - Téléporte selon la probabilité de l'amplitude", 
./frontend/public/game_assets/artifacts/artifacts.json:      "formula": "TELEPORT_HERO(hero, target_x, target_y) + CREATE_EFFECT(teleport_flash, 1)",
./frontend/public/game_assets/creatures/quantum/quantum-creatures.json:            "effect": "DESTRUCTIVE_NOVA",
./frontend/public/game_assets/creatures/quantum/quantum-creatures.json:            "effect": "PHASE_TELEPORT",
./frontend/public/game_assets/creatures/quantum/quantum-creatures.json:      "traits": ["CONSTRUCTIVE_BOOST", "DESTRUCTIVE_CANCEL", "RESONANCE_ATTACK"]
./frontend/build/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "DESTRUCTIVE(ψ1, ψ2) + COLLAPSE_TEMPORAL_STATES() + REVERSE_TIME_IF_AHEAD(hero, 1)",
./frontend/build/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "CONSTRUCTIVE(ψ1, ψ2) + CONSTRUCTIVE(ψ2, ψ3) + TELEPORT_BY_PROBABILITY(hero, result)",
./frontend/build/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "AMPLIFY(ψ1, 3.0) + DESTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 0.5) + MODIFY_ENERGY(hero, -50) + CREATE_TEMPORAL_ECHO(hero)",
./frontend/build/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "FORCE_COLLAPSE_ALL(hero, 4) + AMPLIFY(energy_released, 2.0) + MODIFY_ENERGY(hero, energy_released)",
./frontend/build/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:      "formula": "CONDITIONAL_INTERFERENCE(hero.energy > 50, CONSTRUCTIVE(ψ1, ψ2), DESTRUCTIVE(ψ1, ψ2)) + AMPLIFY(result, 1.8)",
./frontend/build/game_assets/artifacts/temporal/temporal-artifacts-advanced.json:    "TELEPORT_BY_PROBABILITY(hero, amplitude) - Téléporte selon la probabilité de l'amplitude", 
./frontend/build/game_assets/artifacts/artifacts.json:      "formula": "TELEPORT_HERO(hero, target_x, target_y) + CREATE_EFFECT(teleport_flash, 1)",
./frontend/build/game_assets/creatures/quantum/quantum-creatures.json:            "effect": "DESTRUCTIVE_NOVA",
./frontend/build/game_assets/creatures/quantum/quantum-creatures.json:            "effect": "PHASE_TELEPORT",
./frontend/build/game_assets/creatures/quantum/quantum-creatures.json:      "traits": ["CONSTRUCTIVE_BOOST", "DESTRUCTIVE_CANCEL", "RESONANCE_ATTACK"]
```

## 📊 STATISTIQUES FINALES

- ✅ Tests réussis : 4
- ❌ Tests échoués : 3
- ⏱️ Tests timeout : 0
- 📊 Taux de réussite : 57%
- ⏰ Temps total : 601s

## 💡 RECOMMANDATIONS

### 🎳 The Dude says:
- "Man, check out those timeout tests, they might be infinite loops"
- "Those JSON formulas need some love, lots of fake ones"

### 🔫 Vince Vega says:
- "Next time, we run even MORE in parallel"
- "Those slow tests? They're dead to me"

