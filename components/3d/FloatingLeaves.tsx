"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface FloatingLeavesProps {
  count?: number;
  area?: number;
  color?: string;
}

export function FloatingLeaves({
  count = 220,
  area = 40,
  color = "#a7f3d0",
}: FloatingLeavesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      basePos: new THREE.Vector3(
        (Math.random() - 0.5) * area,
        Math.random() * 14 + 1,
        (Math.random() - 0.5) * area,
      ),
      speed: 0.2 + Math.random() * 0.6,
      offset: Math.random() * Math.PI * 2,
      scale: 0.05 + Math.random() * 0.08,
      rotSpeed: (Math.random() - 0.5) * 0.6,
    }));
  }, [count, area]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const p = data[i];
      const sway = Math.sin(t * p.speed + p.offset) * 0.6;
      const drift = Math.cos(t * p.speed * 0.6 + p.offset) * 0.5;
      const fall = ((t * p.speed * 0.4 + p.offset) % 14);
      dummy.position.set(
        p.basePos.x + sway,
        p.basePos.y - fall,
        p.basePos.z + drift,
      );
      dummy.rotation.set(
        t * p.rotSpeed + p.offset,
        t * p.rotSpeed * 0.5 + p.offset,
        t * p.rotSpeed * 0.3,
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <planeGeometry args={[1, 1.4, 1, 1]} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
        roughness={0.7}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </instancedMesh>
  );
}
