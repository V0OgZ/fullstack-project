# 🎨 HEROES OF TIME - DIAGRAMMES D'ARCHITECTURE

## 🌐 Architecture Globale

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[React UI :8000]
        WS[WebSocket Client]
    end
    
    subgraph "API Gateway"
        REST[REST API :8080]
        WSS[WebSocket Server :8001]
    end
    
    subgraph "Integration Layer"
        GCIS[GrofiCausalIntegrationService]
        GCIS --> |coordinates| TES
        GCIS --> |immunities| GHS
        GCIS --> |collapse| CCS
    end
    
    subgraph "Core Services"
        TES[TemporalEngineService]
        GHS[GrofiHeroService]
        CCS[CausalCollapseService]
        QIS[QuantumInterferenceService]
        ETS[ExtendedTemporalEngineService]
    end
    
    subgraph "Data Layer"
        DB[(H2 Database)]
        JSON[JSON Resources]
    end
    
    UI --> REST
    UI --> WS
    WS --> WSS
    REST --> GCIS
    WSS --> GCIS
    
    TES --> DB
    GHS --> JSON
    CCS --> DB
    QIS --> TES
    ETS --> TES
```

## 🔄 Flux d'Exécution d'un Script Temporel

```mermaid
sequenceDiagram
    participant User
    participant API
    participant Parser
    participant Integration
    participant Temporal
    participant Causal
    participant DB
    
    User->>API: POST /api/temporal/execute
    Note right of User: ψ001: (0.8+0.6i) ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
    
    API->>Parser: parseScript()
    Parser->>Parser: detectScriptType()
    alt GROFI Extended Script
        Parser->>Integration: executeWithCausalProtection()
        Integration->>Integration: checkImmunities()
        Integration->>Temporal: delegateExecution()
    else Standard Temporal Script
        Parser->>Temporal: executeTemporalScript()
    end
    
    Temporal->>DB: createPsiState()
    Temporal->>Causal: checkCollapseTriggers()
    
    alt Collapse Detected
        Causal->>Causal: processCollapse()
        Causal->>DB: updateGameState()
        Causal->>API: CollapseResult
    else No Collapse
        Temporal->>API: PsiStateCreated
    end
    
    API->>User: ExecutionResult
```

## 🌀 États Quantiques et Interférences

```mermaid
graph LR
    subgraph "Timeline ℬ1"
        PSI1[ψ001: 0.707+0.0i]
        PSI2[ψ002: 0.707+0.0i]
    end
    
    subgraph "Interference Engine"
        CALC[Calculate Interference]
        PSI1 --> CALC
        PSI2 --> CALC
        CALC --> |Constructive| AMP[Amplitude: 1.414+0.0i]
        AMP --> PROB[Probability: 2.0]
    end
    
    subgraph "Game Effect"
        PROB --> |200%| BOOST[Damage Boost]
        PROB --> |200%| SUCCESS[Success Rate]
    end
```

## 🌊 Types de Collapse Causale

```mermaid
graph TD
    subgraph "Collapse Detection"
        TICK[Game Tick] --> SCAN[Scan Active ψ-States]
        SCAN --> DET{Detect Trigger?}
    end
    
    DET -->|Spatial Conflict| INT[INTERACTION]
    DET -->|Player Enters Zone| OBS[OBSERVATION]
    DET -->|Artifact Used| ANC[ANCHORING]
    
    INT --> BATTLE[Phantom Battle Resolution]
    OBS --> FORCE[Force Collapse]
    ANC --> GLOBAL[Global Collapse]
    
    BATTLE --> UPDATE[Update Game State]
    FORCE --> UPDATE
    GLOBAL --> UPDATE
```

## 🦸 Système d'Immunités GROFI

```mermaid
graph TB
    subgraph "Hero: Jean-Grofignon"
        JG[Jean-Grofignon]
        JG --> |has| IMM1[IMMUNE_ROLLBACK]
        JG --> |has| IMM2[IMMUNE_COLLAPSE]
        JG --> |has| IMM3[IMMUNE_SRTI]
    end
    
    subgraph "Action Attempt"
        ACT1[†ψ001 - Rollback]
        ACT2[Collapse Override]
        ACT3[Observation Force]
    end
    
    subgraph "Immunity Check"
        CHECK{Check Immunities}
        ACT1 --> CHECK
        ACT2 --> CHECK
        ACT3 --> CHECK
        
        CHECK -->|IMMUNE_ROLLBACK| BLOCK1[❌ Blocked]
        CHECK -->|IMMUNE_COLLAPSE| ALLOW[✅ Allowed]
        CHECK -->|IMMUNE_SRTI| BLOCK2[❌ Blocked]
    end
```

## 📊 World State Graph Structure

```mermaid
graph TD
    subgraph "World State Graph"
        WSG[World State Graph]
        WSG --> SN[Spatial Nodes]
        WSG --> CC[Causal Connections]
        WSG --> TL[Temporal Layers]
        WSG --> FOG[Fog of Causality]
        
        SN --> HERO[Heroes]
        SN --> PSI[ψ-States]
        SN --> ART[Artifacts]
        SN --> BUILD[Buildings]
        
        CC --> SPATIAL[Spatial Links]
        CC --> TEMPORAL[Temporal Links]
        CC --> QUANTUM[Quantum Links]
        
        FOG --> CALC[Fog Calculation]
        CALC --> |factors| DENS[Quantum Density]
        CALC --> |factors| CONF[Conflict Intensity]
        CALC --> |factors| INTER[Interference Level]
    end
```

## 🔄 Timeline Fork Mechanism

```mermaid
graph LR
    subgraph "Initial State"
        T1[Timeline ℬ1]
        T1 --> PSI1[ψ001: MOV Arthur @15,15]
        T1 --> PSI2[ψ002: MOV Ragnar @15,15]
    end
    
    subgraph "Conflict Detection"
        DETECT{Spatial Conflict?}
        PSI1 --> DETECT
        PSI2 --> DETECT
        DETECT -->|YES| FORK
    end
    
    subgraph "Fork Result"
        FORK[Fork Timeline]
        FORK --> T1B[Timeline ℬ1]
        FORK --> T2[Timeline ℬ2]
        T1B --> PSI1B[ψ001 remains]
        T2 --> PSI2B[ψ002 migrated]
    end
```

## 🎮 Complete Game Flow

```mermaid
stateDiagram-v2
    [*] --> GameStart
    GameStart --> PlayerAction
    
    PlayerAction --> ScriptParsing
    ScriptParsing --> ImmunityCheck
    
    ImmunityCheck --> PsiStateCreation: Allowed
    ImmunityCheck --> ActionBlocked: Blocked
    
    PsiStateCreation --> WaitingForCollapse
    WaitingForCollapse --> CollapseDetection: Each Tick
    
    CollapseDetection --> ProcessCollapse: Trigger Found
    CollapseDetection --> WaitingForCollapse: No Trigger
    
    ProcessCollapse --> InterferenceCalc: Multiple States
    ProcessCollapse --> DirectExecution: Single State
    
    InterferenceCalc --> ExecuteWinner
    DirectExecution --> UpdateGameState
    ExecuteWinner --> UpdateGameState
    
    UpdateGameState --> PlayerAction
    ActionBlocked --> PlayerAction
```

## 🌟 Quantum Amplitude Lifecycle

```mermaid
graph TD
    subgraph "Creation"
        INPUT[User Input: 0.8+0.6i]
        INPUT --> PARSE[Parse Complex Number]
        PARSE --> CREATE[Create ComplexAmplitude]
    end
    
    subgraph "Evolution"
        CREATE --> EVOLVE[Time Evolution]
        EVOLVE --> |e^(-iEt/ℏ)| PHASE[Phase Rotation]
    end
    
    subgraph "Interference"
        PHASE --> INTER{Other States?}
        INTER -->|Yes| CALC[Calculate Interference]
        INTER -->|No| SINGLE[Single State]
        CALC --> RESULT[Combined Amplitude]
    end
    
    subgraph "Collapse"
        RESULT --> COLLAPSE[Collapse to Reality]
        SINGLE --> COLLAPSE
        COLLAPSE --> PROB[|ψ|² → Action Probability]
        PROB --> EXECUTE[Execute in Game]
    end
```

## 📡 API Request Flow

```mermaid
flowchart LR
    subgraph "Client"
        REQ[HTTP Request]
        WS[WebSocket]
    end
    
    subgraph "Spring Boot"
        CTRL[Controller Layer]
        AUTH[Authentication]
        VALID[Validation]
    end
    
    subgraph "Business Logic"
        SERV[Service Layer]
        CACHE[Cache Layer]
    end
    
    subgraph "Persistence"
        REPO[Repository]
        DB[(Database)]
    end
    
    REQ --> CTRL
    WS --> CTRL
    CTRL --> AUTH
    AUTH --> VALID
    VALID --> SERV
    SERV --> CACHE
    CACHE --> REPO
    REPO --> DB
    
    DB --> REPO
    REPO --> CACHE
    CACHE --> SERV
    SERV --> CTRL
    CTRL --> REQ
```

## 🔍 Monitoring & Metrics Flow

```mermaid
graph TB
    subgraph "Game Events"
        E1[ψ-State Created]
        E2[Collapse Detected]
        E3[Timeline Forked]
        E4[Interference Calculated]
    end
    
    subgraph "Metrics Collection"
        COLL[MetricsCollector]
        E1 --> COLL
        E2 --> COLL
        E3 --> COLL
        E4 --> COLL
    end
    
    subgraph "Analysis"
        COLL --> STRESS[Stress Calculator]
        COLL --> PERF[Performance Monitor]
        COLL --> GAME[Game Statistics]
    end
    
    subgraph "Alerts"
        STRESS -->|> 0.7| ALERT1[High Stress Alert]
        PERF -->|> 500ms| ALERT2[Performance Alert]
        GAME -->|> 100 states| ALERT3[State Limit Alert]
    end
```

---

Ces diagrammes illustrent les principaux flux et composants du système Heroes of Time, facilitant la compréhension de l'architecture complexe et des interactions entre les différents modules.