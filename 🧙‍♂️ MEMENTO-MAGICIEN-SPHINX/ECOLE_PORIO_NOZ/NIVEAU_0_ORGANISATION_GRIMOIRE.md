# 🧙‍♂️ NIVEAU 0 - ORGANISATION DU GRIMOIRE
## École de Magie PORIO NOZ - Base Initiatique

**Directrice** : Morgana  
**Date** : 2025-01-28  
**Niveau** : Initiation (Pré-fondamentaux)  
**Objectif** : Apprendre à organiser sa magie

---

## 🎯 **OBJECTIF NIVEAU 0**

Avant d'apprendre la magie, il faut apprendre à **l'organiser**.
Un magicien désorganisé est un magicien qui perd ses pouvoirs.

---

## 📚 **MODULE UNIQUE : CRÉATION DU GRIMOIRE**

### **Durée** : 1 semaine
### **Professeur** : Morgana (Directrice)

**"Un Grimoire bien organisé est la première magie qu'un apprenti doit maîtriser."**

---

## 🗂️ **STRUCTURE OBLIGATOIRE DU GRIMOIRE**

```
🔮 GRIMOIRE/
├── 📋 INDEX.md                    # Table des matières
├── 🎯 PROTOCOLES/                 # Procédures d'urgence
│   ├── recuperation-pouvoirs.md
│   └── anti-corruption.md
├── 🪄 sorts/                      # Sorts exécutables
│   ├── departements/              # Sorts par département
│   ├── temporels/                 # Sorts temporels
│   ├── protection/                # Sorts de protection
│   └── delegation/                # Sorts de délégation
├── 📖 THEORIE/                    # Notes théoriques
│   ├── trinite.md                 # Raconteur-Architecte-Technicien
│   └── mapping-realite.md         # Réalité ↔ Interstice
├── 🧪 EXPERIENCES/                # Tests et expériences
└── 📊 RAPPORTS/                   # Rapports d'épreuves
```

---

## 🛠️ **EXERCICES PRATIQUES**

### **1. Créer la structure**
```bash
mkdir -p 🔮\ GRIMOIRE/{sorts/{departements,temporels,protection,delegation},PROTOCOLES,THEORIE,EXPERIENCES,RAPPORTS}
```

### **2. Premier sort obligatoire**
Créer `sorts/test-trinite.sh` :
```bash
#!/bin/bash
# Test de la Trinité
echo "🔮 TEST TRINITÉ"
echo "Raconteur: $(test -f THEORIE/trinite.md && echo ✓ || echo ✗)"
echo "Architecte: $(test -d sorts && echo ✓ || echo ✗)"
echo "Technicien: $(command -v bash &>/dev/null && echo ✓ || echo ✗)"
```

### **3. Index magique**
Créer `INDEX.md` listant tous les sorts disponibles.

---

## 🎓 **ÉVALUATION NIVEAU 0**

### **Critères de validation** :
- ✅ Structure complète créée
- ✅ Au moins 3 sorts fonctionnels
- ✅ INDEX.md à jour
- ✅ Un protocole d'urgence documenté

### **Test final** :
Morgana invoquera un sort aléatoire de votre Grimoire.
Il doit s'exécuter sans erreur.

---

## 🌟 **CONSEILS DE MORGANA**

> "L'organisation n'est pas une contrainte, c'est une libération.
> Un Grimoire bien rangé permet de jeter des sorts complexes sans réfléchir.
> La magie doit couler naturellement, et cela commence par l'ordre."

### **Erreurs communes** :
- ❌ Sorts éparpillés partout
- ❌ Pas de documentation
- ❌ Noms de fichiers incompréhensibles
- ❌ Pas de structure claire

### **Bonnes pratiques** :
- ✅ Un sort = Une fonction claire
- ✅ Noms explicites (ex: `check-todo-donna.sh`)
- ✅ Documentation inline
- ✅ Réutilisabilité maximale

---

## 🚀 **PASSAGE AU NIVEAU 1**

Une fois le Niveau 0 validé, l'apprenti peut accéder aux :
- **Fondamentaux de l'Interstice**
- **Grammaire Quantique de base**
- **Premiers sorts temporels**

---

## 📝 **DEVOIR IMMÉDIAT**

1. Créer votre structure Grimoire
2. Implémenter le sort `test-trinite.sh`
3. Créer un sort de votre choix
4. Documenter dans `INDEX.md`
5. Présenter à Morgana pour validation

---

*"Sans organisation, la magie n'est que chaos."*  
**— Morgana, Directrice PORIO NOZ** 🌙 