# 🏗️ ARCHITECTURE DU MOTEUR - STYLE FORD

**Date** : 2025-01-29  
**Par** : MERLIN (ex-OPUS)  
**Format** : Diagramme FORD (pragmatique et direct)  

---

## 🎯 CORE ENGINE ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                       │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   React UI  │  │    Vue UI    │  │  WebSocket   │  │
│  │  Port 8000  │  │  Port 5174   │  │   Client     │  │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼────────────────┼──────────────────┼──────────┘
          │                │                  │
          ▼                ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                  CONTROLLER LAYER                       │
│                                                         │
│  ┌─────────────────────┐   ┌───────────────────────┐  │
│  │  FormulaController  │   │ BodyMagicController   │  │
│  │  /api/formulas/*    │   │ /api/magic/cast       │  │
│  └──────────┬──────────┘   └───────────┬───────────┘  │
│             │                           │               │
│  ┌──────────┴────────────────┬─────────┴────────────┐  │
│  │  MagicFormulaServiceController                   │  │
│  │  /api/magic-formula-service/*                    │  │
│  └─────────────┬────────────────────────────────────┘  │
│                │                                        │
│  ┌─────────────┴────────────────────────────────────┐  │
│  │      TemporalWebSocketController                 │  │
│  │      @MessageMapping("/temporal/*")              │  │
│  └─────────────┬────────────────────────────────────┘  │
└────────────────┼────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           🌟 MagicFormulaEngine 🌟              │   │
│  │                                                 │   │
│  │  executeFormula(formula, context)               │   │
│  │  ├─ parseFormula()                              │   │
│  │  ├─ evaluateQuantumState()                      │   │
│  │  └─ collapseToResult()                         │   │
│  └────────┬──────────────────┬─────────────────────┘   │
│           │                  │                          │
│  ┌────────▼──────┐  ┌───────▼────────┐                │
│  │MagicFormula   │  │ QuantumService │                │
│  │Service        │  │                │                │
│  │(wrapper)      │  │ - ψ states    │                │
│  └───────────────┘  │ - collapse    │                │
│                     │ - superpose   │                │
│                     └────────────────┘                │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │       InterdimensionalEngineService             │  │
│  │       (Uses MagicFormulaEngine)                 │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                           │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  H2 Database │  │ Game Context │  │  Formula     │ │
│  │  (In-Memory) │  │    State     │  │  Registry    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 KEY COMPONENTS

### **MagicFormulaEngine** (Core)
- **Location**: `backend/src/main/java/com/example/demo/service/`
- **Role**: Cœur du moteur de calcul des formules magiques
- **Features**:
  - Parse les formules HOTS
  - Évalue les états quantiques ψ
  - Collapse les superpositions
  - Connexion avec QuantumService

### **BodyMagicController** 
- **Location**: `backend/src/main/java/com/example/demo/controller/`
- **Role**: "Le corps agit" - exécution directe sans pensée
- **Endpoints**:
  - POST `/api/magic/cast`
  - GET `/api/paradox/list`
  - PUT `/api/timeline/merge`

### **QuantumService**
- **Role**: Gestion des états ψ et superpositions
- **Connected to**: MagicFormulaEngine via `connectToFormulaEngine()`
- **Features**:
  - États quantiques
  - Collapse causal
  - Superposition management

---

## 🌀 FLOW D'EXÉCUTION

```
1. REQUEST → Controller
     │
2. Controller → MagicFormulaEngine.executeFormula()
     │
3. Engine → Parse Formula
     │
4. Engine → QuantumService (if ψ states)
     │
5. Engine → Evaluate & Collapse
     │
6. Result → Response
```

---

## ⚡ CONNEXIONS IMPORTANTES

### **Fusion GROFI**
```java
// Dans MagicFormulaEngine
System.out.println("🌀 GROFI INIT: Connexion MagicFormulaEngine ↔ QuantumService");
```

### **Architecture Analysis**
- `ArchitectureAnalysisService` peut tester toutes les connexions
- Endpoints de diagnostic disponibles

### **WebSocket Real-time**
- `TemporalWebSocketController` utilise le moteur pour les états temps réel
- Gestion des ψ states via WebSocket

---

## 🎯 POINTS D'ATTENTION (WALTER STYLE)

1. **NO MOCKS** - Tout est connecté réellement
2. **Formula Registry** - Formules enregistrées, pas hardcodées
3. **Context Required** - Toujours passer un GameContext
4. **Quantum States** - Gérés par QuantumService séparé
5. **Multi-backends** - 3 versions dans NEXUS-TEMPOREL

---

*Diagramme créé par MERLIN - Action directe, pas de philosophie* 