import * as THREE from "three";

/** Deterministic pseudo-random based on seed (good for stable particle layouts). */
export function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Generate evenly distributed points on a sphere using the Fibonacci method. */
export function fibonacciSphere(samples: number, radius = 1): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

/** Reusable color palette shared across 3D scenes. */
export const palette = {
  forestDeep: new THREE.Color("#022c22"),
  forestMid: new THREE.Color("#065f46"),
  emerald: new THREE.Color("#34f5b6"),
  midnight: new THREE.Color("#050d1a"),
  sunset: new THREE.Color("#ff8a3d"),
  fog: new THREE.Color("#0a1f1a"),
};

/** Smoothly damp a value toward a target using THREE.MathUtils.damp. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}
