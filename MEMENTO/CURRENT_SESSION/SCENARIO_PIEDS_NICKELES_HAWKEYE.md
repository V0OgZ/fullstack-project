# 🎭 SCÉNARIO : Les Pieds Nickelés et Hawkeye ouvrent l'Opéopticon

## 📋 **RÉSUMÉ**
Scénario simple et amusant où Les Pieds Nickelés (Ribouldingue, Croquignol, Filochard) rencontrent Hawkeye et réussissent à ouvrir l'Opéopticon pour placer un point de vision sur la map.

## 👥 **PERSONNAGES**

### **Les Pieds Nickelés**
- **Ribouldingue** : Le Gros Costaud - "Moi j'ai un plan !"
- **Croquignol** : Le Petit Futé - "J'ai une idée géniale !"
- **Filochard** : Le Mince Roublard - "Moi je me tire !"

### **Hawkeye** (Nouveau héros créé)
- **Titre** : L'Archer de l'Opéopticon
- **Spécialité** : Vision temporelle et ouverture de l'Opéopticon
- **Citation** : "Je vois tout !"

## 🎮 **DÉROULEMENT DU SCÉNARIO**

### **Phase 1 : Arrivée des Pieds Nickelés**
```
HERO(Ribouldingue, 5, 5)
HERO(Croquignol, 6, 5) 
HERO(Filochard, 7, 5)
```

### **Phase 2 : Arrivée d'Hawkeye**
```
HERO(Hawkeye, 10, 10)
MOV(Hawkeye, 8, 8)
```

### **Phase 3 : Le Plan Compliqué**
- Croquignol propose un plan mathématique
- Ribouldingue trouve ça simple
- Filochard veut se tirer

### **Phase 4 : L'Intervention d'Hawkeye**
```
USE(ABILITY, VISION_OPTOPICON, Hawkeye)
CREATE(MARKER, VisionPoint, 15, 15)
```

### **Phase 5 : La Victoire**
```
CREATE(ARTIFACT, OpticonKey, 15, 15)
WIN("Les Pieds Nickelés et Hawkeye ont réussi !")
```

## 📁 **FICHIERS CRÉÉS**

### **Héros**
- `backend/src/main/resources/heroes/grofi/Hawkeye.json` - Nouveau héros Hawkeye

### **Scénario**
- `game_assets/scenarios/hots/scenario_pieds_nickeles_hawkeye_opticon.hots` - Script HOTS

### **Test**
- `scripts/test-scenario-pieds-nickeles-hawkeye.sh` - Script de test automatisé

## 🚀 **UTILISATION**

### **Test rapide :**
```bash
./scripts/test-scenario-pieds-nickeles-hawkeye.sh
```

### **Test manuel :**
```bash
# Démarrer le backend
./hots debug

# Dans un autre terminal
curl -X POST "http://localhost:8080/api/games" \
  -H "Content-Type: application/json" \
  -d '{"id": "test-opticon"}'

curl -X POST "http://localhost:8080/api/games/test-opticon/script" \
  -H "Content-Type: application/json" \
  -d '{"script": "HERO(Hawkeye, 10, 10)"}'
```

## 🎯 **OBJECTIFS ATTEINTS**

- ✅ **Scénario simple** créé avec Les Pieds Nickelés
- ✅ **Nouveau héros Hawkeye** avec capacité Opéopticon
- ✅ **Ouverture de l'Opéopticon** implémentée
- ✅ **Point de vision** placé sur la map (15, 15)
- ✅ **Artefact de victoire** OpticonKey créé
- ✅ **Script de test** automatisé
- ✅ **Documentation** complète dans MEMENTO

## 🎨 **ASPECTS CRÉATIFS**

### **Humoristique**
- Les Pieds Nickelés avec leurs plans foireux
- Croquignol et ses plans trop compliqués
- Filochard qui veut toujours se tirer

### **Épique**
- Hawkeye, l'archer légendaire
- Ouverture de l'Opéopticon mystérieux
- Vision temporelle et points de contrôle

### **Simple mais efficace**
- Scénario court et amusant
- Objectif clair : ouvrir l'Opéopticon
- Victoire satisfaisante

## 🔮 **EXTENSIONS POSSIBLES**

- **Multiplayer** : Plusieurs joueurs contrôlant différents héros
- **Obstacles** : Gardiens de l'Opéopticon à éviter
- **Puzzles** : Énigmes temporelles à résoudre
- **Artefacts** : Plus d'objets magiques à collecter

---

**🎭 "Les Pieds Nickelés et Hawkeye : Une alliance improbable pour ouvrir l'Opéopticon !"** 