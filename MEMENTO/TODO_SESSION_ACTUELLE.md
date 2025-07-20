# 📋 SUPER TODO SESSION ACTUELLE - MEMENTO
*Session du 20 juillet 2025 avec Jean Grofignon*

## 🎯 SUPER TODO - OBJECTIFS MAJEURS

### 1️⃣ FIXER LE BACKEND JPA
**Problème** : "Not a managed type: class Game"
- [ ] Analyser l'erreur complète
- [ ] Vérifier les annotations @Entity
- [ ] Tester avec SimpleStartupTest.java
- [ ] Documenter la solution dans MEMENTO

### 2️⃣ IMPLÉMENTER PARSER GROFI ✅
**Symboles** : Σ, †, Ω, ↯
- [x] Étendre DynamicFormulaParser
- [x] Ajouter les nouveaux symboles
- [x] Créer méthodes d'implémentation
- [x] Créer script de test
- [ ] Tester avec backend fonctionnel

### 3️⃣ NETTOYER LES JSON
**Objectif** : Supprimer formules décoratives
- [x] Identifier tous les JSON avec formules
- [x] Marquer vraies vs fausses formules
- [ ] Nettoyer ou archiver les fausses
- [ ] Mettre à jour la doc

## 📝 SUB-TODOS - TÂCHES DÉTAILLÉES

### 🔧 Backend & Tests
- [x] Créer test-causality-wall.sh
- [x] Créer test-vision-temporelle.sh
- [x] Créer test-quantum-maze.sh
- [x] Créer test-jean-gros (v1, v2, simple)
- [x] Créer test-amplitude-grofi.sh
- [ ] Fixer problème timeout macOS
- [ ] Automatiser lancement backend

### 📚 Documentation & Organisation
- [x] Créer MEMENTO/
- [x] Mettre à jour .cursorrules
- [x] Créer ARBORESCENCE_MAP_COMPLETE.md v2.0
- [x] Créer JEAN_MESSAGES_BEST_OF.md
- [x] Documenter intégration amplitudes & GROFI
- [x] Créer rapport amplitude vs formula
- [ ] Créer guide quantum_maze.hots

### 🎮 Gameplay & Features
- [x] Connecter mur de causalité
- [x] Implémenter vision temporelle
- [x] Intégrer amplitudes dans formules
- [x] Implémenter symboles GROFI
- [ ] Tester quantum_maze.hots
- [ ] Implémenter immunités causales
- [ ] Server load → collapse auto
- [ ] WebSocket temps réel

### 🧹 Nettoyage & Optimisation
- [ ] Nettoyer rapport-jean-gros-*
- [ ] Archiver vieux logs
- [ ] Optimiser scripts de test
- [ ] Créer .gitignore pour logs

## ✅ FAIT AUJOURD'HUI

### Implémentations
1. **Mur de causalité** - Connecté dans moveGameHero()
2. **Vision temporelle** - Magic spyglass +3 jours
3. **Temps individuel** - Chaque héros a son propre temps
4. **Amplitudes dans formules** - CREATE_AMPLITUDE, SET_AMPLITUDE, etc.
5. **Symboles GROFI** - Σ, †, Ω, ↯ implémentés

### Tests créés
- test-causality-wall.sh
- test-vision-temporelle.sh
- test-quantum-maze.sh
- test-jean-gros.sh (3 versions)
- test-amplitude-grofi.sh

### Documentation
- MEMENTO/ organisé
- .cursorrules mis à jour
- Arborescence v2.0 complète
- Architecture mise à jour avec amplitudes & GROFI
- Rapport amplitude vs formula créé

## 🔍 DÉCOUVERTES IMPORTANTES

### Pépites
- **62 fichiers .hots** au total
- **quantum_maze.hots** - Puzzle complet !
- **SCRIPT-151-LEGENDAIRE.sh** dans MUSEUM
- **quantum_artifacts_tier6.json** - Niveau 6 !
- **ComplexAmplitude** vraiment utilisé dans le code

### Problèmes
- Backend JPA ne démarre pas
- `timeout` pas sur macOS
- `amplitudeFormula` dans JSON inutilisé (décoratif)

## 💡 PROCHAINE SESSION

1. **PRIORITÉ 1** : Fixer backend JPA
2. **PRIORITÉ 2** : Tester GROFI avec backend
3. **PRIORITÉ 3** : Nettoyer les JSON
4. **PRIORITÉ 4** : Tester quantum_maze

## 🆕 NOUVELLES FORMULES DISPONIBLES

### Amplitudes
- `CREATE_AMPLITUDE(real, imag)` - Créer amplitude complexe
- `SET_AMPLITUDE(ψ, real, imag)` - Définir amplitude d'un état
- `AMPLITUDE_FROM_FORMULA("(0.8+0.6i)")` - Parser depuis texte

### GROFI
- `Σ[REDUCE:0.2]` - Réduire amplitudes de 20%
- `†[]` - Mort/Renaissance quantique
- `Ω[]` - Collapse total + verrouillage
- `↯[]` - Effet chaotique aléatoire

---
*Dernière mise à jour : 20 juillet 2025 - 10h45*
*Règle du canapé : TOUJOURS pusher les analyses avant de coder !* 