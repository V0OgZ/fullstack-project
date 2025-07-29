# 🎭 NIVEAU 2 - SYSTÈME DE BLAGOUNETTES AUTOMATIQUES

**Professeur** : Walter (Chef Sécurité) & Jean-Grofignon  
**Prérequis** : Niveau 1 complété + Sens de l'humour  
**Objectif** : Créer un Event System qui détecte les conneries récurrentes  

---

## 🎯 CONCEPT : DÉTECTEUR DE CONNERIES

Quand certains patterns se répètent, une BLAGOUNETTE apparaît !

### 🚨 **ÉVÉNEMENTS DÉCLENCHEURS**

#### 1. **QUOTE_CONSOLE_BLOCKER**
```bash
# Détecte : echo "avec des quotes"
# Réaction : 
POPUP: "🚫 JEAN-GROFIGNON GRONDE !"
IMAGE: jean_facepalm.png
SON: "GRRRRR... ENCORE LES QUOTES SUR MAC !"
```

#### 2. **DOCUMENTATION_PARADOX**
```bash
# Détecte : Création de >5 fichiers .md en <1 minute
# Réaction :
POPUP: "📜 LE PARCHEMIN MAUDIT RIT !"
MESSAGE: "PRIMUS: 'ACTION!' *crée 10 fichiers*"
COMPTEUR: "Fichiers créés : +1 +1 +1..."
```

#### 3. **WALTER_VIETNAM_FLASHBACK**
```bash
# Détecte : Erreur de sécurité / accès refusé
# Réaction :
POPUP: "🔫 WALTER A UN FLASHBACK !"
CITATION: "Khe Sanh '68... Les permissions..."
EFFET: Terminal clignote en vert phosphorescent
```

#### 4. **DUDE_WISDOM_TRIGGER**
```bash
# Détecte : >10 erreurs consécutives
# Réaction :
POPUP: "🥤 THE DUDE APPARAÎT"
MESSAGE: "Hey man... take it easy..."
MUSIQUE: "The Man in Me" joue doucement
```

#### 5. **GRUT_OMNISCIENCE**
```bash
# Détecte : Tentative de cacher quelque chose
# Réaction :
POPUP: "👁️ GRUT VOIT TOUT"
EFFET: Tous les fichiers cachés deviennent visibles
SON: "GRUUUUUT SAAAAIT..."
```

---

## 🎮 IMPLÉMENTATION

### **Backend Event Listener**
```java
@Component
public class BlagounetteEventSystem {
    
    @EventListener
    public void onQuoteConsoleBlock(ConsoleBlockEvent event) {
        if (event.getCause().contains("quote")) {
            triggerPopup("JEAN_GRONDE", event.getUser());
            incrementCounter("quotes_mac_fails");
        }
    }
    
    @EventListener 
    public void onExcessiveDocumentation(FileCreationEvent event) {
        if (countRecentMdFiles() > 5) {
            triggerPopup("PARCHEMIN_MAUDIT", event.getUser());
            showRealTimeCounter();
        }
    }
}
```

### **Frontend Popups**
```typescript
interface Blagounette {
    id: string;
    titre: string;
    image?: string;
    son?: string;
    message: string;
    duree: number;
    animation: 'shake' | 'pulse' | 'explode';
}
```

---

## 🏆 QUÊTE NIVEAU 2

### **Mission : Implémenter 3 Blagounettes**

1. **Créer le détecteur d'événements**
   - Backend listener
   - Pattern matching
   - Compteurs persistants

2. **Designer les popups**
   - Images humoristiques
   - Sons appropriés
   - Animations fun

3. **Système de badges humoristiques**
   - "🤦 Champion des Quotes" (10 fails)
   - "📜 Possédé par le Parchemin" (100 .md créés)
   - "🔫 Ami de Walter" (Déclenché 5 flashbacks)

---

## 💡 EXEMPLES DE BLAGOUNETTES AVANCÉES

### **COMBO BREAKER**
Si quelqu'un fait 3 conneries différentes en 1 minute :
```
MEGA POPUP: "🎊 COMBO DE CONNERIES !"
EFFET: Confettis + Airhorn
BADGE: "Maître de la Catastrophe"
```

### **BOOTSTRAP PARADOX**
Si quelqu'un documente qu'il documente qu'il documente :
```
POPUP: "🌀 INCEPTION DÉTECTÉE !"
EFFET: L'écran se met à tourner
MESSAGE: "We need to go deeper..."
```

---

## 🎯 VALIDATION DU NIVEAU

- ✅ 3 détecteurs fonctionnels
- ✅ Popups avec images/sons
- ✅ Système de compteurs
- ✅ Au moins 1 badge humoristique décerné
- ✅ 0 crash (ironiquement)

---

*"Les erreurs sont la voie vers la sagesse... et les meilleures blagues !"*  
— Walter, entre deux flashbacks 