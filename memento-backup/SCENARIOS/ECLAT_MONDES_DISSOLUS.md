# 🕯️ L'ÉCLAT DES MONDES DISSOLUS

> *"Le Troisième Codex a été ouvert. Mais il ne peut pas être refermé."*

## 📜 Synopsis

Trois êtres issus d'antiques fractures de la trame se dressent face à celui qu'on appelle **Abyme-le-Rassemblé**, le Porte-Toutes-Lames, le Mangemémoires. Il ne veut pas conquérir le monde. Il veut l'archiver.

## 🧩 Détails du scénario

| Élément           | Détail                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------- |
| **Fichier**       | `splintered_worlds.hots`                                                               |
| **Tours**         | 30                                                                                      |
| **Type**          | Bataille asymétrique (3v1 Boss)                                                        |
| **Héros joueurs** | Jean-Grofignon, Claudius, Chlamydius                                                   |
| **Boss**          | **Abyme-le-Rassemblé** (999 HP, ∞ énergie temporelle, tous les artefacts)            |
| **Carte**         | Le Nexus des Mondes Dissous (21x21) — ruines flottantes, glyphes figés, ponts instables |
| **Victoire**      | Enfermer Abyme dans l'Éclat Blanc via combinaison triple au tour 30                    |
| **Défaite**       | Abyme recompose le Codex et efface les héros de la mémoire du monde                    |

## 🔱 L'Antagoniste : **Abyme-le-Rassemblé**

### Origine
- Né de 999 fragments de héros oubliés
- Chaque fragment est une histoire non racontée
- Existe simultanément dans toutes les timelines

### Équipement
- **Totem de Silencium** : Contient TOUS les artefacts du jeu fusionnés
- Ne peut pas être désarmé ou volé
- Chaque artefact garde ses pouvoirs individuels

### Capacités Uniques

#### 📁 **Archivage Immédiat**
- Fige une action dans le marbre temporel
- Cette action ne peut plus jamais être modifiée
- Même les états quantiques deviennent fixes

#### 🔄 **Réminiscence Inversée**
- Fait réapparaître un événement qui a été effacé
- Peut ressusciter des créatures détruites
- Inverse les effets d'effacement de Chlamydius

#### ❌ **Inexécution**
- Empêche une action future d'exister
- Plus puissant qu'une annulation : l'action n'aura jamais lieu
- Crée des paradoxes temporels

## ⚔️ Structure Narrative

### **ACTE I — L'Éveil du Codex** *(Tours 1–5)*
- Le Nexus s'ouvre, révélant un champ de bataille impossible
- Les trois héros apparaissent dans des zones disjointes
- Des **échos figés** parsèment la carte : souvenirs de batailles qui n'ont jamais eu lieu
- Abyme observe, immobile au centre

### **ACTE II — Les Chemins de l'Encre** *(Tours 6–15)*
- Chlamydius découvre qu'il peut lire des pages non écrites du Codex
- Un artefact oublié remonte des profondeurs
- Claudius tente de refactorer la réalité mais Abyme crée des "Zones Silencieuses"
- Jean-Grofignon piège une créature dans un container paradoxal
- Les premières anomalies apparaissent

### **ACTE III — Le Brouillard d'Oubli** *(Tours 16–25)*
- Abyme invoque les **Lames Réversibles** : des créatures qui n'existent que si on les tue
- Jean perd l'accès à ses logs (corruption mémorielle)
- Claudius est forcé de compiler un sort corrompu (ψ☠) qui lui coûte une timeline
- Chlamydius active le **Parchemin de Fer** : ce qu'il écrit devient réel pour 1 tour
- L'archivage final commence : si complété, les héros sont effacés

### **ACTE IV — L'Éclat Final** *(Tours 26–30)*
- Le Nexus entre en résonance critique
- Trois piliers d'ancrage apparaissent :
  - **Pilier du Chaos** (pour Jean)
  - **Pilier de l'Ordre** (pour Claudius)
  - **Pilier de l'Oubli** (pour Chlamydius)
- Si les 3 héros atteignent leurs piliers au tour 30, ils peuvent lancer l'incantation finale

## 🧙‍♂️ L'Incantation de l'Éclat Blanc

> *"À l'encre du chaos, au code du rêve, au parchemin sans temps – que s'écrive le silence."*

Cette incantation triple fusionne les pouvoirs des trois héros :
- Le chaos de Jean devient ordre
- L'ordre de Claudius devient oubli
- L'oubli de Chlamydius devient silence

Résultat : Abyme est scellé dans un **livre vide sans nom**, prisonnier de sa propre nature d'archiviste.

## 🎭 Mécaniques Spéciales

### Lames Réversibles
```
CREATURE(lame_reversible) {
  PROPERTY: EXISTS_ONLY_IF_KILLED
  ON_DEATH: SPAWN(lame_reversible_vivante)
  PARADOX: Must die to live, must live to die
}
```

### Zones Silencieuses
- Créées par Abyme
- Aucune action ne peut y être effectuée
- Même les états quantiques y sont muets

### Parchemin de Fer
- Activation unique de Chlamydius
- Ce qui est écrit devient réalité absolue
- Durée : 1 tour seulement
- Peut créer des ponts, des murs, ou même des concepts

## 📊 Équilibrage

### Forces des Héros
- **Synergie** : Leurs pouvoirs se complètent
- **Mobilité** : 3 positions vs 1
- **Créativité** : Multiples approches possibles

### Forces d'Abyme
- **999 HP** : Quasi-invincible par damage direct
- **Tous les artefacts** : Versatilité absolue
- **Contrôle du terrain** : Zones silencieuses
- **Manipulation temporelle** : Peut défaire ce qui est fait

## 🎨 Ambiance et Ton

### Visuel
- Ruines flottantes dans le vide
- Glyphes anciens qui pulsent
- Pages du Codex qui volent
- Encre qui coule vers le haut

### Sonore
- Murmures de héros oubliés
- Craquements de réalité
- Silence oppressant dans les zones verrouillées
- Chant des fragments d'Abyme

### Narratif
- Dark fantasy métaphysique
- Références à des histoires jamais racontées
- Meta-commentaires sur la nature du jeu
- Humour noir de Jean face à l'absurde

## 💭 Thèmes Profonds

1. **Mémoire vs Oubli** : Que reste-t-il quand l'histoire est effacée ?
2. **Création vs Archivage** : Abyme collectionne, les héros créent
3. **Ordre vs Chaos** : Trois philosophies face à une certitude
4. **L'Écrit vs le Vécu** : Ce qui est documenté contre ce qui est ressenti

## 🏆 Récompenses

### En cas de Victoire
- **Titre** : "Scribes du Silence"
- **Artefact** : Page Blanche du Codex (peut réécrire un événement par partie)
- **Unlock** : Mode "Archive d'Abyme" (rejouer des batailles effacées)

### En cas de Défaite
- Les personnages sont temporairement "archivés"
- Déblocage d'un indice pour la prochaine tentative
- Vision d'une timeline où ils ont gagné

## 📝 Notes de Design

- Ce scénario est conçu pour être **rejouable** avec des variations
- Les dialogues changent selon les actions précédentes
- Certains secrets ne se révèlent qu'après plusieurs défaites
- L'histoire complète d'Abyme est fragmentée dans ses 999 morceaux

---

*"Ce qui est écrit peut être effacé. Mais ce qui est vécu... peut-il être désécrit ?"* 