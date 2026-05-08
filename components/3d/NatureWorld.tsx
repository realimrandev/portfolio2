"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars, Cloud, Clouds } from "@react-three/drei";
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

const ENV_PRESETS: Record<ThemeId, "forest" | "night" | "sunset" | "dawn"> = {
  forest: "forest",
  aurora: "night",
  sunset: "sunset",
  ocean: "dawn",
  cosmos: "night",
};

function OrbitCam() {
  const { camera, mouse } = useThree();
  const r = useRef(18);
  const yaw = useRef(0);
  const pitch = useRef(0);

  useFrame((_, dt) => {
    yaw.current = THREE.MathUtils.lerp(yaw.current, mouse.x * 0.5, dt);
    pitch.current = THREE.MathUtils.lerp(pitch.current, 0.2 + mouse.y * 0.2, dt);
    const x = Math.sin(yaw.current) * r.current;
    const z = Math.cos(yaw.current) * r.current;
    const y = 4 + pitch.current * 4;
    camera.position.lerp(new THREE.Vector3(x, y, z), Math.min(1, dt * 1.2));
    camera.lookAt(0, 1.5, 0);
  });
  return null;
}

interface NatureWorldProps {
  daytime?: boolean;
}

export function NatureWorld({ daytime = true }: NatureWorldProps) {
  const { theme, themeId } = useThemeMode();
  const s = theme.scene;

  // Night mode darkens the theme palette while keeping the hue identity.
  const ambient = daytime ? s.ambient : "#3a6a82";
  const hemiTop = daytime ? s.hemiTop : "#1f3a52";
  const sunCol = daytime ? s.sun : "#a8c0ff";
  const showStars = !daytime || s.stars;

  return (
    <Canvas
      key={themeId}
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 6, 18], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Suspense fallback={<SceneLoader />}>
        <color attach="background" args={[daytime ? s.background : "#020a08"]} />
        <VolumetricFog
          color={daytime ? s.fog : "#010a08"}
          near={10}
          far={50}
        />

        <ambientLight intensity={daytime ? 0.55 : 0.18} color={ambient} />
        <hemisphereLight args={[hemiTop, "#02110b", 0.6]} />
        <directionalLight
          position={daytime ? [10, 14, -8] : [-8, 12, -10]}
          intensity={daytime ? 1.4 : 0.6}
          color={sunCol}
          castShadow
        />

        {showStars && (
          <Stars
            radius={140}
            depth={60}
            count={daytime ? 600 : themeId === "cosmos" ? 3200 : 2400}
            factor={themeId === "cosmos" ? 4 : 3}
            fade
            speed={themeId === "cosmos" ? 1 : 0.4}
          />
        )}
        <Clouds material={THREE.MeshBasicMaterial} limit={6}>
          <Cloud
            seed={1}
            position={[0, 12, -12]}
            speed={0.1}
            opacity={0.25}
            color={daytime ? s.hemiTop : "#445e72"}
            segments={12}
          />
        </Clouds>

        <Terrain size={120} segments={120} amplitude={2.2} />
        <Trees count={70} radius={50} seed={4} />
        <River width={9} length={90} />
        <FloatingLeaves count={260} area={60} />
        <Birds count={30} radius={28} />
        <Fireflies count={daytime ? 60 : 180} area={40} />

        <Environment preset={daytime ? ENV_PRESETS[themeId] : "night"} />
        <OrbitCam />
      </Suspense>
    </Canvas>
  );
}
