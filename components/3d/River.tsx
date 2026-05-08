"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 1.6 + uTime * 1.2) * 0.05;
    pos.z += cos(pos.y * 2.0 + uTime * 0.8) * 0.05;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  void main() {
    float wave = sin(vUv.x * 14.0 + uTime * 1.4) * 0.5 + 0.5;
    float wave2 = sin(vUv.y * 22.0 - uTime * 1.1) * 0.5 + 0.5;
    float mixv = smoothstep(0.0, 1.0, wave * 0.6 + wave2 * 0.4);
    vec3 color = mix(uColorA, uColorB, mixv);
    float edge = smoothstep(0.0, 0.15, vUv.x) * smoothstep(0.0, 0.15, 1.0 - vUv.x);
    float glow = pow(wave, 6.0) * 0.6;
    color += glow * vec3(0.2, 0.95, 0.7);
    gl_FragColor = vec4(color * edge, 0.92);
  }
`;

export function River({
  width = 8,
  length = 60,
  position = [0, -2.0, 0] as [number, number, number],
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#062a2a") },
      uColorB: { value: new THREE.Color("#0fb18a") },
    }),
    [],
  );

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[width, length, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}
