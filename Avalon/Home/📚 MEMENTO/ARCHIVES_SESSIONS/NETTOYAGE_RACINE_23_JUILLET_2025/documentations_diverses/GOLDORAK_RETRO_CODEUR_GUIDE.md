# 🚀 GOLDORAK RETRO CODEUR - Guide d'utilisation

## 🎯 Système d'Easter Eggs Rétro

Heroes of Time inclut un système complet d'easter eggs inspiré des codes Konami des années 70-80, avec des références à Goldorak et aux robots géants classiques.

---

## 🎮 Codes Secrets Disponibles

### 🚀 **GOLDORAK** 
**Séquence :** `G-O-L-D-O-R-A-K`
**Effet :** Active l'easter egg Goldorak complet avec :
- Animation d'intro spatiale avec étoiles
- Séquence de transformation avec anneaux d'énergie
- Phase d'action avec FULGOROCURSOR et ASTERO-HACHE
- Victoire avec Goldorak qui s'envole

### 💥 **FULGOROCURSOR**
**Séquence :** `F-U-L-G-O-R-O-C-U-R-S-O-R`
**Effet :** Active des effets spéciaux sur le terrain :
- Effets de lueur énergétique
- Modification temporaire des couleurs
- Animations de brillance pendant 5 secondes

### 🤖 **ACTARUS**
**Séquence :** `A-C-T-A-R-U-S`
**Effet :** Active le mode debug avancé :
- Affichage des coordonnées des tuiles
- Informations de performance
- Détails techniques des éléments

### ⚡ **MAZINGER**
**Séquence :** `M-A-Z-I-N-G-E-R`
**Effet :** Active les effets visuels rétro :
- Lignes de balayage CRT
- Filtre sépia/contraste
- Effets de scintillement rétro
- Dure 10 secondes

---

## 🎪 Comment Utiliser

### 1. **Lancement du jeu**
```bash
./start-app.sh
```

### 2. **Ouvrir la console** (F12)
Tu verras le message :
```
🚀 [RETRO CODEUR] Tapez G-O-L-D-O-R-A-K pour activer le FULGOROCURSOR!
🎮 [RETRO CODEUR] Codes secrets disponibles:
   GOLDORAK: Active l'easter egg Goldorak avec animations spatiales
   FULGOROCURSOR: Active des effets spéciaux sur le terrain
   ACTARUS: Active le mode debug avec informations détaillées
   MAZINGER: Active des effets visuels rétro sur l'interface
```

### 3. **Taper les codes**
- Assure-toi d'être sur la page du jeu (pas dans un input)
- Tape les lettres du code en séquence
- Pas besoin d'être rapide, le système garde un historique

### 4. **Profiter des effets !**
- Les effets s'activent automatiquement
- Pour Goldorak : regarde l'animation complète ou clique "Passer"
- Pour les autres : les effets sont temporaires

---

## 🎨 Caractéristiques Techniques

### **Animation Goldorak**
- **4 phases** : Intro → Transformation → Action → Outro
- **Durée totale** : ~11 secondes
- **Effets** : Anneaux d'énergie, rayons laser, explosions
- **Style** : Retro 70-80 avec font Orbitron

### **Effets Visuels**
- **Scanlines** : Effet CRT authentique
- **Dégradés spatiaux** : Couleurs cosmiques
- **Animations** : Rotations, pulsations, scintillements
- **Responsive** : Adapté aux écrans mobiles

### **Système de Codes**
- **Gestionnaire centralisé** : RetroKonamiManager
- **Événements custom** : Communication entre composants
- **Extensible** : Facile d'ajouter de nouveaux codes
- **Sécurisé** : Ignore les inputs dans les formulaires

---

## 🛠️ Pour les Développeurs

### **Ajouter un nouveau code**
```typescript
import { retroKonamiManager } from '../utils/retro-konami';

retroKonamiManager.addCode({
  name: 'MAZINGER',
  sequence: ['KeyM', 'KeyA', 'KeyZ', 'KeyI', 'KeyN', 'KeyG', 'KeyE', 'KeyR'],
  description: 'Active des effets visuels rétro',
  callback: () => {
    console.log('⚡ MAZINGER Z ACTIVATED!');
    // Votre logique ici
  }
});
```

### **Écouter des événements custom**
```typescript
window.addEventListener('goldorak-activated', (event: CustomEvent) => {
  console.log('Goldorak event:', event.detail.message);
});
```

### **Styles CSS personnalisés**
```css
.fulgorocursor-active {
  animation: fulgorocursor-glow 0.5s ease-in-out infinite alternate;
}

@keyframes fulgorocursor-glow {
  0% { filter: brightness(1) contrast(1); }
  100% { filter: brightness(1.2) contrast(1.1) hue-rotate(10deg); }
}
```

---

## 🔧 Fichiers Impliqués

### **Components**
- `GoldorakEasterEgg.tsx` - Composant principal avec animations
- `GoldorakEasterEgg.css` - Styles rétro complets
- `TrueHeroesInterface.tsx` - Intégration dans l'interface

### **Utilities**
- `retro-konami.ts` - Gestionnaire de codes et effets
- Événements custom pour la communication

### **Styles**
- Effets CSS injectés automatiquement
- Themes rétro avec scanlines
- Animations fluides et responsives

---

## 🎯 Références Rétro

### **Goldorak (UFO Robot Grendizer)**
- **Créé par** : Go Nagai (1975)
- **Pilote** : Actarus (Duke Fleed)
- **Attaques** : Fulgorocursor, Astero-hache, Rayons delta
- **Thème** : Robots géants, espace, combat

### **Années 70-80**
- **Couleurs** : Cyan, magenta, jaune néon
- **Typographie** : Orbitron (futuriste)
- **Effets** : Scanlines, CRT, dégradés
- **Animations** : Rotations, pulsations, particules

---

## 🚀 Amusez-vous bien !

Le système Goldorak est un hommage aux classiques du genre et aux développeurs rétro. Chaque code active une expérience unique pour les nostalgiques des années 70-80.

**Astuce** : Essayez de combiner plusieurs codes pour des effets cumulatifs !

---

*"Dans l'espace, personne ne vous entend coder... mais Goldorak si !"* 🚀⚡🤖

## 🎪 Crédits

- **Concept** : Inspiré de Goldorak et des codes Konami
- **Design** : Style rétro années 70-80 authentique  
- **Développement** : Système modulaire et extensible
- **Intégration** : Heroes of Time par l'équipe de développement

---

*Pour activer : Tapez simplement G-O-L-D-O-R-A-K sur la page du jeu !* 