# ��️ HEROES OF TIME – COMPLETE TEMPORAL CODEX
**Version:** V3.0 – Unified Temporal Codex + Complex Amplitudes  
**Last Update:** 2025-07-18

---

## 📋 Table of Contents

1. [General Concept](#-general-concept)
2. [Complex Amplitudes](#-complex-amplitudes)
3. [Temporality System](#-temporality--causality-system)
4. [Temporal Interferences](#-temporal-interferences)
5. [Temporal Artifacts](#️-temporal-artifacts)
6. [Temporal Creatures](#-temporal-creatures)
7. [Practical Examples](#-practical-examples)
8. [Technical Implementation](#-technical-implementation)

---

## 🔷 General Concept

*Heroes of Time* is a **temporal** strategy game combining classic **Heroes of Might & Magic 3** mechanics with an **advanced temporality system** using **complex amplitudes**.

### Fundamental Principles

- **Asynchronous Timelines**: Each player evolves in their own timeline
- **Complex Amplitudes**: `ψ = a + bi` replaces simple probabilities
- **Temporal Superposition**: Future actions exist in probability states (ψ-states)
- **Interferences**: Constructive (P > 1.0) and destructive (P = 0.0)
- **Temporal Artifacts**: Allow reading, writing, or rewriting reality

---

## 🧮 Complex Amplitudes

### 1. Amplitude Format
Temporal amplitudes are complex numbers that replace simple probabilities.

**Format:** `ψ = a + bi` where:
- `a` = real part (x coordinate)
- `b` = imaginary part (y coordinate)
- `|ψ|² = a² + b²` = probability

**Concrete examples:**
```
ψ₁ = 0.8 + 0.6i  → P = 0.8² + 0.6² = 1.0 (100%)
ψ₂ = 0.707 + 0.707i → P = 0.707² + 0.707² = 1.0 (100%)
ψ₃ = 1.0 + 0.0i  → P = 1.0² + 0.0² = 1.0 (100%)
```

### 2. Amplitude Visualization
Amplitudes can be visualized as vectors in the complex plane:
- **Magnitude**: `|ψ|` = vector length
- **Phase**: `θ = arctan(b/a)` = angle with real axis
- **Probability**: `P = |ψ|²` = squared magnitude

### 3. Amplitude Operations
```
Addition: ψ₁ + ψ₂ = (a₁ + a₂) + (b₁ + b₂)i
Multiplication: ψ₁ × ψ₂ = (a₁a₂ - b₁b₂) + (a₁b₂ + b₁a₂)i
Conjugate: ψ* = a - bi
```

---

## ⚙️ Temporality & Causality System

### 1. Timeline Branches (ℬ)
Each player can navigate between different timeline branches:
- **ℬ₀**: Original timeline (game start)
- **ℬ₁, ℬ₂, ...**: Alternative branches created by temporal actions
- **Active Branch**: The timeline where the player currently acts

### 2. ψ-States (Quantum Superposition)
Actions can be programmed to execute in the future:
```
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO:Arthur, @15,15))
```
- **ψ001**: Unique state identifier
- **⊙**: Superposition operator
- **Δt+2**: Executes in 2 turns
- **@15,15**: Target position
- **⟶**: Action projection

### 3. Collapse (†)
A ψ-state becomes reality through collapse:
- **Direct**: `†ψ001` - Force immediate collapse
- **By observation**: `Π(condition) ⇒ †ψ001`
- **Temporal**: Automatic when Δt expires

---

## 🌊 Temporal Interferences

### 1. Constructive Interference
When two ψ-states reinforce each other:
```
ψ₁ = 0.6 + 0.8i (Move Arthur)
ψ₂ = 0.6 + 0.8i (Move Arthur)
ψ_total = ψ₁ + ψ₂ = 1.2 + 1.6i
P = |ψ_total|² = 1.2² + 1.6² = 4.0 (400%!)
```
**Result**: Action guaranteed with bonus effects

### 2. Destructive Interference
When two ψ-states cancel each other:
```
ψ₁ = 0.8 + 0.6i (Move Arthur right)
ψ₂ = -0.8 - 0.6i (Move Arthur left)
ψ_total = ψ₁ + ψ₂ = 0 + 0i
P = |ψ_total|² = 0 (0%)
```
**Result**: No action occurs

### 3. Partial Interference
Most common case with intermediate probability:
```
ψ₁ = 0.8 + 0.6i
ψ₂ = 0.3 - 0.4i
ψ_total = 1.1 + 0.2i
P = |ψ_total|² = 1.1² + 0.2² = 1.25 (125%)
```

---

## ��️ Temporal Artifacts

### 1. Temporal Blade
- **Effect**: Cut through timelines
- **Formula**: `CUT_TIMELINE(ℬ_current) → CREATE(ℬ_new)`
- **Cost**: 50 temporal energy

### 2. Wigner's Eye
- **Effect**: Observe all ψ-states in radius
- **Formula**: `REVEAL(ψ-states, radius: 5)`
- **Special**: Can trigger collapses

### 3. Causal Anchor
- **Effect**: Lock a position across all timelines
- **Formula**: `ANCHOR(@x,y, duration: 3)`
- **Counter**: Prevents timeline shifts

### 4. Quantum Amplifier
- **Effect**: Boost ψ-state amplitudes
- **Formula**: `ψ_new = ψ_old × 1.5`
- **Risk**: Can cause paradoxes

---

## 🐉 Temporal Creatures

### 1. Quantum Phoenix
- **HP**: 100 + 20i (partially in superposition)
- **Attack**: Creates ψ-states on death
- **Special**: Resurrects in alternate timeline

### 2. Probability Spider
- **Movement**: Exists in multiple positions
- **Attack**: Entangles enemies in ψ-webs
- **Defense**: 50% chance to be elsewhere

### 3. Temporal Lich
- **Ability**: Drain future possibilities
- **Attack**: Retroactive damage
- **Special**: Exists across all timelines

---

## 💡 Practical Examples

### Example 1: Basic Temporal Movement
```hots
# Arthur moves in 2 turns
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO:Arthur, @15,15))

# Force immediate execution
†ψ001
```

### Example 2: Conditional Collapse
```hots
# Attack only if enemy is weakened
ψ002: ⊙(Δt+1 @20,20 ⟶ ATTACK(HERO:Arthur, CREATURE:lich))
Π(lich.hp < 30) ⇒ †ψ002
```

### Example 3: Timeline Branch Combat
```hots
# Create new branch
BRANCH(ℬ₁ → ℬ₂)

# Program different actions in each
[ℬ₁] ψ003: ⊙(Δt+1 ⟶ DEFEND(HERO:Arthur))
[ℬ₂] ψ004: ⊙(Δt+1 ⟶ ATTACK(HERO:Arthur))

# Player chooses which timeline to keep
PRUNE(ℬ₁) or PRUNE(ℬ₂)
```

---

## 🔧 Technical Implementation

### Backend (Java/Spring)
```java
@Entity
public class PsiState {
    private String id;
    private Complex amplitude;
    private int deltaT;
    private Position target;
    private String action;
    private StateStatus status;
    
    public double getProbability() {
        return amplitude.abs() * amplitude.abs();
    }
}
```

### Frontend (React/TypeScript)
```typescript
interface PsiState {
    id: string;
    amplitude: { real: number; imag: number };
    deltaT: number;
    target: Position;
    action: string;
    status: 'active' | 'collapsed' | 'cancelled';
}

function calculateInterference(psi1: PsiState, psi2: PsiState): number {
    const sum = {
        real: psi1.amplitude.real + psi2.amplitude.real,
        imag: psi1.amplitude.imag + psi2.amplitude.imag
    };
    return sum.real ** 2 + sum.imag ** 2;
}
```

### HOTS Script Parser
```python
def parse_psi_state(script):
    pattern = r'ψ(\d+): \(([\d.]+)\+([\d.]+)i\) ⊙\(Δt\+(\d+) @(\d+),(\d+) ⟶ (.+)\)'
    match = re.match(pattern, script)
    if match:
        return {
            'id': f'ψ{match.group(1)}',
            'amplitude': complex(float(match.group(2)), float(match.group(3))),
            'deltaT': int(match.group(4)),
            'position': (int(match.group(5)), int(match.group(6))),
            'action': match.group(7)
        }
```

---

## 🎮 Game Balance

### Amplitude Limits
- **Maximum**: |ψ| ≤ 1.5 (to prevent infinite loops)
- **Minimum**: |ψ| ≥ 0.1 (to ensure actions have effect)

### Temporal Energy Cost
- **Create ψ-state**: 10 energy
- **Force collapse**: 20 energy
- **Branch timeline**: 50 energy
- **Merge timelines**: 100 energy

### Paradox Prevention
- **Grandfather Paradox**: Blocked by causal locks
- **Bootstrap Paradox**: Limited to 3 recursive loops
- **Observer Paradox**: Resolved by quantum decoherence

---

## 📚 Conclusion

The temporal system in Heroes of Time creates a unique strategic depth where players must think not just about the present, but about multiple possible futures. The use of complex amplitudes adds a mathematical elegance that mirrors real quantum mechanics while remaining accessible through the fantasy theme.

**Key Takeaways:**
- Actions can exist in superposition before becoming real
- Complex amplitudes determine probability and interference
- Timeline branches allow exploring multiple strategies
- Temporal artifacts provide powerful but costly options
- The system rewards planning and prediction

---

**📚 Memento - Museum Archive Master**  
*Eternal Archivist of Heroes of Time*
