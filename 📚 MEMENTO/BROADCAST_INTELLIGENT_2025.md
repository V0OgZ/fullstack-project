# 📡 BROADCAST INTELLIGENT - Heroes of Time
*Système de communication temps réel optimisé pour éviter la surcharge serveur*

---

## 🎯 **PROBLÈME RÉSOLU**

**WebSocket commenté** pour éviter la surcharge serveur, mais besoin de communication temps réel pour les événements critiques.

**Solution** : Système de broadcast intelligent qui :
- ✅ Broadcast seulement les événements critiques
- ✅ Utilise API REST au lieu de WebSocket
- ✅ Queue intelligente pour éviter le spam
- ✅ Économie de ressources serveur

---

## 🏗️ **ARCHITECTURE**

### **Frontend - SmartBroadcastSystem**
```javascript
class SmartBroadcastSystem {
    constructor() {
        this.broadcastQueue = [];
        this.lastBroadcast = 0;
        this.broadcastInterval = 2000; // 2 secondes
        this.criticalEvents = new Set([
            'COLLAPSE_CAUSAL',
            'HERO_DEATH', 
            'BOSS_ACTION',
            'SCENARIO_PHASE_CHANGE',
            'CAPACITY_SPECIALE_ACTIVEE',
            'FORGE_DANGEREUSE'
        ]);
    }
}
```

### **Backend - Endpoint Broadcast Intelligent**
```java
@PostMapping("/broadcast")
public ResponseEntity<Map<String, Object>> broadcastEvent(@RequestBody Map<String, Object> request) {
    // Vérification des événements critiques
    // Traitement spécifique par type
    // Log des événements importants
}
```

---

## 📋 **ÉVÉNEMENTS CRITIQUES**

### **1. COLLAPSE_CAUSAL**
- **Déclencheur** : Effondrement d'état quantique
- **Impact** : Changement majeur de réalité
- **Broadcast** : ✅ OBLIGATOIRE

### **2. HERO_DEATH**
- **Déclencheur** : Mort d'un héros
- **Impact** : Changement d'équilibre du jeu
- **Broadcast** : ✅ OBLIGATOIRE

### **3. BOSS_ACTION**
- **Déclencheur** : Action d'Omega-Zéro ou Abyme
- **Impact** : Événement narratif majeur
- **Broadcast** : ✅ OBLIGATOIRE

### **4. SCENARIO_PHASE_CHANGE**
- **Déclencheur** : Changement de phase dans un scénario
- **Impact** : Progression narrative
- **Broadcast** : ✅ OBLIGATOIRE

### **5. CAPACITY_SPECIALE_ACTIVEE**
- **Déclencheur** : Activation d'une capacité spéciale
- **Impact** : Pouvoir épique utilisé
- **Broadcast** : ✅ OBLIGATOIRE

### **6. FORGE_DANGEREUSE**
- **Déclencheur** : Création d'un objet dangereux
- **Impact** : Risque de crash serveur
- **Broadcast** : ✅ OBLIGATOIRE

---

## 🚫 **ÉVÉNEMENTS NON-CRITIQUES (IGNORÉS)**

### **HERO_MOVEMENT**
- Mouvement normal des héros
- Pas de broadcast pour économiser les ressources

### **ARTIFACT_USE**
- Utilisation d'artefacts normaux
- Pas de broadcast nécessaire

### **TURN_END**
- Fin de tour normale
- Pas de broadcast requis

### **UI_UPDATE**
- Mises à jour d'interface
- Pas de broadcast critique

---

## 🔧 **IMPLÉMENTATION**

### **Frontend - Utilisation**
```javascript
// Broadcast critique (sera envoyé)
await window.smartBroadcast.broadcastCriticalEvent('BOSS_ACTION', {
    boss: 'Omega-Zero',
    action: 'PRE_EXISTENCE_STRIKE'
});

// Broadcast non-critique (sera ignoré)
await window.smartBroadcast.broadcastCriticalEvent('HERO_MOVEMENT', {
    hero: 'Jean-Grofignon',
    action: 'MOV'
});
```

### **Backend - Traitement**
```java
// Vérification automatique
if (!criticalEvents.contains(eventType)) {
    response.put("ignored", true);
    return ResponseEntity.ok(response);
}

// Traitement spécifique
switch (eventType) {
    case "BOSS_ACTION":
        handleBossActionBroadcast(data, gameId);
        break;
    // ...
}
```

---

## 📊 **OPTIMISATIONS**

### **Queue Intelligente**
- **Intervalle** : 2 secondes entre broadcasts
- **Queue** : Événements en attente si trop fréquents
- **Nettoyage** : Suppression automatique des anciens événements

### **Filtrage Avant Envoi**
- **Vérification** : Seuls les événements critiques sont traités
- **Logging** : Traçabilité des événements ignorés
- **Performance** : Économie de bande passante

### **Traitement Spécifique**
- **Handlers** : Gestion spécialisée par type d'événement
- **Logs** : Messages informatifs pour le debugging
- **Extensibilité** : Facile d'ajouter de nouveaux types

---

## 🧪 **TESTS**

### **Script de Test**
```bash
./scripts/test/test-capacites-speciales.sh
```

### **Tests Inclus**
1. **Broadcast critique** - Vérification envoi
2. **Broadcast non-critique** - Vérification ignorance
3. **Queue de broadcast** - Test de la file d'attente
4. **Performance** - Mesure de l'économie de ressources

### **Résultats Attendus**
- ✅ Événements critiques broadcastés
- ✅ Événements non-critiques ignorés
- ✅ Pas de surcharge serveur
- ✅ Logs informatifs

---

## 🎮 **INTÉGRATION JEU**

### **Capacités Spéciales**
```javascript
// Dans runic-forge.js
if (result.forgedObject.isDangerous) {
    await window.smartBroadcast.broadcastCriticalEvent('FORGE_DANGEREUSE', {
        objectName: name,
        riskLevel: result.forgedObject.stabilityRating
    });
}
```

### **Scénarios Épiques**
```javascript
// Dans les scénarios
if (capacity.includes('OMEGA') || capacity.includes('NONEXISTENCE')) {
    await window.smartBroadcast.broadcastCriticalEvent('CAPACITY_SPECIALE_ACTIVEE', {
        capacity: capacity,
        hero: hero,
        critical: true
    });
}
```

### **Interface UI**
```javascript
// Dans ui-enhancements.js
// Traitement périodique de la queue
setInterval(() => {
    window.smartBroadcast.processQueue();
}, 1000);
```

---

## 📈 **AVANTAGES**

### **Performance**
- **Économie serveur** : Pas de WebSocket constant
- **Bande passante** : Seuls les événements importants
- **CPU** : Traitement minimal des événements

### **Maintenabilité**
- **Code simple** : API REST standard
- **Debugging facile** : Logs clairs
- **Extensibilité** : Ajout facile de nouveaux types

### **Fiabilité**
- **Pas de crash** : Évite la surcharge
- **Queue robuste** : Gestion des pics
- **Fallback** : Fonctionne même si broadcast échoue

---

## 🔮 **ÉVOLUTIONS FUTURES**

### **WebSocket Optionnel**
- Réactivation WebSocket pour les événements critiques
- Fallback sur API REST si WebSocket indisponible
- Configuration par environnement

### **Notifications Push**
- Intégration notifications navigateur
- Alertes pour événements critiques
- Configuration utilisateur

### **Analytics**
- Métriques de broadcast
- Statistiques d'utilisation
- Optimisation continue

---

## 📝 **CONCLUSION**

Le système de broadcast intelligent résout le problème de surcharge serveur tout en maintenant la communication temps réel pour les événements critiques.

**Bénéfices** :
- ✅ Performance optimisée
- ✅ Communication temps réel préservée
- ✅ Code maintenable
- ✅ Tests automatisés

**Résultat** : Un système robuste qui évite la surcharge serveur tout en gardant l'expérience utilisateur fluide ! 🚀

---

*"Le broadcast intelligent : quand la performance rencontre l'épique !"* 📡⚔️ 