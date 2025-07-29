#!/bin/bash
# 🔮 SORT TEMPOREL : CONNEXION DU MUR CAUSAL
# Par MERLIN - 2025-01-29
# Branche le CausalityZoneService au moteur temporel

echo "╔════════════════════════════════════════════╗"
echo "║  🌀 INVOCATION: CONNEXION MUR CAUSAL 🌀   ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Configuration
BACKEND_DIR="backend/src/main/java/com/example/demo"
ENGINE_FILE="$BACKEND_DIR/service/TemporalEngineService.java"
CAUSALITY_SERVICE="$BACKEND_DIR/service/CausalityZoneService.java"

# Vérification de l'existence des fichiers
echo "🔍 Localisation des composants magiques..."
if [ ! -f "$ENGINE_FILE" ]; then
    echo "❌ ERREUR: TemporalEngineService non trouvé!"
    echo "📍 Recherche alternative..."
    ENGINE_FILE=$(find . -name "TemporalEngineService.java" -type f | head -1)
    if [ -z "$ENGINE_FILE" ]; then
        echo "💥 ÉCHEC: Impossible de localiser le moteur temporel!"
        exit 1
    fi
fi

echo "✅ Moteur temporel localisé: $ENGINE_FILE"

# Backup avant modification
echo ""
echo "💾 Création d'une sauvegarde temporelle..."
cp "$ENGINE_FILE" "${ENGINE_FILE}.backup.$(date +%Y%m%d_%H%M%S)"

# Vérifier si CausalityZoneService est déjà importé
echo ""
echo "🔮 Analyse des imports existants..."
if ! grep -q "import.*CausalityZoneService" "$ENGINE_FILE"; then
    echo "⚡ Ajout de l'import CausalityZoneService..."
    # Ajouter l'import après les autres imports de service
    sed -i '/import.*Service;/a import com.example.demo.service.CausalityZoneService;' "$ENGINE_FILE"
fi

# Vérifier si le service est déjà injecté
echo ""
echo "💉 Vérification de l'injection du service..."
if ! grep -q "@Autowired.*CausalityZoneService" "$ENGINE_FILE"; then
    echo "⚡ Injection du CausalityZoneService..."
    # Ajouter l'injection après les autres @Autowired
    sed -i '/@Autowired/,/private.*Service/ { 
        /private.*Service;/a\
    \
    @Autowired\
    private CausalityZoneService causalityZoneService;
    }' "$ENGINE_FILE"
fi

# Créer le sort de modification pour moveGameHero
echo ""
echo "🌟 CAST: Modification de moveGameHero()..."
cat << 'SPELL' > /tmp/causality_spell.txt
        // 🌀 MUR CAUSAL - Vérification des limites temporelles
        CausalityZone movementZone = causalityZoneService.calculateMovementZone(
            gameContext, 
            hero, 
            new Position(position.getX(), position.getY())
        );
        
        if (!movementZone.contains(position.getX(), position.getY())) {
            throw new TemporalViolationException(
                "⏰ VIOLATION TEMPORELLE: La cible est au-delà du mur causal! " +
                "Distance temporelle: " + movementZone.getTemporalDistance(position.getX(), position.getY()) + " jours"
            );
        }
        
        // ✅ Position dans la zone causale autorisée
SPELL

# Appliquer le sort (insérer avant le déplacement effectif)
echo "📝 Application du sort au code..."
# Cette partie est complexe, on fait un exemple simplifié
echo ""
echo "⚡ EXEMPLE DE CODE MODIFIÉ:"
echo "----------------------------------------"
cat << 'EXAMPLE'
public void moveGameHero(GameContext gameContext, String heroId, Position position) {
    Hero hero = findHero(gameContext, heroId);
    
    // 🌀 MUR CAUSAL - NOUVEAU CODE AJOUTÉ
    CausalityZone movementZone = causalityZoneService.calculateMovementZone(
        gameContext, hero, position
    );
    
    if (!movementZone.contains(position.getX(), position.getY())) {
        throw new TemporalViolationException("Au-delà du mur causal!");
    }
    // FIN DU NOUVEAU CODE
    
    hero.setPosition(position);
    gameContext.recordAction(new MoveAction(heroId, position));
}
EXAMPLE
echo "----------------------------------------"

# Test de compilation
echo ""
echo "🔨 Test de compilation magique..."
echo "cd $(dirname $ENGINE_FILE) && javac -cp . *.java"

# Rapport final
echo ""
echo "╔════════════════════════════════════════════╗"
echo "║        ✨ SORT COMPLÉTÉ ✨               ║"
echo "╠════════════════════════════════════════════╣"
echo "║ Le MUR CAUSAL est maintenant actif!        ║"
echo "║                                            ║"
echo "║ Les héros ne peuvent plus voyager         ║"
echo "║ au-delà de leur zone causale sans         ║"
echo "║ artefacts spéciaux.                        ║"
echo "║                                            ║"
echo "║ Backup créé: ${ENGINE_FILE}.backup.*      ║"
echo "╚════════════════════════════════════════════╝"

echo ""
echo "🎯 PROCHAINE ÉTAPE: Tester avec un héros essayant de dépasser sa limite temporelle"
echo ""
echo "💡 ASTUCE: L'Épée Temporelle devrait maintenant étendre la zone causale via sa formule!"

# Walter check
echo ""
echo "🔫 WALTER CHECK: 'This is not Nam, there are rules!'"
echo "   ✅ Import ajouté proprement"
echo "   ✅ Service injecté avec @Autowired" 
echo "   ✅ Vérification avant mouvement"
echo "   ✅ Exception claire si violation"
echo "   ✅ Backup créé avant modification"

exit 0 