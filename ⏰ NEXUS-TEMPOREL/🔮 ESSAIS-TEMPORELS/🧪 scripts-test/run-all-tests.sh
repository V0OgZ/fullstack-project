#!/bin/bash

echo "🧪 HEROES OF TIME - Suite de Tests Complète"
echo "==========================================="

# Fonction pour afficher les options
show_menu() {
    echo ""
    echo "📋 Choisissez un test à exécuter :"
    echo "1. 🚀 Démarrer tous les services (start-fixed-uis.sh)"
    echo "2. 🔧 Tester les corrections UI (test-ui-fix.sh)"
    echo "3. ✅ Vérifier le travail récupéré (TRAVAIL_RECUPERE_VERIFICATION.sh)"
    echo "4. 🎮 Démonstration complète du langage (demo-heroes-of-time-script.sh)"
    echo "5. 🏃 Lancer tous les tests en séquence"
    echo "6. 🚪 Quitter"
    echo ""
    echo -n "Votre choix (1-6): "
}

# Fonction pour exécuter un script
run_script() {
    local script_name="$1"
    local description="$2"
    
    echo ""
    echo "🔄 Exécution: $description"
    echo "----------------------------------------"
    
    if [ -f "$script_name" ]; then
        chmod +x "$script_name"
        ./"$script_name"
        echo ""
        echo "✅ $description terminé"
    else
        echo "❌ Script $script_name non trouvé"
    fi
    
    echo ""
    echo "Appuyez sur Entrée pour continuer..."
    read
}

# Fonction pour lancer tous les tests
run_all_tests() {
    echo ""
    echo "🏃 Exécution de tous les tests en séquence"
    echo "==========================================="
    
    echo "1/4 - Démarrage des services..."
    ./start-fixed-uis.sh
    sleep 3
    
    echo "2/4 - Test des corrections UI..."
    ./test-ui-fix.sh
    sleep 2
    
    echo "3/4 - Vérification du travail récupéré..."
    ./TRAVAIL_RECUPERE_VERIFICATION.sh
    sleep 2
    
    echo "4/4 - Démonstration complète..."
    ./demo-heroes-of-time-script.sh
    
    echo ""
    echo "🎉 Tous les tests terminés avec succès !"
    echo "Appuyez sur Entrée pour continuer..."
    read
}

# Boucle principale
while true; do
    show_menu
    read choice
    
    case $choice in
        1)
            run_script "start-fixed-uis.sh" "Démarrage des services"
            ;;
        2)
            run_script "test-ui-fix.sh" "Test des corrections UI"
            ;;
        3)
            run_script "TRAVAIL_RECUPERE_VERIFICATION.sh" "Vérification du travail récupéré"
            ;;
        4)
            run_script "demo-heroes-of-time-script.sh" "Démonstration complète"
            ;;
        5)
            run_all_tests
            ;;
        6)
            echo ""
            echo "🚪 Au revoir !"
            exit 0
            ;;
        *)
            echo ""
            echo "❌ Choix invalide. Veuillez choisir entre 1 et 6."
            sleep 2
            ;;
    esac
done 