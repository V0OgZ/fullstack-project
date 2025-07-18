grammar HeroesOfTimeScript;

/*
 * ╔══════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🏛️ HEROES OF TIME - TEMPORAL SCRIPT GRAMMAR                     ║
 * ║                              ANTLR4 Grammar Definition                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * This grammar defines the complete Heroes of Time temporal script language using ANTLR4.
 * It supports all patterns from basic hero actions to complex quantum temporal mechanics.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────┐
 * │                              🎯 SUPPORTED SYNTAX                                   │
 * └─────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ╭─ Temporal Commands ──────────────────────────────────────────────────────────────────╮
 * │ ψ1: ⊙(Δt+2 @10,15 ⟶ MOV(Arthur, @10,15))    ──▶ Quantum superposition            │
 * │ †ψ1                                           ──▶ Collapse quantum state           │
 * │ Π(Hero enters @10,15) ⇒ †ψ1                  ──▶ Observation triggers collapse     │
 * ╰──────────────────────────────────────────────────────────────────────────────────────╯
 * 
 * ╭─ Basic Game Commands ────────────────────────────────────────────────────────────────╮
 * │ HERO(Arthur)                                  ──▶ Create hero                       │
 * │ MOV(Arthur, @10,15)                           ──▶ Move hero                         │
 * │ CREATE(CREATURE, Dragon, @5,7)                ──▶ Create entity                     │
 * │ USE(ITEM, AvantWorldBlade, HERO:Arthur)       ──▶ Use temporal artifact            │
 * │ BATTLE(Arthur, Dragon)                        ──▶ Combat                           │
 * ╰──────────────────────────────────────────────────────────────────────────────────────╯
 * 
 * ╭─ Heroes of Might & Magic 3 Commands ─────────────────────────────────────────────────╮
 * │ BUILD(Castle, @50,50, PLAYER:RedPlayer)       ──▶ Build structure                  │
 * │ RECRUIT(UNIT, Archers, 10, HERO:Arthur)       ──▶ Recruit units                   │
 * │ CAST(SPELL, Fireball, TARGET:Dragon, HERO:Wizard) ──▶ Cast spells                 │
 * │ COLLECT(RESOURCE, Gold, 1000, PLAYER:Me)      ──▶ Gather resources                │
 * ╰──────────────────────────────────────────────────────────────────────────────────────╯
 * 
 * ╭─ Timeline Commands ──────────────────────────────────────────────────────────────────╮
 * │ TIMELINE(ℬ2)                                  ──▶ Create timeline branch           │
 * │ MERGE(ℬ1, ℬ2)                                 ──▶ Merge timeline branches          │
 * ╰──────────────────────────────────────────────────────────────────────────────────────╯
 */

// =========================================
// 🎯 MAIN RULES
// =========================================

script
    : temporalScript
    | basicScript
    | timelineScript
    | EOF
    ;

// =========================================
// 🌀 TEMPORAL SCRIPT RULES
// =========================================

temporalScript
    : psiState
    | collapseCommand
    | observationTrigger
    ;

psiState
    : PSI_ID ':' observation timeline?
    ;

observation
    : ODOT '(' temporalExpression ')'
    ;

temporalExpression
    : deltaTime position? ARROW action
    | deltaTime ARROW action
    | position ARROW action
    | action
    ;

collapseCommand
    : DAGGER PSI_ID
    ;

observationTrigger
    : PI '(' condition ')' ARROW DAGGER PSI_ID
    ;

condition
    : IDENTIFIER 'enters' position ('at' deltaTime)?
    | IDENTIFIER 'spawns' position
    | IDENTIFIER 'destroyed'
    | IDENTIFIER 'uses' IDENTIFIER
    | customCondition
    ;

customCondition
    : IDENTIFIER+ // Flexible condition parsing
    ;

// =========================================
// 🎮 BASIC SCRIPT RULES
// =========================================

basicScript
    : heroCommand
    | movementCommand
    | createCommand
    | useCommand
    | battleCommand
    | hmm3Command
    ;

heroCommand
    : 'HERO' '(' IDENTIFIER ')'
    ;

movementCommand
    : 'MOV' '(' IDENTIFIER ',' position ')'
    ;

createCommand
    : 'CREATE' '(' createType ',' IDENTIFIER (',' position)? ')'
    ;

createType
    : 'CREATURE'
    | 'ITEM'
    | 'STRUCTURE'
    | 'BUILDING'
    ;

useCommand
    : 'USE' '(' useType ',' IDENTIFIER ',' target ')'
    ;

useType
    : 'ITEM'
    | 'SPELL'
    | 'ABILITY'
    ;

target
    : 'HERO:' IDENTIFIER
    | 'TARGET:' IDENTIFIER
    | position
    | IDENTIFIER
    ;

battleCommand
    : 'BATTLE' '(' combatant ',' combatant ')'
    ;

combatant
    : 'HERO' IDENTIFIER
    | 'CREATURE' IDENTIFIER
    | IDENTIFIER
    ;

// =========================================
// 🏰 HEROES OF MIGHT & MAGIC 3 RULES
// =========================================

hmm3Command
    : buildCommand
    | recruitCommand
    | castCommand
    | collectCommand
    | learnCommand
    | levelUpCommand
    | exploreCommand
    | equipCommand
    | siegeCommand
    | captureCommand
    ;

buildCommand
    : 'BUILD' '(' IDENTIFIER ',' position ',' 'PLAYER:' IDENTIFIER ')'
    ;

recruitCommand
    : 'RECRUIT' '(' 'UNIT' ',' IDENTIFIER ',' NUMBER ',' 'HERO:' IDENTIFIER ')'
    ;

castCommand
    : 'CAST' '(' 'SPELL' ',' IDENTIFIER ',' 'TARGET:' IDENTIFIER ',' 'HERO:' IDENTIFIER ')'
    ;

collectCommand
    : 'COLLECT' '(' 'RESOURCE' ',' IDENTIFIER ',' NUMBER ',' 'PLAYER:' IDENTIFIER ')'
    ;

learnCommand
    : 'LEARN' '(' 'SPELL' ',' IDENTIFIER ',' 'HERO:' IDENTIFIER ')'
    ;

levelUpCommand
    : 'LEVELUP' '(' IDENTIFIER ',' 'SKILL:' IDENTIFIER ')'
    ;

exploreCommand
    : 'EXPLORE' '(' IDENTIFIER ',' position ',' 'HERO:' IDENTIFIER ')'
    ;

equipCommand
    : 'EQUIP' '(' 'ARTIFACT' ',' IDENTIFIER ',' 'HERO:' IDENTIFIER ')'
    ;

siegeCommand
    : 'SIEGE' '(' IDENTIFIER ',' position ',' 'HERO:' IDENTIFIER ')'
    ;

captureCommand
    : 'CAPTURE' '(' 'OBJECTIVE' ',' IDENTIFIER ',' 'HERO:' IDENTIFIER ')'
    ;

// =========================================
// 🌊 TIMELINE SCRIPT RULES
// =========================================

timelineScript
    : timelineCommand
    | mergeCommand
    ;

timelineCommand
    : 'TIMELINE' '(' timeline ')'
    ;

mergeCommand
    : 'MERGE' '(' timeline ',' timeline ')'
    ;

timeline
    : TIMELINE_ID
    ;

// =========================================
// 📍 UTILITY RULES
// =========================================

action
    : basicScript
    | complexAction
    ;

complexAction
    : IDENTIFIER '(' argumentList ')'
    ;

argumentList
    : argument (',' argument)*
    ;

argument
    : IDENTIFIER
    | NUMBER
    | STRING
    | position
    | target
    ;

position
    : '@' NUMBER ',' NUMBER
    ;

deltaTime
    : 'Δt' SIGN? NUMBER
    ;

// =========================================
// 🔤 LEXER RULES (TOKENS)
// =========================================

// Temporal symbols
PSI_ID          : 'ψ' [0-9]+;
DAGGER          : '†';
ODOT            : '⊙';
PI              : 'Π';
ARROW           : '⟶' | '->' | '⇒';
TIMELINE_ID     : 'ℬ' [0-9]+;

// Common symbols
SIGN            : '+' | '-';
NUMBER          : [0-9]+;
IDENTIFIER      : [a-zA-Z_][a-zA-Z0-9_]*;
STRING          : '"' (~["\r\n])* '"';

// Punctuation
LPAREN          : '(';
RPAREN          : ')';
COMMA           : ',';
COLON           : ':';
AT              : '@';

// Whitespace and comments
WS              : [ \t\r\n]+ -> skip;
COMMENT         : '//' ~[\r\n]* -> skip;
BLOCK_COMMENT   : '/*' .*? '*/' -> skip;

// Error handling for unknown characters
ERROR_CHAR      : .; 