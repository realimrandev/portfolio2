"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Trees } from "./Trees";
import { Fireflies } from "./Fireflies";
import { VolumetricFog } from "./Fog";
import { Terrain } from "./Terrain";
import { SceneLoader } from "./SceneLoader";

function Lantern() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.intensity = 2.4 + Math.sin(t * 4) * 0.4;
  });
  return (
    <group position={[0, 1.2, 4]}>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ffb37a" />
      </mesh>
      <pointLight ref={ref} color="#ffb37a" intensity={2.4} distance={14} />
    </group>
  );
}

export function LostForest404() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 2, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={<SceneLoader />}>
        <color attach="background" args={["#020a07"]} />
        <VolumetricFog color="#02110b" near={4} far={22} />
        <ambientLight intensity={0.18} color="#5cb89e" />
        <Terrain size={60} segments={64} amplitude={1.2} color="#072d22" />
        <Trees count={26} radius={20} seed={11} />
        <Fireflies count={140} area={20} />
        <Lantern />
      </Suspense>
    </Canvas>
  );
}
