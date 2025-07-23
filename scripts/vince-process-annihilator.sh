#!/bin/bash

# 🔫 VINCE'S PROCESS ANNIHILATOR 🔫
# "Say hello to my little friend... the SIGKILL!"
# TIMEOUT: 10 secondes max par phase

clear
echo "
██╗   ██╗██╗███╗   ██╗ ██████╗███████╗
██║   ██║██║████╗  ██║██╔════╝██╔════╝
██║   ██║██║██╔██╗ ██║██║     █████╗  
╚██╗ ██╔╝██║██║╚██╗██║██║     ██╔══╝  
 ╚████╔╝ ██║██║ ╚████║╚██████╗███████╗
  ╚═══╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
"
echo "🔫 VINCE'S PROCESS ANNIHILATOR v3.0"
echo "   'Time to clean house, baby!'"
echo "==========================================="
echo ""

# TIMEOUT CONFIGURATION
TIMEOUT=10
export TIMEOUT

# PHASE 1: RECONNAISSANCE
echo "🕵️  PHASE 1: RECON MISSION"
echo "   Scanning for slow processes..."

for i in {1..5}; do
    echo -n "   ["; for j in $(seq 1 $i); do echo -n "█"; done; for k in $(seq $i 4); do echo -n "▒"; done; echo "] $((i*20))%"
    sleep 0.3
done

JAVA_PROCS=$(pgrep -f java | wc -l | xargs)
MVN_PROCS=$(pgrep -f mvn | wc -l | xargs)
SPRING_PROCS=$(pgrep -f spring-boot | wc -l | xargs)

echo "   📊 TARGET ACQUIRED:"
echo "      Java processes: $JAVA_PROCS"
echo "      Maven processes: $MVN_PROCS" 
echo "      Spring processes: $SPRING_PROCS"
echo ""

# PHASE 2: ELIMINATION DANCE
echo "💃 PHASE 2: THE ELIMINATION DANCE!"
echo "   'Dance, motherfucker, dance!'"

# Animation de danse ASCII
for i in {1..3}; do
    echo "      ┌[∩∩]┐  "
    echo "       |o o|   BOOM!"
    echo "       \\_-_/   💥"
    echo "      /|   |\   "
    echo "     / |   | \  "
    sleep 0.5
    clear
    echo ""
    echo "      \\[∩∩]/  "
    echo "       |^ ^|   HEADSHOT!"
    echo "       \\_▲_/   💀"
    echo "        | |    "
    echo "       / | \   "
    sleep 0.5
    clear
done

# PHASE 3: PROCESS TERMINATION SPECTACLE
echo "🎯 PHASE 3: TERMINATION SPECTACULAR!"

# Tuer Java avec style
if [ $JAVA_PROCS -gt 0 ]; then
    echo "   🎯 TARGETING JAVA PROCESSES..."
    echo "   'Say goodbye to my little Java!'"
    
    for i in {3..1}; do
        echo "      ⏰ T-minus $i..."
        sleep 1
    done
    
    timeout $TIMEOUT pkill -9 java && echo "   💀 JAVA: ✅ ELIMINATED" || echo "   ⚠️  JAVA: TIMEOUT"
fi

# Tuer Maven avec panache  
if [ $MVN_PROCS -gt 0 ]; then
    echo "   🎯 TARGETING MAVEN PROCESSES..."
    echo "   'Maven? More like Ma-GONE!'"
    
    echo "      🔫💨💨💨 RATATATATA!"
    timeout $TIMEOUT pkill -9 mvn && echo "   💀 MAVEN: ✅ OBLITERATED" || echo "   ⚠️  MAVEN: TIMEOUT"
fi

# Tuer Spring Boot avec classe
if [ $SPRING_PROCS -gt 0 ]; then
    echo "   🎯 TARGETING SPRING BOOT PROCESSES..."
    echo "   'Spring Boot? More like Spring KAPUT!'"
    
    timeout $TIMEOUT pkill -f spring-boot && echo "   💀 SPRING: ✅ ANNIHILATED" || echo "   ⚠️  SPRING: TIMEOUT"
fi

# PHASE 4: PORT LIBERATION
echo "🚪 PHASE 4: PORT LIBERATION"
echo "   'Freedom for port 8080!'"

PORT_PROC=$(lsof -ti:8080 2>/dev/null)
if [ -n "$PORT_PROC" ]; then
    echo "   🔓 Liberating port 8080..."
    timeout $TIMEOUT kill -9 $PORT_PROC && echo "   ✅ PORT 8080: FREE AS A BIRD" || echo "   ⚠️  PORT: TIMEOUT"
else
    echo "   ✅ PORT 8080: Already free, baby!"
fi

# PHASE 5: VICTORY DANCE
echo ""
echo "🕺 PHASE 5: VICTORY CELEBRATION!"
echo "   'Pulp Fiction style, baby!'"

# Animation de victoire
echo "   ♪ ♫ ♪ ♫ DANCING ♫ ♪ ♫ ♪"
echo "      🕺      💃"
echo "    /|\\      /|\\" 
echo "    / \\      / \\"
echo ""

# RÉCAPITULATIF FINAL
echo "📋 MISSION COMPLETE - VINCE'S REPORT:"
echo "=========================================="
echo "   ✅ Reconnaissance: DONE"
echo "   ✅ Elimination Dance: PERFORMED" 
echo "   ✅ Process Termination: EXECUTED"
echo "   ✅ Port Liberation: ACHIEVED"
echo "   ✅ Victory Dance: CELEBRATED"
echo ""
echo "🎬 'And that's how we do it in Heroes of Time!'"
echo "   Timeout per phase: ${TIMEOUT}s max"
echo "=========================================="

# Vérification finale des survivants
SURVIVORS=$(pgrep -f "java|mvn|spring" | wc -l | xargs)
if [ $SURVIVORS -eq 0 ]; then
    echo "🏆 PERFECT SCORE: No survivors!"
    echo "   'Vince always gets his processes.'"
else
    echo "🎯 $SURVIVORS processes still running"
    echo "   'Some got away... next time, Gadget!'"
fi 