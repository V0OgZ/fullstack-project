# 🎯 **TODO FORMULES MAGIQUES - PLAN WALTER COMPLET**

**🛋️ JEAN-GROFIGNON :** *"Voici la TODO complète pour finir les 91 formules restantes !"*

---

## 📊 **ÉTAT ACTUEL**
- **✅ Implémentées** : 5/96 formules (5.2%)
- **🚧 Restantes** : 91 formules à coder
- **🏗️ Architecture** : MagicFormulaEngine.java existe
- **🔗 Parseur** : Lien HOTS ↔ Formules documenté

---

## 🎯 **TODO PAR CATÉGORIE**

### **🔮 CATÉGORIE A : 40 FORMULES RUNIQUES NATIVES** 
*Directement traduisibles avec grammaire runique existante*

**✅ DÉJÀ FAITES (5) :**
- MODIFY_ENERGY(hero, +50) ✅
- TELEPORT_HERO(hero, x, y) ✅  
- HEAL_HERO(target) ✅
- DAMAGE_ENEMY(target, damage) ✅
- CREATE_SHIELD(hero, strength) ✅

**🚧 À IMPLÉMENTER (35) :**
- CREATE_EFFECT(healing_glow, 2)
- AMPLIFY(ψ1, 3.0)
- CONSTRUCTIVE(ψ1, ψ2)
- DESTRUCTIVE(ψ1, ψ2)
- COLLAPSE_TEMPORAL_STATES()
- FORCE_COLLAPSE_ALL(hero, 4)
- TEMPORAL_BOOST(hero, duration)
- ENERGY_DRAIN(target, amount)
- PHASE_SHIFT(hero, plane)
- QUANTUM_LEAP(hero, coordinates)
- MANA_RESTORE(hero, amount)
- SPELL_REFLECT(hero, duration)
- INVISIBILITY(hero, turns)
- SPEED_BOOST(hero, multiplier)
- STRENGTH_BOOST(hero, bonus)
- DEFENSE_BOOST(hero, bonus)
- LUCK_MODIFIER(hero, value)
- MORALE_BOOST(hero, value)
- EXPERIENCE_GAIN(hero, xp)
- LEVEL_UP(hero)
- SKILL_BOOST(hero, skill, value)
- ARTIFACT_ENHANCE(item, level)
- WEAPON_ENCHANT(weapon, effect)
- ARMOR_ENCHANT(armor, effect)
- POTION_CREATE(type, potency)
- SCROLL_CREATE(spell, uses)
- GOLD_MULTIPLY(amount, factor)
- RESOURCE_GENERATE(type, amount)
- BUILDING_ACCELERATE(building, factor)
- UNIT_SUMMON(type, count)
- CREATURE_CHARM(target, duration)
- MIND_CONTROL(target, turns)
- FEAR_EFFECT(targets, radius)
- STUN_EFFECT(target, duration)
- SLEEP_EFFECT(targets, turns)

### **⚡ CATÉGORIE B : 30 FORMULES HYBRIDES**
*Parsing + logique Java métier*

**🚧 À IMPLÉMENTER (30) :**
- AREA_DAMAGE(target, radius, damage)
- CONDITIONAL_DAMAGE(condition, dmg1, dmg2)
- CROSS_INSTANCE(world1, world2)
- RESURRECT_HERO(target)
- CHAIN_LIGHTNING(start, jumps, damage)
- METEOR_SHOWER(area, count, damage)
- EARTHQUAKE(epicenter, magnitude)
- BLIZZARD(area, duration, damage)
- TORNADO(path, strength)
- FLOOD(area, depth)
- FIRE_WALL(line, duration)
- ICE_WALL(line, height)
- MAGIC_BARRIER(area, strength)
- ANTI_MAGIC_FIELD(center, radius)
- DISPEL_MAGIC(target, level)
- COUNTERSPELL(caster, spell)
- SPELL_STEAL(target, spell)
- MANA_BURN(target, amount)
- SPELL_IMMUNITY(hero, school)
- MAGIC_RESISTANCE(hero, percentage)
- ELEMENTAL_SHIELD(hero, element)
- DAMAGE_REFLECTION(hero, percentage)
- LIFE_STEAL(attacker, percentage)
- VAMPIRIC_AURA(hero, radius)
- REGENERATION(hero, rate)
- POISON(target, damage, duration)
- DISEASE(target, effects)
- CURSE(target, penalties)
- BLESSING(target, bonuses)
- DIVINE_INTERVENTION(hero, trigger)

### **🔥 CATÉGORIE C : 26 FORMULES HARDCODÉES**
*Logique complexe Java pur*

**🚧 À IMPLÉMENTER (26) :**
- BREAK_FOURTH_WALL(message)
- NARRATIVE_JUMP(timeline)
- META_OBSERVE(rendering_engine)
- QUANTUM_COLLAPSE_ALL()
- REALITY_WARP(parameters)
- TIME_STOP(duration)
- TIME_ACCELERATION(factor)
- TIME_REWIND(turns)
- PARALLEL_UNIVERSE(branch)
- DIMENSION_DOOR(exit_point)
- PLANE_SHIFT(destination)
- ASTRAL_PROJECTION(hero)
- SOUL_TRAP(target, container)
- LIFE_FORCE_TRANSFER(source, target)
- CONSCIOUSNESS_SWAP(hero1, hero2)
- MEMORY_WIPE(target, scope)
- MIND_READ(target, depth)
- PROPHECY(future_event)
- FATE_MANIPULATION(outcome)
- LUCK_CONTROL(target, duration)
- PROBABILITY_SHIFT(event, chance)
- CHAOS_FIELD(area, intensity)
- ORDER_RESTORATION(area)
- ENTROPY_REVERSAL(target)
- CREATION_FORCE(matter, energy)
- DESTRUCTION_WAVE(epicenter, power)

---

## 🔧 **PROBLÈMES TECHNIQUES À RÉSOUDRE**

### **🌐 ENDPOINTS API CASSÉS**
- `/api/formulas/test-simple` → Erreur 405 (Method Not Allowed)
- `/api/formulas/available` → Erreur 500 (Internal Server Error)
- **CAUSE** : Problème dans FormulaController.java

### **🔗 INTÉGRATION PARSEUR HOTS**
- Lien entre états ψ (psi) et formules Java
- Symboles HOTS (⊙, †, Π) → Actions backend
- Contexte temporel → GameContext

---

## 📚 **DOCUMENTS DE RÉFÉRENCE**
- `docs/FORMULES_ET_APTITUDES_AUDIT_COMPLET.md` ← **96 formules listées**
- `PLAN_INTELLIGENT_FORMULES_MAGIQUES.md` ← **Catégorisation Walter**
- `MEMENTO/CURRENT_SESSION/SESSION_WALTER_BACKEND_FORMULES_MAGIQUES.md` ← **Architecture**
- `backend/src/main/java/com/example/demo/service/MagicFormulaEngine.java` ← **Code existant**

---

## 🚀 **PLAN D'IMPLÉMENTATION**

### **PHASE 1 - URGENT**
1. **Réparer les endpoints API** (FormulaController)
2. **Tester les 5 formules existantes**

### **PHASE 2 - FORMULES RUNIQUES (35)**
1. Implémenter CREATE_EFFECT, AMPLIFY, CONSTRUCTIVE
2. Ajouter TEMPORAL_BOOST, ENERGY_DRAIN, PHASE_SHIFT
3. Continuer avec les 29 autres...

### **PHASE 3 - FORMULES HYBRIDES (30)**
1. Implémenter AREA_DAMAGE, CONDITIONAL_DAMAGE
2. Ajouter CHAIN_LIGHTNING, METEOR_SHOWER
3. Continuer avec les 26 autres...

### **PHASE 4 - FORMULES HARDCODÉES (26)**
1. Implémenter BREAK_FOURTH_WALL, NARRATIVE_JUMP
2. Ajouter META_OBSERVE, QUANTUM_COLLAPSE_ALL
3. Continuer avec les 22 autres...

---

**🛋️ JEAN :** *"Voilà ! Maintenant on a tout dans un seul fichier ! Plus d'éparpillement !"* 