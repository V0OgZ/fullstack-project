# 🚀 TEMPORAL SCRIPT LANGUAGE REFERENCE
## Complete Grammar & Usage Guide

> **Version**: 2.0  
> **Date**: July 2025  
> **Compatibility**: Dual Parser System (Lisp + Regex)  

---

## 📋 TABLE OF CONTENTS

- [🎯 Overview](#-overview)
- [📝 Formal Grammar](#-formal-grammar)
- [🎭 Dual Syntax System](#-dual-syntax-system)
- [💫 Temporal Commands](#-temporal-commands)
- [🎮 Basic Game Commands](#-basic-game-commands)
- [🏰 Strategic Commands](#-strategic-commands)
- [📊 Examples Library](#-examples-library)
- [🔧 Developer Reference](#-developer-reference)
- [👥 User Guide](#-user-guide)
- [🤖 AI Assistant Guidelines](#-ai-assistant-guidelines)

---

## 🎯 OVERVIEW

The **Temporal Script Language** is a domain-specific language designed for Heroes of Time temporal game mechanics. It supports quantum-like superposition states, temporal branching, and complex strategic gameplay through two complementary syntax formats.

### Key Features
- **Dual Syntax**: Lisp S-expressions and Greek mathematical notation
- **Temporal Mechanics**: PSI states, collapse operations, timeline branching
- **Strategic Gaming**: Heroes of Might & Magic 3 style commands
- **Quantum Concepts**: Superposition, observation, probability

---

## 📝 FORMAL GRAMMAR

### EBNF Grammar Definition

```ebnf
(* Temporal Script Language Grammar *)
temporal_script     ::= expression
expression          ::= temporal_command | basic_command | strategic_command

(* Temporal Commands *)
temporal_command    ::= psi_state | collapse_command | observation_command

psi_state           ::= lisp_psi_state | greek_psi_state
lisp_psi_state      ::= '(' 'PSI' psi_id action_expr temporal_params* ')'
greek_psi_state     ::= 'ψ' psi_id ':' observation? '(' action_expr ')' temporal_modifiers*

collapse_command    ::= lisp_collapse | greek_collapse
lisp_collapse       ::= '(' 'COLLAPSE' psi_id ')'
greek_collapse      ::= '†ψ' psi_id

observation_command ::= lisp_observation | greek_observation
lisp_observation    ::= '(' 'OBSERVE' psi_id '(' 'WHEN' condition ')' ')'
greek_observation   ::= '⊙(' psi_id '):' condition

(* Basic Commands *)
basic_command       ::= hero_command | movement_command | creation_command | battle_command

hero_command        ::= lisp_hero | standard_hero
lisp_hero           ::= '(' 'HERO' hero_name ')'
standard_hero       ::= 'HERO(' hero_name ')'

movement_command    ::= lisp_movement | standard_movement
lisp_movement       ::= '(' 'MOV' hero_name position ')'
standard_movement   ::= 'MOV(' hero_name ',' position ')'

(* Strategic Commands *)
strategic_command   ::= build_command | recruit_command | cast_command | collect_command

build_command       ::= 'BUILD(' structure_type ',' position ',' 'PLAYER:' player_id ')'
recruit_command     ::= 'RECRUIT(' 'UNIT,' unit_type ',' quantity ',' 'HERO:' hero_name ')'
cast_command        ::= 'CAST(' 'SPELL,' spell_name ',' 'TARGET:' target ',' 'HERO:' hero_name ')'
collect_command     ::= 'COLLECT(' 'RESOURCE,' resource_type ',' quantity ',' 'PLAYER:' player_id ')'

(* Primitives *)
psi_id              ::= identifier
hero_name           ::= identifier | string
position            ::= '@' integer ',' integer
identifier          ::= letter (letter | digit | '_')*
string              ::= '"' (char | escape_sequence)* '"'
integer             ::= ['-']? digit+
decimal             ::= ['-']? digit+ '.' digit+

(* Temporal Modifiers *)
temporal_params     ::= delta_t | branch_id | probability
delta_t             ::= '(' 'DELTA_T' integer ')' | 'Δt=' integer
branch_id           ::= '(' 'BRANCH' identifier ')' | 'α=' identifier
probability         ::= '(' 'PROB' decimal ')' | 'P=' decimal

(* Tokens *)
letter              ::= 'A'..'Z' | 'a'..'z'
digit               ::= '0'..'9'
```

---

## 🎭 DUAL SYNTAX SYSTEM

The language supports **two equivalent syntax formats** that can be used interchangeably:

### 1. **Lisp S-Expression Format** 🚀
- **Philosophy**: Formal grammar with unlimited nesting
- **Advantages**: Precise, extensible, error-resistant
- **Best for**: Complex nested structures, AI parsing

```lisp
(PSI quantum_state 
  (ACTION (SEQUENCE 
    (MOV hero @10,15) 
    (BATTLE hero dragon))) 
  (DELTA_T 3) 
  (PROB 0.8))
```

### 2. **Greek Mathematical Format** 🏛️
- **Philosophy**: Compact notation inspired by physics
- **Advantages**: Concise, mathematical elegance
- **Best for**: Quick scripting, mathematical expressions

```
ψ1: ⊙(MOV(Arthur, @10,15)) Δt=3 P=0.8
```

---

## 💫 TEMPORAL COMMANDS

### PSI State Creation

**Purpose**: Create quantum-like superposition states that execute in future timelines

#### Lisp Format
```lisp
(PSI <psi_id> <action> [<temporal_params>...])

Examples:
(PSI psi1 (MOV Arthur @10,15) (DELTA_T 3))
(PSI quantum_battle (BATTLE hero dragon) (DELTA_T 1) (PROB 0.7))
(PSI multi_action 
  (SEQUENCE 
    (MOV hero @5,5) 
    (COLLECT gold 100)) 
  (DELTA_T 2) 
  (BRANCH alpha))
```

#### Greek Format
```
ψ<id>: [⊙](<action>) [Δt=<time>] [α=<branch>] [P=<probability>]

Examples:
ψ1: ⊙(MOV(Arthur, @10,15)) Δt=3
ψ2: ⊙(BATTLE(Arthur, Dragon)) Δt=1 P=0.7
ψ3: ⊙(SEQUENCE(MOV(Hero, @5,5), COLLECT(gold, 100))) Δt=2 α=alpha
```

### Collapse Operations

**Purpose**: Force PSI states to collapse into definite outcomes

#### Lisp Format
```lisp
(COLLAPSE <psi_id>)

Examples:
(COLLAPSE psi1)
(COLLAPSE quantum_battle)
```

#### Greek Format
```
†ψ<id>

Examples:
†ψ1
†ψ2
```

### Observation Commands

**Purpose**: Set up conditional triggers for PSI state collapse

#### Lisp Format
```lisp
(OBSERVE <psi_id> (WHEN <condition>))

Examples:
(OBSERVE psi1 (WHEN (HERO_AT @10,15)))
(OBSERVE quantum_battle (WHEN (HERO_HEALTH <50)))
```

#### Greek Format
```
⊙(ψ<id>): <condition>

Examples:
⊙(ψ1): HERO_AT(@10,15)
⊙(ψ2): HERO_HEALTH(<50)
```

---

## 🎮 BASIC GAME COMMANDS

### Hero Management

#### Hero Creation
```lisp
(HERO <hero_name>)
HERO(<hero_name>)

Examples:
(HERO Arthur)
HERO(Sorceress)
```

#### Hero Movement
```lisp
(MOV <hero_name> <position>)
MOV(<hero_name>, <position>)

Examples:
(MOV Arthur @10,15)
MOV(Sorceress, @25,30)
```

### Entity Creation
```lisp
(CREATE (TYPE <type>) (NAME <name>) [(POSITION <position>)])
CREATE(<type>, <name> [, <position>])

Examples:
(CREATE (TYPE ITEM) (NAME "Temporal Sword"))
CREATE(CREATURE, Dragon, @50,50)
```

### Item Usage
```lisp
(USE <item_type> <item_name> [<target>])
USE(<item_type>, <item_name> [, <target>])

Examples:
(USE POTION "Healing Potion" Arthur)
USE(SPELL, Fireball, HERO:Wizard)
```

### Battle Commands
```lisp
(BATTLE <attacker> <defender>)
BATTLE(<attacker>, <defender>)

Examples:
(BATTLE Arthur Dragon)
BATTLE(Knight, Orc)
```

---

## 🏰 STRATEGIC COMMANDS

### Building & Construction
```
BUILD(<structure_type>, <position>, PLAYER:<player_id>)

Examples:
BUILD(Castle, @50,50, PLAYER:RedPlayer)
BUILD(Mine, @10,20, PLAYER:BluePlayer)
BUILD(Tower, @0,0, PLAYER:AI)
```

### Resource Management
```
COLLECT(RESOURCE, <resource_type>, <quantity>, PLAYER:<player_id>)

Examples:
COLLECT(RESOURCE, Gold, 1000, PLAYER:RedPlayer)
COLLECT(RESOURCE, Wood, 50, PLAYER:BluePlayer)
COLLECT(RESOURCE, Gems, 5, PLAYER:AI)
```

### Unit Recruitment
```
RECRUIT(UNIT, <unit_type>, <quantity>, HERO:<hero_name>)

Examples:
RECRUIT(UNIT, Archers, 10, HERO:Arthur)
RECRUIT(UNIT, Dragons, 1, HERO:Sorceress)
RECRUIT(UNIT, Knights, 5, HERO:Paladin)
```

### Magic System
```
CAST(SPELL, <spell_name>, TARGET:<target>, HERO:<hero_name>)
LEARN(SPELL, <spell_name>, HERO:<hero_name>)

Examples:
CAST(SPELL, Fireball, TARGET:Dragon, HERO:Wizard)
CAST(SPELL, Heal, TARGET:Self, HERO:Cleric)
LEARN(SPELL, Teleport, HERO:Sorceress)
```

### Hero Development
```
LEVELUP(<hero_name>, SKILL:<skill_name>)
EQUIP(ARTIFACT, <artifact_name>, HERO:<hero_name>)

Examples:
LEVELUP(Arthur, SKILL:Sword_Mastery)
EQUIP(ARTIFACT, Temporal_Sword, HERO:Knight)
```

### Exploration & Combat
```
EXPLORE(<terrain_type>, <position>, HERO:<hero_name>)
SIEGE(<target>, <position>, HERO:<hero_name>)
CAPTURE(OBJECTIVE, <objective_name>, HERO:<hero_name>)

Examples:
EXPLORE(Forest, @15,20, HERO:Arthur)
SIEGE(Castle, @100,100, HERO:Paladin)
CAPTURE(OBJECTIVE, Ancient_Artifact, HERO:Sorceress)
```

---

## 📊 EXAMPLES LIBRARY

### Simple Scenarios

#### Basic Hero Setup
```lisp
;; Create and position heroes
(HERO Arthur)
(HERO Sorceress)
(MOV Arthur @10,15)
(MOV Sorceress @20,25)
```

#### Resource Collection
```
COLLECT(RESOURCE, Gold, 500, PLAYER:Player1)
COLLECT(RESOURCE, Wood, 100, PLAYER:Player1)
BUILD(Castle, @50,50, PLAYER:Player1)
```

### Temporal Scenarios

#### Simple Temporal Movement
```lisp
;; Lisp format
(PSI future_move (MOV Arthur @30,35) (DELTA_T 3))
(COLLAPSE future_move)

;; Greek format
ψ1: ⊙(MOV(Arthur, @30,35)) Δt=3
†ψ1
```

#### Conditional Temporal Action
```lisp
;; Create PSI state with observation trigger
(PSI stealth_attack (BATTLE Arthur Dragon) (DELTA_T 2) (PROB 0.6))
(OBSERVE stealth_attack (WHEN (HERO_HEALTH >80)))
```

#### Complex Temporal Sequence
```lisp
(PSI complex_strategy 
  (SEQUENCE 
    (MOV Arthur @15,20)
    (COLLECT gold 200)
    (BATTLE Arthur Guardian)
    (COLLECT artifact "Temporal_Crystal")) 
  (DELTA_T 5) 
  (BRANCH timeline_alpha) 
  (PROB 0.75))
```

### Advanced Scenarios

#### Multi-Timeline Strategy
```lisp
;; Branch A: Aggressive approach
(PSI aggressive_branch 
  (SEQUENCE 
    (RECRUIT (UNIT Dragons 2) (HERO Arthur))
    (SIEGE Castle @100,100)
    (BATTLE Arthur DefenderKing)) 
  (DELTA_T 3) 
  (BRANCH alpha) 
  (PROB 0.4))

;; Branch B: Diplomatic approach
(PSI diplomatic_branch 
  (SEQUENCE 
    (COLLECT (RESOURCE Gold 2000))
    (CAST (SPELL Diplomacy) (TARGET Castle))
    (CAPTURE (OBJECTIVE Castle))) 
  (DELTA_T 4) 
  (BRANCH beta) 
  (PROB 0.6))
```

#### Quantum Superposition Combat
```
ψ1: ⊙(BATTLE(Arthur, Dragon)) Δt=1 P=0.5 α=victory
ψ2: ⊙(RETREAT(Arthur, @0,0)) Δt=1 P=0.3 α=retreat
ψ3: ⊙(CAST(SPELL, Teleport, TARGET:@50,50)) Δt=1 P=0.2 α=escape
```

---

## 🔧 DEVELOPER REFERENCE

### Parser Integration

#### Using the Dual Parser System
```java
@Autowired
private LispTemporalScriptParser lispParser;

@Autowired
private RegexTemporalScriptParser regexParser;

@Autowired
private ParserAdapter parserAdapter;

public ParseResult parseScript(String script) {
    // Try Lisp parser first
    if (lispParser.isTemporalScript(script)) {
        return lispParser.parse(script);
    }
    
    // Fallback to regex parser
    if (regexParser.isTemporalScript(script)) {
        PsiState psiState = regexParser.parseTemporalScript(script);
        return parserAdapter.normalize(psiState);
    }
    
    // Handle basic commands
    return parseBasicCommand(script);
}
```

#### Adding New Commands

1. **Extend Grammar**: Add new patterns to EBNF
2. **Update Tokenizer**: Add new token types
3. **Implement Parser**: Add parsing logic for both formats
4. **Add Tests**: Create comprehensive test cases

### Performance Benchmarks

Based on comprehensive testing:

| Parser Type | Simple Scripts | Temporal Scripts | Complex Scripts | Large Volume |
|-------------|---------------|------------------|-----------------|--------------|
| **Original** | 🥇 45,653 ops/sec | 🥇 9,525 ops/sec | 🥈 8,568 ops/sec | 🥈 170,116 ops/sec |
| **Lisp** | 🥉 0 ops/sec | 🥉 4,395 ops/sec | 🥇 7,444 ops/sec | 🥉 23,875 ops/sec |
| **Regex** | 🥈 35,185 ops/sec | 🥈 9,067 ops/sec | 🥉 6,617 ops/sec | 🥇 229,653 ops/sec |

**Recommendations**:
- Use **Regex Parser** for high-volume simple scripts
- Use **Lisp Parser** for complex nested structures
- Use **Original Parser** for backward compatibility

---

## 👥 USER GUIDE

### Getting Started

#### 1. Choose Your Syntax Style

**Mathematical Style** (Greek symbols):
- Compact and elegant
- Inspired by physics notation
- Great for quick scripting

**Programming Style** (Lisp):
- Explicit and structured
- Better error messages
- Ideal for complex scenarios

#### 2. Basic Workflow

1. **Create Heroes**: `HERO(Arthur)`
2. **Position Them**: `MOV(Arthur, @10,15)`
3. **Plan Actions**: `ψ1: ⊙(BATTLE(Arthur, Dragon)) Δt=3`
4. **Execute**: `†ψ1`

#### 3. Common Patterns

**Resource Management**:
```
COLLECT(RESOURCE, Gold, 1000, PLAYER:You)
BUILD(Castle, @50,50, PLAYER:You)
RECRUIT(UNIT, Knights, 5, HERO:Arthur)
```

**Temporal Strategy**:
```lisp
(PSI backup_plan 
  (SEQUENCE 
    (MOV Arthur @safe_zone)
    (CAST SPELL Heal TARGET:Self)) 
  (DELTA_T 2))
```

**Combat Preparation**:
```
EQUIP(ARTIFACT, Sword_of_Power, HERO:Arthur)
LEARN(SPELL, Fireball, HERO:Arthur)
CAST(SPELL, Bless, TARGET:Arthur, HERO:Cleric)
```

### Best Practices

1. **Use Meaningful Names**: `PSI escape_route` vs `PSI psi1`
2. **Plan Probabilities**: Consider realistic success rates
3. **Test Scenarios**: Use simple commands first
4. **Document Complex Scripts**: Add comments for clarity

---

## 🤖 AI ASSISTANT GUIDELINES

### For AI Models Processing This Language

#### 1. **Parser Selection Strategy**
```
IF script contains "(" AND script contains "PSI|MOV|HERO"
    → Use Lisp Parser
ELSE IF script contains "ψ|†|⊙|Δt"
    → Use Regex Parser  
ELSE
    → Use Basic Command Parser
```

#### 2. **Common Translation Patterns**
```
Greek → Lisp Equivalents:
ψ1 → psi1
†ψ1 → (COLLAPSE psi1)
⊙(action) → (OBSERVE action)
Δt=3 → (DELTA_T 3)
α=branch → (BRANCH branch)
P=0.8 → (PROB 0.8)
```

#### 3. **Error Handling**
- **Syntax Errors**: Suggest corrections with examples
- **Semantic Errors**: Validate game logic (positions, resources)
- **Performance Warnings**: Recommend optimal parser choice

#### 4. **Code Generation**
When generating scripts:
1. **Prefer Lisp format** for complex nested structures
2. **Use Greek format** for simple mathematical expressions
3. **Validate coordinates** against game map boundaries
4. **Check resource availability** before commands
5. **Ensure hero existence** before actions

#### 5. **User Intent Recognition**
```
User says "move Arthur to position 10,15 in 3 turns"
→ Generate: (PSI move_arthur (MOV Arthur @10,15) (DELTA_T 3))

User says "ψ1: attack dragon"
→ Generate: ψ1: ⊙(BATTLE(CurrentHero, Dragon)) Δt=1
```

---

## 📚 APPENDIX

### Symbol Reference

| Symbol | Unicode | Meaning | Example |
|--------|---------|---------|---------|
| ψ | U+03C8 | Psi state | ψ1: ⊙(MOV(Arthur, @10,15)) |
| † | U+2020 | Collapse | †ψ1 |
| ⊙ | U+2299 | Observation | ⊙(BATTLE(Arthur, Dragon)) |
| Δt | U+0394 | Delta time | Δt=3 |
| α | U+03B1 | Alpha branch | α=timeline_a |
| β | U+03B2 | Beta branch | β=timeline_b |
| γ | U+03B3 | Gamma branch | γ=timeline_c |
| @ | U+0040 | Position | @10,15 |

### Reserved Keywords

#### Lisp Format
- `PSI`, `COLLAPSE`, `OBSERVE`, `WHEN`
- `HERO`, `MOV`, `CREATE`, `BATTLE`, `USE`
- `DELTA_T`, `BRANCH`, `PROB`
- `SEQUENCE`, `IF`, `WHILE`, `CALC`
- `BUILD`, `COLLECT`, `RECRUIT`, `CAST`, `LEARN`
- `LEVELUP`, `EQUIP`, `EXPLORE`, `SIEGE`, `CAPTURE`

#### Greek Format
- `ψ`, `†`, `⊙`, `Δt`, `α`, `β`, `γ`
- `HERO`, `MOV`, `CREATE`, `BATTLE`, `USE`
- `BUILD`, `COLLECT`, `RECRUIT`, `CAST`, `LEARN`
- `LEVELUP`, `EQUIP`, `EXPLORE`, `SIEGE`, `CAPTURE`
- `PLAYER:`, `HERO:`, `TARGET:`, `RESOURCE`, `UNIT`, `SPELL`

### Error Codes

| Code | Description | Example |
|------|-------------|---------|
| E001 | Syntax Error | Unclosed parenthesis |
| E002 | Unknown Command | Invalid command name |
| E003 | Invalid Position | Position out of bounds |
| E004 | Hero Not Found | Referenced hero doesn't exist |
| E005 | Resource Insufficient | Not enough resources |
| E006 | PSI State Conflict | Overlapping PSI states |
| E007 | Timeline Error | Invalid timeline reference |
| E008 | Probability Error | Invalid probability value |

---

## 🎯 CONCLUSION

The Temporal Script Language provides a powerful and flexible system for expressing complex game mechanics with temporal elements. Its dual syntax system accommodates both mathematical precision and programming clarity, making it suitable for diverse use cases from simple game commands to complex quantum-like strategic scenarios.

**Key Takeaways**:
- Use **Lisp format** for complex, nested structures
- Use **Greek format** for compact mathematical expressions  
- Combine both formats seamlessly in the same system
- Leverage temporal mechanics for advanced strategic gameplay
- Follow best practices for optimal performance

For questions, improvements, or contributions, please refer to the development team or AI assistant guidelines above.

---

*This document is living documentation that evolves with the language. Last updated: July 2025* 