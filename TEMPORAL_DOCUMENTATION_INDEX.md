# 📚 TEMPORAL SCRIPT LANGUAGE - DOCUMENTATION INDEX

> **Complete Documentation Suite for Heroes of Time Temporal Language**

---

## 🎯 QUICK NAVIGATION

### 🚀 **FOR DEVELOPERS**
- **[⚡ Quick Guide](./TEMPORAL_SCRIPT_QUICK_GUIDE.md)** - Essential commands and patterns
- **[🔧 Technical Reference](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md)** - Complete grammar and specification

### 👥 **FOR USERS**
- **[⚡ Quick Guide](./TEMPORAL_SCRIPT_QUICK_GUIDE.md)** - Getting started with examples
- **[🎮 Game Mechanics](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#-user-guide)** - How to play with temporal scripts

### 🤖 **FOR AI ASSISTANTS**
- **[🧠 AI Guidelines](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#-ai-assistant-guidelines)** - Processing and generation rules
- **[🔄 Parser Integration](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#-developer-reference)** - Technical integration

---

## 📖 DOCUMENT OVERVIEW

### 📋 **TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md**
**Complete Technical Specification**

- **Size**: ~200 sections
- **Audience**: Developers, AI systems, technical users
- **Content**:
  - 📝 Formal EBNF grammar
  - 🎭 Dual syntax system (Lisp + Greek)
  - 💫 Temporal commands specification
  - 🎮 Game mechanics reference
  - 🔧 Developer integration guide
  - 👥 User manual
  - 🤖 AI assistant guidelines
  - 📊 Performance benchmarks
  - 🎯 Error codes and troubleshooting

### ⚡ **TEMPORAL_SCRIPT_QUICK_GUIDE.md**
**Essential Reference & Getting Started**

- **Size**: ~100 sections
- **Audience**: Developers, power users, AI assistants
- **Content**:
  - 🎯 Syntax cheat sheet
  - 🚀 Essential commands
  - 💡 Common patterns
  - 🎮 Game mechanics basics
  - 🔧 Developer integration
  - 🤖 AI assistant patterns
  - 📊 Example scripts
  - ⚠️ Common mistakes
  - 🎯 Quick reference

---

## 🚀 GETTING STARTED WORKFLOW

### 🔰 **Absolute Beginner**
1. Read **[Quick Guide - Getting Started](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-getting-started)**
2. Try **[Example Scripts - Beginner](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-example-scripts)**
3. Reference **[Common Patterns](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-common-patterns)**

### 🎮 **Game Player**
1. Start with **[Quick Guide - Essential Commands](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-essential-commands)**
2. Learn **[Game Mechanics](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-game-mechanics)**
3. Practice **[Example Scripts](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-example-scripts)**

### 💻 **Developer**
1. Read **[Developer Integration](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-developer-integration)**
2. Study **[Technical Reference](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#-developer-reference)**
3. Review **[Performance Benchmarks](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#performance-benchmarks)**

### 🤖 **AI Assistant**
1. Study **[AI Guidelines](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#-ai-assistant-guidelines)**
2. Learn **[Intent Recognition](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-ai-assistant-patterns)**
3. Practice **[Code Generation](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#-code-generation)**

---

## 🎯 SYNTAX FORMATS

### 🚀 **Lisp Format** (Recommended for Complex Scripts)
```lisp
(PSI quantum_battle 
  (SEQUENCE 
    (MOV Arthur @10,15) 
    (BATTLE Arthur Dragon)) 
  (DELTA_T 3) 
  (PROB 0.8))
```

### 🏛️ **Greek Format** (Compact Mathematical Notation)
```
ψ1: ⊙(MOV(Arthur, @10,15)) Δt=3 P=0.8
†ψ1
```

---

## 🏆 PARSER PERFORMANCE

Based on comprehensive benchmarking:

| **Script Type** | **Best Parser** | **Performance** | **Use Case** |
|-----------------|-----------------|-----------------|--------------|
| Simple Commands | Original | 🥇 45,653 ops/sec | Backward compatibility |
| Temporal Scripts | Original | 🥇 9,525 ops/sec | Production temporal |
| Complex Nested | Lisp | 🥇 40% accuracy | Advanced structures |
| High Volume | Regex | 🥇 229,653 ops/sec | Batch processing |

---

## 🎮 COMMAND CATEGORIES

### 🦸 **Hero Management**
- `HERO` - Create hero
- `MOV` - Move hero
- `BATTLE` - Combat
- `EQUIP` - Equip items
- `LEVELUP` - Advance hero

### ⏰ **Temporal Operations**
- `PSI` - Create quantum state
- `COLLAPSE` - Execute state
- `OBSERVE` - Set trigger
- `DELTA_T` - Time offset
- `BRANCH` - Timeline

### 🏰 **Strategic Commands**
- `BUILD` - Construct buildings
- `COLLECT` - Gather resources
- `RECRUIT` - Hire units
- `CAST` - Use magic
- `SIEGE` - Attack structures

---

## 🔧 DEVELOPMENT TOOLS

### 🧪 **Testing Suite**
- **[Parser Performance Test](./backend/src/test/java/com/heroesoftimepoc/temporalengine/ParserPerformanceComparisonTest.java)**
- **[Grammar Validation](./backend/src/test/java/com/heroesoftimepoc/temporalengine/TemporalScriptParserTest.java)**

### 📊 **Parser Components**
- **[Lisp Parser](./backend/src/main/java/com/heroesoftimepoc/temporalengine/service/LispTemporalScriptParser.java)**
- **[Regex Parser](./backend/src/main/java/com/heroesoftimepoc/temporalengine/service/RegexTemporalScriptParser.java)**
- **[Parser Adapter](./backend/src/main/java/com/heroesoftimepoc/temporalengine/service/ParserAdapter.java)**

### 🎯 **Integration Point**
- **[Temporal Engine Service](./backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java)**

---

## 🤖 AI ASSISTANT QUICK REFERENCE

### 🎯 **Intent Recognition**
```
"Move Arthur to 10,15 in 3 turns" → (PSI move_arthur (MOV Arthur @10,15) (DELTA_T 3))
"Attack dragon" → (BATTLE CurrentHero Dragon)
"Build castle at 50,50" → BUILD(Castle, @50,50, PLAYER:CurrentPlayer)
"Collect 1000 gold" → COLLECT(RESOURCE, Gold, 1000, PLAYER:CurrentPlayer)
```

### 🔄 **Format Selection**
```
Simple command → Either format
Complex nested → Lisp format
Mathematical → Greek format
Performance critical → Regex format
```

### ⚡ **Common Translations**
```
ψ1 → psi1
†ψ1 → (COLLAPSE psi1)
⊙(action) → (OBSERVE action)
Δt=3 → (DELTA_T 3)
P=0.8 → (PROB 0.8)
```

---

## 📚 ADDITIONAL RESOURCES

### 📖 **Related Documentation**
- **[Architecture Overview](./ARCHITECTURE.md)**
- **[Development Roadmap](./DEVELOPMENT_ROADMAP.md)**
- **[Contributing Guide](./CONTRIBUTING.md)**

### 🎯 **Testing & Validation**
- **[Test Summary](./TEST_STATUS_SUMMARY.md)**
- **[Backend Tests](./backend/test-backend-unit.sh)**
- **[Performance Reports](./PARSER_PERFORMANCE_REPORT.md)**

### 🚀 **Getting Started**
- **[Quick Start](./README.md)**
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)**
- **[Developer Instructions](./DEVELOPER_INSTRUCTIONS.md)**

---

## 🎯 FEEDBACK & CONTRIBUTIONS

### 🐛 **Found Issues?**
- Check **[Common Mistakes](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-common-mistakes)**
- Review **[Error Codes](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#error-codes)**
- Create an issue with example script

### 💡 **Suggestions?**
- Propose new commands
- Suggest syntax improvements
- Share complex use cases

### 🔧 **Want to Contribute?**
- Read **[Contributing Guide](./CONTRIBUTING.md)**
- Study **[Developer Reference](./TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md#-developer-reference)**
- Start with **[Parser Integration](./TEMPORAL_SCRIPT_QUICK_GUIDE.md#-developer-integration)**

---

## 🎉 SUMMARY

The **Temporal Script Language** documentation provides:

✅ **Complete grammar specification** with EBNF  
✅ **Dual syntax system** (Lisp + Greek)  
✅ **Performance benchmarks** for optimal usage  
✅ **AI assistant guidelines** for intelligent processing  
✅ **Developer integration** guides  
✅ **User-friendly examples** and patterns  
✅ **Comprehensive error handling**  
✅ **Extensible architecture** for future growth  

**Happy scripting!** 🚀

---

*Last Updated: July 2025 | Version 2.0* 