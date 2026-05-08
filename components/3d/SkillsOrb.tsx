"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { fibonacciSphere } from "@/lib/three-utils";
import { SceneLoader } from "./SceneLoader";

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "GSAP",
  "Framer",
  "Tailwind",
  "Node",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Figma",
  "Git",
  "Vite",
  "Shaders",
  "Lenis",
  "Drei",
  "R3F",
];

function Sphere() {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(() => fibonacciSphere(SKILLS.length, 3), []);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.18;
    groupRef.current.rotation.x += dt * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#34f5b6" wireframe transparent opacity={0.12} />
      </mesh>
      {points.map((p, i) => (
        <Html
          key={SKILLS[i]}
          position={[p.x, p.y, p.z]}
          center
          distanceFactor={9}
          transform
          occlude
        >
          <div className="rounded-full border border-emerald-glow/30 bg-midnight-deep/70 px-3 py-1 text-xs font-medium text-emerald-glow backdrop-blur">
            {SKILLS[i]}
          </div>
        </Html>
      ))}
    </group>
  );
}

export function SkillsOrb() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      className="!h-full"
    >
      <Suspense fallback={<SceneLoader />}>
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 6]} intensity={1} color="#34f5b6" />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Sphere />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Suspense>
    </Canvas>
  );
}
