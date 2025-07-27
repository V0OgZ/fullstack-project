// 🏰 SERVICE D'IMAGES POUR BÂTIMENTS
// JUSTE des images et visuels, PAS de stats !

export interface BuildingVisual {
  id: string;
  name: string;
  imageUrl: string;
  iconUrl: string;
  description: string;
  style: 'Human' | 'Elf' | 'Dwarf' | 'Orc' | 'Undead' | 'Celestial';
}

// 🏰 IMAGES DE BÂTIMENTS PAR STYLE
export const BUILDING_IMAGES: Record<string, BuildingVisual> = {
  // Style Humain
  human_castle: {
    id: 'human_castle',
    name: 'Château Humain',
    imageUrl: '/assets/buildings/human/castle.svg',
    iconUrl: '/assets/buildings/human/castle_icon.svg',
    description: 'Château médiéval avec tours et remparts',
    style: 'Human'
  },
  human_barracks: {
    id: 'human_barracks',
    name: 'Caserne Humaine',
    imageUrl: '/assets/buildings/human/barracks.svg',
    iconUrl: '/assets/buildings/human/barracks_icon.svg',
    description: 'Caserne pour entraîner les soldats',
    style: 'Human'
  },
  human_tower: {
    id: 'human_tower',
    name: 'Tour de Mage',
    imageUrl: '/assets/buildings/human/tower.svg',
    iconUrl: '/assets/buildings/human/tower_icon.svg',
    description: 'Tour mystique pour les sorts',
    style: 'Human'
  },
  
  // Style Elfe
  elf_tree_castle: {
    id: 'elf_tree_castle',
    name: 'Château-Arbre Elfique',
    imageUrl: '/assets/buildings/elf/tree_castle.svg',
    iconUrl: '/assets/buildings/elf/tree_castle_icon.svg',
    description: 'Château vivant dans un arbre géant',
    style: 'Elf'
  },
  elf_moonwell: {
    id: 'elf_moonwell',
    name: 'Puits de Lune',
    imageUrl: '/assets/buildings/elf/moonwell.svg',
    iconUrl: '/assets/buildings/elf/moonwell_icon.svg',
    description: 'Source de magie lunaire',
    style: 'Elf'
  },
  
  // Style Nain
  dwarf_mountain_hall: {
    id: 'dwarf_mountain_hall',
    name: 'Salle des Montagnes',
    imageUrl: '/assets/buildings/dwarf/mountain_hall.svg',
    iconUrl: '/assets/buildings/dwarf/mountain_hall_icon.svg',
    description: 'Forteresse creusée dans la roche',
    style: 'Dwarf'
  },
  dwarf_forge: {
    id: 'dwarf_forge',
    name: 'Grande Forge',
    imageUrl: '/assets/buildings/dwarf/forge.svg',
    iconUrl: '/assets/buildings/dwarf/forge_icon.svg',
    description: 'Forge légendaire des nains',
    style: 'Dwarf'
  },
  
  // Style Orc
  orc_stronghold: {
    id: 'orc_stronghold',
    name: 'Forteresse Orc',
    imageUrl: '/assets/buildings/orc/stronghold.svg',
    iconUrl: '/assets/buildings/orc/stronghold_icon.svg',
    description: 'Forteresse brutale en os et métal',
    style: 'Orc'
  },
  orc_pit: {
    id: 'orc_pit',
    name: 'Fosse de Combat',
    imageUrl: '/assets/buildings/orc/pit.svg',
    iconUrl: '/assets/buildings/orc/pit_icon.svg',
    description: 'Arène pour entraîner les guerriers',
    style: 'Orc'
  },
  
  // Style Mort-Vivant
  undead_necropolis: {
    id: 'undead_necropolis',
    name: 'Nécropole',
    imageUrl: '/assets/buildings/undead/necropolis.svg',
    iconUrl: '/assets/buildings/undead/necropolis_icon.svg',
    description: 'Cité des morts-vivants',
    style: 'Undead'
  },
  undead_tomb: {
    id: 'undead_tomb',
    name: 'Tombeau Maudit',
    imageUrl: '/assets/buildings/undead/tomb.svg',
    iconUrl: '/assets/buildings/undead/tomb_icon.svg',
    description: 'Sépulture des anciens rois',
    style: 'Undead'
  },
  
  // Style Céleste
  celestial_temple: {
    id: 'celestial_temple',
    name: 'Temple Céleste',
    imageUrl: '/assets/buildings/celestial/temple.svg',
    iconUrl: '/assets/buildings/celestial/temple_icon.svg',
    description: 'Temple flottant dans les nuages',
    style: 'Celestial'
  }
};

// 🎨 GÉNÉRATION D'IMAGES CANVAS POUR BÂTIMENTS
export function generateBuildingImage(building: BuildingVisual, size: number = 64): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Couleurs par style
  const styleColors = {
    Human: { primary: '#8B4513', secondary: '#DAA520', accent: '#FF0000' },
    Elf: { primary: '#228B22', secondary: '#32CD32', accent: '#FFD700' },
    Dwarf: { primary: '#696969', secondary: '#A0522D', accent: '#FF4500' },
    Orc: { primary: '#800000', secondary: '#8B0000', accent: '#000000' },
    Undead: { primary: '#4B0082', secondary: '#8B008B', accent: '#00FF00' },
    Celestial: { primary: '#FFD700', secondary: '#FFFFFF', accent: '#87CEEB' }
  };
  
  const colors = styleColors[building.style];
  
  // Fond
  ctx.fillStyle = colors.primary;
  ctx.fillRect(0, 0, size, size);
  
  // Forme du bâtiment selon le type
  if (building.id.includes('castle')) {
    // Château avec tours
    ctx.fillStyle = colors.secondary;
    ctx.fillRect(size * 0.1, size * 0.3, size * 0.8, size * 0.6);
    
    // Tours
    ctx.fillRect(size * 0.05, size * 0.1, size * 0.2, size * 0.5);
    ctx.fillRect(size * 0.75, size * 0.1, size * 0.2, size * 0.5);
    
    // Drapeaux
    ctx.fillStyle = colors.accent;
    ctx.fillRect(size * 0.1, size * 0.05, size * 0.1, size * 0.15);
    ctx.fillRect(size * 0.8, size * 0.05, size * 0.1, size * 0.15);
  } else if (building.id.includes('tower')) {
    // Tour haute
    ctx.fillStyle = colors.secondary;
    ctx.fillRect(size * 0.3, size * 0.1, size * 0.4, size * 0.8);
    
    // Toit pointu
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(size * 0.5, size * 0.05);
    ctx.lineTo(size * 0.25, size * 0.2);
    ctx.lineTo(size * 0.75, size * 0.2);
    ctx.closePath();
    ctx.fill();
  } else if (building.id.includes('forge')) {
    // Forge avec cheminée
    ctx.fillStyle = colors.secondary;
    ctx.fillRect(size * 0.2, size * 0.4, size * 0.6, size * 0.5);
    
    // Cheminée
    ctx.fillRect(size * 0.4, size * 0.1, size * 0.2, size * 0.4);
    
    // Fumée
    ctx.fillStyle = colors.accent;
    ctx.fillRect(size * 0.42, size * 0.05, size * 0.04, size * 0.1);
    ctx.fillRect(size * 0.48, size * 0.02, size * 0.04, size * 0.1);
    ctx.fillRect(size * 0.54, size * 0.05, size * 0.04, size * 0.1);
  } else {
    // Bâtiment générique
    ctx.fillStyle = colors.secondary;
    ctx.fillRect(size * 0.2, size * 0.2, size * 0.6, size * 0.6);
    
    // Toit
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(size * 0.5, size * 0.1);
    ctx.lineTo(size * 0.15, size * 0.25);
    ctx.lineTo(size * 0.85, size * 0.25);
    ctx.closePath();
    ctx.fill();
  }
  
  return canvas.toDataURL();
}

// 🎯 FONCTIONS UTILITAIRES
export function getBuildingImage(buildingId: string): string {
  const building = BUILDING_IMAGES[buildingId];
  if (!building) {
    // Génère une image par défaut
    return generateBuildingImage({
      id: 'default',
      name: 'Bâtiment',
      imageUrl: '',
      iconUrl: '',
      description: 'Bâtiment générique',
      style: 'Human'
    });
  }
  
  // Essaie de charger l'image, sinon génère une image canvas
  const img = new Image();
  img.src = building.imageUrl;
  
  return new Promise<string>((resolve) => {
    img.onload = () => resolve(building.imageUrl);
    img.onerror = () => resolve(generateBuildingImage(building));
  }) as any;
}

export function getBuildingsByStyle(style: BuildingVisual['style']): BuildingVisual[] {
  return Object.values(BUILDING_IMAGES).filter(building => building.style === style);
}

export function getRandomBuilding(): BuildingVisual {
  const buildings = Object.values(BUILDING_IMAGES);
  return buildings[Math.floor(Math.random() * buildings.length)];
}

console.log('🏰 Building Image Service Loaded!', Object.keys(BUILDING_IMAGES).length, 'building visuals available'); 