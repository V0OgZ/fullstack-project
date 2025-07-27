# 🔧 PLAN DE RATIONALISATION DES PORTS

## 📍 ÉTAT ACTUEL (BORDEL)
- Port 3000: Morgana React
- Port 8000: Vince HTML
- Port 8001: GRUT React
- Port 8002: GRUT backup
- Port 8080: Backend
- Port 9000: Dashboard HTML

## 🎯 OBJECTIF FINAL (3 PORTS)

### 1. **Port 8080** - Backend API
- Spring Boot Java
- Reste tel quel

### 2. **Port 3000** - TOUT le React
- Morgana (interface de jeu)
- GRUT Panopticon (dashboard)
- Une seule app React avec routing:
  - `/` → Morgana
  - `/grut` → GRUT Dashboard
  - `/quantum` → Quantum visualizer
  - etc.

### 3. **Port 8000** - TOUS les HTML
- Vince Vega map
- Dashboard pocket world
- Toutes les interfaces HTML legacy
- Un seul serveur Python

## 🚀 ACTIONS À FAIRE

### Phase 1: Regrouper les HTML
1. Créer dossier `🌐 frontend/html-interfaces/`
2. Y déplacer:
   - `vince-vega-map-demo-backend.html`
   - `dashboard.html`
   - Tous les autres HTML éparpillés
3. Un seul serveur Python sur 8000

### Phase 2: Fusionner les React
1. Intégrer GRUT dans l'app Morgana
2. Ajouter React Router
3. Créer navigation entre les interfaces
4. Supprimer `panopticon-grut-dashboard` séparé

### Phase 3: Réparer les liens
1. Mettre à jour tous les liens dans GRUT
2. Vérifier les API calls
3. Tester toutes les connexions

### Phase 4: Nettoyer
1. Supprimer les anciens scripts
2. Mettre à jour `./hots`
3. Documenter la nouvelle architecture 