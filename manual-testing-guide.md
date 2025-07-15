# 🔍 Test Manuel Simple - Page d'Accueil

## 📋 **Étapes à suivre manuellement**

### 1. **Démarrer le Frontend**
```bash
cd frontend
npm start
```
→ Attendre que "Compiled successfully!" apparaisse

### 2. **Ouvrir le Navigateur**
→ Aller sur `http://localhost:3000`

### 3. **Vérifier ce qui s'affiche**

**✅ Ce qui DOIT être visible :**
- Titre "Heroes of Time"
- Au moins 2 cartes de scénarios
- Boutons "Start Game" sur chaque carte

**❌ Si vous voyez :**
- Une page blanche
- Des erreurs dans la console (F12)
- Pas de cartes de scénarios
- Boutons grisés

### 4. **Test de Clic**

**🎯 Cliquer sur n'importe quel bouton "Start Game"**

**✅ Comportement attendu :**
- L'URL change vers `/game/[nom-du-scenario]`
- La page change vers l'interface de jeu

**❌ Si ça ne marche pas :**
- L'URL reste la même
- Rien ne se passe
- Erreur dans la console

### 5. **Diagnostics**

**A. Ouvrir la Console (F12) et regarder :**
- Erreurs en rouge
- Messages de chargement
- Appels API qui échouent

**B. Vérifier le Network (Onglet Network) :**
- Appels vers `/api/scenarios/` 
- Status 200 ou erreurs 500/404

**C. Regarder les Éléments (Onglet Elements) :**
- Chercher `data-testid="scenario-card-"`
- Voir si les boutons existent vraiment

## 🎯 **Ce qu'on cherche à comprendre**

1. **Les scénarios se chargent-ils ?**
2. **Les clics sont-ils détectés ?**
3. **La navigation fonctionne-t-elle ?**
4. **Y a-t-il des erreurs backend ?**

## 🚨 **Signaler le Problème**

**Si ça ne marche pas, noter :**
- Ce qui s'affiche (ou ne s'affiche pas)
- Messages d'erreur dans la console
- URL qui ne change pas
- Screenshots si possible

## 🔧 **Solution Rapide Possible**

**Si c'est juste un problème de backend :**
```bash
# Dans un autre terminal
cd backend
mvn spring-boot:run
```

**Si c'est un problème de cache :**
- Ctrl+F5 (rechargement forcé)
- Vider le cache du navigateur

## 📞 **Aide Supplémentaire**

Si les étapes manuelles ne marchent pas, on peut :
1. Regarder les logs backend
2. Vérifier la configuration des routes
3. Tester avec les outils de dev 