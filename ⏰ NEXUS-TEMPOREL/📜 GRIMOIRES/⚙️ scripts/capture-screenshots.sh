#!/bin/bash

# 🖼️ Script de Capture d'Écrans - Heroes of Time
# 📅 Date : 22 Juillet 2025
# 🧠 Auteur : Memento

echo "🖼️ CAPTURE D'ÉCRANS HEROES OF TIME"
echo "=================================="

# Créer le dossier screenshots
mkdir -p screenshots
cd screenshots

# Vérifier que les services sont démarrés
echo "🔍 Vérification des services..."
if ! curl -s http://localhost:9000/dashboard.html > /dev/null; then
    echo "❌ Dashboard non accessible sur port 9000"
    exit 1
fi

echo "✅ Services OK, début de la capture..."

# Fonction de capture avec délai
capture_screenshot() {
    local url=$1
    local filename=$2
    local description=$3
    
    echo "📸 Capture de $description..."
    
    # Attendre que la page se charge
    sleep 3
    
    # Capture avec Chrome headless (si disponible)
    if command -v google-chrome &> /dev/null; then
        google-chrome --headless --disable-gpu --screenshot="$filename.png" --window-size=1920,1080 "$url"
    elif command -v chromium-browser &> /dev/null; then
        chromium-browser --headless --disable-gpu --screenshot="$filename.png" --window-size=1920,1080 "$url"
    else
        echo "⚠️ Chrome/Chromium non trouvé, création d'un placeholder"
        echo "Screenshot: $description" > "$filename.txt"
        echo "URL: $url" >> "$filename.txt"
        echo "Date: $(date)" >> "$filename.txt"
    fi
    
    echo "✅ $filename capturé"
}

# 1. Dashboard Principal
capture_screenshot "http://localhost:9000/dashboard.html" "dashboard_principal" "Dashboard Principal"

# 2. Frontend Principal
capture_screenshot "http://localhost:8000" "frontend_principal" "Frontend Principal"

# 3. Interface Temporelle
capture_screenshot "http://localhost:5174" "interface_temporelle" "Interface Temporelle"

# 4. Quantum Visualizer
capture_screenshot "http://localhost:8001/quantum-visualizer/" "quantum_visualizer" "Quantum Visualizer"

# 5. Collection & Grammar
capture_screenshot "http://localhost:5175" "collection_grammar" "Collection & Grammar"

# 6. Test Runner
capture_screenshot "http://localhost:8888" "test_runner" "Test Runner"

# 7. Centre de Replay (via Dashboard)
capture_screenshot "http://localhost:9000/dashboard.html#replay" "centre_replay" "Centre de Replay"

# 8. Mode Éthéré (via Dashboard)
capture_screenshot "http://localhost:9000/dashboard.html#ethereal" "mode_ethere" "Mode Éthéré"

# 9. Interface Admin (si accessible)
capture_screenshot "http://localhost:9000/dashboard.html#admin" "admin_interface" "Interface Admin"

# 10. API Backend Health
capture_screenshot "http://localhost:8080/api/health" "backend_health" "Backend Health"

echo ""
echo "🎯 CAPTURE TERMINÉE"
echo "=================="
echo "📁 Screenshots sauvegardés dans: screenshots/"
echo "📊 Total: $(ls -1 *.png *.txt 2>/dev/null | wc -l) captures"

# Créer un index des screenshots
echo "📋 INDEX DES SCREENSHOTS" > index_screenshots.md
echo "=======================" >> index_screenshots.md
echo "" >> index_screenshots.md
echo "Date de capture: $(date)" >> index_screenshots.md
echo "" >> index_screenshots.md

for file in *.png *.txt 2>/dev/null; do
    if [ -f "$file" ]; then
        echo "- **$file** - $(basename "$file" | sed 's/_/ /g' | sed 's/\.png//' | sed 's/\.txt//')" >> index_screenshots.md
    fi
done

echo "" >> index_screenshots.md
echo "📝 Note: Les fichiers .txt sont des placeholders quand Chrome n'est pas disponible." >> index_screenshots.md

echo "✅ Index créé: index_screenshots.md"
echo ""
echo "🎮 Prochaine étape: Intégrer les screenshots dans la documentation" 