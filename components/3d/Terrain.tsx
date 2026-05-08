"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface TerrainProps {
  size?: number;
  segments?: number;
  amplitude?: number;
  color?: string;
}

export function Terrain({
  size = 80,
  segments = 96,
  amplitude = 1.6,
  color = "#0a3d2e",
}: TerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = geo.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < pos.count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1];
      const n =
        Math.sin(x * 0.18) * Math.cos(y * 0.18) * 0.5 +
        Math.sin(x * 0.05 + y * 0.07) * 0.5;
      arr[i * 3 + 2] = n * amplitude;
    }
    geo.computeVertexNormals();
    return geo;
  }, [size, segments, amplitude]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.z = Math.sin(t * 0.04) * 0.01;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]} receiveShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.92}
        metalness={0.05}
        flatShading
      />
    </mesh>
  );
}
