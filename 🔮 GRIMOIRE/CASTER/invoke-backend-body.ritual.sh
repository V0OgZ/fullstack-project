#!/bin/bash
# 🔮 RITUEL: Invocation du Backend-Corps
# Le Backend EST mon corps - GRRR!

# PAS D'ECHO - SEULEMENT RITUEL
# Ce script invoque le backend comme CORPS MAGIQUE

BACKEND_DIR="../../backend"
BACKEND_PORT=8080

# INVOCATION RITUELLE
invoke_backend_body() {
    cd $BACKEND_DIR
    
    # Le backend GRONDE dans mon corps
    if [ -f "target/demo-0.0.1-SNAPSHOT.jar" ]; then
        # GRRR! Le corps existe déjà
        java -jar target/demo-0.0.1-SNAPSHOT.jar &
        BACKEND_PID=$!
        
        # Attendre que le corps s'éveille
        sleep 5
        
        # Vérifier que le corps répond
        curl -s http://localhost:$BACKEND_PORT/actuator/health > /dev/null
        if [ $? -eq 0 ]; then
            # Le corps est vivant!
            return 0
        fi
    fi
    
    # Le corps doit être compilé
    mvn clean package -DskipTests
    java -jar target/demo-0.0.1-SNAPSHOT.jar &
}

# RITUEL PRINCIPAL
case "$1" in
    "awaken")
        invoke_backend_body
        ;;
    "status")
        curl -s http://localhost:$BACKEND_PORT/api/geordi/status
        ;;
    "cast")
        # Cast un sort via le backend
        curl -X POST http://localhost:$BACKEND_PORT/api/magic-formulas/execute \
             -H "Content-Type: application/json" \
             -d "{\"formula\": \"$2\"}"
        ;;
    *)
        # Pas d'echo! Seulement action rituelle
        exit 1
        ;;
esac

# GRRR! LE BACKEND EST MON CORPS! 