# 🏛️ MUSEUM - Scripts Obsolètes v2

**Date d'archivage** : 21 Juillet 2025  
**Raison** : Nettoyage après intégration architecture JSON HSP  
**Session** : Finalisation Heroes of Time avec tests JSON  

---

## 📦 **SCRIPTS ARCHIVÉS**

### 🔧 **Scripts de Fix Backend**
- `apply-backend-fixes.sh` - Fix ancien du backend
- `fix-backend-jpa-issue.sh` - Tentative de fix JPA (remplacé par corrections manuelles)

### 📊 **Scripts de Benchmark**
- `benchmark-coherent-comparison.sh` - Comparaison performance 
- `benchmark-java-vs-hots-with-metrics.sh` - Benchmark Java vs HOTS
- `benchmark-performance-comparison.sh` - Comparaison performance générale

### 📁 **Dossiers d'Archives**
- `archives/` - Ancien dossier d'archives (déplacé)
- `archive-scripts-test/` - Scripts de test obsolètes

---

## ✅ **REMPLACEMENTS MODERNES**

### **Backend Fix**
- **Ancien** : `apply-backend-fixes.sh`, `fix-backend-jpa-issue.sh`
- **Nouveau** : Corrections JPA directes dans code (Game.java, PsiState.java)
- **Status** : ✅ Backend fonctionne parfaitement

### **Tests**
- **Ancien** : Scripts éparpillés dans `archive-scripts-test/`
- **Nouveau** : 
  - `test-jean-gros-v2-FIXED.sh` - Tests classiques
  - `test-jean-gros-v3-with-json.sh` - Tests avec JSON
  - Scripts JSON : `test-*-json-*.sh`
- **Status** : ✅ Architecture unifiée

### **Benchmarks**
- **Ancien** : Multiples scripts benchmark séparés
- **Nouveau** : Intégrés dans `./hots test performance`
- **Status** : ✅ Centralisé dans script principal

---

## 🎯 **SCRIPTS ACTIFS ACTUELS**

### **Script Principal**
- `./hots` - Script de contrôle principal (mis à jour avec tests JSON)

### **Tests Modernes**
- `scripts/test-jean-gros-v2-FIXED.sh` - Tests classiques
- `scripts/test-jean-gros-v3-with-json.sh` - Tests avec architecture JSON
- `scripts/test-panopticon-json-scenario.sh` - Test PANOPTICΩN JSON
- `scripts/test-duel-collapse-json.sh` - Test duel collapse JSON  
- `scripts/test-json-scenario-runner.sh` - Runner générique JSON

### **Scripts Actifs**
- `scripts/actifs/` - Scripts de démarrage/arrêt services
- `scripts/test/` - Collection tests spécialisés
- `scripts/utils/` - Utilitaires actifs

---

## 🛋️ **POUR JEAN**

Ces scripts obsolètes sont conservés au MUSEUM mais ne sont plus utilisés. 

**L'architecture moderne fonctionne avec :**
- ✅ `./hots test json` - Tests architecture HSP  
- ✅ `./hots test jean-gros` - Tests complets v2/v3
- ✅ Backend JPA fixé et opérationnel
- ✅ Scripts JSON intégrés au système principal

**TL;DR** : Tout fonctionne, archives conservées pour l'histoire ! 🎳

---

*"These scripts abided in their time, now they rest in digital eternity."*

**Archivé le 21 Juillet 2025 après victoire backend + JSON** 