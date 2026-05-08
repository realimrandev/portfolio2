"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Terrain } from "./Terrain";
import { Trees } from "./Trees";
import { FloatingLeaves } from "./FloatingLeaves";
import { Birds } from "./Birds";
import { River } from "./River";
import { VolumetricFog } from "./Fog";
import { Fireflies } from "./Fireflies";
import { SceneLoader } from "./SceneLoader";
import { useThemeMode } from "@/components/ThemeContext";
import type { ThemeId } from "@/lib/themes";

function CameraRig() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    target.current.set(mouse.x * 1.6, 1.2 + mouse.y * 0.7, 9);
    camera.position.lerp(target.current, Math.min(1, dt * 1.5));
    camera.lookAt(0, 1.2, 0);
  });
  return null;
}

function Sun({ color, glow }: { color: string; glow: string }) {
  return (
    <>
      <mesh position={[6, 8, -18]}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <directionalLight
        position={[6, 8, -18]}
        intensity={1.4}
        color={glow}
        castShadow
      />
    </>
  );
}

const ENV_PRESETS: Record<ThemeId, "forest" | "night" | "sunset" | "dawn" | "city"> = {
  forest: "forest",
  aurora: "night",
  sunset: "sunset",
  ocean: "dawn",
  cosmos: "night",
};

export function ForestScene() {
  const { theme, themeId } = useThemeMode();
  const s = theme.scene;

  return (
    <Canvas
      key={themeId}
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.2, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Suspense fallback={<SceneLoader />}>
        <color attach="background" args={[s.background]} />
        <VolumetricFog color={s.fog} near={6} far={40} />

        <ambientLight intensity={0.4} color={s.ambient} />
        <hemisphereLight args={[s.hemiTop, s.hemiBottom, 0.6]} />
        <Sun color={s.sun} glow={s.sunGlow} />

        {s.stars && (
          <Stars
            radius={120}
            depth={60}
            count={themeId === "cosmos" ? 2200 : 1200}
            factor={themeId === "cosmos" ? 4 : 3}
            fade
            speed={themeId === "cosmos" ? 1 : 0.4}
          />
        )}

        <Terrain />
        <Trees count={36} radius={32} />
        <River />
        <FloatingLeaves count={180} area={40} />
        <Birds count={20} radius={20} />
        <Fireflies count={70} area={26} />

        <Environment preset={ENV_PRESETS[themeId]} />

        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
