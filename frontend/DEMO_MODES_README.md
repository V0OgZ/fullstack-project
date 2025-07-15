# 🎮 Heroes of Time - Modes de Démonstration

## 📋 Vue d'ensemble

Heroes of Time offre plusieurs modes de démonstration pour différents besoins :

### 🖥️ Mode Normal
- Interface navigateur complète avec barres d'outils
- Idéal pour le développement et les tests
- Permet l'inspection des éléments

### 🎯 Mode Plein Écran (Kiosque)
- Interface immersive sans distractions
- Parfait pour les présentations et salons
- Masquage automatique du curseur
- Optimisé pour l'expérience utilisateur

## 🚀 Utilisation

### Option 1 : Script avec menu interactif
```bash
./frontend/start-demo.sh
```
Puis choisissez :
- `1` pour le mode normal
- `2` pour le mode plein écran

### Option 2 : Script dédié plein écran
```bash
./frontend/start-fullscreen-demo.sh
```

## 🎯 Fonctionnalités du Mode Plein Écran

### Interface Immersive
- ✅ Lancement automatique en plein écran
- ✅ Pas de barres d'outils du navigateur
- ✅ Pas de barres de défilement
- ✅ Fond sombre unifié

### Expérience Utilisateur
- 🎨 Message de bienvenue animé
- 🖱️ Curseur masqué après 3 secondes d'inactivité
- ✨ Effets visuels améliorés
- 🎭 Animations fluides

### Contrôles
- **ESC** : Quitter le mode plein écran
- **Souris** : Réapparaît au mouvement
- **Auto-démo** : Navigation automatique

## 🔧 Configuration Technique

### Arguments du navigateur (Mode Kiosque)
```javascript
'--start-fullscreen'     // Démarrage en plein écran
'--kiosk'               // Mode kiosque
'--disable-infobars'    // Pas de barres d'info
'--no-first-run'        // Pas d'assistant premier lancement
```

### Styles personnalisés
- Masquage des barres de défilement
- Hauteur 100vh pour tous les conteneurs
- Animations pulsées pour les tooltips
- Transitions fluides

## 📊 Cas d'Usage

### 🏢 Présentations d'entreprise
- Salons professionnels
- Démonstrations clients
- Formations

### 🎪 Événements
- Game jams
- Expositions
- Kiosques interactifs

### 📹 Enregistrements
- Vidéos promotionnelles
- Tutoriels
- Streams

## 🛠️ Personnalisation

### Modifier la durée
Éditez `fullscreen-demo.spec.ts` :
```typescript
await page.waitForTimeout(5000); // Durée en ms
```

### Ajouter des étapes
```typescript
// Nouvelle interaction
await page.click('selector');
await page.waitForTimeout(2000);
```

### Changer les messages
Modifiez les textes HTML dans le script :
```typescript
<h1>Votre Message</h1>
<p>Votre description</p>
```

## ⚡ Conseils

### Performance
- Fermez les autres applications
- Utilisez un écran haute résolution
- Désactivez les notifications système

### Présentation
- Testez avant l'événement
- Préparez un plan B (mode normal)
- Ayez une souris sans fil

### Accessibilité
- Le mode plein écran peut être désorientant
- Informez les utilisateurs comment quitter (ESC)
- Proposez une alternative en mode normal

## 🐛 Dépannage

### "Le plein écran ne fonctionne pas"
- Vérifiez les permissions du navigateur
- Certains OS bloquent le mode kiosque
- Essayez avec Chrome/Chromium

### "Le curseur ne disparaît pas"
- Désactivez les extensions navigateur
- Vérifiez les paramètres d'accessibilité OS

### "La démo se ferme trop vite"
- Augmentez les timeouts dans le script
- Vérifiez la stabilité du serveur

## 📝 Logs et Debug

Les logs sont disponibles dans la console :
```bash
# Mode verbose
npx playwright test fullscreen-demo.spec.ts --debug
```

---

Pour plus d'informations, consultez `DEBUG_MODE_README.md` 