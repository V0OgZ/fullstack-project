import * as SimplexNoise from 'simplex-noise';
import seedrandom from 'seedrandom';

export function createSeededNoise(seed: string) {
  const rng = seedrandom(seed);
  // ESM/CJS interop: SimplexNoise is a function/class on the default export
  const simplex = new (SimplexNoise as any)(rng);
  return {
    noise2D: (x: number, y: number) => simplex.noise2D(x, y),
    noise3D: (x: number, y: number, z: number) => simplex.noise3D(x, y, z)
  };
} 