"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { seededRandom } from "@/lib/three-utils";

interface TreesProps {
  count?: number;
  radius?: number;
  seed?: number;
}

export function Trees({ count = 40, radius = 30, seed = 7 }: TreesProps) {
  const random = useMemo(() => seededRandom(seed), [seed]);

  const trees = useMemo(() => {
    return Array.from({ length: count }, () => {
      const angle = random() * Math.PI * 2;
      const r = 8 + random() * radius;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const h = 2.5 + random() * 3.5;
      const scale = 0.7 + random() * 0.8;
      return { x, z, h, scale };
    });
  }, [count, radius, random]);

  return (
    <group>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, -2, t.z]} scale={t.scale}>
          <mesh position={[0, t.h / 2, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.18, t.h, 8]} />
            <meshStandardMaterial color="#1f2c20" roughness={1} />
          </mesh>
          <mesh position={[0, t.h + 0.6, 0]} castShadow>
            <coneGeometry args={[0.9, 2.2, 8]} />
            <meshStandardMaterial color="#0c4f3a" roughness={0.95} />
          </mesh>
          <mesh position={[0, t.h + 1.5, 0]} castShadow>
            <coneGeometry args={[0.7, 1.6, 8]} />
            <meshStandardMaterial color="#0e5f44" roughness={0.95} />
          </mesh>
          <mesh position={[0, t.h + 2.2, 0]} castShadow>
            <coneGeometry args={[0.45, 1.1, 8]} />
            <meshStandardMaterial color="#10745a" roughness={0.95} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
