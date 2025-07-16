// @ts-ignore
const SimplexNoise = require('simplex-noise');
import seedrandom from 'seedrandom';

export function createSeededNoise(seed: string) {
  // Use seedrandom to seed SimplexNoise
  const rng = seedrandom(seed);
  // SimplexNoise can take a random function
  const simplex = new SimplexNoise(rng);
  return {
    noise2D: (x: number, y: number) => simplex.noise2D(x, y),
    noise3D: (x: number, y: number, z: number) => simplex.noise3D(x, y, z)
  };
} 