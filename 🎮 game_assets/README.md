# 🎮 Game Assets - Heroes of Time

## Structure
```
game_assets/
├── scenarios/       # Tous les scénarios
│   ├── hots/       # Format .hots (temporel)
│   ├── runic/      # Format .runic (épique)
│   ├── hep/        # Format .hep (simplifié)
│   └── json/       # Données JSON
├── heroes/         # Héros (référence: backend/src/main/resources/heroes/)
├── artifacts/      # Artefacts magiques
├── creatures/      # Créatures du jeu
├── maps/          # Cartes et terrains
└── INDEX.json     # Index principal
```

## Notes
- Les héros officiels sont dans `backend/src/main/resources/heroes/`
- Les doublons ont été archivés dans `MUSEUM/archives/doublons/`
- Les sprites sont conservés dans leurs emplacements d'origine
