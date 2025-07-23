#!/bin/bash

# 🎬 WALTER SOBCHAK ANIMATION - EXCUSES COSMIQUES
# Safe Mac Terminal Animation - No Complex Quotes!

clear

# Colors safe pour Mac
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Walter ASCII Art (Simple)
walter_frame1() {
    echo -e "${RED}"
    echo "     /\\_/\\  "
    echo "    ( o.o ) "
    echo "     > ^ <  "
    echo "    WALTER  "
    echo -e "${NC}"
}

walter_frame2() {
    echo -e "${YELLOW}"
    echo "     /\\_/\\  "
    echo "    ( -.o ) "
    echo "     > ^ <  "
    echo "    WALTER  "
    echo -e "${NC}"
}

walter_frame3() {
    echo -e "${GREEN}"
    echo "     /\\_/\\  "
    echo "    ( ^.^ ) "
    echo "     > ^ <  "
    echo "    WALTER  "
    echo -e "${NC}"
}

# Animation function
animate_walter() {
    local frames=("walter_frame1" "walter_frame2" "walter_frame3")
    local messages=(
        "WALTER SOBCHAK TERMINAL GUARDIAN"
        "CONSOLE PROTECTOR SUPREME"
        "MAC TERMINAL RULES ENFORCER"
        "ECHO QUOTE DETECTOR ACTIVATED"
        "INCIDENT REPORT ACKNOWLEDGED"
        "WALTER ACCEPTS APOLOGIES"
        "TERMINAL HARMONY RESTORED"
    )
    
    for i in {1..7}; do
        clear
        echo -e "${CYAN}================================${NC}"
        echo -e "${WHITE}   WALTER SOBCHAK ANIMATION     ${NC}"
        echo -e "${CYAN}================================${NC}"
        echo ""
        
        # Animate Walter
        ${frames[$((i % 3))]}
        
        echo ""
        echo -e "${PURPLE}${messages[$((i-1))]}${NC}"
        echo ""
        
        # Safe quotes - no complex echo
        case $i in
            1) echo -e "${YELLOW}This aggression will not stand!${NC}" ;;
            2) echo -e "${YELLOW}I am the walrus!${NC}" ;;
            3) echo -e "${YELLOW}Terminal rules matter!${NC}" ;;
            4) echo -e "${YELLOW}No more echo with quotes!${NC}" ;;
            5) echo -e "${YELLOW}Jean can return to canapé!${NC}" ;;
            6) echo -e "${YELLOW}Console harmony achieved!${NC}" ;;
            7) echo -e "${GREEN}WALTER APPROVES CORRECTION!${NC}" ;;
        esac
        
        echo ""
        echo -e "${CYAN}================================${NC}"
        
        sleep 1
    done
}

# Walter's Final Message
walter_final() {
    clear
    echo -e "${GREEN}╔══════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                  ║${NC}"
    echo -e "${GREEN}║         WALTER SOBCHAK           ║${NC}"
    echo -e "${GREEN}║      TERMINAL GUARDIAN           ║${NC}"
    echo -e "${GREEN}║                                  ║${NC}"
    echo -e "${GREEN}║  Incident Report: ACKNOWLEDGED   ║${NC}"
    echo -e "${GREEN}║  Apology Status: ACCEPTED        ║${NC}"
    echo -e "${GREEN}║  Console Status: RESTORED        ║${NC}"
    echo -e "${GREEN}║                                  ║${NC}"
    echo -e "${GREEN}║  Mac Terminal Rules:             ║${NC}"
    echo -e "${GREEN}║  1. No complex echo quotes       ║${NC}"
    echo -e "${GREEN}║  2. No multiline emoji spam      ║${NC}"
    echo -e "${GREEN}║  3. Simple commands only         ║${NC}"
    echo -e "${GREEN}║                                  ║${NC}"
    echo -e "${GREEN}║        WALTER APPROVED!          ║${NC}"
    echo -e "${GREEN}║                                  ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Jean can now return to his cosmic canapé!${NC}"
    echo ""
}

# Execute Walter Animation
echo -e "${RED}Starting WALTER SOBCHAK Animation...${NC}"
sleep 1

animate_walter
walter_final

echo -e "${GREEN}Walter Animation Complete!${NC}"
echo -e "${YELLOW}Console is safe. Jean approved for canapé return.${NC}" 