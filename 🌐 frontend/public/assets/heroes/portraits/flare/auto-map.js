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
