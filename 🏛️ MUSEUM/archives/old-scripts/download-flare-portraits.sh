#!/bin/bash

# 🎨 Download Flare Portrait Pack Collection (Heroes of Time)
# ================================================================
# Pour des portraits de héros qui ont de la GUEULE
# Style HoMM / Baldur's Gate - Semi-realistic fantasy paintings
# Télécharge plusieurs packs Flare pour plus de variété

echo "🎨 Downloading Flare Portrait Pack Collection for Heroes of Time..."
echo "=================================================================="

# Variables de configuration
PORTRAITS_DIR="🌐 frontend/public/assets/heroes/portraits"
FLARE_DIR="$PORTRAITS_DIR/flare"
TEMP_DIR="temp_flare_download"

# URLs des différents packs Flare
declare -a FLARE_PACKS=(
    "https://opengameart.org/sites/default/files/flareportraitpack.zip"
    "https://opengameart.org/sites/default/files/PortraitPack3.zip"
    "https://opengameart.org/sites/default/files/PortraitPack4.zip"
    "https://opengameart.org/sites/default/files/PortraitPack5.zip"
    "https://opengameart.org/sites/default/files/FlareFemales.tar.gz"
)

# Noms des packs pour le log
declare -a PACK_NAMES=(
    "Flare Portrait Pack 1"
    "Flare Portrait Pack 3"
    "Flare Portrait Pack 4"
    "Flare Portrait Pack 5"
    "Flare Female Edition"
)

# Créer les dossiers nécessaires
echo "📁 Creating directories..."
mkdir -p "$FLARE_DIR"
mkdir -p "$TEMP_DIR"

# Compteurs globaux
TOTAL_DOWNLOADED=0
TOTAL_COPIED=0

cd "$TEMP_DIR"

# Télécharger tous les packs
for i in "${!FLARE_PACKS[@]}"; do
    url="${FLARE_PACKS[$i]}"
    name="${PACK_NAMES[$i]}"
    filename="pack_$i.$(basename "$url" | sed 's/.*\.//')"
    
    echo ""
    echo "⬇️ Downloading $name..."
    
    # Télécharger avec curl ou wget
    if command -v curl &> /dev/null; then
        curl -L "$url" -o "$filename"
    elif command -v wget &> /dev/null; then
        wget "$url" -O "$filename"
    else
        echo "❌ Error: Neither curl nor wget found. Please install one of them."
        exit 1
    fi
    
    # Vérifier le téléchargement
    if [ -f "$filename" ]; then
        echo "✅ $name downloaded successfully"
        TOTAL_DOWNLOADED=$((TOTAL_DOWNLOADED + 1))
    else
        echo "⚠️  Warning: Failed to download $name"
    fi
done

echo ""
echo "📦 Extracting portraits from $TOTAL_DOWNLOADED pack(s)..."

# Extraire tous les fichiers
for file in pack_*; do
    if [ -f "$file" ]; then
        echo "  📂 Extracting $file..."
        
        # Déterminer le type de fichier et extraire
        if [[ "$file" == *.zip ]]; then
            if command -v unzip &> /dev/null; then
                unzip -q "$file" -d "extracted_$(basename "$file" .zip)" 2>/dev/null
            else
                echo "    ⚠️  Warning: unzip not found, skipping $file"
            fi
        elif [[ "$file" == *.tar.gz ]]; then
            if command -v tar &> /dev/null; then
                mkdir -p "extracted_$(basename "$file" .tar.gz)"
                tar -xzf "$file" -C "extracted_$(basename "$file" .tar.gz)" 2>/dev/null
            else
                echo "    ⚠️  Warning: tar not found, skipping $file"
            fi
        fi
    fi
done

echo ""
echo "🗂️ Organizing portraits..."

# Trouver et copier tous les fichiers PNG et JPG
find . -name "*.png" -o -name "*.jpg" | while read -r portrait; do
    if [ -f "$portrait" ]; then
        # Obtenir le nom de fichier sans le chemin
        filename=$(basename "$portrait")
        
        # Nettoyer le nom (minuscules, remplacer espaces par underscores)
        clean_name=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '_' | tr '-' '_')
        
        # Éviter les doublons
        counter=1
        final_name="$clean_name"
        while [ -f "../$FLARE_DIR/$final_name" ]; do
            extension="${clean_name##*.}"
            basename="${clean_name%.*}"
            final_name="${basename}_${counter}.${extension}"
            counter=$((counter + 1))
        done
        
        # Copier le fichier
        cp "$portrait" "../$FLARE_DIR/$final_name"
        echo "  ✓ $filename → $final_name"
        TOTAL_COPIED=$((TOTAL_COPIED + 1))
    fi
done

# Retourner au répertoire principal
cd ..

# Nettoyer les fichiers temporaires
echo ""
echo "🧹 Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

# Créer un fichier de mapping pour l'intégration
echo "📄 Creating portrait mapping file..."
cat > "$FLARE_DIR/portrait-mapping.json" << 'EOF'
{
  "heroes": {
    "WARRIOR": "male1.png",
    "KNIGHT": "male2.png", 
    "PALADIN": "male3.png",
    "MAGE": "male4.png",
    "WIZARD": "male5.png",
    "NECROMANCER": "male6.png",
    "ARCHER": "male7.png",
    "RANGER": "male8.png",
    "DRUID": "male9.png",
    "CLERIC": "male10.png",
    "ROGUE": "male11.png",
    "BARBARIAN": "male12.png",
    "WARRIOR_F": "female1.png",
    "MAGE_F": "female2.png",
    "ARCHER_F": "female3.png",
    "ROGUE_F": "female4.png",
    "PALADIN_F": "female5.png",
    "NECROMANCER_F": "female6.png"
  },
  "fallback": "male1.png",
  "style": "flare-semi-realistic",
  "format": "Various PNG sizes",
  "license": "CC-BY-SA 3.0"
}
EOF

# Créer un service de mapping automatique
echo "🔧 Creating automatic portrait mapping..."
cat > "$FLARE_DIR/auto-map.js" << 'EOF'
// Auto-mapping script pour organiser les portraits
const fs = require('fs');
const path = require('path');

const portraitDir = __dirname;
const files = fs.readdirSync(portraitDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

const mapping = {
  heroes: {},
  fallback: files[0] || 'default.png'
};

// Mapping intelligent basé sur les noms
const heroTypes = [
  'warrior', 'knight', 'paladin', 'mage', 'wizard', 'necromancer',
  'archer', 'ranger', 'druid', 'cleric', 'rogue', 'barbarian'
];

let maleIndex = 0;
let femaleIndex = 0;

files.forEach(file => {
  const lowerFile = file.toLowerCase();
  
  // Détecter le genre
  const isFemale = lowerFile.includes('female') || lowerFile.includes('woman') || lowerFile.includes('girl');
  
  // Mapping intelligent
  for (const hero of heroTypes) {
    if (lowerFile.includes(hero)) {
      const key = isFemale ? `${hero.toUpperCase()}_F` : hero.toUpperCase();
      mapping.heroes[key] = file;
      return;
    }
  }
  
  // Mapping par défaut
  if (isFemale) {
    mapping.heroes[`FEMALE_${femaleIndex}`] = file;
    femaleIndex++;
  } else {
    mapping.heroes[`MALE_${maleIndex}`] = file;
    maleIndex++;
  }
});

console.log('Generated mapping:', JSON.stringify(mapping, null, 2));
EOF

# Créer un README détaillé
echo "📖 Creating detailed README..."
cat > "$FLARE_DIR/README.md" << 'EOF'
# Flare Portrait Pack Collection - Heroes of Time

## 🎨 Description
Collection de portraits fantasy semi-réalistes pour des héros qui imposent !
Style inspiré de Heroes of Might and Magic et Baldur's Gate.

## 📦 Contenu des packs
- **Flare Portrait Pack 1** : 6 héros originaux (3 hommes, 3 femmes)
- **Flare Portrait Pack 3** : 6 nouveaux portraits + 1 chien
- **Flare Portrait Pack 4** : 6 portraits supplémentaires
- **Flare Portrait Pack 5** : 6 portraits de plus
- **Flare Female Edition** : Pack dédié aux héroïnes

## 🎯 Utilisation
```typescript
import HeroPortrait from './HeroPortrait';

// Dans votre composant React
<HeroPortrait 
  heroName="WARRIOR" 
  size="medium" 
  showTooltip={true}
/>
```

## 🔧 Mapping des héros
Les portraits sont automatiquement mappés par le service `heroPortraitService.ts`.
Voir `portrait-mapping.json` pour les correspondances.

## 📝 Licence
- **CC-BY-SA 3.0** - Attribution requise
- **Artistes** : Justin Nichol & Clint Bellanger (Flare Project)
- **Source** : OpenGameArt.org

## 🎮 Intégration Heroes of Time
Ces portraits remplacent les emojis par défaut dans :
- Panneau de gestion des héros
- Sélection des héros
- Affichage en jeu

## 🌟 Crédits
- Artwork original : Flare RPG Project
- Intégration : Heroes of Time Team
- Collection : OpenGameArt.org
EOF

# Résumé final
echo ""
echo "🎉 Flare Portrait Pack Collection installed successfully!"
echo "======================================================"
echo "📊 Statistics:"
echo "   • Packs downloaded: $TOTAL_DOWNLOADED/5"
echo "   • Total portraits: $TOTAL_COPIED"
echo "   • Installation directory: $FLARE_DIR"
echo "   • License: CC-BY-SA 3.0"
echo ""
echo "🚀 Next steps:"
echo "   1. Portraits are ready to use with HeroPortrait component"
echo "   2. Test with: npm start → Heroes panel"
echo "   3. Customize mapping in heroPortraitService.ts if needed"
echo ""
echo "✅ Your heroes now have the portraits they deserve!"
echo "   No more emojis - welcome to the big leagues! 🗡️" 