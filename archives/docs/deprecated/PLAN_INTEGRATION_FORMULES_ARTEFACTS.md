# 🔧 PLAN INTÉGRATION FORMULES ARTEFACTS

**Objectif :** Intégrer les formules JSON des artefacts dans le système de collapse causal existant

---

## 🧠 **ARCHITECTURE ACTUELLE (80% fonctionnel)**

### ✅ **Ce qui MARCHE :**
- **CausalCollapseService** (608 lignes) - 3 types de collapse
- **QuantumInterferenceService** - Calculs d'interférences  
- **PsiState** avec amplitudes complexes
- **USE(ARTIFACT, nom, HERO:...)** basique

### ❌ **Ce qui MANQUE :**
- Parsing des commandes d'artefacts : `INTERFERE()`, `PHASE_SHIFT()`, `AMPLIFY()`
- Exécution des formules JSON
- Effets des artefacts sur les ψ-states

---

## 🎯 **SOLUTION EN 4 PHASES**

### **PHASE 1 : Étendre le TemporalScriptParser**

#### 📝 **Ajouter les patterns d'artefacts :**
```java
// Dans TemporalScriptParser.java
private static final Pattern INTERFERE_PATTERN = 
    Pattern.compile("INTERFERE\\((CONSTRUCTIVE|DESTRUCTIVE),\\s*(ψ\\d+),\\s*(ψ\\d+)\\)");

private static final Pattern PHASE_SHIFT_PATTERN = 
    Pattern.compile("PHASE_SHIFT\\((ψ\\d+),\\s*([-+]?\\d*\\.?\\d+)\\)");

private static final Pattern AMPLIFY_PATTERN = 
    Pattern.compile("AMPLIFY\\((ψ\\d+),\\s*(\\d*\\.?\\d+)\\)");

private static final Pattern RESONATE_PATTERN = 
    Pattern.compile("RESONATE\\((ψ\\d+),\\s*(\\d*\\.?\\d+)\\)");
```

#### 📝 **Parser ces commandes :**
```java
public ArtifactCommand parseArtifactCommand(String scriptLine) {
    Matcher interfereMatcher = INTERFERE_PATTERN.matcher(scriptLine);
    if (interfereMatcher.find()) {
        return new ArtifactCommand("INTERFERE", 
            interfereMatcher.group(1),  // CONSTRUCTIVE/DESTRUCTIVE
            interfereMatcher.group(2),  // ψ001
            interfereMatcher.group(3)); // ψ002
    }
    
    Matcher phaseMatcher = PHASE_SHIFT_PATTERN.matcher(scriptLine);
    if (phaseMatcher.find()) {
        return new ArtifactCommand("PHASE_SHIFT",
            phaseMatcher.group(1),      // ψ001
            phaseMatcher.group(2));     // 45.0
    }
    // ... autres patterns
}
```

### **PHASE 2 : Créer ArtifactEffectService**

#### 🔧 **Service principal pour exécuter les formules :**
```java
@Service
public class ArtifactEffectService {
    
    @Autowired
    private QuantumInterferenceService quantumInterferenceService;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    public Map<String, Object> executeArtifactFormula(Hero hero, String formula, 
                                                     Game game, String artifactId) {
        // 1. Vérifier que le héros possède l'artefact
        if (!hero.hasItem(artifactId)) {
            return createError("Héros ne possède pas l'artefact: " + artifactId);
        }
        
        // 2. Charger les propriétés de l'artefact depuis JSON
        ArtifactDefinition artifact = loadArtifactDefinition(artifactId);
        
        // 3. Vérifier l'énergie temporelle
        if (hero.getTemporalEnergy() < artifact.getEnergyCost()) {
            return createError("Énergie temporelle insuffisante");
        }
        
        // 4. Exécuter la formule
        return executeFormula(formula, hero, game, artifact);
    }
    
    private Map<String, Object> executeFormula(String formula, Hero hero, 
                                              Game game, ArtifactDefinition artifact) {
        ArtifactCommand command = temporalParser.parseArtifactCommand(formula);
        
        switch (command.getType()) {
            case "INTERFERE":
                return executeInterference(command, hero, game, artifact);
            case "PHASE_SHIFT":
                return executePhaseShift(command, hero, game, artifact);
            case "AMPLIFY":
                return executeAmplify(command, hero, game, artifact);
            case "RESONATE":
                return executeResonance(command, hero, game, artifact);
            default:
                return createError("Formule non reconnue: " + formula);
        }
    }
}
```

### **PHASE 3 : Implémenter les effets spécifiques**

#### ⚡ **Exemple - Interférence Constructive :**
```java
private Map<String, Object> executeInterference(ArtifactCommand command, 
                                               Hero hero, Game game, 
                                               ArtifactDefinition artifact) {
    String type = command.getParam(0);          // CONSTRUCTIVE
    String psiId1 = command.getParam(1);        // ψ001
    String psiId2 = command.getParam(2);        // ψ002
    
    // Récupérer les ψ-states
    PsiState psi1 = findPsiState(game, psiId1);
    PsiState psi2 = findPsiState(game, psiId2);
    
    if (psi1 == null || psi2 == null) {
        return createError("ψ-states introuvables");
    }
    
    // Vérifier que les deux utilisent les amplitudes complexes
    if (!psi1.isUsingComplexAmplitude() || !psi2.isUsingComplexAmplitude()) {
        return createError("Les ψ-states doivent utiliser les amplitudes complexes");
    }
    
    // Exécuter l'interférence
    ComplexAmplitude result;
    if ("CONSTRUCTIVE".equals(type)) {
        result = psi1.calculateConstructiveInterference(psi2);
        
        // Modifier l'amplitude du premier état
        psi1.setComplexAmplitude(result);
        // Effondrer le second état
        psi2.collapse();
        
    } else { // DESTRUCTIVE
        result = psi1.calculateDestructiveInterference(psi2);
        psi1.setComplexAmplitude(result);
        psi2.collapse();
    }
    
    // Décrémenter l'énergie temporelle
    hero.setTemporalEnergy(hero.getTemporalEnergy() - artifact.getEnergyCost());
    
    // Sauvegarder
    psiStateRepository.save(psi1);
    psiStateRepository.save(psi2);
    heroRepository.save(hero);
    
    Map<String, Object> response = new HashMap<>();
    response.put("success", true);
    response.put("effectType", "INTERFERENCE_" + type);
    response.put("resultingAmplitude", result.toString());
    response.put("newProbability", result.getProbability());
    response.put("energyUsed", artifact.getEnergyCost());
    
    return response;
}
```

### **PHASE 4 : Intégrer dans le workflow existant**

#### 🔗 **Modifier TemporalEngineService :**
```java
// Dans executeClassicGameScript()
case "USE":
    Map<String, String> useParams = (Map<String, String>) command.getParameters();
    String itemType = useParams.get("type");
    String itemName = useParams.get("item");
    String target = useParams.get("target");
    
    // NOUVEAU : Vérifier si c'est un artefact avec formules
    if ("ARTIFACT".equals(itemType)) {
        // Charger les formules de l'artefact
        List<String> formulas = grofiHeroService.getArtifactFormulas(itemName);
        
        if (!formulas.isEmpty()) {
            // Exécuter automatiquement la première formule disponible
            String formula = formulas.get(0);
            Hero hero = findHeroByName(game, extractHeroName(target));
            
            return artifactEffectService.executeArtifactFormula(hero, formula, game, itemName);
        }
    }
    
    // Fallback vers l'ancienne logique USE basique
    result = useGameItem(game, useParams);
    break;
```

---

## 📊 **EXEMPLES CONCRETS D'UTILISATION**

### **1. Miroir Quantique (Interférence Constructive) :**
```bash
# Créer deux ψ-states
ψ101: (0.6+0.8i) ⊙(Δt+1 @15,15 ⟶ MOV(Arthur, @15,15))
ψ102: (0.8+0.6i) ⊙(Δt+1 @15,15 ⟶ MOV(Morgana, @15,15))

# Utiliser le Miroir Quantique
USE(ARTIFACT, quantum_mirror, HERO:Tesla)

# Le système exécute automatiquement :
# INTERFERE(CONSTRUCTIVE, ψ101, ψ102)
# → Amplitude résultante : |1.4+1.4i|² = 3.92 (très élevée !)
```

### **2. Manipulateur d'Amplitudes (Ajustement de Phase) :**
```bash
# État quantique existant
ψ201: (0.7+0.7i) ⊙(Δt+2 @20,20 ⟶ CREATE(CASTLE, @20,20))

# Utiliser le Manipulateur
USE(ARTIFACT, amplitude_manipulator, HERO:Einstein)

# Le système exécute :
# PHASE_SHIFT(ψ201, 45)
# → Nouvelle amplitude : rotation de 45° dans le plan complexe
```

### **3. Détecteur de Cohérence (Mesure) :**
```bash
# Deux états cohérents
ψ301: (0.6+0.8i) ⊙(Δt+3 @25,25 ⟶ BATTLE(Arthur, Dragon))
ψ302: (0.8+0.6i) ⊙(Δt+3 @25,25 ⟶ BATTLE(Morgana, Dragon))

# Utiliser le Détecteur
USE(ARTIFACT, coherence_detector, HERO:Nikola)

# Le système exécute :
# MEASURE_COHERENCE(ψ301, ψ302)
# → Retourne le facteur de cohérence : 0.96 (très cohérent)
```

---

## 🎯 **AVANTAGES DE CETTE APPROCHE**

### ✅ **Réutilise l'existant :**
- S'appuie sur CausalCollapseService (déjà 608 lignes)
- Utilise QuantumInterferenceService existant
- Conserve ComplexAmplitude et PsiState

### ✅ **Architecture extensible :**
- Facile d'ajouter de nouvelles formules
- JSON reste déclaratif (facile à modifier)
- Code séparé par préoccupations

### ✅ **Compatible avec les tests :**
- Tous les tests actuels continuent à passer
- Nouveaux effets testables individuellement

---

## 🚀 **ROADMAP D'IMPLÉMENTATION**

### **Semaine 1 : Patterns de parsing**
- Ajouter INTERFERE_PATTERN, PHASE_SHIFT_PATTERN, etc.
- Créer ArtifactCommand class
- Tests unitaires des patterns

### **Semaine 2 : ArtifactEffectService**
- Service principal avec executeArtifactFormula()
- Implémentation des 4-5 formules principales
- Tests d'intégration

### **Semaine 3 : Intégration workflow**
- Modifier executeClassicGameScript()
- Tests end-to-end avec vraies formules
- Performance et debuggage

### **Semaine 4 : Polish & Documentation**
- Documentation des nouvelles formules
- Exemples dans les tests
- Optimisations si nécessaire

---

## 🎉 **RÉSULTAT ATTENDU**

**Après ces 4 phases, le système sera :**
- ✅ **95% fonctionnel** (au lieu de 80%)
- ✅ **Formules JSON exécutées** vraiment
- ✅ **Artefacts avec vrais effets** 
- ✅ **Architecture propre et extensible**

**Et les commandes marcheront vraiment :**
```bash
USE(ARTIFACT, quantum_mirror, HERO:Tesla)
# → Exécute vraiment INTERFERE(CONSTRUCTIVE, ψ101, ψ102)
# → Amplitude résultante calculée et appliquée
# → Effets visibles dans le jeu !
```

---

**🎯 Le gap de 20% sera comblé !** ⚡ 