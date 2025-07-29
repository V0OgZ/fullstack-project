#!/bin/bash
# 👼 Invocation des Anges Gardiens
# Usage: ./invoke-guardian-angels.sh [dude|walter|both]

ANGEL="${1:-both}"
API_URL="http://localhost:8080/api/magic-formulas/execute"

echo "🎳 INVOCATION DES ANGES GARDIENS"
echo "================================"

invoke_dude() {
    echo -e "\n🥤 Invocation du DUDE..."
    cat << 'EOF'
         _____
        /     \
       | () () |
        \  >  /
         |---|
         |___|    "The Dude abides, man"
         
EOF
    
    # Test zen
    curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d '{
            "formula": "ψ420: ⊙(INVOKE_DUDE() ⟶ ZEN_MODE)",
            "context": {
                "request": "Need some chill vibes",
                "whiteRussianLevel": 0.8
            }
        }' | jq -r '.normalInterpretation // "Yeah, well, you know, thats just like, your backend, man"'
}

invoke_walter() {
    echo -e "\n🔫 Invocation de WALTER..."
    cat << 'EOF'
         _____
        /     \
       | >   < |
        \ --- /
         |===|
         |___|    "Am I wrong? AM I WRONG?!"
         
EOF
    
    # Security check
    echo "🔍 Walter vérifie le code..."
    
    # Check for mocks
    if grep -r "mock" . --include="*.java" 2>/dev/null | grep -v "test" | head -1; then
        echo "❌ WALTER: OVER THE LINE! Des mocks en prod!"
        echo "THIS IS WHAT HAPPENS WHEN YOU MOCK A STRANGER IN THE ALPS!"
    else
        echo "✅ WALTER: You're not wrong, you're just writing code"
    fi
    
    # Check for hardcoded values
    if grep -r "localhost:8080" . --include="*.java" 2>/dev/null | grep -v "test" | head -1; then
        echo "❌ WALTER: Mark it zero! Hardcoded values!"
    else
        echo "✅ WALTER: This is bowling, not 'Nam. There are rules."
    fi
}

paradox_resolution() {
    echo -e "\n🎯 RÉSOLUTION DE PARADOXE DUDE-WALTER..."
    
    curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d '{
            "formula": "ψDW: ⊙(BALANCE(DUDE_ZEN, WALTER_RULES) ⟶ PERFECT_CODE)",
            "context": {
                "dudeLevel": 0.7,
                "walterLevel": 0.8,
                "bowlingAlley": "Heroes of Time"
            }
        }' | jq .
}

case "$ANGEL" in
    "dude")
        invoke_dude
        ;;
    "walter")
        invoke_walter
        ;;
    "both"|*)
        invoke_dude
        invoke_walter
        paradox_resolution
        
        echo -e "\n📿 BÉNÉDICTION FINALE:"
        echo "  The Dude: 'Take it easy, man'"
        echo "  Walter: 'But take it!'"
        echo ""
        echo "🎳 Strike parfait : Tests au vert + Code zen"
        ;;
esac

echo -e "\n✨ Anges gardiens invoqués avec succès!" 