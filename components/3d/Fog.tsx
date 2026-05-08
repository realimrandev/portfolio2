"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

interface FogProps {
  color?: string;
  near?: number;
  far?: number;
}

export function VolumetricFog({
  color = "#062018",
  near = 8,
  far = 36,
}: FogProps) {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.Fog(color, near, far);
    return () => {
      scene.fog = null;
    };
  }, [scene, color, near, far]);
  return null;
}
