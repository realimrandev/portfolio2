"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useThemeMode } from "@/components/ThemeContext";

interface FirefliesProps {
  count?: number;
  area?: number;
}

const FIREFLY_COLOR: Record<string, string> = {
  forest: "#a7f3d0",
  aurora: "#7aeaff",
  sunset: "#ffd08a",
  ocean: "#b6e8ff",
  cosmos: "#ffb0f0",
};

export function Fireflies({ count = 80, area = 26 }: FirefliesProps) {
  const { themeId } = useThemeMode();
  const color = FIREFLY_COLOR[themeId] ?? "#a7f3d0";
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * area;
      arr[i * 3 + 1] = Math.random() * 8 + 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * area;
    }
    return arr;
  }, [count, area]);

  const speeds = useMemo(() => {
    return Array.from({ length: count }, () => ({
      sx: 0.3 + Math.random() * 0.6,
      sy: 0.2 + Math.random() * 0.5,
      sz: 0.3 + Math.random() * 0.6,
      ox: Math.random() * Math.PI * 2,
      oy: Math.random() * Math.PI * 2,
      oz: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const s = speeds[i];
      arr[i * 3] += Math.sin(t * s.sx + s.ox) * 0.01;
      arr[i * 3 + 1] += Math.sin(t * s.sy + s.oy) * 0.005;
      arr[i * 3 + 2] += Math.sin(t * s.sz + s.oz) * 0.01;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
