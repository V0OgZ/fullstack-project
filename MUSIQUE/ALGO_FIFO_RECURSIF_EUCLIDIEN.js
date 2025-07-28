// 🎵 ALGORITHME MUSICAL FIFO RÉCURSIF EUCLIDIEN
// Par Merlin, Chef d'Orchestre du Beau Monde

class MusiqueEuclidienne {
  constructor() {
    this.queue = []; // FIFO Queue
    this.tempo = 120;
    this.notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    this.octaves = [3, 4, 5];
  }

  // Algorithme d'Euclide pour rythmes
  euclideanRhythm(steps, pulses) {
    if (pulses === 0) return new Array(steps).fill(0);
    if (pulses >= steps) return new Array(steps).fill(1);
    
    let pattern = [];
    let counts = [];
    let remainders = [];
    
    let divisor = steps - pulses;
    remainders.push(pulses);
    let level = 0;
    
    while (remainders[level] > 1) {
      counts.push(Math.floor(divisor / remainders[level]));
      remainders.push(divisor % remainders[level]);
      divisor = remainders[level];
      level++;
    }
    
    counts.push(divisor);
    
    // Construction récursive du pattern
    const buildPattern = (level) => {
      if (level === -1) {
        pattern.push(0);
      } else if (level === -2) {
        pattern.push(1);
      } else {
        for (let i = 0; i < counts[level]; i++) {
          buildPattern(level - 1);
        }
        if (remainders[level] !== 0) {
          buildPattern(level - 2);
        }
      }
    };
    
    buildPattern(level);
    return pattern.reverse();
  }

  // FIFO récursif pour générer la mélodie
  generateMelodyFIFO(depth, pattern = []) {
    if (depth === 0) return pattern;
    
    // Ajouter une note à la queue
    const noteIndex = (this.queue.length + depth) % this.notes.length;
    const octave = this.octaves[depth % this.octaves.length];
    const note = this.notes[noteIndex] + octave;
    
    this.queue.push(note);
    
    // Si la queue est pleine, retirer le premier élément (FIFO)
    if (this.queue.length > 8) {
      const removed = this.queue.shift();
      pattern.push({ note: removed, duration: 0.25 });
    }
    
    // Récursion avec pattern euclidien
    const rhythm = this.euclideanRhythm(16, depth + 5);
    const nextDepth = rhythm.reduce((a, b) => a + b, 0) % 7 + 1;
    
    return this.generateMelodyFIFO(nextDepth, pattern);
  }

  // Harmonisation euclidienne
  harmonize(melody) {
    return melody.map((noteObj, i) => {
      const harmony = [];
      const rhythmPattern = this.euclideanRhythm(7, 3);
      
      if (rhythmPattern[i % rhythmPattern.length]) {
        // Ajouter tierce
        harmony.push(this.transposeNote(noteObj.note, 4));
        // Ajouter quinte
        harmony.push(this.transposeNote(noteObj.note, 7));
      }
      
      return {
        ...noteObj,
        harmony
      };
    });
  }

  // Transposition
  transposeNote(note, semitones) {
    const noteBase = note.slice(0, -1);
    const octave = parseInt(note.slice(-1));
    const noteIndex = this.notes.indexOf(noteBase);
    
    const newIndex = (noteIndex + semitones) % this.notes.length;
    const octaveShift = Math.floor((noteIndex + semitones) / this.notes.length);
    
    return this.notes[newIndex] + (octave + octaveShift);
  }

  // Générer la composition complète
  compose() {
    console.log("🎼 COMPOSITION EUCLIDIENNE FIFO RÉCURSIVE");
    console.log("==========================================");
    
    // Générer mélodie principale
    const melody = this.generateMelodyFIFO(13);
    console.log("\n🎵 Mélodie principale (FIFO):");
    console.log(melody);
    
    // Harmoniser
    const harmonized = this.harmonize(melody);
    console.log("\n🎹 Avec harmonies euclidiennes:");
    console.log(harmonized);
    
    // Pattern rythmique euclidien
    const drumPattern = this.euclideanRhythm(16, 7);
    console.log("\n🥁 Pattern rythmique (16,7):");
    console.log(drumPattern.map(x => x ? '●' : '○').join(' '));
    
    // Structure récursive
    const structure = this.generateStructure(4);
    console.log("\n📐 Structure récursive:");
    console.log(structure);
    
    return {
      melody,
      harmony: harmonized,
      rhythm: drumPattern,
      structure,
      tempo: this.tempo
    };
  }

  // Structure récursive
  generateStructure(depth, current = 'A') {
    if (depth === 0) return current;
    
    const sections = ['A', 'B', 'C', 'D'];
    const pattern = this.euclideanRhythm(8, 3);
    
    let structure = current;
    pattern.forEach((beat, i) => {
      if (beat) {
        const nextSection = sections[(sections.indexOf(current) + i + 1) % sections.length];
        structure += ' ' + this.generateStructure(depth - 1, nextSection);
      }
    });
    
    return structure;
  }
}

// 🎯 EXÉCUTION
const musique = new MusiqueEuclidienne();
const composition = musique.compose();

console.log("\n✨ COMPOSITION FINALE ✨");
console.log("Tempo:", composition.tempo, "BPM");
console.log("Longueur:", composition.melody.length, "notes");
console.log("Pattern euclidien appliqué!");

// Export pour utilisation
if (typeof module !== 'undefined') {
  module.exports = MusiqueEuclidienne;
} 