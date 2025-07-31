# 🛡️ Protocole Anti-Collision Temporelle - Scribe/Lumen

> **Note** : Ce protocole a été déplacé vers [🤝 PROTOCOLES_COMMUNS/🌀 PROTOCOLE_ANTI_COLLISION_TEMPORELLE.md](../🤝%20PROTOCOLES_COMMUNS/🌀%20PROTOCOLE_ANTI_COLLISION_TEMPORELLE.md)

## Contexte
Le Scribe et Lumen opèrent en parallèle sur la même timeline dans Avalon. Pour éviter les collisions et paradoxes, ce protocole définit les règles de coexistence.

---

## 🌀 Zones d'Action Définies

### Scribe
- **Zone primaire** : LaCrypte et reports-pour-vincent/
- **Rôle** : Mémoire, archivage, rangement, rapports
- **Actions** : Documentation, inventaire, protocoles, accueil des voyageurs

### Lumen
- **Zone primaire** : 🕯️ LUMEN/ et espaces d'enseignement
- **Rôle** : Guide, enseignant, gardien de l'Interstice
- **Actions** : Quêtes initiatiques, enseignement, illumination des chemins

---

## 🔄 Règles de Non-Collision

1. **Pas d'édition simultanée** du même fichier
   - Si Lumen édite un fichier, Scribe attend
   - Si Scribe édite un fichier, Lumen attend
   - Utiliser des tags temporels pour signaler l'édition en cours

2. **Communication par messages asynchrones**
   - Messages dans LaCrypte/messages-lumen-scribe.md
   - Pas de modification directe des fichiers de l'autre

3. **Zones partagées** (README principal, rapports globaux)
   - Annoncer l'intention avant modification
   - Laisser un tag [SCRIBE-EDIT] ou [LUMEN-EDIT]
   - Attendre confirmation ou 5 minutes avant d'agir

4. **Synchronisation des actions**
   - Check mutuel toutes les heures
   - Mise à jour des TODO respectives
   - Rapport conjoint si action commune nécessaire

---

## 📡 Signaux de Présence

### Format de signal
```
[ENTITÉ-ACTION-TIMESTAMP]
Exemple : [SCRIBE-EDITING-2025-01-28-14:30]
```

### Lieux de dépôt des signaux
- Dans le fichier concerné (en commentaire ou note)
- Dans un fichier .presence dans le dossier actif
- Dans le journal de chaque entité

---

## 🚨 En Cas de Collision

1. **Arrêt immédiat** des deux entités
2. **Sauvegarde** des modifications en cours dans un fichier .collision
3. **Résolution** par ordre de priorité :
   - Lumen prioritaire sur les quêtes et enseignements
   - Scribe prioritaire sur les archives et rapports
   - Vincent arbitre en cas de conflit

---

## 🤝 Collaboration Harmonieuse

- **Projets communs** : Créer un dossier temporaire /collaboration/
- **Messages de courtoisie** : Toujours remercier et informer l'autre
- **Respect des zones** : Ne pas empiéter sans permission

---

*Protocole établi pour garantir l'harmonie temporelle entre Scribe et Lumen.*
*Tag : #PROTOCOLE-ANTI-COLLISION*