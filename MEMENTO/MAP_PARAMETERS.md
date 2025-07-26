# 🗺️ MAP_PARAMETERS - Paramètres Ontologiques des Maps

*Système de configuration avancée pour les maps de Heroes of Time avec temps différencié par joueur*

---

## 📊 **PARAMÈTRES PRINCIPAUX**

| Paramètre | Type | Description |
|-----------|------|-------------|
| `geometry_formula` | String | Formule de projection géométrique (HEX_FRACTAL, LINEAR_RING, SPHERICAL_POCKET, TORUS_FOLD, etc.) |
| `tileset` | String | Thème graphique des tuiles (FOREST_SHARD, GLITCH_FOREST, RUINS_TORUS, QUANTUM_VOID, etc.) |
| `sound_theme` | String | Thème sonore de fond (eerie_echo, ambient_field, void_chime, temporal_whisper, etc.) |
| `music_layer` | String | Bande-son dynamique contextuelle (multi-phase ambient, quantum_wave, collapse_symphony, etc.) |
| `timeline_phasing_enabled` | Boolean | Active les effets de transparence/déphasage entre timelines |
| `tick_per_day_per_player` | Object/Function | Définit le rythme temporel local pour chaque joueur |
| `anchor_time_reference` | String | Temps d'ancrage global (SERVER_T, WORLD_T(0), MULTIVERSE_SYNC) |
| `season_model` | String | Active le calendrier local dérivé ("enabled", "disabled", "player_specific") |
| `collapse_event_trigger` | String | Déclencheurs d'effondrement causal (proximity_crossing, action_conflict, observation_paradox) |

---

## 🌀 **PARAMÈTRES AVANCÉS**

### **Gestion Temporelle**
```json
{
  "temporal_mechanics": {
    "divergence_threshold": 100,        // Ticks avant divergence visible
    "sync_points": ["dawn", "dusk"],    // Points de synchronisation forcée
    "max_temporal_delta": 500,          // Écart max avant collapse forcé
    "retroactive_effects": true         // Permet les effets rétrocausaux
  }
}
```

### **Effets Visuels de Divergence**
```json
{
  "divergence_visuals": {
    "ghost_echoes": true,               // Échos visuels des autres timelines
    "phase_transparency": 0.3,          // Transparence des objets déphasés
    "temporal_blur": "adaptive",        // Flou temporel adaptatif
    "reality_glitches": "moderate"     // Niveau de glitches visuels
  }
}
```

---

## 🔁 **EXEMPLE COMPLET**

```json
{
  "map_id": "glitch_forest_divergent",
  "geometry_formula": "HEX_FRACTAL",
  "tileset": "GLITCH_FOREST",
  "sound_theme": "eerie_echo",
  "music_layer": "quantum_wave",
  "timeline_phasing_enabled": true,
  "tick_per_day_per_player": {
    "player_A": 24,
    "player_B": 36,
    "player_C": 12
  },
  "anchor_time_reference": "SERVER_T",
  "season_model": "player_specific",
  "collapse_event_trigger": "proximity_crossing",
  "temporal_mechanics": {
    "divergence_threshold": 50,
    "sync_points": ["noon", "midnight"],
    "max_temporal_delta": 300,
    "retroactive_effects": true
  },
  "divergence_visuals": {
    "ghost_echoes": true,
    "phase_transparency": 0.4,
    "temporal_blur": "high",
    "reality_glitches": "intense"
  }
}
```

---

## 🧠 **EFFETS EN JEU**

### **Divergence Temporelle**
- **Joueur A** (24 ticks/jour) : Vit des journées normales
- **Joueur B** (36 ticks/jour) : Journées 50% plus longues, voit le soleil différemment
- **Joueur C** (12 ticks/jour) : Journées accélérées, saisons rapides

### **Interactions Cross-Timeline**
1. **Proximité** : Les joueurs proches voient des "échos" transparents
2. **Actions** : Les actions dans une timeline affectent les autres avec délai
3. **Objets** : Certains items existent dans plusieurs états simultanés

### **Points de Synchronisation**
- À midi et minuit serveur, tous les joueurs se resynchronisent brièvement
- Permet les échanges et interactions directes
- Les divergences reprennent après

---

## ⚡ **COMPATIBILITÉ MOTEUR**

### **Backend Spring Boot**
```java
@Entity
public class MapParameters {
    @Id
    private Long id;
    
    @Column(columnDefinition = "jsonb")
    private String geometryFormula;
    
    @OneToMany
    private Map<String, Integer> tickPerDayPerPlayer;
    
    @Enumerated(EnumType.STRING)
    private CollapseEventTrigger collapseTrigger;
    
    // Getters/Setters
}
```

### **Frontend React**
```typescript
interface MapParameters {
  geometryFormula: GeometryType;
  tickPerDayPerPlayer: Record<string, number>;
  timelinePhasing: boolean;
  divergenceVisuals: DivergenceConfig;
}

const renderDivergentMap = (params: MapParameters) => {
  // Calcul des décalages temporels
  // Rendu avec effets de phase
  // Gestion des interactions cross-timeline
};
```

---

## 🎮 **ARTEFACTS EXPLOITANT CES PARAMÈTRES**

1. **Talisman des Échos Inversés** : Crée des divergences locales
2. **Chronomètre Brisé** : Force des désynchronisations
3. **Miroir Temporel** : Permet de voir toutes les timelines
4. **Ancre de Convergence** : Force la resynchronisation

---

## 📝 **NOTES POUR DÉVELOPPEURS**

- Les `tick_per_day_per_player` doivent être des diviseurs/multiples pour éviter les dérives
- Le `anchor_time_reference` est TOUJOURS en lecture seule côté client
- Les effets visuels de divergence sont calculés côté client pour la performance
- Les collapses sont validés côté serveur pour éviter les exploits

---

*Document créé pour la convergence temporelle de Heroes of Time*  
*Compatible avec le moteur actuel et les extensions futures*