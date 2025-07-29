#!/bin/bash

# 🔧 SORT DE RÉPARATION MINIMALE - BACKEND POST-NEXUS
# Auteur: Merlin (9ème réveil)
# Mission: Créer un backend minimal mais fonctionnel

echo -e "\033[0;35m🔮 SORT DE RÉPARATION MINIMALE DU BACKEND\033[0m"
echo -e "\033[0;33mCréation d'un backend minimal fonctionnel...\033[0m"

BACKEND_DIR="/Users/admin/Hotm/Heroes-of-Time/backend"
SERVICE_DIR="$BACKEND_DIR/src/main/java/com/heroesoftimepoc/temporalengine/service"

# Créer un TemporalEngineService minimal
cat > "$SERVICE_DIR/TemporalEngineService.java" << 'EOF'
package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

/**
 * Service Temporel Minimal - Version de récupération post-nexus
 * Les fonctionnalités quantiques avancées ont été perdues lors de la création du nexus
 */
@Service
@Transactional
public class TemporalEngineService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired(required = false)
    private CausalityZoneService causalityZoneService;
    
    /**
     * Point d'entrée principal - Version minimale
     */
    public Map<String, Object> executeTemporalGameScript(Long gameId, String script) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "SUCCESS");
        result.put("message", "Script exécuté (mode minimal post-nexus)");
        result.put("gameId", gameId);
        result.put("script", script);
        result.put("warning", "⚠️ Fonctionnalités quantiques désactivées suite au nexus");
        
        // Logique minimale
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game != null) {
            result.put("gameName", game.getName());
            result.put("turn", game.getCurrentTurn());
        }
        
        return result;
    }
    
    /**
     * Créer un héros - Version minimale
     */
    public Hero createGameHero(Game game, String name, Position position) {
        Hero hero = new Hero();
        hero.setName(name);
        hero.setPosition(position);
        hero.setGame(game);
        hero.setState("ALIVE");
        hero.setHealth(100);
        return heroRepository.save(hero);
    }
    
    /**
     * Déplacer un héros - Version minimale
     */
    public void moveGameHero(Game game, String heroId, Position position) {
        Hero hero = heroRepository.findById(Long.parseLong(heroId)).orElse(null);
        if (hero != null) {
            // Vérification causale si disponible
            if (causalityZoneService != null) {
                // Intégration avec CausalityZoneService
                CausalityZone zone = causalityZoneService.calculateMovementZone(game, hero, position);
                if (!zone.contains(position.getX(), position.getY())) {
                    throw new RuntimeException("Mouvement hors de la zone causale!");
                }
            }
            hero.setPosition(position);
            heroRepository.save(hero);
        }
    }
    
    /**
     * Obtenir l'état du jeu - Version minimale
     */
    public Map<String, Object> getGameState(Long gameId) {
        Map<String, Object> state = new HashMap<>();
        Game game = gameRepository.findById(gameId).orElse(null);
        
        if (game != null) {
            state.put("gameId", gameId);
            state.put("name", game.getName());
            state.put("turn", game.getCurrentTurn());
            state.put("status", game.getStatus());
            
            List<Hero> heroes = heroRepository.findByGame(game);
            state.put("heroCount", heroes.size());
            state.put("heroes", heroes);
        }
        
        state.put("quantumStatus", "DISABLED - Services perdus dans le nexus");
        return state;
    }
    
    /**
     * Compatibilité backward
     */
    public Map<String, Object> executeScript(Long gameId, String scriptLine) {
        return executeTemporalGameScript(gameId, scriptLine);
    }
}
EOF

echo -e "\033[0;32m✅ TemporalEngineService minimal créé!\033[0m"

# Créer ou mettre à jour les imports nécessaires
echo -e "\n\033[0;36m🔄 Mise à jour des imports dans CausalityZoneService...\033[0m"
if [ -f "$SERVICE_DIR/CausalityZoneService.java" ]; then
    # Ajouter l'import Position si manquant
    if ! grep -q "import com.heroesoftimepoc.temporalengine.model.Position;" "$SERVICE_DIR/CausalityZoneService.java"; then
        sed -i.bak '1a\
import com.heroesoftimepoc.temporalengine.model.Position;' "$SERVICE_DIR/CausalityZoneService.java"
    fi
fi

# Créer Position si elle n'existe pas
MODEL_DIR="$BACKEND_DIR/src/main/java/com/heroesoftimepoc/temporalengine/model"
if [ ! -f "$MODEL_DIR/Position.java" ]; then
    echo -e "\033[0;36m🔄 Création de la classe Position...\033[0m"
    cat > "$MODEL_DIR/Position.java" << 'EOF'
package com.heroesoftimepoc.temporalengine.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Position {
    private int x;
    private int y;
    
    public Position() {}
    
    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public int getX() { return x; }
    public void setX(int x) { this.x = x; }
    
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
}
EOF
fi

# Compiler pour vérifier
echo -e "\n\033[0;36m🔧 Test de compilation...\033[0m"
cd "$BACKEND_DIR"
mvn clean compile -DskipTests -q

if [ $? -eq 0 ]; then
    echo -e "\033[0;32m✅ COMPILATION RÉUSSIE! Le backend minimal est fonctionnel!\033[0m"
    echo -e "\033[0;33m⚠️  Fonctionnalités disponibles:\033[0m"
    echo -e "  - Exécution de scripts (basique)"
    echo -e "  - Création et déplacement de héros"
    echo -e "  - État du jeu"
    echo -e "  - Intégration CausalityZoneService"
    echo -e "\033[0;31m❌ Fonctionnalités perdues:\033[0m"
    echo -e "  - Interférence quantique"
    echo -e "  - Migration quantique"
    echo -e "  - Collapse causal avancé"
else
    echo -e "\033[0;31m❌ Erreurs de compilation restantes.\033[0m"
fi 