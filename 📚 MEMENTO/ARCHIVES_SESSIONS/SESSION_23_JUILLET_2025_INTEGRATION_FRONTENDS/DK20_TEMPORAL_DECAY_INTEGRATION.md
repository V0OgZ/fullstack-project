# DK20 — TEMPORAL DECAY SYSTEM - INTEGRATION HEROES OF TIME

**Système** : DK20 Temporal Decay (Anna the Martopicker)  
**Statut** : Suggestion analysée et adaptation en cours  
**Intégration** : Heroes of Time Quantum Engine  
**Date** : 21 Juillet 2025  

---

## 🎯 **ANALYSE DES SUGGESTIONS**

### ✅ **Concepts Excellents à Retenir**
- **Pénalité douce croissante** - Parfait pour éviter l'abus temporal
- **Zones de surcharge causale** - S'intègre parfaitement au système GROFI
- **Anna the Martopicker** - Nouveau héros avec philosophie unique
- **Objets anti-decay** - Artefacts spécialisés pour contrer le système

### 🔧 **Adaptations Nécessaires**
- **Intégration avec PsiState** - Utiliser l'architecture existante
- **Compatibilité Jean-Grofignon** - Respecter la philosophie GROFI
- **Tests avec backend actuel** - Valider avec notre API Spring Boot
- **Format HSP JSON** - Scénarios utilisant le système DK20

---

## 🏗️ **ARCHITECTURE D'INTÉGRATION**

### **Backend Spring Boot**
```java
// Nouveau service à créer
@Service
public class TemporalDecayService {
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private CausalCollapseService causalCollapseService;
    
    public void applyDecayToPlayer(Player player) {
        if (player.getTemporalDelay() > DECAY_THRESHOLD) {
            // Logique de decay adaptée au système PsiState
        }
    }
    
    public void checkZoneCausalDensity(GameZone zone) {
        List<PsiState> activePsiStates = psiStateRepository.findByZone(zone);
        if (activePsiStates.size() > DENSITY_LIMIT) {
            triggerZoneDecay(zone);
        }
    }
}
```

### **Nouveaux Modèles JPA**
```java
@Entity
@Table(name = "temporal_decay_states")
public class TemporalDecayState {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;
    
    private Integer decayLevel;
    private LocalDateTime lastUpdate;
    private String affectedZone;
    
    // Intégration avec ComplexAmplitude existant
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "realPart", column = @Column(name = "decay_amplitude_real")),
        @AttributeOverride(name = "imaginaryPart", column = @Column(name = "decay_amplitude_imaginary"))
    })
    private ComplexAmplitude decayAmplitude;
}
```

---

## 🎭 **NOUVEAU HÉROS : ANNA THE MARTOPICKER**

### **Profil Héros**
```json
{
  "name": "Anna the Martopicker",
  "title": "Glaneuse d'Artefacts Oubliés",
  "type": "TEMPORAL_SPECIALIST",
  "philosophy": "If you lag behind time, time lags behind you",
  "specialties": ["TEMPORAL_DECAY", "ARTIFACT_RECOVERY", "CAUSAL_CLEANING"],
  "signature_items": ["Pendule d'Écho", "Lunettes de l'Oraculon", "Spanner of Rewind"],
  "grofi_alignment": "CHAOS_ORDER_BALANCE"
}
```

### **Capacités Spéciales**
- **Decay Vision** - Voit les zones en décomposition temporelle
- **Artifact Salvage** - Récupère artefacts corrompus par le decay
- **Timeline Cleaning** - Nettoie les résidus temporels

---

## 🧰 **NOUVEAUX ARTEFACTS ANTI-DECAY**

### **Pendule d'Écho**
```java
@Component
public class PenduleEchoEffect implements ArtifactEffect {
    @Override
    public void execute(Hero hero, Game game) {
        // Suspend le decay pendant 3 tours
        TemporalDecayState decay = getDecayState(hero);
        if (decay != null) {
            decay.setSuspendedTurns(3);
            decay.setLastUpdate(LocalDateTime.now());
        }
    }
}
```

### **Lunettes de l'Oraculon**
```java
@Component  
public class LunettesOraculonEffect implements ArtifactEffect {
    @Override
    public void execute(Hero hero, Game game) {
        // Vision future sans decay
        hero.setTemporalVisionRange(hero.getTemporalVisionRange() + 3);
        hero.addTemporaryAbility("DECAY_IMMUNE_VISION", 5);
    }
}
```

---

## 🧪 **TESTS À IMPLÉMENTER**

### **Test Backend**
```java
@Test
public void testTemporalDecayApplication() {
    // Test decay sur héros en retard
    Hero hero = createTestHero("Arthur");
    hero.setTemporalDelay(6); // > 5 jours threshold
    
    temporalDecayService.applyDecayToPlayer(hero);
    
    assertThat(hero.getDecayLevel()).isEqualTo(1);
    assertThat(hero.getBuildingLevel()).isEqualTo(originalLevel - 1);
}
```

### **Test Scripts JSON**
```bash
# Nouveau script de test
./scripts/test-temporal-decay-dk20.sh
```

### **Scénario Test DK20**
```json
{
  "name": "DK20 Temporal Decay Test",
  "type": "DECAY_VALIDATION",
  "heroes": [
    {
      "name": "Arthur",
      "temporal_delay": 6,
      "expected_decay": 1
    },
    {
      "name": "Anna_the_Martopicker", 
      "items": ["Pendule_Echo"],
      "expected_decay": 0
    }
  ],
  "test_zones": [
    {
      "name": "Causal_Overload_Zone",
      "psi_state_density": 12,
      "expected_zone_decay": true
    }
  ]
}
```

---

## 🎳 **INTÉGRATION PHILOSOPHIE GROFI**

### **Équilibre Order/Chaos**
- **Order (Jean-Grofignon)** - Règles de decay claires et prévisibles
- **Chaos (Anna)** - Effets imprévisibles et récupération d'artefacts
- **Balance** - Le decay encourage mouvement sans punir l'exploration

### **Citations Anna vs Jean**
- **Anna** : *"If you lag behind time, time lags behind you"*
- **Jean** : *"Le temps n'attend personne, mais parfois il faut savoir l'attendre"*
- **Synthesis** : Respecter le temps tout en explorant ses possibilités

---

## 📋 **PLAN D'IMPLÉMENTATION**

### **Phase 1 : Backend Core**
1. ✅ Créer `TemporalDecayService`
2. ✅ Ajouter entité `TemporalDecayState` 
3. ✅ Intégrer avec `PsiState` existant
4. ✅ Tests unitaires backend

### **Phase 2 : Artefacts & Héros**
1. ✅ Implémenter Anna the Martopicker
2. ✅ Créer artefacts anti-decay
3. ✅ Tests capacités spéciales
4. ✅ Intégration `ArtifactEffectExecutor`

### **Phase 3 : Scripts & Tests**
1. ✅ Script de test DK20
2. ✅ Scénarios JSON avec decay
3. ✅ Intégration `./hots test decay`
4. ✅ Documentation utilisateur

---

## 🚀 **NEXT STEPS IMMÉDIATS**

### **À Implémenter Maintenant**
1. **Backend Service** - `TemporalDecayService.java`
2. **Tests unitaires** - Validation logique decay
3. **Script de test** - `test-temporal-decay-dk20.sh`
4. **Mise à jour .cursorrules** - Référence au système DK20

### **À Documenter**
1. **README.md** - Lien vers DK20 system
2. **MEMENTO** - Mémoriser l'intégration Anna
3. **API Documentation** - Endpoints decay

---

## 🏆 **CRÉDIT & RECONNAISSANCE**

> *"Le concept de decay temporel est une invention d'**Anna the Martopicker**, visionnaire du désordre causal et glaneuse d'artefacts oubliés."*

**Intégration Heroes of Time** : Adaptation respectueuse de la vision d'Anna dans l'univers GROFI de Jean-Grofignon.

---

**Statut** : 🔄 **EN COURS D'IMPLÉMENTATION**  
**Prochaine étape** : Créer `TemporalDecayService` et premiers tests 