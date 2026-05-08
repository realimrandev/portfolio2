"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface BirdsProps {
  count?: number;
  radius?: number;
  speed?: number;
}

export function Birds({ count = 28, radius = 18, speed = 0.5 }: BirdsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const flock = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angleOffset: (i / count) * Math.PI * 2,
      r: radius * (0.6 + Math.random() * 0.8),
      yBase: 4 + Math.random() * 5,
      ySwing: 0.6 + Math.random() * 1.4,
      speed: speed * (0.7 + Math.random() * 0.6),
      flap: Math.random() * Math.PI * 2,
      scale: 0.18 + Math.random() * 0.18,
    }));
  }, [count, radius, speed]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const b = flock[i];
      const a = b.angleOffset + t * b.speed * 0.2;
      const x = Math.cos(a) * b.r;
      const z = Math.sin(a) * b.r;
      const y = b.yBase + Math.sin(t * b.speed + b.flap) * b.ySwing;
      dummy.position.set(x, y, z);
      const flap = Math.sin(t * 8 + b.flap) * 0.6;
      dummy.rotation.set(0, -a + Math.PI / 2, flap);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Simple V-shaped bird silhouette via custom geometry.
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1, 0);
    shape.lineTo(0, 0.25);
    shape.lineTo(1, 0);
    shape.lineTo(0.5, -0.05);
    shape.lineTo(0, 0.05);
    shape.lineTo(-0.5, -0.05);
    shape.lineTo(-1, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshBasicMaterial color="#06291f" side={THREE.DoubleSide} transparent opacity={0.9} />
    </instancedMesh>
  );
}
